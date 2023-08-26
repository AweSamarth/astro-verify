import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { InjectedConnector } from 'wagmi/connectors/injected'

import { ADDRESS, ABI } from "../constants/constants.js";
import { readContract, writeContract } from '@wagmi/core'

import { useAccount, useContractRead } from 'wagmi';
import { parseGwei, parseEther } from 'viem';


const Home: NextPage = () => {
    const { address, isConnected } = useAccount()
    console.log(address)


async function newCompany(name:string){
    const { hash } = await writeContract({
        address: ADDRESS,
        abi: ABI,
        functionName: "newCompany",
        args: [name],
        value:parseEther("0.051")
      })

    console.log(hash)
    
}

async function viewCompany(name:string){
    const data:any =  await readContract({
        address: ADDRESS,
        abi: ABI,
        functionName: 'viewCompany',
        args:[name]
      })
    
    console.log((data))
    
    }
async function newPart(name:string, totalSupply:number, description:string, price:number){
    const data:any =  await readContract({
        address: ADDRESS,
        abi: ABI,
        functionName: 'viewCompany',
        args:[address]
      })
    
      if(data.companyName===""){
        console.log("please create a company first")
      }

      else{
        const { hash } = await writeContract({
            address: ADDRESS,
            abi: ABI,
            functionName: "newPart",
            args: [name, totalSupply,description,price]
          })
      }


}

async function viewPart(id:number){
    const data:any =  await readContract({
        address: ADDRESS,
        abi: ABI,
        functionName: 'viewPart',
        args:[id]
      })

    console.log((data))
}


// async function newRegistry


  return (
    <div className={styles.container+ " bg-black min-h-screen text-white"}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <ConnectButton  />

        <button onClick={()=>viewCompany(address!)} className='text-white w-40'>Hello there</button>
        <button onClick={()=>newCompany("randomlmao")} className='text-white w-40'>New Company</button>
        <button className='text-white w-40' onClick={()=>newPart("justapart", 100, "this is just a part", 23)}>New Part</button>
        <button className='text-white w-40' onClick={()=>viewPart(1)} > View the Part</button>
      </main>
    </div>
  );
};

export default Home;
