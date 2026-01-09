import { useEffect, useState } from "react";
import styles from "./CoinInfo.module.css";

function CoinInfo({ coinCode, koreanName }) {
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

    //100초마다 갱신
    const interval = setInterval(fetchTicker, 100000);
    return () => clearInterval(interval);
  }, [coinCode]);

  if (!info) return <div className={styles.loading}>로딩중...</div>;

  //색상결정
  const priceColor =
    info.signed_change_rate > 0
      ? styles.red
      : info.signed_change_rate < 0
      ? styles.blue
      : "";

  return (
    <div className={styles.infoContainer}>
      {/* 헤더 (코인 이름/ 탭) */}
      <div className={styles.infoHeader}>
        <div className={styles.title}>
          <h2>{koreanName}</h2>
          <span className={styles.codeStr}>{coinCode}</span>
        </div>
        <div className={styles.tabs}>
          <button className={styles.activeTab}>시세</button>
          <button>정보</button>
          <button>마켓뎁스</button>
        </div>
      </div>
      {/* 가격 상세 데이터 */}
      <div className={styles.infoBody}>
        {/* 왼쪽: 현재가  */}
        <div className={styles.mainPrice}>
          <div className={`${styles.price} ${priceColor}`}>
            {info.trade_price.toLocaleString()} <span>KRW</span>
          </div>
          <div className={`${styles.change} ${priceColor}`}>
            전일대비 : {(info.signed_change_rate * 100).toFixed(2)}% (
            {info.signed_change_price.toLocaleString()}원)
          </div>
        </div>
        {/* 오른쪽 고가/저가/거래대금 */}
        <div className={styles.subInfo}>
          <div className={styles.infoItem}>
            <span>고가</span>
            <span className={styles.red}>
              {info.high_price.toLocaleString()}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>거래량(24H)</span>
            <span>
              {Math.floor(info.acc_trade_volume_24h).toLocaleString()}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>저가</span>
            <span className={styles.blue}>
              {info.low_price.toLocaleString()}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>거래대금(24H)</span>
            <span>
              {Math.floor(info.acc_trade_price_24h / 1000000).toLocaleString()}{" "}
              백만
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinInfo;
