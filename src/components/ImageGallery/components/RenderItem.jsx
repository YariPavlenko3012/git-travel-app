import React, {useEffect, useState} from "react";
import CheckNormalImage from "../../CheckNormalImage";

export default function RenderItem({file, setImage, renderItem}){
    return (
        <CheckNormalImage url={file.path}>
            {({ isNormal }) => renderItem({file, setImage, isNormal})}
        </CheckNormalImage>
    )
}
