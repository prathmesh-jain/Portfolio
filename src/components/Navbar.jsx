import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { FaBars, FaTimes } from "react-icons/fa";
import useScrollNavigation from '../hooks/useScrollNavigation'
import { useRef } from 'react';

const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Skills', href: '#skills', current: false },
    { name: 'Experience', href: '#experience', current: false },
    { name: 'Projects', href: '#projects', current: false },
    { name: 'Let\'s Connect!', href: '#contact', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const isProgrammaticScroll = useRef(false);
    const { activeSection, updateActiveSection, sections } = useScrollNavigation(isProgrammaticScroll);
    let timer = null;
    const handleNavClick = (index) => {
        if(timer) clearTimeout(timer);
        isProgrammaticScroll.current = true;
        if (index === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(sections[index].id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        updateActiveSection(index);
        timer = setTimeout(() => {
            isProgrammaticScroll.current = false;
            timer=null;
        }, 700); // match scroll duration
    };
    return (
        <Disclosure as="nav" className="text-white sticky top-0 bg-custom-bg z-10">
            {({ open, close }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex py-8 items-center justify-between">
                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 sm:hover:bg-gray-700 hover:text-white sm:focus:outline-none sm:focus:ring-2 focus:ring-inset sm:focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <FaTimes aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block focus:outline-none" />
                                    ) : (
                                        <FaBars aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden focus:outline-none" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                                <div className="flex flex-shrink-0 items-center font-bold md:text-3xl text-2xl font-inter">
                                    Prathmesh Jain
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex md:space-x-4 space-x-2 cursor-pointer">
                                        {navigation.map((item, index) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={index === activeSection ? 'page' : undefined}
                                                className={classNames(
                                                    index === activeSection ? 'bg-indigo-700 text-white' : 'text-black-300 hover:bg-indigo-300 hover:text-black',
                                                    'rounded-md md:px-3 px-2 py-2 md:text-sm text-xs font-medium font-inter outline-none whitespace-nowrap',
                                                )}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNavClick(index);
                                                }}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item, index) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={index === activeSection ? 'page' : undefined}
                                    className={classNames(
                                        index === activeSection ? 'bg-indigo-700 text-white' : 'text-black-300 hover:bg-indigo-300 hover:text-black',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(index);
                                        close();
                                    }}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}
