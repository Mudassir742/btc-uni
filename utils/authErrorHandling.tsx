import { Button } from "@/components/ui/Button";
import Link from "next/link";
import toast from "react-hot-toast";

const alreadyRegisteredErrors = [
  "This email address is already registered",
  "This username is already registered",
];

const loginErrors = [
  "Error: The password you entered for the email address",
  "Unknown email address. Check again or try your username.",
  "The user could not be logged in."
];
export const authHandleErrors = (e: unknown) => {
  if (e instanceof Error) {
    const errorMessageForExisitngUser = alreadyRegisteredErrors.some((msg) =>
      e.message.includes(msg)
    );

    if (errorMessageForExisitngUser) {
      typeof toast.error === "function" &&
        toast?.error(
          <div className=" ">
            This email address is already registered

            {/* <Button>
              log in
            </Button> */}
          </div>
          );
      return
      
      "This email address is already registered";
    } else if (
      e.message === `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
    ) {
      typeof toast.error === "function" && toast?.error("Something went wrong");
      return "Something went wrong";
    } else if (loginErrors.some((msg) => e.message.includes(msg))) {
      typeof toast.error === "function" &&
        toast?.error(
          <div >
            <p>
              Invalid email or password.{" "}
              <Link
                href={`/forgot-password/`}
                className="text-blue-500 underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        );
      return "Invalid email or password";
    } else {
      typeof toast.error === "function" && toast?.error(e.message);
      return e.message;
    }
  } else if (typeof e === "string") {
    console.log(e);
    typeof toast.error === "function" && toast?.error(e);
    return e;
  } else if (Array.isArray(e)) {
    typeof toast.error === "function" &&
      toast.error(e[0]?.message ?? "Something went wrong");
    console.log(e[0]?.message ?? "Something went wrong");
    return e[0]?.message ?? "Something went wrong";
  } else {
    typeof toast.error === "function" && toast.error("unexpected server error");
    console.log(e);
    return "unexpected server error";
  }
};
