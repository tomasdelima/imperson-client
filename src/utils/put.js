import request from './request'
const put = (path, body = {}, options = {}) => request(path, 'PUT', body, options)
export default put
