/**
 * external libs
 */
import {Field} from "react-final-form";
import React from "react";
import PhoneInput from 'react-phone-input-2'
/**
 * components
 */
import FormItem from './components/FormItem'

export default function FieldPhone({label = "", name, placeholder = "", type = "text", disabled = false, onBlur,  ...rest}) {
    return (
        <Field name={name}>
            {props => (
                <FormItem label={label} name={name} {...props} {...rest}>
                    <React.Fragment>
                        <PhoneInput  value={props.input.value}
                                     inputProps={{
                                         name: name,
                                     }}
                                     country={'ua'}
                                     onChange={props.input.onChange}/>
                    </React.Fragment>
                </FormItem>
            )}
        </Field>
    )
}
