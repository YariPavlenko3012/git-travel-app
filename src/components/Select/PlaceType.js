/**
 * external libs
 */
import React, {useEffect, useState} from "react";
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


export default function FieldSelectPlaceType({label = true, name, select, onChange, searchParams = {}, disabled = false, data = null, ...rest}) {
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const getPlaceTypeOptions = async () => {
        setPlaceTypeOptions(
            PlaceTypeEnum.list
                .map( type => ({value: type, label: PlaceTypeTranslate.getTranslateForType(type)}))
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
