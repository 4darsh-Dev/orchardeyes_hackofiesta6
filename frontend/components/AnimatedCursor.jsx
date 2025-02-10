import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const moveCursor = keyframes`
  from {
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    transform: translate(-50%, -50%) scale(0.5);
  }
`

const Cursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
  animation: ${moveCursor} 0.5s infinite alternate;
`

const AnimatedCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor')

    const moveCursor = (e) => {
      cursor.style.top = `${e.clientY}px`
      cursor.style.left = `${e.clientX}px`
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return <Cursor className='cursor' />
}

export default AnimatedCursor
