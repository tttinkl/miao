var tttinkl = function() {
    function chunk(ary,n) {
      var ret = [];
      while(ary.length != 0) {
        ret.push(ary.splice(0,n));
      }
      return ret;
    }

    function compact(ary) {
      return ary.filter(it => it)
    }

    function concat(array,values) {
      return ary.concat(...values)
    }

    function diffrence(ary,values) {

    }

    function diffrenceBy(ary,values) {

    }

    function drop(ary,n = 1) {
      ary.splice(0,n);
      return ary;
    }

    function dropRight(array,n = 1) {
      ary.splice(ary.length - n);
      return ary;
    }

    dropRightWhile(array,)



    return {
      chunk,
      compact,
      concat,
      diffrence,
      diffrenceBy,
      drop,
      dropRight,
    }
}();
