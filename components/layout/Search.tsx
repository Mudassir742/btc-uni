import { Input } from '@/components/ui/Input'
import Image from 'next/image'
import React, { FC, HTMLAttributes, HTMLInputTypeAttribute, useState } from 'react'
import search from '@/public/search.svg'
import { cn } from '@/utils/shadcn'

interface IProps extends HTMLAttributes<HTMLInputElement> {
    val?: string
    wrapperClassName?: string
}

const Search: FC<IProps> = ({ placeholder, wrapperClassName, val, className, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className='flex px-5 rounded-full border border-border bg-themecolor-50 text-secondary'>
            <Image src={search} alt='search icon' width={25} height={25} color='black' />
            <Input
                value={val}
                type='search'
                className={cn(['bg-transparent h-12 py-0', className], {})}
                placeholder='Search...'
                autoComplete="off"
                onFocus={handleInputFocus} // Handle focus event
                onBlur={handleInputBlur}   // Handle blur event
                {...props}
                autoFocus={false}
            />
        </div>
    )
}

export default Search
