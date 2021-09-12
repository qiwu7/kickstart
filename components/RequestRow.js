import React from "react";
import { Table, Button } from "semantic-ui-react";

import { ethers, signer } from "../ethereum/ethers";
import campaignFn from "../ethereum/campaign";

class RequestRow extends React.Component {
  onApprove = async () => {
    const campaign = campaignFn(this.props.address);
    const campaignWithSigher = campaign.connect(signer);
    await campaignWithSigher.approveRequest(this.props.id);
  };

  onFinalize = async () => {
    const campaign = campaignFn(this.props.address);
    const campaignWithSigher = campaign.connect(signer);
    await campaignWithSigher.finalizeRequest(this.props.id);
  };

  render() {
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    const description = request[0];
    const amount = ethers.utils.formatEther(request[1]);
    const recipient = request[2];
    const complete = request[3];

    return (
      <Table.Row disabled={complete} positive={readyToFinalize && !complete}>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{description}</Table.Cell>
        <Table.Cell>{amount}</Table.Cell>
        <Table.Cell>{recipient}</Table.Cell>
        <Table.Cell>
          {`${ethers.utils.formatUnits(request[4], 0)}/${ethers.utils.formatUnits(approversCount, 0)}`}
        </Table.Cell>
        <Table.Cell>
          <Button color="green" basic onClick={this.onApprove} disabled={request[3]}>
            Approve
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button color="teal" basic onClick={this.onFinalize} disabled={request[3]}>
            Finalize
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default RequestRow;