<template>
    <div class="aion-window-tray-bar">

        <!--userInfo下拉菜单-->
        <Dropdown>
            <a href="javascript:void(0)">
                <div class="userInfo">
                    <!--                    <span><img :src=authStore().userInfo.head></span>-->
                    <span><Icon custom="aion-window-icon icon-user" size="30"/></span>
                    <span>{{ authStore().userInfo.username }}</span>
                    <!--                    <span>text</span>-->
                </div>
            </a>
            <template #list>
                <DropdownMenu>
                    <DropdownItem>
                        <p @click="addWindow">个人中心</p>

                    </DropdownItem>
                    <DropdownItem @click="userQuit" divided>
                        <Icon type="ios-exit-outline" style="font-size: 20px"/>
                        退出
                    </DropdownItem>
                </DropdownMenu>
            </template>



        </Dropdown>


                <div
                        class="aion-window-tray-bar-app aw-tray-bar-show-desktop"
                        @click.stop.prevent="showDesktop"
                ></div>



    </div>

</template>

<script setup lang="ts">
    import dayjs from 'dayjs';

    import {defineAsyncComponent, getCurrentInstance, inject, onMounted, ref, shallowRef} from 'vue';
    import router from '@/router';
    import {authStore} from '@/stores/authStore';
    import {currentUserInfo, logout} from '@/api/auth';
    import {Message} from 'view-ui-plus';
    import {getWindowCenteringCoordinate} from '@/components/aionWindow/WindowUtils';
    import WindowType from '@/components/aionWindow/WindowType';
    import WindowStatus from '@/components/aionWindow/WindowStatus';

    const $bus: any = inject('$bus');
    const showDesktop = () => {
        $bus.emit('showDesktop');
    };


    const userQuit = async () => {
        const isAuthenticated = await localStorage.getItem('token') !== null;

        if (isAuthenticated) {
            logout().then(() => {
                router.push({name: 'login'});
                
                authStore().token = null;
                localStorage.removeItem('token')

                Message.success('退出成功！');
            });
        } else {
            router.push({name: 'login'});
            Message.error('退出失败');
        }
    };




    const windowManager = ref(null);
    onMounted(()=>{
        windowManager.value = getCurrentInstance()!.appContext.config.globalProperties.$WindowManager;
    })

    const addWindow = () => {
        const windowWidth = 1324;
        const windowHeight = 600;
        const windowCenteringCoordinate = getWindowCenteringCoordinate(windowWidth, windowHeight);
        let path: string = "/views/userInfo/index.vue";
        const views = import.meta.glob("/src/views/*/*.vue");
        windowManager.value.exposed.addWindow({
            type: WindowType.component,
            component: shallowRef(defineAsyncComponent(views[`/src${path}`])),
            title: "个人中心",
            taskBar: true,
            status: WindowStatus.NORMAL,
            zIndex: 1,
            icon: "icon-weibiaoti-_huabanfuben",
            width: windowWidth,
            height: windowHeight,
            ...windowCenteringCoordinate,
        });
    }

    const value = ref(false);

    const styles = {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
    };

    const formData = ref({
        name: authStore().userInfo.username,
        mailbox: '',
        nickname: '',
        password: '',
    });


    const reset = () => {
        formData.value = {
            name: authStore().userInfo.username,
            mailbox: '',
            nickname: '',
            password: '',
        };
    };
    const submit = () => {
        value.value = false;

    };


</script>

<style scoped lang="scss">
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    background: #fff;
    text-align: center
  }


  .drawer-profile {
    //.drawer_userInfo {
    //  display: flex;
    //  flex-direction: column;
    //  justify-content: center;
    //  align-items: center;
    //  margin-bottom: 30px;
    //
    //  div {
    //    &:nth-child(2) {
    //      font-size: 28px;
    //    }
    //
    //    &:nth-child(3) {
    //      color: #9999;
    //    }
    //
    //  }


    //}

  }


  .aion-window-tray-bar {
    display: inline-flex;
    width: auto;
    height: 46px;
    color: white;
    position: absolute;
    right: 0;
    align-items: center;

    .aion-window-tray-bar-app {
      display: inline-flex;
      width: 46px;
      height: 46px;
      justify-content: center;
      align-items: center;
    }

    .aion-window-tray-bar-app:hover {
      background-color: #ffffff33;
    }

    .aw-tray-bar-show-desktop {
      width: 12px;
    }

    .aw-tray-bar-show-desktop:hover {
      background-color: #795da3;
    }


    .userInfo {
      //border: 1px solid red;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 46px;
      width: 100px;
      color: white;

      &:hover {
        background-color: #031629;
      }

      span:nth-child(1) {
        display: flex;
        align-items: center;
        font-size: 24px
        //border: 1px solid red;

      }

      span:nth-child(2) {
        font-size: 18px;
        line-height: 46px
      }
    }
  }
</style>
