
<template>
  <q-card-section class="q-pa-xl bg-white justify-center flex column items-center">
    <img
      height="500"
      :src="require('assets/tumi-icon-high.jpeg')"
      class="q-mr-sm"
    />
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        style="width: 500px; "
        class="q-gutter-md q-mt-lg"
      >
        <q-input
          filled
          v-model="email"
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
          v-model="password"
          label="비밀번호"
          lazy-rules
          type="password"
          :rules="[ val => val && val.length > 0 || '비밀번호를 입력해주세요.']"
        >
          <template v-slot:before>
            <q-icon name="lock" />
          </template>
        </q-input>
        <div class="justify-between flex">
          <q-btn label="회원가입" color="primary" flat class="q-ml-sm" @click="$router.push({name: 'signUp'})" />
          <q-btn label="로그인" type="submit" color="primary"/>
        </div>
      </q-form>

  </q-card-section>
</template>
<script>
import Vue from 'vue'

export default {
  data() {
    return {
      email: '',
      password: ''

    }
  },
  methods: {
    async onSubmit() {
      console.log({
        email: this.email,
        password: this.password
      })
      Vue.prototype.$axios.post('/users/login/',
        {
          email: this.email,
          password: this.password
        }
      ).then(response => {
        console.log(response)
        this.$q.dialog({
          title: '회원가입 성공',
          message: '회원가입이 완료되었습니다.',
          cancel: true,
          persistent: true
        }).onOk(data => {
        // console.log('>>>> OK, received', data)
        })
      }).catch(e => {
        const res = e.response.data
        const messages = []

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
      this.email = null
      this.password = null
    }

  }
}
</script>
