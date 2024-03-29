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
import UploadOrientalFile from "../../../../../../components/UploadOrientalFile";
/**
 * services
 */
import CountryService from "../../../../../../services/admin/country.service";
/**
 * enums
 */
import FileOrientationEnums from "../../../../../../enums/FileOrientation";
/**
 * utils
 */
import GoogleClient from "../../../../../../utils/GoogleClient";

export default function UpdateCountryForm({countryId, getCountry, country}) {
    const updateCountry = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));

        const equalCoordinate = country.latitude === copyValues.latitude && country.longitude === copyValues.longitude;
        if (!equalCoordinate && copyValues.latitude && copyValues.longitude) {
            copyValues.geometry = await GoogleClient.getGeometryForCountry(copyValues.latitude, copyValues.longitude)
            if (!copyValues.geometry) {
                alert("Change coordinate. We have some error in google api")
                return;
            }
        }

        copyValues.landscape_image = copyValues.landscape_image?.id || null;
        copyValues.portrait_image = copyValues.portrait_image?.id || null;

        await CountryService.update(countryId, copyValues)
        await getCountry(countryId)
    };

    const changeCoordinates = (value, setValues) => {
        const coordinates = value.split(',');

        if (coordinates.length === 2) {
            setTimeout(() => {
                setValues("latitude", coordinates[0])
                setValues("longitude", coordinates[1])
            }, 0)
        }
    }

    return (
      <FormUI onSubmit={updateCountry}
              initialValues={{
                  currency_id: +country.currency?.id,
                  official_language: +country.official_language?.id,
                  capital_id: +country.capital?.id,
                  population: country.population,
                  country_code_in_iso_3166_1_format: country.country_code_in_iso_3166_1_format,
                  ambulance_number: country.ambulance_number,
                  safety_index: country.safety_index,
                  happiness_rating: country.happiness_rating,
                  country_area: country.country_area,
                  original_name: country.original_name,
                  highest_point: country.highest_point,
                  latitude: country.latitude,
                  longitude: country.longitude,
                  landscape_image: country.landscape_image,
                  portrait_image: country.portrait_image,
                  has_seas: Boolean(country.has_seas),
                  has_mountains: Boolean(country.has_mountains),
                  images: country.images
              }}
              render={({handleSubmit,  submitting,form}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <h5>General</h5>
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectCurrency name="currency_id"
                                                 required={true}
                                                 select={{
                                                     showSearch: true,
                                                 }}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Original name"
                                        name="original_name"
                                        placeholder="Enter original name"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectLanguage name="official_language"
                                                 required={true}
                                                 select={{
                                                     showSearch: true,
                                                 }}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectCity name="capital_id"
                                             label={"Capital"}
                                             required={true}
                                             searchParams={{
                                                 country_id: countryId,
                                                 per_page: 10000
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
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Latitude"
                                        name={`latitude`}
                                        onPaste={val => changeCoordinates(val, form.mutators.setValue)}
                                        placeholder={`Enter latitude`}
                                        required={true}/>

                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Longitude"
                                        name={`longitude`}
                                        onPaste={val => changeCoordinates(val, form.mutators.setValue)}
                                        placeholder={`Enter longitude`}
                                        required={true}/>

                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10, display: "flex"}}>
                            <FieldCheckbox label='Has seas' name="has_seas"/>
                            <FieldCheckbox label='Has mountains' name="has_mountains"/>
                        </div>
                    </div>
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{marginRight: 10}}>
                            <UploadOrientalFile oriental={FileOrientationEnums.landscape} name="landscape_image"/>
                        </div>
                        <div style={{marginRight: 10}}>
                            <UploadOrientalFile oriental={FileOrientationEnums.portrait} name="portrait_image"/>
                        </div>
                    </div>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                </Form>
              )}
      />
    )
}
