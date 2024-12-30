import {generateText} from "ai"
import {openai} from "@ai-sdk/openai"

export async function genereteAI(content: string, prompt: string) {
    const text = await generateText({
        model: openai("gpt-4o-mini"),
        prompt: content,
        system: prompt
    })

    return text
}