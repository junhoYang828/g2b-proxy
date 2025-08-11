export default async function handler(req, res) {
  const { prdctClsfcNoNm = "복공판", pageNo = "1", numOfRows = "5" } = req.query;

  const serviceKey = "Xjp+QO5t2SHf6kbPS4C8/MTuVesZAq4QmnkcE9iex00IHeL+rDxWRMJWhg/0vGyPvwhqcpqv/zxvXDTMSAZknQ==";

  const g2bUrl = `https://apis.data.go.kr/1230000/ao/PriceInfoService/getPriceInfoListFcltyCmmnMtrilEngrk` +
    `?ServiceKey=${encodeURIComponent(serviceKey)}` +
    `&pageNo=${pageNo}` +
    `&numOfRows=${numOfRows}` +
    `&type=json` +
    `&prdctClsfcNoNm=${encodeURIComponent(prdctClsfcNoNm)}`;

  try {
    const response = await fetch(g2bUrl);
    const data = await response.json();

    if (!data.response?.body?.items?.item) {
      return res.status(200).json({
        message: "조회 결과가 없습니다.",
        input: prdctClsfcNoNm,
        result: []
      });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || "Unknown error"
    });
  }
}
