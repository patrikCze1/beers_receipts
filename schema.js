const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat,
} = require("graphql");

// Beer type
const BeerType = new GraphQLObjectType({
  name: "Beer",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    first_brewed: { type: GraphQLString },
    image_url: { type: GraphQLString },
    tagline: { type: GraphQLString },
    ingredients: { type: IngredientsType },
    abv: { type: GraphQLFloat },
    ibu: { type: GraphQLFloat },
    ebc: { type: GraphQLFloat },
    srm: { type: GraphQLFloat },
    ph: { type: GraphQLFloat },
    food_pairing: { type: GraphQLList(GraphQLString) },
  }),
});

// Beer ingredients
const IngredientsType = new GraphQLObjectType({
  name: "Ingredients",
  fields: () => ({
    yeast: { type: GraphQLString },
    malt: { type: GraphQLList(MaltType) },
    hops: { type: GraphQLList(HopsType) },
  }),
});

// ingredients malt
const MaltType = new GraphQLObjectType({
  name: "Malt",
  fields: () => ({
    name: { type: GraphQLString },
    amount: { type: AmountType },
  }),
});

// ingredients malt detail
const AmountType = new GraphQLObjectType({
  name: "Amount",
  fields: () => ({
    value: { type: GraphQLFloat },
    unit: { type: GraphQLString },
  }),
});

// ingredients hops
const HopsType = new GraphQLObjectType({
  name: "Hops",
  fields: () => ({
    name: { type: GraphQLString },
    amount: { type: AmountType },
    add: { type: GraphQLString },
    attribute: { type: GraphQLString },
  }),
});

// root query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    beers: {
      type: new GraphQLList(BeerType),
      resolve(parent, args) {
        return axios
          .get("https://api.punkapi.com/v2/beers")
          .then((res) => res.data);
      },
    },
    beer: {
      type: new GraphQLList(BeerType),
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.punkapi.com/v2/beers/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
