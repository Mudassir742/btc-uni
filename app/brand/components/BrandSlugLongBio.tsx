import React from 'react';
import { getEducatorAll, extractEducatorAll, getBrandBio } from '../helper';
import EducatorHeadShot from '@/components/EducatorHeadShot';
import AboutTheEducatorLongBio from '@/components/AboutTheEducatorLongBio';
import H3Text from '@/components/text/H3Text';

interface BrandSlugLongBioProps {
    params: { slug: string };
    themeColor: string;
}

const BrandSlugLongBio: React.FC<BrandSlugLongBioProps> = async ({ params, themeColor }) => {

    const brandBioProm = getBrandBio(params.slug);
    const brandBio = await brandBioProm;
    
    return (
        <div>
            <H3Text text="About" />
            {brandBio !== null ? (
                <p className='text-16 text-themeColor' dangerouslySetInnerHTML={{ __html: brandBio.content }} />
            ) : (
                <p className='text-16 text-themeColor'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente totam nesciunt nostrum repudiandae dolor aliquam voluptate earum adipisci sequi minus, nisi veniam nihil aut, ut eum et, incidunt consequatur temporibus.
                    Unde, quae. Iste nesciunt itaque placeat, error deserunt totam atque est iure ipsa numquam qui accusantium autem, illum laborum dignissimos maxime eveniet voluptate officia ipsam corrupti delectus doloremque, soluta minima.
                    Rerum veniam, iure minima consectetur officiis aliquid sed iste praesentium fugiat nostrum blanditiis voluptatem voluptatum quia neque voluptatibus minus non assumenda exercitationem similique quam veritatis unde? Amet, consectetur eaque. Ipsam.
                    Corporis, voluptate qui? Ab veniam facilis soluta ducimus? Incidunt, recusandae eligendi molestias at odit cupiditate eos vitae velit. Inventore sit magni commodi quas natus consequuntur deleniti distinctio fuga quos sunt?
                </p>
            )}
        </div>
    );
}

export default BrandSlugLongBio;