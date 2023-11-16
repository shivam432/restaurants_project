"use client"; 

import Image from "next/image"
import fullStar from "../../icons/full-star.png"
import halfStar from "../../icons/half-star.png"
import emptyStar from "../../icons/empty-star.png"
import { Review } from "@prisma/client"
import { GetAverageRate } from "../AverageRating"
import * as math from 'mathjs'
import { StaticImport } from "next/dist/shared/lib/get-img-props"


export default function Stars({review,rating}:{review:Review[],rating?:number}){

    var getRateVal=rating || GetAverageRate(review);

    const getStars=()=>{
        
        const stars:any=[];

        for(var i=0; i<5;i++){
            const diff=parseFloat((getRateVal-i).toFixed(1))
            if(diff>=1){
                stars.push(fullStar)
            }else if(diff<1 && diff>0){
                if(diff<=0.2) stars.push(emptyStar)
                else if(diff>0.2 && diff<=0.6) stars.push(halfStar)
                else stars.push(fullStar)
            }else{
                stars.push(emptyStar)
            }
        }

        return stars.map((star)=>{
            return <Image src={star} alt="" className="w-4 h-4 mr-1"/>
        })
    }
    
    
    return (
        <div className="flex items-center">
            {getStars()}
        </div>
    )
}