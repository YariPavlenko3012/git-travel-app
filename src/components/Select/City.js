/**
 * external libs
 */
import React, {useEffect, useState} from "react";
/**
 * components
 */
import FieldSelect from "../Form/FieldSelect";
/**
 * services
 */
import DictionaryService from "../../services/dictionary.service";
/**
 * utils
 */
import Select from "../../utils/Select";

export default function FieldSelectCity({label = true, name, select, onChange, searchParams = {}, disabled = false, data = null, ...rest}) {
    const [cityOptions, setCityOptions] = useState([]);

    const getCityOptions = async () => {
        setCityOptions(data || Select.optionsByRow(await DictionaryService.cities(searchParams), "id", "name"))
    };

    useEffect(() => {
        getCityOptions();
    }, []);

    return (
        <FieldSelect {...rest}
                     label={label || "City"}
                     name={name}
                     select={select}
                     onChange={onChange}
                     options={cityOptions}
                     placeholder="Select city"
                     disabled={disabled}/>
    )
}
