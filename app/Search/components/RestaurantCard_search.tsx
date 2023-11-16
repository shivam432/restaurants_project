import Link from "next/link";
import { RestaurantCardInt } from "../page";
import Price from "@/app/components/price";
import { GetAverageRate } from "@/app/AverageRating";
import Stars from "@/app/components/Stars";

export default function RestaurantCardSearch({restaurants}:{restaurants:RestaurantCardInt}){

  const rev_val=()=>{
    const res= GetAverageRate(restaurants.Reviews)
    console.log(res)

    if(res>4){
      return "Awesome"
    }else if(res<=4 && res>3){
      return "Good"
    }else if(res<=3 && res>1){
      return "Average"
    }else{
      return ""
    }
  }
    return (
        
    <div className="border-b flex pb-5">
    <img
      src={restaurants.main_image}
      alt=""
      className="w-44 rounded"
    />
    <div className="pl-5 text-black ">
      <h2 className="text-3xl font-medium">{restaurants.name}</h2>
      <div className="flex items-start font-bold">
        <div className="flex mb-2"><Stars review={restaurants.Reviews}/></div>
        <p className="ml-2 text-sm">{rev_val()}</p>
      </div>
      <div className="mb-9">
        <div className="font-light flex text-black">
          <Price price={restaurants.price}/>
          <p className="mr-4 capitalize">{restaurants.cuisine.name}</p>
          <p className="mr-4 capitalize">{restaurants.location.name}</p>
        </div>
      </div>
      <div className="text-red-600">
      <Link href={`/restuarant/${restaurants.slug}`}>View more information</Link>
      </div>
    </div>
  </div>
  )
}

