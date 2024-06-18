// type Define
type func = () => void;
type PoolConfFunc = (opt: SyncPool) => void;
type SyncPoolConfFunc = (...args: any[]) => PoolConfFunc;
type SyncPool = {
  _maxLen: number;
  _errorHandler: Function;
  _interval: number;
  _runTask: () => Promise<boolean>;
  tasks: Array<func>;
  add: (func) => void;
  run: func;
};
// opt function
const withEventsMaxLen: SyncPoolConfFunc = (maxLen: number) => {
  return function (conf: SyncPool) {
    conf._maxLen = maxLen;
  };
};
const withErrorHandler: SyncPoolConfFunc = (cb: Function) => {
  return function (conf: SyncPool) {
    conf._errorHandler = cb;
  };
};
const withRunInterval: SyncPoolConfFunc = (interval: number) => {
  return function (conf: SyncPool) {
    conf._interval = interval;
  };
};

function NewSyncPool(...opts: Array<PoolConfFunc>): SyncPool {
  let _maxLen = 20;
  let _interval = 3000;
  let obj: SyncPool = {
    _maxLen: _maxLen,
    _errorHandler: () => {},
    _interval: _interval,
    add: (task: func) => {
      let vm = obj;
      vm.tasks.push(task);
    },
    _runTask(): Promise<boolean> {
      return new Promise((resolve) => {
        let vm = obj;
        let timeout = setTimeout(() => {
          resolve(false);
          clearTimeout(timeout);
          clearInterval(interval);
          return;
        }, vm._interval);

        if (vm.tasks.length == 0) {
          return;
        }
        let _taskLen =
          vm.tasks.length > vm._maxLen ? vm._maxLen : vm.tasks.length;

        let wg = 0;
        for (let i = 0; i < _taskLen; i++) {
          let task = vm.tasks.shift();
          try {
            let toPromise = wrap(task);
            toPromise.then(() => {
              ++wg;
            });
          } catch (e) {
            vm._errorHandler(e);
            wg++;
          }
        }
        let interval = setInterval(() => {
          if (wg * 2 >= _taskLen) {
            resolve(true);
            clearTimeout(timeout);
            clearInterval(interval);
          }
        }, 100);
      });
    },
    tasks: [],
    run: () => {
      let vm = obj;
      setInterval(() => {
        vm._runTask().then((val) => {
          console.log("vm._runTask", val);
        });
      }, _interval);
    },
  };
  opts.forEach((opt) => {
    opt(obj);
  });
  return obj;
}

export default {
  NewSyncPool,
  withErrorHandler,
  withRunInterval,
  withEventsMaxLen,
};

// ***** util ****

function _isAsyncFunction(fn) {
  return fn && fn.constructor && fn.constructor.name === "AsyncFunction";
}

const wrap = (fn: any): Promise<any> => {
  if (!_isAsyncFunction(fn)) {
    return Promise.resolve(fn());
  }
  return fn();
};

// **** test ****

// const pool = NewSyncPool(
//   withEventsMaxLen(50),
//   withRunInterval(500),
//   withErrorHandler(function (e) {
//     console.log("e", e);
//   })
// );

// pool.run();

// for (let index = 0; index < 100; index++) {
//   pool.add(function () {
//     console.log("index", index);
//   });
// }
