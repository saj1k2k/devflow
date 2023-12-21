'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {formUrlQuery, removeKeysFromQuery} from "@/lib/utils";

interface CustomInputProps{
    route: string;
    iconPosition: string;
    imgSrc: string;
    placeholder: string;
    otherClasses: string;
}

const LocalSearchbar = ({
    route,
    iconPosition,
    imgSrc,
    placeholder,
    otherClasses
}: CustomInputProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get('q')

    const [search, setSearch] = useState(query || '')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(search) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'q',
                    value: search
                })
                router.push(newUrl, {scroll: false})
            } else {
                 if(pathname === route) {
                     const newUrl = removeKeysFromQuery({
                         params: searchParams.toString(),
                         keysToRemove: ['q']
                     })
                     router.push(newUrl, {scroll: false})
                 }


            }

        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search, route, router, query, searchParams, pathname])
    return (
        <div className={`grow items-center gap-4 rounded-[10px] px-4 background-light800_darkgradient flex min-h-[56px] ${otherClasses}`}>

            {iconPosition === 'left' && (
                <Image src={imgSrc}
                       alt='search icon'
                       className='cursor-pointer'
                       width={24} height={24}/>
            )}

            <Input type='text'
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
               className='shadow-none paragraph-regular no-focus placeholder
                text-dark400_light700 bg-transparent border-none outline-none'
            />

            {iconPosition === 'right' && (
                <Image src={imgSrc}
                       alt='search icon'
                       className='cursor-pointer'
                       width={24} height={24}/>
            )}
        </div>
    );
};

export default LocalSearchbar;