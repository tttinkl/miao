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

    function concat(array,...values) {
      var ret = Array.from(array);
      for(let i = 0; i < values.length;i++) {
        if(typeof(values[i]) == "number") ret.push(values[i]);
        else {
          ret.push(...values[i]);
        }
      }
      return ret;
    }

    function diffrence(ary,...values) {
      var ret = [];
      var value = [];
      for(let i = 0; i < values.length;i++) {
        value = value.concat(values[i]);
      }

      for(let i = 0;i < ary.length;i++) {
        for(let j = 0;i < values.length;i++) {
          if(values[j] != ary[i]) ret.push(ary[i]);
        }
      }
      return ret;
    }

    function diffrenceBy(ary,values,) {

    }

    function drop(ary,n = 1) {
      ary.splice(0,n);
      return ary;
    }

    function dropRight(array,n = 1) {
      ary.splice(ary.length - n);
      return ary;
    }

    function dropRightWhile() {

    }

    function dropRightWhile(array,) {

    }

    function matches(src) {
      function isMatch(obj,src) {
        if(obj === src) return true;
        for(let k in src) {
          if(typeof(src[k]) == "object" && src[k] != null) {
            if(!isMatch(obj[k],src[k])) return false;
          }else {
            if(src[k] != obj[k]) return false
          }
        }
        return true;
      }
      return function(obj) {
        return isMatch(obj,src);
      }
    }  




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
