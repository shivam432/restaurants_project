import { Item } from "@prisma/client";
import MenuCard from "./menuCard";


export default function MenuRes({items}:{items:Item[]}){
    return (
        <main className="bg-white mt-5">
            <div>
              <div className="mt-4 pb-1 mb-1">
                <h1 className="font-bold text-4xl text-black">Menu</h1>
              </div>
              {items.length>0?
                  <div className="flex flex-wrap justify-between">
                  {items.map(item=>(
                    <MenuCard item={item} key={item.id}/>
                  ))}
                  </div>
              :
                <div className="flex flex-wrap justify-between">
                  <p className="text-black">This restaurant doesn't have any item yet...</p>
                </div>
            }
              
            </div>
          </main>
    )
}