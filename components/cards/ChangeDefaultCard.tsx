"use client"
// ChangeDefaultCardButton.tsx
import React, { useState } from 'react';
import { IProps } from './CreditCardDetails';
import { setDefaultCard } from '@/features/stripe/actions/setDefault'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ChangeDefaultCardButtonProps extends IProps {
  newDefaultCardId: string;
}

const ChangeDefaultCardButton: React.FC<ChangeDefaultCardButtonProps> = ({
  user,
  newDefaultCardId,
}) => {
  const { refresh } = useRouter();
  const [isChangingDefault, setIsChangingDefault] = useState(false);

  const handleClick = async () => {
    if (isChangingDefault) return;

    try {

      // Pass the correct arguments to setDefaultCard
      toast.promise(setDefaultCard(user.stripe.cus_id, newDefaultCardId), {
        error: "Error changing default card",
        loading: "Changing default card...",
        success: "Default card changed successfully"
      });

      console.log('Default card changed successfully');
      // Optionally, you can trigger a re-fetch of the card data or update your UI accordingly.
    } catch (error) {
      console.error('Error changing default card:', error);
    } finally {
      setIsChangingDefault(false);
      refresh();
    }
  };

  return (
    <button onClick={handleClick} disabled={isChangingDefault}>
      Set as Default
    </button>
  );
};

export default ChangeDefaultCardButton;
