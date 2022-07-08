import React from 'react'
import Web3 from "web3";
import TokenAbi from "../src/ABI/Token_Abi.json"
function Walletweb3() {

let web3;

    const connectMetamask = async () => {
    const TokenAddress = "0x995765e120676263764aB14781Abe228a7EDd015";
    console.log("window",window);
    const { ethereum } = window;
     web3 = new Web3(ethereum)
    console.log("web3",web3);

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("accounts",accounts);


      const balance = await web3.eth.getAccounts()
      console.log(balance,"------");

      const balance1 = await web3.eth.getBalance(accounts[0])
      console.log("balance1",balance1/10**18);

      let contract = new web3.eth.Contract(TokenAbi,TokenAddress)
      console.log(" tokenInstance", contract );
      console.log("address",contract.getAccounts);

     contract.methods.balanceOf(accounts[0]).call().then((result)=>{
         console.log("result",result);
     })



    }
  return (
    <div>Walletweb3
         <div>
             <button onClick={connectMetamask} >Connect</button>
         </div>
    </div>
   
  )
}

export default Walletweb3