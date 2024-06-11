"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from "@/components/shared/ui/Alert";
// import { AlertCircle } from "lucide-react"; Mihai commented out as it doesn't seem to be used
import { notFound } from "next/navigation";
import { MouseEvent, useState, useTransition } from "react";
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { createReport } from "@/lib/services/actions/createReport";




const reportSchema = z.object({
  email: z.string().email(),
  message: z.string().refine((message) => message.length > 15, "Message should contain at least 15 character(s)")
})

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const [formModel, setFormModel] = useState(false)
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string[]>();

  const { push } = useRouter()
  const [pending, startTransition] = useTransition()

  const handleSubmit = async () => {
    const validatedFields = reportSchema.safeParse({ email, message })

    startTransition(() => {
      if (validatedFields.success) {
        createReport(email, message)
        push('/')
      } else {
        console.log(validatedFields.error.errors)
        setStatus(validatedFields.error.errors.map(err => err.message));
      }
    })
  };


  return (
    <div>
      {error?.message === "NEXT_NOT_FOUND" ? (
        notFound()
      ) : (
        <>
          {error?.message ?
            'Error, please refresh the page.'
            : "Somthing went wrong"}

          <button
            className="mt-4 text-sm font-semibold text-white bg-blue-500 rounded-md px-3 py-1.5 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>

          <Dialog defaultOpen={true}>
            <DialogContent className="sm:w-auto">

              {!formModel ? (
                <>
                  <div className="mb-4">
                    <p className="text-themecolor-500 text-center text-32 font-semibold mb-0">We apologize,</p>
                    <p className="text-themecolor-500 text-16 text-center">There has been an error. Please refresh the page.</p>
                  </div>
                  <div className="text-center">
                    <Button className="mb-4" onClick={() => reset()}>Refresh</Button>
                    <Button variant={"outline"} onClick={() => setFormModel(true)}>Report</Button>
                  </div>

                </>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-themecolor-500 text-center text-32 font-semibold mb-0">Send Us a Report</p>
                    <p className="text-themecolor-500 text-16 text-center">There has been an error. Please refresh the page.</p>
                  </div>

                  <>
                    <div className="bg-themecolor-50 flex items-center gap-2 border border-themecolor-500 rounded-full px-5">
                      <Mail />
                      <Input name="email" type="email" className="bg-themecolor-50" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <Textarea name="message" className="bg-themecolor-50 flex items-center gap-2 border border-themecolor-500 rounded-2xl px-5 py-2" placeholder="Your Message goes here..." onChange={(e) => setMessage(e.target.value)} />

                    <Button
                      disabled={pending}
                      onClick={handleSubmit}
                      className="mb-4"
                    >Submit</Button>
                  </>

                  <div className="w-[350px]">
                    {status?.map((status, i) => <p key={i} className="text-red-500">{status}</p>)}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

        </>
      )}
    </div>
  );
}