import { Metadata } from "next";
import RestaurantCardSearch from "./components/RestaurantCard_search";
import HeaderSearch from "./components/header_search";
import SideBar from "./components/sideBar";
import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";
import Stars from "../components/Stars";

export const metadata: Metadata = {
  title: 'Search | Open World',
  description: 'Come and explore the best cuisines in the world',
  icons:'next folder\\my_first_next_app\\app\\favicon.ico'
}

const prisma=new PrismaClient()

export interface RestaurantCardInt{
    id:number,
    name:string,
    cuisine:Cuisine,
    location:Location,
    main_image:string,
    price:PRICE,
    slug:string,
    Reviews:Review[]
};

interface SearchParamsInt{
  city?:string,
  cuisine?:string,
  price?:PRICE
}

const fetchRestaurantsByCity=(searchPar:SearchParamsInt)=>{

  const where:any={}
  const select:any={
    id:true,
    name:true,
    cuisine:true,
    location:true,
    main_image:true,
    price:true,
    slug:true,
    Reviews:true
  }

  if(searchPar.city){
    const location={
      name:{
        equals:searchPar.city.toLowerCase()
      }
    }
    where.location=location
  }

  if(searchPar.cuisine){
    const cuisine={
      name:{
        equals:searchPar.cuisine.toLowerCase()
      }
    }
    where.cuisine=cuisine
  }

  if(searchPar.price){
    const price={
      name:{
        equals:searchPar.price
      }
    }
    where.price=price
  }
  
  return prisma.restuarant.findMany({
    where,
    select
  })
}

export default async function Search({searchParams}:{
  searchParams:SearchParamsInt
}){

  const res_name= await fetchRestaurantsByCity(searchParams)
  
  console.log(searchParams.cuisine)
  // console.log(res_name)

    return (
    <>
    <HeaderSearch/>
    <div className="flex py-4 m-auto w-2/3 justify-between items-start">
      <SideBar searchParams={searchParams}/>
      <div className="w-5/6">
        {res_name.length?(
        <>
        {res_name.map((restaurant)=>
          <RestaurantCardSearch restaurants={restaurant}/>)}
        </>):(<p className="font-medium text-black">We are coming soon... stay tuned...</p>)
        }
      </div>
    </div>
    </>
    );
}