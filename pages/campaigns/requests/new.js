import React from "react";
import Layout from "../../../components/Layout";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { Link, Router } from "../../../routes";
import 'semantic-ui-css/semantic.min.css';

import { ethers, signer } from "../../../ethereum/ethers";
import campaignFn from "../../../ethereum/campaign";


class RequestNew extends React.Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    errorMessage: "",
    loading: false
  }

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { description, value, recipient } = this.state;
    this.setState({ loading: true, errorMessage: "" })

    try {
      const campaign = campaignFn(this.props.address);
      const campaignWithSigner = campaign.connect(signer);
      await campaignWithSigner.createRequest(
        description,
        ethers.utils.parseEther(value),
        recipient
      );
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>
            Back
          </a>
        </Link>
        <h3>New Reqeust</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipeint</label>
            <Input
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
