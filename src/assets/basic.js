/**
 * Created by Administrator on 2017-10-18.
 */
import fetch from './fetch';

//获取所以得基本类型
export function getBasicTypePage(params) {
  return fetch({
    url: '/manager/v1/basic/type/page',
    method: 'get',
    params
  });
}
//添加基本类型
export function addBasicType(params) {
  return fetch({
    url: '/manager/v1/basic/type',
    method: 'post',
    params
  });
}

//删除基本类型
export function deleteBasicType(id) {
  return fetch({
    url: '/manager/v1/basic/type/'+id,
    method: 'delete',
  });
}

//获取指定的基本类型
export function getBasicType(id) {
  return fetch({
    url: '/manager/v1/basic/type/'+id,
    method: 'get',
  });
}

//修改指定的基本类型
export function editBasicType(id,params) {
  return fetch({
    url: '/manager/v1/basic/type/'+id,
    method: 'put',
    params
  });
}

//修改指定的基本类型
export function getBasicPage(id,params) {
  return fetch({
    url: '/manager/v1/basic/type/'+id+'/page',
    method: 'get',
    params
  });
}

//上传脚本
export function postBasic(params) {
  return fetch({
    url: '/manager/v1/basic',
    method: 'post',
    params
  });
}

//删除脚本
export function deleteBasicById(id) {
  return fetch({
    url: '/manager/v1/basic/'+id,
    method: 'delete',
  });
}

//获得指定的脚本
export function getBasicById(id) {
  return fetch({
    url: '/manager/v1/basic/'+id,
    method: 'get',
  });
}

//修改指定的脚本
export function editBasicById(id,params) {
  return fetch({
    url: '/manager/v1/basic/'+id,
    method: 'put',
    params
  });
}
