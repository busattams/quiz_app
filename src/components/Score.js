import React, { useState } from 'react';

const Score = ({ score, totalQuestions, playAgain, correctAnswers, userAnswers, questions }) => {
   console.log(correctAnswers)
   console.log(userAnswers)


   return (

      <>
      <p>Score {score}/{ totalQuestions }</p>
      
      <div className=''>
         Questions

         {questions.map((question, i) => (

            <div 
            className={`questionBox ${ userAnswers[i] === correctAnswers[i] ? 'score' : '' }`} key={question.id}
            
            
            >
               <h1>{i} - {question.question}</h1>
                {

                  Object.entries(question.answers)
                  .filter(answer => answer[1] != null)
                  .map((answer, index) => (
                     <label key={`${question.id}-${index}`}
                        className={
                           userAnswers[i] === answer[0] ? 
                           'selected' : '' 
                           || correctAnswers[i] === answer[0] 
                           ? 'right' : ''
                        }
                     >
                        {answer[1]}
                     </label>

               ))}
            </div>
         ))}
      </div>
      <button onClick={playAgain}> New game </button>
   </>

)
}

export default Score;