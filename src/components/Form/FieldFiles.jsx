import React from "react";
import FormUI from "react-bootstrap/Form";
import {Field, useForm, useFormState} from "react-final-form";
import {Form} from "antd";

export default function FieldFiles({label, name, multi = false, placeholder = "", type = "text", fileApi}) {
    const {mutators: {setValue}} = useForm();
    const {values} = useFormState();
    const onFileChange = async event => {
        const file = event.target.files[0];
        const formData = new FormData();

        formData.append("file", file, file.name);

        return await fileApi(formData)
    };

    const onChange = async (e) => {
        const img = await onFileChange(e);
        let images = img;

        if(multi) {
            images = values[name] ? values[name] : [];
            return setValue(name, [img, ...images])
        }

        setValue(name, images)
    };


    return (
        <Field
            name="file"
            placeholder={placeholder}
        >
            {props => (
                <Form.Item label={label || ""}
                           name={name}
                           validateStatus={(props.meta.error || props.meta.submitError) && props.meta.touched ? "error" : false}
                           help={(props.meta.error || props.meta.submitError) && props.meta.touched ? props.meta.error || props.meta.submitError : false}>
                    <FormUI.Control
                        onChange={onChange}
                        type={type}
                        value={props.input.value}
                        {...props} />
                </Form.Item>
            )}
        </Field>

    )
}
