import Image from 'next/image'
import React from 'react'
import { getBrandAll } from '../helper'
import Link from 'next/link'

interface CourseSlugBrandProps {
    brandSlug: string | undefined
}

const CourseSlugBrand = async ({ brandSlug }: CourseSlugBrandProps) => {

    // fetching data
    const brandAllProm = getBrandAll()
    const brandAll = await brandAllProm;
    // Returning the first brand from the brand array
    const brand = brandAll.find(brand => brand.slug === brandSlug)

    return (
        <div>
            {brandSlug === brand?.slug && brand?.brandmetadata.logo && <Link className='flex items-center gap-4 mt-4' href={`/brand/${brand?.slug}`}>
                <Image src={`${brand?.brandmetadata.logo.sourceUrl}`} alt={`${brand?.title} Logo`} width={54} height={44} />
                <p className='text-16 font-semibold text-themecolor-500'>{brand?.title}</p>
            </Link>}
        </div>
    )
}

export default CourseSlugBrand