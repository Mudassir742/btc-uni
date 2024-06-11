import { FC } from "react";
import Cancel from "@/app/(subscriptions)/cancel/page";
type ButtonValue = string | null;
interface MyComponentProps {
  className?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}
const Plan: FC<MyComponentProps> = ({ searchParams }: MyComponentProps) => {
  const searchVal = searchParams?.q;
  const searchValStep = searchParams?.step;
  return (
    searchVal == "update-subscription" && searchValStep == "3" && <Cancel searchParams={{
      q: searchParams?.q as string
    }} />
  );
};

export default Plan;
