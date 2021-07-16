<template>
  <div id="app">  
    
    <Menu></Menu>  
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  name:'App',
  components:{
    Menu
  }
}
</script>

<style>
.container-fluid{
  height:100vh;
}

</style>
