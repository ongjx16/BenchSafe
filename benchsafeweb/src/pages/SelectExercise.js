import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import BackButton from "../assets/BackButton.svg";
import Detail from "../assets/Detail.svg";
import FlatBenchPress from "../assets/FlatBenchPress.svg";
import FlatDeactivated from "../assets/FlatDeactivated.svg";
import InclineBenchPress from "../assets/InclineBenchPress.svg";
import InclinedActivated from "../assets/InclinedActivated.svg";
import { useRouter } from 'next/router'
import Router from "next/router";

function SelectExercise() {

    const router = useRouter();
    console.log(router.query.hipfeetH)
    const [exercise, setExercise] = useState('')
    const [results, setResults] = useState([]);

    const calculateFlat = async (e) => {
        //e.preventDefault();
        try {
            // const hip = router.query.hipfeetH;
            //const hip = 1.2;
            const res = await fetch(`/angle-for-flat-bench?nipple_height=${router.query.hipfeetH}`);
            //const res = await fetch(`http://172.20.10.5:5000/angle-for-flat-bench?nipple_height=1.2`);

            // const data = await res.json();
            // setResults(data.results);
            console.log(res);

        } catch (error) {
            console.log('An error occurred. Please try again later.');
            setResults([]);
        }
    };

    return (
        <div className="flex flex-row justify-center w-screen">
            <div className="auth-form-container">
                <div>

                    {/* Header */}
                    <div className="grid grid-cols-4">
                        <div className="flex justify-self-start col-span-1">
                            <Image src={BackButton} alt="BackButton" className="m-1" width={40} height={40} onClick={() => router.back()} />
                        </div>

                        <h1 className="flex justify-center col-span-2 py-2">Bench 1</h1>

                        <div className="flex justify-self-end col-span-1">
                            <Image src={Detail} alt="Detail" className="m-1" width={40} height={40} />
                        </div>
                    </div>

                    {/* Bench information */}
                    <div className="my-5">
                        <h2>Select Your Exercise</h2>
                    </div>
                    <div className="flex flex-row items-center justify-center mx-10">
                        <div>
                            {exercise == "flat" ? (
                                <Image src={FlatBenchPress} alt="FlatBenchPress"
                                    className="h-38"
                                />)
                                :
                                (
                                    <Image src={FlatDeactivated} alt="FlatBenchPress"
                                        className="h-38"
                                        onClick={(e) => {
                                            setExercise("flat");
                                        }} />
                                )}
                        </div>
                        <div>
                            {exercise == "inclined" ? (
                                <Image src={InclinedActivated} alt="InclineBenchPress" className="h-60"
                                />
                            ) : (
                                <Image src={InclineBenchPress} alt="InclineBenchPress" className=" h-60"
                                    onClick={(e) => {
                                        setExercise("inclined");
                                    }}
                                />
                            )}
                        </div>



                    </div>
                </div>

                {/* Add button */}
                const onRelay = async (e) => {
        //e.preventDefault();
        try {
            // const hip = router.query.hipfeetH;
            const res = await fetch(`/toggle-relay?state=on`);
            //const res = await fetch(`http://172.20.10.5:5000/angle-for-flat-bench?nipple_height=1.2`);

            // const data = await res.json();
            // setResults(data.results);
            console.log(res);

        } catch (error) {
            console.log('An error occurred. Please try again later.');
            setResults([]);
        }
    };

            </div>
        </div>
    )
};

export default SelectExercise;
