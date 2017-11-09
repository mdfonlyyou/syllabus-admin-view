import fetch from './fetch';

export function getTypePage(params) {
    return fetch({
        url: '/manager/v1/syllabus/types/page',
        method: 'get',
        params
    });
}

export function getSyllabusPageByType(id,params) {
  return fetch({
    url: '/cloud/v1/syllabus/type/' + id + '/page',
    method: 'get',
    params
  });
}
  //添加课程类别
  export function postSyllabusPageByType(params) {
    return fetch({
      url: '/manager/v1/syllabus/types',
      method: 'post',
      params
    });

}

//根据课程类别显示课程
export function syllabusPage(id,params) {
  return fetch({
    url: '/manager/v1/syllabus/type/'+id+'/page',
    method: 'get',
    params
  });
}

//下架指定的课程
export function deleteSyllabusById(id) {
  return fetch({
    //url: '/manager/v1/syllabus/'+id,
    url:'/manager/v1/syllabus/'+id+'/grounding',
    method: 'delete',
  });
}

//上架指定的课程
export function postOutSyllabusById(id) {
  return fetch({
    url:'/manager/v1/syllabus/'+id+'/grounding',
    method: 'post',
  });
}

//删除指定的课程
export function syllabusDeleteById(id) {
  return fetch({
    url:'/manager/v1/syllabus/'+id,
    method: 'delete',
  });
}

//列出类型下的下架课程
export function getOutSyllabusPageById(id, params) {
  return fetch({
    url:'/manager/v1/syllabus/type/'+id+'/ungrounding/page',
    method: 'get',
    params
  });
}
//修改指定的课程类型
export function editSyllabusTypeById(id,params) {
  return fetch({
    url: '/manager/v1/syllabus/types/'+id,
    method: 'put',
    params
  });
}

//获取指定的课程类型
export function getSyllabusTypeById(id) {
  return fetch({
    url: '/manager/v1/syllabus/types/'+id,
    method: 'get',
  });
}

//添加课程
export function postSyllabus(params) {
  return fetch({
    url: '/manager/v1/syllabus',
    method: 'post',
    params
  });
}

//获取指定的课程
export function getSyllabus(id) {
  return fetch({
    url: '/manager/v1/syllabus/'+id,
    method: 'get',
  });
}

//修改指定的课程
export function editSyllabus(id,params) {
  return fetch({
    url: '/manager/v1/syllabus/'+id,
    method: 'put',
    params
  });
}


//获得课程评价列表
export function getSyllabusAssessPage(sid,params) {
  return fetch({
    url: '/manager/v1/syllabus/'+sid+'/assess/page',
    method: 'get',
    params
  });
}

//删除课程评价
export function deleteSyllabusAssess(sid,aid) {
  return fetch({
    url: '/manager/v1/syllabus/'+sid+'/assess/'+aid,
    method: 'delete',
  });
}

//修改课程评价
export function editSyllabusAssess(sid,aid,params) {
  return fetch({
    url: '/manager/v1/syllabus/'+sid+'/assess/'+aid,
    method: 'put',
    params
  });
}

//获取指定课程的指定评价
export function getSyllabusAssessBySidAndAid(sid,aid) {
  return fetch({
    url: '/manager/v1/syllabus/'+sid+'/assess/'+aid,
    method: 'get',
  });
}





