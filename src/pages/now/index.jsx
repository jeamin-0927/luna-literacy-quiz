import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import io, { Manager } from "socket.io-client";

import DefaultHead from "@/components/DefaultHead";
import styles from "@/styles/Home.module.css";
import * as env from "@/utils/env";
import { userDataAtom } from "@/utils/states";

let socket;

export default function Home() {
  useEffect(() => {
    socketIntialize();
  });

  const socketIntialize = async () => {
    await fetch("/api/socket");
    
    socket = io(env.API, {
      path: "/api/socket",
    });

    console.log(socket);

    socket.on("connect", () => {
      console.log(socket);
    });

    return () => {
      socket.disconnect();
    };
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
            여기에 문해력 퀴즈 설명 뭐시라뭐시라
            <button onClick={() => {
              socket.emit("message", "test");
            }}>asdf</button>
          </div>
        </div>
      </main>
    </>
  );
}
