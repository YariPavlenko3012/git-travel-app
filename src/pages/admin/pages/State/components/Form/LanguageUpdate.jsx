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
import StateService from "../../../../../../services/admin/state.service";

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


export default function UpdateLanguageCountry({ stateId, getState, state }) {
    const updateCountryTranslate = async (value) => {
        await StateService.updateTranslate(stateId, value.id, {state_id: stateId, ...value});
        await getState(stateId)
    };

    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
          {languages_list.map((lang) => (
            <FormUI onSubmit={updateCountryTranslate}
                    initialValues={state.languages.reduce((accum, translate) => {
                        if(translate.language.id === lang.id) {
                            accum = {
                                ...accum,
                                id: translate.id,
                                state_name: translate.state_name,
                            }
                        }
                        return accum
                    }, {})}
                    key={lang.id}
                    render={({handleSubmit}) => (
                      <Form onFinish={handleSubmit} layout="vertical"
                            style={{width: `calc(100% / ${languages_list.length} - 10px)`}}>
                          <h5>{lang.name} - {lang.lang_code}</h5>
                          <FieldInput label="State name"
                                      name="state_name"
                                      placeholder={`Enter state name (${lang.lang_code})`}
                                      required={true}/>
                          <Button variant="primary" htmlType="submit">Update</Button>
                      </Form>
                    )}
            />
          ))}
      </div>
    )
}
