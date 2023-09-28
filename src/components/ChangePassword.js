import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePassword } from '../store/slices/userSlice'
const ChangePassword = ({ closeModal }) => { 
  const [old_password, setCurrentPassword] = useState("")
  const [new_password, setNewPassword] = useState("")
  const [confirm_password, setConfirmNewPassword] = useState("")
  const [isSecureEntry, setisSecureEntry] = useState(true)
  const [isSecureEntry2, setisSecureEntry2] = useState(true)
  const [isSecureEntry3, setisSecureEntry3] = useState(true)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePassword({ old_password, new_password, confirm_password })).unwrap()
      closeModal()
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  } 
 
  return (
    <div className='change-password-modal' id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display:  "block" , zIndex: 100 }}>
      <p className="pass-text">Change Password</p>
          <button onClick={ closeModal } type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          <div className="modal-body"> 
            <form onSubmit={handleSubmit}>
              <div className="pass-form-wrap">
                <div className="fieldBox mb-2">
                  <input type={isSecureEntry ? "password" : "text"} placeholder="Current Password" maxlength={30} value={old_password} onChange={(e) => setCurrentPassword(e.target.value)} />
                  <span><i className={isSecureEntry ? "fas fa-eye-slash" : "fas fa-eye"} onClick={() => { setisSecureEntry((prev) => !prev) }} /></span>
                </div>
                <div className="fieldBox mb-2">
                  <input type={isSecureEntry2 ? "password" : "text"} placeholder="Enter New Password" maxlength={30} value={new_password} id="password" onChange={(e) => setNewPassword(e.target.value)} />
                  <span><i className={isSecureEntry2 ? "fas fa-eye-slash" : "fas fa-eye"} onClick={() => { setisSecureEntry2((prev) => !prev) }} /></span>
                </div>
                <div className="fieldBox mb-3">
                  <input type={isSecureEntry3 ? "password" : "text"} placeholder="Confirm New Password" maxlength={30} value={confirm_password} id="cpassword" onChange={(e) => setConfirmNewPassword(e.target.value)} />
                  <span><i className={isSecureEntry3 ? "fas fa-eye-slash" : "fas fa-eye"} onClick={() => { setisSecureEntry3((prev) => !prev) }} /></span>
                </div>
                <div className="login-button mt-2">
                  <button type="submit" className="cta-btn col-reds w-50">Update</button>
                </div>
              </div>
            </form>
          </div>
    </div> 
  )
}

export default ChangePassword