/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
import {useHistory} from 'react-router-dom'
/**
 * components
 */
import FieldSelectState from "../../../../../../components/Select/State";
import FieldInput from "../../../../../../components/Form/FieldInput";
import UploadFiles from "../../../../../../components/UploadFiles";
import FormUI from "../../../../../../components/Form";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";
/**
 * constants
 */
import {ADMIN_MAKE_EDIT_CITY_URI, ADMIN_MAKE_SHOW_CITY_URI} from "../../../../../../constants/admin/uri.constant";
import FieldTextarea from "../../../../../../components/Form/FieldTextarea";

export default function CreateCityForm({stateId}) {
    const history = useHistory();

    const createCity = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.city.images || []).map(({id}) => id);

        const {id} = await CityService.create(copyValues);

        return history.push(ADMIN_MAKE_SHOW_CITY_URI(id))
    };


    return (
        <FormUI onSubmit={createCity}
                initialValues={{
                    city: {state_id: +stateId},
                    cabs: [],
                }}
                render={({handleSubmit, submitting}) => (
                    <Form onFinish={handleSubmit} layout="vertical">
                        <h5>General</h5>
                        <div>
                            <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldSelectState name="city.state_id"
                                                      required={true}
                                                      disabled={true}
                                                      select={{
                                                          showSearch: true,
                                                      }}/>
                                </div>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldInput label="City name"
                                                name={`city.city_name`}
                                                placeholder={`Enter city name`}
                                                required={true}/>

                                </div>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldTextarea label="City description"
                                                   name={`city.city_description`}
                                                   placeholder={`Enter city description`}
                                                   required={true}/>
                                </div>
                            </div>
                            <UploadFiles name="city.images" fileName="images"/>
                        </div>
                        <h5 style={{marginTop: 40}}>Cabs</h5>
                        <div>
                            <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldInput label="Taxi name"
                                                name="cabs.0.name"
                                                placeholder="Enter taxi name"
                                                required={true}/>
                                </div>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldInput label="Taxi phone number"
                                                name="cabs.0.phone_number"
                                                placeholder="Enter taxi phone"
                                                required={true}/>
                                </div>
                            </div>
                        </div>
                        <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                    </Form>
                )}
        />
    )
}
