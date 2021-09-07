import React from "react";
import { Button, Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import 'semantic-ui-css/semantic.min.css'

class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.getDeployedCampaigns();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      }
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <h2>Campaigns Index!</h2>
        {this.renderCampaigns()}
        <Button 
          content="Create Campaign"
          icon="add"
          primary
        />
      </div>
    );
  }
}
export default CampaignIndex;