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

export default function LanguageUpdateForm({sightId, sight, getSight}) {
    const updateSightTranslate = async (value) => {
        await SightService.updateTranslate(sightId, value.id, {sight_id: sightId, ...value});
        await getSight(sightId)
    };
    
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
          {languages_list.map((lang) => (
            <FormUI onSubmit={updateSightTranslate}
                    initialValues={sight.languages.reduce((accum, translate) => {
                        if(translate.language.id === lang.id) {
                            accum = {
                                ...accum,
                                id: translate.id,
                                sight_name: translate.sight_name,
                                sight_description: translate.sight_description,
                            }
                        }
                        return accum
                    }, {})}
                    key={lang.id}
                    render={({handleSubmit}) => (
                      <Form onFinish={handleSubmit} layout="vertical"
                            style={{width: `calc(100% / ${languages_list.length} - 10px)`}}>
                          <h4>{lang.name} - {lang.lang_code}</h4>
                          <FieldInput label="Sight name"
                                      name="sight_name"
                                      placeholder={`Enter sight name (${lang.lang_code})`}
                                      required={true}/>
                          <FieldTextarea label="Sight description"
                                         name="sight_description"
                                         placeholder={`Enter sight description (${lang.lang_code})`}
                                         required={true}/>
                          <Button variant="primary" htmlType="submit">Update</Button>
                      </Form>
                    )}
            />
          ))}
      </div>
    )
}
