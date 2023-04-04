import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import Admin from "../assets/Admin.svg";
import User from "../assets/User.svg";
import Router from "next/router";


function Directory(){

    return(
        <div className="flex flex-row justify-center w-screen">
            <div className="flex flex-col justify-center text-center w-full">
                    {/* Header */}
                    <div className="my-2">
                        <h1 className="my-3">Welcome Back</h1>
                        <h2>Who are you logging in as?</h2>
                    </div>
                    
                    {/* Login options */}
                    <div className="flex flex-row mt-10 h-40">

                        {/* admin */}
                        <div 
                        className="mx-5 h-full flex flex-col" 
                        onClick={async (e) => {
                            Router.push({
                              pathname: '/AdminLandingPage',
                            });
                          }}>
                              <div class="overflow-hidden rounded-xl bg-white shadow-2xl">
                                <Image src={Admin} alt="Admin" class="h-2/3" />
                                <div class="p-2">
                                <h1 class="text-large m-auto">Admin</h1>
                                </div>
                            </div>
                        </div>

                        {/* user */}
                        <div 
                        className="mx-5 h-full flex flex-col"
                        onClick={async (e) => {
                            Router.push({
                              pathname: '/UserLandingPage',
                            });
                          }}>
                              <div class="overflow-hidden rounded-xl bg-white shadow-2xl">
                                <Image src={User} alt="User" class="h-2/3" />
                                <div class="p-2">
                                <h1 class="text-large">User</h1>
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