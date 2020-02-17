<template>
  <div class="home">
    <Head />
    <Select />
    <WaterfallList />
  </div>
</template>

<script>
// @ is an alias to /src
import Head from '@/components/Head.vue'
import WaterfallList from '@/components/WaterfallList.vue'
import Select from '@/components/Select.vue'
export default {
  name: 'Home',
  components: {
    Head,
    WaterfallList,
    Select
  }
}
</script>
