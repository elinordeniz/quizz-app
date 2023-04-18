import {Outlet} from 'react-router-dom';
import { QuizProvider } from '../context/QuizContext';

const ProviderLayout = () => {
  return (
    <div>
    <QuizProvider>
    <Outlet />
    </QuizProvider>
    
</div>
  )
}

export default ProviderLayout






