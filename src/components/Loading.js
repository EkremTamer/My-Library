import React from "react";

const Loading = (props)=>{
    return(
        <div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
                <div style={{width:"100px",height:"100px"}} className="spinner-border text-primary">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading