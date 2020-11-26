<template>
  <q-card flat class="q-mt-sm">
    <q-card-section
    class="sort-header row bg-white q-pa-none notosanskr-regular" style="height: 48px;">
        <p style="line-height: 48px; padding-left: 16px;">
            관심매물 <span style="color: #ff5a00;">5</span>개
        </p>
    </q-card-section> 

    <q-card-section
    class="sort-section row bg-positive q-pa-none notosanskr-regular" align="center">
        <q-btn flat class="text-primary">최신순</q-btn>
        <q-separator vertical />
        <q-btn flat>추천순</q-btn>
        <q-separator vertical />
        <q-btn flat>면적순</q-btn>
        <q-separator vertical />
        <q-btn flat>가격순</q-btn>

        <q-btn 
        flat class="absolute-right"> 
            <q-icon size="24px" style="margin-right: 3px;">
                <img src="~assets/icons/Setting.svg" alt="" />
            </q-icon>   
            편집
        </q-btn>
    </q-card-section>

  </q-card>
</template>

<script>
    export default { 
        data() {},
        components: {},
        methods: {
            
        },
        created() {},
    };
</script>

<style lang="scss" scoped>

.sort-section {
    .sort-header {
        height: 48px;
    }
    .q-btn {
        font-size: 14px;
        line-height: 44px;
        text-align: center;
        letter-spacing: -1.05px;
        color: #707070;
    }
    .q-separator {
        margin-top: 20px;
        height: 14px;
    }
}
</style>
