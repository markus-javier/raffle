import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome(props) {
    return (
        <>
            <Head title="RaffleWin - Simple Raffle Management Platform" />

            <div className="min-h-screen bg-dark text-light">
                <header className="bg-darker py-6 shadow-md">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <Link href="/" className="flex items-center text-xl font-bold text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                            </svg>
                            RaffleWin
                        </Link>

                        <div className="flex gap-4">
                            {props.auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="border border-gray px-6 py-3 rounded-md font-semibold text-sm text-white hover:border-primary hover:text-primary transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="border border-gray px-6 py-3 rounded-md font-semibold text-sm text-white hover:border-primary hover:text-primary transition-colors"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="bg-primary px-6 py-3 rounded-md font-semibold text-sm text-white hover:bg-primary-dark transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main>
                    <section className="bg-darker py-24 text-center">
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-4xl font-bold leading-tight mb-6">Simple Raffle Management</h1>
                            <p className="text-xl text-gray-light mb-10">Create, manage, and run professional raffles in minutes.</p>
                            <div className="flex justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-primary px-6 py-3 rounded-md font-semibold text-white hover:bg-primary-dark transition-colors"
                                >
                                    Get Started Free
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="py-16" id="features">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-light mb-4">Why Choose RaffleWin?</h2>
                                <p className="text-lg text-gray-light max-w-2xl mx-auto">Everything you need for successful raffles</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/*<div className="bg-darker rounded-lg p-8 transition-transform hover:translate-y-[-5px]">*/}
                                {/*    <div className="inline-flex items-center justify-center w-12 h-12 bg-opacity-20 bg-primary text-primary rounded-md mb-6">*/}
                                {/*        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">*/}
                                {/*            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>*/}
                                {/*        </svg>*/}
                                {/*    </div>*/}
                                {/*    <h3 className="text-xl font-bold text-light mb-4">Online Ticket Sales</h3>*/}
                                {/*    <p className="text-gray-light">Sell raffle tickets online with multiple payment options. Track sales in real-time.</p>*/}
                                {/*</div>*/}

                                <div className="bg-darker rounded-lg p-8 transition-transform hover:translate-y-[-5px]">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-opacity-20 bg-primary text-primary rounded-md mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-light mb-4">Easy Setup</h3>
                                    <p className="text-gray-light">Get your raffle up and running in minutes with our simple, user-friendly interface.</p>
                                </div>

                                <div className="bg-darker rounded-lg p-8 transition-transform hover:translate-y-[-5px]">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-opacity-20 bg-primary text-primary rounded-md mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="3" y1="9" x2="21" y2="9"></line>
                                            <line x1="9" y1="21" x2="9" y2="9"></line>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-light mb-4">Fair Drawings</h3>
                                    <p className="text-gray-light">Conduct transparent random drawings that build trust with your participants.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="bg-primary-dark rounded-lg py-12 px-8 text-center">
                            <div className="max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold mb-6">Start Your First Raffle Today</h2>
                                <p className="text-lg mb-8 text-white text-opacity-90">Join thousands of organizations already using RaffleWin to run successful raffles.</p>
                                <Link
                                    href={route('register')}
                                    className="inline-block bg-primary px-6 py-3 rounded-md font-semibold text-white hover:bg-blue-600 transition-colors"
                                >
                                    Create Free Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-darker py-12 text-gray-light text-center">
                    <div className="max-w-2xl mx-auto px-4">
                        <Link href="/" className="inline-flex items-center text-xl font-bold text-white mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                            </svg>
                            RaffleWin
                        </Link>

                        <div className="flex justify-center gap-4 mb-8">
                            <a href="#" className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-10 rounded-full hover:bg-primary transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-10 rounded-full hover:bg-primary transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-10 rounded-full hover:bg-primary transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </a>
                        </div>


                        <div className="text-gray text-sm">
                            &copy; {new Date().getFullYear()} RaffleWin. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

