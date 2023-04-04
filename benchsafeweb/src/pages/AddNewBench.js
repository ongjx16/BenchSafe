import React from "react";
import Link from 'next/link';
import Image from "next/image";
import BackButton from "../assets/BackButton.svg";
import Detail from "../assets/Detail.svg";
import Router from "next/router";
import { useRouter } from "next/router";

function AddNewBench() {
  const router = useRouter()

  const [benchLength, setBenchLength] = useState("");
  const [benchAngle, setBenchAngle] = useState("");

  const submitJson = async (e) => {
    try {
      const payload = { bench_length: benchLength, angle_between_flat_bench_and_slope: benchAngle };
      const queryString = new URLSearchParams(payload).toString();

      const response = await fetch(`/update-json?${queryString}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response);

    } catch (error) {
      console.log('An error occurred. Please try again later.');
      setResults([]);
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="auth-form-container">
        <div>

          {/* Header */}
          <div className="grid grid-cols-4">
            <div className="flex justify-self-start col-span-1">
              <Image src={BackButton} alt="BackButton" className="m-1" width={40} height={40} onClick={() => router.back()} />
            </div>

            <h1 className="flex justify-center col-span-2 py-2">Add New Bench</h1>

            <div className="flex justify-self-end col-span-1">
              <Image src={Detail} alt="Detail" className="m-1" width={40} height={40} />
            </div>
          </div>

          {/* Bench information */}

          {/* Yet to add icons */}
          <div className="my-5">
            <h2>Enter Bench Details</h2>
          </div>
          <form
            className="addbench-form">

            <input
              // onChange={(event) => {setBenchName(event.target.value);}}
              type="Bench Name"
              placeholder="Bench Name"
              id="Bench Name"
              name="Bench Name" />

            <input
              onChange={(event) => { setBenchLength(event.target.value); }}
              type="Bench Body Length (in cm)"
              placeholder="Bench Body Length (in cm)"
              id="Bench Body Length (in cm)"
              name="Bench Body Length (in cm)" />

            <input
              onChange={(event) => { setBenchAngle(event.target.value); }}
              type="Machine Tilt Angle (in degrees)"
              placeholder="Machine Tilt Angle (in degrees)"
              id="Machine Tilt Angle (in degrees)"
              name="Machine Tilt Angle (in degrees)" />

            <input
              // onChange={(event) => {addDescription(event.target.value);}}
              type="Add Description"
              placeholder="Add Description"
              id="Add Description"
              name="Add Description" /> 

          </form>
        </div>

        <button className="button"
          onClick={async (e) => {
            //submit values
            submitJson();

            Router.push({
              pathname: '/AdminLandingPage',
            });

          }}
        >Add</button>

      </div>
    </div>
  )
};

export default AddNewBench;
