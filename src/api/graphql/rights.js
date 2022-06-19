import gql from 'graphql-tag'

export const MY_EXPIRING_RIGHTS = gql`
    query {
        myExpiringRights {
            rights {
                text # String!
                expireDate #DateString!
            }
        }
    }
`
