import { useEffect, useState } from "react";
import styles from "./CoinInfo.module.css";

function CoinInfo({ coinCode }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        if (!coinCode) return;
        //선택된 코인의 시세 정보 딱 1개만 가져옴
        const response = await fetch(
          `https://api.upbit.com/v1/ticker?markets=${coinCode}`
        );
        const data = await response.json();
        setInfo(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicker();

    //1분마다 갱신
    const interval = setInterval(fetchTicker, 10000);
    return () => clearInterval(interval);
  }, [coinCode]);
}
