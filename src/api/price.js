import { apolloClient } from '@/plugins/apollo'
import gql from 'graphql-tag'
export async function calcSalesTax (
  price,
  { taxType } = {}
) {
  const res = await apolloClient.query({
    query: gql`query ($price: Int!, $taxType: TaxType!) {
      salesTax(
        price: $price
        salesTaxType: $taxType
      ) {
        totalPrice
        salesTax
        priceWithoutSalesTax
      }
    }`,
    variables: {
      price,
      taxType: taxType || 'Normal'
    }
  })

  return res.data.salesTax
}
