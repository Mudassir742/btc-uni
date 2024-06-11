"use client";
import React, { FormEvent, useRef, useState, useTransition } from "react";
// Lib
import { SEND_PASSWORD_EMAIL } from "@/graphql/mutations";
import { client } from "@/lib/apolloClient";
// Utils
import ReCAPTCHA from "react-google-recaptcha";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  ForgotPasswordFormType,
} from "@/lib/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/features/login/loginRequest";
import { authHandleErrors } from "@/utils/authErrorHandling";
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
import ActionButton from "../buttons/ActionButton";

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState<string>('')
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  // Search Params
  const searchParams = useSearchParams();

  // 1. Define your form.
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormType) => {
    try {
      setIsLoading(true);
      const { data, errors } = await client.mutate({
        mutation: SEND_PASSWORD_EMAIL,
        variables: {
          username: values.email,
        },
        errorPolicy: "all",
      });

      if (errors) {
        throw errors;
      }
      setMessage(
        "Check your email for a link to reset your password. If it doesn’t appear within 5-10 minutes, check your spam folder.",
      );
      form.reset();
    } catch (error) {
      authHandleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" id="forgot-password-form">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full mt-3">
          <Button

            className="w-full mt-4"
            isLoading={isLoading || isPending}
            disabled={isLoading || isPending}
            type="submit"
          >
            {isLoading && <Loader />}
            Continue
          </Button>
          {
            message && (
              <p className="py-4 px-4 !mt-7 text-14 text-themeColor font-semibold rounded-xl bg-offgreen">{message}</p>
            )
          }
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
