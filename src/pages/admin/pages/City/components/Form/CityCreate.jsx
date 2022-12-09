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
import PlaceApi from "../../../../../../utils/PlaceApi";

export default function CreateCityForm({stateId}) {
    const history = useHistory();

    const createCity = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));

        if(value.city.latitude && value.city.longitude){
            copyValues.geometry = await PlaceApi.getGeometryForCity(value.city.latitude, value.city.longitude)
            if(!copyValues.geometry){
                alert("Change coordinate. We have some error in google api")
                return;
            }
        }

        copyValues.city.landscape_image = copyValues.city.landscape_image?.id || null;
        copyValues.city.portrait_image = copyValues.city.portrait_image?.id || null;
        copyValues.city.original_name = copyValues.city.city_name;

        const {id} = await CityService.create(copyValues);

        return history.push(ADMIN_MAKE_SHOW_CITY_URI(id))
    };

    const changeCoordinates = ( value, setValues ) => {
        const coordinates = value.split(',');

        if(coordinates.length === 2){
            setTimeout(() => {
                setValues("city.latitude", coordinates[0].trim())
                setValues("city.longitude", coordinates[1].trim())
            }, 0)
        }
    }

    return (
        <FormUI onSubmit={createCity}
                initialValues={{
                    city: {
                        state_id: +stateId,
                        generation_count_of_squares: 1,
                    },
                    cabs: [],
                }}
                render={({handleSubmit, form, submitting}) => (
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
                                    <FieldInput label="Latitude"
                                                name={`city.latitude`}
                                                onPaste={val => changeCoordinates(val, form.mutators.setValue)}
                                                placeholder={`Enter latitude`}
                                                required={true}/>

                                </div>
                                <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                    <FieldInput label="Longitude"
                                                name={`city.longitude`}
                                                onPaste={val => changeCoordinates(val, form.mutators.setValue)}
                                                placeholder={`Enter longitude`}
                                                required={true}/>

                                </div>
                            </div>
                            <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                                <div style={{marginRight: 10}}>
                                    <UploadOrientalFile oriental={FileOrientationEnums.landscape} name="city.landscape_image"/>
                                </div>
                                <div style={{marginRight: 10}}>
                                    <UploadOrientalFile oriental={FileOrientationEnums.portrait} name="city.portrait_image"/>
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
