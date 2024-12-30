import axios from "axios";
import * as cheerio from "cheerio";
import Turndown from "turndown";

const turndown = new Turndown();

export function cleanContent(html: string) {
  const $ = cheerio.load(html);

  $("script, link, style, img, iframe, noscript").remove();
  $("footer, nav, .ads, .ad-banner, [class*='menu'], [class*='footer']").remove();

  return $("body").html() || "";
}

export async function saveMarkdown(link: string) {
  const {data} = await axios.get(link);
  const cleanedHtml = cleanContent(data);
  const markdown = turndown.turndown(cleanedHtml);
  return markdown;
}
