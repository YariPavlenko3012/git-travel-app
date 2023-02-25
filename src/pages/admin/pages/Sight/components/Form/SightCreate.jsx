/**
 * external libs
 */
import {Button, Form} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
/**
 * components
 */
import FormUI from "../../../../../../components/Form";
import FieldSelectCity from "../../../../../../components/Select/City";
import FieldSelectPlaceType from "../../../../../../components/Select/PlaceType";
import FieldInput from "../../../../../../components/Form/FieldInput";
import UploadFiles from "../../../../../../components/UploadFiles";
import TimePicker from "../TimePicker";
/**
 * services
 */
import SightService from "../../../../../../services/admin/sight.service";
/**
 * context
 */
import {AuthContext} from "../../../../../context/auth.context";
/**
 * constants
 */
import {ADMIN_MAKE_EDIT_SIGHT_URI} from "../../../../../../constants/admin/uri.constant";
import CityService from "../../../../../../services/admin/city.service";

export default function SightCreateForm({ cityId }) {
    const [city, setCity] = useState(null);
    const {user} = useContext(AuthContext);
    const history = useHistory();

    const createSight = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.images || []).map(({id}) => id);
        copyValues.original_name = copyValues.translatable?.name || "";
        copyValues.work_status = "pending";

        const {id} = await SightService.create(copyValues);

        return history.push(ADMIN_MAKE_EDIT_SIGHT_URI(id))
    };

    const changeCoordinates = ( value, setValues ) => {
        const coordinates = value.split(',');

        if(coordinates.length === 2){
            setTimeout(() => {
                setValues("latitude", coordinates[0])
                setValues("longitude", coordinates[1])
            }, 0)
        }
    }

    const getCity = async () => {
        setCity(await CityService.show(cityId))
    }

    useEffect(() => {
        getCity()
    }, [])

    if(!city){
        return null
    }

    return (
      <FormUI onSubmit={createSight}
              initialValues={{
                  country_id: city.state.country.id,
                  city_id: +cityId,
                  user_id: user.id,
                  opening_hours: null
              }}
              render={({handleSubmit, values, submitting, form}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <h5>General</h5>
                    <div>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectCity name="city_id"
                                                 required={true}
                                                 label="City"
                                                 disabled={true}
                                                 select={{
                                                     showSearch: true,
                                                 }}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Sight name"
                                            name="translatable.name"
                                            placeholder="Enter name"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Sight Description"
                                            name="translatable.description"
                                            placeholder="Enter description"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Latitude"
                                            name="latitude"
                                            value={values.latitude || ""}
                                            onPaste={val => changeCoordinates(val, form.mutators.setValue)}
                                            placeholder="Enter latitude"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Longitude"
                                            name="longitude"
                                            value={values.longitude || ""}
                                            onPaste={val => changeCoordinates(val, form.mutators.setValue)}
                                            placeholder="Enter longitude"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectPlaceType name="place_type"
                                                 required={true}
                                                 label="Place type"
                                                 select={{
                                                     mode: "multiple",
                                                     showSearch: true,
                                                 }}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Formatted address"
                                            name="formatted_address"
                                            placeholder="Enter formatted address"/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Website"
                                            name="website"
                                            placeholder="Enter website"/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Phone_number"
                                            name="international_phone_number"
                                            placeholder="Enter phone number"/>
                            </div>
                        </div>
                        <TimePicker value={values.opening_hours} name={"opening_hours"} setValue={form.mutators.setValue}/>
                        <UploadFiles name="images" fileName="images"  keyFiles="files_ids"/>
                    </div>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
