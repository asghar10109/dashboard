import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { approveDisapprove, blockUnblock, deleteAccount, getAllEmployers, getAllUsers, getEmployersRequest, getUserStatus } from '../store/slices/userSlice';
import { CSVLink } from "react-csv";
import $ from "jquery"
import 'datatables.net'
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: "30%",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
const EmployerList = () => {
    
    const navigate = useNavigate();
    const [id, setId] = useState()
    const dispatch = useDispatch()
    const [users, setUsers] = useState(null)
    const status = useSelector(getUserStatus)
    const [userDetail, setUserDetail] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState()
    var csvData = [
        ["Name", "Email", "Number", "State", "Verified", "Zip Code", "Role"],
    ]
    users?.map((item) =>
        csvData.push([`${item?.user_name}`, `${item?.user_email}`, `${item?.number}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
    )


    // console.log('`${process.env.REACT_APP_APIIMAGE}${userDetail?.user_image}`', `${process.env.REACT_APP_APIIMAGE}`)
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
    
    const accountDelete = async (id) => {
        try {
            await dispatch(deleteAccount(id)).unwrap()
            setIsOpen(false)
            $('#tableData')
                .DataTable().destroy();
            try { 
                Users()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const blockUnblockAccount = async (id) => {
        try {
            await dispatch(blockUnblock(id)).unwrap()
            $('#tableData')
                .DataTable().destroy();
            try {
                Users()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const Users = async () => {
        try {
            setUsers(null)
            const response = await dispatch(getAllEmployers()).unwrap()
            console.log("hdjksahkdfjskjfhksjf",response.data)
            setUsers(response?.data)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    useEffect(() => {
        let mount = true
        if (mount) {
            Users();
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
                        "emptyTable": "Employer Not Found"
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
                        <p className="pass-text">Employer Detail</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <p > <b>Image:</b> {userDetail?.user_image ? <><img height="20%" width="20%" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIIMAGE}${userDetail?.user_image}`}></img></> : <>No Image Found</>}</p>
                            <p > <b>Name:</b> {userDetail?.user_name ? userDetail?.user_name : <>Name not mentioned</>}</p>
                            <p > <b>Email:</b> {userDetail?.user_email ? userDetail?.user_email : <>Email not mentioned</>}</p>
                            <p > <b>Number:</b> {userDetail?.user_phone ? userDetail?.user_phone : <>Number not mentioned</> }</p>
                            <p > <b>Company Name:</b> {userDetail?.user_company_name ? userDetail?.user_company_name : <>Company Name not mentioned</>}</p>
                            <p > <b>Business Number:</b> {userDetail?.user_business_number ? userDetail?.user_business_number : <>Business Number not mentioned</>}</p> 
                            <p > <b>Discription:</b> {userDetail?.user_description ? userDetail?.user_description : <>Discription not mentioned</>}</p> 
                            <p > <b>Jobs:</b> <a onClick={() => navigate("/admin/employer-jobs", { state: userDetail?._id })}>All Jobs</a> </p> 
                            {/* <li className={location?.pathname === "/admin/employer-list" ? "active" : "noactive"}> <Link to="/admin/employer-list">All Employers</Link> <Link to="/admin/employer-jobs">All Jobs</Link> </li> */}

                        </div>
                    </> : modalType == "delete" ? <>
                        <p className="pass-text">Delete Account Confirmation</p>
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
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Number</th>
                                                        <th>Company Name</th>
                                                        <th>Business Number</th>
                                                        <th>Registration date</th>
                                                        <th>Detail</th>
                                                        <th>Action</th>
                                                    </tr>) : (<tr></tr>)}
                                                </thead>
                                                <tbody >
                                                    {users?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item?.user_name ? item?.user_name : <>Name not mentioned</>}</td>
                                                            <td>{item?.user_email}</td>
                                                            <td style={{
                                                                wordWrap: "break-word",
                                                                wordBreak: "break-all",
                                                                whiteSpace: "normal",
                                                            }}>{item?.user_phone ? item?.user_phone : <>number not mentioned</>}</td>
                                                            
                                                            <td>{item?.user_company_name ? item?.user_company_name : <>Company Name not mentioned</>}</td>
                                                            <td style={{
                                                                wordWrap: "break-word",
                                                                wordBreak: "break-all",
                                                                whiteSpace: "normal",
                                                            }}>{item?.user_business_number ? item?.user_business_number : <>Business Number not mentioned</>}</td>
                                                            <td>{moment(item?.createdAt).format("DD-MMM-YYYY")}</td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "userDetail")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    {/* <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?._id, "delete")}  ><i className="fas fa-trash-alt"></i> Delete</span> */}
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.user_is_blocked === 1 ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    {users ? (<tr>
                                                        {/* <th>S.No</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Number</th>
                                                        <th>Company Name</th>
                                                        <th>Business Number</th>
                                                        <th>Registration date</th>
                                                        <th>Detail</th>
                                                        <th>Action</th> */}
                                                    </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Employer Found"}</th></tr>)}
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
export default EmployerList
