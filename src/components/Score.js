import React, { useState } from 'react';
import './Score.css';

const Score = ({ score, totalQuestions, playAgain, correctAnswers, userAnswers, questions }) => {

   const [ modal, setModal ] = useState(false);

   // show-hide modal   
   const toggleResultsModal = () => {
      setModal(!modal);
      document.body.classList.toggle('modal-open')
   }

   return (
      <section className='score-result-container'>
         <div className='score-result'>
            <p className='title'>Result</p>
            <p className='score-qnty'><span>{score}</span>/{ totalQuestions }</p>
            <p style={{fontSize: '20px'}}>You got {score * 100 / totalQuestions} of the answers correct.</p>
         </div>
         <div>
            <button className='btn-outline' 
               onClick={toggleResultsModal}
               style={{margin: '30px 0'}}
               >
               Results 
            </button>
            <button onClick={playAgain}> New game </button>
         </div>
      
         <div className={`results-container ${modal ? 'open' : ''}`}>
            <button className='btn-close' onClick={toggleResultsModal}>x</button>
            <p className='title'>Results</p>

            { questions.map((question, i) => {
               // class for questions scored
               let scored = userAnswers[i] === correctAnswers[i] ? 'score' : '';
               return (
                  <div key={question.id} className={`questionBox ${scored}`}>
                     <h2 className='question'>{i+1}. {question.question}</h2>
                     
                     { Object.entries(question.answers)
                        // filter the questions with < 6 anwers
                        .filter(answer => answer[1] != null)
                        .map((answer, index) => {
                           
                           // class for the selected option (right if scored)
                           let selected = userAnswers[i] === answer[0] 
                              ? 'selected' : '' || correctAnswers[i] === answer[0] 
                              ? 'right' : '';

                           return (
                              <label key={`${question.id}-${index}`} className={selected}>
                                 {answer[1]}
                              </label>
                           )
                        
                        })
                     }
                  </div>
               )
            })}
         </div>

      </section>

)
}

export default Score;