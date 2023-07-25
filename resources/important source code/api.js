var _0xdb = [
  "3.",
  "56.117.57.117.58.117.61.117.59.",
  "117.",
  "57.",
  "117.",
  "57.",
  "117.",
  "57.",
  "117.",
  "57.",
  "117.",
  "57.",
  "117.",
  "97.125.125.121.122.51.38.38.126.126.126.39.103.100.121.104.39.110.102.127.39.106.103.",
  "57.",
  "117.",
  "38.109.104.125.104.122.108.104.123.106.97.38.109.104.125.104.38.",
  "57.",
  "117.",
  "38.109.104.125.104.122.108.104.123.106.97.38.",
  "57.",
  "117.",
  "38.104.125.125.104.106.97.38.",
  "57.117.56.",
  "117.",
  "101.102.106.104.125.96.102.103.",
  "97.123.108.111.",
  "122.124.107.122.125.123.96.103.110.",
  "96.103.109.108.113.70.111.",
  "38.109.104.125.104.122.108.104.123.106.97.38.",
  "57.117.59.117.56.",
  "117.",
  "102.121.108.103.",
  "104.107.102.124.125.51.107.101.104.103.98.",
  "57.",
  "117.",
  "101.102.106.104.125.96.102.103.",
  "101.102.106.104.125.96.102.103.",
  "97.123.108.111.",
];
function _0xf8e(str, dy_key) {
  dy_key = 9;
  var i,
    k,
    str2 = "";
  k = str.split(".");
  for (i = 0; i < k.length - 1; i++) {
    str2 += String.fromCharCode(k[i] ^ dy_key);
  }
  return str2;
}
// function _0x4e6d() {
//   if (arguments.callee.toString().indexOf(_0xf8e(_0xdb[0])) != -1) {
//     arguments.callee();
//   }
// }
// debugger;
// {
//   _0x4e6d();
// }
// debugger;
function _0x1dc(vm_opcode) {
  //   function _0x4e6d() {
  //     if (arguments.callee.toString().indexOf(_0xf8e(_0xdb[0])) != -1) {
  //       arguments.callee();
  //     }
  //   }
  //   {
  //     _0x4e6d();
  //   }
  var _array = _0xf8e(_0xdb[1]).split(_0xf8e(_0xdb[2])),
    _index = 0;
  while (!![]) {
    switch (+_array[_index++]) {
      case 0:
        var stack = [];
        continue;
      case 1:
        var op = {
          push: 32,
          add: 33,
          sub: 34,
          mul: 35,
          div: 36,
          pop: 37,
          xor: 38,
        };
        continue;
      case 2:
        while (
          eval(
            String.fromCharCode(
              105,
              112,
              32,
              60,
              32,
              118,
              109,
              95,
              111,
              112,
              99,
              111,
              100,
              101,
              46,
              108,
              101,
              110,
              103,
              116,
              104
            )
          )
        ) {
          eval(String.fromCharCode(105, 112, 43, 43));
          switch (vm_opcode[ip]) {
            case op.push: {
              eval(String.fromCharCode(105, 112, 43, 43));
              stack.push(vm_opcode[ip]);
              eval(String.fromCharCode(115, 112, 43, 43));
              break;
            }
            case op.add: {
              var op_1 =
                stack[eval(String.fromCharCode(115, 112, 32, 45, 32, 49))];
              var op_2 = stack[sp];
              var value = (function (s, h) {
                var _array2 = _0xf8e(_0xdb[3]).split(_0xf8e(_0xdb[4])),
                  _index2 = 0;
                while (!![]) {
                  switch (+_array2[_index2++]) {
                    case 0:
                      return eval(String.fromCharCode(115, 32, 43, 32, 104));
                      continue;
                  }
                  break;
                }
              })(op_1, op_2);
              stack.push(value);
              eval(String.fromCharCode(115, 112, 43, 43));
              break;
            }
            case op.sub: {
              var op_1 =
                stack[eval(String.fromCharCode(115, 112, 32, 45, 32, 49))];
              var op_2 = stack[sp];
              var value = (function (s, h) {
                var _array3 = _0xf8e(_0xdb[5]).split(_0xf8e(_0xdb[6])),
                  _index3 = 0;
                while (!![]) {
                  switch (+_array3[_index3++]) {
                    case 0:
                      return eval(String.fromCharCode(115, 32, 45, 32, 104));
                      continue;
                  }
                  break;
                }
              })(op_1, op_2);
              stack.push(value);
              eval(String.fromCharCode(115, 112, 43, 43));
              break;
            }
            case op.mul: {
              var op_1 =
                stack[eval(String.fromCharCode(115, 112, 32, 45, 32, 49))];
              var op_2 = stack[sp];
              var value = (function (s, h) {
                var _array4 = _0xf8e(_0xdb[7]).split(_0xf8e(_0xdb[8])),
                  _index4 = 0;
                while (!![]) {
                  switch (+_array4[_index4++]) {
                    case 0:
                      return eval(String.fromCharCode(115, 32, 42, 32, 104));
                      continue;
                  }
                  break;
                }
              })(op_1, op_2);
              stack.push(value);
              eval(String.fromCharCode(115, 112, 43, 43));
              break;
            }
            case op.div: {
              var op_1 =
                stack[eval(String.fromCharCode(115, 112, 32, 45, 32, 49))];
              var op_2 = stack[sp];
              var value = (function (s, h) {
                var _array5 = _0xf8e(_0xdb[9]).split(_0xf8e(_0xdb[10])),
                  _index5 = 0;
                while (!![]) {
                  switch (+_array5[_index5++]) {
                    case 0:
                      return eval(String.fromCharCode(115, 32, 47, 32, 104));
                      continue;
                  }
                  break;
                }
              })(op_1, op_2);
              stack.push(value);
              eval(String.fromCharCode(115, 112, 43, 43));
              break;
            }
            case op.xor: {
              var op_1 =
                stack[eval(String.fromCharCode(115, 112, 32, 45, 32, 49))];
              var op_2 = stack[sp];
              var value = (function (s, h) {
                var _array6 = _0xf8e(_0xdb[11]).split(_0xf8e(_0xdb[12])),
                  _index6 = 0;
                while (!![]) {
                  switch (+_array6[_index6++]) {
                    case 0:
                      return eval(String.fromCharCode(115, 32, 94, 32, 104));
                      continue;
                  }
                  break;
                }
              })(op_1, op_2);
              stack.push(value);
              eval(String.fromCharCode(115, 112, 43, 43));
              break;
            }
            case op.pop: {
              return stack[sp];
            }
          }
        }
        continue;
      case 3:
        var ip = -1;
        continue;
      case 4:
        var sp = -1;
        continue;
    }
    break;
  }
}
var topAddr = _0xf8e(_0xdb[13]);
var itemApiUrl = (function (s, h) {
  var _array = _0xf8e(_0xdb[14]).split(_0xf8e(_0xdb[15])),
    _index = 0;
  while (!![]) {
    switch (+_array[_index++]) {
      case 0:
        return eval(String.fromCharCode(115, 32, 43, 32, 104));
        continue;
    }
    break;
  }
})(topAddr, _0xf8e(_0xdb[16]));
var itemFileUrl = (function (s, h) {
  var _array2 = _0xf8e(_0xdb[17]).split(_0xf8e(_0xdb[18])),
    _index2 = 0;
  while (!![]) {
    switch (+_array2[_index2++]) {
      case 0:
        return eval(String.fromCharCode(115, 32, 43, 32, 104));
        continue;
    }
    break;
  }
})(topAddr, _0xf8e(_0xdb[19]));
var staticUrl = (function (s, h) {
  var _array3 = _0xf8e(_0xdb[20]).split(_0xf8e(_0xdb[21])),
    _index3 = 0;
  while (!![]) {
    switch (+_array3[_index3++]) {
      case 0:
        return eval(String.fromCharCode(115, 32, 43, 32, 104));
        continue;
    }
    break;
  }
})(topAddr, _0xf8e(_0xdb[22]));
var hzp = {
  gc: {
    baMainId:
      "\u0066\u0066\u0038\u0030\u0038\u0030\u0038\u0031\u0037\u0062\u0061\u0035\u0037\u0037\u0034\u0065\u0030\u0031\u0037\u0062\u0065\u0037\u0066\u0066\u0063\u0031\u0034\u0032\u0030\u0061\u0034\u0030",
    attchId:
      "\u0038\u0061\u0038\u0038\u0039\u0038\u0038\u0065\u0037\u0039\u0035\u0066\u0061\u0065\u0035\u0063\u0030\u0031\u0037\u0039\u0036\u0034\u0039\u0038\u0039\u0038\u0066\u0061\u0030\u0030\u0033\u0033",
    baCheckId:
      "\u0066\u0066\u0038\u0030\u0038\u0030\u0038\u0031\u0037\u0062\u0061\u0035\u0037\u0037\u0034\u0065\u0030\u0031\u0037\u0062\u0065\u0038\u0030\u0064\u0036\u0039\u0031\u0030\u0030\u0063\u0034\u0061",
    bazxStandardId:
      "\u0066\u0066\u0038\u0030\u0038\u0030\u0038\u0031\u0037\u0062\u0061\u0035\u0037\u0037\u0034\u0065\u0030\u0031\u0037\u0062\u0065\u0038\u0030\u0036\u0031\u0066\u0065\u0034\u0030\u0061\u0063\u0066",
    bazxStandard_funId:
      "\u0066\u0066\u0038\u0030\u0038\u0030\u0038\u0031\u0037\u0062\u0061\u0035\u0037\u0037\u0034\u0065\u0030\u0031\u0037\u0062\u0065\u0038\u0030\u0039\u0038\u0031\u0039\u0030\u0030\u0062\u0035\u0032",
    bazxStandard_pfId:
      "\u0034\u0030\u0032\u0038\u0030\u0039\u0034\u0037\u0037\u0062\u0066\u0036\u0037\u0065\u0062\u0032\u0030\u0031\u0037\u0062\u0066\u0036\u0038\u0030\u0062\u0035\u0031\u0035\u0030\u0030\u0030\u0061",
    bazxStandard_pf_ylId:
      "\u0066\u0066\u0038\u0030\u0038\u0030\u0038\u0031\u0037\u0062\u0061\u0035\u0037\u0037\u0034\u0065\u0030\u0031\u0037\u0062\u0065\u0038\u0030\u0061\u0030\u0065\u0034\u0063\u0030\u0062\u0037\u0030",
    bazxStandard_wswlhId:
      "\u0066\u0066\u0038\u0030\u0038\u0030\u0038\u0031\u0037\u0062\u0061\u0035\u0037\u0037\u0034\u0065\u0030\u0031\u0037\u0062\u0065\u0038\u0030\u0061\u0037\u0065\u0061\u0032\u0030\u0062\u0038\u0064",
    bazxStandard_ggzbId:
      "\u0066\u0066\u0038\u0030\u0038\u0030\u0038\u0031\u0037\u0062\u0061\u0035\u0037\u0037\u0034\u0065\u0030\u0031\u0037\u0062\u0065\u0038\u0030\u0039\u0030\u0064\u0037\u0061\u0030\u0062\u0033\u0039",
    baHistoryId:
      "\u0066\u0066\u0038\u0030\u0038\u0030\u0038\u0031\u0037\u0062\u0061\u0035\u0037\u0037\u0034\u0065\u0030\u0031\u0037\u0062\u0065\u0038\u0030\u0064\u0030\u0062\u0035\u0063\u0030\u0063\u0032\u0065",
    baTagId: "",
  },
  jk: {
    baMainId:
      "\u0066\u0066\u0038\u0030\u0038\u0030\u0038\u0031\u0037\u0062\u0061\u0035\u0037\u0037\u0034\u0065\u0030\u0031\u0037\u0062\u0065\u0038\u0030\u0030\u0062\u0034\u0037\u0032\u0030\u0061\u0036\u0063",
  },
};
var xxbz = {
  sjj: {
    sjjMainId:
      "\u0032\u0063\u0039\u0062\u0061\u0033\u0038\u0034\u0037\u0035\u0039\u0063\u0039\u0035\u0037\u0037\u0030\u0031\u0037\u0035\u0039\u0063\u0065\u0063\u0065\u0037\u0039\u0039\u0030\u0035\u0030\u0033",
    sjzjId:
      "\u0034\u0030\u0032\u0038\u0033\u0066\u0038\u0031\u0037\u0036\u0038\u0039\u0038\u0061\u0063\u0034\u0030\u0031\u0037\u0036\u0038\u0039\u0064\u0036\u0061\u0038\u0036\u0033\u0030\u0030\u0032\u0062",
    sjj_sjxId:
      "\u0034\u0030\u0032\u0038\u0033\u0066\u0038\u0031\u0037\u0036\u0038\u0039\u0038\u0061\u0063\u0034\u0030\u0031\u0037\u0036\u0038\u0039\u0064\u0037\u0030\u0066\u0061\u0032\u0030\u0030\u0033\u0039",
  },
  bzwd: "\u0032\u0063\u0039\u0062\u0061\u0033\u0038\u0034\u0037\u0035\u0039\u0063\u0039\u0035\u0037\u0037\u0030\u0031\u0037\u0035\u0039\u0063\u0065\u0061\u0063\u0039\u0062\u0066\u0030\u0034\u0064\u0031",
  sjy: {
    mainId:
      "\u0032\u0063\u0039\u0062\u0061\u0033\u0038\u0034\u0037\u0035\u0039\u0063\u0039\u0035\u0037\u0037\u0030\u0031\u0037\u0035\u0039\u0063\u0065\u0062\u0065\u0038\u0065\u0032\u0030\u0034\u0065\u0061",
    zydmId:
      "\u0032\u0063\u0039\u0062\u0061\u0033\u0038\u0034\u0037\u0035\u0039\u0063\u0039\u0035\u0037\u0037\u0030\u0031\u0037\u0035\u0039\u0063\u0065\u0063\u0036\u0061\u0036\u0063\u0030\u0034\u0066\u0035",
    zhyId:
      "\u0034\u0030\u0032\u0038\u0033\u0066\u0038\u0031\u0037\u0036\u0038\u0039\u0038\u0061\u0063\u0034\u0030\u0031\u0037\u0036\u0038\u0039\u0064\u0035\u0064\u0064\u0031\u0063\u0030\u0030\u0032\u0030",
  },
};
var api = {
  imgUrl: "\u002e\u002f\u0069\u006d\u0061\u0067\u0065\u0073\u002f",
  attachUrl: staticUrl,
  jsonUrl: itemFileUrl,
  loginUrl:
    "\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u007a\u0077\u0066\u0077\u002e\u006e\u006d\u0070\u0061\u002e\u0067\u006f\u0076\u002e\u0063\u006e\u002f",
  loginOutUrl:
    "\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u007a\u0077\u0066\u0077\u002e\u006e\u006d\u0070\u0061\u002e\u0067\u006f\u0076\u002e\u0063\u006e\u002f\u0077\u0065\u0062\u002f\u0075\u0073\u0065\u0072\u002f\u006c\u006f\u0067\u0069\u006e\u002f\u006c\u006f\u0067\u006f\u0075\u0074",
  getDictList: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      100,
      105,
      99,
      116,
      47,
      103,
      101,
      116,
      68,
      105,
      99,
      116,
      76,
      105,
      115,
      116,
      39
    )
  ),
  NMPA_DATA: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      70,
      105,
      108,
      101,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      99,
      111,
      110,
      102,
      105,
      103,
      47,
      78,
      77,
      80,
      65,
      95,
      68,
      65,
      84,
      65,
      46,
      106,
      115,
      111,
      110,
      39
    )
  ),
  getHotKey: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      104,
      111,
      116,
      107,
      101,
      121,
      47,
      103,
      101,
      116,
      72,
      111,
      116,
      75,
      101,
      121,
      39
    )
  ),
  queryList: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      110,
      109,
      112,
      97,
      100,
      97,
      116,
      97,
      47,
      115,
      101,
      97,
      114,
      99,
      104,
      39
    )
  ),
  queryDetail: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      110,
      109,
      112,
      97,
      100,
      97,
      116,
      97,
      47,
      113,
      117,
      101,
      114,
      121,
      68,
      101,
      116,
      97,
      105,
      108,
      39
    )
  ),
  getLoginUserInfo: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      115,
      115,
      111,
      47,
      103,
      101,
      116,
      76,
      111,
      103,
      105,
      110,
      85,
      115,
      101,
      114,
      73,
      110,
      102,
      111,
      39
    )
  ),
  loginOut: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      115,
      115,
      111,
      47,
      108,
      111,
      103,
      105,
      110,
      79,
      117,
      116,
      39
    )
  ),
  countNums: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      110,
      109,
      112,
      97,
      100,
      97,
      116,
      97,
      47,
      99,
      111,
      117,
      110,
      116,
      78,
      117,
      109,
      115,
      39
    )
  ),
  getLoginUserInfo: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      115,
      115,
      111,
      47,
      103,
      101,
      116,
      76,
      111,
      103,
      105,
      110,
      85,
      115,
      101,
      114,
      73,
      110,
      102,
      111,
      39
    )
  ),
  getfavoriteDataList: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      102,
      97,
      118,
      111,
      114,
      105,
      116,
      101,
      47,
      103,
      101,
      116,
      102,
      97,
      118,
      111,
      114,
      105,
      116,
      101,
      68,
      97,
      116,
      97,
      76,
      105,
      115,
      116,
      39
    )
  ),
  addFavoriteData: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      102,
      97,
      118,
      111,
      114,
      105,
      116,
      101,
      47,
      97,
      100,
      100,
      70,
      97,
      118,
      111,
      114,
      105,
      116,
      101,
      68,
      97,
      116,
      97,
      39
    )
  ),
  delFavoriteData: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      102,
      97,
      118,
      111,
      114,
      105,
      116,
      101,
      47,
      100,
      101,
      108,
      70,
      97,
      118,
      111,
      114,
      105,
      116,
      101,
      68,
      97,
      116,
      97,
      39
    )
  ),
  subdata: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      102,
      101,
      101,
      100,
      98,
      97,
      99,
      107,
      47,
      115,
      117,
      98,
      100,
      97,
      116,
      97,
      39
    )
  ),
  mysubdata: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      102,
      101,
      101,
      100,
      98,
      97,
      99,
      107,
      47,
      109,
      121,
      115,
      117,
      98,
      100,
      97,
      116,
      97,
      39
    )
  ),
  showCollectionDataListByUser: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      102,
      97,
      118,
      111,
      114,
      105,
      116,
      101,
      47,
      115,
      104,
      111,
      119,
      67,
      111,
      108,
      108,
      101,
      99,
      116,
      105,
      111,
      110,
      68,
      97,
      116,
      97,
      76,
      105,
      115,
      116,
      66,
      121,
      85,
      115,
      101,
      114,
      39
    )
  ),
  queryLink: eval(
    String.fromCharCode(
      105,
      116,
      101,
      109,
      65,
      112,
      105,
      85,
      114,
      108,
      32,
      43,
      32,
      39,
      110,
      109,
      112,
      97,
      100,
      97,
      116,
      97,
      47,
      113,
      117,
      101,
      114,
      121,
      76,
      105,
      110,
      107,
      39
    )
  ),
  getAttachWebPath: function (_0xf136a) {
    var _array4 = _0xf8e(_0xdb[23]).split(_0xf8e(_0xdb[24])),
      _index4 = 0;

    while (!![]) {
      switch (+_array4[_index4++]) {
        case 0:
          if (
            eval(
              String.fromCharCode(
                116,
                111,
                112,
                65,
                100,
                100,
                114,
                32,
                61,
                61,
                32,
                34,
                34
              )
            )
          ) {
            var path = window[_0xf8e(_0xdb[25])][_0xf8e(_0xdb[26])];
            topAddr = path[_0xf8e(_0xdb[27])](
              _0x1dc([32, 255912, 32, 255912, 38, 37]),
              path[_0xf8e(_0xdb[28])](_0xf8e(_0xdb[29]))
            );
          }
          continue;
        case 1:
          return eval(
            String.fromCharCode(
              116,
              111,
              112,
              65,
              100,
              100,
              114,
              32,
              43,
              32,
              39,
              47,
              100,
              97,
              116,
              97,
              115,
              101,
              97,
              114,
              99,
              104,
              47,
              97,
              116,
              116,
              97,
              99,
              104,
              39,
              32,
              43,
              32,
              95,
              48,
              120,
              102,
              49,
              51,
              54,
              97
            )
          );
          continue;
      }
      break;
    }
  },
  openWebWin: function (url) {
    var _array5 = _0xf8e(_0xdb[30]).split(_0xf8e(_0xdb[31])), //0,2,1
      _index5 = 0;
    while (!![]) {
      switch (+_array5[_index5++]) {
        case 0:
          var _0xe146a = window[_0xf8e(_0xdb[32])](_0xf8e(_0xdb[33]));
          continue;
        case 1:
          setTimeout(function () {
            var _array6 = _0xf8e(_0xdb[34]).split(_0xf8e(_0xdb[35])),
              _index6 = 0;
            while (!![]) {
              switch (+_array6[_index6++]) {
                case 0:
                  _0xe146a[_0xf8e(_0xdb[36])] = url;
                  continue;
              }
              break;
            }
          }, _0x1dc([32, 389547, 32, 389583, 38, 37]));
          continue;
        case 2:
          if (
            eval(
              String.fromCharCode(
                95,
                48,
                120,
                101,
                49,
                52,
                54,
                97,
                32,
                61,
                61,
                61,
                32,
                110,
                117,
                108,
                108
              )
            ) ||
            eval(
              String.fromCharCode(
                116,
                121,
                112,
                101,
                111,
                102,
                32,
                95,
                48,
                120,
                101,
                49,
                52,
                54,
                97,
                32,
                61,
                61,
                61,
                32,
                39,
                117,
                110,
                100,
                101,
                102,
                105,
                110,
                101,
                100,
                39
              )
            )
          ) {
            window["location"]["href"] = url;
            return;
          }
          continue;
      }
      break;
    }
  },
};
