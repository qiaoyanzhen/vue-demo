<template>
  <div id="app">
				<el-menu
				  :default-active="activeIndex2"
				  class="el-menu-demo"
				  mode="horizontal"
				  @select="handleSelect"
				  background-color="#545c64"
				  text-color="#fff"
				  active-text-color="#ffd04b">
				  <el-menu-item index="1">处理中心</el-menu-item>
				  <el-submenu index="2">
				    <template slot="title">我的工作台</template>
				    <el-menu-item index="2-1">选项1</el-menu-item>
				    <el-menu-item index="2-2">选项2</el-menu-item>
				    <el-menu-item index="2-3">选项3</el-menu-item>
				    <el-submenu index="2-4">
				      <template slot="title">选项4</template>
				      <el-menu-item index="2-4-1">选项1</el-menu-item>
				      <el-menu-item index="2-4-2">选项2</el-menu-item>
				      <el-menu-item index="2-4-3">选项3</el-menu-item>
				    </el-submenu>
				  </el-submenu>
				  <el-menu-item index="3" >消息中心</el-menu-item>
				  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
				</el-menu>
				<el-row class="tac">
				  <el-col :span="4">
				    <el-menu
				      :default-active="$route.path"
				      :unique-opened=true
				      :collapse-transition=false
				      class="el-menu-vertical-demo"
				      background-color="#545c64"
				      text-color="#fff"
				      active-text-color="#ffd04b"
				      router>
				      <el-submenu index="/new">
				        <template slot="title">
				          <i class="el-icon-location"></i>
				    				<span>新闻页</span>
				    				
				        </template>
					        <el-menu-item-group>
					        	 <el-menu-item index="/new/new1">新闻页1</el-menu-item>
					       		<!--<router-link to="">新闻页1</router-link>-->
					        </el-menu-item-group>
					        <el-menu-item-group>
					        	 <el-menu-item index="/new/new2/222/111">新闻页2</el-menu-item>
					        	  <!--<router-link to="/new/new2/222/111">新闻页2</router-link>-->
					        </el-menu-item-group>
				      </el-submenu>
				      <el-menu-item index="/">
				      	
				        <i class="el-icon-menu"></i>
				        <span>首页</span>
				        <!--<router-link to='/'>首页</router-link>-->
				      </el-menu-item>
				      <el-menu-item index="/gohome">
				        <i class="el-icon-document"></i>
				        <span>返回首页</span>
				        <!--<router-link to='/gohome'>返回首页</router-link>-->
				      </el-menu-item>
				      <!--<el-menu-item index="4">
				        <i class="el-icon-setting"></i>
				        <span @click="goback">后退</span>
				      </el-menu-item>-->
				    </el-menu>
				  </el-col>
				   <el-col :span="20">
				   	     <transition name='fade' mode="out-in">
						     	 <router-view/>
						     </transition>
				   	</el-col>
				</el-row>
    <div>
    	<!--<button @click="gogo">前进</button>-->
    	
<!--    	<button @click="home">首页</button>-->
    	
    	
    </div>

   
     


   
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return {
  		activeIndex: '1',
      activeIndex2: '1'
  	}
  },
  methods:{
  	goback(){
  		this.$router.go(-1)
  	},
//	gogo(){
//		this.$router.go(1)
//	},
//	home(){
//		this.$router.push("/")
//	},
  	handleSelect(key, keyPath) {
        //console.log(key, keyPath);
     },
      handleOpen(key, keyPath) {
          console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
          console.log(key, keyPath);
      }
  }
}
</script>

<style>
	html,body{width: 100%;height: 100%;padding: 0;margin: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
/*button{background: none;border:0;color: #fff;width: 60px;}*/
.fade-enter{
	opacity: 0;
}
.fade-enter-active{

	transition:opacity .5s
}
.fade-leave{
	opacity: 1;
}
.fade-leave-active{
	opacity: 0;
	transition:opacity .5s
}
</style>
