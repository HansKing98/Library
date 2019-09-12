<script>
export default {
  async created () {
    // const res = await get('/weapp/demo')
    // console.log('get data : ', res)
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.text-footer{
  text-align: center;
  font-size: 12px;
}
.text-primary{
  color:#ea5149;
}
.btn{
  color: white;
  background-color: #ea5149;
  margin-bottom: 20rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  border-radius: 10rpx;
  font-size: 16px;
}
</style>
