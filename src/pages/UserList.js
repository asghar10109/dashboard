import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  blockUnblock,
  deleteAccount,
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

// function ValueLabelComponent(props: SliderValueLabelProps) {
//     const { children, value } = props;

//     return (
//       <Tooltip enterTouchDelay={0} placement="top" title={value}>
//         {children}
//       </Tooltip>
//     );
//   }

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

//   const marks = [
//     {
//       value: 0,
//     },
//     {
//       value: 20,
//     },
//     {
//       value: 37,
//     },
//     {
//       value: 100,
//     },
//   ];

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

Modal.setAppElement("#root");
const UserList = () => {
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
    console.log("item", item)
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
      height: modalType == "formDetail" ? "90%" : "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
      // scrollbarColor: "red orange",
      // scrollbarWidth: "thin",
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
        Users();
        closeModal();
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError);
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const Users = async () => {
    try {
      // setUsers(null)
      const response = await dispatch(getAllUsers()).unwrap();
      console.log("get all user from userlist ", response);
      setUsers(response?.data?.data);
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
      Users();
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
              <p className="pass-text">User Detail</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                <div>
                  <p>
                    {" "}


                    {userDetail?.user_image ? (

                      <>
                        <img
                          height= '100%'
                          width="90%"
                          style={{ borderRadius: 5 }}
                          src={`${process.env.REACT_APP_APIIMAGE}/${userDetail?.user_image}`}
                        ></img>
                      </>

                    ) : (
                      <>No Image Found</>
                    )}

                  </p>
                </div>

                <div className="userdetail">
                  <p>
                    {" "}
                    <b>Name:</b>{" "}
                    {userDetail?.name ? (
                      userDetail?.name
                    ) : (
                      <>Name not mentioned</>
                    )}
                  </p>
                  <p>
                    {" "}
                    <b>Email:</b> {userDetail?.email ?
                      (
                        userDetail?.email
                      ) : (
                        <>admin@gmail.com</>
                      )

                    }

                  </p>
                  <p>
                    {" "}
                    <b>Number:</b>{" "}
                    {userDetail?.phone_number ? (
                      userDetail?.phone_number
                    ) : (
                      <>Number not mentioned</>
                    )}
                  </p>
                  <p>
                    {" "}
                    <b>Address:</b>{" "}
                    {userDetail?.user_address ? (
                      userDetail?.user_address
                    ) : (
                      <>Address not mentioned</>
                    )}
                  </p>
                  <p>
                    {" "}
                    <b>City:</b>{" "}
                    {userDetail?.user_city ? (
                      userDetail?.user_city
                    ) : (
                      <>City not mentioned</>
                    )}
                  </p>
                  <p>
                    {" "}
                    <b>Country:</b>{" "}
                    {userDetail?.user_country ? (
                      userDetail?.user_country
                    ) : (
                      <>Zip Code not mentioned</>
                    )}
                  </p>
                </div>
              </div>
            </>
          ) : modalType == "delete" ? (
            <>
              {id.is_blocked === 1 ? (
                <p className="pass-text">Are you sure you want to Unblock?</p>
              ) : (
                <p className="pass-text">Are you sure you want to Block?</p>
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

                        {id?.is_blocked === 1 ? "Unblock" : "Block"}
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
          ) : modalType == "formDetail" ? (
            <>
              <p className="pass-text">Form Detail</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                {/* <p > <b>Image:</b> {userDetail?.user_image ? <><img height="20%" width="20%" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIIMAGE}${userDetail?.user_image}`}></img></> : <>No Image Found</>}</p> */}
                {form?.answers.map((data, i) => (
                  <>
                    <p>
                      {" "}
                      <b>Question: {i + 1}</b>{" "}
                      {data?.question ? (
                        data?.question
                      ) : (
                        <>Question not Mention</>
                      )}
                    </p>
                    {data?.type == "Radio Button" ? (
                      <>
                        {data?.options.map((item, i) => (
                          <>
                            <input
                              type="radio"
                              id={i}
                              name=""
                              value={item?.option}
                              checked={item?.is_selected == 1 ? true : false}
                            />
                            <label for={i}>{item?.option}</label>
                            <br></br>
                            {/* <p > <b>Options:  {convertIndexToAlphabet(i)}</b> <span style={{backgroundColor: item?.is_selected == 1 ? "lightGreen" : "white"}}>{item?.option ? item?.option : <></>}</span></p> */}
                          </>
                        ))}
                      </>
                    ) : data?.type == "Check Box" ? (
                      <>
                        {data?.options.map((item, i) => (
                          <>
                            <input
                              type="checkbox"
                              id={i}
                              name=""
                              value={item?.option}
                              checked={item?.is_selected == 1 ? true : false}
                            />
                            <label for={i}>{item?.option}</label>
                            <br></br>
                            {/* <p > <b>Options:  {convertIndexToAlphabet(i)}</b> <span style={{backgroundColor: item?.is_selected == 1 ? "lightGreen" : "white"}}>{item?.option ? item?.option : <></>}</span></p> */}
                          </>
                        ))}
                      </>
                    ) : data?.type == "Text Field" ? (
                      <>
                        {data?.options.map((item, i) => (
                          <>
                            {/* <input type="text" style={{fontWeight: "bold"}} id={i} name="" value={item?.option} disabled/><br/> */}
                            <p>
                              {" "}
                              <b>Answer: </b>{" "}
                              {item?.option ? (
                                item?.option
                              ) : (
                                <>Answer not Mention</>
                              )}
                            </p>
                            {/* <p style={{fontWeight: "bold"}}>{item?.option}</p> */}
                            {/* <label for={i}>{item?.option}</label><br></br> */}
                            {/* <p > <b>Options:  {convertIndexToAlphabet(i)}</b> <span style={{backgroundColor: item?.is_selected == 1 ? "lightGreen" : "white"}}>{item?.option ? item?.option : <></>}</span></p> */}
                          </>
                        ))}
                      </>
                    ) : data?.type == "Slider" ? (
                      <>
                        {/* {data?.options.map((item, i)=>( */}
                        <>
                          <Box sx={{ width: 320 }}>
                            {/* <Typography gutterBottom></Typography> */}
                            <IOSSlider
                              aria-label="ios slider"
                              value={data?.options[1]?.value}
                              min={data?.options[0]?.option}
                              max={data?.options[1]?.option}
                              valueLabelDisplay="on"
                            />
                          </Box>
                          {/* <input type="range" name="" value={data?.options[1]?.value} min={data?.options[0]?.option} max={data?.options[1]?.option}/>
                                            <p>Value: <span >{data?.options[1]?.value}</span></p> */}
                          {/* <label for={i}>{item?.option}</label><br></br> */}
                          {/* <p > <b>Options:  {convertIndexToAlphabet(i)}</b> <span style={{backgroundColor: item?.is_selected == 1 ? "lightGreen" : "white"}}>{item?.option ? item?.option : <></>}</span></p> */}
                        </>
                        {/* ))} */}
                      </>
                    ) : data?.type == "Radio Button With Reason" ? (
                      <>
                        {data?.options.map((item, i) => (
                          <div className="reason_radioBtn" style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                            <div>
                              <input
                                type="radio"
                                id={i}
                                name=""
                                value={item?.option}
                                checked={item?.is_selected == 1 ? true : false}
                              />
                              <label for={i}>{item?.option}</label>
                              <br></br>
                            </div>
                            {item?.is_selected == 1 ? (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    marginLeft: "5px",
                                  }}
                                >
                                  <p className="reason_p">
                                    {" "}
                                    <b>Reason: </b>{" "}
                                    <span>
                                      {item?.reason ? (
                                        item?.reason
                                      ) : (
                                        <>Reason not Mention</>
                                      )}
                                    </span>
                                  </p>
                                  {/* <input type="text" name="" value={item?.reason} disabled/> */}
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                    {/* {data?.options.map((item, i)=>(
                                        <>
                                            <p > <b>Options:  {convertIndexToAlphabet(i)}</b> <span style={{backgroundColor: item?.is_selected == 1 ? "lightGreen" : "white"}}>{item?.option ? item?.option : <></>}</span></p>
                                        </>
                                    ))} */}
                  </>
                ))}
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
                      <h1 className="titleTxt"> All Users</h1>
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
                              <th>Number</th>
                              <th>Registration date</th>
                              <th>Form</th>
                              <th>Detail</th>
                              <th>Action</th>
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
                                {item?.name ? (
                                  item?.name
                                ) : (
                                  <>Name not mentioned</>
                                )}
                              </td>
                              <td>{item?.email ?
                                (
                                  item?.email
                                ) : (
                                  <>admin@gmail.com</>
                                )
                              }</td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  wordBreak: "break-all",
                                  whiteSpace: "normal",
                                }}
                              >
                                {item?.phone_number ? (
                                  item?.phone_number
                                ) : (
                                  <>number not mentioned</>
                                )}
                              </td>
                              <td>
                                {moment(item?.createdAt).format("DD-MMM-YYYY")}
                              </td>
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
                                      viewModal(item, "formDetail")
                                    }
                                  >
                                    <i className="fas fa-eye"></i> View
                                  </span>
                                </span>
                              </td>
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
                              <td>
                                <span className="edit-icon">
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: "bold",
                                      margin: 10,
                                    }}
                                    onClick={() => viewModal(item, "delete")}
                                  >
                                    {item?.is_blocked === 1 ? (
                                      <i className="fa fa-unlock-alt">
                                        {" "}
                                        Unblock
                                      </i>
                                    ) : (
                                      <i className="fa fa-solid fa-ban">
                                        {" "}
                                        Block
                                      </i>
                                    )}
                                  </span>
                                  {/* <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.user_is_blocked === 1 ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span> */}
                                </span>
                              </td>
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
export default UserList;
