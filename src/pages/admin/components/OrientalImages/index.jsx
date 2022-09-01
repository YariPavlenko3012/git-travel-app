import React from "react";

export default function OrientalImages({landscapeImage, portraitImage, height }){
    return (
        <div style={{display: "flex"}}>
            <img style={{marginRight: 10, width: height * 1.8, height: height}} src={landscapeImage} alt="img"/>
            <img style={{width: height * 0.1, height: height}} src={portraitImage} alt="img"/>
        </div>
    )
}
