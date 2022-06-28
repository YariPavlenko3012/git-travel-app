/**
 * external libs
 */
import {Button, Form} from "antd";
import React, {useContext} from "react";
import {useHistory} from 'react-router-dom'
/**
 * external libs
 */
import FormUI from "../../../../../../components/Form";
import FieldSelectCity from "../../../../../../components/Select/City";
import FieldInput from "../../../../../../components/Form/FieldInput";
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
    const {user} = useContext(AuthContext);
    const history = useHistory();
    
    const createSight = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.images || []).map(({id}) => id);
        
        const {id} = await SightService.create({
            ...copyValues,
            user_id: user.id
        });
        
        return history.push(ADMIN_MAKE_EDIT_SIGHT_URI(id))
    };
    
    return (
      <FormUI onSubmit={createSight}
              initialValues={{
                  city_id: +cityId
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
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
                    </div>
                    <UploadFiles name="images" fileName="images"/>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
