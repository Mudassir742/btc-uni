import { FC, HTMLAttributes, useEffect, useState, useTransition } from "react";
//  Types
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
	CheckoutProductsFormSchema,
	CheckoutSubscriptionFormSchema,
	formSchema,
} from "@/lib/schemas/checkoutFormSchema";
// Utils
import { cn } from "@/utils/shadcn";
// Components
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/Select";
// Lib

import Stripe from "stripe";
import { Checkbox } from "../ui/Checkbox";
import { ICountry, IState } from "@/interfaces";
import { createUrl } from "@/utils/url";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonText from "../text/ButtonText";

type Keys = keyof CheckoutSubscriptionFormSchema;

interface IProps extends HTMLAttributes<HTMLDivElement> {
	form: UseFormReturn<any>;
	initialShow?: boolean;
	cusCardData?: Stripe.PaymentMethod[];
	label: string;
	fieldNames: {
		useExistingAddress?: "useExistingAddress";
		email?: "email";
		name?: "username";
		address1: "address1" | "customerAddress1";
		address2: "address2" | "customerAddress2";
		state: "state" | "customerState";
		country: "country" | "customerCountry";
		city: "city" | "customerCity";
		zipCode: "zipcode" | "customerZipcode";
		phone: "phone" | "customerPhone";
	};
}

const BillingInfoFields: FC<IProps> = ({
	className,
	initialShow = true,
	form,
	cusCardData,
	fieldNames,
	label,
	...props
}) => {
	const [isDisabled, setisDisabled] = useState(false);

	// Loading
	const [isLoading, setIsLoading] = useState(false);
	const [isPending, startTransition] = useTransition();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

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

	const newSearchParams = new URLSearchParams(searchParams!);

	let hasState =
		states.filter((item: IState) => item.country_code === form.watch("country"))
			.length > 0;

	return (
		<div className={cn("", className)} {...props}>
			<div className="mt-6">
				<h2 className="font-bold text-15 !text-lightgrey">{label}</h2>
				<div className="flex flex-col mt-5 gap-y-5">
					{fieldNames.useExistingAddress && (
						<FormField
							control={form.control}
							name={fieldNames.useExistingAddress as "useExistingAddress"}
							render={({ field }) => (
								<FormItem className="flex items-center gap-2">
									<FormControl>
										<Checkbox
											className="text-themeColor"
											checked={field.value as boolean}
											// onCheckedChange={field.onChange as any}
											onCheckedChange={(e) => {
												setisDisabled(!isDisabled);
												field.onChange(e);
											}}
										/>
									</FormControl>
									<div className="leading-none pb-2">
										<FormLabel>
											<ButtonText text="Use Existing Address" />{" "}
										</FormLabel>
									</div>
								</FormItem>
							)}
						/>
					)}

					{!isDisabled && (
						<>
							<FormField
								control={form.control}
								name={fieldNames.address1 as "address1" | "address2"}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												variant={"withOutline"}
												placeholder="Street Address Line 1"
												{...field}
											/>
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
											<Input
												variant={"withOutline"}
												placeholder="Street Address Line 2"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* ⁡⁢⁣⁢​‌‍country​⁡  */}
							<div className="flex gap-x-3">
								<FormField
									control={form.control}
									name="country"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Select
													{...field}
													defaultValue={form.getValues("country")}
													onValueChange={(value) => {
														form.setValue("state", "");
														states.filter(
															(item: IState) => item.country_code === value
														).length > 0
															? (hasState = true)
															: (hasState = false);

														if (!hasState) {
															newSearchParams.set("noState", "true");

															replace(
																createUrl(location.pathname, newSearchParams!),
																{
																	scroll: false,
																}
															);
														} else {
															newSearchParams.delete("noState");

															replace(
																createUrl(location.pathname, newSearchParams!),
																{
																	scroll: false,
																}
															);
														}
														setisDisabled(!value);
														field.onChange(value);
													}}
												>
													<FormControl>
														<SelectTrigger
															className={cn(["outlineSelect"], {
																"text-lightgrey": !form.getValues("country"),
															})}
														>
															<SelectValue
																className="!text-left"
																placeholder="Country"
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
															(country: {
																country_code: string;
																name: string;
															}) => {
																const topCountries = [
																	"US",
																	"CA",
																	"GB",
																	"AU",
																	"IT",
																];
																if (
																	topCountries.includes(country.country_code)
																) {
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

								{/* State */}
								<FormField
									control={form.control}
									name="state"
									key={form.watch("country")}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Select
													{...field}
													disabled={
														isPending || !form.getValues("country") || !hasState
													}
													onValueChange={(value) => {
														field.onChange(value);
													}}
												>
													<FormControl>
														<SelectTrigger
															className={cn(
																["outlineSelect disabled:opacity-50"],
																{
																	"text-lightgrey": !form.getValues("state"),
																}
															)}
														>
															<SelectValue
																className="!text-left"
																placeholder="State"
															/>
														</SelectTrigger>
													</FormControl>
													<SelectContent
														className="overflow-y-auto  scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-500 max-h-[10rem]"
														align="start"
													>
														{states.map((item: IState) => {
															// console.log(item.country_code, form.getValues("country"))
															return item.country_code !==
																form.getValues("country") ? null : (
																<SelectItem
																	key={item.id}
																	value={item.state_code}
																>
																	{item.name}
																</SelectItem>
															);
														})}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex gap-x-3 w-full">
								<FormField
									control={form.control}
									name="city"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input
													variant={"withOutline"}
													placeholder="City"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="zipcode"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input
													variant={"withOutline"}
													placeholder="Zipcode"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												variant={"withOutline"}
												placeholder="Phone Number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default BillingInfoFields;
