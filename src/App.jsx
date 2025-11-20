import {Routes,Route} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Exchange from './pages/Exchange/Exchange';

function App() {
  return (
    <Routes>
      {/* 메인 홈페이지 */}
      <Route path="/" element={<MainPage />} />
      {/* 거래소 페이지 */}
        <Route path="/exchange" element={<Exchange />} />
    </Routes>
  );
}

export default App;


