import { ModuleProvider, Modules } from "@medusajs/framework/utils";
import SmsService from "./service"

export default ModuleProvider(Modules.NOTIFICATION, {services: [SmsService]})