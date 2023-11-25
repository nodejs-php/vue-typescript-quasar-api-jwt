import { defineStore } from 'pinia';
import axios from 'axios';
import { Cookies } from 'quasar';

interface UserState {
  isLoggedIn: boolean;
  errorInfo: string;
  user: any;
}

export default defineStore('user', {
  state: (): UserState =>
    <UserState>{
      isLoggedIn: false,
      errorInfo: '',
      user: {},
    },
  getters: {
    setLoggedIn(state: UserState): boolean {
      return state.isLoggedIn;
    },
  },
  actions: {
    authenticate(values: any) {
      axios
        .post(process.env.API + '/api/login', values)
        .then((response) => {
          if (response.data.status == 'success') {
            this.errorInfo = '';
            Cookies.set(
              'access_cookie',
              response.data.token_type + ' ' + response.data.access_token
            );

            axios.interceptors.request.use((config) => {
              config.headers.Authorization = Cookies.get('access_cookie');
              return config;
            });
            this.router.push({ name: 'projects-list' });
          } else {
            this.errorInfo = response.data.message;
            console.log(this.errorInfo);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 422) {
            this.errorInfo = error.response.data.message;
          }
        });
    },
    async authCheck(): Promise<void> {
      await axios
        .get(process.env.API + '/api/user')
        .then((response) => {
          if (response.data) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            this.user = response.data;
            this.isLoggedIn = true;
          } else {
            this.user = {};
            this.isLoggedIn = false;
          }
        })
        .catch((error) => {
          if (401 === error.response.status) {
            this.user = {};
            this.isLoggedIn = false;
          }
        });
    },
    logout(): void {
      this.isLoggedIn = false;
      Cookies.set('access_cookie', '');
      this.router.push({ name: 'login' });
    },
  },
});
