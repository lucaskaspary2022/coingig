"use client";

import React, { useState } from 'react';

const Requirements = () => {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");

    const handleSubmit = async () => {
        
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <p className='text-[18px] wrap'>Describe your project's <bold>3</bold> most important requirements</p>
            <form className="flex flex-col items-center p-5 space-y-4" onSubmit={handleSubmit}>
                <div class="relative mb-3" data-te-input-wrapper-init>
                    <textarea
                        class="bg-white focus-red peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Your message"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                    >
                    </textarea>
                        
                    <label
                        for="exampleFormControlTextarea1"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-red-900 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Requirement 1</label
                    >
                </div>
                <div class="relative mb-3 w-full" data-te-input-wrapper-init>
                    <textarea
                        class="bg-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Your message"
                        value={input2}
                        onChange={(e) => setInput2(e.target.value)}
                    >
                    </textarea>
                        
                    <label
                        for="exampleFormControlTextarea1"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-red-900 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Requirement 2</label
                    >
                </div>
                <div class="relative mb-3" data-te-input-wrapper-init>
                    <textarea
                        class="bg-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Your message"
                        value={input3}
                        onChange={(e) => setInput3(e.target.value)}
                    >
                    </textarea>
                        
                    <label
                        for="exampleFormControlTextarea1"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-red-900 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                       >Requirement 3</label
                    >
                </div>
                <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full">Submit</button>
                {/* <button className="p-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button> */}
            </form>
        </div>
    )
}

export default Requirements