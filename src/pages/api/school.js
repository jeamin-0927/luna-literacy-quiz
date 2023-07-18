// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";



const handler = async (req, res) => {
  const { name } = req.query;
  try{
    const { data } = await axios({
      method: "GET",
      url: "https://open.neis.go.kr/hub/schoolInfo",
      params: {
        KEY: process.env.NEIS_API_KEY,
        Type: "json",
        SCHUL_NM: name,
      }
    });

    const korea = {
      "서울특별시": "서울",
      "부산광역시": "부산",
      "대구광역시": "대구",
      "인천광역시": "인천",
      "광주광역시": "광주",
      "대전광역시": "대전",
      "울산광역시": "울산",
      "세종특별자치시": "세종",
      "경기도": "경기",
      "강원도": "강원",
      "충청북도": "충북",
      "충청남도": "충남",
      "전라북도": "전북",
      "전라남도": "전남",
      "경상북도": "경북",
      "경상남도": "경남",
      "제주특별자치도": "제주",
    };

    const schools = data.schoolInfo[1].row.map((school) => `[${korea[school.LCTN_SC_NM]}] ${school.SCHUL_NM}`);
    res.status(200).json(schools);
  }
  catch{
    res.status(500).json({ error: "Internal Server Error" });
  }


  res.status(200).json({ name: "John Doe" });
};

export default handler; 