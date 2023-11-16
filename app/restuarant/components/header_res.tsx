

export default function HeaderRes({slug}:{slug:string}){

  const renderTitle=()=>{
    var nameArr= slug.split("-");
    nameArr[nameArr.length-1]=`(${nameArr[nameArr.length-1]})`

    return nameArr.join(" ")
  }

    return (
        <div className="h-96 overflow-hidden">
      <div
        className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center"
      >
        <h1 className="text-7xl text-white captitalize text-shadow text-center capitalize">
          {renderTitle()}
        </h1>
      </div>
    </div>
    )
}