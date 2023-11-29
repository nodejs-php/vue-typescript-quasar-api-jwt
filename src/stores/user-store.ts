import {defineStore} from 'pinia';
import {Cookies} from 'quasar';
import {getUser, login} from 'components/api/auth';

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
  persist: {
    storage: localStorage,
    paths: ['user'],
  },
  getters: {
    isLoggedIn: () => Cookies.get('access-cookie') && Cookies.get('access-cookie') != '',
  },
  actions: {
    authenticate(values: ProxyConstructor) {
      login(values)
        .then((response) => {
          if (response.data.status == 'success') {
            this.errorInfo = '';
            Cookies.set(
              'access-cookie',
              response.data.token_type + ' ' + response.data.access_token
            );
            this.authCheck();
            this.router.push({path: '/'});
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
    async authCheck() {
      await getUser()
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
      Cookies.remove('access-cookie');
      this.router.push({name: 'login'});
    },
  },
});
