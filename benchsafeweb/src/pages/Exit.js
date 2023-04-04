import React from "react";
import Link from 'next/link';
import Image from "next/image";
import BackButton from "../assets/BackButton.svg";
import Detail from "../assets/Detail.svg";

function Exit() {

    const offRelay = async (e) => {
        //e.preventDefault();
        try {
            // const hip = router.query.hipfeetH;
            const res = await fetch(`/toggle-relay?state=off`);
            console.log(res);

        } catch (error) {
            console.log('An error occurred. Please try again later.');
            setResults([]);
        }
    };
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
                <h2>Thank you for using BenchSafe!</h2>
            </div>

            <div className="flex flex-col justify-center h-full px-6">
                <div>
                    <h2>Happy Benching!</h2>
                </div>

                <div>
                    <h3>Ensure that you are seated as close as possible to the inner edge of the seat</h3>
                </div>
                    
                </div>
            </div>

            {/* Add button */}
            <button className="button"
                    onClick={async (e) => {
                        //submit values
                        offRelay();
                        Router.push({
                            pathname: '/UserLandingPage',
                        });

                    }}
                >Exit</button>

        </div>
    </div>
    )
};

export default Exit;
