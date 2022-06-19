<template>
  <v-dialog
    v-model="isVisible"
    width="378"
    content-class="bg-white text-center"
  >
    <div class="text-right">
      <button @click.stop="$emit('close')" class="btn-close bg-primary">
        <div class="btn-close__icon" />
      </button>
    </div>

    <div class="px-7 pb-4">
      <h2 class="text-title --c-prm text-left pt-3 pb-3"> {{header}} </h2>
      <div class="text-normal  --c-medium-gray text-left pb-11"> {{description}} </div>

      <!--Total cancellation fee START-->
      <v-container >
          <v-row>
            <v-col class="--c-prm  pa-0 py-0 text-left">
              <div v-if="cash" class="text-normal font-weight-bold --c-prm text-left  pt-3 pb-3"> 合計キャンセル料金 </div>
              <div v-else class="text-normal font-weight-bold --c-prm text-left  pt-3 pb-3"> 合計キャンセル < ポイント名 > </div>
            </v-col>
            <v-col class="d-flex flex-column justify-center pa-0 pb-1" :class="aClass">
              <span class="text-right">
              <span class="text-title font-weight-bold --c-prm text-right">00,000</span>
              <span v-if="cash" class="text-normal font-weight-bold --c-prm text-right">円</span>
              <span v-else class="text-normal font-weight-bold --c-prm text-right">ポイント</span>
            </span>
            </v-col>
          </v-row>
      </v-container>
      <!--Total cancellation fee END-->

      <v-divider class="pt-1"></v-divider>

      <!--Breakdown of cancellation fee START-->

      <div class="text-normal --c-bg text-left font-weight-bold f-w-100 pt-7 pl-1 pb-5" > キャンセル料金内訳 </div>
      <v-container v-for="detail in details" :key="detail.id" class="mb-6">
        <v-row>
          <div style="border-top: 1px solid #707070;width: 100%;"></div>
        </v-row>
        <v-row>
          <v-col class="--c-bg text-left px-0">
            予約日時
          </v-col>
          <v-col class="font-weight-bold --c-prm pl-0">
            2022/11/3（金）
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          <v-col class="--c-bg text-left px-0 col-7">
            キャンセルポリシー
          </v-col>
          <v-col class="text-left font-weight-bold col-5 --c-prm px-0">
            100％
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          <v-col class="--c-bg text-left pl-0 col-7">
            キャンセル料金
          </v-col>
          <v-col class="text-left col-5 font-weight-bold --c-prm pl-0">
            000pt
          </v-col>
        </v-row>
        <v-row>
          <div style="border-top: 1px solid #707070;opacity: 1;width: 100%;"></div>
        </v-row>
      </v-container>

      <!--Breakdown of cancellation fee END-->

      <!--Total cancellation fee START-->
      <v-container >
        <v-row>
          <v-col class="--c-prm  pa-0 py-0 text-left">
            <div v-if="cash" class="text-normal font-weight-bold --c-prm text-left  pt-3 pb-3"> 合計キャンセル料金 </div>
            <div v-else class="text-normal font-weight-bold --c-prm text-left  pt-3 pb-3"> 合計キャンセル < ポイント名 > </div>
          </v-col>
          <v-col class="text-regular d-flex flex-column justify-center pa-0 pb-1" :class="aClass">
            <span class="text-right">
              <span class="text-heading font-weight-bold --c-prm text-right">00,000</span>
              <span v-if="cash" class="text-normal font-weight-bold --c-prm text-right">円</span>
              <span v-else class="text-normal font-weight-bold --c-prm text-right">ポイント</span>
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
      </v-container>
      <!--Total cancellation fee END-->

      <div v-if="!cash">
        <v-container v-for="item in items" :key="item.id" >
          <v-row>
            <v-col class="--c-prm  pa-0 py-0 text-left col-4 ">
              <div class="text-normal font-weight-bold --c-prm text-left pt-3 pb-3"> {{item.head}}> </div>
            </v-col>
            <v-col class="d-flex flex-column justify-center pa-0  col-8 --c-prm" style="display: flex" :class="aClass">
              <div class="text-right">
                <span class="text-small font-weight-bold --c-prm text-right  pa-3 pr-2 "> 現在 </span>
                <span class="text-title font-weight-bold">{{item.point}}</span>
                <span class="text-x-small font-weight-bold">ポイント</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-divider></v-divider>
          </v-row>
        </v-container>
      </div>

      <div v-if="cash">
        <!--Use Vacations Points for payment START-->
        <v-container>
          <v-row>
            <v-col class="--c-prm col-1 pa-0 text-left">
              <v-checkbox>
              </v-checkbox>
            </v-col>
            <v-col class="d-flex flex-column justify-center col-11" :class="aClass">
              <div class="--c-gg text-left">支払いにバケーションズポイントを利用</div>
            </v-col>
          </v-row>
        </v-container>
        <!--Use Vacations Points for payment END-->

        <!--Number of points used START-->
        <div class="--c-gg text-left pt-5 pb-2" >利用ポイント数</div>
        <v-container >
          <v-row>
            <v-col class="--c-prm  pa-0 py-0 text-left">
              <v-text-field class="mt-0 "
                            solo
                            hide-details="true"
              >
              </v-text-field>
            </v-col>
            <v-col class="text-regular d-flex flex-column justify-end pa-0 pb-1" :class="aClass">
              <div class="--c-gg pl-3 text-left">ポイント</div>
            </v-col>
          </v-row>
        </v-container>
        <div class="--c-prm font-weight-bold text-left pt-2 pb-2">(所持ポイント数:XXXXXpt)</div>
        <!--Number of points used END-->
      </div>

      <!--Enter your login password START-->
      <div class="--c-bg text-left f-w-100 pt-7 pl-1 pb-2"> ログインパスワードを入力してください </div>

      <v-text-field class="mt-0 mb-6"
      solo
      hide-details="true"
      >
      </v-text-field>
      <!--Enter your login password END-->

      <v-btn rounded height="57" width="262" class="bg-primary --c-white text-medium font-weight-bold mb-3">
        予約キャンセル
      </v-btn>
      <v-btn rounded height="57" width="262" class="bg-silver --c-prm text-medium font-weight-bold mb-3">
        戻る
      </v-btn>
    </div>

  </v-dialog>
</template>

<script>
export default {
  name: 'ReservationCancellation',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    aClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      header: '本当に予約をキャンセルしますか？',
      description: 'キャンセルポリシーに従って以下の料金がキャンセル料として登録のクレジットカードに請求されます。',
      cash: true,
      details: [
        {
          date: '2022/11/3（金）',
          policy: '100％',
          сommission: ''
        },
        {
          date: '2022/11/3（金）',
          policy: '100％',
          сommission: ''
        },
        {
          date: '2022/11/3（金）',
          policy: '100％',
          сommission: ''
        }
      ],
      items: [
        {
          head: '返還2020年度\n' + '<ポイント名>',
          point: '00,000'
        },
        {
          head: '返還2021年度\n' + '<ポイント名>',
          point: '00,000'
        }
      ]
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
  }
}
</script>

<style lang="scss" scoped>
  .f-w-100 {
    font-weight: 300;
  }

</style>
