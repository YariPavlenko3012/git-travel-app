/**
 * external libs
 */
import {Field} from "react-final-form";
import React from "react";
import {Select} from "antd";
/**
 * components
 */
import FormItem from './components/FormItem'


export default function FieldSelect({label, name, options, select, placeholder, defaultValue, disabled, onChange, ...rest}) {

    return (
      <Field name={name}>
          {props => (
            <FormItem label={label} name={name} {...props} {...rest}>
                <React.Fragment>
                    <Select
                      size="large"
                      {...select}
                      value={props.input.value || defaultValue || []}
                      placeholder={placeholder}
                      options={options}
                      disabled={disabled}
                      style={{minWidth: "100%", ...select.style}}
                      filterOption={(text, {label, value}) => {
                          const textLowerCase = text.trim().toLowerCase()
                          const labelLowerCase = label.toLowerCase()
                          const valueLowerCase = value.toString().toLowerCase()

                          return labelLowerCase.includes(textLowerCase) || valueLowerCase.includes(text)
                      }}
                      onChange={(val) => {
                          if(onChange) {
                              onChange(val)
                          }
                          props.input.onChange(val)
                      }}
                    />
                </React.Fragment>
            </FormItem>
          )}
      </Field>

    )
}
