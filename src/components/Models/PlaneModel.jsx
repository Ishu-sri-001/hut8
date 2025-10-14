'use client'

import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { degToRad } from 'three/src/math/MathUtils'

gsap.registerPlugin(ScrollTrigger)

// ======== DOTS MODEL ==========
function DotsModel({ modelRef, initialPosition, initialRotation, initialScale }) {
  const { nodes } = useGLTF('/models/plain.glb')
  const meshRef = useRef()
  const geom = nodes?.['map_v3006']?.geometry

  // UVs
  useMemo(() => {
    if (geom && !geom.attributes.uv) {
      geom.computeBoundingBox()
      const bbox = geom.boundingBox
      const positions = geom.attributes.position
      const uvArr = new Float32Array(positions.count * 2)
      for (let i = 0; i < positions.count; i++) {
        uvArr[i * 2] = (positions.getX(i) - bbox.min.x) / (bbox.max.x - bbox.min.x)
        uvArr[i * 2 + 1] = (positions.getY(i) - bbox.min.y) / (bbox.max.y - bbox.min.y)
      }
      geom.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2))
    }
  }, [geom])

  // Dot texture
  const dotTexture = useTexture('/assets/texture/spark.png')
  useMemo(() => {
    if (dotTexture) {
      dotTexture.wrapS = THREE.RepeatWrapping
      dotTexture.wrapT = THREE.RepeatWrapping
      dotTexture.needsUpdate = true
    }
  }, [dotTexture])

  // Shader
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    uniform float dotRepeatX;
    uniform float dotRepeatY;
    uniform sampler2D dotTexture;

    void main() {
      vec2 tileUV = fract(vUv * vec2(dotRepeatX, dotRepeatY));
      vec4 texCol = texture2D(dotTexture, tileUV);
      gl_FragColor = vec4(texCol.rgb, texCol.a);
    }
  `

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          dotRepeatX: { value: 50 },
          dotRepeatY: { value: 50 },
          dotTexture: { value: dotTexture },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
      }),
    [dotTexture]
  )

  // Attach ref
  useEffect(() => {
    if (meshRef.current && modelRef) modelRef.current = meshRef.current
  }, [modelRef])

  if (!geom) return null

  return (
    <group ref={meshRef} position={initialPosition} rotation={initialRotation} scale={initialScale}>
      <mesh geometry={geom}>
        <primitive object={shaderMaterial} attach="material" />
      </mesh>
    </group>
  )
}

// ======== MOVING IMAGE PLANE ==========
function MovingImage({ modelRef }) {
  const texture = useTexture('/assets/Images/impact.png') 
  const planeRef = useRef()

  useFrame(() => {
    if (!planeRef.current || !modelRef.current) return
    // Slight parallax follow effect
    planeRef.current.position.z = modelRef.current.position.z * 0.5
    planeRef.current.position.y = modelRef.current.position.y * 0.5
  })

  return (
    <mesh ref={planeRef} position={[0, 0, -9]} scale={[2.2,2.2,2.2]}>
      <planeGeometry args={[10, 6]} />
      <meshBasicMaterial map={texture} transparent opacity={1.0} />
    </mesh>
  )
}


export default function Page() {
  const containerRef = useRef()
  const modelRef = useRef()
  const cameraRef = useRef()
  const [modelLoaded, setModelLoaded] = useState(false)

  const initialPosition = [0, -5, 2]
  const initialRotation = [degToRad(15), degToRad(0), degToRad(0)]
  const initialScale = [1, 1, 1]

  // Wait for model to mount
  useEffect(() => {
    const interval = setInterval(() => {
      if (modelRef.current) {
        setModelLoaded(true)
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // GSAP ScrollTrigger
  useEffect(() => {
    if (!modelLoaded || !modelRef.current || !containerRef.current || !cameraRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          markers: false,
        },
      })

      tl.to(modelRef.current.position, {
        y: `+${5}`,
        z: `-${30}`,
        ease: 'none',
      })
      tl.to(
        modelRef.current.rotation,
        {
          y: `+=${degToRad(-10)}`,
          ease: 'none',
        },
        '<'
      )
      tl.to(modelRef.current.position, {
        y: `-${5}`,
        // z: `-${10}`,
        ease: 'none',
      })
      .to(
        cameraRef.current.rotation,
        {
          x: `+=${degToRad(-45)}`,
          ease: 'none',
        },
        '<'
      )
      .to(cameraRef.current.position, { y: `+${5}`, ease: 'none' }, '<')
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [modelLoaded])

  return (
    <div ref={containerRef} className="w-full h-[500vh] bg-white">
      <div className="sticky top-0 w-full h-screen">
        <Canvas
          onCreated={({ scene }) => {
            scene.fog = new THREE.Fog(0xffffff, 5, 25) // fog added
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
