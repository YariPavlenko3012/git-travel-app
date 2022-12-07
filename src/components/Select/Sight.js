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


export default function FieldSelectSight({label = true, name, select, onChange, searchParams = {}, disabled = false, data = null, ...rest}) {
    const [sightOptions, setSightOptions] = useState([]);

    const getSightOptions = async () => {
        setSightOptions(data || Select.optionsByRow(await DictionaryService.sights(searchParams), "id", "original_name"))
    };

    useEffect(() => {
        getSightOptions();
    }, [data]);

    return (
        <FieldSelect {...rest}
                     label={label ? "Sight" : ""}
                     name={name}
                     select={select}
                     onChange={onChange}
                     options={sightOptions}
                     placeholder="Select sight"
                     disabled={disabled}/>
    )
}
