import HeaderRes from "../components/header_res";
import NavbarRes from "../components/Navbar_res";
import RatingRes from "../components/rating";
import Desc from "../components/desc";
import ImageRes from "../components/images_res";
import ReviewCard from "../components/reviewCard";
import RestuarantCard_res from "../components/RestuarantCard";
import { Metadata } from "next";
import { PrismaClient, Review } from "@prisma/client";

export const metadata: Metadata = {
    title: 'Restuarant | Open World',
    description: 'Come and explore the best cuisines in the world',
    icons:'next folder\\my_first_next_app\\app\\favicon.ico'
  }

interface Restautant{
    id: number,
    name:string,
    description:string,
    image:string[],
    slug:string,
    Reviews:Review[]
}

const prisma=new PrismaClient();

const fetchRestaurantsBySlug =async (slug:string):Promise<Restautant>=>{

    const resSlug= await prisma.restuarant.findUnique({
        where:{slug},
        select:{
            id:true,
            name:true,
            description:true,
            image:true,
            slug:true,
            Reviews:true
        }
    })

    if(!resSlug){
        throw new Error("Restaurant not found");
    }
    
    return resSlug;
}

export default async function RestaurantDetails({params}:{params:{slug:string}}){

    const resDetail= await fetchRestaurantsBySlug(params.slug)
    // console.log(resDetail)

    return (
        <>
        
        <HeaderRes slug={resDetail.slug}/>
        
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
            
            <NavbarRes slug={resDetail.slug} />
           
            <div className="mt-4 border-b pb-6">
            <h1 className="font-bold text-6xl text-black">{resDetail.name}</h1>
            </div>
            
            <RatingRes review={resDetail.Reviews}/>
            
            <Desc desc={resDetail.description} />
            
            <ImageRes image={resDetail.image}/>
            
            <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5 text-black">
                What {resDetail.Reviews.length} {resDetail.Reviews.length>1?"people":"person"} are saying
            </h1>
            <div>
               {resDetail.Reviews.length>0? resDetail.Reviews.map(review=>
                    <ReviewCard review={review}/>
                )
            :<p className="font-bold text-black">No one has rated this restaurant yet...</p>
            }
                
            </div>
            </div>
            
        </div>
        <div className="w-[27%] relative text-black">
            <RestuarantCard_res/>
        </div>
        </div>
        
        </>

    )
}