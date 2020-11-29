<template>
  <q-dialog v-model="modals" position="bottom">
    <q-card class=" notosanskr-regular">
      <q-card-section class="column q-pa-none">
        <div class="heading-text">
          투자매물을 <br />쉽게 찾고 관리할 수 있어요!
        </div>
        <q-btn flat class="bg-yellow q-mx-md notosanskr-medium" @click="loginKakao">
          <q-icon class="q-px-sm" size="32px">
            <img src="~assets/icons/kakao.svg" alt="" srcset="" />
          </q-icon>
          카카오로 시작하기
        </q-btn>
        <div class="notice row items-center">
          회원가입시 재미의 서비스 이용 약관과 개인정보 보호 정책에 동의하게
          됩니다.
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { loginModalStore, loginModalMutation } from "./LoginModalState";
export default {
  name: "LoginModal",
  computed: {
    modals: {
      get() {
        return loginModalStore.showModal;
      },
      set(val) {
        loginModalMutation.setModal(val);
      }
    }
  },
  created() {
    // Init Kakao
    Kakao.init('7a1ac6a5d515aa253ff2ab9e9d56e21a')
  },
  data () {
    return {
      dataLogin: {},
    }
  },
  chimera: {
    login() { return { url: `/login/`, data: this.dataLogin, method: 'post' } }
  },
  methods: {
    loginKakao () {
      // Login Kakao
      Kakao.Auth.login({
        success: function(authObj) {
          // Update user
          Kakao.API.request({
            url: '/v2/user/me',
            success: function(response) {
              const dataLogin = {}

              // Set user date
              if (response) {
                if (response.kakao_account) {
                  const res = response.kakao_account
                  dataLogin.email = res.email // sunus7@kakao.com
                  dataLogin.birthday = res.birthday // 0426
                  dataLogin.gender = res.gender // male
                }
                if (response.properties) {
                  const res = response.properties
                  dataLogin.nickname = res.nickname
                  dataLogin.profile_image = res.profile_image
                }
                this.dataLogin = dataLogin
                this.login.fetch()
              }
            }
          });
        },
        fail: function(err) {
          console.error(err)
          alert('카카오 로그인 실패하였습니다. 카카오톡을 최신 버전으로 업데이트해주세요.')
        }
      })
    }
  },
  watch: {
    modals() {}
  }
};
</script>

<style scoped>
.q-card {
  width: 100%;
  max-width: 1000px;
  height: 250px;
  border-radius: 16px;
}
.heading-text {
  font-weight: 500;
  font-size: 19px;
  line-height: 30px;
  letter-spacing: -1.575px;
  color: #1a1a1a;
  padding: 24px 16px;
}
.notice {
  height: 28px;
  background: #f6f6f6;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.9px;
  color: #909090;
  padding: 5px 16px;
  margin-top: 20px;
}
.q-btn {
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -1.425px;
  color: #1a1a1a;
  padding: 12px;
  border-radius: 8px;
}
</style>
