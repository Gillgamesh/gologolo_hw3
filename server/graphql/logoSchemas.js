var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');

const logoTypeConfig = {
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderThickness: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            color: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            backgroundColor: {
                type: GraphQLString
            },
            lastUpdate: {
                type: GraphQLDate
            },
        }
    }
}
const { _id, lastUpdate, ...updateFields } = Object.fromEntries(
    Object.entries(logoTypeConfig.fields()).map(
        ([k, v]) => [
            k,
            {
                type: new GraphQLNonNull(v.type)
            }
        ]
    )
)
var logoType = new GraphQLObjectType(logoTypeConfig);

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                // args: {
                //     text: {
                //         type: new GraphQLNonNull(GraphQLString)
                //     },
                //     color: {
                //         type: new GraphQLNonNull(GraphQLString)
                //     },
                //     fontSize: {
                //         type: new GraphQLNonNull(GraphQLInt)
                //     }
                // },
                args: updateFields,
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo;
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    ...updateFields, 
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(
                        params.id, 
                        { ...params, lastUpdate: new Date() }, 
                        function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });