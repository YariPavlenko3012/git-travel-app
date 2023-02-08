/**
 * external libs
 */
import {SlideDown} from 'react-slidedown/lib/slidedown'
import React, {useState} from "react";
/**
 * styles
 */
import styles from './index.module.scss';
import CheckNormalImage from "../CheckNormalImage";
import PreviewFilesOriental from "../PreviewFilesOriental";
import FileOrientationEnums from "../../enums/FileOrientation";
import ImageGallery from "../ImageGallery";

export default function PreviewFiles({previewFiles}) {
    const [inProp, setInProp] = useState(false);

    return (
      <div className="preview-img" style={{marginBottom: "1rem"}}>
          <div className={styles.download__btn_wrapper}>
              <div className={`${styles.download__btn}`} onClick={() => setInProp(!inProp)}>
                  <div>
                      All images (<span style={{color: previewFiles.length ? "black" : "red"    }}>{previewFiles.length}</span>)
                  </div>
              </div>
          </div>
          <SlideDown className={'my-dropdown-slidedown'}>
              {inProp && (
                <div style={{overflow: "hidden"}}>
                    <div className={styles.download__preview}>
                        <ImageGallery images={previewFiles}
                                      renderItem={({file, setImage}) => {
                                          return (
                                              <div className={styles.download__preview_wrapper} key={file.id}>
                                                  <img className={styles.download__preview_img} src={file.path} onClick={setImage} alt="image"/>
                                              </div>
                                          )
                                      }}>
                        </ImageGallery>
                    </div>
                </div>
              )}
          </SlideDown>

      </div>
    )
}
