import { useEffect, useState } from "react";
import styles from "./CoinList.module.css";

function CoinList({ onCoinClick }) {
  //코인 데이터 담을 그릇
  const [coins, setCoins] = useState([]);
  //로딩중인지 체크하는 상태
  const [loading, setLoading] = useState(true);
  //정렬 상태
  const [sortConfig, setSortConfig] = useState({
    key: "acc_trade_price",
    direction: "desc",
  });
  // 검색어 상태관리
  const [searchTerm, setSearchTerm] = useState("");
  // 모달창 열림/닫힘 상태관리
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  //검색어가 바뀌면 실행되는 함수
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // 입력한 글자상태로 업데이트
  };
  // 로그인이 필요한 버튼 클릭시 실행
  const handleLoginRequired = () => {
    setIsModalOpen(true);
  };

  // 정렬 함수
  const handleSort = (key) => {
    let direction = "desc"; // 내림차순

    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  // 숫자에 콤마 찍어주는 함수
  const formatNumber = (num) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  //정렬 화살표 아이콘 표시
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  // 검색어 필터링하기
  // 원본에서 검색어로 거른다
  const filteredCoins = coins.filter((coin) => {
    //한글명이나 검색어가 포함되어 있는지 확인
    const nameMatch = coin.korean_name.includes(searchTerm);
    const symbolMatch = coin.name_for_view
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || symbolMatch;
  });

  //걸러진 목록을 정렬합니다.
  const finalCoins = [...filteredCoins].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.key === "korean_name") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  if (loading) return <div>로딩중</div>;

  return (
    <section className={styles.listContainer}>
      <h2 className="blind">코인차트목록</h2>

      <div className={styles.searchBox}>
        <label htmlFor="coinSearch" className="blind">
          코인명 / 심볼검색
        </label>
        <input
          type="text"
          id="coinSearch"
          placeholder="코인명/심볼검색"
          value={searchTerm}
          onChange={handleSearch} // 글자마자 실행
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      <div className={styles.tabMenu}>
        <button className={styles.active}>원화</button>
        <button onClick={handleLoginRequired}>보유</button>
        <button onClick={handleLoginRequired}>관심</button>
      </div>

      <ul className={styles.listContent}>
        <li onClick={() => handleSort("korean_name")}>
          한글명 <span>{getSortIcon("korean_name")}</span>
        </li>
        <li onClick={() => handleSort("trade_price")}>
          현재가 <span>{getSortIcon("trade_price")}</span>
        </li>
        <li onClick={() => handleSort("signed_change_rate")}>
          전일대비 <span>{getSortIcon("signed_change_rate")}</span>
        </li>
        <li onClick={() => handleSort("acc_trade_price")}>
          거래대금 <span>{getSortIcon("acc_trade_price")}</span>
        </li>
      </ul>

      {/* 코인 리스트 영역 */}
      <div className={styles.coinScroll}>
        {finalCoins.map((coin) => (
          <ul
            key={coin.market}
            className={styles.coinContent}
            onClick={() => onCoinClick(coin.market)}
          >
            {/* 별표 아이콘 (클릭시 로그인 모달) */}
            <li>
              <i
                className={`fa-regular fa-star ${styles.starIcon}`}
                onClick={(e) => {
                  e.stopPropagation(); // 부모클릭방지
                  handleLoginRequired();
                }}
              ></i>
            </li>
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
      {/* 로그인창으로 이동하는 모달창 조건부렌더링 */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p>
              로그인이 필요한 서비스입니다. <br /> 로그인 하시겠습니까?
            </p>
            <div className={styles.modalBtns}>
              <button onClick={() => alert("나중에 만들께요")}>확인</button>
              <button onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CoinList;
