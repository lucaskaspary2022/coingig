"use client";

import React, { useState } from 'react'
import { deployContract } from '../../../scripts/deployContract';

const FiverrTemplate = () => {

    const [name, setName] = useState("Lucas")
    const [service, setService] = useState("Web Development")
    const [price, setPrice] = useState(100)
    const [walletAddress, setWalletAddress] = useState("0xDe871bD3e8dd00C3f85AeA3889ee8A477e02Ee3c")

    const createContract = async () => {

        // deployContract(walletAddress);
        // const response = await fetch('./api/deploy', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ walletAddress })
        //   });

        //   console.log("here")
      
        //   const data = await response.json();
        //   if (data.contractAddress) {
        //     setContractAddress(data.contractAddress);
        //   } else {
        //     console.error('Error deploying contract:', data.error);
        //   }
    }

    return (
        <div className='flex bg-white w-full h-screen items-center justify-center'>
            <div className='bg-gray-200 flex flex-col p-[60px] rounded-md items-center'>
                <div className='flex items-center justify-between'>
                    <div className='bg-black rounded-full p-[50px] m-[20px]'>
                        avatar
                    </div>
                    <div className='flex flex-col flex-wrap'>
                        <p>Name {name}</p>
                        <p>Service Type: {service}</p>
                        <p>Price: ${price}</p>
                        <p className='flex-wrap'>Hedera Wallet Address: {walletAddress}</p>
                    </div>
                </div>
                <div className='flex items-end'>
                    <button onClick={createContract}>
                        <p className='bg-red-800 text-black font-poppins px-[20px] py-[10px] rounded-xl hover:bg-red-900 text-[30px]'><b className='text-white'>Pay</b>Proof</p>
                    </button>
                </div>                
            </div>

        </div>
  )
}

export default FiverrTemplate