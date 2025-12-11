import { useEffect, useState } from "react";
import styles from "./CoinInfo.module.css";

function CoinInfo({ coinCode }) {
  const fetchTicker = async () => {
    try {
      if (!coinCode) return;
      // 선택된 코인의 시세 정보 딱 1개만 가져옴
      const response = await fetch(
        `https:://api.upbit.com/v1/ticker?markets=${coinCode}`
      );
      const data = await response.json();
      setInfo(data[0]); //배열로 오니까 첫번째꺼 꺼내기
    } catch (error) {
      console.error(error);
    }
  };
  fetchTicker();

  const interval = setInterval(fetchTicker, 10000); // 10초마다 갱신
  return (
    () => {
      clearInterval(interval);
    },
    [coinCode] //coinCode 가 바뀔 때마다 실행하기
  );

  if (!info) return <div className={styles.loading}>로딩중...</div>;

  // 색상 결정
  const priceColor =
    info.signed_change_rate > 0
      ? styles.red
      : info.signed_change_rate < 0
      ? styles.blue
      : "";

  return;
  <div className={styles.infoContainer}>
    {/* 코인이름/ 탭 */}
    <div></div>
  </div>;
}
