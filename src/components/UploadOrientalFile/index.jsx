/**
 * external libs
 */
import React, {useContext, useState} from "react";
import {Field, useForm, useFormState} from "react-final-form";
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
/**
 * context
 */
import {AlertContext} from "../../pages/context/alert.context";
/**
 * styles
 */
import styles from './index.module.scss';
import FilesService from "../../services/files.service";
import FileOrientationEnums from "../../enums/FileOrientation";
import CheckNormalImage from "../CheckNormalImage";

export default function UploadFiles({name, oriental, keyFiles}) {
    const {mutators: {setValue}} = useForm();
    const {submitErrors, values} = useFormState();
    const {setAlertSuccess} = useContext(AlertContext);
    const [previewFiles, setPreviewFiles] = useState( values[name] || {});

    const setImageValue = (name, imgId) => {
        setValue(name, imgId)
    };

    const onChange = async (e) => {
        const files = e;

        const formData = new FormData;
        formData.append("files[]", files);

        FilesService.upload(formData)
            .then(fileLists => {
                setAlertSuccess("Files successfully uploaded");
                setPreviewFiles(fileLists[0]);
                setImageValue(name, fileLists[0]);
            })
    }

    return (
        <Field name="file">
            {props => (
                <div className="preview-img" style={{marginBottom: "1rem"}}>
                    <div className={styles.download__btn_wrapper}>
                        <div className={`${styles.download__btn} `}>
                            <div>
                                Upload {oriental === FileOrientationEnums.landscape ? "Landscape" : "Portrait"}
                            </div>
                        </div>
                        <ImgCrop onModalOk={onChange} aspect={oriental === FileOrientationEnums.landscape ? 1.8 : 0.7}>
                            <Upload customRequest={(e) => e}>
                                <div className={`${oriental === FileOrientationEnums.landscape ? styles.landscape : styles.portrait} ${styles.download__btn_actions} ${submitErrors?.[keyFiles] ? styles.error : ""}`}>
                                    {previewFiles.path && (
                                        <CheckNormalImage url={previewFiles.path}>
                                            <img src={previewFiles.path} alt="img"
                                                 className={styles.download__btn_photo}/>
                                        </CheckNormalImage>
                                    )}
                                    <img src="/git-travel-app/img/download.svg" alt="download"
                                         className={styles.download__btn_download}/>
                                </div>
                            </Upload>
                        </ImgCrop>
                    </div>
                </div>
            )}
        </Field>
    )
}
