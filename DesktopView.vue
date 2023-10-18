<template>
  <Desktop />
  <Taskbar />
</template>

<script setup lang="ts">
// import {onMounted, ref} from "vue";
//
// interface Props {
//   foo: string;
//   bar?: number;
// }
//
// const props = defineProps<Props>();
//
// const msg = ref("msg");
// const ifreamArr = ref([
//   {
//     type: "iframe",
//   },
//   {
//     type: "iframe",
//   },
//   {
//     type: "window",
//   }
// ])
//
// const add = () => {
//   ifreamArr.value.push({
//     type: "iframe"
//   });
//   console.info(ifreamArr);
// }
//
// onMounted(() => {
//   alert(1)
// })
//
// // 基于类型
// const emit = defineEmits<{
//   (e: 'change', id: number): void
//   (e: 'update', value: string): void
// }>()
import Desktop from "@/components/aionWindow/ADesktop.vue";
import Taskbar from "@/components/aionWindow/ATaskbar.vue";
import {currentUserInfo} from '@/api/auth';
import {onMounted} from 'vue';
import router from '@/router';
import {authStore} from '@/stores/authStore';
import {Message} from 'view-ui-plus';

onMounted(()=>{
    currentUserInfo()
        .then((res)=>{

                if (res.data.success){
                    // const store = authStore()
                    // store.userInfo =  res.data.data.user
                    authStore().userInfo.id = res.data.data.user.id
                    authStore().userInfo.username = res.data.data.user.username
                    authStore().userInfo.updateTime = res.data.data.user.updateTime
                    authStore().userInfo.createTime = res.data.data.user.createTime
                    authStore().userInfo.head = res.data.data.user.head
                    authStore().userInfo.success = res.data.success
                }
                console.log(res.data);

            }
        )
        .catch((error) => {
            Message.error(error.message);
        });

})

</script>

<style scoped lang="scss">
.aion-window-desktop-view {
  position: relative;
}
</style>
