/**
 * external libs
 */
import {Button, Form} from "antd";
import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
/**
 * components
 */
import FieldSelectState from "../../../../../../components/Select/State";
import FieldInput from "../../../../../../components/Form/FieldInput";
import FormUI from "../../../../../../components/Form";
import UploadOrientalFile from "../../../../../../components/UploadOrientalFile";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";
import StateService from "../../../../../../services/admin/state.service";
/**
 * constants
 */
import {ADMIN_MAKE_SHOW_CITY_URI} from "../../../../../../constants/admin/uri.constant";
/**
 * enums
 */
import FileOrientationEnums from "../../../../../../enums/FileOrientation";
/**
 * utils
 */
import GoogleClient from "../../../../../../utils/GoogleClient";

export default function CreateCityForm({stateId}) {
    const history = useHistory();

    const createCity = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));

        if(value.latitude && value.longitude){
            copyValues.geometry = await GoogleClient.getGeometryForCity(value.latitude, value.longitude)
            if(!copyValues.geometry){
                alert("Change coordinate. We have some error in google api")
                return;
            }
        }

        copyValues.landscape_image = copyValues.landscape_image?.id || null;
        copyValues.portrait_image = copyValues.portrait_image?.id || null;
        copyValues.original_name = copyValues.translatable?.name || "";

        const {id} = await CityService.create(copyValues);

        return history.push(ADMIN_MAKE_SHOW_CITY_URI(id))
    };

    const changeCoordinates = ( value, setValues ) => {
        const coordinates = value.split(',');

        if(coordinates.length === 2){
            setTimeout(() => {
                setValues("latitude", coordinates[0].trim())
                setValues("longitude", coordinates[1].trim())
            }, 0)
        }
    }

    return (
        <FormUI onSubmit={createCity}
                initialValues={{
                    state_id: +stateId,
                    generation_count_of_squares: 1,
                }}
                render={({handleSubmit, form, submitting}) => (
                    <Form onFinish={handleSubmit} layout="vertical">
                        <h5>General</h5>
                        <div>
                            <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldSelectState name="state_id"
                                                      required={true}
                                                      disabled={true}
                                                      select={{
                                                          showSearch: true,
                                                      }}/>
                                </div>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldInput label="City name"
                                                name={`translatable.name`}
                                                placeholder={`Enter city name`}
                                                required={true}/>

                                </div>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldInput label="Latitude"
                                                name={`latitude`}
                                                onPaste={val => changeCoordinates(val, form.mutators.setValue)}
                                                placeholder={`Enter latitude`}
                                                required={true}/>

                                </div>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldInput label="Longitude"
                                                name={`longitude`}
                                                onPaste={val => changeCoordinates(val, form.mutators.setValue)}
                                                placeholder={`Enter longitude`}
                                                required={true}/>

                                </div>
                            </div>
                            <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                                <div style={{marginRight: 10}}>
                                    <UploadOrientalFile oriental={FileOrientationEnums.landscape} name="landscape_image"/>
                                </div>
                                <div style={{marginRight: 10}}>
                                    <UploadOrientalFile oriental={FileOrientationEnums.portrait} name="portrait_image"/>
                                </div>
                            </div>
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
