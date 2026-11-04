import {
  AbstractAuthModuleProvider,
  AbstractEventBusModuleService,
  MedusaError,
} from "@medusajs/framework/utils";

import {
  AuthenticationInput,
  AuthenticationResponse,
  AuthIdentityProviderService,
  Logger,
} from "@medusajs/framework/types";
import { randomInt } from "node:crypto";
import jwt from "jsonwebtoken";

type InjectedDependencies = {
  logger: Logger;
  event_bus: AbstractEventBusModuleService;
};

type Options = {
  jwtSecret: string;
};

const pendingOTPs = new Map<string, { hashedOTP: string; expiresAt: number }>();

const OTP_EXPIRATION_TIME = 1000 * 60 * 2; // 2 mins

class PhoneAuthService extends AbstractAuthModuleProvider {
  static DISPLAY_NAME = "Phone Auth";
  static identifier = "phone-auth";
  private options: Options;
  private logger: Logger;
  private event_bus: AbstractEventBusModuleService;

  constructor(container: InjectedDependencies, options: Options) {
    // @ts-ignore
    super(...arguments);

    this.options = options;
    this.logger = container.logger;
    this.event_bus = container.event_bus;
  }

  // async register(
  //   data: AuthenticationInput,
  //   authIdentityProviderService: AuthIdentityProviderService,
  // ): Promise<AuthenticationResponse> {
  //   const { phone } = data.body || {};
  //   if (!phone) {
  //     return { success: false, error: "Phone number is required" };
  //   }

  //   try {
  //     await authIdentityProviderService.retrieve({ entity_id: phone });

  //     return { success: false, error: "User with phone number already exists" };
  //   } catch (error) {
  //     const user = await authIdentityProviderService.create({
  //       entity_id: phone,
  //     });

  //     return { success: true, authIdentity: user };
  //   }
  // }

  async authenticate(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService,
  ): Promise<AuthenticationResponse> {
    const { phone } = data.body || {};

    if (!phone) {
      return {
        success: false,
        error: "Phone number is required",
      };
    }

    const { hashedOTP, otp } = await this.generateOTP();

    pendingOTPs.set(phone, {
      hashedOTP,
      expiresAt: Date.now() + OTP_EXPIRATION_TIME,
    });

    await this.event_bus.emit(
      { name: "phone-auth.otp.generated", data: { otp, phone } },
      {},
    );

    return { success: true, location: "otp" };
  }

  async validateCallback(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService,
  ): Promise<AuthenticationResponse> {
    const { phone, otp } = data.query || {};

    if (!phone || !otp) {
      return {
        success: false,
        error: "Phone number and OTP are required",
      };
    }

    const pending = pendingOTPs.get(phone);

    if (!pending || Date.now() > pending.expiresAt) {
      return {
        success: false,
        error: "Otp doesn't exist or has expired",
      };
    }

    try {
      const decodedOTP = jwt.verify(
        pending.hashedOTP,
        this.options.jwtSecret,
      ) as { otp: string };

      if (decodedOTP.otp !== otp) {
        return {
          success: false,
          error: "Invalid OTP",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Invalid OTP",
      };
    }

    pendingOTPs.delete(phone);

    let user;
    try {
      user = await authIdentityProviderService.retrieve({
        entity_id: phone,
      });
    } catch {
      try {
        user = await authIdentityProviderService.create({
          entity_id: phone,
        });
      } catch (error) {
        return {
          success: false,
          error: "Failed to create new user. Error: " + error,
        };
      }
    }

    return {
      success: true,
      authIdentity: user,
    };
  }

  async generateOTP() {
    const otp = randomInt(100000, 1000000).toString();

    this.logger.log(`Generated OTP: ${otp}`);

    const hashedOTP = jwt.sign({ otp }, this.options.jwtSecret, {
      expiresIn: "60s",
    });

    return { hashedOTP, otp };
  }

  static validateOptions(options: Record<any, any>): void | never {
    if (!options.jwtSecret) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "JWT secret is required",
      );
    }
  }
}

export default PhoneAuthService;
