"use client";
import { FC, HTMLAttributes, useState } from "react";
// Utils
import { cn } from "@/utils/shadcn";
// Components
import { ChevronUp } from "lucide-react";
import { FormHeader } from "@/components/forms/FormHeader";
import Collapsible from "@/components/ui/Collapsible";
import { Skeleton } from "@/components/ui/Skeleton";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  orderSummary: number;
  taxLoading?: boolean;
  discountApplied: {
    type: "amount" | "percent";
    value: number;
  };
  tax: number;
}

const TotalElement: FC<IProps> = ({
  className,
  discountApplied,
  orderSummary,
  taxLoading,
  tax,
  ...props
}) => {
  const [show, setShow] = useState(true);

  return (
    <div className={cn("", className)} {...props}>
      <Collapsible setShow={setShow}>
        SHOW ORDER SUMMARY
        <ChevronUp
          className={cn(["w-5 h-5"], { "transform rotate-180": show })}
        />
      </Collapsible>
      {show && (
        <div className="mt-5">
          <FormHeader className="text-themecolor-500">Total</FormHeader>
          <div className="mt-6">
            <div className="flex flex-col text-sm gap-y-3">
              <Row label="Order Summary" value={orderSummary} />
              <Row
                label="Discount Applied"
                value={
                  discountApplied.type === "percent"
                    ? orderSummary * (discountApplied.value / 100)
                    : discountApplied.value / 100
                }
              />
              {/* <Row label="Tax" value={tax} loadingValue={taxLoading} /> */}
            </div>

            <div className="flex justify-between mt-3 font-bold gap-x-4">
              <h3 className="uppercase text-themecolor-500">DUE TODAY</h3>
              <p className="text-themecolor-500">
                $
                {(
                  orderSummary -
                  (discountApplied.type === "percent"
                    ? orderSummary * (discountApplied.value / 100)
                    : discountApplied.value / 100) +
                  tax
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalElement;

interface IRowProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
  loadingValue?: boolean;
}

const Row: FC<IRowProps> = ({
  className,
  label,
  value,
  loadingValue,
  ...props
}) => {
  return (
    <div
      className={cn("flex justify-between w-full gap-x-4", className)}
      {...props}
    >
      <h3>{label}</h3>
      {loadingValue ? (
        <Skeleton className="w-10 h-6" />
      ) : (
        <p>${value?.toFixed(2)}</p>
      )}
    </div>
  );
};
