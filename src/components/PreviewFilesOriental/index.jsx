/**
 * external libs
 */
import React from "react";
/**
 * styles
 */
import styles from './index.module.scss'
/**
 * styles
 */
import FileOrientationEnums from '../../enums/FileOrientation';

export default function PreviewFiles({previewFiles, oriental}) {
    console.log(previewFiles, "previewFiles")
    return (
      <div className={`${styles.file} ${oriental === FileOrientationEnums.portrait ? styles.portrait : styles.landscape}`}>
          <img src={previewFiles.path} alt="img"/>
      </div>
    )
}
