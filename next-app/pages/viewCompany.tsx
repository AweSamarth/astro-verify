import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { InjectedConnector } from "wagmi/connectors/injected";

import { ADDRESS, ABI } from "../constants/constants.js";
import { readContract, writeContract } from "@wagmi/core";

import { useAccount, useContractRead } from "wagmi";
import { parseGwei, parseEther } from "viem";

import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  const [toQuery, setToQuery] = useState("")
  const [data, setData] = useState<any>()
  useEffect(()=>{
    if(address){
        setToQuery(address)
    }
  }, [address])

  async function viewCompany() {
    if (address ==undefined){
      console.error("Please connect your wallet")
      return
    }

      try {
        const data:any =  await readContract({
            address: ADDRESS,
            abi: ABI,
            functionName: 'viewCompany',
            args:[address]
          })
        
        console.log((data))
        data.companyTimestamp=(new Date(Number(data.companyTimestamp)*1000))
        setData(data)
      } catch (error) {
        
      }


  }


  // async function newRegistry

  return (
    <main className="bg-gray-900 min-h-screen flex flex-col text-white">
      <div className="absolute right-0 pt-2 pr-3 flex justify-end  h-12">
        <ConnectButton />
      </div>

      

      <div className=" h-screen flex-col flex   border-red-300 mt-14">

          <div className="flex flex-col  gap-4 h-max  text-xl">
            <div className="self-center">
            Get all products by this company: 
            </div>
            <div className="flex self-center justify-around w-96   text-sm text-black">
                <input className="w-[80%] px-2 rounded-md" value={toQuery} onChange={(event:any)=>setToQuery(event.target.value)} />
                <button onClick={viewCompany} className="px-4 rounded-md text-gray-200 py-1 bg-purple-700">Go</button>
            </div>


          </div>
        {data?
        
        (<div className="mt-12 self-center flex flex-col gap-2 w-full items-center ">
            <div className="text-2xl">{"Name of the company: "+data.companyName}</div>
            <div>{"Company ID: "+ Number(data.companyId)}</div>
            <div>{"Date and Time of creation: "+ data.companyTimestamp.toString()}</div>
            <div>Parts created by this company:</div>
            
            <div>{data.partsArray.map((e:any)=><div>{Number(e)}</div>)}</div>


        </div>):""}
          
          {/* <div className="h-max w-96">

            <button

              onClick={() => viewCompany()}
              className="text-white   px-2 py-1"
            >
              Create
            </button>

            
          </div> */}

      </div>
    </main>
  );
};

export default Home;
