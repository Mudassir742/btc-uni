"use client";
// components/DeleteCardButton.tsx
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { stripe } from "@/lib/stripe-server";
import { UserSession } from "@/interfaces";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteCard } from "@/features/stripe/actions/deleteCardAction";
import Loader from "../ui/Loader";

interface DeleteCardButtonProps {
  customerId: string;
  cardId: string;
  onDeleteSuccess?: () => void;
}

const DeleteCard: React.FC<DeleteCardButtonProps> = ({
  customerId,
  cardId,
  onDeleteSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { refresh, replace } = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = async () => {
    try {
      setIsDeleting(true);

      // Use the Stripe Node.js library to delete the source (card)
      startTransition(async () => {
        await deleteCard(customerId, cardId); // Add await here

        toast.success("Card deleted successfully");
        refresh();
        setIsDeleting(false);
        typeof window !== undefined && window.scroll(0, 0);
      });

      // Optionally, you can trigger a re-fetch of the card data or update your UI accordingly.
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDeleting}
      className="flex items-center"
    >
      {
        isDeleting || pending  ?
          <Loader /> :
          <Trash2 color="red" size={20} />
      }
    </button>
  );
};

export default DeleteCard;
