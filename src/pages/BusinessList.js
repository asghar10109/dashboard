// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
// import { blockUnblock, deleteAccount, getAllBusiness, getUserStatus } from '../store/slices/userSlice';
// import { CSVLink } from "react-csv";
// import $ from "jquery"
// import 'datatables.net'
// import Modal from 'react-modal';
// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         width: "30%",
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//     },
// };
// Modal.setAppElement('#root');
// const BusinessList = () => {
//     const [id, setId] = useState()
//     const dispatch = useDispatch()
//     const [business, setBusiness] = useState(null)
//     const status = useSelector(getUserStatus)
//     const [businessDetail, setBusinessDetail] = useState(null)
//     const [modalIsOpen, setIsOpen] = useState(false);
//     const [modalType, setModalType] = useState()
//     var csvData = [
//         ["Name", "Email", "Business Name", "Category", "Business Address", "State", "Verified", "Zip Code", "Role"],
//     ]
//     business?.map((item) =>
//         csvData.push([`${item?.name}`, `${item?.email}`, `${item?.businessName}`, `${item?.category}`, `${item?.businessAddress}`, `${item?.state}`, `${item?.isVerified}`, `${item?.zipCode}`, `${item?.role}`])
//     )
//     function viewModal(item, type) {
//         setIsOpen(true);
//         if (type == "businessDetail") {
//             setBusinessDetail(item)
//         } else if (type == "delete") {
//             setId(item)
//         }
//         setModalType(type)
//         setIsOpen(true);
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }

//     const accountDelete = async (id) => {
//         try {
//             await dispatch(deleteAccount(id)).unwrap()
//             setIsOpen(false)
//             $('#tableData')
//             .DataTable().destroy();  
//             try {
//                 Business() 
//             } catch (rejectedValueOrSerializedError) {
//                 console.log(rejectedValueOrSerializedError)
//             }
//         } catch (rejectedValueOrSerializedError) {
//             console.log(rejectedValueOrSerializedError)
//         }
//     }
    
//     const blockUnblockAccount = async (id) => {
//         try {
//             await dispatch(blockUnblock(id)).unwrap()
//             $('#tableData')
//                 .DataTable().destroy();
//             try {
//                 Business()
//             } catch (rejectedValueOrSerializedError) {
//                 console.log(rejectedValueOrSerializedError)
//             }
//         } catch (rejectedValueOrSerializedError) {
//             console.log(rejectedValueOrSerializedError)
//         }
//     }
//     const Business=async()=> {
//         try {
//             setBusiness(null)
//             const response = await dispatch(getAllBusiness()).unwrap()
//             setBusiness(response?.Business)
//         } catch (rejectedValueOrSerializedError) {
//             console.log(rejectedValueOrSerializedError)
//         }
//     }
//     useEffect(() => {
//          let mount = true
//         if (mount) {
//             Business();
//         }
//         return () => {
//             mount = false
//         }
//     }, [])
 
//     useEffect(() => {
//         if (business) {
//             $('#tableData')
//                 .DataTable({
//                     lengthMenu: [10, 25, 50, 100, 200],
//                     language: {
//                         "emptyTable": "Business Not Found"
//                     },
//                     destroy: true,
//                 });
//         }
//     }, [business])
//     return (
//         <>
//             <Modal
//                 closeTimeoutMS={500}
//                 isOpen={modalIsOpen}
//                 onRequestClose={closeModal}
//                 style={customStyles}
//                 contentLabel="Change Password"
//             >
//                 <div className='change-password-modal' id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: "block", zIndex: 100 }}>
//                     {modalType == "businessDetail" ? <>
//                         <p className="pass-text">Business Detail</p>
//                         <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//                         <div className="modal-body">
//                             <p > <b>Image:</b> {businessDetail?.imageName ? <><img height="20%" width="20%" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${businessDetail?.imageName}`}></img></> : <>No Image Found</>}</p>
//                             <p > <b>Name:</b> {businessDetail?.name}</p>
//                             <p > <b>Email:</b> {businessDetail?.email}</p>
//                             <p > <b>Business Address:</b> {businessDetail?.businessAddress}</p>
//                             <p > <b>State:</b> {businessDetail?.state}</p>
//                             <p > <b>Zip Code:</b> {businessDetail?.zipCode}</p>

