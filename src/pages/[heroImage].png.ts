import { getCollection } from "astro:content";
import generateOgImage from "@/utils/generateOgImage";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) =>
    new Response(await generateOgImage(params.heroImage), {
        headers: { "Content-Type": "image/png" }
    });

export async function getStaticPaths() {
    const postImportResult = await getCollection(
        "blog",
        ({ data }) => !data.draft && !data.heroImage
    );
    const posts = Object.values(postImportResult);

    return posts
        .filter(({ data }) => !data.heroImage)
        .map(({ data }) => ({
            params: { heroImage: data.title }
        }));
}
