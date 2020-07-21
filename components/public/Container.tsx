import React from 'react'

type ContainerProps = {
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
