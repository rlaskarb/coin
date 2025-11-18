import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello World</h1>

      <h2>현재가격 : {count} 원 </h2>

      <button onClick={() => setCount(count + 100)}> 가격 올리기 </button>
      <button onClick={() => setCount(count - 100)}> 가격 내리기 </button>

      <p>리엑트로 코인매수매매를 만들어봅시다</p>
    </div>
  );
}

export default App;


