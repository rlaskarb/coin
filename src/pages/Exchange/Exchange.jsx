import { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Exchange.module.css";
import CoinList from "./CoinList/CoinList";
import Chart from "./Chart/Chart";
import CoinInfo from "./CoinInfo/CoinInfo";

function Exchange() {
  // 선택된 코인상태(기본값 : 비트코인)
  const [selectedCoin, setSelectedCoin] = useState({
    code: "KRW-BTC",
    name: "비트코인",
  });
  // 코인을 선택했을때 실행될 함수(CoinList 에게 넘겨줄 리모컨)
  const handleSelectCoin = (marketCode, koreanName) => {
    setSelectedCoin({ code: marketCode, name: koreanName });
    console.log("선택된 코인 :", marketCode, koreanName);
  };

  return (
    <div className="wrapper">
      <Header />

      <main className={styles.mainContainer}>
        <section className={styles.chartArea}>
          <h2 className="blind">차트 영역</h2>
          {/* 1층: 정보창 */}
          <CoinInfo
            coinCode={selectedCoin.code}
            koreanName={selectedCoin.name}
          />

          {/* 2층: 차트 */}
          <div className={styles.chartWrapper}>
            <Chart coinCode={selectedCoin.code} />
          </div>
        </section>

        <section className={styles.hogaBox}>
          <h2>호가창 영역</h2>
        </section>
        <section className={styles.orderBox}>
          <h2>주문하기 영역</h2>
        </section>

        <CoinList onCoinClick={handleSelectCoin} />
      </main>
    </div>
  );
}

export default Exchange;
