'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    animationId: number;
    geometry: THREE.BufferGeometry;
    material: THREE.PointsMaterial;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const currentTheme = resolvedTheme || theme || 'light';
    const isDark = currentTheme === 'dark';

    // Clean up previous scene
    if (sceneRef.current) {
      cancelAnimationFrame(sceneRef.current.animationId);
      sceneRef.current.scene.traverse((object) => {
        if (object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      sceneRef.current.renderer.dispose();
      if (containerRef.current && sceneRef.current.renderer.domElement) {
        containerRef.current.removeChild(sceneRef.current.renderer.domElement);
      }
      sceneRef.current = null;
    }

    // Remove any existing canvas
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const SEPARATION = 120;  // Tighter dots for denser look
    const AMOUNTX = 50;      // More dots horizontally
    const AMOUNTY = 75;      // More dots vertically

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    containerRef.current.appendChild(renderer.domElement);

    const positions: number[] = [];
    const colors: number[] = [];

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        positions.push(x, y, z);
        // High visibility colors
        if (isDark) {
          // Bright cyan/blue for dark mode - very visible
          colors.push(0.2, 0.7, 1.0);
        } else {
          // Deep blue for light mode - bold and visible
          colors.push(0.0, 0.3, 0.8);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isDark ? 10 : 12,     // Much larger dots
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.9 : 1.0, // Maximum opacity
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending, // Glow effect
      depthWrite: false,
      depthTest: false,            // Always render on top
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const posArray = geometry.attributes.position.array as Float32Array;
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          // Larger wave amplitude for more visible movement
          posArray[index + 1] = Math.sin((ix + count) * 0.3) * 70 + Math.sin((iy + count) * 0.5) * 70;
          i++;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    sceneRef.current = { scene, camera, renderer, animationId, geometry, material };

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.geometry.dispose();
        sceneRef.current.material.dispose();
        sceneRef.current.renderer.dispose();
      }
    };
  }, [mounted, resolvedTheme, theme]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none fixed inset-0', className)}
      style={{ zIndex: 0 }}
      {...props}
    />
  );
}