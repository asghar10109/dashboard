import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  blockUnblock,
  deleteAccount,
  getAllFeedbacks,
  getAllUsers,
  getUserStatus,
} from "../store/slices/userSlice";
import { CSVLink } from "react-csv";
import $ from "jquery";
import "datatables.net";
import Modal from "react-modal";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

Modal.setAppElement("#root");
const FeedbackList = () => {
  const [id, setId] = useState();
  const [form, setForm] = useState();
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  const status = useSelector(getUserStatus);
  const [userDetail, setUserDetail] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState();
  // var csvData = [
  //     ["Name", "Email", "Number", "State", "Verified", "Zip Code", "Role"],
  // ]
  // users?.map((item) =>
  //     csvData.push([`${item?.name}`, `${item?.email}`, `${item?.number}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
  // )

  console.log("userDetail", userDetail);
  console.log("form", form);
  function viewModal(item, type) {
    setIsOpen(true);
    if (type == "userDetail") {
      setUserDetail(item);
    } else if (type == "delete") {
      setId(item);
    } else if (type == "formDetail") {
      setForm(item?.form);
    }
    setModalType(type);
    setIsOpen(true);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "30%",
      height: modalType == "formDetail" ? "100%" : "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
      scrollbarColor: "red orange",
      scrollbarWidth: "thin",
    },
  };

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

  const blockUnblockAccount = async (id) => {
    try {
      await dispatch(blockUnblock(id)).unwrap();
      $("#tableData").DataTable().destroy();
      try {
        Feedbacks();
        closeModal();
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError);
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const Feedbacks = async () => {
    try {
      // setUsers(null)
      const response = await dispatch(getAllFeedbacks()).unwrap();
      console.log(response.data);
      setUsers(response?.data);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  function convertIndexToAlphabet(i) {
    var asciiOffset = 97; // ASCII code for 'A'
    return String.fromCharCode(i + asciiOffset);
  }

  useEffect(() => {
    let mount = true;
    if (mount) {
      Feedbacks();
    }
    return () => {
      mount = false;
    };
  }, []);

  useEffect(() => {
    if (users) {
      $("#tableData").DataTable({
        lengthMenu: [10, 25, 50, 100, 200],
        language: {
          emptyTable: "Users Not Found",
        },
        destroy: true,
      });
    }
  }, [users]);

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
          {modalType == "userDetail" ? (
            <>
              <p className="pass-text">Attachment</p>
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
                  {/* <b>Images:</b>{" "} */}
                  {userDetail?.feedback_images?.map((data) => (
                    <img
                      height="20%"
                      width="20%"
                      style={{ borderRadius: 5 }}
                      src={`${process.env.REACT_APP_APIIMAGE}${data}`}
                    ></img>
                  ))}
                </p>
              </div>
            </>
          ) : modalType == "delete" ? (
            <>
              {id.user_is_blocked == 1 ? (
                <p className="pass-text">Unblock Account Confirmation</p>
              ) : (
                <p className="pass-text">Block Account Confirmation</p>
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
                        onClick={() => blockUnblockAccount(id._id)}
                        className="cta-btn col-reds w-100"
                      >
                        {id?.user_is_blocked === 1 ? "UnBlock" : "Block"}
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
          marginTop: users ? "3%" : "12%",
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
                      <h1 className="titleTxt">All Feedbacks</h1>
                      <table
                        id="tableData"
                        className="table table-bordered"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <thead>
                          {users ? (
                            <tr>
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th>Subject</th>
                              <th>Message</th>
                              <th>Feedback date</th>
                              <th>Detail</th>
                              {/* <th>Action</th> */}
                            </tr>
                          ) : (
                            <tr></tr>
                          )}
                        </thead>
                        <tbody>
                          {users?.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                {item?.user_id?.user_name ? (
                                  item?.user_id?.user_name
                                ) : (
                                  <>Name not mentioned</>
                                )}
                              </td>
                              <td>{item?.user_id?.user_email}</td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  wordBreak: "break-all",
                                  whiteSpace: "normal",
                                }}
                              >
                                {item?.user_id?.user_address ? (
                                  item?.user_id?.user_address
                                ) : (
                                  <>Address not mentioned</>
                                )}
                              </td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  wordBreak: "break-all",
                                  whiteSpace: "normal",
                                }}
                              >
                                {item?.subject ? (
                                  item?.subject
                                ) : (
                                  <>Subject not mentioned</>
                                )}
                              </td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  wordBreak: "break-all",
                                  whiteSpace: "normal",
                                }}
                              >
                                {item?.message ? (
                                  item?.message
                                ) : (
                                  <>Message not mentioned</>
                                )}
                              </td>
                              <td>
                                {moment(item?.createdAt).format("DD-MMM-YYYY")}
                              </td>
                              {/* <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "formDetail")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td> */}
                              <td>
                                <span className="edit-icon">
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: "bold",
                                      margin: 10,
                                      fontSize: 13,
                                    }}
                                    onClick={() =>
                                      viewModal(item, "userDetail")
                                    }
                                  >
                                    <i className="fas fa-eye"></i> View
                                  </span>
                                </span>
                              </td>
                              {/* <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item, "delete")}  >{item?.user_is_blocked === 1 ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span>
                                                                </span>
                                                            </td> */}
                            </tr>
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
export default FeedbackList;
