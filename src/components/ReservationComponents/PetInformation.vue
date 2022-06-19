<template>
  <div>
    <div class="bg-white">
      <div class="bg-primary guest-form-header">
        <div class="text-title --c-white text-center font-weight-bold pt-3 pb-3">
          {{ $t('booking.accompanyingPets') }}
        </div>
      </div>
      <!--  -->
      <div class="px-4 mb-4">

        <!--Pet use or not BEGIN-->
        <v-radio-group
          hide-details
          v-model="hasPet"
          @change="toggleHasPet"
        >
          <v-container>
            <v-row>
              <v-col
                class="radio-border d-flex py-2 mr-1 pr-0 mb-3"
                v-for="item in radio"
                :key="item.value"
              >
                <v-radio
                  class="px-0"
                  :value="item.value"
                ></v-radio>
                <div class="d-flex flex-column">
                  <div class="text-medium">
                    {{ $t('common.pets') }}
                  </div>
                  <h1 class="text-medium --c-prm">
                    {{ item.use }}
                  </h1>
                </div>

              </v-col>
              <v-col class="col-2 px-0 d-flex flex-column justify-center">
                <span class="text-small text-center --c-white px-0 bg-pink rounded-4 py-1 mx-2">
                  {{ $t('reservationAndUsageHistory.mandatory') }}
                </span>
              </v-col>
            </v-row>
          </v-container>
        </v-radio-group>
        <!--Pet use or not END-->
        <template v-if="hasPet">
          <!--Number of cars header BEGIN-->
          <div class="text-medium pt-6 pb-3">
            {{ $t('booking.petsNumber') }}
            <span class="text-small col-2 text-center --c-white px-0 bg-pink rounded-4 py-1 px-2">
              {{$t('reservationAndUsageHistory.mandatory')}}
            </span>
          </div>
          <v-container>
            <v-row>
              <v-col class="text-medium col-5 --c-bg px-0 py-1">
                <v-select
                  hide-details="true"
                  solo
                  :items="[1,2,3,4,5]"
                  v-model="petCount"
                ></v-select>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-container>
          <!--Number of cars END-->
          <FormLabel :label="$t('booking.breeds')" />
          <div>
            <v-text-field
              v-model="breed"
              solo
            />
          </div>
          <div class="d-flex">
            <v-checkbox v-model="vaccinated">
              <template v-slot:label>
                <span class="text-medium mr-2 --c-bg">{{ $t('booking.allPetsAreVaccinated') }}</span>
                <span class="text-small col-2 text-center --c-white px-0 bg-pink rounded-4 py-1 px-2">
                  {{ $t('reservationAndUsageHistory.mandatory') }}
                </span>
              </template>
            </v-checkbox>
          </div>
        </template>
      </div>
      <!--Pet lot format END-->
    </div>
  </div>
</template>

<script>
import FormLabel from '../Inputs/FormLabel'

export default {
  name: 'ChangePetInformation',
  components: { FormLabel },
  props: {
    btn: {
      Boolean
    },
    value: {
      type: [Array, Number],
      default: () => []
    }
  },
  methods: {
    emitInput (pets) {
      this.$emit('input', pets)
    },
    toggleHasPet (hasPet) {
      this.hasPet = !hasPet
      if (!hasPet) {
        this.emitInput(null)
      }
    }
  },
  data () {
    return {
      hasPet: true,
      radio: [
        { use: this.$t('booking.accompaniedBy'), value: true },
        { use: this.$t('booking.unaccompaniedBy'), value: false }
      ]
    }
  },
  computed: {
    petCount: {
      get () { return this.value.petNumber },
      set (newNumber) {
        this.emitInput({
          ...this.value,
          petNumber: newNumber
        })
      }
    },
    breed: {
      get () { return this.value.petBreed },
      set (newBreed) {
        this.emitInput({
          ...this.value,
          petBreed: newBreed
        })
      }
    },
    vaccinated: {
      get () { return this.value.vaccinated },
      set (newVaccinated) {
        this.emitInput({
          ...this.value,
          vaccinated: newVaccinated
        })
      }
    },
    isPetManaged () {
      return this.$store.getters.isPetManagedFacility
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'src/assets/styles/modules/variables-scss' as v;

::v-deep {
  .v-radio {
    label {
      font-size: var(--font-size__medium);
      color: var(--color__ue-red);
      font-weight: bold !important;
    }
  }
  .rounded-10 {
    border: solid 1px var(--color__primary);
  }
  @media (max-width: v.$breakpoint__x-small - 1) {
    .rounded-10 {
      padding: 12px !important;
    }
  }
}
.opacity-9 {
  opacity: 0.9;
}
</style>
