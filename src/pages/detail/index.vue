<template>
  <div>
    <BookInfo :info="info"></BookInfo>
  </div>
</template>

<script>
import {get} from '@/utils'
import BookInfo from '@/components/BookInfo'
export default {
  components: {
    BookInfo
  },
  data () {
    return {
      bookid: '',
      info: ''
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.data.title
      })
      this.info = info.data
      console.log('info1', this.info)
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  }
}
</script>

<style>

</style>