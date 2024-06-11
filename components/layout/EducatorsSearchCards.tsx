import { FC, HTMLAttributes } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
// Components
import Image from 'next/image'
import { Educator } from '@/interfaces';
import Link from 'next/link';
import ParagraphText from '../text/Paragraph';
import ButtonText from '../text/ButtonText';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  filteredEducators: {
    educator: Educator; 
    numberOfCourses: number;
    
  }[],
  variant?: "popup" | "sidebar";
  onClick?: () => void;
}

const EducatorsSearchCards: FC<IProps> = ({ className, variant = "popup", onClick, filteredEducators, ...props }) => {
  return (
    <div className={cn(" min-w-[30rem]", className)} {...props}>
      <h2 className='text-24 text-themeColor font-semibold mb-5'>
        Educator
      </h2>
      {filteredEducators.map((item, i) => {
        return (
          <div key={i} onClick={onClick}  >
            <Link href={`/educator/${item.educator.slug}`} >

              <div className='flex justify-between gap-x-2' >
                <div className='flex gap-x-4 items-center'>
                  <Image
                    height={65}
                    width={65}
                    className='rounded-full h-16 w-16 object-cover object-top shrink-0'
                    alt={item.educator.title} src={item.educator?.educatorMetaData?.educatorpicture?.mediaItemUrl || "/placeholder.png"}
                  />
                  <div className={cn([], {
                    'overflow-hidden': variant === "sidebar"
                  
                  })}>
                    <ButtonText text={item.educator.educatorMetaData.instahandle || ""} className='text-secondarythemecolor' />

                
                      <ParagraphText text={item.educator.title} />
                      
                
                  </div>

                </div>
                {/* <div className='items-center text-secondarythemecolor text-xs underline flex-grow justify-end pr-1 flex nowrap'>

                  {item.numberOfCourses} Courses

                </div> */}

                <div className='text-xs  text-secondarythemecolor  underline mt-2 whitespace-pre'>
                  {item.numberOfCourses} Courses
                </div>
              </div>
              {/* Divider */}
              {
                i !== filteredEducators.length - 1 &&
                <div className='h-0.5 w-full bg-lightgreyV2 my-3'></div>
              }

            </Link>
          </div>
        )
      })}
    </div>

  )
}

export default EducatorsSearchCards