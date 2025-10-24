'use client'
import { useState, useEffect } from 'react';
import Loader from './loader';

const PageWrapper = ({ children }) => {
    const [hideLoader, setHideLoader] = useState(false);

    useEffect(() => {
        
        const loaderDuration = 3750 + 2800;

        const timer = setTimeout(() => {
            setHideLoader(true);
        }, loaderDuration);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {children}
            {!hideLoader && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 9999
                }}>
                    <Loader />
                </div>
            )}
        </>
    );
};

export default PageWrapper;