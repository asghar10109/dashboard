import React, { useEffect,useMemo,useRef,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import JoditEditor from "jodit-react";

import moment from 'moment'
import { getTerms, terms, updateTerms } from '../store/slices/userSlice'
const TermsAndConditions = () => {
  const [tc, setTc] = useState('')
  const dispatch = useDispatch()
  const Tc = useSelector(getTerms) 
  // console.log('tc', tc)
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      placeholder: "Start typings...",
    }),
    []
  );

  const updateTc = async () => {
    try {
       await dispatch(updateTerms({content: tc})).unwrap()
      try {
        await dispatch(terms()).unwrap()
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
        await dispatch(terms()).unwrap()
        
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }
    console.log("sdscxzcxzc",Tc)
    
      TcPpData();
    
  }, [])



  return (
    <>
      <section className="term-condition-sec">
        <div className="container type-2">
          <div className="term-condition-wrap">
            <div className="term-condition-box">
              <h1 className="heading">Terms and conditions</h1>
              {/* <h1 className="heading-2">Terms &amp; Conditions</h1> */}
              <div className="content-box">
              <JoditEditor
                        ref={editor}
                        value={tc ? tc : Tc?.content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setTc(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                      />
                {/* <textarea className="gen-paragraph  mt-2" defaultValue={Tc?.content} rows="8" cols="100" style={{ padding: 10 }} onChange={(e)=>setTc(e.target.value)}>
                </textarea> */}
                <p className="last-update">Last Updated: {moment(Tc?.updatedAt).format("MMM DD, YYYY")}</p>
                <div className="login-button mt-2">
                  <button 
                  onClick={() => updateTc()} 
                  className="cta-btn col-reds w-20 pt-1 pb-1">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsAndConditions