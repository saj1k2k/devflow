import React from 'react';
import Link from "next/link";
import Image from "next/image";
import RenderTag from "@/components/shared/RenderTag";

const RightSidebar = () => {
    const hotQuestions = [
        {_id: '1', title: 'Would it be appropriate to point out an error in another paper during a referee report?'},
        {_id: '2', title: 'How can an airconditioning machine exist?'},
        {_id: '3', title: 'Interrogated every time crossing UK Border as citizen'},
        {_id: '4', title: 'Low digit addition generator'},
        {_id: '5', title: 'What is an example of 3 numbers that do not make up a vector?'}
    ]
    const popularTags = [
        {_id: '1', name: 'javascript', totalQuestions: 5},
        {_id: '2', name: 'java', totalQuestions: 25},
        {_id: '3', name: 'vue', totalQuestions: 1},
        {_id: '4', name: 'redux', totalQuestions: 67},
        {_id: '5', name: 'react', totalQuestions: 2},

    ]
    return (
        <section className="background-light900_dark200 light-border
        sticky right-0 top-0 flex h-screen flex-col
         overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none
        max-xl:hidden w-[350px] custom-scrollbar">
            <div>
                <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
                <div className='mt-7 flex w-full flex-col gap-[30px]'>
                    {hotQuestions.map((item) => (
                        <Link href={`/questions/${item._id}`}
                              key={item._id}
                              className='flex cursor-pointer items-center justify-between gap-7'
                        >
                            <p className='body-medium text-dark500_light700'>{item.title}</p>
                            <Image src='/assets/icons/chevron-right.svg' alt='chevron right' width={20} height={20}
                                className='invert-colors'
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <div className='mt-16'>
                <h3 className='h3-bold text-dark-200_light900'>Popular Tags</h3>
                <div className='mt-7 flex flex-col gap-4'>
                    {popularTags.map((tag) => (
                        <RenderTag
                            key={tag._id}
                            _id={tag._id}
                            name={tag.name}
                            totalQuestions={tag.totalQuestions}
                            showCount
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RightSidebar;