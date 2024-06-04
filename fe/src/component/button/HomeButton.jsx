import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

export default function HomeButton() {
    return (
        <Link to={`/`}>
            <FaHome />
        </Link >
    )
}
