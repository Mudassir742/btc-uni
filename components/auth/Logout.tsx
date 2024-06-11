"use client";
import { FC, HTMLAttributes, useState } from "react";
// Utils
// import { cn } from '@/utils/shadcn'
import { useRouter } from "next/navigation";
// Lib
import { handleLougout } from "@/features/login/logout";
interface IProps extends HTMLAttributes<HTMLButtonElement> {}

const Logout: FC<IProps> = ({ className, children, ...props }) => {
  const [loading, setLoading] = useState(false);
  const { refresh } = useRouter();

  return (
    <button
      onClick={async () => {
        setLoading(true);
        await handleLougout(() => {
          refresh();
        });
        setLoading(false);
      }}
      className="py-2 px-4 rounded bg-blue-500 text-white mx-auto"
      {...props}
    >
      {children} {loading && "loading..."}
    </button>
  );
};

export default Logout;
