import gql from 'graphql-tag'

export const MY_WEB_NOTIFICATION_LIST = gql`
    query ($take: Int!, $skip: Int!, $important: Boolean!) {
      myWebNotificationList (pagination: {take: $take, skip:$skip},important: $important) {
        items {
          id
          title
          body
          imageUrl
        }
        hasMore
      }
    }
`

export const MY_WEB_NOTIFICATION_LIST_URGENT = gql`
  query ($take: Int!, $skip: Int!, $important: Boolean!)  {
    myWebNotificationList (pagination: {take: $take skip: $skip}  important: $important)
    {
      items {
        title # Subject 件名
        body # Text 本文
      }
    }
  }
`
