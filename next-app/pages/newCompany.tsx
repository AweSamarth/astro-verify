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

  async function newCompany(name: string) {
    if (address ==undefined){
      console.error("Please connect your wallet")
      return
    }

    if(companyName!=""){
      try {
        const { hash } = await writeContract({
          address: ADDRESS,
          abi: ABI,
          functionName: "newCompany",
          args: [name],
          value: parseEther("0.051"),
        });
      
        console.log(hash);
      } catch (error) {
        
      }

}
  else console.error("Name cannot be blank")
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

        <div className=" w-[60%] flex gap-8 flex-col justify-center text-white">
          <div className="self-center text-3xl">Choose a name for your company</div>
          <div className="self-center  w-96 flex justify-between p-4">
            <input
              className="rounded-sm w-80 mr-2 text-black px-1 "
              onChange={(event: any) => setCompanyName(event.target.value)}
              value={companyName}
            />
            <button

              onClick={() => newCompany(companyName)}
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
