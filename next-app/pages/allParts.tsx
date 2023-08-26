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

  const [data, setData] = useState<any>()
  const [dataLoaded, setDataLoaded ] = useState(false)

  async function viewPartFromId() {


      try {
        const firstData:any =  await readContract({
            address: ADDRESS,
            abi: ABI,
            functionName: 'part_id',
          })
        const limit = Number(firstData)
        console.log(limit)
        let temparray=[]
        for (let i=1;i<=limit;i++){
        const data:any =  await readContract({
            address: ADDRESS,
            abi: ABI,
            functionName: 'viewPart',
            args:[i]
          })
          const otherData:any =  await readContract({
            address: ADDRESS,
            abi: ABI,
            functionName: 'viewCompany',
            args:[data.companyAddress]
          })        
        console.log((data))
        console.log((otherData))
        data.companyName = otherData.companyName
        data.partsArray = otherData.partsArray
        data.partTimestamp=(new Date(Number(data.partTimestamp)*1000))
        data.price = BigInt(data.price)/BigInt(10 ** 18)

        temparray.push(data)

        setData(temparray)
        }

        setDataLoaded(true)
      } catch (error) {
        console.error(error)
      }


  }

  useEffect(()=>{
    console.log(data)
  }, [data])

  return (
    <main className="bg-gray-900 min-h-screen flex flex-col text-white">
      <div className="absolute right-0 pt-2 pr-3 flex justify-end  h-12">
        <ConnectButton />
      </div>

      

      <div className=" h-screen flex-col flex   border-red-300 mt-14">

          <div className="flex justify-center  gap-4 h-max  text-xl">
            <div className="self-center">
            Get all parts

            </div>
            <button onClick={viewPartFromId} className="px-4 rounded-md text-gray-200 py-1 bg-purple-700">Go</button>

            {/* <div className="self-center">or</div> */}
            {/* <div className="flex gap-4 self-center justify-around w-[30rem]  text-sm text-black">
                <span className="text-white ">Serial No.</span>
                <input className="w-[65%] px-2 rounded-md" value={serialNo} onChange={(event:any)=>setSerialNo(event.target.value)} />
                <button onClick={viewPartFromSerialNumber} className="px-4 rounded-md text-gray-200 py-1 bg-purple-700">Go</button>
            </div> */}


          </div>

          {dataLoaded?
        (data.map((data:any)=>{

           return (
            <div className="mt-12 self-center mb-12 pb-12 bg-gray-900 flex flex-col gap-4 w-full  ">
            <div className="flex  justify-around px-4 py-2">
            <div className="w-[40rem] ">
                <img src={data.imageUrl} className="object-contain" />{" "}
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-2xl mb-3 ">
                  {"Name of the part: " + data.partName}
                </div>
                <div>{"Id of the part is: " + data.partId}</div>
                <div>
                  {"Date and Time of creation: " +
                    data.partTimestamp.toString()}
                </div>
                <div>{"Price of the part is: " + data.price+ " MATIC"}</div>
                <div>
                  {"Total supply of this  part is: " + data.totalSupply}
                </div>
                <div>
                  {"This part has exhausted: " +
                    data.counter +
                    " out of its total supply"}
                </div>
                <div>{"Company Address: " + data.companyAddress}</div>
                <div>{"Company Name: " + data.companyName}</div>
                <div>Parts created by this company:{" "}
                
                  {data.partsArray.map((e: any) => (
                    <span key={Number(e)}>{"id-"+Number(e)+" "}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>)


        })):""}

          

      </div>
    </main>
  );
};

export default Home;
