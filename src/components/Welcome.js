import React, { useState } from 'react';
import './Welcome.css';

const Welcome = ({ quizSetUp }) => {

   const [ player, setPlayer ] = useState('');
   const [ difficulty, setDifficulty ] = useState('easy');

   const handleDifficulty = () => {
      difficulty === 'easy' ? setDifficulty('hard') : setDifficulty('easy');
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      quizSetUp({
         player,
         difficulty
      })
   }

   return (

   <section className='homepage'>
      <header className='homepage-header'>
         <h2 className='title'>Welcome!</h2>
         <h1 className='description'>Test your knowledge on topics like Programming, Linux, DevOps, Cloud and much more!</h1>
      </header>
      <main className='user-info'> 
         <h2>Let's get started!</h2>
         <form  onSubmit={handleSubmit}>
            <h3>Tell us your name</h3>

            <input type='text'  
               required
               className='name-input' 
               placeholder="I am..."
               value={player}
               onChange={(e) => setPlayer(e.target.value)}
            />

            <h3>How do you want to play?</h3>
            <div className='toggleSwitch'>
               <input type='checkbox' id='toggle' onChange={handleDifficulty} />
               <label htmlFor='toggle'></label>
               <span>Take it easy</span>
               <span>Bring it hard</span>
            </div>

            <button type='submit' >Start</button>
         
         </form>
      </main>

   </section>
   )

};


export default Welcome;

