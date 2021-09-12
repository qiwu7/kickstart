import React from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import RequestRow from "../../../components/RequestRow";
import 'semantic-ui-css/semantic.min.css';

import campaignFn from "../../../ethereum/campaign";

class RequestIndex extends React.Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = campaignFn(address);
    const requestCount = parseInt(await campaign.getRequestCount());
    const approversCount = await campaign.approversCount();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((_e, index) => {
          return campaign.requests(index);
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return <RequestRow 
        key={index}
        id={index}
        request={request}
        address={this.props.address}
        approversCount={this.props.approversCount}
      />
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipeint</HeaderCell>
              <HeaderCell>ApprovalCount</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>

        <div>
          Found {this.props.requestCount} requests
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;