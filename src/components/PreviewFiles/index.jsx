/**
 * external libs
 */
import {SlideDown} from 'react-slidedown/lib/slidedown'
import React, {useState} from "react";
/**
 * styles
 */
import styles from './index.module.scss';

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
                        {previewFiles.map(file => (
                          <div className={styles.download__preview_wrapper} key={file.id}>
                              <img className={styles.download__preview_img} src={file.path} alt="image"/>
                          </div>
                        ))}
                    </div>
                </div>
              )}
          </SlideDown>

      </div>
    )
}
