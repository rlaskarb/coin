 import { Link } from "react-router-dom";
 import Header from '../../components/Header/Header';
 import './MainPage.css';

function MainPage(){
    return (
        <div className='wrapper'>
           
           <Header/>

            <main className='main-container'>
                <section className='visual'>
                    <h2>비주얼 영역</h2>
                </section>
                <section className='trading-box'>
                    <h2>거래량 영역</h2>
                    <ul>
                        <li className="active"><Link to="/trading">거래량</Link></li>
                        <li><Link to="/Market">시가총액</Link></li>
                        <li><Link to="/soaring">1h급상승</Link></li>
                        <li><Link to="/decline">1h급하락</Link></li>
                    </ul>
                </section>
                <section className='announcement'>
                    <h2>공지사항</h2>
                </section>
            </main>
        </div>
    );
}

export default MainPage;