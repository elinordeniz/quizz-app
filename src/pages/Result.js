import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import useQuiz from "../context/QuizContext";


const Result = () => {
  const {
    name,
    score
    } = useQuiz();

const navigate=useNavigate();
  
useEffect(()=>{
    if(!name){
      navigate("/")
    }
  },[name])
  return (
    <div className='Result'>
      <span className="title">Final Score: <span className='score'>{score}</span></span>
      <Button 
        className='gohome'
        variant='contained'
        color="secondary"
        size='large'
        style={{alignSelf:"center", marginTop:20}}
        href='/'
      > Go to HomePage</Button>
    </div>
  )
}

export default Result