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
import CurrencyService from "../../../../../services/admin/currency.service";

export default function CurrencyCreate() {
    
    const createCurrency = async (value) => {
        await CurrencyService.create(value);
    };
    
    return (
      <FormUI onSubmit={createCurrency}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Currency code"
                                        name="currency_code"
                                        placeholder="Enter currency code (3 char)"
                                        required={true}/>
                        </div>
                    </div>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
