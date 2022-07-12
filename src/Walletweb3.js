import React, { useState } from "react";
import Web3 from "web3";
import TokenAbi from "../src/ABI/Token_Abi.json";
import TokenAbi2 from "../src/ABI/Token_Ab2.json";

function Walletweb3() {
  let web3;
  const [balance, setBalance] = useState("");
  let [balance2, setBalance2] = useState("");
  const [select, setSelect] = useState("");

  
  const [senderAddress, setSenderAddress] = useState("");
  const [hash, setHash] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [contract1, setcontract1] = useState("");
  const [contract2, setcontract2] = useState("");


  const connectMetamask = async () => {
    const TokenAddress = "0x995765e120676263764aB14781Abe228a7EDd015";

    const TokenAddress1 = "0x554BBA98843b661dD2Eda9B750BA4559f23e2E45";
    
    console.log("window", window);

    if (window.ethereum.isMetaMask) {
      console.log("yes");

      const { ethereum } = window;

      web3 = new Web3(ethereum);
      // console.log("web3", web3);
      // 1 method --------------------      To Get Acoounts Using Ethereum     --------------------------

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("accounts", accounts);

      // 2 method --------------------      To Get Acoounts Using Web3      --------------------------
      const addresss = await web3.eth.getAccounts();

      console.log("------", addresss[0]);
      setAddress(addresss[0]);

      const balance1 = await web3.eth.getBalance("0xad9d8be72aBdc7f7D2BFF181c327b29402894E23");


      console.log("balance1", balance1 / 10 ** 18);
      setBalance(balance1 / 10 ** 18);


      //
      let contract = new web3.eth.Contract(TokenAbi, TokenAddress);
      setcontract1(contract)

      let contract2 = new web3.eth.Contract(TokenAbi2, TokenAddress1);
      setcontract2(contract2)

      // console.log(" tokenInstance", contract);

     console.log(
        "contract1---------------",
        contract2.methods.balanceOf
        
      );

    console.log(accounts[0])
        contract.methods
        .balanceOf(accounts[0])
        .call()
        .then((result) => {
          console.log("result", result / 10 ** 18);
        });

// //console.log("accounts[0]",accounts[0]);
      contract2.methods
        .balanceOf(accounts[0])
        .call()
        .then((result1) => {
       
          console.log("contract2 balance", result1 / 10 ** 18);
          setBalance2(result1 / 10 ** 18);
        });
    } else {
      alert("please install metamask");
    }
  };

  const transferMoney = async (e) => {

    const { ethereum } = window;
    web3 = new Web3(ethereum);
    const addresss = await web3.eth.getAccounts();

    if (address !== "")
     {
      e.preventDefault();
      const { ethereum } = window;
      web3 = new Web3(ethereum);
      console.log("amount*10**18", amount * 10 ** 18);
      console.log("hello", senderAddress, amount, web3);
      if(select==="Ehtereum")
      { console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      try {
        await web3.eth
          .sendTransaction({
            from: address,
            to: senderAddress,
            value: amount * 10 ** 18,
          })
          .then((res) => {
            console.log(res.blockHash, "res");
            setHash(res.blockHash);
          });
      } catch (error) {
        console.log("error", error.message);
        alert(error.message);
      }
    } 
    if(select==="Token")
  { 
    try {
      console.log("senderAddress",senderAddress,"amount",amount,"addresss[0] ",addresss[0] );
      let ss = amount*10**18;
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",ss.toString());

     

     const result = await contract2.methods.transfer(senderAddress,ss.toString() )
      .send({ from:  addresss[0] })
      .then((res) => {
        console.log(res, "res");
        setHash(res.blockHash);
      });
    } catch (error) {
      console.log("error",error);
    }
  }
  }
  else {
      alert("please connect your wallet");
    }
  }
  

  console.log("select",select);
  return (
    <div>
      Walletweb3
      <div>
        <button onClick={connectMetamask}>Connect</button>
        <h1>Account Balance</h1>
        <h2>{balance}</h2>
        <h2>Token Balance</h2>
        <h2>{balance2}</h2>

        <form>
          <select name="Transfer" onChange={(e)=>setSelect(e.target.value)}>
            <option value="">select</option>
            <option value="Ehtereum">Ehtereum</option>
            <option value="Token">Token</option>
          </select><br></br><br></br>
          <label> address</label>
          <input
            type="text"
            placeholder="enter address"
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
          />
          <br></br>
          <br></br>
          <br></br>
          <label>Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br></br>
          <br></br>

          <button type="button" onClick={(e) => transferMoney(e)}>
            send
          </button>
        </form>
        <h3>hash Address: {hash}</h3>
      </div>
    </div>
  );
  }

export default Walletweb3;
