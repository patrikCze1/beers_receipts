import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import BeerItem from "./BeerItem";

const BEERS_QUERY = gql`
  {
    beers {
      id
      name
      first_brewed
      image_url
      tagline
    }
  }
`;

function Beers() {
  const { loading, error, data } = useQuery(BEERS_QUERY);
  console.log(data);
  if (loading) return <h2>Loading</h2>;
  if (error) return <h2>Error</h2>;

  return (
    <Fragment>
      <div className="center">
        <h1>Beers</h1>
      </div>

      <div class="row">
        {data.beers.map((beer, index) => (
          <BeerItem key={index} beer={beer} />
        ))}
      </div>
    </Fragment>
  );
}

export default Beers;
