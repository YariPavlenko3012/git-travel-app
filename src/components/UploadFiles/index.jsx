/**
 * external libs
 */
import {SlideDown} from 'react-slidedown/lib/slidedown'
import React, {useContext, useState} from "react";
import {Field, useForm, useFormState} from "react-final-form";
/**
 * context
 */
import {AlertContext} from "../../pages/context/alert.context";
/**
 * styles
 */
import styles from './index.module.scss';
import FilesService from "../../services/files.service";
import ImageGallery from "../ImageGallery";

export default function UploadFiles({name, fileName, keyFiles}) {
    const {mutators: {setValue}} = useForm();
    const {submitErrors, values} = useFormState();
    const {setAlertSuccess} = useContext(AlertContext);
    const [inProp, setInProp] = useState(false  );
    const [previewFiles, setPreviewFiles] = useState( values[name] || []);

    const setImageValue = (name, imgId) => {
        setValue(name, imgId)
    };

    const onDelete = async (deletedFile) => {
        await FilesService.delete({files_ids: [deletedFile.id]})
        const newFiles = previewFiles.filter(file => file.id !== deletedFile.id);
        setPreviewFiles(newFiles);
        setImageValue(name, newFiles);
    };

    const onChange = async (e) => {
        const {files} = e.target;

        const formData = new FormData;

        for (let i = 0; i < files.length; i++){
            formData.append("files[]", files[i]);
        }

        FilesService.upload(formData)
        .then(fileLists => {
            let newPreviewFileList = [];

            fileLists.forEach( file => {
                newPreviewFileList = [...newPreviewFileList, file];
            });

            setAlertSuccess("Files successfully uploaded");
            setPreviewFiles([...newPreviewFileList, ...previewFiles]);
            setImageValue(name, [...newPreviewFileList, ...previewFiles]);
            setInProp(true)
        })
    }

    return (
        <Field name="file">
            {props => (
                <div className="preview-img" style={{marginBottom: "1rem"}}>
                    <div className={styles.download__btn_wrapper}>
                        <div className={`${styles.download__btn} ${submitErrors?.[keyFiles] ? styles.error : ""}`} onClick={() => setInProp(!inProp)}>
                            <div>
                                Upload {fileName}
                            </div>
                        </div>
                        <label className={styles.download__btn_actions}>
                            <input name="myFile" type="file" hidden={true} multiple={true} onChange={onChange}/>
                            <img src="/git-travel-app/img/download.svg" alt="download"
                                 className={styles.download__btn_download}/>
                        </label>
                    </div>
                    <SlideDown className={'my-dropdown-slidedown'}>
                        {inProp && (
                          <div style={{ overflow: "hidden"}}>
                              <div className={styles.download__preview}>
                                  <ImageGallery images={previewFiles}
                                                renderItem={({file, setImage}) => {
                                                    return (
                                                        <div className={styles.download__preview_wrapper} key={file.id}>
                                                            <img className={styles.download__preview_img} src={file.path} alt="image" onClick={setImage}/>
                                                            <div className={styles.download__preview_delete} onClick={() => onDelete(file)}>
                                                                <svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" fill={"red"}></path></svg>
                                                            </div>
                                                        </div>
                                                    )
                                                }}>
                                  </ImageGallery>
                              </div>
                          </div>
                        )}
                    </SlideDown>

                </div>
            )}
        </Field>
    )
}
