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

export default function FieldInput({label = "", name, placeholder = "", type = "text", disabled = false, onBlur, input, ...rest}) {
    const Components = type === 'password' ? Input.Password : Input;

    return (
        <Field name={name}>
            {props => (
                <FormItem label={label} name={name} {...props} {...rest}>
                    <React.Fragment>
                        <Components placeholder={placeholder}
                                    onChange={props.input.onChange}
                                    onBlur={(e) => {
                                        if(onBlur) {
                                            onBlur(e)
                                        }
                                        props.input.onBlur(e);
                                    }}
                                    disabled={disabled}
                                    name={name}
                                    type={type}
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
