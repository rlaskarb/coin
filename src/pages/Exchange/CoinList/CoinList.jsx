import { useEffect, useState } from "react";
import "./CoinList.css";

function CoinList() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.upbit.com/v1/market/all?isDetails=false"
        );
        const data = await response.json();

        const krwCoins = data.filter((coin) => coin.market.includes("KRW-"));
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
