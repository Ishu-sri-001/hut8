'use client';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, useTexture } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { degToRad } from 'three/src/math/MathUtils';
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing';
import { Vector2 } from 'three';

gsap.registerPlugin(ScrollTrigger);

function Model({ modelRef, initialPosition, initialRotation, initialScale }) {
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);

    loader.load('/models/blocks.glb', (loadedGltf) => {
      setGltf(loadedGltf);
    });

    return () => {
      dracoLoader.dispose();
    };
  }, []);

  const texture = useTexture('/assets/texture/blocks-texture.jpg');

  useEffect(() => {
    if (gltf && gltf.scene && texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
      texture.needsUpdate = true;

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Check if this mesh or its ancestors are named "Comp"
          let isCompChild = false;
          let current = child;
          while (current) {
            if (current.name === 'Comp') {
              isCompChild = true;
              break;
            }
            current = current.parent;
          }

          if (isCompChild && child.geometry.attributes.uv) {
            child.material = new THREE.MeshStandardMaterial({
              map: texture,
              color: 'white',
              side: THREE.DoubleSide,
              metalness: 0.1,
              roughness: 0.8
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              color: '#cccccc',
              side: THREE.DoubleSide,
              metalness: 0.1,
              roughness: 0.8
            });
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Set initial transformations
      if (initialPosition) gltf.scene.position.set(...initialPosition);
      if (initialRotation) gltf.scene.rotation.set(...initialRotation);
      if (initialScale) gltf.scene.scale.set(...initialScale);

      if (modelRef) modelRef.current = gltf.scene;
    }
  }, [gltf, texture, modelRef, initialPosition, initialRotation, initialScale]);

  return gltf ? <primitive object={gltf.scene} /> : null;
}

function CameraController({ cameraRef }) {
  const { camera } = useThree();
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera, cameraRef]);
  return null;
}

function ParallaxGroup({ children, modelRef }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current = { x, y };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      -mouse.current.x * 0.04,
      0.1
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mouse.current.y * 0.04,
      0.1
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function ThreeScene() {
  const cameraRef = useRef();
  const modelRef = useRef();
  const containerRef = useRef();
  const [modelLoaded, setModelLoaded] = useState(false);

  const initialPosition = [-5.5, -0.2, 3.5];
  const initialRotation = [degToRad(30), degToRad(40), degToRad(0)];
  const initialScale = [1.2, 1.2, 1.2];

  useEffect(() => {
    const checkModel = setInterval(() => {
      if (modelRef.current) {
        setModelLoaded(true);
        clearInterval(checkModel);
      }
    }, 100);
    return () => clearInterval(checkModel);
  }, []);

  useEffect(() => {
    if (!modelLoaded || !modelRef.current || !containerRef.current || !cameraRef.current) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            // markers: true,
          },
        });

        const camera = cameraRef.current;

        tl2.to(modelRef.current.rotation, {
                    y: `-=${degToRad(23)}`,
                })

                .to (modelRef.current.position, {
                    x: `+=${1.1}`,
                }, '<')

        // Example animation, you can adjust as needed
        
      }, containerRef.current);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [modelLoaded]);

  return (
    <div ref={containerRef} className="w-full h-[300vh] blocks-model">
      <div className="sticky top-0 w-full h-screen">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
          <CameraController cameraRef={cameraRef} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <Suspense fallback={null}>
            <ParallaxGroup modelRef={modelRef}>
            <Model
              modelRef={modelRef}
              initialPosition={initialPosition}
              initialRotation={initialRotation}
              initialScale={initialScale}
            />
            </ParallaxGroup>
            <Environment preset="city" />
          </Suspense>
          <EffectComposer>
            <ChromaticAberration
              offset={new Vector2(0.001, 0.001)} // tweak for intensity
              blendFunction={2} 
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}