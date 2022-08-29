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
import CountryService from "../../../../../../services/admin/country.service";

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


export default function UpdateLanguageCountry({ countryId, getCountry, country }) {
    const updateCountryTranslate = async (value) => {
        await CountryService.updateTranslate(countryId, value.id, {country_id: countryId, ...value});
        await getCountry(countryId)
    };

    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
          {languages_list.map((lang) => (
            <FormUI onSubmit={updateCountryTranslate}
                    initialValues={country.languages.reduce((accum, translate) => {
                        if(translate.language.id === lang.id) {
                            accum = {
                                ...accum,
                                id: translate.id,
                                country_name: translate.country_name,
                                country_description: translate.country_description,
                            }
                        }
                        return accum
                    }, {})}
                    key={lang.id}
                    render={({handleSubmit}) => (
                      <Form onFinish={handleSubmit} layout="vertical"
                            style={{width: `calc(100% / ${languages_list.length} - 10px)`}}>
                          <h4>{lang.name} - {lang.lang_code}</h4>
                          <FieldInput label="Country name"
                                      name="country_name"
                                      placeholder={`Enter country name (${lang.lang_code})`}
                                      required={true}/>
                          <FieldTextarea label="Country description"
                                         name="country_description"
                                         placeholder={`Enter country description (${lang.lang_code})`}
                                         required={true}/>
                          <Button variant="primary" htmlType="submit">Update</Button>
                      </Form>
                    )}
            />
          ))}
      </div>
    )
}
