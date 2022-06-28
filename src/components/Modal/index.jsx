/**
 * external libs
 */
import React, {useMemo} from "react";
import {Button, Modal} from 'antd'

export default function ModalUI({children, title, buttonText, show, onClose, onSubmit, ...props}) {

    const footer = useMemo(() => {
        let generateFooter = [];
        if(onSubmit && buttonText) {
            generateFooter = [
                <Button key="back" onClick={onClose}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={onSubmit}>
                    {buttonText}
                </Button>
            ]
        }

        return generateFooter
    }, [buttonText, onSubmit]);

    return (
        <Modal
            {...props}
            onCancel={onClose}
            visible={show}
            title={title || false}
            okText={buttonText || null}
            onOk={onSubmit || null}
            footer={footer}
        >
            {children}
        </Modal>
    )
}
