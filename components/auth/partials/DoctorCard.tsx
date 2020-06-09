import React from 'react'
import Link from 'next/link'

interface DoctorCardProps {
    firstName: string
    lastName: string
    username: string
    specialities: string
    avatar: string
    slug: string
}

const DoctorCard = ({
    firstName,
    lastName,
    username,
    specialities,
    avatar,
    slug,
}: DoctorCardProps) => {
    return (
        <div className="w-full bg-white rounded shadow-md border border-gray-300">
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

            <div className="w-full bg-gray-100 flex items-center justify-center py-2 border-t border-gray-300">
                <Link href={`/reviews/${slug}`}>
                    <a className="text-center px-3 py-1 text-sm bg-purple-700 rounded text-white">Ver Perfil</a>
                </Link>
            </div>
        </div>
    )
}

export default DoctorCard
