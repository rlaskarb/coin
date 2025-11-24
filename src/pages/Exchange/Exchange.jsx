import Header from "../../components/Header/Header";
import "./Exchange.css";
import CoinList from "./CoinList/CoinList";

function Exchange() {
  return (
    <div className="wrapper">
      <Header />

      <main className="main-container">
        <section className="chart-area">
          <h2>차트 영역</h2>
        </section>
        <section className="hoga-box">
          <h2>호가창 영역</h2>
        </section>
        <section className="order-box">
          <h2>주문하기 영역</h2>
        </section>

        <CoinList />
      </main>
    </div>
  );
}

export default Exchange;
