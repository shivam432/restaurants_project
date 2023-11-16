import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import { PrismaClient,Cuisine,Location,PRICE, Review } from '@prisma/client';
import Stars from './components/Stars';


export interface RestaurantTypeCard{
  id:number,
  name:string,
  main_image:string,
  price:PRICE,
  cuisine:Cuisine,
  location:Location,
  slug:string,
  Reviews:Review[]
}

const prisma_client=new PrismaClient();

const fetchRestaurants= async (): Promise<RestaurantTypeCard[]> =>{
  const restaurants= await prisma_client.restuarant.findMany({
    select:{
      id:true,
      name:true,
      main_image:true,
      cuisine:true,
      price:true,
      location:true,
      slug:true,
      Reviews:true,
    }
  })

  return restaurants
}

export default async function Home() {

  const restaurants= await fetchRestaurants();  
  // console.log(restaurants)
  
  return (

    <main>
      {/* HEADER */}
      <Header/>
      <div className="py-3 px-36 mt-10 flex flex-wrap">
        {restaurants.map(res=>(
          <RestaurantCard restuarant={res} key={res.id}/>
        ))}
     
     </div>
      
    </main>
  )
}
