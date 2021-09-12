import { ethers, provider } from "./ethers";
// import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory";

const factoryContract = new ethers.Contract(
  "0x8B1F8463Df09CeCe1A970CFd72A3a19A634ba8bc", 
  JSON.parse(CampaignFactory.interface), 
  provider
); 

export default factoryContract;
