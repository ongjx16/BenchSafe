import React from "react";
import Link from 'next/link';
import Home from "../assets/Home.svg";
import Image from "next/image";
import Location from "../assets/Location.svg";
import logout1 from "../assets/logout1.svg";
import FlatBenchPress from "../images/FlatBenchPress.jpg";
import InclineBenchPress from "../images/InclineBenchPress.jpg";
import Router from "next/router";

function UserLandingPage() {
    return(
        <div className="flex flex-col h-screen justify-between w-screen">

            {/* Header design */}
            <header >
                <div className="grow-0 h-14 pt-5 flex flex-row justify-center">
                    <div>
                        <Image src={Location} alt="Location" className="m-1"width={18} height={30} />
                    </div>
                    <div>
                        <h1 className="flex justify-center">EverydayFitness Jurong</h1>
                    </div>
                </div>

                <div className="">
                    <h2 className="flex justify-center m-5">Please Select A Bench</h2>    
                </div>     
            </header>

            {/* Body design */}
            <div className="grow w-full h-full overflow-y-auto">

                <div className="flex justify-center h-full">
                    <div>
                        {/* Flat Bench */}
                        <div class="flex justify-center m-3">
                            <div
                                class="block max-w-sm rounded-lg bg-white shadow-lg">
                                <a href="#!" data-te-ripple-init data-te-ripple-color="light">
                                <Image 
                                    src={FlatBenchPress} 
                                    alt="FlatBenchPress"
                                    class="rounded-t-lg"/>
                                </a>
                                <div class="p-6">
                                <h5
                                    class="mb-2 text-xl font-medium leading-tight text-neutral-800">
                                    Bench 1
                                </h5>
                                <p class="mb-4 text-base text-neutral-600">
                                    Bench Body Length: 120cm <br></br>
                                    Machine Tilt Angle: 0 degree
                                </p>

                                <p class="mb-4 text-base text-neutral-600">
                                    Rogue’s fully updated Westside Bench is a heavy-duty juggernaut inspired by Westside Barbell’s original designs.
                                </p>
            
                                <Link href="/EnterHeight">
                                    <button className="button" onClick={(event) => { 
                                        Router.push({
                                            pathname: '/TensorFlow',
                                          }) }}
                                          >Select Bench</button>
                                </Link>                            
                                </div>
                            </div>
                        </div>
                            {/* <Image src={FlatBenchPress} alt="FlatBenchPress" className="h-auto max-w-full h-64 rounded-xl bg-white-300 shadow-xl m-2"/> */}

                        {/* Incline Bench */}
                        <div class="flex justify-center">
                            <div
                                class="block max-w-sm rounded-lg bg-white shadow-lg">
                                <a href="#!" data-te-ripple-init data-te-ripple-color="light">
                                <Image 
                                    src={InclineBenchPress} 
                                    alt="InclineBenchPress"
                                    class="rounded-t-lg"/>
                                </a>
                                <div class="p-6">
                                <h5
                                    class="mb-2 text-xl font-medium leading-tight text-neutral-800">
                                    Bench 2
                                </h5>
                                <p class="mb-4 text-base text-neutral-600">
                                    Bench Body Length: 130cm <br></br>
                                    Machine Tilt Angle: 30 degrees
                                </p>
                                <p class="mb-4 text-base text-neutral-600">
                                    Made in the USA from 3x3" 11-Gauge Steel, the Monster Westside Bench stands among the most versatile, heavy-duty, uncompromising bench racks ever built
                                </p>
                                
                                <Link href="/EnterHeight">
                                    <button className="button"
                                    onClick={(event) => { 
                                        Router.push({
                                            pathname: '/TensorFlow',
                                          }) }}
                                        >Select Bench</button>
                                </Link>                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom navigation bar design*/}
            <footer className="flex flex-row justify-center w-screen h-24">
                    <div className="flex flex-row justify-center bg-slate-100 rounded min-h-fit min-w-fit w-screen drop-shadow-md">
                        {/* Home */}
                        {/* <Link href="/LandingPage" className="flex justify-center">
                            <Image src={Home} alt="Home" width={40} height={40} />
                        </Link> */}

                        {/* Profile */}
                        <Link href="/LoginScreen" className="flex justify-center">
                            <Image src={logout1} alt="logout" width={50} height={50} />
                        </Link>
                    </div>
            </footer>
        </div>
    )
};

export default UserLandingPage;
