import React from "react";
import { Button, Card } from "semantic-ui-react";
import Layout from "../components/layout";
import factory from "../ethereum/factory";
import 'semantic-ui-css/semantic.min.css';
import { Link } from "../routes";

class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.getDeployedCampaigns();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      }
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h2>Open Campaigns</h2>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add"
                primary
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}
export default CampaignIndex;