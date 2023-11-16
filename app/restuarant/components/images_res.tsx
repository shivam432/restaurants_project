



export default function ImageRes({image}:{image:string[]}){

  console.log(image.length)
    return (
        <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5 text-black">
            Found {image.length} image{image.length>1? "s":""}
          </h1>
          <div className="flex flex-wrap">
            {image.map(img=>(
              <img
              className="w-56 h-44 mr-1 mb-1"
              src={img}
              alt=""
              key=""
            />
            ))}
            
          </div>
        </div>
    )
}