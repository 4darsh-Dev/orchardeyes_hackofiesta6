import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import PropTypes from 'prop-types'

const Card = ({ children, margin, bgColor, otherStyles }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%'
        }
      }
    )
  }, [])

  return (
    <div
      ref={cardRef}
      className={`${bgColor ? bgColor : 'bg-white'} shadow-xl rounded-lg p-4 flex flex-col items-center ${margin ? margin : 'mb-4'} ${otherStyles ? otherStyles : ''}`}
    >
      <div>{children}</div>
    </div>
  )
}

export default Card
Card.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.string,
  bgColor: PropTypes.string,
  otherStyles: PropTypes.string
}
