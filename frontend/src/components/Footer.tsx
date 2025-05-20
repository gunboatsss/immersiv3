
import React from 'react';

/**
 * Footer Component: Displays the footer section of the website.
 *
 * This component shows the copyright information and social media links.
 */
function Footer() {
    return (
        <footer className="theme-bg theme-text py-8 text-center border-t border-[var(--text-color)]">
        <p className="text-lg">ImmersivΞ © 2025</p>
        <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-[var(--text-color)] opacity-70 hover:opacity-100">Twitter</a>
            <a href="#" className="hover:text-[var(--text-color)] opacity-70 hover:opacity-100">Telegram</a>
            <a href="#" className="hover:text-[var(--text-color)] opacity-70 hover:opacity-100">Discord</a>
            <a href="#" className="hover:text-[var(--text-color)] opacity-70 hover:opacity-100">YouTube</a>
            <a href="#" className="hover:text-[var(--text-color)] opacity-70 hover:opacity-100">Vimeo</a>
        </div>
        </footer>
    );
}

export default Footer;