import { useState } from "react"

export default function Resume({name}){
    return(
        <div className="CV-part">
            <div>{name}</div>
        </div>
    )
}