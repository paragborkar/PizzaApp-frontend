import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.scss';
import {RiFindReplaceLine} from 'react-icons/ri';
import Founder from '../assets/Founder.jpeg';

const About = () => {
  return (
   <section className='about' >
    <main>
      <h1>About Us</h1>
      <article>
        <h4>Pizza App</h4>
        <p>The pizza delivery application is providing access to the customers over different categories of pizza. They can choose their favorite one from an online application and have enjoyment. It is an essential feature that should be provided at the online delivery application for ordering your favorite pizza from home. Proper labeling of the categories is essential so that customers find it easy to choose the right pizza for placing an order.</p>
        <p>Explore the various type of Pizza.Click below to see the menu.</p>
        <Link to='/' ><RiFindReplaceLine/></Link>
      </article>
      <div>
        <h2>Founder</h2>
        <article>
          <div>
            <img src={Founder} alt="Founder" />
          </div>
          <p>I am Parag Borkar founder of PizzaApp.</p>
        </article>
      </div>
    </main>
   </section>
  )
}

export default About;
