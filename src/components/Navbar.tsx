import React, { useRef } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { FaBars, FaTimes } from "react-icons/fa";
import useScrollNavigation from '../hooks/useScrollNavigation';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Skills', href: '#skills', current: false },
    { name: 'Experience', href: '#experience', current: false },
    { name: 'Projects', href: '#projects', current: false },
    { name: 'Let\'s Connect!', href: '#contact', current: false },
]

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const isProgrammaticScroll = useRef<boolean>(false);
    const { activeSection, updateActiveSection, sections } = useScrollNavigation(isProgrammaticScroll);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navRef = useRef(null);

    const handleNavClick = (index: number) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        isProgrammaticScroll.current = true;
        if (index === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(sections[index].id);
            if (element) {
                const isMobile = window.matchMedia('(max-width: 640px)').matches;
                const buffer = isMobile ? 120 : -60
                const navbarOffset = navRef.current?.getBoundingClientRect().height ?? 0;
                const elementTop = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementTop - navbarOffset - buffer;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        }
        updateActiveSection(index);
        timerRef.current = setTimeout(() => {
            isProgrammaticScroll.current = false;
            timerRef.current = null;
        }, 700); // match scroll duration
    };

    return (
        <Disclosure as="nav" className="text-white sticky top-0 bg-custom-bg z-10">
            {({ open, close }) => (
                <>
                    <div ref={navRef} className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex py-8 items-center justify-between">
                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 sm:hover:bg-gray-700 hover:text-white sm:focus:outline-none sm:focus:ring-2 focus:ring-inset sm:focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <FaTimes aria-hidden="true" className="h-6 w-6 focus:outline-none" />
                                    ) : (
                                        <FaBars aria-hidden="true" className="h-6 w-6 focus:outline-none" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex flex-shrink-0 items-center font-bold md:text-3xl text-2xl font-inter"
                                >
                                    Prathmesh Jain
                                </motion.div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex md:space-x-4 space-x-2 cursor-pointer">
                                        {navigation.map((item, index) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={index === activeSection ? 'page' : undefined}
                                                className={classNames(
                                                    'relative rounded-md md:px-3 px-2 py-2 md:text-sm text-xs font-medium font-inter outline-none whitespace-nowrap transition-colors duration-200',
                                                    index === activeSection ? 'text-white' : 'text-gray-300 hover:text-white'
                                                )}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNavClick(index);
                                                }}
                                            >
                                                {index === activeSection && (
                                                    <motion.div
                                                        layoutId="activeNav"
                                                        className="absolute inset-0 bg-indigo-700 rounded-md -z-10"
                                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {open && (
                            <DisclosurePanel static className="sm:hidden">
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1 px-2 pb-3 pt-2"
                                >
                                    {navigation.map((item, index) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            aria-current={index === activeSection ? 'page' : undefined}
                                            className={classNames(
                                                index === activeSection ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-indigo-300/10 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium',
                                            )}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                close(); // close immediately
                                                setTimeout(() => {
                                                    handleNavClick(index);
                                                }, 50); // small delay for layout stabilization
                                            }}
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                </motion.div>
                            </DisclosurePanel>
                        )}
                    </AnimatePresence>
                </>
            )}
        </Disclosure>
    )
}
