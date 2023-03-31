import React, { useState } from "react";
import Link from 'next/link';


function Directory(){

    return(
        <div className="grid grid-rows-4 h-screen w-screen">
            <div className="row-span-1 justify-center">
                <h1 className="flex justify-center">Welcome! Choose Login Option Below</h1>
            </div>
            <div className="row-span-3">
                <div className="">
                    <Link href="/AdminLandingPage">
                        <button className="button">Admin</button>
                    </Link> 
                    <Link href="/UserLandingPage">
                        <button className="button">User</button>
                    </Link>
                </div>                     
            </div>
        </div>
    )
}

export default Directory;