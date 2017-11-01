import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Syllabus from '@/components/syllabus/Syllabus.vue'
import SyllabusType from '@/components/syllabusType/SyllabusType.vue'
import AddSyllabusType from '@/components/syllabusType/add.vue'
import EditSyllabusType from '@/components/syllabusType/edit.vue'
import AddSyllabus from '@/components/syllabus/add.vue'
import EditSyllabus from '@/components/syllabus/edit.vue'
import Assess from '@/components/syllabusAsses/info.vue'
import EditAssess from '@/components/syllabusAsses/edit.vue'
import BasicType from '@/components/basicType/info.vue'
import AddBasicType from '@/components/basicType/add.vue'
import EditBasicType from '@/components/basicType/edit.vue'
import Basic from '@/components/basic/info.vue'
import AddBasic from '@/components/basic/add.vue'
import EditBasic from '@/components/basic/edit.vue'
import Lesson from '@/components/lesson/info.vue'
import AddLesson from '@/components/lesson/add.vue'
import EditLesson from '@/components/lesson/edit.vue'
import LessonAssess from '@/components/lessonAssess/info.vue'
import EditLessonAssess from '@/components/lessonAssess/edit.vue'
import LessonDay from '@/components/lessonDay/info.vue'
import AddLessDay from '@/components/lessonDay/add.vue'
import EditLessonDay from '@/components/lessonDay/edit.vue'
import LessonDaySyllabus from '@/components/lessonDaySyllabus/info.vue'
import LessonDaySyllabusType from '@/components/lessonDaySyllabus/syllabusTypeInfo.vue'
import LessonDaySyllabusInfo from '@/components/lessonDaySyllabus/syllabusInfo.vue'
import AddLessonDaySyllabus from '@/components/lessonDaySyllabus/add.vue'
import EditLessonDaySyllabus from '@/components/lessonDaySyllabus/edit.vue'
import ShelfSyllabus from '@/components/shelfSyllabus/info.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: '课程管理',
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/type', component: SyllabusType, name: '课程类型信息' },
        { path: '/syllabus', component: Syllabus},
        { path: '/add_syllabus_type', component: AddSyllabusType,name:'添加课程类型'},
        { path: '/edit_syllabus_type', component: EditSyllabusType},
        { path: '/add_syllabus', component: AddSyllabus},
        { path: '/edit_syllabus', component: EditSyllabus},
        { path: '/assess', component: Assess},
        { path: '/edit_assess', component: EditAssess},
        { path: '/syllabus_out', component: ShelfSyllabus}

      ]
    },
    {
      path: '/',
      component: Home,
      name: '基础脚本管理',
      iconCls: 'el-icon-menu',//图标样式class
      children: [
        { path: '/basic_type', component: BasicType, name: '基础类型信息' },
        { path: '/add_basic_type', component: AddBasicType, name: '添加基础类型' },
        { path: '/edit_basic_type', component: EditBasicType },
        { path: '/basic', component: Basic},
        { path: '/add_basic', component: AddBasic},
        { path: '/edit_basic', component:  EditBasic}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '教案管理',
      iconCls: 'el-icon-information',//图标样式class
      children: [
        { path: '/lesson', component: Lesson, name: '学期教案信息' },
        { path: '/add_lesson', component: AddLesson, name: '添加学期教案' },
        { path: '/edit_lesson', component: EditLesson},
        { path: '/lesson_assess', component: LessonAssess},
        { path: '/edit_lesson_assess', component: EditLessonAssess},
        { path: '/lesson_day', component: LessonDay},
        { path: '/add_lesson_day', component: AddLessDay},
        { path: '/edit_lesson_day', component: EditLessonDay},
        { path: '/lesson_day_syllabus', component: LessonDaySyllabus},
        { path: '/go_syllabus_type', component: LessonDaySyllabusType},
        { path: '/go_syllabus', component: LessonDaySyllabusInfo},
        { path: '/go_add_syllabus', component: AddLessonDaySyllabus},
        { path: '/go_edit_syllabus', component: EditLessonDaySyllabus},
      ]
    },
  ]
})

