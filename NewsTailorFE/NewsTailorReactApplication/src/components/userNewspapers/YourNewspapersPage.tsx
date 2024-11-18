import Sidebar from "../contentPage/Sidebar.tsx";
import Header from '../landingPage/Header.tsx';


function YourNewspapersPage() {
    return (
        <div>
            <Sidebar />
            <Header />
            <div className="your-newspapers-container">
                <h1>Your Newspapers</h1>
            </div>    
        </div>
    )

}
export default YourNewspapersPage
