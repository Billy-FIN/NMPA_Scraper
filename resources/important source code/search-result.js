Vue.use(httpVueLoader);

new Vue({
  el: "#home",
  data: function () {
    return {
      bannerData: [
        { text: "药品", className: "yaopin", icon: "el-icon-yaopin" },
        {
          text: "医疗器械",
          className: "yiliaoqixie",
          icon: "el-icon-yiliaoqixie",
        },
        {
          text: "化妆品",
          className: "huazhuangpin",
          icon: "el-icon-huazhuangpin",
        },
        { text: "其他", className: "qita", icon: "el-icon-qita" },
      ],
      activeNames: "",

      searchTypeText: "",
      // 品种所有数据
      datastructArray: [],

      // 品种索引
      oldSearchMenuIndex: 0,
      searchMenuIndex: 0,

      // 搜索关键字
      searchKeyword: "",
      // 搜索结果ItemId
      queryListItemId: "",
      detailShow: false,
      baseInfoPageUrl: "",
      // 品种集合
      searchTypeArray: [],

      // 搜索结果
      searcyResultArray: [],
      // 高级搜素
      gaojidrawerShow: false,
      gaojiIndex: 0,
      gaojiOptions: [],
      gaojiValue: "",

      gaojiChildIndex: 0,
      gaojiChildOptions: [],
      gaojiChildValue: "",

      queryItemFeild: [],

      gaojitijiaoLoading: false,

      gaojiPageNum: 1,
      gaojiPageSize: 10,

      // 默认加载索引
      defaultIndex: 0,

      // table数据
      searchTableData: [],

      // 标题
      tableTitle: "",

      // table头部
      tableHeader: [],
      tableItemDesc: "",

      itemIdArray: [],
      expandTrigger: "click",

      dataItems: [],
      //只存三个选择
      threeDataItems: [],

      // table-loading
      tableLoading: true,
      // table-提示文本
      tableEmptytEXT: "",
      // 总页数
      tableTotal: 1,
      // 默认请求每页条数
      tablePageSize: 10,
      // 默认请求第几页
      tablePageNum: 1,

      // 特殊页面配置
      sysdefPage: "",
      gjFeildTipTxt: "",
      // id
      NMPA_DK: "",
      //是否登录的标识
      loginFlag: "false",
      //是否是高级查询 Y：是 N：否
      isSenior: "",
      //高级查询参数
      searchParam: "",
      // 复合查询选择项
      selectedValue: [],

      loginObj: {},

      eldialogWidth: "65%",
      advancedSearchSrawer: "30%", // 高级搜索弹窗宽度，这个宽度用于适配 pc 和 手机访问
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
    };
  },
  mounted: function () {
    var isintro = $.cookie("STEP_TIPS_RESULT");
    if (isintro != "true") {
      setTimeout(function () {
        introJs()
          .setOptions({
            nextLabel: "下一步 &rarr;",
            prevLabel: "&larr; 上一步",
            doneLabel: "完成",
            skipLabel: "关闭",
          })
          .start();
        $.cookie("STEP_TIPS_RESULT", "true", { expires: 99999, path: "/" });
      }, 700);
    }
    // 搜索框旁边下拉选的值
    this.selectedValue = JSON.parse(localStorage.getItem("selectValue"));
  },
  created: function () {
    // 数据分类列表
    this.datastruct();

    // 获取搜索关键词
    // this.searchKeyword = decodeURIComponent(getCookie('searchkey'));
    this.searchKeyword = decodeURIComponent(localStorage.getItem("searchkey"));

    // 获取品种集合
    this.searchTypeArray = JSON.parse(localStorage.getItem("typeArray"));
    // 获取品种索引
    this.oldSearchMenuIndex = localStorage.getItem("bannerIndex") || 0;
    this.searchMenuIndex = localStorage.getItem("bannerIndex") || 0;
    this.searchTypeText = this.bannerData[this.searchMenuIndex].text;
    // 获取搜索结果
    // this.searcyResultArray = JSON.parse(localStorage.getItem('searchRusultArray'))?JSON.parse(localStorage.getItem('searchRusultArray')).data: [];
    if (
      this.searcyResultArray !== "null" &&
      this.searcyResultArray &&
      this.searcyResultArray.length
    ) {
      this.searcyResultArray[0].active = true;
    }

    // 获取itemId参数集合
    // this.itemIdArray = JSON.parse(localStorage.getItem('itemIdArray')) || [];
    this.itemIdArray = JSON.parse(localStorage.getItem("itemIdArray"));
    // this.itemIdArray = JSON.parse(getCookie('itemIdArray'));

    // this.selectedValue = [
    //     [getCookie('paraCode'), getCookie('itemId')]
    // ];
    // this.selectedValue = JSON.parse(getCookie('selectValue'));

    //如果是copy的地址第一次访问,返回首页面
    //if (!this.itemIdArray) {
    //location.href = './home-index.html#category=yp';
    // }
    // this.queryListItemId = JSON.parse(localStorage.getItem('itemIdArray'))?JSON.parse(localStorage.getItem('itemIdArray'))[0]:'';
    // this.queryListItemId = JSON.parse(getCookie('itemIdArray'))[0];
    this.queryListItemId = JSON.parse(localStorage.getItem("itemIdArray"))[0];

    // 默认调用第一个搜索结果
    /* if(this.itemIdArray && this.itemIdArray.length){
        this.queryList();
    }; */

    if (this.itemIdArray && this.itemIdArray.length) {
      this.countNums();
    } else {
      this.tableLoading = false;
    }

    this.queryList();

    // 获取用户信息
    this.loginObj = JSON.parse(localStorage.getItem("loginObj"));

    // iframe全屏父级
    function changeMobsfIframe() {
      var ifm = document.getElementById("mobsf");
      if (ifm) {
        ifm.height = document.documentElement.clientHeight;
        ifm.width = document.documentElement.clientWidth - 56;
      }
    }

    changeMobsfIframe();

    // iframe弹层父级
    function infoChangeMobsfIframe() {
      var ifm = document.getElementById("info_mobsf");
      if (ifm) {
        ifm.height = document.documentElement.clientHeight;
        ifm.width =
          document.documentElement.clientWidth * this.eldialogWidth - 80;
      }
    }

    infoChangeMobsfIframe();

    window.onresize = function () {
      changeMobsfIframe();
      infoChangeMobsfIframe();
    };
    this.getLoginUserInfo();
  },
  computed: {},
  methods: {
    // 数据分类列表
    datastruct: function () {
      var _this = this;
      //------------------------分割开始-----------------------//
      //对于数据查询大类的分割访问
      var nmpaType = getUrl("nmpaType");
      if (!nmpaType) {
        nmpaType = "NMPA_DATA";
      } else {
        var nmpaItem = getUrl("nmpaItem");
        if (!nmpaType) {
          this.$message({
            showClose: true,
            duration: 1000,
            message: "访问格式不正确，请联系管理员！",
            type: "primary",
          });
          return;
        } else {
          var itemIdArray = [];
          itemIdArray.push(nmpaItem);
          localStorage.setItem("searchkey", " "); //查询值
          var selectValueArray = [["1", nmpaItem]];
          localStorage.setItem("selectValue", JSON.stringify(selectValueArray)); //回显查询项
          localStorage.setItem("itemIdArray", JSON.stringify(itemIdArray)); //查询项
        }
      }
      //------------------------分割结束-----------------------//
      pajax
        .get(itemFileUrl + "config/" + nmpaType + ".json", {})
        .then(function (result) {
          var obj = result.data;

          if (result.status == 200 && obj.length) {
            // 处理banner控制文字
            var dataItemObj = [];

            for (var i = 0; i < obj.length; i++) {
              var item = obj[i];
              var index = i;
              _this.bannerData[index].text = item.paraName;
              _this.bannerData[index].id = item.id;
              dataItemObj[index] = new Object();
              dataItemObj[index].label = item.paraName;
              dataItemObj[index].value = item.paraCode;
              dataItemObj[index].children = _this.getNavSelectJson(
                item.itemList
              );
            }

            _this.dataItems = dataItemObj;

            // 取所有数据
            _this.datastructArray = obj;

            // 高级搜索
            _this.gaojiOptions = obj;
            _this.gaojivalue = obj[0].id;

            _this.gaojiChildOptions = obj[_this.gaojiIndex].itemList;
            _this.gaojiChildvalue = obj[_this.gaojiIndex].itemList[0].itemId;
            //alert(_this.gaojiChildOptions[_this.gaojiChildIndex].itemName)
            //
            _this.gaojiGetJosn(
              JSON.parse(localStorage.getItem("itemIdArray"))[0]
            );
          } else {
          }
        })
        .catch(function (error) {});
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

    indexMethod: function (index) {
      var isSenior = localStorage.getItem("isSenior");
      if (isSenior == "Y") {
        return (this.gaojiPageNum - 1) * this.tablePageSize + index + 1;
      } else {
        return (this.tablePageNum - 1) * this.tablePageSize + index + 1;
      }
    },
    getNavSelectJson: function (itemList) {
      var items = []; //当前的信息
      if (itemList != null && itemList.length > 0) {
        for (var i = 0; i < itemList.length; i++) {
          if (itemList[i].itemType == "table") {
            items[i] = new Object();
            items[i].label = itemList[i].itemName;
            items[i].value = itemList[i].itemId;

            if (this.itemIdArray.length >= 3) {
              if (
                items[i].value != this.itemIdArray[0] &&
                items[i].value != this.itemIdArray[1] &&
                items[i].value != this.itemIdArray[2]
              )
                items[i].disabled = true;
            }
          }
        }
      }
      return items;
    },

    expandTree: function () {
      this.dataItems;
    },

    fnFilter: function (value) {
      return false;
    },

    changeSelectedValue: function (val) {
      // this.$refs["myCascader"].getCheckedNodes()[0].value;
      //this.dataItems = this.setCanSelect(this.dataItems);
      //  this.$refs["myCascader"].getCheckedNodes().forEach(function(item, index){
      // 	 item.parent.isDisabled=true
      //  });
    },

    fnaaa: function (value) {
      return false;
    },

    setCanSelect: function (items) {
      /*  var selectItems = "";
      for(var i=0; i<items.length; i++){
          var item = items[i];
          selectItems = item[1]+","+selectItems;
      }
      */
      if (this.selectedValue.length == 1) {
        this.gaojiGetJosn(items[0][1]);
      } else {
        this.gjFeildTipTxt = "请输入搜索的内容";
      }

      var arr = [];
      // var oldArr = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        arr.push(item[1]);
        // oldArr.push(item);
      }

      if (this.selectedValue.length > 3) {
        this.itemIdArray = arr;
        // 被选条件超过3个时，不允许在进行选择
        this.$message({
          showClose: true,
          duration: 1000,
          offset: 100,
          message: "您同时只能最多选择3个数据库！",
          type: "warning",
        });

        // oldArr.pop();
        // this.selectedValue = oldArr;

        for (var i = 0; i < this.dataItems.length; i++) {
          var children = this.dataItems[i].children;
          for (var j = 0; j < children.length; j++) {
            if (
              children[j].value != arr[0] &&
              children[j].value != arr[1] &&
              children[j].value != arr[2]
            ) {
              children[j].disabled = true;
            }
          }
        }
        this.dataItems = JSON.parse(JSON.stringify(this.dataItems));
        // return threeDataItems;
        // return items;
      } else {
        for (var i = 0; i < this.dataItems.length; i++) {
          var children = this.dataItems[i].children;
          for (var j = 0; j < children.length; j++) {
            children[j].disabled = false;
          }
        }
        // threeDataItems=items;
        this.itemIdArray = arr;
        //this.queryListItemId = this.itemIdArray[0];
        // localStorage.setItem('itemIdArray', JSON.stringify(this.itemIdArray));
        // return items;
      }
    },

    // 高级查询调用表头
    gaojiGetJosn: function (itemId) {
      var _this = this;
      this.getJson(itemId, function (getJsonObj) {
        var list = getJsonObj.queryItemFeild;
        var gjFeildTip = "请输入";
        // 处理数据
        list.forEach(function (item, index) {
          if (index == 0) {
            gjFeildTip = gjFeildTip + item.detail_feild_name;
          } else {
            gjFeildTip = gjFeildTip + " / " + item.detail_feild_name;
          }

          item[item.detail_feild_alias] = "";

          item.formName = item.detail_feild_alias;

          if (item.query_cond_type == "select") {
            var query_options = item.query_cond_value.split(",");
            item.query_options = [];

            query_options.forEach(function (obj, i) {
              var arr = obj.split(":");
              obj = {
                key: arr[0],
                value: arr[1],
              };
              item.query_options.push(obj);
            });
          } else if (item.query_cond_type == "radio") {
            var query_options = item.query_cond_value.split(",");
            item.query_options = [];

            query_options.forEach(function (obj, i) {
              var arr = obj.split(":");
              obj = {
                key: arr[0],
                value: arr[1],
              };
              item.query_options.push(obj);
            });
          } else if (item.query_cond_type == "checkbox") {
            var query_options = item.query_cond_value.split(",");
            item.query_options = [];

            query_options.forEach(function (obj, i) {
              var arr = obj.split(":");
              obj = {
                key: arr[0],
                value: arr[1],
              };
              item.query_options.push(obj);
            });

            item.checkArray = [];
          }
        });
        _this.gjFeildTipTxt = gjFeildTip + "查询";
        _this.queryItemFeild = list;
      });
    },

    findArrayIndex: function (k, v, array) {
      for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item[k] == v) {
          return i;
        }
      }
      // return null;
    },

    // 高级搜搜
    firstSearch: function () {
      // 获取高级搜索父级关联索引
      this.gaojiIndex = this.findArrayIndex(
        "value",
        this.selectedValue[0][0],
        this.dataItems
      );
      this.gaojiChildIndex = this.findArrayIndex(
        "value",
        this.selectedValue[0][1],
        this.dataItems[this.gaojiIndex]["children"]
      );

      // 获取高级搜索子级关联数据
      this.gaojiChildOptions = this.datastructArray[this.gaojiIndex].itemList;

      // 触发二级分类选择取值
      this.gaojiChildValue =
        this.gaojiChildOptions[this.gaojiChildIndex].itemId;

      this.gaojiGetJosn(this.gaojiChildValue);

      if (this.selectedValue.length > 1) {
        this.$message({
          showClose: true,
          duration: 1000,
          message: "请选择1个数据库进行高级搜索",
          type: "info",
        });
        return;
      }
      // 判断屏幕大小，如果是PC端的宽度使用变量默认的30%，如果屏幕宽小于768则展示弹窗宽度为70%
      this.advancedSearchSrawer =
        this.windowWidth > 768 ? this.advancedSearchSrawer : "70%";
      this.gaojidrawerShow = true;
    },

    // 高级查询取消按钮
    gaojiCancelForm: function () {
      this.gaojidrawerShow = false;
    },

    // 高级查询提交按钮
    fnGaojiTijiao: function () {
      this.gaojiPageNum = 1; // 切换页签时默认第一页
      this.tablePageNum = 1;
      var formParams = {};
      var _this = this;
      this.queryItemFeild.forEach(function (item, index) {
        //解决高级查询 查询条件字段为空查不出结果的问题，只存放有值的查询条件字段
        if (item[item.formName] != "") {
          formParams[item.formName] = item[item.formName];
          if (_this.checks(item[item.formName])) {
            _this.$message({
              showClose: true,
              duration: 1500,
              offset: 385,
              message: "查询内容不正确，请重新输入！",
              type: "warning",
            });
            return;
          }
        }

        if (item.query_cond_type == "checkbox") {
          formParams[item.formName] = item.checkArray.join(",");
        }
      });

      //
      //高级查询统计数量
      this.countNumsOfGaoJi(JSON.stringify(formParams));
      this.gaojiQueryList(JSON.stringify(formParams));
    },

    // 高级搜索总大类触发
    fnGaoji: function (value) {
      var index = value;

      // 二级分类联动
      this.gaojiChildIndex = 0;
      this.gaojiChildOptions = this.gaojiOptions[index].itemList;
      this.gaojiChildValue = this.gaojiOptions[index].itemList[0].itemId;

      // 一级选择取值
      this.gaojiValue = this.gaojiOptions[index].id;
    },

    // 高级搜索二级分类触发
    fnGaojiChild: function (value) {
      var _this = this;
      var index = value;

      // 二级分类选择取值
      this.gaojiChildValue = this.gaojiChildOptions[index].itemId;
      this.gaojiGetJosn(this.gaojiChildValue);
    },

    // 普通查询-搜索统计数量触发接口
    countNums: function () {
      var _this = this;
      pajax
        .hasTokenGet(api.countNums, {
          itemIds: _this.itemIdArray.join(","),
          searchValue: _this.searchKeyword,
          isSenior: "N",
        })
        .then(function (result) {
          var obj = result.data;
          if (obj.code != "200") {
            /*_this.$message({
                showClose: true,
                duration: 0,
                offset:385,
                message: '服务响应异常:'+obj.message,
                type: 'error'
            });*/
          }
          // 储存数据
          // localStorage.setItem('searchRusultArray', JSON.stringify(obj));

          _this.searcyResultArray = obj.data;

          // _this.searchKeyword = localStorage.getItem('searchkey');
          // _this.queryListItemId = JSON.parse(getCookie('itemIdArray'))[0];
          _this.queryListItemId = JSON.parse(
            localStorage.getItem("itemIdArray")
          )[0];

          // 默认调用第一个搜索结果
          if (_this.itemIdArray && _this.itemIdArray.length) {
            _this.queryList();
          }
        })
        .catch(function (error) {});
    },
    // 高级查询-搜索统计数量触发接口
    countNumsOfGaoJi: function (searchParam) {
      if (searchParam == "{}") {
        this.$message({
          showClose: true,
          duration: 1000,
          message: "请输入高级查询条件查询",
          type: "warning",
        });
        return;
      }
      var _this = this;
      pajax
        .hasTokenGet(api.countNums, {
          itemIds: _this.itemIdArray.join(","),
          searchParam: searchParam,
          isSenior: "Y",
        })
        .then(function (result) {
          var obj = result.data;
          //
          // 储存数据
          // localStorage.setItem('searchRusultArray', JSON.stringify(obj));

          _this.searcyResultArray = obj.data;

          _this.searchKeyword = localStorage.getItem("searchkey");
          // _this.queryListItemId = JSON.parse(localStorage.getItem('itemIdArray'))[0];

          // 默认调用第一个搜索结果
          if (_this.itemIdArray && _this.itemIdArray.length) {
            _this.gaojiQueryList(searchParam);
          }
        })
        .catch(function (error) {});
    },

    // 点击搜索
    fnSearch: function () {
      if (this.checks(this.searchKeyword)) {
        this.$message({
          showClose: true,
          duration: 1500,
          offset: 385,
          message: "查询内容不正确，请重新输入！",
          type: "warning",
        });
        return;
      }
      this.tablePageNum = 1; // 切换页签时默认第一页
      this.defaultIndex = 0; // 默认选择第一个表
      // 更新cookie存储数据，防止刷新页面数据改变
      // setCookie('searchkey', this.searchKeyword);
      // setCookie('selectValue', JSON.stringify(this.selectedValue));
      localStorage.setItem("isSenior", "N");
      localStorage.setItem("searchkey", this.searchKeyword);
      localStorage.setItem("selectValue", JSON.stringify(this.selectedValue));

      var itemIdArray = [];
      for (var i = 0; i < this.selectedValue.length; i++) {
        var arr = this.selectedValue[i];

        itemIdArray.push(arr[1]);
      }
      // setCookie('itemIdArray', JSON.stringify(itemIdArray));
      localStorage.setItem("itemIdArray", JSON.stringify(itemIdArray));
      this.itemIdArray = itemIdArray;
      if (this.searchKeyword && this.itemIdArray.length) {
        // 本地存储搜索关键字
        // localStorage.setItem('searchkey', this.searchKeyword);
        // 存储类别索引
        // localStorage.setItem('bannerIndex', this.searchMenuIndex);

        // 调用搜索接口
        this.countNums();
        this.queryList();
      } else if (!this.searchKeyword) {
        this.$message({
          showClose: true,
          duration: 1000,
          message: "请输入关键字进行搜索",
          type: "error",
        });
      } else if (!this.itemIdArray.length) {
        this.$message({
          showClose: true,
          duration: 1000,
          message: "请选择条件进行搜索",
          type: "error",
        });
      }
    },
    /**验证输入框是否非法字符  是非法字符 则返回true**/
    checks: function (param) {
      //var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      var regEn = /[`!@#$%^&+?:";'[\]]/im,
        regCn = /[·！#￥——：；“”‘、，|《。》？、【】[\]]/im;
      if (regEn.test(param) || regCn.test(param)) {
        //alert('您输入了非法字符，请重新输入');
        return true;
      }
      // 判断小于两个字符的过滤， 比如 aa  11  22  那种
      if (param.length <= 2) {
        // 对连续字符做判断
        var regContinuous = /([a-zA-Z0-9])\1/;
        if (regContinuous.test(param)) {
          return true;
        }
      }
      // 对单个判断
      if (param.length <= 1) {
        // 对连续字符做判断 整数过滤
        var integerFiltering = /^\+?[a-zA-Z0-9]*$/;
        if (integerFiltering.test(param)) {
          return true;
        }
      }

      // 判断如果输入的是空，那就提示输入不正确
      if (!param.trim()) {
        return true;
      }

      this.$message.closeAll();
      return false;
    },
    // 导航点击操作
    fnSearchMenu: function (index, item) {
      // 如果触发是当前元素，不做任何触发
      if (index == this.oldSearchMenuIndex) {
        return false;
      }

      this.searchMenuIndex = index;
      this.oldSearchMenuIndex = index;

      // 清空搜索结果数据
      this.searchTypeArray = [];
      // 清空选择结果
      this.itemIdArray = [];

      // 取对应list数据渲染搜索词列表
      this.searchTypeArray = this.datastructArray[index].itemList;

      // 获取搜索类型文字
      this.searchTypeText = item.text;

      // 存缓存
      localStorage.setItem("bannerIndex", index);
      var searchTypeArrayString = JSON.stringify(this.searchTypeArray);
      localStorage.setItem("typeArray", searchTypeArrayString);
    },

    // 收藏
    fnShouCang: function (row) {
      //
    },

    // 排序
    fnSortTable: function (obj) {
      //
    },

    // 调转详情
    goInfo: function (row, applink) {
      var id = "";
      for (var name in row) {
        if (name == this.NMPA_DK) {
          id = row[name];
          //
        }
      }
      // 请求表头
      pajax.get(
        "https://www.nmpa.gov.cn/datasearch/" +
          "config/" +
          this.queryListItemId +
          ".json",
        //
        function (getJsonObj) {
          // _this.queryList();
          getJsonObj.listFeild.forEach(function (item, index) {
            /* if(item.desc == 'NMPA_DK'){
               _this.NMPA_DK = item.alias;
           }*/
          });
          this.sysdefPage = getJsonObj.sysdefPage;
        }
      );
      pajax.goInfoPage(id, this.queryListItemId, this.sysdefPage, "", applink);
    },

    // 表头请求json
    getJson: function (itemId, fnSuccess) {
      // 改变模块ID
      this.queryListItemId = itemId;
      var _this = this;
      pajax
        .get(api.jsonUrl + "config/" + itemId + ".json", {})
        .then(function (result) {
          var obj = result.data;
          fnSuccess && fnSuccess(obj);
        });
    },

    // 查找某个值在数组中的位置
    fnIndexOf: function (array, val) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == val) return i;
      }
      return -1;
    },

    // 根据固定值位置在数组中删除固定值
    fnArrayRmove: function (arr, val) {
      var index = this.fnIndexOf(arr, val);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },

    // 点击选择表
    selectKeyWord: function (item, index) {
      //如果是链接，则不能被选中
      if (this.searchTypeArray[index].itemType == "link") {
        //top.location.href=this.searchResultArray[index].itemUrl；
        var url = this.searchTypeArray[index].itemUrl;
        window.open(url);
        return false;
      }
      // 如果选择词被选，取消被选状态并从选中itemId集合中删除当前ID
      if (this.searchTypeArray[index].activeDef) {
        this.searchTypeArray[index].activeDef = false;
        this.fnArrayRmove(this.itemIdArray, item.itemId);
      } else {
        // 如果未选中当前被选次
        // 被选条件超过5个时，不允许在进行选择
        if (this.itemIdArray.length >= 5) {
          this.$message({
            showClose: true,
            duration: 1000,
            message: "您只能选择5个条件",
            type: "error",
          });

          return false;
        }

        // 标记选择状态并把选中词语itemId放入集合当中
        this.searchTypeArray[index].activeDef = true;
        this.itemIdArray.push(this.searchTypeArray[index].itemId);
      }

      // 强制刷新当前搜索集合列表
      this.searchTypeArray = JSON.parse(JSON.stringify(this.searchTypeArray));

      // 本地存储数据
      var searchTypeArrayString = JSON.stringify(this.searchTypeArray);
      localStorage.setItem("typeArray", searchTypeArrayString);
      localStorage.setItem("itemIdArray", JSON.stringify(this.itemIdArray));
    },

    // 分页
    fnCurrentChange: function (val) {
      var isSenior = localStorage.getItem("isSenior");
      var searchParam = localStorage.getItem("searchParam");

      // 存在切换标签 到另一个标签时，页码默认显示上一次的页码问题，后期优化
      if (isSenior == "Y") {
        this.gaojiPageNum = val;
        this.tablePageNum = val;
        this.gaojiQueryList(searchParam);
      } else {
        this.tablePageNum = val;
        this.queryList();
      }
    },

    // 每页显示条数
    fnSizeChange: function (val) {
      this.tablePageSize = val;
      var isSenior = localStorage.getItem("isSenior");
      var searchParam = localStorage.getItem("searchParam");
      if (isSenior == "Y") {
        this.gaojiPageNum = 1;
        this.gaojiQueryList(searchParam);
      } else {
        this.tablePageNum = 1;
        this.queryList();
      }
    },

    // queryList高级请求
    gaojiQueryList: function (searchParam) {
      localStorage.setItem("isSenior", "Y");
      localStorage.setItem("searchParam", searchParam);
      var _this = this;
      _this.gaojidrawerShow = false;
      pajax
        .hasTokenGet(api.queryList, {
          itemId: _this.gaojiChildValue,
          isSenior: "Y",
          searchValue: "",
          searchParam: searchParam,
          orderParam: "",
          pageNum: _this.gaojiPageNum,
          pageSize: _this.tablePageSize,
        })
        .then(function (result) {
          var obj = result.data;
          //
          // 搜索点击过快数据超时
          if (obj.code == "500") {
            _this.tableLoading = false;
            _this.tableEmptytEXT = "请求超时，请尝试其它搜索";
            return false;
          }
          if (obj.data.total == 0) {
            // 请求表头
            _this.getJson(_this.gaojiChildValue, function (getJsonObj) {
              // _this.queryList();
              getJsonObj.listFeild.forEach(function (item, index) {
                if (item.desc == "NMPA_DK") {
                  _this.NMPA_DK = item.alias;
                }
              });

              _this.tableHeader = getJsonObj.listFeild;
              _this.tableItemDesc = getJsonObj.itemDesc;
            });
            _this.searchTableData = null;
            _this.tableEmptytEXT = "暂无数据内容";
            // 分页总数
            _this.tableTotal = obj.data.total;
          } else {
            // 有数据
            // 清空loading
            _this.tableLoading = false;
            // 插入数据
            /* obj.data.list.forEach(function(item, index){
              _this.searchTableData.push(item);
          }) */
            // 填充数据
            _this.getJson(_this.gaojiChildValue, function (getJsonObj) {
              // _this.queryList();
              getJsonObj.listFeild.forEach(function (item, index) {
                if (item.desc == "NMPA_DK") {
                  _this.NMPA_DK = item.alias;
                }
              });

              _this.tableHeader = getJsonObj.listFeild;
              _this.tableItemDesc = getJsonObj.itemDesc;
            });

            _this.searchTableData = obj.data.list;
            // 分页总数
            _this.tableTotal = obj.data.total;
          }
        })
        .catch(function (error) {});
    },

    // queryList普通请求
    queryList: function () {
      // localStorage.setItem('isSenior', 'N');
      // localStorage.setItem('searchParam', '');
      var _this = this;
      this.tablePageNum = _this.tablePageNum;
      pajax
        .hasTokenGet(api.queryList, {
          //     https://www.nmpa.gov.cn/datasearch/data/nmpadata/search
          itemId: _this.queryListItemId,
          isSenior: "N",
          searchValue: _this.searchKeyword, //'经营'
          pageNum: _this.tablePageNum, //1
          pageSize: _this.tablePageSize, //10
        })
        .then(function (result) {
          var obj = result.data;

          /*     // 搜索点击过快数据超时
             if(obj.code == '500'){
                 _this.tableLoading = false;
                 _this.tableEmptytEXT = '请求超时，请尝试其它搜索';

                 return false;
             }
             */
          if (obj.code == "500" || obj.data.total == 0) {
            if (obj.code == "500") {
              // 提示错误信息
              _this.$message({
                showClose: true,
                duration: 2500,
                offset: 385,
                message: obj.message,
                type: "error",
              });
            }
            // 清空loading
            _this.tableLoading = false;
            _this.tableEmptytEXT = "暂无数据内容";
            // 填充数据
            _this.searchTableData = null;
            _this.tableTotal = 0;
            // 请求表头
            _this.getJson(_this.queryListItemId, function (getJsonObj) {
              // _this.queryList();
              getJsonObj.listFeild.forEach(function (item, index) {
                if (item.desc == "NMPA_DK") {
                  _this.NMPA_DK = item.alias;
                }
              });
              _this.tableHeader = getJsonObj.listFeild;
              _this.tableItemDesc = getJsonObj.itemDesc;
            });
          } else {
            // 有数据
            // 清空loading
            _this.tableLoading = false;

            // 插入数据
            /* obj.data.list.forEach(function(item, index){
              _this.searchTableData.push(item);
          }) */

            // 填充数据
            _this.searchTableData = obj.data.list;
            // 强制刷新数据
            _this.searchTableData = JSON.parse(
              JSON.stringify(_this.searchTableData)
            );
            // 分页总数
            _this.tableTotal = obj.data.total;
            // 请求表头
            _this.getJson(_this.queryListItemId, function (getJsonObj) {
              // _this.queryList();
              getJsonObj.listFeild.forEach(function (item, index) {
                if (item.desc == "NMPA_DK") {
                  _this.NMPA_DK = item.alias;
                }
              });
              _this.tableHeader = getJsonObj.listFeild;
              _this.tableItemDesc = getJsonObj.itemDesc;
              _this.tableTitle = getJsonObj.itemName;
              _this.sysdefPage = getJsonObj.sysdefPage;
              // 存储详情数据
              localStorage.setItem(
                "detailFeild",
                JSON.stringify(getJsonObj.detailFeild)
              );

              // 储存表名字信息
              localStorage.setItem("itemName", getJsonObj.itemName);
            });
          }
        })
        .catch(function (error) {});
    },
    // 返回
    goBack: function () {
      window.history.back();
    },

    // 点击请求列表
    fnTable: function (item, index) {
      this.defaultIndex = index;
      this.tablePageNum = 1; // 切换页签时默认第一页
      if (!this.searcyResultArray[index].active) {
        // 清空数据
        this.searchTableData = [];
        this.tableHeader = [];

        // 重置loading
        this.tableLoading = true;

        // 清空选择状态
        this.searcyResultArray.forEach(function (obj, index) {
          obj.active = false;
        });

        // 为当前点击附加选择状态
        this.searcyResultArray[index].active = true;
        // 强制刷新数据
        this.searcyResultArray = JSON.parse(
          JSON.stringify(this.searcyResultArray)
        );

        // 赋值queryListItemId
        this.queryListItemId = item.itemId;

        var isSenior = localStorage.getItem("isSenior");
        if (isSenior == "Y") {
          var searchParam = localStorage.getItem("searchParam");
          this.gaojiPageNum = 1;
          //this.gaojiQueryList(searchParam);
          this.countNumsOfGaoJi(searchParam);
          this.gaojiQueryList(searchParam);
        } else {
          this.tablePageNum = 1;
          this.queryList();
        }
      }
    },
    //关闭查询项
    colseTable: function (item, index) {
      if (this.selectedValue.length == 1) {
        this.$message({
          showClose: true,
          duration: 1000,
          message: "请至少保留一项查询！",
          type: "info",
        });
        return;
      }
      var indexs = -1;
      var arr = [];
      for (var i = 0; i < this.selectedValue.length; i++) {
        if (this.selectedValue[i][1] != item.itemId) {
          arr.push(this.selectedValue[i]);
        }
      }
      // this.selectedValue =  this.selectedValue;
      this.selectedValue = arr;
      this.searcyResultArray.splice(index, 1);
      //this.searcyResultArray = this.searcyResultArray;
      this.fnSearch();
    },

    // 调用用户信息
    /* getLoginUserInfo(){
        var _this = this;
        pajax.hasTokenGet(api.getLoginUserInfo, {}).then(function(result){

        })
    } */
  },
  filters: {
    ellipsis: function (value, len) {
      if (!value) return "";
      if (value.length > len) {
        return value.slice(0, len) + "...";
      }
      return value;
    },
  },
  components: {
    // 将组建加入组建库
    "my-header": "url:./components/header.vue",
    "my-footer": "url:./components/footer.vue",
  },
});
