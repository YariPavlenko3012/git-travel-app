/**
 * external libs
 */
import React from 'react';
/**
 * components
 */
import StateTable from "../../../components/Tables/States";

export default function StateList( ) {
    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              State
          </h3>
          <StateTable/>
      </div>
    )
}
