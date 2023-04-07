import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import BackButton from "../assets/BackButton.svg";
import Detail from "../assets/Detail.svg";
import FlatBenchPress from "../assets/FlatBenchPress.svg";
import FlatBenchImg from "../assets/FlatBenchImg.svg"
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
        // e.preventDefault();
        try {
            // const hip = router.query.hipfeetH;
            //const hip = 1.2;
            const res = await fetch(`/api/proxy?endpoint=angle-for-flat-bench&nipple_height=${router.query.hipfeetH}`);
            //const res = await fetch(`http://172.20.10.5:5000/angle-for-flat-bench?nipple_height=1.2`);

            // const data = await res.json();
            // setResults(data.results);
            console.log(res);

        } catch (error) {
            console.log('An error occurred. Please try again later.');
            setResults([]);
        }
    };

    const calculateInclined = async (e) => {
        try {
            const res = await fetch(`api/proxy?endpoint=angle-for-inclined-bench&nipple_height=${router.query.hipfeetH}`);
            console.log(res);
        } catch (error) {
            console.log('An error occurred. Please try again later.');
            setResults([]);
        }
    };


    return (
        <div className="flex flex-row justify-center w-screen px-5">
            <div className="auth-form-container">
                <div>

                    {/* Header */}
                    <div className="grid grid-cols-4 mt-5">
                        <div className=" justify-self-start col-span-1">
                            <Image src={BackButton} alt="BackButton" className="m-1" width={40} height={40} onClick={() => router.back()} />
                        </div>

                        <h1 className="flex justify-center col-span-2 py-2">Bench 1</h1>

                        <div className="justify-self-end col-span-1">
                            <Image src={Detail} alt="Detail" className="m-1" width={40} height={40} />
                        </div>
                    </div>

                    {/* Bench information */}
                    <div className="my-5">
                        <h2>Select Your Exercise</h2>
                    </div>
                    <div className="flex flex-row items-center mx-5 justify-between">

                        {exercise == "flat" ? (
                            <div className="items-center flex justify-center flex-col rounded-3xl h-36 w-36 drop-shadow-lg bg-white p-4 pt-8 outline outline-1 outline-blue-600 mr-3" >
                                <text className="text-xs">Flat Bench Press</text>
                                <Image src={FlatBenchImg} alt="FlatBenchPress"
                                    className="h-38 mx-5"
                                /> </div>)
                            :
                            (
                                <div className="items-center flex justify-center flex-col rounded-3xl h-36 w-36 mr-3 drop-shadow-lg bg-white p-4 pt-8"
                                    onClick={(e) => {
                                        //submit values
                                        setExercise("flat")

                                    }}>
                                    <text className="text-xs">Flat Bench Press</text>
                                    <Image src={FlatBenchImg} alt="FlatBenchPress"
                                        className="h-38 mx-5"
                                    /> </div>
                            )}


                        {exercise == "inclined" ? (
                            <div className="items-center flex justify-center flex-col rounded-3xl h-36 w-36 drop-shadow-lg bg-white p-4 pt-8 outline outline-1 outline-blue-600 ml-3 " >
                                <text className="text-xs">Inclined Bench Press</text>
                                <Image src={FlatBenchImg} alt="FlatBenchPress"
                                    className="h-38 mx-5"
                                /></div>
                        ) : (
                            <div className="items-center flex justify-center flex-col rounded-3xl h-36 w-36 ml-3 drop-shadow-lg bg-white p-4 pt-8" onClick={(e) => {
                                //submit values
                                setExercise("inclined")

                            }}>
                                <text className="text-xs">Inclined Bench Press</text>
                                <Image src={FlatBenchImg} alt="FlatBenchPress"
                                    className="h-38 mx-5"
                                /></div>
                        )}

                    </div>
                </div>

                {/* Add button */}
                <button className="button"
                    onClick={async (e) => {
                        console.log(exercise);
                        //submit values
                        if (exercise == "flat") {
                            await calculateFlat();
                        }
                        else if (exercise == "inclined") {
                            //calculate inclined
                            await calculateInclined();
                        }

                        Router.push({
                            pathname: '/LaserMarking',
                        });

                    }}
                >Next</button>

            </div>
        </div>
    )
};

export default SelectExercise;
