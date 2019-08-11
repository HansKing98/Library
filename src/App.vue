<script>
import {get} from './util'
export default {
  async created () {
    const res = await get('/weapp/demo')
    console.log('123', res);
    
    // mpvue.request({
    //   url: config.host + '/weapp/demo',
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    console.log('xcx created')
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>

</style>
