import React from 'react'
import Link from 'next/link';

interface AboutCardProps {
    title: String;
    subtitle: String;
    imgUrl: string;
}

const AboutCard = ({ title, subtitle, imgUrl }: AboutCardProps) => (
    <div className="bg-gray-200 text-gray-800 p-4 rounded mb-6 border border-gray-400 shadow-sm">
        <div className="flex">
            <img src={imgUrl} className="" alt="Doctors" />
            <div className="">
                <h3 className="font-bold capitalize">{title}</h3>
                <p>{subtitle}</p>
            </div>
        </div>
    </div>
);

interface DoctorCardProps {
    title: String;
    description: String;
    starsCount: number
}

const DoctorCard = ({ title, description, starsCount }: DoctorCardProps) => {
    let rating = [...Array(5).fill(null)];
    let starsIcon: Array<any> = [];
    rating.forEach((value, index) => {
        if (starsCount <= index) {
            starsIcon.push(<li key={index}></li>);
        } else {
            starsIcon.push(<li key={index}><img src="/assets/icons/star-full.svg" alt="Stars" /></li>);
        }
    })

    return (
        <div className="bg-gray-200 text-gray-800 p-4 rounded mb-6 flex border border-gray-400 shadow-sm">
            <div className="flex-1">
                <h1 className="font-bold capitalize text-xl">{title}</h1>
                <p className="mt-3 mb-4 leading-none">{description}</p>
                <ul className="flex">
                    {starsIcon}
                </ul>
            </div>
            <div className="flex-none">
                <div className="bg-gray-800 w-12 h-12 rounded-full"></div>
            </div>
        </div>
    )
}

const Header = () => {
    return (
        <header className="w-full relative text-white"
            style={{
                minHeight: '400px'
            }}
        >
            <div
                className="absolute top-0 w-full h-full bg-center bg-no-repeat bg-cover"
                style={{
                    backgroundImage: `url('/assets/img/home-bg.png')`
                }}>

                {/* Content */}
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10 px-6">

                    {/* Left Column */}
                    <div className="md:mt-12 lg:mt-0">
                        <h1 className="text-5xl mb-8 mt-10 font-bold leading-none">Encuentra al mejor doctor para ti!</h1>
                        {/* <p className="text-3xl leading-none mb-6">Atención especializada</p> */}

                        <div className="mt-4 mb-10 lg:mb-0">
                            <Link href="/login">
                                <span className="inline-block px-4 py-2 transition duration-300 ease-in-out bg-purple-600 hover:bg-purple-800 hover:border-purple-800 border-2 border-purple-600 rounded cursor-pointer mr-4">Inicia Sesión</span>
                            </Link>
                            <Link href="/sign-up">
                                <span className="inline-block px-4 py-2 transition duration-300 ease-in-out bg-transparent border-2 border-purple-600 hover:bg-purple-800 hover:border-purple-800 rounded cursor-pointer ">Regístrate</span>
                            </Link>
                        </div>

                        {/* <p className="block my-10 text-2xl text-gray-800 font-bold leading-none">¿Qué es iHappy?</p> */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-20">
                            <AboutCard
                                title="Gran repertorio de Doctores"
                                subtitle="Dispuestos a ayudarte a ser mejor"
                                imgUrl="/assets/img/doctors.svg"
                            />
                            <AboutCard
                                title="Almacén de Informes Médicos"
                                subtitle="Capacidad para centralizar informes médicos"
                                imgUrl="/assets/img/files.svg"
                            />
                            <AboutCard
                                title="Seguridad entre doctor - paciente"
                                subtitle="Mantiene seguridad en la relación de doctor - paciente"
                                imgUrl="/assets/img/secure.svg"
                            />
                            <AboutCard
                                title="Seguimiento de Progreso"
                                subtitle="El doctor puede mantener informado al paciente con reportes"
                                imgUrl="/assets/img/progress.svg"
                            />
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col px-0 lg:px-20 mt-0 lg:mt-10 ">
                        <DoctorCard
                            title="Dr. José Silva"
                            description="Experiencia en pacientes con depresión y otros."
                            starsCount={4}
                        />
                        <DoctorCard
                            title="Dr. José Silva"
                            description="Experiencia en pacientes con depresión y otros."
                            starsCount={4}
                        />
                        <DoctorCard
                            title="Dr. José Silva"
                            description="Experiencia en pacientes con depresión y otros."
                            starsCount={4}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
