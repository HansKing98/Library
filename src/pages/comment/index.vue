<template>
  <div>
  <web-view src="https://book.douban.com/subject/27060640/"></web-view>
  </div>
</template>

<script>
// import config from '@/config'
// import wx from '@/utils/wx'

export default {

  data () {
    return {
      bookid: '',
    }
  },
  computed: {

  },
  mounted () {
    this.altUrl = this.$root.$mp.query.altUrl
    this.getDetail()
  }
}
</script>

<style>

</style>
