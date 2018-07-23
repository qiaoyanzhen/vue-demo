<template>
  <div class="hello">
  
 <router-view/>

  </div>
</template>

<script>
export default {
  name: 'new',
  data () {
    return {
      msg: 'new  page'
    }
  },
  beforeRouteEnter:(to,from,next)=>{
  	//console.log("进入之前")
  	next()
  },
  beforeRouteLeave:(to,from,next)=>{
  //	console.log("退出之前");
  	next()
  }
}
</script>

<style scoped>
a{color: #000;}
</style>
