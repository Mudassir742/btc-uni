"use client";
import {
  ChangeEvent,
  FC,
  HTMLAttributes,
  memo,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authHandleErrors } from "@/utils/authErrorHandling";
import {
  BasicFormInfo,
  basicFormInfoSchema,
} from "@/lib/schemas/basicInfoForm";
import countries from "@/lib/data/countries.json";
// import states from "@/lib/data/states.json";
import {
  updateAddress,
  updateUserDataAddress,
} from "@/features/login/updateAddress";
import { createClient } from "@/lib/apolloClient";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

// Types
import { Address, ICountry, IState, UserSession } from "@/interfaces";
// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import toast from "react-hot-toast";
import { updateCustomer } from "@/lib/services/stripe/handleCustomer";
import { handleError } from "@/utils/stripeErrorHandling";
import { createUrl } from "@/utils/url";
import * as NProgress from "nprogress";
import { Checkbox } from "../ui/Checkbox";
import { useMC } from "@/lib/react-query/hooks/useMC";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  addressData: Address & { firstName: string; lastName: string; phone: string };
  user: UserSession;
  type?: "page" | "modal";
}

const BasicInfoForm: FC<IProps> = ({
  className,
  user,
  addressData,
  type = "page",
  ...props
}) => {
  const { push, refresh } = useRouter();
  const params = useSearchParams();
  const isProductPurchase =
    params?.get("type") === "course" || params?.get("type") === "bundle";
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isSignup = params?.get("source") === "signup" || false;
  // Api Call
  const { createMcSubscriber } = useMC();
  const { mutate } = createMcSubscriber;
  // 1. Define your form.
  const form = useForm<BasicFormInfo>({
    resolver: zodResolver(basicFormInfoSchema),
    defaultValues: {
      address1: addressData.address1,
      address2: addressData.address2,
      city: addressData.city,
      country: addressData.country || undefined,
      state: addressData.state || undefined,
      zipcode: addressData.zipcode,
      phone: addressData.phone ?? "",
      firstName: addressData.firstName ?? "",
      lastName: addressData.lastName ?? "",
      subscribe: false,
      // dob: undefined,
    },
  });

  const [isDisabled, setisDisabled] = useState(
    form.getValues("country") ? false : true
  );

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const countriesProm = fetch("/data/countries.json");
      const statesProm = fetch("/data/states.json");

      await Promise.all([countriesProm, statesProm]).then(async (item) => {
        await item.map(
          async (res, i) =>
            await res.json().then((list: ICountry[] | IState[]) => {
              if (i == 0) {
                startTransition(() => {
                  setCountries(list);
                });
              } else {
                startTransition(() => {
                  setStates(list as IState[]);
                });
              }
            })
        );
      });
    };

    fetchData();
  }, []);

  // Apollo Client
  const client = useMemo(() => {
    return createClient(user.authToken!);
  }, [user.authToken]);

  delete addressData.__typename;
  const addressStringify = JSON.stringify(addressData);

  const isSubFlow = params?.get("subscription");

  const isValChanged = addressStringify !== JSON.stringify(form.getValues());

  let searchParams = new URLSearchParams(params!);

  useEffect(() => {
    return () => {
      NProgress.done();
    };
  }, [usePathname()]);

  const onSubmit = async (values: BasicFormInfo) => {
    if (isValChanged) {
      try {
        NProgress.start();
        setIsLoading(true);
        const updatewpCus = updateAddress(
          user.userData?.databaseId!,
          values,
          client,
          user.stripe
        );
        const updateUserData = updateUserDataAddress(
          user.userDataId!,
          user.userData?.databaseId!,
          values,
          client,
          user.stripe
        );

        const updateStripeCus = updateCustomer(values, user.stripe.cus_id);

        const [wpRes, stripeCus, updateUserDataRes] = await Promise.all([
          updatewpCus,
          updateStripeCus,
          updateUserData,
        ]);
        // Subscribe user
        if (values.subscribe) {
          mutate({
            email: user.userData?.email!,
            firstName: values.firstName,
            lastName: values.lastName,
          });
        }

        if ("errors" in wpRes || "errors" in updateUserDataRes) {
          throw new Error(wpRes.errors[0].message);
        } else if ("error" in stripeCus) {
          handleError(stripeCus.error);
          setIsLoading(false);
        } else {
          startTransition(() => {
            setIsLoading(false);
            toast.success("Address Updated");
            // Condition
            if (isSubFlow) {
              if (!params?.get("subscription")) {
                refresh();
                push("/subscribe");
              } else if (params.get("subscription") === "free") {
                // Pushing data to the dataLayer using type assertion // temporary solution
                (window as any).dataLayer.push({
                  event: "ClickedContinueInBasics",
                  itemType: "subscription",

                  userDataId: user.userDataId,
                  userState: addressData.state,
                  userCity: addressData.city,
                  userCountry: addressData.country,
                  userZip: addressData.zipcode,

                  stripeSubscriptionId: params!.get("subscription"), // this is the stripe subscription product id

                  // subscriptionValue: subValue, // TO DO mihai: discuss with hamzah how to get the sub value on the basics page
                });
                refresh();
                if (params?.get("courseSlug") && params?.get("redirectType")) {
                  push(createUrl(`/resources/${params?.get("courseSlug")}`, params));
                } else if (params?.get("courseSlug")) {
                  push(createUrl(`/courses/${params?.get("courseSlug")}`, params));
                } else {
                  searchParams.set("type", "free-subscription");
                  push(createUrl(`/complete`, searchParams));
                }
              } else {
                // Pushing data to the dataLayer using type assertion // temporary solution
                (window as any).dataLayer.push({
                  event: "ClickedContinueInBasics",
                  itemType: "subscription",

                  userDataId: user.userDataId,
                  userState: addressData.state,
                  userCity: addressData.city,
                  userCountry: addressData.country,
                  userZip: addressData.zipcode,

                  stripeSubscriptionId: params!.get("subscription"), // this is the stripe subscription product id

                  // subscriptionValue: subValue, // TO DO mihai: discuss with hamzah how to get the sub value on the basics page
                });
                searchParams.delete("subscription");
                refresh();
                push(
                  createUrl(
                    `checkout/${params.get("subscription")}`,
                    searchParams
                  )
                );
              }
            } else {
              refresh();
              if (isProductPurchase) {
                push(createUrl(`/checkout`, searchParams!));
              } else {
                // Scroll to top
                typeof window !== undefined && window.scrollTo(0, 0);
                if (type === "modal") {
                  searchParams.set(
                    "previousUserData",
                    JSON.stringify(addressData)
                  );
                }
                push(createUrl("/profile", searchParams));
              }
            }
          });
        }
      } catch (error) {
        authHandleErrors(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      startTransition(() => {
        if (!params?.get("subscription")) {
          refresh();
          push("/subscribe");
        } else if (params.get("subscription") === "free") {
          // Pushing data to the dataLayer using type assertion // temporary solution
          (window as any).dataLayer.push({
            event: "ClickedContinueInBasics",
            itemType: "subscription",

            userDataId: user.userDataId,
            userState: addressData.state,
            userCity: addressData.city,
            userCountry: addressData.country,
            userZip: addressData.zipcode,

            stripeSubscriptionId: params!.get("subscription"), // this is the stripe subscription product id

            // subscriptionValue: subValue, // TO DO mihai: discuss with hamzah how to get the sub value on the basics page
          });
          refresh();
          push(createUrl(`/profile`, searchParams));
        } else if (isProductPurchase) {
          refresh();
          push(createUrl(`/checkout`, searchParams!));
        } else {
          // console.log(createUrl(`checkout/${params?.get("subscription")}`,
          //   searchParams))
          // Pushing data to the dataLayer using type assertion // temporary solution
          (window as any).dataLayer.push({
            event: "ClickedContinueInBasics",
            itemType: "subscription",

            userDataId: user.userDataId,
            userState: addressData.state,
            userCity: addressData.city,
            userCountry: addressData.country,
            userZip: addressData.zipcode,

            stripeSubscriptionId: params!.get("subscription"), // this is the stripe subscription product id

            // subscriptionValue: subValue, // TO DO mihai: discuss with hamzah how to get the sub value on the basics page
          });
          searchParams.delete("subscription");
          refresh();
          push(
            createUrl(`checkout/${params?.get("subscription")}`, searchParams)
          );
        }
      });
    }
  };

  const countryStates = states.filter(
    (item: IState) => item.country_code === form.getValues("country")
  );
  const topCountries = ["US", "CA", "IT", "AU", "GB"];

  let hasState = countryStates.length > 0 ? true : false;

  return (
    <>
      <div className={cn("", className)}>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
            id="basic-info-form"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="!text-16" placeholder="First Name*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="!text-16" placeholder="Last Name*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="!text-16" placeholder="Address Line 1*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="!text-16" placeholder="Address Line 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className={"flex-1 " + `${form.getValues("country") === undefined ? 'text-[#7a828a]' : ''}`}>
                  <FormControl>
                    <Select
                      defaultValue={form.getValues("country")}
                      onValueChange={(value) => {
                        // setCountry(value);
                        if (
                          form.getValues("country") &&
                          countryStates.length === 0
                        ) {
                          form.clearErrors("state");
                        }
                        setisDisabled(!value);
                        field.onChange(value);
                      }}
                    // onValueChange={field.onChange}
                    // defaultValue={country}
                    >
                      <FormControl>
                        <SelectTrigger className="!text-16">
                          <SelectValue
                            className="!text-left"
                            placeholder="Country*"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="overflow-y-auto  scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-500 max-h-[10rem]"
                        align="start"
                      >
                        <SelectItem key={"US"} value={"US"}>
                          United States
                        </SelectItem>
                        <SelectItem key={"CA"} value={"CA"}>
                          Canada
                        </SelectItem>
                        <SelectItem key={"GB"} value={"GB"}>
                          United Kingdom
                        </SelectItem>
                        <SelectItem key={"AU"} value={"AU"}>
                          Australia
                        </SelectItem>
                        <SelectItem key={"IT"} value={"IT"}>
                          Italy
                        </SelectItem>
                        {countries.map(
                          (country: { country_code: string; name: string }) => {
                            if (topCountries.includes(country.country_code)) {
                              return null;
                            }

                            return (
                              <SelectItem
                                key={country.country_code}
                                value={country.country_code}
                              >
                                {country.name}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              <FormField
                control={form.control}
                name="state"
                key={form.watch("country")}
                render={({ field }) => (
                  <FormItem className={"flex-1 " + `${form.getValues("state") === undefined ? 'text-[#7a828a]' : ''}`}>
                    <FormControl>
                      <Select
                        defaultValue={
                          form.getValues("state") === "N/A"
                            ? ""
                            : form.getValues("state")
                        }
                        disabled={
                          isPending || !form.getValues("country") || !hasState
                        }
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger  className="!text-16 disabled:opacity-50">
                            <SelectValue
                              className="!text-left"
                              placeholder="State*"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          className="overflow-y-auto  scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-500 max-h-[10rem]"
                          align="start"
                        >
                          {countryStates.map((item: IState) => {
                            return item.country_code !==
                              form.getValues("country") ? null : (
                              <SelectItem key={item.id} value={item.state_code}>
                                {item.name}
                              </SelectItem>
                            );
                          })}

                          {/* {states && <SelectItem key={states.id} value={states.state_code}>
                          {states.name}
                        </SelectItem>} */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            }
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="!text-16" placeholder="City*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="!text-16" placeholder="ZIP / Postal Code*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="!text-16" type="tel" placeholder="Phone Number*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isSignup && (
              <FormField
                control={form.control}
                name="subscribe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start pt-4 space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="-mt-1 text-themeColor  ">
                        By checking, I agree to receive marketing emails to recieve updates. Unsubscribe link in emails.
                      </FormLabel>
                     
                    </div>
                  </FormItem>
                )}
              />
            )}
            <div className="flex justify-center mt-4 mb-4">
              <Button
                id={isSubFlow || isProductPurchase ? "Continue-Button-Basics" : "Update-Button-Basics"}
                // colors={"default"}
                // variant={"secondary"}
                className="mt-6"
                onClick={() => {
                  if (!hasState) {
                    // startTransition(() => {
                    form.setValue("state", "N/A");
                    // })
                  }
                }}
                isLoading={isLoading || isPending}
                disabled={
                  isLoading || isPending || (!isValChanged && !isSubFlow)
                }
                type="submit"
              >
                {isLoading && <Loader />}
                {isSubFlow || isProductPurchase ? "Continue" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default memo(BasicInfoForm);
