import { Review } from "@prisma/client";

export const GetAverageRate=(review:Review[])=>{
    var sum=0, len=review.length;
    if(len==0){
        return 0;
    }
    review.map((rev)=>{
        sum=sum+rev.rating;
    })
    return sum/len;
}