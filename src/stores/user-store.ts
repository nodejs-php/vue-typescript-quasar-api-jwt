import {defineStore} from 'pinia';
import axios from 'axios';
import {Cookies} from 'quasar';

interface UserState {
  errorInfo: string;
  user: User;
}

interface User {
  id: number,
  name: string,
  email: string,
  email_verified_at: string,
  created_at: string,
  updated_at: string
}

export default defineStore('user', {
  state: () => <UserState>
    {
      errorInfo: '',
      user: {},
    },
  getters: {
    isLoggedIn: () => Cookies.get('access_cookie') && Cookies.get('access_cookie') != '',
  },
  actions: {
    authenticate(values: ProxyConstructor) {
      axios
        .post(process.env.API + '/api/login', values)
        .then((response) => {
          if (response.data.status == 'success') {
            this.errorInfo = '';
            Cookies.set(
              'access_cookie',
              response.data.token_type + ' ' + response.data.access_token
            );
            this.router.push({name: 'projects.list'});
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
        .get(process.env.API + '/api/user', {
          headers: {
            'Authorization': 'Basic ' + Cookies.get('access_cookie')
          }
        })
        .then((response) => {
          if (response.data) {
            this.user = response.data;
            this.router.push({name: 'projects.list'});
          } else {
            this.user = <User>{};
          }
        })
        .catch((error) => {
          if (401 === error.response.status) {
            this.user = <User>{};
          }
        });
    },
    logout(): void {
      Cookies.remove('access_cookie');
      this.router.push({name: 'login'});
    },
  },
});
