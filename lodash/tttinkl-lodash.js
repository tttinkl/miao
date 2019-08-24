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
         var flag = 0;
        for(let j = 0;j < value.length;j++) {
          if(value[j] == ary[i]) {
            flag = 1;
          }
        }
        if(flag == 0) ret.push(ary[i]);
      }
      return ret;
    }

    function differenceBy(ary,...args) {
      if(typeof arguments[arguments.length - 1] == "function") {
        var iteratee = arguments[arguments.length - 1];
      }else if(arguments[arguments.length - 1] instanceof Array) {
        iteratee = identity;
        args[args.length] = iteratee;
      }else {
        iteratee = property(arguments[arguments.length - 1]);
      }
      var ret = [];
      var value = [];
      for(let i = 0; i < args.length - 1;i++) {
        value = value.concat(args[i]);
      }
      for(let i = 0;i < ary.length;i++) {
         var flag = 0;
        for(let j = 0;j < value.length;j++) {
          if(iteratee(value[j]) == iteratee(ary[i])) {
            flag = 1;
          }
        }
        if(flag == 0) ret.push(ary[i]);
      }
      return ret;
    }

    function isEqual(value,other) {
      if(value === other) return true;
      if(value == null && other == null) return true;
      if(value == null || other == null) return false;
      if(typeof value === "object") {
        for(let k in value) {
          if(isEqual(value[k],other[k]) == false) return false;
        }
        for(let k in other) {
          if(isEqual(value[k],other[k]) == false) return false;
        }
        return true;

      }else return false;
    }

    function differenceWith(ary,...args) {
      var ret = [];
      var value = [];
      for(let i = 0; i < args.length - 1;i++) {
        value = value.concat(args[i]);
      }
      for(let i = 0;i < ary.length;i++) {
         var flag = 0;
        for(let j = 0;j < value.length;j++) {
          if(args[args.length - 1](value[i],ary[i])) {
            flag = 1;
          }
        }
        if(flag == 0) ret.push(ary[i]);
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

    function dropRight(ary,n = 1) {
      if(n < ary.length) {
        ary.splice(ary.length - n);
        return ary;
      }else return [];
    }

    function dropRightWhile() {

    }

    function dropRightWhile(array,) {

    }

    function iteratee() {

    }

    function filter(collection,predicate = identity) {
      var ret = [];
      var func = isArray(collection) ? arrayFilter : baseFilter;
      each(collection,function(value,index,collection) {
        if (func(value,index,collection,predicate)) {
          ret.push(value);
        }
      })
      return ret;
    }

    function arrayFilter(array,predicate) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];
      while(++index < length) {
        var value = array[index];
        if(predicate(value,index,array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    function baseFilter(collection,predicate) {
      var result = [];
      each(collection,function(value,index,collection) {
        if (predicate(value,index,collection)) {
          result.push(value);
        }
      });
      return resultl
    }

    function each(collection,iteratee = identity) {
      if (isArray(collection)) {
        for(let i = 0; i < collection.length;i++) {
          var f = iteratee(collection[i],i,collection);
          if(f === false) return;
        }
      }else {
        for(let k in collection) {
          var f = iteratee(collection[k],k,collection);
          if(f === false) return;
        }
      }
    }

    var forEach = each;

    function isArray(value) {
      return Array.isArray(value);
    }

    function wrap(value,wrapper = identity) {
      return function(...args) {
        return wrapper(value,...args);
      }
    }

    function escape(str = "") {
      return str.replace("<","&lt;").replace(">","$gt;").replace("&","&amp;").replace("'","&#39;");
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
      if(str instanceof Array) return str;
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
      isEqual,
      differenceWith,
      drop,
      dropRight,
      dropRightWhile,
      iteratee,
      filter,
      each,
      forEach,
      isArray,
      wrap,
      escape,
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
