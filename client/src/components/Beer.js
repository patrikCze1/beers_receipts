import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const BEER_QUERY = gql`
  query Beer($id: Int!) {
    beer(id: $id) {
      id
      name
      description
      first_brewed
      image_url
      abv
      ibu
      ebc
      srm
      ph
      food_pairing
      ingredients {
        yeast
        malt {
          name
          amount {
            value
            unit
          }
        }
        hops {
          name
          amount {
            value
            unit
          }
          add
          attribute
        }
      }
    }
  }
`;

const Beer = (props) => {
  let { id } = props.match.params;
  id = parseInt(id);
  const { loading, error, data } = useQuery(BEER_QUERY, {
    variables: { id },
  });

  console.log(data);
  if (loading) return <h2>Loading</h2>;
  if (error) return <h2>Error</h2>;
  const beer = data.beer[0];

  return (
    <div>
      <div className="center">
        <h1>{beer.name}</h1>
      </div>
      <div className="row">
        <div className="col s4">
          <img className="" src={beer.image_url} height='250' />
        </div>

        <div className="col s8">
          <p style={styles.text}>{beer.description}</p>
        </div>
      </div>

      <div className="row" style={{marginTop: 40}}>
        <div className="col s6">
          <h3>Info</h3>
          <div>
            <p>
              <b>Abv:</b> {beer.abv}
            </p>
            <p>
              <b>Ibu:</b> {beer.ibu}
            </p>
            <p>
              <b>Ebc:</b> {beer.ebc}
            </p>
            <p>
              <b>Srm:</b> {beer.srm}
            </p>
            <p>
              <b>Ph:</b> {beer.ph}
            </p>
          </div>
        </div>

        <div className="col s6">
          <h3>Food pairing</h3>
          {beer.food_pairing.map((pair) => (
              <p style={{ fontSize: 16 }}>{pair}</p>
          ))}
        </div>
      </div>

      <div style={{marginTop: 40}}>
        <h3>Ingredients</h3>
      </div>

      <div className="row">
        <div className="col s4">
          <h4>Malt</h4>
          {beer.ingredients.malt.map((malt) => (
            <div style={styles.borderTop}>
              <p style={styles.title}>{malt.name}</p>
              <p>
                <b>Amount:</b> {malt.amount.value} {malt.amount.unit}
              </p>
            </div>
          ))}
        </div>

        <div className="col s4">
          <h4>Hops</h4>
          {beer.ingredients.hops.map((hop) => (
            <div style={styles.borderTop}>
              <p style={styles.title}>{hop.name}</p>
              <p>
                <b>Amount:</b> {hop.amount.value} {hop.amount.unit}
              </p>
              <p>
                <b>When add:</b> {hop.add}
              </p>
              <p>
                <b>Attribute:</b> {hop.attribute}
              </p>
            </div>
          ))}
        </div>

        <div className="col s4">
          <h4>Yeast</h4> {beer.ingredients.yeast}
        </div>
      </div>
    </div>
  );
};

const styles = {
  malt: {
    borderTop: 1,
    borderColor: "black",
  },
  title: {
    fontSize: 20,
  },
  borderTop: {
    borderTop: "1px solid gray",
  },
  text: {
    fontSize: 18,
  },
};

export default Beer;
