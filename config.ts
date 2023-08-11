export const BASEURL = "http://127.0.0.1:8000"
const token = typeof window !== "undefined" ? window.localStorage.getItem('token'): ''
export const AxiosConfig = {
    headers: {
        Authorization: 'Token ' + token
    }
}