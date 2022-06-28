import FormUI from "react-bootstrap/Form";
import {Field, useField} from "react-final-form";
import React from "react";

export default function FieldCheckboxGroup({ label, name, data, onBlur}) {
    const field = useField(name);

    return (
        <FormUI.Group className="mb-3">
            <FormUI.Label>{label}</FormUI.Label>
            {data.map( item => (
                <Field
                    name={name}
                    type="checkbox"
                    component={"input"}
                    key={item.key}
                    value={item.key}
                >
                    {props => (
                        <FormUI.Check
                            name={name}
                            type="checkbox"
                            onBlur={e => {
                                if(onBlur){
                                    onBlur(e)
                                }
                                props.input.onBlur(e)
                            }}
                            onChange={props.input.onChange}
                            value={item.key}
                            label={item.value}
                            checked={field.input.value.includes(item.key)}
                            id={item.key}
                        />
                    )}
                </Field>
            ))}
        </FormUI.Group>
    )
}
