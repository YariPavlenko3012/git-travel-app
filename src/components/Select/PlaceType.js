/**
 * external libs
 */
import React, {useEffect, useState, useContext} from "react";
/**
 * components
 */
import FieldSelect from "../Form/FieldSelect";
/**
 * enums
 */
import PlaceTypeEnum from "../../enums/PlaceType";
/**
 * utils
 */
import PlaceTypeTranslate from "../../utils/PlaceTypeTranslate";
/**
 * context
 */
import {DictionaryContext} from "../../pages/context/dictionary.context";


export default function FieldSelectPlaceType({label = true, name, select, onChange, searchParams = {}, disabled = false, data = null, ...rest}) {
    const {dictionary} = useContext(DictionaryContext)
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const getPlaceTypeOptions = async () => {
        setPlaceTypeOptions(
            dictionary.place_types.list
                .map( ({value}) => ({value: value, label: PlaceTypeTranslate.getTranslateForType(value)}))
                .sort((a, b) => a.label.localeCompare(b.label))
        )
    };

    useEffect(() => {
        getPlaceTypeOptions();
    }, []);

    return (
        <FieldSelect {...rest}
                     label={label ? "Place Type" : ""}
                     name={name}
                     select={select}
                     onChange={onChange}
                     options={placeTypeOptions}
                     placeholder="Select place type"
                     disabled={disabled}/>
    )
}
