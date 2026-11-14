"use client";

import { Card } from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import provinces from "@/data/provinces.json";
import cities from "@/data/cities.json";
import { Button } from "@/components/ui/button";
import React, { useActionState, useEffect, useState } from "react";

import { customerSchema } from "@/lib/schema/customer-schema";
import { z } from "zod";
import { StoreCustomer } from "@medusajs/types";
import { updateCustomer } from "@/lib/data/customer";
import { Textarea } from "@/components/ui/textarea";
import { updateTag } from "next/cache";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

type Errors = Partial<
  Record<
    | "given-name"
    | "family-name"
    | "address-level1"
    | "address-level2"
    | "street-address"
    | "postal-code",
    Record<"errors", string[]> | null
  >
>;

interface Props {
  customer: StoreCustomer;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomerInformationForm({
  customer,
  setEditing,
}: Props) {
  const router = useRouter();
  const { first_name, last_name, addresses } = customer;

  const [errors, setErros] = useState<Errors>({});
  const [province, setProvince] = useState<string | null>(
    addresses[0]?.province ?? null,
  );
  const [state, formAction, isPending] = useActionState(updateCustomer, false);

  useEffect(() => {
    if (!isPending && state) {
      router.refresh();
      setEditing(false)
    }
  }, [isPending, state, router , setEditing ]);

  function onSumbit(e: React.SubmitEvent<HTMLFormElement>) {
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = customerSchema.safeParse(raw);

    if (!parsed.success) {
      e.preventDefault();
      setErros(z.treeifyError(parsed.error).properties!);
      return;
    }

    setErros({});
  }

  return (
    <Card className="px-4">
      <h2 className="text-base font-semibold">اطلاعات خود را وارد کنید</h2>
      <hr />
      <form
        action={formAction}
        className="flex flex-col gap-5"
        onSubmit={onSumbit}
      >
        <FieldGroup>
          <div className="flex flex-col gap-2">
            {errors["given-name"] && (
              <p className="text-destructive">
                {errors["given-name"].errors[0]}
              </p>
            )}
            <div className="flex gap-4">
              <FieldLabel className="text-base" htmlFor="given-name">
                نام:
              </FieldLabel>
              <Input
                className="text-sm"
                id="given-name"
                name="given-name"
                autoComplete="given-name"
                aria-invalid={!!errors["given-name"]}
                onFocus={() => setErros({ ...errors, "given-name": null })}
                defaultValue={first_name ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {errors["family-name"] && (
              <p className="text-destructive">
                {errors["family-name"].errors[0]}
              </p>
            )}
            <div className="flex gap-4">
              <FieldLabel
                className="text-base whitespace-nowrap"
                htmlFor="family-name"
              >
                {" "}
                نام خانوادگی:
              </FieldLabel>
              <Input
                className="text-sm"
                id="family-name"
                name="family-name"
                autoComplete="family-name"
                aria-invalid={!!errors["family-name"]}
                onFocus={() => setErros({ ...errors, "family-name": null })}
                defaultValue={last_name ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {errors["address-level1"] && (
              <p className="text-destructive">
                {errors["address-level1"].errors[0]}
              </p>
            )}
            <div className="flex gap-4">
              <FieldLabel
                className="text-base whitespace-nowrap"
                htmlFor="address-level1"
              >
                {" "}
                استان:
              </FieldLabel>
              <Select
                items={provinces.map((p) => ({
                  label: p.name,
                  value: p.name,
                }))}
                autoComplete="address-level1"
                id="address-level1"
                name="address-level1"
                onValueChange={(value: string | null) => setProvince(value)}
                value={province}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={!!errors["address-level1"]}
                  onFocus={() =>
                    setErros({ ...errors, "address-level1": null })
                  }
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectGroup>
                    {provinces
                      .toSorted(
                        (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0),
                      )
                      .map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {errors["address-level2"] && (
              <p className="text-destructive">
                {errors["address-level2"].errors[0]}
              </p>
            )}
            <div className="flex gap-4">
              <FieldLabel
                className="text-base whitespace-nowrap"
                htmlFor="address-level2"
              >
                {" "}
                شهر:
              </FieldLabel>
              <Select
                items={cities
                  .filter(
                    (p) =>
                      p.province_id ===
                      provinces.find((p) => p.name === province)?.id,
                  )
                  .map((p) => ({ label: p.name, value: p.name }))}
                autoComplete="address-level2"
                id="address-level2"
                name="address-level2"
                disabled={!province}
                defaultValue={addresses[0]?.city ?? ""}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={!!errors["address-level2"]}
                  onFocus={() =>
                    setErros({ ...errors, "address-level2": null })
                  }
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectGroup>
                    {cities
                      .filter(
                        (p) =>
                          p.province_id ===
                          provinces.find((p) => p.name === province)?.id,
                      )
                      .toSorted(
                        (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0),
                      )
                      .map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {errors["street-address"] && (
              <p className="text-destructive">
                {errors["street-address"].errors[0]}
              </p>
            )}
            <div className="flex gap-4">
              <FieldLabel
                className="text-base whitespace-nowrap"
                htmlFor="street-address"
              >
                {" "}
                ادرس:
              </FieldLabel>
              <Textarea
                className="text-sm"
                id="street-address"
                name="street-address"
                autoComplete="street-address"
                aria-invalid={!!errors["street-address"]}
                onFocus={() => setErros({ ...errors, "street-address": null })}
                defaultValue={addresses[0]?.address_1 ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {errors["postal-code"] && (
              <p className="text-destructive">
                {errors["postal-code"].errors[0]}
              </p>
            )}
            <div className="flex gap-4">
              <FieldLabel
                className="text-base whitespace-nowrap"
                htmlFor="postal-code"
              >
                {" "}
                کدپستی:
              </FieldLabel>
              <Input
                className="text-sm"
                id="postal-code"
                name="postal-code"
                autoComplete="postal-code"
                type="number"
                maxLength={10}
                minLength={10}
                aria-invalid={!!errors["postal-code"]}
                onFocus={() => setErros({ ...errors, "postal-code": null })}
                defaultValue={addresses[0]?.postal_code ?? ""}
              />
            </div>
          </div>
        </FieldGroup>
        <Button type="submit" className="w-full">
          ذخیره
          {isPending && <Spinner />}
        </Button>
      </form>
    </Card>
  );
}
