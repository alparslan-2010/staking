
import './App.css';
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Contract } from 'ethers';
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from 'ethers';



function App() {

  const  {contract} = useContract("0x41f7e79E6E8a631e04361e0F42b9Dd5a3D930e7D");
  console.log(contract);
  const address = useAddress();

 
  const { data, isLoading } = useContractRead(contract, "getStakeInfo", [address])

  console.log(data)

  return (
    <>
    
    <ConnectWallet />
    
   Staked : {data?._tokenStaked &&ethers.utils.formatEther(data?._rewards) } <br></br>
   rewards :{data?._rewards &&ethers.utils.formatEther(data?._rewards)}   
     
    </>
  );
}

export default App;
