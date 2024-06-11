"use client";
import { FC, FormEvent, HTMLAttributes, useState, useTransition } from "react";
// Lib
import { RESET_PASSWORD } from "@/graphql/mutations";
import { client } from "@/lib/apolloClient";
// Utils
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  ResetPasswordFormType,
} from "@/lib/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { authHandleErrors } from "@/utils/authErrorHandling";

interface IProps extends HTMLAttributes<HTMLDivElement> { }

const ResetPassword: FC<IProps> = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');
  // Search Params
  const searchParams = useSearchParams();

  // 1. Define your form.
  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const { push } = useRouter();
  const onSubmit = async (values: ResetPasswordFormType) => {
    try {
      setIsLoading(true);
      const { data, errors } = await client.mutate({
        mutation: RESET_PASSWORD,
        variables: {
          key: searchParams?.get("key"),
          login: searchParams?.get("login"),
          password: values.password,
        },
        errorPolicy: "all",
      });

      if (errors) {
        throw errors;
      }
      startTransition(() => {
        setMessage("Password reset successfully");
        push("/log-in/");
      });
    } catch (error) {
      authHandleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" id="reset-password">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full">
            <Button
              size={"lg"}
              variant={"secondary"}
              className="w-full mt-4 font-bold"
              isLoading={isLoading || isPending}
              disabled={isLoading || isPending}
              type="submit"
            >
              {isLoading && <Loader />}
              Continue
            </Button>
            {
              message &&
              <p className="py-4 px-4 !mt-7 text-14 text-themeColor font-semibold rounded-xl bg-offgreen">{message}</p>
            }
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
