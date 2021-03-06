import React, { Component } from "react";
import Layout from "../../components/Layout"
import ContributeForm from "../../components/ContributeForm"; 
import { Card, Grid, Button } from "semantic-ui-react";
import { Link } from "../../routes"
import 'semantic-ui-css/semantic.min.css';

import campaignFn from "../../ethereum/campaign";
import { ethers } from "../../ethereum/ethers";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = campaignFn(address);
    const summary = await campaign.getSummary();

    return {
      address: props.query.address,
      minimumContribution: parseInt(summary[0]),
      balance: ethers.utils.formatEther(summary[1]),
      requestsCount: parseInt(summary[2]),
      approversCount: parseInt(summary[3]),
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description: "The manager created this campaign and can create requests to withdrawal funds.",
        style: {overflowWrap: "break-word"}
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description: "You must contribute at least this much wei to become an approver.",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description: " A request tries to withdraw money from the contract. Request must be approved by approvers."
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Number of people who have already donated to this campaign."
      },
      {
        header: balance,
        meta: "Campaign Balance (ether)",
        description: "The balance is how much money this campaign has left to spend."
      }
    ];

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
