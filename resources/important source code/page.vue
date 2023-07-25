<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>国家药品监督管理局数据查询</title>
    <link
      rel="shortcut icon"
      href="https://www.nmpa.gov.cn/wbppimages/favicon.ico"
    />
    <link rel="stylesheet" href="css/element-ui.css" />
    <link rel="stylesheet" href="css/display.css" />
    <link rel="stylesheet" href="css/index.css" />
    <link rel="stylesheet" href="css/introjs.min.css" />
    <style>
      *[v-cloak] {
        display: none;
      }
      table {
        border-collapse: collapse;
      }

      .menubtn-box {
        padding: 0 30px;
      }

      .menubtn-box.yaopin {
        padding-left: 0;
      }

      .menubtn-box.qita {
        padding-right: 0;
      }

      .search-result-menubtn {
        height: 56px;
        padding-left: 84px;
        margin-top: 38px;
      }

      .search-result-menubtn i {
        float: left;
        width: 84px;
        height: 56px;
        color: #fff;
        text-align: center;
        line-height: 56px;
        font-size: 30px;
        font-weight: bold;
        margin-left: -84px;
      }

      .search-result-menubtn span {
        border-width: 2px;
        border-style: solid;
        border-left: none;
        float: left;
        text-align: center;
        width: 100%;
        height: 52px;
        line-height: 52px;
        font-size: 24px;
      }

      .nodata {
        line-height: 30px;
        padding-top: 10px;
      }

      .yaopin .search-result-menubtn i {
        background: #72d8f7;
      }

      .yaopin .search-result-menubtn span {
        border-color: #5cd0f6;
        color: #5cd0f6;
      }

      .yaopin .search-result-menubtn.active span {
        background: #5cd0f6;
        color: #fff;
      }

      .yiliaoqixie .search-result-menubtn i {
        background: #43e0b4;
      }

      .yiliaoqixie .search-result-menubtn span {
        border-color: #2cd9a6;
        color: #2cd9a6;
      }

      .yiliaoqixie .search-result-menubtn.active span {
        background: #2cd9a6;
        color: #fff;
      }

      .huazhuangpin .search-result-menubtn i {
        background: #ffaa84;
      }

      .huazhuangpin .search-result-menubtn span {
        border-color: #ff9a6f;
        color: #ff9a6f;
      }

      .huazhuangpin .search-result-menubtn.active span {
        background: #ff9a6f;
        color: #fff;
      }

      .qita .search-result-menubtn i {
        background: #cabfe2;
      }

      .qita .search-result-menubtn span {
        border-color: #bfb2dc;
        color: #bfb2dc;
      }

      .qita .search-result-menubtn.active span {
        background: #bfb2dc;
        color: #fff;
      }

      /* .search-input{
            padding: 32px 270px 0;
        } */
      .search-input .el-input-group__append,
      .search-input .el-input-group__prepend {
        background: #0061c3;
        color: #fff;
        border: 1px solid #0061c3;
      }

      .search-input .el-icon-search {
        font-size: 20px;
      }

      .search-result-keywordbox {
        width: 1200px;
        height: auto;
      }

      .search-result-table {
        min-height: 300px;
      }

      .search-result-keywordbox h2.title,
      .search-result-table h2.title {
        font-weight: normal;
        color: #333;
        font-size: 14px;
        padding: 15px 0;
      }

      .search-result-keywordbox .list-box {
        padding-left: 10px;
        padding-bottom: 10px;
        background: #f9f9f9;
        border: 1px solid #dadada;
      }

      .search-result-eltag {
        margin: 6px 10px 0px 0;
        font-size: 14px;
        color: #000;
        cursor: pointer;
      }

      .search-result-eltag.active {
        background: #0061c3;
        color: #fff;
      }

      .search-result-eltag .nums {
        color: red;
      }

      .search-result-eltag.active .nums {
        color: #fff;
      }

      .table-box {
        width: 1200px;
        margin: 0 auto;
        border-top: 2px solid #0061c3;
      }

      .table-box i.el-shoucang {
        font-size: 26px;
      }

      .table-box i.el-icon-xin {
        color: #666;
      }

      .table-box i.el-icon-xin1 {
        color: #ffb000;
      }

      .table-box
        .el-table--striped
        .el-table__body
        tr.el-table__row--striped
        td {
        background: #f8fbff;
      }

      .table-box .el-table--mini,
      .el-table--small,
      .table-box .el-table__expand-icon {
        font-size: 14px;
      }

      .page {
        text-align: center;
        padding: 20px 0;
      }

      .footer-top-line {
        border-top: none;
        margin-top: 30px;
        padding-bottom: 20px;
      }

      .el-cascader__tags {
        flex-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* 小屏幕高级查询按钮默认隐藏 */
      .phone_advanced_search_btn {
        display: none;
      }

      /* xs < 768px */
      @media screen and (max-width: 768px) {
        /* 小屏幕，模块选择下拉选调整位置 */
        .mycascader {
          left: -35px !important;
        }

        /* 小屏幕高级查询按钮展示 */
        .phone_advanced_search_btn {
          display: block !important;
        }

        .menubtn-box {
          padding: 0 10px;
        }

        .menubtn-box.yaopin {
          padding-left: 10px;
        }

        .menubtn-box.qita {
          padding-right: 10px;
        }

        .search-result-menubtn {
          margin-top: 10px;
        }

        .search-result-menubtn {
          height: 46px;
          overflow: hidden;
          padding-left: 60px;
        }

        .search-result-menubtn i {
          font-size: 20px;
          height: 46px;
          line-height: 46px;
          width: 60px;
          margin-left: -60px;
        }

        .search-result-menubtn span {
          font-size: 18px;
          height: 46px;
          line-height: 46px;
          box-sizing: border-box;
        }

        .search-input {
          padding: 10px 10px 0;
        }

        .search-result-keywordbox {
          width: 100%;
          box-sizing: border-box;
        }

        .search-result-keywordbox h2.title,
        .search-result-table h2.title {
          font-size: 16px;
          padding: 10px 10px;
        }

        .search-result-keywordbox .list-box {
          margin: 0 10px;
          padding-left: 10px;
          padding-bottom: 6px;
        }

        .search-result-eltag {
          margin-top: 10px;
          margin-right: 10px;
        }

        .table-box {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
        }

        .table-box .el-table--mini,
        .el-table--small,
        .table-box .el-table__expand-icon {
          font-size: 12px;
        }

        .page {
          padding: 10px;
          box-sizing: border-box;
        }
      }

      .table-box i.el-icon-xin {
        color: #fff;
      }

      .search-result-keywordbox {
        margin-top: 10px;
      }

      .search-result-keywordbox .el-collapse-item__header {
        font-size: 14px;
        font-weight: normal;
      }

      .demo-drawer__footer {
        display: flex;
      }

      .demo-drawer__footer button {
        flex: 1;
      }

      .gaoji-drawer .el-drawer {
        overflow: auto;
      }

      .gaoji-box {
        padding: 20px;
      }

      .gaoji-bai {
        width: 100%;
      }

      .search-result-eltag.active:hover {
        background: #0061c3;
        color: #fff;
      }

      .el-button--mini,
      .el-button--small {
        font-size: 14px;
      }

      .search-input {
        position: relative;
        width: 100%;
        height: 85px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .sousuo {
        display: inline-block;
      }

      .putongsousuo {
        width: 450px;
      }

      .gaojisousuo {
        padding-left: 20px;
      }

      .fuhechaxun {
        position: absolute;
        right: 0;
      }

      .el-table td,
      .el-table th {
        padding: 7px 0;
      }

      .el-collapse-item__header {
        height: 40px;
        line-height: 40px;
      }

      .myselselect .el-select .el-input {
        width: 90px;
        border: 1px solid #dcdfe6;
      }

      .input-with-select .el-input-group__prepend {
        background-color: #fff;
      }

      .mycascader .el-cascader-panel .el-scrollbar:first-child .el-checkbox {
        display: none;
      }

      .mycascader .el-cascader-panel .el-checkbox {
        width: 100%;
        height: 100%;
        z-index: 10;
        position: absolute;
        top: 0px;
        /* margin-right: 10px; */
        /* right: 10px; */
      }

      .mycascader .el-cascader-node__label {
        margin-left: 10px;
      }

      /* 这个样式针对IE有用，不考虑IE的可以不用管*/
      .mycascader .el-cascader-panel .el-cascader-node__postfix {
        top: 10px;
      }

      .el-cascader__tags .el-tag > span {
        -webkit-box-flex: auto;
        flex: auto;
      }

      .mycascader .el-cascader-panel .el-checkbox {
        /* width: 100%;
            height: 100%;
            z-index: 10;
            position: absolute;*/
      }

      .mycascader .el-cascader-node__label {
        /*margin-left: 10px;*/
      }

      .mycascader .el-cascader-panel .el-cascader-node__postfix {
        /*top: 10px;*/
      }

      /* .in-active-path  .el-checkbox{
			display:none
		 } */
    </style>
    <style type="text/css">
      @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        /* IE10+ CSS styles go here */
        .sousuo {
          display: inline-block;
          margin-top: 5px;
        }

        .search-result-keywordbox .list-box {
          padding-left: 10px;
          padding-bottom: 6px;
          padding-top: 6px;
          background: #f9f9f9;
          border: 1px solid #dadada;
        }

        .search-result-eltag {
          margin: 6px 10px 0px 0;
          font-size: 14px;
          color: #000;
          cursor: pointer;
        }
      }
    </style>

    <meta
      content="J.5HzmUyFDlmLxQB5B903jATFC1WeWTI5Gl.02aYdPmjxNN_i_YuW302WBhlhuWzz3MASfCEpPXWlUnM0uJN_.TGVVxLe6F2"
      r="m"
    />
    <!--[if lt IE 9
      ]><script r="m">
        document.createElement("section");
      </script><!
    [endif]-->
    <script type="text/javascript" r="m">
      $_ts = window["$_ts"];
      if (!$_ts) $_ts = {};
      $_ts.nsd = 33489;
      $_ts.cd =
        "qxpqrpAlorLcxGGcqrLqDGlRDqEqcs3EqGqerfLoDpGFrAaErcqcqrLmHAERDrLrDsZcqGqFrSLlDsZcqrLcDGWRDrLqkq9lmpLbDsZcDGARHaVcqrLcDGWRHSLrkqLlDfLmDsZcqGqFqu0qDpGcqq9CcSLkDsZlDGl.caA3DGVRHaEcqrLkDGqRHaEqDG3FrS93DGAWxNLrJOqcrsE6bPiQUolejYlV558YCaHR7EYGsdzUxdIANUzMCNyR1VMzsaqlqGQlq.Vl32eyxsA640ROUsrYpvU0pKSOFCRO8_y.V0VGHYez4Ce7tDSnFD5CMUYLMPzjwBRBhDN6FCGBeoR7FmZ.xOh8J02NV2p.iBT_3bJvFC0n4ONvJDW2H2O0wbSLhb2SMd3BMvmXFnfz4Ce7tDSnFD5CMUYLM2LLEF2L10R0VOTKzop3w2WnHK.x10lZwlqbiQmzwKfXtCNCebZ7Fvw.Fcd0wbSLhb2SMd3BMvmXFT9BXkRmHkmbJ9s7MCmCV2YKidwLRVR4U9VfLmfXQKy.tD6BMCaLMoxLM4RzwKfXtCNCebZ7Fvw.Fm_CEsRUwTJhWFf7Wmyrs2wn4VS2RYw6wV1giYzjwCzLhdpCMDGXFUmBePeXQKy.tD6BMCaLMoxLMZQBEOJxw6Y6uvxRWTweQlI13VZewlfGFJ7fi2e7QbfBzbTTFDg.FvMCMnSjwCzLhdpCMDGXFUmBe2g7xONYIKIH1uYzFOmHKeTY8KrLM9exa9APH22NQKdChCySMb7LM8eBMcf7QbfBzbTTFDg.FvMCMT0LEkyvUWNU32rtpowzgkRSHDTBwvUS3KlbimSjwBRBhDN6FCGBeoR7FcyNQKdChCySMb7LM8eBMm9XxVwmelNO3YftA9Mp8Om2psJesjJU1oVGHYez4Ce7tDSnFD5CMUYLMPzjwBRBhDN6FCGBeoR7FmZ.x9k5AOmYsKmDYJeuRl97Uvxpdvz0VCW2H2O0wbSLhb2SMd3BMvmXFnfz4Ce7tDSnFD5CMUYLM2LLEw2Np6Waw92K.l3CWYf83vv8KYJVhl3biQmzwKfXtCNCebZ7Fvw.Fcd0wbSLhb2SMd3BMvmXFT9BXl7yR2plAKO.JTAZslNEMzJLpOVTVbVfLmfXQKy.tD6BMCaLMoxLM4RzwKfXtCNCebZ7Fvw.Fm_CEVfvQCeWw82YVDNhwCY.dKfkHDzhHKtgiYzjwCzLhdpCMDGXFUmBePeXQKy.tD6BMCaLMoxLMZQBE90_JKNY6bNs3OwdM0OqYmweMP2DW87fi2e7QbfBzbTTFDg.FvMCMnSjwCzLhdpCMDGXFUmBe2g7x2xzsbt7pmmYwvm2J7rXYCm_JCN.ebEPH22NQKdChCySMb7LM8eBMcf7QbfBzbTTFDg.FvMCMT0LEmRhRi2WMspWtUg_0o2IQYrlt2nXW6lbimSjwBRBhDN6FCGBeoR7FcyNQKdChCySMb7LM8eBMm9XxYRTClrEHkx.JkBLFbmJY9z2R7NDFlVGHYez4Ce7tDSnFD5CMUYLMPzjwBRBhDN6FCGBeoR7FmZ.x2kx1s2U30TXhFxaiVSOsk0aTsYmJ0W2H2O0wbSLhb2SMd3BMvmXFnfz4Ce7tDSnFD5CMUYLM2LLEQyMMmW0UUSPZK0XF6zBWuhKUlYEKb3biQmzwKfXtCNCebZ7Fvw.Fcd0wbSLhb2SMd3BMvmXFT9BXDmmVKT2MUMZwo3CFmxn3QziYbwnVUVfLmfXQKy.tD6BMCaLMoxLM4RzwKfXtCNCebZ7Fvw.Fm_CEKV01UwPidA43CzTWKwMCuxOp6N919tgiYzjwCzLhdpCMDGXFUmBePeXQKy.tD6BMCaLMoxLMZQBEbmVAbe0.9SEU9J9AmugsTripuwvWw7fi2e7QbfBzbTTFDg.FvMCMnSjwCzLhdpCMDGXFUmBe2g7xbpTs2hpwuJe1veQ157zwlz4tsYUu9APH22NQKdChCySMb7LM8eBMcf7QbfBzbTTFDg.FvMCMT0LEDrZsjxAJmy7ATzLZvrawcSasl4WJVQbimSjwBRBhDN6FCGBeoR7FcyNQKdChCySMb7LM8eBMm9XxKTrCsVCR0eKsVvLMuQZMkYLsXqnAKVGHYez4Ce7tDSnFD5CMUYLMPzjwBRBhDN6FCGBeoR7FmZ.xbbP8CYSMUxfpt7aJmx7VDeqa2pVt9W2H2OrKcE.wKxbhHzuQczOwC0746r2w9mPFvIdQ1eLFCpfM82bVURrFDrbzKw2R6r5woIt3vx2M6Abh5ySwKmItTZfzUp2RPTbwoiT3vrzhUx6RXfqRKNC3v37ebNO3KS031ueRvpEFCpfM82bsDTSQn3B4vmT3YeFtD6BMCaLMoxLM4RzwKfXtCNCebZ7Fvw.Fm_CEKzzFVmGQe2bYC2lVVNBTCG0wsNp3UtgiYzjwCzLhdpCMDGXFUmBePeXQKy.tD6BMCaLMoxLMZQBEbfwIVePjbfOw0zHI9.3W9fTYkwkwi7fi2e7QbfBzbTTFDg.FvMCMnSjwCzLhdpCMDGXFUmBe2g7xbTCMYoHKvRGRYREQiejRK21pVmqZbEPH22NQKdChCySMb7LM8eBMcf7QbfBzbTTFDg.FvMCMT0LEorpRzpm3bg73KY..TxysDza1O.pAKlbimSjwBRBhDN6FCGBeoR7FcyNQKdChCySMb7LM8eBMm9XxUyFLuRIF6JcMOhZi0easKYchQ2y39VGHYez4Ce7tDSnFD5CMUYLMPzjwBRBhDN6FCGBeoR7Fme_tD6BMCSRcq3t3HRGWvwhMKEg.YxcsmNWRYbfR9SYKvpo8j0gsOS.ACfC0D04IvzpwsUZWDldsDmDAW2jMvQa1oT0LKYawYJT301zsuR0MsSv1iT6ATrlI0rHuYQ43KJWsboKpO2bQCfPhFG_JDwfHuQzZoq4JswKwKIci2WuMlJrhFG_JDwfHuQzZoq4VCl6VVsQYDfX89rhhFG_JDwfHuQzZoq41TxhWTkK3KQ0WTyZhIrai6ShWVyijDx2w02VQsPN39TeVbYC3ITBwT0yJDy2dvzKA0YpUlUTiDQnF9N5Qix.FmwlR1LSLuwORuL0tbvNim2rwVfVFHJjJuJbUnLSLuwORuL0tbvNicgCiuJv3tEahbySraAkbuWqrsWomCBXw6r6ikZTJt0_JslSWug6.OqqqOq5WDkyiaqoJkqaqyqnWkaSWkAajkLCrq3uJkj7qSqUv84QK29EZymxTyXYeFaZrrh6zFGi2oE.Pq18qxLoqGWDrn1zaHTqA1nDSfhl.YX8EAg0hk3aw1uGADDBECl4e1cmAGiAWOAaiuVSJF04WqAkJGAxjuVgHsV0Wu1BWAqlqGQlqyLcWqAkWq3u.U97RKJ9tDh6Q1S2QbaL3X2XhDY0MPff5CG7RbJutDouM1SbM6QL38qShDQXRDYfzbrBF1y9woiC3oJ6hbp6wMRv3UqX3CfBzbwBRnyOFCkPhCp.wPzGMB0BRK2XtCm74Pe2IDQ.3bd4hCRL31zPM5aBRbz7tCx7eoQ73bTutDs531SOFbGLRHJ2hDJgtCSB_PeLwoE.MoIyhC2vM1zzMIaBFKN.tCTz_1eNwDW.MUkThCN2QczX3XSPhDyn3bWBZoJvtDf0tDvNMDgLMbybhdR7RnfBWCVBeCxatDeX3cd6Fb0LMCSnhdw7RcfBFoEBe6WutDe6Wcd6QClLM6wfRhRXQDWXFvpuzbyuM1yLRbbCMDJZhbfORhR7MD3XFDfbzbS03PyLQbtCQCm6hvwv3XLBQDr9t6p9eneaMKl.wDduh6rLF6pah5NzRnfnwC9B_vJutox6QcdjQ6pZhvw6R4Ru81fnIbQB_CNbtoJuIcd.3DeuWczC3.RS3K9XwKYSzvm23nyT3UcCQK0LQDNn3MRSwDEXwUrX_PeuRbg.wCUPh6J.hvpnRhRawCVXwoJ2zvrywnyuRUDCwCm5hvJO8MR6FKEXQCT2dce0F6rT3K6Xh6paRcza85gBwvwbt6xa_1eCw6V.QvB5h6w2wczuRBfuhoJBRPf0e6V7QCTf3PdzMDRPWczuQ59BwCmGFPf45Dg7IDy0toBCQoGL8bNLh5xuM1f_wDGBgv97IPyeMUiFqaqqU1JXVNLoUnrw1GAoS1wfYqEkKnIgpGqDWu3lqFZTqqVuraVn";
      if ($_ts.lcd) $_ts.lcd();
    </script>
    <script
      type="text/javascript"
      charset="utf-8"
      src="/fpqQrgG7L6po/15QqdX9S7nDE.294cc83.js"
      r="m"
    ></script>
  </head>

  <body class="root">
    <div id="home" v-cloak>
      <my-header></my-header>
      <div class="header-bottom-line"></div>
      <div class="container">
        <!-- <el-row>
				<el-col :span="6" :xs="12" :sm="6" v-for="(item, index) in bannerData" :key="index" :class="item.className">
					<div class="search-result-menubtn menubtn-box clearfix" :class="{'active': index == searchMenuIndex}" @click="fnSearchMenu(index, item)">
						<i :class="item.icon"></i>
						<span>{{item.text}}</span>
					</div>
				</el-col>
			</el-row> -->
        <div>
          <div class="search-input myselselect">
            <el-cascader
              data-step="3"
              data-intro="支持多个数据库复合查询，至多3个"
              data-position="bottom"
              :before-filter="fnaaa"
              popper-class="mycascader"
              :before-filter="fnFilter"
              style="line-height: 40px"
              v-model="selectedValue"
              :show-all-levels="false"
              :options="dataItems"
              style="width: 250px"
              size="medium"
              :collapse-tags="true"
              :multiple-limit="3"
              :props="{ multiple: true }"
              :only-last="true"
              ref="myCascader"
              :expandTrigger="expandTrigger"
              @change="setCanSelect"
            >
              <template slot-scope="scope">
                <span>{{ scope.data.label }}</span>
                <!-- <span v-if="!scope.node.isLeaf"> ({{ scope.data.children.length }}) </span> -->
              </template>
            </el-cascader>
            <div class="sousuo putongsousuo">
              <el-input
                :placeholder="gjFeildTipTxt"
                class="input-with-select"
                v-model="searchKeyword"
                @keyup.enter.native="fnSearch"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="fnSearch"
                ></el-button>
              </el-input>
            </div>
            <!-- 手机访问高级查询按钮 -->
            <div style="width: 120px" class="phone_advanced_search_btn">
              <el-link
                type="primary"
                @click="firstSearch"
                icon="el-icon-s-operation"
                >高级搜索</el-link
              >
            </div>
            <!-- PC访问高级查询按钮 -->
            <div
              class="sousuo gaojisousuo pc-max"
              data-step="4"
              data-intro="点击进行高级搜索"
              data-position="bottom"
            >
              <el-link
                type="primary"
                @click="firstSearch"
                icon="el-icon-s-operation"
                >高级搜索</el-link
              >
            </div>
            <!-- <div class="sousuo fuhechaxun">
					<el-link type="info" icon="el-icon-right"  @click.native="expandTree">复合查询</el-link>
				</div> -->
          </div>

          <!-- <div class="search-result-keywordbox">
				<el-collapse v-model="activeNames">
					<el-collapse-item :title="'搜索类型：' + searchTypeText" name="1">
						<template slot="title">
					      <i class="header-icon el-icon-s-operation"></i>搜索类型：{{searchTypeText}}
					    </template>
						<div class="list-box">
							<el-tag :class="{'search-result-eltag': true, 'active': item.activeDef}" v-for="(item, index) in searchTypeArray" @click="selectKeyWord(item, index)" :key="index">{{item.itemName}}</el-tag>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div> -->

          <div class="search-result-keywordbox">
            <!--  <h2 class="title"><i class="el-icon-s-grid"></i>搜索结果：</h2> -->
            <div
              class="list-box"
              v-if="searcyResultArray && searcyResultArray.length"
            >
              <!-- <el-button size="small" :class="{'search-result-eltag': true, 'active': item.active, 'active': index == defaultIndex}" v-for="(item, index) in searcyResultArray" :key="index" @click="fnTable(item, index)" :disabled="item.nums == 0">{{item.name}}（<span class="nums">{{item.nums}}</span>）</el-button> -->
              <i class="el-icon-s-grid"></i>搜索结果：
              <el-popover
                data-step="1"
                data-intro="所选数据库名称"
                data-position="top"
                placement="right"
                :title="'信息提示：' + item.name"
                width="500"
                :open-delay="100000"
                :close-delay="300"
                v-for="(item, index) in searcyResultArray"
                :key="index"
                trigger="hover"
              >
                <el-divider></el-divider>
                <div v-html="item.itemDesc" v-if="item.itemDesc != ''"></div>
                <div v-if="item.itemDesc == null">暂无备注!</div>
                <!-- <el-button slot="reference">hover 激活</el-button> -->
                <el-tag
                  v-if="index == defaultIndex"
                  slot="reference"
                  :key="index"
                  disable-transitions
                  closable
                  class="el-button el-button--default el-button--mini search-result-eltag active"
                  @close="colseTable(item, index)"
                  @click="fnTable(item, index)"
                  >{{ item.name }}
                  <!-- （<span class="nums">{{item.nums}}</span>条） -->
                </el-tag>
                <el-tag
                  v-else
                  slot="reference"
                  :key="index"
                  disable-transitions
                  closable
                  class="el-button el-button--default el-button--mini search-result-eltag"
                  @close="colseTable(item, index)"
                  @click="fnTable(item, index)"
                  >{{ item.name }}
                  <!-- （<span class="nums">{{item.nums}}</span>条） -->
                </el-tag>
              </el-popover>

              <div class="nodata" v-if="searcyResultArray.length == 0">
                <i class="el-icon-s-grid"></i>搜索结果：暂无数据...
              </div>
            </div>
          </div>
        </div>
        <div
          class="search-result-table"
          style="
            background: url(./images/bg_home.png) 0% 0% / cover
              rgb(220 231 255 / 15%);
            background-size: 400px 140px;
            padding-top: 10px;
          "
        >
          <!-- <h2 class="title">{{tableTitle}}</h2>-->
          <div
            class="table-box"
            style="width: 100%"
            data-step="2"
            data-intro="查询结果列表，可点击右侧按钮查看详情"
            data-position="top"
          >
            <el-table
              v-loading="tableLoading"
              element-loading-text="数据正在加载中..."
              element-loading-spinner="el-icon-loading"
              :data="searchTableData"
              border
              stripe
              min-block-size="400px"
              @sort-change="fnSortTable"
              width="100%"
              :header-cell-style="{ background: '#f5f5f5', color: '#000' }"
            >
              <template slot="empty">
                <el-popover
                  v-if="loginFlag == 'true'"
                  placement="bottom"
                  width="600"
                  :open-delay="500"
                  trigger="hover"
                >
                  <div v-if="tableItemDesc != ''" v-html="tableItemDesc"></div>
                  <div v-if="tableItemDesc == null">暂无备注!</div>
                  <el-link type="primary" slot="reference"
                    ><i class="el-icon-warning-outline el-icon-right"></i
                    >{{ tableEmptytEXT }}</el-link
                  >
                </el-popover>
                <div v-else>{{ tableEmptytEXT }}</div>
              </template>
              <!-- <el-table-column  label="序号"  width="50">
								<template scope="scope"><span>{{scope.$index+(tablePageNum - 1) * tablePageSize + 1}} </span></template>
							</el-table-column> -->
              <el-table-column
                v-if="tableHeader.length != 0"
                label="序号"
                width="60"
                align="center"
                :index="indexMethod"
                type="index"
              >
              </el-table-column>

              <el-table-column
                v-if="tableHeader.length <= 4 && item.desc != 'NMPA_DK'"
                v-for="(item, index) in tableHeader"
                :key="index"
                :label="item.desc"
                :prop="item.alias"
                :sortable="item.is_order == 'Y' ? true : false"
                align="center"
              >
                <template slot-scope="scope">
                  <el-popover
                    v-if="
                      scope.row[item.alias] != null &&
                      scope.row[item.alias].length > 20
                    "
                    trigger="hover"
                    placement="top"
                  >
                    <p>{{ scope.row[item.alias] }}</p>
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row[item.alias] | ellipsis("20") }}
                    </div>
                  </el-popover>
                  <p v-else>{{ scope.row[item.alias] }}</p>
                </template>
              </el-table-column>

              <el-table-column
                v-if="tableHeader.length == 5 && item.desc != 'NMPA_DK'"
                v-for="(item, index) in tableHeader"
                :key="index"
                :label="item.desc"
                :prop="item.alias"
                :sortable="item.is_order == 'Y' ? true : false"
                align="center"
              >
                <template slot-scope="scope">
                  <el-popover
                    v-if="
                      scope.row[item.alias] != null &&
                      scope.row[item.alias].length > 15
                    "
                    trigger="hover"
                    placement="top"
                  >
                    <p>{{ scope.row[item.alias] }}</p>
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row[item.alias] | ellipsis("15") }}
                    </div>
                  </el-popover>
                  <p v-else>{{ scope.row[item.alias] }}</p>
                </template>
              </el-table-column>

              <el-table-column
                v-if="tableHeader.length > 5 && item.desc != 'NMPA_DK'"
                v-for="(item, index) in tableHeader"
                :key="index"
                :label="item.desc"
                :prop="item.alias"
                :sortable="item.is_order == 'Y' ? true : false"
                align="center"
              >
                <template slot-scope="scope">
                  <p>{{ scope.row[item.alias] }}</p>
                </template>
              </el-table-column>

              <el-table-column
                v-if="tableHeader && tableHeader.length"
                label="详情"
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="goInfo(scope.row)"
                    type="primary"
                    style="padding: 4px 10px"
                    size="mini"
                    >详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div
          class="page pc-max"
          style="
            background: url(./images/bg_home.png) 0% 0% / cover
              rgb(220 231 255 / 15%);
            background-size: 400px 140px;
          "
        >
          <div
            style="
              display: flex !important;
              justify-content: center;
              align-content: space-between;
              align-items: center;
            "
          >
            <span>
              <a
                style="text-decoration: none"
                href="search-help.html#fysm"
                target="_blank"
                >说明</a
              >
            </span>
            <el-pagination
              background
              :current-page="tablePageNum"
              @current-change="fnCurrentChange"
              @size-change="fnSizeChange"
              :page-sizes="[10, 20]"
              layout="prev, pager, next, total, sizes, jumper"
              :page-size="tablePageSize"
              :total="tableTotal"
            >
            </el-pagination>
          </div>
        </div>

        <div
          class="page phone-sm"
          style="
            background: url(./images/bg_home.png) 0% 0% / cover
              rgb(220 231 255 / 15%);
            background-size: 400px 140px;
          "
        >
          <div
            style="
              display: flex !important;
              justify-content: center;
              align-content: space-between;
              align-items: center;
            "
          >
            <span>
              <a
                style="text-decoration: none"
                href="search-help.html#fysm"
                target="_blank"
                >说明</a
              >
            </span>
            <el-pagination
              background
              :current-page="tablePageNum"
              @current-change="fnCurrentChange"
              @size-change="fnSizeChange"
              :page-sizes="[10, 20]"
              layout="prev, next, total"
              :page-size="tablePageSize"
              :total="tableTotal"
            >
            </el-pagination>
          </div>
        </div>
      </div>

      <!-- 高级搜索弹窗 -->
      <el-drawer
        :visible.sync="gaojidrawerShow"
        direction="ltr"
        :size="advancedSearchSrawer"
        class="gaoji-drawer"
        custom-class="my-drawer"
        title="高级搜索"
      >
        <div class="gaoji-box">
          <el-form>
            <el-form-item label="">
              <el-select
                v-model="gaojiIndex"
                placeholder="请选择"
                class="gaoji-bai"
                @change="fnGaoji"
              >
                <el-option
                  v-for="(item, index) in gaojiOptions"
                  :key="index"
                  :label="item.paraName"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="">
              <el-select
                v-model="gaojiChildIndex"
                placeholder="请选择"
                class="gaoji-bai"
                @change="fnGaojiChild"
              >
                <el-option
                  v-for="(item, index) in gaojiChildOptions"
                  :key="index"
                  :label="item.itemName"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label=""
              label-width=""
              label-position="left"
              v-for="(item, index) in queryItemFeild"
              :key="index"
              style="margin-bottom: 0px"
            >
              <el-input
                v-if="item.query_cond_type == 'text'"
                v-model="item[item.detail_feild_alias]"
                style="margin-bottom: 20px"
                :placeholder="'请输入' + item.detail_feild_name"
                clearable
              >
              </el-input>

              <el-select
                v-if="item.query_cond_type == 'select'"
                v-model="item[item.detail_feild_alias]"
                style="margin-bottom: 20px"
                class="gaoji-bai"
              >
                <el-option
                  v-for="(item, index) in item.query_options"
                  :key="index"
                  :label="item.value"
                  :value="item.key"
                >
                </el-option>
              </el-select>

              <el-form-item
                v-if="item.query_cond_type == 'radio'"
                style="margin-bottom: 20px"
                :label="item.detail_feild_name + '：'"
              >
                <el-radio-group v-model="item[item.detail_feild_alias]">
                  <el-radio
                    v-for="(item, index) in item.query_options"
                    :label="item.value"
                    :key="index"
                  >
                    {{ item.value }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                v-if="item.query_cond_type == 'checkbox'"
                style="margin-bottom: 20px"
                :label="item.detail_feild_name + '：'"
              >
                <el-checkbox-group v-model="item.checkArray">
                  <el-checkbox
                    v-for="(childitem, index) in item.query_options"
                    :key="index"
                    :label="childitem.value"
                    :name="childitem.checkArray"
                  >
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form-item>
          </el-form>

          <div class="demo-drawer__footer">
            <el-button @click="gaojiCancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="fnGaojiTijiao"
              :loading="gaojitijiaoLoading"
            >
              {{ gaojitijiaoLoading ? "提交中..." : "确 定" }}
            </el-button>
          </div>
        </div>
      </el-drawer>
      <!-- 弹层子表 -->
      <el-dialog
        title="基本信息"
        :visible.sync="detailShow"
        top="5vh"
        :width="eldialogWidth"
      >
        <el-card class="box-card" shadow="hover" id="printTable">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-document"></i>基本信息</span>
          </div>
          <div class="text item">
            <iframe
              id="info_mobsf"
              v-bind="{ src: baseInfoPageUrl }"
              width="100%"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>
        </el-card>
      </el-dialog>
      <div class="header-bottom-line footer-top-line"></div>
      <my-footer></my-footer>
    </div>

    <script src="js/httpVueLoader.js"></script>
    <script src="js/polyfill.min.js"></script>
    <script src="js/vue-2.6.0.js"></script>
    <script src="js/element-ui.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <script src="js/intro.min.js"></script>
    <script src="js/base64.js"></script>
    <script src="js/md5.js"></script>
    <script src="js/axios.min.js"></script>

    <script src="js/ajax.js"></script>
    <script src="js/api.js"></script>
    <script src="js/util.js"></script>

    <script src="js/print.min.js"></script>

    <script src="js/index/search-result.js?version=v4"></script>
  </body>
</html>
