
import { useNavigate } from 'react-router-dom';

interface MintedPageProps {
    setPage: (page: 'landing' | 'gallery' | 'minted') => void;
    }

/**
 * MintedPage Component: Displays confirmation after successful NFT minting.
 *
 * This page shows a confirmation message to the user after they have successfully
 * minted an NFT.  It provides a visual confirmation and a button to return
 * to the gallery.
 */
function MintedPage({ setPage }: MintedPageProps) {
    const navigate = useNavigate();

    /**
   * goBack: Handles the click event for the "Back to Gallery" button.
   */
    const goBack = () => {
        setPage('gallery'); // Update page state
        navigate('/gallery'); // Navigate to the gallery route
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center pt-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Minted Successfully!</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-80">
            Congratulations! Your NFT has been minted!
        </p>
        <button
            onClick={goBack}
            className="connect-btn px-6 py-3 border border-[var(--text-color)] rounded-md text-lg hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"
        >
            ← Back to Gallery
        </button>
        </section>
    );
}

export default MintedPage;