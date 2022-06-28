/**
 * external libs
 */
import {Field} from "react-final-form";
import React from "react";
import {Checkbox} from 'antd';
/**
 * components
 */
import FormItem from './components/FormItem'

export default function FieldCheckbox({label, name, onBlur}) {
    return (
        <Field
            name={name}
        >
            {props => (
                <FormItem name={name} style={{margin: 0}} {...props}>
                    <Checkbox onChange={props.input.onChange}
                              onBlur={e => {
                                  if(onBlur) {
                                      onBlur(e)
                                  }
                                  props.input.onBlur(e)
                              }}
                              checked={props.input.value}
                              name={name}
                              {...props}
                    >
                        {label}
                    </Checkbox>
                </FormItem>
            )}
        </Field>
    )
}
