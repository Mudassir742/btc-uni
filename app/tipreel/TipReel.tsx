'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/DialogV2"
import { Educator, Tip } from '@/interfaces'
import Image from 'next/image'
import { Home } from 'lucide'
import { CrossIcon, HomeIcon, X } from 'lucide-react'
import { Metadata } from 'next'
import { AspectRatio } from "@/components/ui/aspect-ratio"

// interface IProp {
//   tipTitle: string
//   tipCourse: string
//   tipEduator: Educator[]
// }

export const metadata: Metadata = {
  robots: {
    index: false
  }
}

const reel = [
  { color: 'bg-slate-600', text: 'video 1' },
  { color: 'bg-orange-500', text: 'video 2' },
  { color: 'bg-pink-300', text: 'video 3' },
]
const TipReel = ({ tip }: { tip: Tip[] }) => {

  // const tipTitle = tip.title
  // const tipCourse = tip.tipmetadata.tipCourse.title
  // const tipEduator = tip.tipmetadata.tipEducator

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      setScrollDirection('down');
      setCurrentIndex(prev => {
        if (prev! < reel.length - 1) {
          return prev! + 1
        }
        return prev
      })
    } else if (event.deltaY < 0) {
      setScrollDirection('up');
      setCurrentIndex(prev => prev && prev - 1)
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={(val) => setIsOpen(!isOpen)} >
      {tip.map((item, index) => {
        return (
          <DialogTrigger className='mx-4' onClick={() => setCurrentIndex(index)} key={index}>video {index + 1}</DialogTrigger>
        )
      })}
      <DialogContent className='h-full p-0 bg-transparent border-transparent'>

        <div className='h-full overflow-y-scroll scrollbar-hide snap-mandatory snap-y space-y-4 '>
          {
            tip.map((item, index) => {
              if (currentIndex! > index) {
                return null
              }
              return (
                <>
                  {index === 0 && <p className='h-1'></p>}
                  <div key={index} onScroll={handleScroll} className='snap-always  snap-start bg-transparent h-full  mx-auto w-full'>
                    <div className='relative w-[23rem] md:w-[19rem]   h-full mx-auto flex justify-center '>

                      <AspectRatio className='relative  flex flex-col   justify-center' ratio={16 / 9}>
                        <div className='relative'>
                          <X onClick={() => setIsOpen(false)} className='absolute z-50 right-2 top-2 text-white cursor-pointer text-xl m-2' />
                          <div className='absolute h-fit w-full z-0'>
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-blackV2 via-blackV2/50  to-blackV2/0 h-full -z-10" />
                            <h2 className="w-full text-white z-10 text-15 px-6 py-2 md:px-5 md:py-2 !pr-10">
                              {item.title}
                            </h2>
                          </div>

                          {/* <div className="absolute w-96 h-96 z-10 left-0 top-0 bg-red-500 "> */}
                          <iframe
                            src={`https://player.vimeo.com/video/${item.tipmetadata.video}`}
                            className="w-[23rem] md:w-[19rem] h-[calc(23rem*16/9)] md:h-[calc(19rem*16/9)]  "
                          />
                          <div className="absolute z-0 pb-3 bottom-0 text-white px-6 py-2 md:px-5 md:py-2 w-full">
                            <div className="absolute inset-0 bg-gradient-to-b from-blackV2/0 via-blackV2/50  to-blackV2 h-full -z-10 w-full" />
                            <div className='z-0'>

                              <div className='flex items-center gap-2 w-full  '>
                                {item.tipmetadata.tipEducator.map(educator => (
                                  <div key={educator.slug} className='shrink-0 flex gap-x-2 items-center'>
                                    <Image
                                      src={educator.educatorMetaData.educatorpicture?.mediaItemUrl || ""}
                                      alt={educator.educatorMetaData.instahandle}
                                      width={42} height={42}
                                      className=" object-cover rounded-full w-8 h-8 shrink-0"
                                    />
                                    <p className='shrink-0 '>
                                      {educator.title}
                                    </p>
                                  </div>
                                ))}

                              </div>
                              {item.tipmetadata.tipCourse ?
                                <p
                                  key={index}
                                  className='text-14 mt-2 pb-4 text-secondarythemecolor font-semibold underline'>{`Watch The Course: ${item.tipmetadata.tipCourse.title}`}</p>
                                : <div className='w-full h-4'></div>}
                            </div>
                          </div>
                        </div>
                        {/* </div> */}
                      </AspectRatio>

                    </div>

                  </div>
                </>
              )
            })
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TipReel