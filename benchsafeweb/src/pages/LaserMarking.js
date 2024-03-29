import React from "react";
import Link from 'next/link';
import Image from "next/image";
import BackButton from "../assets/BackButton.svg";
import Detail from "../assets/Detail.svg";
import LaserMarkingGif from "../assets/LaserMarkingGif.gif";
import Router from "next/router";

function LaserMarking() {
  const offRelay = async (e) => {
    //e.preventDefault();
    try {
      // const hip = router.query.hipfeetH;
      const res = await fetch(`api/proxy?endpoint=toggle-relay&state=off`);
      console.log(res);

    } catch (error) {
      console.log('An error occurred. Please try again later.');
      setResults([]);
    }
  };

return (
  <div className="flex flex-row justify-center px-5">
    <div className="auth-form-container">
      <div>

        {/* Header */}
        <div className="grid grid-cols-6 mt-5">
          <div className="flex justify-self-start col-span-1">
            <Link href="/EnterHeight">
              <Image src={BackButton} alt="BackButton" className="m-1" width={40} height={40} />
            </Link>
          </div>

          <h1 className="flex justify-center col-span-4 py-2">Align The Bench!</h1>

          <div className="flex justify-self-end col-span-1">
            <Image src={Detail} alt="Detail" className="m-1" width={40} height={40} />
          </div>
        </div>

        {/* gif */}
        <div>
          <Image src={LaserMarkingGif} alt="LaserMarking" className="m-1 w-screen h-screen" />
        </div>
      </div>

      {/* Add button */}

      <button className="button" onClick={async (e) => {
        offRelay();
        Router.push({
          pathname: '/Exit',
        });

      }}>Done</button>

    </div>
  </div>
)
};

export default LaserMarking;
