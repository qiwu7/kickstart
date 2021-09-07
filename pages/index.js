import React from "react";
import { Button, Card } from "semantic-ui-react";
import Layout from "../components/layout";
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
      <Layout>
        <div>
          <h2>Campaigns Index!</h2>
          {this.renderCampaigns()}
          <Button
            content="Create Campaign"
            icon="add"
            primary
          />
        </div>
      </Layout>
    );
  }
}
export default CampaignIndex;