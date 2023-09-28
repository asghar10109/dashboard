// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
// // import { approveDisapproveReport, getReportedPosts, getUserStatus } from '../store/slices/userSlice';
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
// const ReportedPosts = () => {
//     const [id, setId] = useState()
//     const dispatch = useDispatch()
//     const [reports, setReports] = useState(null)
//     const status = useSelector(getUserStatus)
//     const [reportDetail, setReportDetail] = useState(null)
//     const [modalIsOpen, setIsOpen] = useState(false);
//     const [modalType, setModalType] = useState()

//     function viewModal(item, type) {
//         setIsOpen(true);
//         if (type == "gallery") {
//             setReportDetail(item?.postId?.gallery)
//         } else if (type == "reportedBy") {
//             setReportDetail(item)
//         } else {
//             setId(item)
//         }
//         setModalType(type)
//         setIsOpen(true);
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }

//     const changeReportStatus = async (id, status) => {
//         try {
//             await dispatch(approveDisapproveReport({ id, status })).unwrap()
//             setIsOpen(false)
//             $('#tableData')
//                 .DataTable().destroy();
//             try {
//                 getReports()
//             } catch (rejectedValueOrSerializedError) {
//                 console.log(rejectedValueOrSerializedError)
//             }
//         } catch (rejectedValueOrSerializedError) {
//             console.log(rejectedValueOrSerializedError)
//         }
//     }

//     const getReports = async () => {
//         try {
//             setReports(null)
//             const response = await dispatch(getReportedPosts()).unwrap()
//             setReports(response?.report)
//         } catch (rejectedValueOrSerializedError) {
//             console.log(rejectedValueOrSerializedError)
//         }
//     }
//     useEffect(() => {
//         let mount = true
//         if (mount) {
//             getReports();
//         }
//         return () => {
//             mount = false
//         }
//     }, [])

//     useEffect(() => {
//         if (reports) {
//             $('#tableData')
//                 .DataTable({
//                     lengthMenu: [10, 25, 50, 100, 200],
//                     language: {
//                         "emptyTable": "Reports Not Found"
//                     },
//                     destroy: true,
//                 });
//         }
//     }, [reports,dispatch])
//     return (
//         <>
            
//         </>
//     )
// }
// export default ReportedPosts
