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
        id: 10,
        lang_code: "uk",
        name: "Українська"
    },
    {
        id: 2,
        lang_code: "en",
        name: "English"
    }
];

export default function UpdateCityLanguageForm({cityId, getCity, city}) {
    const updateCityTranslate = async (values) => {
        await CityService.updateTranslate(cityId, values);
        await getCity(cityId)
    };

    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
          {languages_list.map((lang) => (
            <FormUI onSubmit={updateCityTranslate}
                    initialValues={city.translations.reduce((accum, translate) => {
                        if(translate.language.id === lang.id) {
                            accum = {
                                ...accum,
                                language_id: translate.language.id,
                                fields: {
                                    name: translate.fields.name,
                                }
                            }
                        }
                        return accum
                    }, {})}
                    key={lang.id}
                    render={({handleSubmit}) => (
                      <Form onFinish={handleSubmit} layout="vertical"
                            style={{width: `calc(100% / ${languages_list.length} - 10px)`}}>
                          <h5>{lang.name} - {lang.lang_code}</h5>
                          <FieldInput label="City name"
                                      name="fields.name"
                                      placeholder={`Enter city name (${lang.lang_code})`}
                                      required={true}/>
                          <Button variant="primary" htmlType="submit">Update</Button>
                      </Form>
                    )}
            />
          ))}
      </div>
    )
}
