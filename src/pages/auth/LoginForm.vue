<template>
  <div class="card">
    <h4>Login Form</h4>

    <div class="card-body form-group">
      <q-form @submit="login" :validation-schema="schema">
        <label> Username </label>
        <q-input filled type="email" v-model="auth.email" placeholder="Email" />
        <br />
        <label> Password </label>
        <q-input
          filled
          type="password"
          v-model="auth.password"
          placeholder="Password"
        />
        <br />
        <div class="btn">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            style="display: flex; margin: 5px auto"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapWritableState } from 'pinia';
import useUserStore from 'stores/user-store';
export default {
  name: 'LoginForm',
  computed: {
    ...mapWritableState(useUserStore, ['errorInfo']),
  },
  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required|min:5|max:25',
      },
      auth: {
        email: 'dev@example.com',
        password: '123',
      },
    };
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),

    login() {
      this.authenticate(this.auth);
    },
  },
};
</script>
