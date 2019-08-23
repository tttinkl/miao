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

    function difference(ary,...values) {
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

    function differenceBy(ary,values,iteratee = identity) {
      var ret = [];
      var value = [];
      for(let i = 0; i < values.length;i++) {
        value = value.concat(values[i]);
      }

      for(let i = 0;i < ary.length;i++) {
        for(let j = 0;i < values.length;i++) {
          if(typeof iteratee == "function") {
            if(iteratee(values[j]) != iteratee(ary[i])) ret.push(ary[i]);
          }else {
            if(property(values[j]) != property(ary[i])) ret.push(ary[i]);
          }
        }
      }
      return ret;
    }

    function identity(value) {
      return value;
    }

    function drop(ary,n = 1) {
      ary.splice(0,n);
      return ary;
    }

    function dropRight(array,n = 1) {
      // ary.splice(ary.length - n);
      // return ary;
    }

    function dropRightWhile() {

    }

    function dropRightWhile(array,) {

    }

    function matches(src) {
      
      return function(obj) {
        return isMatch(obj,src);
      }
    }

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

    function matchesProperty(path,srcValue) {
      return function(obj) {
        return isEqual(get(obj,path,))
      }
    }

    function bind(f,thisArg,...fixedArgs) {
      return function(...args) {
        var ARGS = [...fixedArgs,...args]
        return f.apply(thisArg,...ARGS)
      }
    }

    function get(obj,path,defaultVal) {
      var path = toPath(path);
      for(let i = 0;i < path.length;i++) {
        if(obj === undefined) return defaultVal;
        obj = obj[path[i]];
      }
      return obj;
    }

    function property(path) {
      return function(obj) {
        return get(obj,path);
      }

    }

    function toPath(str) {//a.b.c.d[foo].d
      return str.split(/\.|\[|\]./g);
    }

    function compose(funcs) {
      return function(...args) {
        var value = funcs[0](...args)
        for(var i = 1; i < funcs.length; i++) {
          value = funcs[i](value)
        }
        return value
      }
    }

    function curry(f,length = f.length) {
      return function(...args) {
        if (args.length >= length) {
          return f(...args);
        } else {
          return curry(f.bind(null,...args),length - args.length);
        }
      }
    }

    function flip(func) {
      return function(...args) {
        args.reverse();
        return func(...args);
      }
    }


    return {
      chunk,
      compact,
      concat,
      difference,
      differenceBy,
      drop,
      dropRight,
      dropRightWhile,
      dropRightWhile,
      matches,
      isMatch,
      matchesProperty,
      bind,
      get,
      property,
      toPath,
      compose,
      curry,
      flip,
    }
}();
