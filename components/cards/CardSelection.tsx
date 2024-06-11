"use client";
import { cn } from "@/utils/shadcn";
import { createUrl } from "@/utils/url";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, HTMLAttributes, useState, useTransition } from "react";
import Stripe from "stripe";
// Utils
// import { cn } from '@/utils/shadcn'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  card: Stripe.PaymentMethod;
}

const CardSelection: FC<IProps> = ({ className, card, ...props }) => {
  // const [selectedCard, setSelectedCard] = useState("");
  const searchParams = useSearchParams();

  const newParams = new URLSearchParams(searchParams!);
  const { replace } = useRouter();
  const [pending, startTransition] = useTransition();

  newParams.set("cardId", card.id);

  return (
    <div
      key={card.id}
      onClick={() => {
        startTransition(() => {
          if (searchParams?.get("cardId") === card.id) {
            newParams.delete("cardId");
            replace(createUrl(location.pathname, newParams));
          } else {
            replace(createUrl(location.pathname, newParams));
          }
        });
      }}
      className={cn(
        [
          "flex w-full px-2 duration-200 rounded cursor-pointer hover:bg-gray-100",
        ],
        {
          "bg-gray-200": searchParams?.get("cardId") === card.id,
          "cursor-not-allowed": pending,
        }
      )}
    >
      <div className="flex items-center gap-x-3 text-16">
        <Image
          width={50}
          height={30}
          src={"/images/cards/credit-card.png"}
          alt="credit card"
        />
        <h3 className="capitalize">{card.card?.brand}</h3>
        <p> •••• {card.card?.last4}</p>
        <p>
          Expires {card.card?.exp_month}/{card.card?.exp_year}
        </p>
      </div>
    </div>
  );
};

export default CardSelection;
