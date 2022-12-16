/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
/**
 * components
 */
import FieldSelectState from "../../../../../../components/Select/State";
import FieldInput from "../../../../../../components/Form/FieldInput";
import UploadOrientalFile from "../../../../../../components/UploadOrientalFile";
import FormUI from "../../../../../../components/Form";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";
/**
 * enums
 */
import FileOrientationEnums from "../../../../../../enums/FileOrientation";
/**
 * utils
 */
import GoogleClient from "../../../../../../utils/GoogleClient";

export default function UpdateCityForm({cityId, city, getCity}) {
    const updateCity = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));

        const equalCoordinate = city.latitude === copyValues.latitude && city.longitude === copyValues.longitude;
        if (!equalCoordinate && copyValues.latitude && copyValues.longitude) {
            copyValues.geometry = await GoogleClient.getGeometryForCity(copyValues.latitude, copyValues.longitude)
            if (!copyValues.geometry) {
                alert("Change coordinate. We have some error in google api")
                return;
            }
        }

        copyValues.landscape_image = copyValues.landscape_image?.id || null;
        copyValues.portrait_image = copyValues.portrait_image?.id || null;

        await CityService.update(cityId, copyValues);
        await getCity(cityId)
    };

    const changeCoordinates = (value, setValues) => {
        const coordinates = value.split(',');

        if (coordinates.length === 2) {
            setTimeout(() => {
                setValues("latitude", coordinates[0])
                setValues("longitude", coordinates[1])
            }, 0)
        }
    }

    console.log(city, "city")

    return (
        <FormUI onSubmit={updateCity}
                initialValues={{
                    state_id: +city?.state?.id,
                    landscape_image: city.landscape_image,
                    portrait_image: city.portrait_image,
                    latitude: city.latitude,
                    longitude: city.longitude,
                    original_name: city.original_name,
                    generation_count_of_squares: city.generation_count_of_squares,
                }}
                render={({handleSubmit, submitting, form}) => (
                    <Form onFinish={handleSubmit} layout="vertical">
                        <h5>General</h5>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectState name="state_id"
                                                  required={true}
                                                  select={{
                                                      showSearch: true,
                                                  }}/>
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
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Original name"
                                            name={`original_name`}
                                            placeholder={`Enter original name`}
                                            required={true}/>

                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Count of squares"
                                            type="number"
                                            name={`generation_count_of_squares`}
                                            placeholder={`Enter count of squares`}
                                            input={{
                                                min: 1,
                                                max: 2
                                            }}
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
                        <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                    </Form>
                )}
        />
    )
}
