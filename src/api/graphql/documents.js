import gql from 'graphql-tag'

export const GET_DOCUMENTS = gql`
query {
  vacationLifeList {
    year # year 年
    month # month 付き
    url # Download URLダウンロードURL
  }
  userGuideList{
    year # year 年
    url #  Download URL ダウンロードURL
  }
  otherPublicDocList {
    docType {
      id # Category ID (grouped by this) カテゴリID（これでグループ化)
      name # Category name カテゴリ名
    }
    fileName # file nameファイル名
    url #  Download URL ダウンロードURL
  }
}
`
export const USER_GUIDE_LIST = gql`
query { userGuideList { url } }
`
