/**
 * external libs
 */
import {Field, useField} from "react-final-form";
import React from "react";
import {Radio} from "antd";
/**
 * components
 */
import FormItem from './components/FormItem'

export default function FieldRadio({label, name, data, onChange}) {
    const field = useField(name);
    return (
        <FormItem label={label} name={name} {...field}>
            {data.map(radio => (
                <Field
                    value={radio.value}
                    name={name}
                    type="radio"
                >
                    {props => (
                        <Radio value={radio.value}
                               checked={props.input.checked}
                               onChange={(e) => {
                                   if(onChange){
                                       onChange(e)
                                   }

                                   props.input.onChange(e)
                               }}>
                            {radio.label}
                        </Radio>
                    )}
                </Field>
            ))}
        </FormItem>
    )
}
