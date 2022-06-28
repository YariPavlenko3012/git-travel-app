import React, {useContext} from "react";
import {Form} from "react-final-form";
import arrayMutators from 'final-form-arrays'
import {AlertContext} from "../../pages/context/alert.context";

export default function FormUI({render, onSubmit = () => {} , onError = () => {}, ...props}) {
    const {setAlertError} = useContext(AlertContext)

    const onSubmitForm = async (values) => {
        try {
            await onSubmit(values);
        } catch (e) {
            setAlertError(e.message);
        
            if(!e.errors){
                return console.error(e.message)
            }
            onError();
        
        
            return Object.keys(e.errors).reduce((newError, keys) => {
                const splitKey = keys.split('.');
                const error = typeof e.errors[keys] === 'string' ? e.errors[keys] : e.errors[keys][0];
            
                let helpString = 'newError';
                splitKey.forEach( key => {
                    helpString += `['${key}']`;
                    if(!eval(`${helpString}`)){
                        eval(`${helpString} = {}`);
                    }
                });
            
                eval(`${helpString} = "${error}"`);
            
                return newError
            }, {});
        }
    }

    return (
        <Form onSubmit={onSubmitForm}
              mutators={{
                  ...arrayMutators,
                  clear: ([field], state, {changeValue}) => {
                      changeValue(state, field, () => undefined);
                  },
                  setValue: ([field, value], state, {changeValue}) => {
                      changeValue(state, field, () => value)
                  }
              }}
              render={render}
              {...props}
        />
    )
}
