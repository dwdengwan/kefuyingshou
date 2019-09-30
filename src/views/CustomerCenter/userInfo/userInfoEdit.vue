<template>
    <div class="userInfoEdit">
      <userInfo :isEdit="isEdit"></userInfo>
    </div>
</template>
<script>
import userInfo from "@/components/userInfo/ctmInfo.vue"
export default {
  name:"userInfoEdit",
  components:{
    userInfo
  },
  data(){
    return{
      isEdit:true
    }
  }
}
</script>
<style lang="scss">
.userInfoEdit{
  width: 100%;
  height: calc(100% - 40px);
  overflow: auto;
}
</style>

