/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
/**
 * components
 */
import FieldSelectCountry from "../../../../../../components/Select/Country";
import FormUI from "../../../../../../components/Form";
/**
 * services
 */
import StateService from "../../../../../../services/admin/state.service";
import FieldInput from "../../../../../../components/Form/FieldInput";

export default function UpdateStateForm({stateId, state, getState}) {
    const updateState = async (value) => {
        await StateService.update(stateId, value);
        await getState(stateId)
    };

    return (
        <FormUI onSubmit={updateState}
                initialValues={{
                    country_id: +state.country.id,
                    original_name: state.original_name,
                }}
                render={({handleSubmit, submitting}) => (
                    <Form onFinish={handleSubmit} layout="vertical">
                        <h5>General</h5>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectCountry name="country_id"
                                                    required={true}
                                                    disabled={true}
                                                    select={{
                                                        showSearch: true,
                                                    }}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Original name"
                                            name={`original_name`}
                                            placeholder={`Enter original name`}
                                            required={true}/>
                            </div>
                        </div>
                        <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                    </Form>
                )}
        />
    )
}
