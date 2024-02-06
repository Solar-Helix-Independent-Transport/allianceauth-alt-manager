var pa = (e, t, n) => {
  if (!t.has(e)) throw TypeError("Cannot " + n);
};
var S = (e, t, n) => (pa(e, t, "read from private field"), n ? n.call(e) : t.get(e)),
  L = (e, t, n) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, n);
  },
  I = (e, t, n, r) => (pa(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var fo = (e, t, n, r) => ({
    set _(i) {
      I(e, t, i, n);
    },
    get _() {
      return S(e, t, r);
    },
  }),
  j = (e, t, n) => (pa(e, t, "access private method"), n);
function Wv(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const o = Object.getOwnPropertyDescriptor(r, i);
          o && Object.defineProperty(e, i, o.get ? o : { enumerable: !0, get: () => r[i] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function vp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function r2(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r
        ? Reflect.construct(t, arguments, this.constructor)
        : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.keys(e).forEach(function (r) {
      var i = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        n,
        r,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            }
      );
    }),
    n
  );
}
var gp = { exports: {} },
  U = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ro = Symbol.for("react.element"),
  Kv = Symbol.for("react.portal"),
  Gv = Symbol.for("react.fragment"),
  qv = Symbol.for("react.strict_mode"),
  Yv = Symbol.for("react.profiler"),
  Xv = Symbol.for("react.provider"),
  Zv = Symbol.for("react.context"),
  Jv = Symbol.for("react.forward_ref"),
  eg = Symbol.for("react.suspense"),
  tg = Symbol.for("react.memo"),
  ng = Symbol.for("react.lazy"),
  Ac = Symbol.iterator;
function rg(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ac && e[Ac]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var yp = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  wp = Object.assign,
  Sp = {};
function Wr(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = Sp), (this.updater = n || yp);
}
Wr.prototype.isReactComponent = {};
Wr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Wr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Op() {}
Op.prototype = Wr.prototype;
function Os(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = Sp), (this.updater = n || yp);
}
var Cs = (Os.prototype = new Op());
Cs.constructor = Os;
wp(Cs, Wr.prototype);
Cs.isPureReactComponent = !0;
var Nc = Array.isArray,
  Cp = Object.prototype.hasOwnProperty,
  Es = { current: null },
  Ep = { key: !0, ref: !0, __self: !0, __source: !0 };
function Pp(e, t, n) {
  var r,
    i = {},
    o = null,
    u = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (u = t.ref), t.key !== void 0 && (o = "" + t.key), t))
      Cp.call(t, r) && !Ep.hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var l = Array(a), s = 0; s < a; s++) l[s] = arguments[s + 2];
    i.children = l;
  }
  if (e && e.defaultProps) for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
  return { $$typeof: ro, type: e, key: o, ref: u, props: i, _owner: Es.current };
}
function ig(e, t) {
  return { $$typeof: ro, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ps(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ro;
}
function og(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var $c = /\/+/g;
function ha(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? og("" + e.key) : t.toString(36);
}
function Ao(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var u = !1;
  if (e === null) u = !0;
  else
    switch (o) {
      case "string":
      case "number":
        u = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case ro:
          case Kv:
            u = !0;
        }
    }
  if (u)
    return (
      (u = e),
      (i = i(u)),
      (e = r === "" ? "." + ha(u, 0) : r),
      Nc(i)
        ? ((n = ""),
          e != null && (n = e.replace($c, "$&/") + "/"),
          Ao(i, t, n, "", function (s) {
            return s;
          }))
        : i != null &&
          (Ps(i) &&
            (i = ig(
              i,
              n +
                (!i.key || (u && u.key === i.key) ? "" : ("" + i.key).replace($c, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((u = 0), (r = r === "" ? "." : r + ":"), Nc(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a];
      var l = r + ha(o, a);
      u += Ao(o, t, n, l, i);
    }
  else if (((l = rg(e)), typeof l == "function"))
    for (e = l.call(e), a = 0; !(o = e.next()).done; )
      (o = o.value), (l = r + ha(o, a++)), (u += Ao(o, t, n, l, i));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return u;
}
function po(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Ao(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function ug(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ae = { current: null },
  No = { transition: null },
  ag = { ReactCurrentDispatcher: Ae, ReactCurrentBatchConfig: No, ReactCurrentOwner: Es };
U.Children = {
  map: po,
  forEach: function (e, t, n) {
    po(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      po(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      po(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Ps(e))
      throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  },
};
U.Component = Wr;
U.Fragment = Gv;
U.Profiler = Yv;
U.PureComponent = Os;
U.StrictMode = qv;
U.Suspense = eg;
U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ag;
U.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " + e + "."
    );
  var r = wp({}, e.props),
    i = e.key,
    o = e.ref,
    u = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (u = Es.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (l in t)
      Cp.call(t, l) &&
        !Ep.hasOwnProperty(l) &&
        (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var s = 0; s < l; s++) a[s] = arguments[s + 2];
    r.children = a;
  }
  return { $$typeof: ro, type: e.type, key: i, ref: o, props: r, _owner: u };
};
U.createContext = function (e) {
  return (
    (e = {
      $$typeof: Zv,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Xv, _context: e }),
    (e.Consumer = e)
  );
};
U.createElement = Pp;
U.createFactory = function (e) {
  var t = Pp.bind(null, e);
  return (t.type = e), t;
};
U.createRef = function () {
  return { current: null };
};
U.forwardRef = function (e) {
  return { $$typeof: Jv, render: e };
};
U.isValidElement = Ps;
U.lazy = function (e) {
  return { $$typeof: ng, _payload: { _status: -1, _result: e }, _init: ug };
};
U.memo = function (e, t) {
  return { $$typeof: tg, type: e, compare: t === void 0 ? null : t };
};
U.startTransition = function (e) {
  var t = No.transition;
  No.transition = {};
  try {
    e();
  } finally {
    No.transition = t;
  }
};
U.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
U.useCallback = function (e, t) {
  return Ae.current.useCallback(e, t);
};
U.useContext = function (e) {
  return Ae.current.useContext(e);
};
U.useDebugValue = function () {};
U.useDeferredValue = function (e) {
  return Ae.current.useDeferredValue(e);
};
U.useEffect = function (e, t) {
  return Ae.current.useEffect(e, t);
};
U.useId = function () {
  return Ae.current.useId();
};
U.useImperativeHandle = function (e, t, n) {
  return Ae.current.useImperativeHandle(e, t, n);
};
U.useInsertionEffect = function (e, t) {
  return Ae.current.useInsertionEffect(e, t);
};
U.useLayoutEffect = function (e, t) {
  return Ae.current.useLayoutEffect(e, t);
};
U.useMemo = function (e, t) {
  return Ae.current.useMemo(e, t);
};
U.useReducer = function (e, t, n) {
  return Ae.current.useReducer(e, t, n);
};
U.useRef = function (e) {
  return Ae.current.useRef(e);
};
U.useState = function (e) {
  return Ae.current.useState(e);
};
U.useSyncExternalStore = function (e, t, n) {
  return Ae.current.useSyncExternalStore(e, t, n);
};
U.useTransition = function () {
  return Ae.current.useTransition();
};
U.version = "18.2.0";
gp.exports = U;
var x = gp.exports;
const lg = vp(x),
  Vc = Wv({ __proto__: null, default: lg }, [x]);
var kp = { exports: {} },
  K = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Oe = typeof Symbol == "function" && Symbol.for,
  ks = Oe ? Symbol.for("react.element") : 60103,
  bs = Oe ? Symbol.for("react.portal") : 60106,
  Nu = Oe ? Symbol.for("react.fragment") : 60107,
  $u = Oe ? Symbol.for("react.strict_mode") : 60108,
  Vu = Oe ? Symbol.for("react.profiler") : 60114,
  zu = Oe ? Symbol.for("react.provider") : 60109,
  ju = Oe ? Symbol.for("react.context") : 60110,
  xs = Oe ? Symbol.for("react.async_mode") : 60111,
  Uu = Oe ? Symbol.for("react.concurrent_mode") : 60111,
  Hu = Oe ? Symbol.for("react.forward_ref") : 60112,
  Bu = Oe ? Symbol.for("react.suspense") : 60113,
  sg = Oe ? Symbol.for("react.suspense_list") : 60120,
  Qu = Oe ? Symbol.for("react.memo") : 60115,
  Wu = Oe ? Symbol.for("react.lazy") : 60116,
  cg = Oe ? Symbol.for("react.block") : 60121,
  fg = Oe ? Symbol.for("react.fundamental") : 60117,
  dg = Oe ? Symbol.for("react.responder") : 60118,
  pg = Oe ? Symbol.for("react.scope") : 60119;
function Je(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case ks:
        switch (((e = e.type), e)) {
          case xs:
          case Uu:
          case Nu:
          case Vu:
          case $u:
          case Bu:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case ju:
              case Hu:
              case Wu:
              case Qu:
              case zu:
                return e;
              default:
                return t;
            }
        }
      case bs:
        return t;
    }
  }
}
function bp(e) {
  return Je(e) === Uu;
}
K.AsyncMode = xs;
K.ConcurrentMode = Uu;
K.ContextConsumer = ju;
K.ContextProvider = zu;
K.Element = ks;
K.ForwardRef = Hu;
K.Fragment = Nu;
K.Lazy = Wu;
K.Memo = Qu;
K.Portal = bs;
K.Profiler = Vu;
K.StrictMode = $u;
K.Suspense = Bu;
K.isAsyncMode = function (e) {
  return bp(e) || Je(e) === xs;
};
K.isConcurrentMode = bp;
K.isContextConsumer = function (e) {
  return Je(e) === ju;
};
K.isContextProvider = function (e) {
  return Je(e) === zu;
};
K.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === ks;
};
K.isForwardRef = function (e) {
  return Je(e) === Hu;
};
K.isFragment = function (e) {
  return Je(e) === Nu;
};
K.isLazy = function (e) {
  return Je(e) === Wu;
};
K.isMemo = function (e) {
  return Je(e) === Qu;
};
K.isPortal = function (e) {
  return Je(e) === bs;
};
K.isProfiler = function (e) {
  return Je(e) === Vu;
};
K.isStrictMode = function (e) {
  return Je(e) === $u;
};
K.isSuspense = function (e) {
  return Je(e) === Bu;
};
K.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === Nu ||
    e === Uu ||
    e === Vu ||
    e === $u ||
    e === Bu ||
    e === sg ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === Wu ||
        e.$$typeof === Qu ||
        e.$$typeof === zu ||
        e.$$typeof === ju ||
        e.$$typeof === Hu ||
        e.$$typeof === fg ||
        e.$$typeof === dg ||
        e.$$typeof === pg ||
        e.$$typeof === cg))
  );
};
K.typeOf = Je;
kp.exports = K;
var hg = kp.exports,
  xp = { exports: {} },
  et = {},
  Mp = { exports: {} },
  Tp = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(T, N) {
    var V = T.length;
    T.push(N);
    e: for (; 0 < V; ) {
      var q = (V - 1) >>> 1,
        z = T[q];
      if (0 < i(z, N)) (T[q] = N), (T[V] = z), (V = q);
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var N = T[0],
      V = T.pop();
    if (V !== N) {
      T[0] = V;
      e: for (var q = 0, z = T.length, ve = z >>> 1; q < ve; ) {
        var Ce = 2 * (q + 1) - 1,
          rt = T[Ce],
          de = Ce + 1,
          We = T[de];
        if (0 > i(rt, V))
          de < z && 0 > i(We, rt)
            ? ((T[q] = We), (T[de] = V), (q = de))
            : ((T[q] = rt), (T[Ce] = V), (q = Ce));
        else if (de < z && 0 > i(We, V)) (T[q] = We), (T[de] = V), (q = de);
        else break e;
      }
    }
    return N;
  }
  function i(T, N) {
    var V = T.sortIndex - N.sortIndex;
    return V !== 0 ? V : T.id - N.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var u = Date,
      a = u.now();
    e.unstable_now = function () {
      return u.now() - a;
    };
  }
  var l = [],
    s = [],
    c = 1,
    p = null,
    h = 3,
    v = !1,
    y = !1,
    g = !1,
    O = typeof setTimeout == "function" ? setTimeout : null,
    f = typeof clearTimeout == "function" ? clearTimeout : null,
    d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(T) {
    for (var N = n(s); N !== null; ) {
      if (N.callback === null) r(s);
      else if (N.startTime <= T) r(s), (N.sortIndex = N.expirationTime), t(l, N);
      else break;
      N = n(s);
    }
  }
  function C(T) {
    if (((g = !1), m(T), !y))
      if (n(l) !== null) (y = !0), te(P);
      else {
        var N = n(s);
        N !== null && $e(C, N.startTime - T);
      }
  }
  function P(T, N) {
    (y = !1), g && ((g = !1), f(k), (k = -1)), (v = !0);
    var V = h;
    try {
      for (m(N), p = n(l); p !== null && (!(p.expirationTime > N) || (T && !G())); ) {
        var q = p.callback;
        if (typeof q == "function") {
          (p.callback = null), (h = p.priorityLevel);
          var z = q(p.expirationTime <= N);
          (N = e.unstable_now()),
            typeof z == "function" ? (p.callback = z) : p === n(l) && r(l),
            m(N);
        } else r(l);
        p = n(l);
      }
      if (p !== null) var ve = !0;
      else {
        var Ce = n(s);
        Ce !== null && $e(C, Ce.startTime - N), (ve = !1);
      }
      return ve;
    } finally {
      (p = null), (h = V), (v = !1);
    }
  }
  var b = !1,
    E = null,
    k = -1,
    D = 5,
    _ = -1;
  function G() {
    return !(e.unstable_now() - _ < D);
  }
  function oe() {
    if (E !== null) {
      var T = e.unstable_now();
      _ = T;
      var N = !0;
      try {
        N = E(!0, T);
      } finally {
        N ? Le() : ((b = !1), (E = null));
      }
    } else b = !1;
  }
  var Le;
  if (typeof d == "function")
    Le = function () {
      d(oe);
    };
  else if (typeof MessageChannel < "u") {
    var nt = new MessageChannel(),
      se = nt.port2;
    (nt.port1.onmessage = oe),
      (Le = function () {
        se.postMessage(null);
      });
  } else
    Le = function () {
      O(oe, 0);
    };
  function te(T) {
    (E = T), b || ((b = !0), Le());
  }
  function $e(T, N) {
    k = O(function () {
      T(e.unstable_now());
    }, N);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (T) {
      T.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      y || v || ((y = !0), te(P));
    }),
    (e.unstable_forceFrameRate = function (T) {
      0 > T || 125 < T
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (D = 0 < T ? Math.floor(1e3 / T) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (e.unstable_next = function (T) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var N = 3;
          break;
        default:
          N = h;
      }
      var V = h;
      h = N;
      try {
        return T();
      } finally {
        h = V;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (T, N) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var V = h;
      h = T;
      try {
        return N();
      } finally {
        h = V;
      }
    }),
    (e.unstable_scheduleCallback = function (T, N, V) {
      var q = e.unstable_now();
      switch (
        (typeof V == "object" && V !== null
          ? ((V = V.delay), (V = typeof V == "number" && 0 < V ? q + V : q))
          : (V = q),
        T)
      ) {
        case 1:
          var z = -1;
          break;
        case 2:
          z = 250;
          break;
        case 5:
          z = 1073741823;
          break;
        case 4:
          z = 1e4;
          break;
        default:
          z = 5e3;
      }
      return (
        (z = V + z),
        (T = {
          id: c++,
          callback: N,
          priorityLevel: T,
          startTime: V,
          expirationTime: z,
          sortIndex: -1,
        }),
        V > q
          ? ((T.sortIndex = V),
            t(s, T),
            n(l) === null && T === n(s) && (g ? (f(k), (k = -1)) : (g = !0), $e(C, V - q)))
          : ((T.sortIndex = z), t(l, T), y || v || ((y = !0), te(P))),
        T
      );
    }),
    (e.unstable_shouldYield = G),
    (e.unstable_wrapCallback = function (T) {
      var N = h;
      return function () {
        var V = h;
        h = N;
        try {
          return T.apply(this, arguments);
        } finally {
          h = V;
        }
      };
    });
})(Tp);
Mp.exports = Tp;
var mg = Mp.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ip = x,
  Ze = mg;
function M(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Rp = new Set(),
  Oi = {};
function Xn(e, t) {
  Nr(e, t), Nr(e + "Capture", t);
}
function Nr(e, t) {
  for (Oi[e] = t, e = 0; e < t.length; e++) Rp.add(t[e]);
}
var Wt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ya = Object.prototype.hasOwnProperty,
  vg =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  zc = {},
  jc = {};
function gg(e) {
  return Ya.call(jc, e) ? !0 : Ya.call(zc, e) ? !1 : vg.test(e) ? (jc[e] = !0) : ((zc[e] = !0), !1);
}
function yg(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function wg(e, t, n, r) {
  if (t === null || typeof t > "u" || yg(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ne(e, t, n, r, i, o, u) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = u);
}
var be = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    be[e] = new Ne(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  be[t] = new Ne(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  be[e] = new Ne(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
  be[e] = new Ne(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    be[e] = new Ne(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  be[e] = new Ne(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  be[e] = new Ne(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  be[e] = new Ne(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  be[e] = new Ne(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ms = /[\-:]([a-z])/g;
function Ts(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Ms, Ts);
    be[t] = new Ne(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Ms, Ts);
    be[t] = new Ne(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Ms, Ts);
  be[t] = new Ne(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  be[e] = new Ne(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
be.xlinkHref = new Ne("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (e) {
  be[e] = new Ne(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Is(e, t, n, r) {
  var i = be.hasOwnProperty(t) ? be[t] : null;
  (i !== null
    ? i.type !== 0
    : r || !(2 < t.length) || (t[0] !== "o" && t[0] !== "O") || (t[1] !== "n" && t[1] !== "N")) &&
    (wg(t, n, i, r) && (n = null),
    r || i === null
      ? gg(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Yt = Ip.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  ho = Symbol.for("react.element"),
  tr = Symbol.for("react.portal"),
  nr = Symbol.for("react.fragment"),
  Rs = Symbol.for("react.strict_mode"),
  Xa = Symbol.for("react.profiler"),
  Lp = Symbol.for("react.provider"),
  Dp = Symbol.for("react.context"),
  Ls = Symbol.for("react.forward_ref"),
  Za = Symbol.for("react.suspense"),
  Ja = Symbol.for("react.suspense_list"),
  Ds = Symbol.for("react.memo"),
  en = Symbol.for("react.lazy"),
  Fp = Symbol.for("react.offscreen"),
  Uc = Symbol.iterator;
function Yr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Uc && e[Uc]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var ie = Object.assign,
  ma;
function ui(e) {
  if (ma === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ma = (t && t[1]) || "";
    }
  return (
    `
` +
    ma +
    e
  );
}
var va = !1;
function ga(e, t) {
  if (!e || va) return "";
  va = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (s) {
          var r = s;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (s) {
          r = s;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (s) {
        r = s;
      }
      e();
    }
  } catch (s) {
    if (s && r && typeof s.stack == "string") {
      for (
        var i = s.stack.split(`
`),
          o = r.stack.split(`
`),
          u = i.length - 1,
          a = o.length - 1;
        1 <= u && 0 <= a && i[u] !== o[a];

      )
        a--;
      for (; 1 <= u && 0 <= a; u--, a--)
        if (i[u] !== o[a]) {
          if (u !== 1 || a !== 1)
            do
              if ((u--, a--, 0 > a || i[u] !== o[a])) {
                var l =
                  `
` + i[u].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    l.includes("<anonymous>") &&
                    (l = l.replace("<anonymous>", e.displayName)),
                  l
                );
              }
            while (1 <= u && 0 <= a);
          break;
        }
    }
  } finally {
    (va = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? ui(e) : "";
}
function Sg(e) {
  switch (e.tag) {
    case 5:
      return ui(e.type);
    case 16:
      return ui("Lazy");
    case 13:
      return ui("Suspense");
    case 19:
      return ui("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = ga(e.type, !1)), e;
    case 11:
      return (e = ga(e.type.render, !1)), e;
    case 1:
      return (e = ga(e.type, !0)), e;
    default:
      return "";
  }
}
function el(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case nr:
      return "Fragment";
    case tr:
      return "Portal";
    case Xa:
      return "Profiler";
    case Rs:
      return "StrictMode";
    case Za:
      return "Suspense";
    case Ja:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Dp:
        return (e.displayName || "Context") + ".Consumer";
      case Lp:
        return (e._context.displayName || "Context") + ".Provider";
      case Ls:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Ds:
        return (t = e.displayName || null), t !== null ? t : el(e.type) || "Memo";
      case en:
        (t = e._payload), (e = e._init);
        try {
          return el(e(t));
        } catch {}
    }
  return null;
}
function Og(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return el(t);
    case 8:
      return t === Rs ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Cn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function _p(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Cg(e) {
  var t = _p(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (u) {
          (r = "" + u), o.call(this, u);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (u) {
          r = "" + u;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function mo(e) {
  e._valueTracker || (e._valueTracker = Cg(e));
}
function Ap(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = _p(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Jo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")) return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function tl(e, t) {
  var n = t.checked;
  return ie({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Hc(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Cn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null,
    });
}
function Np(e, t) {
  (t = t.checked), t != null && Is(e, "checked", t, !1);
}
function nl(e, t) {
  Np(e, t);
  var n = Cn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? rl(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && rl(e, t.type, Cn(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Bc(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!((r !== "submit" && r !== "reset") || (t.value !== void 0 && t.value !== null))) return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function rl(e, t, n) {
  (t !== "number" || Jo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var ai = Array.isArray;
function hr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Cn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function il(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(M(91));
  return ie({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Qc(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(M(92));
      if (ai(n)) {
        if (1 < n.length) throw Error(M(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Cn(n) };
}
function $p(e, t) {
  var n = Cn(t.value),
    r = Cn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Wc(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Vp(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ol(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Vp(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var vo,
  zp = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (
        vo = vo || document.createElement("div"),
          vo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = vo.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Ci(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var di = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Eg = ["Webkit", "ms", "Moz", "O"];
Object.keys(di).forEach(function (e) {
  Eg.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (di[t] = di[e]);
  });
});
function jp(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (di.hasOwnProperty(e) && di[e])
    ? ("" + t).trim()
    : t + "px";
}
function Up(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = jp(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var Pg = ie(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function ul(e, t) {
  if (t) {
    if (Pg[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(M(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(M(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
        throw Error(M(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(M(62));
  }
}
function al(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ll = null;
function Fs(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var sl = null,
  mr = null,
  vr = null;
function Kc(e) {
  if ((e = uo(e))) {
    if (typeof sl != "function") throw Error(M(280));
    var t = e.stateNode;
    t && ((t = Xu(t)), sl(e.stateNode, e.type, t));
  }
}
function Hp(e) {
  mr ? (vr ? vr.push(e) : (vr = [e])) : (mr = e);
}
function Bp() {
  if (mr) {
    var e = mr,
      t = vr;
    if (((vr = mr = null), Kc(e), t)) for (e = 0; e < t.length; e++) Kc(t[e]);
  }
}
function Qp(e, t) {
  return e(t);
}
function Wp() {}
var ya = !1;
function Kp(e, t, n) {
  if (ya) return e(t, n);
  ya = !0;
  try {
    return Qp(e, t, n);
  } finally {
    (ya = !1), (mr !== null || vr !== null) && (Wp(), Bp());
  }
}
function Ei(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Xu(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(e === "button" || e === "input" || e === "select" || e === "textarea"))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(M(231, t, typeof n));
  return n;
}
var cl = !1;
if (Wt)
  try {
    var Xr = {};
    Object.defineProperty(Xr, "passive", {
      get: function () {
        cl = !0;
      },
    }),
      window.addEventListener("test", Xr, Xr),
      window.removeEventListener("test", Xr, Xr);
  } catch {
    cl = !1;
  }
function kg(e, t, n, r, i, o, u, a, l) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, s);
  } catch (c) {
    this.onError(c);
  }
}
var pi = !1,
  eu = null,
  tu = !1,
  fl = null,
  bg = {
    onError: function (e) {
      (pi = !0), (eu = e);
    },
  };
function xg(e, t, n, r, i, o, u, a, l) {
  (pi = !1), (eu = null), kg.apply(bg, arguments);
}
function Mg(e, t, n, r, i, o, u, a, l) {
  if ((xg.apply(this, arguments), pi)) {
    if (pi) {
      var s = eu;
      (pi = !1), (eu = null);
    } else throw Error(M(198));
    tu || ((tu = !0), (fl = s));
  }
}
function Zn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Gp(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
      return t.dehydrated;
  }
  return null;
}
function Gc(e) {
  if (Zn(e) !== e) throw Error(M(188));
}
function Tg(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Zn(e)), t === null)) throw Error(M(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return Gc(i), e;
        if (o === r) return Gc(i), t;
        o = o.sibling;
      }
      throw Error(M(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var u = !1, a = i.child; a; ) {
        if (a === n) {
          (u = !0), (n = i), (r = o);
          break;
        }
        if (a === r) {
          (u = !0), (r = i), (n = o);
          break;
        }
        a = a.sibling;
      }
      if (!u) {
        for (a = o.child; a; ) {
          if (a === n) {
            (u = !0), (n = o), (r = i);
            break;
          }
          if (a === r) {
            (u = !0), (r = o), (n = i);
            break;
          }
          a = a.sibling;
        }
        if (!u) throw Error(M(189));
      }
    }
    if (n.alternate !== r) throw Error(M(190));
  }
  if (n.tag !== 3) throw Error(M(188));
  return n.stateNode.current === n ? e : t;
}
function qp(e) {
  return (e = Tg(e)), e !== null ? Yp(e) : null;
}
function Yp(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Yp(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Xp = Ze.unstable_scheduleCallback,
  qc = Ze.unstable_cancelCallback,
  Ig = Ze.unstable_shouldYield,
  Rg = Ze.unstable_requestPaint,
  le = Ze.unstable_now,
  Lg = Ze.unstable_getCurrentPriorityLevel,
  _s = Ze.unstable_ImmediatePriority,
  Zp = Ze.unstable_UserBlockingPriority,
  nu = Ze.unstable_NormalPriority,
  Dg = Ze.unstable_LowPriority,
  Jp = Ze.unstable_IdlePriority,
  Ku = null,
  Dt = null;
function Fg(e) {
  if (Dt && typeof Dt.onCommitFiberRoot == "function")
    try {
      Dt.onCommitFiberRoot(Ku, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var wt = Math.clz32 ? Math.clz32 : Ng,
  _g = Math.log,
  Ag = Math.LN2;
function Ng(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((_g(e) / Ag) | 0)) | 0;
}
var go = 64,
  yo = 4194304;
function li(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ru(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    u = n & 268435455;
  if (u !== 0) {
    var a = u & ~i;
    a !== 0 ? (r = li(a)) : ((o &= u), o !== 0 && (r = li(o)));
  } else (u = n & ~i), u !== 0 ? (r = li(u)) : o !== 0 && (r = li(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - wt(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function $g(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Vg(e, t) {
  for (
    var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes;
    0 < o;

  ) {
    var u = 31 - wt(o),
      a = 1 << u,
      l = i[u];
    l === -1 ? (!(a & n) || a & r) && (i[u] = $g(a, t)) : l <= t && (e.expiredLanes |= a),
      (o &= ~a);
  }
}
function dl(e) {
  return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function eh() {
  var e = go;
  return (go <<= 1), !(go & 4194240) && (go = 64), e;
}
function wa(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function io(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - wt(t)),
    (e[t] = n);
}
function zg(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - wt(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function As(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - wt(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var W = 0;
function th(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var nh,
  Ns,
  rh,
  ih,
  oh,
  pl = !1,
  wo = [],
  hn = null,
  mn = null,
  vn = null,
  Pi = new Map(),
  ki = new Map(),
  nn = [],
  jg =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Yc(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      hn = null;
      break;
    case "dragenter":
    case "dragleave":
      mn = null;
      break;
    case "mouseover":
    case "mouseout":
      vn = null;
      break;
    case "pointerover":
    case "pointerout":
      Pi.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ki.delete(t.pointerId);
  }
}
function Zr(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = uo(t)), t !== null && Ns(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function Ug(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (hn = Zr(hn, e, t, n, r, i)), !0;
    case "dragenter":
      return (mn = Zr(mn, e, t, n, r, i)), !0;
    case "mouseover":
      return (vn = Zr(vn, e, t, n, r, i)), !0;
    case "pointerover":
      var o = i.pointerId;
      return Pi.set(o, Zr(Pi.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (o = i.pointerId), ki.set(o, Zr(ki.get(o) || null, e, t, n, r, i)), !0;
  }
  return !1;
}
function uh(e) {
  var t = In(e.target);
  if (t !== null) {
    var n = Zn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Gp(n)), t !== null)) {
          (e.blockedOn = t),
            oh(e.priority, function () {
              rh(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function $o(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = hl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ll = r), n.target.dispatchEvent(r), (ll = null);
    } else return (t = uo(n)), t !== null && Ns(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Xc(e, t, n) {
  $o(e) && n.delete(t);
}
function Hg() {
  (pl = !1),
    hn !== null && $o(hn) && (hn = null),
    mn !== null && $o(mn) && (mn = null),
    vn !== null && $o(vn) && (vn = null),
    Pi.forEach(Xc),
    ki.forEach(Xc);
}
function Jr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    pl || ((pl = !0), Ze.unstable_scheduleCallback(Ze.unstable_NormalPriority, Hg)));
}
function bi(e) {
  function t(i) {
    return Jr(i, e);
  }
  if (0 < wo.length) {
    Jr(wo[0], e);
    for (var n = 1; n < wo.length; n++) {
      var r = wo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    hn !== null && Jr(hn, e),
      mn !== null && Jr(mn, e),
      vn !== null && Jr(vn, e),
      Pi.forEach(t),
      ki.forEach(t),
      n = 0;
    n < nn.length;
    n++
  )
    (r = nn[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < nn.length && ((n = nn[0]), n.blockedOn === null); )
    uh(n), n.blockedOn === null && nn.shift();
}
var gr = Yt.ReactCurrentBatchConfig,
  iu = !0;
function Bg(e, t, n, r) {
  var i = W,
    o = gr.transition;
  gr.transition = null;
  try {
    (W = 1), $s(e, t, n, r);
  } finally {
    (W = i), (gr.transition = o);
  }
}
function Qg(e, t, n, r) {
  var i = W,
    o = gr.transition;
  gr.transition = null;
  try {
    (W = 4), $s(e, t, n, r);
  } finally {
    (W = i), (gr.transition = o);
  }
}
function $s(e, t, n, r) {
  if (iu) {
    var i = hl(e, t, n, r);
    if (i === null) Ta(e, t, r, ou, n), Yc(e, r);
    else if (Ug(i, e, t, n, r)) r.stopPropagation();
    else if ((Yc(e, r), t & 4 && -1 < jg.indexOf(e))) {
      for (; i !== null; ) {
        var o = uo(i);
        if ((o !== null && nh(o), (o = hl(e, t, n, r)), o === null && Ta(e, t, r, ou, n), o === i))
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else Ta(e, t, r, null, n);
  }
}
var ou = null;
function hl(e, t, n, r) {
  if (((ou = null), (e = Fs(r)), (e = In(e)), e !== null))
    if (((t = Zn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Gp(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (ou = e), null;
}
function ah(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Lg()) {
        case _s:
          return 1;
        case Zp:
          return 4;
        case nu:
        case Dg:
          return 16;
        case Jp:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dn = null,
  Vs = null,
  Vo = null;
function lh() {
  if (Vo) return Vo;
  var e,
    t = Vs,
    n = t.length,
    r,
    i = "value" in dn ? dn.value : dn.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var u = n - e;
  for (r = 1; r <= u && t[n - r] === i[o - r]; r++);
  return (Vo = i.slice(e, 1 < r ? 1 - r : void 0));
}
function zo(e) {
  var t = e.keyCode;
  return (
    "charCode" in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function So() {
  return !0;
}
function Zc() {
  return !1;
}
function tt(e) {
  function t(n, r, i, o, u) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = u),
      (this.currentTarget = null);
    for (var a in e) e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? So
        : Zc),
      (this.isPropagationStopped = Zc),
      this
    );
  }
  return (
    ie(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = So));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = So));
      },
      persist: function () {},
      isPersistent: So,
    }),
    t
  );
}
var Kr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  zs = tt(Kr),
  oo = ie({}, Kr, { view: 0, detail: 0 }),
  Wg = tt(oo),
  Sa,
  Oa,
  ei,
  Gu = ie({}, oo, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: js,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== ei &&
            (ei && e.type === "mousemove"
              ? ((Sa = e.screenX - ei.screenX), (Oa = e.screenY - ei.screenY))
              : (Oa = Sa = 0),
            (ei = e)),
          Sa);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Oa;
    },
  }),
  Jc = tt(Gu),
  Kg = ie({}, Gu, { dataTransfer: 0 }),
  Gg = tt(Kg),
  qg = ie({}, oo, { relatedTarget: 0 }),
  Ca = tt(qg),
  Yg = ie({}, Kr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Xg = tt(Yg),
  Zg = ie({}, Kr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Jg = tt(Zg),
  ey = ie({}, Kr, { data: 0 }),
  ef = tt(ey),
  ty = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  ny = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  ry = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function iy(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = ry[e]) ? !!t[e] : !1;
}
function js() {
  return iy;
}
var oy = ie({}, oo, {
    key: function (e) {
      if (e.key) {
        var t = ty[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = zo(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? ny[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: js,
    charCode: function (e) {
      return e.type === "keypress" ? zo(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? zo(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  uy = tt(oy),
  ay = ie({}, Gu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  tf = tt(ay),
  ly = ie({}, oo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: js,
  }),
  sy = tt(ly),
  cy = ie({}, Kr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  fy = tt(cy),
  dy = ie({}, Gu, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  py = tt(dy),
  hy = [9, 13, 27, 32],
  Us = Wt && "CompositionEvent" in window,
  hi = null;
Wt && "documentMode" in document && (hi = document.documentMode);
var my = Wt && "TextEvent" in window && !hi,
  sh = Wt && (!Us || (hi && 8 < hi && 11 >= hi)),
  nf = " ",
  rf = !1;
function ch(e, t) {
  switch (e) {
    case "keyup":
      return hy.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function fh(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var rr = !1;
function vy(e, t) {
  switch (e) {
    case "compositionend":
      return fh(t);
    case "keypress":
      return t.which !== 32 ? null : ((rf = !0), nf);
    case "textInput":
      return (e = t.data), e === nf && rf ? null : e;
    default:
      return null;
  }
}
function gy(e, t) {
  if (rr)
    return e === "compositionend" || (!Us && ch(e, t))
      ? ((e = lh()), (Vo = Vs = dn = null), (rr = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return sh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var yy = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function of(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!yy[e.type] : t === "textarea";
}
function dh(e, t, n, r) {
  Hp(r),
    (t = uu(t, "onChange")),
    0 < t.length &&
      ((n = new zs("onChange", "change", null, n, r)), e.push({ event: n, listeners: t }));
}
var mi = null,
  xi = null;
function wy(e) {
  Eh(e, 0);
}
function qu(e) {
  var t = ur(e);
  if (Ap(t)) return e;
}
function Sy(e, t) {
  if (e === "change") return t;
}
var ph = !1;
if (Wt) {
  var Ea;
  if (Wt) {
    var Pa = "oninput" in document;
    if (!Pa) {
      var uf = document.createElement("div");
      uf.setAttribute("oninput", "return;"), (Pa = typeof uf.oninput == "function");
    }
    Ea = Pa;
  } else Ea = !1;
  ph = Ea && (!document.documentMode || 9 < document.documentMode);
}
function af() {
  mi && (mi.detachEvent("onpropertychange", hh), (xi = mi = null));
}
function hh(e) {
  if (e.propertyName === "value" && qu(xi)) {
    var t = [];
    dh(t, xi, e, Fs(e)), Kp(wy, t);
  }
}
function Oy(e, t, n) {
  e === "focusin"
    ? (af(), (mi = t), (xi = n), mi.attachEvent("onpropertychange", hh))
    : e === "focusout" && af();
}
function Cy(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return qu(xi);
}
function Ey(e, t) {
  if (e === "click") return qu(t);
}
function Py(e, t) {
  if (e === "input" || e === "change") return qu(t);
}
function ky(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ct = typeof Object.is == "function" ? Object.is : ky;
function Mi(e, t) {
  if (Ct(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Ya.call(t, i) || !Ct(e[i], t[i])) return !1;
  }
  return !0;
}
function lf(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function sf(e, t) {
  var n = lf(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = lf(n);
  }
}
function mh(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? mh(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function vh() {
  for (var e = window, t = Jo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Jo(e.document);
  }
  return t;
}
function Hs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function by(e) {
  var t = vh(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && mh(n.ownerDocument.documentElement, n)) {
    if (r !== null && Hs(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), "selectionStart" in n))
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = sf(n, o));
        var u = sf(n, r);
        i &&
          u &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== u.node ||
            e.focusOffset !== u.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(u.node, u.offset))
            : (t.setEnd(u.node, u.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top);
  }
}
var xy = Wt && "documentMode" in document && 11 >= document.documentMode,
  ir = null,
  ml = null,
  vi = null,
  vl = !1;
function cf(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  vl ||
    ir == null ||
    ir !== Jo(r) ||
    ((r = ir),
    "selectionStart" in r && Hs(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (vi && Mi(vi, r)) ||
      ((vi = r),
      (r = uu(ml, "onSelect")),
      0 < r.length &&
        ((t = new zs("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = ir))));
}
function Oo(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var or = {
    animationend: Oo("Animation", "AnimationEnd"),
    animationiteration: Oo("Animation", "AnimationIteration"),
    animationstart: Oo("Animation", "AnimationStart"),
    transitionend: Oo("Transition", "TransitionEnd"),
  },
  ka = {},
  gh = {};
Wt &&
  ((gh = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete or.animationend.animation,
    delete or.animationiteration.animation,
    delete or.animationstart.animation),
  "TransitionEvent" in window || delete or.transitionend.transition);
function Yu(e) {
  if (ka[e]) return ka[e];
  if (!or[e]) return e;
  var t = or[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in gh) return (ka[e] = t[n]);
  return e;
}
var yh = Yu("animationend"),
  wh = Yu("animationiteration"),
  Sh = Yu("animationstart"),
  Oh = Yu("transitionend"),
  Ch = new Map(),
  ff =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function kn(e, t) {
  Ch.set(e, t), Xn(t, [e]);
}
for (var ba = 0; ba < ff.length; ba++) {
  var xa = ff[ba],
    My = xa.toLowerCase(),
    Ty = xa[0].toUpperCase() + xa.slice(1);
  kn(My, "on" + Ty);
}
kn(yh, "onAnimationEnd");
kn(wh, "onAnimationIteration");
kn(Sh, "onAnimationStart");
kn("dblclick", "onDoubleClick");
kn("focusin", "onFocus");
kn("focusout", "onBlur");
kn(Oh, "onTransitionEnd");
Nr("onMouseEnter", ["mouseout", "mouseover"]);
Nr("onMouseLeave", ["mouseout", "mouseover"]);
Nr("onPointerEnter", ["pointerout", "pointerover"]);
Nr("onPointerLeave", ["pointerout", "pointerover"]);
Xn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Xn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")
);
Xn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Xn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Xn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Xn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var si =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Iy = new Set("cancel close invalid load scroll toggle".split(" ").concat(si));
function df(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Mg(r, t, void 0, e), (e.currentTarget = null);
}
function Eh(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var u = r.length - 1; 0 <= u; u--) {
          var a = r[u],
            l = a.instance,
            s = a.currentTarget;
          if (((a = a.listener), l !== o && i.isPropagationStopped())) break e;
          df(i, a, s), (o = l);
        }
      else
        for (u = 0; u < r.length; u++) {
          if (
            ((a = r[u]),
            (l = a.instance),
            (s = a.currentTarget),
            (a = a.listener),
            l !== o && i.isPropagationStopped())
          )
            break e;
          df(i, a, s), (o = l);
        }
    }
  }
  if (tu) throw ((e = fl), (tu = !1), (fl = null), e);
}
function X(e, t) {
  var n = t[Ol];
  n === void 0 && (n = t[Ol] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Ph(t, e, 2, !1), n.add(r));
}
function Ma(e, t, n) {
  var r = 0;
  t && (r |= 4), Ph(n, e, r, t);
}
var Co = "_reactListening" + Math.random().toString(36).slice(2);
function Ti(e) {
  if (!e[Co]) {
    (e[Co] = !0),
      Rp.forEach(function (n) {
        n !== "selectionchange" && (Iy.has(n) || Ma(n, !1, e), Ma(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Co] || ((t[Co] = !0), Ma("selectionchange", !1, t));
  }
}
function Ph(e, t, n, r) {
  switch (ah(t)) {
    case 1:
      var i = Bg;
      break;
    case 4:
      i = Qg;
      break;
    default:
      i = $s;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !cl || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function Ta(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var u = r.tag;
      if (u === 3 || u === 4) {
        var a = r.stateNode.containerInfo;
        if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
        if (u === 4)
          for (u = r.return; u !== null; ) {
            var l = u.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = u.stateNode.containerInfo), l === i || (l.nodeType === 8 && l.parentNode === i))
            )
              return;
            u = u.return;
          }
        for (; a !== null; ) {
          if (((u = In(a)), u === null)) return;
          if (((l = u.tag), l === 5 || l === 6)) {
            r = o = u;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  Kp(function () {
    var s = o,
      c = Fs(n),
      p = [];
    e: {
      var h = Ch.get(e);
      if (h !== void 0) {
        var v = zs,
          y = e;
        switch (e) {
          case "keypress":
            if (zo(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = uy;
            break;
          case "focusin":
            (y = "focus"), (v = Ca);
            break;
          case "focusout":
            (y = "blur"), (v = Ca);
            break;
          case "beforeblur":
          case "afterblur":
            v = Ca;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Jc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Gg;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = sy;
            break;
          case yh:
          case wh:
          case Sh:
            v = Xg;
            break;
          case Oh:
            v = fy;
            break;
          case "scroll":
            v = Wg;
            break;
          case "wheel":
            v = py;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Jg;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = tf;
        }
        var g = (t & 4) !== 0,
          O = !g && e === "scroll",
          f = g ? (h !== null ? h + "Capture" : null) : h;
        g = [];
        for (var d = s, m; d !== null; ) {
          m = d;
          var C = m.stateNode;
          if (
            (m.tag === 5 &&
              C !== null &&
              ((m = C), f !== null && ((C = Ei(d, f)), C != null && g.push(Ii(d, C, m)))),
            O)
          )
            break;
          d = d.return;
        }
        0 < g.length && ((h = new v(h, y, null, n, c)), p.push({ event: h, listeners: g }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          h && n !== ll && (y = n.relatedTarget || n.fromElement) && (In(y) || y[Kt]))
        )
          break e;
        if (
          (v || h) &&
          ((h =
            c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window),
          v
            ? ((y = n.relatedTarget || n.toElement),
              (v = s),
              (y = y ? In(y) : null),
              y !== null && ((O = Zn(y)), y !== O || (y.tag !== 5 && y.tag !== 6)) && (y = null))
            : ((v = null), (y = s)),
          v !== y)
        ) {
          if (
            ((g = Jc),
            (C = "onMouseLeave"),
            (f = "onMouseEnter"),
            (d = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((g = tf), (C = "onPointerLeave"), (f = "onPointerEnter"), (d = "pointer")),
            (O = v == null ? h : ur(v)),
            (m = y == null ? h : ur(y)),
            (h = new g(C, d + "leave", v, n, c)),
            (h.target = O),
            (h.relatedTarget = m),
            (C = null),
            In(c) === s &&
              ((g = new g(f, d + "enter", y, n, c)),
              (g.target = m),
              (g.relatedTarget = O),
              (C = g)),
            (O = C),
            v && y)
          )
            t: {
              for (g = v, f = y, d = 0, m = g; m; m = Jn(m)) d++;
              for (m = 0, C = f; C; C = Jn(C)) m++;
              for (; 0 < d - m; ) (g = Jn(g)), d--;
              for (; 0 < m - d; ) (f = Jn(f)), m--;
              for (; d--; ) {
                if (g === f || (f !== null && g === f.alternate)) break t;
                (g = Jn(g)), (f = Jn(f));
              }
              g = null;
            }
          else g = null;
          v !== null && pf(p, h, v, g, !1), y !== null && O !== null && pf(p, O, y, g, !0);
        }
      }
      e: {
        if (
          ((h = s ? ur(s) : window),
          (v = h.nodeName && h.nodeName.toLowerCase()),
          v === "select" || (v === "input" && h.type === "file"))
        )
          var P = Sy;
        else if (of(h))
          if (ph) P = Py;
          else {
            P = Cy;
            var b = Oy;
          }
        else
          (v = h.nodeName) &&
            v.toLowerCase() === "input" &&
            (h.type === "checkbox" || h.type === "radio") &&
            (P = Ey);
        if (P && (P = P(e, s))) {
          dh(p, P, n, c);
          break e;
        }
        b && b(e, h, s),
          e === "focusout" &&
            (b = h._wrapperState) &&
            b.controlled &&
            h.type === "number" &&
            rl(h, "number", h.value);
      }
      switch (((b = s ? ur(s) : window), e)) {
        case "focusin":
          (of(b) || b.contentEditable === "true") && ((ir = b), (ml = s), (vi = null));
          break;
        case "focusout":
          vi = ml = ir = null;
          break;
        case "mousedown":
          vl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (vl = !1), cf(p, n, c);
          break;
        case "selectionchange":
          if (xy) break;
        case "keydown":
        case "keyup":
          cf(p, n, c);
      }
      var E;
      if (Us)
        e: {
          switch (e) {
            case "compositionstart":
              var k = "onCompositionStart";
              break e;
            case "compositionend":
              k = "onCompositionEnd";
              break e;
            case "compositionupdate":
              k = "onCompositionUpdate";
              break e;
          }
          k = void 0;
        }
      else
        rr
          ? ch(e, n) && (k = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (k = "onCompositionStart");
      k &&
        (sh &&
          n.locale !== "ko" &&
          (rr || k !== "onCompositionStart"
            ? k === "onCompositionEnd" && rr && (E = lh())
            : ((dn = c), (Vs = "value" in dn ? dn.value : dn.textContent), (rr = !0))),
        (b = uu(s, k)),
        0 < b.length &&
          ((k = new ef(k, e, null, n, c)),
          p.push({ event: k, listeners: b }),
          E ? (k.data = E) : ((E = fh(n)), E !== null && (k.data = E)))),
        (E = my ? vy(e, n) : gy(e, n)) &&
          ((s = uu(s, "onBeforeInput")),
          0 < s.length &&
            ((c = new ef("onBeforeInput", "beforeinput", null, n, c)),
            p.push({ event: c, listeners: s }),
            (c.data = E)));
    }
    Eh(p, t);
  });
}
function Ii(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function uu(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = Ei(e, n)),
      o != null && r.unshift(Ii(e, o, i)),
      (o = Ei(e, t)),
      o != null && r.push(Ii(e, o, i))),
      (e = e.return);
  }
  return r;
}
function Jn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function pf(e, t, n, r, i) {
  for (var o = t._reactName, u = []; n !== null && n !== r; ) {
    var a = n,
      l = a.alternate,
      s = a.stateNode;
    if (l !== null && l === r) break;
    a.tag === 5 &&
      s !== null &&
      ((a = s),
      i
        ? ((l = Ei(n, o)), l != null && u.unshift(Ii(n, l, a)))
        : i || ((l = Ei(n, o)), l != null && u.push(Ii(n, l, a)))),
      (n = n.return);
  }
  u.length !== 0 && e.push({ event: t, listeners: u });
}
var Ry = /\r\n?/g,
  Ly = /\u0000|\uFFFD/g;
function hf(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Ry,
      `
`
    )
    .replace(Ly, "");
}
function Eo(e, t, n) {
  if (((t = hf(t)), hf(e) !== t && n)) throw Error(M(425));
}
function au() {}
var gl = null,
  yl = null;
function wl(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Sl = typeof setTimeout == "function" ? setTimeout : void 0,
  Dy = typeof clearTimeout == "function" ? clearTimeout : void 0,
  mf = typeof Promise == "function" ? Promise : void 0,
  Fy =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof mf < "u"
      ? function (e) {
          return mf.resolve(null).then(e).catch(_y);
        }
      : Sl;
function _y(e) {
  setTimeout(function () {
    throw e;
  });
}
function Ia(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), bi(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  bi(t);
}
function gn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function vf(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Gr = Math.random().toString(36).slice(2),
  Rt = "__reactFiber$" + Gr,
  Ri = "__reactProps$" + Gr,
  Kt = "__reactContainer$" + Gr,
  Ol = "__reactEvents$" + Gr,
  Ay = "__reactListeners$" + Gr,
  Ny = "__reactHandles$" + Gr;
function In(e) {
  var t = e[Rt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Kt] || n[Rt])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = vf(e); e !== null; ) {
          if ((n = e[Rt])) return n;
          e = vf(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function uo(e) {
  return (
    (e = e[Rt] || e[Kt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function ur(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(M(33));
}
function Xu(e) {
  return e[Ri] || null;
}
var Cl = [],
  ar = -1;
function bn(e) {
  return { current: e };
}
function J(e) {
  0 > ar || ((e.current = Cl[ar]), (Cl[ar] = null), ar--);
}
function Y(e, t) {
  ar++, (Cl[ar] = e.current), (e.current = t);
}
var En = {},
  Re = bn(En),
  Ue = bn(!1),
  Bn = En;
function $r(e, t) {
  var n = e.type.contextTypes;
  if (!n) return En;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function He(e) {
  return (e = e.childContextTypes), e != null;
}
function lu() {
  J(Ue), J(Re);
}
function gf(e, t, n) {
  if (Re.current !== En) throw Error(M(168));
  Y(Re, t), Y(Ue, n);
}
function kh(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function")) return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(M(108, Og(e) || "Unknown", i));
  return ie({}, n, r);
}
function su(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || En),
    (Bn = Re.current),
    Y(Re, e),
    Y(Ue, Ue.current),
    !0
  );
}
function yf(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(M(169));
  n
    ? ((e = kh(e, t, Bn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      J(Ue),
      J(Re),
      Y(Re, e))
    : J(Ue),
    Y(Ue, n);
}
var Vt = null,
  Zu = !1,
  Ra = !1;
function bh(e) {
  Vt === null ? (Vt = [e]) : Vt.push(e);
}
function $y(e) {
  (Zu = !0), bh(e);
}
function xn() {
  if (!Ra && Vt !== null) {
    Ra = !0;
    var e = 0,
      t = W;
    try {
      var n = Vt;
      for (W = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Vt = null), (Zu = !1);
    } catch (i) {
      throw (Vt !== null && (Vt = Vt.slice(e + 1)), Xp(_s, xn), i);
    } finally {
      (W = t), (Ra = !1);
    }
  }
  return null;
}
var lr = [],
  sr = 0,
  cu = null,
  fu = 0,
  lt = [],
  st = 0,
  Qn = null,
  jt = 1,
  Ut = "";
function Mn(e, t) {
  (lr[sr++] = fu), (lr[sr++] = cu), (cu = e), (fu = t);
}
function xh(e, t, n) {
  (lt[st++] = jt), (lt[st++] = Ut), (lt[st++] = Qn), (Qn = e);
  var r = jt;
  e = Ut;
  var i = 32 - wt(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - wt(t) + i;
  if (30 < o) {
    var u = i - (i % 5);
    (o = (r & ((1 << u) - 1)).toString(32)),
      (r >>= u),
      (i -= u),
      (jt = (1 << (32 - wt(t) + i)) | (n << i) | r),
      (Ut = o + e);
  } else (jt = (1 << o) | (n << i) | r), (Ut = e);
}
function Bs(e) {
  e.return !== null && (Mn(e, 1), xh(e, 1, 0));
}
function Qs(e) {
  for (; e === cu; ) (cu = lr[--sr]), (lr[sr] = null), (fu = lr[--sr]), (lr[sr] = null);
  for (; e === Qn; )
    (Qn = lt[--st]),
      (lt[st] = null),
      (Ut = lt[--st]),
      (lt[st] = null),
      (jt = lt[--st]),
      (lt[st] = null);
}
var Ye = null,
  qe = null,
  ee = !1,
  yt = null;
function Mh(e, t) {
  var n = ct(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function wf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (Ye = e), (qe = gn(t.firstChild)), !0) : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ye = e), (qe = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Qn !== null ? { id: jt, overflow: Ut } : null),
            (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
            (n = ct(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ye = e),
            (qe = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function El(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Pl(e) {
  if (ee) {
    var t = qe;
    if (t) {
      var n = t;
      if (!wf(e, t)) {
        if (El(e)) throw Error(M(418));
        t = gn(n.nextSibling);
        var r = Ye;
        t && wf(e, t) ? Mh(r, n) : ((e.flags = (e.flags & -4097) | 2), (ee = !1), (Ye = e));
      }
    } else {
      if (El(e)) throw Error(M(418));
      (e.flags = (e.flags & -4097) | 2), (ee = !1), (Ye = e);
    }
  }
}
function Sf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ye = e;
}
function Po(e) {
  if (e !== Ye) return !1;
  if (!ee) return Sf(e), (ee = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type), (t = t !== "head" && t !== "body" && !wl(e.type, e.memoizedProps))),
    t && (t = qe))
  ) {
    if (El(e)) throw (Th(), Error(M(418)));
    for (; t; ) Mh(e, t), (t = gn(t.nextSibling));
  }
  if ((Sf(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(M(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              qe = gn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      qe = null;
    }
  } else qe = Ye ? gn(e.stateNode.nextSibling) : null;
  return !0;
}
function Th() {
  for (var e = qe; e; ) e = gn(e.nextSibling);
}
function Vr() {
  (qe = Ye = null), (ee = !1);
}
function Ws(e) {
  yt === null ? (yt = [e]) : yt.push(e);
}
var Vy = Yt.ReactCurrentBatchConfig;
function mt(e, t) {
  if (e && e.defaultProps) {
    (t = ie({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var du = bn(null),
  pu = null,
  cr = null,
  Ks = null;
function Gs() {
  Ks = cr = pu = null;
}
function qs(e) {
  var t = du.current;
  J(du), (e._currentValue = t);
}
function kl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function yr(e, t) {
  (pu = e),
    (Ks = cr = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (je = !0), (e.firstContext = null));
}
function dt(e) {
  var t = e._currentValue;
  if (Ks !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), cr === null)) {
      if (pu === null) throw Error(M(308));
      (cr = e), (pu.dependencies = { lanes: 0, firstContext: e });
    } else cr = cr.next = e;
  return t;
}
var Rn = null;
function Ys(e) {
  Rn === null ? (Rn = [e]) : Rn.push(e);
}
function Ih(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Ys(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Gt(e, r)
  );
}
function Gt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var tn = !1;
function Xs(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Rh(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Ht(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function yn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), H & 2)) {
    var i = r.pending;
    return i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)), (r.pending = t), Gt(e, n);
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Ys(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Gt(e, n)
  );
}
function jo(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), As(e, n);
  }
}
function Of(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var u = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = u) : (o = o.next = u), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function hu(e, t, n, r) {
  var i = e.updateQueue;
  tn = !1;
  var o = i.firstBaseUpdate,
    u = i.lastBaseUpdate,
    a = i.shared.pending;
  if (a !== null) {
    i.shared.pending = null;
    var l = a,
      s = l.next;
    (l.next = null), u === null ? (o = s) : (u.next = s), (u = l);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (a = c.lastBaseUpdate),
      a !== u && (a === null ? (c.firstBaseUpdate = s) : (a.next = s), (c.lastBaseUpdate = l)));
  }
  if (o !== null) {
    var p = i.baseState;
    (u = 0), (c = s = l = null), (a = o);
    do {
      var h = a.lane,
        v = a.eventTime;
      if ((r & h) === h) {
        c !== null &&
          (c = c.next =
            {
              eventTime: v,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var y = e,
            g = a;
          switch (((h = t), (v = n), g.tag)) {
            case 1:
              if (((y = g.payload), typeof y == "function")) {
                p = y.call(v, p, h);
                break e;
              }
              p = y;
              break e;
            case 3:
              y.flags = (y.flags & -65537) | 128;
            case 0:
              if (((y = g.payload), (h = typeof y == "function" ? y.call(v, p, h) : y), h == null))
                break e;
              p = ie({}, p, h);
              break e;
            case 2:
              tn = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64), (h = i.effects), h === null ? (i.effects = [a]) : h.push(a));
      } else
        (v = {
          eventTime: v,
          lane: h,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          c === null ? ((s = c = v), (l = p)) : (c = c.next = v),
          (u |= h);
      if (((a = a.next), a === null)) {
        if (((a = i.shared.pending), a === null)) break;
        (h = a), (a = h.next), (h.next = null), (i.lastBaseUpdate = h), (i.shared.pending = null);
      }
    } while (!0);
    if (
      (c === null && (l = p),
      (i.baseState = l),
      (i.firstBaseUpdate = s),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (u |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (Kn |= u), (e.lanes = u), (e.memoizedState = p);
  }
}
function Cf(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function")) throw Error(M(191, i));
        i.call(r);
      }
    }
}
var Lh = new Ip.Component().refs;
function bl(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ie({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ju = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Zn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = _e(),
      i = Sn(e),
      o = Ht(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = yn(e, o, i)),
      t !== null && (St(t, e, i, r), jo(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = _e(),
      i = Sn(e),
      o = Ht(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = yn(e, o, i)),
      t !== null && (St(t, e, i, r), jo(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = _e(),
      r = Sn(e),
      i = Ht(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = yn(e, i, r)),
      t !== null && (St(t, e, r, n), jo(t, e, r));
  },
};
function Ef(e, t, n, r, i, o, u) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, u)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Mi(n, r) || !Mi(i, o)
      : !0
  );
}
function Dh(e, t, n) {
  var r = !1,
    i = En,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = dt(o))
      : ((i = He(t) ? Bn : Re.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? $r(e, i) : En)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ju),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Pf(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ju.enqueueReplaceState(t, t.state, null);
}
function xl(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = Lh), Xs(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (i.context = dt(o))
    : ((o = He(t) ? Bn : Re.current), (i.context = $r(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (bl(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(),
      t !== i.state && Ju.enqueueReplaceState(i, i.state, null),
      hu(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function ti(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(M(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(M(147, e));
      var i = r,
        o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o
        ? t.ref
        : ((t = function (u) {
            var a = i.refs;
            a === Lh && (a = i.refs = {}), u === null ? delete a[o] : (a[o] = u);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(M(284));
    if (!n._owner) throw Error(M(290, e));
  }
  return e;
}
function ko(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      M(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)
    ))
  );
}
function kf(e) {
  var t = e._init;
  return t(e._payload);
}
function Fh(e) {
  function t(f, d) {
    if (e) {
      var m = f.deletions;
      m === null ? ((f.deletions = [d]), (f.flags |= 16)) : m.push(d);
    }
  }
  function n(f, d) {
    if (!e) return null;
    for (; d !== null; ) t(f, d), (d = d.sibling);
    return null;
  }
  function r(f, d) {
    for (f = new Map(); d !== null; )
      d.key !== null ? f.set(d.key, d) : f.set(d.index, d), (d = d.sibling);
    return f;
  }
  function i(f, d) {
    return (f = On(f, d)), (f.index = 0), (f.sibling = null), f;
  }
  function o(f, d, m) {
    return (
      (f.index = m),
      e
        ? ((m = f.alternate),
          m !== null ? ((m = m.index), m < d ? ((f.flags |= 2), d) : m) : ((f.flags |= 2), d))
        : ((f.flags |= 1048576), d)
    );
  }
  function u(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function a(f, d, m, C) {
    return d === null || d.tag !== 6
      ? ((d = $a(m, f.mode, C)), (d.return = f), d)
      : ((d = i(d, m)), (d.return = f), d);
  }
  function l(f, d, m, C) {
    var P = m.type;
    return P === nr
      ? c(f, d, m.props.children, C, m.key)
      : d !== null &&
        (d.elementType === P ||
          (typeof P == "object" && P !== null && P.$$typeof === en && kf(P) === d.type))
      ? ((C = i(d, m.props)), (C.ref = ti(f, d, m)), (C.return = f), C)
      : ((C = Ko(m.type, m.key, m.props, null, f.mode, C)),
        (C.ref = ti(f, d, m)),
        (C.return = f),
        C);
  }
  function s(f, d, m, C) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== m.containerInfo ||
      d.stateNode.implementation !== m.implementation
      ? ((d = Va(m, f.mode, C)), (d.return = f), d)
      : ((d = i(d, m.children || [])), (d.return = f), d);
  }
  function c(f, d, m, C, P) {
    return d === null || d.tag !== 7
      ? ((d = Un(m, f.mode, C, P)), (d.return = f), d)
      : ((d = i(d, m)), (d.return = f), d);
  }
  function p(f, d, m) {
    if ((typeof d == "string" && d !== "") || typeof d == "number")
      return (d = $a("" + d, f.mode, m)), (d.return = f), d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ho:
          return (
            (m = Ko(d.type, d.key, d.props, null, f.mode, m)),
            (m.ref = ti(f, null, d)),
            (m.return = f),
            m
          );
        case tr:
          return (d = Va(d, f.mode, m)), (d.return = f), d;
        case en:
          var C = d._init;
          return p(f, C(d._payload), m);
      }
      if (ai(d) || Yr(d)) return (d = Un(d, f.mode, m, null)), (d.return = f), d;
      ko(f, d);
    }
    return null;
  }
  function h(f, d, m, C) {
    var P = d !== null ? d.key : null;
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return P !== null ? null : a(f, d, "" + m, C);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case ho:
          return m.key === P ? l(f, d, m, C) : null;
        case tr:
          return m.key === P ? s(f, d, m, C) : null;
        case en:
          return (P = m._init), h(f, d, P(m._payload), C);
      }
      if (ai(m) || Yr(m)) return P !== null ? null : c(f, d, m, C, null);
      ko(f, m);
    }
    return null;
  }
  function v(f, d, m, C, P) {
    if ((typeof C == "string" && C !== "") || typeof C == "number")
      return (f = f.get(m) || null), a(d, f, "" + C, P);
    if (typeof C == "object" && C !== null) {
      switch (C.$$typeof) {
        case ho:
          return (f = f.get(C.key === null ? m : C.key) || null), l(d, f, C, P);
        case tr:
          return (f = f.get(C.key === null ? m : C.key) || null), s(d, f, C, P);
        case en:
          var b = C._init;
          return v(f, d, m, b(C._payload), P);
      }
      if (ai(C) || Yr(C)) return (f = f.get(m) || null), c(d, f, C, P, null);
      ko(d, C);
    }
    return null;
  }
  function y(f, d, m, C) {
    for (var P = null, b = null, E = d, k = (d = 0), D = null; E !== null && k < m.length; k++) {
      E.index > k ? ((D = E), (E = null)) : (D = E.sibling);
      var _ = h(f, E, m[k], C);
      if (_ === null) {
        E === null && (E = D);
        break;
      }
      e && E && _.alternate === null && t(f, E),
        (d = o(_, d, k)),
        b === null ? (P = _) : (b.sibling = _),
        (b = _),
        (E = D);
    }
    if (k === m.length) return n(f, E), ee && Mn(f, k), P;
    if (E === null) {
      for (; k < m.length; k++)
        (E = p(f, m[k], C)),
          E !== null && ((d = o(E, d, k)), b === null ? (P = E) : (b.sibling = E), (b = E));
      return ee && Mn(f, k), P;
    }
    for (E = r(f, E); k < m.length; k++)
      (D = v(E, f, k, m[k], C)),
        D !== null &&
          (e && D.alternate !== null && E.delete(D.key === null ? k : D.key),
          (d = o(D, d, k)),
          b === null ? (P = D) : (b.sibling = D),
          (b = D));
    return (
      e &&
        E.forEach(function (G) {
          return t(f, G);
        }),
      ee && Mn(f, k),
      P
    );
  }
  function g(f, d, m, C) {
    var P = Yr(m);
    if (typeof P != "function") throw Error(M(150));
    if (((m = P.call(m)), m == null)) throw Error(M(151));
    for (
      var b = (P = null), E = d, k = (d = 0), D = null, _ = m.next();
      E !== null && !_.done;
      k++, _ = m.next()
    ) {
      E.index > k ? ((D = E), (E = null)) : (D = E.sibling);
      var G = h(f, E, _.value, C);
      if (G === null) {
        E === null && (E = D);
        break;
      }
      e && E && G.alternate === null && t(f, E),
        (d = o(G, d, k)),
        b === null ? (P = G) : (b.sibling = G),
        (b = G),
        (E = D);
    }
    if (_.done) return n(f, E), ee && Mn(f, k), P;
    if (E === null) {
      for (; !_.done; k++, _ = m.next())
        (_ = p(f, _.value, C)),
          _ !== null && ((d = o(_, d, k)), b === null ? (P = _) : (b.sibling = _), (b = _));
      return ee && Mn(f, k), P;
    }
    for (E = r(f, E); !_.done; k++, _ = m.next())
      (_ = v(E, f, k, _.value, C)),
        _ !== null &&
          (e && _.alternate !== null && E.delete(_.key === null ? k : _.key),
          (d = o(_, d, k)),
          b === null ? (P = _) : (b.sibling = _),
          (b = _));
    return (
      e &&
        E.forEach(function (oe) {
          return t(f, oe);
        }),
      ee && Mn(f, k),
      P
    );
  }
  function O(f, d, m, C) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === nr &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case ho:
          e: {
            for (var P = m.key, b = d; b !== null; ) {
              if (b.key === P) {
                if (((P = m.type), P === nr)) {
                  if (b.tag === 7) {
                    n(f, b.sibling), (d = i(b, m.props.children)), (d.return = f), (f = d);
                    break e;
                  }
                } else if (
                  b.elementType === P ||
                  (typeof P == "object" && P !== null && P.$$typeof === en && kf(P) === b.type)
                ) {
                  n(f, b.sibling),
                    (d = i(b, m.props)),
                    (d.ref = ti(f, b, m)),
                    (d.return = f),
                    (f = d);
                  break e;
                }
                n(f, b);
                break;
              } else t(f, b);
              b = b.sibling;
            }
            m.type === nr
              ? ((d = Un(m.props.children, f.mode, C, m.key)), (d.return = f), (f = d))
              : ((C = Ko(m.type, m.key, m.props, null, f.mode, C)),
                (C.ref = ti(f, d, m)),
                (C.return = f),
                (f = C));
          }
          return u(f);
        case tr:
          e: {
            for (b = m.key; d !== null; ) {
              if (d.key === b)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === m.containerInfo &&
                  d.stateNode.implementation === m.implementation
                ) {
                  n(f, d.sibling), (d = i(d, m.children || [])), (d.return = f), (f = d);
                  break e;
                } else {
                  n(f, d);
                  break;
                }
              else t(f, d);
              d = d.sibling;
            }
            (d = Va(m, f.mode, C)), (d.return = f), (f = d);
          }
          return u(f);
        case en:
          return (b = m._init), O(f, d, b(m._payload), C);
      }
      if (ai(m)) return y(f, d, m, C);
      if (Yr(m)) return g(f, d, m, C);
      ko(f, m);
    }
    return (typeof m == "string" && m !== "") || typeof m == "number"
      ? ((m = "" + m),
        d !== null && d.tag === 6
          ? (n(f, d.sibling), (d = i(d, m)), (d.return = f), (f = d))
          : (n(f, d), (d = $a(m, f.mode, C)), (d.return = f), (f = d)),
        u(f))
      : n(f, d);
  }
  return O;
}
var zr = Fh(!0),
  _h = Fh(!1),
  ao = {},
  Ft = bn(ao),
  Li = bn(ao),
  Di = bn(ao);
function Ln(e) {
  if (e === ao) throw Error(M(174));
  return e;
}
function Zs(e, t) {
  switch ((Y(Di, t), Y(Li, e), Y(Ft, ao), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ol(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = ol(t, e));
  }
  J(Ft), Y(Ft, t);
}
function jr() {
  J(Ft), J(Li), J(Di);
}
function Ah(e) {
  Ln(Di.current);
  var t = Ln(Ft.current),
    n = ol(t, e.type);
  t !== n && (Y(Li, e), Y(Ft, n));
}
function Js(e) {
  Li.current === e && (J(Ft), J(Li));
}
var ne = bn(0);
function mu(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!"))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var La = [];
function ec() {
  for (var e = 0; e < La.length; e++) La[e]._workInProgressVersionPrimary = null;
  La.length = 0;
}
var Uo = Yt.ReactCurrentDispatcher,
  Da = Yt.ReactCurrentBatchConfig,
  Wn = 0,
  re = null,
  he = null,
  ye = null,
  vu = !1,
  gi = !1,
  Fi = 0,
  zy = 0;
function xe() {
  throw Error(M(321));
}
function tc(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ct(e[n], t[n])) return !1;
  return !0;
}
function nc(e, t, n, r, i, o) {
  if (
    ((Wn = o),
    (re = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Uo.current = e === null || e.memoizedState === null ? By : Qy),
    (e = n(r, i)),
    gi)
  ) {
    o = 0;
    do {
      if (((gi = !1), (Fi = 0), 25 <= o)) throw Error(M(301));
      (o += 1), (ye = he = null), (t.updateQueue = null), (Uo.current = Wy), (e = n(r, i));
    } while (gi);
  }
  if (
    ((Uo.current = gu),
    (t = he !== null && he.next !== null),
    (Wn = 0),
    (ye = he = re = null),
    (vu = !1),
    t)
  )
    throw Error(M(300));
  return e;
}
function rc() {
  var e = Fi !== 0;
  return (Fi = 0), e;
}
function Pt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ye === null ? (re.memoizedState = ye = e) : (ye = ye.next = e), ye;
}
function pt() {
  if (he === null) {
    var e = re.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = he.next;
  var t = ye === null ? re.memoizedState : ye.next;
  if (t !== null) (ye = t), (he = e);
  else {
    if (e === null) throw Error(M(310));
    (he = e),
      (e = {
        memoizedState: he.memoizedState,
        baseState: he.baseState,
        baseQueue: he.baseQueue,
        queue: he.queue,
        next: null,
      }),
      ye === null ? (re.memoizedState = ye = e) : (ye = ye.next = e);
  }
  return ye;
}
function _i(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Fa(e) {
  var t = pt(),
    n = t.queue;
  if (n === null) throw Error(M(311));
  n.lastRenderedReducer = e;
  var r = he,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var u = i.next;
      (i.next = o.next), (o.next = u);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var a = (u = null),
      l = null,
      s = o;
    do {
      var c = s.lane;
      if ((Wn & c) === c)
        l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null,
            }),
          (r = s.hasEagerState ? s.eagerState : e(r, s.action));
      else {
        var p = {
          lane: c,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null,
        };
        l === null ? ((a = l = p), (u = r)) : (l = l.next = p), (re.lanes |= c), (Kn |= c);
      }
      s = s.next;
    } while (s !== null && s !== o);
    l === null ? (u = r) : (l.next = a),
      Ct(r, t.memoizedState) || (je = !0),
      (t.memoizedState = r),
      (t.baseState = u),
      (t.baseQueue = l),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (re.lanes |= o), (Kn |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function _a(e) {
  var t = pt(),
    n = t.queue;
  if (n === null) throw Error(M(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var u = (i = i.next);
    do (o = e(o, u.action)), (u = u.next);
    while (u !== i);
    Ct(o, t.memoizedState) || (je = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function Nh() {}
function $h(e, t) {
  var n = re,
    r = pt(),
    i = t(),
    o = !Ct(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (je = !0)),
    (r = r.queue),
    ic(jh.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (ye !== null && ye.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), Ai(9, zh.bind(null, n, r, i, t), void 0, null), Se === null))
      throw Error(M(349));
    Wn & 30 || Vh(n, t, i);
  }
  return i;
}
function Vh(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = re.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (re.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function zh(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Uh(t) && Hh(e);
}
function jh(e, t, n) {
  return n(function () {
    Uh(t) && Hh(e);
  });
}
function Uh(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ct(e, n);
  } catch {
    return !0;
  }
}
function Hh(e) {
  var t = Gt(e, 1);
  t !== null && St(t, e, 1, -1);
}
function bf(e) {
  var t = Pt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _i,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Hy.bind(null, re, e)),
    [t.memoizedState, e]
  );
}
function Ai(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = re.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (re.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Bh() {
  return pt().memoizedState;
}
function Ho(e, t, n, r) {
  var i = Pt();
  (re.flags |= e), (i.memoizedState = Ai(1 | t, n, void 0, r === void 0 ? null : r));
}
function ea(e, t, n, r) {
  var i = pt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (he !== null) {
    var u = he.memoizedState;
    if (((o = u.destroy), r !== null && tc(r, u.deps))) {
      i.memoizedState = Ai(t, n, o, r);
      return;
    }
  }
  (re.flags |= e), (i.memoizedState = Ai(1 | t, n, o, r));
}
function xf(e, t) {
  return Ho(8390656, 8, e, t);
}
function ic(e, t) {
  return ea(2048, 8, e, t);
}
function Qh(e, t) {
  return ea(4, 2, e, t);
}
function Wh(e, t) {
  return ea(4, 4, e, t);
}
function Kh(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Gh(e, t, n) {
  return (n = n != null ? n.concat([e]) : null), ea(4, 4, Kh.bind(null, t, e), n);
}
function oc() {}
function qh(e, t) {
  var n = pt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && tc(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function Yh(e, t) {
  var n = pt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && tc(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Xh(e, t, n) {
  return Wn & 21
    ? (Ct(n, t) || ((n = eh()), (re.lanes |= n), (Kn |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (je = !0)), (e.memoizedState = n));
}
function jy(e, t) {
  var n = W;
  (W = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Da.transition;
  Da.transition = {};
  try {
    e(!1), t();
  } finally {
    (W = n), (Da.transition = r);
  }
}
function Zh() {
  return pt().memoizedState;
}
function Uy(e, t, n) {
  var r = Sn(e);
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Jh(e)))
    em(t, n);
  else if (((n = Ih(e, t, n, r)), n !== null)) {
    var i = _e();
    St(n, e, r, i), tm(n, t, r);
  }
}
function Hy(e, t, n) {
  var r = Sn(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Jh(e)) em(t, i);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && ((o = t.lastRenderedReducer), o !== null))
      try {
        var u = t.lastRenderedState,
          a = o(u, n);
        if (((i.hasEagerState = !0), (i.eagerState = a), Ct(a, u))) {
          var l = t.interleaved;
          l === null ? ((i.next = i), Ys(t)) : ((i.next = l.next), (l.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = Ih(e, t, i, r)), n !== null && ((i = _e()), St(n, e, r, i), tm(n, t, r));
  }
}
function Jh(e) {
  var t = e.alternate;
  return e === re || (t !== null && t === re);
}
function em(e, t) {
  gi = vu = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
}
function tm(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), As(e, n);
  }
}
var gu = {
    readContext: dt,
    useCallback: xe,
    useContext: xe,
    useEffect: xe,
    useImperativeHandle: xe,
    useInsertionEffect: xe,
    useLayoutEffect: xe,
    useMemo: xe,
    useReducer: xe,
    useRef: xe,
    useState: xe,
    useDebugValue: xe,
    useDeferredValue: xe,
    useTransition: xe,
    useMutableSource: xe,
    useSyncExternalStore: xe,
    useId: xe,
    unstable_isNewReconciler: !1,
  },
  By = {
    readContext: dt,
    useCallback: function (e, t) {
      return (Pt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: dt,
    useEffect: xf,
    useImperativeHandle: function (e, t, n) {
      return (n = n != null ? n.concat([e]) : null), Ho(4194308, 4, Kh.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return Ho(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ho(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Pt();
      return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
    },
    useReducer: function (e, t, n) {
      var r = Pt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Uy.bind(null, re, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Pt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: bf,
    useDebugValue: oc,
    useDeferredValue: function (e) {
      return (Pt().memoizedState = e);
    },
    useTransition: function () {
      var e = bf(!1),
        t = e[0];
      return (e = jy.bind(null, e[1])), (Pt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = re,
        i = Pt();
      if (ee) {
        if (n === void 0) throw Error(M(407));
        n = n();
      } else {
        if (((n = t()), Se === null)) throw Error(M(349));
        Wn & 30 || Vh(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        xf(jh.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Ai(9, zh.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Pt(),
        t = Se.identifierPrefix;
      if (ee) {
        var n = Ut,
          r = jt;
        (n = (r & ~(1 << (32 - wt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Fi++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = zy++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Qy = {
    readContext: dt,
    useCallback: qh,
    useContext: dt,
    useEffect: ic,
    useImperativeHandle: Gh,
    useInsertionEffect: Qh,
    useLayoutEffect: Wh,
    useMemo: Yh,
    useReducer: Fa,
    useRef: Bh,
    useState: function () {
      return Fa(_i);
    },
    useDebugValue: oc,
    useDeferredValue: function (e) {
      var t = pt();
      return Xh(t, he.memoizedState, e);
    },
    useTransition: function () {
      var e = Fa(_i)[0],
        t = pt().memoizedState;
      return [e, t];
    },
    useMutableSource: Nh,
    useSyncExternalStore: $h,
    useId: Zh,
    unstable_isNewReconciler: !1,
  },
  Wy = {
    readContext: dt,
    useCallback: qh,
    useContext: dt,
    useEffect: ic,
    useImperativeHandle: Gh,
    useInsertionEffect: Qh,
    useLayoutEffect: Wh,
    useMemo: Yh,
    useReducer: _a,
    useRef: Bh,
    useState: function () {
      return _a(_i);
    },
    useDebugValue: oc,
    useDeferredValue: function (e) {
      var t = pt();
      return he === null ? (t.memoizedState = e) : Xh(t, he.memoizedState, e);
    },
    useTransition: function () {
      var e = _a(_i)[0],
        t = pt().memoizedState;
      return [e, t];
    },
    useMutableSource: Nh,
    useSyncExternalStore: $h,
    useId: Zh,
    unstable_isNewReconciler: !1,
  };
function Ur(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Sg(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function Aa(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ml(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Ky = typeof WeakMap == "function" ? WeakMap : Map;
function nm(e, t, n) {
  (n = Ht(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      wu || ((wu = !0), ($l = r)), Ml(e, t);
    }),
    n
  );
}
function rm(e, t, n) {
  (n = Ht(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        Ml(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Ml(e, t), typeof r != "function" && (wn === null ? (wn = new Set([this])) : wn.add(this));
        var u = t.stack;
        this.componentDidCatch(t.value, { componentStack: u !== null ? u : "" });
      }),
    n
  );
}
function Mf(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ky();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = a0.bind(null, e, t, n)), t.then(e, e));
}
function Tf(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function If(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null ? (n.tag = 17) : ((t = Ht(-1, 1)), (t.tag = 2), yn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Gy = Yt.ReactCurrentOwner,
  je = !1;
function Fe(e, t, n, r) {
  t.child = e === null ? _h(t, null, n, r) : zr(t, e.child, n, r);
}
function Rf(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    yr(t, i),
    (r = nc(e, t, n, r, o, i)),
    (n = rc()),
    e !== null && !je
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), qt(e, t, i))
      : (ee && n && Bs(t), (t.flags |= 1), Fe(e, t, r, i), t.child)
  );
}
function Lf(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !pc(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), im(e, t, o, r, i))
      : ((e = Ko(n.type, null, r, t, t.mode, i)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var u = o.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : Mi), n(u, r) && e.ref === t.ref))
      return qt(e, t, i);
  }
  return (t.flags |= 1), (e = On(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e);
}
function im(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Mi(o, r) && e.ref === t.ref)
      if (((je = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0)) e.flags & 131072 && (je = !0);
      else return (t.lanes = e.lanes), qt(e, t, i);
  }
  return Tl(e, t, n, r, i);
}
function om(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Y(dr, Ge),
        (Ge |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          Y(dr, Ge),
          (Ge |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        Y(dr, Ge),
        (Ge |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n), Y(dr, Ge), (Ge |= r);
  return Fe(e, t, i, n), t.child;
}
function um(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Tl(e, t, n, r, i) {
  var o = He(n) ? Bn : Re.current;
  return (
    (o = $r(t, o)),
    yr(t, i),
    (n = nc(e, t, n, r, o, i)),
    (r = rc()),
    e !== null && !je
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), qt(e, t, i))
      : (ee && r && Bs(t), (t.flags |= 1), Fe(e, t, n, i), t.child)
  );
}
function Df(e, t, n, r, i) {
  if (He(n)) {
    var o = !0;
    su(t);
  } else o = !1;
  if ((yr(t, i), t.stateNode === null)) Bo(e, t), Dh(t, n, r), xl(t, n, r, i), (r = !0);
  else if (e === null) {
    var u = t.stateNode,
      a = t.memoizedProps;
    u.props = a;
    var l = u.context,
      s = n.contextType;
    typeof s == "object" && s !== null
      ? (s = dt(s))
      : ((s = He(n) ? Bn : Re.current), (s = $r(t, s)));
    var c = n.getDerivedStateFromProps,
      p = typeof c == "function" || typeof u.getSnapshotBeforeUpdate == "function";
    p ||
      (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
        typeof u.componentWillReceiveProps != "function") ||
      ((a !== r || l !== s) && Pf(t, u, r, s)),
      (tn = !1);
    var h = t.memoizedState;
    (u.state = h),
      hu(t, r, u, i),
      (l = t.memoizedState),
      a !== r || h !== l || Ue.current || tn
        ? (typeof c == "function" && (bl(t, n, c, r), (l = t.memoizedState)),
          (a = tn || Ef(t, n, a, r, h, l, s))
            ? (p ||
                (typeof u.UNSAFE_componentWillMount != "function" &&
                  typeof u.componentWillMount != "function") ||
                (typeof u.componentWillMount == "function" && u.componentWillMount(),
                typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()),
              typeof u.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (u.props = r),
          (u.state = l),
          (u.context = s),
          (r = a))
        : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), (r = !1));
  } else {
    (u = t.stateNode),
      Rh(e, t),
      (a = t.memoizedProps),
      (s = t.type === t.elementType ? a : mt(t.type, a)),
      (u.props = s),
      (p = t.pendingProps),
      (h = u.context),
      (l = n.contextType),
      typeof l == "object" && l !== null
        ? (l = dt(l))
        : ((l = He(n) ? Bn : Re.current), (l = $r(t, l)));
    var v = n.getDerivedStateFromProps;
    (c = typeof v == "function" || typeof u.getSnapshotBeforeUpdate == "function") ||
      (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
        typeof u.componentWillReceiveProps != "function") ||
      ((a !== p || h !== l) && Pf(t, u, r, l)),
      (tn = !1),
      (h = t.memoizedState),
      (u.state = h),
      hu(t, r, u, i);
    var y = t.memoizedState;
    a !== p || h !== y || Ue.current || tn
      ? (typeof v == "function" && (bl(t, n, v, r), (y = t.memoizedState)),
        (s = tn || Ef(t, n, s, r, h, y, l) || !1)
          ? (c ||
              (typeof u.UNSAFE_componentWillUpdate != "function" &&
                typeof u.componentWillUpdate != "function") ||
              (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, y, l),
              typeof u.UNSAFE_componentWillUpdate == "function" &&
                u.UNSAFE_componentWillUpdate(r, y, l)),
            typeof u.componentDidUpdate == "function" && (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof u.componentDidUpdate != "function" ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = y)),
        (u.props = r),
        (u.state = y),
        (u.context = l),
        (r = s))
      : (typeof u.componentDidUpdate != "function" ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof u.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Il(e, t, n, r, o, i);
}
function Il(e, t, n, r, i, o) {
  um(e, t);
  var u = (t.flags & 128) !== 0;
  if (!r && !u) return i && yf(t, n, !1), qt(e, t, o);
  (r = t.stateNode), (Gy.current = t);
  var a = u && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && u
      ? ((t.child = zr(t, e.child, null, o)), (t.child = zr(t, null, a, o)))
      : Fe(e, t, a, o),
    (t.memoizedState = r.state),
    i && yf(t, n, !0),
    t.child
  );
}
function am(e) {
  var t = e.stateNode;
  t.pendingContext
    ? gf(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && gf(e, t.context, !1),
    Zs(e, t.containerInfo);
}
function Ff(e, t, n, r, i) {
  return Vr(), Ws(i), (t.flags |= 256), Fe(e, t, n, r), t.child;
}
var Rl = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ll(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function lm(e, t, n) {
  var r = t.pendingProps,
    i = ne.current,
    o = !1,
    u = (t.flags & 128) !== 0,
    a;
  if (
    ((a = u) || (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a ? ((o = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (i |= 1),
    Y(ne, i & 1),
    e === null)
  )
    return (
      Pl(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1 ? (e.data === "$!" ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1),
          null)
        : ((u = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (u = { mode: "hidden", children: u }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = u))
                : (o = ra(u, r, 0, null)),
              (e = Un(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Ll(n)),
              (t.memoizedState = Rl),
              e)
            : uc(t, u))
    );
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return qy(e, t, u, r, a, i, n);
  if (o) {
    (o = r.fallback), (u = t.mode), (i = e.child), (a = i.sibling);
    var l = { mode: "hidden", children: r.children };
    return (
      !(u & 1) && t.child !== i
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = l), (t.deletions = null))
        : ((r = On(i, l)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (o = On(a, o)) : ((o = Un(o, u, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (u = e.child.memoizedState),
      (u =
        u === null
          ? Ll(n)
          : { baseLanes: u.baseLanes | n, cachePool: null, transitions: u.transitions }),
      (o.memoizedState = u),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Rl),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = On(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function uc(e, t) {
  return (t = ra({ mode: "visible", children: t }, e.mode, 0, null)), (t.return = e), (e.child = t);
}
function bo(e, t, n, r) {
  return (
    r !== null && Ws(r),
    zr(t, e.child, null, n),
    (e = uc(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function qy(e, t, n, r, i, o, u) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Aa(Error(M(422)))), bo(e, t, u, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (i = t.mode),
        (r = ra({ mode: "visible", children: r.children }, i, 0, null)),
        (o = Un(o, i, u, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && zr(t, e.child, null, u),
        (t.child.memoizedState = Ll(u)),
        (t.memoizedState = Rl),
        o);
  if (!(t.mode & 1)) return bo(e, t, u, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (o = Error(M(419))), (r = Aa(o, r, void 0)), bo(e, t, u, r);
  }
  if (((a = (u & e.childLanes) !== 0), je || a)) {
    if (((r = Se), r !== null)) {
      switch (u & -u) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | u) ? 0 : i),
        i !== 0 && i !== o.retryLane && ((o.retryLane = i), Gt(e, i), St(r, e, i, -1));
    }
    return dc(), (r = Aa(Error(M(421)))), bo(e, t, u, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128), (t.child = e.child), (t = l0.bind(null, e)), (i._reactRetry = t), null)
    : ((e = o.treeContext),
      (qe = gn(i.nextSibling)),
      (Ye = t),
      (ee = !0),
      (yt = null),
      e !== null &&
        ((lt[st++] = jt),
        (lt[st++] = Ut),
        (lt[st++] = Qn),
        (jt = e.id),
        (Ut = e.overflow),
        (Qn = t)),
      (t = uc(t, r.children)),
      (t.flags |= 4096),
      t);
}
function _f(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), kl(e.return, t, n);
}
function Na(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function sm(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((Fe(e, t, r.children, n), (r = ne.current), r & 2)) (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && _f(e, n, t);
        else if (e.tag === 19) _f(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Y(ne, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate), e !== null && mu(e) === null && (i = n), (n = n.sibling);
        (n = i),
          n === null ? ((i = t.child), (t.child = null)) : ((i = n.sibling), (n.sibling = null)),
          Na(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && mu(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Na(t, !0, n, null, o);
        break;
      case "together":
        Na(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Bo(e, t) {
  !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function qt(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (Kn |= t.lanes), !(n & t.childLanes)))
    return null;
  if (e !== null && t.child !== e.child) throw Error(M(153));
  if (t.child !== null) {
    for (e = t.child, n = On(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      (e = e.sibling), (n = n.sibling = On(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Yy(e, t, n) {
  switch (t.tag) {
    case 3:
      am(t), Vr();
      break;
    case 5:
      Ah(t);
      break;
    case 1:
      He(t.type) && su(t);
      break;
    case 4:
      Zs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      Y(du, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Y(ne, ne.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? lm(e, t, n)
          : (Y(ne, ne.current & 1), (e = qt(e, t, n)), e !== null ? e.sibling : null);
      Y(ne, ne.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return sm(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        Y(ne, ne.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), om(e, t, n);
  }
  return qt(e, t, n);
}
var cm, Dl, fm, dm;
cm = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Dl = function () {};
fm = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), Ln(Ft.current);
    var o = null;
    switch (n) {
      case "input":
        (i = tl(e, i)), (r = tl(e, r)), (o = []);
        break;
      case "select":
        (i = ie({}, i, { value: void 0 })), (r = ie({}, r, { value: void 0 })), (o = []);
        break;
      case "textarea":
        (i = il(e, i)), (r = il(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = au);
    }
    ul(n, r);
    var u;
    n = null;
    for (s in i)
      if (!r.hasOwnProperty(s) && i.hasOwnProperty(s) && i[s] != null)
        if (s === "style") {
          var a = i[s];
          for (u in a) a.hasOwnProperty(u) && (n || (n = {}), (n[u] = ""));
        } else
          s !== "dangerouslySetInnerHTML" &&
            s !== "children" &&
            s !== "suppressContentEditableWarning" &&
            s !== "suppressHydrationWarning" &&
            s !== "autoFocus" &&
            (Oi.hasOwnProperty(s) ? o || (o = []) : (o = o || []).push(s, null));
    for (s in r) {
      var l = r[s];
      if (
        ((a = i != null ? i[s] : void 0),
        r.hasOwnProperty(s) && l !== a && (l != null || a != null))
      )
        if (s === "style")
          if (a) {
            for (u in a)
              !a.hasOwnProperty(u) || (l && l.hasOwnProperty(u)) || (n || (n = {}), (n[u] = ""));
            for (u in l) l.hasOwnProperty(u) && a[u] !== l[u] && (n || (n = {}), (n[u] = l[u]));
          } else n || (o || (o = []), o.push(s, n)), (n = l);
        else
          s === "dangerouslySetInnerHTML"
            ? ((l = l ? l.__html : void 0),
              (a = a ? a.__html : void 0),
              l != null && a !== l && (o = o || []).push(s, l))
            : s === "children"
            ? (typeof l != "string" && typeof l != "number") || (o = o || []).push(s, "" + l)
            : s !== "suppressContentEditableWarning" &&
              s !== "suppressHydrationWarning" &&
              (Oi.hasOwnProperty(s)
                ? (l != null && s === "onScroll" && X("scroll", e), o || a === l || (o = []))
                : (o = o || []).push(s, l));
    }
    n && (o = o || []).push("style", n);
    var s = o;
    (t.updateQueue = s) && (t.flags |= 4);
  }
};
dm = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function ni(e, t) {
  if (!ee)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Me(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Xy(e, t, n) {
  var r = t.pendingProps;
  switch ((Qs(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Me(t), null;
    case 1:
      return He(t.type) && lu(), Me(t), null;
    case 3:
      return (
        (r = t.stateNode),
        jr(),
        J(Ue),
        J(Re),
        ec(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Po(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), yt !== null && (jl(yt), (yt = null)))),
        Dl(e, t),
        Me(t),
        null
      );
    case 5:
      Js(t);
      var i = Ln(Di.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        fm(e, t, n, r, i), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(M(166));
          return Me(t), null;
        }
        if (((e = Ln(Ft.current)), Po(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[Rt] = t), (r[Ri] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              X("cancel", r), X("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              X("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < si.length; i++) X(si[i], r);
              break;
            case "source":
              X("error", r);
              break;
            case "img":
            case "image":
            case "link":
              X("error", r), X("load", r);
              break;
            case "details":
              X("toggle", r);
              break;
            case "input":
              Hc(r, o), X("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }), X("invalid", r);
              break;
            case "textarea":
              Qc(r, o), X("invalid", r);
          }
          ul(n, o), (i = null);
          for (var u in o)
            if (o.hasOwnProperty(u)) {
              var a = o[u];
              u === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (o.suppressHydrationWarning !== !0 && Eo(r.textContent, a, e),
                    (i = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (o.suppressHydrationWarning !== !0 && Eo(r.textContent, a, e),
                    (i = ["children", "" + a]))
                : Oi.hasOwnProperty(u) && a != null && u === "onScroll" && X("scroll", r);
            }
          switch (n) {
            case "input":
              mo(r), Bc(r, o, !0);
              break;
            case "textarea":
              mo(r), Wc(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = au);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (u = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Vp(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = u.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = u.createElement(n, { is: r.is }))
                : ((e = u.createElement(n)),
                  n === "select" &&
                    ((u = e), r.multiple ? (u.multiple = !0) : r.size && (u.size = r.size)))
              : (e = u.createElementNS(e, n)),
            (e[Rt] = t),
            (e[Ri] = r),
            cm(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((u = al(n, r)), n)) {
              case "dialog":
                X("cancel", e), X("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                X("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < si.length; i++) X(si[i], e);
                i = r;
                break;
              case "source":
                X("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                X("error", e), X("load", e), (i = r);
                break;
              case "details":
                X("toggle", e), (i = r);
                break;
              case "input":
                Hc(e, r), (i = tl(e, r)), X("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = ie({}, r, { value: void 0 })),
                  X("invalid", e);
                break;
              case "textarea":
                Qc(e, r), (i = il(e, r)), X("invalid", e);
                break;
              default:
                i = r;
            }
            ul(n, i), (a = i);
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var l = a[o];
                o === "style"
                  ? Up(e, l)
                  : o === "dangerouslySetInnerHTML"
                  ? ((l = l ? l.__html : void 0), l != null && zp(e, l))
                  : o === "children"
                  ? typeof l == "string"
                    ? (n !== "textarea" || l !== "") && Ci(e, l)
                    : typeof l == "number" && Ci(e, "" + l)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (Oi.hasOwnProperty(o)
                      ? l != null && o === "onScroll" && X("scroll", e)
                      : l != null && Is(e, o, l, u));
              }
            switch (n) {
              case "input":
                mo(e), Bc(e, r, !1);
                break;
              case "textarea":
                mo(e), Wc(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Cn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? hr(e, !!r.multiple, o, !1)
                    : r.defaultValue != null && hr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = au);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Me(t), null;
    case 6:
      if (e && t.stateNode != null) dm(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(M(166));
        if (((n = Ln(Di.current)), Ln(Ft.current), Po(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Rt] = t),
            (o = r.nodeValue !== n) && ((e = Ye), e !== null))
          )
            switch (e.tag) {
              case 3:
                Eo(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Eo(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Rt] = t),
            (t.stateNode = r);
      }
      return Me(t), null;
    case 13:
      if (
        (J(ne),
        (r = t.memoizedState),
        e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ee && qe !== null && t.mode & 1 && !(t.flags & 128))
          Th(), Vr(), (t.flags |= 98560), (o = !1);
        else if (((o = Po(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(M(318));
            if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o))
              throw Error(M(317));
            o[Rt] = t;
          } else Vr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Me(t), (o = !1);
        } else yt !== null && (jl(yt), (yt = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 && (e === null || ne.current & 1 ? me === 0 && (me = 3) : dc())),
          t.updateQueue !== null && (t.flags |= 4),
          Me(t),
          null);
    case 4:
      return jr(), Dl(e, t), e === null && Ti(t.stateNode.containerInfo), Me(t), null;
    case 10:
      return qs(t.type._context), Me(t), null;
    case 17:
      return He(t.type) && lu(), Me(t), null;
    case 19:
      if ((J(ne), (o = t.memoizedState), o === null)) return Me(t), null;
      if (((r = (t.flags & 128) !== 0), (u = o.rendering), u === null))
        if (r) ni(o, !1);
        else {
          if (me !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((u = mu(e)), u !== null)) {
                for (
                  t.flags |= 128,
                    ni(o, !1),
                    r = u.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (u = o.alternate),
                    u === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = u.childLanes),
                        (o.lanes = u.lanes),
                        (o.child = u.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = u.memoizedProps),
                        (o.memoizedState = u.memoizedState),
                        (o.updateQueue = u.updateQueue),
                        (o.type = u.type),
                        (e = u.dependencies),
                        (o.dependencies =
                          e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling);
                return Y(ne, (ne.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            le() > Hr &&
            ((t.flags |= 128), (r = !0), ni(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = mu(u)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              ni(o, !0),
              o.tail === null && o.tailMode === "hidden" && !u.alternate && !ee)
            )
              return Me(t), null;
          } else
            2 * le() - o.renderingStartTime > Hr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), ni(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((u.sibling = t.child), (t.child = u))
          : ((n = o.last), n !== null ? (n.sibling = u) : (t.child = u), (o.last = u));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = le()),
          (t.sibling = null),
          (n = ne.current),
          Y(ne, r ? (n & 1) | 2 : n & 1),
          t)
        : (Me(t), null);
    case 22:
    case 23:
      return (
        fc(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ge & 1073741824 && (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Me(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(M(156, t.tag));
}
function Zy(e, t) {
  switch ((Qs(t), t.tag)) {
    case 1:
      return (
        He(t.type) && lu(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        jr(),
        J(Ue),
        J(Re),
        ec(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Js(t), null;
    case 13:
      if ((J(ne), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(M(340));
        Vr();
      }
      return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
    case 19:
      return J(ne), null;
    case 4:
      return jr(), null;
    case 10:
      return qs(t.type._context), null;
    case 22:
    case 23:
      return fc(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var xo = !1,
  Ie = !1,
  Jy = typeof WeakSet == "function" ? WeakSet : Set,
  R = null;
function fr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ue(e, t, r);
      }
    else n.current = null;
}
function Fl(e, t, n) {
  try {
    n();
  } catch (r) {
    ue(e, t, r);
  }
}
var Af = !1;
function e0(e, t) {
  if (((gl = iu), (e = vh()), Hs(e))) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var u = 0,
            a = -1,
            l = -1,
            s = 0,
            c = 0,
            p = e,
            h = null;
          t: for (;;) {
            for (
              var v;
              p !== n || (i !== 0 && p.nodeType !== 3) || (a = u + i),
                p !== o || (r !== 0 && p.nodeType !== 3) || (l = u + r),
                p.nodeType === 3 && (u += p.nodeValue.length),
                (v = p.firstChild) !== null;

            )
              (h = p), (p = v);
            for (;;) {
              if (p === e) break t;
              if (
                (h === n && ++s === i && (a = u),
                h === o && ++c === r && (l = u),
                (v = p.nextSibling) !== null)
              )
                break;
              (p = h), (h = p.parentNode);
            }
            p = v;
          }
          n = a === -1 || l === -1 ? null : { start: a, end: l };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (yl = { focusedElem: e, selectionRange: n }, iu = !1, R = t; R !== null; )
    if (((t = R), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (R = e);
    else
      for (; R !== null; ) {
        t = R;
        try {
          var y = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var g = y.memoizedProps,
                    O = y.memoizedState,
                    f = t.stateNode,
                    d = f.getSnapshotBeforeUpdate(t.elementType === t.type ? g : mt(t.type, g), O);
                  f.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var m = t.stateNode.containerInfo;
                m.nodeType === 1
                  ? (m.textContent = "")
                  : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(M(163));
            }
        } catch (C) {
          ue(t, t.return, C);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (R = e);
          break;
        }
        R = t.return;
      }
  return (y = Af), (Af = !1), y;
}
function yi(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && Fl(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function ta(e, t) {
  if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function _l(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function pm(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), pm(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null && (delete t[Rt], delete t[Ri], delete t[Ol], delete t[Ay], delete t[Ny])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function hm(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Nf(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || hm(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Al(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = au));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Al(e, t, n), e = e.sibling; e !== null; ) Al(e, t, n), (e = e.sibling);
}
function Nl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Nl(e, t, n), e = e.sibling; e !== null; ) Nl(e, t, n), (e = e.sibling);
}
var Ee = null,
  gt = !1;
function Zt(e, t, n) {
  for (n = n.child; n !== null; ) mm(e, t, n), (n = n.sibling);
}
function mm(e, t, n) {
  if (Dt && typeof Dt.onCommitFiberUnmount == "function")
    try {
      Dt.onCommitFiberUnmount(Ku, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Ie || fr(n, t);
    case 6:
      var r = Ee,
        i = gt;
      (Ee = null),
        Zt(e, t, n),
        (Ee = r),
        (gt = i),
        Ee !== null &&
          (gt
            ? ((e = Ee),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ee.removeChild(n.stateNode));
      break;
    case 18:
      Ee !== null &&
        (gt
          ? ((e = Ee),
            (n = n.stateNode),
            e.nodeType === 8 ? Ia(e.parentNode, n) : e.nodeType === 1 && Ia(e, n),
            bi(e))
          : Ia(Ee, n.stateNode));
      break;
    case 4:
      (r = Ee),
        (i = gt),
        (Ee = n.stateNode.containerInfo),
        (gt = !0),
        Zt(e, t, n),
        (Ee = r),
        (gt = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ie && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        i = r = r.next;
        do {
          var o = i,
            u = o.destroy;
          (o = o.tag), u !== void 0 && (o & 2 || o & 4) && Fl(n, t, u), (i = i.next);
        } while (i !== r);
      }
      Zt(e, t, n);
      break;
    case 1:
      if (!Ie && (fr(n, t), (r = n.stateNode), typeof r.componentWillUnmount == "function"))
        try {
          (r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
        } catch (a) {
          ue(n, t, a);
        }
      Zt(e, t, n);
      break;
    case 21:
      Zt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Ie = (r = Ie) || n.memoizedState !== null), Zt(e, t, n), (Ie = r))
        : Zt(e, t, n);
      break;
    default:
      Zt(e, t, n);
  }
}
function $f(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Jy()),
      t.forEach(function (r) {
        var i = s0.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function ht(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          u = t,
          a = u;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (Ee = a.stateNode), (gt = !1);
              break e;
            case 3:
              (Ee = a.stateNode.containerInfo), (gt = !0);
              break e;
            case 4:
              (Ee = a.stateNode.containerInfo), (gt = !0);
              break e;
          }
          a = a.return;
        }
        if (Ee === null) throw Error(M(160));
        mm(o, u, i), (Ee = null), (gt = !1);
        var l = i.alternate;
        l !== null && (l.return = null), (i.return = null);
      } catch (s) {
        ue(i, t, s);
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) vm(t, e), (t = t.sibling);
}
function vm(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ht(t, e), Et(e), r & 4)) {
        try {
          yi(3, e, e.return), ta(3, e);
        } catch (g) {
          ue(e, e.return, g);
        }
        try {
          yi(5, e, e.return);
        } catch (g) {
          ue(e, e.return, g);
        }
      }
      break;
    case 1:
      ht(t, e), Et(e), r & 512 && n !== null && fr(n, n.return);
      break;
    case 5:
      if ((ht(t, e), Et(e), r & 512 && n !== null && fr(n, n.return), e.flags & 32)) {
        var i = e.stateNode;
        try {
          Ci(i, "");
        } catch (g) {
          ue(e, e.return, g);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          u = n !== null ? n.memoizedProps : o,
          a = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            a === "input" && o.type === "radio" && o.name != null && Np(i, o), al(a, u);
            var s = al(a, o);
            for (u = 0; u < l.length; u += 2) {
              var c = l[u],
                p = l[u + 1];
              c === "style"
                ? Up(i, p)
                : c === "dangerouslySetInnerHTML"
                ? zp(i, p)
                : c === "children"
                ? Ci(i, p)
                : Is(i, c, p, s);
            }
            switch (a) {
              case "input":
                nl(i, o);
                break;
              case "textarea":
                $p(i, o);
                break;
              case "select":
                var h = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var v = o.value;
                v != null
                  ? hr(i, !!o.multiple, v, !1)
                  : h !== !!o.multiple &&
                    (o.defaultValue != null
                      ? hr(i, !!o.multiple, o.defaultValue, !0)
                      : hr(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Ri] = o;
          } catch (g) {
            ue(e, e.return, g);
          }
      }
      break;
    case 6:
      if ((ht(t, e), Et(e), r & 4)) {
        if (e.stateNode === null) throw Error(M(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (g) {
          ue(e, e.return, g);
        }
      }
      break;
    case 3:
      if ((ht(t, e), Et(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          bi(t.containerInfo);
        } catch (g) {
          ue(e, e.return, g);
        }
      break;
    case 4:
      ht(t, e), Et(e);
      break;
    case 13:
      ht(t, e),
        Et(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o || (i.alternate !== null && i.alternate.memoizedState !== null) || (sc = le())),
        r & 4 && $f(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Ie = (s = Ie) || c), ht(t, e), (Ie = s)) : ht(t, e),
        Et(e),
        r & 8192)
      ) {
        if (((s = e.memoizedState !== null), (e.stateNode.isHidden = s) && !c && e.mode & 1))
          for (R = e, c = e.child; c !== null; ) {
            for (p = R = c; R !== null; ) {
              switch (((h = R), (v = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  yi(4, h, h.return);
                  break;
                case 1:
                  fr(h, h.return);
                  var y = h.stateNode;
                  if (typeof y.componentWillUnmount == "function") {
                    (r = h), (n = h.return);
                    try {
                      (t = r),
                        (y.props = t.memoizedProps),
                        (y.state = t.memoizedState),
                        y.componentWillUnmount();
                    } catch (g) {
                      ue(r, n, g);
                    }
                  }
                  break;
                case 5:
                  fr(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    zf(p);
                    continue;
                  }
              }
              v !== null ? ((v.return = h), (R = v)) : zf(p);
            }
            c = c.sibling;
          }
        e: for (c = null, p = e; ; ) {
          if (p.tag === 5) {
            if (c === null) {
              c = p;
              try {
                (i = p.stateNode),
                  s
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((a = p.stateNode),
                      (l = p.memoizedProps.style),
                      (u = l != null && l.hasOwnProperty("display") ? l.display : null),
                      (a.style.display = jp("display", u)));
              } catch (g) {
                ue(e, e.return, g);
              }
            }
          } else if (p.tag === 6) {
            if (c === null)
              try {
                p.stateNode.nodeValue = s ? "" : p.memoizedProps;
              } catch (g) {
                ue(e, e.return, g);
              }
          } else if (
            ((p.tag !== 22 && p.tag !== 23) || p.memoizedState === null || p === e) &&
            p.child !== null
          ) {
            (p.child.return = p), (p = p.child);
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            c === p && (c = null), (p = p.return);
          }
          c === p && (c = null), (p.sibling.return = p.return), (p = p.sibling);
        }
      }
      break;
    case 19:
      ht(t, e), Et(e), r & 4 && $f(e);
      break;
    case 21:
      break;
    default:
      ht(t, e), Et(e);
  }
}
function Et(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (hm(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(M(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Ci(i, ""), (r.flags &= -33));
          var o = Nf(e);
          Nl(e, o, i);
          break;
        case 3:
        case 4:
          var u = r.stateNode.containerInfo,
            a = Nf(e);
          Al(e, a, u);
          break;
        default:
          throw Error(M(161));
      }
    } catch (l) {
      ue(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function t0(e, t, n) {
  (R = e), gm(e);
}
function gm(e, t, n) {
  for (var r = (e.mode & 1) !== 0; R !== null; ) {
    var i = R,
      o = i.child;
    if (i.tag === 22 && r) {
      var u = i.memoizedState !== null || xo;
      if (!u) {
        var a = i.alternate,
          l = (a !== null && a.memoizedState !== null) || Ie;
        a = xo;
        var s = Ie;
        if (((xo = u), (Ie = l) && !s))
          for (R = i; R !== null; )
            (u = R),
              (l = u.child),
              u.tag === 22 && u.memoizedState !== null
                ? jf(i)
                : l !== null
                ? ((l.return = u), (R = l))
                : jf(i);
        for (; o !== null; ) (R = o), gm(o), (o = o.sibling);
        (R = i), (xo = a), (Ie = s);
      }
      Vf(e);
    } else i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (R = o)) : Vf(e);
  }
}
function Vf(e) {
  for (; R !== null; ) {
    var t = R;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ie || ta(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ie)
                if (n === null) r.componentDidMount();
                else {
                  var i = t.elementType === t.type ? n.memoizedProps : mt(t.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = t.updateQueue;
              o !== null && Cf(t, o, r);
              break;
            case 3:
              var u = t.updateQueue;
              if (u !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Cf(t, u, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var l = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && n.focus();
                    break;
                  case "img":
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var s = t.alternate;
                if (s !== null) {
                  var c = s.memoizedState;
                  if (c !== null) {
                    var p = c.dehydrated;
                    p !== null && bi(p);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(M(163));
          }
        Ie || (t.flags & 512 && _l(t));
      } catch (h) {
        ue(t, t.return, h);
      }
    }
    if (t === e) {
      R = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (R = n);
      break;
    }
    R = t.return;
  }
}
function zf(e) {
  for (; R !== null; ) {
    var t = R;
    if (t === e) {
      R = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (R = n);
      break;
    }
    R = t.return;
  }
}
function jf(e) {
  for (; R !== null; ) {
    var t = R;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ta(4, t);
          } catch (l) {
            ue(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              ue(t, i, l);
            }
          }
          var o = t.return;
          try {
            _l(t);
          } catch (l) {
            ue(t, o, l);
          }
          break;
        case 5:
          var u = t.return;
          try {
            _l(t);
          } catch (l) {
            ue(t, u, l);
          }
      }
    } catch (l) {
      ue(t, t.return, l);
    }
    if (t === e) {
      R = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (R = a);
      break;
    }
    R = t.return;
  }
}
var n0 = Math.ceil,
  yu = Yt.ReactCurrentDispatcher,
  ac = Yt.ReactCurrentOwner,
  ft = Yt.ReactCurrentBatchConfig,
  H = 0,
  Se = null,
  fe = null,
  ke = 0,
  Ge = 0,
  dr = bn(0),
  me = 0,
  Ni = null,
  Kn = 0,
  na = 0,
  lc = 0,
  wi = null,
  ze = null,
  sc = 0,
  Hr = 1 / 0,
  $t = null,
  wu = !1,
  $l = null,
  wn = null,
  Mo = !1,
  pn = null,
  Su = 0,
  Si = 0,
  Vl = null,
  Qo = -1,
  Wo = 0;
function _e() {
  return H & 6 ? le() : Qo !== -1 ? Qo : (Qo = le());
}
function Sn(e) {
  return e.mode & 1
    ? H & 2 && ke !== 0
      ? ke & -ke
      : Vy.transition !== null
      ? (Wo === 0 && (Wo = eh()), Wo)
      : ((e = W), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : ah(e.type))), e)
    : 1;
}
function St(e, t, n, r) {
  if (50 < Si) throw ((Si = 0), (Vl = null), Error(M(185)));
  io(e, n, r),
    (!(H & 2) || e !== Se) &&
      (e === Se && (!(H & 2) && (na |= n), me === 4 && rn(e, ke)),
      Be(e, r),
      n === 1 && H === 0 && !(t.mode & 1) && ((Hr = le() + 500), Zu && xn()));
}
function Be(e, t) {
  var n = e.callbackNode;
  Vg(e, t);
  var r = ru(e, e === Se ? ke : 0);
  if (r === 0) n !== null && qc(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && qc(n), t === 1))
      e.tag === 0 ? $y(Uf.bind(null, e)) : bh(Uf.bind(null, e)),
        Fy(function () {
          !(H & 6) && xn();
        }),
        (n = null);
    else {
      switch (th(r)) {
        case 1:
          n = _s;
          break;
        case 4:
          n = Zp;
          break;
        case 16:
          n = nu;
          break;
        case 536870912:
          n = Jp;
          break;
        default:
          n = nu;
      }
      n = km(n, ym.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function ym(e, t) {
  if (((Qo = -1), (Wo = 0), H & 6)) throw Error(M(327));
  var n = e.callbackNode;
  if (wr() && e.callbackNode !== n) return null;
  var r = ru(e, e === Se ? ke : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ou(e, r);
  else {
    t = r;
    var i = H;
    H |= 2;
    var o = Sm();
    (Se !== e || ke !== t) && (($t = null), (Hr = le() + 500), jn(e, t));
    do
      try {
        o0();
        break;
      } catch (a) {
        wm(e, a);
      }
    while (!0);
    Gs(), (yu.current = o), (H = i), fe !== null ? (t = 0) : ((Se = null), (ke = 0), (t = me));
  }
  if (t !== 0) {
    if ((t === 2 && ((i = dl(e)), i !== 0 && ((r = i), (t = zl(e, i)))), t === 1))
      throw ((n = Ni), jn(e, 0), rn(e, r), Be(e, le()), n);
    if (t === 6) rn(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !r0(i) &&
          ((t = Ou(e, r)), t === 2 && ((o = dl(e)), o !== 0 && ((r = o), (t = zl(e, o)))), t === 1))
      )
        throw ((n = Ni), jn(e, 0), rn(e, r), Be(e, le()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(M(345));
        case 2:
          Tn(e, ze, $t);
          break;
        case 3:
          if ((rn(e, r), (r & 130023424) === r && ((t = sc + 500 - le()), 10 < t))) {
            if (ru(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              _e(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = Sl(Tn.bind(null, e, ze, $t), t);
            break;
          }
          Tn(e, ze, $t);
          break;
        case 4:
          if ((rn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var u = 31 - wt(r);
            (o = 1 << u), (u = t[u]), u > i && (i = u), (r &= ~o);
          }
          if (
            ((r = i),
            (r = le() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * n0(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Sl(Tn.bind(null, e, ze, $t), r);
            break;
          }
          Tn(e, ze, $t);
          break;
        case 5:
          Tn(e, ze, $t);
          break;
        default:
          throw Error(M(329));
      }
    }
  }
  return Be(e, le()), e.callbackNode === n ? ym.bind(null, e) : null;
}
function zl(e, t) {
  var n = wi;
  return (
    e.current.memoizedState.isDehydrated && (jn(e, t).flags |= 256),
    (e = Ou(e, t)),
    e !== 2 && ((t = ze), (ze = n), t !== null && jl(t)),
    e
  );
}
function jl(e) {
  ze === null ? (ze = e) : ze.push.apply(ze, e);
}
function r0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!Ct(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function rn(e, t) {
  for (
    t &= ~lc, t &= ~na, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - wt(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Uf(e) {
  if (H & 6) throw Error(M(327));
  wr();
  var t = ru(e, 0);
  if (!(t & 1)) return Be(e, le()), null;
  var n = Ou(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = dl(e);
    r !== 0 && ((t = r), (n = zl(e, r)));
  }
  if (n === 1) throw ((n = Ni), jn(e, 0), rn(e, t), Be(e, le()), n);
  if (n === 6) throw Error(M(345));
  return (
    (e.finishedWork = e.current.alternate), (e.finishedLanes = t), Tn(e, ze, $t), Be(e, le()), null
  );
}
function cc(e, t) {
  var n = H;
  H |= 1;
  try {
    return e(t);
  } finally {
    (H = n), H === 0 && ((Hr = le() + 500), Zu && xn());
  }
}
function Gn(e) {
  pn !== null && pn.tag === 0 && !(H & 6) && wr();
  var t = H;
  H |= 1;
  var n = ft.transition,
    r = W;
  try {
    if (((ft.transition = null), (W = 1), e)) return e();
  } finally {
    (W = r), (ft.transition = n), (H = t), !(H & 6) && xn();
  }
}
function fc() {
  (Ge = dr.current), J(dr);
}
function jn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Dy(n)), fe !== null))
    for (n = fe.return; n !== null; ) {
      var r = n;
      switch ((Qs(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && lu();
          break;
        case 3:
          jr(), J(Ue), J(Re), ec();
          break;
        case 5:
          Js(r);
          break;
        case 4:
          jr();
          break;
        case 13:
          J(ne);
          break;
        case 19:
          J(ne);
          break;
        case 10:
          qs(r.type._context);
          break;
        case 22:
        case 23:
          fc();
      }
      n = n.return;
    }
  if (
    ((Se = e),
    (fe = e = On(e.current, null)),
    (ke = Ge = t),
    (me = 0),
    (Ni = null),
    (lc = na = Kn = 0),
    (ze = wi = null),
    Rn !== null)
  ) {
    for (t = 0; t < Rn.length; t++)
      if (((n = Rn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var u = o.next;
          (o.next = i), (r.next = u);
        }
        n.pending = r;
      }
    Rn = null;
  }
  return e;
}
function wm(e, t) {
  do {
    var n = fe;
    try {
      if ((Gs(), (Uo.current = gu), vu)) {
        for (var r = re.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        vu = !1;
      }
      if (
        ((Wn = 0),
        (ye = he = re = null),
        (gi = !1),
        (Fi = 0),
        (ac.current = null),
        n === null || n.return === null)
      ) {
        (me = 1), (Ni = t), (fe = null);
        break;
      }
      e: {
        var o = e,
          u = n.return,
          a = n,
          l = t;
        if (
          ((t = ke),
          (a.flags |= 32768),
          l !== null && typeof l == "object" && typeof l.then == "function")
        ) {
          var s = l,
            c = a,
            p = c.tag;
          if (!(c.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var h = c.alternate;
            h
              ? ((c.updateQueue = h.updateQueue),
                (c.memoizedState = h.memoizedState),
                (c.lanes = h.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var v = Tf(u);
          if (v !== null) {
            (v.flags &= -257), If(v, u, a, o, t), v.mode & 1 && Mf(o, s, t), (t = v), (l = s);
            var y = t.updateQueue;
            if (y === null) {
              var g = new Set();
              g.add(l), (t.updateQueue = g);
            } else y.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              Mf(o, s, t), dc();
              break e;
            }
            l = Error(M(426));
          }
        } else if (ee && a.mode & 1) {
          var O = Tf(u);
          if (O !== null) {
            !(O.flags & 65536) && (O.flags |= 256), If(O, u, a, o, t), Ws(Ur(l, a));
            break e;
          }
        }
        (o = l = Ur(l, a)), me !== 4 && (me = 2), wi === null ? (wi = [o]) : wi.push(o), (o = u);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var f = nm(o, l, t);
              Of(o, f);
              break e;
            case 1:
              a = l;
              var d = o.type,
                m = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof d.getDerivedStateFromError == "function" ||
                  (m !== null &&
                    typeof m.componentDidCatch == "function" &&
                    (wn === null || !wn.has(m))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var C = rm(o, a, t);
                Of(o, C);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Cm(n);
    } catch (P) {
      (t = P), fe === n && n !== null && (fe = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Sm() {
  var e = yu.current;
  return (yu.current = gu), e === null ? gu : e;
}
function dc() {
  (me === 0 || me === 3 || me === 2) && (me = 4),
    Se === null || (!(Kn & 268435455) && !(na & 268435455)) || rn(Se, ke);
}
function Ou(e, t) {
  var n = H;
  H |= 2;
  var r = Sm();
  (Se !== e || ke !== t) && (($t = null), jn(e, t));
  do
    try {
      i0();
      break;
    } catch (i) {
      wm(e, i);
    }
  while (!0);
  if ((Gs(), (H = n), (yu.current = r), fe !== null)) throw Error(M(261));
  return (Se = null), (ke = 0), me;
}
function i0() {
  for (; fe !== null; ) Om(fe);
}
function o0() {
  for (; fe !== null && !Ig(); ) Om(fe);
}
function Om(e) {
  var t = Pm(e.alternate, e, Ge);
  (e.memoizedProps = e.pendingProps), t === null ? Cm(e) : (fe = t), (ac.current = null);
}
function Cm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Zy(n, t)), n !== null)) {
        (n.flags &= 32767), (fe = n);
        return;
      }
      if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (me = 6), (fe = null);
        return;
      }
    } else if (((n = Xy(n, t, Ge)), n !== null)) {
      fe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      fe = t;
      return;
    }
    fe = t = e;
  } while (t !== null);
  me === 0 && (me = 5);
}
function Tn(e, t, n) {
  var r = W,
    i = ft.transition;
  try {
    (ft.transition = null), (W = 1), u0(e, t, n, r);
  } finally {
    (ft.transition = i), (W = r);
  }
  return null;
}
function u0(e, t, n, r) {
  do wr();
  while (pn !== null);
  if (H & 6) throw Error(M(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(M(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (zg(e, o),
    e === Se && ((fe = Se = null), (ke = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Mo ||
      ((Mo = !0),
      km(nu, function () {
        return wr(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = ft.transition), (ft.transition = null);
    var u = W;
    W = 1;
    var a = H;
    (H |= 4),
      (ac.current = null),
      e0(e, n),
      vm(n, e),
      by(yl),
      (iu = !!gl),
      (yl = gl = null),
      (e.current = n),
      t0(n),
      Rg(),
      (H = a),
      (W = u),
      (ft.transition = o);
  } else e.current = n;
  if (
    (Mo && ((Mo = !1), (pn = e), (Su = i)),
    (o = e.pendingLanes),
    o === 0 && (wn = null),
    Fg(n.stateNode),
    Be(e, le()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (wu) throw ((wu = !1), (e = $l), ($l = null), e);
  return (
    Su & 1 && e.tag !== 0 && wr(),
    (o = e.pendingLanes),
    o & 1 ? (e === Vl ? Si++ : ((Si = 0), (Vl = e))) : (Si = 0),
    xn(),
    null
  );
}
function wr() {
  if (pn !== null) {
    var e = th(Su),
      t = ft.transition,
      n = W;
    try {
      if (((ft.transition = null), (W = 16 > e ? 16 : e), pn === null)) var r = !1;
      else {
        if (((e = pn), (pn = null), (Su = 0), H & 6)) throw Error(M(331));
        var i = H;
        for (H |= 4, R = e.current; R !== null; ) {
          var o = R,
            u = o.child;
          if (R.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var s = a[l];
                for (R = s; R !== null; ) {
                  var c = R;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      yi(8, c, o);
                  }
                  var p = c.child;
                  if (p !== null) (p.return = c), (R = p);
                  else
                    for (; R !== null; ) {
                      c = R;
                      var h = c.sibling,
                        v = c.return;
                      if ((pm(c), c === s)) {
                        R = null;
                        break;
                      }
                      if (h !== null) {
                        (h.return = v), (R = h);
                        break;
                      }
                      R = v;
                    }
                }
              }
              var y = o.alternate;
              if (y !== null) {
                var g = y.child;
                if (g !== null) {
                  y.child = null;
                  do {
                    var O = g.sibling;
                    (g.sibling = null), (g = O);
                  } while (g !== null);
                }
              }
              R = o;
            }
          }
          if (o.subtreeFlags & 2064 && u !== null) (u.return = o), (R = u);
          else
            e: for (; R !== null; ) {
              if (((o = R), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    yi(9, o, o.return);
                }
              var f = o.sibling;
              if (f !== null) {
                (f.return = o.return), (R = f);
                break e;
              }
              R = o.return;
            }
        }
        var d = e.current;
        for (R = d; R !== null; ) {
          u = R;
          var m = u.child;
          if (u.subtreeFlags & 2064 && m !== null) (m.return = u), (R = m);
          else
            e: for (u = d; R !== null; ) {
              if (((a = R), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ta(9, a);
                  }
                } catch (P) {
                  ue(a, a.return, P);
                }
              if (a === u) {
                R = null;
                break e;
              }
              var C = a.sibling;
              if (C !== null) {
                (C.return = a.return), (R = C);
                break e;
              }
              R = a.return;
            }
        }
        if (((H = i), xn(), Dt && typeof Dt.onPostCommitFiberRoot == "function"))
          try {
            Dt.onPostCommitFiberRoot(Ku, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (W = n), (ft.transition = t);
    }
  }
  return !1;
}
function Hf(e, t, n) {
  (t = Ur(n, t)),
    (t = nm(e, t, 1)),
    (e = yn(e, t, 1)),
    (t = _e()),
    e !== null && (io(e, 1, t), Be(e, t));
}
function ue(e, t, n) {
  if (e.tag === 3) Hf(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Hf(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" && (wn === null || !wn.has(r)))
        ) {
          (e = Ur(n, e)),
            (e = rm(t, e, 1)),
            (t = yn(t, e, 1)),
            (e = _e()),
            t !== null && (io(t, 1, e), Be(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function a0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = _e()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Se === e &&
      (ke & n) === n &&
      (me === 4 || (me === 3 && (ke & 130023424) === ke && 500 > le() - sc) ? jn(e, 0) : (lc |= n)),
    Be(e, t);
}
function Em(e, t) {
  t === 0 && (e.mode & 1 ? ((t = yo), (yo <<= 1), !(yo & 130023424) && (yo = 4194304)) : (t = 1));
  var n = _e();
  (e = Gt(e, t)), e !== null && (io(e, t, n), Be(e, n));
}
function l0(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Em(e, n);
}
function s0(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(M(314));
  }
  r !== null && r.delete(t), Em(e, n);
}
var Pm;
Pm = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Ue.current) je = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (je = !1), Yy(e, t, n);
      je = !!(e.flags & 131072);
    }
  else (je = !1), ee && t.flags & 1048576 && xh(t, fu, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Bo(e, t), (e = t.pendingProps);
      var i = $r(t, Re.current);
      yr(t, n), (i = nc(null, t, r, e, i, n));
      var o = rc();
      return (
        (t.flags |= 1),
        typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            He(r) ? ((o = !0), su(t)) : (o = !1),
            (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
            Xs(t),
            (i.updater = Ju),
            (t.stateNode = i),
            (i._reactInternals = t),
            xl(t, r, e, n),
            (t = Il(null, t, r, !0, o, n)))
          : ((t.tag = 0), ee && o && Bs(t), Fe(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Bo(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = f0(r)),
          (e = mt(r, e)),
          i)
        ) {
          case 0:
            t = Tl(null, t, r, e, n);
            break e;
          case 1:
            t = Df(null, t, r, e, n);
            break e;
          case 11:
            t = Rf(null, t, r, e, n);
            break e;
          case 14:
            t = Lf(null, t, r, mt(r.type, e), n);
            break e;
        }
        throw Error(M(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : mt(r, i)),
        Tl(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : mt(r, i)),
        Df(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((am(t), e === null)) throw Error(M(387));
        (r = t.pendingProps), (o = t.memoizedState), (i = o.element), Rh(e, t), hu(t, r, null, n);
        var u = t.memoizedState;
        if (((r = u.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: u.cache,
              pendingSuspenseBoundaries: u.pendingSuspenseBoundaries,
              transitions: u.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = Ur(Error(M(423)), t)), (t = Ff(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Ur(Error(M(424)), t)), (t = Ff(e, t, r, n, i));
            break e;
          } else
            for (
              qe = gn(t.stateNode.containerInfo.firstChild),
                Ye = t,
                ee = !0,
                yt = null,
                n = _h(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Vr(), r === i)) {
            t = qt(e, t, n);
            break e;
          }
          Fe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Ah(t),
        e === null && Pl(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (u = i.children),
        wl(r, i) ? (u = null) : o !== null && wl(r, o) && (t.flags |= 32),
        um(e, t),
        Fe(e, t, u, n),
        t.child
      );
    case 6:
      return e === null && Pl(t), null;
    case 13:
      return lm(e, t, n);
    case 4:
      return (
        Zs(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = zr(t, null, r, n)) : Fe(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : mt(r, i)),
        Rf(e, t, r, i, n)
      );
    case 7:
      return Fe(e, t, t.pendingProps, n), t.child;
    case 8:
      return Fe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Fe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (u = i.value),
          Y(du, r._currentValue),
          (r._currentValue = u),
          o !== null)
        )
          if (Ct(o.value, u)) {
            if (o.children === i.children && !Ue.current) {
              t = qt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var a = o.dependencies;
              if (a !== null) {
                u = o.child;
                for (var l = a.firstContext; l !== null; ) {
                  if (l.context === r) {
                    if (o.tag === 1) {
                      (l = Ht(-1, n & -n)), (l.tag = 2);
                      var s = o.updateQueue;
                      if (s !== null) {
                        s = s.shared;
                        var c = s.pending;
                        c === null ? (l.next = l) : ((l.next = c.next), (c.next = l)),
                          (s.pending = l);
                      }
                    }
                    (o.lanes |= n),
                      (l = o.alternate),
                      l !== null && (l.lanes |= n),
                      kl(o.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  l = l.next;
                }
              } else if (o.tag === 10) u = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((u = o.return), u === null)) throw Error(M(341));
                (u.lanes |= n),
                  (a = u.alternate),
                  a !== null && (a.lanes |= n),
                  kl(u, n, t),
                  (u = o.sibling);
              } else u = o.child;
              if (u !== null) u.return = o;
              else
                for (u = o; u !== null; ) {
                  if (u === t) {
                    u = null;
                    break;
                  }
                  if (((o = u.sibling), o !== null)) {
                    (o.return = u.return), (u = o);
                    break;
                  }
                  u = u.return;
                }
              o = u;
            }
        Fe(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        yr(t, n),
        (i = dt(i)),
        (r = r(i)),
        (t.flags |= 1),
        Fe(e, t, r, n),
        t.child
      );
    case 14:
      return (r = t.type), (i = mt(r, t.pendingProps)), (i = mt(r.type, i)), Lf(e, t, r, i, n);
    case 15:
      return im(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : mt(r, i)),
        Bo(e, t),
        (t.tag = 1),
        He(r) ? ((e = !0), su(t)) : (e = !1),
        yr(t, n),
        Dh(t, r, i),
        xl(t, r, i, n),
        Il(null, t, r, !0, e, n)
      );
    case 19:
      return sm(e, t, n);
    case 22:
      return om(e, t, n);
  }
  throw Error(M(156, t.tag));
};
function km(e, t) {
  return Xp(e, t);
}
function c0(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function ct(e, t, n, r) {
  return new c0(e, t, n, r);
}
function pc(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function f0(e) {
  if (typeof e == "function") return pc(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Ls)) return 11;
    if (e === Ds) return 14;
  }
  return 2;
}
function On(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ct(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Ko(e, t, n, r, i, o) {
  var u = 2;
  if (((r = e), typeof e == "function")) pc(e) && (u = 1);
  else if (typeof e == "string") u = 5;
  else
    e: switch (e) {
      case nr:
        return Un(n.children, i, o, t);
      case Rs:
        (u = 8), (i |= 8);
        break;
      case Xa:
        return (e = ct(12, n, t, i | 2)), (e.elementType = Xa), (e.lanes = o), e;
      case Za:
        return (e = ct(13, n, t, i)), (e.elementType = Za), (e.lanes = o), e;
      case Ja:
        return (e = ct(19, n, t, i)), (e.elementType = Ja), (e.lanes = o), e;
      case Fp:
        return ra(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Lp:
              u = 10;
              break e;
            case Dp:
              u = 9;
              break e;
            case Ls:
              u = 11;
              break e;
            case Ds:
              u = 14;
              break e;
            case en:
              (u = 16), (r = null);
              break e;
          }
        throw Error(M(130, e == null ? e : typeof e, ""));
    }
  return (t = ct(u, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t;
}
function Un(e, t, n, r) {
  return (e = ct(7, e, r, t)), (e.lanes = n), e;
}
function ra(e, t, n, r) {
  return (
    (e = ct(22, e, r, t)), (e.elementType = Fp), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e
  );
}
function $a(e, t, n) {
  return (e = ct(6, e, null, t)), (e.lanes = n), e;
}
function Va(e, t, n) {
  return (
    (t = ct(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function d0(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = wa(0)),
    (this.expirationTimes = wa(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = wa(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function hc(e, t, n, r, i, o, u, a, l) {
  return (
    (e = new d0(e, t, n, a, l)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = ct(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Xs(o),
    e
  );
}
function p0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: tr,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function bm(e) {
  if (!e) return En;
  e = e._reactInternals;
  e: {
    if (Zn(e) !== e || e.tag !== 1) throw Error(M(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (He(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(M(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (He(n)) return kh(e, n, t);
  }
  return t;
}
function xm(e, t, n, r, i, o, u, a, l) {
  return (
    (e = hc(n, r, !0, e, i, o, u, a, l)),
    (e.context = bm(null)),
    (n = e.current),
    (r = _e()),
    (i = Sn(n)),
    (o = Ht(r, i)),
    (o.callback = t ?? null),
    yn(n, o, i),
    (e.current.lanes = i),
    io(e, i, r),
    Be(e, r),
    e
  );
}
function ia(e, t, n, r) {
  var i = t.current,
    o = _e(),
    u = Sn(i);
  return (
    (n = bm(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Ht(o, u)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = yn(i, t, u)),
    e !== null && (St(e, i, u, o), jo(e, i, u)),
    u
  );
}
function Cu(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Bf(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function mc(e, t) {
  Bf(e, t), (e = e.alternate) && Bf(e, t);
}
function h0() {
  return null;
}
var Mm =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function vc(e) {
  this._internalRoot = e;
}
oa.prototype.render = vc.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(M(409));
  ia(e, t, null, null);
};
oa.prototype.unmount = vc.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Gn(function () {
      ia(null, e, null, null);
    }),
      (t[Kt] = null);
  }
};
function oa(e) {
  this._internalRoot = e;
}
oa.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = ih();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < nn.length && t !== 0 && t < nn[n].priority; n++);
    nn.splice(n, 0, e), n === 0 && uh(e);
  }
};
function gc(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ua(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Qf() {}
function m0(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var s = Cu(u);
        o.call(s);
      };
    }
    var u = xm(t, r, e, 0, null, !1, !1, "", Qf);
    return (
      (e._reactRootContainer = u),
      (e[Kt] = u.current),
      Ti(e.nodeType === 8 ? e.parentNode : e),
      Gn(),
      u
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var s = Cu(l);
      a.call(s);
    };
  }
  var l = hc(e, 0, !1, null, null, !1, !1, "", Qf);
  return (
    (e._reactRootContainer = l),
    (e[Kt] = l.current),
    Ti(e.nodeType === 8 ? e.parentNode : e),
    Gn(function () {
      ia(t, l, n, r);
    }),
    l
  );
}
function aa(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var u = o;
    if (typeof i == "function") {
      var a = i;
      i = function () {
        var l = Cu(u);
        a.call(l);
      };
    }
    ia(t, u, e, i);
  } else u = m0(n, t, e, i, r);
  return Cu(u);
}
nh = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = li(t.pendingLanes);
        n !== 0 && (As(t, n | 1), Be(t, le()), !(H & 6) && ((Hr = le() + 500), xn()));
      }
      break;
    case 13:
      Gn(function () {
        var r = Gt(e, 1);
        if (r !== null) {
          var i = _e();
          St(r, e, 1, i);
        }
      }),
        mc(e, 1);
  }
};
Ns = function (e) {
  if (e.tag === 13) {
    var t = Gt(e, 134217728);
    if (t !== null) {
      var n = _e();
      St(t, e, 134217728, n);
    }
    mc(e, 134217728);
  }
};
rh = function (e) {
  if (e.tag === 13) {
    var t = Sn(e),
      n = Gt(e, t);
    if (n !== null) {
      var r = _e();
      St(n, e, t, r);
    }
    mc(e, t);
  }
};
ih = function () {
  return W;
};
oh = function (e, t) {
  var n = W;
  try {
    return (W = e), t();
  } finally {
    W = n;
  }
};
sl = function (e, t, n) {
  switch (t) {
    case "input":
      if ((nl(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Xu(r);
            if (!i) throw Error(M(90));
            Ap(r), nl(r, i);
          }
        }
      }
      break;
    case "textarea":
      $p(e, n);
      break;
    case "select":
      (t = n.value), t != null && hr(e, !!n.multiple, t, !1);
  }
};
Qp = cc;
Wp = Gn;
var v0 = { usingClientEntryPoint: !1, Events: [uo, ur, Xu, Hp, Bp, cc] },
  ri = {
    findFiberByHostInstance: In,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  g0 = {
    bundleType: ri.bundleType,
    version: ri.version,
    rendererPackageName: ri.rendererPackageName,
    rendererConfig: ri.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Yt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = qp(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: ri.findFiberByHostInstance || h0,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var To = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!To.isDisabled && To.supportsFiber)
    try {
      (Ku = To.inject(g0)), (Dt = To);
    } catch {}
}
et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = v0;
et.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!gc(t)) throw Error(M(200));
  return p0(e, t, null, n);
};
et.createRoot = function (e, t) {
  if (!gc(e)) throw Error(M(299));
  var n = !1,
    r = "",
    i = Mm;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = hc(e, 1, !1, null, null, n, !1, r, i)),
    (e[Kt] = t.current),
    Ti(e.nodeType === 8 ? e.parentNode : e),
    new vc(t)
  );
};
et.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(M(188))
      : ((e = Object.keys(e).join(",")), Error(M(268, e)));
  return (e = qp(t)), (e = e === null ? null : e.stateNode), e;
};
et.flushSync = function (e) {
  return Gn(e);
};
et.hydrate = function (e, t, n) {
  if (!ua(t)) throw Error(M(200));
  return aa(null, e, t, !0, n);
};
et.hydrateRoot = function (e, t, n) {
  if (!gc(e)) throw Error(M(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    u = Mm;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (u = n.onRecoverableError)),
    (t = xm(t, null, e, 1, n ?? null, i, !1, o, u)),
    (e[Kt] = t.current),
    Ti(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new oa(t);
};
et.render = function (e, t, n) {
  if (!ua(t)) throw Error(M(200));
  return aa(null, e, t, !1, n);
};
et.unmountComponentAtNode = function (e) {
  if (!ua(e)) throw Error(M(40));
  return e._reactRootContainer
    ? (Gn(function () {
        aa(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Kt] = null);
        });
      }),
      !0)
    : !1;
};
et.unstable_batchedUpdates = cc;
et.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ua(n)) throw Error(M(200));
  if (e == null || e._reactInternals === void 0) throw Error(M(38));
  return aa(e, t, n, !1, r);
};
et.version = "18.2.0-next-9e3b772b8-20220608";
function Tm() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Tm);
    } catch (e) {
      console.error(e);
    }
}
Tm(), (xp.exports = et);
var Im = xp.exports;
const i2 = vp(Im);
function qn(e) {
  "@babel/helpers - typeof";
  return (
    (qn =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    qn(e)
  );
}
function y0(e, t) {
  if (qn(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (qn(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Rm(e) {
  var t = y0(e, "string");
  return qn(t) == "symbol" ? t : String(t);
}
function ci(e, t, n) {
  return (
    (t = Rm(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Wf(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function A(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Wf(Object(n), !0).forEach(function (r) {
          ci(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Wf(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function w0(e) {
  if (Array.isArray(e)) return e;
}
function S0(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r,
      i,
      o,
      u,
      a = [],
      l = !0,
      s = !1;
    try {
      if (((o = (n = n.call(e)).next), t === 0)) {
        if (Object(n) !== n) return;
        l = !1;
      } else for (; !(l = (r = o.call(n)).done) && (a.push(r.value), a.length !== t); l = !0);
    } catch (c) {
      (s = !0), (i = c);
    } finally {
      try {
        if (!l && n.return != null && ((u = n.return()), Object(u) !== u)) return;
      } finally {
        if (s) throw i;
      }
    }
    return a;
  }
}
function Ul(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Lm(e, t) {
  if (e) {
    if (typeof e == "string") return Ul(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set"))
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ul(e, t);
  }
}
function O0() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Bt(e, t) {
  return w0(e) || S0(e, t) || Lm(e, t) || O0();
}
function C0(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++) (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Xt(e, t) {
  if (e == null) return {};
  var n = C0(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      (r = o[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var E0 = [
  "defaultInputValue",
  "defaultMenuIsOpen",
  "defaultValue",
  "inputValue",
  "menuIsOpen",
  "onChange",
  "onInputChange",
  "onMenuClose",
  "onMenuOpen",
  "value",
];
function P0(e) {
  var t = e.defaultInputValue,
    n = t === void 0 ? "" : t,
    r = e.defaultMenuIsOpen,
    i = r === void 0 ? !1 : r,
    o = e.defaultValue,
    u = o === void 0 ? null : o,
    a = e.inputValue,
    l = e.menuIsOpen,
    s = e.onChange,
    c = e.onInputChange,
    p = e.onMenuClose,
    h = e.onMenuOpen,
    v = e.value,
    y = Xt(e, E0),
    g = x.useState(a !== void 0 ? a : n),
    O = Bt(g, 2),
    f = O[0],
    d = O[1],
    m = x.useState(l !== void 0 ? l : i),
    C = Bt(m, 2),
    P = C[0],
    b = C[1],
    E = x.useState(v !== void 0 ? v : u),
    k = Bt(E, 2),
    D = k[0],
    _ = k[1],
    G = x.useCallback(
      function (T, N) {
        typeof s == "function" && s(T, N), _(T);
      },
      [s]
    ),
    oe = x.useCallback(
      function (T, N) {
        var V;
        typeof c == "function" && (V = c(T, N)), d(V !== void 0 ? V : T);
      },
      [c]
    ),
    Le = x.useCallback(
      function () {
        typeof h == "function" && h(), b(!0);
      },
      [h]
    ),
    nt = x.useCallback(
      function () {
        typeof p == "function" && p(), b(!1);
      },
      [p]
    ),
    se = a !== void 0 ? a : f,
    te = l !== void 0 ? l : P,
    $e = v !== void 0 ? v : D;
  return A(
    A({}, y),
    {},
    {
      inputValue: se,
      menuIsOpen: te,
      onChange: G,
      onInputChange: oe,
      onMenuClose: nt,
      onMenuOpen: Le,
      value: $e,
    }
  );
}
function $() {
  return (
    ($ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    $.apply(this, arguments)
  );
}
function k0(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Kf(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, Rm(r.key), r);
  }
}
function b0(e, t, n) {
  return (
    t && Kf(e.prototype, t),
    n && Kf(e, n),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function Hl(e, t) {
  return (
    (Hl = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, i) {
          return (r.__proto__ = i), r;
        }),
    Hl(e, t)
  );
}
function x0(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Hl(e, t);
}
function Eu(e) {
  return (
    (Eu = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Eu(e)
  );
}
function Dm() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (Dm = function () {
    return !!e;
  })();
}
function M0(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function T0(e, t) {
  if (t && (qn(t) === "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return M0(e);
}
function I0(e) {
  var t = Dm();
  return function () {
    var r = Eu(e),
      i;
    if (t) {
      var o = Eu(this).constructor;
      i = Reflect.construct(r, arguments, o);
    } else i = r.apply(this, arguments);
    return T0(this, i);
  };
}
function R0(e) {
  if (Array.isArray(e)) return Ul(e);
}
function L0(e) {
  if ((typeof Symbol < "u" && e[Symbol.iterator] != null) || e["@@iterator"] != null)
    return Array.from(e);
}
function D0() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function yc(e) {
  return R0(e) || L0(e) || Lm(e) || D0();
}
function F0(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function _0(e) {
  var t = document.createElement("style");
  return (
    t.setAttribute("data-emotion", e.key),
    e.nonce !== void 0 && t.setAttribute("nonce", e.nonce),
    t.appendChild(document.createTextNode("")),
    t.setAttribute("data-s", ""),
    t
  );
}
var A0 = (function () {
    function e(n) {
      var r = this;
      (this._insertTag = function (i) {
        var o;
        r.tags.length === 0
          ? r.insertionPoint
            ? (o = r.insertionPoint.nextSibling)
            : r.prepend
            ? (o = r.container.firstChild)
            : (o = r.before)
          : (o = r.tags[r.tags.length - 1].nextSibling),
          r.container.insertBefore(i, o),
          r.tags.push(i);
      }),
        (this.isSpeedy = n.speedy === void 0 ? !0 : n.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = n.nonce),
        (this.key = n.key),
        (this.container = n.container),
        (this.prepend = n.prepend),
        (this.insertionPoint = n.insertionPoint),
        (this.before = null);
    }
    var t = e.prototype;
    return (
      (t.hydrate = function (r) {
        r.forEach(this._insertTag);
      }),
      (t.insert = function (r) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(_0(this));
        var i = this.tags[this.tags.length - 1];
        if (this.isSpeedy) {
          var o = F0(i);
          try {
            o.insertRule(r, o.cssRules.length);
          } catch {}
        } else i.appendChild(document.createTextNode(r));
        this.ctr++;
      }),
      (t.flush = function () {
        this.tags.forEach(function (r) {
          return r.parentNode && r.parentNode.removeChild(r);
        }),
          (this.tags = []),
          (this.ctr = 0);
      }),
      e
    );
  })(),
  Te = "-ms-",
  Pu = "-moz-",
  B = "-webkit-",
  Fm = "comm",
  wc = "rule",
  Sc = "decl",
  N0 = "@import",
  _m = "@keyframes",
  $0 = "@layer",
  V0 = Math.abs,
  la = String.fromCharCode,
  z0 = Object.assign;
function j0(e, t) {
  return Pe(e, 0) ^ 45
    ? (((((((t << 2) ^ Pe(e, 0)) << 2) ^ Pe(e, 1)) << 2) ^ Pe(e, 2)) << 2) ^ Pe(e, 3)
    : 0;
}
function Am(e) {
  return e.trim();
}
function U0(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Q(e, t, n) {
  return e.replace(t, n);
}
function Bl(e, t) {
  return e.indexOf(t);
}
function Pe(e, t) {
  return e.charCodeAt(t) | 0;
}
function $i(e, t, n) {
  return e.slice(t, n);
}
function Tt(e) {
  return e.length;
}
function Oc(e) {
  return e.length;
}
function Io(e, t) {
  return t.push(e), e;
}
function H0(e, t) {
  return e.map(t).join("");
}
var sa = 1,
  Br = 1,
  Nm = 0,
  Qe = 0,
  ce = 0,
  qr = "";
function ca(e, t, n, r, i, o, u) {
  return {
    value: e,
    root: t,
    parent: n,
    type: r,
    props: i,
    children: o,
    line: sa,
    column: Br,
    length: u,
    return: "",
  };
}
function ii(e, t) {
  return z0(ca("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function B0() {
  return ce;
}
function Q0() {
  return (ce = Qe > 0 ? Pe(qr, --Qe) : 0), Br--, ce === 10 && ((Br = 1), sa--), ce;
}
function Xe() {
  return (ce = Qe < Nm ? Pe(qr, Qe++) : 0), Br++, ce === 10 && ((Br = 1), sa++), ce;
}
function _t() {
  return Pe(qr, Qe);
}
function Go() {
  return Qe;
}
function lo(e, t) {
  return $i(qr, e, t);
}
function Vi(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function $m(e) {
  return (sa = Br = 1), (Nm = Tt((qr = e))), (Qe = 0), [];
}
function Vm(e) {
  return (qr = ""), e;
}
function qo(e) {
  return Am(lo(Qe - 1, Ql(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function W0(e) {
  for (; (ce = _t()) && ce < 33; ) Xe();
  return Vi(e) > 2 || Vi(ce) > 3 ? "" : " ";
}
function K0(e, t) {
  for (; --t && Xe() && !(ce < 48 || ce > 102 || (ce > 57 && ce < 65) || (ce > 70 && ce < 97)); );
  return lo(e, Go() + (t < 6 && _t() == 32 && Xe() == 32));
}
function Ql(e) {
  for (; Xe(); )
    switch (ce) {
      case e:
        return Qe;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Ql(ce);
        break;
      case 40:
        e === 41 && Ql(e);
        break;
      case 92:
        Xe();
        break;
    }
  return Qe;
}
function G0(e, t) {
  for (; Xe() && e + ce !== 57; ) if (e + ce === 84 && _t() === 47) break;
  return "/*" + lo(t, Qe - 1) + "*" + la(e === 47 ? e : Xe());
}
function q0(e) {
  for (; !Vi(_t()); ) Xe();
  return lo(e, Qe);
}
function Y0(e) {
  return Vm(Yo("", null, null, null, [""], (e = $m(e)), 0, [0], e));
}
function Yo(e, t, n, r, i, o, u, a, l) {
  for (
    var s = 0,
      c = 0,
      p = u,
      h = 0,
      v = 0,
      y = 0,
      g = 1,
      O = 1,
      f = 1,
      d = 0,
      m = "",
      C = i,
      P = o,
      b = r,
      E = m;
    O;

  )
    switch (((y = d), (d = Xe()))) {
      case 40:
        if (y != 108 && Pe(E, p - 1) == 58) {
          Bl((E += Q(qo(d), "&", "&\f")), "&\f") != -1 && (f = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        E += qo(d);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        E += W0(y);
        break;
      case 92:
        E += K0(Go() - 1, 7);
        continue;
      case 47:
        switch (_t()) {
          case 42:
          case 47:
            Io(X0(G0(Xe(), Go()), t, n), l);
            break;
          default:
            E += "/";
        }
        break;
      case 123 * g:
        a[s++] = Tt(E) * f;
      case 125 * g:
      case 59:
      case 0:
        switch (d) {
          case 0:
          case 125:
            O = 0;
          case 59 + c:
            f == -1 && (E = Q(E, /\f/g, "")),
              v > 0 &&
                Tt(E) - p &&
                Io(v > 32 ? qf(E + ";", r, n, p - 1) : qf(Q(E, " ", "") + ";", r, n, p - 2), l);
            break;
          case 59:
            E += ";";
          default:
            if ((Io((b = Gf(E, t, n, s, c, i, a, m, (C = []), (P = []), p)), o), d === 123))
              if (c === 0) Yo(E, t, b, b, C, o, p, a, P);
              else
                switch (h === 99 && Pe(E, 3) === 110 ? 100 : h) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Yo(
                      e,
                      b,
                      b,
                      r && Io(Gf(e, b, b, 0, 0, i, a, m, i, (C = []), p), P),
                      i,
                      P,
                      p,
                      a,
                      r ? C : P
                    );
                    break;
                  default:
                    Yo(E, b, b, b, [""], P, 0, a, P);
                }
        }
        (s = c = v = 0), (g = f = 1), (m = E = ""), (p = u);
        break;
      case 58:
        (p = 1 + Tt(E)), (v = y);
      default:
        if (g < 1) {
          if (d == 123) --g;
          else if (d == 125 && g++ == 0 && Q0() == 125) continue;
        }
        switch (((E += la(d)), d * g)) {
          case 38:
            f = c > 0 ? 1 : ((E += "\f"), -1);
            break;
          case 44:
            (a[s++] = (Tt(E) - 1) * f), (f = 1);
            break;
          case 64:
            _t() === 45 && (E += qo(Xe())), (h = _t()), (c = p = Tt((m = E += q0(Go())))), d++;
            break;
          case 45:
            y === 45 && Tt(E) == 2 && (g = 0);
        }
    }
  return o;
}
function Gf(e, t, n, r, i, o, u, a, l, s, c) {
  for (var p = i - 1, h = i === 0 ? o : [""], v = Oc(h), y = 0, g = 0, O = 0; y < r; ++y)
    for (var f = 0, d = $i(e, p + 1, (p = V0((g = u[y])))), m = e; f < v; ++f)
      (m = Am(g > 0 ? h[f] + " " + d : Q(d, /&\f/g, h[f]))) && (l[O++] = m);
  return ca(e, t, n, i === 0 ? wc : a, l, s, c);
}
function X0(e, t, n) {
  return ca(e, t, n, Fm, la(B0()), $i(e, 2, -2), 0);
}
function qf(e, t, n, r) {
  return ca(e, t, n, Sc, $i(e, 0, r), $i(e, r + 1, -1), r);
}
function Sr(e, t) {
  for (var n = "", r = Oc(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
  return n;
}
function Z0(e, t, n, r) {
  switch (e.type) {
    case $0:
      if (e.children.length) break;
    case N0:
    case Sc:
      return (e.return = e.return || e.value);
    case Fm:
      return "";
    case _m:
      return (e.return = e.value + "{" + Sr(e.children, r) + "}");
    case wc:
      e.value = e.props.join(",");
  }
  return Tt((n = Sr(e.children, r))) ? (e.return = e.value + "{" + n + "}") : "";
}
function J0(e) {
  var t = Oc(e);
  return function (n, r, i, o) {
    for (var u = "", a = 0; a < t; a++) u += e[a](n, r, i, o) || "";
    return u;
  };
}
function e1(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
function t1(e) {
  var t = Object.create(null);
  return function (n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var n1 = function (t, n, r) {
    for (var i = 0, o = 0; (i = o), (o = _t()), i === 38 && o === 12 && (n[r] = 1), !Vi(o); ) Xe();
    return lo(t, Qe);
  },
  r1 = function (t, n) {
    var r = -1,
      i = 44;
    do
      switch (Vi(i)) {
        case 0:
          i === 38 && _t() === 12 && (n[r] = 1), (t[r] += n1(Qe - 1, n, r));
          break;
        case 2:
          t[r] += qo(i);
          break;
        case 4:
          if (i === 44) {
            (t[++r] = _t() === 58 ? "&\f" : ""), (n[r] = t[r].length);
            break;
          }
        default:
          t[r] += la(i);
      }
    while ((i = Xe()));
    return t;
  },
  i1 = function (t, n) {
    return Vm(r1($m(t), n));
  },
  Yf = new WeakMap(),
  o1 = function (t) {
    if (!(t.type !== "rule" || !t.parent || t.length < 1)) {
      for (
        var n = t.value, r = t.parent, i = t.column === r.column && t.line === r.line;
        r.type !== "rule";

      )
        if (((r = r.parent), !r)) return;
      if (!(t.props.length === 1 && n.charCodeAt(0) !== 58 && !Yf.get(r)) && !i) {
        Yf.set(t, !0);
        for (var o = [], u = i1(n, o), a = r.props, l = 0, s = 0; l < u.length; l++)
          for (var c = 0; c < a.length; c++, s++)
            t.props[s] = o[l] ? u[l].replace(/&\f/g, a[c]) : a[c] + " " + u[l];
      }
    }
  },
  u1 = function (t) {
    if (t.type === "decl") {
      var n = t.value;
      n.charCodeAt(0) === 108 && n.charCodeAt(2) === 98 && ((t.return = ""), (t.value = ""));
    }
  };
function zm(e, t) {
  switch (j0(e, t)) {
    case 5103:
      return B + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return B + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return B + e + Pu + e + Te + e + e;
    case 6828:
    case 4268:
      return B + e + Te + e + e;
    case 6165:
      return B + e + Te + "flex-" + e + e;
    case 5187:
      return B + e + Q(e, /(\w+).+(:[^]+)/, B + "box-$1$2" + Te + "flex-$1$2") + e;
    case 5443:
      return B + e + Te + "flex-item-" + Q(e, /flex-|-self/, "") + e;
    case 4675:
      return B + e + Te + "flex-line-pack" + Q(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return B + e + Te + Q(e, "shrink", "negative") + e;
    case 5292:
      return B + e + Te + Q(e, "basis", "preferred-size") + e;
    case 6060:
      return B + "box-" + Q(e, "-grow", "") + B + e + Te + Q(e, "grow", "positive") + e;
    case 4554:
      return B + Q(e, /([^-])(transform)/g, "$1" + B + "$2") + e;
    case 6187:
      return Q(Q(Q(e, /(zoom-|grab)/, B + "$1"), /(image-set)/, B + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return Q(e, /(image-set\([^]*)/, B + "$1$`$1");
    case 4968:
      return (
        Q(
          Q(e, /(.+:)(flex-)?(.*)/, B + "box-pack:$3" + Te + "flex-pack:$3"),
          /s.+-b[^;]+/,
          "justify"
        ) +
        B +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Q(e, /(.+)-inline(.+)/, B + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Tt(e) - 1 - t > 6)
        switch (Pe(e, t + 1)) {
          case 109:
            if (Pe(e, t + 4) !== 45) break;
          case 102:
            return (
              Q(
                e,
                /(.+:)(.+)-([^]+)/,
                "$1" + B + "$2-$3$1" + Pu + (Pe(e, t + 3) == 108 ? "$3" : "$2-$3")
              ) + e
            );
          case 115:
            return ~Bl(e, "stretch") ? zm(Q(e, "stretch", "fill-available"), t) + e : e;
        }
      break;
    case 4949:
      if (Pe(e, t + 1) !== 115) break;
    case 6444:
      switch (Pe(e, Tt(e) - 3 - (~Bl(e, "!important") && 10))) {
        case 107:
          return Q(e, ":", ":" + B) + e;
        case 101:
          return (
            Q(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              "$1" +
                B +
                (Pe(e, 14) === 45 ? "inline-" : "") +
                "box$3$1" +
                B +
                "$2$3$1" +
                Te +
                "$2box$3"
            ) + e
          );
      }
      break;
    case 5936:
      switch (Pe(e, t + 11)) {
        case 114:
          return B + e + Te + Q(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return B + e + Te + Q(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return B + e + Te + Q(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return B + e + Te + e + e;
  }
  return e;
}
var a1 = function (t, n, r, i) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case Sc:
          t.return = zm(t.value, t.length);
          break;
        case _m:
          return Sr([ii(t, { value: Q(t.value, "@", "@" + B) })], i);
        case wc:
          if (t.length)
            return H0(t.props, function (o) {
              switch (U0(o, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return Sr([ii(t, { props: [Q(o, /:(read-\w+)/, ":" + Pu + "$1")] })], i);
                case "::placeholder":
                  return Sr(
                    [
                      ii(t, { props: [Q(o, /:(plac\w+)/, ":" + B + "input-$1")] }),
                      ii(t, { props: [Q(o, /:(plac\w+)/, ":" + Pu + "$1")] }),
                      ii(t, { props: [Q(o, /:(plac\w+)/, Te + "input-$1")] }),
                    ],
                    i
                  );
              }
              return "";
            });
      }
  },
  l1 = [a1],
  s1 = function (t) {
    var n = t.key;
    if (n === "css") {
      var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
      Array.prototype.forEach.call(r, function (g) {
        var O = g.getAttribute("data-emotion");
        O.indexOf(" ") !== -1 && (document.head.appendChild(g), g.setAttribute("data-s", ""));
      });
    }
    var i = t.stylisPlugins || l1,
      o = {},
      u,
      a = [];
    (u = t.container || document.head),
      Array.prototype.forEach.call(
        document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
        function (g) {
          for (var O = g.getAttribute("data-emotion").split(" "), f = 1; f < O.length; f++)
            o[O[f]] = !0;
          a.push(g);
        }
      );
    var l,
      s = [o1, u1];
    {
      var c,
        p = [
          Z0,
          e1(function (g) {
            c.insert(g);
          }),
        ],
        h = J0(s.concat(i, p)),
        v = function (O) {
          return Sr(Y0(O), h);
        };
      l = function (O, f, d, m) {
        (c = d), v(O ? O + "{" + f.styles + "}" : f.styles), m && (y.inserted[f.name] = !0);
      };
    }
    var y = {
      key: n,
      sheet: new A0({
        key: n,
        container: u,
        nonce: t.nonce,
        speedy: t.speedy,
        prepend: t.prepend,
        insertionPoint: t.insertionPoint,
      }),
      nonce: t.nonce,
      inserted: o,
      registered: {},
      insert: l,
    };
    return y.sheet.hydrate(a), y;
  },
  jm = hg,
  c1 = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 },
  f1 = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },
  Um = {};
Um[jm.ForwardRef] = c1;
Um[jm.Memo] = f1;
var d1 = !0;
function p1(e, t, n) {
  var r = "";
  return (
    n.split(" ").forEach(function (i) {
      e[i] !== void 0 ? t.push(e[i] + ";") : (r += i + " ");
    }),
    r
  );
}
var Hm = function (t, n, r) {
    var i = t.key + "-" + n.name;
    (r === !1 || d1 === !1) && t.registered[i] === void 0 && (t.registered[i] = n.styles);
  },
  h1 = function (t, n, r) {
    Hm(t, n, r);
    var i = t.key + "-" + n.name;
    if (t.inserted[n.name] === void 0) {
      var o = n;
      do t.insert(n === o ? "." + i : "", o, t.sheet, !0), (o = o.next);
      while (o !== void 0);
    }
  };
function m1(e) {
  for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4)
    (n =
      (e.charCodeAt(r) & 255) |
      ((e.charCodeAt(++r) & 255) << 8) |
      ((e.charCodeAt(++r) & 255) << 16) |
      ((e.charCodeAt(++r) & 255) << 24)),
      (n = (n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)),
      (n ^= n >>> 24),
      (t =
        ((n & 65535) * 1540483477 + (((n >>> 16) * 59797) << 16)) ^
        ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
  switch (i) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      (t ^= e.charCodeAt(r) & 255), (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16));
  }
  return (
    (t ^= t >>> 13),
    (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
    ((t ^ (t >>> 15)) >>> 0).toString(36)
  );
}
var v1 = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  g1 = /[A-Z]|^ms/g,
  y1 = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  Bm = function (t) {
    return t.charCodeAt(1) === 45;
  },
  Xf = function (t) {
    return t != null && typeof t != "boolean";
  },
  za = t1(function (e) {
    return Bm(e) ? e : e.replace(g1, "-$&").toLowerCase();
  }),
  Zf = function (t, n) {
    switch (t) {
      case "animation":
      case "animationName":
        if (typeof n == "string")
          return n.replace(y1, function (r, i, o) {
            return (It = { name: i, styles: o, next: It }), i;
          });
    }
    return v1[t] !== 1 && !Bm(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
  };
function zi(e, t, n) {
  if (n == null) return "";
  if (n.__emotion_styles !== void 0) return n;
  switch (typeof n) {
    case "boolean":
      return "";
    case "object": {
      if (n.anim === 1) return (It = { name: n.name, styles: n.styles, next: It }), n.name;
      if (n.styles !== void 0) {
        var r = n.next;
        if (r !== void 0)
          for (; r !== void 0; ) (It = { name: r.name, styles: r.styles, next: It }), (r = r.next);
        var i = n.styles + ";";
        return i;
      }
      return w1(e, t, n);
    }
    case "function": {
      if (e !== void 0) {
        var o = It,
          u = n(e);
        return (It = o), zi(e, t, u);
      }
      break;
    }
  }
  if (t == null) return n;
  var a = t[n];
  return a !== void 0 ? a : n;
}
function w1(e, t, n) {
  var r = "";
  if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += zi(e, t, n[i]) + ";";
  else
    for (var o in n) {
      var u = n[o];
      if (typeof u != "object")
        t != null && t[u] !== void 0
          ? (r += o + "{" + t[u] + "}")
          : Xf(u) && (r += za(o) + ":" + Zf(o, u) + ";");
      else if (Array.isArray(u) && typeof u[0] == "string" && (t == null || t[u[0]] === void 0))
        for (var a = 0; a < u.length; a++) Xf(u[a]) && (r += za(o) + ":" + Zf(o, u[a]) + ";");
      else {
        var l = zi(e, t, u);
        switch (o) {
          case "animation":
          case "animationName": {
            r += za(o) + ":" + l + ";";
            break;
          }
          default:
            r += o + "{" + l + "}";
        }
      }
    }
  return r;
}
var Jf = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  It,
  Qm = function (t, n, r) {
    if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
      return t[0];
    var i = !0,
      o = "";
    It = void 0;
    var u = t[0];
    u == null || u.raw === void 0 ? ((i = !1), (o += zi(r, n, u))) : (o += u[0]);
    for (var a = 1; a < t.length; a++) (o += zi(r, n, t[a])), i && (o += u[a]);
    Jf.lastIndex = 0;
    for (var l = "", s; (s = Jf.exec(o)) !== null; ) l += "-" + s[1];
    var c = m1(o) + l;
    return { name: c, styles: o, next: It };
  },
  S1 = function (t) {
    return t();
  },
  O1 = Vc.useInsertionEffect ? Vc.useInsertionEffect : !1,
  C1 = O1 || S1,
  Cc = {}.hasOwnProperty,
  Wm = x.createContext(typeof HTMLElement < "u" ? s1({ key: "css" }) : null);
Wm.Provider;
var E1 = function (t) {
    return x.forwardRef(function (n, r) {
      var i = x.useContext(Wm);
      return t(n, i, r);
    });
  },
  P1 = x.createContext({}),
  Wl = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__",
  k1 = function (t, n) {
    var r = {};
    for (var i in n) Cc.call(n, i) && (r[i] = n[i]);
    return (r[Wl] = t), r;
  },
  b1 = function (t) {
    var n = t.cache,
      r = t.serialized,
      i = t.isStringTag;
    return (
      Hm(n, r, i),
      C1(function () {
        return h1(n, r, i);
      }),
      null
    );
  },
  x1 = E1(function (e, t, n) {
    var r = e.css;
    typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
    var i = e[Wl],
      o = [r],
      u = "";
    typeof e.className == "string"
      ? (u = p1(t.registered, o, e.className))
      : e.className != null && (u = e.className + " ");
    var a = Qm(o, void 0, x.useContext(P1));
    u += t.key + "-" + a.name;
    var l = {};
    for (var s in e) Cc.call(e, s) && s !== "css" && s !== Wl && (l[s] = e[s]);
    return (
      (l.ref = n),
      (l.className = u),
      x.createElement(
        x.Fragment,
        null,
        x.createElement(b1, { cache: t, serialized: a, isStringTag: typeof i == "string" }),
        x.createElement(i, l)
      )
    );
  }),
  M1 = x1,
  F = function (t, n) {
    var r = arguments;
    if (n == null || !Cc.call(n, "css")) return x.createElement.apply(void 0, r);
    var i = r.length,
      o = new Array(i);
    (o[0] = M1), (o[1] = k1(t, n));
    for (var u = 2; u < i; u++) o[u] = r[u];
    return x.createElement.apply(null, o);
  };
function Ec() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return Qm(t);
}
var T1 = function () {
  var t = Ec.apply(void 0, arguments),
    n = "animation-" + t.name;
  return {
    name: n,
    styles: "@keyframes " + n + "{" + t.styles + "}",
    anim: 1,
    toString: function () {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    },
  };
};
function I1(e, t) {
  return (
    t || (t = e.slice(0)),
    Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }))
  );
}
const R1 = Math.min,
  L1 = Math.max,
  ku = Math.round,
  Ro = Math.floor,
  bu = (e) => ({ x: e, y: e });
function D1(e) {
  return { ...e, top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height };
}
function Km(e) {
  return qm(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ot(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Gm(e) {
  var t;
  return (t = (qm(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function qm(e) {
  return e instanceof Node || e instanceof Ot(e).Node;
}
function Kl(e) {
  return e instanceof Element || e instanceof Ot(e).Element;
}
function Pc(e) {
  return e instanceof HTMLElement || e instanceof Ot(e).HTMLElement;
}
function ed(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ot(e).ShadowRoot;
}
function Ym(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: i } = kc(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function F1() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function _1(e) {
  return ["html", "body", "#document"].includes(Km(e));
}
function kc(e) {
  return Ot(e).getComputedStyle(e);
}
function A1(e) {
  if (Km(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (ed(e) && e.host) || Gm(e);
  return ed(t) ? t.host : t;
}
function Xm(e) {
  const t = A1(e);
  return _1(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : Pc(t) && Ym(t) ? t : Xm(t);
}
function xu(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = Xm(e),
    o = i === ((r = e.ownerDocument) == null ? void 0 : r.body),
    u = Ot(i);
  return o
    ? t.concat(
        u,
        u.visualViewport || [],
        Ym(i) ? i : [],
        u.frameElement && n ? xu(u.frameElement) : []
      )
    : t.concat(i, xu(i, [], n));
}
function N1(e) {
  const t = kc(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const i = Pc(e),
    o = i ? e.offsetWidth : n,
    u = i ? e.offsetHeight : r,
    a = ku(n) !== o || ku(r) !== u;
  return a && ((n = o), (r = u)), { width: n, height: r, $: a };
}
function bc(e) {
  return Kl(e) ? e : e.contextElement;
}
function ja(e) {
  const t = bc(e);
  if (!Pc(t)) return bu(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: i, $: o } = N1(t);
  let u = (o ? ku(n.width) : n.width) / r,
    a = (o ? ku(n.height) : n.height) / i;
  return (
    (!u || !Number.isFinite(u)) && (u = 1), (!a || !Number.isFinite(a)) && (a = 1), { x: u, y: a }
  );
}
const $1 = bu(0);
function V1(e) {
  const t = Ot(e);
  return !F1() || !t.visualViewport
    ? $1
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function z1(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== Ot(e)) ? !1 : t;
}
function td(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(),
    o = bc(e);
  let u = bu(1);
  t && (r ? Kl(r) && (u = ja(r)) : (u = ja(e)));
  const a = z1(o, n, r) ? V1(o) : bu(0);
  let l = (i.left + a.x) / u.x,
    s = (i.top + a.y) / u.y,
    c = i.width / u.x,
    p = i.height / u.y;
  if (o) {
    const h = Ot(o),
      v = r && Kl(r) ? Ot(r) : r;
    let y = h.frameElement;
    for (; y && r && v !== h; ) {
      const g = ja(y),
        O = y.getBoundingClientRect(),
        f = kc(y),
        d = O.left + (y.clientLeft + parseFloat(f.paddingLeft)) * g.x,
        m = O.top + (y.clientTop + parseFloat(f.paddingTop)) * g.y;
      (l *= g.x), (s *= g.y), (c *= g.x), (p *= g.y), (l += d), (s += m), (y = Ot(y).frameElement);
    }
  }
  return D1({ width: c, height: p, x: l, y: s });
}
function j1(e, t) {
  let n = null,
    r;
  const i = Gm(e);
  function o() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), (n = null);
  }
  function u(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), o();
    const { left: s, top: c, width: p, height: h } = e.getBoundingClientRect();
    if ((a || t(), !p || !h)) return;
    const v = Ro(c),
      y = Ro(i.clientWidth - (s + p)),
      g = Ro(i.clientHeight - (c + h)),
      O = Ro(s),
      d = {
        rootMargin: -v + "px " + -y + "px " + -g + "px " + -O + "px",
        threshold: L1(0, R1(1, l)) || 1,
      };
    let m = !0;
    function C(P) {
      const b = P[0].intersectionRatio;
      if (b !== l) {
        if (!m) return u();
        b
          ? u(!1, b)
          : (r = setTimeout(() => {
              u(!1, 1e-7);
            }, 100));
      }
      m = !1;
    }
    try {
      n = new IntersectionObserver(C, { ...d, root: i.ownerDocument });
    } catch {
      n = new IntersectionObserver(C, d);
    }
    n.observe(e);
  }
  return u(!0), o;
}
function U1(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: i = !0,
      ancestorResize: o = !0,
      elementResize: u = typeof ResizeObserver == "function",
      layoutShift: a = typeof IntersectionObserver == "function",
      animationFrame: l = !1,
    } = r,
    s = bc(e),
    c = i || o ? [...(s ? xu(s) : []), ...xu(t)] : [];
  c.forEach((f) => {
    i && f.addEventListener("scroll", n, { passive: !0 }), o && f.addEventListener("resize", n);
  });
  const p = s && a ? j1(s, n) : null;
  let h = -1,
    v = null;
  u &&
    ((v = new ResizeObserver((f) => {
      let [d] = f;
      d &&
        d.target === s &&
        v &&
        (v.unobserve(t),
        cancelAnimationFrame(h),
        (h = requestAnimationFrame(() => {
          var m;
          (m = v) == null || m.observe(t);
        }))),
        n();
    })),
    s && !l && v.observe(s),
    v.observe(t));
  let y,
    g = l ? td(e) : null;
  l && O();
  function O() {
    const f = td(e);
    g && (f.x !== g.x || f.y !== g.y || f.width !== g.width || f.height !== g.height) && n(),
      (g = f),
      (y = requestAnimationFrame(O));
  }
  return (
    n(),
    () => {
      var f;
      c.forEach((d) => {
        i && d.removeEventListener("scroll", n), o && d.removeEventListener("resize", n);
      }),
        p == null || p(),
        (f = v) == null || f.disconnect(),
        (v = null),
        l && cancelAnimationFrame(y);
    }
  );
}
var Gl = x.useLayoutEffect,
  H1 = [
    "className",
    "clearValue",
    "cx",
    "getStyles",
    "getClassNames",
    "getValue",
    "hasValue",
    "isMulti",
    "isRtl",
    "options",
    "selectOption",
    "selectProps",
    "setValue",
    "theme",
  ],
  Mu = function () {};
function B1(e, t) {
  return t ? (t[0] === "-" ? e + t : e + "__" + t) : e;
}
function Q1(e, t) {
  for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    r[i - 2] = arguments[i];
  var o = [].concat(r);
  if (t && e) for (var u in t) t.hasOwnProperty(u) && t[u] && o.push("".concat(B1(e, u)));
  return o
    .filter(function (a) {
      return a;
    })
    .map(function (a) {
      return String(a).trim();
    })
    .join(" ");
}
var nd = function (t) {
    return ew(t) ? t.filter(Boolean) : qn(t) === "object" && t !== null ? [t] : [];
  },
  Zm = function (t) {
    t.className,
      t.clearValue,
      t.cx,
      t.getStyles,
      t.getClassNames,
      t.getValue,
      t.hasValue,
      t.isMulti,
      t.isRtl,
      t.options,
      t.selectOption,
      t.selectProps,
      t.setValue,
      t.theme;
    var n = Xt(t, H1);
    return A({}, n);
  },
  ae = function (t, n, r) {
    var i = t.cx,
      o = t.getStyles,
      u = t.getClassNames,
      a = t.className;
    return { css: o(n, t), className: i(r ?? {}, u(n, t), a) };
  };
function fa(e) {
  return [document.documentElement, document.body, window].indexOf(e) > -1;
}
function W1(e) {
  return fa(e) ? window.innerHeight : e.clientHeight;
}
function Jm(e) {
  return fa(e) ? window.pageYOffset : e.scrollTop;
}
function Tu(e, t) {
  if (fa(e)) {
    window.scrollTo(0, t);
    return;
  }
  e.scrollTop = t;
}
function K1(e) {
  var t = getComputedStyle(e),
    n = t.position === "absolute",
    r = /(auto|scroll)/;
  if (t.position === "fixed") return document.documentElement;
  for (var i = e; (i = i.parentElement); )
    if (
      ((t = getComputedStyle(i)),
      !(n && t.position === "static") && r.test(t.overflow + t.overflowY + t.overflowX))
    )
      return i;
  return document.documentElement;
}
function G1(e, t, n, r) {
  return n * ((e = e / r - 1) * e * e + 1) + t;
}
function Lo(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 200,
    r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Mu,
    i = Jm(e),
    o = t - i,
    u = 10,
    a = 0;
  function l() {
    a += u;
    var s = G1(a, i, o, n);
    Tu(e, s), a < n ? window.requestAnimationFrame(l) : r(e);
  }
  l();
}
function rd(e, t) {
  var n = e.getBoundingClientRect(),
    r = t.getBoundingClientRect(),
    i = t.offsetHeight / 3;
  r.bottom + i > n.bottom
    ? Tu(e, Math.min(t.offsetTop + t.clientHeight - e.offsetHeight + i, e.scrollHeight))
    : r.top - i < n.top && Tu(e, Math.max(t.offsetTop - i, 0));
}
function q1(e) {
  var t = e.getBoundingClientRect();
  return {
    bottom: t.bottom,
    height: t.height,
    left: t.left,
    right: t.right,
    top: t.top,
    width: t.width,
  };
}
function id() {
  try {
    return document.createEvent("TouchEvent"), !0;
  } catch {
    return !1;
  }
}
function Y1() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  } catch {
    return !1;
  }
}
var ev = !1,
  X1 = {
    get passive() {
      return (ev = !0);
    },
  },
  Do = typeof window < "u" ? window : {};
Do.addEventListener &&
  Do.removeEventListener &&
  (Do.addEventListener("p", Mu, X1), Do.removeEventListener("p", Mu, !1));
var Z1 = ev;
function J1(e) {
  return e != null;
}
function ew(e) {
  return Array.isArray(e);
}
function Fo(e, t, n) {
  return e ? t : n;
}
var tw = function (t) {
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    var o = Object.entries(t).filter(function (u) {
      var a = Bt(u, 1),
        l = a[0];
      return !r.includes(l);
    });
    return o.reduce(function (u, a) {
      var l = Bt(a, 2),
        s = l[0],
        c = l[1];
      return (u[s] = c), u;
    }, {});
  },
  nw = ["children", "innerProps"],
  rw = ["children", "innerProps"];
function iw(e) {
  var t = e.maxHeight,
    n = e.menuEl,
    r = e.minHeight,
    i = e.placement,
    o = e.shouldScroll,
    u = e.isFixedPosition,
    a = e.controlHeight,
    l = K1(n),
    s = { placement: "bottom", maxHeight: t };
  if (!n || !n.offsetParent) return s;
  var c = l.getBoundingClientRect(),
    p = c.height,
    h = n.getBoundingClientRect(),
    v = h.bottom,
    y = h.height,
    g = h.top,
    O = n.offsetParent.getBoundingClientRect(),
    f = O.top,
    d = u ? window.innerHeight : W1(l),
    m = Jm(l),
    C = parseInt(getComputedStyle(n).marginBottom, 10),
    P = parseInt(getComputedStyle(n).marginTop, 10),
    b = f - P,
    E = d - g,
    k = b + m,
    D = p - m - g,
    _ = v - d + m + C,
    G = m + g - P,
    oe = 160;
  switch (i) {
    case "auto":
    case "bottom":
      if (E >= y) return { placement: "bottom", maxHeight: t };
      if (D >= y && !u) return o && Lo(l, _, oe), { placement: "bottom", maxHeight: t };
      if ((!u && D >= r) || (u && E >= r)) {
        o && Lo(l, _, oe);
        var Le = u ? E - C : D - C;
        return { placement: "bottom", maxHeight: Le };
      }
      if (i === "auto" || u) {
        var nt = t,
          se = u ? b : k;
        return se >= r && (nt = Math.min(se - C - a, t)), { placement: "top", maxHeight: nt };
      }
      if (i === "bottom") return o && Tu(l, _), { placement: "bottom", maxHeight: t };
      break;
    case "top":
      if (b >= y) return { placement: "top", maxHeight: t };
      if (k >= y && !u) return o && Lo(l, G, oe), { placement: "top", maxHeight: t };
      if ((!u && k >= r) || (u && b >= r)) {
        var te = t;
        return (
          ((!u && k >= r) || (u && b >= r)) && (te = u ? b - P : k - P),
          o && Lo(l, G, oe),
          { placement: "top", maxHeight: te }
        );
      }
      return { placement: "bottom", maxHeight: t };
    default:
      throw new Error('Invalid placement provided "'.concat(i, '".'));
  }
  return s;
}
function ow(e) {
  var t = { bottom: "top", top: "bottom" };
  return e ? t[e] : "bottom";
}
var tv = function (t) {
    return t === "auto" ? "bottom" : t;
  },
  uw = function (t, n) {
    var r,
      i = t.placement,
      o = t.theme,
      u = o.borderRadius,
      a = o.spacing,
      l = o.colors;
    return A(
      ((r = { label: "menu" }),
      ci(r, ow(i), "100%"),
      ci(r, "position", "absolute"),
      ci(r, "width", "100%"),
      ci(r, "zIndex", 1),
      r),
      n
        ? {}
        : {
            backgroundColor: l.neutral0,
            borderRadius: u,
            boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)",
            marginBottom: a.menuGutter,
            marginTop: a.menuGutter,
          }
    );
  },
  nv = x.createContext(null),
  aw = function (t) {
    var n = t.children,
      r = t.minMenuHeight,
      i = t.maxMenuHeight,
      o = t.menuPlacement,
      u = t.menuPosition,
      a = t.menuShouldScrollIntoView,
      l = t.theme,
      s = x.useContext(nv) || {},
      c = s.setPortalPlacement,
      p = x.useRef(null),
      h = x.useState(i),
      v = Bt(h, 2),
      y = v[0],
      g = v[1],
      O = x.useState(null),
      f = Bt(O, 2),
      d = f[0],
      m = f[1],
      C = l.spacing.controlHeight;
    return (
      Gl(
        function () {
          var P = p.current;
          if (P) {
            var b = u === "fixed",
              E = a && !b,
              k = iw({
                maxHeight: i,
                menuEl: P,
                minHeight: r,
                placement: o,
                shouldScroll: E,
                isFixedPosition: b,
                controlHeight: C,
              });
            g(k.maxHeight), m(k.placement), c == null || c(k.placement);
          }
        },
        [i, o, u, a, r, c, C]
      ),
      n({ ref: p, placerProps: A(A({}, t), {}, { placement: d || tv(o), maxHeight: y }) })
    );
  },
  lw = function (t) {
    var n = t.children,
      r = t.innerRef,
      i = t.innerProps;
    return F("div", $({}, ae(t, "menu", { menu: !0 }), { ref: r }, i), n);
  },
  sw = lw,
  cw = function (t, n) {
    var r = t.maxHeight,
      i = t.theme.spacing.baseUnit;
    return A(
      { maxHeight: r, overflowY: "auto", position: "relative", WebkitOverflowScrolling: "touch" },
      n ? {} : { paddingBottom: i, paddingTop: i }
    );
  },
  fw = function (t) {
    var n = t.children,
      r = t.innerProps,
      i = t.innerRef,
      o = t.isMulti;
    return F(
      "div",
      $({}, ae(t, "menuList", { "menu-list": !0, "menu-list--is-multi": o }), { ref: i }, r),
      n
    );
  },
  rv = function (t, n) {
    var r = t.theme,
      i = r.spacing.baseUnit,
      o = r.colors;
    return A(
      { textAlign: "center" },
      n ? {} : { color: o.neutral40, padding: "".concat(i * 2, "px ").concat(i * 3, "px") }
    );
  },
  dw = rv,
  pw = rv,
  hw = function (t) {
    var n = t.children,
      r = n === void 0 ? "No options" : n,
      i = t.innerProps,
      o = Xt(t, nw);
    return F(
      "div",
      $(
        {},
        ae(A(A({}, o), {}, { children: r, innerProps: i }), "noOptionsMessage", {
          "menu-notice": !0,
          "menu-notice--no-options": !0,
        }),
        i
      ),
      r
    );
  },
  mw = function (t) {
    var n = t.children,
      r = n === void 0 ? "Loading..." : n,
      i = t.innerProps,
      o = Xt(t, rw);
    return F(
      "div",
      $(
        {},
        ae(A(A({}, o), {}, { children: r, innerProps: i }), "loadingMessage", {
          "menu-notice": !0,
          "menu-notice--loading": !0,
        }),
        i
      ),
      r
    );
  },
  vw = function (t) {
    var n = t.rect,
      r = t.offset,
      i = t.position;
    return { left: n.left, position: i, top: r, width: n.width, zIndex: 1 };
  },
  gw = function (t) {
    var n = t.appendTo,
      r = t.children,
      i = t.controlElement,
      o = t.innerProps,
      u = t.menuPlacement,
      a = t.menuPosition,
      l = x.useRef(null),
      s = x.useRef(null),
      c = x.useState(tv(u)),
      p = Bt(c, 2),
      h = p[0],
      v = p[1],
      y = x.useMemo(function () {
        return { setPortalPlacement: v };
      }, []),
      g = x.useState(null),
      O = Bt(g, 2),
      f = O[0],
      d = O[1],
      m = x.useCallback(
        function () {
          if (i) {
            var E = q1(i),
              k = a === "fixed" ? 0 : window.pageYOffset,
              D = E[h] + k;
            (D !== (f == null ? void 0 : f.offset) ||
              E.left !== (f == null ? void 0 : f.rect.left) ||
              E.width !== (f == null ? void 0 : f.rect.width)) &&
              d({ offset: D, rect: E });
          }
        },
        [
          i,
          a,
          h,
          f == null ? void 0 : f.offset,
          f == null ? void 0 : f.rect.left,
          f == null ? void 0 : f.rect.width,
        ]
      );
    Gl(
      function () {
        m();
      },
      [m]
    );
    var C = x.useCallback(
      function () {
        typeof s.current == "function" && (s.current(), (s.current = null)),
          i &&
            l.current &&
            (s.current = U1(i, l.current, m, { elementResize: "ResizeObserver" in window }));
      },
      [i, m]
    );
    Gl(
      function () {
        C();
      },
      [C]
    );
    var P = x.useCallback(
      function (E) {
        (l.current = E), C();
      },
      [C]
    );
    if ((!n && a !== "fixed") || !f) return null;
    var b = F(
      "div",
      $(
        { ref: P },
        ae(A(A({}, t), {}, { offset: f.offset, position: a, rect: f.rect }), "menuPortal", {
          "menu-portal": !0,
        }),
        o
      ),
      r
    );
    return F(nv.Provider, { value: y }, n ? Im.createPortal(b, n) : b);
  },
  yw = function (t) {
    var n = t.isDisabled,
      r = t.isRtl;
    return {
      label: "container",
      direction: r ? "rtl" : void 0,
      pointerEvents: n ? "none" : void 0,
      position: "relative",
    };
  },
  ww = function (t) {
    var n = t.children,
      r = t.innerProps,
      i = t.isDisabled,
      o = t.isRtl;
    return F("div", $({}, ae(t, "container", { "--is-disabled": i, "--is-rtl": o }), r), n);
  },
  Sw = function (t, n) {
    var r = t.theme.spacing,
      i = t.isMulti,
      o = t.hasValue,
      u = t.selectProps.controlShouldRenderValue;
    return A(
      {
        alignItems: "center",
        display: i && o && u ? "flex" : "grid",
        flex: 1,
        flexWrap: "wrap",
        WebkitOverflowScrolling: "touch",
        position: "relative",
        overflow: "hidden",
      },
      n ? {} : { padding: "".concat(r.baseUnit / 2, "px ").concat(r.baseUnit * 2, "px") }
    );
  },
  Ow = function (t) {
    var n = t.children,
      r = t.innerProps,
      i = t.isMulti,
      o = t.hasValue;
    return F(
      "div",
      $(
        {},
        ae(t, "valueContainer", {
          "value-container": !0,
          "value-container--is-multi": i,
          "value-container--has-value": o,
        }),
        r
      ),
      n
    );
  },
  Cw = function () {
    return { alignItems: "center", alignSelf: "stretch", display: "flex", flexShrink: 0 };
  },
  Ew = function (t) {
    var n = t.children,
      r = t.innerProps;
    return F("div", $({}, ae(t, "indicatorsContainer", { indicators: !0 }), r), n);
  },
  od,
  Pw = ["size"],
  kw = ["innerProps", "isRtl", "size"],
  bw = {
    name: "8mmkcg",
    styles:
      "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0",
  },
  iv = function (t) {
    var n = t.size,
      r = Xt(t, Pw);
    return F(
      "svg",
      $(
        {
          height: n,
          width: n,
          viewBox: "0 0 20 20",
          "aria-hidden": "true",
          focusable: "false",
          css: bw,
        },
        r
      )
    );
  },
  xc = function (t) {
    return F(
      iv,
      $({ size: 20 }, t),
      F("path", {
        d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z",
      })
    );
  },
  ov = function (t) {
    return F(
      iv,
      $({ size: 20 }, t),
      F("path", {
        d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z",
      })
    );
  },
  uv = function (t, n) {
    var r = t.isFocused,
      i = t.theme,
      o = i.spacing.baseUnit,
      u = i.colors;
    return A(
      { label: "indicatorContainer", display: "flex", transition: "color 150ms" },
      n
        ? {}
        : {
            color: r ? u.neutral60 : u.neutral20,
            padding: o * 2,
            ":hover": { color: r ? u.neutral80 : u.neutral40 },
          }
    );
  },
  xw = uv,
  Mw = function (t) {
    var n = t.children,
      r = t.innerProps;
    return F(
      "div",
      $({}, ae(t, "dropdownIndicator", { indicator: !0, "dropdown-indicator": !0 }), r),
      n || F(ov, null)
    );
  },
  Tw = uv,
  Iw = function (t) {
    var n = t.children,
      r = t.innerProps;
    return F(
      "div",
      $({}, ae(t, "clearIndicator", { indicator: !0, "clear-indicator": !0 }), r),
      n || F(xc, null)
    );
  },
  Rw = function (t, n) {
    var r = t.isDisabled,
      i = t.theme,
      o = i.spacing.baseUnit,
      u = i.colors;
    return A(
      { label: "indicatorSeparator", alignSelf: "stretch", width: 1 },
      n
        ? {}
        : { backgroundColor: r ? u.neutral10 : u.neutral20, marginBottom: o * 2, marginTop: o * 2 }
    );
  },
  Lw = function (t) {
    var n = t.innerProps;
    return F("span", $({}, n, ae(t, "indicatorSeparator", { "indicator-separator": !0 })));
  },
  Dw = T1(
    od ||
      (od = I1([
        `
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`,
      ]))
  ),
  Fw = function (t, n) {
    var r = t.isFocused,
      i = t.size,
      o = t.theme,
      u = o.colors,
      a = o.spacing.baseUnit;
    return A(
      {
        label: "loadingIndicator",
        display: "flex",
        transition: "color 150ms",
        alignSelf: "center",
        fontSize: i,
        lineHeight: 1,
        marginRight: i,
        textAlign: "center",
        verticalAlign: "middle",
      },
      n ? {} : { color: r ? u.neutral60 : u.neutral20, padding: a * 2 }
    );
  },
  Ua = function (t) {
    var n = t.delay,
      r = t.offset;
    return F("span", {
      css: Ec(
        {
          animation: "".concat(Dw, " 1s ease-in-out ").concat(n, "ms infinite;"),
          backgroundColor: "currentColor",
          borderRadius: "1em",
          display: "inline-block",
          marginLeft: r ? "1em" : void 0,
          height: "1em",
          verticalAlign: "top",
          width: "1em",
        },
        "",
        ""
      ),
    });
  },
  _w = function (t) {
    var n = t.innerProps,
      r = t.isRtl,
      i = t.size,
      o = i === void 0 ? 4 : i,
      u = Xt(t, kw);
    return F(
      "div",
      $(
        {},
        ae(A(A({}, u), {}, { innerProps: n, isRtl: r, size: o }), "loadingIndicator", {
          indicator: !0,
          "loading-indicator": !0,
        }),
        n
      ),
      F(Ua, { delay: 0, offset: r }),
      F(Ua, { delay: 160, offset: !0 }),
      F(Ua, { delay: 320, offset: !r })
    );
  },
  Aw = function (t, n) {
    var r = t.isDisabled,
      i = t.isFocused,
      o = t.theme,
      u = o.colors,
      a = o.borderRadius,
      l = o.spacing;
    return A(
      {
        label: "control",
        alignItems: "center",
        cursor: "default",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        minHeight: l.controlHeight,
        outline: "0 !important",
        position: "relative",
        transition: "all 100ms",
      },
      n
        ? {}
        : {
            backgroundColor: r ? u.neutral5 : u.neutral0,
            borderColor: r ? u.neutral10 : i ? u.primary : u.neutral20,
            borderRadius: a,
            borderStyle: "solid",
            borderWidth: 1,
            boxShadow: i ? "0 0 0 1px ".concat(u.primary) : void 0,
            "&:hover": { borderColor: i ? u.primary : u.neutral30 },
          }
    );
  },
  Nw = function (t) {
    var n = t.children,
      r = t.isDisabled,
      i = t.isFocused,
      o = t.innerRef,
      u = t.innerProps,
      a = t.menuIsOpen;
    return F(
      "div",
      $(
        { ref: o },
        ae(t, "control", {
          control: !0,
          "control--is-disabled": r,
          "control--is-focused": i,
          "control--menu-is-open": a,
        }),
        u,
        { "aria-disabled": r || void 0 }
      ),
      n
    );
  },
  $w = Nw,
  Vw = ["data"],
  zw = function (t, n) {
    var r = t.theme.spacing;
    return n ? {} : { paddingBottom: r.baseUnit * 2, paddingTop: r.baseUnit * 2 };
  },
  jw = function (t) {
    var n = t.children,
      r = t.cx,
      i = t.getStyles,
      o = t.getClassNames,
      u = t.Heading,
      a = t.headingProps,
      l = t.innerProps,
      s = t.label,
      c = t.theme,
      p = t.selectProps;
    return F(
      "div",
      $({}, ae(t, "group", { group: !0 }), l),
      F(u, $({}, a, { selectProps: p, theme: c, getStyles: i, getClassNames: o, cx: r }), s),
      F("div", null, n)
    );
  },
  Uw = function (t, n) {
    var r = t.theme,
      i = r.colors,
      o = r.spacing;
    return A(
      { label: "group", cursor: "default", display: "block" },
      n
        ? {}
        : {
            color: i.neutral40,
            fontSize: "75%",
            fontWeight: 500,
            marginBottom: "0.25em",
            paddingLeft: o.baseUnit * 3,
            paddingRight: o.baseUnit * 3,
            textTransform: "uppercase",
          }
    );
  },
  Hw = function (t) {
    var n = Zm(t);
    n.data;
    var r = Xt(n, Vw);
    return F("div", $({}, ae(t, "groupHeading", { "group-heading": !0 }), r));
  },
  Bw = jw,
  Qw = ["innerRef", "isDisabled", "isHidden", "inputClassName"],
  Ww = function (t, n) {
    var r = t.isDisabled,
      i = t.value,
      o = t.theme,
      u = o.spacing,
      a = o.colors;
    return A(
      A({ visibility: r ? "hidden" : "visible", transform: i ? "translateZ(0)" : "" }, Kw),
      n
        ? {}
        : {
            margin: u.baseUnit / 2,
            paddingBottom: u.baseUnit / 2,
            paddingTop: u.baseUnit / 2,
            color: a.neutral80,
          }
    );
  },
  av = {
    gridArea: "1 / 2",
    font: "inherit",
    minWidth: "2px",
    border: 0,
    margin: 0,
    outline: 0,
    padding: 0,
  },
  Kw = {
    flex: "1 1 auto",
    display: "inline-grid",
    gridArea: "1 / 1 / 2 / 3",
    gridTemplateColumns: "0 min-content",
    "&:after": A({ content: 'attr(data-value) " "', visibility: "hidden", whiteSpace: "pre" }, av),
  },
  Gw = function (t) {
    return A(
      { label: "input", color: "inherit", background: 0, opacity: t ? 0 : 1, width: "100%" },
      av
    );
  },
  qw = function (t) {
    var n = t.cx,
      r = t.value,
      i = Zm(t),
      o = i.innerRef,
      u = i.isDisabled,
      a = i.isHidden,
      l = i.inputClassName,
      s = Xt(i, Qw);
    return F(
      "div",
      $({}, ae(t, "input", { "input-container": !0 }), { "data-value": r || "" }),
      F("input", $({ className: n({ input: !0 }, l), ref: o, style: Gw(a), disabled: u }, s))
    );
  },
  Yw = qw,
  Xw = function (t, n) {
    var r = t.theme,
      i = r.spacing,
      o = r.borderRadius,
      u = r.colors;
    return A(
      { label: "multiValue", display: "flex", minWidth: 0 },
      n ? {} : { backgroundColor: u.neutral10, borderRadius: o / 2, margin: i.baseUnit / 2 }
    );
  },
  Zw = function (t, n) {
    var r = t.theme,
      i = r.borderRadius,
      o = r.colors,
      u = t.cropWithEllipsis;
    return A(
      {
        overflow: "hidden",
        textOverflow: u || u === void 0 ? "ellipsis" : void 0,
        whiteSpace: "nowrap",
      },
      n
        ? {}
        : { borderRadius: i / 2, color: o.neutral80, fontSize: "85%", padding: 3, paddingLeft: 6 }
    );
  },
  Jw = function (t, n) {
    var r = t.theme,
      i = r.spacing,
      o = r.borderRadius,
      u = r.colors,
      a = t.isFocused;
    return A(
      { alignItems: "center", display: "flex" },
      n
        ? {}
        : {
            borderRadius: o / 2,
            backgroundColor: a ? u.dangerLight : void 0,
            paddingLeft: i.baseUnit,
            paddingRight: i.baseUnit,
            ":hover": { backgroundColor: u.dangerLight, color: u.danger },
          }
    );
  },
  lv = function (t) {
    var n = t.children,
      r = t.innerProps;
    return F("div", r, n);
  },
  eS = lv,
  tS = lv;
function nS(e) {
  var t = e.children,
    n = e.innerProps;
  return F("div", $({ role: "button" }, n), t || F(xc, { size: 14 }));
}
var rS = function (t) {
    var n = t.children,
      r = t.components,
      i = t.data,
      o = t.innerProps,
      u = t.isDisabled,
      a = t.removeProps,
      l = t.selectProps,
      s = r.Container,
      c = r.Label,
      p = r.Remove;
    return F(
      s,
      {
        data: i,
        innerProps: A(
          A({}, ae(t, "multiValue", { "multi-value": !0, "multi-value--is-disabled": u })),
          o
        ),
        selectProps: l,
      },
      F(
        c,
        {
          data: i,
          innerProps: A({}, ae(t, "multiValueLabel", { "multi-value__label": !0 })),
          selectProps: l,
        },
        n
      ),
      F(p, {
        data: i,
        innerProps: A(
          A({}, ae(t, "multiValueRemove", { "multi-value__remove": !0 })),
          {},
          { "aria-label": "Remove ".concat(n || "option") },
          a
        ),
        selectProps: l,
      })
    );
  },
  iS = rS,
  oS = function (t, n) {
    var r = t.isDisabled,
      i = t.isFocused,
      o = t.isSelected,
      u = t.theme,
      a = u.spacing,
      l = u.colors;
    return A(
      {
        label: "option",
        cursor: "default",
        display: "block",
        fontSize: "inherit",
        width: "100%",
        userSelect: "none",
        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
      },
      n
        ? {}
        : {
            backgroundColor: o ? l.primary : i ? l.primary25 : "transparent",
            color: r ? l.neutral20 : o ? l.neutral0 : "inherit",
            padding: "".concat(a.baseUnit * 2, "px ").concat(a.baseUnit * 3, "px"),
            ":active": { backgroundColor: r ? void 0 : o ? l.primary : l.primary50 },
          }
    );
  },
  uS = function (t) {
    var n = t.children,
      r = t.isDisabled,
      i = t.isFocused,
      o = t.isSelected,
      u = t.innerRef,
      a = t.innerProps;
    return F(
      "div",
      $(
        {},
        ae(t, "option", {
          option: !0,
          "option--is-disabled": r,
          "option--is-focused": i,
          "option--is-selected": o,
        }),
        { ref: u, "aria-disabled": r },
        a
      ),
      n
    );
  },
  aS = uS,
  lS = function (t, n) {
    var r = t.theme,
      i = r.spacing,
      o = r.colors;
    return A(
      { label: "placeholder", gridArea: "1 / 1 / 2 / 3" },
      n ? {} : { color: o.neutral50, marginLeft: i.baseUnit / 2, marginRight: i.baseUnit / 2 }
    );
  },
  sS = function (t) {
    var n = t.children,
      r = t.innerProps;
    return F("div", $({}, ae(t, "placeholder", { placeholder: !0 }), r), n);
  },
  cS = sS,
  fS = function (t, n) {
    var r = t.isDisabled,
      i = t.theme,
      o = i.spacing,
      u = i.colors;
    return A(
      {
        label: "singleValue",
        gridArea: "1 / 1 / 2 / 3",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      n
        ? {}
        : {
            color: r ? u.neutral40 : u.neutral80,
            marginLeft: o.baseUnit / 2,
            marginRight: o.baseUnit / 2,
          }
    );
  },
  dS = function (t) {
    var n = t.children,
      r = t.isDisabled,
      i = t.innerProps;
    return F(
      "div",
      $({}, ae(t, "singleValue", { "single-value": !0, "single-value--is-disabled": r }), i),
      n
    );
  },
  pS = dS,
  hS = {
    ClearIndicator: Iw,
    Control: $w,
    DropdownIndicator: Mw,
    DownChevron: ov,
    CrossIcon: xc,
    Group: Bw,
    GroupHeading: Hw,
    IndicatorsContainer: Ew,
    IndicatorSeparator: Lw,
    Input: Yw,
    LoadingIndicator: _w,
    Menu: sw,
    MenuList: fw,
    MenuPortal: gw,
    LoadingMessage: mw,
    NoOptionsMessage: hw,
    MultiValue: iS,
    MultiValueContainer: eS,
    MultiValueLabel: tS,
    MultiValueRemove: nS,
    Option: aS,
    Placeholder: cS,
    SelectContainer: ww,
    SingleValue: pS,
    ValueContainer: Ow,
  },
  mS = function (t) {
    return A(A({}, hS), t.components);
  },
  ud =
    Number.isNaN ||
    function (t) {
      return typeof t == "number" && t !== t;
    };
function vS(e, t) {
  return !!(e === t || (ud(e) && ud(t)));
}
function gS(e, t) {
  if (e.length !== t.length) return !1;
  for (var n = 0; n < e.length; n++) if (!vS(e[n], t[n])) return !1;
  return !0;
}
function yS(e, t) {
  t === void 0 && (t = gS);
  var n = null;
  function r() {
    for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
    if (n && n.lastThis === this && t(i, n.lastArgs)) return n.lastResult;
    var u = e.apply(this, i);
    return (n = { lastResult: u, lastArgs: i, lastThis: this }), u;
  }
  return (
    (r.clear = function () {
      n = null;
    }),
    r
  );
}
var wS = {
    name: "7pg0cj-a11yText",
    styles:
      "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap",
  },
  SS = function (t) {
    return F("span", $({ css: wS }, t));
  },
  ad = SS,
  OS = {
    guidance: function (t) {
      var n = t.isSearchable,
        r = t.isMulti,
        i = t.tabSelectsValue,
        o = t.context,
        u = t.isInitialFocus;
      switch (o) {
        case "menu":
          return "Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu".concat(
            i ? ", press Tab to select the option and exit the menu" : "",
            "."
          );
        case "input":
          return u
            ? ""
                .concat(t["aria-label"] || "Select", " is focused ")
                .concat(n ? ",type to refine list" : "", ", press Down to open the menu, ")
                .concat(r ? " press left to focus selected values" : "")
            : "";
        case "value":
          return "Use left and right to toggle between focused values, press Backspace to remove the currently focused value";
        default:
          return "";
      }
    },
    onChange: function (t) {
      var n = t.action,
        r = t.label,
        i = r === void 0 ? "" : r,
        o = t.labels,
        u = t.isDisabled;
      switch (n) {
        case "deselect-option":
        case "pop-value":
        case "remove-value":
          return "option ".concat(i, ", deselected.");
        case "clear":
          return "All selected options have been cleared.";
        case "initial-input-focus":
          return "option".concat(o.length > 1 ? "s" : "", " ").concat(o.join(","), ", selected.");
        case "select-option":
          return u
            ? "option ".concat(i, " is disabled. Select another option.")
            : "option ".concat(i, ", selected.");
        default:
          return "";
      }
    },
    onFocus: function (t) {
      var n = t.context,
        r = t.focused,
        i = t.options,
        o = t.label,
        u = o === void 0 ? "" : o,
        a = t.selectValue,
        l = t.isDisabled,
        s = t.isSelected,
        c = t.isAppleDevice,
        p = function (g, O) {
          return g && g.length ? "".concat(g.indexOf(O) + 1, " of ").concat(g.length) : "";
        };
      if (n === "value" && a) return "value ".concat(u, " focused, ").concat(p(a, r), ".");
      if (n === "menu" && c) {
        var h = l ? " disabled" : "",
          v = "".concat(s ? " selected" : "").concat(h);
        return "".concat(u).concat(v, ", ").concat(p(i, r), ".");
      }
      return "";
    },
    onFilter: function (t) {
      var n = t.inputValue,
        r = t.resultsMessage;
      return "".concat(r).concat(n ? " for search term " + n : "", ".");
    },
  },
  CS = function (t) {
    var n = t.ariaSelection,
      r = t.focusedOption,
      i = t.focusedValue,
      o = t.focusableOptions,
      u = t.isFocused,
      a = t.selectValue,
      l = t.selectProps,
      s = t.id,
      c = t.isAppleDevice,
      p = l.ariaLiveMessages,
      h = l.getOptionLabel,
      v = l.inputValue,
      y = l.isMulti,
      g = l.isOptionDisabled,
      O = l.isSearchable,
      f = l.menuIsOpen,
      d = l.options,
      m = l.screenReaderStatus,
      C = l.tabSelectsValue,
      P = l.isLoading,
      b = l["aria-label"],
      E = l["aria-live"],
      k = x.useMemo(
        function () {
          return A(A({}, OS), p || {});
        },
        [p]
      ),
      D = x.useMemo(
        function () {
          var se = "";
          if (n && k.onChange) {
            var te = n.option,
              $e = n.options,
              T = n.removedValue,
              N = n.removedValues,
              V = n.value,
              q = function (At) {
                return Array.isArray(At) ? null : At;
              },
              z = T || te || q(V),
              ve = z ? h(z) : "",
              Ce = $e || N || void 0,
              rt = Ce ? Ce.map(h) : [],
              de = A({ isDisabled: z && g(z, a), label: ve, labels: rt }, n);
            se = k.onChange(de);
          }
          return se;
        },
        [n, k, g, a, h]
      ),
      _ = x.useMemo(
        function () {
          var se = "",
            te = r || i,
            $e = !!(r && a && a.includes(r));
          if (te && k.onFocus) {
            var T = {
              focused: te,
              label: h(te),
              isDisabled: g(te, a),
              isSelected: $e,
              options: o,
              context: te === r ? "menu" : "value",
              selectValue: a,
              isAppleDevice: c,
            };
            se = k.onFocus(T);
          }
          return se;
        },
        [r, i, h, g, k, o, a, c]
      ),
      G = x.useMemo(
        function () {
          var se = "";
          if (f && d.length && !P && k.onFilter) {
            var te = m({ count: o.length });
            se = k.onFilter({ inputValue: v, resultsMessage: te });
          }
          return se;
        },
        [o, v, f, k, d, m, P]
      ),
      oe = (n == null ? void 0 : n.action) === "initial-input-focus",
      Le = x.useMemo(
        function () {
          var se = "";
          if (k.guidance) {
            var te = i ? "value" : f ? "menu" : "input";
            se = k.guidance({
              "aria-label": b,
              context: te,
              isDisabled: r && g(r, a),
              isMulti: y,
              isSearchable: O,
              tabSelectsValue: C,
              isInitialFocus: oe,
            });
          }
          return se;
        },
        [b, r, i, y, g, O, f, k, a, C, oe]
      ),
      nt = F(
        x.Fragment,
        null,
        F("span", { id: "aria-selection" }, D),
        F("span", { id: "aria-focused" }, _),
        F("span", { id: "aria-results" }, G),
        F("span", { id: "aria-guidance" }, Le)
      );
    return F(
      x.Fragment,
      null,
      F(ad, { id: s }, oe && nt),
      F(
        ad,
        { "aria-live": E, "aria-atomic": "false", "aria-relevant": "additions text", role: "log" },
        u && !oe && nt
      )
    );
  },
  ES = CS,
  ql = [
    { base: "A", letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ" },
    { base: "AA", letters: "Ꜳ" },
    { base: "AE", letters: "ÆǼǢ" },
    { base: "AO", letters: "Ꜵ" },
    { base: "AU", letters: "Ꜷ" },
    { base: "AV", letters: "ꜸꜺ" },
    { base: "AY", letters: "Ꜽ" },
    { base: "B", letters: "BⒷＢḂḄḆɃƂƁ" },
    { base: "C", letters: "CⒸＣĆĈĊČÇḈƇȻꜾ" },
    { base: "D", letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ" },
    { base: "DZ", letters: "ǱǄ" },
    { base: "Dz", letters: "ǲǅ" },
    { base: "E", letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ" },
    { base: "F", letters: "FⒻＦḞƑꝻ" },
    { base: "G", letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ" },
    { base: "H", letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ" },
    { base: "I", letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ" },
    { base: "J", letters: "JⒿＪĴɈ" },
    { base: "K", letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ" },
    { base: "L", letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ" },
    { base: "LJ", letters: "Ǉ" },
    { base: "Lj", letters: "ǈ" },
    { base: "M", letters: "MⓂＭḾṀṂⱮƜ" },
    { base: "N", letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ" },
    { base: "NJ", letters: "Ǌ" },
    { base: "Nj", letters: "ǋ" },
    { base: "O", letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ" },
    { base: "OI", letters: "Ƣ" },
    { base: "OO", letters: "Ꝏ" },
    { base: "OU", letters: "Ȣ" },
    { base: "P", letters: "PⓅＰṔṖƤⱣꝐꝒꝔ" },
    { base: "Q", letters: "QⓆＱꝖꝘɊ" },
    { base: "R", letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ" },
    { base: "S", letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ" },
    { base: "T", letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ" },
    { base: "TZ", letters: "Ꜩ" },
    { base: "U", letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ" },
    { base: "V", letters: "VⓋＶṼṾƲꝞɅ" },
    { base: "VY", letters: "Ꝡ" },
    { base: "W", letters: "WⓌＷẀẂŴẆẄẈⱲ" },
    { base: "X", letters: "XⓍＸẊẌ" },
    { base: "Y", letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ" },
    { base: "Z", letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ" },
    { base: "a", letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ" },
    { base: "aa", letters: "ꜳ" },
    { base: "ae", letters: "æǽǣ" },
    { base: "ao", letters: "ꜵ" },
    { base: "au", letters: "ꜷ" },
    { base: "av", letters: "ꜹꜻ" },
    { base: "ay", letters: "ꜽ" },
    { base: "b", letters: "bⓑｂḃḅḇƀƃɓ" },
    { base: "c", letters: "cⓒｃćĉċčçḉƈȼꜿↄ" },
    { base: "d", letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ" },
    { base: "dz", letters: "ǳǆ" },
    { base: "e", letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ" },
    { base: "f", letters: "fⓕｆḟƒꝼ" },
    { base: "g", letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ" },
    { base: "h", letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ" },
    { base: "hv", letters: "ƕ" },
    { base: "i", letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı" },
    { base: "j", letters: "jⓙｊĵǰɉ" },
    { base: "k", letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ" },
    { base: "l", letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ" },
    { base: "lj", letters: "ǉ" },
    { base: "m", letters: "mⓜｍḿṁṃɱɯ" },
    { base: "n", letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ" },
    { base: "nj", letters: "ǌ" },
    { base: "o", letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ" },
    { base: "oi", letters: "ƣ" },
    { base: "ou", letters: "ȣ" },
    { base: "oo", letters: "ꝏ" },
    { base: "p", letters: "pⓟｐṕṗƥᵽꝑꝓꝕ" },
    { base: "q", letters: "qⓠｑɋꝗꝙ" },
    { base: "r", letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ" },
    { base: "s", letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ" },
    { base: "t", letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ" },
    { base: "tz", letters: "ꜩ" },
    { base: "u", letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ" },
    { base: "v", letters: "vⓥｖṽṿʋꝟʌ" },
    { base: "vy", letters: "ꝡ" },
    { base: "w", letters: "wⓦｗẁẃŵẇẅẘẉⱳ" },
    { base: "x", letters: "xⓧｘẋẍ" },
    { base: "y", letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ" },
    { base: "z", letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ" },
  ],
  PS = new RegExp(
    "[" +
      ql
        .map(function (e) {
          return e.letters;
        })
        .join("") +
      "]",
    "g"
  ),
  sv = {};
for (var Ha = 0; Ha < ql.length; Ha++)
  for (var Ba = ql[Ha], Qa = 0; Qa < Ba.letters.length; Qa++) sv[Ba.letters[Qa]] = Ba.base;
var cv = function (t) {
    return t.replace(PS, function (n) {
      return sv[n];
    });
  },
  kS = yS(cv),
  ld = function (t) {
    return t.replace(/^\s+|\s+$/g, "");
  },
  bS = function (t) {
    return "".concat(t.label, " ").concat(t.value);
  },
  xS = function (t) {
    return function (n, r) {
      if (n.data.__isNew__) return !0;
      var i = A(
          { ignoreCase: !0, ignoreAccents: !0, stringify: bS, trim: !0, matchFrom: "any" },
          t
        ),
        o = i.ignoreCase,
        u = i.ignoreAccents,
        a = i.stringify,
        l = i.trim,
        s = i.matchFrom,
        c = l ? ld(r) : r,
        p = l ? ld(a(n)) : a(n);
      return (
        o && ((c = c.toLowerCase()), (p = p.toLowerCase())),
        u && ((c = kS(c)), (p = cv(p))),
        s === "start" ? p.substr(0, c.length) === c : p.indexOf(c) > -1
      );
    };
  },
  MS = ["innerRef"];
function TS(e) {
  var t = e.innerRef,
    n = Xt(e, MS),
    r = tw(n, "onExited", "in", "enter", "exit", "appear");
  return F(
    "input",
    $({ ref: t }, r, {
      css: Ec(
        {
          label: "dummyInput",
          background: 0,
          border: 0,
          caretColor: "transparent",
          fontSize: "inherit",
          gridArea: "1 / 1 / 2 / 3",
          outline: 0,
          padding: 0,
          width: 1,
          color: "transparent",
          left: -100,
          opacity: 0,
          position: "relative",
          transform: "scale(.01)",
        },
        "",
        ""
      ),
    })
  );
}
var IS = function (t) {
  t.cancelable && t.preventDefault(), t.stopPropagation();
};
function RS(e) {
  var t = e.isEnabled,
    n = e.onBottomArrive,
    r = e.onBottomLeave,
    i = e.onTopArrive,
    o = e.onTopLeave,
    u = x.useRef(!1),
    a = x.useRef(!1),
    l = x.useRef(0),
    s = x.useRef(null),
    c = x.useCallback(
      function (O, f) {
        if (s.current !== null) {
          var d = s.current,
            m = d.scrollTop,
            C = d.scrollHeight,
            P = d.clientHeight,
            b = s.current,
            E = f > 0,
            k = C - P - m,
            D = !1;
          k > f && u.current && (r && r(O), (u.current = !1)),
            E && a.current && (o && o(O), (a.current = !1)),
            E && f > k
              ? (n && !u.current && n(O), (b.scrollTop = C), (D = !0), (u.current = !0))
              : !E &&
                -f > m &&
                (i && !a.current && i(O), (b.scrollTop = 0), (D = !0), (a.current = !0)),
            D && IS(O);
        }
      },
      [n, r, i, o]
    ),
    p = x.useCallback(
      function (O) {
        c(O, O.deltaY);
      },
      [c]
    ),
    h = x.useCallback(function (O) {
      l.current = O.changedTouches[0].clientY;
    }, []),
    v = x.useCallback(
      function (O) {
        var f = l.current - O.changedTouches[0].clientY;
        c(O, f);
      },
      [c]
    ),
    y = x.useCallback(
      function (O) {
        if (O) {
          var f = Z1 ? { passive: !1 } : !1;
          O.addEventListener("wheel", p, f),
            O.addEventListener("touchstart", h, f),
            O.addEventListener("touchmove", v, f);
        }
      },
      [v, h, p]
    ),
    g = x.useCallback(
      function (O) {
        O &&
          (O.removeEventListener("wheel", p, !1),
          O.removeEventListener("touchstart", h, !1),
          O.removeEventListener("touchmove", v, !1));
      },
      [v, h, p]
    );
  return (
    x.useEffect(
      function () {
        if (t) {
          var O = s.current;
          return (
            y(O),
            function () {
              g(O);
            }
          );
        }
      },
      [t, y, g]
    ),
    function (O) {
      s.current = O;
    }
  );
}
var sd = ["boxSizing", "height", "overflow", "paddingRight", "position"],
  cd = { boxSizing: "border-box", overflow: "hidden", position: "relative", height: "100%" };
function fd(e) {
  e.preventDefault();
}
function dd(e) {
  e.stopPropagation();
}
function pd() {
  var e = this.scrollTop,
    t = this.scrollHeight,
    n = e + this.offsetHeight;
  e === 0 ? (this.scrollTop = 1) : n === t && (this.scrollTop = e - 1);
}
function hd() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}
var md = !!(typeof window < "u" && window.document && window.document.createElement),
  oi = 0,
  er = { capture: !1, passive: !1 };
function LS(e) {
  var t = e.isEnabled,
    n = e.accountForScrollbars,
    r = n === void 0 ? !0 : n,
    i = x.useRef({}),
    o = x.useRef(null),
    u = x.useCallback(
      function (l) {
        if (md) {
          var s = document.body,
            c = s && s.style;
          if (
            (r &&
              sd.forEach(function (y) {
                var g = c && c[y];
                i.current[y] = g;
              }),
            r && oi < 1)
          ) {
            var p = parseInt(i.current.paddingRight, 10) || 0,
              h = document.body ? document.body.clientWidth : 0,
              v = window.innerWidth - h + p || 0;
            Object.keys(cd).forEach(function (y) {
              var g = cd[y];
              c && (c[y] = g);
            }),
              c && (c.paddingRight = "".concat(v, "px"));
          }
          s &&
            hd() &&
            (s.addEventListener("touchmove", fd, er),
            l &&
              (l.addEventListener("touchstart", pd, er), l.addEventListener("touchmove", dd, er))),
            (oi += 1);
        }
      },
      [r]
    ),
    a = x.useCallback(
      function (l) {
        if (md) {
          var s = document.body,
            c = s && s.style;
          (oi = Math.max(oi - 1, 0)),
            r &&
              oi < 1 &&
              sd.forEach(function (p) {
                var h = i.current[p];
                c && (c[p] = h);
              }),
            s &&
              hd() &&
              (s.removeEventListener("touchmove", fd, er),
              l &&
                (l.removeEventListener("touchstart", pd, er),
                l.removeEventListener("touchmove", dd, er)));
        }
      },
      [r]
    );
  return (
    x.useEffect(
      function () {
        if (t) {
          var l = o.current;
          return (
            u(l),
            function () {
              a(l);
            }
          );
        }
      },
      [t, u, a]
    ),
    function (l) {
      o.current = l;
    }
  );
}
var DS = function (t) {
    var n = t.target;
    return n.ownerDocument.activeElement && n.ownerDocument.activeElement.blur();
  },
  FS = { name: "1kfdb0e", styles: "position:fixed;left:0;bottom:0;right:0;top:0" };
function _S(e) {
  var t = e.children,
    n = e.lockEnabled,
    r = e.captureEnabled,
    i = r === void 0 ? !0 : r,
    o = e.onBottomArrive,
    u = e.onBottomLeave,
    a = e.onTopArrive,
    l = e.onTopLeave,
    s = RS({ isEnabled: i, onBottomArrive: o, onBottomLeave: u, onTopArrive: a, onTopLeave: l }),
    c = LS({ isEnabled: n }),
    p = function (v) {
      s(v), c(v);
    };
  return F(x.Fragment, null, n && F("div", { onClick: DS, css: FS }), t(p));
}
var AS = {
    name: "1a0ro4n-requiredInput",
    styles:
      "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%",
  },
  NS = function (t) {
    var n = t.name,
      r = t.onFocus;
    return F("input", {
      required: !0,
      name: n,
      tabIndex: -1,
      "aria-hidden": "true",
      onFocus: r,
      css: AS,
      value: "",
      onChange: function () {},
    });
  },
  $S = NS;
function Mc(e) {
  var t;
  return typeof window < "u" && window.navigator != null
    ? e.test(
        ((t = window.navigator.userAgentData) === null || t === void 0 ? void 0 : t.platform) ||
          window.navigator.platform
      )
    : !1;
}
function VS() {
  return Mc(/^iPhone/i);
}
function fv() {
  return Mc(/^Mac/i);
}
function zS() {
  return Mc(/^iPad/i) || (fv() && navigator.maxTouchPoints > 1);
}
function jS() {
  return VS() || zS();
}
function US() {
  return fv() || jS();
}
var HS = function (t) {
    return t.label;
  },
  BS = function (t) {
    return t.label;
  },
  QS = function (t) {
    return t.value;
  },
  WS = function (t) {
    return !!t.isDisabled;
  },
  KS = {
    clearIndicator: Tw,
    container: yw,
    control: Aw,
    dropdownIndicator: xw,
    group: zw,
    groupHeading: Uw,
    indicatorsContainer: Cw,
    indicatorSeparator: Rw,
    input: Ww,
    loadingIndicator: Fw,
    loadingMessage: pw,
    menu: uw,
    menuList: cw,
    menuPortal: vw,
    multiValue: Xw,
    multiValueLabel: Zw,
    multiValueRemove: Jw,
    noOptionsMessage: dw,
    option: oS,
    placeholder: lS,
    singleValue: fS,
    valueContainer: Sw,
  },
  GS = {
    primary: "#2684FF",
    primary75: "#4C9AFF",
    primary50: "#B2D4FF",
    primary25: "#DEEBFF",
    danger: "#DE350B",
    dangerLight: "#FFBDAD",
    neutral0: "hsl(0, 0%, 100%)",
    neutral5: "hsl(0, 0%, 95%)",
    neutral10: "hsl(0, 0%, 90%)",
    neutral20: "hsl(0, 0%, 80%)",
    neutral30: "hsl(0, 0%, 70%)",
    neutral40: "hsl(0, 0%, 60%)",
    neutral50: "hsl(0, 0%, 50%)",
    neutral60: "hsl(0, 0%, 40%)",
    neutral70: "hsl(0, 0%, 30%)",
    neutral80: "hsl(0, 0%, 20%)",
    neutral90: "hsl(0, 0%, 10%)",
  },
  qS = 4,
  dv = 4,
  YS = 38,
  XS = dv * 2,
  ZS = { baseUnit: dv, controlHeight: YS, menuGutter: XS },
  Wa = { borderRadius: qS, colors: GS, spacing: ZS },
  JS = {
    "aria-live": "polite",
    backspaceRemovesValue: !0,
    blurInputOnSelect: id(),
    captureMenuScroll: !id(),
    classNames: {},
    closeMenuOnSelect: !0,
    closeMenuOnScroll: !1,
    components: {},
    controlShouldRenderValue: !0,
    escapeClearsValue: !1,
    filterOption: xS(),
    formatGroupLabel: HS,
    getOptionLabel: BS,
    getOptionValue: QS,
    isDisabled: !1,
    isLoading: !1,
    isMulti: !1,
    isRtl: !1,
    isSearchable: !0,
    isOptionDisabled: WS,
    loadingMessage: function () {
      return "Loading...";
    },
    maxMenuHeight: 300,
    minMenuHeight: 140,
    menuIsOpen: !1,
    menuPlacement: "bottom",
    menuPosition: "absolute",
    menuShouldBlockScroll: !1,
    menuShouldScrollIntoView: !Y1(),
    noOptionsMessage: function () {
      return "No options";
    },
    openMenuOnFocus: !1,
    openMenuOnClick: !0,
    options: [],
    pageSize: 5,
    placeholder: "Select...",
    screenReaderStatus: function (t) {
      var n = t.count;
      return "".concat(n, " result").concat(n !== 1 ? "s" : "", " available");
    },
    styles: {},
    tabIndex: 0,
    tabSelectsValue: !0,
    unstyled: !1,
  };
function vd(e, t, n, r) {
  var i = mv(e, t, n),
    o = vv(e, t, n),
    u = hv(e, t),
    a = Iu(e, t);
  return { type: "option", data: t, isDisabled: i, isSelected: o, label: u, value: a, index: r };
}
function Xo(e, t) {
  return e.options
    .map(function (n, r) {
      if ("options" in n) {
        var i = n.options
          .map(function (u, a) {
            return vd(e, u, t, a);
          })
          .filter(function (u) {
            return yd(e, u);
          });
        return i.length > 0 ? { type: "group", data: n, options: i, index: r } : void 0;
      }
      var o = vd(e, n, t, r);
      return yd(e, o) ? o : void 0;
    })
    .filter(J1);
}
function pv(e) {
  return e.reduce(function (t, n) {
    return (
      n.type === "group"
        ? t.push.apply(
            t,
            yc(
              n.options.map(function (r) {
                return r.data;
              })
            )
          )
        : t.push(n.data),
      t
    );
  }, []);
}
function gd(e, t) {
  return e.reduce(function (n, r) {
    return (
      r.type === "group"
        ? n.push.apply(
            n,
            yc(
              r.options.map(function (i) {
                return { data: i.data, id: "".concat(t, "-").concat(r.index, "-").concat(i.index) };
              })
            )
          )
        : n.push({ data: r.data, id: "".concat(t, "-").concat(r.index) }),
      n
    );
  }, []);
}
function eO(e, t) {
  return pv(Xo(e, t));
}
function yd(e, t) {
  var n = e.inputValue,
    r = n === void 0 ? "" : n,
    i = t.data,
    o = t.isSelected,
    u = t.label,
    a = t.value;
  return (!yv(e) || !o) && gv(e, { label: u, value: a, data: i }, r);
}
function tO(e, t) {
  var n = e.focusedValue,
    r = e.selectValue,
    i = r.indexOf(n);
  if (i > -1) {
    var o = t.indexOf(n);
    if (o > -1) return n;
    if (i < t.length) return t[i];
  }
  return null;
}
function nO(e, t) {
  var n = e.focusedOption;
  return n && t.indexOf(n) > -1 ? n : t[0];
}
var Ka = function (t, n) {
    var r,
      i =
        (r = t.find(function (o) {
          return o.data === n;
        })) === null || r === void 0
          ? void 0
          : r.id;
    return i || null;
  },
  hv = function (t, n) {
    return t.getOptionLabel(n);
  },
  Iu = function (t, n) {
    return t.getOptionValue(n);
  };
function mv(e, t, n) {
  return typeof e.isOptionDisabled == "function" ? e.isOptionDisabled(t, n) : !1;
}
function vv(e, t, n) {
  if (n.indexOf(t) > -1) return !0;
  if (typeof e.isOptionSelected == "function") return e.isOptionSelected(t, n);
  var r = Iu(e, t);
  return n.some(function (i) {
    return Iu(e, i) === r;
  });
}
function gv(e, t, n) {
  return e.filterOption ? e.filterOption(t, n) : !0;
}
var yv = function (t) {
    var n = t.hideSelectedOptions,
      r = t.isMulti;
    return n === void 0 ? r : n;
  },
  rO = 1,
  wv = (function (e) {
    x0(n, e);
    var t = I0(n);
    function n(r) {
      var i;
      if (
        (k0(this, n),
        (i = t.call(this, r)),
        (i.state = {
          ariaSelection: null,
          focusedOption: null,
          focusedOptionId: null,
          focusableOptionsWithIds: [],
          focusedValue: null,
          inputIsHidden: !1,
          isFocused: !1,
          selectValue: [],
          clearFocusValueOnUpdate: !1,
          prevWasFocused: !1,
          inputIsHiddenAfterUpdate: void 0,
          prevProps: void 0,
          instancePrefix: "",
        }),
        (i.blockOptionHover = !1),
        (i.isComposing = !1),
        (i.commonProps = void 0),
        (i.initialTouchX = 0),
        (i.initialTouchY = 0),
        (i.openAfterFocus = !1),
        (i.scrollToFocusedOptionOnUpdate = !1),
        (i.userIsDragging = void 0),
        (i.isAppleDevice = US()),
        (i.controlRef = null),
        (i.getControlRef = function (l) {
          i.controlRef = l;
        }),
        (i.focusedOptionRef = null),
        (i.getFocusedOptionRef = function (l) {
          i.focusedOptionRef = l;
        }),
        (i.menuListRef = null),
        (i.getMenuListRef = function (l) {
          i.menuListRef = l;
        }),
        (i.inputRef = null),
        (i.getInputRef = function (l) {
          i.inputRef = l;
        }),
        (i.focus = i.focusInput),
        (i.blur = i.blurInput),
        (i.onChange = function (l, s) {
          var c = i.props,
            p = c.onChange,
            h = c.name;
          (s.name = h), i.ariaOnChange(l, s), p(l, s);
        }),
        (i.setValue = function (l, s, c) {
          var p = i.props,
            h = p.closeMenuOnSelect,
            v = p.isMulti,
            y = p.inputValue;
          i.onInputChange("", { action: "set-value", prevInputValue: y }),
            h && (i.setState({ inputIsHiddenAfterUpdate: !v }), i.onMenuClose()),
            i.setState({ clearFocusValueOnUpdate: !0 }),
            i.onChange(l, { action: s, option: c });
        }),
        (i.selectOption = function (l) {
          var s = i.props,
            c = s.blurInputOnSelect,
            p = s.isMulti,
            h = s.name,
            v = i.state.selectValue,
            y = p && i.isOptionSelected(l, v),
            g = i.isOptionDisabled(l, v);
          if (y) {
            var O = i.getOptionValue(l);
            i.setValue(
              v.filter(function (f) {
                return i.getOptionValue(f) !== O;
              }),
              "deselect-option",
              l
            );
          } else if (!g)
            p
              ? i.setValue([].concat(yc(v), [l]), "select-option", l)
              : i.setValue(l, "select-option");
          else {
            i.ariaOnChange(l, { action: "select-option", option: l, name: h });
            return;
          }
          c && i.blurInput();
        }),
        (i.removeValue = function (l) {
          var s = i.props.isMulti,
            c = i.state.selectValue,
            p = i.getOptionValue(l),
            h = c.filter(function (y) {
              return i.getOptionValue(y) !== p;
            }),
            v = Fo(s, h, h[0] || null);
          i.onChange(v, { action: "remove-value", removedValue: l }), i.focusInput();
        }),
        (i.clearValue = function () {
          var l = i.state.selectValue;
          i.onChange(Fo(i.props.isMulti, [], null), { action: "clear", removedValues: l });
        }),
        (i.popValue = function () {
          var l = i.props.isMulti,
            s = i.state.selectValue,
            c = s[s.length - 1],
            p = s.slice(0, s.length - 1),
            h = Fo(l, p, p[0] || null);
          i.onChange(h, { action: "pop-value", removedValue: c });
        }),
        (i.getFocusedOptionId = function (l) {
          return Ka(i.state.focusableOptionsWithIds, l);
        }),
        (i.getFocusableOptionsWithIds = function () {
          return gd(Xo(i.props, i.state.selectValue), i.getElementId("option"));
        }),
        (i.getValue = function () {
          return i.state.selectValue;
        }),
        (i.cx = function () {
          for (var l = arguments.length, s = new Array(l), c = 0; c < l; c++) s[c] = arguments[c];
          return Q1.apply(void 0, [i.props.classNamePrefix].concat(s));
        }),
        (i.getOptionLabel = function (l) {
          return hv(i.props, l);
        }),
        (i.getOptionValue = function (l) {
          return Iu(i.props, l);
        }),
        (i.getStyles = function (l, s) {
          var c = i.props.unstyled,
            p = KS[l](s, c);
          p.boxSizing = "border-box";
          var h = i.props.styles[l];
          return h ? h(p, s) : p;
        }),
        (i.getClassNames = function (l, s) {
          var c, p;
          return (c = (p = i.props.classNames)[l]) === null || c === void 0 ? void 0 : c.call(p, s);
        }),
        (i.getElementId = function (l) {
          return "".concat(i.state.instancePrefix, "-").concat(l);
        }),
        (i.getComponents = function () {
          return mS(i.props);
        }),
        (i.buildCategorizedOptions = function () {
          return Xo(i.props, i.state.selectValue);
        }),
        (i.getCategorizedOptions = function () {
          return i.props.menuIsOpen ? i.buildCategorizedOptions() : [];
        }),
        (i.buildFocusableOptions = function () {
          return pv(i.buildCategorizedOptions());
        }),
        (i.getFocusableOptions = function () {
          return i.props.menuIsOpen ? i.buildFocusableOptions() : [];
        }),
        (i.ariaOnChange = function (l, s) {
          i.setState({ ariaSelection: A({ value: l }, s) });
        }),
        (i.onMenuMouseDown = function (l) {
          l.button === 0 && (l.stopPropagation(), l.preventDefault(), i.focusInput());
        }),
        (i.onMenuMouseMove = function (l) {
          i.blockOptionHover = !1;
        }),
        (i.onControlMouseDown = function (l) {
          if (!l.defaultPrevented) {
            var s = i.props.openMenuOnClick;
            i.state.isFocused
              ? i.props.menuIsOpen
                ? l.target.tagName !== "INPUT" && l.target.tagName !== "TEXTAREA" && i.onMenuClose()
                : s && i.openMenu("first")
              : (s && (i.openAfterFocus = !0), i.focusInput()),
              l.target.tagName !== "INPUT" && l.target.tagName !== "TEXTAREA" && l.preventDefault();
          }
        }),
        (i.onDropdownIndicatorMouseDown = function (l) {
          if (!(l && l.type === "mousedown" && l.button !== 0) && !i.props.isDisabled) {
            var s = i.props,
              c = s.isMulti,
              p = s.menuIsOpen;
            i.focusInput(),
              p
                ? (i.setState({ inputIsHiddenAfterUpdate: !c }), i.onMenuClose())
                : i.openMenu("first"),
              l.preventDefault();
          }
        }),
        (i.onClearIndicatorMouseDown = function (l) {
          (l && l.type === "mousedown" && l.button !== 0) ||
            (i.clearValue(),
            l.preventDefault(),
            (i.openAfterFocus = !1),
            l.type === "touchend"
              ? i.focusInput()
              : setTimeout(function () {
                  return i.focusInput();
                }));
        }),
        (i.onScroll = function (l) {
          typeof i.props.closeMenuOnScroll == "boolean"
            ? l.target instanceof HTMLElement && fa(l.target) && i.props.onMenuClose()
            : typeof i.props.closeMenuOnScroll == "function" &&
              i.props.closeMenuOnScroll(l) &&
              i.props.onMenuClose();
        }),
        (i.onCompositionStart = function () {
          i.isComposing = !0;
        }),
        (i.onCompositionEnd = function () {
          i.isComposing = !1;
        }),
        (i.onTouchStart = function (l) {
          var s = l.touches,
            c = s && s.item(0);
          c &&
            ((i.initialTouchX = c.clientX), (i.initialTouchY = c.clientY), (i.userIsDragging = !1));
        }),
        (i.onTouchMove = function (l) {
          var s = l.touches,
            c = s && s.item(0);
          if (c) {
            var p = Math.abs(c.clientX - i.initialTouchX),
              h = Math.abs(c.clientY - i.initialTouchY),
              v = 5;
            i.userIsDragging = p > v || h > v;
          }
        }),
        (i.onTouchEnd = function (l) {
          i.userIsDragging ||
            (i.controlRef &&
              !i.controlRef.contains(l.target) &&
              i.menuListRef &&
              !i.menuListRef.contains(l.target) &&
              i.blurInput(),
            (i.initialTouchX = 0),
            (i.initialTouchY = 0));
        }),
        (i.onControlTouchEnd = function (l) {
          i.userIsDragging || i.onControlMouseDown(l);
        }),
        (i.onClearIndicatorTouchEnd = function (l) {
          i.userIsDragging || i.onClearIndicatorMouseDown(l);
        }),
        (i.onDropdownIndicatorTouchEnd = function (l) {
          i.userIsDragging || i.onDropdownIndicatorMouseDown(l);
        }),
        (i.handleInputChange = function (l) {
          var s = i.props.inputValue,
            c = l.currentTarget.value;
          i.setState({ inputIsHiddenAfterUpdate: !1 }),
            i.onInputChange(c, { action: "input-change", prevInputValue: s }),
            i.props.menuIsOpen || i.onMenuOpen();
        }),
        (i.onInputFocus = function (l) {
          i.props.onFocus && i.props.onFocus(l),
            i.setState({ inputIsHiddenAfterUpdate: !1, isFocused: !0 }),
            (i.openAfterFocus || i.props.openMenuOnFocus) && i.openMenu("first"),
            (i.openAfterFocus = !1);
        }),
        (i.onInputBlur = function (l) {
          var s = i.props.inputValue;
          if (i.menuListRef && i.menuListRef.contains(document.activeElement)) {
            i.inputRef.focus();
            return;
          }
          i.props.onBlur && i.props.onBlur(l),
            i.onInputChange("", { action: "input-blur", prevInputValue: s }),
            i.onMenuClose(),
            i.setState({ focusedValue: null, isFocused: !1 });
        }),
        (i.onOptionHover = function (l) {
          if (!(i.blockOptionHover || i.state.focusedOption === l)) {
            var s = i.getFocusableOptions(),
              c = s.indexOf(l);
            i.setState({
              focusedOption: l,
              focusedOptionId: c > -1 ? i.getFocusedOptionId(l) : null,
            });
          }
        }),
        (i.shouldHideSelectedOptions = function () {
          return yv(i.props);
        }),
        (i.onValueInputFocus = function (l) {
          l.preventDefault(), l.stopPropagation(), i.focus();
        }),
        (i.onKeyDown = function (l) {
          var s = i.props,
            c = s.isMulti,
            p = s.backspaceRemovesValue,
            h = s.escapeClearsValue,
            v = s.inputValue,
            y = s.isClearable,
            g = s.isDisabled,
            O = s.menuIsOpen,
            f = s.onKeyDown,
            d = s.tabSelectsValue,
            m = s.openMenuOnFocus,
            C = i.state,
            P = C.focusedOption,
            b = C.focusedValue,
            E = C.selectValue;
          if (!g && !(typeof f == "function" && (f(l), l.defaultPrevented))) {
            switch (((i.blockOptionHover = !0), l.key)) {
              case "ArrowLeft":
                if (!c || v) return;
                i.focusValue("previous");
                break;
              case "ArrowRight":
                if (!c || v) return;
                i.focusValue("next");
                break;
              case "Delete":
              case "Backspace":
                if (v) return;
                if (b) i.removeValue(b);
                else {
                  if (!p) return;
                  c ? i.popValue() : y && i.clearValue();
                }
                break;
              case "Tab":
                if (
                  i.isComposing ||
                  l.shiftKey ||
                  !O ||
                  !d ||
                  !P ||
                  (m && i.isOptionSelected(P, E))
                )
                  return;
                i.selectOption(P);
                break;
              case "Enter":
                if (l.keyCode === 229) break;
                if (O) {
                  if (!P || i.isComposing) return;
                  i.selectOption(P);
                  break;
                }
                return;
              case "Escape":
                O
                  ? (i.setState({ inputIsHiddenAfterUpdate: !1 }),
                    i.onInputChange("", { action: "menu-close", prevInputValue: v }),
                    i.onMenuClose())
                  : y && h && i.clearValue();
                break;
              case " ":
                if (v) return;
                if (!O) {
                  i.openMenu("first");
                  break;
                }
                if (!P) return;
                i.selectOption(P);
                break;
              case "ArrowUp":
                O ? i.focusOption("up") : i.openMenu("last");
                break;
              case "ArrowDown":
                O ? i.focusOption("down") : i.openMenu("first");
                break;
              case "PageUp":
                if (!O) return;
                i.focusOption("pageup");
                break;
              case "PageDown":
                if (!O) return;
                i.focusOption("pagedown");
                break;
              case "Home":
                if (!O) return;
                i.focusOption("first");
                break;
              case "End":
                if (!O) return;
                i.focusOption("last");
                break;
              default:
                return;
            }
            l.preventDefault();
          }
        }),
        (i.state.instancePrefix = "react-select-" + (i.props.instanceId || ++rO)),
        (i.state.selectValue = nd(r.value)),
        r.menuIsOpen && i.state.selectValue.length)
      ) {
        var o = i.getFocusableOptionsWithIds(),
          u = i.buildFocusableOptions(),
          a = u.indexOf(i.state.selectValue[0]);
        (i.state.focusableOptionsWithIds = o),
          (i.state.focusedOption = u[a]),
          (i.state.focusedOptionId = Ka(o, u[a]));
      }
      return i;
    }
    return (
      b0(
        n,
        [
          {
            key: "componentDidMount",
            value: function () {
              this.startListeningComposition(),
                this.startListeningToTouch(),
                this.props.closeMenuOnScroll &&
                  document &&
                  document.addEventListener &&
                  document.addEventListener("scroll", this.onScroll, !0),
                this.props.autoFocus && this.focusInput(),
                this.props.menuIsOpen &&
                  this.state.focusedOption &&
                  this.menuListRef &&
                  this.focusedOptionRef &&
                  rd(this.menuListRef, this.focusedOptionRef);
            },
          },
          {
            key: "componentDidUpdate",
            value: function (i) {
              var o = this.props,
                u = o.isDisabled,
                a = o.menuIsOpen,
                l = this.state.isFocused;
              ((l && !u && i.isDisabled) || (l && a && !i.menuIsOpen)) && this.focusInput(),
                l && u && !i.isDisabled
                  ? this.setState({ isFocused: !1 }, this.onMenuClose)
                  : !l &&
                    !u &&
                    i.isDisabled &&
                    this.inputRef === document.activeElement &&
                    this.setState({ isFocused: !0 }),
                this.menuListRef &&
                  this.focusedOptionRef &&
                  this.scrollToFocusedOptionOnUpdate &&
                  (rd(this.menuListRef, this.focusedOptionRef),
                  (this.scrollToFocusedOptionOnUpdate = !1));
            },
          },
          {
            key: "componentWillUnmount",
            value: function () {
              this.stopListeningComposition(),
                this.stopListeningToTouch(),
                document.removeEventListener("scroll", this.onScroll, !0);
            },
          },
          {
            key: "onMenuOpen",
            value: function () {
              this.props.onMenuOpen();
            },
          },
          {
            key: "onMenuClose",
            value: function () {
              this.onInputChange("", {
                action: "menu-close",
                prevInputValue: this.props.inputValue,
              }),
                this.props.onMenuClose();
            },
          },
          {
            key: "onInputChange",
            value: function (i, o) {
              this.props.onInputChange(i, o);
            },
          },
          {
            key: "focusInput",
            value: function () {
              this.inputRef && this.inputRef.focus();
            },
          },
          {
            key: "blurInput",
            value: function () {
              this.inputRef && this.inputRef.blur();
            },
          },
          {
            key: "openMenu",
            value: function (i) {
              var o = this,
                u = this.state,
                a = u.selectValue,
                l = u.isFocused,
                s = this.buildFocusableOptions(),
                c = i === "first" ? 0 : s.length - 1;
              if (!this.props.isMulti) {
                var p = s.indexOf(a[0]);
                p > -1 && (c = p);
              }
              (this.scrollToFocusedOptionOnUpdate = !(l && this.menuListRef)),
                this.setState(
                  {
                    inputIsHiddenAfterUpdate: !1,
                    focusedValue: null,
                    focusedOption: s[c],
                    focusedOptionId: this.getFocusedOptionId(s[c]),
                  },
                  function () {
                    return o.onMenuOpen();
                  }
                );
            },
          },
          {
            key: "focusValue",
            value: function (i) {
              var o = this.state,
                u = o.selectValue,
                a = o.focusedValue;
              if (this.props.isMulti) {
                this.setState({ focusedOption: null });
                var l = u.indexOf(a);
                a || (l = -1);
                var s = u.length - 1,
                  c = -1;
                if (u.length) {
                  switch (i) {
                    case "previous":
                      l === 0 ? (c = 0) : l === -1 ? (c = s) : (c = l - 1);
                      break;
                    case "next":
                      l > -1 && l < s && (c = l + 1);
                      break;
                  }
                  this.setState({ inputIsHidden: c !== -1, focusedValue: u[c] });
                }
              }
            },
          },
          {
            key: "focusOption",
            value: function () {
              var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "first",
                o = this.props.pageSize,
                u = this.state.focusedOption,
                a = this.getFocusableOptions();
              if (a.length) {
                var l = 0,
                  s = a.indexOf(u);
                u || (s = -1),
                  i === "up"
                    ? (l = s > 0 ? s - 1 : a.length - 1)
                    : i === "down"
                    ? (l = (s + 1) % a.length)
                    : i === "pageup"
                    ? ((l = s - o), l < 0 && (l = 0))
                    : i === "pagedown"
                    ? ((l = s + o), l > a.length - 1 && (l = a.length - 1))
                    : i === "last" && (l = a.length - 1),
                  (this.scrollToFocusedOptionOnUpdate = !0),
                  this.setState({
                    focusedOption: a[l],
                    focusedValue: null,
                    focusedOptionId: this.getFocusedOptionId(a[l]),
                  });
              }
            },
          },
          {
            key: "getTheme",
            value: function () {
              return this.props.theme
                ? typeof this.props.theme == "function"
                  ? this.props.theme(Wa)
                  : A(A({}, Wa), this.props.theme)
                : Wa;
            },
          },
          {
            key: "getCommonProps",
            value: function () {
              var i = this.clearValue,
                o = this.cx,
                u = this.getStyles,
                a = this.getClassNames,
                l = this.getValue,
                s = this.selectOption,
                c = this.setValue,
                p = this.props,
                h = p.isMulti,
                v = p.isRtl,
                y = p.options,
                g = this.hasValue();
              return {
                clearValue: i,
                cx: o,
                getStyles: u,
                getClassNames: a,
                getValue: l,
                hasValue: g,
                isMulti: h,
                isRtl: v,
                options: y,
                selectOption: s,
                selectProps: p,
                setValue: c,
                theme: this.getTheme(),
              };
            },
          },
          {
            key: "hasValue",
            value: function () {
              var i = this.state.selectValue;
              return i.length > 0;
            },
          },
          {
            key: "hasOptions",
            value: function () {
              return !!this.getFocusableOptions().length;
            },
          },
          {
            key: "isClearable",
            value: function () {
              var i = this.props,
                o = i.isClearable,
                u = i.isMulti;
              return o === void 0 ? u : o;
            },
          },
          {
            key: "isOptionDisabled",
            value: function (i, o) {
              return mv(this.props, i, o);
            },
          },
          {
            key: "isOptionSelected",
            value: function (i, o) {
              return vv(this.props, i, o);
            },
          },
          {
            key: "filterOption",
            value: function (i, o) {
              return gv(this.props, i, o);
            },
          },
          {
            key: "formatOptionLabel",
            value: function (i, o) {
              if (typeof this.props.formatOptionLabel == "function") {
                var u = this.props.inputValue,
                  a = this.state.selectValue;
                return this.props.formatOptionLabel(i, {
                  context: o,
                  inputValue: u,
                  selectValue: a,
                });
              } else return this.getOptionLabel(i);
            },
          },
          {
            key: "formatGroupLabel",
            value: function (i) {
              return this.props.formatGroupLabel(i);
            },
          },
          {
            key: "startListeningComposition",
            value: function () {
              document &&
                document.addEventListener &&
                (document.addEventListener("compositionstart", this.onCompositionStart, !1),
                document.addEventListener("compositionend", this.onCompositionEnd, !1));
            },
          },
          {
            key: "stopListeningComposition",
            value: function () {
              document &&
                document.removeEventListener &&
                (document.removeEventListener("compositionstart", this.onCompositionStart),
                document.removeEventListener("compositionend", this.onCompositionEnd));
            },
          },
          {
            key: "startListeningToTouch",
            value: function () {
              document &&
                document.addEventListener &&
                (document.addEventListener("touchstart", this.onTouchStart, !1),
                document.addEventListener("touchmove", this.onTouchMove, !1),
                document.addEventListener("touchend", this.onTouchEnd, !1));
            },
          },
          {
            key: "stopListeningToTouch",
            value: function () {
              document &&
                document.removeEventListener &&
                (document.removeEventListener("touchstart", this.onTouchStart),
                document.removeEventListener("touchmove", this.onTouchMove),
                document.removeEventListener("touchend", this.onTouchEnd));
            },
          },
          {
            key: "renderInput",
            value: function () {
              var i = this.props,
                o = i.isDisabled,
                u = i.isSearchable,
                a = i.inputId,
                l = i.inputValue,
                s = i.tabIndex,
                c = i.form,
                p = i.menuIsOpen,
                h = i.required,
                v = this.getComponents(),
                y = v.Input,
                g = this.state,
                O = g.inputIsHidden,
                f = g.ariaSelection,
                d = this.commonProps,
                m = a || this.getElementId("input"),
                C = A(
                  A(
                    A(
                      {
                        "aria-autocomplete": "list",
                        "aria-expanded": p,
                        "aria-haspopup": !0,
                        "aria-errormessage": this.props["aria-errormessage"],
                        "aria-invalid": this.props["aria-invalid"],
                        "aria-label": this.props["aria-label"],
                        "aria-labelledby": this.props["aria-labelledby"],
                        "aria-required": h,
                        role: "combobox",
                        "aria-activedescendant": this.isAppleDevice
                          ? void 0
                          : this.state.focusedOptionId || "",
                      },
                      p && { "aria-controls": this.getElementId("listbox") }
                    ),
                    !u && { "aria-readonly": !0 }
                  ),
                  this.hasValue()
                    ? (f == null ? void 0 : f.action) === "initial-input-focus" && {
                        "aria-describedby": this.getElementId("live-region"),
                      }
                    : { "aria-describedby": this.getElementId("placeholder") }
                );
              return u
                ? x.createElement(
                    y,
                    $(
                      {},
                      d,
                      {
                        autoCapitalize: "none",
                        autoComplete: "off",
                        autoCorrect: "off",
                        id: m,
                        innerRef: this.getInputRef,
                        isDisabled: o,
                        isHidden: O,
                        onBlur: this.onInputBlur,
                        onChange: this.handleInputChange,
                        onFocus: this.onInputFocus,
                        spellCheck: "false",
                        tabIndex: s,
                        form: c,
                        type: "text",
                        value: l,
                      },
                      C
                    )
                  )
                : x.createElement(
                    TS,
                    $(
                      {
                        id: m,
                        innerRef: this.getInputRef,
                        onBlur: this.onInputBlur,
                        onChange: Mu,
                        onFocus: this.onInputFocus,
                        disabled: o,
                        tabIndex: s,
                        inputMode: "none",
                        form: c,
                        value: "",
                      },
                      C
                    )
                  );
            },
          },
          {
            key: "renderPlaceholderOrValue",
            value: function () {
              var i = this,
                o = this.getComponents(),
                u = o.MultiValue,
                a = o.MultiValueContainer,
                l = o.MultiValueLabel,
                s = o.MultiValueRemove,
                c = o.SingleValue,
                p = o.Placeholder,
                h = this.commonProps,
                v = this.props,
                y = v.controlShouldRenderValue,
                g = v.isDisabled,
                O = v.isMulti,
                f = v.inputValue,
                d = v.placeholder,
                m = this.state,
                C = m.selectValue,
                P = m.focusedValue,
                b = m.isFocused;
              if (!this.hasValue() || !y)
                return f
                  ? null
                  : x.createElement(
                      p,
                      $({}, h, {
                        key: "placeholder",
                        isDisabled: g,
                        isFocused: b,
                        innerProps: { id: this.getElementId("placeholder") },
                      }),
                      d
                    );
              if (O)
                return C.map(function (k, D) {
                  var _ = k === P,
                    G = "".concat(i.getOptionLabel(k), "-").concat(i.getOptionValue(k));
                  return x.createElement(
                    u,
                    $({}, h, {
                      components: { Container: a, Label: l, Remove: s },
                      isFocused: _,
                      isDisabled: g,
                      key: G,
                      index: D,
                      removeProps: {
                        onClick: function () {
                          return i.removeValue(k);
                        },
                        onTouchEnd: function () {
                          return i.removeValue(k);
                        },
                        onMouseDown: function (Le) {
                          Le.preventDefault();
                        },
                      },
                      data: k,
                    }),
                    i.formatOptionLabel(k, "value")
                  );
                });
              if (f) return null;
              var E = C[0];
              return x.createElement(
                c,
                $({}, h, { data: E, isDisabled: g }),
                this.formatOptionLabel(E, "value")
              );
            },
          },
          {
            key: "renderClearIndicator",
            value: function () {
              var i = this.getComponents(),
                o = i.ClearIndicator,
                u = this.commonProps,
                a = this.props,
                l = a.isDisabled,
                s = a.isLoading,
                c = this.state.isFocused;
              if (!this.isClearable() || !o || l || !this.hasValue() || s) return null;
              var p = {
                onMouseDown: this.onClearIndicatorMouseDown,
                onTouchEnd: this.onClearIndicatorTouchEnd,
                "aria-hidden": "true",
              };
              return x.createElement(o, $({}, u, { innerProps: p, isFocused: c }));
            },
          },
          {
            key: "renderLoadingIndicator",
            value: function () {
              var i = this.getComponents(),
                o = i.LoadingIndicator,
                u = this.commonProps,
                a = this.props,
                l = a.isDisabled,
                s = a.isLoading,
                c = this.state.isFocused;
              if (!o || !s) return null;
              var p = { "aria-hidden": "true" };
              return x.createElement(o, $({}, u, { innerProps: p, isDisabled: l, isFocused: c }));
            },
          },
          {
            key: "renderIndicatorSeparator",
            value: function () {
              var i = this.getComponents(),
                o = i.DropdownIndicator,
                u = i.IndicatorSeparator;
              if (!o || !u) return null;
              var a = this.commonProps,
                l = this.props.isDisabled,
                s = this.state.isFocused;
              return x.createElement(u, $({}, a, { isDisabled: l, isFocused: s }));
            },
          },
          {
            key: "renderDropdownIndicator",
            value: function () {
              var i = this.getComponents(),
                o = i.DropdownIndicator;
              if (!o) return null;
              var u = this.commonProps,
                a = this.props.isDisabled,
                l = this.state.isFocused,
                s = {
                  onMouseDown: this.onDropdownIndicatorMouseDown,
                  onTouchEnd: this.onDropdownIndicatorTouchEnd,
                  "aria-hidden": "true",
                };
              return x.createElement(o, $({}, u, { innerProps: s, isDisabled: a, isFocused: l }));
            },
          },
          {
            key: "renderMenu",
            value: function () {
              var i = this,
                o = this.getComponents(),
                u = o.Group,
                a = o.GroupHeading,
                l = o.Menu,
                s = o.MenuList,
                c = o.MenuPortal,
                p = o.LoadingMessage,
                h = o.NoOptionsMessage,
                v = o.Option,
                y = this.commonProps,
                g = this.state.focusedOption,
                O = this.props,
                f = O.captureMenuScroll,
                d = O.inputValue,
                m = O.isLoading,
                C = O.loadingMessage,
                P = O.minMenuHeight,
                b = O.maxMenuHeight,
                E = O.menuIsOpen,
                k = O.menuPlacement,
                D = O.menuPosition,
                _ = O.menuPortalTarget,
                G = O.menuShouldBlockScroll,
                oe = O.menuShouldScrollIntoView,
                Le = O.noOptionsMessage,
                nt = O.onMenuScrollToTop,
                se = O.onMenuScrollToBottom;
              if (!E) return null;
              var te = function (ve, Ce) {
                  var rt = ve.type,
                    de = ve.data,
                    We = ve.isDisabled,
                    At = ve.isSelected,
                    co = ve.label,
                    Hv = ve.value,
                    Dc = g === de,
                    Fc = We
                      ? void 0
                      : function () {
                          return i.onOptionHover(de);
                        },
                    Bv = We
                      ? void 0
                      : function () {
                          return i.selectOption(de);
                        },
                    _c = "".concat(i.getElementId("option"), "-").concat(Ce),
                    Qv = {
                      id: _c,
                      onClick: Bv,
                      onMouseMove: Fc,
                      onMouseOver: Fc,
                      tabIndex: -1,
                      role: "option",
                      "aria-selected": i.isAppleDevice ? void 0 : At,
                    };
                  return x.createElement(
                    v,
                    $({}, y, {
                      innerProps: Qv,
                      data: de,
                      isDisabled: We,
                      isSelected: At,
                      key: _c,
                      label: co,
                      type: rt,
                      value: Hv,
                      isFocused: Dc,
                      innerRef: Dc ? i.getFocusedOptionRef : void 0,
                    }),
                    i.formatOptionLabel(ve.data, "menu")
                  );
                },
                $e;
              if (this.hasOptions())
                $e = this.getCategorizedOptions().map(function (z) {
                  if (z.type === "group") {
                    var ve = z.data,
                      Ce = z.options,
                      rt = z.index,
                      de = "".concat(i.getElementId("group"), "-").concat(rt),
                      We = "".concat(de, "-heading");
                    return x.createElement(
                      u,
                      $({}, y, {
                        key: de,
                        data: ve,
                        options: Ce,
                        Heading: a,
                        headingProps: { id: We, data: z.data },
                        label: i.formatGroupLabel(z.data),
                      }),
                      z.options.map(function (At) {
                        return te(At, "".concat(rt, "-").concat(At.index));
                      })
                    );
                  } else if (z.type === "option") return te(z, "".concat(z.index));
                });
              else if (m) {
                var T = C({ inputValue: d });
                if (T === null) return null;
                $e = x.createElement(p, y, T);
              } else {
                var N = Le({ inputValue: d });
                if (N === null) return null;
                $e = x.createElement(h, y, N);
              }
              var V = {
                  minMenuHeight: P,
                  maxMenuHeight: b,
                  menuPlacement: k,
                  menuPosition: D,
                  menuShouldScrollIntoView: oe,
                },
                q = x.createElement(aw, $({}, y, V), function (z) {
                  var ve = z.ref,
                    Ce = z.placerProps,
                    rt = Ce.placement,
                    de = Ce.maxHeight;
                  return x.createElement(
                    l,
                    $({}, y, V, {
                      innerRef: ve,
                      innerProps: {
                        onMouseDown: i.onMenuMouseDown,
                        onMouseMove: i.onMenuMouseMove,
                      },
                      isLoading: m,
                      placement: rt,
                    }),
                    x.createElement(
                      _S,
                      { captureEnabled: f, onTopArrive: nt, onBottomArrive: se, lockEnabled: G },
                      function (We) {
                        return x.createElement(
                          s,
                          $({}, y, {
                            innerRef: function (co) {
                              i.getMenuListRef(co), We(co);
                            },
                            innerProps: {
                              role: "listbox",
                              "aria-multiselectable": y.isMulti,
                              id: i.getElementId("listbox"),
                            },
                            isLoading: m,
                            maxHeight: de,
                            focusedOption: g,
                          }),
                          $e
                        );
                      }
                    )
                  );
                });
              return _ || D === "fixed"
                ? x.createElement(
                    c,
                    $({}, y, {
                      appendTo: _,
                      controlElement: this.controlRef,
                      menuPlacement: k,
                      menuPosition: D,
                    }),
                    q
                  )
                : q;
            },
          },
          {
            key: "renderFormField",
            value: function () {
              var i = this,
                o = this.props,
                u = o.delimiter,
                a = o.isDisabled,
                l = o.isMulti,
                s = o.name,
                c = o.required,
                p = this.state.selectValue;
              if (c && !this.hasValue() && !a)
                return x.createElement($S, { name: s, onFocus: this.onValueInputFocus });
              if (!(!s || a))
                if (l)
                  if (u) {
                    var h = p
                      .map(function (g) {
                        return i.getOptionValue(g);
                      })
                      .join(u);
                    return x.createElement("input", { name: s, type: "hidden", value: h });
                  } else {
                    var v =
                      p.length > 0
                        ? p.map(function (g, O) {
                            return x.createElement("input", {
                              key: "i-".concat(O),
                              name: s,
                              type: "hidden",
                              value: i.getOptionValue(g),
                            });
                          })
                        : x.createElement("input", { name: s, type: "hidden", value: "" });
                    return x.createElement("div", null, v);
                  }
                else {
                  var y = p[0] ? this.getOptionValue(p[0]) : "";
                  return x.createElement("input", { name: s, type: "hidden", value: y });
                }
            },
          },
          {
            key: "renderLiveRegion",
            value: function () {
              var i = this.commonProps,
                o = this.state,
                u = o.ariaSelection,
                a = o.focusedOption,
                l = o.focusedValue,
                s = o.isFocused,
                c = o.selectValue,
                p = this.getFocusableOptions();
              return x.createElement(
                ES,
                $({}, i, {
                  id: this.getElementId("live-region"),
                  ariaSelection: u,
                  focusedOption: a,
                  focusedValue: l,
                  isFocused: s,
                  selectValue: c,
                  focusableOptions: p,
                  isAppleDevice: this.isAppleDevice,
                })
              );
            },
          },
          {
            key: "render",
            value: function () {
              var i = this.getComponents(),
                o = i.Control,
                u = i.IndicatorsContainer,
                a = i.SelectContainer,
                l = i.ValueContainer,
                s = this.props,
                c = s.className,
                p = s.id,
                h = s.isDisabled,
                v = s.menuIsOpen,
                y = this.state.isFocused,
                g = (this.commonProps = this.getCommonProps());
              return x.createElement(
                a,
                $({}, g, {
                  className: c,
                  innerProps: { id: p, onKeyDown: this.onKeyDown },
                  isDisabled: h,
                  isFocused: y,
                }),
                this.renderLiveRegion(),
                x.createElement(
                  o,
                  $({}, g, {
                    innerRef: this.getControlRef,
                    innerProps: {
                      onMouseDown: this.onControlMouseDown,
                      onTouchEnd: this.onControlTouchEnd,
                    },
                    isDisabled: h,
                    isFocused: y,
                    menuIsOpen: v,
                  }),
                  x.createElement(
                    l,
                    $({}, g, { isDisabled: h }),
                    this.renderPlaceholderOrValue(),
                    this.renderInput()
                  ),
                  x.createElement(
                    u,
                    $({}, g, { isDisabled: h }),
                    this.renderClearIndicator(),
                    this.renderLoadingIndicator(),
                    this.renderIndicatorSeparator(),
                    this.renderDropdownIndicator()
                  )
                ),
                this.renderMenu(),
                this.renderFormField()
              );
            },
          },
        ],
        [
          {
            key: "getDerivedStateFromProps",
            value: function (i, o) {
              var u = o.prevProps,
                a = o.clearFocusValueOnUpdate,
                l = o.inputIsHiddenAfterUpdate,
                s = o.ariaSelection,
                c = o.isFocused,
                p = o.prevWasFocused,
                h = o.instancePrefix,
                v = i.options,
                y = i.value,
                g = i.menuIsOpen,
                O = i.inputValue,
                f = i.isMulti,
                d = nd(y),
                m = {};
              if (
                u &&
                (y !== u.value || v !== u.options || g !== u.menuIsOpen || O !== u.inputValue)
              ) {
                var C = g ? eO(i, d) : [],
                  P = g ? gd(Xo(i, d), "".concat(h, "-option")) : [],
                  b = a ? tO(o, d) : null,
                  E = nO(o, C),
                  k = Ka(P, E);
                m = {
                  selectValue: d,
                  focusedOption: E,
                  focusedOptionId: k,
                  focusableOptionsWithIds: P,
                  focusedValue: b,
                  clearFocusValueOnUpdate: !1,
                };
              }
              var D =
                  l != null && i !== u
                    ? { inputIsHidden: l, inputIsHiddenAfterUpdate: void 0 }
                    : {},
                _ = s,
                G = c && p;
              return (
                c &&
                  !G &&
                  ((_ = {
                    value: Fo(f, d, d[0] || null),
                    options: d,
                    action: "initial-input-focus",
                  }),
                  (G = !p)),
                (s == null ? void 0 : s.action) === "initial-input-focus" && (_ = null),
                A(A(A({}, m), D), {}, { prevProps: i, ariaSelection: _, prevWasFocused: G })
              );
            },
          },
        ]
      ),
      n
    );
  })(x.Component);
wv.defaultProps = JS;
var iO = x.forwardRef(function (e, t) {
    var n = P0(e);
    return x.createElement(wv, $({ ref: t }, n));
  }),
  o2 = iO,
  so = class {
    constructor() {
      (this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          this.listeners.delete(e), this.onUnsubscribe();
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  Qr = typeof window > "u" || "Deno" in window;
function at() {}
function oO(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Yl(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function Sv(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function wd(e, t) {
  const { type: n = "all", exact: r, fetchStatus: i, predicate: o, queryKey: u, stale: a } = e;
  if (u) {
    if (r) {
      if (t.queryHash !== Tc(u, t.options)) return !1;
    } else if (!Ui(t.queryKey, u)) return !1;
  }
  if (n !== "all") {
    const l = t.isActive();
    if ((n === "active" && !l) || (n === "inactive" && l)) return !1;
  }
  return !(
    (typeof a == "boolean" && t.isStale() !== a) ||
    (typeof i < "u" && i !== t.state.fetchStatus) ||
    (o && !o(t))
  );
}
function Sd(e, t) {
  const { exact: n, status: r, predicate: i, mutationKey: o } = e;
  if (o) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (ji(t.options.mutationKey) !== ji(o)) return !1;
    } else if (!Ui(t.options.mutationKey, o)) return !1;
  }
  return !((r && t.state.status !== r) || (i && !i(t)));
}
function Tc(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || ji)(e);
}
function ji(e) {
  return JSON.stringify(e, (t, n) =>
    Zl(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, i) => ((r[i] = n[i]), r), {})
      : n
  );
}
function Ui(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
    ? !1
    : e && t && typeof e == "object" && typeof t == "object"
    ? !Object.keys(t).some((n) => !Ui(e[n], t[n]))
    : !1;
}
function Ov(e, t) {
  if (e === t) return e;
  const n = Od(e) && Od(t);
  if (n || (Zl(e) && Zl(t))) {
    const r = n ? e : Object.keys(e),
      i = r.length,
      o = n ? t : Object.keys(t),
      u = o.length,
      a = n ? [] : {};
    let l = 0;
    for (let s = 0; s < u; s++) {
      const c = n ? s : o[s];
      !n && e[c] === void 0 && t[c] === void 0 && r.includes(c)
        ? ((a[c] = void 0), l++)
        : ((a[c] = Ov(e[c], t[c])), a[c] === e[c] && e[c] !== void 0 && l++);
    }
    return i === u && l === i ? e : a;
  }
  return t;
}
function Xl(e, t) {
  if ((e && !t) || (t && !e)) return !1;
  for (const n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function Od(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Zl(e) {
  if (!Cd(e)) return !1;
  const t = e.constructor;
  if (typeof t > "u") return !0;
  const n = t.prototype;
  return !(!Cd(n) || !n.hasOwnProperty("isPrototypeOf"));
}
function Cd(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function uO(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function Jl(e, t, n) {
  return typeof n.structuralSharing == "function"
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
    ? Ov(e, t)
    : t;
}
function aO(e, t, n = 0) {
  const r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function lO(e, t, n = 0) {
  const r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var Dn,
  on,
  Cr,
  ap,
  sO =
    ((ap = class extends so {
      constructor() {
        super();
        L(this, Dn, void 0);
        L(this, on, void 0);
        L(this, Cr, void 0);
        I(this, Cr, (t) => {
          if (!Qr && window.addEventListener) {
            const n = () => t();
            return (
              window.addEventListener("visibilitychange", n, !1),
              () => {
                window.removeEventListener("visibilitychange", n);
              }
            );
          }
        });
      }
      onSubscribe() {
        S(this, on) || this.setEventListener(S(this, Cr));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = S(this, on)) == null || t.call(this), I(this, on, void 0));
      }
      setEventListener(t) {
        var n;
        I(this, Cr, t),
          (n = S(this, on)) == null || n.call(this),
          I(
            this,
            on,
            t((r) => {
              typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
            })
          );
      }
      setFocused(t) {
        S(this, Dn) !== t && (I(this, Dn, t), this.onFocus());
      }
      onFocus() {
        this.listeners.forEach((t) => {
          t();
        });
      }
      isFocused() {
        var t;
        return typeof S(this, Dn) == "boolean"
          ? S(this, Dn)
          : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden";
      }
    }),
    (Dn = new WeakMap()),
    (on = new WeakMap()),
    (Cr = new WeakMap()),
    ap),
  Ru = new sO(),
  Er,
  un,
  Pr,
  lp,
  cO =
    ((lp = class extends so {
      constructor() {
        super();
        L(this, Er, !0);
        L(this, un, void 0);
        L(this, Pr, void 0);
        I(this, Pr, (t) => {
          if (!Qr && window.addEventListener) {
            const n = () => t(!0),
              r = () => t(!1);
            return (
              window.addEventListener("online", n, !1),
              window.addEventListener("offline", r, !1),
              () => {
                window.removeEventListener("online", n), window.removeEventListener("offline", r);
              }
            );
          }
        });
      }
      onSubscribe() {
        S(this, un) || this.setEventListener(S(this, Pr));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = S(this, un)) == null || t.call(this), I(this, un, void 0));
      }
      setEventListener(t) {
        var n;
        I(this, Pr, t),
          (n = S(this, un)) == null || n.call(this),
          I(this, un, t(this.setOnline.bind(this)));
      }
      setOnline(t) {
        S(this, Er) !== t &&
          (I(this, Er, t),
          this.listeners.forEach((r) => {
            r(t);
          }));
      }
      isOnline() {
        return S(this, Er);
      }
    }),
    (Er = new WeakMap()),
    (un = new WeakMap()),
    (Pr = new WeakMap()),
    lp),
  Lu = new cO();
function fO(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function da(e) {
  return (e ?? "online") === "online" ? Lu.isOnline() : !0;
}
var Cv = class {
  constructor(e) {
    (this.revert = e == null ? void 0 : e.revert), (this.silent = e == null ? void 0 : e.silent);
  }
};
function Ga(e) {
  return e instanceof Cv;
}
function Ev(e) {
  let t = !1,
    n = 0,
    r = !1,
    i,
    o,
    u;
  const a = new Promise((O, f) => {
      (o = O), (u = f);
    }),
    l = (O) => {
      var f;
      r || (v(new Cv(O)), (f = e.abort) == null || f.call(e));
    },
    s = () => {
      t = !0;
    },
    c = () => {
      t = !1;
    },
    p = () => !Ru.isFocused() || (e.networkMode !== "always" && !Lu.isOnline()),
    h = (O) => {
      var f;
      r || ((r = !0), (f = e.onSuccess) == null || f.call(e, O), i == null || i(), o(O));
    },
    v = (O) => {
      var f;
      r || ((r = !0), (f = e.onError) == null || f.call(e, O), i == null || i(), u(O));
    },
    y = () =>
      new Promise((O) => {
        var f;
        (i = (d) => {
          const m = r || !p();
          return m && O(d), m;
        }),
          (f = e.onPause) == null || f.call(e);
      }).then(() => {
        var O;
        (i = void 0), r || (O = e.onContinue) == null || O.call(e);
      }),
    g = () => {
      if (r) return;
      let O;
      try {
        O = e.fn();
      } catch (f) {
        O = Promise.reject(f);
      }
      Promise.resolve(O)
        .then(h)
        .catch((f) => {
          var b;
          if (r) return;
          const d = e.retry ?? (Qr ? 0 : 3),
            m = e.retryDelay ?? fO,
            C = typeof m == "function" ? m(n, f) : m,
            P = d === !0 || (typeof d == "number" && n < d) || (typeof d == "function" && d(n, f));
          if (t || !P) {
            v(f);
            return;
          }
          n++,
            (b = e.onFail) == null || b.call(e, n, f),
            uO(C)
              .then(() => {
                if (p()) return y();
              })
              .then(() => {
                t ? v(f) : g();
              });
        });
    };
  return (
    da(e.networkMode) ? g() : y().then(g),
    {
      promise: a,
      cancel: l,
      continue: () => ((i == null ? void 0 : i()) ? a : Promise.resolve()),
      cancelRetry: s,
      continueRetry: c,
    }
  );
}
function dO() {
  let e = [],
    t = 0,
    n = (h) => {
      h();
    },
    r = (h) => {
      h();
    },
    i = (h) => setTimeout(h, 0);
  const o = (h) => {
      i = h;
    },
    u = (h) => {
      let v;
      t++;
      try {
        v = h();
      } finally {
        t--, t || s();
      }
      return v;
    },
    a = (h) => {
      t
        ? e.push(h)
        : i(() => {
            n(h);
          });
    },
    l =
      (h) =>
      (...v) => {
        a(() => {
          h(...v);
        });
      },
    s = () => {
      const h = e;
      (e = []),
        h.length &&
          i(() => {
            r(() => {
              h.forEach((v) => {
                n(v);
              });
            });
          });
    };
  return {
    batch: u,
    batchCalls: l,
    schedule: a,
    setNotifyFunction: (h) => {
      n = h;
    },
    setBatchNotifyFunction: (h) => {
      r = h;
    },
    setScheduler: o,
  };
}
var we = dO(),
  Fn,
  sp,
  Pv =
    ((sp = class {
      constructor() {
        L(this, Fn, void 0);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        this.clearGcTimeout(),
          Yl(this.gcTime) &&
            I(
              this,
              Fn,
              setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)
            );
      }
      updateGcTime(e) {
        this.gcTime = Math.max(this.gcTime || 0, e ?? (Qr ? 1 / 0 : 5 * 60 * 1e3));
      }
      clearGcTimeout() {
        S(this, Fn) && (clearTimeout(S(this, Fn)), I(this, Fn, void 0));
      }
    }),
    (Fn = new WeakMap()),
    sp),
  kr,
  br,
  it,
  an,
  ot,
  ge,
  Qi,
  _n,
  xr,
  Zo,
  vt,
  Nt,
  cp,
  pO =
    ((cp = class extends Pv {
      constructor(t) {
        super();
        L(this, xr);
        L(this, vt);
        L(this, kr, void 0);
        L(this, br, void 0);
        L(this, it, void 0);
        L(this, an, void 0);
        L(this, ot, void 0);
        L(this, ge, void 0);
        L(this, Qi, void 0);
        L(this, _n, void 0);
        I(this, _n, !1),
          I(this, Qi, t.defaultOptions),
          j(this, xr, Zo).call(this, t.options),
          I(this, ge, []),
          I(this, it, t.cache),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          I(this, kr, t.state || hO(this.options)),
          (this.state = S(this, kr)),
          this.scheduleGc();
      }
      get meta() {
        return this.options.meta;
      }
      optionalRemove() {
        !S(this, ge).length && this.state.fetchStatus === "idle" && S(this, it).remove(this);
      }
      setData(t, n) {
        const r = Jl(this.state.data, t, this.options);
        return (
          j(this, vt, Nt).call(this, {
            data: r,
            type: "success",
            dataUpdatedAt: n == null ? void 0 : n.updatedAt,
            manual: n == null ? void 0 : n.manual,
          }),
          r
        );
      }
      setState(t, n) {
        j(this, vt, Nt).call(this, { type: "setState", state: t, setStateOptions: n });
      }
      cancel(t) {
        var r;
        const n = S(this, an);
        return (
          (r = S(this, ot)) == null || r.cancel(t), n ? n.then(at).catch(at) : Promise.resolve()
        );
      }
      destroy() {
        super.destroy(), this.cancel({ silent: !0 });
      }
      reset() {
        this.destroy(), this.setState(S(this, kr));
      }
      isActive() {
        return S(this, ge).some((t) => t.options.enabled !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0 && !this.isActive();
      }
      isStale() {
        return (
          this.state.isInvalidated ||
          !this.state.dataUpdatedAt ||
          S(this, ge).some((t) => t.getCurrentResult().isStale)
        );
      }
      isStaleByTime(t = 0) {
        return (
          this.state.isInvalidated || !this.state.dataUpdatedAt || !Sv(this.state.dataUpdatedAt, t)
        );
      }
      onFocus() {
        var n;
        const t = S(this, ge).find((r) => r.shouldFetchOnWindowFocus());
        t == null || t.refetch({ cancelRefetch: !1 }), (n = S(this, ot)) == null || n.continue();
      }
      onOnline() {
        var n;
        const t = S(this, ge).find((r) => r.shouldFetchOnReconnect());
        t == null || t.refetch({ cancelRefetch: !1 }), (n = S(this, ot)) == null || n.continue();
      }
      addObserver(t) {
        S(this, ge).includes(t) ||
          (S(this, ge).push(t),
          this.clearGcTimeout(),
          S(this, it).notify({ type: "observerAdded", query: this, observer: t }));
      }
      removeObserver(t) {
        S(this, ge).includes(t) &&
          (I(
            this,
            ge,
            S(this, ge).filter((n) => n !== t)
          ),
          S(this, ge).length ||
            (S(this, ot) &&
              (S(this, _n) ? S(this, ot).cancel({ revert: !0 }) : S(this, ot).cancelRetry()),
            this.scheduleGc()),
          S(this, it).notify({ type: "observerRemoved", query: this, observer: t }));
      }
      getObserversCount() {
        return S(this, ge).length;
      }
      invalidate() {
        this.state.isInvalidated || j(this, vt, Nt).call(this, { type: "invalidate" });
      }
      fetch(t, n) {
        var s, c, p, h;
        if (this.state.fetchStatus !== "idle") {
          if (this.state.dataUpdatedAt && n != null && n.cancelRefetch) this.cancel({ silent: !0 });
          else if (S(this, an)) return (s = S(this, ot)) == null || s.continueRetry(), S(this, an);
        }
        if ((t && j(this, xr, Zo).call(this, t), !this.options.queryFn)) {
          const v = S(this, ge).find((y) => y.options.queryFn);
          v && j(this, xr, Zo).call(this, v.options);
        }
        const r = new AbortController(),
          i = { queryKey: this.queryKey, meta: this.meta },
          o = (v) => {
            Object.defineProperty(v, "signal", {
              enumerable: !0,
              get: () => (I(this, _n, !0), r.signal),
            });
          };
        o(i);
        const u = () =>
            this.options.queryFn
              ? (I(this, _n, !1),
                this.options.persister
                  ? this.options.persister(this.options.queryFn, i, this)
                  : this.options.queryFn(i))
              : Promise.reject(new Error(`Missing queryFn: '${this.options.queryHash}'`)),
          a = {
            fetchOptions: n,
            options: this.options,
            queryKey: this.queryKey,
            state: this.state,
            fetchFn: u,
          };
        o(a),
          (c = this.options.behavior) == null || c.onFetch(a, this),
          I(this, br, this.state),
          (this.state.fetchStatus === "idle" ||
            this.state.fetchMeta !== ((p = a.fetchOptions) == null ? void 0 : p.meta)) &&
            j(this, vt, Nt).call(this, {
              type: "fetch",
              meta: (h = a.fetchOptions) == null ? void 0 : h.meta,
            });
        const l = (v) => {
          var y, g, O, f;
          (Ga(v) && v.silent) || j(this, vt, Nt).call(this, { type: "error", error: v }),
            Ga(v) ||
              ((g = (y = S(this, it).config).onError) == null || g.call(y, v, this),
              (f = (O = S(this, it).config).onSettled) == null ||
                f.call(O, this.state.data, v, this)),
            this.isFetchingOptimistic || this.scheduleGc(),
            (this.isFetchingOptimistic = !1);
        };
        return (
          I(
            this,
            ot,
            Ev({
              fn: a.fetchFn,
              abort: r.abort.bind(r),
              onSuccess: (v) => {
                var y, g, O, f;
                if (typeof v > "u") {
                  l(new Error(`${this.queryHash} data is undefined`));
                  return;
                }
                this.setData(v),
                  (g = (y = S(this, it).config).onSuccess) == null || g.call(y, v, this),
                  (f = (O = S(this, it).config).onSettled) == null ||
                    f.call(O, v, this.state.error, this),
                  this.isFetchingOptimistic || this.scheduleGc(),
                  (this.isFetchingOptimistic = !1);
              },
              onError: l,
              onFail: (v, y) => {
                j(this, vt, Nt).call(this, { type: "failed", failureCount: v, error: y });
              },
              onPause: () => {
                j(this, vt, Nt).call(this, { type: "pause" });
              },
              onContinue: () => {
                j(this, vt, Nt).call(this, { type: "continue" });
              },
              retry: a.options.retry,
              retryDelay: a.options.retryDelay,
              networkMode: a.options.networkMode,
            })
          ),
          I(this, an, S(this, ot).promise),
          S(this, an)
        );
      }
    }),
    (kr = new WeakMap()),
    (br = new WeakMap()),
    (it = new WeakMap()),
    (an = new WeakMap()),
    (ot = new WeakMap()),
    (ge = new WeakMap()),
    (Qi = new WeakMap()),
    (_n = new WeakMap()),
    (xr = new WeakSet()),
    (Zo = function (t) {
      (this.options = { ...S(this, Qi), ...t }), this.updateGcTime(this.options.gcTime);
    }),
    (vt = new WeakSet()),
    (Nt = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return { ...r, fetchFailureCount: t.failureCount, fetchFailureReason: t.error };
          case "pause":
            return { ...r, fetchStatus: "paused" };
          case "continue":
            return { ...r, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...r,
              fetchFailureCount: 0,
              fetchFailureReason: null,
              fetchMeta: t.meta ?? null,
              fetchStatus: da(this.options.networkMode) ? "fetching" : "paused",
              ...(!r.dataUpdatedAt && { error: null, status: "pending" }),
            };
          case "success":
            return {
              ...r,
              data: t.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!t.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
          case "error":
            const i = t.error;
            return Ga(i) && i.revert && S(this, br)
              ? { ...S(this, br), fetchStatus: "idle" }
              : {
                  ...r,
                  error: i,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  fetchFailureReason: i,
                  fetchStatus: "idle",
                  status: "error",
                };
          case "invalidate":
            return { ...r, isInvalidated: !0 };
          case "setState":
            return { ...r, ...t.state };
        }
      };
      (this.state = n(this.state)),
        we.batch(() => {
          S(this, ge).forEach((r) => {
            r.onQueryUpdate();
          }),
            S(this, it).notify({ query: this, type: "updated", action: t });
        });
    }),
    cp);
function hO(e) {
  const t = typeof e.initialData == "function" ? e.initialData() : e.initialData,
    n = typeof t < "u",
    r = n
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var kt,
  fp,
  mO =
    ((fp = class extends so {
      constructor(t = {}) {
        super();
        L(this, kt, void 0);
        (this.config = t), I(this, kt, new Map());
      }
      build(t, n, r) {
        const i = n.queryKey,
          o = n.queryHash ?? Tc(i, n);
        let u = this.get(o);
        return (
          u ||
            ((u = new pO({
              cache: this,
              queryKey: i,
              queryHash: o,
              options: t.defaultQueryOptions(n),
              state: r,
              defaultOptions: t.getQueryDefaults(i),
            })),
            this.add(u)),
          u
        );
      }
      add(t) {
        S(this, kt).has(t.queryHash) ||
          (S(this, kt).set(t.queryHash, t), this.notify({ type: "added", query: t }));
      }
      remove(t) {
        const n = S(this, kt).get(t.queryHash);
        n &&
          (t.destroy(),
          n === t && S(this, kt).delete(t.queryHash),
          this.notify({ type: "removed", query: t }));
      }
      clear() {
        we.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      get(t) {
        return S(this, kt).get(t);
      }
      getAll() {
        return [...S(this, kt).values()];
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => wd(n, r));
      }
      findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter((r) => wd(t, r)) : n;
      }
      notify(t) {
        we.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      onFocus() {
        we.batch(() => {
          this.getAll().forEach((t) => {
            t.onFocus();
          });
        });
      }
      onOnline() {
        we.batch(() => {
          this.getAll().forEach((t) => {
            t.onOnline();
          });
        });
      }
    }),
    (kt = new WeakMap()),
    fp),
  bt,
  Wi,
  Ke,
  Mr,
  xt,
  Jt,
  dp,
  vO =
    ((dp = class extends Pv {
      constructor(t) {
        super();
        L(this, xt);
        L(this, bt, void 0);
        L(this, Wi, void 0);
        L(this, Ke, void 0);
        L(this, Mr, void 0);
        (this.mutationId = t.mutationId),
          I(this, Wi, t.defaultOptions),
          I(this, Ke, t.mutationCache),
          I(this, bt, []),
          (this.state = t.state || gO()),
          this.setOptions(t.options),
          this.scheduleGc();
      }
      setOptions(t) {
        (this.options = { ...S(this, Wi), ...t }), this.updateGcTime(this.options.gcTime);
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(t) {
        S(this, bt).includes(t) ||
          (S(this, bt).push(t),
          this.clearGcTimeout(),
          S(this, Ke).notify({ type: "observerAdded", mutation: this, observer: t }));
      }
      removeObserver(t) {
        I(
          this,
          bt,
          S(this, bt).filter((n) => n !== t)
        ),
          this.scheduleGc(),
          S(this, Ke).notify({ type: "observerRemoved", mutation: this, observer: t });
      }
      optionalRemove() {
        S(this, bt).length ||
          (this.state.status === "pending" ? this.scheduleGc() : S(this, Ke).remove(this));
      }
      continue() {
        var t;
        return (
          ((t = S(this, Mr)) == null ? void 0 : t.continue()) ?? this.execute(this.state.variables)
        );
      }
      async execute(t) {
        var i, o, u, a, l, s, c, p, h, v, y, g, O, f, d, m, C, P, b, E;
        const n = () => (
            I(
              this,
              Mr,
              Ev({
                fn: () =>
                  this.options.mutationFn
                    ? this.options.mutationFn(t)
                    : Promise.reject(new Error("No mutationFn found")),
                onFail: (k, D) => {
                  j(this, xt, Jt).call(this, { type: "failed", failureCount: k, error: D });
                },
                onPause: () => {
                  j(this, xt, Jt).call(this, { type: "pause" });
                },
                onContinue: () => {
                  j(this, xt, Jt).call(this, { type: "continue" });
                },
                retry: this.options.retry ?? 0,
                retryDelay: this.options.retryDelay,
                networkMode: this.options.networkMode,
              })
            ),
            S(this, Mr).promise
          ),
          r = this.state.status === "pending";
        try {
          if (!r) {
            j(this, xt, Jt).call(this, { type: "pending", variables: t }),
              await ((o = (i = S(this, Ke).config).onMutate) == null ? void 0 : o.call(i, t, this));
            const D = await ((a = (u = this.options).onMutate) == null ? void 0 : a.call(u, t));
            D !== this.state.context &&
              j(this, xt, Jt).call(this, { type: "pending", context: D, variables: t });
          }
          const k = await n();
          return (
            await ((s = (l = S(this, Ke).config).onSuccess) == null
              ? void 0
              : s.call(l, k, t, this.state.context, this)),
            await ((p = (c = this.options).onSuccess) == null
              ? void 0
              : p.call(c, k, t, this.state.context)),
            await ((v = (h = S(this, Ke).config).onSettled) == null
              ? void 0
              : v.call(h, k, null, this.state.variables, this.state.context, this)),
            await ((g = (y = this.options).onSettled) == null
              ? void 0
              : g.call(y, k, null, t, this.state.context)),
            j(this, xt, Jt).call(this, { type: "success", data: k }),
            k
          );
        } catch (k) {
          try {
            throw (
              (await ((f = (O = S(this, Ke).config).onError) == null
                ? void 0
                : f.call(O, k, t, this.state.context, this)),
              await ((m = (d = this.options).onError) == null
                ? void 0
                : m.call(d, k, t, this.state.context)),
              await ((P = (C = S(this, Ke).config).onSettled) == null
                ? void 0
                : P.call(C, void 0, k, this.state.variables, this.state.context, this)),
              await ((E = (b = this.options).onSettled) == null
                ? void 0
                : E.call(b, void 0, k, t, this.state.context)),
              k)
            );
          } finally {
            j(this, xt, Jt).call(this, { type: "error", error: k });
          }
        }
      }
    }),
    (bt = new WeakMap()),
    (Wi = new WeakMap()),
    (Ke = new WeakMap()),
    (Mr = new WeakMap()),
    (xt = new WeakSet()),
    (Jt = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return { ...r, failureCount: t.failureCount, failureReason: t.error };
          case "pause":
            return { ...r, isPaused: !0 };
          case "continue":
            return { ...r, isPaused: !1 };
          case "pending":
            return {
              ...r,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: !da(this.options.networkMode),
              status: "pending",
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...r,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...r,
              data: void 0,
              error: t.error,
              failureCount: r.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      (this.state = n(this.state)),
        we.batch(() => {
          S(this, bt).forEach((r) => {
            r.onMutationUpdate(t);
          }),
            S(this, Ke).notify({ mutation: this, type: "updated", action: t });
        });
    }),
    dp);
function gO() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var ut,
  Ki,
  An,
  pp,
  yO =
    ((pp = class extends so {
      constructor(t = {}) {
        super();
        L(this, ut, void 0);
        L(this, Ki, void 0);
        L(this, An, void 0);
        (this.config = t), I(this, ut, []), I(this, Ki, 0);
      }
      build(t, n, r) {
        const i = new vO({
          mutationCache: this,
          mutationId: ++fo(this, Ki)._,
          options: t.defaultMutationOptions(n),
          state: r,
        });
        return this.add(i), i;
      }
      add(t) {
        S(this, ut).push(t), this.notify({ type: "added", mutation: t });
      }
      remove(t) {
        I(
          this,
          ut,
          S(this, ut).filter((n) => n !== t)
        ),
          this.notify({ type: "removed", mutation: t });
      }
      clear() {
        we.batch(() => {
          S(this, ut).forEach((t) => {
            this.remove(t);
          });
        });
      }
      getAll() {
        return S(this, ut);
      }
      find(t) {
        const n = { exact: !0, ...t };
        return S(this, ut).find((r) => Sd(n, r));
      }
      findAll(t = {}) {
        return S(this, ut).filter((n) => Sd(t, n));
      }
      notify(t) {
        we.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      resumePausedMutations() {
        return (
          I(
            this,
            An,
            (S(this, An) ?? Promise.resolve())
              .then(() => {
                const t = S(this, ut).filter((n) => n.state.isPaused);
                return we.batch(() =>
                  t.reduce((n, r) => n.then(() => r.continue().catch(at)), Promise.resolve())
                );
              })
              .then(() => {
                I(this, An, void 0);
              })
          ),
          S(this, An)
        );
      }
    }),
    (ut = new WeakMap()),
    (Ki = new WeakMap()),
    (An = new WeakMap()),
    pp);
function wO(e) {
  return {
    onFetch: (t, n) => {
      const r = async () => {
        var y, g, O, f, d;
        const i = t.options,
          o =
            (O =
              (g = (y = t.fetchOptions) == null ? void 0 : y.meta) == null
                ? void 0
                : g.fetchMore) == null
              ? void 0
              : O.direction,
          u = ((f = t.state.data) == null ? void 0 : f.pages) || [],
          a = ((d = t.state.data) == null ? void 0 : d.pageParams) || [],
          l = { pages: [], pageParams: [] };
        let s = !1;
        const c = (m) => {
            Object.defineProperty(m, "signal", {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (s = !0)
                  : t.signal.addEventListener("abort", () => {
                      s = !0;
                    }),
                t.signal
              ),
            });
          },
          p =
            t.options.queryFn ||
            (() => Promise.reject(new Error(`Missing queryFn: '${t.options.queryHash}'`))),
          h = async (m, C, P) => {
            if (s) return Promise.reject();
            if (C == null && m.pages.length) return Promise.resolve(m);
            const b = {
              queryKey: t.queryKey,
              pageParam: C,
              direction: P ? "backward" : "forward",
              meta: t.options.meta,
            };
            c(b);
            const E = await p(b),
              { maxPages: k } = t.options,
              D = P ? lO : aO;
            return { pages: D(m.pages, E, k), pageParams: D(m.pageParams, C, k) };
          };
        let v;
        if (o && u.length) {
          const m = o === "backward",
            C = m ? SO : Ed,
            P = { pages: u, pageParams: a },
            b = C(i, P);
          v = await h(P, b, m);
        } else {
          v = await h(l, a[0] ?? i.initialPageParam);
          const m = e ?? u.length;
          for (let C = 1; C < m; C++) {
            const P = Ed(i, v);
            v = await h(v, P);
          }
        }
        return v;
      };
      t.options.persister
        ? (t.fetchFn = () => {
            var i, o;
            return (o = (i = t.options).persister) == null
              ? void 0
              : o.call(i, r, { queryKey: t.queryKey, meta: t.options.meta, signal: t.signal }, n);
          })
        : (t.fetchFn = r);
    },
  };
}
function Ed(e, { pages: t, pageParams: n }) {
  const r = t.length - 1;
  return e.getNextPageParam(t[r], t, n[r], n);
}
function SO(e, { pages: t, pageParams: n }) {
  var r;
  return (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n);
}
var pe,
  ln,
  sn,
  Tr,
  Ir,
  cn,
  Rr,
  Lr,
  hp,
  u2 =
    ((hp = class {
      constructor(e = {}) {
        L(this, pe, void 0);
        L(this, ln, void 0);
        L(this, sn, void 0);
        L(this, Tr, void 0);
        L(this, Ir, void 0);
        L(this, cn, void 0);
        L(this, Rr, void 0);
        L(this, Lr, void 0);
        I(this, pe, e.queryCache || new mO()),
          I(this, ln, e.mutationCache || new yO()),
          I(this, sn, e.defaultOptions || {}),
          I(this, Tr, new Map()),
          I(this, Ir, new Map()),
          I(this, cn, 0);
      }
      mount() {
        fo(this, cn)._++,
          S(this, cn) === 1 &&
            (I(
              this,
              Rr,
              Ru.subscribe(() => {
                Ru.isFocused() && (this.resumePausedMutations(), S(this, pe).onFocus());
              })
            ),
            I(
              this,
              Lr,
              Lu.subscribe(() => {
                Lu.isOnline() && (this.resumePausedMutations(), S(this, pe).onOnline());
              })
            ));
      }
      unmount() {
        var e, t;
        fo(this, cn)._--,
          S(this, cn) === 0 &&
            ((e = S(this, Rr)) == null || e.call(this),
            I(this, Rr, void 0),
            (t = S(this, Lr)) == null || t.call(this),
            I(this, Lr, void 0));
      }
      isFetching(e) {
        return S(this, pe).findAll({ ...e, fetchStatus: "fetching" }).length;
      }
      isMutating(e) {
        return S(this, ln).findAll({ ...e, status: "pending" }).length;
      }
      getQueryData(e) {
        var t;
        return (t = S(this, pe).find({ queryKey: e })) == null ? void 0 : t.state.data;
      }
      ensureQueryData(e) {
        const t = this.getQueryData(e.queryKey);
        return t !== void 0 ? Promise.resolve(t) : this.fetchQuery(e);
      }
      getQueriesData(e) {
        return this.getQueryCache()
          .findAll(e)
          .map(({ queryKey: t, state: n }) => {
            const r = n.data;
            return [t, r];
          });
      }
      setQueryData(e, t, n) {
        const r = S(this, pe).find({ queryKey: e }),
          i = r == null ? void 0 : r.state.data,
          o = oO(t, i);
        if (typeof o > "u") return;
        const u = this.defaultQueryOptions({ queryKey: e });
        return S(this, pe)
          .build(this, u)
          .setData(o, { ...n, manual: !0 });
      }
      setQueriesData(e, t, n) {
        return we.batch(() =>
          this.getQueryCache()
            .findAll(e)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, t, n)])
        );
      }
      getQueryState(e) {
        var t;
        return (t = S(this, pe).find({ queryKey: e })) == null ? void 0 : t.state;
      }
      removeQueries(e) {
        const t = S(this, pe);
        we.batch(() => {
          t.findAll(e).forEach((n) => {
            t.remove(n);
          });
        });
      }
      resetQueries(e, t) {
        const n = S(this, pe),
          r = { type: "active", ...e };
        return we.batch(
          () => (
            n.findAll(e).forEach((i) => {
              i.reset();
            }),
            this.refetchQueries(r, t)
          )
        );
      }
      cancelQueries(e = {}, t = {}) {
        const n = { revert: !0, ...t },
          r = we.batch(() =>
            S(this, pe)
              .findAll(e)
              .map((i) => i.cancel(n))
          );
        return Promise.all(r).then(at).catch(at);
      }
      invalidateQueries(e = {}, t = {}) {
        return we.batch(() => {
          if (
            (S(this, pe)
              .findAll(e)
              .forEach((r) => {
                r.invalidate();
              }),
            e.refetchType === "none")
          )
            return Promise.resolve();
          const n = { ...e, type: e.refetchType ?? e.type ?? "active" };
          return this.refetchQueries(n, t);
        });
      }
      refetchQueries(e = {}, t) {
        const n = { ...t, cancelRefetch: (t == null ? void 0 : t.cancelRefetch) ?? !0 },
          r = we.batch(() =>
            S(this, pe)
              .findAll(e)
              .filter((i) => !i.isDisabled())
              .map((i) => {
                let o = i.fetch(void 0, n);
                return (
                  n.throwOnError || (o = o.catch(at)),
                  i.state.fetchStatus === "paused" ? Promise.resolve() : o
                );
              })
          );
        return Promise.all(r).then(at);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        typeof t.retry > "u" && (t.retry = !1);
        const n = S(this, pe).build(this, t);
        return n.isStaleByTime(t.staleTime) ? n.fetch(t) : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(at).catch(at);
      }
      fetchInfiniteQuery(e) {
        return (e.behavior = wO(e.pages)), this.fetchQuery(e);
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(at).catch(at);
      }
      resumePausedMutations() {
        return S(this, ln).resumePausedMutations();
      }
      getQueryCache() {
        return S(this, pe);
      }
      getMutationCache() {
        return S(this, ln);
      }
      getDefaultOptions() {
        return S(this, sn);
      }
      setDefaultOptions(e) {
        I(this, sn, e);
      }
      setQueryDefaults(e, t) {
        S(this, Tr).set(ji(e), { queryKey: e, defaultOptions: t });
      }
      getQueryDefaults(e) {
        const t = [...S(this, Tr).values()];
        let n = {};
        return (
          t.forEach((r) => {
            Ui(e, r.queryKey) && (n = { ...n, ...r.defaultOptions });
          }),
          n
        );
      }
      setMutationDefaults(e, t) {
        S(this, Ir).set(ji(e), { mutationKey: e, defaultOptions: t });
      }
      getMutationDefaults(e) {
        const t = [...S(this, Ir).values()];
        let n = {};
        return (
          t.forEach((r) => {
            Ui(e, r.mutationKey) && (n = { ...n, ...r.defaultOptions });
          }),
          n
        );
      }
      defaultQueryOptions(e) {
        if (e != null && e._defaulted) return e;
        const t = {
          ...S(this, sn).queries,
          ...((e == null ? void 0 : e.queryKey) && this.getQueryDefaults(e.queryKey)),
          ...e,
          _defaulted: !0,
        };
        return (
          t.queryHash || (t.queryHash = Tc(t.queryKey, t)),
          typeof t.refetchOnReconnect > "u" && (t.refetchOnReconnect = t.networkMode !== "always"),
          typeof t.throwOnError > "u" && (t.throwOnError = !!t.suspense),
          typeof t.networkMode > "u" && t.persister && (t.networkMode = "offlineFirst"),
          t
        );
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ...S(this, sn).mutations,
              ...((e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            };
      }
      clear() {
        S(this, pe).clear(), S(this, ln).clear();
      }
    }),
    (pe = new WeakMap()),
    (ln = new WeakMap()),
    (sn = new WeakMap()),
    (Tr = new WeakMap()),
    (Ir = new WeakMap()),
    (cn = new WeakMap()),
    (Rr = new WeakMap()),
    (Lr = new WeakMap()),
    hp),
  Ve,
  Z,
  Gi,
  De,
  Nn,
  Dr,
  Mt,
  qi,
  Fr,
  _r,
  $n,
  Vn,
  fn,
  Ar,
  zn,
  fi,
  Yi,
  es,
  Xi,
  ts,
  Zi,
  ns,
  Ji,
  rs,
  eo,
  is,
  to,
  os,
  no,
  us,
  Au,
  kv,
  mp,
  OO =
    ((mp = class extends so {
      constructor(t, n) {
        super();
        L(this, zn);
        L(this, Yi);
        L(this, Xi);
        L(this, Zi);
        L(this, Ji);
        L(this, eo);
        L(this, to);
        L(this, no);
        L(this, Au);
        L(this, Ve, void 0);
        L(this, Z, void 0);
        L(this, Gi, void 0);
        L(this, De, void 0);
        L(this, Nn, void 0);
        L(this, Dr, void 0);
        L(this, Mt, void 0);
        L(this, qi, void 0);
        L(this, Fr, void 0);
        L(this, _r, void 0);
        L(this, $n, void 0);
        L(this, Vn, void 0);
        L(this, fn, void 0);
        L(this, Ar, new Set());
        (this.options = n),
          I(this, Ve, t),
          I(this, Mt, null),
          this.bindMethods(),
          this.setOptions(n);
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (S(this, Z).addObserver(this),
          Pd(S(this, Z), this.options) ? j(this, zn, fi).call(this) : this.updateResult(),
          j(this, Ji, rs).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return as(S(this, Z), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return as(S(this, Z), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        (this.listeners = new Set()),
          j(this, eo, is).call(this),
          j(this, to, os).call(this),
          S(this, Z).removeObserver(this);
      }
      setOptions(t, n) {
        const r = this.options,
          i = S(this, Z);
        if (
          ((this.options = S(this, Ve).defaultQueryOptions(t)),
          Xl(r, this.options) ||
            S(this, Ve)
              .getQueryCache()
              .notify({ type: "observerOptionsUpdated", query: S(this, Z), observer: this }),
          typeof this.options.enabled < "u" && typeof this.options.enabled != "boolean")
        )
          throw new Error("Expected enabled to be a boolean");
        this.options.queryKey || (this.options.queryKey = r.queryKey), j(this, no, us).call(this);
        const o = this.hasListeners();
        o && kd(S(this, Z), i, this.options, r) && j(this, zn, fi).call(this),
          this.updateResult(n),
          o &&
            (S(this, Z) !== i ||
              this.options.enabled !== r.enabled ||
              this.options.staleTime !== r.staleTime) &&
            j(this, Yi, es).call(this);
        const u = j(this, Xi, ts).call(this);
        o &&
          (S(this, Z) !== i || this.options.enabled !== r.enabled || u !== S(this, fn)) &&
          j(this, Zi, ns).call(this, u);
      }
      getOptimisticResult(t) {
        const n = S(this, Ve).getQueryCache().build(S(this, Ve), t),
          r = this.createResult(n, t);
        return (
          EO(this, r) && (I(this, De, r), I(this, Dr, this.options), I(this, Nn, S(this, Z).state)),
          r
        );
      }
      getCurrentResult() {
        return S(this, De);
      }
      trackResult(t) {
        const n = {};
        return (
          Object.keys(t).forEach((r) => {
            Object.defineProperty(n, r, {
              configurable: !1,
              enumerable: !0,
              get: () => (S(this, Ar).add(r), t[r]),
            });
          }),
          n
        );
      }
      getCurrentQuery() {
        return S(this, Z);
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        const n = S(this, Ve).defaultQueryOptions(t),
          r = S(this, Ve).getQueryCache().build(S(this, Ve), n);
        return (r.isFetchingOptimistic = !0), r.fetch().then(() => this.createResult(r, n));
      }
      fetch(t) {
        return j(this, zn, fi)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), S(this, De)));
      }
      createResult(t, n) {
        var b;
        const r = S(this, Z),
          i = this.options,
          o = S(this, De),
          u = S(this, Nn),
          a = S(this, Dr),
          s = t !== r ? t.state : S(this, Gi),
          { state: c } = t;
        let { error: p, errorUpdatedAt: h, fetchStatus: v, status: y } = c,
          g = !1,
          O;
        if (n._optimisticResults) {
          const E = this.hasListeners(),
            k = !E && Pd(t, n),
            D = E && kd(t, r, n, i);
          (k || D) &&
            ((v = da(t.options.networkMode) ? "fetching" : "paused"),
            c.dataUpdatedAt || (y = "pending")),
            n._optimisticResults === "isRestoring" && (v = "idle");
        }
        if (n.select && typeof c.data < "u")
          if (o && c.data === (u == null ? void 0 : u.data) && n.select === S(this, qi))
            O = S(this, Fr);
          else
            try {
              I(this, qi, n.select),
                (O = n.select(c.data)),
                (O = Jl(o == null ? void 0 : o.data, O, n)),
                I(this, Fr, O),
                I(this, Mt, null);
            } catch (E) {
              I(this, Mt, E);
            }
        else O = c.data;
        if (typeof n.placeholderData < "u" && typeof O > "u" && y === "pending") {
          let E;
          if (
            o != null &&
            o.isPlaceholderData &&
            n.placeholderData === (a == null ? void 0 : a.placeholderData)
          )
            E = o.data;
          else if (
            ((E =
              typeof n.placeholderData == "function"
                ? n.placeholderData((b = S(this, _r)) == null ? void 0 : b.state.data, S(this, _r))
                : n.placeholderData),
            n.select && typeof E < "u")
          )
            try {
              (E = n.select(E)), I(this, Mt, null);
            } catch (k) {
              I(this, Mt, k);
            }
          typeof E < "u" &&
            ((y = "success"), (O = Jl(o == null ? void 0 : o.data, E, n)), (g = !0));
        }
        S(this, Mt) && ((p = S(this, Mt)), (O = S(this, Fr)), (h = Date.now()), (y = "error"));
        const f = v === "fetching",
          d = y === "pending",
          m = y === "error",
          C = d && f;
        return {
          status: y,
          fetchStatus: v,
          isPending: d,
          isSuccess: y === "success",
          isError: m,
          isInitialLoading: C,
          isLoading: C,
          data: O,
          dataUpdatedAt: c.dataUpdatedAt,
          error: p,
          errorUpdatedAt: h,
          failureCount: c.fetchFailureCount,
          failureReason: c.fetchFailureReason,
          errorUpdateCount: c.errorUpdateCount,
          isFetched: c.dataUpdateCount > 0 || c.errorUpdateCount > 0,
          isFetchedAfterMount:
            c.dataUpdateCount > s.dataUpdateCount || c.errorUpdateCount > s.errorUpdateCount,
          isFetching: f,
          isRefetching: f && !d,
          isLoadingError: m && c.dataUpdatedAt === 0,
          isPaused: v === "paused",
          isPlaceholderData: g,
          isRefetchError: m && c.dataUpdatedAt !== 0,
          isStale: Ic(t, n),
          refetch: this.refetch,
        };
      }
      updateResult(t) {
        const n = S(this, De),
          r = this.createResult(S(this, Z), this.options);
        if (
          (I(this, Nn, S(this, Z).state),
          I(this, Dr, this.options),
          S(this, Nn).data !== void 0 && I(this, _r, S(this, Z)),
          Xl(r, n))
        )
          return;
        I(this, De, r);
        const i = {},
          o = () => {
            if (!n) return !0;
            const { notifyOnChangeProps: u } = this.options,
              a = typeof u == "function" ? u() : u;
            if (a === "all" || (!a && !S(this, Ar).size)) return !0;
            const l = new Set(a ?? S(this, Ar));
            return (
              this.options.throwOnError && l.add("error"),
              Object.keys(S(this, De)).some((s) => {
                const c = s;
                return S(this, De)[c] !== n[c] && l.has(c);
              })
            );
          };
        (t == null ? void 0 : t.listeners) !== !1 && o() && (i.listeners = !0),
          j(this, Au, kv).call(this, { ...i, ...t });
      }
      onQueryUpdate() {
        this.updateResult(), this.hasListeners() && j(this, Ji, rs).call(this);
      }
    }),
    (Ve = new WeakMap()),
    (Z = new WeakMap()),
    (Gi = new WeakMap()),
    (De = new WeakMap()),
    (Nn = new WeakMap()),
    (Dr = new WeakMap()),
    (Mt = new WeakMap()),
    (qi = new WeakMap()),
    (Fr = new WeakMap()),
    (_r = new WeakMap()),
    ($n = new WeakMap()),
    (Vn = new WeakMap()),
    (fn = new WeakMap()),
    (Ar = new WeakMap()),
    (zn = new WeakSet()),
    (fi = function (t) {
      j(this, no, us).call(this);
      let n = S(this, Z).fetch(this.options, t);
      return (t != null && t.throwOnError) || (n = n.catch(at)), n;
    }),
    (Yi = new WeakSet()),
    (es = function () {
      if ((j(this, eo, is).call(this), Qr || S(this, De).isStale || !Yl(this.options.staleTime)))
        return;
      const n = Sv(S(this, De).dataUpdatedAt, this.options.staleTime) + 1;
      I(
        this,
        $n,
        setTimeout(() => {
          S(this, De).isStale || this.updateResult();
        }, n)
      );
    }),
    (Xi = new WeakSet()),
    (ts = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(S(this, Z))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (Zi = new WeakSet()),
    (ns = function (t) {
      j(this, to, os).call(this),
        I(this, fn, t),
        !(Qr || this.options.enabled === !1 || !Yl(S(this, fn)) || S(this, fn) === 0) &&
          I(
            this,
            Vn,
            setInterval(() => {
              (this.options.refetchIntervalInBackground || Ru.isFocused()) &&
                j(this, zn, fi).call(this);
            }, S(this, fn))
          );
    }),
    (Ji = new WeakSet()),
    (rs = function () {
      j(this, Yi, es).call(this), j(this, Zi, ns).call(this, j(this, Xi, ts).call(this));
    }),
    (eo = new WeakSet()),
    (is = function () {
      S(this, $n) && (clearTimeout(S(this, $n)), I(this, $n, void 0));
    }),
    (to = new WeakSet()),
    (os = function () {
      S(this, Vn) && (clearInterval(S(this, Vn)), I(this, Vn, void 0));
    }),
    (no = new WeakSet()),
    (us = function () {
      const t = S(this, Ve).getQueryCache().build(S(this, Ve), this.options);
      if (t === S(this, Z)) return;
      const n = S(this, Z);
      I(this, Z, t),
        I(this, Gi, t.state),
        this.hasListeners() && (n == null || n.removeObserver(this), t.addObserver(this));
    }),
    (Au = new WeakSet()),
    (kv = function (t) {
      we.batch(() => {
        t.listeners &&
          this.listeners.forEach((n) => {
            n(S(this, De));
          }),
          S(this, Ve)
            .getQueryCache()
            .notify({ query: S(this, Z), type: "observerResultsUpdated" });
      });
    }),
    mp);
function CO(e, t) {
  return (
    t.enabled !== !1 &&
    !e.state.dataUpdatedAt &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function Pd(e, t) {
  return CO(e, t) || (e.state.dataUpdatedAt > 0 && as(e, t, t.refetchOnMount));
}
function as(e, t, n) {
  if (t.enabled !== !1) {
    const r = typeof n == "function" ? n(e) : n;
    return r === "always" || (r !== !1 && Ic(e, t));
  }
  return !1;
}
function kd(e, t, n, r) {
  return (
    n.enabled !== !1 &&
    (e !== t || r.enabled === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    Ic(e, n)
  );
}
function Ic(e, t) {
  return e.isStaleByTime(t.staleTime);
}
function EO(e, t) {
  return !Xl(e.getCurrentResult(), t);
}
var bv = x.createContext(void 0),
  xv = (e) => {
    const t = x.useContext(bv);
    if (e) return e;
    if (!t) throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  a2 = ({ client: e, children: t }) => (
    x.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e]
    ),
    x.createElement(bv.Provider, { value: e }, t)
  ),
  Mv = x.createContext(!1),
  PO = () => x.useContext(Mv);
Mv.Provider;
function kO() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var bO = x.createContext(kO()),
  xO = () => x.useContext(bO);
function MO(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
var TO = (e, t) => {
    (e.suspense || e.throwOnError) && (t.isReset() || (e.retryOnMount = !1));
  },
  IO = (e) => {
    x.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  RO = ({ result: e, errorResetBoundary: t, throwOnError: n, query: r }) =>
    e.isError && !t.isReset() && !e.isFetching && r && MO(n, [e.error, r]),
  LO = (e) => {
    e.suspense && typeof e.staleTime != "number" && (e.staleTime = 1e3);
  },
  DO = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending,
  FO = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function _O(e, t, n) {
  const r = xv(n),
    i = PO(),
    o = xO(),
    u = r.defaultQueryOptions(e);
  (u._optimisticResults = i ? "isRestoring" : "optimistic"), LO(u), TO(u, o), IO(o);
  const [a] = x.useState(() => new t(r, u)),
    l = a.getOptimisticResult(u);
  if (
    (x.useSyncExternalStore(
      x.useCallback(
        (s) => {
          const c = i ? () => {} : a.subscribe(we.batchCalls(s));
          return a.updateResult(), c;
        },
        [a, i]
      ),
      () => a.getCurrentResult(),
      () => a.getCurrentResult()
    ),
    x.useEffect(() => {
      a.setOptions(u, { listeners: !1 });
    }, [u, a]),
    DO(u, l))
  )
    throw FO(u, a, o);
  if (
    RO({
      result: l,
      errorResetBoundary: o,
      throwOnError: u.throwOnError,
      query: r.getQueryCache().get(u.queryHash),
    })
  )
    throw l.error;
  return u.notifyOnChangeProps ? l : a.trackResult(l);
}
function l2(e, t) {
  return _O(e, OO, t);
}
function s2(e, t) {
  const n = xv(t),
    r = n.getQueryCache();
  return x.useSyncExternalStore(
    x.useCallback((i) => r.subscribe(we.batchCalls(i)), [r]),
    () => n.isFetching(e),
    () => n.isFetching(e)
  );
}
var Tv = "en",
  Rc = {},
  ls = {};
function Iv() {
  return Tv;
}
function AO(e) {
  Tv = e;
}
function NO(e) {
  return Rc[e];
}
function $O(e) {
  if (!e) throw new Error("No locale data passed");
  (Rc[e.locale] = e), (ls[e.locale.toLowerCase()] = e.locale);
}
function bd(e) {
  if (Rc[e]) return e;
  if (ls[e.toLowerCase()]) return ls[e.toLowerCase()];
}
function Rv(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = t.localeMatcher || "lookup";
  switch (n) {
    case "lookup":
      return xd(e);
    case "best fit":
      return xd(e);
    default:
      throw new RangeError('Invalid "localeMatcher" option: '.concat(n));
  }
}
function xd(e) {
  var t = bd(e);
  if (t) return t;
  for (var n = e.split("-"); e.length > 1; ) {
    n.pop(), (e = n.join("-"));
    var r = bd(e);
    if (r) return r;
  }
}
var w = {
  af: function (t) {
    return t == 1 ? "one" : "other";
  },
  am: function (t) {
    return t >= 0 && t <= 1 ? "one" : "other";
  },
  ar: function (t) {
    var n = String(t).split("."),
      r = Number(n[0]) == t,
      i = r && n[0].slice(-2);
    return t == 0
      ? "zero"
      : t == 1
      ? "one"
      : t == 2
      ? "two"
      : i >= 3 && i <= 10
      ? "few"
      : i >= 11 && i <= 99
      ? "many"
      : "other";
  },
  ast: function (t) {
    var n = String(t).split("."),
      r = !n[1];
    return t == 1 && r ? "one" : "other";
  },
  be: function (t) {
    var n = String(t).split("."),
      r = Number(n[0]) == t,
      i = r && n[0].slice(-1),
      o = r && n[0].slice(-2);
    return i == 1 && o != 11
      ? "one"
      : i >= 2 && i <= 4 && (o < 12 || o > 14)
      ? "few"
      : (r && i == 0) || (i >= 5 && i <= 9) || (o >= 11 && o <= 14)
      ? "many"
      : "other";
  },
  br: function (t) {
    var n = String(t).split("."),
      r = Number(n[0]) == t,
      i = r && n[0].slice(-1),
      o = r && n[0].slice(-2),
      u = r && n[0].slice(-6);
    return i == 1 && o != 11 && o != 71 && o != 91
      ? "one"
      : i == 2 && o != 12 && o != 72 && o != 92
      ? "two"
      : (i == 3 || i == 4 || i == 9) &&
        (o < 10 || o > 19) &&
        (o < 70 || o > 79) &&
        (o < 90 || o > 99)
      ? "few"
      : t != 0 && r && u == 0
      ? "many"
      : "other";
  },
  bs: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = n[1] || "",
      o = !n[1],
      u = r.slice(-1),
      a = r.slice(-2),
      l = i.slice(-1),
      s = i.slice(-2);
    return (o && u == 1 && a != 11) || (l == 1 && s != 11)
      ? "one"
      : (o && u >= 2 && u <= 4 && (a < 12 || a > 14)) || (l >= 2 && l <= 4 && (s < 12 || s > 14))
      ? "few"
      : "other";
  },
  ca: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = !n[1],
      o = r.slice(-6);
    return t == 1 && i ? "one" : r != 0 && o == 0 && i ? "many" : "other";
  },
  ceb: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = n[1] || "",
      o = !n[1],
      u = r.slice(-1),
      a = i.slice(-1);
    return (o && (r == 1 || r == 2 || r == 3)) ||
      (o && u != 4 && u != 6 && u != 9) ||
      (!o && a != 4 && a != 6 && a != 9)
      ? "one"
      : "other";
  },
  cs: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = !n[1];
    return t == 1 && i ? "one" : r >= 2 && r <= 4 && i ? "few" : i ? "other" : "many";
  },
  cy: function (t) {
    return t == 0
      ? "zero"
      : t == 1
      ? "one"
      : t == 2
      ? "two"
      : t == 3
      ? "few"
      : t == 6
      ? "many"
      : "other";
  },
  da: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = Number(n[0]) == t;
    return t == 1 || (!i && (r == 0 || r == 1)) ? "one" : "other";
  },
  dsb: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = n[1] || "",
      o = !n[1],
      u = r.slice(-2),
      a = i.slice(-2);
    return (o && u == 1) || a == 1
      ? "one"
      : (o && u == 2) || a == 2
      ? "two"
      : (o && (u == 3 || u == 4)) || a == 3 || a == 4
      ? "few"
      : "other";
  },
  dz: function (t) {
    return "other";
  },
  es: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = !n[1],
      o = r.slice(-6);
    return t == 1 ? "one" : r != 0 && o == 0 && i ? "many" : "other";
  },
  ff: function (t) {
    return t >= 0 && t < 2 ? "one" : "other";
  },
  fr: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = !n[1],
      o = r.slice(-6);
    return t >= 0 && t < 2 ? "one" : r != 0 && o == 0 && i ? "many" : "other";
  },
  ga: function (t) {
    var n = String(t).split("."),
      r = Number(n[0]) == t;
    return t == 1
      ? "one"
      : t == 2
      ? "two"
      : r && t >= 3 && t <= 6
      ? "few"
      : r && t >= 7 && t <= 10
      ? "many"
      : "other";
  },
  gd: function (t) {
    var n = String(t).split("."),
      r = Number(n[0]) == t;
    return t == 1 || t == 11
      ? "one"
      : t == 2 || t == 12
      ? "two"
      : (r && t >= 3 && t <= 10) || (r && t >= 13 && t <= 19)
      ? "few"
      : "other";
  },
  he: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = !n[1];
    return (r == 1 && i) || (r == 0 && !i) ? "one" : r == 2 && i ? "two" : "other";
  },
  is: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = (n[1] || "").replace(/0+$/, ""),
      o = Number(n[0]) == t,
      u = r.slice(-1),
      a = r.slice(-2);
    return (o && u == 1 && a != 11) || (i % 10 == 1 && i % 100 != 11) ? "one" : "other";
  },
  ksh: function (t) {
    return t == 0 ? "zero" : t == 1 ? "one" : "other";
  },
  lt: function (t) {
    var n = String(t).split("."),
      r = n[1] || "",
      i = Number(n[0]) == t,
      o = i && n[0].slice(-1),
      u = i && n[0].slice(-2);
    return o == 1 && (u < 11 || u > 19)
      ? "one"
      : o >= 2 && o <= 9 && (u < 11 || u > 19)
      ? "few"
      : r != 0
      ? "many"
      : "other";
  },
  lv: function (t) {
    var n = String(t).split("."),
      r = n[1] || "",
      i = r.length,
      o = Number(n[0]) == t,
      u = o && n[0].slice(-1),
      a = o && n[0].slice(-2),
      l = r.slice(-2),
      s = r.slice(-1);
    return (o && u == 0) || (a >= 11 && a <= 19) || (i == 2 && l >= 11 && l <= 19)
      ? "zero"
      : (u == 1 && a != 11) || (i == 2 && s == 1 && l != 11) || (i != 2 && s == 1)
      ? "one"
      : "other";
  },
  mk: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = n[1] || "",
      o = !n[1],
      u = r.slice(-1),
      a = r.slice(-2),
      l = i.slice(-1),
      s = i.slice(-2);
    return (o && u == 1 && a != 11) || (l == 1 && s != 11) ? "one" : "other";
  },
  mt: function (t) {
    var n = String(t).split("."),
      r = Number(n[0]) == t,
      i = r && n[0].slice(-2);
    return t == 1
      ? "one"
      : t == 2
      ? "two"
      : t == 0 || (i >= 3 && i <= 10)
      ? "few"
      : i >= 11 && i <= 19
      ? "many"
      : "other";
  },
  pa: function (t) {
    return t == 0 || t == 1 ? "one" : "other";
  },
  pl: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = !n[1],
      o = r.slice(-1),
      u = r.slice(-2);
    return t == 1 && i
      ? "one"
      : i && o >= 2 && o <= 4 && (u < 12 || u > 14)
      ? "few"
      : (i && r != 1 && (o == 0 || o == 1)) || (i && o >= 5 && o <= 9) || (i && u >= 12 && u <= 14)
      ? "many"
      : "other";
  },
  pt: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = !n[1],
      o = r.slice(-6);
    return r == 0 || r == 1 ? "one" : r != 0 && o == 0 && i ? "many" : "other";
  },
  ro: function (t) {
    var n = String(t).split("."),
      r = !n[1],
      i = Number(n[0]) == t,
      o = i && n[0].slice(-2);
    return t == 1 && r ? "one" : !r || t == 0 || (t != 1 && o >= 1 && o <= 19) ? "few" : "other";
  },
  ru: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = !n[1],
      o = r.slice(-1),
      u = r.slice(-2);
    return i && o == 1 && u != 11
      ? "one"
      : i && o >= 2 && o <= 4 && (u < 12 || u > 14)
      ? "few"
      : (i && o == 0) || (i && o >= 5 && o <= 9) || (i && u >= 11 && u <= 14)
      ? "many"
      : "other";
  },
  se: function (t) {
    return t == 1 ? "one" : t == 2 ? "two" : "other";
  },
  si: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = n[1] || "";
    return t == 0 || t == 1 || (r == 0 && i == 1) ? "one" : "other";
  },
  sl: function (t) {
    var n = String(t).split("."),
      r = n[0],
      i = !n[1],
      o = r.slice(-2);
    return i && o == 1
      ? "one"
      : i && o == 2
      ? "two"
      : (i && (o == 3 || o == 4)) || !i
      ? "few"
      : "other";
  },
};
w.as = w.am;
w.az = w.af;
w.bg = w.af;
w.bn = w.am;
w.brx = w.af;
w.ce = w.af;
w.chr = w.af;
w.de = w.ast;
w.ee = w.af;
w.el = w.af;
w.en = w.ast;
w.et = w.ast;
w.eu = w.af;
w.fa = w.am;
w.fi = w.ast;
w.fil = w.ceb;
w.fo = w.af;
w.fur = w.af;
w.fy = w.ast;
w.gl = w.ast;
w.gu = w.am;
w.ha = w.af;
w.hi = w.am;
w.hr = w.bs;
w.hsb = w.dsb;
w.hu = w.af;
w.hy = w.ff;
w.ia = w.ast;
w.id = w.dz;
w.ig = w.dz;
w.it = w.ca;
w.ja = w.dz;
w.jgo = w.af;
w.jv = w.dz;
w.ka = w.af;
w.kea = w.dz;
w.kk = w.af;
w.kl = w.af;
w.km = w.dz;
w.kn = w.am;
w.ko = w.dz;
w.ks = w.af;
w.ku = w.af;
w.ky = w.af;
w.lb = w.af;
w.lkt = w.dz;
w.lo = w.dz;
w.ml = w.af;
w.mn = w.af;
w.mr = w.af;
w.ms = w.dz;
w.my = w.dz;
w.nb = w.af;
w.ne = w.af;
w.nl = w.ast;
w.nn = w.af;
w.no = w.af;
w.or = w.af;
w.pcm = w.am;
w.ps = w.af;
w.rm = w.af;
w.sah = w.dz;
w.sc = w.ast;
w.sd = w.af;
w.sk = w.cs;
w.so = w.af;
w.sq = w.af;
w.sr = w.bs;
w.su = w.dz;
w.sv = w.ast;
w.sw = w.ast;
w.ta = w.af;
w.te = w.af;
w.th = w.dz;
w.ti = w.pa;
w.tk = w.af;
w.to = w.dz;
w.tr = w.af;
w.ug = w.af;
w.uk = w.ru;
w.ur = w.ast;
w.uz = w.af;
w.vi = w.dz;
w.wae = w.af;
w.wo = w.dz;
w.xh = w.af;
w.yi = w.ast;
w.yo = w.dz;
w.yue = w.dz;
w.zh = w.dz;
w.zu = w.am;
const Md = w;
function Td(e) {
  return e === "pt-PT" ? e : zO(e);
}
var VO = /^([a-z0-9]+)/i;
function zO(e) {
  var t = e.match(VO);
  if (!t) throw new TypeError("Invalid locale: ".concat(e));
  return t[1];
}
function jO(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Id(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function UO(e, t, n) {
  return (
    t && Id(e.prototype, t),
    n && Id(e, n),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
var ss = (function () {
  function e(t, n) {
    jO(this, e);
    var r = e.supportedLocalesOf(t);
    if (r.length === 0) throw new RangeError("Unsupported locale: " + t);
    if (n && n.type !== "cardinal") throw new RangeError('Only "cardinal" "type" is supported');
    this.$ = Md[Td(r[0])];
  }
  return (
    UO(
      e,
      [
        {
          key: "select",
          value: function (n) {
            return this.$(n);
          },
        },
      ],
      [
        {
          key: "supportedLocalesOf",
          value: function (n) {
            return (
              typeof n == "string" && (n = [n]),
              n.filter(function (r) {
                return Md[Td(r)];
              })
            );
          },
        },
      ]
    ),
    e
  );
})();
function cs(e) {
  "@babel/helpers - typeof";
  return (
    (cs =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    cs(e)
  );
}
function Rd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ld(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Rd(Object(n), !0).forEach(function (r) {
          HO(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Rd(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function HO(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function Dd(e, t) {
  return KO(e) || WO(e, t) || QO(e, t) || BO();
}
function BO() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QO(e, t) {
  if (e) {
    if (typeof e == "string") return Fd(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set"))
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Fd(e, t);
  }
}
function Fd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function WO(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r = [],
      i = !0,
      o = !1,
      u,
      a;
    try {
      for (
        n = n.call(e);
        !(i = (u = n.next()).done) && (r.push(u.value), !(t && r.length === t));
        i = !0
      );
    } catch (l) {
      (o = !0), (a = l);
    } finally {
      try {
        !i && n.return != null && n.return();
      } finally {
        if (o) throw a;
      }
    }
    return r;
  }
}
function KO(e) {
  if (Array.isArray(e)) return e;
}
function GO(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function _d(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function qO(e, t, n) {
  return (
    t && _d(e.prototype, t),
    n && _d(e, n),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
var YO = ["second", "minute", "hour", "day", "week", "month", "quarter", "year"],
  XO = ["auto", "always"],
  ZO = ["long", "short", "narrow"],
  JO = ["lookup", "best fit"],
  Pn = (function () {
    function e() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
        n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      GO(this, e);
      var r = n.numeric,
        i = n.style,
        o = n.localeMatcher;
      if (
        ((this.numeric = "always"),
        (this.style = "long"),
        (this.localeMatcher = "lookup"),
        r !== void 0)
      ) {
        if (XO.indexOf(r) < 0) throw new RangeError('Invalid "numeric" option: '.concat(r));
        this.numeric = r;
      }
      if (i !== void 0) {
        if (ZO.indexOf(i) < 0) throw new RangeError('Invalid "style" option: '.concat(i));
        this.style = i;
      }
      if (o !== void 0) {
        if (JO.indexOf(o) < 0) throw new RangeError('Invalid "localeMatcher" option: '.concat(o));
        this.localeMatcher = o;
      }
      if (
        (typeof t == "string" && (t = [t]),
        t.push(Iv()),
        (this.locale = e.supportedLocalesOf(t, { localeMatcher: this.localeMatcher })[0]),
        !this.locale)
      )
        throw new Error("No supported locale was found");
      ss.supportedLocalesOf(this.locale).length > 0
        ? (this.pluralRules = new ss(this.locale))
        : console.warn('"'.concat(this.locale, '" locale is not supported')),
        typeof Intl < "u" && Intl.NumberFormat
          ? ((this.numberFormat = new Intl.NumberFormat(this.locale)),
            (this.numberingSystem = this.numberFormat.resolvedOptions().numberingSystem))
          : (this.numberingSystem = "latn"),
        (this.locale = Rv(this.locale, { localeMatcher: this.localeMatcher }));
    }
    return (
      qO(e, [
        {
          key: "format",
          value: function () {
            var n = Ad(arguments),
              r = Dd(n, 2),
              i = r[0],
              o = r[1];
            return this.getRule(i, o).replace("{0}", this.formatNumber(Math.abs(i)));
          },
        },
        {
          key: "formatToParts",
          value: function () {
            var n = Ad(arguments),
              r = Dd(n, 2),
              i = r[0],
              o = r[1],
              u = this.getRule(i, o),
              a = u.indexOf("{0}");
            if (a < 0) return [{ type: "literal", value: u }];
            var l = [];
            return (
              a > 0 && l.push({ type: "literal", value: u.slice(0, a) }),
              (l = l.concat(
                this.formatNumberToParts(Math.abs(i)).map(function (s) {
                  return Ld(Ld({}, s), {}, { unit: o });
                })
              )),
              a + 3 < u.length - 1 && l.push({ type: "literal", value: u.slice(a + 3) }),
              l
            );
          },
        },
        {
          key: "getRule",
          value: function (n, r) {
            var i = NO(this.locale)[this.style][r];
            if (typeof i == "string") return i;
            if (this.numeric === "auto") {
              if (n === -2 || n === -1) {
                var o = i["previous".concat(n === -1 ? "" : "-" + Math.abs(n))];
                if (o) return o;
              } else if (n === 1 || n === 2) {
                var u = i["next".concat(n === 1 ? "" : "-" + Math.abs(n))];
                if (u) return u;
              } else if (n === 0 && i.current) return i.current;
            }
            var a = i[iC(n) ? "past" : "future"];
            if (typeof a == "string") return a;
            var l = (this.pluralRules && this.pluralRules.select(Math.abs(n))) || "other";
            return a[l] || a.other;
          },
        },
        {
          key: "formatNumber",
          value: function (n) {
            return this.numberFormat ? this.numberFormat.format(n) : String(n);
          },
        },
        {
          key: "formatNumberToParts",
          value: function (n) {
            return this.numberFormat && this.numberFormat.formatToParts
              ? this.numberFormat.formatToParts(n)
              : [{ type: "integer", value: this.formatNumber(n) }];
          },
        },
        {
          key: "resolvedOptions",
          value: function () {
            return {
              locale: this.locale,
              style: this.style,
              numeric: this.numeric,
              numberingSystem: this.numberingSystem,
            };
          },
        },
      ]),
      e
    );
  })();
Pn.supportedLocalesOf = function (e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (typeof e == "string") e = [e];
  else if (!Array.isArray(e)) throw new TypeError('Invalid "locales" argument');
  return e.filter(function (n) {
    return Rv(n, t);
  });
};
Pn.addLocale = $O;
Pn.setDefaultLocale = AO;
Pn.getDefaultLocale = Iv;
Pn.PluralRules = ss;
var qa = 'Invalid "unit" argument';
function eC(e) {
  if (cs(e) === "symbol") throw new TypeError(qa);
  if (typeof e != "string") throw new RangeError("".concat(qa, ": ").concat(e));
  if ((e[e.length - 1] === "s" && (e = e.slice(0, e.length - 1)), YO.indexOf(e) < 0))
    throw new RangeError("".concat(qa, ": ").concat(e));
  return e;
}
var tC = 'Invalid "number" argument';
function nC(e) {
  if (((e = Number(e)), Number.isFinite && !Number.isFinite(e)))
    throw new RangeError("".concat(tC, ": ").concat(e));
  return e;
}
function rC(e) {
  return 1 / e === -1 / 0;
}
function iC(e) {
  return e < 0 || (e === 0 && rC(e));
}
function Ad(e) {
  if (e.length < 2) throw new TypeError('"unit" argument is required');
  return [nC(e[0]), eC(e[1])];
}
function Du(e) {
  "@babel/helpers - typeof";
  return (
    (Du =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Du(e)
  );
}
function oC(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Nd(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function uC(e, t, n) {
  return (
    t && Nd(e.prototype, t),
    n && Nd(e, n),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
var $d = (function () {
  function e() {
    oC(this, e), (this.cache = {});
  }
  return (
    uC(e, [
      {
        key: "get",
        value: function () {
          for (var n = this.cache, r = arguments.length, i = new Array(r), o = 0; o < r; o++)
            i[o] = arguments[o];
          for (var u = 0, a = i; u < a.length; u++) {
            var l = a[u];
            if (Du(n) !== "object") return;
            n = n[l];
          }
          return n;
        },
      },
      {
        key: "put",
        value: function () {
          for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
          for (var o = r.pop(), u = r.pop(), a = this.cache, l = 0, s = r; l < s.length; l++) {
            var c = s[l];
            Du(a[c]) !== "object" && (a[c] = {}), (a = a[c]);
          }
          return (a[u] = o);
        },
      },
    ]),
    e
  );
})();
function fs(e) {
  "@babel/helpers - typeof";
  return (
    (fs =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    fs(e)
  );
}
function aC(e, t) {
  var n = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (Array.isArray(e) || (n = lC(e)) || (t && e && typeof e.length == "number")) {
    n && (e = n);
    var r = 0;
    return function () {
      return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lC(e, t) {
  if (e) {
    if (typeof e == "string") return Vd(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set"))
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Vd(e, t);
  }
}
function Vd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function sC(e, t) {
  for (var n = aC(e), r; !(r = n()).done; ) {
    var i = r.value;
    if (t(i)) return i;
    for (var o = i.split("-"); o.length > 1; ) if ((o.pop(), (i = o.join("-")), t(i))) return i;
  }
  throw new Error(
    "No locale data has been registered for any of the locales: ".concat(e.join(", "))
  );
}
function cC() {
  var e = (typeof Intl > "u" ? "undefined" : fs(Intl)) === "object";
  return e && typeof Intl.DateTimeFormat == "function";
}
function ds(e) {
  "@babel/helpers - typeof";
  return (
    (ds =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ds(e)
  );
}
function fC(e) {
  return (
    pC(e) &&
    (Array.isArray(e.steps) ||
      Array.isArray(e.gradation) ||
      Array.isArray(e.flavour) ||
      typeof e.flavour == "string" ||
      Array.isArray(e.labels) ||
      typeof e.labels == "string" ||
      Array.isArray(e.units) ||
      typeof e.custom == "function")
  );
}
var dC = {}.constructor;
function pC(e) {
  return ds(e) !== void 0 && e !== null && e.constructor === dC;
}
var zt = 60,
  Fu = 60 * zt,
  Hn = 24 * Fu,
  ps = 7 * Hn,
  hs = 30.44 * Hn,
  Lv = (146097 / 400) * Hn;
function Or(e) {
  switch (e) {
    case "second":
      return 1;
    case "minute":
      return zt;
    case "hour":
      return Fu;
    case "day":
      return Hn;
    case "week":
      return ps;
    case "month":
      return hs;
    case "year":
      return Lv;
  }
}
function Dv(e) {
  return e.factor !== void 0 ? e.factor : Or(e.unit || e.formatAs) || 1;
}
function Hi(e) {
  switch (e) {
    case "floor":
      return Math.floor;
    default:
      return Math.round;
  }
}
function Lc(e) {
  switch (e) {
    case "floor":
      return 1;
    default:
      return 0.5;
  }
}
function ms(e) {
  "@babel/helpers - typeof";
  return (
    (ms =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ms(e)
  );
}
function Fv(e, t) {
  var n = t.prevStep,
    r = t.timestamp,
    i = t.now,
    o = t.future,
    u = t.round,
    a;
  return (
    n && (n.id || n.unit) && (a = e["threshold_for_".concat(n.id || n.unit)]),
    a === void 0 &&
      e.threshold !== void 0 &&
      ((a = e.threshold), typeof a == "function" && (a = a(i, o))),
    a === void 0 && (a = e.minTime),
    ms(a) === "object" && (n && n.id && a[n.id] !== void 0 ? (a = a[n.id]) : (a = a.default)),
    typeof a == "function" &&
      (a = a(r, {
        future: o,
        getMinTimeForUnit: function (s, c) {
          return zd(s, c || (n && n.formatAs), { round: u });
        },
      })),
    a === void 0 && e.test && (e.test(r, { now: i, future: o }) ? (a = 0) : (a = 9007199254740991)),
    a === void 0 &&
      (n ? e.formatAs && n.formatAs && (a = zd(e.formatAs, n.formatAs, { round: u })) : (a = 0)),
    a === void 0 &&
      console.warn(
        "[javascript-time-ago] A step should specify `minTime`:\n" + JSON.stringify(e, null, 2)
      ),
    a
  );
}
function zd(e, t, n) {
  var r = n.round,
    i = Or(e),
    o;
  if ((t === "now" ? (o = Or(e)) : (o = Or(t)), i !== void 0 && o !== void 0))
    return i - o * (1 - Lc(r));
}
function jd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function hC(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? jd(Object(n), !0).forEach(function (r) {
          mC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : jd(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function mC(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function vC(e, t, n) {
  var r = n.now,
    i = n.future,
    o = n.round,
    u = n.units,
    a = n.getNextStep;
  e = yC(e, u);
  var l = gC(e, t, { now: r, future: i, round: o });
  if (a) {
    if (l) {
      var s = e[e.indexOf(l) - 1],
        c = e[e.indexOf(l) + 1];
      return [s, l, c];
    }
    return [void 0, void 0, e[0]];
  }
  return l;
}
function gC(e, t, n) {
  var r = n.now,
    i = n.future,
    o = n.round;
  if (e.length !== 0) {
    var u = _v(e, t, { now: r, future: i || t < 0, round: o });
    if (u !== -1) {
      var a = e[u];
      if (a.granularity) {
        var l = Hi(o)(Math.abs(t) / Dv(a) / a.granularity) * a.granularity;
        if (l === 0 && u > 0) return e[u - 1];
      }
      return a;
    }
  }
}
function _v(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0,
    i = Fv(e[r], hC({ prevStep: e[r - 1], timestamp: n.now - t * 1e3 }, n));
  return i === void 0 || Math.abs(t) < i ? r - 1 : r === e.length - 1 ? r : _v(e, t, n, r + 1);
}
function yC(e, t) {
  return e.filter(function (n) {
    var r = n.unit,
      i = n.formatAs;
    return (r = r || i), r ? t.indexOf(r) >= 0 : !0;
  });
}
function wC(e, t, n) {
  var r = n.now,
    i = n.round;
  if (Or(e)) {
    var o = Or(e) * 1e3,
      u = t > r,
      a = Math.abs(t - r),
      l = Hi(i)(a / o) * o;
    return u ? (l > 0 ? a - l + OC(i, o) : a - l + 1) : -(a - l) + SC(i, o);
  }
}
function SC(e, t) {
  return Lc(e) * t;
}
function OC(e, t) {
  return (1 - Lc(e)) * t + 1;
}
var CC = 365 * 24 * 60 * 60 * 1e3,
  Av = 1e3 * CC;
function EC(e, t, n) {
  var r = n.prevStep,
    i = n.nextStep,
    o = n.now,
    u = n.future,
    a = n.round,
    l = e.getTime ? e.getTime() : e,
    s = function (y) {
      return wC(y, l, { now: o, round: a });
    },
    c = kC(u ? t : i, l, { future: u, now: o, round: a, prevStep: u ? r : t });
  if (c !== void 0) {
    var p;
    if (
      t &&
      (t.getTimeToNextUpdate &&
        (p = t.getTimeToNextUpdate(l, {
          getTimeToNextUpdateForUnit: s,
          getRoundFunction: Hi,
          now: o,
          future: u,
          round: a,
        })),
      p === void 0)
    ) {
      var h = t.unit || t.formatAs;
      h && (p = s(h));
    }
    return p === void 0 ? c : Math.min(p, c);
  }
}
function PC(e, t, n) {
  var r = n.now,
    i = n.future,
    o = n.round,
    u = n.prevStep,
    a = Fv(e, { timestamp: t, now: r, future: i, round: o, prevStep: u });
  if (a !== void 0) return i ? t - a * 1e3 + 1 : a === 0 && t === r ? Av : t + a * 1e3;
}
function kC(e, t, n) {
  var r = n.now,
    i = n.future,
    o = n.round,
    u = n.prevStep;
  if (e) {
    var a = PC(e, t, { now: r, future: i, round: o, prevStep: u });
    return a === void 0 ? void 0 : a - r;
  } else return i ? t - r + 1 : Av;
}
var Nv = {};
function pr(e) {
  return Nv[e];
}
function $v(e) {
  if (!e) throw new Error("[javascript-time-ago] No locale data passed.");
  Nv[e.locale] = e;
}
const bC = [
    { formatAs: "now" },
    { formatAs: "second" },
    { formatAs: "minute" },
    { formatAs: "hour" },
    { formatAs: "day" },
    { formatAs: "week" },
    { formatAs: "month" },
    { formatAs: "year" },
  ],
  vs = { steps: bC, labels: "long" };
function Ud(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Hd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Ud(Object(n), !0).forEach(function (r) {
          xC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Ud(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function xC(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
const gs = Hd(
    Hd({}, vs),
    {},
    {
      steps: vs.steps.filter(function (e) {
        return e.formatAs !== "second";
      }),
    }
  ),
  Vv = [
    { factor: 1, unit: "now" },
    { threshold: 1, threshold_for_now: 45.5, factor: 1, unit: "second" },
    { threshold: 45.5, factor: zt, unit: "minute" },
    { threshold: 2.5 * zt, granularity: 5, factor: zt, unit: "minute" },
    { threshold: 22.5 * zt, factor: 0.5 * Fu, unit: "half-hour" },
    { threshold: 42.5 * zt, threshold_for_minute: 52.5 * zt, factor: Fu, unit: "hour" },
    { threshold: (20.5 / 24) * Hn, factor: Hn, unit: "day" },
    { threshold: 5.5 * Hn, factor: ps, unit: "week" },
    { threshold: 3.5 * ps, factor: hs, unit: "month" },
    { threshold: 10.5 * hs, factor: Lv, unit: "year" },
  ],
  Bd = {
    gradation: Vv,
    flavour: "long",
    units: ["now", "minute", "hour", "day", "week", "month", "year"],
  },
  MC = {
    gradation: Vv,
    flavour: "long-time",
    units: ["now", "minute", "hour", "day", "week", "month", "year"],
  };
function zv(e) {
  return e instanceof Date ? e : new Date(e);
}
var ys = [{ formatAs: "second" }, { formatAs: "minute" }, { formatAs: "hour" }],
  Lt = {},
  TC = {
    minTime: function (t, n) {
      n.future;
      var r = n.getMinTimeForUnit;
      return r("day");
    },
    format: function (t, n) {
      return (
        Lt[n] || (Lt[n] = {}),
        Lt[n].dayMonth ||
          (Lt[n].dayMonth = new Intl.DateTimeFormat(n, { month: "short", day: "numeric" })),
        Lt[n].dayMonth.format(zv(t))
      );
    },
  },
  IC = {
    minTime: function (t, n) {
      var r = n.future;
      if (r) {
        var i = new Date(new Date(t).getFullYear(), 0).getTime() - 1;
        return (t - i) / 1e3;
      } else {
        var o = new Date(new Date(t).getFullYear() + 1, 0).getTime();
        return (o - t) / 1e3;
      }
    },
    format: function (t, n) {
      return (
        Lt[n] || (Lt[n] = {}),
        Lt[n].dayMonthYear ||
          (Lt[n].dayMonthYear = new Intl.DateTimeFormat(n, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })),
        Lt[n].dayMonthYear.format(zv(t))
      );
    },
  };
cC()
  ? ys.push(TC, IC)
  : ys.push({ formatAs: "day" }, { formatAs: "week" }, { formatAs: "month" }, { formatAs: "year" });
const Yn = { steps: ys, labels: ["mini", "short-time", "narrow", "short"] };
function Qd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Wd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Qd(Object(n), !0).forEach(function (r) {
          RC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Qd(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function RC(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
const LC = Wd(Wd({}, Yn), {}, { steps: [{ formatAs: "now" }].concat(Yn.steps) });
function Kd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Gd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Kd(Object(n), !0).forEach(function (r) {
          DC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Kd(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function DC(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
const ws = Gd(
  Gd({}, Yn),
  {},
  {
    steps: Yn.steps.filter(function (e) {
      return e.formatAs !== "second";
    }),
  }
);
function qd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Yd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? qd(Object(n), !0).forEach(function (r) {
          FC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : qd(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function FC(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
const _C = Yd(Yd({}, ws), {}, { steps: [{ formatAs: "now" }].concat(ws.steps) });
function Xd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function _o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Xd(Object(n), !0).forEach(function (r) {
          AC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Xd(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function AC(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
const NC = _o(
    _o({}, Yn),
    {},
    {
      steps: Yn.steps
        .filter(function (e) {
          return e.formatAs !== "second";
        })
        .map(function (e) {
          return e.formatAs === "minute" ? _o(_o({}, e), {}, { minTime: zt }) : e;
        }),
    }
  ),
  Bi = {
    steps: [
      { formatAs: "second" },
      { formatAs: "minute" },
      { formatAs: "hour" },
      { formatAs: "day" },
      { formatAs: "month" },
      { formatAs: "year" },
    ],
    labels: ["mini", "short-time", "narrow", "short"],
  };
function Zd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Jd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Zd(Object(n), !0).forEach(function (r) {
          $C(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Zd(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function $C(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
const VC = Jd(Jd({}, Bi), {}, { steps: [{ formatAs: "now" }].concat(Bi.steps) });
function ep(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function tp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? ep(Object(n), !0).forEach(function (r) {
          zC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : ep(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function zC(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
const Ss = tp(
  tp({}, Bi),
  {},
  {
    steps: Bi.steps.filter(function (e) {
      return e.formatAs !== "second";
    }),
  }
);
function np(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function rp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? np(Object(n), !0).forEach(function (r) {
          jC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : np(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function jC(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
const UC = rp(rp({}, Ss), {}, { steps: [{ formatAs: "now" }].concat(Ss.steps) });
function HC(e) {
  switch (e) {
    case "default":
    case "round":
      return vs;
    case "round-minute":
      return gs;
    case "approximate":
      return Bd;
    case "time":
    case "approximate-time":
      return MC;
    case "mini":
      return Bi;
    case "mini-now":
      return VC;
    case "mini-minute":
      return Ss;
    case "mini-minute-now":
      return UC;
    case "twitter":
      return Yn;
    case "twitter-now":
      return LC;
    case "twitter-minute":
      return ws;
    case "twitter-minute-now":
      return _C;
    case "twitter-first-minute":
      return NC;
    default:
      return Bd;
  }
}
function _u(e) {
  "@babel/helpers - typeof";
  return (
    (_u =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    _u(e)
  );
}
function BC(e, t) {
  var n = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (Array.isArray(e) || (n = jv(e)) || (t && e && typeof e.length == "number")) {
    n && (e = n);
    var r = 0;
    return function () {
      return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QC(e, t) {
  return GC(e) || KC(e, t) || jv(e, t) || WC();
}
function WC() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function jv(e, t) {
  if (e) {
    if (typeof e == "string") return ip(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set"))
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ip(e, t);
  }
}
function ip(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function KC(e, t) {
  var n = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r = [],
      i = !0,
      o = !1,
      u,
      a;
    try {
      for (
        n = n.call(e);
        !(i = (u = n.next()).done) && (r.push(u.value), !(t && r.length === t));
        i = !0
      );
    } catch (l) {
      (o = !0), (a = l);
    } finally {
      try {
        !i && n.return != null && n.return();
      } finally {
        if (o) throw a;
      }
    }
    return r;
  }
}
function GC(e) {
  if (Array.isArray(e)) return e;
}
function qC(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function op(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function YC(e, t, n) {
  return (
    t && op(e.prototype, t),
    n && op(e, n),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
var Qt = (function () {
    function e() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
        n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        r = n.polyfill;
      qC(this, e),
        typeof t == "string" && (t = [t]),
        (this.locale = sC(t.concat(e.getDefaultLocale()), pr)),
        typeof Intl < "u" &&
          Intl.NumberFormat &&
          (this.numberFormat = new Intl.NumberFormat(this.locale)),
        r === !1
          ? ((this.IntlRelativeTimeFormat = Intl.RelativeTimeFormat),
            (this.IntlPluralRules = Intl.PluralRules))
          : ((this.IntlRelativeTimeFormat = Pn), (this.IntlPluralRules = Pn.PluralRules)),
        (this.relativeTimeFormatCache = new $d()),
        (this.pluralRulesCache = new $d());
    }
    return (
      YC(e, [
        {
          key: "format",
          value: function (n, r, i) {
            i || (r && !t2(r) ? ((i = r), (r = void 0)) : (i = {})),
              r || (r = gs),
              typeof r == "string" && (r = HC(r));
            var o = XC(n),
              u = this.getLabels(r.flavour || r.labels),
              a = u.labels,
              l = u.labelsType,
              s;
            r.now !== void 0 && (s = r.now),
              s === void 0 && i.now !== void 0 && (s = i.now),
              s === void 0 && (s = Date.now());
            var c = (s - o) / 1e3,
              p = i.future || c < 0,
              h = e2(a, pr(this.locale).now, pr(this.locale).long, p);
            if (r.custom) {
              var v = r.custom({
                now: s,
                date: new Date(o),
                time: o,
                elapsed: c,
                locale: this.locale,
              });
              if (v !== void 0) return v;
            }
            var y = JC(r.units, a, h),
              g = i.round || r.round,
              O = vC(r.gradation || r.steps || gs.steps, c, {
                now: s,
                units: y,
                round: g,
                future: p,
                getNextStep: !0,
              }),
              f = QC(O, 3),
              d = f[0],
              m = f[1],
              C = f[2],
              P =
                this.formatDateForStep(o, m, c, {
                  labels: a,
                  labelsType: l,
                  nowLabel: h,
                  now: s,
                  future: p,
                  round: g,
                }) || "";
            if (i.getTimeToNextUpdate) {
              var b = EC(o, m, { nextStep: C, prevStep: d, now: s, future: p, round: g });
              return [P, b];
            }
            return P;
          },
        },
        {
          key: "formatDateForStep",
          value: function (n, r, i, o) {
            var u = this,
              a = o.labels,
              l = o.labelsType,
              s = o.nowLabel,
              c = o.now,
              p = o.future,
              h = o.round;
            if (r) {
              if (r.format)
                return r.format(n, this.locale, {
                  formatAs: function (f, d) {
                    return u.formatValue(d, f, { labels: a, future: p });
                  },
                  now: c,
                  future: p,
                });
              var v = r.unit || r.formatAs;
              if (!v)
                throw new Error(
                  "[javascript-time-ago] Each step must define either `formatAs` or `format()`. Step: ".concat(
                    JSON.stringify(r)
                  )
                );
              if (v === "now") return s;
              var y = Math.abs(i) / Dv(r);
              r.granularity && (y = Hi(h)(y / r.granularity) * r.granularity);
              var g = -1 * Math.sign(i) * Hi(h)(y);
              switch ((g === 0 && (p ? (g = 0) : (g = -0)), l)) {
                case "long":
                case "short":
                case "narrow":
                  return this.getFormatter(l).format(g, v);
                default:
                  return this.formatValue(g, v, { labels: a, future: p });
              }
            }
          },
        },
        {
          key: "formatValue",
          value: function (n, r, i) {
            var o = i.labels,
              u = i.future;
            return this.getFormattingRule(o, r, n, { future: u }).replace(
              "{0}",
              this.formatNumber(Math.abs(n))
            );
          },
        },
        {
          key: "getFormattingRule",
          value: function (n, r, i, o) {
            var u = o.future;
            if ((this.locale, (n = n[r]), typeof n == "string")) return n;
            var a = i === 0 ? (u ? "future" : "past") : i < 0 ? "past" : "future",
              l = n[a] || n;
            if (typeof l == "string") return l;
            var s = this.getPluralRules().select(Math.abs(i));
            return l[s] || l.other;
          },
        },
        {
          key: "formatNumber",
          value: function (n) {
            return this.numberFormat ? this.numberFormat.format(n) : String(n);
          },
        },
        {
          key: "getFormatter",
          value: function (n) {
            return (
              this.relativeTimeFormatCache.get(this.locale, n) ||
              this.relativeTimeFormatCache.put(
                this.locale,
                n,
                new this.IntlRelativeTimeFormat(this.locale, { style: n })
              )
            );
          },
        },
        {
          key: "getPluralRules",
          value: function () {
            return (
              this.pluralRulesCache.get(this.locale) ||
              this.pluralRulesCache.put(this.locale, new this.IntlPluralRules(this.locale))
            );
          },
        },
        {
          key: "getLabels",
          value: function () {
            var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
            typeof n == "string" && (n = [n]),
              (n = n.map(function (a) {
                switch (a) {
                  case "tiny":
                  case "mini-time":
                    return "mini";
                  default:
                    return a;
                }
              })),
              (n = n.concat("long"));
            for (var r = pr(this.locale), i = BC(n), o; !(o = i()).done; ) {
              var u = o.value;
              if (r[u]) return { labelsType: u, labels: r[u] };
            }
          },
        },
      ]),
      e
    );
  })(),
  Uv = "en";
Qt.getDefaultLocale = function () {
  return Uv;
};
Qt.setDefaultLocale = function (e) {
  return (Uv = e);
};
Qt.addDefaultLocale = function (e) {
  if (up)
    return console.error(
      "[javascript-time-ago] `TimeAgo.addDefaultLocale()` can only be called once. To add other locales, use `TimeAgo.addLocale()`."
    );
  (up = !0), Qt.setDefaultLocale(e.locale), Qt.addLocale(e);
};
var up;
Qt.addLocale = function (e) {
  $v(e), Pn.addLocale(e);
};
Qt.locale = Qt.addLocale;
Qt.addLabels = function (e, t, n) {
  var r = pr(e);
  r || ($v({ locale: e }), (r = pr(e))), (r[t] = n);
};
function XC(e) {
  if (e.constructor === Date || ZC(e)) return e.getTime();
  if (typeof e == "number") return e;
  throw new Error("Unsupported relative time formatter input: ".concat(_u(e), ", ").concat(e));
}
function ZC(e) {
  return _u(e) === "object" && typeof e.getTime == "function";
}
function JC(e, t, n) {
  var r = Object.keys(t);
  return (
    n && r.push("now"),
    e &&
      (r = e.filter(function (i) {
        return i === "now" || r.indexOf(i) >= 0;
      })),
    r
  );
}
function e2(e, t, n, r) {
  var i = e.now || (t && t.now);
  if (i) return typeof i == "string" ? i : r ? i.future : i.past;
  if (n && n.second && n.second.current) return n.second.current;
}
function t2(e) {
  return typeof e == "string" || fC(e);
}
const c2 = {
  locale: "en",
  long: {
    year: {
      previous: "last year",
      current: "this year",
      next: "next year",
      past: { one: "{0} year ago", other: "{0} years ago" },
      future: { one: "in {0} year", other: "in {0} years" },
    },
    quarter: {
      previous: "last quarter",
      current: "this quarter",
      next: "next quarter",
      past: { one: "{0} quarter ago", other: "{0} quarters ago" },
      future: { one: "in {0} quarter", other: "in {0} quarters" },
    },
    month: {
      previous: "last month",
      current: "this month",
      next: "next month",
      past: { one: "{0} month ago", other: "{0} months ago" },
      future: { one: "in {0} month", other: "in {0} months" },
    },
    week: {
      previous: "last week",
      current: "this week",
      next: "next week",
      past: { one: "{0} week ago", other: "{0} weeks ago" },
      future: { one: "in {0} week", other: "in {0} weeks" },
    },
    day: {
      previous: "yesterday",
      current: "today",
      next: "tomorrow",
      past: { one: "{0} day ago", other: "{0} days ago" },
      future: { one: "in {0} day", other: "in {0} days" },
    },
    hour: {
      current: "this hour",
      past: { one: "{0} hour ago", other: "{0} hours ago" },
      future: { one: "in {0} hour", other: "in {0} hours" },
    },
    minute: {
      current: "this minute",
      past: { one: "{0} minute ago", other: "{0} minutes ago" },
      future: { one: "in {0} minute", other: "in {0} minutes" },
    },
    second: {
      current: "now",
      past: { one: "{0} second ago", other: "{0} seconds ago" },
      future: { one: "in {0} second", other: "in {0} seconds" },
    },
  },
  short: {
    year: {
      previous: "last yr.",
      current: "this yr.",
      next: "next yr.",
      past: "{0} yr. ago",
      future: "in {0} yr.",
    },
    quarter: {
      previous: "last qtr.",
      current: "this qtr.",
      next: "next qtr.",
      past: { one: "{0} qtr. ago", other: "{0} qtrs. ago" },
      future: { one: "in {0} qtr.", other: "in {0} qtrs." },
    },
    month: {
      previous: "last mo.",
      current: "this mo.",
      next: "next mo.",
      past: "{0} mo. ago",
      future: "in {0} mo.",
    },
    week: {
      previous: "last wk.",
      current: "this wk.",
      next: "next wk.",
      past: "{0} wk. ago",
      future: "in {0} wk.",
    },
    day: {
      previous: "yesterday",
      current: "today",
      next: "tomorrow",
      past: { one: "{0} day ago", other: "{0} days ago" },
      future: { one: "in {0} day", other: "in {0} days" },
    },
    hour: { current: "this hour", past: "{0} hr. ago", future: "in {0} hr." },
    minute: { current: "this minute", past: "{0} min. ago", future: "in {0} min." },
    second: { current: "now", past: "{0} sec. ago", future: "in {0} sec." },
  },
  narrow: {
    year: {
      previous: "last yr.",
      current: "this yr.",
      next: "next yr.",
      past: "{0}y ago",
      future: "in {0}y",
    },
    quarter: {
      previous: "last qtr.",
      current: "this qtr.",
      next: "next qtr.",
      past: "{0}q ago",
      future: "in {0}q",
    },
    month: {
      previous: "last mo.",
      current: "this mo.",
      next: "next mo.",
      past: "{0}mo ago",
      future: "in {0}mo",
    },
    week: {
      previous: "last wk.",
      current: "this wk.",
      next: "next wk.",
      past: "{0}w ago",
      future: "in {0}w",
    },
    day: {
      previous: "yesterday",
      current: "today",
      next: "tomorrow",
      past: "{0}d ago",
      future: "in {0}d",
    },
    hour: { current: "this hour", past: "{0}h ago", future: "in {0}h" },
    minute: { current: "this minute", past: "{0}m ago", future: "in {0}m" },
    second: { current: "now", past: "{0}s ago", future: "in {0}s" },
  },
  now: { now: { current: "now", future: "in a moment", past: "just now" } },
  mini: {
    year: "{0}yr",
    month: "{0}mo",
    week: "{0}wk",
    day: "{0}d",
    hour: "{0}h",
    minute: "{0}m",
    second: "{0}s",
    now: "now",
  },
  "short-time": {
    year: "{0} yr.",
    month: "{0} mo.",
    week: "{0} wk.",
    day: { one: "{0} day", other: "{0} days" },
    hour: "{0} hr.",
    minute: "{0} min.",
    second: "{0} sec.",
  },
  "long-time": {
    year: { one: "{0} year", other: "{0} years" },
    month: { one: "{0} month", other: "{0} months" },
    week: { one: "{0} week", other: "{0} weeks" },
    day: { one: "{0} day", other: "{0} days" },
    hour: { one: "{0} hour", other: "{0} hours" },
    minute: { one: "{0} minute", other: "{0} minutes" },
    second: { one: "{0} second", other: "{0} seconds" },
  },
};
export {
  u2 as Q,
  Vc as R,
  o2 as S,
  Qt as T,
  lg as a,
  hg as b,
  r2 as c,
  Im as d,
  i2 as e,
  s2 as f,
  vp as g,
  c2 as h,
  a2 as i,
  x as r,
  l2 as u,
};
//# sourceMappingURL=@libs-7GpMRMbO.js.map
