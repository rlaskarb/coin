import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./MainPage.module.css";

function MainPage() {
  return (
    <div className="wrapper">
      <Header />

      <main className={styles.mainContainer}>
        <section className={styles.visual}>
          <h2 className="blind">비주얼 영역</h2>
          <div className={styles.visualContent}>
            <div className={styles.visualText}>
              <p>
                가장 신뢰받는 거래소 <br />
                글로벌 디지털 자산 거래소 <br />
                <strong>업비트</strong>
              </p>
              <div className={styles.textBtn}>
                <Link
                  to="/exchange"
                  className={`${styles.textbtn} ${styles.btn1}`}
                >
                  거래소 둘러보기
                </Link>
                <button className={`${styles.textbtn} ${styles.btn2}`}>
                  로그인
                </button>
              </div>
            </div>
            <div className={styles.visualImg}>
              <img src="/map.avif" alt="map" />
              <div className={styles.upbitPin}>
                <div className={styles.upbitimg}>
                  <img src="/visualUPbit.svg" alt="upbit" />
                </div>
                <i className="fa-solid fa-location-dot"></i>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.tradingBox}>
          <h2 className="blind">거래량</h2>
          <ul>
            <li className={styles.active}>
              <Link to="/trading">거래량</Link>
            </li>
            <li>
              <Link to="/Market">시가총액</Link>
            </li>
            <li>
              <Link to="/soaring">1h급상승</Link>
            </li>
            <li>
              <Link to="/decline">1h급하락</Link>
            </li>
          </ul>
        </section>

        <section className={styles.announcement}>
          <h2>공지사항</h2>
        </section>
      </main>
    </div>
  );
}

export default MainPage;
