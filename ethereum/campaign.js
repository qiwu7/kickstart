import { ethers, provider } from "./ethers";
import Campaign from "./build/Campaign";

const campaignFn = (address) => {
  return new ethers.Contract(
    address,
    JSON.parse(Campaign.interface),
    provider
  )
};
 
export default campaignFn;
