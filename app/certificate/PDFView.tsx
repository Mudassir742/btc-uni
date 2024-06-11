'use client'
import React, { FC, ReactNode } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer, PDFDownloadLink, Font } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { string } from 'zod';
const DancingScript = "/font/DancingScript-Regular.ttf"
// const PlayfairDisplay2 = "/font/static/PlayfairDisplay-Regular.ttf"
const GreatVibes = "/font/GreatVibes-Regular.ttf"
const PlayfairDisplay = "/font/static/PlayfairDisplay-Bold.ttf"
import ReactDOMServer from 'react-dom/server';
import parse from "html-react-parser"
import { Download } from 'lucide-react';
import he from 'he';
import ParagraphText from '@/components/text/Paragraph';
import { replaceDomain } from '@/utils/url';
import { Brand } from '@/interfaces';

interface certificateInfoType {
    courseName: string,
    CLO: string,
    description: string,
    Instructors: {
        id: number,
        img: string,
        handle: string,
        name: string,
    }[],
    brand?: Brand[] | undefined,
    std: {
        firstName: string,
        lastName: string,
        DateOfCompletion: string,
    };
}




export const PDF = ({ data }: { data: certificateInfoType }) => {

    // destructing data prop
    const { courseName, CLO, Instructors, std, description, brand } = data
    const length = Instructors?.length



    const RemoveTags = (element: string) => {
        const contentWithLineBreaks = he
            .decode(element)
            .replace(/<\/?p>/g, '') // Remove <p> tags
            .replace(/<br\s*\/?>/g, '\n') // Replace <br> and <br /> with \n for line breaks
            .split('\n') // Split the content into paragraphs

        const sanitedText = contentWithLineBreaks.filter((paragraph) => paragraph.trim() !== ''); // Remove empty paragraphs
        return sanitedText
    }
    // const contentWithLineBreaks = he
    //     .decode(CLO)
    //     .replace(/<\/?p>/g, '') // Remove <p> tags
    //     .replace(/<br\s*\/?>/g, '\n') // Replace <br> and <br /> with \n for line breaks
    //     .split('\n') // Split the content into paragraphs

    // const paragraphs = contentWithLineBreaks.filter((paragraph) => paragraph.trim() !== ''); // Remove empty paragraphs

    const sanitizedDescription = RemoveTags(description)
    const paragraphs = RemoveTags(CLO)

    // Format the and add bullets to each paragraph
    const formattedContent = paragraphs.map((paragraph, index) => {
        const text = removeHtmlTags(paragraph)
        return (
            <View
                key={index}
                style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '5px' }}
            >
                <Text>&#x2022;</Text>
                <Text>{text}</Text>
            </View>
        )
    });

    // funtion to remonve html tag fron string if there's any.
    function removeHtmlTags(inputString: string) {
        // Check if the input string contains HTML tags
        if (/<[^>]*>/g.test(inputString)) {
            // If it contains HTML tags, remove them
            return inputString.replace(/<[^>]*>/g, '').trim();
        } else {
            // If it doesn't contain HTML tags, return the input string unchanged
            return inputString.trim();
        }
    }

    // const element = (
    //     <html>
    //         <body>
    //             <style>
    //                 {`
    //           h1 {
    //             font-size: 28px; /* Adjust the size as needed, text-28 is a Tailwind CSS class */
    //         }

    //         h2 {
    //             font-size: 24px; /* Adjust the size as needed, text-24 is a Tailwind CSS class */
    //         }

    //         h3 {
    //             font-size: 18px; /* Adjust the size as needed, text-18 is a Tailwind CSS class */
    //         }

    //         p {
    //             font-size: 14px; /* Adjust the size as needed, text-16 is a Tailwind CSS class */
    //         }

    //         ul {
    //             list-style-type: disc;
    //             margin-left: 14px; /* Adjust margin as per ml-5 in Tailwind CSS */
    //         }

    //         ol {
    //             list-style-type: decimal;
    //             margin-left: 14px; /* Adjust margin as per ml-5 in Tailwind CSS */
    //         }
    //         `}
    //             </style>
    //             {parse(CLO ?? '<br/> <br/> <br/> <br/> <br /> <br/> <br/>')}
    //         </body>
    //     </html>
    // );

    // const html = ReactDOMServer.renderToStaticMarkup(element);

    // Regestring fonts
    Font.register({ family: 'Dancing Script', src: DancingScript });
    Font.register({ family: 'Playfair Display', src: PlayfairDisplay });
    Font.register({ family: 'Great Vibes', src: GreatVibes });

    // Style object
    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            padding: "50px 50px",
        },
        header: {
            // display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
        },
        main: {
            // display: 'flex',
            backgroundColor: 'yellow'
        },
        user: {
            // display: 'flex',
            flexDirection: 'column',
        },
        img: {
            border: '100%',
            width: "100px",
        }
    });

    return (
        <Document
            pageLayout='singlePage'
            pageMode='fullScreen'
            title={`BTC University Certificate of Completion: ${courseName}`} >
            <Page wrap={false} size="A4" orientation='landscape' style={styles.page}>
                {/* header  */}
                <View style={styles.header}>

                    <Image src={"/images/logo.png"} style={{
                        height: '60px',
                    }} />
                    <Text style={{
                        // fontWeight:"light",
                        fontFamily: 'Playfair Display',
                        fontSize: "45px",
                        textTransform: 'uppercase',
                    }}>
                        Certificate of completion
                    </Text>
                </View>

                {/* main */}
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* left main  */}
                    <View style={{
                        // position: "relative",
                        width: '50%',
                        display: 'flex',
                        flexDirection: `${'row'}`,
                        flexWrap: "wrap",
                        justifyContent: 'center',
                        alignItems: "center",
                        gap: '30px',
                        // padding:'35px',
                    }}>
                        {
                            Instructors?.map(ins => (
                                <View key={ins.id} style={{
                                    marginTop: `${length === 1 || length === 2 ? '40px' : ''}`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '5px',
                                }}>
                                    <Image style={{
                                        width: `${length === 1 ? '25vw' : '14vw'}`,
                                        maxHeight: `${length === 1 ? '25vw' : '14vw'}`,
                                        objectFit: 'cover',
                                        objectPosition: 'top',
                                        borderRadius: '100%',
                                    }}
                                        src={replaceDomain(ins.img, "https://cms.btcuniversity.com/wp-content", `${process.env.NEXT_PUBLIC_SITE_URL}/pdf`)}
                                    />
                                    <View style={{ display: 'flex', alignItems: 'center', }}>
                                        <Text style={{ margin: '8px 0 2px 0', fontSize: "16px" }}>{ins.handle}</Text>
                                        <Text style={{ fontSize: "16px" }}>{ins.name}</Text>
                                    </View>
                                    <Text key={ins.id} style={{ fontFamily: "Great Vibes", fontSize: '22px' }}>{ins.name}</Text>
                                </View>
                            ))
                        }
                    </View>

                    {/* right main  */}
                    <View style={{
                        height: "100%", width: "50%", display: "flex",
                        justifyContent: "space-between", gap: "20px", position: 'relative'
                    }}>
                        {/* course name  */}
                        <Text style={{ fontSize: "24px", }}>{courseName}</Text>

                        {/* Things covered in coursed  */}
                        {CLO !== "" ? (
                            <View >
                                <Text style={{ fontSize: '16px', marginTop: "-5px" }}>In this exclusive BTCU online class, we covered:</Text>
                                <View style={{ marginLeft: '-8px', marginTop: '20px' }}>
                                    {formattedContent.map(item => item)}
                                </View>
                            </View>
                        ) : <Text>{sanitizedDescription}</Text>}

                        {CLO === "" && (
                            <div className='h-2'></div>
                        )}
                        {/* signature of Instructors */}
                        <View style={{ marginBottom: "8px" }}>
                            <View style={{ position: 'relative', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0px 20px', marginBottom: '4px' }}>
                                {
                                    Instructors?.map(ins => (
                                        <Text key={ins.id} style={{ fontFamily: "Great Vibes", fontSize: '22px' }}>{ins.name}</Text>
                                    ))
                                }
                                <View style={{ width: '250px', height: '1px', backgroundColor: 'black', position: 'absolute', bottom: '5' }}></View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '2px 0px' }}>
                                {
                                    Instructors?.map((ins, key) => (
                                        <Text key={ins.id} style={{ fontSize: '10px' }}>
                                            {`${ins.name} (${ins.handle})${(key < Instructors.length - 1) ? ', ' : ''}`}
                                        </Text>
                                    ))
                                }
                            </View>
                        </View>
                        {/* student name and completion date */}
                        <View style={{ marginBottom: '20px', marginTop: "-20px" }}>
                            <Text style={{
                                fontSize: '22px',
                                textTransform: 'capitalize',
                                borderBottom: '2px solid black',
                                marginBottom: '10px',
                            }}>{std.firstName} {std.lastName || ''}</Text>
                            <View>
                                {courseName === "Temporarily Unavailable" && (
                                    <Text style={{ fontSize: "10px" }}>Temporarily Unavailable. We apologize for this inconvenience! </Text>
                                )}
                                {courseName !== "Temporarily Unavailable" && (
                                    <View style={{ display: 'flex', flexDirection: "row", gap: '10px' }}>

                                        <Text style={{ fontSize: "10px" }}>Has successfully completed: {courseName} </Text>

                                    </View>
                                )}

                                <View style={{ display: 'flex', flexDirection: "row", gap: '10px' }}>
                                    <Text style={{ fontSize: "10px" }}>Date of completion: {std.DateOfCompletion}</Text>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/* misc */}
                <View>
                    {
                        brand?.map(brand => {
                            console.log(brand.brandmetadata.logo.sourceUrl)
                            return (<Image
                                key={brand.slug}
                                src={replaceDomain(brand.brandmetadata.logo.sourceUrl, "https://cms.btcuniversity.com/wp-content", `${process.env.NEXT_PUBLIC_SITE_URL}/pdf`)}
                                style={{
                                    width: '150px',
                                    position: 'absolute',
                                    bottom: '-10px',
                                }}
                            />)
                        }
                        )
                    }
                </View>

                {/* <Text>chrisones(@chrisones_hairs)</Text>
                                <Text>chrisones(@chrisones_hairs)</Text>
                                <Text>chrisones(@chrisones_hairs)</Text>
                                <Text>chrisones(@chrisones_hairs)</Text> */}

            </Page >
        </Document >
    )
}

// mihai jan 26 added some conditions for empty certifs


const PDFView = ({ info }: { info: certificateInfoType }) => {
    return (
        <PDFDownloadLink document={<PDF data={info} />}>
            {({ blob, url, loading, error }) => {

                return loading ? 'Loading document...' : <div className='rounded-full justify-center p-3 bg-themecolor-500'>
                    <Download color='white' />

                </div>
            }
            }
        </PDFDownloadLink>
    )
}

export default PDFView