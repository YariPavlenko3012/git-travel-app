import React, {useEffect, useState} from "react";

export default function CheckNormalImage({children, url}){
    const [isNormal, setIsNormal] = useState(null)
    const getMeta = async (url) => {
        if(!url){
            return setIsNormal(false)
        }
        const img = new Image();
        img.src = url;
        await img.decode();

        return setIsNormal(img.naturalWidth > 500 && img.naturalHeight > 250)
    };

    useEffect(() => {
        getMeta(url)
    }, [url])

    if(isNormal === null){
        return null
    }

    return (
        <div style={{border: `2px solid ${isNormal ? "#3bbf3b" : "red"}`, position: "relative", height: "100%"}}>
            {typeof children === "function" ? children({isNormal}) : children}
        </div>
    )
}
