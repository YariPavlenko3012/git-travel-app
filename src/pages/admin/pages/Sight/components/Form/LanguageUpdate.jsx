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

export default function LanguageUpdateForm({sightId, sight, getSight}) {
    const updateSightTranslate = async (values) => {
        await SightService.updateTranslate(sightId, values);
        await getSight(sightId)
    };

    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
          {languages_list.map((lang) => (
            <FormUI onSubmit={updateSightTranslate}
                    initialValues={sight.translations.reduce((accum, translate) => {
                        if(translate.language.id === lang.id) {
                            accum = {
                                ...accum,
                                language_id: translate.language.id,
                                fields: {
                                    name: translate.fields.name,
                                    description: translate.fields.description,
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
                          <FieldInput label="Sight name"
                                      name="fields.name"
                                      placeholder={`Enter sight name (${lang.lang_code})`}
                                      required={true}/>
                          <FieldTextarea label="Sight description"
                                         name="fields.description"
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
