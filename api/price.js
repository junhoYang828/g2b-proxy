export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const martNm = url.searchParams.get("prdctClsfcNoNm") || "복공판";
  const pageNo = url.searchParams.get("pageNo") || "1";
  const numOfRows = url.searchParams.get("numOfRows") || "10";

  const serviceKey = "Xjp+QO5t2SHf6kbPS4C8/MTuVesZAq4QmnkcE9iex00IHeL+rDxWRMJWhg/0vGyPvwhqcpqv/zxvXDTMSAZknQ==";

  const g2bUrl = `https://apis.data.go.kr/1230000/ao/PriceInfoService/getPriceInfoListFcltyCmmnMtrilEngrk` +
    `?ServiceKey=${encodeURIComponent(serviceKey)}` +
    `&pageNo=${pageNo}` +
    `&numOfRows=${numOfRows}` +
    `&type=json` +
    `&prdctClsfcNoNm=${encodeURIComponent(martNm)}`;

  try {
    const response = await fetch(g2bUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json"
      }
    });

    const data = await response.json();
    const items = data?.response?.body?.items?.item;

    if (!items || items.length === 0) {
      return res.status(200).json({
        message: "조회 결과가 없습니다.",
        input: martNm,
        result: []
      });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({ message: "정상 조회", result: items });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || "Unknown error"
    });
  }
}
