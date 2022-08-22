import React, { useContext } from 'react';
import { AuthContext } from "../../context/authContext";


const Loader = ({color, LoaderName}) => {
    const { loading } = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-800 w-screen">
        <LoaderName
            color={color} 
            loading={loading} 
            size={200} 
        />
    </div>
  )
}

export default Loader
