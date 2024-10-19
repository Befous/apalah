'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { generatePagination } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
 
export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const allPages = generatePagination(currentPage, totalPages)
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }
 
    return (
        <>    
            <div className="inline-flex">
                
                <PaginationArrow
                    direction="first"
                    href={createPageURL(1)}
                    isDisabled={currentPage <= 1}
                />
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />

                <div className="flex -space-x-px">
                {allPages.map((page, index) => {
                    let position: 'first' | 'last' | 'single' | 'middle' | undefined
        
                    if (index === 0) position = 'first'
                    if (index === allPages.length - 1) position = 'last'
                    if (allPages.length === 1) position = 'single'
        
                    return (
                    <PaginationNumber
                        key={page}
                        href={createPageURL(page)}
                        page={page}
                        position={position}
                        isActive={currentPage === page}
                    />
                    )
                })}
                </div>

                <PaginationArrow
                    direction="right"
                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
                <PaginationArrow
                    direction="last"
                    href={createPageURL(totalPages)}
                    isDisabled={currentPage >= totalPages}
                />

            </div>
        </>
    )
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string
    href: string
    position?: 'first' | 'last' | 'middle' | 'single'
    isActive: boolean
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center text-sm border',
        {
            'z-10 bg-blue-600 border-blue-600 text-white': isActive,
            'hover:bg-gray-100': !isActive && position !== 'middle',
            'text-gray-300': position === 'middle',
        },
    )

    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
        {page}
        </Link>
    )
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}: {
    href: string
    direction: 'left' | 'right' | 'first' | 'last'
    isDisabled?: boolean
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center border',
        {
            'pointer-events-none text-gray-300': isDisabled,
            'hover:bg-gray-100': !isDisabled,
            'rounded-l-md': direction === 'first',
            'rounded-r-md': direction === 'last',
        },
    )
  
    let icon
    if (direction === 'left') {
        icon = <FontAwesomeIcon icon={faChevronLeft} />
    } else if (direction === 'right') {
        icon = <FontAwesomeIcon icon={faChevronRight} />
    } else if (direction === 'first') {
        icon = <FontAwesomeIcon icon={faAngleDoubleLeft} />
    } else {
        icon = <FontAwesomeIcon icon={faAngleDoubleRight} />
    }
  
    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    )
}