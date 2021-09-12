import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout"
import 'semantic-ui-css/semantic.min.css';

class RequestIndex extends React.Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    console.log(`campaigns/${address}/requests/new`);
    return { address };
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;