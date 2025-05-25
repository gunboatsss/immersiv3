## ImmersivΞ : WebXR Digital Art Gallery on Sui

**Sui Overflow 2025 Hackathon Project**

**Live Demo:** [https://www.immersiv3.tech/](https://www.immersiv3.tech/)

#### Project Overview

**ImmersivΞ** is a next-gen platform empowering creators to publish and showcase **3D digital artworks as immersive WebXR content**. Built on **Sui blockchain**, it enables **NFT minting and AR viewing** directly via web browser—**no app downloads required**.

Starting as a 3D NFT gallery, ImmersivΞ aims to expand into a broader ecosystem for XR-based art, education, and games, with future plans for a dedicated marketplace. Leveraging **WebXR and WebGL**, it seamlessly brings digital assets into the physical world.

#### Frontend Status & Key Features

The frontend is **~90-95% complete** and ready for demo, featuring:
* **Immersive XR Mode:** Functional AR for 3D NFT viewing and a simple VR mode.
* **Responsive UI/UX:** Optimized for mobile and various screen sizes.
* **Intuitive 3D Display:** Showcasing `.glb` artworks with engaging visuals.

#### Tech Stack & Setup

**Frontend:**
* **UX / AR / VR:** Three.js, WebXR, WebGL
* **Core:** React, Tailwind CSS, GSAP, Vite, TypeScript
* **Sui Integration:** `@mysten/dapp-kit`, `@mysten/sui`

**Smart Contract (Sui Move):**
* Basic **NFT minting smart contract** for a limited supply (1111 pieces).

**Backend Status:**
* Wallet integration and smart contract calls are in final stages of development. Full integration expected soon, with further enhancements planned post-hackathon.

#### Local Development

1. **Clone:** `git clone "https://github.com/artitaya-git/immersiv3.git" && cd immersiv3`
2. **Install:** `npm install`
3. **Run Dev Server:** `npm run dev`

*Optional for Sui Move Contract:*
* **Build:** `sui move build`
* **Test:** `sui move test`


#### Developer

* [https://github.com/artitaya-git](https://github.com/artitaya-git) - Self-taught coder. Focused on frontend, UI/UX, and WebXR.