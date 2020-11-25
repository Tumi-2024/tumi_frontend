<template>
    <q-card flat class="q-mt-sm">
        <q-card-section class="card-section" style="">
            <div class="title">
                #최근 게시글
            </div>

            <div class="content">
                <div class="row area-title">
                    <img class="img" src="~assets/icons/real_estate_orange.svg" />
                    <div class="date">투미부동산</div>
                    <div class="line"></div>
                    <div class="value">20.11.02</div>
                </div>

                <div class="row area-description">
                    코로나 바이러스 세계적인 확산에 주식폭락, 부동산 폭락도 시간문제?!
                </div>

                <div class="row area-background">
                    <q-img
                        class="img-background"
                        src="~assets/icons/real_estate_background.svg"
                        native-context-menu
                        alt="Logo"
                        basic
                    />
                </div>
            </div>


        </q-card-section>
    </q-card>
</template>

<script>
    export default { };
</script>

<style lang="scss" scoped>
    .q-mt-sm {
        background: #E8E8E8;
        margin-top: -8px; 
        border-radius: 0;
        padding-top: 24px;
        padding-bottom: 24px;
        padding-left: 16x;
        padding-right: 16x;
    }

    .card-section {
        height: 326px;
        margin-bottom: 24px;
        .title {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: -1.2px;
            color: #1A1A1A;
        }
        .content {
            margin-top: 16px;
            height: 286px;
            background: #FFFFFF;
            border-radius: 5px;
        }
    }

    .area-title {
        font-size: 13px;
        line-height: 20px;
        letter-spacing: -0.98px;
        color: #909090;
        margin-top: 8px;
        margin-left: 16px;
        margin-right: 16px;
        padding-top: 16px;
        padding-bottom: 16px;
            img.img {
                margin-right: 5px;
            }
            div.date {
                padding-right: 4px;
            }
            div.line {
                border-right: 1px solid #E8E8E8;
                height: 12px;
                margin-top: 4px;
            }
            div.value {
                padding-left: 4px;
            }
    }

    .area-description {
        font-weight: 500;
        font-size: 17px;
        line-height: 24px;
        letter-spacing: -1.275px;
        color: #1A1A1A;
        margin-left: 16px;
        margin-right: 16px;
        padding-bottom: 16px;
            
    }

    .area-background {
        font-size: 13px;
        line-height: 20px;
        letter-spacing: -0.98px;
        color: #909090;
        margin-left: 16px;
        margin-right: 16px;
        padding-bottom: 16px;
            .img-background {
                height: 156px; 
                max-width: 100%; 
                border-radius: 7px;
            }
    }
</style>
