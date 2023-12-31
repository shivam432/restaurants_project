export default function Loading(){
    return (
        <main>
            <div className="py-3 px-36 mr-10 flex flex-wrap justify-center">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(num=>
                    
                <div className="border-black-300 shadow rounded p-4 w-full m-3">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                    </div>
                </div>
                </div>
                )}
            </div>
        </main>
    )
}