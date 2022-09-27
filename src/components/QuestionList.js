import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:4000/questions');
      const responseData = await response.json();
      setQuestions(responseData);
      setIsLoading(false);
    };

    fetchData()
  }, [])

  const deleteQuestion = async (id) => {
    const response = await fetch(`http://localhost:4000/questions/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
    const responseData = await response.json();
    console.log(responseData);
    setQuestions(prevQuestions => prevQuestions.filter((question) => question.id !== id));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {isLoading && <p>Loading...</p>}
        {!isLoading && questions.map((question) => <QuestionItem deleteQuestion={deleteQuestion} key={question.id} question={question}></QuestionItem>)}
      </ul>
    </section>
  );
}

export default QuestionList;
