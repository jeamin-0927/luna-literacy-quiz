// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectToDatabase } from "@/utils/db";


const handler = async (req, res) => {
  const client = await connectToDatabase();
  const dataCollection = client.db().collection("data");
  const query = { };
  const documents = await dataCollection.find(query).toArray();
  const result = documents.map((_) => {
    return {
      id: _._id,
      name: _.name,
      score: _.score,
      answer: _.answer
    };
  });
  //result의 score순으로 정렬
  result.sort(function(a, b) {
    return b.score - a.score;
  });

  res.status(200).json(result);
};

export default handler; 