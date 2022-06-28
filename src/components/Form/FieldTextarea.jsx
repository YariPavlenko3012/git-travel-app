/**
 * external libs
 */
import {Field} from "react-final-form";
import React from "react";
import {Input} from 'antd'
/**
 * components
 */
import FormItem from './components/FormItem'

export default function FieldInput({label = "", name, placeholder = "", disabled = false, onBlur, input, ...rest}) {
    return (
        <Field name={name}>
            {props => (
                <FormItem label={label} name={name} {...props} {...rest}>
                    <React.Fragment>
                        <Input.TextArea placeholder={placeholder}
                                        onChange={props.input.onChange}
                                        onBlur={(e) => {
                                            if(onBlur) {
                                                onBlur(e)
                                            }
                                            props.input.onBlur(e);
                                        }}
                                        disabled={disabled}
                                        name={name}
                                        value={props.input.value}
                                        size="large"
                                        {...input}
                                        {...props} />
                    </React.Fragment>
                </FormItem>
            )}
        </Field>
    )
}
