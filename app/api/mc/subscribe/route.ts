
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const schema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
});

export const POST = async (req: NextRequest) => {
    try {
        const { email, firstName, lastName } = schema.parse(await req.json());
        const apiKey = process.env.MAILCHIMP_API_KEY;
        const listId = 'e616551742'
        const serverPrefix = apiKey?.split('-')[1];
        const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email_address: email,
                status: 'subscribed', // Enable double opt-in
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            }),
        });

        if (response.ok) {
            return NextResponse.json({ message: 'Success' });
        } else {
            const errorData = await response.text();
            return NextResponse.json({ message: `Failed to send confirmation email: ${errorData}` }, {
                status: 500,
            });
        }
    } catch (error) {

        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: `Invalid request body: ${error.message}` }, {
                status: 400,
            });
        } else {
            return NextResponse.json({ message: `Invalid request body` }, {
                status: 400,
            });
        }
    }
};
