"use client"

import { createInvoiceWithCustomDetails } from "@/lib/services/actions/createInvoice"


const CreateInvoiceButton = () => {

    const createInvoice = async () => {
        await createInvoiceWithCustomDetails(
            "cus_PMva4LJ8Bf6jIP",
            "pi_3OSGC2HFi89lYtgL034IKBc0",
            [
                {
                    description: 'Custom Product 1',
                    amount: 2000, // Amount in cents
                    metadata: { size: 'M', color: 'blue' },
                },
                // ... other items
            ]
        ).then(invoice => {
            console.log('Invoice created:', invoice);
        }
        ).catch(error => {
            console.error('Error creating invoice:', error);
        });
    }
    return (
        <button onClick={createInvoice}>ON CLICK</button>
    )
}

export default CreateInvoiceButton