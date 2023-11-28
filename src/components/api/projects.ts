import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';

export const getProjectFormOptions = async (): Promise<AxiosResponse> => {
  return api.get('/api/project-form-options')
}

export interface ProjectsParams {
  page: number,
}

export const getProjects = async (params: ProjectsParams): Promise<AxiosResponse> => {
  return api.get('/api/projects', {params})
}

export const getProjectsShow = async (id: number): Promise<AxiosResponse> => {
  return api.get(`/api/projects/${id}`);
}

