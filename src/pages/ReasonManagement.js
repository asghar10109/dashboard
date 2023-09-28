import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CSVLink } from "react-csv";
import $ from "jquery"
import 'datatables.net'
import Modal from 'react-modal';
import { getReason, addReason, deleteReason } from '../store/slices/userSlice';

const ReasonManagement = () => {
    const [id, setId] = useState()
    const dispatch = useDispatch()
    const [reasons, setReasons] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState()
    const [reason, setReason] = useState()
    // var csvData = [
    //     ["Name", "Email", "Number", "State", "Verified", "Zip Code", "Role"],
    // ]
    // reason?.map((item) =>
    //     csvData.push([`${item?.name}`, `${item?.email}`, `${item?.number}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
    // )

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: "30%",
            // height: "100%",
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            // overflow: "scroll",
            // scrollbarColor: "red orange",
            // scrollbarWidth: "thin",
        },
    };
    Modal.setAppElement('#root');

    function viewModal(item, type) {
        setIsOpen(true);
        if (type == "reason") {
            setReasons(item)
        } else if (type == "delete") {
            setId(item)
        } else if (type == "add") {
            // setId(item)
        }
        setModalType(type)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setReason()
    }
    
    // const accountDelete = async (id) => {
    //     try {
    //         await dispatch(deleteAccount(id)).unwrap()
    //         setIsOpen(false)
    //         $('#tableData')
    //             .DataTable().destroy();
    //         try { 
    //             preferences()
    //         } catch (rejectedValueOrSerializedError) {
    //             console.log(rejectedValueOrSerializedError)
    //         }
    //     } catch (rejectedValueOrSerializedError) {
    //         console.log(rejectedValueOrSerializedError)
    //     }
    // }

    // const blockUnblockAccount = async (id) => {
    //     try {
    //         await dispatch(blockUnblock(id)).unwrap()
    //         $('#tableData')
    //             .DataTable().destroy();
    //         try {
    //             preferences()
    //         } catch (rejectedValueOrSerializedError) {
    //             console.log(rejectedValueOrSerializedError)
    //         }
    //     } catch (rejectedValueOrSerializedError) {
    //         console.log(rejectedValueOrSerializedError)
    //     }
    // }

    const Reasons = async () => {
        try {
            setReasons(null)
            const response = await dispatch(getReason()).unwrap()
            console.log(response.data)
            setReasons(response?.data)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    
    
    const createReason = async () => {
        try {
            // setReasons(null)
            const response = await dispatch(addReason({reason: reason})).unwrap()
            console.log(response.data)
            // setReasons(response?.data)
            // closeModal()
            // window.location.reload()
            // Reasons()
            setIsOpen(false)
            $('#tableData')
                .DataTable().destroy();
            try {
                Reasons()
                setReason()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }

        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }
    const reasonDelete = async (id) => {
        try {
            
            // setReasons(null)
            const response = await dispatch(deleteReason({_id: id})).unwrap()
            console.log(response.data)
            // setReasons(response?.data)
            // closeModal()
            // window.location.reload()
            // Reasons()
            setIsOpen(false)
            $('#tableData')
                .DataTable().destroy();
            try {
                Reasons()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }

        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    useEffect(() => {
        let mount = true
        if (mount) {
          Reasons();
        }
        return () => {
            mount = false
        }
    }, []) 
  
    useEffect(() => {
        if (reasons) {
            $('#tableData')
                .DataTable({
                    lengthMenu: [10, 25, 50, 100, 200],
                    language: {
                        "emptyTable": "Reasons Not Found"
                    },
                    destroy: true,
                });
        } 
    }, [reasons])



    return (
        <>
            <Modal
                closeTimeoutMS={500}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Change Password"
            >
                <div className='change-password-modal' id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: "block", zIndex: 100 }}>
                    {modalType == "reasons" ? <>
                        <p className="pass-text">Reason Detail</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            {/* <p > <b>Image:</b> {reason?.profilePicture ? <><img height="20%" width="20%" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${preferences?.profilePicture}`}></img></> : <>No Image Found</>}</p> */}
                            <p > <b>Name:</b> {reasons?.reason ? reasons?.reason : <>Reason not mentioned</>}</p>
                            {/* <p > <b>Email:</b> {reasons?.email}</p> */}
                            {/* <p > <b>Number:</b> {reasons?.number ? reasons?.number : <>Number not mentioned</> }</p> */}
                            {/* <p > <b>State:</b> {reasons?.state ? reasons?.state : <>State not mentioned</>}</p> */}
                            {/* <p > <b>Zip Code:</b> {reasons?.zip_code ? reasons?.zip_code : <>Zip Code not mentioned</>}</p>  */}
                        </div>
                    </> : modalType == "delete" ? <>
                        <p className="pass-text">Are you sure you want to delete?</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form >
                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <div className="login-button mt-2" style={{ width: "40%" }}>
                                        <button type="button" onClick={() => reasonDelete(id)} className="cta-btn col-reds w-100">Delete</button>
                                    </div>
                                    <div className="login-button mt-2" style={{ width: "40%" }} >
                                        <button type="button" onClick={closeModal} className="cta-btn col-reds w-100">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </> : modalType == "add" ? <>

                    <p className="pass-text">Add Reason</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div  className="modal-body">
                            <div className="input-group input-group-sm mb-3 ">
                                {/* <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Reason</span>
                                </div> */}
                                <input type="text" className="form-control prefinput" aria-label="Category" maxlength={30} value={reason} placeholder='Reason' onChange={(e) => setReason(e.target.value)}  />
                            </div>
                            <div className='add-button'>

                            <button className="btn btn-primary" type="submit" onClick={createReason} >Add   </button>
                            </div>
                        </div>
                        {/* <p className="pass-text">Add Category</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form >
                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <div className="login-button mt-2" style={{ width: "40%" }}>
                                        <button type="button" onClick={() => accountDelete(id)} className="cta-btn col-reds w-100">Delete</button>
                                    </div>
                                    <div className="login-button mt-2" style={{ width: "40%" }} >
                                        <button type="button" onClick={closeModal} className="cta-btn col-reds w-100">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div> */}
                    </> : <></>}
                </div>
            </Modal>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: reasons ? "3%" : "12%"
            }}>
                
                <section className="coupon-sec-2">
                    <div className="container tableContainer">
                        <div className=" mt-2 mb-3 d-flex justify-content-end">
                            <button className="excel-btn col-reds w-10 pt-1 pb-1" onClick={() => viewModal(null, "add")} >Add Reason
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
                    <h1 className='titleTxt'>All Reasons</h1>
                                            <table id="tableData" className="table table-bordered" style={{ width: '100%', textAlign: "center" }}>
                                                <thead>
                                                    {reasons ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Reason</th>
                                                        {/* <th>Email</th> */}
                                                        {/* <th>Number</th> */}
                                                        <th>Added Date</th>
                                                        {/* <th>Detail</th> */}
                                                        <th>Action</th>
                                                    </tr>) : (<tr></tr>)}
                                                </thead>
                                                <tbody >
                                                    {reasons?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item?.reason ? item?.reason : <>Reason not mentioned</>}</td>
                                                            {/* <td>{item?.email}</td> */}
                                                            {/* <td style={{
                                                                wordWrap: "break-word",
                                                                wordBreak: "break-all",
                                                                whiteSpace: "normal",
                                                            }}>{item?.number ? item?.number : <>number not mentioned</>}</td> */}
                                                            <td>{moment(item?.createdAt).format("DD-MMM-YYYY")}</td>
                                                            {/* <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "reasons")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td> */}
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?._id, "delete")}  ><i className="fas fa-trash-alt"></i> Delete</span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                    )}
                                                </tbody>
                                                
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </>
    )
}
export default ReasonManagement
