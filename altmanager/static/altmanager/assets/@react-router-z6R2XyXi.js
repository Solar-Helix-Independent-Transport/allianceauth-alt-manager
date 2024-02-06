import { r as c, R as le } from "./@libs-7GpMRMbO.js";

/**
 * @remix-run/router v1.15.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function S() {
  return (
    (S = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    S.apply(this, arguments)
  );
}
var R;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(R || (R = {}));
const k = "popstate";
function ie(e) {
  e === void 0 && (e = {});
  function t(n, a) {
    let { pathname: i, search: l, hash: s } = n.location;
    return W(
      "",
      { pathname: i, search: l, hash: s },
      (a.state && a.state.usr) || null,
      (a.state && a.state.key) || "default"
    );
  }
  function r(n, a) {
    return typeof a == "string" ? a : K(a);
  }
  return se(t, r, null, e);
}
function v(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function O(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function oe() {
  return Math.random().toString(36).substr(2, 8);
}
function V(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function W(e, t, r, n) {
  return (
    r === void 0 && (r = null),
    S(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? b(t) : t,
      { state: r, key: (t && t.key) || n || oe() }
    )
  );
}
function K(e) {
  let { pathname: t = "/", search: r = "", hash: n = "" } = e;
  return (
    r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r),
    n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n),
    t
  );
}
function b(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && ((t.hash = e.substr(r)), (e = e.substr(0, r)));
    let n = e.indexOf("?");
    n >= 0 && ((t.search = e.substr(n)), (e = e.substr(0, n))), e && (t.pathname = e);
  }
  return t;
}
function se(e, t, r, n) {
  n === void 0 && (n = {});
  let { window: a = document.defaultView, v5Compat: i = !1 } = n,
    l = a.history,
    s = R.Pop,
    o = null,
    f = h();
  f == null && ((f = 0), l.replaceState(S({}, l.state, { idx: f }), ""));
  function h() {
    return (l.state || { idx: null }).idx;
  }
  function u() {
    s = R.Pop;
    let d = h(),
      x = d == null ? null : d - f;
    (f = d), o && o({ action: s, location: m.location, delta: x });
  }
  function p(d, x) {
    s = R.Push;
    let E = W(m.location, d, x);
    r && r(E, d), (f = h() + 1);
    let C = V(E, f),
      N = m.createHref(E);
    try {
      l.pushState(C, "", N);
    } catch ($) {
      if ($ instanceof DOMException && $.name === "DataCloneError") throw $;
      a.location.assign(N);
    }
    i && o && o({ action: s, location: m.location, delta: 1 });
  }
  function g(d, x) {
    s = R.Replace;
    let E = W(m.location, d, x);
    r && r(E, d), (f = h());
    let C = V(E, f),
      N = m.createHref(E);
    l.replaceState(C, "", N), i && o && o({ action: s, location: m.location, delta: 0 });
  }
  function y(d) {
    let x = a.location.origin !== "null" ? a.location.origin : a.location.href,
      E = typeof d == "string" ? d : K(d);
    return (
      v(x, "No window.location.(origin|href) available to create URL for href: " + E), new URL(E, x)
    );
  }
  let m = {
    get action() {
      return s;
    },
    get location() {
      return e(a, l);
    },
    listen(d) {
      if (o) throw new Error("A history only accepts one active listener");
      return (
        a.addEventListener(k, u),
        (o = d),
        () => {
          a.removeEventListener(k, u), (o = null);
        }
      );
    },
    createHref(d) {
      return t(a, d);
    },
    createURL: y,
    encodeLocation(d) {
      let x = y(d);
      return { pathname: x.pathname, search: x.search, hash: x.hash };
    },
    push: p,
    replace: g,
    go(d) {
      return l.go(d);
    },
  };
  return m;
}
var D;
(function (e) {
  (e.data = "data"), (e.deferred = "deferred"), (e.redirect = "redirect"), (e.error = "error");
})(D || (D = {}));
function ue(e, t, r) {
  r === void 0 && (r = "/");
  let n = typeof t == "string" ? b(t) : t,
    a = Y(n.pathname || "/", r);
  if (a == null) return null;
  let i = Q(e);
  ce(i);
  let l = null;
  for (let s = 0; l == null && s < i.length; ++s) l = xe(i[s], Re(a));
  return l;
}
function Q(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let a = (i, l, s) => {
    let o = {
      relativePath: s === void 0 ? i.path || "" : s,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: l,
      route: i,
    };
    o.relativePath.startsWith("/") &&
      (v(
        o.relativePath.startsWith(n),
        'Absolute route path "' +
          o.relativePath +
          '" nested under path ' +
          ('"' + n + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (o.relativePath = o.relativePath.slice(n.length)));
    let f = P([n, o.relativePath]),
      h = r.concat(o);
    i.children &&
      i.children.length > 0 &&
      (v(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + f + '".')
      ),
      Q(i.children, t, h, f)),
      !(i.path == null && !i.index) && t.push({ path: f, score: ge(f, i.index), routesMeta: h });
  };
  return (
    e.forEach((i, l) => {
      var s;
      if (i.path === "" || !((s = i.path) != null && s.includes("?"))) a(i, l);
      else for (let o of X(i.path)) a(i, l, o);
    }),
    t
  );
}
function X(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t,
    a = r.endsWith("?"),
    i = r.replace(/\?$/, "");
  if (n.length === 0) return a ? [i, ""] : [i];
  let l = X(n.join("/")),
    s = [];
  return (
    s.push(...l.map((o) => (o === "" ? i : [i, o].join("/")))),
    a && s.push(...l),
    s.map((o) => (e.startsWith("/") && o === "" ? "/" : o))
  );
}
function ce(e) {
  e.sort((t, r) =>
    t.score !== r.score
      ? r.score - t.score
      : ye(
          t.routesMeta.map((n) => n.childrenIndex),
          r.routesMeta.map((n) => n.childrenIndex)
        )
  );
}
const he = /^:[\w-]+$/,
  fe = 3,
  de = 2,
  pe = 1,
  me = 10,
  ve = -2,
  J = (e) => e === "*";
function ge(e, t) {
  let r = e.split("/"),
    n = r.length;
  return (
    r.some(J) && (n += ve),
    t && (n += de),
    r.filter((a) => !J(a)).reduce((a, i) => a + (he.test(i) ? fe : i === "" ? pe : me), n)
  );
}
function ye(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, a) => n === t[a])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function xe(e, t) {
  let { routesMeta: r } = e,
    n = {},
    a = "/",
    i = [];
  for (let l = 0; l < r.length; ++l) {
    let s = r[l],
      o = l === r.length - 1,
      f = a === "/" ? t : t.slice(a.length) || "/",
      h = Ee({ path: s.relativePath, caseSensitive: s.caseSensitive, end: o }, f);
    if (!h) return null;
    Object.assign(n, h.params);
    let u = s.route;
    i.push({
      params: n,
      pathname: P([a, h.pathname]),
      pathnameBase: Ue(P([a, h.pathnameBase])),
      route: u,
    }),
      h.pathnameBase !== "/" && (a = P([a, h.pathnameBase]));
  }
  return i;
}
function He(e, t) {
  t === void 0 && (t = {});
  let r = e;
  r.endsWith("*") &&
    r !== "*" &&
    !r.endsWith("/*") &&
    (O(
      !1,
      'Route path "' +
        r +
        '" will be treated as if it were ' +
        ('"' + r.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + r.replace(/\*$/, "/*") + '".')
    ),
    (r = r.replace(/\*$/, "/*")));
  const n = r.startsWith("/") ? "/" : "",
    a = (l) => (l == null ? "" : typeof l == "string" ? l : String(l)),
    i = r
      .split(/\/+/)
      .map((l, s, o) => {
        if (s === o.length - 1 && l === "*") return a(t["*"]);
        const h = l.match(/^:([\w-]+)(\??)$/);
        if (h) {
          const [, u, p] = h;
          let g = t[u];
          return v(p === "?" || g != null, 'Missing ":' + u + '" param'), a(g);
        }
        return l.replace(/\?$/g, "");
      })
      .filter((l) => !!l);
  return n + i.join("/");
}
function Ee(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, n] = Ce(e.path, e.caseSensitive, e.end),
    a = t.match(r);
  if (!a) return null;
  let i = a[0],
    l = i.replace(/(.)\/+$/, "$1"),
    s = a.slice(1);
  return {
    params: n.reduce((f, h, u) => {
      let { paramName: p, isOptional: g } = h;
      if (p === "*") {
        let m = s[u] || "";
        l = i.slice(0, i.length - m.length).replace(/(.)\/+$/, "$1");
      }
      const y = s[u];
      return g && !y ? (f[p] = void 0) : (f[p] = we(y || "", p)), f;
    }, {}),
    pathname: i,
    pathnameBase: l,
    pattern: e,
  };
}
function Ce(e, t, r) {
  t === void 0 && (t = !1),
    r === void 0 && (r = !0),
    O(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let n = [],
    a =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (l, s, o) => (
            n.push({ paramName: s, isOptional: o != null }), o ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (n.push({ paramName: "*" }), (a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
      ? (a += "\\/*$")
      : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"),
    [new RegExp(a, t ? void 0 : "i"), n]
  );
}
function Re(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      O(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function we(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (r) {
    return (
      O(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' + e + '" is a malformed URL segment. This is probably') +
          (" due to a bad percent encoding (" + r + ").")
      ),
      e
    );
  }
}
function Y(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length,
    n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function Pe(e, t) {
  t === void 0 && (t = "/");
  let { pathname: r, search: n = "", hash: a = "" } = typeof e == "string" ? b(e) : e;
  return { pathname: r ? (r.startsWith("/") ? r : be(r, t)) : t, search: Be(n), hash: Ie(a) };
}
function be(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((a) => {
      a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function M(e, t, r, n) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") +
    ("`to." + r + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Se(e) {
  return e.filter((t, r) => r === 0 || (t.route.path && t.route.path.length > 0));
}
function Z(e, t) {
  let r = Se(e);
  return t
    ? r.map((n, a) => (a === e.length - 1 ? n.pathname : n.pathnameBase))
    : r.map((n) => n.pathnameBase);
}
function H(e, t, r, n) {
  n === void 0 && (n = !1);
  let a;
  typeof e == "string"
    ? (a = b(e))
    : ((a = S({}, e)),
      v(!a.pathname || !a.pathname.includes("?"), M("?", "pathname", "search", a)),
      v(!a.pathname || !a.pathname.includes("#"), M("#", "pathname", "hash", a)),
      v(!a.search || !a.search.includes("#"), M("#", "search", "hash", a)));
  let i = e === "" || a.pathname === "",
    l = i ? "/" : a.pathname,
    s;
  if (l == null) s = r;
  else {
    let u = t.length - 1;
    if (!n && l.startsWith("..")) {
      let p = l.split("/");
      for (; p[0] === ".."; ) p.shift(), (u -= 1);
      a.pathname = p.join("/");
    }
    s = u >= 0 ? t[u] : "/";
  }
  let o = Pe(a, s),
    f = l && l !== "/" && l.endsWith("/"),
    h = (i || l === ".") && r.endsWith("/");
  return !o.pathname.endsWith("/") && (f || h) && (o.pathname += "/"), o;
}
const P = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Ue = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Be = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Ie = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Ne(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const ee = ["post", "put", "patch", "delete"];
new Set(ee);
const Le = ["get", ...ee];
new Set(Le);
/**
 * React Router v6.22.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function U() {
  return (
    (U = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    U.apply(this, arguments)
  );
}
const j = c.createContext(null),
  Oe = c.createContext(null),
  B = c.createContext(null),
  T = c.createContext(null),
  w = c.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  te = c.createContext(null);
function I() {
  return c.useContext(T) != null;
}
function _() {
  return I() || v(!1), c.useContext(T).location;
}
function re(e) {
  c.useContext(B).static || c.useLayoutEffect(e);
}
function Te() {
  let { isDataRoute: e } = c.useContext(w);
  return e ? qe() : $e();
}
function $e() {
  I() || v(!1);
  let e = c.useContext(j),
    { basename: t, future: r, navigator: n } = c.useContext(B),
    { matches: a } = c.useContext(w),
    { pathname: i } = _(),
    l = JSON.stringify(Z(a, r.v7_relativeSplatPath)),
    s = c.useRef(!1);
  return (
    re(() => {
      s.current = !0;
    }),
    c.useCallback(
      function (f, h) {
        if ((h === void 0 && (h = {}), !s.current)) return;
        if (typeof f == "number") {
          n.go(f);
          return;
        }
        let u = H(f, JSON.parse(l), i, h.relative === "path");
        e == null && t !== "/" && (u.pathname = u.pathname === "/" ? t : P([t, u.pathname])),
          (h.replace ? n.replace : n.push)(u, h.state, h);
      },
      [t, n, l, i, e]
    )
  );
}
function et() {
  let { matches: e } = c.useContext(w),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function Me(e, t) {
  return We(e, t);
}
function We(e, t, r, n) {
  I() || v(!1);
  let { navigator: a } = c.useContext(B),
    { matches: i } = c.useContext(w),
    l = i[i.length - 1],
    s = l ? l.params : {};
  l && l.pathname;
  let o = l ? l.pathnameBase : "/";
  l && l.route;
  let f = _(),
    h;
  if (t) {
    var u;
    let d = typeof t == "string" ? b(t) : t;
    o === "/" || ((u = d.pathname) != null && u.startsWith(o)) || v(!1), (h = d);
  } else h = f;
  let p = h.pathname || "/",
    g = o === "/" ? p : p.slice(o.length) || "/",
    y = ue(e, { pathname: g }),
    m = Ve(
      y &&
        y.map((d) =>
          Object.assign({}, d, {
            params: Object.assign({}, s, d.params),
            pathname: P([o, a.encodeLocation ? a.encodeLocation(d.pathname).pathname : d.pathname]),
            pathnameBase:
              d.pathnameBase === "/"
                ? o
                : P([
                    o,
                    a.encodeLocation ? a.encodeLocation(d.pathnameBase).pathname : d.pathnameBase,
                  ]),
          })
        ),
      i,
      r,
      n
    );
  return t && m
    ? c.createElement(
        T.Provider,
        {
          value: {
            location: U({ pathname: "/", search: "", hash: "", state: null, key: "default" }, h),
            navigationType: R.Pop,
          },
        },
        m
      )
    : m;
}
function Fe() {
  let e = Ae(),
    t = Ne(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
    r = e instanceof Error ? e.stack : null,
    a = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
    i = null;
  return c.createElement(
    c.Fragment,
    null,
    c.createElement("h2", null, "Unexpected Application Error!"),
    c.createElement("h3", { style: { fontStyle: "italic" } }, t),
    r ? c.createElement("pre", { style: a }, r) : null,
    i
  );
}
const je = c.createElement(Fe, null);
class _e extends c.Component {
  constructor(t) {
    super(t), (this.state = { location: t.location, revalidation: t.revalidation, error: t.error });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, r) {
    return r.location !== t.location || (r.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : r.error,
          location: r.location,
          revalidation: t.revalidation || r.revalidation,
        };
  }
  componentDidCatch(t, r) {
    console.error("React Router caught the following error during render", t, r);
  }
  render() {
    return this.state.error !== void 0
      ? c.createElement(
          w.Provider,
          { value: this.props.routeContext },
          c.createElement(te.Provider, { value: this.state.error, children: this.props.component })
        )
      : this.props.children;
  }
}
function ke(e) {
  let { routeContext: t, match: r, children: n } = e,
    a = c.useContext(j);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = r.route.id),
    c.createElement(w.Provider, { value: t }, n)
  );
}
function Ve(e, t, r, n) {
  var a;
  if (
    (t === void 0 && (t = []), r === void 0 && (r = null), n === void 0 && (n = null), e == null)
  ) {
    var i;
    if ((i = r) != null && i.errors) e = r.matches;
    else return null;
  }
  let l = e,
    s = (a = r) == null ? void 0 : a.errors;
  if (s != null) {
    let h = l.findIndex((u) => u.route.id && (s == null ? void 0 : s[u.route.id]));
    h >= 0 || v(!1), (l = l.slice(0, Math.min(l.length, h + 1)));
  }
  let o = !1,
    f = -1;
  if (r && n && n.v7_partialHydration)
    for (let h = 0; h < l.length; h++) {
      let u = l[h];
      if (((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (f = h), u.route.id)) {
        let { loaderData: p, errors: g } = r,
          y = u.route.loader && p[u.route.id] === void 0 && (!g || g[u.route.id] === void 0);
        if (u.route.lazy || y) {
          (o = !0), f >= 0 ? (l = l.slice(0, f + 1)) : (l = [l[0]]);
          break;
        }
      }
    }
  return l.reduceRight((h, u, p) => {
    let g,
      y = !1,
      m = null,
      d = null;
    r &&
      ((g = s && u.route.id ? s[u.route.id] : void 0),
      (m = u.route.errorElement || je),
      o &&
        (f < 0 && p === 0
          ? (Ge("route-fallback", !1), (y = !0), (d = null))
          : f === p && ((y = !0), (d = u.route.hydrateFallbackElement || null))));
    let x = t.concat(l.slice(0, p + 1)),
      E = () => {
        let C;
        return (
          g
            ? (C = m)
            : y
            ? (C = d)
            : u.route.Component
            ? (C = c.createElement(u.route.Component, null))
            : u.route.element
            ? (C = u.route.element)
            : (C = h),
          c.createElement(ke, {
            match: u,
            routeContext: { outlet: h, matches: x, isDataRoute: r != null },
            children: C,
          })
        );
      };
    return r && (u.route.ErrorBoundary || u.route.errorElement || p === 0)
      ? c.createElement(_e, {
          location: r.location,
          revalidation: r.revalidation,
          component: m,
          error: g,
          children: E(),
          routeContext: { outlet: null, matches: x, isDataRoute: !0 },
        })
      : E();
  }, null);
}
var ne = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(ne || {}),
  L = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(L || {});
function De(e) {
  let t = c.useContext(j);
  return t || v(!1), t;
}
function Je(e) {
  let t = c.useContext(Oe);
  return t || v(!1), t;
}
function ze(e) {
  let t = c.useContext(w);
  return t || v(!1), t;
}
function ae(e) {
  let t = ze(),
    r = t.matches[t.matches.length - 1];
  return r.route.id || v(!1), r.route.id;
}
function Ae() {
  var e;
  let t = c.useContext(te),
    r = Je(L.UseRouteError),
    n = ae(L.UseRouteError);
  return t !== void 0 ? t : (e = r.errors) == null ? void 0 : e[n];
}
function qe() {
  let { router: e } = De(ne.UseNavigateStable),
    t = ae(L.UseNavigateStable),
    r = c.useRef(!1);
  return (
    re(() => {
      r.current = !0;
    }),
    c.useCallback(
      function (a, i) {
        i === void 0 && (i = {}),
          r.current &&
            (typeof a == "number" ? e.navigate(a) : e.navigate(a, U({ fromRouteId: t }, i)));
      },
      [e, t]
    )
  );
}
const z = {};
function Ge(e, t, r) {
  !t && !z[e] && (z[e] = !0);
}
function tt(e) {
  let { to: t, replace: r, state: n, relative: a } = e;
  I() || v(!1);
  let { future: i, static: l } = c.useContext(B),
    { matches: s } = c.useContext(w),
    { pathname: o } = _(),
    f = Te(),
    h = H(t, Z(s, i.v7_relativeSplatPath), o, a === "path"),
    u = JSON.stringify(h);
  return (
    c.useEffect(() => f(JSON.parse(u), { replace: r, state: n, relative: a }), [f, u, a, r, n]),
    null
  );
}
function Ke(e) {
  v(!1);
}
function Qe(e) {
  let {
    basename: t = "/",
    children: r = null,
    location: n,
    navigationType: a = R.Pop,
    navigator: i,
    static: l = !1,
    future: s,
  } = e;
  I() && v(!1);
  let o = t.replace(/^\/*/, "/"),
    f = c.useMemo(
      () => ({ basename: o, navigator: i, static: l, future: U({ v7_relativeSplatPath: !1 }, s) }),
      [o, s, i, l]
    );
  typeof n == "string" && (n = b(n));
  let { pathname: h = "/", search: u = "", hash: p = "", state: g = null, key: y = "default" } = n,
    m = c.useMemo(() => {
      let d = Y(h, o);
      return d == null
        ? null
        : { location: { pathname: d, search: u, hash: p, state: g, key: y }, navigationType: a };
    }, [o, h, u, p, g, y, a]);
  return m == null
    ? null
    : c.createElement(
        B.Provider,
        { value: f },
        c.createElement(T.Provider, { children: r, value: m })
      );
}
function rt(e) {
  let { children: t, location: r } = e;
  return Me(F(t), r);
}
new Promise(() => {});
function F(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return (
    c.Children.forEach(e, (n, a) => {
      if (!c.isValidElement(n)) return;
      let i = [...t, a];
      if (n.type === c.Fragment) {
        r.push.apply(r, F(n.props.children, i));
        return;
      }
      n.type !== Ke && v(!1), !n.props.index || !n.props.children || v(!1);
      let l = {
        id: n.props.id || i.join("-"),
        caseSensitive: n.props.caseSensitive,
        element: n.props.element,
        Component: n.props.Component,
        index: n.props.index,
        path: n.props.path,
        loader: n.props.loader,
        action: n.props.action,
        errorElement: n.props.errorElement,
        ErrorBoundary: n.props.ErrorBoundary,
        hasErrorBoundary: n.props.ErrorBoundary != null || n.props.errorElement != null,
        shouldRevalidate: n.props.shouldRevalidate,
        handle: n.props.handle,
        lazy: n.props.lazy,
      };
      n.props.children && (l.children = F(n.props.children, i)), r.push(l);
    }),
    r
  );
}
/**
 * React Router DOM v6.22.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const Xe = "6";
try {
  window.__reactRouterVersion = Xe;
} catch {}
const Ye = "startTransition",
  A = le[Ye];
function nt(e) {
  let { basename: t, children: r, future: n, window: a } = e,
    i = c.useRef();
  i.current == null && (i.current = ie({ window: a, v5Compat: !0 }));
  let l = i.current,
    [s, o] = c.useState({ action: l.action, location: l.location }),
    { v7_startTransition: f } = n || {},
    h = c.useCallback(
      (u) => {
        f && A ? A(() => o(u)) : o(u);
      },
      [o, f]
    );
  return (
    c.useLayoutEffect(() => l.listen(h), [l, h]),
    c.createElement(Qe, {
      basename: t,
      children: r,
      location: s.location,
      navigationType: s.action,
      navigator: l,
      future: n,
    })
  );
}
var q;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(q || (q = {}));
var G;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(G || (G = {}));
export { nt as B, tt as N, rt as R, Te as a, Ke as b, He as g, et as u };
//# sourceMappingURL=@react-router-z6R2XyXi.js.map
