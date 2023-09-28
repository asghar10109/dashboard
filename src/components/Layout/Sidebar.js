import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import logo from '../../assets/images/logo.png'
import { context } from '../../context/context';
const Sidebar = () => {
    var location = useLocation()
    const { toggleButton } = useContext(context);
    return (
        <>
            <nav id="sidebar" className={toggleButton ? 'active' : ""} >
                <div className="sidebar-header">
                    <div className="logo text-center">
                        <Link to="/admin/dashboard"><img src="/assets/images/lion.jpg" style={{ width: "70%" }} alt="logo" className="img-fluid logo-image" /></Link>
                    </div>
                </div>
                <ul className="list-unstyled components">
                    <li className={location?.pathname === "/admin/dashboard" ? "active" : "noactive"}> <Link to="/dashboard">Dashboard</Link> </li>
                    {/* <li className={location?.pathname === "/admin/payment" ? "active" : "noactive"}> <Link to="/admin/payment">Payment</Link> </li> */}
                    <li className={location?.pathname === "/admin/user-list" || location?.pathname === "/admin/report-management" || location?.pathname === "/admin/feedback-list" ? "active" : "noactive"}>
                        <a href="#user" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Users Management</a>
                        <ul className={location?.pathname === "/admin/user-list" || location?.pathname === "/admin/report-management" || location?.pathname === "/admin/feedback-list"  ? "list-unstyled" : "list-unstyled collapse"} id="user">
                            <li className={location?.pathname === "/admin/user-list" ? "active" : "noactive"}> <Link to="/admin/user-list">All Users</Link> </li>
                            <li className={location?.pathname === "/admin/getpost" ? "active" : "noactive"}> <Link to="/admin/getpost">All Posts</Link> </li>
                            <li className={location?.pathname === "/admin/report-management" ? "active" : "noactive"}> <Link to="/admin/report-management">All Reports</Link> </li>
                            <li className={location?.pathname === "/admin/feedback-list" ? "active" : "noactive"}> <Link to="/admin/feedback-list">All Feedbacks</Link> </li>
                            {/* <li className={location?.pathname === "/admin/employer-request-list" ? "active" : "noactive"}> <Link to="/admin/employer-request-list">All Employer Requests</Link> </li>
                            <li className={location?.pathname === "/admin/employer-list" ? "active" : "noactive"}> <Link to="/admin/employer-list">All Employers</Link> </li>
                            <li className={location?.pathname === "/admin/employee-list" ? "active" : "noactive"}> <Link to="/admin/employee-list">All Employees</Link> </li> */}
                            
                        </ul>
                    </li>
                    {/* <li className={location?.pathname === "/Market-Place-Ads"  ? "active" : "noactive"}>
                        <a href="#reporting" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Ads Management</a>
                        <ul className={location?.pathname === "/Market-Place-Ads"  ? "list-unstyled" : "collapse list-unstyled"} id="reporting">
                            <li className={location?.pathname === "/Market-Place-Ads" ? "active" : "noactive"}> <Link to="/Market-Place-Ads">Market Place Ads</Link> </li>
                        </ul>
                    </li>
                    <li className={location?.pathname === "/Reported-Posts"  ? "active" : "noactive"}>
                        <a href="#postReports" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Report Management</a>
                        <ul className={location?.pathname === "/Reported-Posts"  ? "list-unstyled" : "collapse list-unstyled"} id="postReports">
                            <li className={location?.pathname === "/Reported-Posts" ? "active" : "noactive"}> <Link to="/Reported-Posts">Reported Posts</Link> </li>
                        </ul>
                    </li> */}
                    <li className={location?.pathname === "/admin/posts" || location?.pathname === "/admin/preferences" || location?.pathname === "/admin/questions" || location?.pathname === "/admin/reason" ? "active" : "noactive"}>
                        <a href="#management" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Management</a>
                        <ul className={location?.pathname === "/admin/posts" || location?.pathname === "/admin/preferences" || location?.pathname === "/admin/questions" || location?.pathname === "/admin/reason" ? "list-unstyled" : "collapse list-unstyled"} id="management">
                            <li className={location?.pathname === "/admin/posts" ? "active" : "noactive"}> <Link to="/admin/posts">Posts</Link> </li>
                            <li className={location?.pathname === "/admin/preferences" ? "active" : "noactive"}> <Link to="/admin/preferences">Preference</Link> </li>
                            <li className={location?.pathname === "/admin/questions" ? "active" : "noactive"}> <Link to="/admin/questions">Questions</Link> </li>
                            <li className={location?.pathname === "/admin/reason" ? "active" : "noactive"}> <Link to="/admin/reason">Reasons</Link> </li>
                            {/* <li className={location?.pathname === "/admin/payment" ? "active" : "noactive"}> <Link to="/admin/payment">Payment</Link> </li> */}

                        </ul>
                    </li> 
                    <li className={location?.pathname === "/admin/terms-and-conditions" || location?.pathname === "/admin/privacy-policy" ? "active" : "noactive"}>
                        <a href="#content" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Content Management</a>
                        <ul className={location?.pathname === "/admin/terms-and-conditions" || location?.pathname === "/admin/privacy-policy" ? "list-unstyled" : "collapse list-unstyled"} id="content">
                            <li className={location?.pathname === "/admin/terms-and-conditions" ? "active" : "noactive"}> <Link to="/admin/terms-and-conditions">Terms & Conditions</Link> </li>
                            <li className={location?.pathname === "/admin/privacy-policy" ? "active" : "noactive"}> <Link to="/admin/privacy-policy">Privacy Policy</Link> </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>

    )
}

export default Sidebar