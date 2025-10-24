'use client'

import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, PerspectiveCamera, Html } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { degToRad } from 'three/src/math/MathUtils'

gsap.registerPlugin(ScrollTrigger)

// ======== DOTS MODEL WITH PIN DIVS ==========
function DotsModel({ modelRef, initialPosition, initialRotation, initialScale }) {
  const { nodes } = useGLTF('/models/plain.glb')
  const meshRef = useRef()
  const pinsGroupRef = useRef()
  const geom = nodes?.['map_v3006']?.geometry
  const dotTexture = useTexture('/assets/texture/spark.png')

  useMemo(() => {
    if (dotTexture) {
      dotTexture.wrapS = THREE.RepeatWrapping
      dotTexture.wrapT = THREE.RepeatWrapping
      dotTexture.needsUpdate = true
    }
  }, [dotTexture])

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          dotTexture: { value: dotTexture },
          dotSize: { value: 0.1 },
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          varying vec3 vNormal;
          void main() {
            vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D dotTexture;
          uniform float dotSize;
          varying vec3 vWorldPosition;
          varying vec3 vNormal;
          void main() {
            vec2 uv = vWorldPosition.xy / dotSize;
            vec2 tileUV = fract(uv);
            vec4 texColor = texture2D(dotTexture, tileUV);
            gl_FragColor = vec4(texColor.rgb, texColor.a);
          }
        `,
        side: THREE.DoubleSide,
        transparent: true,
      }),
    [dotTexture]
  )

  useEffect(() => {
    if (meshRef.current && modelRef) modelRef.current = meshRef.current
  }, [modelRef])

  if (!geom) return null

  // Pin positions relative to model
  const pinPositions = useMemo(
    () => [
      new THREE.Vector3(0, 1.5, 20),
      new THREE.Vector3(0, 0.5, 25),
      new THREE.Vector3(10, -0.3, 25),
      new THREE.Vector3(15, 1.0, 15),
      new THREE.Vector3(5, -1.0, 5),
      new THREE.Vector3(12, 1.0, 2),
      new THREE.Vector3(5, -1.0, 20),
      new THREE.Vector3(12, 1.0, 20),
      new THREE.Vector3(-15, -1.0, 5),
      new THREE.Vector3(-10, -1.0, 20),
    ],
    []
  )

  const pinData = [
  { number: '42 MV', label: 'Medicine Hat' },
  { number: '67 MV', label: 'Drumheller' },
  { number: '1.1 MV', label: 'Kingston' },
  { number: '205 MV', label: 'Vega3' },
  { number: '280 MV', label: 'Alpha' },
  { number: '10 MV', label: 'Vancouver' },
  { number: '200 MV', label: 'North Bay' },
  { number: '150 MV', label: 'King Mountain' },
  { number: '111 MV', label: 'Missasauga' },
  { number: '55 MV', label: 'Iroquise Falls' },
];

  return (
    <group ref={meshRef} position={initialPosition} rotation={initialRotation} scale={initialScale}>
      {/* Model */}
      <mesh geometry={geom}>
        <primitive object={shaderMaterial} attach="material" />
      </mesh>

      {/* === Pins as HTML divs === */}
      <group ref={pinsGroupRef}>
      {pinPositions.map((pos, i) => {
  const { number, label } = pinData[i] || { number: '---', label: '' };
  return (
    <Html key={i} position={pos} center>
      <div className="flex items-center space-x-2">
        {/* Text on the left */}
        {/* <div className="flex flex-col items-start">
          <div className="text-black text-[1.1vw] font-medium text-nowrap">{number}</div>
          <div className="text-gray-700 text-[1vw] text-nowrap">{label}</div>
        </div> */}

        {/* Stem and tip of the pin */}
        <div className="flex flex-col items-center">
          <div className="w-[5px] h-[5vw] bg-black"></div>
          <div className="w-[2px] h-[3vw] bg-black"></div>
        </div>

        <div className="flex flex-col items-start">
          <div className="text-black text-[1.1vw] font-medium text-nowrap">{number}</div>
          <div className="text-gray-700 text-[1vw] text-nowrap">{label}</div>
        </div>
      </div>
    </Html>
  );
})}

      </group>
    </group>
  )
}

// ======== MOVING IMAGE ==========
function MovingImage({ modelRef }) {
  const texture = useTexture('/assets/Images/impact.png')
  const planeRef = useRef()
  const yOffset = 1

  useFrame(() => {
    if (!planeRef.current || !modelRef.current) return
    planeRef.current.position.z = modelRef.current.position.z * 0.5 + yOffset
    planeRef.current.position.y = modelRef.current.position.y * 0.5 + yOffset
  })

  return (
    <mesh ref={planeRef} position={[0, 1, -9]} scale={[2.2, 2.2, 2.2]}>
      <planeGeometry args={[10, 6]} />
      <meshBasicMaterial map={texture} transparent opacity={1.0} />
    </mesh>
  )
}

// ======== MAIN PAGE ==========
export default function Page() {
  const containerRef = useRef()
  const modelRef = useRef()
  const cameraRef = useRef()
  const [modelLoaded, setModelLoaded] = useState(false)

  const initialPosition = [0, -5, 2]
  const initialRotation = [degToRad(15), degToRad(0), degToRad(0)]
  const initialScale = [1, 1, 1]

  useEffect(() => {
    const interval = setInterval(() => {
      if (modelRef.current) {
        setModelLoaded(true)
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!modelLoaded || !modelRef.current || !containerRef.current || !cameraRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      tl.to(modelRef.current.position, { y: `+${5}`, z: `-${30}`, ease: 'none' })
        .to(modelRef.current.rotation, { y: `+=${degToRad(-10)}`, ease: 'none' }, '<')
        .to(modelRef.current.position, { y: `-${5}`, ease: 'none' })
        .to(cameraRef.current.rotation, { x: `+=${degToRad(-55)}`, ease: 'none' }, '<')
        .to(cameraRef.current.position, { y: `+${5}`, ease: 'none' }, '<')
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [modelLoaded])

  return (
    <div ref={containerRef} className="w-full h-[500vh] bg-white dark-section">
      <div className="sticky top-0 w-full h-screen">
        <Canvas
          onCreated={({ scene }) => {
            scene.fog = new THREE.Fog(0xffffff, 5, 25)
            scene.background = new THREE.Color(0xf0f0f0)
          }}
        >
          <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <MovingImage modelRef={modelRef} />
            <DotsModel
              modelRef={modelRef}
              initialPosition={initialPosition}
              initialRotation={initialRotation}
              initialScale={initialScale}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
