import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar, Carousel, FeaturesCard, Footer, ImageCarousel } from '../components/index';
import { AuthContext } from '../contexts/AuthContext';
import { Data } from '../assets/data/data';
const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("user", user)
  if (!user?.userType) {
    localStorage.clear();
    navigate('/signin');
  }
  const cardData = user.userType === "0" ? Data.cardData.admin : Data.cardData.collector
  console.log(user);
  return (
    <main>
      <Navbar />
      <div className="relative flex justify-center items-center">
        <ImageCarousel />
      </div>
      {/* Feature section */}
      <div>
        <p className="text-gray-500 dark:text-gray-400"></p>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
            <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
          </div>
        </div>
        <h1 className="text-gray-500 dark:text-gray-500 flex items-center justify-center text-3xl">श्री राम लीला महोत्सव 2023 का आयोजन</h1>
      </div>
      <FeaturesCard cardData={cardData} />
      <Footer />
    </main>
  )
}

export default Home;
