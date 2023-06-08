import React, { useEffect, useState } from "react";

import styles from "@/styles/LoadingSpinner.module.css";

let interval = null;

const LoadingSpinner = ({ show }) => {
  const [num, setNum] = useState(0);

  try{ clearInterval(interval); } catch { console.log("fail"); }
  interval = setInterval(() => {
    setNum((num) => {
      if(num === 3) return 0;
      else return num + 1;
    });
  }, 500);

  return (
    <>
      {
        show && (
          <div className={styles.loaderBox}>
            <div className={styles.loderBoxInner}>
              <div className={styles.loader}></div>
              <div>Loading{Array(num).fill(".").join("")}</div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default LoadingSpinner;