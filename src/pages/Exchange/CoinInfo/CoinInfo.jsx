import { useEffect, useState } from "react";
import styles from "./CoinInfo.module.css";

function CoinInfo({ coinCode }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        if (!coinCode) return;
        //선택된 코인의 시세 정보 딱 1개만 가져옴
        const response = await fetch(
          `https://api.upbit.com/v1/ticker?markets=${coinCode}`
        );
        const data = await response.json();
        setInfo(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicker();

    //1분마다 갱신
    const interval = setInterval(fetchTicker, 10000);
    return () => clearInterval(interval);
  }, [coinCode]);

  if (!info) return <div className={styles.loading}>로딩중...</div>;

  //색상결정
  const priceColor =
    info.signed_change_rate > 0
      ? styles.red
      : info.signed < 0
      ? styles.blue
      : "";

  return (
    <div className={styles.infoContainer}>
      {/* 헤더 (코인 이름/ 탭) */}
      <div className={styles.infoHeader}>
        <div className={styles.title}>
          <h2>{coinCode}</h2>
        </div>
      </div>
    </div>
  );
}
