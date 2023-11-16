import Link from "next/link"
import { RestaurantTypeCard } from "../page"
import Price from "./price"
import Stars from "./Stars"

interface Props{
    restuarant:RestaurantTypeCard
}


export default function RestaurantCard({restuarant}:Props){
    return ( 
    
    <Link href={`/restuarant/${restuarant.slug}`}>
    <div
      className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
    >
      <img
        src={restuarant.main_image}
        alt=""
        className="w-full h-36"
      />
      <div className="p-1 text-black">
        <h3 className="font-bold text-2xl mb-2">{restuarant.name}</h3>
        <div className="flex items-start">
          <div className="flex mb-2"><Stars review={restuarant.Reviews}/></div>
          <p className="ml-2">{restuarant.Reviews.length} review{restuarant.Reviews.length>1?'s':''}</p>
        </div>
        <div className="flex text-black font-medium capitalize">
          <p className=" mr-3">{restuarant.cuisine.name}</p>
          <Price price={restuarant.price}/>
          <p>{restuarant.location.name}</p>
        </div>
        <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
      </div>
    </div>
    </Link>
  )
}