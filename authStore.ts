import {ref, computed, onMounted} from 'vue';
import { defineStore } from "pinia";
import {currentUserInfo} from '@/api/auth';






export const authStore = defineStore("counter", () => {
  const token = ref(null);
  const userInfo = ref({
    id:'',
    username:'',
    updateTime:'',
    createTime:'',
    head:'',
    success:false,
  })

  return { token,userInfo };
});




// type MeState={
//   mePromise?: Promise<boolean> | null;
// }
// type MeActions={
//   refreshMe:()=>void
//   fetchMe:()=>void
// }
// export const useMeStore = defineStore<string,MeState,{},MeActions>('me',{
//   state:()=>({
//     mePromise:undefined
//   }),
//   actions:{
//     async refreshMe() {
//       // 使用 async/await 来处理异步操作
//       try {
//         const res = await currentUserInfo();
//         this.mePromise = Promise.resolve(res.data.success);
//       } catch (error) {
//         this.mePromise = Promise.reject(error);
//       }
//     },
//     fetchMe(){
//       this.refreshMe()
//     }
//   }
// })




