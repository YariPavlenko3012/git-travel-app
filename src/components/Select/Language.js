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


export default function FieldSelectLanguage({label = true, name, select, onChange, searchParams = {}, disabled = false, data = null, ...rest}) {
    const [languageOptions, setLanguageOptions] = useState([]);

    const getLanguageOptions = async () => {
        setLanguageOptions(data || Select.optionsByRow(await DictionaryService.languages(searchParams), "id", "lang_code"))
    };

    useEffect(() => {
        getLanguageOptions();
    }, []);

    return (
        <FieldSelect {...rest}
                     label={label ? "Language" : ""}
                     name={name}
                     select={select}
                     onChange={onChange}
                     options={languageOptions}
                     placeholder="Select language"
                     disabled={disabled}/>
    )
}
