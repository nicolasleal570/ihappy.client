import React from 'react'

interface ContainerProps {
    children: React.ReactChild | Array<React.ReactChild>
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="container mx-auto">
            {children}
        </div>
    )
}

export default Container
