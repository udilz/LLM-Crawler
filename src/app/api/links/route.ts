import { getLinks } from "@/services/getLinks";
import { normalizeDomain } from "@/services/normalizeDomain";

export  async function POST(req: Request) {
    const {domain} = await req.json();
    const normDomain = normalizeDomain(domain);
    const links = await getLinks(normDomain);
    return Response.json({domain : normDomain, links});
}