/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
import {useHistory} from 'react-router-dom'
/**
 * components
 */
import FieldInput from "../../../../../components/Form/FieldInput";
import FormUI from "../../../../../components/Form";

export default function CreateCityForm({countryId}) {
    const history = useHistory();

    const createUser = async (value) => {

    };

    return (
        <FormUI onSubmit={createUser}
                render={({handleSubmit, submitting}) => (
                    <Form onFinish={handleSubmit} layout="vertical">
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Login"
                                            name="login"
                                            placeholder="Enter login"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Email"
                                            name="email"
                                            placeholder="Enter email"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Password"
                                            name="password"
                                            placeholder="Enter password"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Confirm password"
                                            name="confirm_password"
                                            placeholder="Enter confirm password"
                                            required={true}/>
                            </div>
                        </div>
                        <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                    </Form>
                )}
        />
    )
}
