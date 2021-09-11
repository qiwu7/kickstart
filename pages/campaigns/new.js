import React from "react";
import {
   Button, 
   Form, 
   Input,
   Message,
} from "semantic-ui-react";
import Layout from "../../components/layout";
import "semantic-ui-css/semantic.min.css";
import factory from "../../ethereum/factory";
import { signer } from "../../ethereum/ethers";

class CampaignNew extends React.Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      errorMessage: "",
      loading: true
    });

    try {
      const factoryWithSigner = factory.connect(signer);
      await factoryWithSigner.createCampaign(this.state.minimumContribution);
    } catch (err) {
      this.setState({errorMessage: err.message});
    }

    this.setState({loading: false});
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei" 
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event => this.setState({minimumContribution: event.target.value})}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
