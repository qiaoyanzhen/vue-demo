import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import New from '@/components/new'
import New1 from '@/components/new1'
import New2 from '@/components/new2'
import Error from '@/components/error'


Vue.use(Router)


export default new Router({
	//mode:'history/hash',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
     {
      path: '/new',
      name: 'new',
      component: New,
      children:[
      {path:'/',component:New},
      {path:'new1',component:New1},
      {path:'new2/:newId/:newTitle',component:New2}
      ]
    },
    {
    	path:'/gohome',
    	redirect:"/"
    },
    {
    	path:"*",
    	component:Error
    }
  ]
})
