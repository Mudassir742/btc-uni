import { FC, HTMLAttributes, Suspense } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { getStripeSubs } from "@/features/stripe/subscriptions";
// Components
import IndividualPlans from "@/components/forms/IndividualPlans";
import SH1Text from "@/components/text/SH1Text";
import { headers } from "next/headers";
import IndividualFREEPlan from "@/components/forms/IndividualFREEPlan";

interface IProps extends HTMLAttributes<HTMLDivElement> { }

const IndividualPlansServerComp: FC<IProps> = async ({
  className,
  ...props
}) => {
  let susbData = await getStripeSubs();
  const sub = headers().get("x-subscription")

  if (!susbData) {
    throw "Something went wrong";
  }

  return (
    <div className={cn("", className)} {...props}>
      <Suspense>
        <div className="md:flex overflow-auto mx-auto justify-center">
          
     
        <IndividualPlans needNewSub={sub ? true : false} plansData={susbData.data} />
          <IndividualFREEPlan needNewSub={sub ? true : false} plansData={susbData.data} />
          </div>

      </Suspense>
    </div >
  );
};

export default IndividualPlansServerComp;