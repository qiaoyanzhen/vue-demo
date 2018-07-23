<template>
  <div class="hello">
    <el-button type="primary" :class="{'red':radio==='2'}">主要按钮</el-button>
    <!--radio==1?'':'red'-->
    <!--{'red':radio==='2'}-->
    <template>
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>
    </template>
    <template>
      <el-table
        v-show="radio==1"
        :data="tableData"
        style="width: 100%;padding:15px">
        <el-table-column
          prop="content"
          label="日期"
          width="500"
        align="center">
        </el-table-column>
        <el-table-column
          prop="hashId"
          label="姓名"
          width="280"
        align="center">
        </el-table-column>
        <el-table-column
          prop="unixtime"
          label="地址"
        align="center">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        radio:'1',
        tableData:[]
      }
    },
    created(){
      this.tableGetData()
    },
    watch:{
        radio(val,oldVal){
            console.log(val)
          console.log(oldVal)

        }
    },
    methods: {
        tableGetData(){
//          "https://bird.ioliu.cn/joke/rand?type=text"
          axios.get("../../static/kk.json",{
            params: { 'key': 'value' }
          }).then((response)=> {
              if(response.status == 200){
               //console.log(response.data.data);

                this.tableData = response.data.data
                for(var i=0;i<this.tableData.length;i++){
                  this.tableData[i].unixtime = this.formatDate(this.tableData[i].unixtime)
                  //console.log(this.formatDate(this.tableData[i].unixtime))
                }
              }

          }).catch(function (error) {
            alert(error);
          });
        },
        formatDate(now) {
          var time = new Date(now);
          var y = time.getFullYear();//年
          var m = time.getMonth() + 1;//月
          var d = this.time(time.getDate());//日
          var h = this.time(time.getHours());//时
          var mm = this.time(time.getMinutes());//分
          var s = this.time(time.getSeconds());//秒

          return  h+":"+mm+":"+s;
        },
      time(t){
            return t<10?"0"+t:t
      }
    }
  };

</script>

<style scoped>
.red{
  background: red;
}
</style>
