// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addCategory, getAllCategories, getCategory, deleteCategory } from '../store/slices/userSlice'
// import { v4 as uuidv4 } from 'uuid';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Modal from 'react-modal';
// import $ from "jquery"
// import 'datatables.net'
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     width: "30%",
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };
// Modal.setAppElement('#root');
// const AddCategory = () => {
//   const [category, setCategory] = useState('')
//   const [type, setType] = useState()
//   const [modalType, setModalType] = useState()
//   const [arr, setArr] = useState([])
//   const [SubCategoryName, setSubCategoryName] = useState()
//   const dispatch = useDispatch()
//   const getCat = useSelector(getAllCategories) 
//   const [id, setId] = useState()
//   const [showSubCategory, setShowSubCategory] = useState()
//   const [modalIsOpen, setIsOpen] = useState(false);

//   function viewModal(item, type) {
//     if (type == "subCategory") {
//       setShowSubCategory(item)
//     } else if (type == "delete") {
//       setId(item)
//     }
//     setModalType(type)
//     setIsOpen(true);
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }
  
//   const getData=async()=> {
//     try {
//       await dispatch(getCategory()).unwrap()
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError)
//     }
//   }
//   useEffect(() => {
//      let mount = true
//     if (mount) {
//       getData();
//     }
//     return () => {
//       mount = false
//     }
//   }, [])

//   const categoryDelete = async (id) => {
//     try {
//       await dispatch(deleteCategory(id)).unwrap()
//       setIsOpen(false)
//       try {
//         getData()
//       } catch (rejectedValueOrSerializedError) {
//         console.log(rejectedValueOrSerializedError)
//       }
//     } catch (rejectedValueOrSerializedError) {
//       console.log(rejectedValueOrSerializedError)
//     }
//   }


//   const submitCategory = async (e) => {
//     e.preventDefault()
//     if (!type) {
//       toast.error("Select a type", {
//         position: toast.POSITION.TOP_RIGHT
//       });
//     } else {
//       try {
//         await dispatch(addCategory(arr.length > 0 ? { addCategory: category, subCategory: arr, type } : { addCategory: category, type })).unwrap()
//         setCategory('')
//         setArr([])
//         try {
//           getData()
//         } catch (rejectedValueOrSerializedError) {
//           console.log(rejectedValueOrSerializedError)
//         }
//       } catch (rejectedValueOrSerializedError) {
//         console.log(rejectedValueOrSerializedError)
//       }
//     }
//   }
//   const add = () => {
//     if (!SubCategoryName) {
//       toast.error("Sub category name can't be empty", {
//         position: toast.POSITION.TOP_RIGHT
//       });
//     } else {
//       setArr((arr) => [...arr, { "id": uuidv4(), "name": SubCategoryName }])
//       setSubCategoryName("")
//     }
//   }
//   const deleteNow = (item) => {
//     setArr(current => current.filter(arr => {
//       return arr.id !== item.id;
//     }),
//     );
//   }
 
