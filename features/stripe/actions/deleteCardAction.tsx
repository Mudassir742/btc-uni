"use server"
export const deleteCard = async (
    customerId: string,
    cardId: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.stripe.com/v1/payment_methods/${cardId}/detach`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to delete card: ${response.statusText}`);
      }
  
      console.log("Card deleted successfully");
    } catch (error) {
      console.error("Error deleting card:", error);
      throw error;
    }
  };