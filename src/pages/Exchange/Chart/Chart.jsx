import React, { memo } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import styles from "./Chart.module.css";

//memo : 코인 코드가 안 바뀌면 불필요하게 재랜더링 하지 말라는 성능 최적화
function Chart({ coinCode }) {
  // "KRW-BCT 를 "UPBIT:BTCKRW""로 바뀌는 마법
  // 트레이딩뷰는 "거래소명 : 심볼통화" 형식으로 원합니다.
  const convertSymbol = () => {
    if (!coinCode) return "UPBIT:BTCKRW";

    //KRW-BCT -> ["KRW","BTC"]로 쪼갬
    const [currencey, symbol] = coinCode.split("-");
    // 합쳐서 "UPBIT:BTCKRW"로 만듦
    return `UPBIT:${symbol}${currencey}`;
  };

  return (
    <div className={styles.timeChart}>
      <AdvancedRealTimeChart
        symbol={convertSymbol()} // 바꾼 심볼 넣기
        theme="light" // 밝은테마(다크모드는 'dark')
        locale="kr" // 한국어 설정
        autosize // 부모박스크기에 맞춤
        interval="D" // 기본 : 일봉
        timezone="Asia/Seoul" //한국시간
        hide_legend={false} // 왼쪽 위 코인 보이기
        allow_symbol_change={false} // 사용자가 마음대로 종목 못 바꾸게 고정
        toolbar_bg="#f1f3f6" // 툴바 배경색
        hide_side_toolbar={false} // 옆에 그리기 도구 보이기
        details={false} // 시세 디테일 끄기
        save_image={false} //이미지 저장 버튼 숨김
        hide_top_toolbar={false} //상단 툴바 보이기
        enable_publishing={false} // 아이디어 올리기 버튼 숨김(지저분함 제거)
        style="1" // 1: 캔들차드
      />
    </div>
  );
}

export default memo(Chart);
