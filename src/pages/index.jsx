import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

import DefaultHead from "@/components/DefaultHead";
import styles from "@/styles/Home.module.css";
import { userDataAtom } from "@/utils/states";

const formatPhoneNumber = (number) => {
  const cleaned = ("" + number).replace(/\D/g, "");
  const match1 = cleaned.match(/^(\d{3})(\d)$/) || cleaned.match(/^(\d{3})(\d{2})$/) || cleaned.match(/^(\d{3})(\d{3})$/) || cleaned.match(/^(\d{3})(\d{4})$/);
  if (match1) {
    return [match1[1] + "-" + match1[2], false];
  }
  const match2 = cleaned.match(/^(\d{3})(\d{4})(\d)$/) || cleaned.match(/^(\d{3})(\d{4})(\d{2})$/) || cleaned.match(/^(\d{3})(\d{4})(\d{3})$/);
  if (match2) {
    return [match2[1] + "-" + match2[2] + "-" + match2[3], false];
  }
  const match3 = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match3) {
    return [match3[1] + "-" + match3[2] + "-" + match3[3], true];
  }
  const newCleaned = cleaned.slice(0, 11);
  const match4 = newCleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (!match4) {
    return [cleaned, false];
  }
  return [match4[1] + "-" + match4[2] + "-" + match4[3], true];
};

export default function Home() {
  const [uesrData, setUserData] = useRecoilState(userDataAtom);
  const [name, setName] = useState("");
  const [contact, setContact] = useState(["", false]);
  const router = useRouter();

  const quizStart = () => {
    if (name === "" || !contact[1]) {
      alert("필수 정보를 입력해주세요.");
      return;
    }
    setUserData({
      name,
      contact: contact[0],
    });
    router.push("/quiz");
  };

  const enter = (e) => {
    if (e.key === "Enter") {
      quizStart();
    }
  };

  return (
    <>
      <DefaultHead></DefaultHead>
      <main className="main">
        <div className="inner">
          <div className={styles.title}>
            <div className={styles.titleIcon}></div>
            <div className={styles.titleText}>2023 LUNA 문해력 Quiz</div>
          </div>
          <div className={styles.description}>
            <iframe 
              width="496" 
              height="281" 
              src="https://www.youtube.com/embed/I3ayrjL-lPg?autoplay=1&loop=1&controls=0&modestbranding=0&playlist=I3ayrjL-lPg" 
              title="2022 LUNA🌙 홍보영상" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
              className={styles.video}
            />
            <div className={styles.decdec}>
              <div className={styles.munTile}>여러분의 문해력을 퀴즈로 알아봐요!</div>
              <div className={styles.munDec}>상품 증정을 위하여 이름과 전화번호를 입력해 주세요!</div>
            </div>
          </div>

          <div className={[styles.center, styles.gap].join(" ")}>
            <input 
              placeholder="이름" 
              className={styles.input} 
              type="text"
              value={name} 
              onChange={(e) => {
                setName(e.target.value);
              }}
              onKeyDown={enter}
            />
            <input 
              placeholder="전화번호" 
              className={styles.input}
              type="tel"
              value={contact[0]}
              onChange={(e) => {
                setContact(formatPhoneNumber(e.target.value));
              }}
              onKeyDown={enter}
            />
          </div>

          <div className={[styles.center, styles.gap].join(" ")}>
            <div 
              className={styles.button}
              onClick={quizStart}
            >
              시작하기
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
