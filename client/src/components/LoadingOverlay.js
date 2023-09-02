import React from 'react';

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="animate-spin rounded-full border-t-4 border-white h-12 w-12"></div>
        </div>
    );
};

export default LoadingOverlay;
