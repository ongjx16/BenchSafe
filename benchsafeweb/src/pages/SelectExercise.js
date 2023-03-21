import React from "react";
import Link from 'next/link';
import Image from "next/image";
import BackButton from "../assets/BackButton.svg";
import Detail from "../assets/Detail.svg";
import FlatBenchPress from "../assets/FlatBenchPress.svg";
import InclineBenchPress from "../assets/InclineBenchPress.svg";

function SelectExercise() {
    return(
        <div className="flex flex-row justify-center">
        <div className="auth-form-container">
            <div>

            {/* Header */}
            <div className="grid grid-cols-4">
                <div className="flex justify-self-start col-span-1">
                    <Link href="/LandingPage">
                        <Image src={BackButton} alt="BackButton" className="m-1"width={40} height={40} />
                    </Link>
                </div>
                
                <h1 className="flex justify-center col-span-2 py-2">Bench 1</h1>

                <div className="flex justify-self-end col-span-1">
                    <Image src={Detail} alt="Detail" className="m-1"width={40} height={40} />
                </div>
            </div>
            
            {/* Bench information */}
            <div className="my-5">
                <h2>Select Your Exercise</h2>
            </div>
                <div className="flex flex-row">
                    <Image src={FlatBenchPress} alt="FlatBenchPress" className=""/>
                    <Image src={InclineBenchPress} alt="InclineBenchPress" className="m-1"/>
                </div>
            </div>

            {/* Add button */}
            <Link href="/LaserMarking">
                <button className="button">Next</button>
            </Link>

        </div>
        </div>
    )
};

export default SelectExercise;
