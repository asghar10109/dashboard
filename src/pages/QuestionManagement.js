import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { CSVLink } from "react-csv";
import $ from "jquery";
import "datatables.net";
import Modal from "react-modal";
import {
  addPreference,
  getPreference,
  deletePreference,
  getQuestion,
  addQuestion,
  deleteQuestion,
} from "../store/slices/userSlice";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30%",
    // height: "100%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // overflow: "scroll",
    // scrollbarColor: "red orange",
    // scrollbarWidth: "thin",
  },
};
Modal.setAppElement("#root");
const QuestionManagement = () => {
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [question, setQuestion] = useState("");
  const [typee, setTypee] = useState("");
  const [option, setOption] = useState("");
  const [optionarray, setOptionarray] = useState([
    // {
    //   option: "",
    //   is_selected: 0,
    //   reason: ""
    // }
  ]);

  const [inputFields, setInputFields] = useState([
    {
      option: "",
      is_selected: 0,
      reason: "",
      value: "",
    },
  ]);

  const handleAddField = () => {
    setInputFields([
      ...inputFields,
      {
        option: "",
        is_selected: 0,
        reason: "",
        value: "",
      },
    ]);
  };

  const handleChange = (index, event) => {
    const updatedInputFields = [...inputFields];
    updatedInputFields[index].option = event.target.value;
    setInputFields(updatedInputFields);
  };

  const handleRemoveField = (index) => {
    const updatedInputFields = [...inputFields];
    updatedInputFields.splice(index, 1);
    setInputFields(updatedInputFields);
  };

  console.log("inputFields", inputFields);

  const handleType = (e) => {
    setTypee(e.target.value);
    if(e.target.value == "Text Field"){
      setInputFields([
        {
          option: "",
          is_selected: 0,
          reason: "",
          value: "",
        },
      ]);
    } else{
      setInputFields([
        {
          option: option,
          is_selected: 0,
          reason: "",
          value: "",
        },{
          option: option,
          is_selected: 0,
          reason: "",
          value: "",
        },
      ]);
    }
  };

  console.log("typee", typee);
  // var csvData = [
  //     ["Name", "Email", "Number", "State", "Verified", "Zip Code", "Role"],
  // ]
  // preferences?.map((item) =>
  //     csvData.push([`${item?.name}`, `${item?.email}`, `${item?.number}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
  // )

  function viewModal(item, type) {
    setIsOpen(true);
    if (type == "questions") {
      setQuestions(item);
    } else if (type == "delete") {
      setId(item);
    } else if (type == "add") {
      // setId(item)
    }
    setModalType(type);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setOptionarray([]);
    setQuestion("");
    setTypee("");
  }

  console.log("option", option);
  console.log("optionarray", optionarray);

  const addOption = (e) => {
    e.preventDefault();
    try {
      if (option == "") {
        toast.error("Option field can't be empty");
      } else {
        setOptionarray((s) => {
          console.log("ssssssssssssssssssss", s);
          // if(s.length < 4) {
          // const abc = s[s.length - 1];
          return [
            ...s,
            {
              option: option,
              is_selected: 0,
              reason: "",
              value: "",
            },
          ];
          // } else {
          //     return [
          //         ...s
          //     ]
          // }
        });
        setOption("");
      }
      // setOptionarray([...optionarray, option])
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };
  const removeOption = (e, i) => {
    e.preventDefault();
    try {
      console.log("i, index", e, i);
      // return
      var arrr = optionarray?.splice(i, 1);
      console.log("subcategory", option);
      setOptionarray((current) =>
        current.filter((arr) => {
          return arr !== arrr;
        })
      );
      // setSubcategoryarray()
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const Questions = async () => {
    try {
      const response = await dispatch(getQuestion()).unwrap();
      // console.log(response.data);
      setQuestions(response?.data);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const createQuestion = async () => {
    try {
      var arr = []
      for(let i=0; i<inputFields.length; i++){
        if(inputFields[i].option == ""){
          arr.push(inputFields[i])
        }
      }
      if(typee == "" || typee == undefined){
        toast.error("Type field can't be empty")
      } else if(question == "" || question == undefined){
        toast.error("Question field can't be empty")
      } else if(arr.length > 0 && typee != "Text Field"){
        toast.error("Option field can't be empty")
      } else{
        await dispatch(
          addQuestion({
            type: typee,
            question: question,
            options:
              inputFields?.length > 0
                ? inputFields
                : [{ option: "", is_selected: 0, reason: "" }],
          })
        ).unwrap();
        // console.log(response.data);
        setIsOpen(false);
        $("#tableData").DataTable().destroy();
        try {
          Questions();
          setQuestion("")
          setTypee("")
        } catch (rejectedValueOrSerializedError) {
          console.log(rejectedValueOrSerializedError);
        }
        // window.location.reload();
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };
  const questionDelete = async (id) => {
    try {
      await dispatch(deleteQuestion({ _id: id })).unwrap();
      // console.log(response.data);
      // closeModal();
      setIsOpen(false);
      $("#tableData").DataTable().destroy();
      try {
        Questions();
        // setTypee("")
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
      Questions();
    }
    return () => {
      mount = false;
    };
  }, []);

  useEffect(() => {
    if (questions) {
      $("#tableData").DataTable({
        lengthMenu: [10, 25, 50, 100, 200],
        language: {
          emptyTable: "questions Not Found",
        },
        destroy: true,
      });
    }
  }, [questions]);

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
          {modalType == "questions" ? (
            <>
              <p className="pass-text">Question Detail</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body">
                {/* <p > <b>Image:</b> {questions?.profilePicture ? <><img height="20%" width="20%" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${questions?.profilePicture}`}></img></> : <>No Image Found</>}</p> */}
                <p>
                  {" "}
                  <b>Name:</b>{" "}
                  {questions?.question ? (
                    questions?.question
                  ) : (
                    <>Question not mentioned</>
                  )}
                </p>
                {/* <p > <b>Email:</b> {questions?.email}</p> */}
                {/* <p > <b>Number:</b> {questions?.number ? questions?.number : <>Number not mentioned</> }</p> */}
                {/* <p > <b>State:</b> {questions?.state ? questions?.state : <>State not mentioned</>}</p> */}
                {/* <p > <b>Zip Code:</b> {questions?.zip_code ? questions?.zip_code : <>Zip Code not mentioned</>}</p>  */}
              </div>
            </>
          ) : modalType == "delete" ? (
            <>
              <p className="pass-text">Are you sure you want to delete?</p>
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
                        onClick={() => questionDelete(id)}
                        className="cta-btn col-reds w-100"
                      >
                        Delete
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
          ) : modalType == "add" ? (
            <>
              <p className="pass-text">Add Question</p>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="modal-body addOptModal">
                <div className="input-group input-group-sm mb-3 ">
                  {/* <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Type
                    </span>
                  </div> */}
                  <select name="" id="" onChange={(e) => handleType(e)}>
                    <option value="">Select Type</option>

                    <option value="Radio Button">Radio Button</option>
                    <option value="Radio Button With Reason">
                      Radio Button With Reason
                    </option>
                    <option value="Check Box">Check Box</option>
                    <option value="Slider">Slider</option>
                    <option value="Text Field">Text Field</option>
                  </select>
                </div>
                <div className="input-group input-group-sm mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Category"
                    maxlength={275}
                    value={question}
                    placeholder="Question"
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <div className="input-group input-group-sm mb-3 ">
                  {typee == "Text Field" ? (
                    <></>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {inputFields.map((inputField, index) => (
                        <div key={index} style={{ display: "flex" }}>
                          {typee == "Text Field" || typee == undefined || typee == "" ? <></> : <>
                          
                          <input
                            type={typee == "Slider" ? "number" : "text"}
                            className="form-control mb-2"
                            aria-label="Category"
                            maxlength={30}
                            value={inputField.option}
                            placeholder="Option"
                            required
                            onChange={(event) => handleChange(index, event)}
                          />
                          </>}
                          {typee == "Slider" || typee == undefined || typee == "" ? (
                            <></>
                          ) : (
                            <>
                              <button
                                className="excel-btn editBtn xy-center m-0 mb-2 ml-2"
                                type="button"
                                onClick={() => handleRemoveField(index)}
                              >
                                x
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                      {typee == "Slider" || typee == undefined || typee == ""? (
                        <></>
                      ) : (
                        <>
                          <button
                            className="excel-btn editBtn xy-center m-0 mb-2 mt-2"
                            type="button"
                            onClick={handleAddField}
                          >
                            Add Option
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className='add-button'>

                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={createQuestion}
                >
                  Add {" "}
                </button>
                </div>
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
          marginTop: questions ? "3%" : "12%",
        }}
      >
        <section className="coupon-sec-2">
          <div className="container tableContainer">
            <div className=" mt-2 mb-3 d-flex justify-content-end">
              <button
                className="excel-btn col-reds w-10 pt-1 pb-1"
                onClick={() => viewModal(null, "add")}
              >
                Add Question
              </button>
            </div>
          </div>
        </section>
        <section className="coupon-sec-2">
          <div className="container tableContainer">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="card shadow mb-4">
                  <div className="card-body">
                    <div className="table-responsive" id="tableready">
                      <h1 className="titleTxt">All Questions</h1>
                      <table
                        id="tableData"
                        className="table table-bordered"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <thead>
                          {questions ? (
                            <tr>
                              <th>S.No</th>
                              <th>Question</th>
                              <th>Options</th>
                              <th>Type</th>
                              <th>Added Date</th>
                              <th>Action</th>
                            </tr>
                          ) : (
                            // <tr></tr>
                            <></>
                          )}
                        </thead>
                        <tbody>
                          {questions?.map((item, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  wordBreak: "break-all",
                                  whiteSpace: "normal",
                                }}
                              >
                                {item?.question ? (
                                  item?.question
                                ) : (
                                  <>Question not mentioned</>
                                )}
                              </td>
                              <td>
                                {item?.options ? (
                                  <>
                                    {item?.options?.map((data) => (
                                      <p style={{ border: "1px solid" }}>
                                        {data?.option}
                                      </p>
                                    ))}
                                  </>
                                ) : (
                                  <>Options not mentioned</>
                                )}
                              </td>
                              <td>
                                {item?.type ? (
                                  item?.type
                                ) : (
                                  <>Type not mentioned</>
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
                                    }}
                                    onClick={() =>
                                      viewModal(item?._id, "delete")
                                    }
                                  >
                                    <i className="fas fa-trash-alt"></i> Delete
                                  </span>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
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
export default QuestionManagement;
