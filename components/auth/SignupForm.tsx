"use client";
// Lib
// Utils
import { cn } from "@/utils/shadcn";
import React, { FC, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signupFormSchema, SignupFormSchema } from "@/lib/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { authHandleErrors } from "@/utils/authErrorHandling";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils/url";
// Components
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
import { signupUser } from "@/features/login/signupRequest";
// reCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/features/reCaptcha";
import ActionButton from "../buttons/ActionButton";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
const SignupForm: FC<IProps> = ({ className }) => {
	// Loading
	const [isLoading, setIsLoading] = useState(false);
	const [isPending, startTransition] = useTransition();
	// reCAPTCHA
	const recaptchaRef = useRef<ReCAPTCHA>(null);
	// TEMP UPDATE FOR TESTING, MAKE IT FALSE LATER - Date: 23/04/2024

	const [isVerified, setIsverified] = useState<boolean>(false);

	// Search Params
	const searchParams = useSearchParams();

	const params = new URLSearchParams(searchParams?.toString());
	params.append("source", "signup");

	// 1. Define your form.
	const form = useForm<SignupFormSchema>({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			email: "",
		},
	});

	// 2. Check reCAPTCHA
	async function handleCaptchaSubmission(token: string | null) {
		// Server function to verify captcha
		await verifyCaptcha(token)
			.then(() => setIsverified(true))
			.catch(() => setIsverified(false));
	}

	const { push, refresh } = useRouter();
	const onSubmit = async (values: SignupFormSchema) => {
		refresh();
		if (isVerified) {
			try {
				setIsLoading(true);
				const res = await signupUser(values.email);

				if ("errors" in res) {
					throw new Error(res.errors[0].message);
				} else {
					startTransition(() => {
						setIsLoading(false);
						push(createUrl("basics", params));
						refresh();
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
		<>
			<div className={cn("", className)}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} id="signup-form">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Email Address"
											{...field}
											variant={"withOutlineV2"}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-center w-full mx-auto mt-6">
							<ReCAPTCHA
								sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
								ref={recaptchaRef}
								onChange={handleCaptchaSubmission}
								size="normal"
							/>
						</div>
						<div></div>
						<Button
							className="mt-6 flex items-center"
							align={"center"}
							isLoading={true || isPending}
							disabled={isLoading || !isVerified || isPending}
							type="submit"
						>
							{isLoading && <Loader />}
							Sign Up
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};

export default SignupForm;
