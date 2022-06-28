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


export default function FieldSelectCurrency({label = true, name, select, onChange, searchParams = {}, disabled = false, data = null, ...rest}) {
    const [currencyOptions, setCurrencyOptions] = useState([]);

    const getCurrencyOptions = async () => {
        setCurrencyOptions(data || Select.optionsByRow(await DictionaryService.currencies(searchParams), "id", "currency_code"))
    };

    useEffect(() => {
        getCurrencyOptions();
    }, []);

    return (
        <FieldSelect {...rest}
                     label={label ? "Currency" : ""}
                     name={name}
                     select={select}
                     onChange={onChange}
                     options={currencyOptions}
                     placeholder="Select currency"
                     disabled={disabled}/>
    )
}
