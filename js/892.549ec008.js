"use strict";(self["webpackChunkback_manage"]=self["webpackChunkback_manage"]||[]).push([[892],{1892:function(e,t,a){a.r(t),a.d(t,{default:function(){return k}});var o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"manage"},[t("el-dialog",{attrs:{title:"add"===e.operateType?"新增用户":"更新用户",visible:e.isShow},on:{"update:visible":function(t){e.isShow=t}}},[t("common-form",{ref:"myform",attrs:{formLabel:e.opertateFormLabel,form:e.opertateForm,inline:!0}}),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.isShow=!1}}},[e._v("取消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v("确定")])],1)],1),t("div",{staticClass:"manage-header"},[t("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("新增")]),t("common-form",{ref:"myform",attrs:{formLabel:e.formLabel,form:e.searchForm,inline:!0}},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.getList(e.searchForm.keyword)}}},[e._v("搜索")])],1)],1),t("common-table",{attrs:{tableData:e.tableData,tableLabel:e.tableLabel,config:e.config},on:{edit:e.editUser,del:e.delUser,changePage:function(t){return e.getList()}}})],1)},l=[],r=function(){var e=this,t=e._self._c;return t("el-form",{ref:"form",attrs:{"label-width":"100px",model:e.form,inline:e.inline}},[e._l(e.formLabel,(function(a){return t("el-form-item",{key:a.label,attrs:{label:a.label}},["input"===a.type?t("el-input",{attrs:{placeholder:"请输入"+a.label},model:{value:e.form[a.model],callback:function(t){e.$set(e.form,a.model,t)},expression:"form[item.model]"}}):e._e(),"switch"===a.type?t("el-switch",{model:{value:e.form[a.model],callback:function(t){e.$set(e.form,a.model,t)},expression:"form[item.model]"}}):e._e(),"date"===a.type?t("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.form[a.model],callback:function(t){e.$set(e.form,a.model,t)},expression:"form[item.model]"}}):e._e(),"select"===a.type?t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form[a.model],callback:function(t){e.$set(e.form,a.model,t)},expression:"form[item.model]"}},e._l(a.opts,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):e._e()],1)})),t("el-form-item",[e._t("default")],2)],2)},n=[],i={name:"CommonForm",props:{formLabel:Array,form:Object,inline:Boolean},data(){return{}}},s=i,m=a(1001),c=(0,m.Z)(s,r,n,!1,null,"604f824c",null),d=c.exports,p=function(){var e=this,t=e._self._c;return t("div",{staticClass:"common-table"},[t("el-table",{attrs:{data:e.tableData,height:"90%",stripe:""}},[e._l(e.tableLabel,(function(a){return t("el-table-column",{key:a.prop,attrs:{"show-overflow-tooltip":"",label:a.label,width:a.width?a.width:125},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(o.row[a.prop]))])]}}],null,!0)})})),t("el-table-column",{attrs:{label:"操作","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.handleEdit(a.row)}}},[e._v("编辑")]),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDel(a.row)}}},[e._v("删除")])]}}])})],2),t("el-pagination",{staticClass:"pager",attrs:{layout:"prev, pager, next",total:e.config.total,"current-page":e.config.page,"page-size":20},on:{"update:currentPage":function(t){return e.$set(e.config,"page",t)},"update:current-page":function(t){return e.$set(e.config,"page",t)},"current-change":e.changePage}})],1)},u=[],f={name:"CommonTable",props:{tableData:Array,tableLabel:Array,config:Object},mounted(){},methods:{handleEdit(e){this.$emit("edit",e)},handleDel(e){this.$emit("del",e)},changePage(e){this.$emit("changePage",e)}}},h=f,b=(0,m.Z)(h,p,u,!1,null,"54bca45c",null),g=b.exports,y=a(3888),v={name:"User",components:{CommonForm:d,CommonTable:g},data(){return{operateType:"add",isShow:!1,opertateFormLabel:[{model:"name",label:"姓名",type:"input"},{model:"age",label:"年龄",type:"input"},{model:"sex",label:"性别",type:"select",opts:[{label:"男",value:0},{label:"女",value:1}]},{model:"birth",label:"生日",type:"date"},{model:"addr",label:"地址",type:"input"}],opertateForm:{name:"",addr:"",age:"",birth:"",sex:""},formLabel:[{model:"keyword",label:"",type:"input"}],searchForm:{keyword:""},tableData:[],tableLabel:[{label:"姓名",prop:"name"},{label:"年龄",prop:"age"},{label:"性别",prop:"sex"},{label:"生日",prop:"birth",width:200},{label:"地址",prop:"addr",width:320}],config:{page:1,total:30}}},created(){this.getList()},methods:{confirm(){"edit"===this.operateType?(0,y.lQ)(this.opertateForm).then((({data:e})=>{this.isShow=!1,this.$message({type:"success",message:e.data.message}),this.getList()})):(0,y.KL)(this.opertateForm).then((({data:e})=>{this.isShow=!1,this.$message({type:"success",message:e.data.message}),this.getList()}))},addUser(){this.isShow=!0,this.operateType="add",this.opertateForm={name:"",addr:"",age:"",birth:"",sex:""}},editUser(e){this.operateType="edit",this.isShow=!0,this.opertateForm=e},delUser(e){this.$confirm("此操作永久删除该组件,是否继续","提示",{confirmBtnTxt:"确认",cancelBtnTxt:"取消",type:"warning"}).then((()=>{const t=e.id;(0,y.bv)(t).then((()=>{this.getList(),this.$message({type:"success",message:"删除成功"})}))}))},getList(e=""){this.config.loading=!0,e&&(this.config.page=1),(0,y.PR)({page:this.config.page,name:e}).then((({data:e})=>{this.tableData=e.list.map((e=>(e.sex=0===e.sex?"女":"男",e))),this.config.total=e.count,this.config.loading=!1}))}}},w=v,_=(0,m.Z)(w,o,l,!1,null,"be204c40",null),k=_.exports}}]);
//# sourceMappingURL=892.549ec008.js.map