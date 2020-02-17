<template>
  <div id="WaterfallList">
    <waterfall
      :line-gap="230"
      :min-line-gap="230"
      :max-line-gap="230"
      :watch="items"
      @reflowed="reflowed"
    >
      <WaterfallSlot
        v-for="(item, index) in items"
        width="230"
        :height="item.get('height')"
        :order="index"
        :key="item.id"
        move-class="item-move"
      >
        <div class="item" :index="item.index">
          <img :src="item.get('image').url()" />
          <p>{{ item.get('name') }}</p>
        </div>
      </WaterfallSlot>
    </waterfall>
  </div>
</template>

<script>
export default {
  name: 'WaterfallList',
  props: {},
  data() {
    return {
      items: [],
      isBusy: false
    }
  },
  async mounted() {
    this.items = await this.getNet()
    // 滑动最下面获取新的数据
    window.addEventListener('scroll', () => {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop + window.innerHeight >= document.body.clientHeight) {
        if (!this.isBusy) {
          this.isBusy = true
          this.items.push.apply(this.items, this.getNet())
        }
      }
    })
  },
  methods: {
    getNet() {
      const query = new this.$AV.Query('image')
      query.include('image')
      query.include('psd')
      return query.find()
    },
    reflowed: function() {
      this.isBusy = false
    }
  }
}
</script>

<style lang="less">
#WaterfallList {
  width: 100%;
  box-sizing: border-box;
  padding: 22px 50px 50px 50px;
  .item-move {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .item {
    position: relative;
    margin: 8px;
    height: 100%;
    img {
      display: inline-block;
      width: 100%;
    }
    p {
      position: absolute;
      color: black;
      bottom: 0;
      margin: 0;
      padding: 10px;
      padding-bottom: 20px;
      background-color: #fff;
      width: 100%;
      text-align: left;
      box-sizing: border-box;
      font-size: 12px;
      word-wrap: break-word;
    }
  }
  .item:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02),
      0 16px 32px -4px rgba(0, 0, 0, 0.17);
    transform: translateY(-1px);
  }
}
</style>
