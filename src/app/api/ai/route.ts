import { genereteAI } from "@/services/generateAi";
import { saveMarkdown } from "@/services/getContent";
import { getLinks } from "@/services/getLinks";
import { normalizeDomain } from "@/services/normalizeDomain";

const PROMPT = `
Generate a detailed company profile with the following sections, each clearly labeled for ease of use:

## Company Name

## Basic Information
- Provide the full company name, address, phone number, email, and website.

## Products and Services
- Describe the company's products or services, highlighting their key features.
- Explain what sets these products or services apart from competitors.

## Mission, Vision, and Goals
- State the company's mission (its purpose and core focus).
- Outline its vision (the long-term aspirations or direction).
- List spesific goals, both short-term and long-term.

## Values and Culture
- Identify the company's core values and principles that guide its decisions.
- Describe the company's workplace culture and what it's like to work there.

## Team and Leadership
- Provide an overview of the team, including its structure, skills, or ethos.
- Highlight key leadership figures, their roles, and contributions to the company.

## History and Achievements
- Offer a brief history of the company, mentioning when and how it was established.
- Highlight significant achievements, milestones, or awards the company has received.

IMPORTANT :
- Each section should be well-developed, specific, and presented in a clear, professional tone. Avoid generic or vague descriptions.
- Follow those up formatting level, get rid any unnecessary text.
- Make sure to proofread and edit your work for clarity, coherence, and correctness.
- Generated Text should be in English.
- Use "No Information Available" if the information is not available.
`

export  async function POST(req: Request) {
    const {domain} = await req.json();
    const normDomain = normalizeDomain(domain);
    const links = await getLinks(normDomain);

    let content = "";

    for(const link of links) {
        const data = await saveMarkdown(link)
        if(data) {
           content += data
        }
    }

    const text = await genereteAI(content,PROMPT)
    return Response.json({text});
}