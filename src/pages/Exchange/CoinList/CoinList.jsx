import { useEffect, useState } from "react";
import "./CoinList.css";

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
        const marketData = await response.json();

        // 원화로 시작하는 마켓만 남기기
        const krwMarkets = marketData.filter((coin) =>
          coin.market.startsWith("KRW-")
        );

        // 시세조회를 위해 마켓 코드만 뽑아서 콤마로 연결
        const marketCodes = krwMarkets.map((coin) => coin.market).join(",");

        //

        const top10 = krwCoins.slice(0, 10);
        setCoins(top10);
        console.log("가져온 코인 목록", top10);
      } catch (error) {
        console.error("실패", error);
      }
    };
    fetchCoins();
  }, []);

  return (
    <aside className="coin-column">
      <h2>코인목록</h2>
      <ul>
        {coins.map((coin) => (
          <li key={coin.market}>
            <span>{coin.korean_name}</span>
            <span>{coin.market}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CoinList;
