import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Card from './components/Card'
import GeneralInfoCard from './components/GeneralInfoCard'
import Resume from './components/Resume'
import generalInfoPic from './assets/general_info_pic.png'
import educationPic from './assets/education_pic.png'
import projectsPic from './assets/projects_pic.png'
import summaryPic from './assets/summary_pic.png'

function App() {
  const cards = [
      {
      name: "General Information",
      component: "GeneralInfoCard",
      fields: [
        { name: "Full Name", type: "text", placeholder: "Your name", custom: false },
        { name: "Country", type: "text", placeholder: "", custom: false },
        { name: "City", type: "text", placeholder: "", custom: false },
        { name: "Phone Number", type: "tel", placeholder: "+20 1234567890", custom: false },
        { name: "Email", type: "email", placeholder: "Example@gmail.com", custom: false },
        { name: "Github (link)", type: "url", placeholder: "https://github.com/example", custom: false },
        { name: "Linkedin (link)", type: "url", placeholder: "https://www.linkedin.com/in/example", custom: false }
      ],
      image: generalInfoPic
    },

    {
      name: "Summary",
      component: "Card",
      sections: [
        {
          id: "summary-default",
          fields: [
            {name: "Detailed Summary", category: "bullet point", type:"text", custom: false}
          ]
        }
      ],
      image: summaryPic
    },

    {
      name: "Education",
      component: "Card",
      sections: [
        {
          id: 'education-default',
          fields: [
            { name: "University/School Name", category: "title", type: "text", custom: false },
            { name: "Bachelor/Certificate", category: "sub title", type: "text", custom: false },
            { name: "Relevant Coursework/Grades", category: "bullet point", type: "text", custom: false }
          ]
        }
      ],
      image: educationPic
    },
    {
      name: "Projects",
      component: "Card",
      sections: [
        {
          id: 'projects-default',
          fields: [
            { name: "Project Name", category: "title", type: "text", custom: false },
            { name: "Project subtitle", category: "sub title", type: "text", custom: false },
            { name: "Project bullet point", category: "bullet point", type: "text", custom: false }
          ]
        }
      ],
      image:projectsPic
    }
  ];

  const emptyValues = Object.fromEntries(
    cards.map((card) => {
      if (card.component === "Card" && card.sections) {
        const sectionsObj = {};
        card.sections.forEach(section => {
          sectionsObj[section.id] = Object.fromEntries(
            section.fields.map(field => [field.name, ""])
          );
        });
        return [card.name, sectionsObj];
      } else {
        const emptyFields = Object.fromEntries(
          card.fields.map((field) => [field.name, ""])
        );
        return [card.name, emptyFields];
      }
    })
  );

  const [openCards, setOpenCards] = useState(Array(cards.length).fill(false));
  const [cardValues, setCardValues] = useState(emptyValues);
  const [cardSections, setCardSections] = useState(
    Object.fromEntries(
      cards.map(card => [card.name, card.sections || null])
    )
  );
  console.log(cardSections);

  const handleToggle = idx => {
    setOpenCards(prev => prev.map((open, i) => i === idx ? !open : open));
  };

  function handleSubmit(cardName, values) {
    setCardValues(prev => ({
      ...prev,
      [cardName]: values
    }));
  }

  function handleSectionsChange(cardName, newSections) {
    setCardSections(prev => ({
      ...prev,
      [cardName]: newSections
    }));

    const sectionsObj = {};
    newSections.forEach(section => {
      sectionsObj[section.id] = Object.fromEntries(
        section.fields.map(field => [field.name, ""])
      );
    });

    setCardValues(prev => ({
      ...prev,
      [cardName]: sectionsObj
    }));
  }
  console.log(cardValues);

  return (
    <div className='content-wrapper'>
      <div>
        {cards.map((card, idx) => {
          const CardComponent = card.component === "GeneralInfoCard" ? GeneralInfoCard : Card;

          return (
            <CardComponent
              key={card.name}
              cardName={card.name}
              fields={card.fields}
              sections={cardSections[card.name]}
              image={card.image}
              open={openCards[idx]}
              onClick={() => handleToggle(idx)}
              onSubmit={(values) => handleSubmit(card.name, values)}
              onSectionsChange={(newSections) => handleSectionsChange(card.name, newSections)}
            />
          );
        })}
      </div>

      <Resume cardValues={cardValues} cardSections={cardSections} />
    </div>
  );
}

export default App