/**
 * external libs
 */
import React from 'react';
import {Button, Form} from "antd";
/**
 * components
 */
import FieldInput from "../../../../../../components/Form/FieldInput";
import FormUI from "../../../../../../components/Form";


export default function ExcursionForm({excursionFormData, setExcursionFormData}){

    const createExcursion = (values) => {
        setExcursionFormData({
            ...excursionFormData,
            ...values
        });
    }

    return (
        <FormUI onSubmit={createExcursion}
                initialValues={{
                    name: excursionFormData?.name || "",
                    description: excursionFormData?.description || "",
                }}
                render={({handleSubmit, submitting, form}) => (
                    <Form onFinish={handleSubmit} layout="vertical">
                        <h5>General</h5>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Title"
                                            name={`name`}
                                            placeholder={`Enter name`}
                                            required={true}/>

                            </div>
                            <div style={{width: "calc(100% - 10px - (100% / 4 - 10px))"}}>
                                <FieldInput label="Description"
                                            name={`description`}
                                            placeholder={`Enter description`}
                                            required={true}/>

                            </div>
                        </div>
                        <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                    </Form>
                )}
        />
    )
}
