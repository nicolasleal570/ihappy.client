import React from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Link from 'next/Link';

interface SidebarDropdownProps {
    title: String;
    url?: string;
    isDropdown?: Boolean;
    options?: Array<{ url: string, name: string }>
    children: React.ReactChild
}

const SidebarDropdown = ({ title, url = '', options, isDropdown = false, children }: SidebarDropdownProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    let link = null;

    if (isDropdown) {
        link = (
            <div className="w-full">
                <button
                    className="w-full cursor-pointer text-white semi-bold text-center text-lg focus:outline-none outline-none"
                    onClick={toggle}
                >
                    <h1 className={`hover:bg-purple-500 flex items-center p-2 ${isOpen ? 'bg-purple-600' : ''}`}>
                        {children}
                        <p className="flex-1 text-left px-2">{title}</p>
                        {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                    </h1>
                </button>
                {
                    isOpen &&
                    <ul>
                        {options?.map((option: { url: string, name: string }) => (
                            <li className={`'px-2 py-1 cursor-pointer text-white text-md hover:bg-purple-500 hover:text-white'`}>
                                <Link href={option.url}>
                                    <a className="w-full inline-block pl-5">{option.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        )
    } else {
        link = (
            <Link
                href={url}
            >
                <a className='flex justify-between items-center cursor-pointer text-white semi-bold hover:bg-purple-500 p-2 text-center text-lg'>
                    {children}
                    <p className="flex-1 text-left px-2">{title}</p>
                </a>
            </Link>
        )
    }

    return link
}

export default SidebarDropdown
