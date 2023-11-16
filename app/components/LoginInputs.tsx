interface Props {
    inputs:{
        firstname:string
        lastname:string,
        email:string,
        phone:string,
        city:string,
        password:string
    };
    onhandleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    isSignIn:Boolean;
}

export default function LoginInputs({inputs, onhandleChange,isSignIn}: Props){
    return (
        <div>
            {isSignIn?null:
            <div className="my-3 flex justify-between text-sm text-black">
                <input
                type="text"
                placeholder="First Name"
                className="border rounded py-3 p-2 w-[49%]"
                value={inputs.firstname}
                onChange={onhandleChange}
                name="first name"
                />
                <input
                type="text"
                placeholder="Last Name"
                className="border rounded py-3 p-2 w-[49%]"
                value={inputs.lastname}
                onChange={onhandleChange}
                name="last name"
                />
            </div>
            }
            <div className="my-3 flex justify-between text-sm text-black">
                <input
                type="text"
                placeholder="you@example.com"
                className="border rounded py-3 p-2 w-full"
                value={inputs.email}
                onChange={onhandleChange}
                name="email"
                />
            </div>
            <div className="my-3 flex justify-between text-sm text-black">
                <input
                type="password"
                placeholder="Password"
                className="border rounded py-3 p-2 w-full"
                value={inputs.password}
                onChange={onhandleChange}
                name="password"
                />
            </div>
           {isSignIn?null:
            <div className="my-3 flex justify-between text-sm text-black">
                <input
                type="text"
                placeholder="Phone"
                className="border rounded py-3 p-2 w-[49%]"
                value={inputs.phone}
                onChange={onhandleChange}
                name="phone"
                />
                <input
                type="text"
                placeholder="City"
                className="border rounded py-3 p-2 w-[49%]"
                value={inputs.city}
                onChange={onhandleChange}
                name="city"
                />
            </div>}
        </div>
    )
}