import {api} from 'boot/axios';
import {Cookies} from 'quasar';
import {AxiosResponse} from 'axios';

export const login = async (values: ProxyConstructor): Promise<AxiosResponse> => {
  return api.post(process.env.API + '/api/login', values);
}

export const getUser = async (): Promise<AxiosResponse> => {
  return api.get(process.env.API + '/api/user', {
    headers: {
      'Authorization': 'Basic ' + Cookies.get('access-cookie')
    }
  })
}
