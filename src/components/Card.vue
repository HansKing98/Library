<template>
    <a @click="goNav_detail">
        <div class="book-card">
            <div class="thumb">
                <img :src="book.image"
                        class="image"
                        mode="aspectFill"
                        @click.stop="prebiew"
                >
            </div>
            <div class="detail">
                <div class="row text-primary">
                    <div class="left">
                        {{book.title}}
                    </div>
                    <div class="right">
                        {{book.rate}} <Rate :value="book.rate"></Rate>
                    </div>
                </div>
                <div class="row">
                    <div class="left">
                        {{book.author}}
                    </div>
                    <div class="right">
                        浏览:{{book.count}}
                    </div>
                </div>
                <div class="row">
                    <div class="left">
                        {{book.publisher}}
                    </div>
                    <div class="right">
                        <!-- 王昊 -->
                    </div>
                </div>
            </div>
        </div>
        </a>
</template>

<script>
import Rate from '@/components/Rate'
export default {
    components:{
        Rate
    },
    props:['book'],
    computed:{
        detailUrl(){
            return '/pages/detail/main?id=' + this.book.id
        }
    },
    methods:{
        goNav_detail(){
            // var that = this
            wx.navigateTo({
                url: this.detailUrl
            })
        },
        prebiew(){
            wx.previewImage({
                current:this.book.image,
                urls:[this.book.image]
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.book-card{

    padding: 10rpx;
    overflow: hidden;
    margin: 10rpx 0;
    font-size: 14px;
    .thumb{
        width: 180rpx;
        height: 180rpx;
        float: left;
        margin: 0 auto;
        overflow: hidden;
        .image{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .detail{
        margin-left: 200rpx;
        .row{
            line-height: 40rpx;
            margin-bottom: 6rpx;
        }
        .right{
            float: right;
        }
        .left{
            float: left;
            // margin-right: 160rpx;
            width: 330rpx;
        }
    }
}
</style>