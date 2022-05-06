<template>
<div class="goods">
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">返回登录</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/register' }">返回注册</el-breadcrumb-item>
</el-breadcrumb>
<!-- 面包屑END -->
  <el-carousel :interval="4000" type="card">
    <el-carousel-item v-for="item in pictureList" :key="item.src">
      <img class="pic" :src="item.src" alt="图片丢失了"/>
    </el-carousel-item>
  </el-carousel>
<!-- 轮播图END -->
<div class="list">
  <h3>推荐商品列表</h3>
  <!-- 商品 -->
  <el-row :gutter="20" type="flex" justify="space-around">
    <el-col :span="10" :offset="1" v-for="item in pictureList" :key="item.src">
    <div class="picBox">
      <img class="listPic"  :src="item.src"/>
    </div>
    </el-col>
  </el-row>
  <!-- 图片栏END -->
  <el-row :gutter="20" type="flex" justify="space-around">
    <div v-for="item in goodList" :key="item.name">
    <el-col :span="50" :offset="2">
      <div class="infoBox">
      <span>商品名:{{item.name}}</span><br>
      <span>价格:{{item.price}} 元</span><br>
      <span>销量:{{item.sales}}</span>
      </div>
    </el-col>
    </div>
  </el-row>
  <!-- 信息栏END -->
</div>
  <!-- 商品END -->
</div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      imgList: [
        {
          name: '1',
          src: require('@/picture/1.png'),
          title: '这是1.png'
        },
        {
          name: '2',
          src: require('@/picture/2.png'),
          title: '这是2.png'
        },
        {
          name: '3',
          src: require('@/picture/3.png'),
          title: '这是3.png'
        }
      ],
      goodList: [],
      pictureList: []
    }
  },
  created () {},
  mounted () {
    this.getList()
    this.getpicList()
    this.timedRefresh()
  },
  computed: {},
  beforeDestroy () {
    clearInterval(this.timer) // 清楚定时刷新，不清除会一直运行，关闭页面也会定时刷新
  },
  methods: {
    timedRefresh () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        window.location.reload() // 每隔6s刷新整个页面
      }, 6000)
      console.log('刷新页面')
    },
    getpicList () {
      this.$axios
        .get('http://127.0.0.1/picture') // {responseType: 'blob'}
        .then((res) => {
          res.data = res.data.map((item) => {
            item.src = 'http://127.0.0.1/' + item.src
            return item
          })
          console.log(res.data)
          this.pictureList = res.data // this.pictureList = window.URL.createObjectURL(res.data)  console.log('图片' + res.data)
          console.log(this.pictureList)
        })
    },
    getList () {
      this.$axios
        .get('http://127.0.0.1/goods', {
          params: {
            // 传参
            // name: this.name,
            // price: this.price,
            // sales: this.sales
          }
        }).then((res) => {
          if (res.data.length) { // 判断是否有意义
            console.log(res.data)
            this.goodList = res.data
            // console.log('数据传输成功')
          } else {
            // console.log('数据传输失败')
          }
        })
    }
  }
}
</script>

<style>
.goods {
  margin-top: -30px;
}
.goods .pic {
  height:300px;
  width:400px;
}
.goods .el-breadcrumb {
  margin-top: 5px
}
.goods .el-carousel{
  height: 300px;
}
.goods .el-carousel__item{
  background-color:floralwhite;
}
.goods .list {
    margin-top: 50px;
}
.goods .list .listPic {
  height:200px;
  width:200px;
}
.goods .list .picBox{
  background-color: blue;
  margin-top: 20px;
  margin-left: 150px;
  height:200px;
  width:200px;
}
.goods .list .infoBox{
    background-color:white;
    border-radius: 4px;
    height:100px;
    width:200px;
    text-align:left;
}
.goods .el-row{
    background-color:bisque;
    height: 200px;
}
.goods .el-col{
  background-color:bisque;
}
</style>
