import React from 'react';
import '../../styles/home.scss';
import Card from './Card';
import Pizza1 from '../../assets/Pizza1.jpg';
import Pizza2 from '../../assets/Pizza2.jpg';
import Pizza3 from '../../assets/Pizza3.jpeg';

const Home = () => {
 
  return (
    <div id='home'>
      <Card  itemNum={1} pizzaScr={Pizza1} price={250} title={"Paneer Pizza"} />
      <Card  itemNum={2} pizzaScr={Pizza2} price={300} title={"Cheese Pizza"} />
      <Card  itemNum={3} pizzaScr={Pizza3} price={150} title={"Capsicum Pizza"} />
    </div>
  )
}

export default Home;
