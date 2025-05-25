import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * LandingPage Component: The initial page the user sees when entering the application.
 *
 * This page displays a video background, a prominent title and slogan,
 * and a button to enter the main gallery. It also handles a custom scroll
 * animation to transition to the gallery.
 */

function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null); // Ref for the background video element
  const logoRef = useRef<HTMLHeadingElement>(null); // Ref for the main logo
  const slogan1Ref = useRef<HTMLParagraphElement>(null); // Ref for the slogan
  const scrollRef = useRef<HTMLParagraphElement>(null); // Ref for the scroll indicator
  const enterButtonRef = useRef<HTMLButtonElement>(null); // Ref for the "Enter the Gallery" button
  const containerRef = useRef<HTMLDivElement>(null);  // Ref for the main container
  const navigate = useNavigate();
  const isScrolling = useRef(false);

  useEffect(() => {
    // === GSAP Animations ===
    // Entrance animations for elements on the page.
    gsap.fromTo(
      videoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo(
      logoRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }
    );

    if (slogan1Ref.current) {
      gsap.fromTo(
        slogan1Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 0.8,
        }
      );
    }

    gsap.fromTo(
      scrollRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out',
        repeat: -1,
        yoyo: true,
      }
    );

    gsap.fromTo(
      enterButtonRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1 }
    );

    // === Function for scroll ===
    // Handles the scroll event to navigate to the gallery with animation.
    const handleScroll = (e: WheelEvent) => {
      if (isScrolling.current) return;
      
      if (e.deltaY > 0) { // Check if scroll down
        isScrolling.current = true;
        
        // Create smooth animation timeline
        const tl = gsap.timeline({
          onComplete: () => navigate('/gallery') // Navigate after animation
        });

        // Fade out elements
        tl.to([logoRef.current, slogan1Ref.current, enterButtonRef.current, scrollRef.current], {
          opacity: 0,
          y: -50,
          duration: 0.8,
          ease: 'power2.in',
          stagger: 0.1 // Stagger the animation of each element
        })
        .to(videoRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in'
        }, 0) // Start at the beginning of the timeline (0)
        .to(containerRef.current, {
          backgroundColor: '#000', // Change background color
          duration: 0.8,
          ease: 'power2.in'
        }, 0); // Start at the beginning of the timeline (0)
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [navigate]);
  

  return (

    // === Video background ===
    <section 
      ref={containerRef}
      className="relative w-full h-screen landing-section overflow-hidden"
    >    
      <video
        ref={videoRef}
        src="/media/immersiv3.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {/* === Overlay Content === */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-6 md:pt-16 text-[#f1f1f1]">  
          <h1 ref={logoRef} className="text-3xl md:text-5xl lg:text-7xl font-bold mb-2">
                    ImmersivΞ
                </h1>
                <p
                    ref={slogan1Ref}
                    className="text-base md:text-2xl lg:text-4xl font-semibold leading-snug max-w-5xl mx-auto px-4 whitespace-pre-wrap text-[#b2b2b2]"
                >
                    <span className="block">Where imagination shapes reality</span>
                    <span className="block">— in 3D, AR, and beyond</span>
                </p>
                
        <button
          ref={enterButtonRef}
          onClick={() => {
            // Same animation as the button 'Enter the Gallery'
            const tl = gsap.timeline({
              onComplete: () => navigate('/gallery')
            });

            tl.to([logoRef.current, slogan1Ref.current, enterButtonRef.current, scrollRef.current], {
              opacity: 0,
              y: -50,
              duration: 0.8,
              ease: 'power2.in',
              stagger: 0.1
            })
            .to(videoRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: 'power2.in'
            }, 0)
            .to(containerRef.current, {
              backgroundColor: '#000',
              duration: 0.8,
              ease: 'power2.in'
            }, 0);
          }}
          
          className="connect-btn px-3 py-1.5 text-sm md:px-6 md:py-3 md:text-lg border border-[#b2b2b2] text-[#b2b2b2] rounded-md hover:bg-[#b2b2b2] hover:text-black mt-8"
        >
          Enter the Gallery
        </button>

        <p ref={scrollRef} className="absolute bottom-8 text-sm opacity-70">
          Scroll Down ↓
        </p>
      </div>

      <Navbar isLanding={true} setPage={() => {}} setShowZkLogin={() => {}} />
    </section>
  );
}

export default LandingPage;