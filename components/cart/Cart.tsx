"use client";

import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import landscape from "@/public/landscape-placeholder.png";
import { XCircle, Plus, Minus } from "lucide-react";
import { Button } from "../ui/Button";

const Cart = () => {
    const {cartDetails} = useShoppingCart();
  return (
    <div className="grid grid-cols-12 gap-x-5 gap-y-5 xl:gap-y-0">
      <div className="col-span-12">
        <h1 className="text-4xl font-bold mt-8">Your Cart</h1>
        <p className="text-12">1 item ships at checkout</p>
      </div>
      <div className="col-span-12 xl:col-span-8">
        <div className="w-full border-dotted border-4 py-16 px-10 mt-8">
          <div className="flex justify-between">
            <p>{`You're 8$ away from FREE SHIPPING!`}</p>
            <p className="font-bold">keep Shopping</p>
          </div>
          <ProgressBar />
        </div>
        <hr className="h-[2px] my-8 bg-gray-200" />
        {Object.values(cartDetails!).map((product:any) =>(
        <div className="w-full" key={product.id}>
        <div className="w-full h-fit flex flex-col items-center md:flex-row md:items-center">
          <Image
            src={product.image}
            alt="landscape"
            width={500}
            height={500}
            className="w-60 md:w-72 object-contain h-60 "
          />
          <div className="w-full h-full p-10 flex flex-col justify-between">
            <div className="w-full">
              <div className="w-full flex justify-between relative">
                <div className="flex flex-col">
                  <h2 className="text-20 font-bold max-w-[12rem] md:max-w-full">{product.name}</h2>
                  <p className="text-12">{product.description}</p>
                </div>
                <button className="absolute right-0">
                  <XCircle />
                </button>
              </div>
            </div>
            <div className="w-full h-12 flex justify-between mt-8">
              <div className="w-full h-full flex justify-between items-end text-20 font-semibold">
                <h2>Price: </h2>
                <p>$10</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-[2px] my-8 bg-gray-200" />
        </div>

        ))}
      </div>
      <div className="col-span-12 xl:col-span-4 h-full">
        <div className="w-full bg-gray-100 p-8 my-8 sticky h-fit top-10">
          <h2 className="font-bold">Summary</h2>
          <div className="w-full mt-6 text-sm flex flex-col gap-y-2 justify-between">
            <div className="w-full flex justify-between">
              <p>Subtotal (items)</p>
              <p>$10.00</p>
            </div>
            <div className="w-full flex justify-between">
              <p>Shipping Discount</p>
              <p>-$2.00</p>
            </div>
            <div className="w-full flex justify-between">
              <p>Shipping & Handling</p>
              <p>$4.00</p>
            </div>
            <div className="w-full flex justify-between">
              <p>Tax (Calculated at checkout)</p>
              <p>$0.00</p>
            </div>
          </div>
          <hr className="my-8 border-gray-700" />
          <div className="w-full flex justify-between">
            <h3 className="font-bold">Balance</h3>
            <p className="font-bold text-16">$10.00</p>
          </div>
          <div className="w-full flex justify-center mt-7">
            <Button variant={"secondary"}>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
