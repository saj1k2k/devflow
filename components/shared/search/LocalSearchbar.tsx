'use client'
import React from 'react';
import Image from "next/image";
import {Input} from "@/components/ui/input";

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
    return (
        <div className={`grow items-center gap-4 rounded-[10px] px-4 background-light800_darkgradient flex min-h-[56px] ${otherClasses}`}>

            {iconPosition === 'left' && (
                <Image src={imgSrc}
                       alt='search icon'
                       className='cursor-pointer'
                       width={24} height={24}/>
            )}

            <Input type='text'
                placeholder={placeholder}
               className='shadow-none paragraph-regular no-focus placeholder
                background-light800_darkgradient border-none outline-none'
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