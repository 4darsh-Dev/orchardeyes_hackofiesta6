import LandingPageVideo from '../assets/LandingPage.mp4'
import styled, { createGlobalStyle } from 'styled-components'
import PreferedOrchs from '../components/PreferredOrchs'
import FooterSection from '../components/FooterSection'
import Chatbot from '../components/chatbot/Chatbot'
import HomePage from './HomePage'
import { Bird, Leaf, ChevronDown } from "lucide-react"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-tertiary);
  }
`

const MainContainer = styled.main``

const WelcomeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 500px;
  padding: 0 10vw;
`

const WelcomeVideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    z-index: 1;
  }
`

const WelcomeVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55vw;
  z-index: 2;
`

const LandingPage = () => {
  return (
    <>
      <GlobalStyle />
      <MainContainer className='hidden sm:block relative'>
      <main className="relative min-h-screen">
        {/* Hero Section with Video */}
        <div className="relative h-[600px] flex items-center">
          {/* Video Container */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              src={LandingPageVideo}
            />
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-6 z-20">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                A <span className="text-green-500">DRONE</span> POWERED
                <br />
                SOLUTION FOR
                <span className="text-amber-500"> ORCHARDS</span>
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Revolutionizing orchard management with cutting-edge drone technology
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg 
                               flex items-center gap-2 transition-all transform hover:scale-105">
                <Bird className="w-5 h-5" />
                Explore Solutions
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
            <ChevronDown className="w-8 h-8" />
          </div>
        </div>

        {/* Features Grid */}
          <div className="bg-white py-20">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
            {
              icon: <Bird className="w-8 h-8" />,
              title: "Precision Monitoring",
              description: "Real-time drone surveillance for comprehensive orchard management"
            },
            {
              icon: <Leaf className="w-8 h-8" />,
              title: "Crop Health Analysis",
              description: "Advanced AI-powered detection of plant health and stress factors"
            },
            {
              icon: <Bird className="w-8 h-8" />,
              title: "Smart Irrigation",
              description: "Optimized water management through drone-captured data"
            }
                ].map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 
                   transition-all transform hover:-translate-y-1">
              <div className="text-green-500 mb-4">{feature.icon}</div>
              <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
                ))}
              </div>
            </div>
          </div>

          {/* Test User Details Card */}
        <div className="fixed right-5 top-[20vh] bg-white/10 text-black backdrop-blur-md p-4 rounded-lg 
                       border border-white/20">
          <h3 className="font-bold mb-2">Test User Details</h3>
          <div className="space-y-1 text-sm font-bold">
            <p>Email - test@gmail.com</p>
            <p>Password - test@123</p>
          </div>
        </div>

        {/* Original Components */}
        {/* <Chatbot />
        <PreferedOrchs />
        <FooterSection /> */}
      </main>
        <Chatbot />
        <PreferedOrchs />
        <FooterSection />
      </MainContainer>
      <HomePage />
    </>
  )
}

export default LandingPage


