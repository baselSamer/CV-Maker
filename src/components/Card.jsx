import { useState } from "react";
import arrowDown from '../assets/arrow_down.png';

export default function Card({ cardName, fields, sections, image, open, onClick, onSubmit, onSectionsChange }) {
    const [fieldValues, setFieldValues] = useState(
        Object.fromEntries(
            sections ? 
            sections.flatMap(section => 
                section.fields.map(field => [field.name, ""])
            ) :
            (fields ? fields.map(field => [field.name, ""]) : [])
        )
    );

    const customSectionCount = sections ? sections.filter(section => section.fields.some(f => f.custom)).length + 1:1;
    // console.log(sections);
    function handleInputChange(e) {
        setFieldValues({
            ...fieldValues,
            [e.target.id]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(fieldValues);
        // console.log(fieldValues);
    }

    function handleRemove(sectionId, fieldName) {
        const updatedSections = sections.map(section =>
            section.id === sectionId
                ? { ...section, fields: section.fields.filter(f => f.name !== fieldName) }
                : section
        ).filter(section => section.fields.length>0);

        onSectionsChange(updatedSections);

        const newValues = { ...fieldValues };
        delete newValues[fieldName];
        setFieldValues(newValues);
    }

    function handleRemoveSection(sectionId){
        const updatedSections = sections.filter((section) =>
            section.id !== sectionId
        )

        onSectionsChange(updatedSections);
    }

    function handleAdd() {
        const newId = `section-${cardName}-${Date.now()}`;
        const newSection = {
            id: newId,
            custom: true,
            fields: [
                { name: `Title ${customSectionCount}`, category: "title", type: "text", custom: true },
                { name: `sub title ${customSectionCount}`, category: "sub title", type: "text", custom: true },
                { name: `Bullet Point ${customSectionCount}`, category: "bullet point", type: "text", custom: true }
            ]
        };

        const updatedSections = [...sections, newSection];
        onSectionsChange(updatedSections);
    }

    return (
        <div className="card">
            <button type="button" onClick={onClick} className="card-toggle">
                <img className="card-image" src={image} alt="themed image" />
                <span>{cardName}</span>
                <span>
                    <img
                        src={arrowDown}
                        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                        alt="Toggle arrow"
                        className="card-arrow" 
                    />
                </span> 
            </button>

            {open && (
                <form className="card-content" onSubmit={handleSubmit}>
                    <button type="button" className="section-button" onClick={handleAdd}>
                        Add Section
                    </button>

                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className={section.fields.some(f => f.custom) ? "custom-border" : ""}
                        >
                            {section.custom && <button type="button" onClick={()=>handleRemoveSection(section.id)} className="remove-section">Remove section</button>}
                            <br  />
                            {section.fields.map((field) => (
                                <div key={field.name}>
                                    {field.category === "title" && (
                                        <div className="title">
                                            <label className="field-label" htmlFor={field.name}>{field.name}</label>
                                            <br />
                                            <div className="field-row">
                                                <input
                                                    className="field-input"
                                                    type={field.type}
                                                    id={field.name}
                                                    value={fieldValues[field.name] || ""}
                                                    onChange={handleInputChange}
                                                />
                                                <button
                                                    type="button"
                                                    className="remove"
                                                    onClick={() => handleRemove(section.id, field.name)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {field.category === "sub title" && (
                                        <div className="subtitle">
                                            <label className="field-label" htmlFor={field.name}>{field.name}</label>
                                            <br />
                                            <div className="field-row">
                                                <input
                                                    className="field-input"
                                                    type={field.type}
                                                    id={field.name}
                                                    value={fieldValues[field.name] || ""}
                                                    onChange={handleInputChange}
                                                />
                                                <button
                                                    type="button"
                                                    className="remove"
                                                    onClick={() => handleRemove(section.id, field.name)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {field.category === "bullet point" && (
                                        <div className="bullet-point">
                                            <label className="field-label" htmlFor={field.name}>{field.name}</label>
                                            <br />
                                            <div className="field-row">
                                                <textarea
                                                    className="field-input-bb"
                                                    type={field.type}
                                                    id={field.name}
                                                    value={fieldValues[field.name] || ""}
                                                    onChange={handleInputChange}
                                                />
                                                <button
                                                    type="button"
                                                    className="remove"
                                                    onClick={() => handleRemove(section.id, field.name)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    <button type="submit" className="submit-button">Submit</button>
                </form>
            )}
        </div>
    );
}