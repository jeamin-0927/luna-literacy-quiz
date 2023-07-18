import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
// import io, { Manager } from "socket.io-client";

import DefaultHead from "@/components/DefaultHead";
import LoadingSpinner from "@/components/LoadingSpinner";
import homeStyles from "@/styles/Home.module.css";
import styles from "@/styles/Now.module.css";
import { userDataAtom } from "@/utils/states";

let interval = null;

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getData();
      setLoading(false);
    })();
  }, []);

  try{ clearInterval(interval); } catch { console.log("fail"); }
  interval = setInterval(() => {
    getData();
  }, 1000);

  const getData = async () => {
    try{
      const { data: nowData } = await axios({
        method: "GET",
        url: `/api/now`,
      });
      setData(nowData);
    }
    catch {
      setData([]);
    }
  };
  
  return (
    <>
      <DefaultHead></DefaultHead>
      <main className="main">
        <LoadingSpinner show={loading} />
        <div className="inner" style={{
          maxWidth: "100%",
        }}>
          <div className={homeStyles.title}>
            <div className={homeStyles.titleIcon}></div>
            <div className={homeStyles.titleText}>2023 LUNA 문해력 Quiz</div>
          </div>
          <div className={styles.now}>
            {
              data.map((item, index) => {
                return (
                  <div key={index} className={styles.nowItemBox}>
                    <div className={styles.nowItem}>
                      <div className={styles.nowItemRank}>{index + 1}위</div>
                      <div className={styles.nowItemBorder}></div>
                      <div className={styles.nowItemRight}>
                        <div className={styles.nowItemName}>{item.name}</div>
                        <div className={styles.nowItemPoint}>{Math.floor(item.score / item.answer.length * 100)}점</div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </main>
    </>
  );
}
