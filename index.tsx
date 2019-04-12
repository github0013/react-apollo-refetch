import * as React from "react";
import { render } from "react-dom";
import { ApolloProvider, Query } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://graphql-pokemon.now.sh"
  }),
  cache: new InMemoryCache()
});

import gql from "graphql-tag";
const settingQuery = gql`
  query Pokemons {
    pokemons(first: 3) {
      id
      name
    }
  }
`;
const QueryElement = () => {
  return (
    <Query query={settingQuery} fetchPolicy="no-cache">
      {({ data, loading, error, refetch }) => {
        if (loading || error) {
          return <div />;
        }
        console.log("data:", data);

        return (
          <p>
            <button
              onClick={() => {
                console.log("refetching...");
                refetch();
                console.log("done");
              }}
            >
              refetch
            </button>
          </p>
        );
      }}
    </Query>
  );
};

render(
  <ApolloProvider client={client}>
    <QueryElement />
  </ApolloProvider>,

  document.getElementById("app")
);
