import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const onButtonClick = (path) => {
    navigate(path)
  }

  return (
    <div className="h-screen flex-col flex justify-center items-center mt-[-60px]">
      <img src={"/silvanus_icon.jpg"}/>
      <div>
        <div className='font-bold text-4xl mb-4 mt-[-60px]'>Welcome!</div>
      </div>
      <div className='pb-4'>This is Open Forest Map home page.</div>
      <div>
        <input
          className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer mr-4'}
          type="button"
          onClick={() => onButtonClick('/signin')}
          value={'Sign in'}
        />
        
        <input
          className={'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer'}
          type="button"
          onClick={() => onButtonClick('/signup')}
          value={'Sign up'}
        />
      </div>
    </div>
  )
}

export default Home