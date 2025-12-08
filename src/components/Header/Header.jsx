import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <Link to="/">
            <h1>upbit</h1>
          </Link>
        </div> 

        <nav className={styles.gnb}>
          <ul>
            <li>
              <Link to="/exchange">거래소</Link>
            </li>
            <li>
              <Link to="/deposit">입출금</Link>
            </li>
            <li>
              <Link to="/investment">투자내역</Link>
            </li>
            <li>
              <Link to="/movement">코인동향</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.utilMenu}>
          <button className={styles.btnLogin}>로그인</button>
          <button className={styles.btnSignup}>회원가입</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
