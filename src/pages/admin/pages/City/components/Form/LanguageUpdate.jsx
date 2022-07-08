/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
/**
 * components
 */
import FormUI from "../../../../../../components/Form";
import FieldInput from "../../../../../../components/Form/FieldInput";
import FieldTextarea from "../../../../../../components/Form/FieldTextarea";
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

export default function UpdateCityLanguageForm({cityId, getCity, city}) {
    const updateCityTranslate = async (value) => {
        console.log('1')
        await CityService.updateTranslate(cityId, value.id, {city_id: cityId, ...value});
        await getCity(cityId)
    };

    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
          {languages_list.map((lang) => (
            <FormUI onSubmit={updateCityTranslate}
                    initialValues={city.languages.reduce((accum, translate) => {
                        if(translate.language.id === lang.id) {
                            accum = {
                                ...accum,
                                id: translate.id,
                                city_name: translate.city_name,
                                city_description: translate.city_description,
                            }
                        }
                        return accum
                    }, {})}
                    key={lang.id}
                    render={({handleSubmit}) => (
                      <Form onFinish={handleSubmit} layout="vertical"
                            style={{width: `calc(100% / ${languages_list.length} - 10px)`}}>
                          <h4>{lang.name} - {lang.lang_code}</h4>
                          <FieldInput label="City name"
                                      name="city_name"
                                      placeholder={`Enter city name (${lang.lang_code})`}
                                      required={true}/>
                          <FieldTextarea label="City description"
                                         name="city_description"
                                         placeholder={`Enter city description (${lang.lang_code})`}
                                         required={true}/>
                          <Button variant="primary" htmlType="submit">Update</Button>
                      </Form>
                    )}
            />
          ))}
      </div>
    )
}
