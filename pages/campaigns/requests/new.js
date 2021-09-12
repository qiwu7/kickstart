import React from "react";
import Layout from "../../../components/Layout";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { Link, Router } from "../../../routes";
import 'semantic-ui-css/semantic.min.css';

import {ethers} from "../../../ethereum/ethers";
import campaignFn from "../../../ethereum/campaign";


class RequestNew extends React.Component {
  state = {
    value: "",
    description: "",
    recipient: ""
  }

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  render() {
    return (
      <Layout>
        <h3>New Reqeust</h3>
        <Form>
          <Form.Field>
            <label>Description</label>
            <Input 
              value={this.state.description}
              onchange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input 
              value={this.state.value}
              onchange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipeint</label>
            <Input 
              value={this.state.recipient}
              onchange={event => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>

          <Button primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
