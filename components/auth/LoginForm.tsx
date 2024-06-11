"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FC,
  FormEvent,
  HTMLAttributes,
  useRef,
  useState,
  useTransition,
} from "react";

// Utils
import ReCAPTCHA from "react-google-recaptcha";
import { cn } from "@/utils/shadcn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCaptcha } from "@/features/reCaptcha";
import { signupUser } from "@/features/login/signupRequest";
import { authHandleErrors } from "@/utils/authErrorHandling";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { loginFormSchema, LoginFormSchema } from "@/lib/schemas/loginFormSchema";
import { loginUser } from "@/features/login/loginRequest";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createUrl } from "@/utils/url";
import ReviewCaption from "../text/ReviewCaption";
import Link from "next/link";

interface IProps extends HTMLAttributes<HTMLDivElement> { }

const LoginForm: FC<IProps> = ({ className, ...props }) => {
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  // reCAPTCHA
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  // TEMP UPDATE FOR TESTING, MAKE IT FALSE LATER - Date: 23/04/2024
  const [isVerified, setIsverified] = useState<boolean>(false);
  // Search Params
  const searchParams = useSearchParams();

  // 1. Define your form.
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // 2. Check reCAPTCHA
  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

  const isPurchaseItemFlow = !!searchParams?.get("pid");

  const { push, refresh } = useRouter();
  const onSubmit = async (values: LoginFormSchema) => {
    if (isVerified) {
      try {
        setIsLoading(true);
        const res = await loginUser(values);

        if ("errors" in res && res.errors.length > 0) {
          throw new Error(res.errors[0].message);
        } else {
          startTransition(() => {
            refresh()
            setIsLoading(false);
            const customSearchPrams = new URLSearchParams(searchParams!);
            let pathName = customSearchPrams.get("redirectUrl");
            if (pathName) {
              customSearchPrams.delete("redirectUrl")
              push(createUrl(`${pathName}`, customSearchPrams));
            } else if (isPurchaseItemFlow) {
              push(createUrl("/basics", customSearchPrams));
            } else if (customSearchPrams.get("subscription")?.startsWith("prod_")) {
              push(createUrl("/basics", customSearchPrams));
            }
            else {
              // push(createUrl("/", customSearchPrams));
              window.location.href = createUrl("/", customSearchPrams);
            }
          });
        }
      } catch (error) {
        authHandleErrors(error);
        setIsLoading(false);
      }
    } else {
      toast.error("Please verify you are not a robot.");
    }
  };

  return (
    <div className={cn("", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" id="login-form">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email Address" {...field} variant={"withOutlineV2"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" variant={"withOutlineV2"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-grow justify-end">

            <Link href='/forgot-password'>
              <ReviewCaption text="Forgot Password?" className="text-themeColor underline" />
            </Link>
          </div>
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex gap-x-3 items-center !mt-6">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={
                      field.onChange as (check: CheckedState) => void
                    }
                  />
                </FormControl>
                <FormLabel className="!-mt-0">Remember me</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center w-full mx-auto mt-8">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
            />
          </div>
          <div className="flex justify-center w-full mt-6">
            <Button
              isLoading={isLoading || isPending}
              disabled={isLoading || !isVerified || isPending}
              type="submit"

              className="mt-4"
            >
              {isLoading && <Loader />}
              Log In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
