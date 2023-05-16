

import logo from './logo.svg';
import './App.css';
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import "./styles/home.css";
import { Web3Button } from "@thirdweb-dev/react";
import { useState } from 'react';

const stakingAdress = "0x41f7e79E6E8a631e04361e0F42b9Dd5a3D930e7D"
const frank = "0xabfB60DE57fF93AA947009Ff60003E494aaCB66c"

function App() {

  const { contract } = useContract("0x33690D1F2938a10c53151bD6931C9b95Dbe94A7C");

  const {contract : stakingToken, isLoading: isStakingLoading} = useContract({frank})
 
 console.log(stakingToken)
  const address = useAddress();



  const { data, isLoading } = useContractRead(contract, "getStakeInfo", [address])

  const [amountToStake, setamountToStake] = useState(0)



  return (
    <>
      <div className="container">
        <main className="main">
          <h1 className="title">Welcome to staking app!</h1>

          <p className="description">
            Stake certain amount and get reward tokens back!
          </p>

          <div className="connect">
            <ConnectWallet />
          </div>

          <div className='stakeContainer'>

            <input className='textbox' type="number"
              onChange={(e) => setamountToStake(e.target.value)} />
            <Web3Button
              contractAddress={stakingAdress}
              action={async (contract) => { 

                //erc 20 tokenei degisken olrak olusturmam lazim

                await stakingToken.setAllowance(stakingAdress,amountToStake);

                await contract.call("stake",[ethers.utils.parseEther(amountToStake)]) }}

              theme="dark"
            >
              Stake
            </Web3Button>

            <Web3Button
              contractAddress={stakingAdress}
              action={async (contract) => { 

              
                await contract.call("withdraw",[ethers.utils.parseEther(amountToStake)]) }}

              theme="dark"
            >
              unStake (withdraw)
            </Web3Button>

            <Web3Button
              contractAddress={stakingAdress}
              action={async (contract) => { 

              
                await contract.call("claimRewards")}}

              theme="dark"
            >
             claim reward
            </Web3Button>
          </div>
          <div className="grid">
            <a className="card">
              Staked: {data?._tokensStaked && ethers.utils.formatEther(data?._tokensStaked)} UT <br></br>
            </a>
            <a className="card">
              Rewards: {data?._rewards && Number(ethers.utils.formatEther(data?._rewards)).toFixed(2)} MET
            </a>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;