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

  const [id, setId] = useState(0);
  const [serialNo, setSerialNo] = useState<string>("");
  const [data, setData] = useState<any>();

  async function viewPartFromId() {
    if (id == 0) {
      console.error("Please  your wallet");
      return;
    }

    try {
      const data: any = await readContract({
        address: ADDRESS,
        abi: ABI,
        functionName: "viewPart",
        args: [id],
      });
      const otherData: any = await readContract({
        address: ADDRESS,
        abi: ABI,
        functionName: "viewCompany",
        args: [data.companyAddress],
      });
      console.log(data);
      console.log(otherData);
      data.companyName = otherData.companyName;
      data.partsArray = otherData.partsArray;
      data.partTimestamp = new Date(Number(data.partTimestamp) * 1000);
      data.price = BigInt(data.price) / BigInt(10 ** 18);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  //   async function viewPartFromSerialNumber() {
  //     if (serialNo ==""){
  //       console.error("Please give the serial number")
  //       return
  //     }
  //     const theId=  serialNo[0]
  //     console.log(theId)

  //       try {
  //         const firstData:any =  await readContract({
  //             address: ADDRESS,
  //             abi: ABI,
  //             functionName: 'viewPart',
  //             args:[theId]
  //           })
  //         const secondData:any= await readContract({
  //             address: ADDRESS,
  //             abi: ABI,
  //             functionName: 'viewRegistry',
  //             args:[serialNo]
  //         })
  //         console.log((firstData))
  //         console.log(secondData)
  //         setData(data)
  //       } catch (error) {
  //         console.error(error)
  //       }

  //   }

  // async function newRegistry

  return (
    <main className="bg-gray-900 min-h-screen flex flex-col text-white">
      <div className="absolute right-0 pt-2 pr-3 flex justify-end  h-12">
        <ConnectButton />
      </div>

      <div className=" h-screen flex-col flex    mt-14">
        <div className="flex flex-col  gap-4 h-max  text-xl">
          <div className="self-center">Get details of a part:</div>

          <div className="flex gap-4 self-center justify-around w-[30rem]  text-sm text-black">
            <span className="text-white ">Product ID</span>
            <input
              className="w-[65%] px-2 rounded-md"
              value={id}
              onChange={(event: any) => setId(event.target.value)}
            />
            <button
              onClick={viewPartFromId}
              className="px-4 rounded-md text-gray-200 py-1 bg-purple-700"
            >
              Go
            </button>
          </div>
          {/* <div className="self-center">or</div> */}
          {/* <div className="flex gap-4 self-center justify-around w-[30rem]  text-sm text-black">
                <span className="text-white ">Serial No.</span>
                <input className="w-[65%] px-2 rounded-md" value={serialNo} onChange={(event:any)=>setSerialNo(event.target.value)} />
                <button onClick={viewPartFromSerialNumber} className="px-4 rounded-md text-gray-200 py-1 bg-purple-700">Go</button>
            </div> */}
        </div>
        {data ? (
          <div className="mt-12 self-center flex flex-col gap-4 w-full  ">
            <div className="flex  justify-around px-4 py-2">
            <div className="w-[40rem] ">
                <img src={data.imageUrl} className="object-contain" />{" "}
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-2xl mb-3 ">
                  {"Name of the part: " + data.partName}
                </div>
                <div>{"ID of the part is: " + data.partId}</div>
                <div>
                  {"Date and Time of creation: " +
                    data.partTimestamp.toString()}
                </div>
                <div>{"Price of the part is: " + data.price+ " MATIC"}</div>
                <div>
                  {"Total supply of this part is: " + data.totalSupply}
                </div>
                <div>
                  {"This part has exhausted: " +
                    data.counter +
                    " out of its total supply"}
                </div>
                <div>{"Company Address: " + data.companyAddress}</div>
                <div>{"Company Name: " + "Space Corp"}</div>
                <div>Parts created by this company:{" "}
                
                  {data.partsArray.map((e: any) => (
                    <span key={Number(e)}>{"id-"+Number(e)+" "}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default Home;
