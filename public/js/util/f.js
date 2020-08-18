(function () {
  /* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/

  var m;
  function aa(a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }
  var ba =
    'function' == typeof Object.defineProperties
      ? Object.defineProperty
      : function (a, b, c) {
          if (a == Array.prototype || a == Object.prototype) return a;
          a[b] = c.value;
          return a;
        };
  function ca(a) {
    a = [
      'object' == typeof globalThis && globalThis,
      a,
      'object' == typeof window && window,
      'object' == typeof self && self,
      'object' == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error('Cannot find global object');
  }
  var da = ca(this),
    ea = 'function' === typeof Symbol && 'symbol' === typeof Symbol('x'),
    q = {},
    fa = {};
  function u(a, b) {
    var c = fa[b];
    if (null == c) return a[b];
    c = a[c];
    return void 0 !== c ? c : a[b];
  }
  function ha(a, b, c) {
    if (b)
      a: {
        var d = a.split('.');
        a = 1 === d.length;
        var e = d[0],
          f;
        !a && e in q ? (f = q) : (f = da);
        for (e = 0; e < d.length - 1; e++) {
          var g = d[e];
          if (!(g in f)) break a;
          f = f[g];
        }
        d = d[d.length - 1];
        c = ea && 'es6' === c ? f[d] : null;
        b = b(c);
        null != b &&
          (a
            ? ba(q, d, { configurable: !0, writable: !0, value: b })
            : b !== c &&
              ((fa[d] = ea ? da.Symbol(d) : '$jscp$' + d),
              (d = fa[d]),
              ba(f, d, { configurable: !0, writable: !0, value: b })));
      }
  }
  ha(
    'Symbol',
    function (a) {
      function b(e) {
        if (this instanceof b)
          throw new TypeError('Symbol is not a constructor');
        return new c('jscomp_symbol_' + (e || '') + '_' + d++, e);
      }
      function c(e, f) {
        this.a = e;
        ba(this, 'description', { configurable: !0, writable: !0, value: f });
      }
      if (a) return a;
      c.prototype.toString = function () {
        return this.a;
      };
      var d = 0;
      return b;
    },
    'es6'
  );
  ha(
    'Symbol.iterator',
    function (a) {
      if (a) return a;
      a = (0, q.Symbol)('Symbol.iterator');
      for (
        var b = 'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
            ' '
          ),
          c = 0;
        c < b.length;
        c++
      ) {
        var d = da[b[c]];
        'function' === typeof d &&
          'function' != typeof d.prototype[a] &&
          ba(d.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
              return ia(aa(this));
            },
          });
      }
      return a;
    },
    'es6'
  );
  function ia(a) {
    a = { next: a };
    a[u(q.Symbol, 'iterator')] = function () {
      return this;
    };
    return a;
  }
  function w(a) {
    var b =
      'undefined' != typeof q.Symbol &&
      u(q.Symbol, 'iterator') &&
      a[u(q.Symbol, 'iterator')];
    return b ? b.call(a) : { next: aa(a) };
  }
  function ja(a) {
    if (!(a instanceof Array)) {
      a = w(a);
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      a = c;
    }
    return a;
  }
  var ka =
      'function' == typeof Object.create
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          },
    la;
  if (ea && 'function' == typeof Object.setPrototypeOf)
    la = Object.setPrototypeOf;
  else {
    var ma;
    a: {
      var na = { Ea: !0 },
        oa = {};
      try {
        oa.__proto__ = na;
        ma = oa.Ea;
        break a;
      } catch (a) {}
      ma = !1;
    }
    la = ma
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible');
          return a;
        }
      : null;
  }
  var pa = la;
  function qa(a, b) {
    a.prototype = ka(b.prototype);
    a.prototype.constructor = a;
    if (pa) pa(a, b);
    else
      for (var c in b)
        if ('prototype' != c)
          if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d);
          } else a[c] = b[c];
  }
  function ra(a, b, c) {
    if (null == a)
      throw new TypeError(
        "The 'this' value for String.prototype." +
          c +
          ' must not be null or undefined'
      );
    if (b instanceof RegExp)
      throw new TypeError(
        'First argument to String.prototype.' +
          c +
          ' must not be a regular expression'
      );
    return a + '';
  }
  ha(
    'String.prototype.endsWith',
    function (a) {
      return a
        ? a
        : function (b, c) {
            var d = ra(this, b, 'endsWith');
            void 0 === c && (c = d.length);
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var e = b.length; 0 < e && 0 < c; )
              if (d[--c] != b[--e]) return !1;
            return 0 >= e;
          };
    },
    'es6'
  );
  ha(
    'Array.prototype.find',
    function (a) {
      return a
        ? a
        : function (b, c) {
            a: {
              var d = this;
              d instanceof String && (d = String(d));
              for (var e = d.length, f = 0; f < e; f++) {
                var g = d[f];
                if (b.call(c, g, f, d)) {
                  b = g;
                  break a;
                }
              }
              b = void 0;
            }
            return b;
          };
    },
    'es6'
  );
  ha(
    'String.prototype.startsWith',
    function (a) {
      return a
        ? a
        : function (b, c) {
            var d = ra(this, b, 'startsWith'),
              e = d.length,
              f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var g = 0; g < f && c < e; ) if (d[c++] != b[g++]) return !1;
            return g >= f;
          };
    },
    'es6'
  );
  function sa(a, b) {
    a instanceof String && (a += '');
    var c = 0,
      d = {
        next: function () {
          if (c < a.length) {
            var e = c++;
            return { value: b(e, a[e]), done: !1 };
          }
          d.next = function () {
            return { done: !0, value: void 0 };
          };
          return d.next();
        },
      };
    d[u(q.Symbol, 'iterator')] = function () {
      return d;
    };
    return d;
  }
  ha(
    'Array.prototype.keys',
    function (a) {
      return a
        ? a
        : function () {
            return sa(this, function (b) {
              return b;
            });
          };
    },
    'es6'
  );
  ha(
    'Array.prototype.values',
    function (a) {
      return a
        ? a
        : function () {
            return sa(this, function (b, c) {
              return c;
            });
          };
    },
    'es8'
  );
  function ta(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  var ua =
    ea && 'function' == typeof u(Object, 'assign')
      ? u(Object, 'assign')
      : function (a, b) {
          for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d) for (var e in d) ta(d, e) && (a[e] = d[e]);
          }
          return a;
        };
  ha(
    'Object.assign',
    function (a) {
      return a || ua;
    },
    'es6'
  );
  ha(
    'Promise',
    function (a) {
      function b(g) {
        this.b = 0;
        this.g = void 0;
        this.a = [];
        var h = this.c();
        try {
          g(h.resolve, h.reject);
        } catch (k) {
          h.reject(k);
        }
      }
      function c() {
        this.a = null;
      }
      function d(g) {
        return g instanceof b
          ? g
          : new b(function (h) {
              h(g);
            });
      }
      if (a) return a;
      c.prototype.b = function (g) {
        if (null == this.a) {
          this.a = [];
          var h = this;
          this.c(function () {
            h.g();
          });
        }
        this.a.push(g);
      };
      var e = da.setTimeout;
      c.prototype.c = function (g) {
        e(g, 0);
      };
      c.prototype.g = function () {
        for (; this.a && this.a.length; ) {
          var g = this.a;
          this.a = [];
          for (var h = 0; h < g.length; ++h) {
            var k = g[h];
            g[h] = null;
            try {
              k();
            } catch (l) {
              this.f(l);
            }
          }
        }
        this.a = null;
      };
      c.prototype.f = function (g) {
        this.c(function () {
          throw g;
        });
      };
      b.prototype.c = function () {
        function g(l) {
          return function (n) {
            k || ((k = !0), l.call(h, n));
          };
        }
        var h = this,
          k = !1;
        return { resolve: g(this.J), reject: g(this.f) };
      };
      b.prototype.J = function (g) {
        if (g === this)
          this.f(new TypeError('A Promise cannot resolve to itself'));
        else if (g instanceof b) this.K(g);
        else {
          a: switch (typeof g) {
            case 'object':
              var h = null != g;
              break a;
            case 'function':
              h = !0;
              break a;
            default:
              h = !1;
          }
          h ? this.D(g) : this.i(g);
        }
      };
      b.prototype.D = function (g) {
        var h = void 0;
        try {
          h = g.then;
        } catch (k) {
          this.f(k);
          return;
        }
        'function' == typeof h ? this.O(h, g) : this.i(g);
      };
      b.prototype.f = function (g) {
        this.o(2, g);
      };
      b.prototype.i = function (g) {
        this.o(1, g);
      };
      b.prototype.o = function (g, h) {
        if (0 != this.b)
          throw Error(
            'Cannot settle(' +
              g +
              ', ' +
              h +
              '): Promise already settled in state' +
              this.b
          );
        this.b = g;
        this.g = h;
        this.s();
      };
      b.prototype.s = function () {
        if (null != this.a) {
          for (var g = 0; g < this.a.length; ++g) f.b(this.a[g]);
          this.a = null;
        }
      };
      var f = new c();
      b.prototype.K = function (g) {
        var h = this.c();
        g.Z(h.resolve, h.reject);
      };
      b.prototype.O = function (g, h) {
        var k = this.c();
        try {
          g.call(h, k.resolve, k.reject);
        } catch (l) {
          k.reject(l);
        }
      };
      b.prototype.then = function (g, h) {
        function k(v, r) {
          return 'function' == typeof v
            ? function (A) {
                try {
                  l(v(A));
                } catch (t) {
                  n(t);
                }
              }
            : r;
        }
        var l,
          n,
          p = new b(function (v, r) {
            l = v;
            n = r;
          });
        this.Z(k(g, l), k(h, n));
        return p;
      };
      b.prototype.catch = function (g) {
        return this.then(void 0, g);
      };
      b.prototype.Z = function (g, h) {
        function k() {
          switch (l.b) {
            case 1:
              g(l.g);
              break;
            case 2:
              h(l.g);
              break;
            default:
              throw Error('Unexpected state: ' + l.b);
          }
        }
        var l = this;
        null == this.a ? f.b(k) : this.a.push(k);
      };
      b.resolve = d;
      b.reject = function (g) {
        return new b(function (h, k) {
          k(g);
        });
      };
      b.race = function (g) {
        return new b(function (h, k) {
          for (var l = w(g), n = l.next(); !n.done; n = l.next())
            d(n.value).Z(h, k);
        });
      };
      b.all = function (g) {
        var h = w(g),
          k = h.next();
        return k.done
          ? d([])
          : new b(function (l, n) {
              function p(A) {
                return function (t) {
                  v[A] = t;
                  r--;
                  0 == r && l(v);
                };
              }
              var v = [],
                r = 0;
              do
                v.push(void 0),
                  r++,
                  d(k.value).Z(p(v.length - 1), n),
                  (k = h.next());
              while (!k.done);
            });
      };
      return b;
    },
    'es6'
  );
  ha(
    'WeakMap',
    function (a) {
      function b(g) {
        this.a = (f += Math.random() + 1).toString();
        if (g) {
          g = w(g);
          for (var h; !(h = g.next()).done; )
            (h = h.value), this.set(h[0], h[1]);
        }
      }
      function c() {}
      function d(g) {
        var h = typeof g;
        return ('object' === h && null !== g) || 'function' === h;
      }
      if (
        (function () {
          if (!a || !Object.seal) return !1;
          try {
            var g = Object.seal({}),
              h = Object.seal({}),
              k = new a([
                [g, 2],
                [h, 3],
              ]);
            if (2 != k.get(g) || 3 != k.get(h)) return !1;
            k.delete(g);
            k.set(h, 4);
            return !k.has(g) && 4 == k.get(h);
          } catch (l) {
            return !1;
          }
        })()
      )
        return a;
      var e = '$jscomp_hidden_' + Math.random(),
        f = 0;
      b.prototype.set = function (g, h) {
        if (!d(g)) throw Error('Invalid WeakMap key');
        if (!ta(g, e)) {
          var k = new c();
          ba(g, e, { value: k });
        }
        if (!ta(g, e)) throw Error('WeakMap key fail: ' + g);
        g[e][this.a] = h;
        return this;
      };
      b.prototype.get = function (g) {
        return d(g) && ta(g, e) ? g[e][this.a] : void 0;
      };
      b.prototype.has = function (g) {
        return d(g) && ta(g, e) && ta(g[e], this.a);
      };
      b.prototype.delete = function (g) {
        return d(g) && ta(g, e) && ta(g[e], this.a) ? delete g[e][this.a] : !1;
      };
      return b;
    },
    'es6'
  );
  ha(
    'Map',
    function (a) {
      function b() {
        var h = {};
        return (h.C = h.next = h.head = h);
      }
      function c(h, k) {
        var l = h.a;
        return ia(function () {
          if (l) {
            for (; l.head != h.a; ) l = l.C;
            for (; l.next != l.head; )
              return (l = l.next), { done: !1, value: k(l) };
            l = null;
          }
          return { done: !0, value: void 0 };
        });
      }
      function d(h, k) {
        var l = k && typeof k;
        'object' == l || 'function' == l
          ? f.has(k)
            ? (l = f.get(k))
            : ((l = '' + ++g), f.set(k, l))
          : (l = 'p_' + k);
        var n = h.b[l];
        if (n && ta(h.b, l))
          for (h = 0; h < n.length; h++) {
            var p = n[h];
            if ((k !== k && p.key !== p.key) || k === p.key)
              return { id: l, list: n, index: h, j: p };
          }
        return { id: l, list: n, index: -1, j: void 0 };
      }
      function e(h) {
        this.b = {};
        this.a = b();
        this.size = 0;
        if (h) {
          h = w(h);
          for (var k; !(k = h.next()).done; )
            (k = k.value), this.set(k[0], k[1]);
        }
      }
      if (
        (function () {
          if (
            !a ||
            'function' != typeof a ||
            !a.prototype.entries ||
            'function' != typeof Object.seal
          )
            return !1;
          try {
            var h = Object.seal({ x: 4 }),
              k = new a(w([[h, 's']]));
            if (
              's' != k.get(h) ||
              1 != k.size ||
              k.get({ x: 4 }) ||
              k.set({ x: 4 }, 't') != k ||
              2 != k.size
            )
              return !1;
            var l = k.entries(),
              n = l.next();
            if (n.done || n.value[0] != h || 's' != n.value[1]) return !1;
            n = l.next();
            return n.done ||
              4 != n.value[0].x ||
              't' != n.value[1] ||
              !l.next().done
              ? !1
              : !0;
          } catch (p) {
            return !1;
          }
        })()
      )
        return a;
      var f = new q.WeakMap();
      e.prototype.set = function (h, k) {
        h = 0 === h ? 0 : h;
        var l = d(this, h);
        l.list || (l.list = this.b[l.id] = []);
        l.j
          ? (l.j.value = k)
          : ((l.j = {
              next: this.a,
              C: this.a.C,
              head: this.a,
              key: h,
              value: k,
            }),
            l.list.push(l.j),
            (this.a.C.next = l.j),
            (this.a.C = l.j),
            this.size++);
        return this;
      };
      e.prototype.delete = function (h) {
        h = d(this, h);
        return h.j && h.list
          ? (h.list.splice(h.index, 1),
            h.list.length || delete this.b[h.id],
            (h.j.C.next = h.j.next),
            (h.j.next.C = h.j.C),
            (h.j.head = null),
            this.size--,
            !0)
          : !1;
      };
      e.prototype.clear = function () {
        this.b = {};
        this.a = this.a.C = b();
        this.size = 0;
      };
      e.prototype.has = function (h) {
        return !!d(this, h).j;
      };
      e.prototype.get = function (h) {
        return (h = d(this, h).j) && h.value;
      };
      e.prototype.entries = function () {
        return c(this, function (h) {
          return [h.key, h.value];
        });
      };
      e.prototype.keys = function () {
        return c(this, function (h) {
          return h.key;
        });
      };
      e.prototype.values = function () {
        return c(this, function (h) {
          return h.value;
        });
      };
      e.prototype.forEach = function (h, k) {
        for (var l = this.entries(), n; !(n = l.next()).done; )
          (n = n.value), h.call(k, n[1], n[0], this);
      };
      e.prototype[u(q.Symbol, 'iterator')] = e.prototype.entries;
      var g = 0;
      return e;
    },
    'es6'
  );
  ha(
    'Set',
    function (a) {
      function b(c) {
        this.a = new q.Map();
        if (c) {
          c = w(c);
          for (var d; !(d = c.next()).done; ) this.add(d.value);
        }
        this.size = this.a.size;
      }
      if (
        (function () {
          if (
            !a ||
            'function' != typeof a ||
            !a.prototype.entries ||
            'function' != typeof Object.seal
          )
            return !1;
          try {
            var c = Object.seal({ x: 4 }),
              d = new a(w([c]));
            if (
              !d.has(c) ||
              1 != d.size ||
              d.add(c) != d ||
              1 != d.size ||
              d.add({ x: 4 }) != d ||
              2 != d.size
            )
              return !1;
            var e = d.entries(),
              f = e.next();
            if (f.done || f.value[0] != c || f.value[1] != c) return !1;
            f = e.next();
            return f.done ||
              f.value[0] == c ||
              4 != f.value[0].x ||
              f.value[1] != f.value[0]
              ? !1
              : e.next().done;
          } catch (g) {
            return !1;
          }
        })()
      )
        return a;
      b.prototype.add = function (c) {
        c = 0 === c ? 0 : c;
        this.a.set(c, c);
        this.size = this.a.size;
        return this;
      };
      b.prototype.delete = function (c) {
        c = this.a.delete(c);
        this.size = this.a.size;
        return c;
      };
      b.prototype.clear = function () {
        this.a.clear();
        this.size = 0;
      };
      b.prototype.has = function (c) {
        return this.a.has(c);
      };
      b.prototype.entries = function () {
        return this.a.entries();
      };
      b.prototype.values = function () {
        return u(this.a, 'values').call(this.a);
      };
      b.prototype.keys = u(b.prototype, 'values');
      b.prototype[u(q.Symbol, 'iterator')] = u(b.prototype, 'values');
      b.prototype.forEach = function (c, d) {
        var e = this;
        this.a.forEach(function (f) {
          return c.call(d, f, f, e);
        });
      };
      return b;
    },
    'es6'
  );
  var x = this || self;
  function va(a) {
    if (a && a != x) return wa(a.document);
    null === xa && (xa = wa(x.document));
    return xa;
  }
  var ya = /^[\w+/_-]+[=]{0,2}$/,
    xa = null;
  function wa(a) {
    return (a = a.querySelector && a.querySelector('script[nonce]')) &&
      (a = a.nonce || a.getAttribute('nonce')) &&
      ya.test(a)
      ? a
      : '';
  }
  function za(a) {
    a = a.split('.');
    for (var b = x, c = 0; c < a.length; c++)
      if (((b = b[a[c]]), null == b)) return null;
    return b;
  }
  function Aa() {}
  function Ba(a) {
    a.ha = void 0;
    a.h = function () {
      return a.ha ? a.ha : (a.ha = new a());
    };
  }
  function Ca(a) {
    var b = typeof a;
    return ('object' == b && null != a) || 'function' == b;
  }
  function Da(a) {
    return (
      (Object.prototype.hasOwnProperty.call(a, Fa) && a[Fa]) || (a[Fa] = ++Ga)
    );
  }
  var Fa = 'closure_uid_' + ((1e9 * Math.random()) >>> 0),
    Ga = 0;
  function Ha(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function Ia(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var e = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(e, d);
        return a.apply(b, e);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function Ja(a, b, c) {
    Function.prototype.bind &&
    -1 != Function.prototype.bind.toString().indexOf('native code')
      ? (Ja = Ha)
      : (Ja = Ia);
    return Ja.apply(null, arguments);
  }
  function Ka(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  var La = Date.now;
  function y(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
  }
  function Ma(a) {
    return a;
  }
  var Na = new Date().getTime();
  function Oa(a, b) {
    for (
      var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0;
      e < c;
      e++
    )
      e in d && b.call(void 0, d[e], e, a);
  }
  function Pa(a, b) {
    for (
      var c = a.length,
        d = [],
        e = 0,
        f = 'string' === typeof a ? a.split('') : a,
        g = 0;
      g < c;
      g++
    )
      if (g in f) {
        var h = f[g];
        b.call(void 0, h, g, a) && (d[e++] = h);
      }
    return d;
  }
  function Qa(a, b) {
    for (
      var c = a.length,
        d = Array(c),
        e = 'string' === typeof a ? a.split('') : a,
        f = 0;
      f < c;
      f++
    )
      f in e && (d[f] = b.call(void 0, e[f], f, a));
    return d;
  }
  function Ra(a, b) {
    for (
      var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0;
      e < c;
      e++
    )
      if (e in d && b.call(void 0, d[e], e, a)) return !0;
    return !1;
  }
  function Sa(a, b) {
    a: {
      for (
        var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0;
        e < c;
        e++
      )
        if (e in d && b.call(void 0, d[e], e, a)) {
          b = e;
          break a;
        }
      b = -1;
    }
    return 0 > b ? null : 'string' === typeof a ? a.charAt(b) : a[b];
  }
  function Ta(a, b) {
    a: {
      for (
        var c = 'string' === typeof a ? a.split('') : a, d = a.length - 1;
        0 <= d;
        d--
      )
        if (d in c && b.call(void 0, c[d], d, a)) {
          b = d;
          break a;
        }
      b = -1;
    }
    return 0 > b ? null : 'string' === typeof a ? a.charAt(b) : a[b];
  }
  function Ua(a, b) {
    a: if ('string' === typeof a)
      a = 'string' !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
    else {
      for (var c = 0; c < a.length; c++)
        if (c in a && a[c] === b) {
          a = c;
          break a;
        }
      a = -1;
    }
    return 0 <= a;
  }
  function Va(a) {
    return function () {
      return !a.apply(this, arguments);
    };
  }
  function Wa(a) {
    var b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  }
  function Xa(a) {
    var b = a;
    return function () {
      if (b) {
        var c = b;
        b = null;
        c();
      }
    };
  }
  function Ya(a, b) {
    var c = {},
      d;
    for (d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
    return c;
  }
  function Za(a, b) {
    for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
    return !1;
  }
  function $a(a, b) {
    return null !== a && b in a;
  }
  function ab(a, b) {
    for (var c in a) if (b.call(void 0, a[c], c, a)) return c;
  }
  function bb(a) {
    var b = {},
      c;
    for (c in a) b[c] = a[c];
    return b;
  }
  var cb;
  function db() {
    if (void 0 === cb) {
      var a = null,
        b = x.trustedTypes;
      if (b && b.createPolicy) {
        try {
          a = b.createPolicy('goog#html', {
            createHTML: Ma,
            createScript: Ma,
            createScriptURL: Ma,
          });
        } catch (c) {
          x.console && x.console.error(c.message);
        }
        cb = a;
      } else cb = a;
    }
    return cb;
  }
  function eb(a, b) {
    this.c = (a === fb && b) || '';
    this.f = gb;
  }
  eb.prototype.b = !0;
  eb.prototype.a = function () {
    return this.c;
  };
  function hb(a) {
    return a instanceof eb && a.constructor === eb && a.f === gb
      ? a.c
      : 'type_error:Const';
  }
  var gb = {},
    fb = {};
  var ib = {};
  function jb(a, b) {
    this.c = b === ib ? a : '';
    this.b = !0;
  }
  function kb(a, b) {
    for (var c = [], d = 1; d < arguments.length; d++)
      c.push(JSON.stringify(arguments[d]).replace(/</g, '\\x3c'));
    c = '(' + hb(a) + ')(' + c.join(', ') + ');';
    c = (d = db()) ? d.createScript(c) : c;
    return new jb(c, ib);
  }
  jb.prototype.a = function () {
    return this.c.toString();
  };
  function lb(a) {
    return a instanceof jb && a.constructor === jb
      ? a.c
      : 'type_error:SafeScript';
  }
  function mb(a, b) {
    this.c = (a === nb && b) || '';
    this.f = ob;
  }
  mb.prototype.b = !0;
  mb.prototype.a = function () {
    return this.c.toString();
  };
  function pb(a) {
    return a instanceof mb && a.constructor === mb && a.f === ob
      ? a.c
      : 'type_error:TrustedResourceUrl';
  }
  function qb() {
    var a = {},
      b = hb(
        new eb(fb, 'https://pagead2.googlesyndication.com/pagead/gen_204')
      );
    if (!rb.test(b)) throw Error('Invalid TrustedResourceUrl format: ' + b);
    var c = b.replace(sb, function (d, e) {
      if (!Object.prototype.hasOwnProperty.call(a, e))
        throw Error(
          'Found marker, "' +
            e +
            '", in format string, "' +
            b +
            '", but no valid label mapping found in args: ' +
            JSON.stringify(a)
        );
      d = a[e];
      return d instanceof eb ? hb(d) : encodeURIComponent(String(d));
    });
    return tb(c);
  }
  var sb = /%{(\w+)}/g,
    rb = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i,
    ub = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
  function vb(a) {
    var b = qb();
    b = ub.exec(pb(b).toString());
    var c = b[3] || '';
    return tb(b[1] + wb('?', b[2] || '', a) + wb('#', c, void 0));
  }
  var ob = {};
  function tb(a) {
    var b = db();
    a = b ? b.createScriptURL(a) : a;
    return new mb(nb, a);
  }
  function wb(a, b, c) {
    if (null == c) return b;
    if ('string' === typeof c) return c ? a + encodeURIComponent(c) : '';
    for (var d in c)
      if (Object.prototype.hasOwnProperty.call(c, d)) {
        var e = c[d];
        e = Array.isArray(e) ? e : [e];
        for (var f = 0; f < e.length; f++) {
          var g = e[f];
          null != g &&
            (b || (b = a),
            (b +=
              (b.length > a.length ? '&' : '') +
              encodeURIComponent(d) +
              '=' +
              encodeURIComponent(String(g))));
        }
      }
    return b;
  }
  var nb = {};
  function xb(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
  }
  var yb = /&/g,
    zb = /</g,
    Ab = />/g,
    Bb = /"/g,
    Cb = /'/g,
    Db = /\x00/g;
  function Eb(a, b) {
    var c = 0;
    a = xb(String(a)).split('.');
    b = xb(String(b)).split('.');
    for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
      var f = a[e] || '',
        g = b[e] || '';
      do {
        f = /(\d*)(\D*)(.*)/.exec(f) || ['', '', '', ''];
        g = /(\d*)(\D*)(.*)/.exec(g) || ['', '', '', ''];
        if (0 == f[0].length && 0 == g[0].length) break;
        c =
          Fb(
            0 == f[1].length ? 0 : parseInt(f[1], 10),
            0 == g[1].length ? 0 : parseInt(g[1], 10)
          ) ||
          Fb(0 == f[2].length, 0 == g[2].length) ||
          Fb(f[2], g[2]);
        f = f[3];
        g = g[3];
      } while (0 == c);
    }
    return c;
  }
  function Fb(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function Gb(a, b) {
    this.c = (a === Hb && b) || '';
    this.f = Ib;
  }
  Gb.prototype.b = !0;
  Gb.prototype.a = function () {
    return this.c.toString();
  };
  function Jb(a) {
    return a instanceof Gb && a.constructor === Gb && a.f === Ib
      ? a.c
      : 'type_error:SafeUrl';
  }
  var Kb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    Ib = {},
    Hb = {};
  var Lb;
  a: {
    var Mb = x.navigator;
    if (Mb) {
      var Nb = Mb.userAgent;
      if (Nb) {
        Lb = Nb;
        break a;
      }
    }
    Lb = '';
  }
  function z(a) {
    return -1 != Lb.indexOf(a);
  }
  function Ob(a) {
    for (
      var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d;
      (d = b.exec(a));

    )
      c.push([d[1], d[2], d[3] || void 0]);
    return c;
  }
  function Pb() {
    return (z('Chrome') || z('CriOS')) && !z('Edge');
  }
  function Qb() {
    function a(e) {
      e = Sa(e, d);
      return c[e] || '';
    }
    var b = Lb;
    if (z('Trident') || z('MSIE')) return Rb(b);
    b = Ob(b);
    var c = {};
    Oa(b, function (e) {
      c[e[0]] = e[1];
    });
    var d = Ka($a, c);
    return z('Opera')
      ? a(['Version', 'Opera'])
      : z('Edge')
      ? a(['Edge'])
      : z('Edg/')
      ? a(['Edg'])
      : Pb()
      ? a(['Chrome', 'CriOS', 'HeadlessChrome'])
      : ((b = b[2]) && b[1]) || '';
  }
  function Rb(a) {
    var b = /rv: *([\d\.]*)/.exec(a);
    if (b && b[1]) return b[1];
    b = '';
    var c = /MSIE +([\d\.]+)/.exec(a);
    if (c && c[1])
      if (((a = /Trident\/(\d.\d)/.exec(a)), '7.0' == c[1]))
        if (a && a[1])
          switch (a[1]) {
            case '4.0':
              b = '8.0';
              break;
            case '5.0':
              b = '9.0';
              break;
            case '6.0':
              b = '10.0';
              break;
            case '7.0':
              b = '11.0';
          }
        else b = '7.0';
      else b = c[1];
    return b;
  }
  function Sb() {
    this.c = '';
    this.f = Tb;
  }
  Sb.prototype.b = !0;
  Sb.prototype.a = function () {
    return this.c.toString();
  };
  function Ub(a) {
    return a instanceof Sb && a.constructor === Sb && a.f === Tb
      ? a.c
      : 'type_error:SafeHtml';
  }
  var Tb = {},
    Vb = new Sb();
  Vb.c =
    x.trustedTypes && x.trustedTypes.emptyHTML ? x.trustedTypes.emptyHTML : '';
  var Wb = Wa(function () {
    var a = document.createElement('div'),
      b = document.createElement('div');
    b.appendChild(document.createElement('div'));
    a.appendChild(b);
    b = a.firstChild.firstChild;
    a.innerHTML = Ub(Vb);
    return !b.parentElement;
  });
  function Xb(a, b) {
    if (Wb()) for (; a.lastChild; ) a.removeChild(a.lastChild);
    a.innerHTML = Ub(b);
  }
  function Yb(a) {
    var b = va(a.ownerDocument && a.ownerDocument.defaultView);
    b && a.setAttribute('nonce', b);
  }
  var Zb = {
      '\x00': '\\0',
      '\b': '\\b',
      '\f': '\\f',
      '\n': '\\n',
      '\r': '\\r',
      '\t': '\\t',
      '\x0B': '\\x0B',
      '"': '\\"',
      '\\': '\\\\',
      '<': '\\u003C',
    },
    $b = { "'": "\\'" };
  function ac(a) {
    return String(a).replace(/\-([a-z])/g, function (b, c) {
      return c.toUpperCase();
    });
  }
  function bc() {
    return z('iPhone') && !z('iPod') && !z('iPad');
  }
  function cc(a) {
    cc[' '](a);
    return a;
  }
  cc[' '] = Aa;
  var dc = bc() || z('iPod'),
    ec =
      z('Safari') &&
      !(
        Pb() ||
        z('Coast') ||
        z('Opera') ||
        z('Edge') ||
        z('Edg/') ||
        z('OPR') ||
        z('Firefox') ||
        z('FxiOS') ||
        z('Silk') ||
        z('Android')
      ) &&
      !(bc() || z('iPad') || z('iPod'));
  var fc = {},
    gc = null;
  function B() {}
  var hc = 'function' == typeof Uint8Array;
  function C(a, b, c, d) {
    a.b = null;
    b || (b = []);
    a.s = void 0;
    a.f = -1;
    a.a = b;
    a: {
      if ((b = a.a.length)) {
        --b;
        var e = a.a[b];
        if (
          !(
            null === e ||
            'object' != typeof e ||
            Array.isArray(e) ||
            (hc && e instanceof Uint8Array)
          )
        ) {
          a.g = b - a.f;
          a.c = e;
          break a;
        }
      }
      a.g = Number.MAX_VALUE;
    }
    a.o = {};
    if (c)
      for (b = 0; b < c.length; b++)
        (e = c[b]),
          e < a.g
            ? ((e += a.f), (a.a[e] = a.a[e] || ic))
            : (jc(a), (a.c[e] = a.c[e] || ic));
    if (d && d.length) for (b = 0; b < d.length; b++) kc(a, d[b]);
  }
  var ic = [];
  function jc(a) {
    var b = a.g + a.f;
    a.a[b] || (a.c = a.a[b] = {});
  }
  function D(a, b) {
    if (b < a.g) {
      b += a.f;
      var c = a.a[b];
      return c === ic ? (a.a[b] = []) : c;
    }
    if (a.c) return (c = a.c[b]), c === ic ? (a.c[b] = []) : c;
  }
  function lc(a, b) {
    a = D(a, b);
    return null == a ? a : +a;
  }
  function mc(a, b) {
    a = D(a, b);
    return null == a ? a : !!a;
  }
  function E(a, b, c) {
    a = D(a, b);
    return null == a ? c : a;
  }
  function nc(a, b) {
    a = mc(a, b);
    return null == a ? !1 : a;
  }
  function oc(a, b) {
    a = lc(a, b);
    return null == a ? 0 : a;
  }
  function pc(a, b, c) {
    b < a.g ? (a.a[b + a.f] = c) : (jc(a), (a.c[b] = c));
    return a;
  }
  function kc(a, b) {
    for (var c, d, e = 0; e < b.length; e++) {
      var f = b[e],
        g = D(a, f);
      null != g && ((c = f), (d = g), pc(a, f, void 0));
    }
    return c ? (pc(a, c, d), c) : 0;
  }
  function G(a, b, c) {
    a.b || (a.b = {});
    if (!a.b[c]) {
      var d = D(a, c);
      d && (a.b[c] = new b(d));
    }
    return a.b[c];
  }
  function H(a, b, c) {
    a.b || (a.b = {});
    if (!a.b[c]) {
      for (var d = D(a, c), e = [], f = 0; f < d.length; f++)
        e[f] = new b(d[f]);
      a.b[c] = e;
    }
    b = a.b[c];
    b == ic && (b = a.b[c] = []);
    return b;
  }
  B.prototype.i = hc
    ? function () {
        var a = Uint8Array.prototype.toJSON;
        Uint8Array.prototype.toJSON = function () {
          var b;
          void 0 === b && (b = 0);
          if (!gc) {
            gc = {};
            for (
              var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
                  ''
                ),
                d = ['+/=', '+/', '-_=', '-_.', '-_'],
                e = 0;
              5 > e;
              e++
            ) {
              var f = c.concat(d[e].split(''));
              fc[e] = f;
              for (var g = 0; g < f.length; g++) {
                var h = f[g];
                void 0 === gc[h] && (gc[h] = g);
              }
            }
          }
          b = fc[b];
          c = [];
          for (d = 0; d < this.length; d += 3) {
            var k = this[d],
              l = (e = d + 1 < this.length) ? this[d + 1] : 0;
            h = (f = d + 2 < this.length) ? this[d + 2] : 0;
            g = k >> 2;
            k = ((k & 3) << 4) | (l >> 4);
            l = ((l & 15) << 2) | (h >> 6);
            h &= 63;
            f || ((h = 64), e || (l = 64));
            c.push(b[g], b[k], b[l] || '', b[h] || '');
          }
          return c.join('');
        };
        try {
          return JSON.stringify(this.a && this.a, qc);
        } finally {
          Uint8Array.prototype.toJSON = a;
        }
      }
    : function () {
        return JSON.stringify(this.a && this.a, qc);
      };
  function qc(a, b) {
    return 'number' !== typeof b ||
      (!isNaN(b) && Infinity !== b && -Infinity !== b)
      ? b
      : String(b);
  }
  function rc(a) {
    C(this, a, sc, null);
  }
  y(rc, B);
  function tc(a) {
    C(this, a, null, null);
  }
  y(tc, B);
  var sc = [2, 3];
  function uc(a) {
    C(this, a, null, null);
  }
  y(uc, B);
  function I(a) {
    a.google_ad_modifications || (a.google_ad_modifications = {});
    return a.google_ad_modifications;
  }
  function vc(a) {
    a = I(a);
    a.eids || (a.eids = []);
    return a.eids;
  }
  function wc(a, b) {
    a = I(a);
    a.tag_partners = a.tag_partners || [];
    a.tag_partners.push(b);
  }
  function xc(a) {
    I(J).allow_second_reactive_tag = a;
  }
  function yc(a, b, c) {
    for (var d = 0; d < a.length; ++d)
      if ((a[d].ad_slot || b) == b && (a[d].ad_tag_origin || c) == c)
        return a[d];
    return null;
  }
  var zc = {},
    Ac =
      ((zc.google_ad_client = !0),
      (zc.google_ad_host = !0),
      (zc.google_ad_host_channel = !0),
      (zc.google_adtest = !0),
      (zc.google_tag_for_child_directed_treatment = !0),
      (zc.google_tag_for_under_age_of_consent = !0),
      (zc.google_tag_partner = !0),
      (zc.google_restrict_data_processing = !0),
      (zc.google_page_url = !0),
      (zc.google_adbreak_test = !0),
      (zc.google_ad_frequency_hint = !0),
      zc);
  var Bc = document,
    J = window;
  var Cc = {
    '120x90': !0,
    '160x90': !0,
    '180x90': !0,
    '200x90': !0,
    '468x15': !0,
    '728x15': !0,
  };
  function Dc(a, b) {
    if (15 == b) {
      if (728 <= a) return 728;
      if (468 <= a) return 468;
    } else if (90 == b) {
      if (200 <= a) return 200;
      if (180 <= a) return 180;
      if (160 <= a) return 160;
      if (120 <= a) return 120;
    }
    return null;
  }
  function Ec(a) {
    this.a = a || { cookie: '' };
  }
  Ec.prototype.set = function (a, b, c) {
    var d = !1;
    if ('object' === typeof c) {
      var e = c.Za;
      d = c.Ta || !1;
      var f = c.domain || void 0;
      var g = c.path || void 0;
      var h = c.ua;
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    c = f ? ';domain=' + f : '';
    g = g ? ';path=' + g : '';
    d = d ? ';secure' : '';
    h =
      0 > h
        ? ''
        : 0 == h
        ? ';expires=' + new Date(1970, 1, 1).toUTCString()
        : ';expires=' + new Date(La() + 1e3 * h).toUTCString();
    this.a.cookie =
      a + '=' + b + c + g + h + d + (null != e ? ';samesite=' + e : '');
  };
  Ec.prototype.get = function (a, b) {
    for (
      var c = a + '=', d = (this.a.cookie || '').split(';'), e = 0, f;
      e < d.length;
      e++
    ) {
      f = xb(d[e]);
      if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
      if (f == a) return '';
    }
    return b;
  };
  function Fc(a, b, c) {
    a.addEventListener && a.addEventListener(b, c, !1);
  }
  function Gc(a, b) {
    b = String(b);
    'application/xhtml+xml' === a.contentType && (b = b.toLowerCase());
    return a.createElement(b);
  }
  function Hc(a) {
    this.a = a || x.document || document;
  }
  Hc.prototype.contains = function (a, b) {
    if (!a || !b) return !1;
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
    if ('undefined' != typeof a.compareDocumentPosition)
      return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b; ) b = b.parentNode;
    return b == a;
  };
  function Ic(a) {
    Jc();
    var b = new Sb(),
      c = db();
    b.c = c ? c.createHTML(a) : a;
    return b;
  }
  function Kc(a) {
    Jc();
    return tb(a);
  }
  var Jc = Aa;
  function Lc() {
    return !Mc() && (z('iPod') || z('iPhone') || z('Android') || z('IEMobile'));
  }
  function Mc() {
    return z('iPad') || (z('Android') && !z('Mobile')) || z('Silk');
  }
  function Nc(a, b, c) {
    if (Array.isArray(b))
      for (var d = 0; d < b.length; d++) Nc(a, String(b[d]), c);
    else
      null != b &&
        c.push(a + ('' === b ? '' : '=' + encodeURIComponent(String(b))));
  }
  function Oc(a) {
    try {
      var b;
      if ((b = !!a && null != a.location.href))
        a: {
          try {
            cc(a.foo);
            b = !0;
            break a;
          } catch (c) {}
          b = !1;
        }
      return b;
    } catch (c) {
      return !1;
    }
  }
  function Pc(a) {
    for (var b = x, c = 0; b && 40 > c++ && (!Oc(b) || !a(b)); ) b = Qc(b);
  }
  function Rc() {
    var a = x;
    Pc(function (b) {
      a = b;
      return !1;
    });
    return a;
  }
  function Qc(a) {
    try {
      var b = a.parent;
      if (b && b != a) return b;
    } catch (c) {}
    return null;
  }
  function Sc(a, b, c) {
    var d = a.createElement('script');
    (void 0 === c ? 0 : c) && d.setAttribute('crossorigin', 'anonymous');
    b = 'string' === typeof b ? Kc(b) : b;
    d.src = pb(b);
    Yb(d);
    return (a = a.getElementsByTagName('script')[0]) && a.parentNode
      ? (a.parentNode.insertBefore(d, a), d)
      : null;
  }
  function Tc(a, b) {
    return b.getComputedStyle ? b.getComputedStyle(a, null) : a.currentStyle;
  }
  function Uc(a, b) {
    if (!Vc() && !Wc()) {
      var c = Math.random();
      if (c < b) return (c = Xc(x)), a[Math.floor(c * a.length)];
    }
    return null;
  }
  function Xc(a) {
    if (!a.crypto) return Math.random();
    try {
      var b = new Uint32Array(1);
      a.crypto.getRandomValues(b);
      return b[0] / 65536 / 65536;
    } catch (c) {
      return Math.random();
    }
  }
  function Yc(a, b) {
    if (a)
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) &&
          b.call(void 0, a[c], c, a);
  }
  function Zc(a) {
    return ab(a, function (b, c) {
      return Object.prototype.hasOwnProperty.call(a, c) && !0;
    });
  }
  function $c(a) {
    var b = a.length;
    if (0 == b) return 0;
    for (var c = 305419896, d = 0; d < b; d++)
      c ^= ((c << 5) + (c >> 2) + a.charCodeAt(d)) & 4294967295;
    return 0 < c ? c : 4294967296 + c;
  }
  var Wc = Wa(function () {
    return (
      Ra(
        [
          'Google Web Preview',
          'Mediapartners-Google',
          'Google-Read-Aloud',
          'Google-Adwords',
        ],
        ad
      ) || 1e-4 > Math.random()
    );
  });
  function bd(a, b) {
    var c = -1;
    try {
      a && (c = parseInt(a.getItem(b), 10));
    } catch (d) {
      return null;
    }
    return 0 <= c && 1e3 > c ? c : null;
  }
  function cd(a, b, c) {
    a = Wc() ? null : Math.floor(1e3 * Xc(a));
    var d;
    if ((d = null != a && b))
      a: {
        var e = String(a);
        try {
          if (b) {
            b.setItem(c, e);
            d = e;
            break a;
          }
        } catch (f) {}
        d = null;
      }
    return d ? a : null;
  }
  var Vc = Wa(function () {
    return ad('MSIE');
  });
  function ad(a) {
    return -1 != Lb.indexOf(a);
  }
  var dd = /^([0-9.]+)px$/,
    ed = /^(-?[0-9.]{1,30})$/;
  function fd(a) {
    return ed.test(a) && ((a = Number(a)), !isNaN(a)) ? a : null;
  }
  function gd(a, b) {
    return b ? !/^false$/.test(a) : /^true$/.test(a);
  }
  function K(a) {
    return (a = dd.exec(a)) ? +a[1] : null;
  }
  function hd(a, b) {
    for (var c = 0; 50 > c; ++c) {
      try {
        var d = !(!a.frames || !a.frames[b]);
      } catch (e) {
        d = !1;
      }
      if (d) return a;
      if (!(a = Qc(a))) break;
    }
    return null;
  }
  var id = Wa(function () {
    return Lc() ? 2 : Mc() ? 1 : 0;
  });
  function jd(a) {
    var b = { display: 'none' };
    a.style.setProperty
      ? Yc(b, function (c, d) {
          a.style.setProperty(d, c, 'important');
        })
      : (a.style.cssText = kd(
          ld(
            md(a.style.cssText),
            nd(b, function (c) {
              return c + ' !important';
            })
          )
        ));
  }
  var ld =
    u(Object, 'assign') ||
    function (a, b) {
      for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (d)
          for (var e in d)
            Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
      }
      return a;
    };
  function nd(a, b) {
    var c = {},
      d;
    for (d in a)
      Object.prototype.hasOwnProperty.call(a, d) &&
        (c[d] = b.call(void 0, a[d], d, a));
    return c;
  }
  function kd(a) {
    var b = [];
    Yc(a, function (c, d) {
      null != c && '' !== c && b.push(d + ':' + c);
    });
    return b.length ? b.join(';') + ';' : '';
  }
  function md(a) {
    var b = {};
    if (a) {
      var c = /\s*:\s*/;
      Oa((a || '').split(/\s*;\s*/), function (d) {
        if (d) {
          var e = d.split(c);
          d = e[0];
          e = e[1];
          d && e && (b[d.toLowerCase()] = e);
        }
      });
    }
    return b;
  }
  var od = [];
  function pd() {
    var a = od;
    od = [];
    a = w(a);
    for (var b = a.next(); !b.done; b = a.next()) {
      b = b.value;
      try {
        b();
      } catch (c) {}
    }
  }
  function qd() {
    if ('number' !== typeof x.goog_pvsid)
      try {
        Object.defineProperty(x, 'goog_pvsid', {
          value: Math.floor(Math.random() * Math.pow(2, 52)),
        });
      } catch (a) {}
    return Number(x.goog_pvsid) || -1;
  }
  function rd(a) {
    'complete' === Bc.readyState || 'interactive' === Bc.readyState
      ? (od.push(a),
        1 == od.length &&
          (q.Promise
            ? q.Promise.resolve().then(pd)
            : window.setImmediate
            ? setImmediate(pd)
            : setTimeout(pd, 0)))
      : Bc.addEventListener('DOMContentLoaded', a);
  }
  function sd(a) {
    C(this, a, null, null);
  }
  y(sd, B);
  function td(a, b) {
    a = parseInt(a, 10);
    return isNaN(a) ? b : a;
  }
  function ud() {
    return 'r20200810';
  }
  var vd = gd('false', !1),
    wd = gd('false', !1);
  function xd() {}
  function yd(a) {
    a = void 0 === a ? x : a;
    var b = a.context || a.AMP_CONTEXT_DATA;
    if (!b)
      try {
        b = a.parent.context || a.parent.AMP_CONTEXT_DATA;
      } catch (c) {}
    try {
      if (b && b.pageViewId && b.canonicalUrl) return b;
    } catch (c) {}
    return null;
  }
  function zd(a) {
    return (a = a || yd()) ? (Oc(a.master) ? a.master : null) : null;
  }
  function Ad(a, b, c) {
    Bd(a, b, void 0 === c ? null : c);
  }
  function Bd(a, b, c) {
    a.google_image_requests || (a.google_image_requests = []);
    var d = a.document.createElement('img');
    if (c) {
      var e = function (f) {
        c && c(f);
        d.removeEventListener && d.removeEventListener('load', e, !1);
        d.removeEventListener && d.removeEventListener('error', e, !1);
      };
      Fc(d, 'load', e);
      Fc(d, 'error', e);
    }
    d.src = b;
    a.google_image_requests.push(d);
  }
  function Cd(a, b) {
    var c = 'https://pagead2.googlesyndication.com/pagead/gen_204?id=' + b;
    Yc(a, function (d, e) {
      d && (c += '&' + e + '=' + encodeURIComponent(d));
    });
    Dd(c);
  }
  function Dd(a) {
    var b = window;
    b.fetch
      ? b.fetch(a, {
          keepalive: !0,
          credentials: 'include',
          redirect: 'follow',
          method: 'get',
          mode: 'no-cors',
        })
      : Ad(b, a);
  }
  var Ed = {};
  function Fd() {}
  function Gd(a, b) {
    if (b !== Ed) throw Error('Bad secret');
    this.a = a;
  }
  qa(Gd, Fd);
  Gd.prototype.toString = function () {
    return this.a;
  };
  new Gd('about:blank', Ed);
  new Gd('about:invalid#zTSz', Ed);
  function Hd(a, b) {
    if (a)
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) &&
          b.call(void 0, a[c], c, a);
  }
  function Id(a) {
    return !(!a || !a.call) && 'function' === typeof a;
  }
  function Jd(a) {
    var b = void 0 === b ? 1 : b;
    a = zd(yd(a)) || a;
    a.google_unique_id = (a.google_unique_id || 0) + b;
  }
  function Kd(a) {
    a = a.google_unique_id;
    return 'number' === typeof a ? a : 0;
  }
  function Ld(a) {
    a = zd(yd(a)) || a;
    a = a.google_unique_id;
    return 'number' === typeof a ? a : 0;
  }
  var Md = !!window.google_async_iframe_id,
    Nd = (Md && window.parent) || window;
  function Od() {
    if (Md && !Oc(Nd)) {
      var a = '.' + Bc.domain;
      try {
        for (; 2 < a.split('.').length && !Oc(Nd); )
          (Bc.domain = a = a.substr(a.indexOf('.') + 1)), (Nd = window.parent);
      } catch (b) {}
      Oc(Nd) || (Nd = window);
    }
    return Nd;
  }
  var Pd = /(^| )adsbygoogle($| )/;
  function Qd(a) {
    return (vd && a.google_top_window) || a.top;
  }
  function Rd(a) {
    a = Qd(a);
    return Oc(a) ? a : null;
  }
  function Sd(a, b) {
    if (!a) return !1;
    a = a.hash;
    if (!a || !a.indexOf) return !1;
    if (-1 != a.indexOf(b)) return !0;
    b = Td(b);
    return 'go' != b && -1 != a.indexOf(b) ? !0 : !1;
  }
  function Td(a) {
    var b = '';
    Hd(a.split('_'), function (c) {
      b += c.substr(0, 2);
    });
    return b;
  }
  var Ud = td('2012', 2012);
  function Vd(a) {
    C(this, a, Wd, Xd);
  }
  y(Vd, B);
  var Wd = [2, 8],
    Xd = [
      [3, 4, 5],
      [6, 7],
    ];
  function Yd(a) {
    return null != a ? !a : a;
  }
  function Zd(a, b) {
    for (var c = !1, d = 0; d < a.length; d++) {
      var e = a[d].call();
      if (e == b) return e;
      null == e && (c = !0);
    }
    if (!c) return !b;
  }
  function $d(a, b) {
    var c = H(a, Vd, 2);
    if (!c.length) return ae(a, b);
    a = E(a, 1, 0);
    if (1 == a) return Yd($d(c[0], b));
    c = Qa(c, function (d) {
      return function () {
        return $d(d, b);
      };
    });
    switch (a) {
      case 2:
        return Zd(c, !1);
      case 3:
        return Zd(c, !0);
    }
  }
  function ae(a, b) {
    var c = kc(a, Xd[0]);
    a: {
      switch (c) {
        case 3:
          var d = E(a, 3, 0);
          break a;
        case 4:
          d = E(a, 4, 0);
          break a;
        case 5:
          d = E(a, 5, 0);
          break a;
      }
      d = void 0;
    }
    if (d && (b = (b = b[c]) && b[d])) {
      try {
        var e = b.apply(null, D(a, 8));
      } catch (f) {
        return;
      }
      b = E(a, 1, 0);
      if (4 == b) return !!e;
      d = null != e;
      if (5 == b) return d;
      if (12 == b) a = E(a, 7, '');
      else
        a: {
          switch (c) {
            case 4:
              a = oc(a, 6);
              break a;
            case 5:
              a = E(a, 7, '');
              break a;
          }
          a = void 0;
        }
      if (null != a) {
        if (6 == b) return e === a;
        if (9 == b) return 0 == Eb(e, a);
        if (d)
          switch (b) {
            case 7:
              return e < a;
            case 8:
              return e > a;
            case 12:
              return new RegExp(a).test(e);
            case 10:
              return -1 == Eb(e, a);
            case 11:
              return 1 == Eb(e, a);
          }
      }
    }
  }
  function be(a, b) {
    return !a || !(!b || !$d(a, b));
  }
  function ce(a) {
    C(this, a, de, null);
  }
  y(ce, B);
  var de = [4];
  function ee(a) {
    C(this, a, fe, ge);
  }
  y(ee, B);
  function he(a) {
    C(this, a, null, null);
  }
  y(he, B);
  var fe = [5],
    ge = [[1, 2, 3, 6, 7]];
  function ie() {
    var a = {};
    this.a = ((a[3] = {}), (a[4] = {}), (a[5] = {}), a);
  }
  Ba(ie);
  var je = gd('false', !1);
  function ke(a, b) {
    switch (b) {
      case 1:
        return E(a, 1, 0);
      case 2:
        return E(a, 2, 0);
      case 3:
        return E(a, 3, 0);
      case 6:
        return E(a, 6, 0);
      default:
        return null;
    }
  }
  function le(a, b) {
    if (!a) return null;
    switch (b) {
      case 1:
        return nc(a, 1);
      case 7:
        return E(a, 3, '');
      case 2:
        return oc(a, 2);
      case 3:
        return E(a, 3, '');
      case 6:
        return D(a, 4);
      default:
        return null;
    }
  }
  var me = Wa(function () {
    if (!je) return {};
    try {
      var a = window.sessionStorage && window.sessionStorage.getItem('GGDFSSK');
      if (a) return JSON.parse(a);
    } catch (b) {}
    return {};
  });
  function ne(a, b, c, d) {
    d = void 0 === d ? 0 : d;
    var e = me();
    if (e[a] && null != e[a][b]) return e[a][b];
    b = oe(d)[a][b];
    if (!b) return c;
    b = new ee(b);
    b = pe(b);
    a = le(b, a);
    return null != a ? a : c;
  }
  function pe(a) {
    var b = ie.h().a;
    if (b) {
      var c = Ta(H(a, he, 5), function (d) {
        return be(G(d, Vd, 1), b);
      });
      if (c) return G(c, ce, 2);
    }
    return G(a, ce, 4);
  }
  function qe() {
    this.a = {};
    this.b = [];
  }
  Ba(qe);
  function re(a, b, c) {
    return !!ne(1, a, void 0 === b ? !1 : b, c);
  }
  function se(a, b, c) {
    b = void 0 === b ? 0 : b;
    a = Number(ne(2, a, b, c));
    return isNaN(a) ? b : a;
  }
  function te(a, b, c) {
    return ne(3, a, void 0 === b ? '' : b, c);
  }
  function ue(a, b, c) {
    b = void 0 === b ? [] : b;
    return ne(6, a, b, c);
  }
  function oe(a) {
    var b = {};
    return (
      qe.h().a[a] ||
      (qe.h().a[a] = ((b[1] = {}), (b[2] = {}), (b[3] = {}), (b[6] = {}), b))
    );
  }
  function ve(a, b) {
    var c = oe(b);
    Yc(a, function (d, e) {
      return Yc(d, function (f, g) {
        return (c[e][g] = f);
      });
    });
  }
  function we(a, b) {
    var c = oe(b);
    Oa(a, function (d) {
      var e = kc(d, ge[0]),
        f = ke(d, e);
      f && (c[e][f] = d.a);
    });
  }
  function xe(a, b) {
    var c = oe(b);
    Oa(a, function (d) {
      var e = new ee(d),
        f = kc(e, ge[0]);
      (e = ke(e, f)) && (c[f][e] || (c[f][e] = d));
    });
  }
  function ye() {
    return Qa(u(Object, 'keys').call(Object, qe.h().a), function (a) {
      return Number(a);
    });
  }
  function ze(a) {
    Ua(qe.h().b, a) || ve(oe(4), a);
  }
  function L(a) {
    this.methodName = a;
  }
  var Ae = new L(1),
    Be = new L(15),
    Ce = new L(2),
    De = new L(3),
    Ee = new L(4),
    Fe = new L(5),
    Ge = new L(6),
    He = new L(7),
    Ie = new L(8),
    Je = new L(9),
    Ke = new L(10),
    Le = new L(11),
    Me = new L(12),
    Ne = new L(13),
    Oe = new L(14);
  function M(a, b, c) {
    c.hasOwnProperty(a.methodName) ||
      Object.defineProperty(c, String(a.methodName), { value: b });
  }
  function Pe(a, b, c) {
    return b[a.methodName] || c || function () {};
  }
  function Qe(a) {
    M(Fe, re, a);
    M(Ge, se, a);
    M(He, te, a);
    M(Ie, ue, a);
    M(Ne, xe, a);
    M(Be, ze, a);
  }
  function Re(a) {
    M(
      Ee,
      function (b) {
        ie.h().a = b;
      },
      a
    );
    M(
      Je,
      function (b, c) {
        var d = ie.h();
        d.a[3][b] || (d.a[3][b] = c);
      },
      a
    );
    M(
      Ke,
      function (b, c) {
        var d = ie.h();
        d.a[4][b] || (d.a[4][b] = c);
      },
      a
    );
    M(
      Le,
      function (b, c) {
        var d = ie.h();
        d.a[5][b] || (d.a[5][b] = c);
      },
      a
    );
    M(
      Oe,
      function (b) {
        for (
          var c = ie.h(), d = w([3, 4, 5]), e = d.next();
          !e.done;
          e = d.next()
        ) {
          var f = e.value;
          e = void 0;
          var g = c.a[f];
          f = b[f];
          for (e in f) g[e] = f[e];
        }
      },
      a
    );
  }
  function Se(a) {
    a.hasOwnProperty('init-done') ||
      Object.defineProperty(a, 'init-done', { value: !0 });
  }
  function Te() {
    this.b = function (a, b) {
      return void 0 === b ? !1 : b;
    };
    this.c = function (a, b) {
      return void 0 === b ? 0 : b;
    };
    this.f = function (a, b) {
      return void 0 === b ? '' : b;
    };
    this.a = function () {};
  }
  function Ue(a, b, c) {
    a.b = function (d, e) {
      return Pe(Fe, b)(d, e, c);
    };
    a.c = function (d, e) {
      return Pe(Ge, b)(d, e, c);
    };
    a.f = function (d, e) {
      return Pe(He, b)(d, e, c);
    };
    a.a = function () {
      Pe(Be, b)(c);
    };
  }
  Ba(Te);
  function N(a) {
    var b = void 0 === b ? !1 : b;
    return Te.h().b(a, b);
  }
  function Ve() {
    var a = void 0 === a ? 0 : a;
    return Te.h().c(62, a);
  }
  function We(a) {
    var b = void 0 === b ? '' : b;
    return Te.h().f(a, b);
  }
  function Xe(a, b) {
    return 'relative' === a ? b : ['https://', a, b].join('');
  }
  function Ye(a) {
    a = Xe('pagead2.googlesyndication.com', a);
    if (2012 < Ud) {
      var b = (b = a.match(/(__[a-z0-9_]+)\.js(?:\?|$)/)) ? b[1] : '';
      a = a.replace(
        new RegExp(
          String(b + '.js')
            .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1')
            .replace(/\x08/g, '\\x08'),
          'g'
        ),
        ('_fy' + Ud + b + '.js').replace(/\$/g, '$$$$')
      );
    }
    N(202) && (a += (0 < a.indexOf('?') ? '&' : '?') + 'cache=bust');
    return a;
  }
  var Ze = null;
  function $e() {
    if (!vd) return !1;
    if (null != Ze) return Ze;
    Ze = !1;
    try {
      var a = Rd(x);
      a && -1 != a.location.hash.indexOf('google_logging') && (Ze = !0);
      x.localStorage.getItem('google_logging') && (Ze = !0);
    } catch (b) {}
    return Ze;
  }
  function af(a, b) {
    b = void 0 === b ? [] : b;
    var c = !1;
    x.google_logging_queue || ((c = !0), (x.google_logging_queue = []));
    x.google_logging_queue.push([a, b]);
    c &&
      $e() &&
      ((a = Ye('/pagead/js/logging_library.js')), Sc(x.document, Kc(a)));
  }
  function bf(a) {
    if (!a) return '';
    (a = a.toLowerCase()) && 'ca-' != a.substring(0, 3) && (a = 'ca-' + a);
    return a;
  }
  function cf(a, b) {
    var c = void 0 === c ? {} : c;
    this.error = a;
    this.context = b.context;
    this.msg = b.message || '';
    this.id = b.id || 'jserror';
    this.meta = c;
  }
  function df(a) {
    return !!(a.error && a.meta && a.id);
  }
  var ef = /^https?:\/\/(\w|-)+\.cdn\.ampproject\.(net|org)(\?|\/|$)/;
  function ff(a, b) {
    this.a = a;
    this.b = b;
  }
  function gf(a, b, c) {
    this.url = a;
    this.a = b;
    this.ra = !!c;
    this.depth = null;
  }
  function hf() {
    this.c = '&';
    this.f = !1;
    this.b = {};
    this.g = 0;
    this.a = [];
  }
  function jf(a, b) {
    var c = {};
    c[a] = b;
    return [c];
  }
  function kf(a, b, c, d, e) {
    var f = [];
    Yc(a, function (g, h) {
      (g = lf(g, b, c, d, e)) && f.push(h + '=' + g);
    });
    return f.join(b);
  }
  function lf(a, b, c, d, e) {
    if (null == a) return '';
    b = b || '&';
    c = c || ',$';
    'string' == typeof c && (c = c.split(''));
    if (a instanceof Array) {
      if (((d = d || 0), d < c.length)) {
        for (var f = [], g = 0; g < a.length; g++)
          f.push(lf(a[g], b, c, d + 1, e));
        return f.join(c[d]);
      }
    } else if ('object' == typeof a)
      return (
        (e = e || 0), 2 > e ? encodeURIComponent(kf(a, b, c, d, e + 1)) : '...'
      );
    return encodeURIComponent(String(a));
  }
  function mf(a, b, c, d) {
    a.a.push(b);
    a.b[b] = jf(c, d);
  }
  function nf(a, b, c) {
    b = b + '//pagead2.googlesyndication.com' + c;
    var d = of(a) - c.length;
    if (0 > d) return '';
    a.a.sort(function (n, p) {
      return n - p;
    });
    c = null;
    for (var e = '', f = 0; f < a.a.length; f++)
      for (var g = a.a[f], h = a.b[g], k = 0; k < h.length; k++) {
        if (!d) {
          c = null == c ? g : c;
          break;
        }
        var l = kf(h[k], a.c, ',$');
        if (l) {
          l = e + l;
          if (d >= l.length) {
            d -= l.length;
            b += l;
            e = a.c;
            break;
          }
          a.f &&
            ((e = d),
            l[e - 1] == a.c && --e,
            (b += l.substr(0, e)),
            (e = a.c),
            (d = 0));
          c = null == c ? g : c;
        }
      }
    a = '';
    null != c && (a = e + 'trn=' + c);
    return b + a;
  }
  function of(a) {
    var b = 1,
      c;
    for (c in a.b) b = c.length > b ? c.length : b;
    return 3997 - b - a.c.length - 1;
  }
  function pf(a, b, c, d, e, f) {
    if ((d ? a.a : Math.random()) < (e || 0.01))
      try {
        if (c instanceof hf) var g = c;
        else
          (g = new hf()),
            Yc(c, function (k, l) {
              var n = g,
                p = n.g++;
              k = jf(l, k);
              n.a.push(p);
              n.b[p] = k;
            });
        var h = nf(g, a.b, '/pagead/gen_204?id=' + b + '&');
        h && ('undefined' !== typeof f ? Ad(x, h, f) : Ad(x, h));
      } catch (k) {}
  }
  var qf = null;
  function rf() {
    if (null === qf) {
      qf = '';
      try {
        var a = '';
        try {
          a = x.top.location.hash;
        } catch (c) {
          a = x.location.hash;
        }
        if (a) {
          var b = a.match(/\bdeid=([\d,]+)/);
          qf = b ? b[1] : '';
        }
      } catch (c) {}
    }
    return qf;
  }
  function sf() {
    var a = x.performance;
    return a && a.now && a.timing
      ? Math.floor(a.now() + a.timing.navigationStart)
      : La();
  }
  function tf() {
    var a = void 0 === a ? x : a;
    return (a = a.performance) && a.now ? a.now() : null;
  }
  function uf(a, b, c) {
    this.label = a;
    this.type = b;
    this.value = c;
    this.duration = 0;
    this.uniqueId = Math.random();
    this.slotId = void 0;
  }
  var vf = x.performance,
    wf = !!(vf && vf.mark && vf.measure && vf.clearMarks),
    xf = Wa(function () {
      var a;
      if ((a = wf)) (a = rf()), (a = !!a.indexOf && 0 <= a.indexOf('1337'));
      return a;
    });
  function yf() {
    var a = zf;
    this.events = [];
    this.b = a || x;
    var b = null;
    a &&
      ((a.google_js_reporting_queue = a.google_js_reporting_queue || []),
      (this.events = a.google_js_reporting_queue),
      (b = a.google_measure_js_timing));
    this.a = xf() || (null != b ? b : 1 > Math.random());
  }
  function Af(a) {
    a &&
      vf &&
      xf() &&
      (vf.clearMarks('goog_' + a.label + '_' + a.uniqueId + '_start'),
      vf.clearMarks('goog_' + a.label + '_' + a.uniqueId + '_end'));
  }
  yf.prototype.start = function (a, b) {
    if (!this.a) return null;
    var c = tf() || sf();
    a = new uf(a, b, c);
    b = 'goog_' + a.label + '_' + a.uniqueId + '_start';
    vf && xf() && vf.mark(b);
    return a;
  };
  function Bf() {
    var a = Cf;
    this.i = Df;
    this.c = !0;
    this.b = null;
    this.g = this.F;
    this.a = void 0 === a ? null : a;
    this.f = !1;
  }
  m = Bf.prototype;
  m.za = function (a) {
    this.g = a;
  };
  m.ia = function (a) {
    this.b = a;
  };
  m.Aa = function (a) {
    this.c = a;
  };
  m.Ba = function (a) {
    this.f = a;
  };
  m.ba = function (a, b, c) {
    try {
      if (this.a && this.a.a) {
        var d = this.a.start(a.toString(), 3);
        var e = b();
        var f = this.a;
        b = d;
        if (f.a && 'number' === typeof b.value) {
          var g = tf() || sf();
          b.duration = g - b.value;
          var h = 'goog_' + b.label + '_' + b.uniqueId + '_end';
          vf && xf() && vf.mark(h);
          !f.a || 2048 < f.events.length || f.events.push(b);
        }
      } else e = b();
    } catch (k) {
      f = this.c;
      try {
        Af(d), (f = this.g(a, new cf(k, { message: Ef(k) }), void 0, c));
      } catch (l) {
        this.F(217, l);
      }
      if (!f) throw k;
    }
    return e;
  };
  m.va = function (a, b, c, d) {
    var e = this;
    return function (f) {
      for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];
      return e.ba(
        a,
        function () {
          return b.apply(c, g);
        },
        d
      );
    };
  };
  m.F = function (a, b, c, d, e) {
    e = e || 'jserror';
    try {
      var f = new hf();
      f.f = !0;
      mf(f, 1, 'context', a);
      df(b) || (b = new cf(b, { message: Ef(b) }));
      b.msg && mf(f, 2, 'msg', b.msg.substring(0, 512));
      var g = b.meta || {};
      if (this.b)
        try {
          this.b(g);
        } catch (F) {}
      if (d)
        try {
          d(g);
        } catch (F) {}
      b = [g];
      f.a.push(3);
      f.b[3] = b;
      d = x;
      b = [];
      g = null;
      do {
        var h = d;
        if (Oc(h)) {
          var k = h.location.href;
          g = (h.document && h.document.referrer) || null;
        } else (k = g), (g = null);
        b.push(new gf(k || '', h));
        try {
          d = h.parent;
        } catch (F) {
          d = null;
        }
      } while (d && h != d);
      k = 0;
      for (var l = b.length - 1; k <= l; ++k) b[k].depth = l - k;
      h = x;
      if (
        h.location &&
        h.location.ancestorOrigins &&
        h.location.ancestorOrigins.length == b.length - 1
      )
        for (l = 1; l < b.length; ++l) {
          var n = b[l];
          n.url ||
            ((n.url = h.location.ancestorOrigins[l - 1] || ''), (n.ra = !0));
        }
      var p = new gf(x.location.href, x, !1);
      h = null;
      var v = b.length - 1;
      for (n = v; 0 <= n; --n) {
        var r = b[n];
        !h && ef.test(r.url) && (h = r);
        if (r.url && !r.ra) {
          p = r;
          break;
        }
      }
      r = null;
      var A = b.length && b[v].url;
      0 != p.depth && A && (r = b[v]);
      var t = new ff(p, r);
      t.b && mf(f, 4, 'top', t.b.url || '');
      mf(f, 5, 'url', t.a.url || '');
      pf(this.i, e, f, this.f, c);
    } catch (F) {
      try {
        pf(
          this.i,
          e,
          { context: 'ecmserr', rctx: a, msg: Ef(F), url: t && t.a.url },
          this.f,
          c
        );
      } catch (Ea) {}
    }
    return this.c;
  };
  function Ef(a) {
    var b = a.toString();
    a.name && -1 == b.indexOf(a.name) && (b += ': ' + a.name);
    a.message && -1 == b.indexOf(a.message) && (b += ': ' + a.message);
    if (a.stack) {
      a = a.stack;
      try {
        -1 == a.indexOf(b) && (a = b + '\n' + a);
        for (var c; a != c; )
          (c = a),
            (a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, '$1'));
        b = a.replace(/\n */g, '\n');
      } catch (d) {}
    }
    return b;
  }
  function O(a) {
    a = void 0 === a ? '' : a;
    var b = Error.call(this);
    this.message = b.message;
    'stack' in b && (this.stack = b.stack);
    this.name = 'TagError';
    this.message = a ? 'adsbygoogle.push() error: ' + a : '';
    Error.captureStackTrace
      ? Error.captureStackTrace(this, O)
      : (this.stack = Error().stack || '');
  }
  qa(O, Error);
  function Ff() {
    this.b = !1;
    this.a = null;
    this.f = !1;
    this.g = Math.random();
    this.c = this.F;
  }
  m = Ff.prototype;
  m.ia = function (a) {
    this.a = a;
  };
  m.Aa = function (a) {
    this.b = a;
  };
  m.Ba = function (a) {
    this.f = a;
  };
  m.za = function (a) {
    this.c = a;
  };
  m.F = function (a, b, c, d, e) {
    if ((this.f ? this.g : Math.random()) > (void 0 === c ? 0.01 : c))
      return this.b;
    df(b) || (b = new cf(b, { context: a, id: void 0 === e ? 'jserror' : e }));
    if (d || this.a) (b.meta = {}), this.a && this.a(b.meta), d && d(b.meta);
    x.google_js_errors = x.google_js_errors || [];
    x.google_js_errors.push(b);
    x.error_rep_loaded ||
      (Sc(
        x.document,
        Kc(
          x.location.protocol +
            '//pagead2.googlesyndication.com/pagead/js/err_rep.js'
        )
      ),
      (x.error_rep_loaded = !0));
    return this.b;
  };
  m.ba = function (a, b, c) {
    try {
      var d = b();
    } catch (e) {
      if (!this.c(a, e, 0.01, c, 'jserror')) throw e;
    }
    return d;
  };
  m.va = function (a, b, c, d) {
    var e = this;
    return function (f) {
      for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];
      return e.ba(
        a,
        function () {
          return b.apply(c, g);
        },
        d
      );
    };
  };
  var Df,
    Gf,
    zf = Od(),
    Cf = new yf();
  function Hf(a) {
    null != a && (zf.google_measure_js_timing = a);
    zf.google_measure_js_timing ||
      ((a = Cf),
      (a.a = !1),
      a.events != a.b.google_js_reporting_queue &&
        (xf() && Oa(a.events, Af), (a.events.length = 0)));
  }
  function If(a) {
    var b = J.jerExpIds;
    if (Array.isArray(b) && 0 !== b.length) {
      var c = a.eid;
      if (c) {
        b = ja(c.split(',')).concat(ja(b));
        c = {};
        for (var d = 0, e = 0; e < b.length; ) {
          var f = b[e++];
          var g = f;
          g = Ca(g) ? 'o' + Da(g) : (typeof g).charAt(0) + g;
          Object.prototype.hasOwnProperty.call(c, g) ||
            ((c[g] = !0), (b[d++] = f));
        }
        b.length = d;
        a.eid = b.join(',');
      } else a.eid = b.join(',');
    }
  }
  function Jf(a) {
    var b = J.jerUserAgent;
    b && (a.useragent = b);
  }
  Df = new (function () {
    var a = void 0 === a ? J : a;
    this.b = 'http:' === a.location.protocol ? 'http:' : 'https:';
    this.a = Math.random();
  })();
  'number' !== typeof zf.google_srt && (zf.google_srt = Math.random());
  var Kf = Df,
    Lf = zf.google_srt;
  0 <= Lf && 1 >= Lf && (Kf.a = Lf);
  Gf = new Bf();
  Gf.ia(function (a) {
    If(a);
    Jf(a);
  });
  Gf.Ba(!0);
  'complete' == zf.document.readyState
    ? Hf()
    : Cf.a &&
      Fc(zf, 'load', function () {
        Hf();
      });
  function Mf() {
    var a = [Nf, Of];
    Gf.ia(function (b) {
      Oa(a, function (c) {
        c(b);
      });
      If(b);
      Jf(b);
    });
  }
  function Pf(a, b, c) {
    return Gf.ba(a, b, c);
  }
  function Qf(a, b) {
    return Gf.va(a, b, void 0, void 0);
  }
  function Rf(a, b, c) {
    pf(Df, a, b, !0, c, void 0);
  }
  function Sf(a, b, c, d) {
    var e;
    df(b) ? (e = b.msg || Ef(b.error)) : (e = Ef(b));
    return 0 == e.indexOf('TagError')
      ? ((c = b instanceof cf ? b.error : b),
        c.pbr || ((c.pbr = !0), Gf.F(a, b, 0.1, d, 'puberror')),
        !1)
      : Gf.F(a, b, c, d);
  }
  function Tf(a) {
    var b = window;
    var c = void 0 === c ? null : c;
    Fc(b, 'message', function (d) {
      try {
        var e = JSON.parse(d.data);
      } catch (f) {
        return;
      }
      !e ||
        'sc-cnf' !== e.googMsgType ||
        (c && /[:|%3A]javascript\(/i.test(d.data) && !c(e, d)) ||
        a(e, d);
    });
  }
  var Uf = {
    overlays: 1,
    interstitials: 2,
    vignettes: 2,
    inserts: 3,
    immersives: 4,
    list_view: 5,
  };
  function Vf() {
    this.wasPlaTagProcessed = !1;
    this.wasReactiveAdConfigReceived = {};
    this.adCount = {};
    this.wasReactiveAdVisible = {};
    this.stateForType = {};
    this.reactiveTypeEnabledInAsfe = {};
    this.wasReactiveTagRequestSent = !1;
    this.reactiveTypeDisabledByPublisher = {};
    this.tagSpecificState = {};
    this.improveCollisionDetection = 1;
    this.messageValidationEnabled = !1;
    this.floatingAdsStacking = new Wf();
  }
  function Xf(a) {
    a.google_reactive_ads_global_state
      ? null == a.google_reactive_ads_global_state.floatingAdsStacking &&
        (a.google_reactive_ads_global_state.floatingAdsStacking = new Wf())
      : (a.google_reactive_ads_global_state = new Vf());
    return a.google_reactive_ads_global_state;
  }
  function Wf() {
    this.maxZIndexRestrictions = {};
    this.nextRestrictionId = 0;
    this.maxZIndexListeners = [];
  }
  function Yf(a) {
    a = a.document;
    var b = {};
    a && (b = 'CSS1Compat' == a.compatMode ? a.documentElement : a.body);
    return b || {};
  }
  function P(a) {
    return Yf(a).clientWidth;
  }
  function Zf(a, b, c) {
    return $f(a, void 0 === c ? '' : c, function (d) {
      return Ra(H(d, tc, 2), function (e) {
        return D(e, 1) === b;
      });
    });
  }
  function ag(a, b, c) {
    c = void 0 === c ? '' : c;
    var d = Rd(a) || a;
    return bg(d, b)
      ? !0
      : $f(a, c, function (e) {
          return Ra(D(e, 3), function (f) {
            return f === b;
          });
        });
  }
  function cg(a) {
    return $f(x, void 0 === a ? '' : a, function () {
      return !0;
    });
  }
  function bg(a, b) {
    a =
      (a =
        (a = a.location && a.location.hash) &&
        a.match(/forced_clientside_labs=([\d,]+)/)) && a[1];
    return !!a && Ua(a.split(','), b.toString());
  }
  function $f(a, b, c) {
    a = Rd(a) || a;
    var d = dg(a);
    b && (b = bf(String(b)));
    return Za(d, function (e, f) {
      return (
        Object.prototype.hasOwnProperty.call(d, f) && (!b || b === f) && c(e)
      );
    });
  }
  function dg(a) {
    a = eg(a);
    var b = {};
    Hd(a, function (c, d) {
      try {
        var e = new rc(c);
        b[d] = e;
      } catch (f) {}
    });
    return b;
  }
  function eg(a) {
    try {
      var b = a.localStorage.getItem('google_adsense_settings');
      if (!b) return {};
      var c = JSON.parse(b);
      return c !== Object(c)
        ? {}
        : Ya(c, function (d, e) {
            return (
              Object.prototype.hasOwnProperty.call(c, e) &&
              'string' === typeof e &&
              Array.isArray(d)
            );
          });
    } catch (d) {
      return {};
    }
  }
  var fg = cc(''),
    gg = /^m\d+$/.test(fg) ? fg : '';
  function hg() {
    var a = {};
    this[3] =
      ((a[23] = function (b) {
        return Zf(J, parseInt(b, 10));
      }),
      (a[24] = function (b) {
        return ag(J, parseInt(b, 10));
      }),
      a);
    a = {};
    this[4] =
      ((a[7] = function (b) {
        try {
          var c = window.localStorage;
        } catch (f) {
          c = null;
        }
        var d = b;
        b = window;
        d = void 0 === d ? 0 : d;
        d = 0 != d ? 'google_experiment_mod' + d : 'google_experiment_mod';
        var e = bd(c, d);
        return null === e ? cd(b, c, d) : e;
      }),
      a);
    a = {};
    this[5] =
      ((a[6] = function () {
        return gg;
      }),
      a);
  }
  Ba(hg);
  function ig(a) {
    a = void 0 === a ? x : a;
    return a.ggeac || (a.ggeac = {});
  }
  function jg() {
    this.b = function () {};
    this.a = function () {
      return [];
    };
  }
  function kg(a, b, c) {
    a.b = function (d) {
      Pe(Ce, b, function () {
        return [];
      })(d, c);
    };
    a.a = function () {
      return Pe(De, b, function () {
        return [];
      })(c);
    };
  }
  Ba(jg);
  function lg(a, b) {
    try {
      a: {
        var c = a.split('.');
        a = x;
        for (var d = 0, e; d < c.length; d++)
          if (((e = a), (a = a[c[d]]), null == a)) {
            var f = null;
            break a;
          }
        f = 'function' === typeof a ? e[c[d - 1]]() : a;
      }
      if (typeof f === b) return f;
    } catch (g) {}
  }
  function mg() {
    var a = {};
    this[3] =
      ((a[8] = function (b) {
        try {
          return null != za(b);
        } catch (c) {}
      }),
      (a[9] = function (b) {
        try {
          var c = za(b);
        } catch (d) {
          return;
        }
        if ((b = 'function' === typeof c))
          (c = c && c.toString && c.toString()),
            (b = 'string' === typeof c && -1 != c.indexOf('[native code]'));
        return b;
      }),
      (a[10] = function () {
        return window == window.top;
      }),
      (a[6] = function (b) {
        return Ua(jg.h().a(), parseInt(b, 10));
      }),
      (a[27] = function (b) {
        b = lg(b, 'boolean');
        return void 0 !== b ? b : void 0;
      }),
      a);
    a = {};
    this[4] =
      ((a[3] = function () {
        return id();
      }),
      (a[6] = function (b) {
        b = lg(b, 'number');
        return void 0 !== b ? b : void 0;
      }),
      a);
    a = {};
    this[5] =
      ((a[2] = function () {
        return window.location.href;
      }),
      (a[3] = function () {
        try {
          return window.top.location.hash;
        } catch (b) {
          return '';
        }
      }),
      (a[4] = function (b) {
        b = lg(b, 'string');
        return void 0 !== b ? b : void 0;
      }),
      a);
  }
  Ba(mg);
  function ng(a) {
    C(this, a, og, null);
  }
  y(ng, B);
  var og = [2];
  ng.prototype.getId = function () {
    return E(this, 1, 0);
  };
  ng.prototype.V = function () {
    return E(this, 7, 0);
  };
  function pg(a) {
    C(this, a, qg, null);
  }
  y(pg, B);
  var qg = [2];
  pg.prototype.V = function () {
    return E(this, 5, 0);
  };
  function rg(a) {
    C(this, a, sg, null);
  }
  y(rg, B);
  function tg(a) {
    C(this, a, ug, null);
  }
  y(tg, B);
  var sg = [1, 4, 2, 3],
    ug = [2];
  tg.prototype.V = function () {
    return E(this, 1, 0);
  };
  var vg = [12, 13];
  function wg() {}
  wg.prototype.init = function (a, b, c) {
    var d = this,
      e = void 0 === c ? {} : c;
    c = void 0 === e.qa ? !1 : e.qa;
    var f = void 0 === e.Ma ? {} : e.Ma;
    e = void 0 === e.Ua ? [] : e.Ua;
    this.a = a;
    this.g = c;
    this.f = f;
    a = {};
    this.b = ((a[b] = e), (a[4] = []), a);
    this.c = {};
    (b = rf()) &&
      Oa(b.split(',') || [], function (g) {
        (g = parseInt(g, 10)) && (d.c[g] = !0);
      });
    return this;
  };
  function xg(a, b, c) {
    var d = [],
      e = yg(a.a, b);
    if (e.length) {
      9 !== b && (a.a = zg(a.a, b));
      var f = Ua(vg, b);
      Oa(e, function (g) {
        if ((g = Ag(a, g, c))) {
          var h = g.getId();
          d.push(h);
          Bg(a, h, f ? 4 : c);
          var k = H(g, ee, 2);
          k &&
            (f
              ? Oa(ye(), function (l) {
                  return we(k, l);
                })
              : we(k, c));
        }
      });
    }
    return d;
  }
  function Bg(a, b, c) {
    a.b[c] || (a.b[c] = []);
    a = a.b[c];
    Ua(a, b)
      ? Cd({ eids: JSON.stringify(a), dup: b }, 'gpt_dupeid')
      : a.push(b);
  }
  function Cg(a, b) {
    a.a.push.apply(
      a.a,
      ja(
        Pa(
          Qa(b, function (c) {
            return new tg(c);
          }),
          function (c) {
            return !Ua(vg, c.V());
          }
        )
      )
    );
  }
  function Ag(a, b, c) {
    var d = ie.h().a;
    if (!be(G(b, Vd, 3), d)) return null;
    var e = H(b, ng, 2),
      f = e.length * E(b, 1, 0),
      g = E(b, 6, 0);
    if (g) {
      f = d[4];
      switch (c) {
        case 2:
          var h = f[8];
          break;
        case 1:
          h = f[7];
      }
      f = null;
      if (h)
        try {
          f = h(g);
        } catch (k) {}
      null === f && (f = Math.floor(1e3 * Xc(window)));
      b = Dg(b, f);
      return !b || (d && !be(G(b, Vd, 3), d)) ? null : Eg(a, [b], 1);
    }
    g = d
      ? Pa(e, function (k) {
          return be(G(k, Vd, 3), d);
        })
      : e;
    return g.length
      ? (b = E(b, 4, 0))
        ? Fg(a, b, f, g)
        : Eg(a, g, f / 1e3)
      : null;
  }
  function Fg(a, b, c, d) {
    var e = null != a.f[b] ? a.f[b] : 1e3;
    if (0 >= e) return null;
    d = Eg(a, d, c / e);
    a.f[b] = d ? 0 : e - c;
    return d;
  }
  function Eg(a, b, c) {
    var d = a.c,
      e = Sa(b, function (f) {
        return !!d[f.getId()];
      });
    return e ? e : a.g ? null : Uc(b, c);
  }
  function Gg(a, b) {
    M(
      Ae,
      function (c) {
        a.c[c] = !0;
      },
      b
    );
    M(
      Ce,
      function (c, d) {
        return xg(a, c, d);
      },
      b
    );
    M(
      De,
      function (c) {
        return (a.b[c] || []).concat(a.b[4]);
      },
      b
    );
    M(
      Me,
      function (c) {
        return Cg(a, c);
      },
      b
    );
  }
  Ba(wg);
  function yg(a, b) {
    return (
      ((a = Sa(a, function (c) {
        return c.V() == b;
      })) &&
        H(a, pg, 2)) ||
      []
    );
  }
  function zg(a, b) {
    return Pa(a, function (c) {
      return c.V() != b;
    });
  }
  function Dg(a, b) {
    var c = H(a, ng, 2),
      d = c.length,
      e = E(a, 1, 0);
    a = E(a, 8, 0);
    var f = (b - a) % d;
    return b < a || b - a - f >= d * e - 1 ? null : c[f];
  }
  function Hg() {
    this.a = function () {};
  }
  Ba(Hg);
  function Ig(a) {
    Hg.h().a(a);
  }
  function Jg(a, b, c, d) {
    var e = 1;
    d = void 0 === d ? ig() : d;
    e = void 0 === e ? 0 : e;
    d.hasOwnProperty('init-done')
      ? (Pe(
          Me,
          d
        )(
          Qa(H(a, tg, 2), function (f) {
            return f.a;
          })
        ),
        Pe(Ne, d)(
          Qa(H(a, ee, 1), function (f) {
            return f.a;
          }),
          e
        ),
        b && Pe(Oe, d)(b),
        Kg(d, e))
      : (Gg(wg.h().init(H(a, tg, 2), e, c), d),
        Qe(d),
        Re(d),
        Se(d),
        Kg(d, e),
        we(H(a, ee, 1), e),
        (je = je || !(!c || !c.Ka)),
        Ig(mg.h()),
        b && Ig(b));
  }
  function Kg(a, b) {
    a = void 0 === a ? ig() : a;
    b = void 0 === b ? 0 : b;
    var c = a,
      d = b;
    d = void 0 === d ? 0 : d;
    kg(jg.h(), c, d);
    c = a;
    b = void 0 === b ? 0 : b;
    Ue(Te.h(), c, b);
    Hg.h().a = Pe(Oe, a);
    Te.h().a();
  }
  function Lg(a) {
    var b = I(a);
    if (b.plle) Kg(ig(a), 1);
    else {
      b.plle = !0;
      try {
        var c = a.localStorage;
      } catch (e) {
        c = null;
      }
      b = c;
      null == bd(b, 'goog_pem_mod') && cd(a, b, 'goog_pem_mod');
      b = [null, null];
      try {
        var d = JSON.parse(
          '[[[null,62,null,[null,0.001]],[279,null,null,null,[[[1,[[12,null,null,null,2,null,"www\\\\.hasznaltauto\\\\.hu\\\\/"]]],[1]]]],[259,null,null,[1]],[225,null,null,[1]],[358,null,null,[1]],[209,null,null,[1]],[205,null,null,[1]],[null,29,null,[null,2]],[null,30,null,[null,3]],[270,null,null,[1]],[1000,null,null,[1]],[210,null,null,[1]],[211,null,null,[1]],[207,null,null,[1]],[null,63,null,[null,30]],[null,60,null,[null,20]],[null,57,null,[null,300]],[null,58,null,[null,300]],[null,64,null,[null,300]],[215,null,null,[1]],[230,null,null,[1]],[191,null,null,[1]],[null,null,null,[null,null,null,["facebook[.]com","whatsapp[.]com","youtube[.]com","google[.]com","\\\\/ads?\\\\/"]],null,9],[1900,null,null,[1]]],[[10,[[1,[[21066108],[21066109,[[316,null,null,[1]]]]],null,null,null,34,18,1],[1,[[21066110],[21066111,[[316,null,null,[1]]]]],null,null,null,34,18,1],[1,[[21066649],[21066650,[[null,null,14,[null,null,"exp=21066650"]]]],[21066651,[[null,null,14,[null,null,"exp=21066651"]],[null,null,13,[null,null,"/show_ads_impl_exp.js"]],[null,1008,null,[null,1]]]],[21066652,[[356,null,null,[1]],[null,null,14,[null,null,"exp=21066652"]],[null,null,13,[null,null,"/show_ads_impl_exp.js"]],[null,1008,null,[null,1]]]],[21066653,[[357,null,null,[1]],[null,null,13,[null,null,"/show_ads_impl_exp.js"]],[null,1008,null,[null,1]]]]],null,null,null,47,null,5],[10,[[21066699],[21066700,[[1006,null,null,[1]],[375,null,null,[1]],[null,null,13,[null,null,"/show_ads_impl_with_ama.js"]],[null,1008,null,[null,2]]]]],null,null,null,47,25,400],[10,[[21066792],[21066793]],null,null,null,47,25,400],[10,[[44724796],[44724797,[[381,null,null,[1]]]]]],[1,[[20205029],[20205030],[20205031],[20205032],[20205033]],null,null,null,51,null,1],[499,[[42530557],[42530558,[[376,null,null,[1]]]]],null,null,null,48,24,1],[499,[[42530559],[42530560,[[376,null,null,[1]]]]],null,null,null,48,24,1],[1,[[42530621],[42530622,[[1004,null,null,[1]]]]]],[1,[[44719338],[44719339,[[334,null,null,[1]],[null,54,null,[null,100]],[null,66,null,[null,10]],[null,65,null,[null,1000]]]]]],[10,[[44724584],[44724585]],null,null,null,50,null,100],[50,[[21066124,[[190,null,null,[1]]],[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]],[21066125,[[265,null,null,[1]],[260,null,null,[1]],[190,null,null,[1]]],[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]]],null,null,null,40,null,1],[50,[[21066153,null,[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]],[21066154,[[233,null,null,[1]],[232,null,null,[1]]],[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]]],null,null,null,42,null,1],[50,[[42530587,null,[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]],[42530588,[[1002,null,null,[1]]],[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]]],null,null,null,42,null,200],[50,[[44723321,null,[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]],[44723322,[[310,null,null,[1]]],[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]]],null,null,null,49],[20,[[182982000,[[218,null,null,[1]]],[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]],[182982100,[[217,null,null,[1]]],[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]]],null,null,null,36,8,1],[20,[[182982200,null,[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]],[182982300,null,[1,[[12,null,null,null,2,null,"\\\\.wiki(dogs|how)(-fun)?\\\\."]]]]],null,null,null,36,8,1],[10,[[182984000,null,[4,null,23,null,null,null,null,["1"]]],[182984100,[[218,null,null,[1]]],[4,null,23,null,null,null,null,["1"]]]],null,null,null,37,10,1],[10,[[182984200,null,[4,null,23,null,null,null,null,["1"]]],[182984300,null,[4,null,23,null,null,null,null,["1"]]]],null,null,null,37,10,1],[50,[[21066357],[21066358,[[345,null,null,[1]]]]]],[10,[[21066428],[21066429]]],[10,[[21066430],[21066431],[21066432],[21066433]],null,null,null,44,22],[10,[[21066434],[21066435]],null,null,null,44,null,500],[null,[[21066467],[21066468,[[304,null,null,[1]]]]]],[50,[[21066647],[21066648,[[371,null,null,[1]]]]]],[10,[[21066715],[21066716,[[279,null,null,[1]]]],[21066717,[[383,null,null,[1]],[279,null,null,[1]]]]]],[50,[[21066790],[21066791,[[1000,null,null,[1]]]]],null,26],[50,[[21066897],[21066898,[[1001,null,null,[1]]]]],null,27],[30,[[21066922],[21066923,[[325,null,null,[1]]]]],null,23],[10,[[21066944],[21066945,[[1003,null,null,[1]]]],[21067034,[[1005,null,null,[1]],[1003,null,null,[1]]]]]],[10,[[21067052,null,[12,null,null,null,4,null,"Chrome/8[6-9]",["navigator.userAgent"]]],[21067053,[[312,null,null,[1]]],[12,null,null,null,4,null,"Chrome/8[6-9]",["navigator.userAgent"]]]],null,21],[100,[[21067054,null,[12,null,null,null,4,null,"Chrome/8[6-9]",["navigator.userAgent"]]],[21067055,[[312,null,null,[1]]],[12,null,null,null,4,null,"Chrome/8[6-9]",["navigator.userAgent"]]]],[4,null,9,null,null,null,null,["document.hasTrustToken"]],21],[50,[[21067104],[21067105,[[365,null,null,[1]]]]]]]],[12,[[50,[[21066920],[21066921,[[1900,null,null,[1]]]]]],[20,[[21065724],[21065725,[[203,null,null,[1]]]]],[4,null,9,null,null,null,null,["LayoutShift"]]],[1,[[21065784]]],[1,[[21065785,null,[4,null,8,null,null,null,null,["navigator.connection.saveData"]]]]],[1,[[21065786,null,[4,null,27,null,null,null,null,["navigator.connection.saveData"]]]]],[1,[[21065787,null,[1,[[4,null,27,null,null,null,null,["navigator.connection.saveData"]]]]]]],[1,[[21065798,null,[2,[[5,null,8,null,null,null,null,["localStorage"]],[4,null,8,null,null,null,null,["localStorage"]]]]]]],[1,[[21065799,null,[2,[[5,null,8,null,null,null,null,["localStorage"]],[1,[[4,null,8,null,null,null,null,["localStorage"]]]]]]]]],[1,[[21066438,null,[1,[[5,null,8,null,null,null,null,["localStorage"]]]]]]],[50,[[21066532],[21066533,[[363,null,null,[1]]]]],null,25],[500,[[21066534],[21066535,[[363,null,null,[1]]]]],[4,null,9,null,null,null,null,["navigator.userAgentData.getHighEntropyValues"]],25],[10,[[21066612],[21066613,[[83,null,null,[1]],[84,null,null,[1]]]]]],[50,[[21066705],[21066706,[[382,null,null,[1]]]]]],[10,[[44725623],[44725624,[[1901,null,null,[1]]]]],null,28]]],[13,[[1000,[[21066819,null,[2,[[12,null,null,null,4,null,"Linux.*Chrome",["navigator.userAgent"]],[4,null,27,null,null,null,null,["navigator.connection.saveData"]]]]]]],[100,[[21065726,null,[4,null,6,null,null,null,null,["21065725"]]],[21065727,[[240,null,null,[1]]],[4,null,6,null,null,null,null,["21065725"]]],[21065728,[[241,null,null,[1]]],[4,null,6,null,null,null,null,["21065725"]]]],[4,null,9,null,null,null,null,["LayoutShift"]]],[50,[[21066392],[21066393,[[338,null,null,[1]]]]]],[500,[[21066614],[21066615,[[77,null,null,[1]],[78,null,null,[1]],[85,null,null,[1]],[80,null,null,[1]],[76,null,null,[1]]]]],[4,null,6,null,null,null,null,["21066613"]]],[50,[[21066806],[21066807,[[370,null,null,[1]]]]]],[1000,[[21066970,null,[2,[[6,null,null,6,null,8582400,null,["__gsaExp.id"]],[1,[[6,null,null,null,4,null,"",["frameElement.src"]]]]]]],[21066971,null,[2,[[6,null,null,6,null,8582400,null,["__gsaExp.id"]],[6,null,null,null,4,null,"",["frameElement.src"]]]]],[21066972,null,[2,[[5,null,null,6,null,null,null,["__gsaExp.id"]],[1,[[6,null,null,6,null,8582400,null,["__gsaExp.id"]]]]]]]]],[1000,[[21066973,null,[2,[[12,null,null,null,4,null,"Linux.*Chrome",["navigator.userAgent"]],[1,[[6,null,null,null,4,null,"",["frameElement.src"]]]],[1,[[5,null,null,6,null,null,null,["__gsaExp.id"]]]]]]],[21066974,null,[2,[[12,null,null,null,4,null,"Linux.*Chrome",["navigator.userAgent"]],[6,null,null,null,4,null,"",["frameElement.src"]],[1,[[5,null,null,6,null,null,null,["__gsaExp.id"]]]]]]]]],[100,[[21067087],[21067088,[[78,null,null,[1]]]]],[2,[[4,null,6,null,null,null,null,["21066613"]]]]]]]]]'
        );
      } catch (e) {
        d = b;
      }
      af(13, [d]);
      Jg(
        new rg(d),
        hg.h(),
        { qa: vd && !!a.google_disable_experiments, Ka: vd },
        ig(a)
      );
      jg.h().b(12);
      jg.h().b(10);
      d = vc(a);
      xb('') && d.push('');
      a = Rd(a) || a;
      Sd(a.location, 'google_mc_lab') && d.push('242104166');
    }
  }
  function Of(a) {
    var b = jg.h().a();
    var c = vc(x);
    (b = b.concat(c).join(',')) &&
      (a.eid = 50 < b.length ? b.substring(0, 50) + 'T' : b);
  }
  function Mg() {
    var a = /[a-zA-Z0-9._~-]/,
      b = /%[89a-zA-Z]./;
    return x.location.pathname.replace(/(%[a-zA-Z0-9]{2})/g, function (c) {
      if (!c.match(b)) {
        var d = decodeURIComponent(c);
        if (d.match(a)) return d;
      }
      return c.toUpperCase();
    });
  }
  function Ng() {
    for (var a = Mg(), b = '', c = /[/%?&=]/, d = 0; d < a.length; ++d) {
      var e = a[d];
      b = e.match(c) ? b + e : b + encodeURIComponent(e);
    }
    return b;
  }
  function Q(a) {
    C(this, a, Og, null);
  }
  y(Q, B);
  var Og = [4];
  Q.prototype.getId = function () {
    return D(this, 3);
  };
  function R(a) {
    C(this, a, null, null);
  }
  y(R, B);
  function Pg(a) {
    C(this, a, null, Qg);
  }
  y(Pg, B);
  function Rg(a) {
    C(this, a, null, null);
  }
  y(Rg, B);
  function Sg(a) {
    C(this, a, null, null);
  }
  y(Sg, B);
  function Tg(a) {
    C(this, a, null, null);
  }
  y(Tg, B);
  var Qg = [[1, 2, 3]];
  function Ug(a) {
    C(this, a, null, null);
  }
  y(Ug, B);
  function Vg(a) {
    C(this, a, null, null);
  }
  y(Vg, B);
  function Wg(a) {
    C(this, a, Xg, null);
  }
  y(Wg, B);
  var Xg = [6, 7, 9, 10, 11];
  function Yg(a) {
    C(this, a, Zg, null);
  }
  y(Yg, B);
  function $g(a) {
    C(this, a, null, null);
  }
  y($g, B);
  function ah(a) {
    C(this, a, bh, null);
  }
  y(ah, B);
  function ch(a) {
    C(this, a, null, null);
  }
  y(ch, B);
  function dh(a) {
    C(this, a, null, null);
  }
  y(dh, B);
  function eh(a) {
    C(this, a, null, null);
  }
  y(eh, B);
  function fh(a) {
    C(this, a, null, null);
  }
  y(fh, B);
  var Zg = [1, 2, 5, 7],
    bh = [2, 5, 6, 11];
  function gh(a) {
    var b = Ng().replace(/(^\/)|(\/$)/g, ''),
      c = $c(b),
      d = hh(b);
    return (
      u(a, 'find').call(a, function (e) {
        var f = null != D(e, 7) ? D(G(e, ch, 7), 1) : D(e, 1);
        e = null != D(e, 7) ? D(G(e, ch, 7), 2) : 2;
        if ('number' !== typeof f) return !1;
        switch (e) {
          case 1:
            return f == c;
          case 2:
            return d[f] || !1;
        }
        return !1;
      }) || null
    );
  }
  function hh(a) {
    for (var b = {}; ; ) {
      b[$c(a)] = !0;
      if (!a) return b;
      a = a.substring(0, a.lastIndexOf('/'));
    }
  }
  function ih(a, b) {
    this.oa = a;
    this.wa = b;
  }
  function jh(a) {
    var b = [].slice.call(arguments).filter(
      Va(function (e) {
        return null === e;
      })
    );
    if (!b.length) return null;
    var c = [],
      d = {};
    b.forEach(function (e) {
      c = c.concat(e.oa || []);
      d = u(Object, 'assign').call(Object, d, e.wa);
    });
    return new ih(c, d);
  }
  function kh(a) {
    switch (a) {
      case 1:
        return new ih(null, { google_ad_semantic_area: 'mc' });
      case 2:
        return new ih(null, { google_ad_semantic_area: 'h' });
      case 3:
        return new ih(null, { google_ad_semantic_area: 'f' });
      case 4:
        return new ih(null, { google_ad_semantic_area: 's' });
      default:
        return null;
    }
  }
  var lh = new ih(['google-auto-placed'], { google_tag_origin: 'qs' });
  var mh = {},
    nh = ((mh.google_ad_channel = !0), (mh.google_ad_host = !0), mh);
  function oh(a, b) {
    a.location.href &&
      a.location.href.substring &&
      (b.url = a.location.href.substring(0, 200));
    Rf('ama', b, 0.01);
  }
  function ph(a) {
    var b = {};
    Yc(nh, function (c, d) {
      d in a && (b[d] = a[d]);
    });
    return b;
  }
  function qh(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
  function rh(a, b) {
    return {
      top: a.b - b,
      right: a.a + a.c + 1,
      bottom: a.b + b,
      left: a.a - 1,
    };
  }
  function sh(a) {
    this.a = {};
    this.b = {};
    if (a) for (var b = 0; b < a.length; ++b) this.add(a[b]);
  }
  sh.prototype.add = function (a) {
    this.a[a] = !0;
    this.b[a] = a;
  };
  sh.prototype.contains = function (a) {
    return !!this.a[a];
  };
  function th(a) {
    C(this, a, null, null);
  }
  y(th, B);
  function uh(a) {
    C(this, a, null, null);
  }
  y(uh, B);
  function vh(a) {
    C(this, a, null, null);
  }
  y(vh, B);
  function wh(a) {
    C(this, a, xh, null);
  }
  y(wh, B);
  var xh = [5];
  function yh(a) {
    try {
      var b = a.localStorage.getItem('google_ama_settings');
      return b ? new wh(b ? JSON.parse(b) : null) : null;
    } catch (c) {
      return null;
    }
  }
  function zh() {
    this.a = {};
    this.b = {};
  }
  zh.prototype.set = function (a, b) {
    this.a[a] = b;
    this.b[a] = a;
  };
  zh.prototype.get = function (a, b) {
    return void 0 !== this.a[a] ? this.a[a] : b;
  };
  var Ah = { rectangle: 1, horizontal: 2, vertical: 4 };
  function Bh(a, b) {
    for (var c = ['width', 'height'], d = 0; d < c.length; d++) {
      var e = 'google_ad_' + c[d];
      if (!b.hasOwnProperty(e)) {
        var f = K(a[c[d]]);
        f = null === f ? null : Math.round(f);
        null != f && (b[e] = f);
      }
    }
  }
  function Ch(a, b) {
    return !(
      (ed.test(b.google_ad_width) || dd.test(a.style.width)) &&
      (ed.test(b.google_ad_height) || dd.test(a.style.height))
    );
  }
  function Dh(a, b) {
    return (a = Eh(a, b)) ? a.y : 0;
  }
  function Eh(a, b) {
    try {
      var c = b.document.documentElement.getBoundingClientRect(),
        d = a.getBoundingClientRect();
      return { x: d.left - c.left, y: d.top - c.top };
    } catch (e) {
      return null;
    }
  }
  function Fh(a, b) {
    do {
      var c = Tc(a, b);
      if (c && 'fixed' == c.position) return !1;
    } while ((a = a.parentElement));
    return !0;
  }
  function Gh(a) {
    var b = 0,
      c;
    for (c in Ah) -1 != a.indexOf(c) && (b |= Ah[c]);
    return b;
  }
  function Hh(a, b, c, d, e) {
    if (Qd(a) != a) return Rd(a) ? 3 : 16;
    if (!(488 > P(a))) return 4;
    if (!(a.innerHeight >= a.innerWidth)) return 5;
    var f = P(a);
    if (!f || (f - c) / f > d) a = 6;
    else {
      if ((c = 'true' != e.google_full_width_responsive))
        a: {
          c = P(a);
          for (b = b.parentElement; b; b = b.parentElement)
            if (
              (d = Tc(b, a)) &&
              (e = K(d.width)) &&
              !(e >= c) &&
              'visible' != d.overflow
            ) {
              c = !0;
              break a;
            }
          c = !1;
        }
      a = c ? 7 : !0;
    }
    return a;
  }
  function Ih(a, b, c, d) {
    var e = Hh(b, c, a, 0.3, d);
    !0 !== e
      ? (a = e)
      : 'true' == d.google_full_width_responsive || Fh(c, b)
      ? Jh(b)
        ? (a = !0)
        : ((b = P(b)),
          (a = b - a),
          (a = b && 0 <= a ? !0 : b ? (-10 > a ? 11 : 0 > a ? 14 : 12) : 10))
      : (a = 9);
    return a;
  }
  function Kh(a, b, c) {
    a = a.style;
    'rtl' == b
      ? N(251)
        ? a.setProperty('margin-right', c, 'important')
        : (a.marginRight = c)
      : N(251)
      ? a.setProperty('margin-left', c, 'important')
      : (a.marginLeft = c);
  }
  function Lh(a, b) {
    if (3 == b.nodeType) return /\S/.test(b.data);
    if (1 == b.nodeType) {
      if (/^(script|style)$/i.test(b.nodeName)) return !1;
      try {
        var c = Tc(b, a);
      } catch (d) {}
      return (
        !c ||
        ('none' != c.display &&
          !(
            'absolute' == c.position &&
            ('hidden' == c.visibility || 'collapse' == c.visibility)
          ))
      );
    }
    return !1;
  }
  function Mh(a, b) {
    for (var c = 0; 100 > c && b.parentElement; ++c) {
      for (var d = b.parentElement.childNodes, e = 0; e < d.length; ++e) {
        var f = d[e];
        if (f != b && Lh(a, f)) return;
      }
      b = b.parentElement;
      b.style.width = '100%';
      b.style.height = 'auto';
    }
  }
  function Nh(a, b, c) {
    a = Eh(b, a);
    return 'rtl' == c ? -a.x : a.x;
  }
  function Oh(a, b) {
    var c;
    c = (c = b.parentElement) ? ((c = Tc(c, a)) ? c.direction : '') : '';
    if (c) {
      b.style.border = b.style.borderStyle = b.style.outline = b.style.outlineStyle = b.style.transition =
        'none';
      b.style.borderSpacing = b.style.padding = '0';
      Kh(b, c, '0px');
      b.style.width = P(a) + 'px';
      if (0 !== Nh(a, b, c)) {
        Kh(b, c, '0px');
        var d = Nh(a, b, c);
        Kh(b, c, -1 * d + 'px');
        a = Nh(a, b, c);
        0 !== a && a !== d && Kh(b, c, (d / (a - d)) * d + 'px');
      }
      b.style.zIndex = 30;
    }
  }
  function Jh(a) {
    return N(233) || (a.location && '#bffwroe2etoq' == a.location.hash);
  }
  function S(a, b) {
    this.b = a;
    this.a = b;
  }
  m = S.prototype;
  m.minWidth = function () {
    return this.b;
  };
  m.height = function () {
    return this.a;
  };
  m.R = function (a) {
    return 300 < a && 300 < this.a ? this.b : Math.min(1200, Math.round(a));
  };
  m.fa = function (a) {
    return this.R(a) + 'x' + this.height();
  };
  m.Y = function () {};
  function T(a, b, c, d) {
    d =
      void 0 === d
        ? function (f) {
            return f;
          }
        : d;
    var e;
    return (
      (a.style && a.style[c] && d(a.style[c])) ||
      ((e = Tc(a, b)) && e[c] && d(e[c])) ||
      null
    );
  }
  function Ph(a) {
    return function (b) {
      return b.minWidth() <= a;
    };
  }
  function Qh(a, b, c, d) {
    var e = a && Rh(c, b),
      f = Sh(b, d);
    return function (g) {
      return !(e && g.height() >= f);
    };
  }
  function Th(a) {
    return function (b) {
      return b.height() <= a;
    };
  }
  function Rh(a, b) {
    return Dh(a, b) < Yf(b).clientHeight - 100;
  }
  function Uh(a, b) {
    a = Dh(a, b);
    b = Yf(b).clientHeight;
    return 0 == b ? null : a / b;
  }
  function Vh(a, b) {
    var c = T(b, a, 'height', K);
    if (c) return c;
    var d = b.style.height;
    b.style.height = 'inherit';
    c = T(b, a, 'height', K);
    b.style.height = d;
    if (c) return c;
    c = Infinity;
    do
      (d = b.style && K(b.style.height)) && (c = Math.min(c, d)),
        (d = T(b, a, 'maxHeight', K)) && (c = Math.min(c, d));
    while ((b = b.parentElement) && 'HTML' != b.tagName);
    return c;
  }
  function Sh(a, b) {
    var c = 0 == Kd(a);
    return b && c ? Math.max(250, (2 * Yf(a).clientHeight) / 3) : 250;
  }
  function Wh(a, b) {
    for (var c = [], d = a.length, e = 0; e < d; e++) c.push(a[e]);
    c.forEach(b, void 0);
  }
  function Xh(a) {
    if (1 != a.nodeType) var b = !1;
    else if ((b = 'INS' == a.tagName))
      a: {
        b = ['adsbygoogle-placeholder'];
        a = a.className ? a.className.split(/\s+/) : [];
        for (var c = {}, d = 0; d < a.length; ++d) c[a[d]] = !0;
        for (d = 0; d < b.length; ++d)
          if (!c[b[d]]) {
            b = !1;
            break a;
          }
        b = !0;
      }
    return b;
  }
  function Yh(a, b, c) {
    switch (c) {
      case 0:
        b.parentNode && b.parentNode.insertBefore(a, b);
        break;
      case 3:
        if ((c = b.parentNode)) {
          var d = b.nextSibling;
          if (d && d.parentNode != c)
            for (; d && 8 == d.nodeType; ) d = d.nextSibling;
          c.insertBefore(a, d);
        }
        break;
      case 1:
        b.insertBefore(a, b.firstChild);
        break;
      case 2:
        b.appendChild(a);
    }
    Xh(b) &&
      (b.setAttribute('data-init-display', b.style.display),
      (b.style.display = 'block'));
  }
  function Zh(a, b, c) {
    function d(f) {
      f = $h(f);
      return null == f ? !1 : c > f;
    }
    function e(f) {
      f = $h(f);
      return null == f ? !1 : c < f;
    }
    switch (b) {
      case 0:
        return {
          init: ai(a.previousSibling, e),
          $: function (f) {
            return ai(f.previousSibling, e);
          },
          aa: 0,
        };
      case 2:
        return {
          init: ai(a.lastChild, e),
          $: function (f) {
            return ai(f.previousSibling, e);
          },
          aa: 0,
        };
      case 3:
        return {
          init: ai(a.nextSibling, d),
          $: function (f) {
            return ai(f.nextSibling, d);
          },
          aa: 3,
        };
      case 1:
        return {
          init: ai(a.firstChild, d),
          $: function (f) {
            return ai(f.nextSibling, d);
          },
          aa: 3,
        };
    }
    throw Error('Un-handled RelativePosition: ' + b);
  }
  function $h(a) {
    return a.hasOwnProperty('google-ama-order-assurance')
      ? a['google-ama-order-assurance']
      : null;
  }
  function ai(a, b) {
    return a && b(a) ? a : null;
  }
  function bi(a, b) {
    for (var c = 0; c < b.length; c++) {
      var d = b[c],
        e = ac(d.Ya);
      a[e] = d.value;
    }
  }
  var ci = null;
  function di() {
    if (!ci) {
      for (var a = x, b = a, c = 0; a && a != a.parent; )
        if (((a = a.parent), c++, Oc(a))) b = a;
        else break;
      ci = b;
    }
    return ci;
  }
  function ei(a, b, c, d) {
    this.f = a;
    this.b = b;
    this.c = c;
    this.a = d;
  }
  function fi(a, b) {
    var c = [];
    try {
      c = b.querySelectorAll(a.f);
    } catch (g) {}
    if (!c.length) return [];
    b = c;
    c = b.length;
    if (0 < c) {
      for (var d = Array(c), e = 0; e < c; e++) d[e] = b[e];
      b = d;
    } else b = [];
    b = gi(a, b);
    'number' === typeof a.b &&
      ((c = a.b),
      0 > c && (c += b.length),
      (b = 0 <= c && c < b.length ? [b[c]] : []));
    if ('number' === typeof a.c) {
      c = [];
      for (d = 0; d < b.length; d++) {
        e = hi(b[d]);
        var f = a.c;
        0 > f && (f += e.length);
        0 <= f && f < e.length && c.push(e[f]);
      }
      b = c;
    }
    return b;
  }
  ei.prototype.toString = function () {
    return JSON.stringify({
      nativeQuery: this.f,
      occurrenceIndex: this.b,
      paragraphIndex: this.c,
      ignoreMode: this.a,
    });
  };
  function gi(a, b) {
    if (null == a.a) return b;
    switch (a.a) {
      case 1:
        return b.slice(1);
      case 2:
        return b.slice(0, b.length - 1);
      case 3:
        return b.slice(1, b.length - 1);
      case 0:
        return b;
      default:
        throw Error('Unknown ignore mode: ' + a.a);
    }
  }
  function hi(a) {
    var b = [];
    Wh(a.getElementsByTagName('p'), function (c) {
      100 <= ii(c) && b.push(c);
    });
    return b;
  }
  function ii(a) {
    if (3 == a.nodeType) return a.length;
    if (1 != a.nodeType || 'SCRIPT' == a.tagName) return 0;
    var b = 0;
    Wh(a.childNodes, function (c) {
      b += ii(c);
    });
    return b;
  }
  function ji(a) {
    return 0 == a.length || isNaN(a[0])
      ? a
      : '\\' + (30 + parseInt(a[0], 10)) + ' ' + a.substring(1);
  }
  function ki(a) {
    if (!a) return null;
    var b = D(a, 7);
    if (D(a, 1) || a.getId() || 0 < D(a, 4).length) {
      var c = a.getId(),
        d = D(a, 1),
        e = D(a, 4);
      b = D(a, 2);
      var f = D(a, 5);
      a = li(D(a, 6));
      var g = '';
      d && (g += d);
      c && (g += '#' + ji(c));
      if (e) for (c = 0; c < e.length; c++) g += '.' + ji(e[c]);
      b = (e = g) ? new ei(e, b, f, a) : null;
    } else b = b ? new ei(b, D(a, 2), D(a, 5), li(D(a, 6))) : null;
    return b;
  }
  var mi = { 1: 1, 2: 2, 3: 3, 0: 0 };
  function li(a) {
    return null == a ? a : mi[a];
  }
  var ni = { 1: 0, 2: 1, 3: 2, 4: 3 };
  function oi() {}
  function pi(a, b, c) {
    var d = rh(c, b + 1);
    return !Ra(a, function (e) {
      return (
        e.left < d.right &&
        d.left < e.right &&
        e.top < d.bottom &&
        d.top < e.bottom
      );
    });
  }
  function qi() {
    this.a = new zh();
  }
  qi.prototype.set = function (a, b) {
    var c = this.a.get(a);
    c || ((c = new sh()), this.a.set(a, c));
    c.add(b);
  };
  function ri(a, b) {
    function c() {
      d.push({ anchor: e.anchor, position: e.position });
      return e.anchor == b.anchor && e.position == b.position;
    }
    for (var d = [], e = a; e; ) {
      switch (e.position) {
        case 1:
          if (c()) return d;
          e.position = 2;
        case 2:
          if (c()) return d;
          if (e.anchor.firstChild) {
            e = { anchor: e.anchor.firstChild, position: 1 };
            continue;
          } else e.position = 3;
        case 3:
          if (c()) return d;
          e.position = 4;
        case 4:
          if (c()) return d;
      }
      for (
        ;
        e &&
        !e.anchor.nextSibling &&
        e.anchor.parentNode != e.anchor.ownerDocument.body;

      ) {
        e = { anchor: e.anchor.parentNode, position: 3 };
        if (c()) return d;
        e.position = 4;
        if (c()) return d;
      }
      e && e.anchor.nextSibling
        ? (e = { anchor: e.anchor.nextSibling, position: 1 })
        : (e = null);
    }
    return d;
  }
  function si(a, b) {
    this.b = a;
    this.a = b;
  }
  function ti(a, b) {
    var c = new qi(),
      d = new sh();
    b.forEach(function (e) {
      if (G(e, Rg, 1)) {
        e = G(e, Rg, 1);
        if (
          G(e, R, 1) &&
          G(G(e, R, 1), Q, 1) &&
          G(e, R, 2) &&
          G(G(e, R, 2), Q, 1)
        ) {
          var f = ui(a, G(G(e, R, 1), Q, 1)),
            g = ui(a, G(G(e, R, 2), Q, 1));
          if (f && g)
            for (
              f = w(
                ri(
                  { anchor: f, position: D(G(e, R, 1), 2) },
                  { anchor: g, position: D(G(e, R, 2), 2) }
                )
              ),
                g = f.next();
              !g.done;
              g = f.next()
            )
              (g = g.value), c.set(Da(g.anchor), g.position);
        }
        G(e, R, 3) &&
          G(G(e, R, 3), Q, 1) &&
          (f = ui(a, G(G(e, R, 3), Q, 1))) &&
          c.set(Da(f), D(G(e, R, 3), 2));
      } else G(e, Sg, 2) ? vi(a, G(e, Sg, 2), c) : G(e, Tg, 3) && wi(a, G(e, Tg, 3), d);
    });
    return new si(c, d);
  }
  function vi(a, b, c) {
    G(b, Q, 1) &&
      (a = xi(a, G(b, Q, 1))) &&
      a.forEach(function (d) {
        d = Da(d);
        c.set(d, 1);
        c.set(d, 4);
        c.set(d, 2);
        c.set(d, 3);
      });
  }
  function wi(a, b, c) {
    G(b, Q, 1) &&
      (a = xi(a, G(b, Q, 1))) &&
      a.forEach(function (d) {
        c.add(Da(d));
      });
  }
  function ui(a, b) {
    return (a = xi(a, b)) && 0 < a.length ? a[0] : null;
  }
  function xi(a, b) {
    return (b = ki(b)) ? fi(b, a) : null;
  }
  function yi(a, b) {
    if (!a) return !1;
    a = Tc(a, b);
    if (!a) return !1;
    a = a.cssFloat || a.styleFloat;
    return 'left' == a || 'right' == a;
  }
  function zi(a) {
    for (a = a.previousSibling; a && 1 != a.nodeType; ) a = a.previousSibling;
    return a ? a : null;
  }
  function Ai(a) {
    return !!a.nextSibling || (!!a.parentNode && Ai(a.parentNode));
  }
  function Bi(a, b) {
    return a && null != D(a, 4) && b[D(G(a, Vg, 4), 2)] ? !1 : !0;
  }
  function Ci(a) {
    var b = {};
    a &&
      D(a, 6).forEach(function (c) {
        b[c] = !0;
      });
    return b;
  }
  function Di(a, b, c, d) {
    this.a = x;
    this.s = a;
    this.b = b;
    this.i = d || null;
    this.o = (this.g = c) ? ti(x.document, H(c, Pg, 5)) : ti(x.document, []);
    this.c = 0;
    this.f = !1;
  }
  function Ei(a) {
    return new oi(Fi(a).numAutoAdsPlaced || 0, H(a.b, Wg, 1).length);
  }
  function Gi(a, b) {
    if (a.f) return !0;
    a.f = !0;
    var c = H(a.b, Wg, 1);
    a.c = 0;
    var d = Ci(a.g);
    var e = (e = a.g) ? Ua(D(e, 11), 1) : !1;
    var f;
    if ((f = !e && G(a.b, fh, 15) && nc(G(a.b, fh, 15), 12)))
      a: {
        f = yh(a.a);
        f = null !== f ? H(f, vh, 5) : null;
        var g = yh(a.a);
        var h = null != g ? G(g, th, 6) || null : null;
        if (null == f) f = !1;
        else {
          g = 4;
          var k = 0;
          h && ((g = D(h, 1) || g), (k = D(h, 3) || k));
          h = new sh([2, 1, 0]);
          G(a.b, fh, 15) && nc(G(a.b, fh, 15), 15) && h.add(4);
          for (var l = [], n = 0; n < f.length; n++) {
            var p = Fi(a).numAutoAdsPlaced || 0;
            var v = yh(a.a);
            v = null !== v && null != D(v, 8) ? D(v, 8) : 0;
            if (p + v >= g) {
              f = !0;
              break a;
            }
            p = D(f[n], 1);
            if (null == p) break;
            v = c[p];
            var r = G(f[n], uh, 2);
            null != r &&
              null != lc(r, 1) &&
              null != lc(r, 2) &&
              null != lc(r, 3) &&
              ((r = new qh(lc(r, 1), lc(r, 2), lc(r, 3))),
              pi(l, k, r) &&
                ((p = Hi(a, v, p, b, d, h)),
                null != p &&
                  null != p.P &&
                  ((p = p.P.getBoundingClientRect()), l.push(p))));
          }
          f = 0 < (Fi(a).numAutoAdsPlaced || 0);
        }
      }
    if (f) return !0;
    f = yh(a.a);
    if (null !== f && nc(f, 2))
      return (Fi(a).eatf = !0), af(7, [!0, 0, !1]), !0;
    f = new sh([2]);
    !e && G(a.b, fh, 15) && nc(G(a.b, fh, 15), 15) && f.add(4);
    for (e = 0; e < c.length; e++) if (Hi(a, c[e], e, b, d, f)) return !0;
    af(7, [!1, a.c, !1]);
    return !1;
  }
  function Hi(a, b, c, d, e, f) {
    if (
      !G(b, Vg, 4) ||
      !f.contains(D(G(b, Vg, 4), 1)) ||
      1 !== D(b, 8) ||
      !Bi(b, e)
    )
      return null;
    a.c++;
    if ((b = Ii(a, b, d, e)))
      (d = Fi(a)),
        d.numAutoAdsPlaced || (d.numAutoAdsPlaced = 0),
        null == d.placed && (d.placed = []),
        d.numAutoAdsPlaced++,
        d.placed.push({ index: c, element: b.P }),
        af(7, [!1, a.c, !0]);
    return b;
  }
  function Ii(a, b, c, d) {
    if (!Bi(b, d) || 1 != D(b, 8)) return null;
    d = G(b, Q, 1);
    if (!d) return null;
    d = ki(d);
    if (!d) return null;
    d = fi(d, a.a.document);
    if (0 == d.length) return null;
    d = d[0];
    var e = D(b, 2);
    e = ni[e];
    e = void 0 === e ? null : e;
    var f;
    if (!(f = null == e)) {
      a: {
        f = a.a;
        switch (e) {
          case 0:
            f = yi(zi(d), f);
            break a;
          case 3:
            f = yi(d, f);
            break a;
          case 2:
            var g = d.lastChild;
            f = yi(g ? (1 == g.nodeType ? g : zi(g)) : null, f);
            break a;
        }
        f = !1;
      }
      if ((c = !f && !(!c && 2 == e && !Ai(d))))
        (c = 1 == e || 2 == e ? d : d.parentNode),
          (c = !(c && !Xh(c) && 0 >= c.offsetWidth));
      f = !c;
    }
    if (!(c = f)) {
      c = a.o;
      f = D(b, 2);
      g = Da(d);
      g = c.b.a.get(g);
      if (!(g = g ? g.contains(f) : !1))
        a: {
          if (c.a.contains(Da(d)))
            switch (f) {
              case 2:
              case 3:
                g = !0;
                break a;
              default:
                g = !1;
                break a;
            }
          for (f = d.parentElement; f; ) {
            if (c.a.contains(Da(f))) {
              g = !0;
              break a;
            }
            f = f.parentElement;
          }
          g = !1;
        }
      c = g;
    }
    if (c) return null;
    c = G(b, Ug, 3);
    f = {};
    c && ((f.Da = D(c, 1)), (f.na = D(c, 2)), (f.clearBoth = !!mc(c, 3)));
    c = G(b, Vg, 4) && D(G(b, Vg, 4), 2) ? D(G(b, Vg, 4), 2) : null;
    c = kh(c);
    b = null == D(b, 12) ? null : D(b, 12);
    b = jh(a.i, c, null == b ? null : new ih(null, { google_ml_rank: b }));
    c = a.a;
    a = a.s;
    var h = c.document,
      k = f.clearBoth || !1;
    g = Gc(new Hc(h).a, 'DIV');
    var l = g.style;
    l.width = '100%';
    l.height = 'auto';
    l.clear = k ? 'both' : 'none';
    k = g.style;
    k.textAlign = 'center';
    f.Na && bi(k, f.Na);
    h = Gc(new Hc(h).a, 'INS');
    k = h.style;
    k.display = 'block';
    k.margin = 'auto';
    k.backgroundColor = 'transparent';
    f.Da && (k.marginTop = f.Da);
    f.na && (k.marginBottom = f.na);
    f.Fa && bi(k, f.Fa);
    g.appendChild(h);
    f = { ea: g, P: h };
    f.P.setAttribute('data-ad-format', 'auto');
    g = [];
    if ((h = b && b.oa)) f.ea.className = h.join(' ');
    h = f.P;
    h.className = 'adsbygoogle';
    h.setAttribute('data-ad-client', a);
    g.length && h.setAttribute('data-ad-channel', g.join('+'));
    a: {
      try {
        var n = f.ea;
        var p = void 0 === p ? 0 : p;
        if (N(313)) {
          p = void 0 === p ? 0 : p;
          var v = Zh(d, e, p);
          if (v.init) {
            var r = v.init;
            for (d = r; (d = v.$(d)); ) r = d;
            var A = { anchor: r, position: v.aa };
          } else A = { anchor: d, position: e };
          n['google-ama-order-assurance'] = p;
          Yh(n, A.anchor, A.position);
        } else Yh(n, d, e);
        b: {
          var t = f.P;
          t.setAttribute('data-adsbygoogle-status', 'reserved');
          t.className += ' adsbygoogle-noablate';
          n = { element: t };
          var F = b && b.wa;
          if (t.hasAttribute('data-pub-vars')) {
            try {
              F = JSON.parse(t.getAttribute('data-pub-vars'));
            } catch (Ea) {
              break b;
            }
            t.removeAttribute('data-pub-vars');
          }
          F && (n.params = F);
          (c.adsbygoogle = c.adsbygoogle || []).push(n);
        }
      } catch (Ea) {
        (t = f.ea) &&
          t.parentNode &&
          ((F = t.parentNode),
          F.removeChild(t),
          Xh(F) &&
            (F.style.display = F.getAttribute('data-init-display') || 'none'));
        t = !1;
        break a;
      }
      t = !0;
    }
    return t ? f : null;
  }
  function Fi(a) {
    return (a.a.google_ama_state = a.a.google_ama_state || {});
  }
  function Ji() {
    this.b = new Ki(this);
    this.a = 0;
  }
  Ji.prototype.resolve = function (a) {
    Li(this);
    this.a = 1;
    this.f = a;
    Mi(this.b);
  };
  Ji.prototype.reject = function (a) {
    Li(this);
    this.a = 2;
    this.c = a;
    Mi(this.b);
  };
  function Li(a) {
    if (0 != a.a) throw Error('Already resolved/rejected.');
  }
  function Ki(a) {
    this.a = a;
  }
  Ki.prototype.then = function (a, b) {
    if (this.b) throw Error('Then functions already set.');
    this.b = a;
    this.c = b;
    Mi(this);
  };
  function Mi(a) {
    switch (a.a.a) {
      case 0:
        break;
      case 1:
        a.b && a.b(a.a.f);
        break;
      case 2:
        a.c && a.c(a.a.c);
        break;
      default:
        throw Error('Unhandled deferred state.');
    }
  }
  function Ni(a, b) {
    this.exception = b;
  }
  function Oi(a, b) {
    this.c = x;
    this.a = a;
    this.b = b;
  }
  Oi.prototype.start = function () {
    this.f();
  };
  Oi.prototype.f = function () {
    try {
      switch (this.c.document.readyState) {
        case 'complete':
        case 'interactive':
          Gi(this.a, !0);
          Pi(this);
          break;
        default:
          Gi(this.a, !1) ? Pi(this) : this.c.setTimeout(Ja(this.f, this), 100);
      }
    } catch (a) {
      Pi(this, a);
    }
  };
  function Pi(a, b) {
    try {
      a.b.resolve(new Ni(Ei(a.a), b));
    } catch (c) {
      a.b.reject(c);
    }
  }
  function Qi(a) {
    oh(a, { atf: 1 });
  }
  function Ri(a, b) {
    (a.google_ama_state = a.google_ama_state || {}).exception = b;
    oh(a, { atf: 0 });
  }
  function Si() {
    this.debugCard = null;
    this.debugCardRequested = !1;
  }
  function Ti() {
    var a = this;
    this.a = new q.Promise(function (b, c) {
      a.resolve = b;
      a.reject = c;
    });
  }
  function Ui() {
    var a = new Ti();
    this.promise = a.a;
    this.resolve = a.resolve;
  }
  function Vi(a) {
    x.google_llp || (x.google_llp = {});
    var b = x.google_llp;
    b[7] || ((b[7] = new Ui()), a && a());
    return b[7];
  }
  function Wi(a) {
    return Vi(function () {
      Sc(x.document, Kc(a));
    }).promise;
  }
  function Xi(a, b, c) {
    var d = 'script';
    d = void 0 === d ? '' : d;
    var e = a.createElement('link');
    try {
      e.rel = 'preload';
      if (b instanceof mb) var f = pb(b).toString();
      else {
        if (b instanceof Gb) var g = Jb(b);
        else {
          if (b instanceof Gb) var h = b;
          else
            (b = 'object' == typeof b && b.b ? b.a() : String(b)),
              Kb.test(b) || (b = 'about:invalid#zClosurez'),
              (h = new Gb(Hb, b));
          g = Jb(h);
        }
        f = g;
      }
      e.href = f;
    } catch (k) {
      return;
    }
    d && (e.as = d);
    c && e.setAttribute('nonce', c);
    if ((a = a.getElementsByTagName('head')[0]))
      try {
        a.appendChild(e);
      } catch (k) {}
  }
  function Yi(a) {
    var b = {},
      c = {};
    return (
      (c.enable_page_level_ads = ((b.pltais = !0), b)),
      (c.google_ad_client = a),
      c
    );
  }
  function Zi(a) {
    var b = ag(x, 12, a.google_ad_client);
    a = 'google_ad_host' in a;
    var c = 0.5 < Math.random(),
      d = Sd(x.location, 'google_ads_preview');
    return (b && !a && c) || d;
  }
  function $i(a) {
    if (x.google_apltlad || Qd(x) != x || !a.google_ad_client) return null;
    var b = Zi(a);
    x.google_apltlad = !0;
    var c = Yi(a.google_ad_client),
      d = c.enable_page_level_ads;
    Yc(a, function (e, f) {
      Ac[f] && 'google_ad_client' != f && (d[f] = e);
    });
    if (b) d.google_ad_channel = 'AutoInsertAutoAdCode';
    else if (
      ((d.google_pgb_reactive = 7),
      'google_ad_section' in a || 'google_ad_region' in a)
    )
      d.google_ad_section = a.google_ad_section || a.google_ad_region;
    return c;
  }
  function aj(a) {
    return (
      Ca(a.enable_page_level_ads) &&
      7 == a.enable_page_level_ads.google_pgb_reactive
    );
  }
  function Nf(a) {
    a.shv = ud();
  }
  Gf.Aa(!vd);
  function bj(a, b) {
    return Dh(b, a) + T(b, a, 'height', K);
  }
  function cj(a) {
    var b = this;
    this.a = a;
    a.google_iframe_oncopy ||
      (a.google_iframe_oncopy = {
        handlers: {},
        upd: function (c, d) {
          var e = dj('rx', c),
            f = Number;
          a: {
            if (c && (c = c.match('dt=([^&]+)')) && 2 == c.length) {
              c = c[1];
              break a;
            }
            c = '';
          }
          f = f(c);
          f = new Date().getTime() - f;
          e = e.replace(
            /&dtd=(\d+|-?M)/,
            '&dtd=' + (1e5 <= f ? 'M' : 0 <= f ? f : '-M')
          );
          b.set(d, e);
          return e;
        },
      });
    this.b = a.google_iframe_oncopy;
  }
  cj.prototype.set = function (a, b) {
    var c = this;
    this.b.handlers[a] = b;
    this.a.addEventListener &&
      this.a.addEventListener(
        'load',
        function () {
          var d = c.a.document.getElementById(a);
          try {
            var e = d.contentWindow.document;
            if (d.onload && e && (!e.body || !e.body.firstChild)) d.onload();
          } catch (f) {}
        },
        !1
      );
  };
  function dj(a, b) {
    var c = new RegExp('\\b' + a + '=(\\d+)'),
      d = c.exec(b);
    d && (b = b.replace(c, a + '=' + (+d[1] + 1 || 1)));
    return b;
  }
  var ej,
    fj =
      'var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}';
  var U = fj;
  /[\x00&<>"']/.test(U) &&
    (-1 != U.indexOf('&') && (U = U.replace(yb, '&amp;')),
    -1 != U.indexOf('<') && (U = U.replace(zb, '&lt;')),
    -1 != U.indexOf('>') && (U = U.replace(Ab, '&gt;')),
    -1 != U.indexOf('"') && (U = U.replace(Bb, '&quot;')),
    -1 != U.indexOf("'") && (U = U.replace(Cb, '&#39;')),
    -1 != U.indexOf('\x00') && (U = U.replace(Db, '&#0;')));
  fj = U;
  ej = fj;
  var gj = null;
  function V(a, b, c, d) {
    d = void 0 === d ? !1 : d;
    S.call(this, a, b);
    this.W = c;
    this.La = d;
  }
  qa(V, S);
  V.prototype.ca = function () {
    return this.W;
  };
  V.prototype.Y = function (a, b, c) {
    b.google_ad_resize ||
      ((c.style.height = this.height() + 'px'), (b.rpe = !0));
  };
  function hj(a) {
    return function (b) {
      return !!(b.W & a);
    };
  }
  var ij = cc('script');
  function jj(a, b, c, d, e, f, g, h, k, l, n, p, v, r) {
    this.D = a;
    this.a = b;
    this.W = void 0 === c ? null : c;
    this.c = void 0 === d ? null : d;
    this.T = void 0 === e ? null : e;
    this.b = void 0 === f ? null : f;
    this.f = void 0 === g ? null : g;
    this.o = void 0 === h ? !1 : h;
    this.s = void 0 === k ? !1 : k;
    this.O = void 0 === l ? null : l;
    this.X = void 0 === n ? null : n;
    this.g = void 0 === p ? null : p;
    this.i = void 0 === v ? null : v;
    this.S = void 0 === r ? null : r;
    this.U = this.K = this.J = null;
  }
  function kj(a, b, c) {
    null != a.W && (c.google_responsive_formats = a.W);
    null != a.T && (c.google_safe_for_responsive_override = a.T);
    null != a.b &&
      (!0 === a.b
        ? (c.google_full_width_responsive_allowed = !0)
        : ((c.google_full_width_responsive_allowed = !1), (c.gfwrnwer = a.b)));
    null != a.f && !0 !== a.f && (c.gfwrnher = a.f);
    a.o && (c.google_bfa = a.o);
    a.s && (c.ebfa = a.s);
    var d = a.i || c.google_ad_width;
    null != d && (c.google_resizing_width = d);
    d = a.g || c.google_ad_height;
    null != d && (c.google_resizing_height = d);
    d = a.a.R(b);
    var e = a.a.height();
    c.google_ad_resize ||
      ((c.google_ad_width = d),
      (c.google_ad_height = e),
      (c.google_ad_format = a.a.fa(b)),
      (c.google_responsive_auto_format = a.D),
      null != a.c && (c.armr = a.c),
      (c.google_ad_resizable = !0),
      (c.google_override_format = 1),
      (c.google_loader_features_used = 128),
      !0 === a.b && (c.gfwrnh = a.a.height() + 'px'));
    null != a.O && (c.gfwroml = a.O);
    null != a.X && (c.gfwromr = a.X);
    null != a.g && (c.gfwroh = a.g);
    null != a.i && (c.gfwrow = a.i);
    null != a.S && (c.gfwroz = a.S);
    null != a.J && (c.gml = a.J);
    null != a.K && (c.gmr = a.K);
    null != a.U && (c.gzi = a.U);
    b = Od();
    b = Rd(b) || b;
    Sd(b.location, 'google_responsive_slot_debug') &&
      (c.ds =
        'outline:thick dashed ' +
        (d && e ? (!0 !== a.b || !0 !== a.f ? '#ffa500' : '#0f0') : '#f00') +
        ' !important;');
    Sd(b.location, 'google_responsive_dummy_ad') &&
      (Ua([1, 2, 3, 4, 5, 6, 7, 8], a.D) || 1 === a.c) &&
      2 !== a.c &&
      ((a = JSON.stringify({
        googMsgType: 'adpnt',
        key_value: [{ key: 'qid', value: 'DUMMY_AD' }],
      })),
      (c.dash =
        '<' +
        ij +
        ">window.top.postMessage('" +
        a +
        "', '*');\n          </" +
        ij +
        '>\n          <div id="dummyAd" style="width:' +
        d +
        'px;height:' +
        e +
        'px;\n            background:#ddd;border:3px solid #f00;box-sizing:border-box;\n            color:#000;">\n            <p>Requested size:' +
        d +
        'x' +
        e +
        '</p>\n            <p>Rendered size:' +
        d +
        'x' +
        e +
        '</p>\n          </div>'));
  } /* 
 
 Copyright 2019 The AMP HTML Authors. All Rights Reserved. 
 
 Licensed under the Apache License, Version 2.0 (the "License"); 
 you may not use this file except in compliance with the License. 
 You may obtain a copy of the License at 
 
      http://www.apache.org/licenses/LICENSE-2.0 
 
 Unless required by applicable law or agreed to in writing, software 
 distributed under the License is distributed on an "AS-IS" BASIS, 
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 See the License for the specific language governing permissions and 
 limitations under the License. 
*/
  var lj = {},
    mj =
      ((lj.image_stacked = 1 / 1.91),
      (lj.image_sidebyside = 1 / 3.82),
      (lj.mobile_banner_image_sidebyside = 1 / 3.82),
      (lj.pub_control_image_stacked = 1 / 1.91),
      (lj.pub_control_image_sidebyside = 1 / 3.82),
      (lj.pub_control_image_card_stacked = 1 / 1.91),
      (lj.pub_control_image_card_sidebyside = 1 / 3.74),
      (lj.pub_control_text = 0),
      (lj.pub_control_text_card = 0),
      lj),
    nj = {},
    oj =
      ((nj.image_stacked = 80),
      (nj.image_sidebyside = 0),
      (nj.mobile_banner_image_sidebyside = 0),
      (nj.pub_control_image_stacked = 80),
      (nj.pub_control_image_sidebyside = 0),
      (nj.pub_control_image_card_stacked = 85),
      (nj.pub_control_image_card_sidebyside = 0),
      (nj.pub_control_text = 80),
      (nj.pub_control_text_card = 80),
      nj),
    pj = {},
    qj =
      ((pj.pub_control_image_stacked = 100),
      (pj.pub_control_image_sidebyside = 200),
      (pj.pub_control_image_card_stacked = 150),
      (pj.pub_control_image_card_sidebyside = 250),
      (pj.pub_control_text = 100),
      (pj.pub_control_text_card = 150),
      pj);
  function rj(a) {
    var b = 0;
    a.B && b++;
    a.u && b++;
    a.v && b++;
    if (3 > b)
      return {
        A:
          'Tags data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num should be set together.',
      };
    b = a.B.split(',');
    var c = a.v.split(',');
    a = a.u.split(',');
    if (b.length !== c.length || b.length !== a.length)
      return {
        A:
          'Lengths of parameters data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num must match. Example: \n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside"',
      };
    if (2 < b.length)
      return {
        A:
          'The parameter length of attribute data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num is too long. At most 2 parameters for each attribute are needed: one for mobile and one for desktop, while you are providing ' +
          (b.length +
            ' parameters. Example: \n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside".'),
      };
    for (var d = [], e = [], f = 0; f < b.length; f++) {
      var g = Number(c[f]);
      if (isNaN(g) || 0 === g)
        return {
          A: "Wrong value '" + c[f] + "' for data-matched-content-rows-num.",
        };
      d.push(g);
      g = Number(a[f]);
      if (isNaN(g) || 0 === g)
        return {
          A: "Wrong value '" + a[f] + "' for data-matched-content-columns-num.",
        };
      e.push(g);
    }
    return { v: d, u: e, ta: b };
  }
  function sj(a) {
    return 1200 <= a
      ? { width: 1200, height: 600 }
      : 850 <= a
      ? { width: a, height: Math.floor(0.5 * a) }
      : 550 <= a
      ? { width: a, height: Math.floor(0.6 * a) }
      : 468 <= a
      ? { width: a, height: Math.floor(0.7 * a) }
      : { width: a, height: Math.floor(3.44 * a) };
  }
  var tj = [
    'google_content_recommendation_ui_type',
    'google_content_recommendation_columns_num',
    'google_content_recommendation_rows_num',
  ];
  function uj(a, b) {
    S.call(this, a, b);
  }
  qa(uj, S);
  uj.prototype.R = function (a) {
    return Math.min(1200, Math.max(this.minWidth(), Math.round(a)));
  };
  function vj(a, b) {
    wj(a, b);
    if ('pedestal' == b.google_content_recommendation_ui_type)
      return new jj(9, new uj(a, Math.floor(a * b.google_phwr)));
    var c = Lc();
    468 > a
      ? c
        ? ((c = a - 8 - 8),
          (c =
            Math.floor(c / 1.91 + 70) +
            Math.floor(
              11 *
                (c * mj.mobile_banner_image_sidebyside +
                  oj.mobile_banner_image_sidebyside) +
                96
            )),
          (a = {
            N: a,
            L: c,
            u: 1,
            v: 12,
            B: 'mobile_banner_image_sidebyside',
          }))
        : ((a = sj(a)),
          (a = { N: a.width, L: a.height, u: 1, v: 13, B: 'image_sidebyside' }))
      : ((a = sj(a)),
        (a = { N: a.width, L: a.height, u: 4, v: 2, B: 'image_stacked' }));
    xj(b, a);
    return new jj(9, new uj(a.N, a.L));
  }
  function yj(a, b) {
    wj(a, b);
    var c = rj({
      v: b.google_content_recommendation_rows_num,
      u: b.google_content_recommendation_columns_num,
      B: b.google_content_recommendation_ui_type,
    });
    if (c.A) a = { N: 0, L: 0, u: 0, v: 0, B: 'image_stacked', A: c.A };
    else {
      var d = 2 === c.ta.length && 468 <= a ? 1 : 0;
      var e = c.ta[d];
      e = 0 === e.indexOf('pub_control_') ? e : 'pub_control_' + e;
      var f = qj[e];
      for (var g = c.u[d]; a / g < f && 1 < g; ) g--;
      f = g;
      c = c.v[d];
      d = Math.floor((((a - 8 * f - 8) / f) * mj[e] + oj[e]) * c + 8 * c + 8);
      a =
        1500 < a
          ? {
              width: 0,
              height: 0,
              ja: 'Calculated slot width is too large: ' + a,
            }
          : 1500 < d
          ? {
              width: 0,
              height: 0,
              ja: 'Calculated slot height is too large: ' + d,
            }
          : { width: a, height: d };
      a = a.ja
        ? { N: 0, L: 0, u: 0, v: 0, B: e, A: a.ja }
        : { N: a.width, L: a.height, u: f, v: c, B: e };
    }
    if (a.A) throw new O(a.A);
    xj(b, a);
    return new jj(9, new uj(a.N, a.L));
  }
  function wj(a, b) {
    if (0 >= a)
      throw new O(
        'Invalid responsive width from Matched Content slot ' +
          b.google_ad_slot +
          ': ' +
          a +
          '. Please ensure to put this Matched Content slot into a non-zero width div container.'
      );
  }
  function xj(a, b) {
    a.google_content_recommendation_ui_type = b.B;
    a.google_content_recommendation_columns_num = b.u;
    a.google_content_recommendation_rows_num = b.v;
  }
  function zj(a, b) {
    S.call(this, a, b);
  }
  qa(zj, S);
  zj.prototype.R = function () {
    return this.minWidth();
  };
  zj.prototype.Y = function (a, b, c) {
    Oh(a, c);
    b.google_ad_resize ||
      ((c.style.height = this.height() + 'px'), (b.rpe = !0));
  };
  var Aj = {
    'image-top': function (a) {
      return 600 >= a ? 284 + 0.414 * (a - 250) : 429;
    },
    'image-middle': function (a) {
      return 500 >= a ? 196 - 0.13 * (a - 250) : 164 + 0.2 * (a - 500);
    },
    'image-side': function (a) {
      return 500 >= a ? 205 - 0.28 * (a - 250) : 134 + 0.21 * (a - 500);
    },
    'text-only': function (a) {
      return 500 >= a ? 187 - 0.228 * (a - 250) : 130;
    },
    'in-article': function (a) {
      return 420 >= a
        ? a / 1.2
        : 460 >= a
        ? a / 1.91 + 130
        : 800 >= a
        ? a / 4
        : 200;
    },
  };
  function Bj(a, b) {
    S.call(this, a, b);
  }
  qa(Bj, S);
  Bj.prototype.R = function () {
    return Math.min(1200, this.minWidth());
  };
  function Cj(a, b, c, d, e) {
    var f = e.google_ad_layout || 'image-top';
    if ('in-article' == f && 'false' != e.google_full_width_responsive) {
      var g = Hh(b, c, a, 0.2, e);
      if (!0 !== g) e.gfwrnwer = g;
      else if ((g = P(b)))
        (e.google_full_width_responsive_allowed = !0),
          c.parentElement && (Mh(b, c), Oh(b, c), (a = g));
    }
    if (250 > a)
      throw new O(
        'Fluid responsive ads must be at least 250px wide: availableWidth=' + a
      );
    a = Math.min(1200, Math.floor(a));
    if (d && 'in-article' != f) {
      f = Math.ceil(d);
      if (50 > f)
        throw new O(
          'Fluid responsive ads must be at least 50px tall: height=' + f
        );
      return new jj(11, new S(a, f));
    }
    if ('in-article' != f && (d = e.google_ad_layout_key)) {
      f = '' + d;
      b = Math.pow(10, 3);
      if ((d = (c = f.match(/([+-][0-9a-z]+)/g)) && c.length)) {
        e = [];
        for (g = 0; g < d; g++) e.push(parseInt(c[g], 36) / b);
        b = e;
      } else b = null;
      if (!b) throw new O('Invalid data-ad-layout-key value: ' + f);
      f = (a + -725) / 1e3;
      c = 0;
      d = 1;
      e = b.length;
      for (g = 0; g < e; g++) (c += b[g] * d), (d *= f);
      f = Math.ceil(1e3 * c - -725 + 10);
      if (isNaN(f)) throw new O('Invalid height: height=' + f);
      if (50 > f)
        throw new O(
          'Fluid responsive ads must be at least 50px tall: height=' + f
        );
      if (1200 < f)
        throw new O(
          'Fluid responsive ads must be at most 1200px tall: height=' + f
        );
      return new jj(11, new S(a, f));
    }
    d = Aj[f];
    if (!d) throw new O('Invalid data-ad-layout value: ' + f);
    c = Rh(c, b);
    b = P(b);
    b =
      'in-article' !== f || c || a !== b
        ? Math.ceil(d(a))
        : Math.ceil(1.25 * d(a));
    return new jj(11, 'in-article' == f ? new Bj(a, b) : new S(a, b));
  }
  function Dj(a) {
    return function (b) {
      for (var c = a.length - 1; 0 <= c; --c) if (!a[c](b)) return !1;
      return !0;
    };
  }
  function Ej(a, b, c) {
    for (var d = a.length, e = null, f = 0; f < d; ++f) {
      var g = a[f];
      if (b(g)) {
        if (!c || c(g)) return g;
        null === e && (e = g);
      }
    }
    return e;
  }
  var W = [
      new V(970, 90, 2),
      new V(728, 90, 2),
      new V(468, 60, 2),
      new V(336, 280, 1),
      new V(320, 100, 2),
      new V(320, 50, 2),
      new V(300, 600, 4),
      new V(300, 250, 1),
      new V(250, 250, 1),
      new V(234, 60, 2),
      new V(200, 200, 1),
      new V(180, 150, 1),
      new V(160, 600, 4),
      new V(125, 125, 1),
      new V(120, 600, 4),
      new V(120, 240, 4),
      new V(120, 120, 1, !0),
    ],
    Fj = [
      W[6],
      W[12],
      W[3],
      W[0],
      W[7],
      W[14],
      W[1],
      W[8],
      W[10],
      W[4],
      W[15],
      W[2],
      W[11],
      W[5],
      W[13],
      W[9],
      W[16],
    ];
  function Gj(a, b, c, d, e) {
    'false' == e.google_full_width_responsive
      ? (c = { l: a, m: 1 })
      : ('autorelaxed' == b && e.google_full_width_responsive) ||
        Hj(b) ||
        e.google_ad_resize
      ? (488 > P(c) && (Jh(c) || N(1002)) && Mh(c, d),
        (b = Ih(a, c, d, e)),
        (c = !0 !== b ? { l: a, m: b } : { l: P(c) || a, m: !0 }))
      : (c = { l: a, m: 2 });
    b = c.m;
    return !0 !== b
      ? { l: a, m: b }
      : d.parentElement
      ? { l: c.l, m: b }
      : { l: a, m: b };
  }
  function Ij(a, b, c, d, e) {
    var f = Pf(247, function () {
        return Gj(a, b, c, d, e);
      }),
      g = f.l;
    f = f.m;
    var h = !0 === f,
      k = K(d.style.width),
      l = K(d.style.height),
      n = Jj(g, b, c, d, e, h);
    g = n.M;
    h = n.I;
    var p = n.G,
      v = n.H,
      r = n.ca;
    n = n.sa;
    var A = Kj(b, r),
      t,
      F = (t = T(d, c, 'marginLeft', K)) ? t + 'px' : '',
      Ea = (t = T(d, c, 'marginRight', K)) ? t + 'px' : '';
    t = T(d, c, 'zIndex') || '';
    return new jj(A, g, r, null, n, f, h, p, v, F, Ea, l, k, t);
  }
  function Hj(a) {
    return (
      'auto' == a || /^((^|,) *(horizontal|vertical|rectangle) *)+$/.test(a)
    );
  }
  function Jj(a, b, c, d, e, f) {
    b = 'auto' == b ? (0.25 >= a / Math.min(1200, P(c)) ? 4 : 3) : Gh(b);
    var g = !1,
      h = !1;
    if (488 > P(c)) {
      var k = Fh(d, c);
      var l = Rh(d, c);
      g = !l && k;
      h = l && k;
    }
    l = 488 > P(c);
    var n = [Ph(a), hj(b)];
    Jh(c) || n.push(Qh(l, c, d, h));
    null != e.google_max_responsive_height &&
      n.push(Th(e.google_max_responsive_height));
    var p = [
      function (r) {
        return !r.La;
      },
    ];
    (!g && !h) || Jh(c) || ((g = Vh(c, d)), p.push(Th(g)));
    var v =
      l && !f && 3 === b && Lj(c)
        ? new V(a, Math.floor(a / 1.2), 1)
        : Ej(Fj.slice(0), Dj(n), Dj(p));
    if (!v) throw new O('No slot size for availableWidth=' + a);
    p = Pf(248, function () {
      var r;
      a: if (f) {
        if (e.gfwrnh && (r = K(e.gfwrnh))) {
          r = { M: new zj(a, r), I: !0, G: !1, H: !1 };
          break a;
        }
        r = !1;
        var A = Yf(c).clientHeight,
          t = Dh(d, c),
          F = c.google_lpabyc,
          Ea = Uh(d, c);
        Ea &&
          2 < Ea &&
          !c.google_bfabyc &&
          (!F || t - F > A) &&
          ((A = 0.9 * Yf(c).clientHeight),
          (t = Math.min(A, Mj(c, d, e))),
          A &&
            t == A &&
            ((t = c.google_pbfabyc),
            (r = !t),
            t || (c.google_pbfabyc = Dh(d, c) + A)));
        A = a / 1.2;
        if (Jh(c)) t = A;
        else if (((t = Math.min(A, Mj(c, d, e))), t < 0.5 * A || 100 > t))
          t = A;
        N(282) && !Rh(d, c) && (t = Math.max(t, 0.5 * Yf(c).clientHeight));
        r = { M: new zj(a, Math.floor(t)), I: t < A ? 102 : !0, G: !1, H: r };
      } else r = { M: v, I: 100, G: !1, H: !1 };
      return r;
    });
    g = p.M;
    l = p.I;
    n = p.G;
    p = p.H;
    return 'in-article' === e.google_ad_layout && Nj(c)
      ? { M: Oj(a, c, d, g, e), I: !1, G: !1, H: !1, ca: b, sa: k }
      : { M: g, I: l, G: n, H: p, ca: b, sa: k };
  }
  function Mj(a, b, c) {
    if (c.google_resizing_allowed || 'true' == c.google_full_width_responsive)
      a = Infinity;
    else {
      c = Infinity;
      do {
        var d = T(b, a, 'height', K);
        d && (c = Math.min(c, d));
        (d = T(b, a, 'maxHeight', K)) && (c = Math.min(c, d));
      } while ((b = b.parentElement) && 'HTML' != b.tagName);
      a = c;
    }
    return a;
  }
  function Kj(a, b) {
    if ('auto' == a) return 1;
    switch (b) {
      case 2:
        return 2;
      case 1:
        return 3;
      case 4:
        return 4;
      case 3:
        return 5;
      case 6:
        return 6;
      case 5:
        return 7;
      case 7:
        return 8;
    }
    throw Error('bad mask');
  }
  function Oj(a, b, c, d, e) {
    var f = e.google_ad_height || T(c, b, 'height', K);
    b = Cj(a, b, c, f, e).a;
    return b.minWidth() * b.height() > a * d.height()
      ? new V(b.minWidth(), b.height(), 1)
      : d;
  }
  function Nj(a) {
    return N(227) || (a.location && '#hffwroe2etoq' == a.location.hash);
  }
  function Lj(a) {
    return N(232) || (a.location && '#affwroe2etoq' == a.location.hash);
  }
  function Pj(a, b) {
    S.call(this, a, b);
  }
  qa(Pj, S);
  Pj.prototype.R = function () {
    return this.minWidth();
  };
  Pj.prototype.fa = function (a) {
    return S.prototype.fa.call(this, a) + '_0ads_al';
  };
  var Qj = [
    new Pj(728, 15),
    new Pj(468, 15),
    new Pj(200, 90),
    new Pj(180, 90),
    new Pj(160, 90),
    new Pj(120, 90),
  ];
  function Rj(a, b, c) {
    var d = 250,
      e = 90;
    d = void 0 === d ? 130 : d;
    e = void 0 === e ? 30 : e;
    var f = Ej(Qj, Ph(a));
    if (!f) throw new O('No link unit size for width=' + a + 'px');
    a = Math.min(a, 1200);
    f = f.height();
    b = Math.max(f, b);
    d = new jj(10, new Pj(a, Math.min(b, 15 == f ? e : d))).a;
    b = d.minWidth();
    d = d.height();
    15 <= c && (d = c);
    return new jj(10, new Pj(b, d));
  }
  function Sj(a, b, c, d) {
    if ('false' == d.google_full_width_responsive)
      return (d.google_full_width_responsive_allowed = !1), (d.gfwrnwer = 1), a;
    var e = Ih(a, b, c, d);
    if (!0 !== e)
      return (d.google_full_width_responsive_allowed = !1), (d.gfwrnwer = e), a;
    e = P(b);
    if (!e) return a;
    d.google_full_width_responsive_allowed = !0;
    Oh(b, c);
    return e;
  }
  function Tj(a, b, c, d, e) {
    var f;
    (f = P(b))
      ? 488 > P(b)
        ? b.innerHeight >= b.innerWidth
          ? ((e.google_full_width_responsive_allowed = !0),
            Oh(b, c),
            (f = { l: f, m: !0 }))
          : (f = { l: a, m: 5 })
        : (f = { l: a, m: 4 })
      : (f = { l: a, m: 10 });
    var g = f;
    f = g.l;
    g = g.m;
    if (!0 !== g || a == f)
      return new jj(12, new S(a, d), null, null, !0, g, 100);
    a = Jj(f, 'auto', b, c, e, !0);
    return new jj(1, a.M, a.ca, 2, !0, g, a.I, a.G, a.H);
  }
  function Uj(a, b) {
    var c = b.google_ad_format;
    if ('autorelaxed' == c) {
      a: {
        if ('pedestal' != b.google_content_recommendation_ui_type)
          for (a = w(tj), c = a.next(); !c.done; c = a.next())
            if (null != b[c.value]) {
              b = !0;
              break a;
            }
        b = !1;
      }
      return b ? 9 : 5;
    }
    if (Hj(c)) return 1;
    if ('link' == c) return 4;
    if ('fluid' == c) {
      if ((c = 'in-article' === b.google_ad_layout))
        c =
          N(208) ||
          N(227) ||
          (a.location &&
            ('#hffwroe2etop' == a.location.hash ||
              '#hffwroe2etoq' == a.location.hash));
      return c ? (Vj(b), 1) : 8;
    }
    if (27 === b.google_reactive_ad_format) return Vj(b), 1;
  }
  function Wj(a, b, c, d, e) {
    e =
      b.offsetWidth ||
      ((c.google_ad_resize || (void 0 === e ? !1 : e)) &&
        T(b, d, 'width', K)) ||
      c.google_ad_width ||
      0;
    (N(310) || (d.location && '#ooimne2e' == d.location.hash)) &&
      4 === a &&
      ((c.google_ad_format = 'auto'), (a = 1));
    var f = (f = Xj(a, e, b, c, d)) ? f : Ij(e, c.google_ad_format, d, b, c);
    f.a.Y(d, c, b);
    kj(f, e, c);
    1 != a && ((a = f.a.height()), (b.style.height = a + 'px'));
  }
  function Xj(a, b, c, d, e) {
    var f = d.google_ad_height || T(c, e, 'height', K);
    switch (a) {
      case 5:
        return (
          (a = Pf(247, function () {
            return Gj(b, d.google_ad_format, e, c, d);
          })),
          (f = a.l),
          (a = a.m),
          !0 === a && b != f && Oh(e, c),
          !0 === a
            ? (d.google_full_width_responsive_allowed = !0)
            : ((d.google_full_width_responsive_allowed = !1), (d.gfwrnwer = a)),
          vj(f, d)
        );
      case 9:
        return yj(b, d);
      case 4:
        return (a = Sj(b, e, c, d)), Rj(a, Vh(e, c), f);
      case 8:
        return Cj(b, e, c, f, d);
      case 10:
        return Tj(b, e, c, f, d);
    }
  }
  function Vj(a) {
    a.google_ad_format = 'auto';
    a.armr = 3;
  }
  function X(a) {
    this.f = [];
    this.b = a || window;
    this.a = 0;
    this.c = null;
    this.g = 0;
  }
  var Yj;
  m = X.prototype;
  m.Ha = function (a, b) {
    0 != this.a || 0 != this.f.length || (b && b != window)
      ? this.pa(a, b)
      : ((this.a = 2), this.ya(new Zj(a, window)));
  };
  m.pa = function (a, b) {
    this.f.push(new Zj(a, b || this.b));
    ak(this);
  };
  m.Oa = function (a) {
    this.a = 1;
    if (a) {
      var b = Qf(188, Ja(this.xa, this, !0));
      this.c = this.b.setTimeout(b, a);
    }
  };
  m.xa = function (a) {
    a && ++this.g;
    1 == this.a &&
      (null != this.c && (this.b.clearTimeout(this.c), (this.c = null)),
      (this.a = 0));
    ak(this);
  };
  m.Va = function () {
    return !(!window || !Array);
  };
  m.Ja = function () {
    return this.g;
  };
  function ak(a) {
    var b = Qf(189, Ja(a.Wa, a));
    a.b.setTimeout(b, 0);
  }
  m.Wa = function () {
    if (0 == this.a && this.f.length) {
      var a = this.f.shift();
      this.a = 2;
      var b = Qf(190, Ja(this.ya, this, a));
      a.a.setTimeout(b, 0);
      ak(this);
    }
  };
  m.ya = function (a) {
    this.a = 0;
    a.b();
  };
  function bk(a) {
    try {
      return a.sz();
    } catch (b) {
      return !1;
    }
  }
  function ck(a) {
    return (
      !!a &&
      ('object' === typeof a || 'function' === typeof a) &&
      bk(a) &&
      Id(a.nq) &&
      Id(a.nqa) &&
      Id(a.al) &&
      Id(a.rl)
    );
  }
  function dk() {
    if (Yj && bk(Yj)) return Yj;
    var a = di(),
      b = a.google_jobrunner;
    return ck(b) ? (Yj = b) : (a.google_jobrunner = Yj = new X(a));
  }
  function ek(a, b) {
    dk().nq(a, b);
  }
  function fk(a, b) {
    dk().nqa(a, b);
  }
  X.prototype.nq = X.prototype.Ha;
  X.prototype.nqa = X.prototype.pa;
  X.prototype.al = X.prototype.Oa;
  X.prototype.rl = X.prototype.xa;
  X.prototype.sz = X.prototype.Va;
  X.prototype.tc = X.prototype.Ja;
  function Zj(a, b) {
    this.b = a;
    this.a = b;
  }
  function gk(a, b) {
    var c = Rd(b);
    if (c) {
      c = P(c);
      var d = Tc(a, b) || {},
        e = d.direction;
      if ('0px' === d.width && 'none' != d.cssFloat) return -1;
      if ('ltr' === e && c)
        return Math.floor(Math.min(1200, c - a.getBoundingClientRect().left));
      if ('rtl' === e && c)
        return (
          (a =
            b.document.body.getBoundingClientRect().right -
            a.getBoundingClientRect().right),
          Math.floor(
            Math.min(
              1200,
              c - a - Math.floor((c - b.document.body.clientWidth) / 2)
            )
          )
        );
    }
    return -1;
  }
  var hk = {},
    ik =
      ((hk.google_ad_modifications = !0),
      (hk.google_analytics_domain_name = !0),
      (hk.google_analytics_uacct = !0),
      (hk.google_pause_ad_requests = !0),
      hk);
  function jk(a, b, c) {
    c = void 0 === c ? document : c;
    c = void 0 === c ? document : c;
    b = mc(b, 5) ? c.cookie : null;
    return null === b ? null : new Ec({ cookie: b }).get(a) || '';
  }
  function kk(a) {
    this.a = a;
    this.b = 0;
  }
  function lk(a, b) {
    if (jk('__gads', b, a.a.document)) return !0;
    var c = a.a.document;
    c = void 0 === c ? document : c;
    mc(b, 5) && new Ec(c).set('GoogleAdServingTest', 'Good', void 0);
    if ((c = 'Good' === jk('GoogleAdServingTest', b, a.a.document)))
      (a = a.a.document),
        (a = void 0 === a ? document : a),
        mc(b, 5) &&
          ((b = new Ec(a)),
          b.get('GoogleAdServingTest'),
          b.set('GoogleAdServingTest', '', {
            ua: 0,
            path: void 0,
            domain: void 0,
          }));
    return c;
  }
  var mk = /^\.google\.(com?\.)?[a-z]{2,3}$/,
    nk = /\.(cn|com\.bi|do|sl|ba|by|ma|am)$/;
  function ok(a) {
    return mk.test(a) && !nk.test(a);
  }
  var pk = x;
  function qk(a) {
    a = 'https://adservice' + (a + '/adsid/integrator.js');
    var b = ['domain=' + encodeURIComponent(x.location.hostname)];
    Y[3] >= La() && b.push('adsid=' + encodeURIComponent(Y[1]));
    return a + '?' + b.join('&');
  }
  var Y, Z;
  function rk() {
    pk = x;
    Y = pk.googleToken = pk.googleToken || {};
    var a = La();
    (Y[1] && Y[3] > a && 0 < Y[2]) ||
      ((Y[1] = ''), (Y[2] = -1), (Y[3] = -1), (Y[4] = ''), (Y[6] = ''));
    Z = pk.googleIMState = pk.googleIMState || {};
    ok(Z[1]) || (Z[1] = '.google.com');
    Array.isArray(Z[5]) || (Z[5] = []);
    'boolean' !== typeof Z[6] && (Z[6] = !1);
    Array.isArray(Z[7]) || (Z[7] = []);
    'number' !== typeof Z[8] && (Z[8] = 0);
  }
  var sk = {
    ga: function () {
      return 0 < Z[8];
    },
    Qa: function () {
      Z[8]++;
    },
    Ra: function () {
      0 < Z[8] && Z[8]--;
    },
    Sa: function () {
      Z[8] = 0;
    },
    $a: function () {
      return !1;
    },
    Ia: function () {
      return Z[5];
    },
    Ga: function (a) {
      try {
        a();
      } catch (b) {
        x.setTimeout(function () {
          throw b;
        }, 0);
      }
    },
    Pa: function () {
      if (!sk.ga()) {
        var a = x.document,
          b = function (e) {
            e = qk(e);
            a: {
              try {
                var f = va();
                break a;
              } catch (g) {}
              f = void 0;
            }
            Xi(a, e, f);
            f = a.createElement('script');
            f.type = 'text/javascript';
            f.onerror = function () {
              return x.processGoogleToken({}, 2);
            };
            e = Kc(e);
            f.src = pb(e);
            Yb(f);
            try {
              (a.head || a.body || a.documentElement).appendChild(f), sk.Qa();
            } catch (g) {}
          },
          c = Z[1];
        b(c);
        '.google.com' != c && b('.google.com');
        b = {};
        var d = ((b.newToken = 'FBT'), b);
        x.setTimeout(function () {
          return x.processGoogleToken(d, 1);
        }, 1e3);
      }
    },
  };
  function tk() {
    x.processGoogleToken =
      x.processGoogleToken ||
      function (a, b) {
        var c = a;
        c = void 0 === c ? {} : c;
        b = void 0 === b ? 0 : b;
        a = c.newToken || '';
        var d = 'NT' == a,
          e = parseInt(c.freshLifetimeSecs || '', 10),
          f = parseInt(c.validLifetimeSecs || '', 10),
          g = c['1p_jar'] || '';
        c = c.pucrd || '';
        rk();
        1 == b ? sk.Sa() : sk.Ra();
        var h = (pk.googleToken = pk.googleToken || {}),
          k =
            0 == b &&
            a &&
            'string' === typeof a &&
            !d &&
            'number' === typeof e &&
            0 < e &&
            'number' === typeof f &&
            0 < f &&
            'string' === typeof g;
        d = d && !sk.ga() && (!(Y[3] >= La()) || 'NT' == Y[1]);
        var l = !(Y[3] >= La()) && 0 != b;
        if (k || d || l)
          (d = La()),
            (e = d + 1e3 * e),
            (f = d + 1e3 * f),
            1e-5 > Math.random() &&
              Ad(
                x,
                'https://pagead2.googlesyndication.com/pagead/gen_204?id=imerr&err=' +
                  b
              ),
            (h[5] = b),
            (h[1] = a),
            (h[2] = e),
            (h[3] = f),
            (h[4] = g),
            (h[6] = c),
            rk();
        if (k || !sk.ga()) {
          b = sk.Ia();
          for (a = 0; a < b.length; a++) sk.Ga(b[a]);
          b.length = 0;
        }
      };
    rk();
    (Y[3] >= La() && Y[2] >= La()) || sk.Pa();
  }
  function uk(a) {
    a.google_sa_impl &&
      !a.document.getElementById('google_shimpl') &&
      ((a.google_sa_queue = null),
      (a.google_sl_win = null),
      (a.google_sa_impl = null));
  }
  function vk(a) {
    var b = J;
    a = void 0 === a ? '' : a;
    uk(b);
    b.google_sa_queue ||
      ((b.google_sa_queue = []),
      (b.google_sl_win = b),
      (b.google_process_slots = function () {
        return wk(b);
      }),
      (a = xk(b, a)),
      (Sc(b.document, Kc(a), N(356)).id = 'google_shimpl'));
  }
  var wk = Qf(215, function (a) {
    var b = a.google_sa_queue,
      c = b.shift();
    a.google_sa_impl || Rf('shimpl', { t: 'no_fn' });
    'function' === typeof c && Pf(216, c);
    b.length &&
      a.setTimeout(function () {
        return wk(a);
      }, 0);
  });
  function yk(a, b, c) {
    a.google_sa_queue = a.google_sa_queue || [];
    a.google_sa_impl ? c(b) : a.google_sa_queue.push(b);
  }
  function xk(a, b) {
    var c = '/show_ads_impl.js';
    c = void 0 === c ? '/show_ads_impl.js' : c;
    c = !We(13) || (N(1006) && !wd) ? c : We(13);
    a = zk(a, b);
    return Ye('/pagead/js/' + ud() + '/r20190131' + c + a);
  }
  function zk(a, b) {
    if (We(14)) return '?' + We(14);
    if (N(357)) return '?' + a.location.host;
    if (wd && N(375)) {
      b ||
        (b = a.google_ad_client
          ? a.google_ad_client
          : (b = a.document.querySelector(
              'script[src*="/pagead/js/adsbygoogle.js"][data-ad-client]'
            ))
          ? b.getAttribute('data-ad-client')
          : (b = a.document.querySelector('.adsbygoogle[data-ad-client]'))
          ? b.getAttribute('data-ad-client')
          : '');
      if (b) {
        a = ['client', b, 'plah', a.location.host, 'amaexp', 1];
        b = [];
        for (var c = 0; c < a.length; c += 2) Nc(a[c], a[c + 1], b);
        return '?' + b.join('&');
      }
      throw Error('PublisherCodeNotFoundForAma');
    }
    return '';
  }
  function Ak(a, b, c, d) {
    return function () {
      var e = !1;
      d && dk().al(3e4);
      try {
        if (Oc(a.document.getElementById(b).contentWindow)) {
          var f = a.document.getElementById(b).contentWindow,
            g = f.document;
          (g.body && g.body.firstChild) ||
            (/Firefox/.test(navigator.userAgent)
              ? g.open('text/html', 'replace')
              : g.open(),
            (f.google_async_iframe_close = !0),
            g.write(c));
        } else {
          var h = a.document.getElementById(b).contentWindow;
          f = c;
          f = String(f);
          g = ['"'];
          for (var k = 0; k < f.length; k++) {
            var l = f.charAt(k),
              n = l.charCodeAt(0),
              p = k + 1,
              v;
            if (!(v = Zb[l])) {
              if (31 < n && 127 > n) var r = l;
              else {
                var A = void 0,
                  t = l;
                if (t in $b) r = $b[t];
                else if (t in Zb) r = $b[t] = Zb[t];
                else {
                  var F = t.charCodeAt(0);
                  if (31 < F && 127 > F) A = t;
                  else {
                    if (256 > F) {
                      if (((A = '\\x'), 16 > F || 256 < F)) A += '0';
                    } else (A = '\\u'), 4096 > F && (A += '0');
                    A += F.toString(16).toUpperCase();
                  }
                  r = $b[t] = A;
                }
              }
              v = r;
            }
            g[p] = v;
          }
          g.push('"');
          h.location.replace('javascript:' + g.join(''));
        }
        e = !0;
      } catch (Ea) {
        (h = di().google_jobrunner), ck(h) && h.rl();
      }
      e && ((e = dj('google_async_rrc', c)), new cj(a).set(b, Ak(a, b, e, !1)));
    };
  }
  function Bk(a) {
    if (!gj)
      a: {
        for (var b = [x.top], c = [], d = 0, e; (e = b[d++]); ) {
          c.push(e);
          try {
            if (e.frames)
              for (
                var f = e.frames.length, g = 0;
                g < f && 1024 > b.length;
                ++g
              )
                b.push(e.frames[g]);
          } catch (k) {}
        }
        for (b = 0; b < c.length; b++)
          try {
            var h = c[b].frames.google_esf;
            if (h) {
              gj = h;
              break a;
            }
          } catch (k) {}
        gj = null;
      }
    if (!gj) {
      if (/[^a-z0-9-]/.test(a)) return null;
      c = Gc(document, 'IFRAME');
      c.id = 'google_esf';
      c.name = 'google_esf';
      h = Xe(
        'googleads.g.doubleclick.net',
        [
          '/pagead/html/',
          ud(),
          '/r20190131/zrt_lookup.html#',
          encodeURIComponent(''),
        ].join('')
      );
      c.src = h;
      c.style.display = 'none';
      c.setAttribute('data-ad-client', bf(a));
      return c;
    }
    return null;
  }
  function Ck(a, b, c) {
    Dk(a, b, c, function (d, e, f) {
      d = d.document;
      for (var g = e.id, h = 0; !g || d.getElementById(g + '_anchor'); )
        g = 'aswift_' + h++;
      e.id = g;
      e.name = g;
      g = Number(f.google_ad_width || 0);
      h = Number(f.google_ad_height || 0);
      var k = f.ds || '';
      k && (k += u(k, 'endsWith').call(k, ';') ? '' : ';');
      var l = '',
        n = '';
      if (!f.google_enable_single_iframe) {
        l = ['<iframe'];
        for (p in e)
          e.hasOwnProperty(p) &&
            ('onload' === p && N(381)
              ? ((n = e.id),
                (n =
                  "<script nonce='" +
                  va() +
                  "'>" +
                  lb(
                    kb(
                      new eb(
                        fb,
                        "function(iframeId, globalVarName){document.getElementById(iframeId).addEventListener('onload', function() {var i=this.id,s=window[globalVarName],H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}});}"
                      ),
                      n,
                      'google_iframe_oncopy'
                    )
                  ).toString() +
                  '\x3c/script>'))
              : l.push(p + '=' + e[p]));
        l.push(
          'style="left:0;position:absolute;top:0;border:0px;width:' +
            (g + 'px;height:' + (h + 'px;"'))
        );
        l.push('></iframe>');
        l = l.join(' ');
      }
      var p = e.id;
      var v = '';
      v = void 0 === v ? '' : v;
      g =
        'border:none;height:' +
        h +
        'px;margin:0;padding:0;position:relative;visibility:visible;width:' +
        (g + 'px;background-color:transparent;');
      p =
        [
          '<ins id="' + (p + '_expand"'),
          ' style="display:inline-table;' + g + (void 0 === k ? '' : k) + '"',
          v ? ' data-ad-slot="' + v + '">' : '>',
          '<ins id="' + (p + '_anchor" style="display:block;') + g + '">',
          l,
          '</ins></ins>',
        ].join('') + n;
      16 == f.google_reactive_ad_format
        ? ((f = d.createElement('div')),
          (d = Ic(p)),
          Xb(f, d),
          c.appendChild(f.firstChild))
        : ((f = Ic(p)), Xb(c, f));
      return e.id;
    });
  }
  function Ek(a) {
    a = kb(
      new eb(
        fb,
        'function(showAdsImplFn,slotVarsMap,iframeId){window.parent[showAdsImplFn]({iframeWin: window,pubWin: window.parent,vars: window.parent[slotVarsMap][iframeId]});}'
      ),
      'google_sa_impl',
      'google_sv_map',
      a
    );
    return "<script nonce='" + va() + "'>" + lb(a).toString() + '\x3c/script>';
  }
  function Dk(a, b, c, d) {
    var e = b.google_ad_width,
      f = b.google_ad_height;
    if ((!dc && !ec) || N(325)) b.google_enable_single_iframe = !0;
    var g = {};
    null != e && (g.width = e && '"' + e + '"');
    null != f && (g.height = f && '"' + f + '"');
    g.frameborder = '"0"';
    g.marginwidth = '"0"';
    g.marginheight = '"0"';
    g.vspace = '"0"';
    g.hspace = '"0"';
    g.allowtransparency = '"true"';
    g.scrolling = '"no"';
    g.allowfullscreen = '"true"';
    g.onload = '"' + ej + '"';
    d = d(a, g, b);
    Fk(a, c, b);
    (c = Bk(b.google_ad_client)) && a.document.documentElement.appendChild(c);
    c = Na;
    e = new Date().getTime();
    b.google_lrv = ud();
    b.google_async_iframe_id = d;
    b.google_unique_id = Ld(a);
    b.google_start_time = c;
    b.google_bpp = e > c ? e - c : 1;
    b.google_async_rrc = 0;
    a.google_sv_map = a.google_sv_map || {};
    a.google_sv_map[d] = b;
    if (b.google_enable_single_iframe) {
      var h = { pubWin: a, iframeWin: null, vars: b };
      yk(
        a,
        function () {
          a.google_sa_impl(h);
        },
        a.document.getElementById(d + '_anchor') ? ek : fk
      );
    } else
      (b = [
        '<!doctype html><html><body>',
        "<script nonce='" + va() + "'>",
        lb(
          kb(
            new eb(
              fb,
              'function(singleLoadWindow,iframeStartTime,asyncIframeId,iframeId){window[singleLoadWindow]=window.parent;window[iframeStartTime]=new Date().getTime();window[asyncIframeId]=iframeId;}'
            ),
            'google_sl_win',
            'google_iframe_start_time',
            'google_async_iframe_id',
            d
          )
        ).toString(),
        '\x3c/script>',
        Ek(d),
        '</body></html>',
      ].join('')),
        yk(a, Ak(a, d, b, !0), a.document.getElementById(d) ? ek : fk);
  }
  function Fk(a, b, c) {
    var d = c.google_ad_output,
      e = c.google_ad_format,
      f = c.google_ad_width || 0,
      g = c.google_ad_height || 0;
    e || ('html' != d && null != d) || (e = f + 'x' + g);
    d =
      !c.google_ad_slot ||
      c.google_override_format ||
      (!Cc[c.google_ad_width + 'x' + c.google_ad_height] &&
        'aa' == c.google_loader_used);
    e && d ? (e = e.toLowerCase()) : (e = '');
    c.google_ad_format = e;
    if (
      'number' !== typeof c.google_reactive_sra_index ||
      !c.google_ad_unit_key
    ) {
      e = [
        c.google_ad_slot,
        c.google_orig_ad_format || c.google_ad_format,
        c.google_ad_type,
        c.google_orig_ad_width || c.google_ad_width,
        c.google_orig_ad_height || c.google_ad_height,
      ];
      d = [];
      f = 0;
      for (g = b; g && 25 > f; g = g.parentNode, ++f)
        9 === g.nodeType ? d.push('') : d.push(g.id);
      (d = d.join()) && e.push(d);
      c.google_ad_unit_key = $c(e.join(':')).toString();
      var h = void 0 === h ? !1 : h;
      e = [];
      for (d = 0; b && 25 > d; ++d) {
        f = '';
        (void 0 !== h && h) ||
          (f = (f = 9 !== b.nodeType && b.id) ? '/' + f : '');
        a: {
          if (b && b.nodeName && b.parentElement) {
            g = b.nodeName.toString().toLowerCase();
            for (
              var k = b.parentElement.childNodes, l = 0, n = 0;
              n < k.length;
              ++n
            ) {
              var p = k[n];
              if (p.nodeName && p.nodeName.toString().toLowerCase() === g) {
                if (b === p) {
                  g = '.' + l;
                  break a;
                }
                ++l;
              }
            }
          }
          g = '';
        }
        e.push((b.nodeName && b.nodeName.toString().toLowerCase()) + f + g);
        b = b.parentElement;
      }
      h = e.join() + ':';
      b = [];
      if (a)
        try {
          var v = a.parent;
          for (e = 0; v && v !== a && 25 > e; ++e) {
            var r = v.frames;
            for (d = 0; d < r.length; ++d)
              if (a === r[d]) {
                b.push(d);
                break;
              }
            a = v;
            v = a.parent;
          }
        } catch (A) {}
      c.google_ad_dom_fingerprint = $c(h + b.join()).toString();
    }
  }
  var Gk = !wd;
  function Hk(a) {
    var b = a.value;
    a =
      'https://partner.googleadservices.com/gampad/cookie.js?domain=' +
      a.domain +
      '&callback=_gfp_s_&client=' +
      a.Xa;
    b && (a += '&cookie=' + encodeURIComponent(b));
    return a;
  }
  function Ik(a) {
    var b = J;
    var c = void 0 === c ? Hk : c;
    var d = b._gfp_a_;
    if ('boolean' !== typeof d) throw Error('Illegal value of _gfp_a_: ' + d);
    if (d) {
      d = b._gfp_p_;
      if ('boolean' !== typeof d) throw Error('Illegal value of _gfp_p_: ' + d);
      if (!d) {
        if (N(225)) {
          var e = new sd();
          pc(e, 5, !0);
          var f = new kk(b);
          0 === f.b && (f.b = lk(f, e) ? 2 : 1);
          2 === f.b &&
            ((b._gfp_s_ = Qf(629, function (g) {
              delete b._gfp_s_;
              if (!g) throw Error('Invalid JSONP response');
              if ((g = g._cookies_)) {
                var h = g[0];
                if (!h) throw Error('Invalid JSONP response');
                var k = h._value_,
                  l = h._expires_;
                g = h._path_;
                h = h._domain_;
                if (
                  'string' !== typeof k ||
                  'number' !== typeof l ||
                  'string' !== typeof g ||
                  'string' !== typeof h
                )
                  throw Error('Invalid JSONP response');
                var n = new uc();
                k = pc(n, 1, k);
                l = pc(k, 2, l);
                g = pc(l, 3, g);
                g = pc(g, 4, h);
                h = {
                  ua: D(g, 2) - f.a.Date.now() / 1e3,
                  path: D(g, 3),
                  domain: D(g, 4),
                  Ta: !1,
                };
                l = D(g, 1);
                k = f.a.document;
                k = void 0 === k ? document : k;
                mc(e, 5) && new Ec(k).set('__gads', l, h);
                mc(e, 5) &&
                  0.01 > f.a.Math.random() &&
                  ((h = jk('__gads', e, f.a.document)),
                  Cd(
                    { domain: D(g, 4), success: h === D(g, 1) },
                    'gfp_cw_status'
                  ));
              }
            })),
            Sc(
              b.document,
              c({
                domain: b.location.hostname,
                Xa: a,
                value: jk('__gads', e, f.a.document) || '',
              })
            ));
        }
        b._gfp_p_ = !0;
      }
    }
  }
  function Jk(a, b) {
    a = a.attributes;
    for (var c = a.length, d = 0; d < c; d++) {
      var e = a[d];
      if (/data-/.test(e.name)) {
        var f = xb(
          e.name
            .replace('data-matched-content', 'google_content_recommendation')
            .replace('data', 'google')
            .replace(/-/g, '_')
        );
        if (!b.hasOwnProperty(f)) {
          e = e.value;
          var g = {};
          g =
            ((g.google_reactive_ad_format = td),
            (g.google_allow_expandable_ads = gd),
            g);
          e = g.hasOwnProperty(f) ? g[f](e, null) : e;
          null !== e && (b[f] = e);
        }
      }
    }
  }
  function Kk(a) {
    if ((a = yd(a)))
      switch (a.data && a.data.autoFormat) {
        case 'rspv':
          return 13;
        case 'mcrspv':
          return 15;
        default:
          return 14;
      }
    else return 12;
  }
  function Lk(a, b, c) {
    Jk(a, b);
    if (
      c.document &&
      c.document.body &&
      !Uj(c, b) &&
      !b.google_reactive_ad_format
    ) {
      var d = parseInt(a.style.width, 10),
        e = gk(a, c);
      if (0 < e && d > e) {
        var f = parseInt(a.style.height, 10);
        d = !!Cc[d + 'x' + f];
        var g = e;
        if (d) {
          var h = Dc(e, f);
          if (h) (g = h), (b.google_ad_format = h + 'x' + f + '_0ads_al');
          else throw new O('No slot size for availableWidth=' + e);
        }
        b.google_ad_resize = !0;
        b.google_ad_width = g;
        d || ((b.google_ad_format = null), (b.google_override_format = !0));
        e = g;
        a.style.width = e + 'px';
        f = Ij(e, 'auto', c, a, b);
        g = e;
        f.a.Y(c, b, a);
        kj(f, g, b);
        f = f.a;
        b.google_responsive_formats = null;
        f.minWidth() > e &&
          !d &&
          ((b.google_ad_width = f.minWidth()),
          (a.style.width = f.minWidth() + 'px'));
      }
    }
    d = a.offsetWidth || T(a, c, 'width', K) || b.google_ad_width || 0;
    e = Ka(Ij, d, 'auto', c, a, b, !1, !0);
    f = Rd(c) || c;
    g = b.google_ad_client;
    f =
      f.location && '#ftptohbh' === f.location.hash
        ? 2
        : Sd(f.location, 'google_responsive_slot_debug') ||
          Sd(f.location, 'google_responsive_slot_preview') ||
          N(217)
        ? 1
        : N(218)
        ? 2
        : Zf(f, 1, g)
        ? 1
        : 0;
    if ((g = 0 !== f))
      b: if (
        !(488 > P(c) || N(216)) ||
        b.google_reactive_ad_format ||
        Uj(c, b) ||
        Ch(a, b)
      )
        g = !1;
      else {
        for (g = a; g; g = g.parentElement) {
          h = Tc(g, c);
          if (!h) {
            b.gfwrnwer = 18;
            g = !1;
            break b;
          }
          if (!Ua(['static', 'relative'], h.position)) {
            b.gfwrnwer = 17;
            g = !1;
            break b;
          }
        }
        if (!N(216) && ((g = Hh(c, a, d, 0.3, b)), !0 !== g)) {
          b.gfwrnwer = g;
          g = !1;
          break b;
        }
        g = Qd(c) == c ? !0 : !1;
      }
    g
      ? ((b.google_resizing_allowed = !0),
        (b.ovlp = !0),
        2 === f
          ? ((f = {}),
            kj(e(), d, f),
            (b.google_resizing_width = f.google_ad_width),
            (b.google_resizing_height = f.google_ad_height),
            f.ds && (b.ds = f.ds),
            (b.iaaso = !1))
          : ((b.google_ad_format = 'auto'), (b.iaaso = !0), (b.armr = 1)),
        (d = !0))
      : (d = !1);
    if ((e = Uj(c, b))) Wj(e, a, b, c, d);
    else {
      if (Ch(a, b)) {
        if ((d = Tc(a, c)))
          (a.style.width = d.width), (a.style.height = d.height), Bh(d, b);
        b.google_ad_width || (b.google_ad_width = a.offsetWidth);
        b.google_ad_height || (b.google_ad_height = a.offsetHeight);
        b.google_loader_features_used = 256;
        b.google_responsive_auto_format = Kk(c);
      } else Bh(a.style, b);
      (c.location && '#gfwmrp' == c.location.hash) ||
      (12 == b.google_responsive_auto_format &&
        'true' == b.google_full_width_responsive)
        ? Wj(10, a, b, c, !1)
        : 0.01 > Math.random() &&
          12 == b.google_responsive_auto_format &&
          ((a = Ih(
            a.offsetWidth || parseInt(a.style.width, 10) || b.google_ad_width,
            c,
            a,
            b
          )),
          !0 !== a ? ((b.efwr = !1), (b.gfwrnwer = a)) : (b.efwr = !0));
    }
  }
  function Mk(a) {
    this.b = a;
    this.a = null;
  }
  qa(Mk, xd);
  function Nk(a) {
    this.b = a;
    this.a = null;
    this.a ||
      (this.b.googlefc
        ? (this.a = this.b)
        : (this.a = hd(this.b, 'googlefcPresent')));
  }
  qa(Nk, xd);
  function Ok(a) {
    this.b = a;
    this.a = null;
    this.f = {};
    this.g = 0;
    this.c = null;
  }
  qa(Ok, xd);
  Ok.prototype.addEventListener = function (a) {
    Pk(this, 'addEventListener', function (b, c) {
      b = c ? b : {};
      b.internalErrorState =
        (void 0 !== b.tcString && 'string' !== typeof b.tcString) ||
        (void 0 !== b.gdprApplies && 'boolean' !== typeof b.gdprApplies) ||
        (void 0 !== b.listenerId && 'number' !== typeof b.listenerId) ||
        (void 0 !== b.addtlConsent && 'string' !== typeof b.addtlConsent)
          ? 2
          : b.cmpStatus && 'error' !== b.cmpStatus
          ? 0
          : 3;
      0 !== b.internalErrorState && (b.tcString = 'tcunavailable');
      a(b);
    });
  };
  Ok.prototype.removeEventListener = function (a) {
    a && a.listenerId && Pk(this, 'removeEventListener', null, a.listenerId);
  };
  function Pk(a, b, c, d) {
    c || (c = function () {});
    if ('function' === typeof a.b.__tcfapi) (a = a.b.__tcfapi), a(b, 2, c, d);
    else if (Qk(a)) {
      Rk(a);
      var e = ++a.g;
      a.f[e] = c;
      a.a &&
        ((c = {}),
        a.a.postMessage(
          ((c.__tcfapiCall = {
            command: b,
            version: 2,
            callId: e,
            parameter: d,
          }),
          c),
          '*'
        ));
    } else c({}, !1);
  }
  function Qk(a) {
    if (a.a) return a.a;
    a.a = hd(a.b, '__tcfapiLocator');
    return a.a;
  }
  function Rk(a) {
    a.c ||
      ((a.c = function (b) {
        try {
          var c;
          'string' === typeof b.data ? (c = JSON.parse(b.data)) : (c = b.data);
          var d = c.__tcfapiReturn;
          a.f[d.callId](d.returnValue, d.success);
        } catch (e) {}
      }),
      Fc(a.b, 'message', a.c));
  }
  function Sk(a, b, c) {
    var d = window;
    return function () {
      var e = tf(),
        f = 3;
      try {
        var g = b.apply(this, arguments);
      } catch (k) {
        f = 13;
        if (c) return c(a, k), g;
        throw k;
      } finally {
        if (d.google_measure_js_timing && e) {
          var h = tf() || 0;
          e = { label: a.toString(), value: e, duration: h - e, type: f };
          f = d.google_js_reporting_queue = d.google_js_reporting_queue || [];
          2048 > f.length && f.push(e);
        }
      }
      return g;
    };
  }
  function Tk(a, b) {
    return Sk(a, b, function (c, d) {
      new Ff().F(c, d);
    });
  }
  function Uk(a, b) {
    return null == b ? '&' + a + '=null' : '&' + a + '=' + Math.floor(b);
  }
  var Vk = new q.Set();
  function Wk(a) {
    a = a.id;
    return (
      Vk.has(a) ||
      u(a, 'startsWith').call(a, 'google_ads_iframe_') ||
      u(a, 'startsWith').call(a, 'aswift')
    );
  }
  function Xk(a, b) {
    b = void 0 === b ? 4 : b;
    if (!a) return !1;
    if (Wk(a)) return !0;
    if (0 >= b) return !1;
    a = w(a.childNodes);
    for (var c = a.next(); !c.done; c = a.next())
      if (Xk(c.value, b - 1)) return !0;
    return !1;
  }
  function Yk() {
    var a = this;
    this.J = this.S = this.U = this.c = this.s = this.o = this.g = 0;
    this.K = !1;
    this.D = this.i = this.f = 0;
    this.O = 0.1 > Math.random();
    this.X = x === x.top;
    var b = document.querySelector('[data-google-query-id]');
    this.T = (this.a = b ? b.getAttribute('data-google-query-id') : null)
      ? null
      : qd();
    this.O &&
      ((b =
        'https://pagead2.googlesyndication.com/pagead/gen_204?id=plmetrics' +
        (this.a ? '&qqid=' + encodeURIComponent(this.a) : Uk('pvsid', this.T))),
      (b += Uk('test', 1)),
      (b += '&top=' + (this.X ? 1 : 0)),
      Zk(b));
    this.ka = new PerformanceObserver(
      Tk(640, function (c) {
        var d = !1;
        c = w(c.getEntries());
        for (var e = c.next(); !e.done; e = c.next())
          switch (((e = e.value), e.entryType)) {
            case 'layout-shift':
              if (!d) {
                try {
                  if ('undefined' !== typeof googletag && googletag.pubads) {
                    var f = googletag.pubads();
                    Vk.clear();
                    for (
                      var g = w(f.getSlots()), h = g.next();
                      !h.done;
                      h = g.next()
                    )
                      Vk.add(h.value.getSlotId().getDomId());
                  }
                } catch (n) {}
                d = !0;
              }
              if (!e.hadRecentInput && (!N(241) || 0.01 < e.value)) {
                a.g += Number(e.value);
                Number(e.value) > a.o && (a.o = Number(e.value));
                a.s += 1;
                a: {
                  if (e.sources) {
                    var k = w(e.sources);
                    for (var l = k.next(); !l.done; l = k.next())
                      if (Xk(l.value.node)) {
                        k = !0;
                        break a;
                      }
                  }
                  k = !1;
                }
                k && ((a.c += e.value), a.U++);
              }
              break;
            case 'largest-contentful-paint':
              a.S = Math.floor(e.renderTime || e.loadTime);
              break;
            case 'first-input':
              a.J = Number((e.processingStart - e.startTime).toFixed(3));
              a.K = !0;
              break;
            case 'longtask':
              (a.f += e.duration),
                e.duration > a.i && (a.i = e.duration),
                (a.D += 1);
          }
      })
    );
    this.la = !1;
    this.b = Tk(641, this.b.bind(this));
  }
  qa(Yk, xd);
  function $k() {
    for (
      var a = new Yk(),
        b = w([
          'layout-shift',
          'largest-contentful-paint',
          'first-input',
          'longtask',
        ]),
        c = b.next();
      !c.done;
      c = b.next()
    )
      a.ka.observe({ type: c.value, buffered: !N(240) });
    document.addEventListener('unload', a.b);
    document.addEventListener('visibilitychange', a.b);
  }
  Yk.prototype.b = function () {
    var a;
    if ((a = !this.la))
      (a = document),
        (a =
          2 ===
          ({ visible: 1, hidden: 2, prerender: 3, preview: 4, unloaded: 5 }[
            a.visibilityState ||
              a.webkitVisibilityState ||
              a.mozVisibilityState ||
              ''
          ] || 0));
    if (a) {
      this.la = !0;
      this.ka.takeRecords();
      a = 'https://pagead2.googlesyndication.com/pagead/gen_204?id=plmetrics';
      window.LayoutShift &&
        ((a += '&cls=' + this.g.toFixed(3)),
        (a += '&mls=' + this.o.toFixed(3)),
        (a += Uk('nls', this.s)),
        window.LayoutShiftAttribution &&
          ((a += '&cas=' + this.c.toFixed(3)), (a += Uk('nas', this.U))));
      window.LargestContentfulPaint && (a += Uk('lcp', this.S));
      window.PerformanceEventTiming && this.K && (a += Uk('fid', this.J));
      window.PerformanceLongTaskTiming &&
        ((a += Uk('cbt', this.f)),
        (a += Uk('mbt', this.i)),
        (a += Uk('nlt', this.D)));
      for (
        var b = 0, c = w(document.getElementsByTagName('iframe')), d = c.next();
        !d.done;
        d = c.next()
      )
        Wk(d.value) && b++;
      a += Uk('nif', b);
      a += Uk('ifi', Kd(window));
      b = jg.h().a();
      a += '&eid=' + encodeURIComponent(b.join());
      this.O && (a += Uk('test', 1));
      a += '&top=' + (this.X ? 1 : 0);
      a += this.a ? '&qqid=' + encodeURIComponent(this.a) : Uk('pvsid', this.T);
      Zk(a);
    }
  };
  function Zk(a) {
    window.fetch(a, {
      keepalive: !0,
      credentials: 'include',
      redirect: 'follow',
      method: 'get',
      mode: 'no-cors',
    });
  }
  var al = ['https://adservice.google.com'];
  function bl(a) {
    this.f = al;
    this.a = 2;
    this.b = a;
    this.c = qd();
  }
  qa(bl, xd);
  function cl(a) {
    !document.hasTrustToken ||
      3 <= a.a ||
      ((a.a = 3),
      Oa(a.f, function (b) {
        window
          .fetch(b + '/tt/r', {
            keepalive: !0,
            redirect: 'follow',
            method: 'get',
            trustToken: {
              type: 'srr-token-redemption',
              issuer: b,
              refreshPolicy: 'none',
            },
          })
          .then(function (c) {
            if (!c.ok) throw Error(c.status + ': Network response was not ok!');
            a.a = 5;
            a.b({ issuer: b, state: 5 });
          })
          .catch(function (c) {
            if (c && 'NoModificationAllowedError' === c.name)
              (a.a = 5), a.b({ issuer: b, state: 5 });
            else if (4 > a.a) {
              a.b({ issuer: null, state: 4 });
              var d = jg.h().a();
              Cd(
                {
                  pvsid: a.c,
                  issuer: b,
                  eid: d.join(),
                  err: c ? c.message : null,
                },
                'trusttoken'
              );
            }
          });
      }));
  }
  function dl(a) {
    C(this, a, el, null);
  }
  y(dl, B);
  var el = [6];
  var fl = [
    'platform',
    'platformVersion',
    'architecture',
    'model',
    'uaFullVersion',
  ];
  function gl() {
    var a = J;
    return a.navigator &&
      a.navigator.userAgentData &&
      'function' === typeof a.navigator.userAgentData.getHighEntropyValues
      ? a.navigator.userAgentData.getHighEntropyValues(fl).then(function (b) {
          var c = new dl();
          c = pc(c, 1, b.platform);
          c = pc(c, 2, b.platformVersion);
          c = pc(c, 3, b.architecture);
          c = pc(c, 4, b.model);
          return pc(c, 5, b.uaFullVersion);
        })
      : null;
  }
  var hl = null;
  function il(a) {
    return (
      Pd.test(a.className) &&
      'done' != a.getAttribute('data-adsbygoogle-status')
    );
  }
  function jl(a, b) {
    a.setAttribute('data-adsbygoogle-status', 'done');
    kl(a, b);
  }
  function ll() {
    if (!(0.01 < Math.random())) {
      var a = 0.5 < Math.random(),
        b = vb({ id: 'rmvasftr', type: a }),
        c = Gc(document, 'IFRAME');
      c.style.display = 'none';
      c.src = pb(b).toString();
      if (a) {
        var d = Gc(document, 'IFRAME');
        d.addEventListener('load', function () {
          d.contentWindow.document.documentElement.appendChild(c);
        });
        d.style.display = 'none';
        document.documentElement.appendChild(d);
      } else document.documentElement.appendChild(c);
    }
  }
  function kl(a, b) {
    var c = window,
      d = Od();
    d.google_spfd || (d.google_spfd = Lk);
    (d = b.google_reactive_ads_config) || Lk(a, b, c);
    if (!ml(a, b, c)) {
      d || (c.google_lpabyc = bj(c, a));
      if (d) {
        d = d.page_level_pubvars || {};
        if (
          I(J).page_contains_reactive_tag &&
          !I(J).allow_second_reactive_tag
        ) {
          if (d.pltais) {
            xc(!1);
            return;
          }
          throw new O("Only one 'enable_page_level_ads' allowed per page.");
        }
        I(J).page_contains_reactive_tag = !0;
        xc(7 === d.google_pgb_reactive);
      } else Jd(c);
      Hd(ik, function (e, f) {
        b[f] = b[f] || c[f];
      });
      b.google_loader_used = 'aa';
      b.google_reactive_tag_first = 1 === (I(J).first_tag_on_page || 0);
      Pf(164, function () {
        Ck(c, b, a);
      });
    }
  }
  function ml(a, b, c) {
    var d = b.google_reactive_ads_config;
    if (d) {
      var e = d.page_level_pubvars;
      var f = (Ca(e) ? e : {}).google_tag_origin;
    }
    e =
      'string' === typeof a.className &&
      /(\W|^)adsbygoogle-noablate(\W|$)/.test(a.className);
    var g = b.google_ad_slot;
    var h = f || b.google_tag_origin;
    f = I(c);
    yc(f.ad_whitelist || [], g, h)
      ? (g = null)
      : ((h = f.space_collapsing || 'none'),
        (g = (g = yc(f.ad_blacklist || [], g))
          ? { ma: !0, Ca: g.space_collapsing || h }
          : f.remove_ads_by_default
          ? { ma: !0, Ca: h, da: f.ablation_viewport_offset }
          : null));
    if (
      g &&
      g.ma &&
      'on' != b.google_adtest &&
      !e &&
      ((e = Uh(a, c)), !g.da || (g.da && (e || 0) >= g.da))
    )
      return (
        (a.className += ' adsbygoogle-ablated-ad-slot'),
        (c = c.google_sv_map = c.google_sv_map || {}),
        (d = Da(a)),
        (c[b.google_element_uid] = b),
        a.setAttribute('google_element_uid', d),
        'slot' == g.Ca &&
          (null !== fd(a.getAttribute('width')) && a.setAttribute('width', 0),
          null !== fd(a.getAttribute('height')) && a.setAttribute('height', 0),
          (a.style.width = '0px'),
          (a.style.height = '0px')),
        !0
      );
    if (
      (e = Tc(a, c)) &&
      'none' == e.display &&
      !('on' == b.google_adtest || 0 < b.google_reactive_ad_format || d)
    )
      return (
        c.document.createComment &&
          a.appendChild(
            c.document.createComment(
              'No ad requested because of display:none on the adsbygoogle tag'
            )
          ),
        !0
      );
    a = null == b.google_pgb_reactive || 3 === b.google_pgb_reactive;
    return (1 !== b.google_reactive_ad_format &&
      8 !== b.google_reactive_ad_format) ||
      !a
      ? !1
      : (x.console &&
          x.console.warn(
            'Adsbygoogle tag with data-reactive-ad-format=' +
              b.google_reactive_ad_format +
              ' is deprecated. Check out page-level ads at https://www.google.com/adsense'
          ),
        !0);
  }
  function nl(a) {
    var b = document.getElementsByTagName('INS');
    for (var c = 0, d = b[c]; c < b.length; d = b[++c]) {
      var e = d;
      if (
        il(e) &&
        'reserved' != e.getAttribute('data-adsbygoogle-status') &&
        (!a || d.id == a)
      )
        return d;
    }
    return null;
  }
  function ol(a) {
    if (a && a.shift)
      try {
        for (var b, c = 20; 0 < a.length && (b = a.shift()) && 0 < c; )
          pl(b), --c;
      } catch (d) {
        throw (window.setTimeout(ql, 0), d);
      }
  }
  function rl() {
    var a = Gc(document, 'INS');
    a.className = 'adsbygoogle';
    a.className += ' adsbygoogle-noablate';
    jd(a);
    return a;
  }
  function sl(a) {
    var b = {};
    Hd(Uf, function (e, f) {
      !1 === a.enable_page_level_ads
        ? (b[f] = !1)
        : a.hasOwnProperty(f) && (b[f] = a[f]);
    });
    Ca(a.enable_page_level_ads) &&
      (b.page_level_pubvars = a.enable_page_level_ads);
    var c = rl();
    Bc.body.appendChild(c);
    var d = {};
    d =
      ((d.google_reactive_ads_config = b),
      (d.google_ad_client = a.google_ad_client),
      d);
    N(365) && (d.google_pub_requests_npa = !!I(J).pub_requests_npa);
    d.google_pause_ad_requests = !!I(J).pause_ad_requests;
    jl(c, d);
  }
  function tl(a) {
    function b() {
      return sl(a);
    }
    var c = void 0 === c ? J : c;
    var d = N(1001),
      e = Rd(c);
    if (!e && !d) throw new O('Page-level tag does not work inside iframes.');
    Xf(d ? c : e).wasPlaTagProcessed = !0;
    var f = c.document;
    if (f.body || 'complete' == f.readyState || 'interactive' == f.readyState)
      b();
    else {
      var g = Xa(Qf(191, b));
      Fc(f, 'DOMContentLoaded', g);
      new x.MutationObserver(function (h, k) {
        f.body && (g(), k.disconnect());
      }).observe(f, { childList: !0, subtree: !0 });
    }
  }
  function pl(a) {
    var b = {};
    Pf(
      165,
      function () {
        ul(a, b);
      },
      function (c) {
        c.client = c.client || b.google_ad_client || a.google_ad_client;
        c.slotname = c.slotname || b.google_ad_slot;
        c.tag_origin = c.tag_origin || b.google_tag_origin;
      }
    );
  }
  function vl(a) {
    delete a.google_checked_head;
    Yc(a, function (b, c) {
      Ac[c] ||
        (delete a[c],
        (b = c.replace('google', 'data').replace(/_/g, '-')),
        x.console.warn(
          "AdSense head tag doesn't support " + b + ' attribute.'
        ));
    });
  }
  function wl() {
    var a = J,
      b = a.document.querySelector(
        'script[src*="/pagead/js/adsbygoogle.js"][data-ad-client]:not([data-checked-head])'
      );
    if (b) {
      b.setAttribute('data-checked-head', 'true');
      var c = I(window);
      if (c.head_tag_slot_vars)
        throw new O(
          'Only one AdSense head tag supported per page. The second tag is ignored.'
        );
      var d = {};
      Jk(b, d);
      vl(d);
      var e = bb(d);
      c.head_tag_slot_vars = e;
      b = {};
      b =
        ((b.google_ad_client = d.google_ad_client),
        (b.enable_page_level_ads = d),
        b);
      a.adsbygoogle || (a.adsbygoogle = []);
      a = a.adsbygoogle;
      a.loaded ? a.push(b) : a.splice(0, 0, b);
      d.google_adbreak_test && xl(e);
      Tf(function () {
        xl(e);
      });
    }
  }
  function ul(a, b) {
    if (null == a) throw new O('push() called with no parameters.');
    if (
      'object' !== typeof a ||
      null == a ||
      ('string' !== typeof a.type && 'string' !== typeof a.sound)
    ) {
      Na = new Date().getTime();
      vk(a.google_ad_client);
      a: {
        if (void 0 != a.enable_page_level_ads) {
          if ('string' === typeof a.google_ad_client) {
            var c = !0;
            break a;
          }
          throw new O("'google_ad_client' is missing from the tag config.");
        }
        c = !1;
      }
      if (c) yl(a, b);
      else if (
        ((c = a.params) &&
          Hd(c, function (e, f) {
            b[f] = e;
          }),
        'js' === b.google_ad_output)
      )
        console.warn(
          "Ads with google_ad_output='js' have been deprecated and no longer work. Contact your AdSense account manager or switch to standard AdSense ads."
        );
      else {
        a = zl(a.element);
        Jk(a, b);
        c = I(x).head_tag_slot_vars || {};
        Yc(c, function (e, f) {
          b.hasOwnProperty(f) || (b[f] = e);
        });
        if (a.hasAttribute('data-require-head') && !I(x).head_tag_slot_vars)
          throw new O(
            "AdSense head tag is missing. AdSense body tags don't work without the head tag. You can copy the head tag from your account on https://adsense.com."
          );
        if (!b.google_ad_client)
          throw new O('Ad client is missing from the slot.');
        b.google_apsail = cg(b.google_ad_client);
        var d = (c = 0 === (I(J).first_tag_on_page || 0) && $i(b)) && aj(c);
        c && !d && (yl(c), (I(J).skip_next_reactive_tag = !0));
        0 === (I(J).first_tag_on_page || 0) && (I(J).first_tag_on_page = 2);
        N(371) || ('_gfp_p_' in J || (J._gfp_p_ = !1), Ik(b.google_ad_client));
        N(365) && (b.google_pub_requests_npa = !!I(J).pub_requests_npa);
        b.google_pause_ad_requests = !!I(J).pause_ad_requests;
        jl(a, b);
        c && d && Al(c);
      }
    } else
      null != hl &&
        null == a.sound &&
        hl.handleAdBreak(a).catch(function (e) {
          Gf.F(730, e instanceof Error ? e : Error(String(e)), void 0, void 0);
        });
  }
  function Al(a) {
    rd(function () {
      Xf(x).wasPlaTagProcessed || (x.adsbygoogle && x.adsbygoogle.push(a));
    });
  }
  function yl(a, b) {
    if (I(J).skip_next_reactive_tag) I(J).skip_next_reactive_tag = !1;
    else {
      0 === (I(J).first_tag_on_page || 0) && (I(J).first_tag_on_page = 1);
      b && a.tag_partner && (wc(x, a.tag_partner), wc(b, a.tag_partner));
      a: if (!I(J).ama_ran_on_page) {
        if (N(316)) var c = null;
        else
          try {
            c = x.localStorage.getItem('google_ama_config');
          } catch (p) {
            c = null;
          }
        try {
          var d = c ? new Yg(c ? JSON.parse(c) : null) : null;
        } catch (p) {
          d = null;
        }
        if ((b = d))
          if (((c = G(b, $g, 3)), !c || D(c, 1) <= Date.now()))
            try {
              x.localStorage.removeItem('google_ama_config');
            } catch (p) {
              oh(x, { lserr: 1 });
            }
          else {
            if (aj(a) && ((c = gh(H(b, ah, 7))), !c || !mc(c, 8))) break a;
            I(J).ama_ran_on_page = !0;
            (d = G(b, dh, 13)) &&
              1 === D(d, 1) &&
              ((c = 0),
              (d = G(d, eh, 6)) && D(d, 3) && (c = D(d, 3) || 0),
              (d = I(x)),
              (d.remove_ads_by_default = !0),
              (d.space_collapsing = 'slot'),
              (d.ablation_viewport_offset = c));
            af(3, [b.a]);
            c = a.google_ad_client;
            d = jh(
              lh,
              new ih(
                null,
                ph(Ca(a.enable_page_level_ads) ? a.enable_page_level_ads : {})
              )
            );
            try {
              var e = gh(H(b, ah, 7)),
                f;
              if ((f = e))
                b: {
                  var g = D(e, 2);
                  if (g)
                    for (var h = 0; h < g.length; h++)
                      if (1 == g[h]) {
                        f = !0;
                        break b;
                      }
                  f = !1;
                }
              if (f) {
                if (D(e, 4)) {
                  f = {};
                  var k = new ih(null, ((f.google_package = D(e, 4)), f));
                  d = jh(d, k);
                }
                var l = new Di(c, b, e, d),
                  n = new Ji();
                new Oi(l, n).start();
                n.b.then(Ka(Qi, x), Ka(Ri, x));
              }
            } catch (p) {
              oh(x, { atf: -1 });
            }
          }
      }
      tl(a);
    }
  }
  function zl(a) {
    if (a) {
      if (!il(a) && (a.id ? (a = nl(a.id)) : (a = null), !a))
        throw new O("'element' has already been filled.");
      if (!('innerHTML' in a))
        throw new O("'element' is not a good DOM element.");
    } else if (((a = nl()), !a))
      throw new O(
        'All ins elements in the DOM with class=adsbygoogle already have ads in them.'
      );
    return a;
  }
  function Bl() {
    var a = J,
      b = new Ok(a),
      c = new Mk(a),
      d = new Nk(a);
    a = a.__cmp ? 1 : 0;
    b = 'function' === typeof b.b.__tcfapi || null != Qk(b) ? 1 : 0;
    var e;
    (e = 'function' === typeof c.b.__uspapi) ||
      (c.a ? (c = c.a) : ((c.a = hd(c.b, '__uspapiLocator')), (c = c.a)),
      (e = null != c));
    Rf(
      'cmpMet',
      { tcfv1: a, tcfv2: b, usp: e ? 1 : 0, fc: d.a ? 1 : 0, ptt: 9 },
      Ve()
    );
  }
  function ql() {
    Mf();
    Gf.za(Sf);
    Pf(166, Cl);
  }
  function Cl() {
    var a = zd(yd(J)) || J;
    Lg(a);
    if ((!z('Trident') && !z('MSIE')) || 0 <= Eb(Qb(), 11)) {
      ll();
      Hf(N(84));
      N(345) || (rk(), ok('.google.co.in') && (Z[1] = '.google.co.in'), tk());
      N(312) &&
        cl(
          new bl(function (e) {
            J.google_trust_token_redemption_status = e;
          })
        );
      N(363) &&
        ((a = gl()),
        null != a &&
          a.then(function (e) {
            J.google_user_agent_client_hint = e.i();
          }));
      J.PerformanceObserver &&
        N(203) &&
        !window.google_plmetrics &&
        ($k(), (window.google_plmetrics = !0));
      if ((a = Rd(x)))
        (a = Xf(a)),
          a.tagSpecificState[1] || (a.tagSpecificState[1] = new Si());
      wl();
      a = window.adsbygoogle;
      if (!a || !a.loaded) {
        Ve() && Bl();
        var b = { push: pl, loaded: !0 };
        try {
          Object.defineProperty(b, 'requestNonPersonalizedAds', { set: Dl }),
            Object.defineProperty(b, 'pauseAdRequests', { set: El }),
            Object.defineProperty(b, 'cookieOptions', { set: Fl }),
            Object.defineProperty(b, 'onload', { set: Gl });
        } catch (e) {}
        if (a)
          for (
            var c = w([
                'requestNonPersonalizedAds',
                'pauseAdRequests',
                'cookieOptions',
              ]),
              d = c.next();
            !d.done;
            d = c.next()
          )
            (d = d.value), void 0 !== a[d] && (b[d] = a[d]);
        '_gfp_a_' in window || (window._gfp_a_ = Gk);
        ol(a);
        window.adsbygoogle = b;
        a && (b.onload = a.onload);
      }
    }
  }
  function Dl(a) {
    if (N(365)) {
      var b = !!Number(a);
      I(J).pub_requests_npa = b;
    } else if (Number(a)) {
      if ((a = Rc()) && a.frames && !a.frames.GoogleSetNPA)
        try {
          b = a.document;
          var c = new Hc(b),
            d = b.body || (b.head && b.head.parentElement);
          if (d) {
            var e = Gc(c.a, 'IFRAME');
            e.name = 'GoogleSetNPA';
            e.id = 'GoogleSetNPA';
            e.setAttribute(
              'style',
              'display:none;position:fixed;left:-999px;top:-999px;width:0px;height:0px;'
            );
            d.appendChild(e);
          }
        } catch (f) {}
    } else
      (b = Rc().document.getElementById('GoogleSetNPA')) &&
        b.parentNode &&
        b.parentNode.removeChild(b);
  }
  function El(a) {
    Number(a)
      ? (I(J).pause_ad_requests = !0)
      : ((I(J).pause_ad_requests = !1),
        (a = function () {
          if (!I(J).pause_ad_requests) {
            var b = Od(),
              c = Od();
            try {
              if (Bc.createEvent) {
                var d = Bc.createEvent('CustomEvent');
                d.initCustomEvent(
                  'adsbygoogle-pub-unpause-ad-requests-event',
                  !1,
                  !1,
                  ''
                );
                b.dispatchEvent(d);
              } else if (Id(c.CustomEvent)) {
                var e = new c.CustomEvent(
                  'adsbygoogle-pub-unpause-ad-requests-event',
                  { bubbles: !1, cancelable: !1, detail: '' }
                );
                b.dispatchEvent(e);
              } else if (Id(c.Event)) {
                var f = new Event('adsbygoogle-pub-unpause-ad-requests-event', {
                  bubbles: !1,
                  cancelable: !1,
                });
                b.dispatchEvent(f);
              }
            } catch (g) {}
          }
        }),
        x.setTimeout(a, 0),
        x.setTimeout(a, 1e3));
  }
  function Fl(a) {
    switch (a) {
      case 0:
        a = !0;
        break;
      case 1:
        a = !1;
        break;
      case 2:
        a = Gk;
        break;
      default:
        throw Error('Illegal value of cookieOptions: ' + a);
    }
    J._gfp_a_ = a;
    '_gfp_p_' in J &&
      !N(371) &&
      ((a = J.google_sv_map), Ik(a[Zc(a)].google_ad_client));
  }
  function Gl(a) {
    Id(a) && window.setTimeout(a, 0);
  }
  function xl(a) {
    var b = Ye('/pagead/js/' + ud() + '/r20190131/slotcar_library.js');
    Wi(b).then(function (c) {
      null == hl && (c.init(a), (hl = c));
    });
  }
  ql();
}.call(this));
