import { useState } from "react";
import arrowDown from "../assets/arrow_down.png"

export default function GeneralInfoCard({cardName, fields, image, open, onClick, onSubmit}){
    const emptyFields= Object.fromEntries(fields.map((field=>[field.name,""])));
    const [inputValue,setInputValue]=useState(emptyFields);

    function handleInputChange(e){
        const updatedInput = {...inputValue,[e.target.id]:e.target.value};
        setInputValue(updatedInput);
    }

    function handleSubmit(e){
        e.preventDefault();
        onSubmit(inputValue);
    }

    return(
        <div className="card">
         <button type='button' onClick={onClick} className="card-toggle">
                                        <img className="card-image" src={image} alt="themed image" />
                                        <span>{cardName}</span>
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
                        
                        <form className="card-content" onSubmit={handleSubmit}>
                            {fields.map(field=>(
                                <div key={field.name}>
                                    <label className="field-label" htmlFor={field.name}>{field.name}</label>
                                    <br/>
                                    <input
                                    className="field-input"
                                    type={field.type}
                                    id={field.name}
                                    value={inputValue[field.name]}
                                    onChange={handleInputChange}
                                    placeholder={field.placeholder}
                                    required={field.name==="Country" || field.name==="City"}
                                    />
                                </div>
                                
                            ))}
                        <button type='submit' className="submit-button">Submit</button>
                        </form>
                    )}
                </div>
            );
};