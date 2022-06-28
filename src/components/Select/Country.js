/**
 * external libs
 */
import React, {useEffect, useState} from "react";
/**
 * components
 */
import FieldSelect from "../Form/FieldSelect";
/**
 * utils
 */
import Select from "../../utils/Select";
/**
 * services
 */
import DictionaryService from "../../services/dictionary.service";


export default function FieldSelectCountry({label = true, name, select, onChange, searchParams = {}, disabled = false, data = null, ...rest}) {
    const [countryOptions, setCountryOptions] = useState([]);

    const getCountryOptions = async () => {
        setCountryOptions(data || Select.optionsByRow(await DictionaryService.countries(searchParams), "id", "name"))
    };

    useEffect(() => {
        getCountryOptions();
    }, []);

    return (
        <FieldSelect {...rest}
                     label={label ? "Country" : ""}
                     name={name}
                     select={select}
                     onChange={onChange}
                     options={countryOptions}
                     placeholder="Select country"
                     disabled={disabled}/>
    )
}
