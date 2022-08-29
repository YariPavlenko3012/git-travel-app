/**
 * external libs
 */
import {Button, Form} from "antd";
import React, {useContext, useState} from "react";
import {useHistory} from 'react-router-dom'
/**
 * components
 */
import FormUI from "../../../../../../components/Form";
import FieldSelectCity from "../../../../../../components/Select/City";
import FieldInput from "../../../../../../components/Form/FieldInput";
import FieldTextarea from "../../../../../../components/Form/FieldTextarea";
import UploadFiles from "../../../../../../components/UploadFiles";
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

export default function SightCreateForm({ cityId }) {
    const [coordinates, setCoordinates] = useState([]);
    const {user} = useContext(AuthContext);
    const history = useHistory();

    const createSight = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.sight.images || []).map(({id}) => id);

        console.log(copyValues)

        const {id} = await SightService.create(copyValues);

        return history.push(ADMIN_MAKE_EDIT_SIGHT_URI(id))
    };

    const changeCoordinates = ( value ) => {
        const coordinates = value.split(',');

        if(coordinates.length === 2){
            setCoordinates([coordinates[0], coordinates[1]])
        }
    }

    return (
      <FormUI onSubmit={createSight}
              initialValues={{
                  sight: {
                      latitude: coordinates[0],
                      longitude: coordinates[1],
                      city_id: +cityId,
                      user_id: user.id
                  },
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <h5>General</h5>
                    <div>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectCity name="sight.city_id"
                                                 required={true}
                                                 label="City"
                                                 disabled={true}
                                                 select={{
                                                     showSearch: true,
                                                 }}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Sight name"
                                            name="sight.sight_name"
                                            placeholder="Enter sight name"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Sight Description"
                                            name="sight.sight_description"
                                            placeholder="Enter sight description"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Latitude"
                                            name="sight.latitude"
                                            onPaste={changeCoordinates}
                                            placeholder="Enter latitude"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Longitude"
                                            name="sight.longitude"
                                            onPaste={changeCoordinates}
                                            placeholder="Enter longitude"
                                            required={true}/>
                            </div>
                        </div>
                        <UploadFiles name="sight.images" fileName="images"  keyFiles="files_ids"/>
                    </div>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
