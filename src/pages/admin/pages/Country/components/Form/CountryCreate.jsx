/**
 * external libs
 */
import {Button, Form} from "antd";
import {useHistory} from 'react-router-dom'
import React from "react";
/**
 * components
 */
import FieldSelectCurrency from "../../../../../../components/Select/Currency";
import FieldSelectLanguage from "../../../../../../components/Select/Language";
import FieldInput from "../../../../../../components/Form/FieldInput";
import FieldCheckbox from "../../../../../../components/Form/FieldCheckbox";
import UploadFiles from "../../../../../../components/UploadFiles";
import FormUI from "../../../../../../components/Form";
/**
 * services
 */
import CountryService from "../../../../../../services/admin/country.service";
/**
 * constants
 */
import {ADMIN_MAKE_EDIT_COUNTRY_URI} from "../../../../../../constants/admin/uri.constant";

export default function CreateCountryForm() {
    const history = useHistory();
    
    const createCountry = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        
        copyValues.files_ids = (copyValues.images || []).map(({id}) => id);
        
        const {id} = await CountryService.create(copyValues);
        
        return history.push(ADMIN_MAKE_EDIT_COUNTRY_URI(id))
    };
    
    return (
      <FormUI onSubmit={createCountry}
              initialValues={{
                  has_seas: false,
                  has_mountains: false,
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectCurrency name="currency"
                                                 required={true}
                                                 select={{
                                                     showSearch: true,
                                                 }}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectLanguage name="official_language"
                                                 required={true}
                                                 select={{
                                                     showSearch: true,
                                                 }}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Population"
                                        name="population"
                                        type="number"
                                        placeholder="Enter population"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Country code"
                                        name="country_code_in_iso_3166_1_format"
                                        placeholder="Enter country code (2 char)"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Emergency number"
                                        name="ambulance_number"
                                        type="number"
                                        placeholder="Enter emergency number (911)"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Safety index"
                                        name="safety_index"
                                        type="number"
                                        placeholder="Enter safety index"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Happiness rating"
                                        name="happiness_rating"
                                        type="number"
                                        placeholder="Enter happiness rating"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Area"
                                        name="country_area"
                                        type="number"
                                        placeholder="Enter area"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Highest point"
                                        name="highest_point"
                                        type="number"
                                        placeholder="Enter highest point"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10, display: "flex"}}>
                            <FieldCheckbox label='Has seas' name="has_seas"/>
                            <FieldCheckbox label='Has mountains' name="has_mountains"/>
                        </div>
                    </div>
                    <UploadFiles name="images" fileName="images"/>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
