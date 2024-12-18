import Header from "../components/landingPage/Header";
import UserList from "../components/admin/userList.tsx";
import { Link } from "react-router-dom";

const userInfo = JSON.parse(localStorage.getItem("user_info") || '{}');
const userId = userInfo.id;

const adminPage = () => {
    return (
        <div>
            <Link to={`/${userId}`} style={{ textDecoration: "none" }}>
                <Header />
            </Link>
            <UserList />
        </div>
    )
}

export default adminPage