<template>
  <el-container class="publishArticlecontainer">
    <el-header>
      <div>
        <img
          src="../assets/logo.png"
          style="width: 60px; height: 60px"
          alt=""
        />
        <span>标题</span>
      </div>
      <div>
        <el-button type="primary" plain @click="publish">提交</el-button>
        <el-button type="info" @click="logout">返回</el-button>
      </div>
    </el-header>
    <el-container>
      <el-main>
        <el-button
          icon="el-icon-camera-solid"
          style="width: 100%; height: 200px"
        >
          添加图片（下个版本）
        </el-button>
        <el-input
          placeholder="请输入标题"
          style="margin-top: 20px"
          v-model="titletext"
        ></el-input>
        <!-- <div
          style="background-color: #b3c0d1; line-height: 80px; margin-top: 20px"
        >
          文本工具（下个版本）
        </div> -->
        <!-- <el-input
          placeholder="请输入正文"
          style="margin-top: 20px"
          type="textarea"
          :autosize="{ minRows: 10}"
          v-model="textarea"
        ></el-input> -->
        <quill-editor class="editor"
                    ref="myTextEditor"
                    v-model="content"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    @change="onEditorChange($event)">
      </quill-editor>
      <!-- <div class="ql-editor" v-html="htmltest" style="margin-top:60px">
      </div> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 标题
const titleConfig=[
    {Choice:'.ql-bold',title:'加粗'},
    {Choice:'.ql-italic',title:'斜体'},
    {Choice:'.ql-underline',title:'下划线'},
    {Choice:'.ql-header',title:'段落格式'},
    {Choice:'.ql-strike',title:'删除线'},
    {Choice:'.ql-blockquote',title:'块引用'},
    {Choice:'.ql-code',title:'插入代码'},
    {Choice:'.ql-code-block',title:'插入代码段'},
    {Choice:'.ql-font',title:'字体'},
    {Choice:'.ql-size',title:'字体大小'},
    {Choice:'.ql-list[value="ordered"]',title:'编号列表'},
    {Choice:'.ql-list[value="bullet"]',title:'项目列表'},
    {Choice:'.ql-direction',title:'文本方向'},
    {Choice:'.ql-header[value="1"]',title:'h1'},
    {Choice:'.ql-header[value="2"]',title:'h2'},
    {Choice:'.ql-align',title:'对齐方式'},
    {Choice:'.ql-color',title:'字体颜色'},
    {Choice:'.ql-background',title:'背景颜色'},
    {Choice:'.ql-image',title:'图像'},
    {Choice:'.ql-video',title:'视频'},
    {Choice:'.ql-link',title:'添加链接'},
    {Choice:'.ql-formula',title:'插入公式'},
    {Choice:'.ql-clean',title:'清除字体格式'},
    {Choice:'.ql-script[value="sub"]',title:'下标'},
    {Choice:'.ql-script[value="super"]',title:'上标'},
    {Choice:'.ql-indent[value="-1"]',title:'向左缩进'},
    {Choice:'.ql-indent[value="+1"]',title:'向右缩进'},
    {Choice:'.ql-header .ql-picker-label',title:'标题大小'},
    {Choice:'.ql-header .ql-picker-item[data-value="1"]',title:'标题一'},
    {Choice:'.ql-header .ql-picker-item[data-value="2"]',title:'标题二'},
    {Choice:'.ql-header .ql-picker-item[data-value="3"]',title:'标题三'},
    {Choice:'.ql-header .ql-picker-item[data-value="4"]',title:'标题四'},
    {Choice:'.ql-header .ql-picker-item[data-value="5"]',title:'标题五'},
    {Choice:'.ql-header .ql-picker-item[data-value="6"]',title:'标题六'},
    {Choice:'.ql-header .ql-picker-item:last-child',title:'标准'},
    {Choice:'.ql-size .ql-picker-item[data-value="small"]',title:'小号'},
    {Choice:'.ql-size .ql-picker-item[data-value="large"]',title:'大号'},
    {Choice:'.ql-size .ql-picker-item[data-value="huge"]',title:'超大号'},
    {Choice:'.ql-size .ql-picker-item:nth-child(2)',title:'标准'},
    {Choice:'.ql-align .ql-picker-item:first-child',title:'居左对齐'},
    {Choice:'.ql-align .ql-picker-item[data-value="center"]',title:'居中对齐'},
    {Choice:'.ql-align .ql-picker-item[data-value="right"]',title:'居右对齐'},
    {Choice:'.ql-align .ql-picker-item[data-value="justify"]',title:'两端对齐'}
];
    
export default {
  data() {
    return {
      titletext: '',
      textarea: '',
      htmltest: '',

      content: null,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"] // 链接、图片、视频
          ], //工具菜单栏配置
        },
        placeholder: '请在这里添加内容', //提示
        readyOnly: false, //是否只读
        theme: 'snow', //主题 snow/bubble
        syntax: true, //语法检测
      }
    }
  },

  methods: {
    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      //console.log(editor);
    },
    logout() {
      this.$router.push('/home')
    },

    publish() {
      this.$message.success('发布成功')
      console.log(this.content)
      this.htmltest = this.content
      //this.$router.push('/home')
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },

  mounted(){
    autotip:{
          for(let item of titleConfig){
              let tip = document.querySelector('.quill-editor '+ item.Choice)
              if (!tip) continue
              tip.setAttribute('title',item.title)
          }
      }
  }
}
</script>

<style lang="less" scoped>
.publishArticlecontainer {
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-left: 20%;
  padding-right: 20%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.editor {
    line-height: normal !important;
    //height: 800px;
    margin-top: 20px;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}
</style>

<style>
.editor {
  line-height: normal !important;
  /* height: 800px; */
}

.editor .ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.editor .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.editor .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.editor .ql-snow .ql-picker.ql-size .ql-picker-label::before,
.editor .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.editor .ql-snow .ql-picker.ql-header .ql-picker-label::before,
.editor .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.editor .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.editor .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.editor .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.editor .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.editor .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.editor .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.editor .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.editor .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.editor .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.editor .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.editor .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.editor .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6' ;
}

.editor .ql-snow .ql-picker.ql-font .ql-picker-label::before,
.editor .ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.editor .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.editor .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
.editor .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.editor .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
</style>