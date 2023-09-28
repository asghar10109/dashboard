import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  acceptRejectReport,
  blockUnblock,
  deleteAccount,
  getAllReports,
  getAllUsers,
  getUserStatus,
} from "../store/slices/userSlice";
import { CSVLink } from "react-csv";
import $ from "jquery";
import "datatables.net";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
        scrollbarColor: "red orange",
        scrollbarWidth: "thin",
  },
};
Modal.setAppElement("#root");
const ReportManagement = () => {
  const [id, setId] = useState();
  const [reportstatus, setReportstatus] = useState();
  const dispatch = useDispatch();
  const [reports, setReports] = useState(null);
  const status = useSelector(getUserStatus);
  const [reportDetail, setReportDetail] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [count, setCount] = useState(0);
  // var csvData = [
  //     ["Name", "Email", "Number", "State", "Verified", "Zip Code", "Role"],
  // ]
  // users?.map((item) =>
  //     csvData.push([`${item?.name}`, `${item?.email}`, `${item?.number}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
  // )

  console.log("reportDetail", reportDetail);
  function viewModal(item, reportstatus, type) {
    setIsOpen(true);
    if (type == "reportDetail") {
        setReportDetail(item);
    } else if (type == "delete") {
      setId(item);
      setReportstatus(reportstatus);
    }
    setModalType(type);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // const accountDelete = async (id) => {
  //     try {
  //         await dispatch(deleteAccount(id)).unwrap()
  //         setIsOpen(false)
  //         $('#tableData')
  //             .DataTable().destroy();
  //         try {
  //             Users()
  //         } catch (rejectedValueOrSerializedError) {
  //             console.log(rejectedValueOrSerializedError)
  //         }
  //     } catch (rejectedValueOrSerializedError) {
  //         console.log(rejectedValueOrSerializedError)
  //     }
  // }

  // console.log("id", id);
  // console.log("reportstatus", reportstatus);

  const AllReports = async () => {
    try {
      // setUsers(null)
      const response = await dispatch(getAllReports()).unwrap();
    
      setReports(response?.data);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const RejectAcceptReport = async () => {
    try {
      console.log("reportstatusss", reportstatus);
      await dispatch(
        acceptRejectReport({ report_id: id._id, status: reportstatus })
      ).unwrap();
      $("#tableData").DataTable().destroy();
      $("#tableData2").DataTable().destroy();
      AllReports();
      try {
        closeModal();
        AllReports();
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError);
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };
  useEffect(() => {
    let mount = true;
    if (mount) {
      AllReports();
    }
    // return () => {
      mount = false;
    // };
  }, []);

  useEffect(() => {
    if (reports) {
      $("#tableData").DataTable({
        lengthMenu: [10, 25, 50, 100, 200],
        language: {
          emptyTable: "Reports Not Found",
        },
        destroy: true,
      });
      $("#tableData2").DataTable({
        lengthMenu: [10, 25, 50, 100, 200],
        language: {
          emptyTable: "Reports Not Found",
        },
        destroy: true,
      });
    }
  }, [reports]);

  return (
    <>
      <Modal
        closeTimeoutMS={500}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Change Password"
      >
        <div
          className="change-password-modal"
          id="exampleModalCenter"
          tabIndex={-1}
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          style={{ display: "block", zIndex: 100 }}
        >
          {modalType == "reportDetail" ? (
            <>
              <p className="pass-text">Report Detail</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                <p>
                  {" "}
                  <b>Image:</b>{" "}
                  {reportDetail?.user_id?.user_image ? (
                    <>
                      <img
                        height="20%"
                        width="20%"
                        style={{ borderRadius: 5 }}
                        src={`${process.env.REACT_APP_APIIMAGE}${reportDetail?.user_id?.user_image}`}
                      ></img>
                    </>
                  ) : (
                    <>No Image Found</>
                  )}
                </p>
                <p>
                  {" "}
                  <b>Name:</b>{" "}
                  {reportDetail?.user_id?.user_name ? (
                    reportDetail?.user_id?.user_name
                  ) : (
                    <>Name not mentioned</>
                  )}
                </p>
                <p>
                  {" "}
                  <b>Email:</b> {reportDetail?.user_id?.user_email}
                </p>
                <p>
                  {" "}
                  <b>Number:</b>{" "}
                  {reportDetail?.user_id?.user_phone ? (
                    reportDetail?.user_id?.user_phone
                  ) : (
                    <>Number not mentioned</>
                  )}
                </p>
                {/* <p>
                  {" "}
                  <b>Address:</b>{" "}
                  {reportDetail?.user_address ? (
                    reportDetail?.user_address
                  ) : (
                    <>Address not mentioned</>
                  )}
                </p>
                <p>
                  {" "}
                  <b>State:</b>{" "}
                  {reportDetail?.user_state ? (
                    reportDetail?.user_state
                  ) : (
                    <>State not mentioned</>
                  )}
                </p> */}
                {/* <p>
                  {" "}
                  <b>Country:</b>{" "}
                  {reportDetail?.user_country ? (
                    reportDetail?.user_country
                  ) : (
                    <>Zip Code not mentioned</>
                  )}
                </p> */}
              </div>
            </>
          ) : modalType == "delete" ? (
            <>
              {reportstatus == 1 ? (
                <p className="pass-text">Are you sure you want to Accept?</p>
              ) : (
                <p className="pass-text">Are you sure you want to Reject?</p>
              )}
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                <form>
                  <div
                    className="pass-form-wrap"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div className="login-button mt-2" style={{ width: "40%" }}>
                      <button
                        type="button"
                        onClick={() => RejectAcceptReport(id._id)}
                        className="cta-btn col-reds w-100"
                      >
                        {reportstatus === 1 ? "Accept" : "Reject"}
                      </button>
                    </div>
                    <div className="login-button mt-2" style={{ width: "40%" }}>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="cta-btn col-reds w-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: reports ? "3%" : "12%",
        }}
      >
        {/* <section className="excel-sec">
                    <div className="container">
                        <div className=" mt-2 mb-3">
                            {users ?
                                <button className="excel-btn col-reds w-10 pt-1 pb-1">
                                    <CSVLink filename={"User List.csv"} data={csvData}>Export Excel</CSVLink>
                                </button>
                                : <></>}
                        </div>
                    </div>
                </section> */}
        <section className="coupon-sec-2">
          <div className="container tableContainer">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="card shadow mb-4">
                  <div className="card-body">
                    <div className="table-responsive" id="tableready">
                    <h1 className='titleTxt'>All Post Reports</h1>
                      <table
                        id="tableData"
                        className="table table-bordered"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <thead>
                          {reports ? (
                            <tr>
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Gender</th>
                              <th>DOB</th>
                              <th>Post Title</th>
                              <th>Post Type</th>
                              {/* <th>Comment</th> */}
                              <th>Report</th>
                              <th>Report Date</th>
                              {/* <th>View Detail</th> */}
                              <th>Accept/Reject</th>
                            </tr>
                          ) : (
                            <tr></tr>
                          )}
                        </thead>
                        <tbody>
                          {reports?.map((item, i) => (
                            <>
                            {console.log("item",item )}
                            {/* {item?.comment_id == null && item?.post_id != null ? */}
                             {/* <> */}
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                  {item?.user_id?.user_name ? (
                                    item?.user_id?.user_name
                                  ) : (
                                    <>abdullah</>
                                  )}
                                </td>
                                <td>
                                  {item?.user_id?.user_gender ? (
                                    item?.user_id?.user_gender
                                  ) : (
                                    <>Gender not mentioned</>
                                  )}
                                </td>
                                <td>
                                  {item?.user_id?.user_dob ? (
                                    item?.user_id?.user_dob
                                  ) : (
                                    <>DOB not mentioned</>
                                  )}
                                </td>
                                <td>
                                  {item?.post ? (
                                    item?.post
                                  ) : (
                                    <>Title not mentioned</>
                                  )}
                                </td>
                                <td>
                                  {item?.post_id?.type ? (
                                    item?.post_id?.type
                                  ) : (
                                    <>Type not mentioned</>
                                  )}
                                </td>
                                {/* <td>
                                  {item?.comment_id?.comment ? (
                                    item?.comment_id?.comment
                                  ) : (
                                    <>Comment not mentioned</>
                                  )}
                                </td> */}
                                <td>
                                  {item?.reportedtext ? (
                                    item?.reportedtext
                                  ) : (
                                    <>Text not mentioned</>
                                  )}
                                </td>
                                <td>
                                  {moment(item?.createdAt).format("DD-MMM-YYYY")}
                                </td>
                                {/* <td>
                                  <span className="edit-icon">
                                    <span
                                      style={{
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        margin: 10,
                                        fontSize: 13,
                                      }}
                                      onClick={() =>
                                        viewModal(item, null, "reportDetail")
                                      }
                                    >
                                      <i className="fas fa-eye"></i> View
                                    </span>
                                  </span>
                                </td> */}
                                <td>
                                  {item?.status == 1 ? (
                                    <><span
                                    style={{
                                      // cursor: "pointer",
                                      fontWeight: "bold",
                                      margin: 10,
                                    }}
                                    
                                  >
                                    {
                                      <>
                                      {/* <i className="fa fa-solid fa-ban"> */}
                                        {" "}
                                        Accepted
                                      {/* </i> */}
                                      </>
                                    }
                                  </span></>
                                  ) : (
                                    <>
                                      <span className="edit-icon">
                                        <span
                                          style={{
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            margin: 10,
                                          }}
                                          onClick={() =>
                                            viewModal(item, 1, "delete")
                                          }
                                        >
                                          {
                                            <i className="fa fa-solid fa-ban">
                                              {" "}
                                              Accept
                                            </i>
                                          }
                                        </span>
                                        <span
                                          style={{
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            margin: 10,
                                          }}
                                          onClick={() =>
                                            viewModal(item, 0, "delete")
                                          }
                                        >
                                          {
                                            <i className="fa fa-solid fa-ban">
                                              {" "}
                                              Reject
                                            </i>
                                          }
                                        </span>
                                        {/* <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.user_is_blocked === 1 ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span> */}
                                      </span>
                                    </>
                                  )}
                                </td>
                              </tr>
                              
                              {/* </> 
                              : <></> */}
                              {/* } */}
                            </>
                          ))}
                        </tbody>
                        {/* <tfoot>
                                                    {users ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Number</th>
                                                        <th>Registration date</th>
                                                        <th>Detail</th>
                                                        <th>Action</th>
                                                    </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Users Found"}</th></tr>)}
                                                </tfoot> */}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: reports ? "3%" : "12%",
        }}
      >
        {/* <section className="excel-sec">
                    <div className="container">
                        <div className=" mt-2 mb-3">
                            {users ?
                                <button className="excel-btn col-reds w-10 pt-1 pb-1">
                                    <CSVLink filename={"User List.csv"} data={csvData}>Export Excel</CSVLink>
                                </button>
                                : <></>}
                        </div>
                    </div>
                </section> */}
        <section className="coupon-sec-2">
          <div className="container tableContainer">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="card shadow mb-4">
                  <div className="card-body">
                    <div className="table-responsive" id="tableready">
                    <h1 className='titleTxt'>All Comment Reports</h1>
                      <table
                        id="tableData2"
                        className="table table-bordered"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <thead>
                          {reports ? (
                            <tr>
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Gender</th>
                              <th>DOB</th>
                              {/* <th>Post Title</th>
                              <th>Post Type</th> */}
                              <th>Comment</th>
                              <th>Report</th>
                              <th>Report Date</th>
                              {/* <th>View Detail</th> */}
                              <th>Accept/Reject</th>
                            </tr>
                          ) : (
                            <tr></tr>
                          )}
                        </thead>
                        <tbody>
                          {reports?.map((item, i) => (
                            <>
                            {item?.comment_id != null && item?.post_id == null ? <>
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                  {item?.user_id?.user_name ? (
                                    item?.user_id?.user_name
                                  ) : (
                                    <>Name not mentioned</>
                                  )}
                                </td>
                                <td>
                                  {item?.user_id?.user_gender ? (
                                    item?.user_id?.user_gender
                                  ) : (
                                    <>Gender not mentioned</>
                                  )}
                                </td>
                                <td>
                                  {item?.user_id?.user_dob ? (
                                    item?.user_id?.user_dob
                                  ) : (
                                    <>DOB not mentioned</>
                                  )}
                                </td>
                                {/* <td>
                                  {item?.post_id?.title ? (
                                    item?.post_id?.title
                                  ) : (
                                    <>Title not mentioned</>
                                  )}
                                </td>
                                <td>
                                  {item?.post_id?.type ? (
                                    item?.post_id?.type
                                  ) : (
                                    <>Type not mentioned</>
                                  )}
                                </td> */}
                                <td>
                                  {item?.comment_id?.comment ? (
                                    item?.comment_id?.comment
                                  ) : (
                                    <>Comment not mentioned</>
                                  )}
                                </td>
                                <td>
                                  {item?.text ? (
                                    item?.text
                                  ) : (
                                    <>Text not mentioned</>
                                  )}
                                </td>
                                <td>
                                  {moment(item?.createdAt).format("DD-MMM-YYYY")}
                                </td>
                                {/* <td>
                                  <span className="edit-icon">
                                    <span
                                      style={{
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        margin: 10,
                                        fontSize: 13,
                                      }}
                                      onClick={() =>
                                        viewModal(item, null, "reportDetail")
                                      }
                                    >
                                      <i className="fas fa-eye"></i> View
                                    </span>
                                  </span>
                                </td> */}
                                <td>
                                  {item?.status == 1 ? (
                                    <><span
                                    style={{
                                      // cursor: "pointer",
                                      fontWeight: "bold",
                                      margin: 10,
                                    }}
                                    
                                  >
                                    {
                                      <>
                                      {/* <i className="fa fa-solid fa-ban"> */}
                                        {" "}
                                        Accepted
                                      {/* </i> */}
                                      </>
                                    }
                                  </span></>
                                  ) : (
                                    <>
                                      <span className="edit-icon">
                                        <span
                                          style={{
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            margin: 10,
                                          }}
                                          onClick={() =>
                                            viewModal(item, 1, "delete")
                                          }
                                        >
                                          {
                                            <i className="fa fa-solid fa-ban">
                                              {" "}
                                              Accept
                                            </i>
                                          }
                                        </span>
                                        <span
                                          style={{
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            margin: 10,
                                          }}
                                          onClick={() =>
                                            viewModal(item, 0, "delete")
                                          }
                                        >
                                          {
                                            <i className="fa fa-solid fa-ban">
                                              {" "}
                                              Reject
                                            </i>
                                          }
                                        </span>
                                        {/* <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.user_is_blocked === 1 ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span> */}
                                      </span>
                                    </>
                                  )}
                                </td>
                              </tr>
                              
                              </> : <></>}
                            </>
                          ))}
                        </tbody>
                        {/* <tfoot>
                                                    {users ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Number</th>
                                                        <th>Registration date</th>
                                                        <th>Detail</th>
                                                        <th>Action</th>
                                                    </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Users Found"}</th></tr>)}
                                                </tfoot> */}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default ReportManagement;
