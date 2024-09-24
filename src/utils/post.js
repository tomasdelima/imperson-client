import request from './request'
const post = (path, body = {}, options = {}) => request(path, 'POST', body, options)
export default post
