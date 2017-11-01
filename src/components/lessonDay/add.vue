<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm"
           style="margin:20px;width:80%;min-width:600px;" v-loading="addloading">

    <el-form-item label="次数" prop="days" label-width="80px">
      <el-input v-model.number="ruleForm2.days"></el-input>
    </el-form-item>

    <!--富文本编辑器-->
    <el-form-item label="简介" prop="guide" style="padding-top: 20px" >
      <!-- quill-editor插件标签 分别绑定各个事件-->
      <quill-editor v-model="ruleForm2.guide" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      >
      </quill-editor>

      <!-- 文件上传input 将它隐藏-->
      <el-upload class="upload-demo" action="http://avatarcn.oss-cn-hangzhou.aliyuncs.com" :before-upload='beforeUpload' :data="data3" :on-success='upScuccess'
                 ref="upload" style="display:none">
        <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {postLessonDay} from '../../assets/lesson'
  import {quillEditor} from 'vue-quill-editor'
  export default {
    data() {
      var validateDays = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入日教案次数'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      };
      return {
        data3: {
          key: ''
        },
        addRange:[],
        fullscreenLoading : false,
        addloading:false,
        editorOption :{},    // 编辑器选项
        content:'',        //编辑器内容为空
        uploadType:'',
        buckname: 'syllabus/quillEditor/',
        ruleForm2: {
          days: '',
          guide: '',

        },
        rules2: {
          days: [
            {validator: validateDays, trigger: 'blur'}
          ],
          guide: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ]
        },
      };
    },
    components: {
      quillEditor,
    },
    methods: {
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {
              days: this.ruleForm2.days,
              guide: this.ruleForm2.guide
            };
            _this.addloading=true;
            postLessonDay(_this.$route.query.lid,para).then(response => {
              _this.addloading=false;
              _this.$router.push({path:'/lesson_day', query: {lid: _this.$route.query.lid}});
            });
          } else {
            _this.$message.error('提交失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      // 点击图片ICON触发事件
      imgHandler(state) {
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'image'
      },
      // 图片上传之前调取的函数
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';

        if (!isJPG & !isPNG) {
          this.$message.error('上传头像图片只能是 JPG或者是PNG 格式!');
          return;
        }
        var suffix = file.name.substr(file.name.indexOf("."));
        var storeAs = this.buckname + this.guid() + suffix;
        this.data3.key = storeAs
      },

      //生成UUID文件名
      guid() {
        function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      },

      // 图片上传成功回调   插入到编辑器中
      upScuccess(e, file, fileList) {
        this.fullscreenLoading = false
        let vm = this
        let url = 'http://avatarcn.oss-cn-hangzhou.aliyuncs.com/' + this.data3.key;
        let value = url
        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
        value = value.indexOf('http') !== -1 ? value : 'http:' + value
        vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
        this.$refs['upload'].clearFiles()    // 插入成功后清除input的内容
      },
      // 编辑器光标离开 将编辑器内容发射给父组件
      onEditorBlur(editor) {
        this.$emit('getValue', this.content)
      },
      // 编辑器获得光标
      onEditorFocus(editor) {
        editor.enable(true)   // 实现达到上限字符可删除

      }
    },
    // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
    mounted() {
      // 为图片ICON绑定事件  getModule 为编辑器的内部属性
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    }

  }
</script>

<style>
  .el-form-item__content {
    line-height: 60px;
    position: relative;
    font-size: 14px;

  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>
