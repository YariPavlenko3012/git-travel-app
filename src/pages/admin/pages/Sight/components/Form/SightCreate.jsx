/**
 * external libs
 */
import {Button, Form} from "antd";
import React, {useContext} from "react";
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

const languages_list = [
    {
        id: 1,
        lang_code: "ru",
        name: "Русский"
    },
    {
        id: 2,
        lang_code: "en",
        name: "English"
    }
];

export default function SightCreateForm({ cityId }) {
    const {user} = useContext(AuthContext);
    const history = useHistory();

    const createSight = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.sight.images || []).map(({id}) => id);

        console.log(copyValues)

        const {id} = await SightService.create(copyValues);

        return history.push(ADMIN_MAKE_EDIT_SIGHT_URI(id))
    };

    return (
      <FormUI onSubmit={createSight}
              initialValues={{
                  sight: {
                      city_id: +cityId,
                      user_id: user.id
                  },
                  languages: languages_list.map( ({id}) => ({language_id: id}))
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
                                <FieldInput label="Latitude"
                                            name="sight.latitude"
                                            placeholder="Enter latitude"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Longitude"
                                            name="sight.longitude"
                                            placeholder="Enter longitude"
                                            required={true}/>
                            </div>
                        </div>
                        <UploadFiles name="sight.images" fileName="images"/>
                    </div>
                    <h5 style={{marginTop: 40}}>Translate</h5>
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            {languages_list.map((lang, index) => (
                                <div style={{width: `calc(100% / ${languages_list.length} - 10px)`}} key={lang.id}>
                                    <h4>{lang.name} - {lang.lang_code}</h4>
                                    <FieldInput label="Sight name"
                                                name={`languages[${index}].sight_name`}
                                                placeholder={`Enter sight name (${lang.lang_code})`}
                                                required={true}/>
                                    <FieldTextarea label="Sight description"
                                                   name={`languages[${index}].sight_description`}
                                                   placeholder={`Enter sight description (${lang.lang_code})`}
                                                   required={true}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
