import {
  AbstractNotificationProviderService,
  MedusaError,
} from "@medusajs/framework/utils";
import {
  ProviderSendNotificationDTO,
  ProviderSendNotificationResultsDTO,
} from "@medusajs/types";

type InjectedDependencies = {};

type SmsServiceOptions = {
  templateId: string;
  apiKey: string;
};

class SmsService extends AbstractNotificationProviderService {
  static readonly identifier = "sms";
  private readonly templateId: string;
  private readonly apiKey: string;

  constructor(container: InjectedDependencies, options: SmsServiceOptions) {
    super();

    this.templateId = options.templateId;
    this.apiKey = options.apiKey;
  }

  static validateOptions(options: Record<any, any>): void | never {
    if (!options.templateId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "TemplateId is required",
      );
    }
    if (!options.apiKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Api key is required",
      );
    }
  }

  async send(
  notification: ProviderSendNotificationDTO,
): Promise<ProviderSendNotificationResultsDTO> {
  const { to, data } = notification

  if (!to) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "A recipient phone number is required",
    )
  }

  // { otp: "12345" } -> [{ name: "otp", value: "12345" }]
  const parameters = Object.entries(data ?? {}).map(([name, value]) => ({
    name,
    value: String(value),
  }))

  let response: Response
  try {
    response = await fetch("https://api.sms.ir/v1/send/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify({
        mobile: to,
        templateId: Number(this.templateId),
        parameters,
      }),
    })
    console.log( parameters, "sent")
  } catch (e) {
    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      `SMS request failed: ${(e as Error).message}`,
    )
  }

  const result = await response.json().catch(() => null)

  if (!response.ok || result?.status !== 1) {
    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      `SMS provider error (${response.status}): ${result?.message ?? "unknown error"}`,
    )
  }

  return { id: String(result.data?.messageId ?? "") }
}
}

export default SmsService