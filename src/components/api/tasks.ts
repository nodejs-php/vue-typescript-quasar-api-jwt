import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';

export const getProjectFormOptions = async (): Promise<AxiosResponse> => {
  return api.get('/api/project-form-options')
}

export interface ProjectsParams {
  page: number,
}

export const getTasks= async (params: ProjectsParams): Promise<AxiosResponse> => {
  return api.get('/api/tasks', {params})
}

export const getTasksShow = async (id: number): Promise<AxiosResponse> => {
  return api.get(`/api/tasks/${id}`);
}

