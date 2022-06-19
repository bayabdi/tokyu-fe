<template>
  <v-dialog
    v-model="insufficientPoint"
    width="378"
    content-class="bg-white text-center"
  >
    <div class="text-right">
      <button @click.stop="close()" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>
    <div class="px-6 py-4">
      <div class="text-center">{{ $t('common.numberOfPointsRemainingForThisYear') }}</div>
      <div class="text-center text-large --c-prm --w-bold my-2">
        {{ currentPoint.remainingPoint | toThousands }}
        <span class="text-medium">{{ $t('unit.points') }}</span>
      </div>
      <v-divider class="--border-light-gray" />
      <div class="d-flex justify-space-between my-2">
        <div class="align-self-center">{{ $t('booking.pointsRequired') }}</div>
        <div class="text-center text-large --c-prm --w-bold">
          {{ point | toThousands }}
          <span class="text-medium">{{ $t('unit.points') }}</span>
        </div>
      </div>
      <div class="d-flex justify-space-between mb-4">
        <div class="align-self-center">{{ $t('common.missingPoint') }}</div>
        <div class="text-center text-large --c-prm --w-bold">
          {{ (point - currentPoint.remainingPoint) | toThousands }}
          <span class="text-medium">{{ $t('unit.points') }}</span>
        </div>
      </div>
      <v-btn
        rounded
        height="57"
        class="bg-primary text-heading --c-white w-100 my-4"
        @click="goToContractDetail"
      >
        {{ $t('buttons.checkPointsHistory') }}
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'InsufficientPoint',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    point: Number,
    currentPoint: Object,
    contractId: Number
  },
  computed: {
    insufficientPoint: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) this.close()
      }
    }
  },
  methods: {
    goToContractDetail () {
      this.$router.push({
        name: 'contract-detail',
        params: {
          id: `${this.contractId}`
        }
      })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
