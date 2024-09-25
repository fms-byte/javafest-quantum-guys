import axios from 'axios';
import { load } from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url).searchParams.get('url');

    if (!url) {
        return NextResponse.json({ message: 'Please provide a valid URL' }, { status: 400 });
    }

    try {
        // Fetch the HTML content from the provided URL
        const response = await axios.get(url);
        
        // Load the HTML content using cheerio
        const $ = load(response.data);

        // Remove all <a> tags
        $('a').remove();

        // Return the modified HTML as plain text
        return new NextResponse($.html(), {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    } catch (error) {
        console.error('Error fetching or processing content:', error);
        return NextResponse.json({ message: 'Error fetching or processing content' }, { status: 500 });
    }
}
