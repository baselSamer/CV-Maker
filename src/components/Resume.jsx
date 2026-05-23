import { useState } from "react"
import "../styles/Resume.css"

export default function Resume({cardValues, cardSections}){
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

return (
    <div className="CV-part" id="cv-export">
      
      <div className="General-Part">
        <h2 className="name">{gPrefix["Full Name"]}</h2>

        <p id="extra-info">
          {contactInfoParts.map((part, idx) => (
            <span key={idx}>
              {idx > 0 && " | "}
              {part}
            </span>
          ))}
        </p>
      </div>

      <div className="resume-body">

        {Object.entries(cardSections).map(([cardName, sections]) => (
          <div key={cardName} className="resume-section">

            {cardName !== "General Information" && (
              <>
                <div className="CV-title">
                  {cardName.toUpperCase()}
                  <hr />
                </div>

                {sections?.map((section) => (
                  <div key={section.id} className="resume-subsection">

                    {section.fields.map((field) => {
                      const value =
                        cardValues[cardName]?.[section.id]?.[field.name];

                      if (!value) return null;

                      return (
                        <div key={field.name}>

                          {field.category === "title" && (
                            <h3>{value}</h3>
                          )}

                          {field.category === "sub title" && (
                            <h4>{value}</h4>
                          )}

                          {field.category.includes("bullet point") && (
                            <div className={cardName !== "Summary" ? "single-bullet" : ""}>
                              {cardName === "Summary" ? (
                                <p>{value}</p>
                              ) : (
                                <div className="bullet-item">• &nbsp;{value}</div>
                              )}
                            </div>
                          )}

                        </div>
                      );
                    })}

                  </div>
                ))}
              </>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}