import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import stockBG from '../../images/stock-bg.jpg';
import gainerImg from '../../images/gainer.jpg';
import loserImg from '../../images/loser.jpg';

export default function Home() {
  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:3000/api2/gainer');
      const resDatas = response.data.data;
      console.log(resDatas);
    })();
  }, []);

  return (
    <>
      <div className="main-container home-container">
        <img src={stockBG} />
        <h1>Forecasting Harga Saham di Indonesia</h1>
        <div className="list-menu-container">
          <p>Silahkan pilih data yang ingin anda analisis:</p>
          <div className="choice-container">
            <Link className='list-menu' to={'/gainer'}>
              <div className="list-img">
                <img src={gainerImg} alt="" />
              </div>
              <p>Harga saham dengan perubahan tertinggi</p>
            </Link>
            <Link className='list-menu' to={'/loser'}>
              <div className="list-img">
                <img src={loserImg} alt="" />
              </div>
              <p>Harga saham dengan perubahan terendah</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
