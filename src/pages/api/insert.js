// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectToDatabase } from "@/utils/db";


const handler = async (req, res) => {
  const { name, contact, answer } = req.body;
  if(!name || !contact || !answer) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  const client = await connectToDatabase();
  const dataCollection = client.db().collection("data");

  const score = answer.reduce((acc, cur) => acc + cur, 0);

  const result = await dataCollection.insertOne({
    name,
    contact,
    score,
    answer,
  });

  const thisId = result.insertedId;

  const query = { };
  const documents = await dataCollection.find(query).toArray();
  const list = documents.map((_) => {
    return {
      id: _._id,
      name: _.name,
      score: _.score,
    };
  });
  list.sort(function(a, b) {
    return b.score - a.score;
  });

  const rank = list.findIndex((_) => _.id.toString() === thisId.toString()) + 1;

  res.status(200).json({
    score,
    answer,
    rank,
    length: list.length,
    percent: Math.floor(rank / list.length * 100 * 100) / 100,
  });

};

export default handler; 