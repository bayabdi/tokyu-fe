<template>
  <div class="form-container pb-15 p-relative">
    <div class="px-5">
      <h1 class="text-heading--c-prm text-center pt-10 pb-8">
        {{ $t("menu.main.exchangePoints") }}
      </h1>

      <!--=========== START Gift-ticket-list ===========-->
      <GiftTicketItem
        v-for="item in giftTicketList"
        :key="item.id"
        :pointsRequired="item.pointsRequired"
        :name="item.name"
        :place="item.place"
        :totalTickets="numOfTickets[item.id] ? numOfTickets[item.id] : 0"
        @openDialog="openExchangePointsDialog(item.id)"
      />
      <!--=========== END Gift-ticket-list ===========-->
    </div>

    <!--=========== START Available-points ===========-->
    <div
      class="bg-primary pos-sticky bottom-0 py-3 px-5 --c-white d-flex justify-space-between align-center"
    >
      <div class="d-flex">
        <span
          class="text-medium mr-5 font-weight-light"
          style="max-width: 64px;"
        >
          {{ $t("common.availablePoints") }}
        </span>
        <span class="text-large font-weight-bold">
          {{ availablePoints | toThousands }}pt
        </span>
      </div>
      <!-- Order-button -->
      <v-btn
        @click="handleOrder"
        width="106"
        height="39"
        rounded
        class="bg-white --c-prm"
      >
        {{ $t("buttons.order") }}
      </v-btn>
    </div>
    <!--=========== END Available-points ===========-->

    <!--=========== START Exchange-points-dialog ===========-->
    <CommonModal :visible="showDialog" @close="showDialog = false">
      <div v-if="showDialog">
        <h2 class="text-heading--c-prm pt-5 py-6 text-center">
          {{ $t("menu.main.exchangePoints") }}
        </h2>
        <!-- START Points-redeemable -->
        <div class="mb-4">
          <span class="text-huge font-weight-bold">
            {{ newNumOfTicket * selectedProduct.pointsRequired }}
          </span>
          <span class="text-medium--c-prm">
            {{
              newNumOfTicket * selectedProduct.pointsRequired > 1
                ? $t("unit.points")
                : $t("unit.point")
            }}
          </span>
          <span class="text-medium"> {{ $t("common.beRedeemed") }} </span>
        </div>
        <!-- END Points-redeemable -->

        <h5 class="text-left text-title--c-dark-gray">
          {{ selectedProduct.name }}
        </h5>
        <v-divider class="mt-4 mb-5" />

        <!-- START Enter-number-of-tickets -->
        <v-form
          ref="exchangePointForm"
          lazy-validation
          class="d-flex justify-space-between"
        >
          <div class="text-medium--c-medium-gray font-weight-medium">
            {{ $t("giftTicket.enterNumOfTicket.line1") }} <br />
            {{ $t("giftTicket.enterNumOfTicket.line2") }}
          </div>
          <div class="d-flex">
            <v-text-field
              ref="newNumOfTicket"
              :rules="numberRules"
              solo
              type="number"
              v-model="newNumOfTicket"
              class="center-input fixed-width"
            />
            <label class="text-medium mt-5 ml-2 mr-4">
              {{ $t("unit.tickets") }}
            </label>
          </div>
        </v-form>
        <v-btn
          @click="submitExchangePoint"
          rounded
          x-large
          block
          class="bg-primary text-heading--c-white mb-11"
        >
          {{ $t("buttons.confirmNumberOfTickets") }}
        </v-btn>
      </div>
      <!-- END Enter-number-of-tickets -->
    </CommonModal>
    <!--=========== END Exchange-points-dialog ===========-->

    <!--=========== START Insufficient-points-dialog ===========-->
    <GiftTicketExchangePointsInsufficientDialog
      :visible="dialogInsufficient"
      @close="dialogInsufficient = false"
      :minimumPoints="cartTotal"
      :currentPoint="pointToUse"
    />
    <!--=========== END Insufficient-points-dialog =============-->
  </div>
</template>

<script>
import GiftTicketItem from '@/components/GiftTicketItem'
import GiftTicketExchangePointsInsufficientDialog from './components/GiftTicketExchangePointsInsufficientDialog.vue'
import {
  formatCurrency
} from '@/utils/format'
import mixin from '../mixin'
import CommonModal from '@/views/Modal/Common'

export default {
  name: 'GiftTicketExchangePoints',
  mixins: [mixin],
  components: {
    CommonModal,
    GiftTicketItem,
    GiftTicketExchangePointsInsufficientDialog
  },
  methods: {
    formatCurrency,
    openExchangePointsDialog (id) {
      this.selectedTicketId = id
      this.newNumOfTicket = this.selectedTicketNumber
    },
    submitExchangePoint () {
      if (this.$refs.exchangePointForm.validate()) {
        this.$store.commit('putPointExchangeToCart', {
          id: this.selectedTicketId,
          quantity: this.newNumOfTicket ? parseInt(this.newNumOfTicket) : 0
        })
        this.selectedTicketId = null
      }
    },
    handleOrder () {
      if (this.availablePoints > this.cartTotal) {
        this.$router.push('/home/gift-ticket/order')
      } else {
        this.dialogInsufficient = true
      }
    }
  },
  computed: {
    selectedProduct () {
      if (!this.selectedTicketId) return null
      return this.giftTicketList.find(t => t.id === this.selectedTicketId)
    },
    showDialog: {
      get () {
        return !!this.selectedProduct
      },
      set (v) {
        if (!v) this.selectedTicketId = null
      }
    },
    selectedTicketNumber () {
      return this.numOfTickets[this.selectedTicketId] ? this.numOfTickets[this.selectedTicketId] : 0
    }
  },
  data () {
    return {
      // ------- Exchange-points-dialog --------
      selectedTicketId: null,
      // --------------------------------------
      // ----- Insufficient-points-dialog -----
      dialogInsufficient: false,
      newNumOfTicket: 0,
      numberRules: [
        v => !!v.toString().length || this.$t('rules.isRequired'),
        v => (v >= 0 && v < 100000) || this.$t('rules.invalid')
      ]
    }
  }
}
</script>
