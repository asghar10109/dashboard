import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { blockUnblock, deleteAccount, getAllPayments, getAllUsers, getUserStatus } from '../store/slices/userSlice';
import { CSVLink } from "react-csv";
import $ from "jquery"
import 'datatables.net'
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: "30%",
        height: "50%",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
const Payment = () => {
    const [id, setId] = useState()
    const dispatch = useDispatch()
    const [users, setUsers] = useState(null)
    const status = useSelector(getUserStatus)
    const [userDetail, setUserDetail] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState()
    // var csvData = [
    //     ["Name", "Email", "Number", "State", "Verified", "Zip Code", "Role"],
    // ]
    // users?.map((item) =>
    //     csvData.push([`${item?.name}`, `${item?.email}`, `${item?.number}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
    // )

    function viewModal(item, type) {
        setIsOpen(true);
        if (type == "userDetail") {
            setUserDetail(item)
        } else if (type == "delete") {
            setId(item)
        }
        setModalType(type)
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

    // const blockUnblockAccount = async (id) => {
    //     try {
    //         await dispatch(blockUnblock(id)).unwrap()
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

    const Payments = async () => {
        try {
            setUsers(null)
            const response = await dispatch(getAllPayments()).unwrap()
            console.log(response.data)
            setUsers(response?.data)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    useEffect(() => {
        let mount = true
        if (mount) {
            Payments();
        }
        return () => {
            mount = false
        }
    }, []) 
  
    useEffect(() => {
        if (users) {
            $('#tableData')
                .DataTable({
                    lengthMenu: [10, 25, 50, 100, 200],
                    language: {
                        "emptyTable": "Payment Not Found"
                    },
                    destroy: true,
                });
        } 
    }, [users])



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
                    {modalType == "userDetail" ? <>
                        <p className="pass-text">Payment Detail</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <p > <b>Employee Image:</b> {userDetail?.employee_id?.user_image ? <><img height="20%" width="20%" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIIMAGE}${userDetail?.employee_id?.user_image}`}></img></> : <>No Image Found</>}</p>
                            <p > <b>Employee Name:</b> {userDetail?.employee_id?.user_name ? userDetail?.employee_id?.user_name : <>Employee Name not mentioned</>}</p>
                            <p > <b>Employee Proffesion:</b> {userDetail?.employee_id?.user_proffesion ? userDetail?.employee_id?.user_proffesion : <>Employee Proffesion not mentioned</>}</p>
                            <p > <b>Employee Number:</b> {userDetail?.employee_id?.user_phone ? userDetail?.employee_id?.user_phone : <>Employee Number not mentioned</> }</p>
                            <p > <b>Employee Email:</b> {userDetail?.employee_id?.user_email ? userDetail?.employee_id?.user_email : <>Employee Email not mentioned</>}</p>
                            <p > <b>Employer Image:</b> {userDetail?.employee_id?.user_image ? <><img height="20%" width="20%" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIIMAGE}${userDetail?.employer_id?.user_image}`}></img></> : <>No Image Found</>}</p>
                            <p > <b>Employer Name:</b> {userDetail?.employer_id?.user_name ? userDetail?.employer_id?.user_name : <>Employer Name not mentioned</>}</p> 
                            <p > <b>Employer Company Name:</b> {userDetail?.employer_id?.user_company_name ? userDetail?.employer_id?.user_company_name : <>Employer Company Name not mentioned</>}</p> 
                            <p > <b>Employer Business Number:</b> {userDetail?.employer_id?.user_business_number ? userDetail?.employer_id?.user_business_number : <>Employer Business Number not mentioned</>}</p> 
                            <p > <b>Employer Number:</b> {userDetail?.employer_id?.user_phone ? userDetail?.employer_id?.user_phone : <>Employer Number not mentioned</>}</p> 
                            <p > <b>Employer Email:</b> {userDetail?.employer_id?.user_email ? userDetail?.employer_id?.user_email : <>Employer Email not mentioned</>}</p>
                            <p > <b>Job Title:</b> {userDetail?.job_id?.job_title ? userDetail?.job_id?.job_title : <>Job Title not mentioned</>}</p>
                            <p > <b>Job Discription:</b> {userDetail?.job_id?.job_description ? userDetail?.job_id?.job_description : <>Job Discription not mentioned</>}</p>
                            <p > <b>Job Category:</b> {userDetail?.job_id?.job_category ? userDetail?.job_id?.job_category : <>Job Category not mentioned</>}</p>
                            <p > <b>Job Total Hours:</b> {userDetail?.job_id?.job_total ? userDetail?.job_id?.job_total : <>Job Total Hours not mentioned</>}</p>
                            <p > <b>Job Charges/hr:</b> {userDetail?.job_id?.job_charges ? userDetail?.job_id?.job_charges : <>Job Charges not mentioned</>}</p>
                            <p > <b>Paid Amount:</b> {userDetail?.total_price ? userDetail?.total_price : <>Paid Amount not mentioned</>}</p>
                            <p > <b>Payment Status:</b> {userDetail?.earning == null ? <>Payment not Dispatched</> : <>Payment Dispatched {userDetail?.earning}</>}</p>
                        </div>
                    </> : modalType == "delete" ? <>
                        <p className="pass-text">Delete Account Confirmation</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form >
                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    {/* <div className="login-button mt-2" style={{ width: "40%" }}>
                                        <button type="button" onClick={() => accountDelete(id)} className="cta-btn col-reds w-100">Delete</button>
                                    </div> */}
                                    <div className="login-button mt-2" style={{ width: "40%" }} >
                                        <button type="button" onClick={closeModal} className="cta-btn col-reds w-100">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </> : <></>}
                </div>
            </Modal>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: users ? "3%" : "12%"
            }}>
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
                                            <table id="tableData" className="table table-bordered" style={{ width: '100%', textAlign: "center" }}>
                                                <thead>
                                                    {users ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Employer Company Name</th>
                                                        <th>Job Title</th>
                                                        <th>Amount Paid</th>
                                                        <th>Employee Name</th>
                                                        {/* <th>Employee Proffesion</th> */}
                                                        <th>Job Status</th>
                                                        {/* <th>Employee Email</th> */}
                                                        {/* <th>Employer Name</th> */}
                                                        {/* <th>Employer Number</th> */}
                                                        {/* <th>Employer Business Number</th> */}
                                                        {/* <th>Employer Email</th> */}
                                                        <th>Detail</th>
                                                        {/* <th>Action</th> */}
                                                    </tr>) : (<tr></tr>)}
                                                </thead>
                                                <tbody >
                                                    {users?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item?.employer_id?.user_company_name ? item?.employer_id?.user_company_name : <>Company Name not mentioned</>}</td>
                                                            <td>{item?.job_id?.job_title ? item?.job_id?.job_title : <>Job Title not mentioned</>}</td>
                                                            <td>{item?.total_price ? item?.total_price : <>Price not mentioned</>}</td>
                                                            <td>{item?.employee_id?.user_name ? item?.employee_id?.user_name : <>Name not mentioned</>}</td>
                                                            {/* <td>{item?.employee_id?.user_proffesion ? item?.employee_id?.user_proffesion : <>Proffesion not mentioned</>}</td> */}
                                                            <td>{item?.job_id?.job_complete == 1 ? <>Job Completed</> : <>Job is in Process</>}</td>
                                                            {/* <td>{item?.employee_id?.user_email ? item?.employee_id?.user_email : <>Email not mentioned</>}</td> */}
                                                            {/* <td>{item?.email}</td> */}
                                                            {/* <td>{item?.user_name ? item?.user_name : <>Name not mentioned</>}</td> */}
                                                            {/* <td>{item?.email}</td> */}
                                                            {/* <td>{item?.employer_id?.user_name ? item?.employer_id?.user_name : <>Name not mentioned</>}</td> */}
                                                            {/* <td>{item?.employer_id?.user_phone ? item?.employer_id?.user_phone : <>Number not mentioned</>}</td> */}
                                                            {/* <td>{item?.employer_id?.user_business_number ? item?.employer_id?.user_business_number : <>Business Number not mentioned</>}</td> */}
                                                            {/* <td>{item?.employer_id?.user_email ? item?.employer_id?.user_email : <>Email not mentioned</>}</td> */}
                                                            {/* <td>{item?.email}</td> */}
                                                            {/* <td style={{
                                                                wordWrap: "break-word",
                                                                wordBreak: "break-all",
                                                                whiteSpace: "normal",
                                                            }}>{item?.number ? item?.number : <>number not mentioned</>}</td>
                                                            <td>{moment(item?.createdAt).format("DD-MMM-YYYY")}</td> */}
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "userDetail")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td>
                                                            {/* <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?._id, "delete")}  ><i className="fas fa-trash-alt"></i> Delete</span>
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.is_blocked === 1 ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span>
                                                                </span>
                                                            </td> */}
                                                        </tr>
                                                    )
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    {users ? (<tr>
                                                        {/* <th>S.No</th>
                                                        <th>Employer Company Name</th>
                                                        <th>Job Title</th>
                                                        <th>Amount Paid</th>
                                                        <th>Employee Name</th>
                                                        <th>Job Status</th>
                                                        <th>Detail</th> */}
                                                    </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Payment Found"}</th></tr>)}
                                                </tfoot>
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
export default Payment
