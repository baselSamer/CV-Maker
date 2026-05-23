
import { useState } from "react"
import "../styles/Resume.css"

export default function Resume({cardValues}){
    const gPrefix = cardValues["General Information"];

    const contactInfoParts = [
      gPrefix["City"] && `${gPrefix["City"]}, ${gPrefix["Country"]}`,
      gPrefix["Phone Number"],
      gPrefix["Email"] && (
        <a href={`mailto:${gPrefix["Email"]}`} target="_blank" rel="noopener noreferrer">
          {gPrefix["Email"]}
        </a>
      ),
      gPrefix["Linkedin (link)"] && (
        <a href={gPrefix["Linkedin (link)"]} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      ),
      gPrefix["Github (link)"] && (
        <a href={gPrefix["Github (link)"]} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      )
    ].filter(Boolean);

    return(
        <div className="CV-part">
            <div className="General-Part">
                <h2 className="name">{gPrefix["Full Name"]}</h2>
                <p id='extra-info'>
                  {contactInfoParts.map((part, idx) => (
                    <span key={idx}>
                      {idx > 0 && " | "}
                      {part}
                    </span>
                  ))}
                </p>
            </div>


        </div>
    )
}