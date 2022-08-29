/**
 * external libs
 */
import React, {useEffect, useState} from 'react'
import {Button, Form} from 'antd/lib/index'
import {useParams} from 'react-router-dom'
/**
 * components
 */
import FormUI from '../../../../../components/Form'
import FieldInput from "../../../../../components/Form/FieldInput";
import LanguageService from "../../../../../services/admin/language.service";
import {ADMIN_LANGUAGE_LIST_URI} from "../../../../../constants/admin/uri.constant";

export default function LanguageUpdate({ history }) {
    const [language, setLanguage] = useState(null)
    const [isReady, setIsReady] = useState(false);
    const {languageId} = useParams();

    const updateLanguage = async (value) => {
        await LanguageService.update(languageId, value);

        alert("Languages successfully updated")

        return history.push(ADMIN_LANGUAGE_LIST_URI)
    };

    const getCurrency = async () => {
        setIsReady(false);
        setLanguage(await LanguageService.show(languageId));
        setIsReady(true);
    };

    useEffect(() => {
        getCurrency()
    }, []);

    if(!isReady){
        return <div>Loader...</div>
    }

    return (
      <FormUI onSubmit={updateLanguage}
              initialValues={{
                  lang_code: language.lang_code,
                  name: language.name,
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Language code"
                                        name="lang_code"
                                        placeholder="Enter language code (2 char)"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Name"
                                        name="name"
                                        placeholder="Enter language name"
                                        required={true}/>
                        </div>
                    </div>


                    <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                </Form>
              )}
      />
    )
}
