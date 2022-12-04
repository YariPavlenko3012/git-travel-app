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

const identity = value => (value);

export default function FieldInput({label = "", name, placeholder = "", type = "text", disabled = false, onBlur, onChange, onPaste, input, ...rest}) {
    const Components = type === 'password' ? Input.Password : Input;

    return (
        <Field name={name} parse={identity}>
            {props => (
                <FormItem label={label} name={name} {...props} {...rest}>
                    <React.Fragment>
                        <Components placeholder={placeholder}
                                    onChange={(e) => {
                                        if(onChange){
                                            onChange(e.target.value)
                                        }


                                        props.input.onChange(e)
                                    }}
                                    onPaste={e => {
                                        if(onPaste){
                                            onPaste(e.clipboardData.getData('Text'))
                                        }
                                    }}
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
