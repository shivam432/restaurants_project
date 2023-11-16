import { PRICE } from "@prisma/client";

interface price{
    price:PRICE
}

export default function Price({price}:price){

    const renderPrice= ()=>{
        if(price===PRICE.CHEAP){
            return <>
                <span className="font-bold text-black">$</span>
            </>
        }else if(price===PRICE.REGULAR){
            return <>
                <span className="font-bold text-black">$$</span>
            </>
        }else{
            return <>
                <span className="font-bold text-black">$$$</span>
            </>
        }
    }

    return (
        <p className="mr-3">{renderPrice()}</p>
    )
}