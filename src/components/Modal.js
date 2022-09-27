import React from "react";


const Modal=(props)=>{

    const {onCancel,onConfirm,title,comment}=props

    return(
        <button onClick={onCancel} style={{
            position:"absolute",
            top:0,
            left:0,
            width:"100vw",
            height:"100vh",
            backgroundColor:"rgba(0,0,0,0.3)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            cursor:"default"
        }}>
           <div style={{
            width:"50%",
            padding:"20px",
            backgroundColor:"#fff",
            borderRadius:"5px"
           }}>
                <h1 className="text-center">{title}</h1>
                <p className="text-center">{comment}</p>
                <div className="d-flex justify-content-center">
                    <button onClick={onCancel} className="btn btn-outline-danger mx-3 btn-sm">Cancel</button>
                    <button onClick={onConfirm} className="btn btn-outline-primary btn-sm">Confirm</button>
                </div>
           </div>
        </button>
    )
}

export default Modal;