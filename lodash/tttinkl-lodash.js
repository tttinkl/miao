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
      var value = concat(values);
      for(let i = 0;i < ary.length;i++) {
        for(let j = 0;i < values.length;i++) {
          if(values[j] != ary[i]) ret.push(ary[i]);
        }
      }
      return ret;
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

    function dropRightWhile() {
      
    }

    function dropRightWhile(array,) {

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
