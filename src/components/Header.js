import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='Header'>
        <Link to="/" className='title' > Quizz App </Link>
    </div> 
  )
}

export default Header