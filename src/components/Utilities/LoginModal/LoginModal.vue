<template>
  <q-dialog v-model="modals" position="bottom">
    <q-card class=" notosanskr-regular q-pa-lg">
      <q-card-section class="column">
        <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="id"
        label="아이디"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '아이디를 입력해주세요.']"
      >
        <template v-slot:before>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        filled
        v-model="password1"
        label="비밀번호"
        lazy-rules
        type="password"
        :rules="[ val => val && val.length > 0 || '비밀번호를 입력해주세요.']"
      >
        <template v-slot:before>
          <q-icon name="lock" />
        </template>
      </q-input>
      <div class="justify-end flex">
        <q-btn label="회원가입" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="로그인" type="submit" color="primary"/>
      </div>
    </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { loginModalStore, loginModalMutation } from "./LoginModalState";
import Vue from 'vue'
import { mapActions } from "vuex"

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
  data () {
    return {
      dataLogin: {}
    }
  },
  methods: {
    ...mapActions("map", [
      "changeMapMode",
      "changeMapZoom",
      "changeMapCenter",
      "getLocationInterest"
    ]),
    async onSubmit() {
      Vue.prototype.$axios.post('/users/',
        {
          id: this.id,
          password: this.password
        }
      ).then(response => {
        if (response.id === 201) {
          this.$q.notify({
            type: 'positive',
            message: '가입 요청이 완료되었습니다.'
          })
        }
      }).catch(e => {
        const res = e.response.data
        const messages = []

        // eslint-disable-next-line no-unused-vars
        for (const [_key, value] of Object.entries(res)) {
          messages.push(value + '\n')
        }

        this.$q.notify({
          type: 'negative',
          message: messages
        })
      })
    },
    onReset() {
      this.id = null
      this.password = null
    }
  }
};
</script>

<style scoped>
.q-card {
  width: 100%;
  max-width: 600px;
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
