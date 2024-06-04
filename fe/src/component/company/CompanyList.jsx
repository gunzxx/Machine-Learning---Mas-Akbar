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
                <p>Perubahan harga: {company.change}</p>
                <p>Persentase: {company.percent}%</p>
            </div>
        </div>
    )
}


CompanyList.propTypes = {
    company: PropTypes.object.isRequired,
}