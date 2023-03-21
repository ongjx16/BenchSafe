import React from "react";
import Link from 'next/link';
import Image from "next/image";
import BackButton from "../assets/BackButton.svg";
import Detail from "../assets/Detail.svg";
import BenchName from "../assets/BenchName.svg";
import BenchBodyLength from "../assets/BenchBodyLength.svg";
import machineTiltAngle from "../assets/MachineTiltAngle.svg";


function AddNewBranch() {

    // const [benchName, setBenchName] = useState("");
    // const [benchBodyLength, setBenchBodyLength] = useState("");
    // const [machineTiltAngle, setMachineTiltAngle] = useState("");

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
            
            <h1 className="flex justify-center col-span-2 py-2">Add New Bench</h1>

            <div className="flex justify-self-end col-span-1">
                <Image src={Detail} alt="Detail" className="m-1"width={40} height={40} />
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
            onChange={(event) => {setBenchName(event.target.value);}}
            type = "Bench Name" 
            placeholder="Bench Name" 
            id="Bench Name" 
            name="Bench Name"/>

            <input 
              onChange={(event) => {setBenchBodyLength(event.target.value);}}
              type = "Bench Body Length (in cm)" 
              placeholder="Bench Body Length (in cm)" 
              id="Bench Body Length (in cm)" 
              name="Bench Body Length (in cm)"/>

            <input 
              onChange={(event) => {setMachineTiltAngle(event.target.value);}}
              type = "Machine Tilt Angle (in degrees)" 
              placeholder="Machine Tilt Angle (in degrees)" 
              id="Machine Tilt Angle (in degrees)" 
              name="Machine Tilt Angle (in degrees)"/>

          </form>
        </div>

        {/* Add button */}
        <Link href="/LandingPage">
            <button className="button">Add</button>
        </Link>

      </div>
    </div>
  )
};

export default AddNewBranch;
