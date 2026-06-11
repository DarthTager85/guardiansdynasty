import contentful from 'contentful';
import { json, error } from '@sveltejs/kit';

const SPACE = process.env.VITE_CONTENTFUL_SPACE;
const TOKEN = process.env.VITE_CONTENTFUL_CLIENT_ACCESS_TOKEN;

export async function GET() {
    if(!TOKEN) {
        throw error(500, "Missing VITE_CONTENTFUL_CLIENT_ACCESS_TOKEN");
    }
    const client = contentful.createClient({
        space: SPACE,
        accessToken: TOKEN
    });
    const data = await client.getEntries({content_type: 'blog_post'})
        .catch(e => {
            console.error(e);
            throw error(500, "Problem retrieving blog posts");
        });

    return json(data);
}
