import gql from 'graphql-tag'

export const MY_TVP_HISTORY_LIST = gql`
    query(
      $skip: Int!
      $take: Int!
    )
     {
      myTvpHistoryList(
       pagination: {
        skip: $skip
        take: $take
    }
      ) {
        items {
          pointChange #Increase/Decrease 増減
          changeReason # reason 理由
          pointsAfter # Number of remaining points after change 増減後の残ポイント数
          createdAt # Date and time 日時
          current # The latest record has this true (use pointsAfter in [0] to display the current point because the latest one comes back first)
        }
      }
    }
`
