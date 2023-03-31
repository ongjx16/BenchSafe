import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import Admin from "../assets/Admin.svg";
import User from "../assets/User.svg";


function Directory(){

    return(
        <div className="flex flex-row justify-center w-screen">
            <div className="flex flex-col justify-center text-center w-full">
                    {/* Header */}
                    <div className="my-2">
                        <h1 className="my-3">Welcome Back</h1>
                        <h2>How You Would Like To Login?</h2>
                    </div>
                    
                    {/* Login options */}
                    <div className="grid grid-rows-2 h-screen">

                        {/* admin */}
                        <div className="row-start-1 row-span-1">
                              <div class="overflow-hidden rounded-xl bg-white shadow-2xl">
                                <Image src={Admin} alt="Admin" class="h-auto w-full" />
                                <div class="p-5">
                                <h1 class="text-large mb-5">Admin</h1>
                                <Link href="/AdminLandingPage">
                                    <button class="w-full rounded-md py-2 text-white">Login</button>
                                </Link>
                                </div>
                            </div>
                        </div>

                        {/* user */}
                        <div className="row-start-2 row-span-1">
                              <div class="overflow-hidden rounded-xl bg-white shadow-2xl">
                                <Image src={User} alt="User" class="h- w-full" />
                                <div class="p-5">
                                <h1 class="text-large mb-5">User</h1>
                                <Link href="/UserLandingPage">
                                    <button class="w-full rounded-md py-2 text-white">Login</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Directory;

{/* <Image src={User} alt="User"/> */}