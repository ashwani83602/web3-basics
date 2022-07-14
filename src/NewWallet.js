import React from 'react'
import Web3 from "web3";
function NewWallet() {
    let web3;
    const { ethereum } = window;
    web3 = new Web3(ethereum);
const fun = async()=>{

  const account = await ethereum.request({ method: 'eth_requestAccounts' });
  console.log("aa",account);
  const chainId = await window.ethereum.request({ method: 'eth_chainId'});
  console.log("chani id",chainId);

}
//  const ethereumButton = document.querySelector('.enableEthereumButton');

// ethereumButton.addEventListener('click', () => {
// //   //Will Start the metamask extension
//  ethereum.request({ method: 'eth_requestAccounts' });
// })
  return (
    <div>NewWallet
        <button onClick={fun}>Enable Ethereum</button>
    </div>
  )
}

export default NewWallet