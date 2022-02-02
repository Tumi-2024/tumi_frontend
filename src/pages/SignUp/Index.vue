
<template>
  <q-card-section class="q-pa-xl bg-white">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-select
        v-model="team"
        :options="teams"
        filled
        label="소속"
        option-label="title"
        option-value="id"
        map-options
        emit-value
        :rules="[ val => val && val > 0 || '소속을 선택해주세요.']"
      >
         <template v-slot:before>
          <q-icon name="groups" />
        </template>
      </q-select>
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
        v-model="email"
        label="email"
        type="email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '이메일을 입력해주세요.']"
      >
        <template v-slot:before>
          <q-icon name="mail" />
        </template>
      </q-input>
      <q-input
        filled
        v-model="username"
        label="사용자 이름"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '사용자 이름을 입력해주세요.']"
      >
        <template v-slot:before>
          <q-icon name="label" />
        </template>
      </q-input>
      <q-input
        filled
        v-model="phone"
        label="전화번호"
        lazy-rules
        mask="###-####-####"
         :rules="[ val => val && val.length > 0 || '전화번호를 입력해주세요.']"
      >
        <template v-slot:before>
          <q-icon name="phone" />
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
      <q-input
        filled
        v-model="password2"
        label="비밀번호 확인"
        type="password"
        lazy-rules
        :rules="[ val => this.password1 === val || '비밀번호가 일치하지 않습니다.']"
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
      teams: [],
      team: '',
      id: '',
      email: '',
      username: '',
      phone: '',
      password1: '',
      password2: ''

    }
  },
  async beforeMount() {
    console.log('beforeMoount')
    const { data } = await Vue.prototype.$axios
      .get(`/teams/`)
    console.log(data)
    this.teams = data.results
  },
  methods: {
    async onSubmit() {
      console.log({
        team: this.team,
        id: this.id,
        email: this.email,
        username: this.username,
        phone: this.phone,
        password: this.password1
      })
      Vue.prototype.$axios.post('/users/',
        {
          team: this.team,
          id: this.id,
          email: this.email,
          username: this.username,
          phone: this.phone
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

        for (const [key, value] of Object.entries(res)) {
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
      this.email = null
      this.name = null
      this.phone = null
    }

  }
}
</script>
