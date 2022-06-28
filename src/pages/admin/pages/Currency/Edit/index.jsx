/**
 * external libs
 */
import React, {useEffect, useState} from 'react'
import {Button, Form} from 'antd/lib/index'
import {useParams} from 'react-router-dom';
/**
 * components
 */
import FormUI from '../../../../../components/Form'
import FieldInput from "../../../../../components/Form/FieldInput";
import CurrencyService from "../../../../../services/admin/currency.service";
import CountryService from "../../../../../services/admin/country.service";

export default function CurrencyCreate() {
    const [currency, setCurrency] = useState(null)
    const [isReady, setIsReady] = useState(false);
    const {currencyId} = useParams()
    
    const updateCurrency = async (value) => {
        await CurrencyService.update(currencyId, value);
    };
    
    const getCurrency = async () => {
        setIsReady(false);
        setCurrency(await CurrencyService.show(currencyId));
        setIsReady(true);
    };
    
    useEffect(() => {
        getCurrency()
    }, []);
    
    if(!isReady){
        return <div>Loader...</div>
    }
    
    return (
      <FormUI onSubmit={updateCurrency}
              initialValues={{
                  currency_code: currency.currency_code
              }}
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
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                </Form>
              )}
      />
    )
}
