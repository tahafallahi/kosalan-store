"use client";

import TextSection from "@/components/layout/text-section/text-section";
import { Button } from "@/components/ui/button";

import { formatPhoneNumber } from "@/lib/utils/format-phone-number";
import { StoreCustomer } from "@medusajs/types";
import { PencilIcon } from "lucide-react";
import React, { useState } from "react";

import CustomerInformationForm from "../customer-information-form.tsx/customer-information-form";

interface Props {
  customer: StoreCustomer;
  showSignOutButton?: boolean;
}

export function CustomerInformation({ customer, showSignOutButton }: Props) {
  const { first_name, last_name, phone, addresses } = customer;

  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <CustomerInformationForm customer={customer} setEditing={setEditing} />
    );
  } else {
    return (
      <TextSection
        title={
          first_name || last_name ? `${first_name} ${last_name}` : `${phone}`
        }
      >
        <div className="flex flex-col gap-1 py-1">
          <p>{`شماره تلفن: ۰${formatPhoneNumber(Number(phone))}`}</p>
          <p>{`آدرس: ${addresses[0] ? `${addresses[0].province}، ${addresses[0].city}، ${addresses[0].address_1}` : "-"}`}</p>
          <p>{`کدپستی: ${formatPhoneNumber(Number(addresses[0]?.postal_code)) ?? "-"}`}</p>
        </div>
        {showSignOutButton && 
              <Button variant="destructive" className="w-full mt-4">
                خروج از حساب کاربری
              </Button>
        }

        <Button
          variant="ghost"
          className="absolute left-2 top-2 text-primary"
          onClick={() => setEditing(true)}
        >
          ویرایش
          <PencilIcon className="size-5" />
        </Button>
      </TextSection>
    );
  }
}
