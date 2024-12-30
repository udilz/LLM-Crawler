import axios from "axios";
import * as cheerio from "cheerio";

export async function getLinks(domain: string) {
  try {
    const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
    const {data} = await axios.get(domain, {
        headers: {
            "User-Agent" : USER_AGENT
        }
    });
    const $ = cheerio.load(data);

    const links: string[] = [];
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      if (href) {
        links.push(href);
      }
    });
    const url = new URL(domain);
    const proccesedLink = links
      .map((item) => {
        return item.startsWith("http") ? item : `${domain}${item}`;
      })
      .filter((link) => link.includes(url.hostname));
    return proccesedLink;
  } catch (error) {
    console.log(error);
    return []
  }
}
