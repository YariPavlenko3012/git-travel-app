/**
 * external libs
 */
import React from 'react'
import {Button, Form} from 'antd/lib/index'
/**
 * components
 */
import FormUI from '../../../../../components/Form'
import FieldInput from "../../../../../components/Form/FieldInput";
import LanguageService from "../../../../../services/admin/language.service";
import {ADMIN_CURRENCY_LIST_URI, ADMIN_LANGUAGE_LIST_URI} from "../../../../../constants/admin/uri.constant";

export default function LanguageCreate({ history }) {
    
    const createLanguage = async (value) => {
        await LanguageService.create(value);
    
        alert("Languages successfully created")
    
        return history.push(ADMIN_LANGUAGE_LIST_URI)
    };
    
    return (
      <FormUI onSubmit={createLanguage}
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
            
            
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
