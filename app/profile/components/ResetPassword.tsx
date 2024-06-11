'use client'
import { FC, HTMLAttributes, useState } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import toast from 'react-hot-toast'
import { authHandleErrors } from '@/utils/authErrorHandling'
import { SEND_PASSWORD_EMAIL } from '@/graphql/mutations'
import { client } from "@/lib/apolloClient";
// Components
import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/Button'


interface IProps extends HTMLAttributes<HTMLButtonElement> {
    email: string
}

const ResetPassword: FC<IProps> = ({ className, children, email, ...props }) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);

    const onSubmit = async () => {
        const now = new Date();
        if (lastRequestTime && (now.getTime() - lastRequestTime) < 60000) {
            toast.success('Email already sent, try again in a minute')
            return;
        }
        try {
            setLoading(true);
            const { data, errors } = await client.mutate({
                mutation: SEND_PASSWORD_EMAIL,
                variables: {
                    username: email,
                },
                errorPolicy: "all",
            });

            if (errors) {
                throw errors;
            }
            toast.success(
                // "Check your email for a link to reset your password. If it doesn’t appear within a few, please check your spam folder.",
                "Check your email for a link to reset your password. UPDATE: FEB 16, 2024: Our development team is aware the reset password emails are not being delivered. Please reach out to support if you need immediate assistance, otherwise we hope to resolve this issue shortly.",
                {

                    duration: 10000
                }
            );
            setLastRequestTime(now.getTime());
        } catch (error) {
            authHandleErrors(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Button
            disabled={loading}
            isLoading={loading}
            onClick={onSubmit} className={cn(["", className], {
                "cursor-not-allowed": loading
            })} {...props}>
            {children}
        </Button>
    )
}

export default ResetPassword