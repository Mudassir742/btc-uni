"use client"
import { Input } from "@/components/ui/Input";
import { checkCouponCode } from "@/lib/services/actions/checkCoupon";
import { calculateDiscount } from "@/utils/price";
import { ChevronRight, Ticket } from "lucide-react";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";
import Stripe from "stripe";

interface CouponFormProps {
  couponState: [string | null, React.Dispatch<React.SetStateAction<string | null>>]
}

const CouponForm: React.FC<CouponFormProps> = ({ couponState }) => {
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
    <form onSubmit={handleSubmit} className="p-4 border-[1px] border-gray-400 rounded-xl">
      <div className="flex items-center border-[1px] border-gray-400 rounded-xl py-0 px-4">
        <Ticket />
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
      <div className="flex justify-between text-14 mt-3 px-2" >
        <p>Coupon Code</p>
        <p key={coupon} className="text-themecolor-500 font-semibold">{!couponData || !coupon ? '-$0.00' : calculateDiscount(couponData)} </p>
      </div>
    </form>
  );
};

export default CouponForm;
