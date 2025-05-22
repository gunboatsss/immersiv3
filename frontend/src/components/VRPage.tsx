import React from 'react';

/**
 * VRPage Component: Placeholder page for VR experience (Coming Soon).
 *
 * This component displays a black background with a "Coming Soon" message as a placeholder
 * until the Three.js VR implementation is completed.
 */
const VRPage = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#f1f1f1',
                fontSize: '24px',
                fontWeight: 'semi-bold',
                zIndex: 10,
            }}
        >
            Coming Soon
        </div>
    );
};

export default VRPage;