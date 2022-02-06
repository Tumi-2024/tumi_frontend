
<template>
  <q-card-section class="q-pa-xl bg-white">
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
        <q-btn label="초기화" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="가입 신청" type="submit" color="primary"/>
      </div>
    </q-form>

  </q-card-section>
</template>
<script>
import Vue from 'vue'

export default {
  data() {
    return {
      id: '',
      password: ''

    }
  },
  methods: {
    async onSubmit() {
      console.log({
        id: this.id,
        password: this.password
      })
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
}
</script>
