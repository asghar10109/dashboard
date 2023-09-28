import React,{useEffect,useMemo,useRef,useState} from 'react'
 import { useDispatch,useSelector } from 'react-redux'
import { getPrivacy, privacy, updatePrivacy } from '../store/slices/userSlice'
import moment from 'moment'
import JoditEditor from "jodit-react";

const PrivacyPolicy = () => {
   const [pp, setPp] = useState('')
  const dispatch=useDispatch()
  const Pp =useSelector(getPrivacy)  
  const editor = useRef(null);
// console.log('sadasdsad', Pp)

  const config = useMemo(
    () => ({
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      placeholder: "Start typings...",
    }),
    []
  );


  const updatePp = async () => {
    try {
       await dispatch(updatePrivacy({content : pp})).unwrap()
      try {
        await dispatch(privacy()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
  useEffect(() => {
    async function TcPpData() {
      try {
        await dispatch(privacy()).unwrap()
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }
    TcPpData();
  }, [])
  return (
    <> 
       <section className="privacy-policy-sec">
        <div className="container type-2">
          <div className="privacy-policy-wrap">
            <div className="term-condition-box">
              <h1 className="heading">Privacy Policy</h1>
              <div className="content-box">
              <JoditEditor
                        ref={editor}
                        value={pp ? pp : Pp?.content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setPp(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                      />
                {/* <textarea className="gen-paragraph  mt-2" defaultValue={Pp?.content} rows="8" cols="100" style={{ padding: 10 }} onChange={(e)=>setPp(e.target.value)}>
                </textarea> */}
                <p className="last-update">Last Updated: {moment(Pp?.updatedAt).format("MMM DD, YYYY")}</p>
                <div className="login-button mt-2">
                  <button onClick={() => updatePp()} className="cta-btn col-reds w-20 pt-1 pb-1">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy