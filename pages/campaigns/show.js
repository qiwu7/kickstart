import React, { Component } from "react";
import Layout from "../../components/layout"
import campaignFn from "../../ethereum/campaign";
import { Card } from "semantic-ui-react";
import { ethers } from "../../ethereum/ethers";
import BigNumber from "bignumber.js";
import 'semantic-ui-css/semantic.min.css';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = campaignFn(address);
    const summary = await campaign.getSummary();

    return {
      minimumContribution: parseInt(summary[0]),
      balance: parseInt(summary[1]),
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
        header: ethers.utils.formatUnits(balance),
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
      {this.renderCards()}
      </Layout>
    );
  }
}

export default CampaignShow;
