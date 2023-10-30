import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import MobileHomeHero from "../../../../assets/home/bloom-woman-hosting-webinar-on-computer-via-online.gif";
import banner_older from "../../../../assets/home/banner_older.jpg";
import banner_old from "../../../../assets/home/banner_old.jpg";
import banner from "../../../../assets/home/banner.jpg";
import '../../../../assets/css/home.css'
const backgroundImages = [
  `url(${banner})`,
  `url(${banner_old})`,
  `url(${banner_older})`,
  // Add more image URLs here
];

const transitionDuration = 1000; // 1 second

const HeroSection = () => {
  const [txt, setTxt] = useState("");
  const period = 2000;
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    let timeout;

    const toRotate = ["Learning", "Earning"];

    const tick = () => {
      const currentWord = toRotate[currentLetterIndex];
      const currentWordLength = currentWord.length;

      if (isDeleting) {
        if (txt.length === 0) {
          setIsDeleting(false);
          setCurrentLetterIndex(
            (prevIndex) => (prevIndex + 1) % toRotate.length
          );
        } else {
          setTxt((prevTxt) => prevTxt.slice(0, -1));
        }
      } else {
        if (txt.length === currentWordLength) {
          setIsDeleting(true);
          timeout = setTimeout(tick, 1); // 2-second delay after completing a word
        } else {
          setTxt((prevTxt) => currentWord.slice(0, prevTxt.length + 1));
          timeout = setTimeout(tick, 1); // 2-second delay between letters
        }
      }
    };

    timeout = setTimeout(tick, 500); // Start the initial animation

    // Clean up the timer
    return () => clearTimeout(timeout);
  }, [currentLetterIndex, isDeleting, txt, period]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitionType, setTransitionType] = useState("fade");
  // const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionEffects = {
    fade: "opacity 0.5s ease-in-out",
    pop: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // setIsTransitioning(true);
      setTransitionType(transitionType === "fade" ? "pop" : "fade");

      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % backgroundImages.length
        );
        // setIsTransitioning(false);
      }, transitionDuration);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [transitionType]);

  return (
    <section
      className={`bg-black py-40 md:py-24 lg:py-40 border-b-gray-200 border-b-4 relative ${
        transitionType === "fade" ? "fade-transition" : "pop-transition"
      }`}
      style={{
        backgroundImage: backgroundImages[currentImageIndex],
        backgroundSize: "cover",
        backgroundPosition: "top",
        transition: transitionEffects[transitionType],
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 justify-center z-10 relative">
        {/* <div className="flex lg:hidden justify-center items-center">
          <img
            className="w-full md:w-3/5 h-auto"
            src={MobileHomeHero}
            alt="hero"
          />
        </div> */}
        <div className="heroContent ">
          <h1 className="text-center md:text-left">
            <span className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 uppercase text-black bg-gradient-to-r to-blue-500 from-blue-300 bg-clip-text text-transparent animate-gradient`}>
              <span>Rike-Learning </span>
              <span>E-Learning PLATFORM</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-xl mb-10 mt-8 text-white text-center md:text-left">
            You will need a good smart phone and good internet connection to
            work here. It is a very easy process and you can learn this process
            in your own mother tongue and earn from our community by doing
            courses, services and other works.
          </p>
          {user && token ? (
            ""
          ) : (
            <div className="heroButton block w-full lg:flex space-y-4 md:space-y-0 md:space-x-4 text-center md:text-left">
              <Link
                to="/login"
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full md:w-auto text-lg text-white font-bold py-3 px-8 rounded-lg inline-block"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full md:w-auto text-lg text-white font-bold py-3 px-8 rounded-lg inline-block"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <div className="hidden lg:flex flex justify-center items-center home_hero_image">
          {/* <img className="w-3/5 h-auto" src={MobileHomeHero} alt="hero" /> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
