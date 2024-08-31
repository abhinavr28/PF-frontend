import React, { createContext, useEffect, useState } from 'react'

export const TokenAuthenticationResponseContext = createContext()

function TokenAuth({children}) {
    const [isAuthorized,setIsAutherized]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAutherized(true)
        }else{
            setIsAutherized(false)
        }
    },[isAuthorized])
  return (
    <>
    <TokenAuthenticationResponseContext.Provider value={{isAuthorized,setIsAutherized}}>
        {children}
    </TokenAuthenticationResponseContext.Provider>

    </>
  )
}

export default TokenAuth