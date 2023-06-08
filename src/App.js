import logo from './logo.svg';
import './App.css';
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import "./styles/home.css";
import { useState } from 'react';

const stakingAddress = "0x41f7e79E6E8a631e04361e0F42b9Dd5a3D930e7D"; // Staking Contract
const ustechTokenAddress = "0xabfB60DE57fF93AA947009Ff60003E494aaCB66c"; // FRANK Token Address
function App() {

  const { contract: stakingContract, isLoading: isStakingContractLoading   } = useContract(stakingAddress);
  const {contract: ustechToken,isLoading: isUstechTokenLoading} = useContract(ustechTokenAddress);

  console.log(ustechToken);
  const address = useAddress();
  const { data, isLoading } = useContractRead(stakingContract, "getStakeInfo", [address])
  const[amountToStake,setAmountToStake] = useState(0);
//gfhfghg
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

          <div className="stakeContainer">
            <input className="textbox" 
                   type="number" 
                   value={amountToStake} 
                   onChange={(e) => setAmountToStake(e.target.value)} />

            <Web3Button
              contractAddress={stakingAddress}
              action={async (contract) => {
                // ERC20 tokeni degisken olarak olusturmam lazim
                await ustechToken.setAllowance(stakingAddress,amountToStake);

                await contract.call(
                  "stake",
                [ethers.utils.parseEther(amountToStake)])
              }}
              theme="dark"
            >
              Stake
            </Web3Button>

           

            <Web3Button
              contractAddress={stakingAddress}
              action={async (contract) => {

                await contract.call(
                  "withdraw",
                [ethers.utils.parseEther(amountToStake)])

              }}
              theme="dark"
            >
              UnStake (Withdraw)
            </Web3Button>

            <Web3Button
              contractAddress={stakingAddress}
              action={async (contract) => {

                await contract.call("claimRewards")
                
              }}
              theme="dark"
            >
              Claim Rewards!
            </Web3Button>


            
          </div>

          <div className="grid">
            <a className="card">
              Staked: {data?._tokensStaked && ethers.utils.formatEther(data?._tokensStaked)} CHF <br></br>
            </a>
            <a className="card">
              Rewards: {data?._rewards && Number(ethers.utils.formatEther(data?._rewards)).toFixed(2)} MTK
            </a>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;