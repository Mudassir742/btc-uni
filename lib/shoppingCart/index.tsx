'use client'
import { FC, HTMLAttributes } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { CartProvider } from "use-shopping-cart"

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const ShoppingCartWrapper: FC<IProps> = ({ className, children, ...props }) => {
    return (
        <CartProvider
            shouldPersist={true}
            stripe={process.env.NEXT_PUBLIC_STRIPE_KEY!}
            cartMode='checkout-session'
            currency={'USD'}
        >
            {children}
        </CartProvider>
    )
}

export default ShoppingCartWrapper