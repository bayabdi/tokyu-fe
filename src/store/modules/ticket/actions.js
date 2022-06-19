import { apolloClient } from '@/plugins/apollo';
import { REGISTER_EMAIL_TICKET } from '@/api/graphql/ticket'
export default {

  async registerEmailToTicket (_ctx, {
    ticketNo, secret, email
  }) {
    return apolloClient.mutate({
      mutation: REGISTER_EMAIL_TICKET,
      variables: {
        ticketNo, secret, email
      }
    })
  }
}
