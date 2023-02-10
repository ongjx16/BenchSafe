import Button from "@/components/button"
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>
        <h1>
          BenchSafe App
        </h1>
        <h2>
          BenchSafe App
        </h2>
        <h3>
          BenchSafe App
        </h3>
        <text>
          BenchSafe App
        </text>
        <div className = "w-screen flex justify-center" >
          <Button text="niunj"/>
        </div>
        <div className = "text-red-500 flex flex-col">
          <Link href="/LoginScreen">Login Page</Link>
          <Link href="/TensorFlow">Tensor Flow Page</Link>
        </div>
      </div>
    </>
  )
}
