import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import DefaultHead from "@/components/DefaultHead";
import homeStyles from "@/styles/Home.module.css";
import styles from "@/styles/Result.module.css";
import quizData from "@/utils/quizData.js";
import { resultDataAtom, selectDataAtom } from "@/utils/states";

export default function Home() {
  const router = useRouter();
  const [answer, setAnswer] = useRecoilState(selectDataAtom);
  const [result, setResult] = useRecoilState(resultDataAtom);
  const score = Math.floor(result.score / answer.length * 100);

  useEffect(() => {
    if (answer.length === 0) {
      router.push("/");
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000 * 10);
  });

  return (
    <>
      <DefaultHead></DefaultHead>
      <main className="main">
        <div className="inner">
          <div className={homeStyles.title}>
            <div className={homeStyles.titleIcon}></div>
            <div className={homeStyles.titleText}>2023 LUNA 문해력 Quiz</div>
          </div>
          <div className={styles.description}>
            <div className={styles.descriptionTitle}>{score}점</div>
            <div className={styles.descriptionCont}>상위 {result.percent}%의 점수이에요!</div>
            <div className={styles.descriptionCont}>전체 {result.length}명 중 {result.rank}등!</div>
          </div>

          <div className={styles.wrongTitle}>틀린 문제 {answer.length - result.score}개</div>
          <div className={styles.questionBox}>
            {
              result.answer.map((item, index) => {
                if(item) return;
                return (
                  <div className={styles.question} key={index}>
                    <div className={styles.questionTitle}>
                      <div className={styles.questionNum}>Q{index + 1}</div>
                      <div className={styles.questionText}>{quizData[index].question}</div>
                    </div>
                    <div className={styles.examples}>
                      {
                        quizData[index].example.map((example, i) => (
                          <div
                            className={[styles.example, i === quizData[index].answer && styles.yesExample].join(" ")}
                            key={i}
                          >
                            {i === quizData[index].answer && "정답: "}
                            {example}
                          </div>

                        ))
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>

          <div className={styles.wrongTitle}>맞춘 문제 {result.score}개</div>
          <div className={styles.questionBox}>
            {
              result.answer.map((item, index) => {
                if(!item) return;
                return (
                  <div className={styles.question} key={index}>
                    <div className={styles.questionTitle}>
                      <div className={styles.questionNum}>Q{index + 1}</div>
                      <div className={styles.questionText}>{quizData[index].question}</div>
                    </div>
                    <div className={styles.examples}>
                      {
                        quizData[index].example.map((example, index) => (
                          <div
                            className={[styles.example, index === quizData[index].answer && styles.yesExample].join(" ")}
                            key={index}
                          >
                            {index === quizData[index].answer && "정답: "}
                            {example}
                          </div>

                        ))
                      }
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
