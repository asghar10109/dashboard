// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
// import { approveDisapproveAd, getAllUsers, getMarketPlace, getUserStatus } from '../store/slices/userSlice';
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
// const MarketPlaceAds = () => {
//     const [id, setId] = useState()
//     const dispatch = useDispatch()
//     const [ads, setAds] = useState(null)
//     const status = useSelector(getUserStatus)
//     const [adDetail, setAdDetail] = useState(null)
//     const [modalIsOpen, setIsOpen] = useState(false);
//     const [modalType, setModalType] = useState()

//     function viewModal(item, type) {
//         setIsOpen(true);
//         if (type == "adDetail") {
//             setAdDetail(item)
//         } else {
//             setId(item)
//         }
//         setModalType(type)
//         setIsOpen(true);
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }
//     const changeAdStatus = async (id, status) => {
//         try { 
//             await dispatch(approveDisapproveAd({ id, status })).unwrap()
//             setIsOpen(false)
//             $('#tableData')
//                 .DataTable().destroy();
//             try {
//                 Ads()
//             } catch (rejectedValueOrSerializedError) {
//                 console.log(rejectedValueOrSerializedError)
//             }
//         } catch (rejectedValueOrSerializedError) {
//             console.log(rejectedValueOrSerializedError)
//         }
//     }

//     const Ads = async () => {
//         try {
//             setAds(null)
//             const response = await dispatch(getMarketPlace()).unwrap()
//             setAds(response?.ads)
//         } catch (rejectedValueOrSerializedError) {
//             console.log(rejectedValueOrSerializedError)
//         }
//     }
//     useEffect(() => {
//         let mount = true
//         if (mount) {
//             Ads();
//         }
//         return () => {
//             mount = false
//         }
//     }, [])

//     useEffect(() => {
//         if (ads) {
//             $('#tableData')
//                 .DataTable({
//                     lengthMenu: [10, 25, 50, 100, 200],
//                     language: {
//                         "emptyTable": "Ads Not Found"
//                     },
//                     destroy: true,
//                 });
//         }
//     }, [ads])
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
//                     {modalType == "adDetail" ? <>
//                         <p className="pass-text">Ad Detail</p>
//                         <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//                         <div className="modal-body">
//                             <p > <b>Image:</b> {adDetail?.image ? <><img height="20%" width="20%" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${adDetail?.image}`}></img></> : <>No Image Found</>}</p>
//                             <p > <b>Price:</b> ${adDetail?.price}</p>
//                             <p > <b>Phone:</b> {adDetail?.phone}</p>
//                             <b>Sub Category:</b>
//                             {adDetail?.subCategory?.map((item, i) =>
//                                 Object.keys(item)?.map((key, index) =>
//                                     <p key={index}><b>{key}:</b> {item[key]}</p>
//                                 )
//                             )}
//                         </div>
//                     </> : modalType == "Approved" || modalType == "Disapproved" ? <>
//                         <p className="pass-text">{modalType == "Approved" ? "Approval Confirmation" : modalType == "Disapproved" ? "Disapproval Confirmation" : ""}</p>
//                         <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//                         <div className="modal-body">
//                             <form >
//                                 <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
//                                     <div className="login-button mt-2" style={{ width: "40%" }}>
//                                         <button type="button" onClick={() => changeAdStatus(id, modalType)} className="cta-btn col-reds w-100">{modalType == "Approved" ? "Approve" : modalType == "Disapproved" ? "Disapprove" : ""}</button>
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
//                 marginTop: ads ? "10%" : "12%"
//             }}>
//                 <section className="coupon-sec-2">
//                     <div className="container tableContainer">
//                         <div className="row">
//                             <div className="col-12 col-md-12 col-lg-12">
//                                 <div className="card shadow mb-4">
//                                     <div className="card-body">
//                                         <div className="table-responsive" id="tableready">
//                                             <table id="tableData" className="table table-bordered" style={{ width: '100%', textAlign: "center" }}>
//                                                 <thead>
//                                                     {ads ? (<tr>
//                                                         <th>S.No</th>
//                                                         <th>Title</th>
//                                                         <th>Category</th>
//                                                         <th>Description</th>
//                                                         <th>Creation Date</th>
//                                                         <th>Detail</th>
//                                                         <th>Status</th>
//                                                         <th>Action</th>
//                                                     </tr>) : (<tr></tr>)}
//                                                 </thead>
//                                                 <tbody >
//                                                     {ads?.map((item, i) => (
//                                                         <tr key={i}>
//                                                             <td>{i + 1}</td>
//                                                             <td>{item?.title}</td>
//                                                             <td>{item?.category}</td>
//                                                             <td style={{
//                                                                 wordWrap: "break-word",
//                                                                 wordBreak: "break-all",
//                                                                 whiteSpace: "normal",
//                                                             }}>{item?.description}</td>
//                                                             <td>{moment(item?.createdAt).format("DD-MMM-YYYY")}</td>
//                                                             <td>
//                                                                 <span className="edit-icon" >
//                                                                     <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "adDetail")}  ><i className="fas fa-eye"></i> View</span>
//                                                                 </span>
//                                                             </td>
//                                                             <td><b style={{ padding: 3, borderRadius: 5, color: item?.status == "Approved" ? "#fff" : item?.status == "Pending" ? "#000" : "#fff", backgroundColor: item?.status == "Approved" ? "limegreen" : item?.status == "Pending" ? "yellow" : "red" }}>{item?.status}</b></td>
//                                                             <td>
//                                                                 <span className="edit-icon" >
//                                                                     {item?.status == "Pending" ? <>
//                                                                         <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?._id, "Approved")}  ><span className="fa fa-solid fa-check"></span> <span> Approve</span></span>
//                                                                         <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?._id, "Disapproved")}  ><span className="fas fa-solid fa-xmark"></span> Disapprove</span>
//                                                                     </> : item?.status == "Approved" ? <>
//                                                                         <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?._id, "Disapproved")}  ><span className="fas fa-solid fa-xmark"></span> Disapprove</span>
//                                                                     </> : <>
//                                                                         No Action Available
//                                                                     </>}
//                                                                 </span>
//                                                             </td>
//                                                         </tr>
//                                                     )
//                                                     )}
//                                                 </tbody>
//                                                 <tfoot>
//                                                     {ads ? (<tr>
//                                                         <th>S.No</th>
//                                                         <th>Title</th>
//                                                         <th>Category</th>
//                                                         <th>Description</th>
//                                                         <th>Creation Date</th>
//                                                         <th>Detail</th>
//                                                         <th>Status</th>
//                                                         <th>Action</th>
//                                                     </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Ads Found"}</th></tr>)}
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
// export default MarketPlaceAds
