import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <Link to={`/`} onClick={goBack}>
            <FaArrowLeft />
        </Link >
    )
}
