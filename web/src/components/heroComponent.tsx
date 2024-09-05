
import { useNavigate } from 'react-router-dom';
import img from '../img/FKJX3_AV1.jpg'
const buttonStyles = "py-2 px-4 rounded bg-white text-black font-bold mb-2 sm:mb-0 sm:mr-2";
const hoverStyles = "hover:text-white hover:bg-black hover:border-white";

export default function HeroComponent() {
  const navigate = useNavigate()
  return (
    <div className="relative h-screen w-full flex overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-gray-300">
        {/* The gradient effect */}
      </div>

      {/* Black Background and Text Container */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center h-full p-4 sm:flex-col sm:ml-5">
        <div className="w-full sm:w-4/6 lg:w-3/6   px-6 sm:py-20 sm:px-8 text-black">
          <h1 className="text-4xl mb-4 font-bold lg:text-5xl md:text-4xl sm:text-2xl">
            Elevate Your Style With Our Curated Collection
          </h1>
          <p className="my-4 text-lg font-semibold lg:text-xl md:text-lg sm:text-base">
            Discover the perfect blend of fashion and quality in our e-commerce store.
            Explore our wide range of products and elevate your style.
          </p>
          <div className="flex flex-col sm:flex-row">
            <button className={`${buttonStyles}`}>
              Contact Us
            </button>
            <button className={`${buttonStyles}  ${hoverStyles}`} onClick={() => navigate('/test')}>
              Shop Now
            </button>
          </div>
        </div>

        <div className="bg-white h-80 w-80 flex justify-center items-center rounded-xl relative">
          <img src={img} alt="Hero Image" className="h-80 w-80 rounded-xl" />
          <span className="absolute top-2 right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </div>

      </div>
    </div>
  );
}
