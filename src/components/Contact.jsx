import React from 'react';
import '../styles/contact.scss';

const Contact = () => {
  return (
    <section className='contact'>
        <form method='post' action='mailto:paragborkar200@gmail.com' encType='utf-8' >
            <h2>Contact Us</h2>
            <input type="text" name='Name' placeholder='Name' />
            <input type="email" name='Email' placeholder='Email'/>
            <textarea placeholder='Message...' name='Message' />
            <button type='submit'>Send</button>
        </form>
    </section>
  )
}

export default Contact;
