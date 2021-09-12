import { ethers } from "ethers";

let provider;
let signer;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and matamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
} else {
  // We are on the server *OR* the user is not running metamask
  provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/212009411b2846588674ff677abf0fa5");
}

export { ethers, provider, signer };
