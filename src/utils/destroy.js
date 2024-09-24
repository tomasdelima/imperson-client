import request from './request'
const destroy = (path, body = {}, options = {}) => request(path, 'DELETE', body, options)
export default destroy
