import React from 'react'
import Link from 'next/link'

interface DoctorCardProps {
    firstName: string
    lastName: string
    username: string
    specialities: Array<any>
    avatar: string
    role?: any
    slug: string
}

const DoctorCard = ({
    firstName,
    lastName,
    username,
    specialities,
    role,
    avatar,
    slug,
}: DoctorCardProps) => {
    return (
        <div className="relative w-full bg-white rounded shadow-md border border-gray-300">
            {/* Avatar */}
            <div className="px-4 pt-4">
                <div className="mx-auto bg-purple-700 w-16 h-16 rounded-full overflow-hidden flex justify-center items-center">
                    <img src={avatar} className="w-full h-full object-cover" alt={`${firstName} ${lastName}`} />
                </div>
            </div>

            {/* Name */}
            <div className="py-2 px-4">
                <h1 className="truncate font-bold capitalize text-lg w-full text-center leading-none mb-2">{firstName || username} {lastName}</h1>
                <p className="truncate text-sm text-gray-500 text-center leading-none">@{username}</p>
            </div>

            {/* Specialities */}
            <div className="flex items-start justify-center flex-col px-4 my-4">
                {specialities.map((elemen) => (
                    <span key={elemen.slug} className="px-2 py-1 text-xs bg-purple-200 mb-2 rounded capitalize border border-purple-300">{elemen.name}</span>
                ))}
            </div>

            {/* Tag role */}
            {role && <div className="absolute right-0 top-0 mt-4 -mr-2 rounded bg-purple-200 px-2 py-1 shadow capitalize border border-purple-300">
                {role.public_name}
            </div>}

            {/* Btn view profile */}
            <div className="w-full bg-gray-100 flex items-center justify-center py-2 border-t border-gray-300 px-4">
                <Link href={`/reviews/${slug}`}>
                    <a className="text-center px-3 py-1 text-sm bg-purple-700 rounded text-white">Ver Perfil</a>
                </Link>
            </div>
        </div>
    )
}

export default DoctorCard
