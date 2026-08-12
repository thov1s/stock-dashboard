const REPORT_SOURCE =
  "https://raw.githubusercontent.com/thov1s/stock-dashboard/main/docs/index.html";

export default async () => {
  try {
    const upstream = await fetch(REPORT_SOURCE, {
      headers: { "User-Agent": "ai-stock-watch-report" },
    });

    if (!upstream.ok) {
      throw new Error(`upstream returned ${upstream.status}`);
    }

    const html = (await upstream.text()).replace(
      /<title>美股盯盘日报（GitHub）<\/title>/,
      "<title>美股盯盘日报（Netlify）</title>",
    );

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Netlify-CDN-Cache-Control":
          "public, durable, max-age=300, stale-while-revalidate=86400",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (error) {
    console.error("Unable to load the latest stock report", error);
    return new Response("最新日报暂时无法读取，请稍后重试。", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
};

export const config = {
  path: "/",
};
