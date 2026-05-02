import { useState } from "react"
import arrowDown from '../assets/arrow_down.png'


export default function Card({name, fields, open, onClick, image}){
  
    return(
        <div className="card">
                        <button type='button' onClick={onClick} className="card-toggle">
                                <img className="card-image" src={image} alt="themed image" />
                                <span>{name}</span>
                                <span>
                                    <img
                                        src={arrowDown}
                                        style={{transform:open?"rotate(180deg)":"rotate(0deg)"}}
                                        alt="Toggle arrow"
                                        className="card-arrow"
                                    />
                                </span>
                        </button>
            
            {open &&(
                
                <div className="card-content">
                    {fields.map(field=>(
                        <div key={field}>
                            <label className="field-label" htmlFor={field}>{field}</label>
                            <br/>
                            <input className="field-input" type="text" id={field}/>
                        </div>
                        
                    ))}
                <button className="submit-button">submit</button>
                    
                </div>

            )}


            
        </div>
    );
}