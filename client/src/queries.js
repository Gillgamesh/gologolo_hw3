import gql from 'graphql-tag';

export const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
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
        $text: String!,
        $color: String!,
        $fontSize: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize) {
            _id
        }
    }
`;

export const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize) {
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
