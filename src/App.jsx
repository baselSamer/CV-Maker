
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './styles/App.css'
import Card from './components/Card'
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

  const [openCards, setOpenCards] = useState(Array(cards.length).fill(false));

  const handleToggle = idx => {
    setOpenCards(prev => prev.map((open, i) => i === idx ? !open : open));
  };

  return (
    <form>
      {cards.map((card, idx) => (
        <Card
          key={card.name}
          name={card.name}
          fields={card.fields}
          image={card.image}
          open={openCards[idx]}
          onClick={() => handleToggle(idx)}
        />
      ))}
    </form>
  );
}

export default App
