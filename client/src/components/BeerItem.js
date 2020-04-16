import React from "react";
import { Link } from "react-router-dom";

const BeerItem = (props) => {
  const beer = props.beer;
  return (
    <div class="col m4 s6">
      <Link className to={`/beer/${beer.id}`}>
        <div class="card" style={{height: 400}}>
          <div class="card-image">
            <img src={beer.image_url} className='center beers-img' />
          </div>
          <div class="card-content" >
            <span class="card-title">{beer.name}</span>
              <p>{beer.tagline}</p>
            </div>
        </div>
      </Link>
    </div>
  );
};

export default BeerItem;
