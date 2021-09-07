import { ethers } from "ethers";

let provider;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and matamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/a0f543f3aee84be8b737f8a5f89ed9b8");
}

export { ethers, provider };
