/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
/**
 * components
 */
import FormUI from "../../../../../../components/Form";
import FieldSelectCurrency from "../../../../../../components/Select/Currency";
import FieldSelectLanguage from "../../../../../../components/Select/Language";
import FieldSelectCity from "../../../../../../components/Select/City";
import FieldInput from "../../../../../../components/Form/FieldInput";
import FieldCheckbox from "../../../../../../components/Form/FieldCheckbox";
import UploadFiles from "../../../../../../components/UploadFiles";
/**
 * services
 */
import CountryService from "../../../../../../services/admin/country.service";

export default function UpdateCountryForm({countryId, getCountry, country}) {
    const updateCountry = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.images || []).map(({id}) => id);

        await CountryService.update(countryId, copyValues)
        await getCountry(countryId)
    };

    return (
      <FormUI onSubmit={updateCountry}
              initialValues={{
                  currency: +country.currency?.id,
                  official_language: +country.official_language?.id,
                  capital: +country.capital?.id,
                  population: country.population,
                  country_code_in_iso_3166_1_format: country.country_code_in_iso_3166_1_format,
                  ambulance_number: country.ambulance_number,
                  safety_index: country.safety_index,
                  happiness_rating: country.happiness_rating,
                  country_area: country.country_area,
                  highest_point: country.highest_point,
                  has_seas: Boolean(country.has_seas),
                  has_mountains: Boolean(country.has_mountains),
                  images: country.images
              }}
              render={({handleSubmit,  submitting, submitErrors}) => (
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
                            <FieldSelectCity name="capital"
                                             label={"Capital"}
                                             required={true}
                                             searchParams={{
                                                 country_id: countryId
                                             }}
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
                                        type="number"
                                        name="happiness_rating"
                                        placeholder="Enter happiness rating"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Area"
                                        type="number"
                                        name="country_area"
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
                    <UploadFiles name="images" fileName="images" keyFiles="files_ids"/>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                </Form>
              )}
      />
    )
}
