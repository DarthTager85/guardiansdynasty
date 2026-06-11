import { VITE_CONTENTFUL_SPACE, VITE_CONTENTFUL_CLIENT_ACCESS_TOKEN } from '$env/static/private';
import contentful from 'contentful';
import { json, error } from '@sveltejs/kit';

export async function GET() {
    if(!VITE_CONTENTFUL_CLIENT_ACCESS_TOKEN) {
        throw error(500, "Missing VITE_CONTENTFUL_CLIENT_ACCESS_TOKEN");
    }
    const client = contentful.createClient({
        space: VITE_CONTENTFUL_SPACE,
        accessToken: VITE_CONTENTFUL_CLIENT_ACCESS_TOKEN
    });
    const data = await client.getEntries({content_type: 'blog_post'})
        .catch(e => {
            console.error(e);
            throw error(500, "Problem retrieving blog posts");
        });

    return json(data);
}
