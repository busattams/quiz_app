import axios from 'axios';

const getQuestions = (difficulty) => { 
   axios.defaults.headers.common = {
      "X-API-Key": process.env.REACT_APP_QUIZ_API_TOKEN,
   };

   return axios.get(
      `https://quizapi.io/api/v1/questions`, 
      { limit: 200, difficulty }
   )
   .then(res => {
      // Return ten questions with four answers each
      const getFourAnswersQuestions = res.data.filter(question => (
         question.answers.answer_d !== null && (question.answers.answer_e === null)
      )).slice(0, 10);

      return getFourAnswersQuestions;
  });
}

export default getQuestions;

