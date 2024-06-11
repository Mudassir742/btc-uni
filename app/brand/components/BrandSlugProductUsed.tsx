import ProductsUsed from '@/components/ProductsUsed'
import { UserSession } from '@/interfaces';
import React from 'react'
import { getAllBrandProductUsed } from '../helper';

interface BrandSlugProductUsedProps {
    themeColor: string;
    user: UserSession | null;
    params: { slug: string };
}

const BrandSlugProductUsed = async ({ themeColor, user, params }: BrandSlugProductUsedProps) => {

    const allBrandsProm = getAllBrandProductUsed()
    const [brandAll] = await Promise.all([allBrandsProm]);
    const brandCourses = brandAll.find(brand => brand.slug === params.slug)
    const usedBrandProduct = brandCourses?.brandmetadata.brandProducts

    return (
        <div>
            {usedBrandProduct &&
                // usedBrandProduct.map(product => (
                <>
                    <p className='text-[32px] font-semibold mb-6 text-themeColor'>Our Products</p>
                    <ProductsUsed productsUsed={usedBrandProduct} productTitleTextColor={themeColor} userDataId={(user?.userDataId || 0).toString()} courseId={0} />

                </>
                // ))
            }
        </div>
    )
}

export default BrandSlugProductUsed