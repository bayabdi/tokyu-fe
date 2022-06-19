<template>
  <v-dialog
    v-model="isVisible"
    max-width="378"
    content-class="bg-white text-center"
  >
    <div class="text-right">
      <button @click.stop="$emit('close')" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>
    <div class="px-6">
      <h2 class="mt-n7 mb-5 text-heading --c-prm">{{ $t('text.roomType.title') }}</h2>
      <p class="text-medium --w-bold --c-light-gray">{{ $t('text.roomType.text') }}</p>
      <v-row class="ma-0">
        <v-col cols="6" v-for="tag in tags" :key="tag">
          <v-checkbox
            v-model="selectedTags"
            :value="tag"
            :label="tag"
            color="primary"
            class="normal-label"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-btn
        color="primary"
        @click="confirm"
        elevation="2"
        large
        rounded
        class="my-10 text-medium --w-bold"
      >
        {{ $t('buttons.completeSelection') }}
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'RoomType',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  async mounted () {
    await this.$doLoading(async () => {
      this.tags = await this.$store.dispatch('getSearchTags')
    })
  },
  watch: {
    value (newValue) {
      this.selectedTags = newValue
    }
  },
  data () {
    return {
      tags: [],
      selectedTags: ['']
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm', this.selectedTags.filter(t => !!t))
    }
  }
}
</script>
