"use client";
import { FC, HTMLAttributes } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "use-shopping-cart/core";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
	product: Product;
	options?:
		| {
				count: number;
				price_metadata?: { [propName: string]: any } | undefined;
				product_metadata?: { [propName: string]: any } | undefined;
		  }
		| undefined;

	variant?: "button" | "icon";
}

const AddToCartButton: FC<IProps> = ({
	className,
	product,
	options,
	children,
	variant = "icon",
	...props
}) => {
	const { addItem, cartCount } = useShoppingCart();
	const handleClick = () => {
		addItem(product, options);
		toast.success("Added to cart");
	};
	return (
		<button onClick={handleClick} className={cn("", className)} {...props}>
			{children ? (
				children
			) : variant === "button" ? (
				"Add to Cart"
			) : (
				<ShoppingCart />
			)}
		</button>
	);
};

export default AddToCartButton;
