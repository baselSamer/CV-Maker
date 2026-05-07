import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './styles/App.css'
import Card from './components/Card'
import Resume from './components/Resume'
import generalInfoPic from './assets/general_info_pic.png'
import educationPic from './assets/education_pic.png'
import projectsPic from './assets/projects_pic.png'

function App() {
  const cards = [
    {
      name: "General Information",
      fields: ["Full name", "Email", "Phone number"],
      image: generalInfoPic
    },
    {
      name: "Education Experience",
      fields: ["Degree", "School", "City", "Country"],
      image: educationPic
    },
    {
      name: "Projects",
      fields: ["Category", "Project Name", "Project Description"],
      image: projectsPic
    }
  ];


  const emptyValues = Object.fromEntries(cards.map((card)=>[card.name,{}]));

  const [openCards, setOpenCards] = useState(Array(cards.length).fill(false));
  const [cardValues,setCardValues]=useState(emptyValues);

  const handleToggle = idx => {
    setOpenCards(prev => prev.map((open, i) => i === idx ? !open : open));
  };

  function handleSubmit(cardName,values){
    setCardValues(prev=>({
      ...prev,
      [cardName]:values
    }));
  }


  return (
    <div className='content-wrapper'>
    <form>
      {cards.map((card, idx) => (
        <Card
          key={card.name}
          name={card.name}
          fields={card.fields}
          image={card.image}
          open={openCards[idx]}
          onClick={() => handleToggle(idx)}
          onSubmit={(values)=>handleSubmit(card.name,values)}
        />
      ))}
    </form>
    
    <Resume/>
    </div>
  );
}

export default App