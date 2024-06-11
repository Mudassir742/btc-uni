'use client'
import { PDF } from '@/app/certificate/PDFView';
import ReactPDF from '@react-pdf/renderer';
import dynamic from 'next/dynamic';
import React from 'react';
const PDFView = dynamic(() => import('@/app/certificate/PDFView'), {
    ssr: false
})

const page = () => {

    const certificateInfo = {
        courseName: "Fall's Hottest Haircouts Fall's Hottest Haircouts",
        CLO: "<p>Justin's viral butterfly layer cutting technique</p>",
        description:"",
        Instructors: [{
            id: 0,
            img: 'https://www.btcuniversity.com/_next/image?url=https%3A%2F%2Fcms.btcuniversity.com%2Fwp-content%2Fuploads%2F2023%2F12%2Fimage0-2-1-e1704753121981.jpeg&w=1920&q=75',
            handle: '@chrisones_hairs',
            name: 'Chris Jones'
        },
        {
            id: 1,
            img: 'https://www.btcuniversity.com/_next/image?url=https%3A%2F%2Fcms.btcuniversity.com%2Fwp-content%2Fuploads%2F2023%2F12%2Fimage0-2-1-e1704753121981.jpeg&w=1920&q=75',
            handle: '@rachelwstylist',
            name: 'Rachel Williams'
        },
        // {
        //     id: 2,
        //     img: 'https://www.btcuniversity.com/_next/image?url=https%3A%2F%2Fcms.btcuniversity.com%2Fwp-content%2Fuploads%2F2023%2F12%2Fimage0-2-1-e1704753121981.jpeg&w=1920&q=75',
        //     handle: ' @styled-by-carolynn',
        //     name: 'Carolynn Judds'
        // },
        // {
        //     id: 3,
        //     img: 'https://www.btcuniversity.com/_next/image?url=https%3A%2F%2Fcms.btcuniversity.com%2Fwp-content%2Fuploads%2F2023%2F12%2Fimage0-2-1-e1704753121981.jpeg&w=1920&q=75',
        //     handle: '@brianacisneros',
        //     name: 'Briana Cisnesos'
        // }
        ],
        std: {
            firstName: 'Hamzah',
            lastName: 'Syed',
            DateOfCompletion: "Dec 19/23",
        }
    }

    return (
        <div>
            <h1>Next.js PDF Viewer</h1>
            <PDFView info={certificateInfo} />
            {/* <PDF />  */}
        </div>
    )
}

export default page
