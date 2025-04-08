import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome(props) {
    return (
        <>
            <Head title="RaffleWin - Modern Raffle Management Platform" />

            <div className="min-h-screen bg-dark text-light">
                <header className="bg-darker py-6 shadow-md">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <Link href="/" className="flex items-center text-xl font-bold text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary">
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
                    {/* Hero Section with Animation */}
                    <section className="relative bg-darker overflow-hidden">
                        <div className="absolute inset-0 z-0 opacity-20">
                            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full filter blur-3xl"></div>
                            <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl"></div>
                        </div>

                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                                    Modern Raffle Management for Everyone
                                </h1>
                                <p className="text-xl text-gray-light mb-10 max-w-lg">
                                    Create, manage, and run engaging raffles for your organization with an intuitive platform designed for simplicity.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="bg-primary px-8 py-4 rounded-md font-semibold text-white hover:bg-primary-dark transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                    <a
                                        href="#features"
                                        className="border border-gray px-8 py-4 rounded-md font-semibold text-sm text-white hover:border-primary hover:text-primary transition-colors"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                <div className="relative w-full max-w-lg">
                                    {/* Stylized raffle graphic */}
                                    <div className="relative z-10 bg-darker rounded-xl border border-gray-700 shadow-xl p-6 transform rotate-1">
                                        <div className="h-12 flex items-center border-b border-gray-700 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-red-500 mx-1"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500 mx-1"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500 mx-1"></div>
                                            <div className="ml-4 text-white font-medium">Raffle Dashboard</div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-4 bg-gray-700 rounded-full w-5/6"></div>
                                            <div className="h-4 bg-gray-700 rounded-full w-3/4"></div>
                                            <div className="h-10 bg-primary rounded-lg w-full mt-6"></div>
                                            <div className="grid grid-cols-2 gap-2 mt-6">
                                                <div className="h-24 bg-gray-700 rounded-lg"></div>
                                                <div className="h-24 bg-gray-700 rounded-lg"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-primary opacity-5 rounded-xl transform -rotate-2"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-20" id="features">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-light mb-4">Why Choose RaffleWin?</h2>
                                <p className="text-lg text-gray-light max-w-2xl mx-auto">A comprehensive platform built with your needs in mind</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-darker rounded-lg p-8 transition-all hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 text-primary rounded-xl mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-light mb-4">Participant Management</h3>
                                    <p className="text-gray-light">Easily manage participant data, import from CSV, and track entry history for all your raffles.</p>
                                </div>

                                <div className="bg-darker rounded-lg p-8 transition-all hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 text-primary rounded-xl mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 8v4l3 3"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-light mb-4">Live Drawing Experience</h3>
                                    <p className="text-gray-light">Create excitement with our interactive drawing interface featuring animations and real-time winner selection.</p>
                                </div>

                                <div className="bg-darker rounded-lg p-8 transition-all hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 text-primary rounded-xl mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="3" y1="9" x2="21" y2="9"></line>
                                            <line x1="9" y1="21" x2="9" y2="9"></line>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-light mb-4">Prize Management</h3>
                                    <p className="text-gray-light">Set up multiple prizes with custom details, images, and quantities for each raffle you run.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                <div className="bg-darker rounded-lg p-8 transition-all hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 text-primary rounded-xl mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                            <path d="M2 17l10 5 10-5"></path>
                                            <path d="M2 12l10 5 10-5"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-light mb-4">Multi-Organization Support</h3>
                                    <p className="text-gray-light">Perfect for businesses, non-profits, cooperatives, or any group looking to organize raffles with their own branding.</p>
                                </div>

                                <div className="bg-darker rounded-lg p-8 transition-all hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 text-primary rounded-xl mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-light mb-4">Easy Setup</h3>
                                    <p className="text-gray-light">Get your raffle up and running in minutes with our simple, user-friendly interface - no technical expertise required.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="relative overflow-hidden bg-gradient-to-r from-primary to-indigo-600 rounded-2xl p-12 text-center">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                                <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-white opacity-10 blur-3xl"></div>
                            </div>
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Raffles?</h2>
                                <p className="text-lg mb-8 text-white text-opacity-90">Join organizations of all sizes already using RaffleWin to create engaging, fair raffles.</p>
                                <Link
                                    href={route('register')}
                                    className="inline-block bg-white px-8 py-4 rounded-md font-semibold text-primary hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    Start for Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-darker py-12 text-gray-light">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <Link href="/" className="inline-flex items-center text-xl font-bold text-white mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                        <path d="M2 17l10 5 10-5"></path>
                                        <path d="M2 12l10 5 10-5"></path>
                                    </svg>
                                    RaffleWin
                                </Link>
                                <p className="mb-4 text-sm">
                                    A modern raffle management platform for organizations of all sizes. Create, manage, and run engaging raffles with ease.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-4">Links</h3>
                                <ul className="space-y-2">
                                    <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                                    <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                                    <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-4">Connect</h3>
                                <div className="flex gap-4">
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
                            </div>
                        </div>

                        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <div className="text-gray text-sm mb-4 md:mb-0">
                                &copy; {new Date().getFullYear()} RaffleWin. All rights reserved.
                            </div>
                            <div className="flex gap-6 text-sm">
                                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
