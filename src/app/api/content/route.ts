import { saveMarkdown } from "@/services/getContent";
import { getLinks } from "@/services/getLinks";
import { normalizeDomain } from "@/services/normalizeDomain";

export  async function POST(req: Request) {
    const {domain} = await req.json();
    const normDomain = normalizeDomain(domain);
    const links = await getLinks(normDomain);

    const content : {link: string; content: string}[] = []

    for(const link of links) {
        const data = await saveMarkdown(link)
        if(data) {
            content.push({link, content: data})
        }
    }
    return Response.json({content});
}