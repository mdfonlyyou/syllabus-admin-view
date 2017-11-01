/**
 * Created by Administrator on 2017-10-20.
 */
import fetch from './fetch';

//列出所有的学期教案的课程
export function getLessonPage(params) {
  return fetch({
    url: '/manager/v1/lesson/page',
    method: 'get',
    params
  });
}

//删除指定的学期教案
export function deleteLessonById(id) {
  return fetch({
    url: '/manager/v1/lesson/'+id,
    method: 'delete',
  });
}

//添加学期教案
export function PostLesson(params) {
  return fetch({
    url: '/manager/v1/lesson',
    method: 'post',
    params
  });
}

//获得指定的学期教案
export function getLessonById(id) {
  return fetch({
    url: '/manager/v1/lesson/'+id,
    method: 'get',
  });
}

//修改指定的学期教案
export function editLessonById(id,params) {
  return fetch({
    url: '/manager/v1/lesson/'+id,
    method: 'put',
    params
  });
}

//查看学期教案的评价列表
export function getLessonAssessPage(lid,params) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/assess/page',
    method: 'get',
    params
  });
}

//获取指定学期教案的指定评价
export function getLessonAssessByLidAndAid(lid,aid) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/assess/'+aid,
    method: 'get',
  });
}


//修改学期教案的评价
export function EditLessonAssessByLidAndAid(lid,aid,params) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/assess/'+aid,
    method: 'put',
    params
  });
}


//删除学期教案的评价
export function deleteLessonAssessByLidAndAid(lid,aid) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/assess/'+aid,
    method: 'delete',
  });
}

//列出学期教案下的日教案
export function getLessonDayByLidPage(lid,params) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day/page',
    method: 'get',
    params
  });
}

//新添日教案
export function postLessonDay(lid,params) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day',
    method: 'post',
    params
  });
}

//删除指定的日教案
export function deleteLessonDay(lid,did) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day/'+did,
    method: 'delete',
  });
}


//获得指定的日教案
export function getLessonDay(lid,did) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day/'+did,
    method: 'get',
  });
}

//修改指定的日教案
export function editLessonDay(lid,did,params) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day/'+did,
    method: 'put',
    params
  });
}


//列出日教案下所有课程
export function getLessonDaySyllabus(lid,did,params) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day/'+did+'/syllabus/page',
    method: 'get',
    params
  });
}

//添加日教案下的课程
export function postLessonDaySyllabus(lid,did,params) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day/'+did+'/syllabus',
    method: 'post',
    params
  });
}

//删除指定的日教案的课程信息
export function deleteLessonDaySyllabus(lid,did,sid) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day/'+did+'/syllabus/'+sid,
    method: 'delete',
  });
}

//获得指定的日教案课程信息
export function getLessonDaySyllabusInfos(lid,did,sid) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day/'+did+'/syllabus/'+sid,
    method: 'get',
  });
}

//获得指定的日教案课程信息
export function editLessonDaySyllabusInfos(lid,did,sid,params) {
  return fetch({
    url: '/manager/v1/lesson/'+lid+'/day/'+did+'/syllabus/'+sid,
    method: 'put',
    params
  });
}
