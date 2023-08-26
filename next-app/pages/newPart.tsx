import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { InjectedConnector } from "wagmi/connectors/injected";

import { ADDRESS, ABI } from "../constants/constants.js";
import { readContract, writeContract } from "@wagmi/core";

import { useAccount, useContractRead } from "wagmi";
import { parseGwei, parseEther } from "viem";

import { useState } from "react";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [companyName, setCompanyName] = useState("");

  const [partName, setPartName] = useState("")
  const [totalSupply, setTotalSupply] = useState<number>(0)
  const [description, setDescription] = useState("")
  const [price, setPrice] =useState<number>(0)
  const [imgUrl, setImgUrl] = useState("") 


  async function newPart(
    partName: string,
    totalSupply: number,
    description: string,
    price: number,
    imgUrl:string
  ) {
    if (address == undefined) {
      console.error("Please connect your wallet");
      return;
    }

    if (partName==""||totalSupply==0|| description==""|| price==(0) || imgUrl=="" ){

        console.error("Incorrect input")
        return
    }
    const data: any = await readContract({
      address: ADDRESS,
      abi: ABI,
      functionName: "viewCompany",

      args: [address],
    });

    if (data.companyName === "") {
      console.error("please create a company first");
      return;
    } else {
      const { hash } = await writeContract({
        address: ADDRESS,
        abi: ABI,
        functionName: "newPart",
        args: [partName, totalSupply, description, parseEther(price.toString()), imgUrl],
      });

      console.log(hash)

    }
  }

  // async function newRegistry

  return (
    <main className="bg-gray-900 min-h-screen flex flex-col">
      <div className="absolute right-0 pt-2 pr-3 flex justify-end  h-12">
        <ConnectButton />
      </div>

      <div className=" h-screen flex">
        <div className="bg-purple-800 bg-gradient-to-tr  from-purple-700 to-purple-950 w-[40%] flex flex-col justify-center">
          <div className=" self-center w-max">
            <img src="/avlogophotoroompngphotoroom-2@2x.png" />
          </div>
        </div>

        <div className=" w-[60%] flex gap-8 flex-col justify-center border-2 items-center text-white">
          <div className="self-center flex flex-col text-3xl">List a part</div>
            <div className="flex gap-5">
              <span>Part name: </span>  
              <input
                className="rounded-sm w-80 mr-2 text-black px-1 "
                onChange={(event: any) => setPartName(event.target.value)}
                value={partName}
              />
            </div>

            <div className="flex gap-3">
              <span>Total supply: </span>  
              <input
                className="rounded-sm w-80 mr-2 text-black px-1 "
                onChange={(event: any) => setTotalSupply(event.target.value)}
                value={totalSupply}
              />
            </div>

            <div className="flex gap-5">
              <span>Description:  </span>  
              <textarea
                className="rounded-sm w-80 mr-2 text-black px-1 "
                onChange={(event: any) => setDescription(event.target.value)}
                value={description}
              />
            </div>

            <div className="flex gap-3">
              <span>Price (MATIC) </span>  
              <input
                className="rounded-sm w-80 mr-2 text-black px-1 "
                onChange={(event: any) => setPrice(event.target.value)}
                value={price}
              />
            </div>

            <div className="flex gap-3">
              <span>Part img URL </span>  
              <input
                className="rounded-sm w-80 mr-2 text-black px-1 "
                onChange={(event: any) => setImgUrl(event.target.value)}
                value={imgUrl}
              />
            </div>

            <div>
              <button
                  onClick={() => newPart(partName, totalSupply!, description, price!, imgUrl)}
                className="text-white  border-2 px-2 py-1"
              >
                Create
              </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
