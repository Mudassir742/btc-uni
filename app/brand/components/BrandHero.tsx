import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { getBrandHero } from '../helper';
import { Brand } from '@/interfaces';
import Link from 'next/link';

interface BrandHeroProps {
    params: { slug: string };
}

const BrandHero: React.FC<BrandHeroProps> = async ({ params }: BrandHeroProps) => {

    // Necessary states and refs
    // const [screen, setScreen] = useState<number>(0)
    // const [hero, setHero] = useState<Brand | null>()
    // const titleRef = useRef<HTMLParagraphElement>(null);
    // const [titleWidth, setTitleWidth] = useState<number>(0);

    // Fetching the brand hero data
    // useEffect(() => {
    // const fetchBrandHero = async () => {
    const data = getBrandHero(params.slug)
    const hero = await data
    // setHero(data)
    //     }
    //     fetchBrandHero()
    // }, [params.slug]);

    // Effect to measure the title width
    // useEffect(() => {
    //     if (titleRef.current) {
    //         setTitleWidth(titleRef.current.offsetWidth);
    //     }
    // }, [hero]);

    return (
        <div className='mt-8 mb-16'>
            {hero && (
                <div className='lg:h-96 rounded-3xl py-12 bg-themecolor-100 flex gap-10 flex-col lg:flex-row justify-between items-center overflow-hidden'>
                    <div className='lg:w-1/2 flex justify-center items-center'>
                        <Image id='heroLogo' width={400} height={400} src={`${hero?.brandmetadata.logo.sourceUrl}`} alt={`${hero?.title} Logo`} />
                    </div>
                    <div className='lg:w-1/2 h-56 lg:h-auto'>
                        <div className='h-[800px] w-[800px] rounded-full bg-themecolor-500 flex justify-center items-center'>
                            <div className='h-[700px] w-[700px] rounded-full bg-[#614e45] flex justify-center lg:justify-start lg:items-center'>
                                <div className='mt-10 lg:mt-0 lg:ml-10 w-2/3 flex flex-col items-center'>
                                    <p  className='text-28 lg:text-[42px] font-medium text-white'>{hero?.title}</p>
                                    {hero.brandmetadata.externalUrl && <Link href={hero.brandmetadata.externalUrl} target='_blank' className='text-secondarythemecolor text-16 underline'>
                                        {hero.brandmetadata.externalUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                    </Link>}
                                    <div className='flex items-center my-6'>
                                        <div className='bg-white w-2 h-2 rounded-full' />
                                        {/* <div className='bg-white h-[2px]' style={{ width: titleWidth }} /> */}
                                        <div className='bg-white h-[2px] w-60' />
                                        <div className='bg-white w-2 h-2 rounded-full' />
                                    </div>
                                    <div className='flex items-center'>
                                        {hero.brandmetadata.instagramLink &&
                                            <Link href={hero.brandmetadata.instagramLink} target='_blank'><Image className='p-3' width={50} height={50} src='/instagramBrandHero.svg' alt='Instagram Link' /></Link>
                                        }
                                        {hero.brandmetadata.facebookLink &&
                                            <Link href={hero.brandmetadata.facebookLink} target='_blank'><Image width={50} height={50} src='/facebookBrandHero.svg' alt='Facebook Link' /></Link>
                                        }
                                        {hero.brandmetadata.youtubeLink &&
                                            <Link href={hero.brandmetadata.youtubeLink} target='_blank'><Image width={50} height={50} src='/youtubeBrandHero.svg' alt='Youtube Link' /></Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BrandHero;
