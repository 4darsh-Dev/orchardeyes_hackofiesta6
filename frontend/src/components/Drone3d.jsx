import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import model from '../assets/3dmodels/model.glb'
import * as THREE from 'three'

function DroneModel() {
  // Use the GLTF loader to load your model
  const { scene, animations } = useGLTF(model)
  const mixerRef = useRef()
  const groupRef = useRef()
  // Create an animation mixer for the loaded animations
  useEffect(() => {
    if (animations.length > 0) {
      // Create AnimationMixer
      const mixer = new THREE.AnimationMixer(scene)
      mixerRef.current = mixer

      const droneAnimationName = 'droneAction' // Replace with your drone movement animation name
      const propellerAnimations = [
        'propeller_node_1Action',
        'propeller_node.001Action.002',
        'propeller_node_0Action',
        'propellerAction'
      ] // Replace with your propeller animation names

      // Play the drone movement animation
      const droneClip = animations.find(
        (clip) => clip.name === droneAnimationName
      )
      if (droneClip) {
        const droneAction = mixer.clipAction(droneClip)

        droneAction.setLoop(THREE.LoopOnce, 1)
        droneAction.clampWhenFinished = true
        droneAction.play()
      } else {
        console.error(`Drone animation "${droneAnimationName}" not found.`)
      }

      // Play all propeller animations
      propellerAnimations.forEach((name) => {
        const clip = animations.find((clip) => clip.name === name)
        if (clip) {
          const action = mixer.clipAction(clip)
          // action.setLoop(THREE.LoopOnce, 1)
          // action.clampWhenFinished = true
          action.play()
        } else {
          console.error(`Propeller animation "${name}" not found.`)
        }
      })
      // Update the mixer in the render loop
      const clock = new THREE.Clock()
      const animate = () => {
        requestAnimationFrame(animate)
        mixer.update(clock.getDelta())
      }
      animate()
      // Cleanup on unmount
      return () => mixer.stopAllAction()
    }
  }, [scene, animations])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const hoverHeight = Math.sin(time * 2) * 0.2 // Adjust the frequency and amplitude as needed
    if (groupRef.current) {
      groupRef.current.position.y = hoverHeight
    }
  })
  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={[0.03, 0.03, 0.03]}
      rotation={[-1, 0, Math.PI]}
    />
  )
}

export default function droneComponent() {
  return (
    <div className='h-[90vh] w-[100vw] relative'>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />

        <DroneModel />
      </Canvas>
    </div>
  )
}
