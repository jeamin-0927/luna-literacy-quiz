import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import DefaultHead from "@/components/DefaultHead";
import LoadingSpinner from "@/components/LoadingSpinner";
import homeStyles from "@/styles/Home.module.css";
import styles from "@/styles/Quiz.module.css";
import quizData from "@/utils/quizData.js";
import { resultDataAtom, selectDataAtom, userDataAtom } from "@/utils/states";

let interval = null;

const defaultTime = 15;

const Quiz = () => {
  const router = useRouter();
  const [snipperShow, setSnipperShow] = useState(false);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [selectData, setSelectData] = useRecoilState(selectDataAtom);
  const [resultData, setResultData] = useRecoilState(resultDataAtom);
  const [leftTime, setLeftTime] = useState(defaultTime);
  const num = selectData.length;

  try{ clearInterval(interval); } catch { console.log("fail"); }
  interval = setInterval(() => {
    if (leftTime === 1) {
      setSelectData([...selectData, false]);
      setLeftTime(defaultTime);
      return;
    }
    setLeftTime(leftTime - 1);
  }, 1000);

  useEffect(() => {
    if (userData.name.length === 0) {
      router.push("/");
    }
  });

  useEffect(() => {
    (async () => {
      if (selectData.length === quizData.length) {
        const sendData = {
          ...userData,
          answer: selectData,
        };
        setSnipperShow(true);
        const {data} = await axios({
          method: "post",
          url: "/api/insert",
          data: sendData,
        });
        setResultData(data);
        console.log(data);
        router.push("/result");
      }
    })();
  }, [selectData, router, setResultData, userData]);

  return (
    <>
      <LoadingSpinner show={snipperShow} />
      {
        quizData[num]?.question && (
          <>
            <div className={styles.titleBox}>
              <div>
                <div className={styles.title}>Q{Number(num) + 1}</div>
                <div 
                  className={styles.prev}
                  onClick={() => {
                    setSelectData([]);
                    router.push("/");
                  }}
                >
                &lt; 메인으로 돌아가기
                </div>
              </div>
              <div className={styles.right}>
                <div className={[styles.prev, styles.prvright].join(" ")}>제한 시간</div>
                <div className={[styles.title, styles.prvright].join(" ")}>{leftTime}초</div>
              </div>
            </div>
            <div className={styles.quiz}>
              {quizData[num]?.question}
            </div>
            <div className={styles.answer}>
              {
                quizData[num]?.example.map((example, index) => (
                  <div 
                    className={styles.example} 
                    key={index}
                    onClick={() => {
                      setLeftTime(defaultTime);
                      setSelectData([...selectData, index === quizData[num]?.answer]);
                    }}
                  >
                    {example}
                  </div>
                ))
              }
            </div>

            <div className={styles.percentbarBox}>
              <div className={styles.percentbar}>
                <div 
                  className={styles.percentbarFill}
                  style={{width: `${Math.floor((num + 1) / quizData.length * 100)}%`}}
                />
              </div>
              <div>{num + 1} / {quizData.length}</div>
            </div>
          </>
        )
      }
    </>
  );
};

export default function Home() {
  return (
    <>
      <DefaultHead></DefaultHead>
      <main className="main">
        <div className="inner">
          <div className={homeStyles.title}>
            <div className={homeStyles.titleIcon}></div>
            <div className={homeStyles.titleText}>2023 LUNA 문해력 Quiz</div>
          </div>

          <Quiz />
        </div>
      </main>
    </>
  );
}
