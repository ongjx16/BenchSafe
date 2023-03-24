import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../assets/BackButton.svg";
import Detail from "../assets/Detail.svg";
import Image from "next/image";
import Router from "next/router";

function EnterHeight() {
    const router = useRouter()
    const pHeight = 156;
    const [height, setHeight] = useState(null)
    const [finalH, setFinalH] = useState(null);

    useEffect(() => {
        async function calcHeight() {
            console.log(height);
            const n = height / (router.query.ankleH - router.query.eyesH);
            const ans = (n * (router.query.ankleH - router.query.shoulderH)) - 20;
            const calc = await setFinalH(ans);

            console.log("finalH")
            console.log(finalH)

        }
        calcHeight();
    }, [height])

    return (
        <div className="flex flex-col min-h-screen">

            {/* Header design */}
            <header >
                <div className="grow-0 h-14 flex flex-row mt-auto py-5 justify-between mx-5">
                    <div className="flex justify-self-start col-span-1">
                        <Link href="/LandingPage">
                            <Image src={BackButton} alt="BackButton" className="m-1" width={40} height={40} />
                        </Link>
                    </div>

                    <h1 className="flex justify-center col-span-2 py-2">Bench 1</h1>

                    <div className="flex justify-self-end col-span-1">
                        <Image src={Detail} alt="Detail" className="m-1" width={40} height={40} />
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="flex justify-center text-center mx-5">Enter Your Height.</h3>
                </div>
            </header>

            <input
                onChange={(event) => { setHeight(event.target.value); }}
                type="Bench Name"
                placeholder="Height (in cm)"
                id="Bench Name"
                name="Bench Name"
                className="mx-5" />

            <footer className="mt-auto mx-5">
                    <button
                        className="button mb-5"
                        onClick={(e) => {
                            //submit values
                            // <Link 
                            Router.push({
                                pathname: '/SelectExercise',
                                query: { nipHipH: finalH },
                            })
                        }}
                    >Next</button>
            </footer>
        </div>
    )
};

export default EnterHeight;