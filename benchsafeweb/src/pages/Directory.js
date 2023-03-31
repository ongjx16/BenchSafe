import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";


function Directory(){

    return(
        <div className="flex flex-row justify-center w-screen">
            <div className="auth-form-container w-full">
                    {/* Header */}
                    <div>
                        <h1 className="my-3">Welcome Back</h1>
                        <h2>How You Would Like To Login?</h2>
                    </div>
                    
                    {/* Login options */}
                    <div className="grid grid-rows-2">

                        {/* admin */}
                        <div>
                            
                        </div>

                        {/* user */}
                        <div>

                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Directory;