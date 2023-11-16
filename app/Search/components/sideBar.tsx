import { PRICE, PrismaClient } from "@prisma/client"
import Link from "next/link";


const prisma= new PrismaClient();

const getLocation= ()=>{
  return prisma.location.findMany()
}

const getCuisines= ()=>{
  return prisma.cuisine.findMany()
}



export default async function SideBar({searchParams}:{searchParams:{city?:string,cuisine?:string,price?:PRICE}}){


  const location=await getLocation();
  const cuisines= await getCuisines();

  const prices=[{
    prices:PRICE.CHEAP,
    lable:'$'
  },{
    prices:PRICE.REGULAR,
    lable:'$$'
  },{
    prices:PRICE.EXPENSIVE,
    lable:'$$$'
  }]

    return (
    <div className="w-1/5 mx-3">
    <div className="border-b pb-4 text-black flex flex-col">
      <h1 className="mb-2  font-bold">Region</h1>
      {location.map((city)=>
        <Link href={{
          pathname:'/Search',
          query:{
            ...searchParams,
            city:city.name
          }
        }}>
          {city.name}
          </Link>
      )}
      
    </div>
    <div className="border-b pb-4 mt-3 text-black flex flex-col">
      <h1 className="mb-2 font-bold">Cuisine</h1>
      {cuisines.map((item)=>
        <Link href={{
          pathname:'/Search',
          query:{
            ...searchParams,
            cuisine:item.name
          }
        }}>{item.name}</Link>
      )}
    </div>
    <div className="mt-3 pb-4">
      <h1 className="mb-2">Price</h1>
      <div className="flex">
        {prices.map(price=>(
        <Link href={{
          pathname:'/Search',
          query:{
            ...searchParams,
            price:price.prices
          }
        }} className="border w-full text-black font-light rounded-l p-2">
          {price.lable}
        </Link>
        ))}
      </div>
    </div>
    </div>
    )
}