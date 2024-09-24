import request from './request'
const get = (path, options = {}) => request(path, 'GET', null, options)
export default get
