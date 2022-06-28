/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
/**
 * components
 */
import FieldInput from "../../../../../../components/Form/FieldInput";
import FieldTextarea from "../../../../../../components/Form/FieldTextarea";
import FormUI from "../../../../../../components/Form";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";


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

export default function CreateCityLanguageForm({ cityId, getCity }) {
    const createCityTranslate = async (value) => {
        await CityService.createTranslate(cityId, {city_id: cityId, ...value})
        await getCity(cityId)
    };
    
    return (
      <FormUI onSubmit={createCityTranslate}
              initialValues={{
                  languages: languages_list.map(lang => ({language_id: lang.id}))
              }}
              render={({handleSubmit}) => (
                <Form onFinish={handleSubmit} layout="vertical">
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
        
                    <Button variant="primary" htmlType="submit" disabled={!cityId}>Create</Button>
                </Form>
              )}
      />
    )
}
