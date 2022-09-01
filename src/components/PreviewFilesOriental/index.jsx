/**
 * external libs
 */
import React from "react";
/**
 * styles
 */
import FileOrientationEnums from '../../enums/FileOrientation';
import MediaModel from "../../model/media.model";

const staticPhoto = {
    [FileOrientationEnums.portrait]: "https://images.unsplash.com/photo-1629809189194-8302d4345c8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dWtyYWluZSUyMGZsYWd8ZW58MHx8MHx8&w=1000&q=80",
    [FileOrientationEnums.landscape]: "https://media.istockphoto.com/photos/close-up-ukranian-flag-picture-id163641275?b=1&k=20&m=163641275&s=170667a&w=0&h=CVdqTfh31VTDbr7hqcBTbyocEZLlWTC02Kip6niMXBw="
}

export default function PreviewFiles({image, oriental, height = 100}) {
    const isLandscape = oriental === FileOrientationEnums.landscape;
    const width = isLandscape ? height * 1.8 : height * 0.7;

    return (
        <img style={{width: width, minWidth: width, height: height, objectFit: "cover"}} src={image || staticPhoto[oriental]} alt="img"/>
    )
}
