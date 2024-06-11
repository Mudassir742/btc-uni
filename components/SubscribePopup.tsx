import React from 'react'
import { Button } from './ui/Button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/Dialog'
import { boolean } from 'zod'

interface IProp {
    children?: React.ReactNode | undefined,
    slug?: string | undefined,
    V2?: boolean,
    onUserClickSubscribe?: () => void,
    defaultOpen?: boolean
}

const SubscribePopup = ({ children, slug, onUserClickSubscribe, V2, defaultOpen = false }: IProp) => {

    const perks = ['250 + Pro Tutorials', 'NEW! Downloadable Library', '75+ Industry Experts', 'New Content Added Weekly', 'Personalized Certificates of Completion']

    return (
        <Dialog defaultOpen={defaultOpen}>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className='rounded-3xl pt-8 pb-6 px-12 max-w-lg'>
                <DialogHeader>
                    <DialogTitle className='text-themecolor-500 !text-28 font-semibold mb-6 '>Subscribe to unlock!</DialogTitle>
                    <DialogDescription>
                        <ul>
                            {perks.map((perk, index) => (
                                <li key={index} className='flex gap-4 items-center mb-4 '>
                                    <CheckCircle2 size={24} color="rgba(82, 61, 52, 1)"
                                        absoluteStrokeWidth
                                        className='shrink-0'
                                    />
                                    <p className='!text-themecolor-500 text-18 text-left font-medium leading-6'>
                                        {perk}
                                    </p>
                                </li>

                            ))}

                        </ul>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="justify-center">
                    <div className='flex justify-center -mt-1 mx-auto'>
                        <Link id="Sub-Button-Course-Page-No-Alt" href={{
                            pathname: '/subscribe',
                            query: { courseSlug: slug, redirectType: V2 === true && "resources" },
                        }} onClick={onUserClickSubscribe}>
                            <DialogClose asChild>
                                <Button size={'sm'} className='px-10'>  See Plans</Button>
                            </DialogClose>
                        </Link>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SubscribePopup