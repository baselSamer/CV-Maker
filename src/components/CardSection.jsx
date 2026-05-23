// import { useState } from "react"


// export default function CardSection({fields}){
//     const emptyFields = Object.fromEntries(fields.map((field=>[field.name,""])));

//     const [currentFields,setCurrentFields] = useState(fields);
//     const [inputValue,setInputValue]=useState(emptyFields);

//     function handleRemove(e){
//         const newFields = currentFields.filter((field)=>(
//             field.name!==e.target.id
//         ));

//         setCurrentFields(newFields);
//     }

//     function handleInputChange(e){
//         const updatedInput = {...inputValue,[e.target.id]:e.target.value};
//         setInputValue(updatedInput);
//         console.log(updatedInput);
//     }

//     return(
//         <div  className="card-content">
//         {currentFields.map((field)=>(
//             <div key={field.name}>
//                 {field.category==="title" &&
//                 <div
//                 className="title"
//                 >
//                 <label className="field-label" htmlFor={field.name}>{field.name}</label>
//                 <br/>

//                 <div className="field-row">
//                     <input 
//                     className="field-input"
//                     type={field.type} 
//                     id={field.name}
//                     onChange={handleInputChange}
//                     />
//                     <button id={field.name} className="remove" onClick={handleRemove}>-</button>
//                 </div>
//                 </div>
                
//                 }
                

//                 {field.category==="sub title" &&
//                 <div
//                 className="subtitle"
//                 >
//                 <label className="field-label" htmlFor={field.name}>{field.name}</label>
//                 <br/>

//                 <div className="field-row">
//                     <input
//                     className="field-input"
//                     type={field.type}
//                     id={field.name}
//                     onChange={handleInputChange}
//                     />
//                     <button id={field.name} className="remove" onClick={handleRemove}>-</button>
//                 </div>
//                 </div>

//                 }
                

//                 {field.category==="bullet point" &&
//                 <div
//                 className="bullet-point"
//                 >
//                 <label className="field-label" htmlFor={field.name}>{field.name}</label>
//                 <br/>

//                 <div className="field-row">
//                     <input 
//                     type={field.type}
//                     id={field.name}
//                     className="field-input-bb"
//                     onChange={handleInputChange}
//                     />
//                     <button id={field.name} className="remove" onClick={handleRemove}>-</button>
//                 </div>
//                 </div>
//                 }
//             </div>
//         ))}
//         </div>
//     )
// }