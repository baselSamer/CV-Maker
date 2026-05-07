import { useState } from "react"
import arrowDown from '../assets/arrow_down.png'


export default function Card({name, fields, open, onClick, image, onSubmit}){
   const emptyFields= Object.fromEntries(fields.map((field=>[field,""])));
   const [inputValue,setInputValue]=useState(emptyFields);

   function handleInputChange(e){
    const updatedInput = {...inputValue,[e.target.id]:e.target.value};
    setInputValue(updatedInput);
   }

   function handleSubmit(){
    onSubmit(inputValue);
   }

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
                            <input
                            className="field-input"
                            type="text"
                            id={field}
                            onChange={handleInputChange}
                            />
                        </div>
                        
                    ))}
                <button type='button' className="submit-button" onClick={handleSubmit}>Submit</button>
                    
                </div>

            )}


            
        </div>
    );
}