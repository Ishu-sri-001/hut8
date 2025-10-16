"use client";
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
} from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { degToRad } from "three/src/math/MathUtils";
import {
  EffectComposer,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { Vector2 } from "three";

gsap.registerPlugin(ScrollTrigger);

function FirstModel({ modelRef, initialPosition, initialRotation, initialScale }) {
  const gltf = useGLTF("/models/intro.glb", true, undefined, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
  });

  const texture = useTexture("/assets/texture/intro-texture.jpg");

  useEffect(() => {
    if (gltf.scene && texture) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.side = THREE.DoubleSide;
          child.material.needsUpdate = true;
          child.material.transparent = true;
        }
      });

      if (initialPosition) {
        gltf.scene.position.set(...initialPosition);
      }
      if (initialRotation) {
        gltf.scene.rotation.set(...initialRotation);
      }
      if (initialScale) {
        gltf.scene.scale.set(...initialScale);
      }

      if (modelRef) {
        modelRef.current = gltf.scene;
      }
    }
  }, [gltf, texture, modelRef, initialPosition, initialRotation, initialScale]);

  useFrame(() => {
    if (gltf.scene) {
      const wind = gltf.scene.getObjectByName("Wind");
      if (wind) {
        ["Blade_1", "Blade_2", "Blade_3", "Blade_4"].forEach((name) => {
          const blade = wind.getObjectByName(name);
          if (blade) {
            blade.rotation.x += 0.05;
          }
        });
      }
    }
  });
  return <primitive object={gltf.scene} />;
}

function SecondModel({ modelRef, initialPosition, initialRotation, initialScale }) {
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
              roughness: 0.8,
              transparent: true,
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              color: '#cccccc',
              side: THREE.DoubleSide,
              metalness: 0.1,
              roughness: 0.8,
              transparent: true,
            });
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      if (initialPosition) gltf.scene.position.set(...initialPosition);
      if (initialRotation) gltf.scene.rotation.set(...initialRotation);
      if (initialScale) gltf.scene.scale.set(...initialScale);

      // Start with opacity 0
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.opacity = 0;
        }
      });

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

function ParallaxGroup({ children, modelRef, parallaxStrength = 0.5 }) {
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
      -mouse.current.x * parallaxStrength,
      0.1
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mouse.current.y * parallaxStrength,
      0.1
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function ThreeScene() {
  const cameraRef = useRef();
  const firstModelRef = useRef();
  const secondModelRef = useRef();
  const containerRef = useRef();
  const [firstModelLoaded, setFirstModelLoaded] = useState(false);
  const [secondModelLoaded, setSecondModelLoaded] = useState(false);

  const firstInitialPosition = [15, 5, -20];
  const firstInitialRotation = [degToRad(45), degToRad(-45), degToRad(0)];
  const firstInitialScale = [1, 1, 1];

  const secondInitialPosition = [-5.5, 0, 3];
  const secondInitialRotation = [degToRad(30), degToRad(40), degToRad(0)];
  const secondInitialScale = [1.2, 1.2, 1.2];

  useEffect(() => {
    const checkFirstModel = setInterval(() => {
      if (firstModelRef.current) {
        setFirstModelLoaded(true);
        clearInterval(checkFirstModel);
      }
    }, 100);

    return () => clearInterval(checkFirstModel);
  }, []);

  useEffect(() => {
    const checkSecondModel = setInterval(() => {
      if (secondModelRef.current) {
        setSecondModelLoaded(true);
        clearInterval(checkSecondModel);
      }
    }, 100);

    return () => clearInterval(checkSecondModel);
  }, []);

  useEffect(() => {
    if (
      !firstModelLoaded ||
      !secondModelLoaded ||
      !firstModelRef.current ||
      !secondModelRef.current ||
      !containerRef.current ||
      !cameraRef.current
    )
      return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        // First model timeline
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "60% top",
            scrub: true,
            // markers: true,
          },
        });

        tl1
          .to(firstModelRef.current.position, {
            z: `-=${5}`,
            x: `-=${12}`,
            y: `+=${7}`,
            ease: 'none',
          })
          .to(firstModelRef.current.rotation, {
            y: `-=${degToRad(10)}`,
            x: `-=${degToRad(10)}`,
            ease: 'none',
          }, '<')
          .to(firstModelRef.current.position, {
            z: `-=${17}`,
            x: `-=${12}`,
            y: `+=${18}`,
            ease: 'none',
          })
          .to(firstModelRef.current.rotation, {
            y: `-=${degToRad(10)}`,
            x: `+=${degToRad(10)}`,
            ease: 'none',
          }, '<')
          .to(firstModelRef.current.position, {
            z: `-=${15}`,
            x: `-=${10}`,
            y: `+=${8}`,
            ease: 'none',
          })
          .to(firstModelRef.current.rotation, {
            y: `+=${degToRad(55)}`,
            x: `+=${degToRad(10)}`,
            ease: 'none',
          })
          .to(firstModelRef.current.position, {
            z: '-13',
            x: '-70',
            y: `0`,
            ease: 'none',
          }, '<')
          .to(firstModelRef.current.position, {
            z: '-9',
            // x: '-70',
            // y: `0`,
            ease: 'none',
          })

        // Fade out first model and fade in second model
        const fadeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "55% top",
            end: "65% top",
            scrub: true,
            // markers: true,
          },
        });

        fadeTimeline.to(firstModelRef.current.children, {
          opacity: 0,
          duration: 1,
          stagger: 0.02,
          onUpdate: function() {
            firstModelRef.current.traverse((child) => {
              if (child.isMesh && child.material) {
                child.material.opacity = this.progress() === 1 ? 0 : 1 - this.progress();
              }
            });
          }
        })
        .to(secondModelRef.current.children, {
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          onUpdate: function() {
            secondModelRef.current.traverse((child) => {
              if (child.isMesh && child.material) {
                child.material.opacity = this.progress();
              }
            });
          }
        }, '<');

        // Second model timeline
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: '65% top',
            end: 'bottom top',
            scrub: true,
            // markers: true,
          },
        });

        tl2
          .to(secondModelRef.current.rotation, {
            y: `-=${degToRad(23)}`,
          })
          .to(secondModelRef.current.position, {
            x: `+=${1.1}`,
          }, '<');

      }, containerRef.current);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [firstModelLoaded, secondModelLoaded]);
  
  return (
    <div ref={containerRef} className="w-full h-[900vh] dark-section">
      <div className="sticky top-0 w-full h-screen">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
          <CameraController cameraRef={cameraRef} />
          <ambientLight intensity={1.2} />
<directionalLight position={[5, 5, 5]} intensity={0.5} castShadow color="#ffffff" />
<hemisphereLight intensity={0.5} color="#ffffff" groundColor="#f0f0f0" />
          <Suspense fallback={null}>
            <ParallaxGroup modelRef={firstModelRef} parallaxStrength={0.5}>
              <FirstModel
                modelRef={firstModelRef}
                initialPosition={firstInitialPosition}
                initialRotation={firstInitialRotation}
                initialScale={firstInitialScale}
              />
            </ParallaxGroup>
            <ParallaxGroup modelRef={secondModelRef} parallaxStrength={0.04}>
              <SecondModel
                modelRef={secondModelRef}
                initialPosition={secondInitialPosition}
                initialRotation={secondInitialRotation}
                initialScale={secondInitialScale}
              />
            </ParallaxGroup>
            <Environment preset="city" />
          </Suspense>
          <EffectComposer>
            <ChromaticAberration
              offset={new Vector2(0.001, 0.001)}
              blendFunction={2}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}