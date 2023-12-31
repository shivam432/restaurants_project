"use client"

import { useState} from 'react'; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoginInputs from './LoginInputs';
import { i } from 'mathjs';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({isSignIn}:{isSignIn:Boolean}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderLoginContent=(signInContent:string, singUpContent:string)=>{
    return isSignIn?signInContent:singUpContent
  }

  const [inputs,setInputs]=useState({
      firstname:"",
      lastname:"",
      email:"",
      phone:"",
      city:"",
      password:""
  })

  const onhandleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputs({
      ...inputs,
      [e.target.name]:e.target.value,
    })
  }

  const [disa,setDisabled]=useState(false)

  useState(()=>{
    if(isSignIn){
      if(inputs.email && inputs.password){
        return setDisabled(false)
      }
    }else{
      if(inputs.email && inputs.firstname && inputs.lastname && inputs.password && inputs.city && inputs.phone){
        return setDisabled(false)
      }
    }

    return setDisabled(true)
  })

  return (
    <div>
      <button
            className={`${renderLoginContent("bg-blue-400 text-white","text-black")} border p-1 px-4 rounded mr-3`}
            onClick={handleOpen}
            >
            {renderLoginContent("Sign In","Sign Up")}
            </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
          <div className='p-2 text-black'>
            <div className="uppercase font-bold text-center border-b pb-2 mb-2">
                <p className="text-sm">
                    {renderLoginContent("Sign In", "Create Account")}
                </p>
                </div>
                <div className="m-auto">
                    <h2 className="text-2xl font-light text-center">
                        {renderLoginContent("Log Into your Account","Create Your Account")}
                    </h2>
                    <LoginInputs 
                      inputs={inputs} 
                      onhandleChange={onhandleChange}
                      isSignIn={isSignIn}
                    />
                    <button className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400' disabled={disa}>
                        {renderLoginContent("Sign In", "Create Account")}
                    </button>
                </div>
            
          </div>
        </Box>
        
      </Modal>
    </div>
  );
}
