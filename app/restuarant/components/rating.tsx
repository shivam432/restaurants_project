import { GetAverageRate } from "@/app/AverageRating";
import Stars from "@/app/components/Stars";
import { Review } from "@prisma/client";

export default function RatingRes({review}:{review:Review[]}){

  const rate_val=GetAverageRate(review);

    return (
        <div className="flex items-end">
          <div className="ratings mt-2 flex items-center font-medium text-black">
            <p><Stars review={review}/></p>
            <p className="text-black ml-3">{rate_val.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-black font-medium ml-4">{review.length} Review{review.length>1? "s":""}</p>
          </div>
        </div>
    )
}