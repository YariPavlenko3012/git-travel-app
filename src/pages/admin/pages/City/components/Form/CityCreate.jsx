/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
import {useHistory} from 'react-router-dom'
/**
 * components
 */
import FieldSelectCountry from "../../../../../../components/Select/Country";
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
import {ADMIN_MAKE_EDIT_CITY_URI} from "../../../../../../constants/admin/uri.constant";
import FieldTextarea from "../../../../../../components/Form/FieldTextarea";

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

export default function CreateCityForm({countryId}) {
    const history = useHistory();

    const createCity = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.city.images || []).map(({id}) => id);

        const {id} = await CityService.create(copyValues);

        return history.push(ADMIN_MAKE_EDIT_CITY_URI(id))
    };


    return (
      <FormUI onSubmit={createCity}
              initialValues={{
                  city: {country_id: countryId},
                  cabs: [],
                  languages: languages_list.map( ({id}) => ({language_id: id}))
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <h5>General</h5>
                    <div>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectCountry name="city.country_id"
                                                    required={true}
                                                    disabled={true}
                                                    select={{
                                                        showSearch: true,
                                                    }}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Population"
                                            name="city.population"
                                            type="number"
                                            placeholder="Enter currency code (3 char)"
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
                    <h5 style={{marginTop: 40}}>Translate</h5>
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            {languages_list.map((lang, index) => (
                                <div style={{width: `calc(100% / ${languages_list.length} - 10px)`}} key={lang.id}>
                                    <h4>{lang.name} - {lang.lang_code}</h4>
                                    <FieldInput label="City name"
                                                name={`languages[${index}].city_name`}
                                                placeholder={`Enter city name (${lang.lang_code})`}
                                                required={true}/>
                                    <FieldTextarea label="City description"
                                                   name={`languages[${index}].city_description`}
                                                   placeholder={`Enter city description (${lang.lang_code})`}
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
