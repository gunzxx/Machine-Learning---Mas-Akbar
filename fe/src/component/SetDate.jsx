import PropTypes from 'prop-types';

export default function SetDate({ changeDateHandler, fromDate, fromOnChangeHandler, toDate, toOnChangeHandler }) {
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
    )
}

SetDate.propTypes = {
    changeDateHandler: PropTypes.func.isRequired,
    fromDate: PropTypes.string.isRequired,
    fromOnChangeHandler: PropTypes.func.isRequired,
    toDate: PropTypes.string.isRequired,
    toOnChangeHandler: PropTypes.func.isRequired,
}