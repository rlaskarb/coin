import { useEffect, useState } from "react";
import styles from "./CoinList.module.css";

function CoinList() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkeDate = async () => {
      try {
        // 업비트에서 모든코인 이름(코드) 가져오기
        const marketResponse = await fetch(
          "https://api.upbit.com/v1/market/all?isDetails=false"
        );
        const marketData = await marketResponse.json();

        // 원화로 시작하는 마켓만 남기기
        const krwMarkets = marketData.filter((coin) =>
          coin.market.startsWith("KRW-")
        );

        // 시세조회를 위해 마켓 코드만 뽑아서 콤마로 연결
        const marketCodes = krwMarkets.map((coin) => coin.market).join(",");

        //실제 현재가 , 거래대금 등 시세 정보 가져오기
        const tickerResponse = await fetch(
          `https://api.upbit.com/v1/ticker?markets=${marketCodes}`
        );
        const tickerData = await tickerResponse.json();

        //이름 데이터와 시세 데이터를 합치기
        // 마켓 정보에 시세정보를 매칭
        const finalData = krwMarkets.map((market) => {
          const ticker = tickerData.find((t) => t.market === market.market);
          const [currencey, symbol] = market.market.split("-");
          const displayName = `${symbol}/${currencey}`;
          return {
            market: market.market,
            name_for_view: displayName,
            korean_name: market.korean_name,
            trade_price: ticker.trade_price,
            signed_change_rate: ticker.signed_change_rate,
            acc_trade_price: ticker.acc_trade_price,
          };
        });

        setCoins(finalData);
        setLoading(false);
      } catch (error) {
        console.error("실패", error);
        setLoading(false);
      }
    };
    fetchMarkeDate();
  }, []);

  // 숫자에 콤마 찍어주는 함수
  const formatNumber = (num) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  if (loading) return <div>로딩중</div>;

  return (
    <section className={styles.listContainer}>
      <h2 className="blind">코인차트목록</h2>
      <ul className={styles.listContent}>
        <li>한글명</li>
        <li>현재가</li>
        <li>전일대비</li>
        <li>거래대금</li>
      </ul>

      <div className={styles.coinScroll}>
        {coins.map((coin) => (
          <ul key={coin.market} className={styles.coinContent}>
            {/* 한글명 & 심볼 */}
            <li className={styles.symbol}>
              <strong>{coin.korean_name}</strong>
              <span>{coin.name_for_view}</span>
            </li>
            {/* 현재가(가격) */}
            <li
              className={`${styles.nowPrice} ${
                coin.signed_change_rate > 0 ? `${styles.red}` : `${styles.blue}`
              }`}
            >
              {formatNumber(coin.trade_price)}
            </li>
            {/* 전일 대비(퍼센트) */}
            <li
              className={`${styles.contrast} ${
                coin.signed_change_rate > 0 ? `${styles.red}` : `${styles.blue}`
              }`}
            >
              {(coin.signed_change_rate * 100).toFixed(2)}%
            </li>
            {/* 거래대금 (100만단위) */}
            <li className={styles.transaction}>
              {Math.floor(coin.acc_trade_price / 1000000).toLocaleString()}
              백만
            </li>
          </ul>
        ))}
      </div>
    </section>
  );
}

export default CoinList;
