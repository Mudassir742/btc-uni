import { z } from "zod";

export const formSchema = z
  .object({
    subscriptionId: z.string(),
    forAnotherUser: z.boolean().default(true),
    couponCode: z.string().optional(),
    "recipient-email": z
      .string()
      .email({ message: "Invalid email" })
      .or(z.literal(undefined)),
    "activate-immediately": z.boolean().default(true),
    "activation-date": z.date().or(z.literal(undefined)),
    message: z.string().or(z.literal(undefined)),
    saveCard: z.boolean().default(false),
    existingCardId: z.string().optional(),
    useExistingAddress: z.boolean().default(false),
    address1: z.string().optional(),
    address2: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    zipcode: z.string().optional(),
    phoneNumber: z
      .string()
      // .regex(
      //   /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      //   "Invalid phone number"
      // )
      .or(z.literal(""))
      .optional(),
    customerPhoneNumber: z
      .string()
      // .regex(
      //   /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      //   "Invalid phone number"
      // )
      .or(z.literal(""))
      .optional(),
    textNotificationPreference: z.boolean().default(false).optional(),
    newCardInfo: z.boolean(),
    isGiftedBySomeone: z.boolean().optional(),
  })
  .superRefine((values, ctx) => {
    switch (true) {
      case !values["activation-date"] && !values["activate-immediately"]:
        ctx.addIssue({
          message: "Date is required",
          code: z.ZodIssueCode.custom,
          path: ["activation-date"],
        });


      case values["newCardInfo"] &&
        !values["address1"] &&
        !values["isGiftedBySomeone"] &&
        !values["useExistingAddress"]:
        ctx.addIssue({
          message: "Address is required",
          code: z.ZodIssueCode.custom,
          path: ["address1"],
        });

      // case values["newCardInfo"] &&
      //   !values["state"] &&
      //   !values["isGiftedBySomeone"] &&
      //   !values["useExistingAddress"]:
      //   ctx.addIssue({
      //     message: "State is required",
      //     code: z.ZodIssueCode.custom,
      //     path: ["state"],
      //   });

      case values["newCardInfo"] &&
        !values["country"] &&
        !values["isGiftedBySomeone"] &&
        !values["useExistingAddress"]:
        ctx.addIssue({
          message: "Country is required",
          code: z.ZodIssueCode.custom,
          path: ["country"],
        });

      case values["newCardInfo"] &&
        !values["city"] &&
        !values["isGiftedBySomeone"] &&
        !values["useExistingAddress"]:
        ctx.addIssue({
          message: "City is required",
          code: z.ZodIssueCode.custom,
          path: ["city"],
        });

      case values["newCardInfo"] &&
        !values["zipcode"] &&
        !values["isGiftedBySomeone"] &&
        !values["useExistingAddress"]:
        ctx.addIssue({
          message: "Zip code is required",
          code: z.ZodIssueCode.custom,
          path: ["zipcode"],
        });

      case values["newCardInfo"] &&
        !values["phoneNumber"] &&
        !values["isGiftedBySomeone"] &&
        !values["useExistingAddress"]:
        ctx.addIssue({
          message: "Phone number is required",
          code: z.ZodIssueCode.custom,
          path: ["phoneNumber"],
        });
      // Customer data
      case values["textNotificationPreference"] === true &&
        !values["customerPhoneNumber"]:
        ctx.addIssue({
          message: "Please enter your phone number",
          code: z.ZodIssueCode.custom,
          path: ["customerPhoneNumber"],
        });
    }
  });

export const checkoutProductformSchema = z
  .object({
    forAnotherUser: z.boolean().default(true),
    couponCode: z.string().optional(),
    "recipient-email": z
      .string()
      .email({ message: "Invalid email" })
      .or(z.literal(undefined)),
    "activate-immediately": z.boolean().default(true),
    message: z.string().or(z.literal(undefined)),
    saveCard: z.boolean().default(false),
    existingCardId: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    zipcode: z.string().optional(),
    useExistingAddress: z.boolean().default(false),
    phoneNumber: z
      .string()
      // .regex(
      //   /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      //   "Invalid phone number"
      // )
      .or(z.literal(""))
      .optional(),
    customerPhoneNumber: z
      .string()
      .regex(
        /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number"
      )
      .or(z.literal(""))
      .optional(),
    textNotificationPreference: z.boolean().default(false).optional(),
    newCardInfo: z.boolean(),
    isGiftedBySomeone: z.boolean().optional(),
  })
  .superRefine((values, ctx) => {
    if (values["forAnotherUser"] && !values["recipient-email"]) {
      ctx.addIssue({
        message: "Email is required",
        code: z.ZodIssueCode.custom,
        path: ["recipient-email"],
      });
    }

    if (values["newCardInfo"] && !values["address1"] && !values["isGiftedBySomeone"] && !values["useExistingAddress"]) {
      ctx.addIssue({
        message: "Address is required",
        code: z.ZodIssueCode.custom,
        path: ["address1"],
      });
    }

    if (values["newCardInfo"] && !values["state"] && !values["isGiftedBySomeone"] && !values["useExistingAddress"]) {
      ctx.addIssue({
        message: "State is required",
        code: z.ZodIssueCode.custom,
        path: ["state"],
      });
    }

    if (values["newCardInfo"] && !values["country"] && !values["isGiftedBySomeone"] && !values["useExistingAddress"]) {
      ctx.addIssue({
        message: "Country is required",
        code: z.ZodIssueCode.custom,
        path: ["country"],
      });
    }

    if (values["newCardInfo"] && !values["city"] && !values["isGiftedBySomeone"] && !values["useExistingAddress"]) {
      ctx.addIssue({
        message: "City is required",
        code: z.ZodIssueCode.custom,
        path: ["city"],
      });
    }

    if (values["newCardInfo"] && !values["zipcode"] && !values["isGiftedBySomeone"] && !values["useExistingAddress"]) {
      ctx.addIssue({
        message: "Zip code is required",
        code: z.ZodIssueCode.custom,
        path: ["zipcode"],
      });
    }

    if (values["newCardInfo"] && !values["phoneNumber"] && !values["isGiftedBySomeone"] && !values["useExistingAddress"]) {
      ctx.addIssue({
        message: "Phone number is required",
        code: z.ZodIssueCode.custom,
        path: ["phoneNumber"],
      });
    }

    if (values["textNotificationPreference"] === true && !values["customerPhoneNumber"]) {
      ctx.addIssue({
        message: "Please enter your phone number",
        code: z.ZodIssueCode.custom,
        path: ["customerPhoneNumber"],
      });
    }
  });


export type CheckoutSubscriptionFormSchema = z.infer<typeof formSchema>;
export type CheckoutProductsFormSchema = z.infer<
  typeof checkoutProductformSchema
>;
