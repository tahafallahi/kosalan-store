"use client";

import ContentPadding from "@/components/layout/content-padding/content-padding";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authenticate, verifyOtp } from "@/lib/data/customer";
import { useState } from "react";

export default function Auth() {
  const [submited, setSubmited] = useState(false);
  const [phone, setPhone] = useState("");

  if (!submited) {
    return (
      <ContentPadding>
        <form action={authenticate} onSubmit={() => setSubmited(true)}>
          <FieldGroup>
            <FieldLabel htmlFor="phone">شماره موبایل</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
            />
          </FieldGroup>
          <Button type="submit">ثبت نام</Button>
        </form>
      </ContentPadding>
    );
  } else {
    return (
      <ContentPadding>
        <form action={verifyOtp}>
          <input type="hidden" name="phone" value={phone}/>
          <FieldGroup dir="ltr">
            <FieldLabel htmlFor="otp">کد ارسال شده را وارد کنید.</FieldLabel>
            <InputOTP id="digits-only" name="otp" maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FieldGroup>
          <Button type="submit" onClick={() => setSubmited(true)}>
            ثبت نام
          </Button>
        </form>
      </ContentPadding>
    );
  }
}
