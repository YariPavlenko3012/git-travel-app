import {FieldArray} from "react-final-form-arrays";
import React from "react";
import {Button} from "antd";
import {useForm} from 'react-final-form'
import { MinusCircleOutlined} from '@ant-design/icons';


export default function FieldArrayUI({children, name}) {
    const {mutators: {push}} = useForm();

    return (
        <FieldArray name={name}>
            {({fields}) =>
                <>
                    {
                        fields.map((name, index) => (
                            <div key={name}>
                                <MinusCircleOutlined onClick={() => fields.remove(index)} />
                                {children({name})}
                            </div>
                        ))
                    }
                    <Button onClick={() => push('countries', undefined)}>
                        Add Customer
                    </Button>
                </>
            }
        </FieldArray>
    )
}
