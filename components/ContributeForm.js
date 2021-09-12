import React from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { Router } from "../routes";

import campaignFn from "../ethereum/campaign";
import { ethers, provider, signer } from "../ethereum/ethers";

class ContributeForm extends React.Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({loading: true, errorMessage: ""})

    try {
      const campaign = campaignFn(this.props.address);
      const campaignWithSigner = campaign.connect(signer);
      await campaignWithSigner.contribute({
        value: ethers.utils.parseEther(this.state.value)
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({errorMessage: err.message})
    }

    this.setState({ loading: false, value: "" })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
