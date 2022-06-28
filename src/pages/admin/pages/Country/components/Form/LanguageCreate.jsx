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

export default function CreateCountryLanguageForm({ countryId, getCountry }) {
    const createCountryTranslate = async (value) => {
        await CountryService.createTranslate(countryId, {country_id: countryId, ...value});
        await getCountry(countryId)
    };
    
    return (
      <FormUI onSubmit={createCountryTranslate}
              initialValues={{
                  languages: languages_list.map(lang => ({language_id: lang.id}))
              }}
              render={({handleSubmit}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        {languages_list.map((lang, index) => (
                          <div style={{width: `calc(100% / ${languages_list.length} - 10px)`}} key={lang.id}>
                              <h4>{lang.name} - {lang.lang_code}</h4>
                              <FieldInput label="Country name"
                                          name={`languages[${index}].country_name`}
                                          placeholder={`Enter city name (${lang.lang_code})`}
                                          required={true}/>
                              <FieldTextarea label="Country description"
                                             name={`languages[${index}].country_description`}
                                             placeholder={`Enter city description (${lang.lang_code})`}
                                             required={true}/>
                          </div>
                        ))}
                    </div>
        
                    <Button variant="primary" htmlType="submit" disabled={!countryId}>Create</Button>
                </Form>
              )}
      />
    )
}
