/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
import {useHistory} from 'react-router-dom'
/**
 * components
 */
import FieldInput from "../../../../../../components/Form/FieldInput";
import FormUI from "../../../../../../components/Form";
import FieldSelectCountry from "../../../../../../components/Select/Country";
/**
 * services
 */
import StateService from "../../../../../../services/admin/state.service";
/**
 * constants
 */
import {ADMIN_MAKE_SHOW_STATE_URI} from "../../../../../../constants/admin/uri.constant";

export default function CreateStateForm({countryId}) {
    const history = useHistory();

    const createState = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.original_name = copyValues.state_name;

        const {id} = await StateService.create(copyValues);

        return history.push(ADMIN_MAKE_SHOW_STATE_URI(id))
    };


    return (
      <FormUI onSubmit={createState}
              initialValues={{
                  country_id: countryId,
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <h5 style={{marginTop: 40}}>General</h5>
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
                            <FieldInput label="State name"
                                        name={`state_name`}
                                        placeholder={`Enter state name`}
                                        required={true}/>
                        </div>
                    </div>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
