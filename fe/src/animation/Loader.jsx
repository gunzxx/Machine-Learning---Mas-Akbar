import '../../style/loader.css';

export default function Loader() {
    return (
        <section className="loader">
            <div className="slider" style={{ "--i": 0 }}>
            </div>
            <div className="slider" style={{ "--i": 1 }}>
            </div>
            <div className="slider" style={{ "--i": 2 }}>
            </div>
            <div className="slider" style={{ "--i": 3 }}>
            </div>
            <div className="slider" style={{ "--i": 4 }}>
            </div>
        </section>
    )
}