//                         </div>
//                     </> : modalType == "delete" ? <>
//                         <p className="pass-text">Delete Account Confirmation</p>
//                         <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//                         <div className="modal-body">
//                             <form >
//                                 <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
//                                     <div className="login-button mt-2" style={{ width: "40%" }}>
//                                         <button type="button" onClick={() => accountDelete(id)} className="cta-btn col-reds w-100">Delete</button>
//                                     </div>
//                                     <div className="login-button mt-2" style={{ width: "40%" }} >
//                                         <button type="button" onClick={closeModal} className="cta-btn col-reds w-100">Cancel</button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </> : <></>}
//                 </div>
//             </Modal>
//             <div style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 marginTop: business ? "3%" : "12%"
//             }}>
//                 <section className="excel-sec">
//                     <div className="container">
//                         <div className="  mt-2 mb-3">
//                             {business ?
//                                 <button className="excel-btn col-reds w-10 pt-1 pb-1">
//                                     <CSVLink filename={"Business List.csv"} data={csvData}>Export Excel</CSVLink>
//                                 </button>
//                                 : <>
//                                 </>}
//                         </div>
//                     </div>
//                 </section>
//                 <section className="coupon-sec-2">
//                     <div className="container tableContainer">
//                         <div className="row">
//                             <div className="col-12 col-md-12 col-lg-12">
//                                 <div className="card shadow mb-4">
//                                     <div className="card-body">
//                                         <div className="table-responsive" id="tableready">
//                                             <table id="tableData" className="table  table-bordered" style={{ width: '100%', textAlign: "center" }}>
//                                                 <thead>
//                                                     {business ? (<tr>
//                                                         <th>S.No</th>
//                                                         <th>Name</th>
//                                                         <th>Email</th>
//                                                         <th>Business Address</th>
//                                                         <th>Registration date</th>
//                                                         <th>Detail</th>
//                                                         <th>Action</th>
//                                                     </tr>) : (<tr></tr>)}
//                                                 </thead>
//                                                 <tbody >
//                                                     {business?.map((item, i) => (
//                                                         <tr key={i}>
//                                                             <td>{i + 1}</td>
//                                                             <td>{item?.name}</td>
//                                                             <td>{item?.email}</td>
//                                                             <td style={{
//                                                                 wordWrap: "break-word",
//                                                                 wordBreak: "break-all",
//                                                                 whiteSpace: "normal",
//                                                             }}>{item?.businessAddress}</td>
//                                                             <td>{moment(item?.createdAt).format("DD-MMM-YYYY")}</td>
//                                                             <td>
//                                                                 <span className="edit-icon" >
//                                                                     <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "businessDetail")}  ><i className="fas fa-eye"></i> View</span>
//                                                                 </span>
//                                                             </td>
//                                                             <td>
//                                                                 <span className="edit-icon" >
//                                                                     <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?._id, "delete")}  ><i className="fas fa-trash-alt"></i> Delete</span>
//                                                                     <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.block ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span>
//                                                                 </span>
//                                                             </td>
//                                                         </tr>
//                                                     )
//                                                     )}
//                                                 </tbody>
//                                                 <tfoot>
//                                                     {business ? (<tr>
//                                                         <th>S.No</th>
//                                                         <th>Name</th>
//                                                         <th>Email</th>
//                                                         <th>Business Address</th>
//                                                         <th>Registration date</th>
//                                                         <th>Detail</th>
//                                                         <th>Action</th>
//                                                     </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Business Found"}</th></tr>)}
//                                                 </tfoot>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         </>
//     )
// }

// export default BusinessList