<style scoped media="print">
@page {
  size: auto; /* auto is the initial value */
  margin: 0mm; /* this affects the margin in the printer settings */
}
</style>
<!-- 预览组件 -->
<template>
  <div>
    <!-- 页面主表 -->
    <el-card class="box-card" shadow="hover" id="printTable">
      <div slot="header" class="clearfix">
        <span v-if="subTitle != '' && subTitle != null"
          ><i class="el-icon-document"></i>{{ itemName }} ——“{{
            subTitle
          }}”基本信息</span
        >
        <span v-else
          ><i class="el-icon-document"></i>{{ itemName }} ——基本信息</span
        >
      </div>
      <div class="text item">
        <el-table
          :data="filteredTableData"
          size="medium"
          class="myinfo-table"
          border
          stripe
          id="dataTable"
          style="width: 100%"
          :show-header="false"
        >
          <el-table-column prop="desc" min-width="30%" align="right">
            <template slot-scope="scope">
              <div v-if="scope.row.desc == '数据库相关备注'">
                <div><i class="el-icon-s-opportunity"></i>注</div>
              </div>
              <div v-else v-html="scope.row.desc"></div>
            </template>
          </el-table-column>

          <el-table-column prop="name" align="left">
            <template slot-scope="scope">
              <div
                v-if="
                  scope.row.type != 'desc' &&
                  (isShowLink(scope.row.link_info, scope.row.name) ==
                    'btn_link' ||
                    scope.row.attach == 'Y')
                "
              >
                <el-link
                  v-if="scope.row.name"
                  type="primary"
                  @click="preview(scope.row)"
                  >查看<i class="el-icon-view el-icon--right"></i
                ></el-link>
                <div v-else></div>
              </div>
              <div
                v-else-if="
                  scope.row.type != 'desc' &&
                  isShowLink(scope.row.link_info, scope.row.name) == 'href_link'
                "
              >
                <a :href="scope.row.name" target="_blank">点击链接</a>
              </div>
              <div
                v-else-if="
                  scope.row.type != 'desc' &&
                  isShowLink(scope.row.link_info, scope.row.name) == 'html_link'
                "
              >
                <div v-html="scope.row.name"></div>
              </div>
              <div
                v-else-if="
                  scope.row.type != 'desc' &&
                  isShowLink(scope.row.link_info, scope.row.name) ==
                    'table_link'
                "
              >
                <span
                  v-for="(item, index) in (scope.row.name || '').split('；')"
                >
                  <span
                    v-if="
                      index != (scope.row.name || '').split('；').length - 1
                    "
                  >
                    <el-link
                      @click="
                        goLinkInfo(scope.row.link_info, item, scope.row.alias)
                      "
                      type="primary"
                      v-html="item"
                    ></el-link
                    >&nbsp;&nbsp;
                  </span>
                  <span v-else>
                    &nbsp;&nbsp;<el-link
                      @click="
                        goLinkInfo(scope.row.link_info, item, scope.row.alias)
                      "
                      type="primary"
                      v-html="item"
                    ></el-link>
                  </span>
                </span>
              </div>
              <div v-else>
                <div v-if="scope.row.desc == '数据库相关备注'">
                  <!-- <div v-html="scope.row.name"></div> -->
                  <!--<div v-if="loginFlag=='true'">
                  <my-html :data="scope.row.name" maxLen="100"/>
                  </div>-->
                  <el-link @click="goHelp()" type="primary">详情</el-link>
                </div>
                <div
                  v-else
                  v-html="scope.row.name"
                  style="white-space: pre-line"
                ></div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-card
      class="box-card"
      shadow="hover"
      id="printTable"
      style="margin-top: 15px"
      v-if="aboutlink.length != 0 && isShowLinkInfo != 'false'"
    >
      <div slot="header" class="clearfix">
        <span><i class="el-icon-link"></i>相关数据库查询</span>
      </div>
      <div class="text item aboutlink">
        <!-- <el-button type="primary" size="small" plain v-for="(item, index) in aboutlink" @click="goAbout(item)" type="primary" :key="index">{{item.link_item_name}}</el-button> -->
        <el-link
          v-for="(item, index) in aboutlink"
          @click="goAbout(item)"
          type="primary"
          :key="index"
          style="margin-right: 25px"
        >
          <el-divider direction="vertical"></el-divider>
          {{ item.link_item_name }}
        </el-link>
      </div>
    </el-card>
    <!-- 弹层子表 -->
    <el-dialog
      title=""
      :visible.sync="queryLinkShow"
      top="5vh"
      :width="windowWidth > 768 ? '50%' : '100%'"
    >
      <el-card class="box-card" shadow="hover" id="printTable">
        <div slot="header" class="clearfix">
          <span
            ><i class="el-icon-document"></i>{{ childItemName }}基本信息</span
          >
        </div>
        <div class="text item" style="width: 100%">
          <el-table
            :data="filteredChildTableData"
            v-loading="childLoading"
            element-loading-text="数据正在加载中..."
            size="mini"
            class="myinfo-table"
            border
            stripe
            width="100%"
            :show-header="false"
          >
            <el-table-column prop="desc" min-width="30%" align="right">
            </el-table-column>

            <el-table-column prop="name" align="left">
              <!-- <div slot-scope="scope">
                <div v-if="!scope.row.link_info">{{scope.row.name}}</div>
                <div v-if="scope.row.link_info"><el-link @click="layer_goLinkInfo(scope.row.link_info, scope.row.name, scope.row.alias)" type="primary">{{scope.row.name}}</el-link></div>
              </div> -->
              <template slot-scope="scope">
                <template
                  v-if="
                    isShowLink(scope.row.link_info, scope.row.name) ==
                      'btn_link' || scope.row.attach == 'Y'
                  "
                >
                  <el-link type="primary" @click="preview(scope.row)"
                    >查看<i class="el-icon-view el-icon--right"></i>
                  </el-link>
                </template>
                <div
                  v-else-if="
                    scope.row.type != 'desc' &&
                    isShowLink(scope.row.link_info, scope.row.name) ==
                      'href_link'
                  "
                >
                  <a :href="scope.row.name" target="_blank">点击链接</a>
                </div>
                <div
                  v-else-if="
                    scope.row.type != 'desc' &&
                    isShowLink(scope.row.link_info, scope.row.name) ==
                      'html_link'
                  "
                >
                  <div v-html="scope.row.name"></div>
                </div>
                <div
                  v-else-if="
                    scope.row.type != 'desc' &&
                    isShowLink(scope.row.link_info, scope.row.name) ==
                      'txt_link'
                  "
                >
                  <el-link
                    @click="
                      goLinkInfo(
                        scope.row.link_info,
                        scope.row.name,
                        scope.row.alias
                      )
                    "
                    type="primary"
                    v-html="scope.row.name"
                  ></el-link>
                </div>
                <div v-else>
                  <div
                    v-html="scope.row.name"
                    style="white-space: pre-line"
                  ></div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <el-card
        class="box-card"
        shadow="hover"
        id="printTable"
        style="margin-top: 10px"
        v-if="aboutChildlink.length != 0"
      >
        <div slot="header" class="clearfix">
          <span><i class="el-icon-link"></i>相关数据库查询</span>
        </div>
        <div class="text item aboutlink">
          <!-- <el-button type="primary" size="small" plain v-for="(item, index) in aboutlink" @click="goAbout(item)" type="primary" :key="index">{{item.link_item_name}}</el-button> -->
          <el-link
            v-for="(item, index) in aboutChildlink"
            @click="goAbout(item)"
            type="primary"
            :key="index"
            style="margin-right: 25px"
          >
            <el-divider direction="vertical"></el-divider>
            {{ item.link_item_name }}
          </el-link>
        </div>
      </el-card>
    </el-dialog>
    <!-- 附件预览或者下载dialog -->
    <el-dialog title="内容查看" :visible.sync="urlShow" top="5vh" width="70%">
      <el-card class="box-card" shadow="hover" id="printTable">
        <div slot="header" class="clearfix">
          <el-button
            class="el-icon-download"
            type="success"
            @click="download(viewContent)"
            size="mini"
            >下载</el-button
          >
        </div>
        <div class="demo-image__preview">
          <el-image ref="lazyImg" lazy class="vx-lazyLoad" :src="viewContent">
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-loading"></i>加载中
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
module.exports = {
  //自定义的参数
  props: {
    isshowlink: String,
    dataid: String,
    itemid: String,
  },
  data: function () {
    return {
      itemId: this.itemid,
      id: this.dataid,
      isShowLinkInfo: this.isshowlink,
      itemName: "",
      itemDesc: "",
      detailFeild: [],
      detailFeildValue: [],
      baseInfo: [],
      //显示子标题
      subTitle: "",
      //是否登录的标识
      loginFlag: "false",
      // 子表显示控制
      queryLinkShow: false,
      // 子表数据
      childItemName: "",
      aboutChildlink: "",
      childBaseInfo: [],
      childLoading: true,
      // 相关链接
      aboutlink: [],
      // 附件或者URL显示
      urlShow: false,
      viewContent: "",
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
    };
  },
  mounted: function () {
    //this.addWaterMarker("国家药监局NMPA");
  },
  created: function () {
    var _this = this;
    // json文件请求
    this.getJson(this.itemId, function (result) {
      // 拿到数据结构
      var obj = result.data;
      // 表title获取
      _this.itemName = obj.itemName;
      // 底部注释内容，已经被砍掉，无需获取
      _this.itemDesc = obj.itemDesc;

      // // ID字段不需要展示，循环判断，并且删除ID字段
      for (var i = 0; i < obj.detailFeild.length; i++) {
        var item = obj.detailFeild[i];
        // 如果发现 NMPA_DK 则从数组中删掉，因为这两个字段不需要展示
        if (item.desc == "NMPA_DK") {
          obj.detailFeild.splice(i, 1);
        }
      }
      // 储存详情展示的结构
      _this.baseInfo = obj.detailFeild;
      // 获取详情页外部链接，相关数据库查询
      _this.aboutlink = obj.linkItemFeild;
      // 请求详情
      _this.queryDetail();
      // 获取用户信息
      _this.getLoginUserInfo();

      // setTimeout(function(){
      // 	// 请求详情
      // 	_this.queryDetail();
      // 	_this.syncData();
      // 	_this.getLoginUserInfo();
      // },200);
    });
  },
  methods: {
    // json文件请求
    getJson: function (itemId, fnSuccess) {
      var _this = this;
      pajax
        .get(api.jsonUrl + "config/" + itemId + ".json", {})
        .then(function (result) {
          fnSuccess && fnSuccess(result);
        });
    },
    syncData: function () {
      this.$emit("syncData", this.baseInfo);
    },
    // 获取用户信息
    getLoginUserInfo: function () {
      var _this = this;
      var token = getUrl("token") || getCookie("token");
      var corp = getCookie("isCorpLogin");
      if (token && corp) {
        _this.loginFlag = "true";
      } else {
        _this.loginFlag = "false";
      }
    },

    // 请求详情
    queryDetail: function () {
      // loading
      var queryDetailLoading = this.$loading({
        lock: true,
        text: "数据请求中,请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)",
      });

      var _this = this;
      // 请求后台
      pajax
        .hasTokenGet(api.queryDetail, {
          itemId: _this.itemId,
          id: _this.id,
        })
        .then(function (result) {
          // 获取数据
          var obj = result.data;
          // 取消loading
          queryDetailLoading.close();

          // 循环结构对象 baseInfo
          _this.baseInfo.forEach(function (item, index) {
            // 获取展示的字段 f0、f1.......
            var key = item.alias;
            // 根据 key 获取 详情请求过来的值，并新加name属性，为其赋值
            item.name = obj.data.detail[key];
            // 判断是否有副标题
            if (item.subTitle == "Y") {
              // 给副标题赋值
              _this.subTitle = obj.data.detail[key];
              _this.subTitleDesc = item.desc;
            }
          });
          var item = {
            desc: "数据库相关备注",
            name: _this.itemDesc,
            type: "desc",
          };
          _this.baseInfo.push(item);
          // 给父页面组件传参
          _this.$emit("getsubtitle", _this.subTitle);
          _this.$emit("getsubtitledesc", _this.subTitleDesc);
          // 是否收藏
          _this.isMark = obj.data.isMark;
          _this.isMarkText = obj.data.isMark ? "取消" : "收藏";

          // 强制刷新数据
          _this.baseInfo = JSON.parse(JSON.stringify(_this.baseInfo));
        });
    },

    // 调用子表链接
    queryLink: function (paramsObj) {
      var _this = this;

      this.childLoading = true;

      pajax
        .hasTokenGet(api.queryLink, {
          linkItemId: paramsObj.linkItemId,
          link_item_feild: paramsObj.link_item_feild,
          main_item_value: paramsObj.main_item_value,
        })
        .then(function (result) {
          var obj = result.data;
          if (obj.data != "" && obj.data != null) {
            _this.childLoading = false;
            for (var i = 0; i < _this.childBaseInfo.length; i++) {
              var item = _this.childBaseInfo[i];
              if (item.desc == "NMPA_DK") {
                _this.childBaseInfo.splice(i, 1);
              }
            }

            // 基础字段
            _this.childBaseInfo.forEach(function (item, index) {
              var key = item.alias;
              item.name = obj.data[key];
            });

            _this.childBaseInfo = JSON.parse(
              JSON.stringify(_this.childBaseInfo)
            );
            _this.queryLinkShow = true;
          } else {
            _this.$message({
              message: "暂无关联信息！",
              offset: 280,
              type: "info",
              duration: 1000,
            });
          }
        });
    },
    //数据库备注信息跳转
    goHelp: function () {
      var linkMail = "";
      if ("国产药品、进口药品、进口药品商品名".indexOf(this.itemName) >= 0) {
        linkMail = "yp_1_3";
      }
      if (
        "境外生产药品备案信息公示、境内生产药品备案信息公示".indexOf(
          this.itemName
        ) >= 0
      ) {
        linkMail = "yp_4_5";
      }
      if ("药品生产企业".indexOf(this.itemName) >= 0) {
        linkMail = "yp_6";
      }
      if ("药品经营企业、GMP认证、GSP认证".indexOf(this.itemName) >= 0) {
        linkMail = "yp_7_9";
      }
      if ("中药保护品种".indexOf(this.itemName) >= 0) {
        linkMail = "yp_10";
      }
      if ("药品注册相关专利信息公开公示".indexOf(this.itemName) >= 0) {
        linkMail = "yp_11";
      }
      if (this.itemName.indexOf("疫苗说明书和标签数据库") >= 0) {
        linkMail = "yp_12";
      }
      if ("医疗器械生产企业、医疗器械经营企业".indexOf(this.itemName) >= 0) {
        linkMail = "ylqx_7_8";
      } else if (
        this.itemName.indexOf("医疗") >= 0 ||
        this.itemName.indexOf("体外诊断试剂分类子目录（2013版）") >= 0 ||
        this.itemName.indexOf("器械") >= 0
      ) {
        linkMail = "ylqx_1_6";
      }

      if (this.itemName.indexOf("化妆品") >= 0) {
        linkMail = "hzp";
      }

      if (this.itemName == "药品监管信息化标准—标准文档") {
        var url = "../../search-help.html#" + linkMail;
        window.open(url);
      }

      if (this.itemName == "药品监管信息化标准—术语") {
        var url = "../datasearch/search-help.html#" + linkMail;
        window.open(url);
      }

      if (this.itemName == "药品监管信息化标准—数据元") {
        var url = "../../search-help.html#" + linkMail;
        window.open(url);
      }

      if (this.itemName == "药品监管信息化标准—值域代码") {
        var url = "search-help.html#" + linkMail;
        window.open(url);
      }

      if (this.itemName.indexOf("数据集") >= 0) {
        var url = "../../search-help.html#" + linkMail;
        window.open(url);
      }
      if (this.itemName.indexOf("值含义") >= 0) {
        var url = "search-help.html#" + linkMail;
        window.open(url);
      }

      if (this.itemName.indexOf("数据子集") >= 0) {
        var url = "../../search-help.html#" + linkMail;
        window.open(url);
      }

      var url = "search-help.html#" + linkMail;
      window.open(url);
    },
    // 自身带链接的跳转
    goLinkInfo: function (linkInfo, value, alias) {
      var paramsObj = linkInfo;
      var _this = this;
      // json文件请求
      this.getJson(paramsObj.link_item_id, function (result) {
        var obj = result.data;

        for (var i = 0; i < obj.detailFeild.length; i++) {
          var item = obj.detailFeild[i];
          if (item.desc == "NMPA_DK") {
            obj.detailFeild.splice(i, 1);
          }
        }

        // 表title获取
        _this.childItemName = obj.itemName;

        // _this.baseInfo = obj.detailFeild;
        _this.childBaseInfo = obj.detailFeild;
        // 相关链接
        _this.aboutChildlink = obj.linkItemFeild;
        if (paramsObj.link_item_feild != undefined) {
          // 请求子表详情
          _this.queryLink({
            linkItemId: paramsObj.link_item_id,
            link_item_feild: paramsObj.link_item_feild,
            // link_item_feild: 'f0',
            main_item_value: value,
          });
        } else {
          _this.$message({
            message: "信息配置异，请联系管理员!",
            offset: 280,
            type: "error",
            duration: 2000,
          });
        }
      });
      /*switch(paramsObj.link_display){
          // 弹层展现方式
          case 'openlayer':

              break;

          // 跳转展现方式
          case 'tab':
              break;

          // 跳转展现方式
          case 'form':
              break;
      }*/
    },

    // layer自身带链接的跳转
    layer_goLinkInfo: function (linkInfo, value, alias) {
      var paramsObj = linkInfo;
      var _this = this;

      switch (paramsObj.link_display) {
        // 弹层展现方式
        case "openlayer":
          var dAlias = "";
          // json文件请求
          this.getJson(paramsObj.link_item_id, function (result) {
            var obj = result.data;
            for (var i = 0; i < obj.detailFeild.length; i++) {
              var item = obj.detailFeild[i];
              if (item.desc == "NMPA_DK") {
                dAlias = item.alias;
                break;
              }
            }
          });
          //获取关联表的ID
          pajax
            .hasTokenGet(api.queryLink, {
              linkItemId: paramsObj.link_item_id,
              link_item_feild: paramsObj.link_item_feild,
              main_item_value: value,
            })
            .then(function (result) {
              var obj = result.data;
              //得到ID
              var id = obj.data;
              if (id == "" || id == null) {
                _this.$message({
                  message: "暂无关联信息！",
                  type: "info",
                  offset: 280,
                  duration: 1000,
                });
              } else {
                var params = Base64.encode(
                  "id=" + id + "&itemId=" + paramsObj.link_item_id
                );
                var url = "search-info.html?nmpa=" + params;
                window.open(url);
              }
            })
            .catch(function (error) {});
          /* // window.location.href = './home.html#/child-info?linkItemId=' + paramsObj.link_item_id + '&link_item_feild=' + paramsObj.link_item_feild + '&main_item_value=' + value;
           var params = Base64.encode('linkItemId=' + paramsObj.link_item_id + '&link_item_feild=' + paramsObj.link_item_feild + '&main_item_value=' + value);
           var url = 'child-info.html?nmpa='+params;
           localStorage.setItem(value, this.subTitle);
           window.open(url); */
          break;

        // 跳转展现方式
        case "tab":
          break;

        // 跳转展现方式
        case "form":
          break;
      }
    },

    // 相关链接
    goAbout: function (paramsObj) {
      /*switch(paramsObj.link_item_pagetype){
          case 'list':
              var value = '';
              this.baseInfo.forEach(function(item, index){
                  if(paramsObj.main_item_feild == item.alias){
                      value = item.name;
                  }
              })
              // window.location.href = './home.html#/child-list?linkItemId=' + paramsObj.link_item_id + '&link_item_feild=' + paramsObj.link_item_feild + '&main_item_value=' + value;
              var params = Base64.encode('linkItemId=' + paramsObj.link_item_id + '&link_item_feild=' + paramsObj.link_item_feild + '&main_item_value=' + value);
              var url = 'child-list.html?nmpa='+params;
              localStorage.setItem(value, this.subTitle);
              window.open(url);
              break;
          case 'detail':
              var value = '';
              this.baseInfo.forEach(function(item, index){
                  if(paramsObj.main_item_feild == item.alias){
                      value = item.name;
                  }
              })
              // window.location.href = './home.html#/child-info?linkItemId=' + paramsObj.link_item_id + '&link_item_feild=' + paramsObj.link_item_feild + '&main_item_value=' + value;
              var params = Base64.encode('linkItemId=' + paramsObj.link_item_id + '&link_item_feild=' + paramsObj.link_item_feild + '&main_item_value=' + value);
              var url = 'child-list.html?nmpa='+params;
              localStorage.setItem(value, this.subTitle);
              window.open(url);
              break;
      }*/
      var _this = this;
      var value = "";
      this.baseInfo.forEach(function (item, index) {
        if (paramsObj.main_item_feild == item.alias) {
          value = item.name;
        }
      });

      //获取关联表的ID
      pajax
        .hasTokenGet(api.queryLink, {
          linkItemId: paramsObj.link_item_id,
          link_item_feild: paramsObj.link_item_feild,
          main_item_value: value,
        })
        .then(function (result) {
          var obj = result.data;
          //得到ID
          var id = obj.data;
          if (id == "" || id == null) {
            _this.$message({
              message: "暂无关联信息！",
              type: "info",
              offset: 280,
              duration: 1000,
            });
          } else {
            var searchParam =
              '{"' + paramsObj.link_item_feild + '":"' + value + '"}';
            var params = Base64.encode(
              "linkItemId=" +
                paramsObj.link_item_id +
                "&link_item_feild=" +
                paramsObj.link_item_feild +
                "&main_item_value=" +
                searchParam
            );
            var url = "child-list.html?nmpa=" + params;
            localStorage.setItem(value, _this.subTitle);
            window.open(url);
          }
        })
        .catch(function (error) {});
    },
    preview: function (row) {
      var url = row.name;
      if (!url) {
        this.$message({
          message: "对不起，服务器找不到该文件！",
          type: "error",
          offset: 280,
          duration: 1000,
        });
        return;
      }
      /*if(!row.attachDir){
        this.$message({
                  message: '配置出现错误，请联系管理员！',
                  type: 'error',
                  offset:280,
                  duration: 1000
              });
              return;
      }*/
      // 判断变量x是否为undefined
      var attachDir = row.attachDir;
      if (typeof attachDir == "undefined") {
        attachDir = "";
      }
      //如果是附件信息
      if (url.charAt(0) == "/") {
        url = api.getAttachWebPath(attachDir) + url;
      } else {
        url = api.getAttachWebPath(attachDir) + "/" + url;
      }

      this.viewContent = url;
      if ("image" == this.getFileType(url)) {
        this.urlShow = true;
      } else if ("pdf" == this.getFileType(url)) {
        window.open(itemFileUrl + "preview-pdf.html?url=" + url);
        //window.open(url);
        return false;
      } else {
        window.open(url);
        return false;
      }
    },
    download: function (url) {
      //location.href=url;
      // 创建隐藏的可下载链接
      var eleLink = document.createElement("a");
      eleLink.download = url;
      eleLink.style.display = "none";
      // // 字符内容转变成blob地址
      eleLink.href = url;
      // // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // // 然后移除
      document.body.removeChild(eleLink);
    },
    getFileType: function (fileName) {
      // 后缀获取
      var suffix = "";
      // 获取类型结果
      var result = "";
      try {
        var flieArr = fileName.split(".");
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = "";
      }
      // fileName无后缀返回 false
      if (!suffix) {
        return false;
      }
      suffix = suffix.toLocaleLowerCase();
      // 图片格式
      var imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
      // 进行图片匹配
      // result = imglist.find(item => item === suffix);
      result = imglist.find(function (item) {
        return item === suffix;
      });
      if (result) {
        return "image";
      }
      // 匹配 pdf
      var pdflist = ["pdf"];
      // result = pdflist.find(item => item === suffix);
      result = pdflist.find(function (item) {
        return item === suffix;
      });
      if (result) {
        return "pdf";
      }
      // 其他 文件类型
      return "other";
    },
    isHttp: function (val) {
      var str = val;
      var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
      var objExp = new RegExp(Expression);
      if (objExp.test(str) == true) {
        return true;
      } else {
        return false;
      }
    },
    addWaterMarker: function (str) {
      var can = document.createElement("canvas");
      var body = document.body;
      body.appendChild(can);
      can.width = 300; //画布的宽
      can.height = 200; //画布的高度
      can.style.display = "none";
      var cans = can.getContext("2d");
      cans.rotate((-20 * Math.PI) / 180); //画布里面文字的旋转角度
      cans.font = "16px Microsoft JhengHei"; //画布里面文字的字体
      cans.fillStyle = "rgba(17, 17, 17, 0.50)"; //画布里面文字的颜色
      cans.textAlign = "left"; //画布里面文字的水平位置
      cans.textBaseline = "Middle"; //画布里面文字的垂直位置
      cans.fillText(str, can.width / 3, can.height / 2); //画布里面文字的间距比例
      alert(document.getElementsByClassName("el-table__body"));
      document.getElementsByClassName("el-table__body").style.backgroundImage =
        "url(" + can.toDataURL("image/png") + ")"; //把画布插入到body中
    },
    isShowLink: function (link_info, val) {
      if (link_info != "" && link_info != undefined) {
        //显示链接信息
        if (val == "" || val == null || val == undefined) {
          return "html_link";
        }
        var len = val.indexOf("http");
        if (
          (link_info.link_type == "C" || link_info.link_type == "D") &&
          len < 0
        ) {
          return "btn_link";
        } else if (
          (link_info.link_type == "C" || link_info.link_type == "D") &&
          len == 0
        ) {
          return "href_link";
        } else if (
          (link_info.link_type == "C" || link_info.link_type == "D") &&
          len > 0
        ) {
          return "html_link";
        } else {
          return "table_link";
        }
      } else {
        if (val != "" && val != null && this.isHttp(val)) {
          var len = val.indexOf("http");
          if (len < 0) {
            return "btn_link";
          } else if (len == 0) {
            return "href_link";
          } else {
            return "html_link";
          }
        } else {
          return "no";
        }
      }
    },
  },
  computed: {
    filteredTableData: function () {
      return this.baseInfo.filter(function (item) {
        if (item.desc != "NMPA_FK" && item.desc.indexOf("NMPA_FK") < 0) {
          return item;
        }
        // return item.desc!='NMPA_FK';||item.desc.indexOf('NMPA_FK')>=0
      });
    },
    filteredChildTableData: function () {
      return this.childBaseInfo.filter(function (item) {
        if (item.desc != "NMPA_FK" && item.desc.indexOf("NMPA_FK") < 0) {
          return item;
        }
      });
    },
  },
  components: {
    // 将组建加入组建库
    "my-html": "url:../components/autohtml.vue",
    "my-link": "url:../components/detaillink.vue",
  },
};
</script>
