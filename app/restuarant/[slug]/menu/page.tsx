import HeaderRes from "../../components/header_res";
import NavbarRes from "../../components/Navbar_res";
import MenuRes from "../../components/menu";
import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";


export const metadata: Metadata = {
    title: 'Menu | Open World',
    description: 'Come and explore the best cuisines in the world',
    icons:'next folder\\my_first_next_app\\app\\favicon.ico'
}

const prisma= new PrismaClient();

const fetchItems=async (slug:string)=>{
  const restuarant= await prisma.restuarant.findUnique({
    where:{slug},
    select:{Item:true}
  })

  if(!restuarant){
    throw new Error
  }
  return restuarant.Item;
}

export default async function Menu({params}:{params:{slug:string}}){

  const items=await fetchItems(params.slug);
  // console.log(items)
  
    return (
    <> 
    
      <HeaderRes slug={params.slug} />
      
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11 ">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          
          <NavbarRes slug={params.slug} />
          
          <MenuRes items={items}/>
          
        </div>
      </div>
      
    </>
  )
}