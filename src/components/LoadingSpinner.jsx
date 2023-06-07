import React from "react";

import styles from "@/styles/LoadingSpinner.module.css";

const LoadingSpinner = ({ show }) => {
  return (
    <>
      {
        show && (
          <div className={styles.loaderBox}>
            <div className={styles.loderBoxInner}>
              <div className={styles.loader}></div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default LoadingSpinner;