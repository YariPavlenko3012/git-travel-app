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
import UploadOrientalFile from "../../../../../../components/UploadOrientalFile";
import FormUI from "../../../../../../components/Form";
import FieldTextarea from "../../../../../../components/Form/FieldTextarea";
/**
 * services
 */
import CountryService from "../../../../../../services/admin/country.service";
/**
 * constants
 */
import {ADMIN_MAKE_EDIT_COUNTRY_URI, ADMIN_MAKE_SHOW_COUNTRY_URI} from "../../../../../../constants/admin/uri.constant";
import FileOrientationEnums from "../../../../../../enums/FileOrientation";

export default function CreateCountryForm() {
    const history = useHistory();

    const createCountry = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));

        copyValues.country.landscape_image = copyValues.country.landscape_image?.id || null;
        copyValues.country.portrait_image = copyValues.country.portrait_image?.id || null;
        copyValues.country.original_name = copyValues.country.country_name;

        const {id} = await CountryService.create(copyValues);

        return history.push(ADMIN_MAKE_SHOW_COUNTRY_URI(id))
    };

    return (
      <FormUI onSubmit={createCountry}
              initialValues={{
                  country: {
                      has_seas: false,
                      has_mountains: false,
                  },
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <h5>General</h5>
                    <div>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectCurrency name="country.currency"
                                                     required={true}
                                                     select={{
                                                         showSearch: true,
                                                     }}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectLanguage name="country.official_language"
                                                     required={true}
                                                     select={{
                                                         showSearch: true,
                                                     }}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Population"
                                            name="country.population"
                                            type="number"
                                            placeholder="Enter population"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Name"
                                            name="country.country_name"
                                            placeholder="Enter name"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Description"
                                            name="country.country_description"
                                            placeholder="Enter description"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Country code"
                                            name="country.country_code_in_iso_3166_1_format"
                                            placeholder="Enter country code (2 char)"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Emergency number"
                                            name="country.ambulance_number"
                                            type="number"
                                            placeholder="Enter emergency number (911)"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Safety index"
                                            name="country.safety_index"
                                            type="number"
                                            placeholder="Enter safety index"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Happiness rating"
                                            name="country.happiness_rating"
                                            type="number"
                                            placeholder="Enter happiness rating"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Area"
                                            name="country.country_area"
                                            type="number"
                                            placeholder="Enter area"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldInput label="Highest point"
                                            name="country.highest_point"
                                            type="number"
                                            placeholder="Enter highest point"
                                            required={true}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10, display: "flex"}}>
                                <FieldCheckbox label='Has seas' name="country.has_seas"/>
                                <FieldCheckbox label='Has mountains' name="country.has_mountains"/>
                            </div>
                        </div>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{marginRight: 10}}>
                                <UploadOrientalFile oriental={FileOrientationEnums.landscape} name="country.landscape_image"/>
                            </div>
                            <div style={{marginRight: 10}}>
                                <UploadOrientalFile oriental={FileOrientationEnums.portrait} name="country.portrait_image"/>
                            </div>
                        </div>
                    </div>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
