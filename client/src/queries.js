import gql from 'graphql-tag';

export const GET_LOGO = gql`
    query logo($id: String) {
        logo(id: $id) {
            id: _id
            _id
            fontSize
            text
            borderColor
            borderThickness
            margin
            padding
            borderRadius
            backgroundColor
            color
            lastUpdate
        }
    }
`;

export const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

export const ADD_LOGO = gql`
    mutation AddLogo(
        $fontSize: Int!
        $text: String!
        $borderColor: String!
        $borderThickness: Int!
        $margin: Int!
        $padding: Int!
        $borderRadius: Int!
        $backgroundColor: String!
        $color: String!
        ) {
        addLogo(
            text: $text
            color: $color
            borderColor: $borderColor
            backgroundColor: $backgroundColor
            borderRadius: $borderRadius
            borderThickness: $borderThickness
            fontSize: $fontSize
            padding: $padding
            margin: $margin
            ) {
            _id
        }
    }
`;

export const UPDATE_LOGO = gql`
    mutation updateLogo(
        $_id: String!,
        $fontSize: Int!
        $text: String!
        $borderColor: String!
        $borderThickness: Int!
        $margin: Int!
        $padding: Int!
        $borderRadius: Int!
        $backgroundColor: String!
        $color: String!
        ) {
            updateLogo(
                id: $_id,
                text: $text
                color: $color
                borderColor: $borderColor
                backgroundColor: $backgroundColor
                borderRadius: $borderRadius
                borderThickness: $borderThickness
                fontSize: $fontSize
                padding: $padding
                margin: $margin
                ) {
                    lastUpdate
                }
        }
`;

export const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;
