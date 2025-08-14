// api/viewer.js
import fetch from "node-fetch";

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15",
  "Mozilla/5.0 (Linux; Android 14; SM-G990B) AppleWebKit/537.36 Chrome/115.0 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/114.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 Chrome/110.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_2) AppleWebKit/537.36 Chrome/111.0 Safari/537.36",
  "Mozilla/5.0 (Linux; U; Android 10) AppleWebKit/537.36 Chrome/99.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 Chrome/108.0 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 Chrome/113.0 Safari/537.36"
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { url, count } = req.body;
  if (!url || !count) {
    return res.status(400).json({ error: "Missing url or count" });
  }

  let completed = 0;
  for (let i = 0; i < count; i++) {
    try {
      await fetch(url, {
        headers: {
          "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)]
        }
      });
      completed++;
    } catch (err) {
      console.error("Error:", err.message);
    }
  }

  return res.status(200).json({ completed, total: count });
}
