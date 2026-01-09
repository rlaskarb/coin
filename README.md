# Coin React Project 

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <img width="2560" height="1326" alt="screencapture-localhost-5173-2026-01-09-22_57_36" src="https://github.com/user-attachments/assets/185675cf-d636-4668-a95b-15ca3daa46cd" />
    </td>
    <td width="50%" align="center">
    <img width="2560" height="1326" alt="screencapture-localhost-5173-exchange-2026-01-09-22_57_17" src="https://github.com/user-attachments/assets/e82b0487-8ad5-4720-a04c-8a6b58fe6a2e" />
    </td>
  </tr>
</table>


### 지금까지 한 코드 기억 해두기 ...  <br>

#### ① 레이아웃의 혁명: "CSS Grid 땅따먹기" <br>
복잡한 거래소 화면을 div 떡칠이 아니라, 그리드로 구획을 나누고 이름(grid-area)을 붙여서 관리했습니다.

```
/* App.module.css */
.mainContainer {
  display: grid;
  /* 영역 이름으로 지도 그리기 (직관적!) */
  grid-template-areas:
    "chart chart list"
    "hoga  order list";
}
/* 각 컴포넌트는 자기 자리만 찾아가면 됨 */
.chartArea { grid-area: chart; }
.coinList  { grid-area: list; }
```

<br>


#### ② 부모-자식 대화법: "리모컨 전달하기" <br>

리스트(CoinList)를 클릭했는데 차트(Chart)가 바뀌는 마법은 **부모(Exchange)**를 통해 이루어졌습니다.

* 원리: 부모가 handleSelectCoin이라는 **함수(리모컨)**를 자식에게 주고, 자식은 클릭할 때 그 버튼을 눌렀습니다.

```
// 부모 (Exchange)
<CoinList onCoinClick={handleSelectCoin} />

// 자식 (CoinList)
<li onClick={() => onCoinClick(coin.market)}>...</li>

```

<br>

#### ③ API 데이터 요리하기: "지도(Map)와 결합(Join)"

업비트 API는 **"이름 목록"**과 **"현재가 목록"**을 따로 줬습니다. 이걸 합치는 과정이 핵심이었습니다.

1. 마켓 코드만 뽑아서 KRW-BTC,KRW-ETH... 문자열로 만듦 (.map, .join)

2. 한 번에 시세 요청 후, 기존 배열과 합침 (finalData 생성)


<br>

####  ④ 실시간 검색 필터: "체 거르기"

엔터를 치지 않아도 글자를 칠 때마다 목록이 바뀌는 기능입니다.

```
// 원본(coins)은 건드리지 않고, 필터링된 새 배열(filteredCoins)을 만듦
const filteredCoins = coins.filter((coin) => {
  return coin.korean_name.includes(searchTerm); // 이름에 검색어가 있니?
});
// 화면에는 filteredCoins를 뿌려줌 (map)

```

<br>

#### ⑤ 트레이딩뷰 연동: "이름표 바꿔치기"
업비트 데이터(KRW-BTC)를 트레이딩뷰 차트(UPBIT:BTCKRW)에 넣기 위해 문자열을 변환했습니다.

```
// KRW-BTC  ->  ["KRW", "BTC"] 쪼개고  ->  UPBIT:BTCKRW 로 조립
const [currency, symbol] = coinCode.split('-');
return `UPBIT:${symbol}${currency}`;
```

