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


export default function FieldSelectState({label = true, name, select, onChange, searchParams = {}, disabled = false, data = null, ...rest}) {
    const [stateOptions, setStateOptions] = useState([]);

    const getStateOptions = async () => {
        setStateOptions(data || Select.optionsByRow(await DictionaryService.states(searchParams), "id", "name"))
    };

    useEffect(() => {
        getStateOptions();
    }, []);

    return (
        <FieldSelect {...rest}
                     label={label ? "State" : ""}
                     name={name}
                     select={select}
                     onChange={onChange}
                     options={stateOptions}
                     placeholder="Select state"
                     disabled={disabled}/>
    )
}
