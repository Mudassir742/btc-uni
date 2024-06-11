"use client";
import React, { FC, HTMLAttributes } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from '../ui/Button';
import { cn } from '@/utils/shadcn';
import { useRouter } from 'next/navigation';
import { createUrl } from '@/utils/url';


interface IProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  message?: string
}
const UnlockPopup: FC<IProps> = ({
  className,
  defaultOpen = true,
  message = 'Enjoy your free resource.'
}) => {

  const { replace } = useRouter()
  const searchParams = new URLSearchParams(window.location.search)

  return (
    <Dialog onOpenChange={() => {
      searchParams.delete('courseSlug');
      searchParams.delete('redirectType');
      replace(createUrl(location.pathname, searchParams))
    }} defaultOpen={defaultOpen}>
      <DialogContent className={cn("sm:max-w-sm !py-10", className)}>
        <DialogHeader className='mx-auto'>
          <div className='flex justify-center'>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M78.1172 36.7188H36.7037V20.6582C36.7037 13.575 42.6617 7.8125 49.985 7.8125C57.3082 7.8125 63.2662 13.575 63.2662 20.6582V28.125H71.0787V20.6582C71.0787 9.26719 61.616 0 49.985 0C38.3539 0 28.8912 9.26719 28.8912 20.6582V36.7188H21.8672C15.4055 36.7188 10.1484 41.9758 10.1484 48.4375V88.2812C10.1484 94.743 15.4055 100 21.8672 100H78.1172C84.5789 100 89.8359 94.743 89.8359 88.2812V48.4375C89.8359 41.9758 84.5789 36.7188 78.1172 36.7188ZM82.0234 88.2812C82.0234 90.4352 80.2711 92.1875 78.1172 92.1875H21.8672C19.7133 92.1875 17.9609 90.4352 17.9609 88.2812V48.4375C17.9609 46.2836 19.7133 44.5312 21.8672 44.5312H78.1172C80.2711 44.5312 82.0234 46.2836 82.0234 48.4375V88.2812Z" fill="#523D34" />
              <path d="M49.9922 55.8594C46.001 55.8594 42.7656 59.0947 42.7656 63.0859C42.7656 65.6344 44.0859 67.873 46.0787 69.1598V77.7344C46.0787 79.8916 47.8275 81.6406 49.985 81.6406C52.1422 81.6406 53.8912 79.8916 53.8912 77.7344V69.1689C55.892 67.8838 57.2188 65.6406 57.2188 63.0859C57.2188 59.0947 53.9834 55.8594 49.9922 55.8594Z" fill="#523D34" />
            </svg>
          </div>
          <h2 className='text-themecolor-500 text-32 pt-2 font-semibold '>Access Unlocked!</h2>
          <p className='text-secondarythemecolor text-center font-semibold text-20'>{message}</p>

        </DialogHeader>

        {/* <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose> */}
      </DialogContent>
    </Dialog>
  )
}

export default UnlockPopup