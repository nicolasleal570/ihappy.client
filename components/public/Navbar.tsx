import React from 'react'
import Link from 'next/link';
const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const toggleNavbar = () => setNavbarOpen(!navbarOpen)

    return (
        <nav className={`absolute left-0 top-0 z-40 flex items-center justify-between flex-wrap py-4 px-6 w-full ${navbarOpen ? 'bg-gray-800' : ''}`}>
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link href="/"><span className="cursor-pointer font-bold text-xl tracking-tight">LOOGO</span></Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-white border-purple-400 hover:text-purple-500 hover:border-white bg-purple-600 outline-none" onClick={toggleNavbar}>
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className={`w-full block flex-grow ${navbarOpen ? '' : 'hidden'} lg:flex lg:items-center lg:w-auto`}>
                <div className="lg:flex-grow">
                    <Link href="/">
                        <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-white hover:text-purple-500 mr-4"> Inicio </span>
                    </Link>
                    <Link href="/">
                        <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-white hover:text-purple-500 mr-4"> Nosotros </span>
                    </Link>
                    <Link href="/">
                        <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-white hover:text-purple-500 mr-4"> Ayuda </span>
                    </Link>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
