import React from "react";
import factory from "../ethereum/factory";

class CampaignIndex extends React.Component {
  // Initialize state
  state = {
    address: ""
  };

  async componentDidMount() {
    const campaigns = await factory.getDeployedCampaigns();
    console.log(campaigns);
  }

  render() {
    return (
      <div>
        <h2>Campaigns Index!</h2>
      </div>
    );
  }
}
export default CampaignIndex;