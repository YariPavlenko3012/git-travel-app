/**
 * external libs
 */
import {Button, Form} from "antd";
import React, {useContext} from "react";
/**
 * components
 */
import FieldSelectCity from "../../../../../../components/Select/City";
import FieldInput from "../../../../../../components/Form/FieldInput";
import UploadFiles from "../../../../../../components/UploadFiles";
import FormUI from "../../../../../../components/Form";
import FieldSelectPlaceType from "../../../../../../components/Select/PlaceType";
/**
 * services
 */
import SightService from "../../../../../../services/admin/sight.service";
/**
 * context
 */
import {AuthContext} from "../../../../../context/auth.context";

export default function UpdateSightForm({sight, sightId, getSight}) {
    const {user} = useContext(AuthContext);


    const updateSight = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.images || []).map(({id}) => id);

        await SightService.update(sightId, copyValues)
        await getSight(sightId)
    };

    return (
      <FormUI onSubmit={updateSight}
              initialValues={{
                  city_id: sight.city?.id,
                  latitude: sight.latitude,
                  longitude: sight.longitude,
                  images: sight.images,
                  original_name: sight.original_name || sight.name,
                  place_type: sight.place_type,
                  user_id: user.id
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <h5>General</h5>
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectCity name="city_id"
                                             required={true}
                                             disabled={true}
                                             select={{
                                                 showSearch: true,
                                             }}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Original name"
                                        name="original_name"
                                        placeholder="Enter original name"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Latitude"
                                        name="latitude"
                                        placeholder="Enter latitude"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Longitude"
                                        name="longitude"
                                        placeholder="Enter longitude"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectPlaceType name="place_type"
                                                  required={true}
                                                  label="Place type"
                                                  select={{
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
                    <UploadFiles name="images" fileName="images" keyFiles="files_ids"/>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                </Form>
              )}
      />
    )
}
