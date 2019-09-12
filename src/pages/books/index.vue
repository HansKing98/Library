<template>
  <div>
    <TopSwiper :tops='tops'></TopSwiper>
    <Card v-for="(book, index) in books" :key='index' :book='book'></Card>
    <p class="text-footer" v-if="!more">
      没有更多数据
    </p>
  </div>
</template>

<script>
import { get } from '@/utils'
import Card from "@/components/Card";
import TopSwiper from "@/components/TopSwiper";
export default {
  components:{
    Card,
    TopSwiper
  },
  data(){
    return {
      books:[],
      page:0,
      more:true
    }
  },
  methods:{
    async getList(init){
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/booklist',{page:this.page})
      
      if (books.data.list.length<10 && this.page > 0) {
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
    async getTop(){
      const tops = await get('/top')
      const tops_1 = tops.data.list
      this.tops =[tops_1.slice(0,3),tops_1.slice(3,6),tops_1.slice(6)]
      console.log('tops_1',tops_1)
      console.log('tops',this.tops)
      
      // return [res.slice(0,3),res.slice(3,6),res.slice(6)]

      // console.log('tops.length',this.tops.length)
      // console.log('type',typeof(this.tops))
    }
  },
  onPullDownRefresh(){
    this.getList(true)
    this.getTop()
    console.log('下拉刷新')
  },
  onReachBottom(){
    if (!this.more) {
      // 没有更多了
      return false
    }
    this.page = this.page+1
    this.getList()
  },
  mounted(){
    this.getList(true)
    this.getTop()
  }
}
</script>

<style>

</style>