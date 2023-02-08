import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from './index.module.scss'
import RenderItem from "./components/RenderItem";

export default function ImageGallery({ children, images, renderItem }){
    const imageRef = useRef(null);
    const [imageSize, setImageSize] = useState({
        width: 0,
        height: 0,
    });
    const [imageIndex, setImageIndex] = useState(null);

    const successImage = useMemo(() => imageSize.width > 500 && imageSize.height > 250, [imageSize.width])

    const setImage = (index) => {
        setImageIndex(index)
    }

    const next = () => {
        const imageLength = images.length;
        const newIndex = imageIndex + 1;

        if(newIndex > imageLength - 1){
            return setImageIndex(0)
        }

        setImageIndex(newIndex)
    }

    const prev = () => {
        const imageLength = images.length;
        const newIndex = imageIndex - 1;

        if(newIndex < 0){
            return setImageIndex(imageLength - 1)
        }

        setImageIndex(newIndex)
    }

    const close = (e) => {
        if(!e.target.className.includes(styles.modal__arrow)){
            setImageIndex(null)
        }
    }

    useEffect(() => {
        if(imageRef.current){
            setImageSize({
                width: imageRef.current.naturalWidth,
                height: imageRef.current.naturalHeight,
            })
        }
    }, [imageIndex])

    return (
        <>
            {images.map((file, index) => <RenderItem renderItem={renderItem} key={file.id} file={file} setImage={() => setImage(index)}  />)}
            {imageIndex !== null && (
                <div className={styles.modal} onClick={close}>
                    {successImage ? (
                        <p className={styles.modal__text} style={{color: "#08ec08"}}>{imageSize.width}x{imageSize.height} NORMAL</p>
                    ) : (
                        <p className={styles.modal__text} style={{color: "red"}}>{imageSize.width}x{imageSize.height} FAILED</p>
                    )}
                    <div className={styles.modal__wrapper}>
                        <div className={styles.modal__arrow} onClick={prev}>
                            {"<"}
                        </div>
                        <img src={images[imageIndex].path} ref={imageRef} alt="image"/>
                        <div className={styles.modal__arrow} onClick={next}>
                            {">"}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
