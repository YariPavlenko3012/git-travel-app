/**
 * external libs
 */
import {Field} from "react-final-form";
import React, {useEffect, useState} from "react";
import {DateRange} from 'react-date-range';
/**
 * components
 */
import FormItem from './components/FormItem'

export default function FieldDate({label, name, dateRange}) {
    const [state, setState] = useState(dateRange.defaultValue);

    useEffect(() => {
        setState(dateRange.defaultValue)
    }, [dateRange.defaultValue]);

    return (
        <Field name={name}>
            {props => (
                <FormItem label={label} name={name}{...props}>
                    <DateRange
                        {...dateRange}
                        onChange={item => {
                            setState({...state, ...item});
                            props.input.onChange({...state, ...item})
                        }}
                        ranges={Object.keys(props.input.value).map(key => props.input.value[key])}
                    />
                </FormItem>
            )}
        </Field>

    )
}
