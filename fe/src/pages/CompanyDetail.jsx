import swal from 'sweetalert';
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getData } from "../util/api";
import BackButton from "../component/button/BackButton";
import HomeButton from "../component/button/HomeButton";
import Loader from "../animation/Loader";
import '../../style/history.css';

export default function CompanyDetail() {
    const { symbol } = useParams();

    const oneMonthString = new Date();
    oneMonthString.setDate(oneMonthString.getDate() - 30);
    const oneMonth = oneMonthString.toISOString().split('T')[0];

    const [company, setCompany] = useState(null);
    const [toDate, setToDate] = useState((new Date()).toISOString().split('T')[0]);
    const [fromDate, setFromDate] = useState(oneMonth);
    let [chart1, setChart1] = useState();
    let [chart2, setChart2] = useState();

    useEffect(() => {
        (async () => {
            // const responseCompany = await axios.get('http://localhost:3000/api2/profile');
            // const responseCompany = await getData(`${symbol}/profile`);
            getData(`${symbol}/profile`).then(responseCompany => {
                const company = responseCompany.data.data;
                setCompany(company);
            }).catch(err => console.log(err.message));


            // const responseHistory = await axios.get('http://localhost:3000/api2/history');
            // const responseHistory = await getData(`${symbol}/historical`,{from: oneMonth,to: toDate});
            getData(`${symbol}/historical`, { from: fromDate, to: toDate }).then(responseHistory => {
                const datas = responseHistory.data.data.results.reverse();
                const dates = datas.map(data => data.date);
                chart1.data.labels = dates;
                chart2.data.labels = dates;

                const volumes = datas.map(data => data.volume);
                chart1.data.datasets[0].data = volumes;
                chart1.update();

                const highs = datas.map(data => data.high);
                chart2.data.datasets[0].data = highs;
                chart2.update();
            }).catch((error) => console.log(error.request.response ?? error.message));


            const chart1 = new Chart(
                document.getElementById('data-harga'),
                {
                    type: 'line',
                    options: {
                        plugins: {
                            title: {
                                text: 'Riwayat Data Saham Perusahaan',
                                display: true
                            }
                        },
                    },
                    data: {
                        labels: [],
                        datasets: [
                            {
                                data: [],
                                label: "Harga Saham",
                                borderColor: "#3e95cd",
                                fill: false
                            },
                        ]
                    }
                }
            );
            setChart1(chart1);

            const chart2 = new Chart(
                document.getElementById('data-pembeli'),
                {
                    type: 'line',
                    data: {
                        labels: [],
                        datasets: [
                            {
                                data: [],
                                label: "Jumlah Pembeli Saham",
                                borderColor: "yellow",
                                fill: false
                            },
                        ]
                    }
                }
            );
            setChart2(chart2);
        })();
    }, []);

    function fromOnChangeHandler(e) {
        if (e.target.value >= (new Date()).toISOString().split('T')[0]) {
            return swal({
                'icon': 'error',
                'text': 'Tanggal tidak valid!',
            });
        }
        setFromDate(e.target.value);
    }

    function toOnChangeHandler(e) {
        if (e.target.value > (new Date()).toISOString().split('T')[0]) {
            return swal({
                'icon': 'error',
                'text': 'Tanggal tidak valid!',
            });
        }
        setToDate(e.target.value);
    }

    function changeDateHandler(e) {
        e.preventDefault();

        getData(`${symbol}/historical`, { from: fromDate, to: toDate }).then(responseHistory => {
            const datas = responseHistory.data.data.results.reverse();
            const dates = datas.map(data => data.date);
            chart1.data.labels = dates;
            chart2.data.labels = dates;

            const volumes = datas.map(data => data.volume);
            chart1.data.datasets[0].data = volumes;
            chart1.update();

            const highs = datas.map(data => data.high);
            chart2.data.datasets[0].data = highs;
            chart2.update();
        }).catch(err => console.log(err.message));
    }

    return (
        <>
            <div className="main-container">
                <div className="header-container">
                    <BackButton />
                    <h1>Detail Perusahaan</h1>
                    <HomeButton />
                </div>
                <div className="content-container company-detail-content">
                    {
                        company ? <>
                            <div className="company-container">
                                <h1>{company.name}</h1>
                                <div className="company-body-container">
                                    <div className="company-image">
                                        <img src={company.logo} />
                                    </div>
                                    <div className="company-detail">
                                        <h5>Industri: {company.industry_name}</h5>
                                        <h5>Sektor: {company.sector_name}</h5>
                                        <h5>Alamat: {company.address}</h5>
                                        <h5>Email: {company.email}</h5>
                                        <h5>Website: {company.website}</h5>
                                    </div>
                                </div>
                            </div>
                        </> : <div className="loader-container">
                            <Loader />
                            <p>Mengambil data, mohon tunggu...</p>
                        </div>
                    }
                    <div className="history-container">
                        <div className="date-container">
                            <form className="form-date-container" onSubmit={changeDateHandler}>
                                <div className="input-container">
                                    <label htmlFor="fromInput">
                                        Awal Riwayat:
                                        <input type="date" value={fromDate} id="fromInput" onChange={fromOnChangeHandler} />
                                    </label>
                                    <label htmlFor="toInput">
                                        Akhir Riwayat:
                                        <input type="date" value={toDate} id="toInput" onChange={toOnChangeHandler} />
                                    </label>
                                </div>
                                <button>Atur tanggal</button>
                            </form>
                            <div className="table-riwayat">
                                <div style={{ width: "90%" }}><canvas id="data-harga"></canvas></div>
                                <div style={{ width: "90%" }}><canvas id="data-pembeli"></canvas></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
