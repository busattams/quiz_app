import React, { useState } from 'react';

const Questions = ({ questions, currentQuestion, userAnswerHandler }) => (
   <>
      <span>Question {currentQuestion + 1}/{questions.length}</span>
      <h1>{questions[currentQuestion].question}</h1>
      <form onChange={userAnswerHandler} className='questionBox'>
         { Object.entries(questions[currentQuestion].answers)
            .filter(answer => answer[1] != null)
            .map((answer, i) => (
               <div key={`answer${i}`}>
                  <label>
                     <input type="radio"
                        name={`question-${currentQuestion+1}`} 
                        value={answer[0]}
                     />
                     { answer[1] }
                  </label>
               </div>

            ))
         }
      </form>
   </>
)

export default Questions;