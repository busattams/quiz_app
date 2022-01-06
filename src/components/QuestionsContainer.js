import React, { useState, useEffect } from 'react';
import getQuestions from './QuestionAPI';
import Questions from './Questions';
import Score from './Score';
import './Questions.css'

const QuestionsContainer = ({ player, difficulty, goBack }) => {
   
   const [ questions, setQuestions  ] = useState([]);
   const [ quizEnd, setQuizEnd ] = useState(false);
   const [ newGame, setNewGame ] = useState(false);
   const [ score, setScore ] = useState(0);
   const [ currentQuestion, setCurrentQuestion ] = useState(0);
   const [ userAnswers, setUserAnswers ] = useState([]);
   const [ correctAnswers, setCorrectAnswers ] = useState([]);


   useEffect(() => {
      // get questions from api and set to state
      getQuestions(difficulty).then(data => {
         data.length < 10 ? setNewGame(!newGame) : setQuestions(data);
         // console.log(data)
      });   
   }, [difficulty, newGame]);
   
   const playAgain = () => {
      setQuestions([]);
      setScore(0);
      setQuizEnd(false);
      setUserAnswers([]);
      setNewGame(!newGame);
      setCurrentQuestion(0);
   }
   
   
   const userAnswerHandler = (answer) => {
      /*
         # Get correct answer
         # There are some correct_answer with null val 
         # and some correct_answers with all false
         # This checks both to make sure it will get the right answer
      */
      let correctAnswer;
      if(questions[currentQuestion].correct_answer !== null) {
         correctAnswer = questions[currentQuestion].correct_answer;
         setCorrectAnswers([...correctAnswers, correctAnswer]);
      } else {
         let getCorrectAnswer = Object.entries(
            questions[currentQuestion].correct_answers
            ).filter(answer =>  answer[1] === 'true');
            correctAnswer = getCorrectAnswer[0][0].split('_correct')[0];
            setCorrectAnswers([...correctAnswers, correctAnswer]);
      }
      
      // store score
      if(correctAnswer === answer.target.value) {
         setScore(score + 1)
      } 
      
      // store user answers
      setUserAnswers([...userAnswers, answer.target.value]);

      // uncheck the input for next question
      answer.target.checked = false;

      // set next question
      const nextQuestion = currentQuestion + 1;
      nextQuestion < questions.length ? setCurrentQuestion(nextQuestion) : setQuizEnd(true);
   }


   return (
      <section className='quiz-container'>
         <header>
            <button className='back-btn' onClick={goBack}> Go back</button>
            <h2 className='title'>Good luck, <span>{player}</span></h2>
            <p>You're playing the {difficulty} level.</p>
         </header>

         <main>
            { !quizEnd ? (
               questions && questions.length > 0 ? (
                  <Questions
                  questions={questions}  
                  currentQuestion={currentQuestion} 
                  userAnswerHandler={userAnswerHandler} 
               />
            ) : 
            <p>fetching the questions...</p>
            )
             : ( 
               <Score 
                  score={score} 
                  questions={questions}
                  userAnswers={userAnswers}
                  correctAnswers={correctAnswers}
                  totalQuestions={questions.length} 
                  playAgain={playAgain}  
               />
             )}
         </main>
      </section>
   )
}

export default QuestionsContainer;