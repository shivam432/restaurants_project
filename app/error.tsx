"use client"

import errorImage from "../icons/error.png"
import Image from "next/image"

export default function Error({error}:{error:Error}){
    return (
        <div className="h-screen bg-gray-400 flex flex-col justify-center items-center text-black">
            <Image src={errorImage} alt="Error Image" className="w-56 mb-8"/>
            <div className="bg-white px-9 py-14 shadow rounded">
                <h3 className="text-3xl font-bold">Well, This is embrassing</h3>
                <p className="text-black font-bold">{error.message}</p>
                <p className="mt-6 text-sm font-light">Error Code:400... Page not Found!!!</p>
            </div>
        </div>
    )
}