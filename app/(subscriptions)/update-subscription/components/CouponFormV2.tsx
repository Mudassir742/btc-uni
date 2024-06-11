"use client"
import { Input } from "@/components/ui/Input";
import { checkCouponCode } from "@/lib/services/actions/checkCoupon";
import { calculateDiscount } from "@/utils/price";
import { ChevronRight, Ticket } from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";
import Stripe from "stripe";

interface CouponFormV2Props {
  couponState: [string | null, React.Dispatch<React.SetStateAction<string | null>>]
}

const CouponFormV2: React.FC<CouponFormV2Props> = ({ couponState }) => {
  const [coupon, setCoupon] = couponState;
  const [couponData, setCouponData] = useState<Stripe.Coupon | null>(null);
  const [pending, startTransition] = useTransition()
  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        if (coupon) {
          const data = await checkCouponCode(coupon);
          const cData = JSON.parse(data) as Stripe.Coupon;
          setCouponData(cData);
          setCoupon(coupon);
          toast.success("Coupon Applied");
        } else {
          setCoupon(null);
        }
      } catch (error) {
        toast.error("Invalid Coupon Code");
      };

    })
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-themecolor-50 rounded-xl">
      <div className="flex items-center  border-[1px] border-secondarythemecolor text-secondarythemecolor rounded-xl py-0 px-4">
        <Image src="/ticket-discount.svg" alt="ticket discount logo" width={24} height={24} />
        <Input
          type="text"
          placeholder="Enter Coupon Code"
          className="bg-transparent"
          value={coupon ?? ""}
          onChange={handleCouponChange}
        />
        <button
          type="submit"
          disabled={pending}
          className="w-10 h-8 flex items-center justify-center rounded-xl bg-themecolor-500 disabled:cursor-not-allowed disabled:bg-opacity-60"
        >
          <ChevronRight color="white" />
        </button>
      </div>
      <div className="flex justify-end text-14 mt-3 px-2" >
        {/* <p className="text-themecolor-500">Try and get a discount</p> */}
        <p key={coupon} className="text-themecolor-500 text-16 font-semibold">{!couponData || !coupon ? '-$0.00' : calculateDiscount(couponData)} </p>
      </div>
    </form>
  );
};

export default CouponFormV2;
