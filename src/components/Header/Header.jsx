import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <h1>upbit</h1>
      </div>

      <nav className="gnb">
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

      <div className="util-menu">
        <button className="btn-login">로그인</button>
        <button className="btn-signup">회원가입</button>
      </div>
    </header>
  );
};

export default Header;
