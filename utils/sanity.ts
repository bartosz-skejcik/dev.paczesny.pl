import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2022-03-25",
    useCdn: false,
});
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

export { client, urlFor };
