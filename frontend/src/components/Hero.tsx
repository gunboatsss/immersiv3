import { useSignAndExecuteTransaction, useSuiClient, useSuiClientQuery } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { Link, redirect } from 'react-router-dom';

const PACKAGE_ID = `0x8cea9e3b3602ed67c0069ccee5ed13d9c32cf6c2c4068a68fef21fd2b2d204c3`;
const MINT_STATE_ID = `0xb85f13afab1d6159901e77ecf01e6d4b2ecc92e2996c2150407bec1730768ca2`;

function NumberMinted() {
    const { data, isLoading, isSuccess } = useSuiClientQuery(
        'getObject',
        {
            id: MINT_STATE_ID,
            options: {
                showContent: true,
            }
        }
    );
    return (
        <span className="mt-4 text-sm font-light mb-4">
            {isLoading ? 'Loading...' : isSuccess ? data.data?.content?.dataType === "moveObject" ? `${data.data.content.fields.minted} / 1111 Minted` : 'something wrong' : 'Error fetching mint data'}
        </span>
        )
}

/**
 * Hero Component: Displays the main landing section of the application.
 *
 * This component showcases the primary call to action for the user,
 * typically involving an introduction to the app's main features
 * and a way to get started (e.g., minting an NFT).
 */
function Hero() {
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();

    const handleMint = () => {
        console.log('Initiate NFT Mint on Sui Blockchain');
        const tx = new Transaction();
        tx.moveCall({
            package: PACKAGE_ID,
            module: 'simple_nft',
            function: 'mint',
            arguments: [
                tx.object(MINT_STATE_ID), // The state object ID for minting
                tx.pure.vector('u8', [...'https://example.com'].map(x => x.charCodeAt(0))), // Replace with actual GLB URL
            ]
        });
        signAndExecute({
            transaction: tx,
        }, {
            onSuccess: () => {
                console.log('Minting transaction successful!');
                redirect('/minted');
            }
        });
    };

    return (
        <section className="min-h-screen flex flex-col items-center text-center pt-20 pb-20">
        <div className="w-full max-w-4xl px-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 mt-16">
            ImmersivΞ 3D NFT
            </h2>
            <p className="text-sm sm:text-base lg:text-lg opacity-80 mb-8">
            Bring Digital Art to Life — Discover immersive AR experiences.
            </p>

            {/* === Enter AR Buttons / WebXR + Three.js ===*/}
            <div className="flex justify-center space-x-7">
            <Link
                to="/ar-rotate"
                className="connect-btn px-6 py-2 border border-[var(--text-color)] rounded-md 
                text-lg hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] mb-5"
            >
                Enter AR
            </Link>
            </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl px-4">

            {/* === Google Model Viewer === */}
            <div className="w-full flex justify-center">
            <div className="flex flex-col items-center">
                <model-viewer
                className="w-[350px] md:w-[450px] lg:w-[500px] h-[350px] md:h-[450px] lg:h-[500px] 
                rounded-lg model-viewer-bg mb-5"
                src="/nft-assets/nft.glb" // "/nft-assets/nft.glb" - LOCAL: dev use only / For production, switch to external Urls
                alt="3D NFT"
                camera-controls
                auto-rotate
                loading="eager"
                touch-action="pan-y"
                tone-mapping="commerce"
                shadow-intensity="0.8"
                />

                 {/* === Free Mint Button === */}
                <button
                onClick={handleMint}
                className="connect-btn px-5 py-2 border border-[var(--text-color)] rounded-md 
                text-lg hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"
                >
                Free Mint Now
                </button>
                <NumberMinted />
            </div>
            </div>

            {/* === 3D Viewer + AR user manual === */}
            {/* <div className="w-full max-w-md p-4 mx-auto mt-8 2xl:mt-0 2xl:absolute 2xl:right-24 2xl:top-[65%] 2xl:-translate-y-1/2"> */}

            <div className="w-full max-w-md p-4 mx-auto mt-8 2xl:mt-0 2xl:absolute 2xl:right-10 2xl:top-[76%] 2xl:-translate-y-1/2"> 


            <div className="bg-[var(--bg-color)] text-[var(--text-color)] rounded-lg shadow-xl border border-white/30 p-4">
                <h3 className="text-lg font-semibold mb-2">Quick Tips:</h3>
                <ul className="list-none text-sm space-y-2">
                <li>
                    <span className="font-semibold">Rotate 3D:</span> Click & drag (desktop) or swipe (mobile).
                </li>
                <li className="my-4">
                    <span className="text-lg font-semibold block mb-2">Enter AR:</span>
                    <ul className="list-none ml-4 space-y-1">
                    <li>
                        Tap the <span className="font-semibold">[Enter AR]</span> button to view the object in your real-world space.
                    </li>
                    </ul>
                </li>
                <li className="my-4">
                    <span className="text-lg font-semibold block mb-2">AR Compatibility:</span>
                    <ul className="list-none ml-4 space-y-1">
                    <li><span className="font-semibold">Best on:</span> Android (Chrome, etc.)</li>
                    <li><span className="font-semibold">NOT Supported:</span> Desktop, iPhone browsers.</li>
                    </ul>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </section>
    );
}

export default Hero;