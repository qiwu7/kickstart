import { ethers, provider } from "./ethers";
// import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory";

const factoryContract = new ethers.Contract(
  "0x502c9fe7B6B73A93833b440bA54B364820b42fD1", 
  JSON.parse(CampaignFactory.interface), 
  provider
); 

export default factoryContract;
