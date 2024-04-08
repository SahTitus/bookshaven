import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { clientRoutes } from '@lib/routes'
import { siteName } from '@lib/constants'

const Logo = ({width, height}) => {
    return (
        <Link href='/'>
            <Image
                className="rounded w-auto h-auto"
                src={clientRoutes.logo}
                alt={`${siteName} logo`}
                width={width}
                height={height}
                loading='lazy'
                as="image"
            />
        </Link>
    )
}

export default Logo