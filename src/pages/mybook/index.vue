<template>
  <div v-if="books.length">
    <Card v-for="(book, index) in books" :key='index' :book='book'></Card>
    <p class="text-footer" v-if="!more">
      没有更多数据
    </p>
  </div>
  <div v-else>
    <EmptyCard></EmptyCard>
  </div>
</template>

<script>
import { get } from '@/utils'
import Card from '@/components/Card'
import EmptyCard from '@/components/EmptyCard'
export default {
  components: {
    Card,
    EmptyCard
  },
  data () {
    return {
      openid:'',
      books: [],
      page: 0,
      more: true,
      tops: ''
    }
  },
  methods: {
    async getList (init) {
      this.openid = mpvue.getStorageSync('openid')
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      // const books = await get('/mybooklist', {page: this.page, openid: this.openid})
      const books = await get('/mybooklist', {page: this.page, openid: this.openid})

      if (books.data.list.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.data.list
        wx.stopPullDownRefresh()
      } else {
        // 下拉刷新不能直接覆盖books,而是累加
        this.books = this.books.concat(books.data.list)
      }

      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/top')
      this.tops = tops.data.list
    }
  },
  onPullDownRefresh () {
    this.getList(true)
    this.getTop()
    console.log('下拉刷新')
  },
  onReachBottom () {
    if (!this.more) {
      // 没有更多了
      return false
    }
    this.page = this.page + 1
    this.getList()
  },
  mounted () {
    this.openid = mpvue.getStorageSync('openid')
    console.log('openid', this.openid);
    this.getList(true)
    this.getTop()
  }
}
</script>

<style>

</style>