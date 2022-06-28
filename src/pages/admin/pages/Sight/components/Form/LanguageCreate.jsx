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
import SightService from "../../../../../../services/admin/sight.service";

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

export default function CreateLanguageForm({ sightId, getSight }) {
    const createSightTranslate = async (value) => {
        await SightService.createTranslate(sightId, {sight_id: sightId, ...value});
        await getSight(sightId)
    };
    
    return (
      <FormUI onSubmit={createSightTranslate}
              initialValues={{
                  languages: languages_list.map(lang => ({language_id: lang.id}))
              }}
              render={({handleSubmit}) => (
                <Form onFinish={handleSubmit} layout="vertical">
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
        
                    <Button variant="primary" htmlType="submit" disabled={!sightId}>Create</Button>
                </Form>
              )}
      />
    )
}
