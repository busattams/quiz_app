import React, { useState } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import QuestionsContainer from './components/QuestionsContainer';


const App = () => {

  const [ player, setPlayer ] = useState('');
  const [ difficulty, setDifficulty ] = useState('');
  const [ currentQuestion, setCurrentQuestion ] = useState(-1);

  const startQuiz = () => {
    console.log(player)
    console.log(difficulty);
  }

  const quizSetUp = ({player, difficulty}) => {
    setPlayer(player);
    setDifficulty(difficulty);
    setCurrentQuestion(0);
  }

  const goBack = () => {
    setCurrentQuestion(-1)
  }

  return (
     <>
     {currentQuestion < 0 ? 
       <Welcome quizSetUp={quizSetUp} /> 
      : (
       <QuestionsContainer player={player} difficulty={difficulty} goBack={goBack} />
     )}
      
     </>
  )
}

export default App;
