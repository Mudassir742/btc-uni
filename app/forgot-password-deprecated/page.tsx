// import UnAuthContent from "../../components/UnAuthContent";
// import SendPasswordResetEmailForm from "../../components/SendPasswordResetEmailForm";

// export default function ForgotPassword() {
//   return (
//     <main >
// <div className="py-8 px-4 sm:px-20 w-full sm:w-3/4 mx-auto">
    
//         <SendPasswordResetEmailForm />
    
//       </div>
      
//     </main>
//   )
// }

// above deprecated and replaced with Hamzahs code on Oct 3

import React, { Suspense } from "react";

// Components
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const page = async () => {
  return (
    <>
      <div className="max-w-md px-3 py-4 bg-white shadow">
        <h1 className="font-normal text-center text-36">Forgot Password</h1>
        <div className="mt-6">
          <ForgotPasswordForm />
        </div>
      </div>
    </>
  );
};

export default page;

