'use server'

export async function createReport(email: string, message: string) {
    await fetch('https://script.google.com/macros/s/AKfycbzPm7GM_IZX9fKJFp2gapCuaxMEhC7pOIEdF24hGl1zqGaU-O7fZWsoU-IOHkrAdZ95Ew/exec', {
        redirect: "follow",
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({ email, message })
    });
}