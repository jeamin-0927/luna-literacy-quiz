import Head from "next/head";
import React from "react";

const DefaultHead = ({ children }) => {
  return (
    <Head>
      <title>LUNA 문해력 QUIZ</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:image" content="https://bucket.2w.vc/public/vote.png" />
      <link rel="icon" href="/favicon.ico" />
      {/* <script defer data-domain="dimigo.net" src="https://analytics.2w.vc/js/script.js"></script> */}
      {children}
    </Head>
  );
};

export default DefaultHead;