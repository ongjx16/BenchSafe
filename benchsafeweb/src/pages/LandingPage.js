import React from "react";
import Link from 'next/link';
import Image from "next/image";
import Home from "../assets/Home.svg";
import Location from "../assets/Location.svg";
import AddBench from "../assets/AddBench.svg";
import Profile from "../assets/Profile.svg";

function LandingPage() {
    return(
        <div className="flex flex-col h-screen justify-between ">
            <header className="grow-0 h-14 flex flex-row justify-center">
                <div>
                    <Image src={Location} alt="Location" className="m-1"width={18} height={30} />
                </div>
                <div>
                    <h1 className="flex justify-center">EverydayFitness Jurong</h1>
                </div>      
            </header>

            <div className="grow w-screen h-full overflow-y-auto">
                <div>
                    <h2 className="flex justify-center m-5">Select Bench to Use</h2>    
                </div>

                <div className="flex justify-center h-full">
                    <div>
                        {/* Flat Bench */}
                        <div>
                            <div className="w-screen h-64 rounded-xl bg-white-300 shadow-xl m-2">
                                <p className="flex flex-row justify-center">Flat bench</p>
                            </div>
                        </div>

                        {/* Incline Bench */}
                        <div>
                            <div className="w-screen h-64 rounded-xl bg-white-300 shadow-xl">
                                <p className="flex flex-row justify-center">Inclined bench</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="flex flex-row justify-center w-screen h-24">
                {/* Bottom navigation bar design*/}
                    <div className="grid grid-cols-3 bg-slate-100 rounded min-h-fit min-w-fit w-screen drop-shadow-md inline-block">
                        {/* Home */}
                        <Link href="/LandingPage" className="flex justify-center">
                            <Image src={Home} alt="Home" width={40} height={40} />
                        </Link>

                        {/* Add Bench */}
                        <Link href="/AddNewBench" className="flex justify-center">
                            <Image src={AddBench} alt="AddBench" width={120} height={120} />
                        </Link>

                        {/* Profile */}
                        <Link href="/LandingPage" className="flex justify-center">
                            <Image src={Profile} alt="Profile" width={40} height={40} />
                        </Link>
                    </div>
            </footer>
        </div>
    )
};

export default LandingPage;
