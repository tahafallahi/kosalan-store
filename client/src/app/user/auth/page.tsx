"use client";

import ContentPadding from "@/components/layout/content-padding/content-padding";
import TextSection from "@/components/layout/text-section/text-section";
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
        <TextSection title="ورود یا ثبت نام در کوسالان">
          <form
            action={authenticate}
            onSubmit={() => setSubmited(true)}
            className="flex flex-col gap-5"
          >
            <FieldGroup className="gap-2">
              <FieldLabel htmlFor="phone" className="">
                شماره موبایل
              </FieldLabel>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FieldGroup>
            <Button type="submit" className="w-full">
              ورود
            </Button>
          </form>
        </TextSection>
      </ContentPadding>
    );
  } else {
    return (
      <ContentPadding>
        <TextSection title="کد تایید را وارد کنید">
          <form action={verifyOtp} className="flex flex-col gap-5">
            <input type="hidden" name="phone" value={phone} />
            <FieldGroup className="gap-2">
              <FieldLabel htmlFor="otp">کد تایید برای شما ارسال شد.</FieldLabel>
              <InputOTP id="digits-only" name="otp" maxLength={6} required>
                <InputOTPGroup dir="ltr" className="w-full justify-center">
                  <InputOTPSlot index={0} className="flex w-full h-10" />
                  <InputOTPSlot index={1} className="flex w-full h-10" />
                  <InputOTPSlot index={3} className="flex w-full h-10" />
                  <InputOTPSlot index={2} className="flex w-full h-10" />
                  <InputOTPSlot index={4} className="flex w-full h-10" />
                  <InputOTPSlot index={5} className="flex w-full h-10" />
                </InputOTPGroup>
              </InputOTP>
            </FieldGroup>
            <Button
              type="submit"
              onClick={() => setSubmited(true)}
              className="w-full"
            >
              ورود
            </Button>
          </form>
        </TextSection>
      </ContentPadding>
    );
  }
}
