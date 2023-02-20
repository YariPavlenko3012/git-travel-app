/**
 * external libs
 */
import React from "react";
/**
 * styles
 */
import FileOrientationEnums from '../../enums/FileOrientation';


export default function PreviewFiles({image, oriental, height = 100, ...props}) {
    const isLandscape = oriental === FileOrientationEnums.landscape;
    const width = isLandscape ? height * 1.8 : height * 0.7;

    return (
        <img style={{width: width, minWidth: width, height: height, objectFit: "cover"}} src={image} alt="img" {...props}/>
    )
}
