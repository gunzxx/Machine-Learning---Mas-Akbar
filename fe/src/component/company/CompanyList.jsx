import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default function CompanyList({ company }) {
    return (
        <div key={company.symbol} className="company-list">
            <div className="company-image">
                <img loading="lazy" src={company.company.logo} />
            </div>
            <div className="company-detail">
                <Link to={`/company/${company.symbol}`}><h3 title={`Lihat detail ${company.company.name}`}>{company.company.name}</h3></Link>
                <p>Harga: {company.close.toLocaleString('id-ID',{style: 'currency', currency: 'IDR'})}</p>
                <p>Perubahan Kepemilikan: {company.change}</p>
                <p>Perubahan Harga: {company.percent}%</p>
            </div>
        </div>
    )
}


CompanyList.propTypes = {
    company: PropTypes.object.isRequired,
}