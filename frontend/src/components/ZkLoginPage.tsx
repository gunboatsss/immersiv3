import React, { useState } from 'react';

interface ZkLoginPageProps {
    setShowZkLogin: (show: boolean) => void;
    }

    /**
     * ZkLoginPage Component: Handles user authentication using zkLogin with Google.
     *
     * This component provides a modal for users to sign in to the application
     * using their Google account via zkLogin. It's a crucial part of the
     * authentication flow, handling the UI for initiating the zkLogin process.
     */
    function ZkLoginPage({ setShowZkLogin }: ZkLoginPageProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // State for error

    /**
     * handleGoogleLogin: Initiates the zkLogin process with Google.
     */
    const handleGoogleLogin = async () => {
        if (loading) return; // Prevent multiple requests
        setLoading(true);
        setError(null); // Clear previous errors

        try {
        console.log('Initiating Google zkLogin...');

        //  Currently, it's just a placeholder.  The following steps are needed:
        //
        //  Backend:
        //  1.  Generate ZKP using Google credentials.
        //  2.  Send ZKP to the backend server.
        //  3.  Backend: Verify ZKP and generate a Sui address.
        //  4.  Backend: Return the Sui address to the frontend.
        //  5.  Frontend: Use the Sui address for authentication. (Backend provides this data.)
        //  6.  Handle errors appropriately.

        // 1.  (Mock) Get Google Credential
        //  In a real app, use a library like @react-oauth/google (or similar)
        //  to get the user's ID token.  This is a *placeholder*.
        const mockGoogleCredential = 'sample-google-token';
        if (!mockGoogleCredential) {
            throw new Error("Failed to obtain Google credential");
        }

        // 2. Send credential to backend for ZKP generation and Sui address retrieval
        const response = await fetch('/api/zklogin', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            googleToken: mockGoogleCredential,
            }),
        });

        if (!response.ok) {
            //  Handle HTTP errors from the backend.  Provide more context if possible.
            const errorData = await response.json(); // Attempt to get error message from backend
            let errorMessage = 'Login failed.';
            if (errorData && errorData.error) {
            errorMessage += ` ${errorData.error}`; // Append backend error if available
            } else {
            errorMessage += ` Server responded with ${response.status} ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        const { suiAddress } = data;

        if (!suiAddress)
            throw new Error("Backend did not return Sui address");

        console.log('Sui address:', suiAddress);
        // 3.  Use Sui address for authentication in your app.
        //  This is a placeholder.  You'd typically update your app's
        //  authentication state (e.g., using a context, state management).
        alert(`Login successful! Your Sui address is: ${suiAddress}`);

        } catch (error: any) {
        //  Catch *any* error that occurs in the process (fetch, parsing, etc.)
        console.error('zkLogin error:', error);
        setError(error.message || 'An unexpected error occurred.'); // Use a user-friendly message
        } finally {
        setLoading(false); // Always set loading to false, regardless of success/failure
        }
    };

    /**
     * handleClose: Closes the zkLogin modal.
     */
    const handleClose = () => setShowZkLogin(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative bg-[var(--bg-color)] text-[var(--text-color)] border border-white/20 rounded-lg shadow-2xl w-full max-w-md p-8">
            {/* Close Button */}
            <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-2xl text-black dark:text-white bg-white dark:bg-[var(--bg-color)] rounded-md shadow-lg w-10 h-10 border border-gray-600 dark:border-white/10 hover:text-red-500 transition-all z-20 flex items-center justify-center"
            >
            ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Login with Google</h2>
            <p className="mb-4 opacity-80">Sign in securely with your Google account.</p>
            <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`connect-btn w-full px-4 py-2 border border-[var(--text-color)] rounded-md flex items-center justify-center transition-colors duration-200
                hover:bg-[var(--text-color)] hover:text-black dark:hover:text-[#9e9e9e]
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            >
            {loading ? 'Loading...' : (
                <>
                <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                />
                Continue with Google
                </>
            )}
            </button>




            





            {/* Display Error Message */}
            {error && (
            <p className="text-red-500 text-sm mt-4">
                {error}
            </p>
            )}
        </div>
        </div>
    );
}

export default ZkLoginPage;

