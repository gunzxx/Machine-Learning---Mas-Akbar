import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getData } from "../util/api";
import BackButton from "../component/button/BackButton";
import HomeButton from "../component/button/HomeButton";
import swal from 'sweetalert'
import '../../style/history.css';
import Loader from "../animation/Loader";

export default function CompanyDetail() {
    const { symbol } = useParams();
    const navigate = useNavigate()

    const oneMonthString = new Date();
    oneMonthString.setDate(oneMonthString.getDate() - 30);

    const [company, setCompany] = useState(null);
    let [chart1, setChart1] = useState();
    const [predict, setPredict] = useState(0);
    // let chart1, chart2;

    useEffect(() => {
        (async () => {
            getData(`${symbol}/profile`).then(responseData => {
                const company = responseData.data.data;
                console.log(company);
                setCompany(company);
            }).catch(error => {
                try {
                    const errorMessage = error.request ? JSON.parse(error.request.response).message : error.message;
                    swal({
                        title: errorMessage
                    }).then(() => {
                        navigate(-1)
                    })
                } catch (exception) {
                    swal({
                        title: error.request.response
                    }).then(() => {
                        navigate(-1)
                    })
                }
            })

            getData(`${symbol}/predict`).then(responseData => {
                const datas = responseData.data.data.reverse();
                const dates = datas.map(data => data.date);
                chart1.data.labels = dates;

                const harga = datas.map(data => data.close);
                setPredict(responseData.data.predicted)
                chart1.data.datasets[0].data = harga;
                chart1.update();
            }).catch((error) => {
                try {
                    const errorMessage = error.request ? JSON.parse(error.request.response).message : error.message;
                    swal({
                        title: errorMessage
                    }).then(() => {
                        navigate(-1)
                    })
                } catch (exception) {
                    swal({
                        title: error.request.response
                    }).then(() => {
                        navigate(-1)
                    })
                }
            });


            const chart1 = new Chart(
                document.getElementById('data-harga'),
                {
                    type: 'bar',
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function (value, index, values) {
                                        return `${value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`;
                                    }
                                },
                            }
                        },
                        plugins: {
                            title: {
                                text: 'Riwayat Data Saham Perusahaan',
                                display: true
                            },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        let value = context.raw;
                                        return `${value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`;
                                    }
                                }
                            }
                        },
                    },
                    data: {
                        labels: [],
                        datasets: [
                            {
                                data: [],
                                label: "Harga Saham",
                                backgroundColor: 'rgba(54, 162, 235, 1)',
                                borderColor: "red",
                                fill: true,
                            },
                        ]
                    }
                }
            );
            setChart1(chart1);
        })();
    }, []);


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
                                <div className="company-image">
                                    <img src={company.logo} />
                                </div>
                                <h1>{company.name}</h1>
                            </div>
                        </> : <div className="loader-container">
                            <Loader />
                            <p>Mengambil data, mohon tunggu...</p>
                        </div>
                    }
                    <div className="history-container">
                        <div className="date-container">
                            <div className="table-riwayat">
                                <div style={{ width: "90%" }}><canvas id="data-harga"></canvas></div>
                            </div>
                        </div>
                    </div>
                    <div className="predict-container">
                        <div className="h1">Prediksi harga besok: {predict.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
