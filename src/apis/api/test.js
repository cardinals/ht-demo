import axios from '@/axios'

export const getTableData = (params) => {
    return axios.get("/getAssemblyTable", params)
}

export const getUserData = (params) => {
    return axios.get("http://localhost:3000/users", params);
}

export const getDemoData = (params) => {
  return axios.get("news/api", params);
}
