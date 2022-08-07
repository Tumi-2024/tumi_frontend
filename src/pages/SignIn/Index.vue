<template>
  <q-card-section class="q-pa-xl bg-white justify-center flex column">
    <img
      style="width: 100%; max-width: 400px; align-self: center"
      :src="require('assets/tumi-icon-high.jpeg')"
      class="q-mr-sm"
    />
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-lg">
      <q-input
        filled
        v-model="username"
        label="아이디"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '아이디를 입력해주세요.']"
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
        :rules="[
          (val) => (val && val.length > 0) || '비밀번호를 입력해주세요.'
        ]"
      >
        <template v-slot:before>
          <q-icon name="lock" />
        </template>
      </q-input>
      <div class="justify-between flex">
        <q-btn
          label="회원가입"
          color="primary"
          flat
          class="q-ml-sm"
          @click="$router.push({ name: 'signUp' })"
        />
        <q-btn label="로그인" type="submit" color="primary" />
      </div>
    </q-form>
  </q-card-section>
</template>
<script>
import Vue from "vue";
import { Cookies } from "quasar";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async onSubmit() {
      Vue.prototype.$axios
        .post("/users/login/", {
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          this.$store.commit("setUser", data);
          Cookies.set("tumi", data.token, { expires: "1d" });
          Cookies.set("tumi_i", data.id, { expires: "1d" });

          try {
            if (data.token) {
              Vue.prototype.$axios.defaults.headers.common.Authorization = `Token ${data.token}`;
              // this.$store.dispatch("getDetailHouses", "page_size=5");
              // this.fetchLocationInterest();
            }
          } catch (e) {
            console.log(e);
          } finally {
            this.$router.push("/");
          }
        })
        .catch((e) => {
          const res = e?.response?.data;
          const messages = res.message || res.detail;

          this.$q.notify({
            type: "negative",
            message: messages
          });
        });
    },
    onReset() {
      this.password = null;
      this.username = null;
    }
  },
  beforeMount() {
    Cookies.remove("tumi");
    Cookies.remove("tumi_i");
  }
};
</script>
