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
import SightService from "../../services/admin/sight.service";


export default function FieldSelectSight({label = true, name, select, onChange, searchParams = {}, disabled = false, data = null, ...rest}) {
    const [sightOptions, setSightOptions] = useState([]);

    const getSightOptions = async () => {
        const sightsList = (await SightService.list({limit: 1000000})).data;


        setSightOptions(data || Select.optionsByRow(sightsList, "id", "name"))
    };

    useEffect(() => {
        getSightOptions();
    }, []);

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
