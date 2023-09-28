import React, { useContext } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../../pages/Login";
import { useSelector } from "react-redux";
import { getUserStatus, getUsertoken } from "../../store/slices/userSlice";
import Dashboard from "../../pages/Dashboard";
import Userlist from "../../pages/UserList";
import PostList from "../../pages/PostList";
import TermsAndConditions from "../../pages/TermsAndConditions";
import PrivacyPolicy from "../../pages/PrivacyPolicy";
import Spinner from "../Spinner";
import { context } from "../../context/context";
import EmployerRequestList from "../../pages/EmployerRequestList";
import EmployerList from "../../pages/EmployerList";
import EmployeeList from "../../pages/EmployeeList";
import JobsList from "../../pages/JobsList";
import Payment from "../../pages/Payment";
import PreferenceManagement from "../../pages/PreferenceManagement";
import QuestionManagement from "../../pages/QuestionManagement";
import ReasonManagement from "../../pages/ReasonManagement";
import PostManagement from "../../pages/PostManagement";
import ReportManagement from "../../pages/ReportManagement";
import FeedbackList from "../../pages/Feedback";

const Layout = () => {
  const { isLoading } = useContext(context);
  const status = useSelector(getUserStatus);
  const authtoken = useSelector(getUsertoken);

  return (
    <>
      {status == "loading" || isLoading ? <Spinner /> : <></>}
      <div className={!authtoken ? "" : "wrapper"}>
        <BrowserRouter>
          {authtoken ? (
            <>
              <Sidebar />
              <div style={{ width: "100%" }}>
                <Nav />
                <Routes>
                  <Route
                    path="*"
                    element={<Navigate to="/admin/dashboard" />}
                  />
                  <Route
                    path="/admin/dashboard"
                    exact
                    element={<Dashboard />}
                  />
                  <Route path="/admin/payment" exact element={<Payment />} />
                  {/* <Route path="/Market-Place-Ads" exact element={<MarketPlaceAds />} /> */}
                  {/* <Route path="/Reported-Posts" exact element={<ReportedPosts />} /> */}
                  <Route path="/admin/user-list" exact element={<Userlist />} />
                 
                  <Route path="/admin/getpost" exact element={<PostList />} />
                  <Route path="/admin/feedback-list" exact element={<FeedbackList />} />
                  <Route path="/admin/report-management" exact element={<ReportManagement />} />
                  <Route
                    path="/admin/preferences"
                    exact
                    element={<PreferenceManagement />}
                  />
                  <Route
                    path="/admin/questions"
                    exact
                    element={<QuestionManagement />}
                  />
                  <Route
                    path="/admin/reason"
                    exact
                    element={<ReasonManagement />}
                  />
                  <Route
                    path="/admin/posts"
                    exact
                    element={<PostManagement />}
                  />
                  <Route
                    path="/admin/employer-list"
                    exact
                    element={<EmployerList />}
                  />
                  <Route
                    path="/admin/employee-list"
                    exact
                    element={<EmployeeList />}
                  />
                  <Route
                    path="/admin/employer-request-list"
                    exact
                    element={<EmployerRequestList />}
                  />

                  <Route
                    path="/admin/employer-jobs"
                    exact
                    element={<JobsList />}
                  />
                  {/* <Route path="/business-list" exact element={<BusinessList />} /> */}
                  <Route
                    path="/admin/terms-and-conditions"
                    exact
                    element={<TermsAndConditions />}
                  />
                  <Route
                    path="/admin/privacy-policy"
                    exact
                    element={<PrivacyPolicy />}
                  />
                  {/* <Route path="/add-category" exact element={<AddCategory />} /> */}
                </Routes>
              </div>
            </>
          ) : (
            <>
              <Routes>
                <Route path="*" element={<Navigate to="/admin/" />} />
                <Route path="/admin/" exact element={<Login />} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </div>
    </>
  );
};

export default Layout;
