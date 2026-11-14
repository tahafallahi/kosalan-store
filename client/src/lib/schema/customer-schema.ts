import { z } from "zod";

export const customerSchema = z.object({
  "given-name": z
    .string()
    .trim()
    .nonempty("لطفا نام خود را وارد نمایید.")
    .max(100, "نام باید کوتاه تر از ۱۰۰ حرف باشد."),
  "family-name": z
    .string()
    .trim()
    .nonempty("لطفا نام خانوادگی خود را وارد نمایید.")
    .max(100, "نام خانوادگی باید کوتاه تر از ۱۰۰ حرف باشد."),
  "address-level1": z
    .string()
    .trim()
    .nonempty("لطفا استان خود را وارد نمایید.")
    .max(100, "استان باید کوتاه تر از ۱۰۰ حرف باشد."),
  "address-level2": z
    .string("لطفا شهر خود را وارد نمایید.")
    .trim()
    .nonempty("لطفا شهر خود را وارد نمایید.")
    .max(200, "شهر باید کوتاه تر از ۲۰۰ حرف باشد."),
  "street-address": z
    .string()
    .trim()
    .nonempty("لطفا آدرس خود را وارد نمایید.")
    .max(500, "نام باید کوتاه تر از ۵۰۰ حرف باشد."),
  "postal-code": z
    .string()
    .trim()
    .nonempty("لطفا کد پستی خود را وارد نمایید.")
    .max(10, "کدپستی باید ۱۰ رقم باشد."),
});