//   useEffect(() => {
//     if (getCat) {
//       $('#tableData')
//         .DataTable({
//           lengthMenu: [10, 25, 50, 100, 200],
//           language: {
//             "emptyTable": "Users Not Found"
//           },
//           destroy: true,
//         });
//     }
//   }, [getCat,dispatch])
//   return (
//     <>
//       <Modal
//         closeTimeoutMS={500}
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//       >
//         <div className='change-password-modal' id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: "block", zIndex: 100 }}>
//           {modalType == "subCategory" ? <>
//             <p className="pass-text">Sub Category Detail</p>
//             <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//             <div className="modal-body">
//               {showSubCategory?.map((item, i) => (
//                 <p key={i}><b>{i + 1}</b> {item.name}</p>
//               ))}
//             </div>
//           </> : modalType == "delete" ? <> 
//             <p className="pass-text">Delete Category Confirmation</p>
//             <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//             <div className="modal-body">
//               <form >
//                 <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
//                   <div className="login-button mt-2" style={{ width: "40%" }}>
//                     <button type="button" onClick={() => categoryDelete(id)} className="cta-btn col-reds w-100">Delete</button>
//                   </div>
//                   <div className="login-button mt-2" style={{ width: "40%" }} >
//                     <button type="button" onClick={closeModal} className="cta-btn col-reds w-100">Cancel</button>
//                   </div>
//                 </div>
//               </form> 
//         </div>
//           </> : <></>}
//         </div>
//       </Modal> 
//       <section className="term-condition-sec" >
//         <div className="container type-2">
//           <div className="term-condition-wrap">
//             <div className="term-condition-box pb-0">
//               <h1 className="heading">Add Category</h1>
//               <div className="">
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                   <div className=" my-2 add_category__one1">
//                     <select value={type} onChange={(e) => setType(e.target.value)} >
//                       <option value=''>Select Type</option>
//                       <option value="Normal">Normal</option>
//                       <option value="MarketPlace">MarketPlace</option>
//                     </select>
//                   </div>
//                   <div className=" my-2 add_category__one1">
//                     <input type="text" placeholder="Add Category" value={category} onChange={(e) => setCategory(e.target.value)} />
//                   </div>
//                   {type == "MarketPlace" ? <>
//                     <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
//                       <div className=" my-2 add_category__one1">
//                         <input type="text" placeholder="Sub Category Name" value={SubCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} />
//                       </div>
//                       <div className="my-2 add_category__one1">
//                         <button onClick={(e) => add(e)} className="cta-btn col-reds w-20 pt-1 pb-1"><i className="fas fa-light fa-plus"></i></button>

//                       </div>
//                     </div>
//                     {arr?.map((item, i) => (
//                       <div key={i} className=" my-2 add_category__one1" style={{
//                         display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderRadius: 5, padding: '10px 8px', boxShadow: "0px 1px 20px 0px rgba(0,0,0,0.31)"
//                       }}>
//                         <div key={i} >
//                           <span>{item?.name}</span>
//                         </div>
//                         <div style={{ marginRight: 10 }}>
//                           <button style={{ border: "none" }} onClick={() => deleteNow(item)}><i className="fas fa-trash-alt"></i></button>
//                         </div>
//                       </div>
//                     ))}
//                   </> : <>
//                   </>}
//                   <div className="my-2 add_category__one1">
//                     <button onClick={(e) => submitCategory(e)} className="cta-btn col-reds w-20 pt-1 pb-1">Save</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {getCat ?
//           <section className="coupon-sec-2 term-condition-wrap pt-0">
//             <div className="container  term-condition-box pb-0">
//               <div className="row">
//                 <div className="col-12 col-md-12 col-lg-12">
//                   <div className="card shadow mb-4">
//                     <div className="card-body">
//                       <div className="table-responsive" id="tableready">
//                         <table id="tableData" className="table   table-bordered" style={{ width: '100%', textAlign: "center" }}>
//                           <thead>
//                             {getCat ? (<tr>
//                               <th>S.No</th>
//                               <th>Category</th>
//                               <th>Sub Category</th>
//                               <th>Action</th>
//                             </tr>) : (<tr></tr>)}
//                           </thead>
//                           <tbody >
//                             {getCat?.map((item, i) =>
//                             (
//                               <tr key={i}>
//                                 <td>{i + 1}</td>
//                                 <td>{item?.name}</td>
//                                 <td>
//                                   <span className="edit-icon" >
//                                     {item.type == "MarketPlace" ?
//                                       <span style={{ cursor: "pointer", fontWeight: "bold", fontSize: 14 }} onClick={() => viewModal(item.subCategory, "subCategory")} ><i className="fas fa-eye"></i> View </span>
//                                       : <b>N/A</b>}
//                                   </span>
//                                 </td>
//                                 <td>
//                                   <span className="edit-icon" >
//                                     <span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => viewModal(item._id, "delete")} ><i className="fas fa-trash-alt"></i> Delete</span>
//                                   </span>
//                                 </td>
//                               </tr>
//                             )
//                             )}
//                           </tbody>
//                           <tfoot>
//                             {getCat ? (<tr>
//                               <th>S.No</th>
//                               <th>Category</th>
//                               <th>Sub Category</th>
//                               <th>Action</th>
//                             </tr>) : (<tr> </tr>)}
//                           </tfoot>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//           : <></>}
//       </section>
//     </>
//   )
// }

// export default AddCategory