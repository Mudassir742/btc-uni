"use client";
import { Button } from "@/components/ui/Button";
import { handleLougout } from "@/features/login/logout";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useState, useTransition } from "react";
// Utils
// import { cn } from '@/utils/shadcn'

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const LogoutButton: FC<IProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pending, startTransition] = useTransition();
  const { refresh, push } = useRouter();

  return (
    <Button
      className="disabled:opacity-50 "
      onClick={async () => {
        setIsLoading(true);
        await handleLougout(() => {
          startTransition(() => {
            refresh();
            // push("/");
            window.location.href = "/";
          });
        });
        setIsLoading(true);
      }}
      disabled={pending || isLoading}
         >
      Log Out
    </Button>
  );
};

export default LogoutButton;
