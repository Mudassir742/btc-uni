import * as z from "zod";

export const basicFormInfoSchema = z.object({
  address1: z.string().refine(
    (val) => {
      return val !== "";
    },
    { message: "This field is required" }
  ),
  address2: z.string(),
  // dob: z.date({
  //   required_error: "A date of birth is required.",
  // }),
  country: z
    .string({
      errorMap: () => ({ message: "This field is required" }),
    })
    .refine(
      (val) => {
        return val !== "" || val !== undefined;
      },
      { message: "This field is required" }
    ),
  city: z.string().refine(
    (val) => {
      return val !== "";
    },
    { message: "This field is required" }
  ),
  state: z
    .string({
      errorMap: () => ({ message: "This field is required" }),
    })
    .refine(
      (val) => {
        return val !== "";
      },
      { message: "This field is required" }
    ),
  zipcode: z.string().refine(
    (val) => {
      return val !== "";
    },
    { message: "This field is required" }
  ),
  firstName: z.string()
    .min(1, { message: 'This field is required' })
    .refine(
      (val) => {
        const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        console.log(specialCharacterRegex.test(val))
        return !specialCharacterRegex.test(val)
      },
      { message: 'It should not contain any special characters' }
    ),
  lastName: z.string()
    .min(1, { message: 'This field is required' })
    .refine(
      (val) => {
        const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        console.log(specialCharacterRegex.test(val))
        return !specialCharacterRegex.test(val)
      },
      { message: 'It should not contain any special characters' }
    ),
  phone: z.string().refine(
    (val) => {
      return val !== "";
    },
    { message: "This field is required" }
  ),
  subscribe: z.boolean().default(false).optional(),
});

export type BasicFormInfo = z.infer<typeof basicFormInfoSchema>;
