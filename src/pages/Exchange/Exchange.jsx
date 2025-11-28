import Header from "../../components/Header/Header";
import styles from "./Exchange.module.css";
import CoinList from "./CoinList/CoinList";

function Exchange() {
  return (
    <div className="wrapper">
      <Header />

      <main className={styles.mainContainer}>
        <section className={styles.chartArea}>
          <h2>차트 영역</h2>
        </section>
        <section className={styles.hogaBox}>
          <h2>호가창 영역</h2>
        </section>
        <section className={styles.orderBox}>
          <h2>주문하기 영역</h2>
        </section>
        <CoinList />
      </main>
    </div>
  );
}

export default Exchange;
