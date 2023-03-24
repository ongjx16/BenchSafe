import React from "react";
import Link from 'next/link';
import Image from "next/image";
import BackButton from "../assets/BackButton.svg";
import Detail from "../assets/Detail.svg";
import LaserMarkingGif from "../assets/LaserMarkingGif.gif";

function LaserMarking() {
    return(
    <div className="flex flex-row justify-center">
      <div className="auth-form-container">
        <div>

          {/* Header */}
          <div className="grid grid-cols-6">
            <div className="flex justify-self-start col-span-1">
                <Link href="/LandingPage">
                    <Image src={BackButton} alt="BackButton" className="m-1"width={40} height={40} />
                </Link>
            </div>
            
            <h1 className="flex justify-center col-span-4 py-2">Align The Bench!</h1>

            <div className="flex justify-self-end col-span-1">
                <Image src={Detail} alt="Detail" className="m-1"width={40} height={40} />
            </div>
          </div>
          
          {/* gif */}
          <div>
            <Image src={LaserMarkingGif} alt="LaserMarking" className="m-1 w-screen h-screen" />
          </div>
        </div>

        {/* Add button */}
        <Link href="/Exit">
            <button className="button">Done</button>
        </Link>

      </div>
    </div>
  )
};

export default LaserMarking;
