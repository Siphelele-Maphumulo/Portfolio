! function(e) {
    function t(t) {
        for (var n, o, r = t[0], l = t[1], u = t[2], c = 0, d = []; c < r.length; c++) o = r[c], Object.prototype.hasOwnProperty.call(s, o) && s[o] && d.push(s[o][0]), s[o] = 0;
        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
        for (h && h(t); d.length;) d.shift()();
        return a.push.apply(a, u || []), i()
    }

    function i() {
        for (var e, t = 0; t < a.length; t++) {
            for (var i = a[t], n = !0, r = 1; r < i.length; r++) {
                var l = i[r];
                0 !== s[l] && (n = !1)
            }
            n && (a.splice(t--, 1), e = o(o.s = i[0]))
        }
        return e
    }
    var n = {},
        s = {
            main: 0
        },
        a = [];

    function o(t) {
        if (n[t]) return n[t].exports;
        var i = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    o.m = e, o.c = n, o.d = function(e, t, i) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (o.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var n in e) o.d(i, n, function(t) {
                return e[t]
            }.bind(null, n));
        return i
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "";
    var r = window.webpackJsonp = window.webpackJsonp || [],
        l = r.push.bind(r);
    r.push = t, r = r.slice();
    for (var u = 0; u < r.length; u++) t(r[u]);
    var h = l;
    a.push([170, "vendor"]), i()
}({
    114: function(e, t) {
        e.exports = "#define GLSLIFY 1\nuniform float uOpacity;\nuniform vec3 uColor;\nuniform sampler2D uMask;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 mask = texture2D(uMask, vUv);\n    float alpha = mask.r * uOpacity;\n\n\tgl_FragColor = vec4(uColor, alpha);\n}\n"
    },
    115: function(e, t) {
        e.exports = '#define GLSLIFY 1\n//\n// GLSL textureless classic 2D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute(permute(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy = abs(gx) - 0.5 ;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n\n  vec2 g00 = vec2(gx.x,gy.x);\n  vec2 g10 = vec2(gx.y,gy.y);\n  vec2 g01 = vec2(gx.z,gy.z);\n  vec2 g11 = vec2(gx.w,gy.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\nvarying vec2 vUv;\n\nuniform float uTime;\nuniform float uSpeed;\nuniform float uSize;\nuniform float uIntensity;\nuniform float uScale;\nuniform float uOffset;\n\nvoid main() {\n    vUv = uv;\n\n    float offset = uOffset + (uTime * uSpeed);\n    float noise = cnoise((uv * uSize) + offset) * uIntensity;\n    vec3 displaced = position * uScale;\n\n    displaced.z += noise;\n\n\tvec4 modelViewPosition = modelViewMatrix * vec4(displaced, 1.0);\n\tgl_Position = projectionMatrix * modelViewPosition;\n}\n'
    },
    116: function(e, t) {
        e.exports = "#define GLSLIFY 1\n#define DEPTH_MULT 20.0\nuniform vec3 uColor;\nuniform float uOpacity;\n\nuniform vec2 uTime;\n\nvarying float v_depth;\n\nvoid main(void) {\n    gl_FragColor = vec4(uColor, (sin(uTime.x + DEPTH_MULT * v_depth) * uOpacity) * 0.5);\n}\n"
    },
    117: function(e, t) {
        e.exports = "#define GLSLIFY 1\nuniform vec2 uTime;\nuniform vec2 uRange;\nuniform float uSize;\n\nvarying float v_depth;\n\nfloat getRange() {\n    // lower part of the range vector holds our minimum range\n    float minRange = uRange.x;\n    // calculate our movement ramge large - small = positive number\n    float rangeDelta = uRange.y - uRange.x;\n    // to keep the cos curve positive and squished to one we transform the function\n    // this gives us a factor 0...1\n    // we use position.x * position.y to get a unique offset which we translate by the time on the x axis\n    float factor = 0.5 + cos(position.x * position.y + uTime.x) * 0.5;\n    return minRange + (rangeDelta * factor);\n}\n\nvoid main() {\n    // since we cant modify a attribute we save a copy\n    vec3 pos = position;\n\n    // sin first part of the circle * range to limit or expand size\n    pos.x = sin(uTime.x + position.x) * getRange();\n    // use the fractional part of ytime + position.y\n    pos.y = fract(uTime.y + (position.y));\n    // cos second part of the circle * range to limit or expand size\n    pos.z = cos(uTime.x + position.x) * getRange();\n\n    v_depth = pos.z;\n\n    // since we use gl.POINTS we have to set the pointsize\n    gl_PointSize = uSize;\n    // calculate world position\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);\n}\n"
    },
    118: function(e, t) {
        e.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D uTexture;\nuniform float uOpacity;\nuniform float uOpacityHover;\nuniform float uHoverProgress;\nuniform vec3 uColor;\nuniform float uColorBlend;\n\nvec3 blendNormal(vec3 base, vec3 blend) {\n\treturn blend;\n}\n\nvec3 blendNormal(vec3 base, vec3 blend, float opacity) {\n\treturn (blendNormal(base, blend) * opacity + base * (1.0 - opacity));\n}\n\nvoid main() {\n    vec4 texture = texture2D(uTexture, vUv);\n    vec3 grayscaleTexture = mix(vec3(dot(texture.rgb, vec3(0.299, 0.587, 0.114))) * 0.95, uColor, 0.35);\n\n    float p = uHoverProgress;\n\n    // wave\n    float gradientSize = 0.1;\n    float skewSize = 0.2;\n    float progress = uHoverProgress + (uHoverProgress * 2.*gradientSize) + (uHoverProgress * 2.*skewSize) - gradientSize - skewSize;\n    float start = progress - gradientSize;\n    float end = progress + gradientSize;\n    float y = smoothstep(start, end, vUv.x + ((1.0-vUv.y) * skewSize));\n    // end wave\n\n    vec3 gradedTexture = mix(texture.rgb, grayscaleTexture, 0.1);\n    gradedTexture.r -= 0.01;\n\n    vec3 color = mix(gradedTexture, grayscaleTexture, y);\n    gl_FragColor = vec4(color, uOpacity);\n}\n"
    },
    119: function(e, t) {
        e.exports = '#define GLSLIFY 1\n//\n// GLSL textureless classic 2D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute(permute(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy = abs(gx) - 0.5 ;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n\n  vec2 g00 = vec2(gx.x,gy.x);\n  vec2 g10 = vec2(gx.y,gy.y);\n  vec2 g01 = vec2(gx.z,gy.z);\n  vec2 g11 = vec2(gx.w,gy.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\n#define PI 3.14159265358979323846264338327\n\nvarying vec2 vUv;\n\nuniform vec2 uOffsetNoise;\nuniform float uDirection;\nuniform float uIntensity;\nuniform float uLimitCurve;\nuniform float uLimitShear;\nuniform float uHoverProgress;\n\nfloat normalized(float value) {\n    return (value + 1.0) * 0.5;\n}\n\nvoid main() {\n    vUv = uv;\n\n    vec3 displaced = position;\n\t// float normalizedX = 1.0 - (position.x + 0.5);\n\tfloat normalizedY = 0.5 + position.y;\n\tfloat offsetCurve = uLimitCurve * uIntensity;\n\tfloat offsetShear = uLimitShear * uIntensity;\n\n\tfloat offset = sin(normalizedY * PI) * offsetCurve;\n\n\tdisplaced.x -= uDirection * offset; // Curve\n\tdisplaced.x -= (normalizedY * -offsetShear) * uDirection; // shear\n\n\tfloat n = normalized(cnoise((vUv * 2.) + uOffsetNoise)) * 0.5 + 0.5; // from 0.5 to 1.0\n\n\t// circle\n\tfloat rX = abs(vUv.x * 2. - 1.0) * -1.;\n\t// float rY = abs(vUv.y * 2. - 1.0) * -1.;\n\tdisplaced.z += cos(rX) * 0.04;\n\n\tfloat p = uHoverProgress;\n\n\t// wave\n\tfloat gradientSize = 0.3;\n    float skewSize = 0.2;\n    float progress = p + (p * 2.*gradientSize) + (p * 2.*skewSize) - gradientSize - skewSize;\n    float start = progress - gradientSize;\n    float end = progress + gradientSize;\n    float y = smoothstep(start, end, vUv.x + ((1.0-vUv.y) * skewSize));\n\tfloat height = 1.0 - abs(y * 2. - 1.);\n    displaced.z += (height*n) * 0.03;\n\t// end wave\n\n    vec4 modelViewPosition = modelViewMatrix * vec4(displaced, 1.0);\n    gl_Position = projectionMatrix * modelViewPosition;\n}\n'
    },
    120: function(e, t) {
        e.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D uTexture;\nuniform float uOpacity;\nuniform float uOpacityHover;\nuniform float uHoverProgress;\nuniform vec3 uColor;\nuniform float uColorBlend;\n\nvec3 blendNormal(vec3 base, vec3 blend) {\n\treturn blend;\n}\n\nvec3 blendNormal(vec3 base, vec3 blend, float opacity) {\n\treturn (blendNormal(base, blend) * opacity + base * (1.0 - opacity));\n}\n\nvoid main() {\n    vec4 texture = texture2D(uTexture, vUv);\n    vec3 grayscaleTexture = mix(vec3(dot(texture.rgb, vec3(0.299, 0.587, 0.114))) * 0.95, uColor, 0.35);\n\n    float p = uHoverProgress;\n\n    // wave\n    float gradientSize = 0.1;\n    float skewSize = 0.2;\n    float progress = uHoverProgress + (uHoverProgress * 2.*gradientSize) + (uHoverProgress * 2.*skewSize) - gradientSize - skewSize;\n    float start = progress - gradientSize;\n    float end = progress + gradientSize;\n    float y = smoothstep(start, end, vUv.x + ((1.0-vUv.y) * skewSize));\n    // end wave\n\n    vec3 gradedTexture = mix(texture.rgb, grayscaleTexture, 0.1);\n    gradedTexture.r -= 0.01;\n\n    vec3 color = mix(gradedTexture, grayscaleTexture, y);\n    gl_FragColor = vec4(color, uOpacity);\n}\n"
    },
    121: function(e, t) {
        e.exports = '#define GLSLIFY 1\n//\n// GLSL textureless classic 2D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute(permute(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy = abs(gx) - 0.5 ;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n\n  vec2 g00 = vec2(gx.x,gy.x);\n  vec2 g10 = vec2(gx.y,gy.y);\n  vec2 g01 = vec2(gx.z,gy.z);\n  vec2 g11 = vec2(gx.w,gy.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\n#define PI 3.14159265358979323846264338327\n\nvarying vec2 vUv;\n\nuniform vec2 uOffsetNoise;\nuniform float uDirection;\nuniform float uIntensity;\nuniform float uLimitCurve;\nuniform float uLimitShear;\nuniform float uHoverProgress;\n\nfloat normalized(float value) {\n    return (value + 1.0) * 0.5;\n}\n\nvoid main() {\n    vUv = uv;\n\n    vec3 displaced = position;\n\t// float normalizedX = 1.0 - (position.x + 0.5);\n\tfloat normalizedY = 0.5 + position.y;\n\tfloat offsetCurve = uLimitCurve * uIntensity;\n\tfloat offsetShear = uLimitShear * uIntensity;\n\n\tfloat offset = sin(normalizedY * PI) * offsetCurve;\n\n\tdisplaced.x -= uDirection * offset; // Curve\n\tdisplaced.x -= (normalizedY * -offsetShear) * uDirection; // shear\n\n\tfloat n = normalized(cnoise((vUv * 2.) + uOffsetNoise)) * 0.5 + 0.5; // from 0.5 to 1.0\n\n\t// circle\n\tfloat rX = abs(vUv.x * 2. - 1.0) * -1.;\n\t// float rY = abs(vUv.y * 2. - 1.0) * -1.;\n\tdisplaced.z += cos(rX) * 0.04;\n\n\tfloat p = uHoverProgress;\n\n\t// wave\n\tfloat gradientSize = 0.3;\n    float skewSize = 0.2;\n    float progress = p + (p * 2.*gradientSize) + (p * 2.*skewSize) - gradientSize - skewSize;\n    float start = progress - gradientSize;\n    float end = progress + gradientSize;\n    float y = smoothstep(start, end, vUv.x + ((1.0-vUv.y) * skewSize));\n\tfloat height = 1.0 - abs(y * 2. - 1.);\n    displaced.z += (height*n) * 0.03;\n\t// end wave\n\n    vec4 modelViewPosition = modelViewMatrix * vec4(displaced, 1.0);\n    gl_Position = projectionMatrix * modelViewPosition;\n}\n'
    },
    122: function(e, t) {
        e.exports = "#define GLSLIFY 1\nvarying vec3 vPosition;\n\nvoid main() {\n    vPosition = position;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n"
    },
    123: function(e, t) {
        e.exports = "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n// varying vec2 vUv;\nvarying vec3 vPosition;\n\nuniform float uOpacity;\nuniform vec3 uColorBackground;\nuniform vec3 uColorHighlight;\nuniform vec2 uSize;\nuniform float uIntensity;\n\nfloat normalized(float value) {\n    return (value + 1.0) * 0.5;\n}\n\nvoid main() {\n    vec3 position = vPosition * vec3(uSize.xy, uSize.y);\n    vec3 mask = vec3(1.0 - normalized(snoise(position)));\n    vec3 color = mix(uColorBackground, mix(uColorBackground, uColorHighlight, uIntensity), mask.r * uOpacity);\n\n    gl_FragColor = vec4(color, 1.0);\n}\n"
    },
    124: function(e, t) {
        e.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D uTexture;\nuniform vec3 uColor;\nuniform float uOpacity;\nuniform float uReveal;\nuniform float uDirection;\n\nvoid main() {\n    vec4 mask = texture2D(uTexture, vUv);\n    float alpha = mask.r * uOpacity;\n    \n    float x = 1.0 - vUv.x;\n    float reveal = uReveal;\n\n    if (uDirection <= 0.0) {\n        x = vUv.x;\n        reveal = 1.0 - uReveal;\n    }\n    \n    float gradient = 1.0 - (sin(x * reveal) + reveal);\n    gl_FragColor = vec4(uColor, gradient * alpha);\n}\n"
    },
    125: function(e, t) {
        e.exports = "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat snoise(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nvarying vec2 vUv;\n\nuniform float uTime;\n\nvoid main() {\n    vUv = uv;\n\n    float speed = 0.2;\n    float intensity = 0.05;\n    float size = 0.5;\n\n    float noise = snoise((uv * size) + (uTime * speed)) * intensity;\n    vec3 displaced = position;\n    displaced.z = noise;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced.xyz, 1.0);\n}\n"
    },
    127: function(e, t, i) {
        "use strict";
        (function(e) {
            var n = i(0),
                s = i(128);

            function a(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }

            function o(e, t, i) {
                return t && a(e.prototype, t), i && a(e, i), e
            }
            e.THREE = n, i(169);
            var r = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._loader = new n.GLTFLoader, this._callbacks = {}
                }
                return o(e, [{
                    key: "onLoaded",
                    set: function(e) {
                        this._callbacks.onLoaded = e
                    }
                }, {
                    key: "onFailed",
                    set: function(e) {
                        this._callbacks.onFailed = e
                    }
                }]), o(e, [{
                    key: "isSupported",
                    value: function() {
                        return !0
                    }
                }, {
                    key: "load",
                    value: function(e) {
                        this._loader.load(e, this.loaded.bind(this), null, this.failed.bind(this))
                    }
                }, {
                    key: "loaded",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this._callbacks.onLoaded && this._callbacks.onLoaded(Object(s.a)(e.scene.children))
                    }
                }, {
                    key: "failed",
                    value: function() {
                        this._callbacks.onFailed && this._callbacks.onFailed()
                    }
                }]), e
            }();
            t.a = r
        }).call(this, i(27))
    },
    128: function(e, t, i) {
        "use strict";
        i.d(t, "a", (function() {
            return s
        }));
        var n = i(5);

        function s(e) {
            var t, i, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "name",
                a = {},
                o = e.length;
            for (t = 0; t < o; t++) i = e[t], a[Object(n.camelCase)(i[s])] = i;
            return a
        }
    },
    136: function(e) {
        e.exports = JSON.parse('[{"id":"0-1","month":0,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-january.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-january.jpg","dimensions":{"width":1280,"height":720}},"text":"Our house \\nis on fire\\n\\n\\n"},{"id":"0-0","month":0,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-january-1.jpg","dimensions":{"width":1280,"height":720}},"text":"\\n\\nGreta Thunberg \\nspeaks to world \\nleaders at Davos","link":"https://www.theguardian.com/commentisfree/2020/jan/10/greta-thunberg-davos-tycoons-fossil-fuels-dismantle-climate-crisis"},{"id":"1-0","month":1,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-february-1.jpg","dimensions":{"width":1280,"height":720}},"text":"Greta Thunberg \\nsupports teenagers\' \\nschool strikes \\nfor climate change, \\nkickstarting “Fridays \\nFor Future”","link":"https://www.theclimategroup.org/news/school-strike-climate-generation-most-lose-continued-inaction"},{"id":"1-1","month":1,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-february.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-february.jpg","dimensions":{"width":1280,"height":720}},"text":"Thousands of \\nUK students \\nstrike over \\nclimate change\\n"},{"id":"1-2","month":1,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-february-2.jpg","dimensions":{"width":1280,"height":720}},"text":"Greta Thunberg \\nspeaks at \\n“Civil Society \\nFor Renaissance“ \\ntravelling by train \\nto Brussels","link":"https://www.cnbc.com/2019/02/22/juncker-proposes-climate-change-spending-after-greta-thunberg-speech.html"},{"id":"2-0","month":2,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-march-1.jpg","dimensions":{"width":1280,"height":720}},"text":"\\nGreta Thunberg \\nis nominated for \\na Nobel Peace Prize.\\n","link":"https://www.bbc.com/news/amp/world-europe-47568227"},{"id":"2-1","month":2,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-march.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-march.jpg","dimensions":{"width":1280,"height":720}},"text":"Fridays for Future \\nStockholm, \\nMarch 15 2019\\n\\n"},{"id":"2-2","month":2,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-march-2.jpg","dimensions":{"width":1280,"height":720}},"text":"The number of \\nstudents taking part \\nin school strikes \\nhits more than \\n2 million people \\nacross 135 countries\\n\\n","link":"https://www.youtube.com/watch?v=vMeutCvRjA8&feature=emb_title"},{"id":"3-0","month":3,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-april-1.jpg","dimensions":{"width":1280,"height":720}},"text":"“Forget Brexit \\nand focus on \\nClimate Change”\\n","link":"https://www.theguardian.com/environment/2019/apr/16/greta-thunberg-urges-eu-leaders-wake-up-climate-change-school-strike-movement"},{"id":"3-1","month":3,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-april.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-april.jpg","dimensions":{"width":1280,"height":720}},"text":"Emotional \\nspeech \\nto leaders \\nof the EU\\n"},{"id":"4-0","month":4,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-may-1.jpg","dimensions":{"width":1280,"height":720}},"text":"\\n\\nGreta Thunberg \\nreleases book \\n“No One Is Too Small to \\nMake a Difference”.","link":"https://theguardian.com/books/2019/may/29/greta-thunberg-review-speeches-that-appeal-to-both-heart-and-mind"},{"id":"4-1","month":4,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-may.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-may.jpg","dimensions":{"width":1280,"height":720}},"text":"Interview \\nwith \\nArnold \\nSchwarzenegger"},{"id":"5-0","month":5,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-june-1.jpg","dimensions":{"width":1280,"height":720}},"text":"\\n“Shame of Flying” \\nis becoming a thing.","link":"http://www.airportwatch.org.uk/2018/11/the-concept-of-flying-shame-is-growing-in-sweden-shame-if-you-fly-too-much-due-to-the-co2-emissions/"},{"id":"5-1","month":5,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-june.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-june.jpg","dimensions":{"width":1280,"height":720}},"text":"Comments on \\nchildren in \\nclimate activism"},{"id":"6-0","month":6,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-july-1.jpg","dimensions":{"width":1280,"height":720}},"text":"Greta Thunberg \\ngoes to France \\nand becomes \\n“apocalypse guru”","link":"https://www.bbc.com/news/world-europe-49092653"},{"id":"6-1","month":6,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-july.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-july.jpg","dimensions":{"width":1280,"height":720}},"text":"\\nExcerpt from \\nspeech at the \\nFrench Parliament"},{"id":"6-2","month":6,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-july-2.jpg","dimensions":{"width":1280,"height":720}},"text":"Thunberg releases \\na song with \\nthe band The 1975, \\ncontributing vocals \\nfrom previous \\nconference speeches","link":"https://www.youtube.com/watch?v=zq4eCQCgQw8"},{"id":"7-0","month":7,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-august-1.jpg","dimensions":{"width":1280,"height":720}},"text":"Thunberg sets sail \\nfrom Britain for \\nthe United States \\nto take part in \\nthe U.N. Climate \\nSummit","link":"https://time.com/5663534/greta-thunberg-arrives-sail-atlantic/"},{"id":"7-1","month":7,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-august.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-august.jpg","dimensions":{"width":1280,"height":720}},"text":"Interview with \\nTrevor Noah \\non the \\nDaily Show\\n\\n"},{"id":"8-0","month":8,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-september-1.jpg","dimensions":{"width":1280,"height":720}},"text":"Thunberg takes \\nher mission to \\nU.S. President \\nDonald Trump’s \\ndoorstep with a protest \\noutside the White House.","link":"https://www.dw.com/en/greta-thunberg-brings-climate-protests-to-white-house/a-50425889"},{"id":"8-1","month":8,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-september.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-september.jpg","dimensions":{"width":1280,"height":720}},"text":"\\n\\nEmotional \\ncall for action \\nat U.N. Climate Session"},{"id":"8-2","month":8,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-september-2.jpg","dimensions":{"width":1280,"height":720}},"text":"\\n\\nGreta Thunberg \\nmeets Barack Obama ","link":"https://www.bbc.co.uk/newsround/49660119"},{"id":"9-0","month":9,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-october-1.jpg","dimensions":{"width":1280,"height":720}},"text":"Greta Thunberg \\nis shortlisted for \\nthe Nobel Peace Prize.","link":"https://www.theguardian.com/world/2019/mar/14/greta-thunberg-nominated-nobel-peace-prize"},{"id":"9-1","month":9,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-november.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-november.jpg","dimensions":{"width":1280,"height":720}},"text":"\\n\\nSail, \\nnot drift"},{"id":"10-0","month":10,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-november-1.jpg","dimensions":{"width":1280,"height":720}},"text":"Greta Thunberg \\nsets sail for \\nMadrid \\nclimate conference \\nwith a family of YouTubers.","link":"https://www.theverge.com/2019/11/14/20964670/greta-thunberg-boat-madrid-youtube-family"},{"id":"10-1","month":10,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-october.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-october.jpg","dimensions":{"width":1280,"height":720}},"text":"\\n\\nSpeech at \\nclimate rally \\nin Vancouver, Canada"},{"id":"11-0","month":11,"type":"link","image":{"src":"https://theyearofgreta.com/static/content/images/link-poster-december-1.jpg","dimensions":{"width":1280,"height":720}},"text":"\\nGreta Thunberg \\nnamed \\nTime Magazine\'s \\nperson of the year","link":"https://www.theguardian.com/media/2019/dec/11/greta-thunberg-time-magazine-person-of-the-year-2019"},{"id":"11-1","month":11,"type":"video","video":{"source":"https://theyearofgreta.com/static/content/videos/video-december.mp4","poster":"https://theyearofgreta.com/static/content/images/video-poster-december.jpg","dimensions":{"width":1280,"height":720}},"text":"Words of hope \\ndelivered at \\nCOP 25 in Madrid"}]')
    },
    156: function(e) {
        e.exports = JSON.parse('{"label__explore":"Explore","label__timeline":"Timeline","label__download":"Download","label__read-more":"Read More","label__drag":"Drag","logo__first-name":"Greta","logo__last-name":"Thunberg","social__facebook":"FB","social__twitter":"TW","social__youtube":"YT","site__title":"The Year of Greta","site__description":"An illustrated timeline of how Greta Thunberg rose from a solo campaigner to the leader of a global movement in 2019.","month__january":"January","month__december":"December","month__abbreviation-january":"Jan","month__abbreviation-february":"Feb","month__abbreviation-march":"Mar","month__abbreviation-april":"Apr","month__abbreviation-may":"May","month__abbreviation-june":"Jun","month__abbreviation-july":"Jul","month__abbreviation-august":"Aug","month__abbreviation-september":"Sep","month__abbreviation-october":"Oct","month__abbreviation-november":"Nov","month__abbreviation-december":"Dec","page-preloader__subheading-line-one":"Change is coming,","page-preloader__subheading-line-two":"Whether you like it or not.","page-timeline__heading-line-one":"“How Dare You?","page-timeline__heading-line-two":"We Will Never Forgive You!”","page-timeline__body":"So a 50% risk is simply not acceptable to us -- we who have to live with the consequences.","page-landing__subheading-line-one":"Welcome to the","page-landing__subheading-line-two":"Greta Thunberg experience.","home__title":"Home","footer__sound":"If you want to have the 4D experience play"}')
    },
    170: function(e, t, i) {
        "use strict";
        i.r(t);
        var n = i(173),
            s = i(2),
            a = i.n(s),
            o = a.a.Model.extend({}),
            r = new(a.a.Collection.extend({
                url: "data/timeline/posts.json",
                model: o
            })),
            l = a.a.Model.extend({}),
            u = i(136),
            h = new(a.a.Collection.extend({
                model: l
            }))(u),
            c = i(174),
            d = i(1),
            p = (i(30), i(49), i(50), i(35), i(99), i(51), i(52), i(53), i(54), i(55), i(16));

        function m(e) {
            return (m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function _(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function f(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function v(e, t) {
            return !t || "object" !== m(t) && "function" != typeof t ? function(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }

        function g(e) {
            return (g = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function y(e, t) {
            return (y = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var w = function(e) {
                function t() {
                    var e, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return _(this, t), (e = v(this, g(t).call(this)))._state = i, e
                }
                var i, n, s;
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && y(e, t)
                }(t, e), i = t, (n = [{
                    key: "state",
                    get: function() {
                        return this._state
                    },
                    set: function(e) {
                        this._state = Object.assign({}, this._state, e), this.dispatchEvent("change", this._state)
                    }
                }]) && f(i.prototype, n), s && f(i, s), t
            }(p.a),
            b = new w({
                scene: null,
                preloader: "Preloader/Init"
            }),
            x = i(4),
            k = i(9),
            S = i(6),
            z = new k.a({
                isLoaded: !1,
                rotation: .5,
                opacity: 1,
                color: 6316128,
                material: {
                    roughness: .61,
                    metalness: .56,
                    reflectivity: 1
                }
            });
        ! function() {
            if (S.a.gui) {
                var e = S.a.gui.addFolder("Rock");
                e.add(z.state, "rotation", 0, 2 * Math.PI, .01).listen(), e.addColor(z.state, "color").listen();
                var t = e.addFolder("material");
                t.add(z.state.material, "roughness", 0, 1, .01).listen(), t.add(z.state.material, "metalness", 0, 1, .01).listen(), t.add(z.state.material, "reflectivity", 0, 1, .01).listen()
            }
        }();
        i(56);
        var H = i(5),
            L = a.a.Component.extend({
                ui: {
                    line: ".js-line",
                    label: ".js-label"
                },
                events: {
                    mouseenter: "_mouseEnterHandler",
                    mouseleave: "_mouseLeaveHandler"
                },
                initialize: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    Object(H.bindAll)(this, "_resizeHandler", "_timelineInCompleteHandler", "_timelineInCompleteHandler", "_timelineOutStartHandler", "_timelineOutCompleteHandler"), this._isAnimating = !0, this._direction = e.direction
                },
                onInitialized: function() {
                    this._setSize(), this._setLabel(), this._setInitialStyles(), this._setupCharacters(), this._setupEventListeners()
                },
                onClose: function() {
                    this._removeEventlisteners()
                },
                show: function() {
                    var e = d.a.timeline({
                        onStart: this._timelineInStartHandler,
                        onComplete: this._timelineInCompleteHandler
                    });
                    return e.to(this.ui.line, {
                        duration: .2,
                        scaleX: 1,
                        ease: "power1.inOut"
                    }, 0), e.to(this.ui.line, {
                        duration: .6,
                        x: 0,
                        ease: "power3.out"
                    }, .2), e.to(this._characters, {
                        duration: .3,
                        alpha: 1,
                        ease: "sine.inOut",
                        stagger: {
                            amount: .3
                        }
                    }, .3), e
                },
                hide: function() {
                    var e = "Button/Primary/Direction/Left" === this._direction ? this._size.width : -1 * this._size.width,
                        t = d.a.timeline({
                            onStart: this._timelineOutStartHandler,
                            onComplete: this._timelineOutCompleteHandler
                        });
                    return t.to(this.ui.line, {
                        duration: .4,
                        scaleX: 0,
                        ease: "power2.inOut"
                    }, 0), t.to(this.ui.line, {
                        duration: .4,
                        x: e,
                        ease: "power2.inOut"
                    }, 0), t.to(this._characters, {
                        duration: .2,
                        alpha: 0,
                        ease: "sine.inOut",
                        stagger: {
                            amount: .2
                        }
                    }, .1), t
                },
                _setInitialStyles: function() {
                    var e = "Button/Primary/Direction/Left" === this._direction ? -1 * this._size.width * 1 : 1 * this._size.width;
                    this.ui.line.style.transform = "matrix(".concat(0, ", 0.0, 0.0, 1.0, ").concat(e, ", 0)")
                },
                _setLabel: function() {
                    this._label = this.ui.label.textContent
                },
                _setupCharacters: function() {
                    this._characters = [], this.ui.label.innerHTML = "";
                    var e, t, i = this._label.length;
                    for (e = 0; e < i; e++)(t = document.createElement("span")).style.opacity = 0, t.textContent = this._label[e], this.ui.label.appendChild(t), this._characters.push(t);
                    "Button/Primary/Direction/Right" === this._direction && this._characters.reverse()
                },
                _createMouseEnterAnimation: function() {
                    this._isHiding || (this._mouseLeaveTl && this._mouseLeaveTl.kill(), this._mouseEnterTl = d.a.timeline(), this._mouseEnterTl.to(this.ui.line, {
                        duration: .8,
                        scaleX: 1.3,
                        transformOrigin: "100% 0%",
                        ease: "power3.out"
                    }, 0), this._mouseEnterTl.to(this.ui.line, {
                        duration: .3,
                        backgroundColor: "rgba(210, 225, 145, 1.0)",
                        ease: "sine.inOut"
                    }, 0))
                },
                _createMouseLeaveAnimation: function() {
                    this._isHiding || (this._mouseEnterTl && this._mouseEnterTl.kill(), this._mouseLeaveTl = d.a.timeline(), this._mouseLeaveTl.to(this.ui.line, {
                        duration: .7,
                        scaleX: 1,
                        ease: "power3.out"
                    }, 0), this._mouseLeaveTl.to(this.ui.line, {
                        duration: .3,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        ease: "sine.inOut"
                    }, 0))
                },
                _setSize: function() {
                    this._size = {}, this._size.width = this.el.clientWidth, this._size.height = this.el.clientHeight
                },
                _setupEventListeners: function() {
                    n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler)
                },
                _removeEventlisteners: function() {
                    n.a.removeEventListener("resize", this._resizeHandler), n.a.removeEventListener("resize:complete", this._resizeHandler)
                },
                _resizeHandler: function() {
                    this._setSize()
                },
                _mouseEnterHandler: function() {
                    this._isAnimating || this._createMouseEnterAnimation()
                },
                _mouseLeaveHandler: function() {
                    this._isAnimating || this._createMouseLeaveAnimation()
                },
                _timelineInStartHandler: function() {
                    this._isAnimating = !0
                },
                _timelineInCompleteHandler: function() {
                    this._isAnimating = !1
                },
                _timelineOutStartHandler: function() {
                    this._isAnimating = !0
                },
                _timelineOutCompleteHandler: function() {
                    this._isAnimating = !1
                }
            }),
            C = new k.a({
                isLoaded: !1,
                rotation: 0,
                color: 16645629,
                emissive: 2965556,
                opacity: 1,
                scale: 1,
                progress: 0,
                material: {
                    roughness: 1,
                    metalness: 0,
                    reflectivity: 0,
                    envMapIntensity: .26,
                    aoMapIntensity: .78,
                    emissiveIntensity: .93
                }
            });
        ! function() {
            if (S.a.gui) {
                var e = S.a.gui.addFolder("Greta");
                e.add(C.state, "progress", 0, 1, .01), e.add(C.state, "opacity", 0, 1, .01), e.add(C.state, "rotation", 0, 2 * Math.PI, .01).listen(), e.addColor(C.state, "color").listen(), e.addColor(C.state, "emissive").listen();
                var t = e.addFolder("material");
                t.add(C.state.material, "roughness", 0, 1, .01).listen(), t.add(C.state.material, "metalness", 0, 1, .01).listen(), t.add(C.state.material, "reflectivity", 0, 1, .01).listen(), t.add(C.state.material, "envMapIntensity", 0, 1, .01).listen(), t.add(C.state.material, "aoMapIntensity", 0, 1, .01).listen(), t.add(C.state.material, "emissiveIntensity", 0, 1, .01).listen()
            }
        }();
        var E = new k.a({
            opacityMultiplier: 0,
            introOffset: 0,
            dragOffset: 0,
            progress: 0,
            yDistance: .6,
            yOffset: 0,
            radius: 1.5,
            skewStrength: 10,
            meshOnHover: null,
            color: 0,
            scale: 1
        });
        ! function() {
            if (S.a.gui) {
                var e = S.a.gui.addFolder("Tiles");
                e.add(E.state, "opacityMultiplier", 0, 1, .01).listen(), e.add(E.state, "introOffset", -1, 0, .01).listen(), e.add(E.state, "yOffset", -5, 5, .01).listen(), e.add(E.state, "yDistance", 0, 1, .01).listen(), e.add(E.state, "radius", 0, 5, .1).listen(), e.add(E.state, "skewStrength", 0, 20).listen(), e.add(E.state, "scale", 0, 1, .01).listen()
            }
        }();
        var O = new k.a({
            opacity: 0,
            intensity: .5,
            scale: 1,
            rotation: {
                x: 1.27,
                y: 1.9,
                z: 0
            },
            size: {
                x: .1,
                y: .1
            },
            color: {
                highlight: 11982500,
                background: 2965556
            }
        });
        ! function() {
            if (S.a.gui) {
                var e = S.a.gui.addFolder("Background");
                e.add(O.state, "intensity", 0, 1, .01), e.add(O.state, "scale", 0, 5, .01), e.add(O.state, "opacity", 0, 1, .01);
                var t = e.addFolder("rotation");
                t.add(O.state.rotation, "x", 0, 2 * Math.PI, .01), t.add(O.state.rotation, "y", 0, 2 * Math.PI, .01), t.add(O.state.rotation, "z", 0, 2 * Math.PI, .01);
                var i = e.addFolder("size");
                i.add(O.state.size, "x", 0, 1, .01), i.add(O.state.size, "y", 0, 1, .01);
                var n = e.addFolder("color");
                n.addColor(O.state.color, "highlight"), n.addColor(O.state.color, "background")
            }
        }();
        var P = new k.a({
            opacity: .5,
            scale: 1,
            color: 2965556,
            reveal: 0,
            direction: -1,
            position: {
                x: 0,
                y: .25,
                z: -1.4
            }
        });
        ! function() {
            if (S.a.gui) {
                var e = S.a.gui.addFolder("Landing Heading");
                e.add(P.state, "scale", 0, 5, .01).listen(), e.add(P.state, "opacity", 0, 1, .01).listen(), e.add(P.state, "reveal", 0, 1, .01).listen(), e.add(P.state, "direction", -1, 1, .01).listen(), e.addColor(P.state, "color").listen();
                var t = e.addFolder("position");
                t.add(P.state.position, "x", -5, 5, .01).listen(), t.add(P.state.position, "y", -5, 5, .01).listen(), t.add(P.state.position, "z", -5, 5, .01).listen()
            }
        }();
        var M = new k.a({
            opacity: 0
        });

        function T(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        S.a.gui && S.a.gui.addFolder("Particles").add(M.state, "opacity", 0, 1, .01);
        var I = new(function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            var t, i, n;
            return t = e, (i = [{
                key: "get",
                value: function(e) {
                    switch (e) {
                        case "Animation/Landing/In":
                            var t = d.a.timeline();
                            return t.set(M.state, {
                                opacity: 0
                            }, 0), t.set(x.a.state.position, {
                                z: 8,
                                y: 4
                            }, 0), t.set(x.a.state.rotation, {
                                y: 1 * Math.PI
                            }, 0), t.to(x.a.state.position, {
                                duration: 4,
                                z: 2,
                                y: 0,
                                ease: "power2.inOut"
                            }, 0), t.to(x.a.state.rotation, {
                                duration: 4,
                                ease: "power2.inOut",
                                y: 0
                            }, 0), t.to(M.state, {
                                duration: 2,
                                ease: "sine.out",
                                opacity: 1
                            }, 2), t;
                        case "Animation/Explore/In":
                            var i = d.a.timeline();
                            return i.set(x.a.state, {
                                smoothing: .05
                            }), i.set(x.a.state.position, {
                                z: 2
                            }, 0), i.to(x.a.state.rotation, {
                                duration: .6,
                                ease: "power2.inOut",
                                y: .5
                            }, 0), i.to(x.a.state.rotation, {
                                duration: 1.2,
                                ease: "power2.out",
                                y: 0
                            }, 1.6), i.to(x.a.state, {
                                duration: 1.2,
                                ease: "power2.inOut",
                                scale: 1.1
                            }, 1.6), i;
                        case "Animation/Explore/Out":
                            var n = d.a.timeline();
                            return n.set(x.a.state, {
                                smoothing: 1
                            }), n.to(x.a.state.rotation, {
                                duration: 1 - x.a.state.world.progress,
                                ease: "sine.out",
                                y: 0
                            }, 0), n.to(x.a.state, {
                                duration: 1 - x.a.state.world.progress,
                                ease: "sine.out",
                                scale: 1
                            }, 0), n.to(x.a.state.world, {
                                duration: 1 - x.a.state.world.progress,
                                progress: 0,
                                ease: "sine.out"
                            }, 0), n.to(E.state, {
                                duration: 1,
                                introOffset: 100,
                                ease: "power1.in"
                            }, 0), n.to(E.state, {
                                duration: 1,
                                opacityMultiplier: 0,
                                ease: "sine.out"
                            }, 0), n;
                        case "Animation/Background/In":
                            var s = d.a.timeline();
                            return s.to(O.state, {
                                duration: .8,
                                opacity: 1,
                                ease: "none"
                            }, 0), s;
                        case "Animation/HEading/In":
                            var a = d.a.timeline();
                            return a.set(P.state, {
                                direction: -1,
                                reveal: 0
                            }), a.to(P.state, {
                                duration: 1.6,
                                ease: "sine.out",
                                reveal: 1
                            }, 0), a;
                        case "Animation/HEading/Out":
                            var o = d.a.timeline();
                            return o.set(P.state, {
                                direction: 1,
                                reveal: 0
                            }), o.to(P.state, {
                                duration: .8,
                                ease: "sine.in",
                                reveal: 1
                            }, 0), o;
                        case "Animation/Tiles/In":
                            var r = d.a.timeline();
                            return r.set(E.state, {
                                introOffset: -100,
                                progress: 0
                            }), r.to(E.state, {
                                duration: 1,
                                introOffset: 0,
                                ease: "power2.out"
                            }, .1), r.to(E.state, {
                                duration: .6,
                                opacityMultiplier: 1,
                                ease: "sine.in"
                            }, .1), r;
                        case "Animation/Tiles/Out":
                            var l = d.a.timeline();
                            return l.to(E.state, {
                                duration: 1,
                                yOffset: .5,
                                ease: "power2.inOut"
                            }, 1), l.to(E.state, {
                                duration: .9,
                                opacityMultiplier: 0,
                                ease: "sine.in"
                            }, 1.1), l
                    }
                }
            }, {
                key: "start",
                value: function(e) {
                    switch (e) {
                        case "Animation/Landing/In":
                            break;
                        case "Animation/Tiles/In":
                            this._timelines.tilesIn.play(0)
                    }
                }
            }, {
                key: "kill",
                value: function() {}
            }, {
                key: "landingIn",
                value: function() {
                    var e = new d.a.timeline;
                    return e.set(x.a.state.position, {
                        z: 5,
                        y: 2
                    }, 0), e.set(x.a.state.rotation, {
                        y: 2 * Math.PI
                    }, 0), e.to(x.a.state.rotation, {
                        duration: 1.5,
                        y: 0,
                        ease: "sine.out"
                    }, 0), e.to(x.a.state.position, {
                        duration: 1.5,
                        z: 2,
                        ease: "sine.out"
                    }, 0), e.to(x.a.state.target, {
                        duration: 1.5,
                        y: 0,
                        x: 0,
                        ease: "sine.out"
                    }, 0), e
                }
            }]) && T(t.prototype, i), n && T(t, n), e
        }());
        window.animations = I;
        var j = a.a.View.extend({
                ui: {
                    paragraph: ".js-paragraph",
                    divider: ".js-divider"
                },
                components: {
                    buttonExplore: {
                        selector: ".js-button-explore",
                        type: L,
                        options: {
                            direction: "Button/Primary/Direction/Left"
                        }
                    }
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_resizeHandler")
                },
                onInitialized: function() {
                    this._setSize(), this._setInitialStyles(), this._setupEventListeners()
                },
                onClose: function() {
                    this._removeEventListeners()
                },
                show: function() {
                    var e = d.a.timeline();
                    return e.to(this.ui.divider, {
                        duration: .4,
                        scaleX: .4,
                        x: 0,
                        ease: "power1.in"
                    }, 0), e.to(this.ui.divider, {
                        duration: .6,
                        scaleX: this._size.divider.scale,
                        ease: "power2.out"
                    }, .3), e.to(this.ui.paragraph, {
                        duration: .6,
                        alpha: 1,
                        ease: "sine.inOut"
                    }, .3), e.add(this.components.buttonExplore.show(), .7), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.ui.paragraph, {
                        duration: .6,
                        alpha: 0,
                        ease: "sine.out"
                    }, 0), e.to(this.ui.divider, {
                        duration: .4,
                        scaleX: 0,
                        x: 0,
                        ease: "power1.in"
                    }, .2), e.to(this.ui.divider, {
                        duration: .4,
                        scaleX: 0,
                        x: 0,
                        ease: "power1.in"
                    }, .2), e.add(this.components.buttonExplore.hide(), .3), e
                },
                _setupEventListeners: function() {
                    n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler)
                },
                _removeEventListeners: function() {
                    n.a.removeEventListener("resize", this._resizeHandler), n.a.removeEventListener("resize:complete", this._resizeHandler)
                },
                _setSize: function() {
                    this._size = {}, this._size.divider = {}, this._size.divider.width = this.ui.divider.clientWidth, this._size.divider.height = this.ui.divider.clientHeight, this._size.divider.scale = 1 / this._size.divider.width * 15
                },
                _setInitialStyles: function() {
                    this.ui.paragraph.style.opacity = 0, this.ui.divider.style.transform = "matrix(0.0, 0.0, 0.0, 1.0, ".concat(this._size.divider.width, ", 0)")
                },
                _resizeHandler: function() {
                    this._setSize()
                }
            }),
            D = a.a.View.extend({
                className: "page page-landing",
                template: "pages/landing",
                ui: {
                    paragraph: ".js-paragraph",
                    divider: ".js-divider"
                },
                components: {
                    statement: {
                        selector: ".js-statement",
                        type: j
                    }
                },
                events: {
                    mousemove: "_mouseMoveHandler"
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_timelineHideStartHandler"), this._state = "Landing/State/Static"
                },
                onInitialized: function() {
                    this._setSize(), this._setupTimelines()
                },
                immediateTransitionIn: function() {},
                transitionIn: function() {
                    this._timelineOut && this._timelineOut.kill(), "Background/Scene/Intro" === b.state.scene ? this._timelineIn.play(0) : this._timelineInWithOutGreta.play(0), b.state = {
                        scene: "Background/Scene/Landing"
                    }
                },
                transitionOut: function(e) {
                    this._timelineIn && this._timelineIn.kill(), this._timelineInWithOutGreta && this._timelineInWithOutGreta.kill(), this._timelineOut.play(0).then(e), x.a.state.interaction.x = 0, x.a.state.interaction.y = 0
                },
                onClose: function() {
                    this._removeTimelines()
                },
                _setSize: function() {
                    this._size = {}, this._size.width = this.el.clientWidth, this._size.height = this.el.clientHeight
                },
                _setInitialStyles: function() {},
                _setupTimelines: function() {
                    this._timelineIn = d.a.timeline({
                        paused: !0
                    }), this._timelineIn.add(I.get("Animation/Landing/In"), 0), this._timelineIn.add(I.get("Animation/Background/In"), 2.2), this._timelineIn.add(this.components.statement.show(), 2.3), this._timelineIn.add(I.get("Animation/HEading/In"), 3.4), this._timelineInWithOutGreta = d.a.timeline({
                        paused: !0
                    }), this._timelineInWithOutGreta.add(I.get("Animation/HEading/In"), 0), this._timelineInWithOutGreta.add(this.components.statement.show(), .3), this._timelineOut = d.a.timeline({
                        onStart: this._timelineHideStartHandler,
                        paused: !0
                    }), this._timelineOut.add(I.get("Animation/HEading/Out"), 0), this._timelineOut.add(this.components.statement.hide(), .2)
                },
                _removeTimelines: function() {
                    this._timelineIn && (this._timelineIn.kill(), this._timelineIn = null), this._timelineOut && (this._timelineOut.kill(), this._timelineOut = null), this._timelineInWithOutGreta && (this._timelineInWithOutGreta.kill(), this._timelineInWithOutGreta = null)
                },
                _mouseMoveHandler: function(e) {
                    if ("Landing/State/Animating" !== this._state) {
                        var t = 1 / n.a.viewportWidth * e.clientX * 2 - 1,
                            i = 1 / n.a.viewportHeight * e.clientY * 2 - 1;
                        x.a.state.interaction.x = t, x.a.state.interaction.y = i
                    }
                },
                _timelineHideStartHandler: function() {
                    this._state = "Landing/State/Animating"
                }
            });

        function A(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function R(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var U = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    A(this, e), this._delay = t.delay || 200, this._timer = null
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "start",
                    value: function(e) {
                        this._timer = setTimeout(e, this._delay)
                    }
                }, {
                    key: "clear",
                    value: function() {
                        this._timer && clearTimeout(this._timer)
                    }
                }]) && R(t.prototype, i), n && R(t, n), e
            }(),
            F = i(112);

        function B(e) {
            return (B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function G(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function V(e) {
            return (V = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function W(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function q(e, t) {
            return (q = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function N(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }
        var Y = new(function(e) {
            function t() {
                var e, i, n;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), i = this, n = V(t).call(this), e = !n || "object" !== B(n) && "function" != typeof n ? W(i) : n, N(W(e), "_wheelHandler", (function(t) {
                    "Wheel/State/Static" === e._state && (e._delta = 0, e._state = "Wheel/State/Scrolling", e.dispatchEvent("wheel:start", e._offset)), e._setOffset(t.deltaY), e._trottle(), e.dispatchEvent("wheel", e._offset)
                })), N(W(e), "_wheelCompleteHandler", (function() {
                    "Wheel/State/Scrolling" === e._state && (e._state = "Wheel/State/Static", e.dispatchEvent("wheel:end", e._offset))
                })), e._state = "Wheel/State/Static", e._delta = 0, e._offset = 0, e._setupEventListeners(), e._setupTrottler(), e
            }
            var i, n, s;
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && q(e, t)
            }(t, e), i = t, (n = [{
                key: "_setupEventListeners",
                value: function() {
                    F.addWheelListener(window, this._wheelHandler, {
                        passive: !1
                    })
                }
            }, {
                key: "_setupTrottler",
                value: function() {
                    this._trottler = new U({
                        delay: 200
                    })
                }
            }, {
                key: "_setOffset",
                value: function(e) {
                    this._offset += e, this._delta = e
                }
            }, {
                key: "_trottle",
                value: function() {
                    this._trottler.clear(), this._trottler.start(this._wheelCompleteHandler)
                }
            }, {
                key: "state",
                get: function() {
                    return this._state
                }
            }, {
                key: "offset",
                get: function() {
                    return this._offset
                }
            }]) && G(i.prototype, n), s && G(i, s), t
        }(p.a));

        function X(e, t, i) {
            return Math.min(Math.max(t, e), i)
        }

        function Q(e, t, i) {
            return (1 - i) * e + i * t
        }
        var J = new w({
                isOverlayActive: !1,
                isPermissionsTransitionedIn: !1,
                isGretaTransitionedIn: !1,
                activeTile: null
            }),
            Z = i(13),
            K = i(7),
            $ = i(131);

        function ee(e) {
            return (ee = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function te(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function ie(e) {
            return (ie = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function ne(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function se(e, t) {
            return (se = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function ae(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }
        var oe = new(function(e) {
                function t() {
                    var e, i, n;
                    return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), i = this, n = ie(t).call(this), e = !n || "object" !== ee(n) && "function" != typeof n ? ne(i) : n, ae(ne(e), "_resourceStateChangeHandler", (function(t) {
                        t === Z.c.LOADED && (e.state = "Background/Sound/State/Loaded", e._resource.removeEventListener("stateChange", e._resourceStateChangeHandler))
                    })), ae(ne(e), "_applicationStoreChangeHandler", (function(t) {
                        "Background/Sound/State/Playing" === e._state && t.isOverlayActive && !e._isMuted && (e._isMuted = !0, e._mute()), "Background/Sound/State/Playing" === e._state && !t.isOverlayActive && e._isMuted && (e._isMuted = !1, e._unmute())
                    })), e._state = "Background/Sound/State/Initial", e._isMuted = !1, e._setupEventListeners(), e
                }
                var i, n, s;
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && se(e, t)
                }(t, e), i = t, (n = [{
                    key: "dispose",
                    value: function() {
                        this._removeEventListeners()
                    }
                }, {
                    key: "load",
                    value: function() {
                        this.state = "Background/Sound/State/Loading", this._resource = K.a.add({
                            id: "sound-critics",
                            source: "https://theyearofgreta.com/static/content/sounds/sound-background.mp3",
                            loader: $.a,
                            options: {
                                loop: !0,
                                volume: .75
                            }
                        }), this._resource.addEventListener("stateChange", this._resourceStateChangeHandler), this._resource.load()
                    }
                }, {
                    key: "toggle",
                    value: function() {
                        "Background/Sound/State/Playing" === this._state ? this.pause() : this.play()
                    }
                }, {
                    key: "play",
                    value: function() {
                        "Background/Sound/State/Loaded" !== this.state && "Background/Sound/State/Paused" !== this.state || (this.state = "Background/Sound/State/Playing", this._resource.result.play())
                    }
                }, {
                    key: "pause",
                    value: function() {
                        "Background/Sound/State/Loaded" !== this.state && "Background/Sound/State/Playing" !== this.state || (this.state = "Background/Sound/State/Paused", this._resource.result.pause())
                    }
                }, {
                    key: "_mute",
                    value: function() {
                        this._resource.result.fade(.5, 0, 1e3)
                    }
                }, {
                    key: "_unmute",
                    value: function() {
                        this._resource.result.fade(0, .5, 1e3)
                    }
                }, {
                    key: "_setupEventListeners",
                    value: function() {
                        J.addEventListener("change", this._applicationStoreChangeHandler)
                    }
                }, {
                    key: "_removeEventListeners",
                    value: function() {
                        J.removeEventListener("change", this._applicationStoreChangeHandler)
                    }
                }, {
                    key: "state",
                    set: function(e) {
                        this._state !== e && (this._state = e, this.dispatchEvent("stateChange", this._state))
                    },
                    get: function() {
                        return this._state
                    }
                }, {
                    key: "progress",
                    get: function() {
                        return this._resource ? 1 / this._resource.result.duration() * this._resource.result.seek() : 0
                    }
                }]) && te(i.prototype, n), s && te(i, s), t
            }(p.a)),
            re = i(175);
        i(76), i(102);

        function le(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var ue = function() {
                function e(t) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._element = t, this._label = t.textContent, this._characters = []
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "split",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this.clear();
                        var t, i, n = this._label.length;
                        for (t = 0; t < n; t++)(i = document.createElement("span")).textContent = this._label[t], e.class && i.classList.add(e.class), e.nonBreakingSpace && " " === this._label[t] && (i.innerHTML = "&nbsp;"), e.style && (i.style = e.style), this._characters.push(i), this._element.appendChild(i)
                    }
                }, {
                    key: "clear",
                    value: function() {
                        ! function(e) {
                            for (; e.firstChild;) e.removeChild(e.firstChild)
                        }(this._element)
                    }
                }, {
                    key: "revert",
                    value: function() {
                        this.clear(), this._characters = [], this._element.textContent = this._label
                    }
                }, {
                    key: "element",
                    get: function() {
                        return this._element
                    }
                }, {
                    key: "label",
                    get: function() {
                        return this._label
                    }
                }, {
                    key: "characters",
                    get: function() {
                        return this._characters
                    }
                }]) && le(t.prototype, i), n && le(t, n), e
            }(),
            he = a.a.Component.extend({
                ui: {
                    lineLeft: ".js-line-left",
                    lineRight: ".js-line-right",
                    heading: ".js-heading",
                    paragraph: ".js-paragraph"
                },
                onInitialized: function() {
                    this._setupCharacters(), this._setInitialStyles()
                },
                show: function() {
                    var e = d.a.timeline();
                    return e.to(this.ui.lineLeft, {
                        duration: .4,
                        scaleX: 1,
                        ease: "power2.in"
                    }, 0), e.to(this.ui.lineLeft, {
                        duration: .4,
                        alpha: 1,
                        ease: "sine.inOut"
                    }, .1), e.to(this.ui.lineLeft, {
                        duration: .5,
                        x: 0,
                        ease: "power2.out"
                    }, .4), e.to(this.ui.lineRight, {
                        duration: .4,
                        scaleX: 1,
                        ease: "power2.in"
                    }, 0), e.to(this.ui.lineRight, {
                        duration: .4,
                        alpha: 1,
                        ease: "sine.inOut"
                    }, .1), e.to(this.ui.lineRight, {
                        duration: .5,
                        x: 0,
                        ease: "power2.out"
                    }, .4), e.to(this._characters.heading.characters, {
                        duration: .6,
                        scale: 1,
                        ease: "power1.out",
                        stagger: {
                            amount: .2
                        }
                    }, .4), e.to(this._characters.heading.characters, {
                        duration: .4,
                        alpha: 1,
                        ease: "sine.inOut",
                        stagger: {
                            amount: .2
                        }
                    }, .4), e.to(this._characters.paragraph.characters, {
                        duration: .3,
                        alpha: 1,
                        ease: "sine.inOut",
                        stagger: {
                            amount: .2,
                            ease: "sine.in"
                        }
                    }, .5), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.ui.lineLeft, {
                        duration: .3,
                        scaleX: .2,
                        ease: "power2.in"
                    }, 0), e.to(this.ui.lineLeft, {
                        duration: .3,
                        alpha: 0,
                        ease: "sine.out"
                    }, .15), e.to(this.ui.lineRight, {
                        duration: .3,
                        scaleX: .2,
                        ease: "power2.in"
                    }, 0), e.to(this.ui.lineRight, {
                        duration: .3,
                        alpha: 0,
                        ease: "sine.out"
                    }, .15), e.to(this._characters.paragraph.element, {
                        duration: .4,
                        ease: "sine.out",
                        alpha: 0
                    }, .1), e.to(this._characters.heading.element, {
                        duration: .4,
                        ease: "sine.out",
                        alpha: 0
                    }, .2), e
                },
                _setupCharacters: function() {
                    this._characters = {}, this._characters.heading = new ue(this.ui.heading), this._characters.heading.split(), this._characters.paragraph = new ue(this.ui.paragraph), this._characters.paragraph.split()
                },
                _setInitialStyles: function() {
                    this.ui.lineLeft.style.opacity = 0, this.ui.lineLeft.style.transform = "matrix(".concat(.2, ", 0.0, 0.0, 1.0, ").concat(100, ", 0)"), this.ui.lineRight.style.opacity = 0, this.ui.lineRight.style.transform = "matrix(0.0, 0.0, 0.0, 1.0,  ".concat(-100, ", 0)"), d.a.set(this._characters.heading.characters, {
                        scale: .9
                    }), d.a.set(this._characters.heading.characters, {
                        alpha: 0
                    }), d.a.set(this._characters.paragraph.characters, {
                        alpha: 0
                    })
                }
            }),
            ce = i(156),
            de = new(a.a.Model.extend({}))(ce),
            pe = ["month__abbreviation-january", "month__abbreviation-february", "month__abbreviation-march", "month__abbreviation-april", "month__abbreviation-may", "month__abbreviation-june", "month__abbreviation-july", "month__abbreviation-august", "month__abbreviation-september", "month__abbreviation-october", "month__abbreviation-november", "month__abbreviation-december"],
            me = a.a.Component.extend({
                ui: {
                    year: ".js-year",
                    monthContainer: ".js-month-container",
                    currentMonth: ".js-current-month",
                    previousMonth: ".js-previous-month"
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_timelineCompleteHandler")
                },
                onInitialized: function() {
                    this._month = {
                        current: 0
                    }, this._setInitialStyles(), this._setMonthLabel()
                },
                show: function() {
                    var e = d.a.timeline();
                    return e.to(this.ui.year, {
                        duration: .6,
                        autoAlpha: 1,
                        ease: "sine.inOut"
                    }, 0), e.to(this.ui.monthContainer, {
                        duration: .6,
                        autoAlpha: 1,
                        ease: "sine.inOut"
                    }, .2), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .6,
                        autoAlpha: 0,
                        ease: "sine.out"
                    }, 0), e.to(this.el, {
                        duration: .6,
                        y: 50,
                        ease: "power2.inOut"
                    }, 0), e
                },
                setProgress: function(e) {
                    this._setMonth(Math.round(e * (pe.length - 1)))
                },
                _setMonth: function(e) {
                    this._month.current !== e && (this._month.current = e, this._setMonthLabel())
                },
                _setMonthLabel: function() {
                    if (!this._isAnimating) {
                        var e;
                        e = this._month.previous < this._month.current && (11 !== this._month.current || 0 !== this._month.previous) || 11 === this._month.previous && 0 === this._month.current ? -1 : 1, this._month.previous = this._month.current, this._month.visible = this._month.current, this.ui.previousMonth.textContent = this.ui.currentMonth.textContent, this.ui.currentMonth.textContent = de.get(pe[this._month.visible]), this._isAnimating = !0;
                        var t = d.a.timeline({
                            onComplete: this._timelineCompleteHandler
                        });
                        t.fromTo(this.ui.previousMonth, {
                            opacity: 1
                        }, {
                            duration: .4,
                            opacity: 0,
                            ease: "sine.inOut"
                        }, .1), t.fromTo(this.ui.previousMonth, {
                            x: 0
                        }, {
                            duration: .5,
                            x: 40 * e,
                            ease: "power3.in"
                        }, 0), t.fromTo(this.ui.currentMonth, {
                            opacity: 0
                        }, {
                            duration: .4,
                            opacity: 1,
                            ease: "sine.inOut"
                        }, .17), t.fromTo(this.ui.currentMonth, {
                            x: -40 * e
                        }, {
                            duration: .8,
                            x: 0,
                            ease: "power3.out"
                        }, .17)
                    }
                },
                _setInitialStyles: function() {
                    this.ui.year.style.opacity = 0, this.ui.monthContainer.style.opacity = 0
                },
                _timelineCompleteHandler: function() {
                    this._isAnimating = !1, this._month.current !== this._month.visible && this._setMonthLabel()
                }
            }),
            _e = a.a.Component.extend({
                ui: {
                    labelStart: ".js-label-start",
                    slider: ".js-slider",
                    background: ".js-background",
                    highlight: ".js-highlight",
                    labelEnd: ".js-label-end"
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_tickHandler", "_resizeHandler"), this._progress = 0, this._scale = 0
                },
                onInitialized: function() {
                    this._setInitialStyles(), this._setupEventListeners()
                },
                onClose: function() {
                    this._removeEventListeners()
                },
                show: function() {
                    var e = d.a.timeline();
                    return e.to(this.ui.labelStart, {
                        duration: .5,
                        alpha: 1,
                        ease: "sine.in"
                    }, .1), e.to(this.ui.labelStart, {
                        duration: .5,
                        x: 0,
                        ease: "power2.out"
                    }, .1), e.to(this.ui.slider, {
                        duration: .5,
                        alpha: 1,
                        ease: "sine.in"
                    }, 0), e.to(this.ui.slider, {
                        duration: .5,
                        scale: 1,
                        ease: "power2.out"
                    }, 0), e.to(this.ui.labelEnd, {
                        duration: .5,
                        alpha: 1,
                        ease: "sine.in"
                    }, .1), e.to(this.ui.labelEnd, {
                        duration: .5,
                        x: 0,
                        ease: "power2.out"
                    }, .1), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.ui.labelStart, {
                        duration: .5,
                        alpha: 0,
                        ease: "sine.in"
                    }, .1), e.to(this.ui.labelStart, {
                        duration: .5,
                        x: -30,
                        ease: "power2.in"
                    }, .1), e.to(this.ui.slider, {
                        duration: .5,
                        alpha: 0,
                        ease: "sine.in"
                    }, 0), e.to(this.ui.slider, {
                        duration: .5,
                        scale: 1,
                        ease: "power2.in"
                    }, 0), e.to(this.ui.labelEnd, {
                        duration: .5,
                        alpha: 0,
                        ease: "sine.in"
                    }, .1), e.to(this.ui.labelEnd, {
                        duration: .5,
                        x: 30,
                        ease: "power2.in"
                    }, .1), e
                },
                setProgress: function(e) {
                    this._progress !== e && (this._progress = e)
                },
                _setupEventListeners: function() {
                    d.a.ticker.add(this._tickHandler), n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler)
                },
                _setInitialStyles: function() {
                    this.ui.slider.style.transform = "matrix(0.5, 0.0, 0.0, 1.0, 0, 0)", this.ui.slider.style.opacity = 0, this.ui.labelStart.style.transform = "matrix(1.0, 0.0, 0.0, 1.0, -30, 0)", this.ui.labelStart.style.opacity = 0, this.ui.labelEnd.style.transform = "matrix(1.0, 0.0, 0.0, 1.0, 30, 0)", this.ui.labelEnd.style.opacity = 0
                },
                _removeEventListeners: function() {
                    d.a.ticker.remove(this._tickHandler), n.a.removeEventListener("resize", this._resizeHandler), n.a.removeEventListener("resize:complete", this._resizeHandler)
                },
                _setSize: function() {},
                _setPointerPosition: function() {
                    this._scale = Q(this._scale, this._progress, .2);
                    var e = Math.round(1e3 * this._scale) / 1e3;
                    this._prevScale !== e && (this._prevScale = e, this.ui.highlight.style.transform = "matrix(".concat(this._scale, ", 0, 0, 1, 0, 0)"))
                },
                _resizeHandler: function() {
                    this._setPointerPosition()
                },
                _tickHandler: function() {
                    this._setPointerPosition()
                }
            }),
            fe = i(8),
            ve = i(0),
            ge = new k.a({
                size: 4,
                intensity: .2,
                speed: 1,
                opacity: 1,
                scale: 1.2,
                layers: 4,
                layerOffset: 10
            });
        ! function() {
            if (S.a.gui) {
                var e = S.a.gui.addFolder("Intro");
                e.add(ge.state, "size", 0, 25, .01).listen(), e.add(ge.state, "intensity", 0, 5, .01).listen(), e.add(ge.state, "speed", 0, 5, .01).listen(), e.add(ge.state, "opacity", 0, 1, .01).listen(), e.add(ge.state, "scale", 0, 5, .01).listen()
            }
        }();
        var ye = i(114),
            we = i.n(ye),
            be = i(115),
            xe = i.n(be);

        function ke(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var Se = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._uniforms = {
                    uColor: {
                        type: "vec3",
                        value: new ve.Color(13820305)
                    },
                    uOpacity: {
                        type: "float",
                        value: 1
                    },
                    uMask: {
                        type: "sampler2D",
                        value: K.a.get("texture-character").result
                    },
                    uTime: {
                        type: "float",
                        value: 0
                    },
                    uSpeed: {
                        type: "float",
                        value: .5
                    },
                    uSize: {
                        type: "float",
                        value: 1
                    },
                    uOffset: {
                        type: "float",
                        value: 0
                    },
                    uIntensity: {
                        type: "float",
                        value: 1
                    },
                    uScale: {
                        type: "float",
                        value: 1
                    }
                }, this._geometry = new ve.PlaneGeometry(1, 1, 50, 50), this._material = new ve.ShaderMaterial({
                    vertexShader: xe.a,
                    fragmentShader: we.a,
                    uniforms: this._uniforms,
                    transparent: !0,
                    depthTest: !1,
                    depthWrite: !1
                }), this._mesh = new ve.Mesh(this._geometry, this._material), this._clock = new ve.Clock, this._clock.start()
            }
            var t, i, n;
            return t = e, (i = [{
                key: "update",
                value: function() {
                    this.opacity > 0 && (this._uniforms.uTime.value = this._clock.getElapsedTime()), this._mesh.visible = this.opacity > 0
                }
            }, {
                key: "destroy",
                value: function() {
                    this._clock.stop()
                }
            }, {
                key: "mesh",
                get: function() {
                    return this._mesh
                }
            }, {
                key: "offset",
                set: function(e) {
                    this._uniforms.uOffset.value = e
                }
            }, {
                key: "color",
                set: function(e) {
                    this._uniforms.uColor.value = e
                }
            }, {
                key: "opacity",
                get: function() {
                    return this._uniforms.uOpacity.value
                },
                set: function(e) {
                    this._uniforms.uOpacity.value = e
                }
            }, {
                key: "size",
                set: function(e) {
                    this._uniforms.uSize.value = e
                }
            }, {
                key: "speed",
                set: function(e) {
                    this._uniforms.uSpeed.value = e
                }
            }, {
                key: "scale",
                set: function(e) {
                    this._uniforms.uScale.value = e
                }
            }, {
                key: "intensity",
                set: function(e) {
                    this._uniforms.uIntensity.value = e
                }
            }]) && ke(t.prototype, i), n && ke(t, n), e
        }();

        function ze(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var He = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._mesh = new ve.Group, this._setupComponents(), this._setupCharacters()
            }
            var t, i, n;
            return t = e, (i = [{
                key: "update",
                value: function() {
                    this._updateCharacters()
                }
            }, {
                key: "_setupComponents",
                value: function() {
                    this._components = {}
                }
            }, {
                key: "_setupCharacters",
                value: function() {
                    this._components.characters = [];
                    var e, t, i = ge.state.layers;
                    for (e = 0; e < i; e++)(t = new Se).color = new ve.Color(13820305), t.offset = ge.state.layerOffset * e, this._mesh.add(t.mesh), this._components.characters.push(t)
                }
            }, {
                key: "_updateCharacters",
                value: function() {
                    var e, t, i = this._components.characters.length;
                    for (e = 0; e < i; e++)(t = this._components.characters[e]).intensity = ge.state.intensity, t.speed = ge.state.speed, t.size = ge.state.size, t.scale = ge.state.scale, t.opacity = Math.max(0, ge.state.opacity - .2 * e), t.update()
                }
            }, {
                key: "mesh",
                get: function() {
                    return this._mesh
                }
            }, {
                key: "size",
                set: function(e) {
                    this._size = e
                }
            }]) && ze(t.prototype, i), n && ze(t, n), e
        }();

        function Le(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var Ce = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._storeUpdateHandler = this._storeUpdateHandler.bind(this), this._setup(), this._setupEventListeners()
            }
            var t, i, n;
            return t = e, (i = [{
                key: "update",
                value: function() {
                    this._updateMaterial()
                }
            }, {
                key: "_setup",
                value: function() {
                    this._group = new ve.Group
                }
            }, {
                key: "_setupEventListeners",
                value: function() {
                    b.addEventListener("change", this._storeUpdateHandler)
                }
            }, {
                key: "_addGreta",
                value: function() {
                    if (!this._greta) {
                        this._greta = K.a.get("model-experience").result.greta, this._greta.rotation.z = C.state.rotation, this._greta.position.y = -.5;
                        var e = K.a.get("texture-greta-ao").result;
                        e.flipY = !1, this._material = new ve.MeshStandardMaterial({
                            map: e,
                            color: C.state.color,
                            emissive: C.state.emissive,
                            side: ve.FrontSide,
                            transparent: !0
                        }), this._greta.children[0].material = this._material, this._greta.children[1].material = this._material, this._greta.children[2].material = this._material, this._group.add(this._greta)
                    }
                }
            }, {
                key: "_updateRotation",
                value: function() {
                    var e = -1 * C.state.rotation * C.state.progress;
                    this._group.rotation.y = Q(this._group.rotation.y, e, .05)
                }
            }, {
                key: "_updateScale",
                value: function() {
                    var e = 1 + C.state.scale * C.state.progress;
                    this._group.scale.x = Q(this._group.scale.x, e, .05), this._group.scale.y = Q(this._group.scale.x, e, .05), this._group.scale.z = Q(this._group.scale.x, e, .05)
                }
            }, {
                key: "_updatePosition",
                value: function() {
                    var e = -.5 * C.state.progress;
                    this._group.position.y = Q(this._group.position.y, e, .05)
                }
            }, {
                key: "_updateMaterial",
                value: function() {
                    this._material && (this._material.opacity = C.state.opacity, this._material.color = new ve.Color(C.state.color), this._material.emissive = new ve.Color(C.state.emissive), this._material.roughness = C.state.material.roughness, this._material.reflectivity = C.state.material.reflectivity, this._material.metalness = C.state.material.metalness, this._material.envMapIntensity = C.state.material.envMapIntensity, this._material.aoMapIntensity = C.state.material.aoMapIntensity, this._material.emissiveIntensity = C.state.material.emissiveIntensity)
                }
            }, {
                key: "_storeUpdateHandler",
                value: function() {
                    "Preloader/Main/Loaded" === b.state.preloader && this._addGreta()
                }
            }, {
                key: "mesh",
                get: function() {
                    return this._group
                }
            }]) && Le(t.prototype, i), n && Le(t, n), e
        }();

        function Ee(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var Oe = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._storeUpdateHandler = this._storeUpdateHandler.bind(this), this._setup(), this._setupEventListeners()
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "update",
                    value: function() {
                        this._updateRotation(), this._updateMaterial()
                    }
                }, {
                    key: "_setup",
                    value: function() {
                        this._group = new ve.Group
                    }
                }, {
                    key: "_setupEventListeners",
                    value: function() {
                        b.addEventListener("change", this._storeUpdateHandler)
                    }
                }, {
                    key: "_addRock",
                    value: function() {
                        if (!this._rock) {
                            this._rock = K.a.get("model-experience").result.rocks, this._rock.position.y = -.5, this._group.rotation.y = z.state.rotation;
                            var e = K.a.get("texture-rock").result;
                            e.encoding = ve.sRGBEncoding, e.flipY = !1;
                            var t = K.a.get("texture-rock-normals").result;
                            t.flipY = !1, this._material = new ve.MeshStandardMaterial({
                                color: new ve.Color(z.state.color),
                                map: e,
                                normalMap: t,
                                side: ve.FrontSide,
                                transparent: !0
                            }), this._material.roughness = z.state.material.roughness, this._material.reflectivity = z.state.material.reflectivity, this._material.metalness = z.state.material.metalness, this._material.opacity = z.state.opacity, this._rock.material = this._material, this._group.add(this._rock)
                        }
                    }
                }, {
                    key: "_updateRotation",
                    value: function() {
                        this._group.rotation.y = z.state.rotation
                    }
                }, {
                    key: "_updateMaterial",
                    value: function() {
                        this._material && (this._material.color = new ve.Color(z.state.color), this._material.roughness = z.state.material.roughness, this._material.reflectivity = z.state.material.reflectivity, this._material.metalness = z.state.material.metalness, this._material.opacity = z.state.opacity)
                    }
                }, {
                    key: "_storeUpdateHandler",
                    value: function() {
                        "Preloader/Main/Loaded" === b.state.preloader && this._addRock()
                    }
                }, {
                    key: "mesh",
                    get: function() {
                        return this._group
                    }
                }]) && Ee(t.prototype, i), n && Ee(t, n), e
            }(),
            Pe = i(116),
            Me = i.n(Pe),
            Te = i(117),
            Ie = i.n(Te);

        function je(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var De = 2 * Math.PI,
            Ae = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._uniforms = {
                        uTime: {
                            type: "vec2",
                            value: new ve.Vector2
                        },
                        uRange: {
                            type: "vec2",
                            value: new ve.Vector2(.3, .41)
                        },
                        uColor: {
                            type: "vec3",
                            value: new ve.Color("white")
                        },
                        uSize: {
                            type: "float",
                            value: 2
                        },
                        uOpacity: {
                            type: "float",
                            value: 0
                        }
                    }, this._scene = new ve.Scene, this._scene.position.y = -.5, this._particles = new ve.Geometry;
                    var t, i = new ve.ShaderMaterial({
                        vertexShader: Ie.a,
                        fragmentShader: Me.a,
                        uniforms: this._uniforms,
                        transparent: !0
                    });
                    for (t = 0; t < 50; t++) this._particles.vertices.push(new ve.Vector3(Math.random() * De - .5 * De, Math.random() * De - .5 * De, Math.random() * De - .5 * De));
                    this._system = new ve.Points(this._particles, i), this._scene.add(this._system)
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "update",
                    value: function() {
                        this._uniforms.uTime.value.x += .005, this._uniforms.uTime.value.y += .0015, this._uniforms.uOpacity.value = M.state.opacity
                    }
                }, {
                    key: "mesh",
                    get: function() {
                        return this._scene
                    }
                }]) && je(t.prototype, i), n && je(t, n), e
            }(),
            Re = (i(158), i(103), i(105), i(106), i(19)),
            Ue = i.n(Re);

        function Fe(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var Be = new(function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._app = document.getElementById("application")
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "showDefault",
                    value: function() {
                        this._app.classList.remove("cursor-pointer")
                    }
                }, {
                    key: "showPointer",
                    value: function() {
                        this._app.classList.add("cursor-pointer")
                    }
                }]) && Fe(t.prototype, i), n && Fe(t, n), e
            }()),
            Ge = i(118),
            Ve = i.n(Ge),
            We = i(119),
            qe = i.n(We);
        i(162);

        function Ne(e) {
            return (Ne = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function Ye(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function Xe(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function Qe(e, t) {
            return !t || "object" !== Ne(t) && "function" != typeof t ? Ze(e) : t
        }

        function Je(e) {
            return (Je = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function Ze(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function Ke(e, t) {
            return (Ke = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        var $e = new(function(e) {
            function t() {
                var e, i;
                Ye(this, t);
                for (var n = arguments.length, s = new Array(n), a = 0; a < n; a++) s[a] = arguments[a];
                return (i = Qe(this, (e = Je(t)).call.apply(e, [this].concat(s))))._mousedownHandler = i._mousedownHandler.bind(Ze(i)), i._mousemoveHandler = i._mousemoveHandler.bind(Ze(i)), i._mouseupHandler = i._mouseupHandler.bind(Ze(i)), i._posDown = {
                    x: 0,
                    y: 0
                }, i._posMove = {
                    x: 0,
                    y: 0
                }, i._posUp = {
                    x: 0,
                    y: 0
                }, i.raycaster = new ve.Raycaster, i._setupEventListeners(), i
            }
            var i, s, a;
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Ke(e, t)
            }(t, e), i = t, (s = [{
                key: "_setupEventListeners",
                value: function() {
                    window.addEventListener("mousedown", this._mousedownHandler), window.addEventListener("mousemove", this._mousemoveHandler), window.addEventListener("mouseup", this._mouseupHandler), window.addEventListener("touchstart", this._mousedownHandler), window.addEventListener("touchmove", this._mousemoveHandler), window.addEventListener("touchend", this._mouseupHandler)
                }
            }, {
                key: "_getCoords",
                value: function(e, t) {
                    return {
                        x: e / n.a.viewportWidth * 2 - 1,
                        y: t / n.a.viewportHeight * -1 * 2 + 1
                    }
                }
            }, {
                key: "_getDist",
                value: function(e, t) {
                    var i = t.x - e.x,
                        n = t.y - e.y;
                    return Math.sqrt(i * i + n * n)
                }
            }, {
                key: "_mousedownHandler",
                value: function(e) {
                    this._posDown.x = e.changedTouches && e.changedTouches[0].clientX || e.clientX, this._posDown.y = e.changedTouches && e.changedTouches[0].clientY || e.clientY;
                    var t = this._getCoords(this._posDown.x, this._posDown.y);
                    fe.a.camera && this.raycaster.setFromCamera(t, fe.a.camera), this.dispatchEvent("down", t), this._isDown = !0, this._isDragging = !1
                }
            }, {
                key: "_mousemoveHandler",
                value: function(e) {
                    this._posMove.x = e.changedTouches && e.changedTouches[0].clientX || e.clientX, this._posMove.y = e.changedTouches && e.changedTouches[0].clientY || e.clientY;
                    var t = this._getCoords(this._posMove.x, this._posMove.y);
                    fe.a.camera && this.raycaster.setFromCamera(t, fe.a.camera), this.dispatchEvent("move", t), this._isDown && (this._isDragging = !0)
                }
            }, {
                key: "_mouseupHandler",
                value: function(e) {
                    this._posUp.x = e.changedTouches && e.changedTouches[0].clientX || e.clientX, this._posUp.y = e.changedTouches && e.changedTouches[0].clientY || e.clientY;
                    var t = this._getCoords(this._posUp.x, this._posUp.y);
                    this.dispatchEvent("up", t), this._isDown && this._getDist(this._posDown, this._posUp) < 2 && this.dispatchEvent("click", t), this._isDown = !1, this._isDragging = !1
                }
            }]) && Xe(i.prototype, s), a && Xe(i, a), t
        }(p.a));

        function et(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var tt = new ve.PlaneGeometry(1, 1, 40, 40),
            it = new ve.PlaneGeometry(1, 1, 1, 1),
            nt = function() {
                function e(t) {
                    var i, n, s, a = this,
                        o = t.model;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), s = function() {
                        a._textMaterial.opacity = a._tweenObj.opacity
                    }, (n = "_updateButton") in (i = this) ? Object.defineProperty(i, n, {
                        value: s,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : i[n] = s, this._model = o, this._clock = new ve.Clock, this._tweenObj = {
                        opacity: 0,
                        hoverProgress: 0,
                        hoverMultiplier: 0
                    }, this._group = new ve.Group, this._group.name = "tile", this._group.model = this._model, this._addImage(), this._addText(), this._setupEventListeners(), this._updateButton()
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "update",
                    value: function(e) {
                        this._progress = E.state.progress;
                        var t = this._clock.getElapsedTime(),
                            i = h.length - 1,
                            n = 1 / i,
                            s = this._index / i,
                            a = s - E.state.progress,
                            o = E.state.radius + 5 * a;
                        this._direction = -1 * Math.sign(e), this._intensity = Math.abs(e), this._group.scale.x = E.state.scale, this._group.scale.y = E.state.scale, this._group.position.x = Math.cos(this._angle) * o, this._group.position.y = -1 * this._index * E.state.yDistance, this._group.position.z = Math.sin(this._angle) * o, this._group.rotation.z = ve.Math.degToRad(-170 * Math.abs(a)), this._group.rotation.y = -1 * this._angle - .5 * Math.PI + Math.PI, this._opacity = (1 - Math.abs(8 * a)) * E.state.opacityMultiplier, this._uniforms && (this._uniforms.uOffsetNoise.value = [t, t]), this._uniforms && (this._uniforms.uHoverProgress.value = this._tweenObj.hoverProgress), this._uniforms && (this._uniforms.uIntensity.value = Math.min(1, this._intensity)), this._uniforms && (this._uniforms.uDirection.value = this._direction), this._uniforms && (this._uniforms.uOpacity.value = this._opacity);
                        var r = n / 4,
                            l = this._progress > s - r && this._progress < s + r;
                        this._checkIsActive(l);
                        var u = n / 2;
                        this._isInteractive = this._progress > s - u && this._progress < s + u, this._checkIsHover()
                    }
                }, {
                    key: "_setupEventListeners",
                    value: function() {
                        var e = this;
                        $e.addEventListener("click", (function() {
                            if (e._image && e._isInteractive && !J.state.isOverlayActive && $e.raycaster.intersectObject(e._image, !1)[0]) {
                                var t = e._model.get("id");
                                c.a.trackClick({
                                    category: "Explore",
                                    action: "Navigate",
                                    label: 'Tile "'.concat(t, '"')
                                }), a.a.history.loadUrl("explore/detail/".concat(t), {
                                    trigger: !0
                                })
                            }
                        }))
                    }
                }, {
                    key: "_checkIsActive",
                    value: function(e) {
                        e ? this._showButton() : this._hideButton()
                    }
                }, {
                    key: "_checkIsHover",
                    value: function() {
                        this._image && this._isInteractive && !J.state.isOverlayActive && $e.raycaster.intersectObject(this._image, !1)[0] ? this._mouseenterTitle() : this._mouseleaveTitle()
                    }
                }, {
                    key: "_mouseenterTitle",
                    value: function() {
                        this._isHover || (this._isHover = !0, Be.showPointer(), this._tweenMouseenter && this._tweenMouseenter.kill(), this._tweenMouseenter = d.a.to(this._tweenObj, {
                            duration: 1,
                            hoverProgress: 1,
                            ease: "power1.out"
                        }))
                    }
                }, {
                    key: "_mouseleaveTitle",
                    value: function() {
                        this._isHover && (this._isHover = !1, Be.showDefault(), this._tweenMouseenter && this._tweenMouseenter.kill(), this._tweenMouseenter = d.a.to(this._tweenObj, {
                            duration: .8,
                            hoverProgress: 0,
                            ease: "power1.out"
                        }))
                    }
                }, {
                    key: "_showButton",
                    value: function() {
                        this._isButtonVisible || (this._isButtonVisible = !0, d.a.to(this._tweenObj, {
                            duration: 1,
                            opacity: 1,
                            ease: "power1.none",
                            onUpdate: this._updateButton
                        }))
                    }
                }, {
                    key: "_hideButton",
                    value: function() {
                        this._isButtonVisible && (this._isButtonVisible = !1, d.a.to(this._tweenObj, {
                            duration: 1,
                            opacity: 0,
                            ease: "power1.none",
                            onUpdate: this._updateButton
                        }))
                    }
                }, {
                    key: "_addText",
                    value: function() {
                        var e = this._model.get("text");
                        if (e) {
                            var t = 700 * this._tileAspectRatio,
                                i = document.createElement("canvas");
                            i.width = 700, i.height = t;
                            var n = i.getContext("2d");
                            n.fillStyle = "white", Ue.a.font = "US Blaak", Ue.a.textSize = 34, Ue.a.lineHeight = 42, Ue.a.align = "left", Ue.a.drawText(n, e, 10, 20, 680, t), n.beginPath(), n.strokeStyle = "white", n.lineWidth = 3, n.arc(350, .5 * t, 25, 0, 2 * Math.PI), n.stroke(), n.closePath(), n.fillStyle = "white", n.beginPath(), n.moveTo(347, .5 * (t - 18) + 0), n.lineTo(357, .5 * t + 0), n.lineTo(347, .5 * (t + 18) + 0), n.fill(), n.closePath();
                            var s = new ve.CanvasTexture(i);
                            s.minFilter = ve.LinearFilter, s.magFilter = ve.LinearFilter, s.generateMipmaps = !1, this._textMaterial = new ve.MeshBasicMaterial({
                                transparent: !0,
                                side: ve.FrontSide
                            }), this._textMaterial.map = s;
                            var a = new ve.Mesh(it, this._textMaterial);
                            a.scale.x = 1.2, a.scale.y = t / 700 * 1.2, a.position.z += .11, this._group.add(a)
                        }
                    }
                }, {
                    key: "_addImage",
                    value: function() {
                        var e = K.a.getResult(this._model.get("video").poster);
                        e.minFilter = ve.LinearFilter, e.magFilter = ve.LinearFilter;
                        var t = this._model.get("video").dimensions.width,
                            i = this._model.get("video").dimensions.height;
                        this._tileAspectRatio = i / t, this._uniforms = {
                            uTexture: {
                                type: "sampler2D",
                                value: e
                            },
                            uOpacity: {
                                type: "float",
                                value: 1
                            },
                            uHoverProgress: {
                                type: "float",
                                value: 0
                            },
                            uDirection: {
                                type: "f",
                                value: 0
                            },
                            uIntensity: {
                                type: "f",
                                value: 0
                            },
                            uLimitCurve: {
                                type: "f",
                                value: .05
                            },
                            uLimitShear: {
                                type: "f",
                                value: .25
                            },
                            uColorBlend: {
                                type: "f",
                                value: 0
                            },
                            uHoverMultiplier: {
                                type: "f",
                                value: 0
                            },
                            uOffsetNoise: {
                                type: "vec2",
                                value: [0, 1]
                            },
                            uColor: new ve.Uniform(new ve.Color(2965556))
                        };
                        var n = new ve.ShaderMaterial({
                            vertexShader: qe.a,
                            fragmentShader: Ve.a,
                            uniforms: this._uniforms,
                            side: ve.DoubleSide,
                            transparent: !0,
                            wireframe: !1
                        });
                        this._image = new ve.Mesh(tt, n), this._image.scale.y = this._tileAspectRatio, this._group.name = "tile", this._group.model = this._model, this._group.add(this._image)
                    }
                }, {
                    key: "index",
                    set: function(e) {
                        this._index = e
                    }
                }, {
                    key: "angle",
                    set: function(e) {
                        this._angle = e
                    }
                }, {
                    key: "mesh",
                    get: function() {
                        return this._group
                    }
                }]) && et(t.prototype, i), n && et(t, n), e
            }(),
            st = i(120),
            at = i.n(st),
            ot = i(121),
            rt = i.n(ot);

        function lt(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var ut = new ve.PlaneGeometry(1, 1, 40, 40),
            ht = new ve.PlaneGeometry(1, 1, 1, 1),
            ct = function() {
                function e(t) {
                    var i = t.model;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._updateText = this._updateText.bind(this), this._updateHover = this._updateHover.bind(this), this._model = i, this._clock = new ve.Clock, this._tweenObj = {
                        opacity: 0,
                        hoverProgress: 0,
                        hoverMultiplier: 0
                    }, this._group = new ve.Group, this._group.name = "tile", this._group.model = this._model, this._addImage(), this._addText(), this._setupEventListeners()
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "update",
                    value: function(e) {
                        this._progress = E.state.progress;
                        var t = this._clock.getElapsedTime(),
                            i = h.length - 1,
                            n = 1 / i,
                            s = this._index / i,
                            a = s - E.state.progress,
                            o = E.state.radius + 5 * a;
                        this._direction = -1 * Math.sign(e), this._intensity = Math.abs(e), this._group.scale.x = E.state.scale, this._group.scale.y = E.state.scale, this._group.position.x = Math.cos(this._angle) * o, this._group.position.y = -1 * this._index * E.state.yDistance, this._group.position.z = Math.sin(this._angle) * o, this._group.rotation.z = ve.Math.degToRad(-170 * Math.abs(a)), this._group.rotation.y = -1 * this._angle - .5 * Math.PI + Math.PI, this._opacity = (1 - Math.abs(8 * a)) * E.state.opacityMultiplier, this._uniforms && (this._uniforms.uOffsetNoise.value = [t, t]), this._uniforms && (this._uniforms.uHoverProgress.value = this._tweenObj.hoverProgress), this._uniforms && (this._uniforms.uIntensity.value = Math.min(1, this._intensity)), this._uniforms && (this._uniforms.uDirection.value = this._direction), this._uniforms && (this._uniforms.uOpacity.value = this._opacity);
                        var r = n / 4,
                            l = this._progress > s - r && this._progress < s + r;
                        this._checkIsActive(l);
                        var u = n / 2;
                        this._isInteractive = this._progress > s - u && this._progress < s + u, this._checkIsHover()
                    }
                }, {
                    key: "_setupEventListeners",
                    value: function() {
                        var e = this;
                        $e.addEventListener("click", (function() {
                            if (e._image && e._isInteractive && !J.state.isOverlayActive && $e.raycaster.intersectObject(e._image, !1)[0]) {
                                var t = e._model.get("id"),
                                    i = e._model.get("link");
                                c.a.trackClick({
                                    category: "Explore",
                                    action: "Navigate",
                                    label: 'Tile "'.concat(t, '"')
                                }), window.open(i)
                            }
                        }))
                    }
                }, {
                    key: "_checkIsActive",
                    value: function(e) {
                        e ? this._showTitle() : this._hideTitle()
                    }
                }, {
                    key: "_checkIsHover",
                    value: function() {
                        this._image && this._isInteractive && !J.state.isOverlayActive && $e.raycaster.intersectObject(this._image, !1)[0] ? this._mouseenterTitle() : this._mouseleaveTitle()
                    }
                }, {
                    key: "_mouseenterTitle",
                    value: function() {
                        this._isHover || (this._isHover = !0, Be.showPointer(), this._tweenMouseenter && this._tweenMouseenter.kill(), this._tweenMouseenter = d.a.to(this._tweenObj, {
                            duration: 1,
                            hoverProgress: 1,
                            ease: "power1.out"
                        }))
                    }
                }, {
                    key: "_mouseleaveTitle",
                    value: function() {
                        this._isHover && (this._isHover = !1, Be.showDefault(), this._tweenMouseenter && this._tweenMouseenter.kill(), this._tweenMouseenter = d.a.to(this._tweenObj, {
                            duration: .8,
                            hoverProgress: 0,
                            ease: "power1.out"
                        }))
                    }
                }, {
                    key: "_showTitle",
                    value: function() {
                        this._isTitleVisible || (this._isTitleVisible = !0, d.a.to(this._tweenObj, {
                            duration: 1,
                            opacity: 1,
                            ease: "power1.none",
                            onUpdate: this._updateText
                        }))
                    }
                }, {
                    key: "_hideTitle",
                    value: function() {
                        this._isTitleVisible && (this._isTitleVisible = !1, d.a.to(this._tweenObj, {
                            duration: 1,
                            opacity: 0,
                            ease: "power1.none",
                            onUpdate: this._updateText
                        }))
                    }
                }, {
                    key: "_addText",
                    value: function() {
                        var e = this._model.get("text");
                        if (e) {
                            var t = 700 * this._tileAspectRatio,
                                i = document.createElement("canvas");
                            i.width = 700, i.height = t;
                            var n = i.getContext("2d");
                            n.fillStyle = "white", Ue.a.font = "US Blaak", Ue.a.textSize = 28, Ue.a.lineHeight = 36, Ue.a.align = "left", Ue.a.drawText(n, e, 10, 20, 680, t);
                            var s = 350,
                                a = .5 * t;
                            n.beginPath(), n.strokeStyle = "white", n.lineWidth = 3, n.arc(s, a, 25, 0, 2 * Math.PI), n.stroke(), n.closePath(), n.fillStyle = "white", n.beginPath(), n.lineWidth = 3, n.moveTo(341, a + 5 + -1), n.lineTo(350, a - 5 - 1), n.lineTo(359, a + 5 + -1), n.stroke(), n.closePath();
                            var o = new ve.CanvasTexture(i);
                            o.minFilter = ve.LinearFilter, o.magFilter = ve.LinearFilter, o.generateMipmaps = !1, this._textMaterial = new ve.MeshBasicMaterial({
                                transparent: !0,
                                side: ve.FontSide
                            }), this._textMaterial.map = o, this._textMaterial.opacity = this._tweenObj.opacity;
                            var r = new ve.Mesh(ht, this._textMaterial);
                            r.scale.x = 1.2, r.scale.y = t / 700 * 1.2, r.position.z += .11, this._group.add(r)
                        }
                    }
                }, {
                    key: "_updateText",
                    value: function() {
                        this._textMaterial.opacity = this._tweenObj.opacity + .001
                    }
                }, {
                    key: "_updateHover",
                    value: function() {
                        this._uniforms && (this._uniforms.uOpacityHover.value = this._tweenObj.opacityHover)
                    }
                }, {
                    key: "_addImage",
                    value: function() {
                        var e = K.a.getResult(this._model.get("image").src);
                        e.minFilter = ve.LinearFilter, e.magFilter = ve.LinearFilter;
                        var t = this._model.get("image").dimensions.width,
                            i = this._model.get("image").dimensions.height;
                        this._tileAspectRatio = i / t, this._uniforms = {
                            uTexture: {
                                type: "sampler2D",
                                value: e
                            },
                            uOpacity: {
                                type: "float",
                                value: 1
                            },
                            uOpacityHover: {
                                type: "float",
                                value: 0
                            },
                            uHoverProgress: {
                                type: "float",
                                value: 0
                            },
                            uDirection: {
                                type: "f",
                                value: 0
                            },
                            uIntensity: {
                                type: "f",
                                value: 0
                            },
                            uLimitCurve: {
                                type: "f",
                                value: .05
                            },
                            uLimitShear: {
                                type: "f",
                                value: .25
                            },
                            uColorBlend: {
                                type: "f",
                                value: .6
                            },
                            uOffsetNoise: {
                                type: "vec2",
                                value: [0, 1]
                            },
                            uColor: new ve.Uniform(new ve.Color(2965556))
                        };
                        var n = new ve.ShaderMaterial({
                            vertexShader: rt.a,
                            fragmentShader: at.a,
                            uniforms: this._uniforms,
                            side: ve.DoubleSide,
                            transparent: !0,
                            wireframe: !1
                        });
                        this._image = new ve.Mesh(ut, n), this._image.scale.y = this._tileAspectRatio, this._group.name = "tile", this._group.model = this._model, this._group.add(this._image)
                    }
                }, {
                    key: "index",
                    set: function(e) {
                        this._index = e
                    }
                }, {
                    key: "angle",
                    set: function(e) {
                        this._angle = e
                    }
                }, {
                    key: "mesh",
                    get: function() {
                        return this._group
                    }
                }]) && lt(t.prototype, i), n && lt(t, n), e
            }();

        function dt(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var pt = -.5 * Math.PI,
            mt = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._storeUpdateHandler = this._storeUpdateHandler.bind(this), this._setup(), this._setupEventListeners()
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "_setup",
                    value: function() {
                        this._group = new ve.Group, this._group.rotation.y = pt + E.state.yOffset, this._group.position.z = -1.2, this._group.visible = !1, this._progress = 0, this._active = null, this._offset = 0, this._components = {
                            tiles: []
                        }
                    }
                }, {
                    key: "_setupEventListeners",
                    value: function() {
                        b.addEventListener("change", this._storeUpdateHandler)
                    }
                }, {
                    key: "update",
                    value: function() {
                        E.state.opacityMultiplier > 0 ? (this._group.visible = !0, this._setProgress(), this._setIntensity(), this._updatePosition(), this._updateRotation(), this._updateTiles()) : this._group.visible = !1
                    }
                }, {
                    key: "_setupTileVideoComponents",
                    value: function() {
                        if (!this._components.tiles.length) {
                            var e, t, i = h.models.length;
                            for (e = 0; e < i; e++) t = h.models[e], this._createTile(t, e)
                        }
                    }
                }, {
                    key: "_createTile",
                    value: function(e, t) {
                        var i, n, s = (t % (i = 3.5) + i) % i;
                        "link" === e.get("type") ? n = new ct({
                            model: e
                        }) : "video" === e.get("type") && (n = new nt({
                            model: e
                        }));
                        var a = 1 / 3.5 * s * Math.PI * -2;
                        n.index = t, n.angle = a, this._components.tiles.push(n), this._group.add(n.mesh)
                    }
                }, {
                    key: "_setProgress",
                    value: function() {
                        this._progress = E.state.progress
                    }
                }, {
                    key: "_setIntensity",
                    value: function() {
                        var e = this._group.rotation.y - this._prevRotation;
                        this._offset = e * E.state.skewStrength, this._prevRotation = this._group.rotation.y
                    }
                }, {
                    key: "_updatePosition",
                    value: function() {
                        var e = this._progress + E.state.introOffset / 1e3,
                            t = h.models.length;
                        this._group.position.y = e * E.state.yDistance * (t - 1) + E.state.yOffset
                    }
                }, {
                    key: "_updateRotation",
                    value: function() {
                        var e = this._progress + E.state.introOffset / 1e3,
                            t = (h.models.length - 1) / 3.5;
                        this._group.rotation.y = pt + -2 * e * Math.PI * t
                    }
                }, {
                    key: "_updateTiles",
                    value: function() {
                        var e, t = this._components.tiles.length;
                        for (e = 0; e < t; e++) this._components.tiles[e].update(this._offset)
                    }
                }, {
                    key: "_storeUpdateHandler",
                    value: function() {
                        "Preloader/Main/Loaded" === b.state.preloader && this._setupTileVideoComponents()
                    }
                }, {
                    key: "mesh",
                    get: function() {
                        return this._group
                    }
                }]) && dt(t.prototype, i), n && dt(t, n), e
            }(),
            _t = i(122),
            ft = i.n(_t),
            vt = i(123),
            gt = i.n(vt);

        function yt(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var wt = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._mesh = new ve.Mesh(new ve.SphereGeometry(10, 10, 10), new ve.ShaderMaterial({
                        vertexShader: ft.a,
                        fragmentShader: gt.a,
                        uniforms: {
                            uOpacity: {
                                type: "float",
                                value: O.state.color.opacity
                            },
                            uColorBackground: {
                                type: "vec3",
                                value: new ve.Color(O.state.color.background)
                            },
                            uColorHighlight: {
                                type: "vec3",
                                value: new ve.Color(O.state.color.highlight)
                            },
                            uSize: {
                                type: "vec2",
                                value: new ve.Vector2(O.state.size.x, O.state.size.y)
                            },
                            uIntensity: {
                                type: "float",
                                value: O.state.intensity
                            }
                        },
                        depthTest: !1,
                        depthWrite: !1,
                        side: ve.BackSide
                    })), this._sizeVector = new ve.Vector2(0, 0), this._setRotation(), this._setScale(), this._setColors(), this._setIntensity(), this._setSize(), this._setOpacity()
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "update",
                    value: function() {
                        this._setRotation(), this._setScale(), this._setColors(), this._setIntensity(), this._setSize(), this._setOpacity()
                    }
                }, {
                    key: "_setRotation",
                    value: function() {
                        this._mesh.rotation.x = O.state.rotation.x, this._mesh.rotation.y = O.state.rotation.y, this._mesh.rotation.z = O.state.rotation.z
                    }
                }, {
                    key: "_setScale",
                    value: function() {
                        this._mesh.scale.x = O.state.scale, this._mesh.scale.y = O.state.scale, this._mesh.scale.z = O.state.scale
                    }
                }, {
                    key: "_setColors",
                    value: function() {
                        this._prevColorBackground !== O.state.color.background && (this._mesh.material.uniforms.uColorBackground.value = new ve.Color(O.state.color.background), this._prevColorBackground = O.state.color.background), this._prevColorHighlight !== O.state.color.highlight && (this._mesh.material.uniforms.uColorHighlight.value = new ve.Color(O.state.color.highlight), this._prevColorHighlight = O.state.color.highlight)
                    }
                }, {
                    key: "_setIntensity",
                    value: function() {
                        this._mesh.material.uniforms.uIntensity.value = O.state.intensity
                    }
                }, {
                    key: "_setSize",
                    value: function() {
                        this._sizeVector.x = O.state.size.x, this._sizeVector.y = O.state.size.y, this._mesh.material.uniforms.uSize.value = this._sizeVector
                    }
                }, {
                    key: "_setOpacity",
                    value: function() {
                        this._mesh.material.uniforms.uOpacity.value = O.state.opacity
                    }
                }, {
                    key: "mesh",
                    get: function() {
                        return this._mesh
                    }
                }]) && yt(t.prototype, i), n && yt(t, n), e
            }(),
            bt = i(124),
            xt = i.n(bt),
            kt = i(125),
            St = i.n(kt);

        function zt(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var Ht = function() {
                function e() {
                    var t, i, n, s = this;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), n = function(e) {
                        "Preloader/Main/Loaded" === e.preloader && s._setup()
                    }, (i = "_storeUpdateHandler") in (t = this) ? Object.defineProperty(t, i, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[i] = n, this._group = new ve.Group, this._setupEventListeners()
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "update",
                    value: function() {
                        this._mesh && (this._setScale(), this._setColor(), this._setOpacity(), this._setPosition(), this._setReveal(), this._setTime(), this._setDirection())
                    }
                }, {
                    key: "_setupEventListeners",
                    value: function() {
                        b.addEventListener("change", this._storeUpdateHandler)
                    }
                }, {
                    key: "_setup",
                    value: function() {
                        if (!this._mesh) {
                            var e = K.a.get("texture-landing-heading").result;
                            e.minFilter = ve.LinearFilter, e.magFilter = ve.LinearFilter, this._clock = new ve.Clock, this._mesh = new ve.Mesh(new ve.PlaneGeometry(1, 1, 10, 10), new ve.ShaderMaterial({
                                vertexShader: St.a,
                                fragmentShader: xt.a,
                                side: ve.DoubleSide,
                                transparent: !0,
                                wireframe: !1,
                                depthTest: !1,
                                depthWrite: !1,
                                uniforms: {
                                    uTexture: {
                                        type: "sampler2D",
                                        value: e
                                    },
                                    uColor: {
                                        type: "vec3",
                                        value: new ve.Color(P.state.color)
                                    },
                                    uOpacity: {
                                        type: "float",
                                        value: P.state.opacity
                                    },
                                    uReveal: {
                                        type: "float",
                                        value: P.state.reveal
                                    },
                                    uDirection: {
                                        type: "float",
                                        value: P.state.direction
                                    },
                                    uTime: {
                                        type: "float",
                                        value: 0
                                    }
                                }
                            })), this._setScale(), this._setColor(), this._setOpacity(), this._setPosition(), this._setReveal(), this._setTime(), this._setDirection(), this._group.add(this._mesh)
                        }
                    }
                }, {
                    key: "_setScale",
                    value: function() {
                        this._mesh.scale.x = P.state.scale, this._mesh.scale.y = P.state.scale * (400 / 1150)
                    }
                }, {
                    key: "_setPosition",
                    value: function() {
                        this._mesh.position.x = P.state.position.x, this._mesh.position.y = P.state.position.y, this._mesh.position.z = P.state.position.z
                    }
                }, {
                    key: "_setColor",
                    value: function() {
                        this._mesh.material.uniforms.uColor.value = new ve.Color(P.state.color)
                    }
                }, {
                    key: "_setOpacity",
                    value: function() {
                        this._mesh.material.uniforms.uOpacity.value = P.state.opacity
                    }
                }, {
                    key: "_setReveal",
                    value: function() {
                        this._mesh.material.uniforms.uReveal.value = P.state.reveal
                    }
                }, {
                    key: "_setTime",
                    value: function() {
                        this._mesh.material.uniforms.uTime.value = this._clock.getElapsedTime()
                    }
                }, {
                    key: "_setDirection",
                    value: function() {
                        this._mesh.material.uniforms.uDirection.value = P.state.direction
                    }
                }, {
                    key: "mesh",
                    get: function() {
                        return this._group
                    }
                }]) && zt(t.prototype, i), n && zt(t, n), e
            }(),
            Lt = i(126);

        function Ct(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var Et = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._storeUpdateHandler = this._storeUpdateHandler.bind(this), this._group = new ve.Group, this._setupEventListeners()
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "update",
                    value: function() {
                        this._fog && (this._fog.rotation.y -= 1e-4)
                    }
                }, {
                    key: "_setupEventListeners",
                    value: function() {
                        b.addEventListener("change", this._storeUpdateHandler)
                    }
                }, {
                    key: "_addFog",
                    value: function() {
                        if (!this._fog) {
                            var e = (new ve.BufferGeometry).fromGeometry(new ve.PlaneGeometry(2, 2, 1, 1)),
                                t = K.a.getResult("fog-particle"),
                                i = new ve.MeshBasicMaterial({
                                    color: 2965556,
                                    transparent: !0,
                                    opacity: .2,
                                    side: ve.DoubleSide
                                });
                            i.alphaMap = t, i.depthTest = !1, this._fog = new ve.Group, this._fog.position.y = -1;
                            for (var n = [], s = 0; s < 70; s++) {
                                var a = e.clone(),
                                    o = ve.Math.degToRad(360 / 70 * s + 20 * Math.random()),
                                    r = 2 + 3 * Math.random(),
                                    l = Math.cos(o) * r,
                                    u = ve.Math.randFloatSpread(1),
                                    h = Math.sin(o) * r;
                                a.rotateY(-o + .5 * Math.PI), a.applyMatrix((new ve.Matrix4).makeTranslation(l, u, h)), n.push(a)
                            }
                            var c = Lt.a.mergeBufferGeometries(n),
                                d = new ve.Mesh(c, i);
                            this._fog.add(d), this._group.add(this._fog)
                        }
                    }
                }, {
                    key: "_storeUpdateHandler",
                    value: function() {
                        "Preloader/Main/Loaded" === b.state.preloader && this._addFog()
                    }
                }, {
                    key: "mesh",
                    get: function() {
                        return this._group
                    }
                }]) && Ct(t.prototype, i), n && Ct(t, n), e
            }(),
            Ot = i(20),
            Pt = i(171);

        function Mt(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var Tt = new(function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            var t, i, n;
            return t = e, (i = [{
                key: "setup",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._renderer = new ve.WebGLRenderer(e), this._renderer.outputEncoding = ve.sRGBEncoding, this._renderer.setClearColor(2965556, 1);
                    var t = 2;
                    this._renderer.setPixelRatio(t), this._renderer.debug.checkShaderErrors = Pt.a.isLocal(), this._clock = new ve.Clock, this._clock.start()
                }
            }, {
                key: "_loadSMAA",
                value: function() {
                    var e = this;
                    this._areaImage = new Image, this._areaImage.addEventListener("load", (function() {
                        e._areaImageLoaded = !0, e._createComposer()
                    })), this._areaImage.src = Ot.e.areaImageDataURL, this._searchImage = new Image, this._searchImage.addEventListener("load", (function() {
                        e._searchImageLoaded = !0, e._createComposer()
                    })), this._searchImage.src = Ot.e.searchImageDataURL
                }
            }, {
                key: "_createComposer",
                value: function() {
                    this._areaImageLoaded && this._searchImageLoaded && (this._composer = new Ot.b(this._renderer), this._composer.inputBuffer.texture.encoding = ve.sRGBEncoding, this._composer.outputBuffer.texture.encoding = ve.sRGBEncoding, this._smaa = new Ot.e(this._searchImage, this._areaImage), this._vignette = new Ot.g({
                        offset: .1,
                        darkness: .5
                    }), this._bloom = new Ot.f(jt.scene, fe.a.camera, {
                        blendFunction: Ot.a.SCREEN,
                        luminanceThreshold: .8,
                        luminanceSmoothing: .15
                    }), this._bloom.ignoreBackground = !0, this._renderPass = new Ot.d(jt.scene, fe.a.camera), this._bloomPass = new Ot.c(fe.a.camera, this._bloom), this._effectPass = new Ot.c(fe.a.camera, this._smaa, this._vignette), this._effectPass.renderToScreen = !0, this._composer.addPass(this._renderPass), this._composer.addPass(this._bloomPass), this._composer.addPass(this._effectPass))
                }
            }, {
                key: "update",
                value: function() {}
            }, {
                key: "render",
                value: function() {
                    this._renderer.render(jt.scene, fe.a.camera)
                }
            }, {
                key: "size",
                set: function(e) {
                    this._renderer.setSize(e.width, e.height), this._composer && this._composer.setSize(e.width, e.height)
                }
            }, {
                key: "renderer",
                get: function() {
                    return this._renderer
                }
            }]) && Mt(t.prototype, i), n && Mt(t, n), e
        }());

        function It(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var jt = new(function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._storeUpdateHandler = this._storeUpdateHandler.bind(this), this._scene = new ve.Scene, this._scene.fog = new ve.Fog(2965556, .01, 8), this._world = new ve.Group, this._world.rotation.x = x.a.state.rotation.x, this._world.rotation.y = x.a.state.rotation.y, this._world.rotation.z = x.a.state.rotation.z, this._interaction = {}, this._interaction.x = x.a.state.interaction.x, this._interaction.y = x.a.state.interaction.y, this._components = {}
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "setup",
                    value: function() {
                        this._components.intro = new He, this._components.greta = new Ce, this._components.rock = new Oe, this._components.particles = new Ae, this._components.tiles = new mt, this._components.background = new wt, this._components.text = new Ht, this._components.fog = new Et, this._world.add(this._components.greta.mesh), this._world.add(this._components.rock.mesh), this._world.add(this._components.particles.mesh), this._scene.add(this._components.text.mesh), this._scene.add(this._components.tiles.mesh), this._scene.add(this._world), this._scene.add(this._components.intro.mesh), this._world.add(this._components.background.mesh), this._world.add(this._components.fog.mesh), this._setupEventListeners()
                    }
                }, {
                    key: "_setupEventListeners",
                    value: function() {
                        b.addEventListener("change", this._storeUpdateHandler)
                    }
                }, {
                    key: "_addEnvMap",
                    value: function() {
                        if (!this._isEnvMapAdded) {
                            this._isEnvMapAdded = !0;
                            var e = new ve.PMREMGenerator(Tt.renderer);
                            e.compileEquirectangularShader();
                            var t = K.a.get("texture-enviroment").result,
                                i = e.fromEquirectangular(t).texture;
                            this._scene.environment = i, e.dispose()
                        }
                    }
                }, {
                    key: "update",
                    value: function() {
                        this._interaction.x = Q(this._interaction.x, x.a.state.interaction.x, .05), this._interaction.y = Q(this._interaction.y, x.a.state.interaction.y, .05), this._components.intro.mesh.position.x = fe.a.camera.position.x, this._components.intro.mesh.position.y = fe.a.camera.position.y, this._components.intro.mesh.position.z = fe.a.camera.position.z - 5, this._components.intro.mesh.rotation.x = fe.a.camera.rotation.x, this._components.intro.mesh.rotation.y = fe.a.camera.rotation.y, this._components.intro.mesh.rotation.z = fe.a.camera.rotation.z, this._components.intro.mesh.visible = !1, this._components.greta.mesh.visible = !1, this._components.rock.mesh.visible = !1, this._components.particles.mesh.visible = !1, this._components.text.mesh.visible = !1, "Background/Scene/Intro" === b.state.scene && (this._components.intro.mesh.visible = !0, this._components.intro.update()), "Background/Scene/Landing" !== b.state.scene && "Background/Scene/Explore" !== b.state.scene || (this._components.greta.mesh.visible = !0, this._components.rock.mesh.visible = !0, this._components.particles.mesh.visible = !0, this._components.text.mesh.visible = !0, this._components.greta.update(), this._components.rock.update(), this._components.particles.update(), this._components.tiles.update(), this._components.text.update()), this._components.background.update(), this._components.fog.update(), this._updateWorldRotation(), this._updateWorldScale(), this._updateWorldPosition()
                    }
                }, {
                    key: "_updateWorldRotation",
                    value: function() {
                        if ("Background/Scene/Explore" !== b.state.scene) this._world.rotation.y = x.a.state.rotation.y + this._interaction.x * x.a.state.interaction.intensity * 2;
                        else {
                            var e = x.a.state.rotation.y - 2 * Math.PI * x.a.state.world.progress;
                            this._world.rotation.y = Q(this._world.rotation.y, e, x.a.state.smoothing)
                        }
                    }
                }, {
                    key: "_updateWorldScale",
                    value: function() {
                        var e = 1 + 1 * x.a.state.world.progress;
                        this._world.scale.x = Q(this._world.scale.x, e, x.a.state.smoothing), this._world.scale.y = Q(this._world.scale.y, e, x.a.state.smoothing), this._world.scale.z = Q(this._world.scale.z, e, x.a.state.smoothing)
                    }
                }, {
                    key: "_updateWorldPosition",
                    value: function() {
                        var e = -.5 * x.a.state.world.progress;
                        this._world.position.y = Q(this._world.position.y, e, x.a.state.smoothing)
                    }
                }, {
                    key: "_storeUpdateHandler",
                    value: function() {
                        "Preloader/Main/Loaded" === b.state.preloader && this._addEnvMap()
                    }
                }, {
                    key: "tiles",
                    get: function() {
                        return this._components.tiles.mesh
                    }
                }, {
                    key: "size",
                    set: function(e) {
                        this._size = e
                    }
                }, {
                    key: "scene",
                    get: function() {
                        return this._scene
                    }
                }]) && It(t.prototype, i), n && It(t, n), e
            }()),
            Dt = a.a.View.extend({
                className: "page page-explore",
                template: "pages/explore",
                components: {
                    instruction: {
                        selector: ".js-explore-instruction",
                        type: he
                    },
                    month: {
                        selector: ".js-explore-month",
                        type: me
                    },
                    range: {
                        selector: ".js-explore-range",
                        type: _e
                    },
                    statement: {
                        selector: ".js-statement",
                        type: j
                    }
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_mouseDownHandler", "_mouseMoveHandler", "_mouseUpHandler", "_touchStartHandler", "_touchMoveHandler", "_touchEndHandler", "_wheelStartHandler", "_wheelHandler", "_wheelEndHandler", "_tickHandler", "_timelinesHideStartHandler", "_timelinesHideCompleteHandler"), this._state = "Explore/Drag/State/Static", this._direction = "Explore/Drag/Direction/Left", this._progress = 0, this._intensity = 0, this._offset = {}, this._offset.start = 0, this._offset.current = 0, this._offset.end = 0, this._offset.difference = 0, this._offset.previous = 0, this._isNarrow = re.a.isMediaQueryActive("narrow") || re.a.isMediaQueryActive("extra-narrow"), this._limit = this._isNarrow ? 4e3 : 16e3
                },
                onInitialized: function() {
                    E.state.progress = 0, this._playSound(), this._setupTimelines(), this._setupEventListeners()
                },
                transitionIn: function() {
                    this._timelines.hide && this._timelines.hide.kill(), this._timelines.show.play(), b.state = {
                        scene: "Background/Scene/Explore"
                    }
                },
                transitionOut: function(e) {
                    this._timelines.show && this._timelines.show.kill(), this._timelines.hide.play().then(e)
                },
                onClose: function() {
                    this._removeTimelines(), this._removeEventListeners()
                },
                _setupEventListeners: function() {
                    this.el.addEventListener("mousedown", this._mouseDownHandler), window.addEventListener("mousemove", this._mouseMoveHandler), window.addEventListener("mouseup", this._mouseUpHandler), this.el.addEventListener("touchstart", this._touchStartHandler), window.addEventListener("touchmove", this._touchMoveHandler), window.addEventListener("touchend", this._touchEndHandler), Y.addEventListener("wheel:start", this._wheelStartHandler), Y.addEventListener("wheel", this._wheelHandler), Y.addEventListener("wheel:end", this._wheelEndHandler), d.a.ticker.add(this._tickHandler)
                },
                _removeEventListeners: function() {
                    this.el.removeEventListener("mousedown", this._mouseDownHandler), window.removeEventListener("mousemove", this._mouseMoveHandler), window.removeEventListener("mouseup", this._mouseUpHandler), this.el.removeEventListener("touchstart", this._touchStartHandler), window.removeEventListener("touchmove", this._touchMoveHandler), window.removeEventListener("touchend", this._touchEndHandler), Y.removeEventListener("wheel:start", this._wheelStartHandler), Y.removeEventListener("wheel", this._wheelHandler), Y.removeEventListener("wheel:end", this._wheelEndHandler), d.a.ticker.remove(this._tickHandler)
                },
                _playSound: function() {},
                _setupTimelines: function() {
                    this._timelines = {}, this._timelines.show = d.a.timeline({
                        paused: !0
                    }), this._timelines.show.add(I.get("Animation/Explore/In"), 0), this._timelines.show.add(this.components.instruction.show(), 0), this._timelines.show.add(this.components.range.show(), .4), this._timelines.show.add(this.components.instruction.hide(), 1.4), this._timelines.show.add(I.get("Animation/Tiles/In"), 1.6), this._timelines.show.add(this.components.month.show(), 2.4), this._timelines.hide = d.a.timeline({
                        paused: !0,
                        onStart: this._timelinesHideStartHandler,
                        onComplete: this._timelinesHideCompleteHandler
                    }), this._timelines.hide.add(I.get("Animation/Explore/Out"), 0), this._timelines.hide.add(this.components.month.hide(), 0), this._timelines.hide.add(this.components.range.hide(), 0), this._timelines.hide.add(this.components.statement.hide(), 0), this._timelines.hide.to(P.state, {
                        duration: 1,
                        reveal: 1
                    }, 0)
                },
                _removeTimelines: function() {
                    this._timelines.show.kill(), this._timelines.hide.kill()
                },
                _dragStart: function(e) {
                    this._state = "Explore/Drag/State/Drag/Requested";
                    var t = "Explore/Drag/Direction/Left" === this._direction ? -1 : 1;
                    this._setOffsetStart(e * t)
                },
                _drag: function(e) {
                    if ("Explore/Drag/State/Drag/Requested" === this._state && (this._state = "Explore/Drag/State/Dragging"), "Explore/Drag/State/Drag/Requested" === this._state || "Explore/Drag/State/Dragging" === this._state) {
                        var t = "Explore/Drag/Direction/Left" === this._direction ? -1 : 1;
                        this._setOffset(e * t)
                    }
                },
                _dragEnd: function(e) {
                    this._state = "Explore/Drag/State/Static", this._setOffsetEnd()
                },
                _setOffsetStart: function(e) {
                    this._throw && this._throw.kill(), this._offset.start = e
                },
                _setOffset: function(e) {
                    var t = e - this._offset.start;
                    this._offset.direction = t > 0 ? "Explore/Drag/Direction/Right" : "Explore/Drag/Direction/Left", this._offset.difference += t < 0 ? -1 * t : t, this._offset.current = this._offset.end + t, E.state.dragOffset = this._offset.current
                },
                _setOffsetEnd: function() {
                    this._throw && this._throw.kill(), this._offset.end = this._progress * this._limit, this._offset.difference = 0
                },
                _setProgress: function() {
                    if (!this._isAnimating) {
                        this._progress = X(1 / this._limit * this._offset.current, 0, 1);
                        var e = 1.2 * this._progress,
                            t = X(5 * (e - 1), 0, 1);
                        this.components.range.setProgress(X(e, 0, 1)), this.components.month.setProgress(X(e, 0, 1)), E.state.progress = Q(E.state.progress, e, .1), x.a.state.world.progress = this._progress, x.a.state.position.z = Q(x.a.state.position.z, 2 + .5 * t, .1), P.state.reveal = 1 - t, t > 0 ? (this._isOutro || (this._isOutro = !0, this._outroTimeline ? this._outroTimeline.play() : (this._outroTimeline = d.a.timeline(), this._outroTimeline.add(this.components.range.hide(), 0), this._outroTimeline.add(this.components.month.hide(), 0), this._outroTimeline.add(this.components.statement.show(), 0))), E.state.opacityMultiplier = 1 - t) : this._isOutro && (this._isOutro = !1, this._outroTimeline && this._outroTimeline.reverse())
                    }
                },
                _animateOut: function() {
                    this._animatingOut = !0, I.get("Animation/Tiles/Out").play(), c.a.trackEvent({
                        category: "Explore",
                        action: "Reached End",
                        label: ""
                    })
                },
                _setIntensity: function() {
                    var e = .02 * (this._offset.current - this._offset.previous);
                    this._offset.previous = this._offset.current, E.state.intensity = e
                },
                _setDirection: function() {},
                _timelinesHideStartHandler: function() {
                    this._isAnimating = !0
                },
                _timelinesHideCompleteHandler: function() {
                    this._isAnimating = !1
                },
                _mouseDownHandler: function(e) {
                    var t = (this._isNarrow, e.clientX);
                    this._dragStart(t)
                },
                _mouseMoveHandler: function(e) {
                    var t = (this._isNarrow, e.clientX);
                    this._drag(t)
                },
                _mouseUpHandler: function(e) {
                    this._dragEnd(e)
                },
                _touchStartHandler: function(e) {
                    var t = (this._isNarrow, e.touches[0].clientX);
                    this._dragStart(t)
                },
                _touchMoveHandler: function(e) {
                    e.preventDefault();
                    var t = (this._isNarrow, e.touches[0].clientX);
                    this._drag(t)
                },
                _touchEndHandler: function(e) {
                    this._dragEnd(e)
                },
                _wheelStartHandler: function() {
                    J.state.isOverlayActive || this._setOffsetStart(1 * Y.offset)
                },
                _wheelHandler: function() {
                    J.state.isOverlayActive || this._setOffset(1 * Y.offset)
                },
                _wheelEndHandler: function() {
                    J.state.isOverlayActive || this._setOffsetEnd()
                },
                _tickHandler: function() {
                    this._animatingOut || (this._setProgress(), this._setIntensity(), this._setDirection())
                }
            }),
            At = (i(163), i(59), new w({
                isActive: !1,
                progress: 0
            }));

        function Rt(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function Ut(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }
        var Ft = function() {
                function e(t) {
                    var i = this,
                        n = t.store,
                        s = t.context;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), Ut(this, "_mouseDownHandler", (function(e) {
                        i._dragStart(e.clientX)
                    })), Ut(this, "_mouseMoveHandler", (function(e) {
                        i._dragging(e.clientX)
                    })), Ut(this, "_mouseUpHandler", (function() {
                        i._dragStop()
                    })), Ut(this, "_touchStartHandler", (function(e) {
                        i._dragStart(e.touches[0].clientX)
                    })), Ut(this, "_touchMoveHandler", (function(e) {
                        i._dragging(e.touches[0].clientX)
                    })), Ut(this, "_touchEndHandler", (function() {
                        i._dragStop()
                    })), this._state = "Drag/Slider/Module/State/Static", this._store = n, this._context = s, this._props = {}, this._props.limit = 0, this._props.direction = "Drag/Slider/Module/Direction/Normal", this._drag = {}, this._drag.start = 0, this._drag.offset = 0, this._progress = {}, this._progress.start = 0, this._progress.offset = 0
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "start",
                    value: function() {
                        this._setupEventListeners()
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this._removeEventListeners()
                    }
                }, {
                    key: "_setupEventListeners",
                    value: function() {
                        this._context.addEventListener("mousedown", this._mouseDownHandler), window.addEventListener("mousemove", this._mouseMoveHandler), window.addEventListener("mouseup", this._mouseUpHandler), this._context.addEventListener("touchstart", this._touchStartHandler), window.addEventListener("touchmove", this._touchMoveHandler), window.addEventListener("touchend", this._touchEndHandler)
                    }
                }, {
                    key: "_removeEventListeners",
                    value: function() {
                        this._context.removeEventListener("mousedown", this._mouseDownHandler), window.removeEventListener("mousemove", this._mouseMoveHandler), window.removeEventListener("mouseup", this._mouseUpHandler), this._context.removeEventListener("touchstart", this._touchStartHandler), window.removeEventListener("touchmove", this._touchMoveHandler), window.removeEventListener("touchend", this._touchEndHandler)
                    }
                }, {
                    key: "_dragStart",
                    value: function(e) {
                        this._drag.start = e, this._progress.start = this._store.state.progress, this._state = "Drag/Slider/Module/State/Dragging"
                    }
                }, {
                    key: "_dragging",
                    value: function(e) {
                        if ("Drag/Slider/Module/State/Dragging" === this._state) {
                            var t = "Drag/Slider/Module/Direction/Normal" === this._props.direction ? 1 : -1;
                            this._drag.offset = (e - this._drag.start) * t, this._progress.offset = 1 / this._props.limit * this._drag.offset, this._store.state.progress = X(this._progress.start + this._progress.offset, 0, 1)
                        }
                    }
                }, {
                    key: "_dragStop",
                    value: function() {
                        this._state = "Drag/Slider/Module/State/Static"
                    }
                }, {
                    key: "limit",
                    set: function(e) {
                        this._props.limit = e
                    }
                }, {
                    key: "direction",
                    set: function(e) {
                        this._props.direction = e
                    }
                }]) && Rt(t.prototype, i), n && Rt(t, n), e
            }(),
            Bt = a.a.View.extend({
                components: {},
                events: {
                    mousedown: "_mouseDownHander"
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_tickHandler", "_wheelHandler"), this._offset = {}, this._offset.target = 0, this._offset.value = 0
                },
                onInitialized: function() {
                    this._setupSlider(), this._setupEventListeners()
                },
                onClose: function() {
                    this._slider.destroy(), this._removeEventListeners()
                },
                size: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return e && (this._size = e, this._setElementWidth(), this._setSliderLimit()), this._size
                },
                _setupSlider: function() {
                    this._slider = new Ft({
                        store: At,
                        context: this.el
                    }), this._slider.direction = "Drag/Slider/Module/Direction/Reversed", this._slider.start()
                },
                _setupEventListeners: function() {
                    d.a.ticker.add(this._tickHandler), Y.addEventListener("wheel", this._wheelHandler)
                },
                _removeEventListeners: function() {
                    d.a.ticker.remove(this._tickHandler), Y.removeEventListener("wheel", this._wheelHandler)
                },
                _setElementWidth: function() {
                    this.el.style.width = "".concat(this._size.width, "px")
                },
                _setSliderLimit: function() {
                    this._slider.limit = this._size.width
                },
                _setOffset: function() {
                    this._offset.target = -1 * At.state.progress * (this._size.width - n.a.viewportWidth), this._offset.value = Q(this._offset.value, this._offset.target, .1), this.el.style.transform = "matrix(1.0, 0.0, 0.0, 1.0, ".concat(this._offset.value, ", 0)")
                },
                _tickHandler: function() {
                    this._setOffset()
                },
                _wheelHandler: function(e) {
                    var t = 1 / this._size.width * e.pixelY;
                    At.state.progress = X(At.state.progress + t, 0, 1)
                }
            }),
            Gt = a.a.Component.extend({
                ui: {},
                components: {},
                initialize: function() {
                    Object(H.bindAll)(this, "_resizeHandler")
                },
                onInitialized: function() {
                    this.size({
                        width: this.el.clientWidth,
                        height: this.el.clientHeight
                    })
                },
                size: function(e) {
                    return e && (this._size = e), this._size
                },
                _setupEventListeners: function() {
                    n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler)
                },
                _resizeHandler: function() {
                    this.size({
                        width: this.el.clientWidth,
                        height: this.el.clientHeight
                    })
                }
            }),
            Vt = a.a.Component.extend({
                initialize: function() {
                    Object(H.bindAll)(this, "_resizeHandler")
                },
                onInitialized: function() {
                    var e = this.el.dataset.ratio,
                        t = this.el.clientHeight;
                    this.size({
                        height: t,
                        width: t * e
                    }), this._setupEventListeners()
                },
                size: function(e) {
                    return e && (this._size = e, this.el.style.width = "".concat(this._size.width, "px")), this._size
                },
                _setupEventListeners: function() {
                    n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler)
                },
                _resizeHandler: function() {
                    var e = this.el.dataset.ratio,
                        t = this.el.clientHeight;
                    this.size({
                        height: t,
                        width: t * e
                    })
                }
            }),
            Wt = a.a.Model.extend({
                parse: function(e) {
                    return e.label = de.get(e.label), e
                }
            }),
            qt = new(a.a.Collection.extend({
                url: "data/timeline/groups.json",
                model: Wt
            })),
            Nt = a.a.View.extend({
                className: "page page-timeline",
                template: "pages/timeline",
                components: {
                    slider: {
                        selector: ".js-slider",
                        type: Bt
                    },
                    ratio: {
                        selector: ".js-ratio",
                        type: Vt
                    },
                    intro: {
                        selector: ".js-intro",
                        type: Gt
                    }
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_resizeHandler"), this.templateData = {}, this.templateData.groups = qt, this.templateData.posts = r
                },
                onInitialized: function() {
                    this._setupEventListeners(), this._setSize()
                },
                onClose: function() {
                    n.a.removeEventListener("resize", this._resizeHandler), n.a.removeEventListener("resize:complete", this._resizeHandler)
                },
                _setupEventListeners: function() {
                    n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler)
                },
                _setSize: function() {
                    this._width = this._getSliderWidth(), this.components.slider.size({
                        width: this._width
                    })
                },
                _getSliderWidth: function() {
                    return this.components.ratio.reduce((function(e, t) {
                        return e + t.size().width + n.a.rem(40)
                    }), this.components.intro.size().width)
                },
                _resizeHandler: function() {
                    this._setSize()
                }
            }),
            Yt = a.a.Component.extend({
                initialize: function() {
                    Object(H.bindAll)(this, "_timelineShowCompleteHandler")
                },
                onInitialized: function() {
                    this._setupCharacters(), this._setInitialStyles()
                },
                show: function() {
                    var e = d.a.timeline({
                        onComplete: this._timelineShowCompleteHandler
                    });
                    return e.to(this.el, {
                        duration: .01,
                        visibility: "visible"
                    }), e.to(this._characters.characters, {
                        duration: .5,
                        autoAlpha: 1,
                        ease: "sine.inOut",
                        stagger: {
                            amount: .1
                        }
                    }, 0), e.to(this._characters.characters, {
                        duration: .5,
                        y: 0,
                        ease: "power1.out",
                        stagger: {
                            amount: .1
                        }
                    }, 0), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .3,
                        autoAlpha: 0,
                        ease: "sine.in"
                    }, 0), e.to(this.el, {
                        duration: .3,
                        y: -10,
                        ease: "power1.in"
                    }, 0), e.to(this.el, {
                        duration: .01,
                        visibility: "hidden"
                    }), e
                },
                _setupCharacters: function() {
                    this._characters = new ue(this.el), this._characters.split({
                        style: "display: inline-block; will-change: transform; backface-visibility: hidden;",
                        nonBreakingSpace: !0
                    })
                },
                _setInitialStyles: function() {
                    d.a.set(this._characters.characters, {
                        alpha: 0,
                        y: 20
                    })
                },
                _timelineShowCompleteHandler: function() {
                    this._characters.revert()
                }
            }),
            Xt = a.a.View.extend({
                ui: {
                    canvas: ".js-background",
                    icon: ".js-icon"
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_tickHandler", "_requestUpdateHandler"), this._progress = 0, this._tweenObject = {
                        start: 0,
                        end: 0
                    }
                },
                onInitialized: function() {
                    this._setSize(), this._setInitialStyles(), this._setupCanvas(), this._setupEventListeners()
                },
                onClose: function() {
                    this._removeEventListeners()
                },
                progress: function(e) {
                    this._progress = e, this._tweenObject.start = 2 * e * Math.PI, this._requestUpdate()
                },
                show: function() {
                    var e = d.a.timeline({
                        onUpdate: this._requestUpdateHandler
                    });
                    return e.set(this.ui.icon, {
                        x: 15,
                        alpha: 0
                    }), e.to(this.el, {
                        duration: .6,
                        alpha: 1,
                        ease: "sine.out"
                    }, 0), e.to(this._tweenObject, {
                        duration: .8,
                        end: 2 * Math.PI,
                        ease: "power1.inOut"
                    }, .2), e.to(this.ui.icon, {
                        duration: .3,
                        x: 0,
                        ease: "power1.out"
                    }, .3), e.to(this.ui.icon, {
                        duration: .4,
                        alpha: 1,
                        ease: "sine.inOut"
                    }, .4), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this._tweenObject, {
                        duration: .6,
                        start: 2 * Math.PI,
                        ease: "power2.in"
                    }, 0), e.to(this.ui.icon, {
                        duration: .4,
                        alpha: 0,
                        ease: "sine.out"
                    }, 0), e.to(this.ui.icon, {
                        duration: .4,
                        x: -15,
                        ease: "power1.in"
                    }, 0), e.to(this.el, {
                        duration: .5,
                        alpha: 0,
                        ease: "sine.inOut"
                    }, .2), e
                },
                _setupEventListeners: function() {
                    d.a.ticker.add(this._tickHandler)
                },
                _setupCanvas: function() {
                    this._canvas = this.ui.canvas, this._context = this._canvas.getContext("2d"), this._canvas.width = this._size.width * this._size.scale, this._canvas.height = this._size.height * this._size.scale, this._context.scale(this._size.scale, this._size.scale)
                },
                _setSize: function() {
                    this._size = {}, this._size.scale = 2, this._size.width = this.el.clientWidth, this._size.height = this.el.clientHeight
                },
                _setInitialStyles: function() {
                    this.el.style.opacity = 0
                },
                _removeEventListeners: function() {
                    d.a.ticker.remove(this._tickHandler)
                },
                _update: function() {},
                _draw: function() {
                    this._context.clearRect(0, 0, this._size.width, this._size.height);
                    var e = -.5 * Math.PI,
                        t = .5 * this._size.width,
                        i = .5 * this._size.height,
                        n = .5 * (Math.min(this._size.width, this._size.height) - 2);
                    this._context.beginPath(), this._context.lineWidth = 1, this._context.strokeStyle = "#d2e191", this._context.arc(t, i, n, this._tweenObject.start + e, this._tweenObject.end + e), this._context.stroke(), this._context.closePath()
                },
                _tick: function() {
                    this._isUpdateRequested, this._isUpdateRequested = !1, this._update(), this._draw()
                },
                _requestUpdate: function() {
                    this._isUpdateRequested = !0
                },
                _tickHandler: function() {
                    this._tick()
                },
                _requestUpdateHandler: function() {
                    this._requestUpdate()
                }
            }),
            Qt = a.a.View.extend({
                className: "page page-permissions",
                template: "pages/permissions",
                ui: {
                    paragraphLines: ".js-paragraph-line"
                },
                components: {
                    buttonPermission: {
                        selector: ".js-button-permission",
                        type: Xt
                    },
                    paragraphLines: {
                        selector: ".js-paragraph-line",
                        type: Yt
                    }
                },
                events: {
                    "click .js-button-permission": "_clickButtonPermissionHandler"
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_timelineCountdownUpdateHandler", "_timelineInStartHandler", "_timelineInCompleteHandler", "_timelineCountdownCompleteHandler"), this._tweenObject = {
                        progress: 0
                    }
                },
                onInitialized: function() {
                    this._setupTimelines(), this._setupEventListeners()
                },
                transitionIn: function() {
                    this._timelineIn.play()
                },
                transitionOut: function(e) {
                    this._timelineIn && this._timelineIn.kill(), this._timelineCountdown && this._timelineCountdown.kill(), this._timelineOut.play().then(e)
                },
                onClose: function() {
                    this._removeTimelines(), this._removeEventListeners()
                },
                _setupEventListeners: function() {},
                _setupTimelines: function() {
                    this._timelineIn = d.a.timeline({
                        paused: !0,
                        onStart: this._timelineInStartHandler,
                        onComplete: this._timelineInCompleteHandler
                    }), this._timelineIn.add(this.components.paragraphLines[0].show(), 0), this._timelineIn.add(this.components.paragraphLines[1].show(), .2), this._timelineIn.add(this.components.buttonPermission.show(), .2), this._timelineCountdown = d.a.timeline({
                        paused: !0,
                        onUpdate: this._timelineCountdownUpdateHandler,
                        onComplete: this._timelineCountdownCompleteHandler
                    }), this._timelineCountdown.to(this._tweenObject, {
                        duration: 5,
                        progress: 1
                    }, 0), this._timelineOut = d.a.timeline({
                        paused: !0,
                        onComplete: function() {
                            J.state = {
                                isPermissionsTransitionedIn: !0
                            }
                        }
                    }), this._timelineOut.add(this.components.buttonPermission.hide(), 0), this._timelineOut.add(this.components.paragraphLines[0].hide(), .1), this._timelineOut.add(this.components.paragraphLines[1].hide(), .2)
                },
                _removeEventListeners: function() {},
                _removeTimelines: function() {
                    this._timelineIn.kill(), this._timelineCountdown.kill(), this._timelineOut.kill()
                },
                _navigate: function() {
                    a.a.history.loadUrl("/landing", {
                        trigger: !0
                    })
                },
                _sound: function() {
                    "Background/Sound/State/Initial" === oe.state ? oe.load() : "Background/Sound/State/Paused" === oe.state && oe.play()
                },
                _clickButtonPermissionHandler: function() {
                    this._isAnimating || (this._navigate(), this._sound())
                },
                _timelineCountdownUpdateHandler: function() {
                    this.components.buttonPermission.progress(this._tweenObject.progress)
                },
                _timelineInStartHandler: function() {
                    this._isAnimating = !0
                },
                _timelineInCompleteHandler: function() {
                    this._isAnimating = !1, this._timelineCountdown.play()
                },
                _timelineCountdownCompleteHandler: function() {
                    this._navigate()
                }
            }),
            Jt = a.a.View.extend({
                className: "overlay overlay-timeline",
                template: "overlays/timeline"
            }),
            Zt = a.a.Component.extend({
                ui: {
                    content: ".js-content",
                    video: ".js-video",
                    poster: ".js-poster",
                    progress: ".js-progress",
                    progressHighlight: ".js-progress-highlight"
                },
                events: {
                    click: "_clickHandler"
                },
                initialize: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    Object(H.bindAll)(this, "_resizeHandler", "_tickHandler"), this._mode = e.mode || "Video/Player/Mode/Contain", this._video = {}, this._video.size = e.size, this._video.state = "Video/Player/State/Paused"
                },
                onInitialized: function() {
                    this._setSize(), this._setInitialStyles(), this._setupEventListeners()
                },
                onClose: function() {
                    this._removeEventListeners()
                },
                play: function() {
                    "Video/Player/State/Paused" === this._video.state && (this._video.state = "Video/Player/State/Playing", d.a.to(this.ui.poster, {
                        duration: .6,
                        autoAlpha: 0,
                        ease: "sine.out"
                    }), d.a.to(this.ui.progress, {
                        duration: .2,
                        autoAlpha: 1,
                        ease: "sine.inOut"
                    }), this.ui.video.play(), this.trigger("video:play"))
                },
                pause: function() {
                    "Video/Player/State/Playing" === this._video.state && (this._video.state = "Video/Player/State/Paused", this.ui.video.pause(), this.trigger("video:pause"))
                },
                show: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .2,
                        autoAlpha: 1,
                        ease: "sine.inOut"
                    }), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .2,
                        autoAlpha: 0,
                        ease: "sine.out"
                    }), e
                },
                getSize: function() {
                    return this._size
                },
                _setSize: function() {
                    this._size = {};
                    var e = ("Video/Player/Mode/Cover" === this._mode ? Math.max : Math.min)(this.el.clientWidth / this._video.size.width, this.el.clientHeight / this._video.size.height);
                    this._size.width = this._video.size.width * e, this._size.height = this._video.size.height * e, this.ui.video.width = this._size.width, this.ui.video.height = this._size.height, this.ui.content.style.width = "".concat(this._size.width, "px"), this.ui.content.style.height = "".concat(this._size.height, "px")
                },
                _setInitialStyles: function() {
                    this.ui.progress.style.opacity = 0, this.ui.progressHighlight.style.transform = "matrix(0.0, 0.0, 0.0, 1.0, 0,0)", this.el.style.opacity = 0, this.el.style.visibility = "hidden"
                },
                _setProgress: function() {
                    var e = 1 / this.ui.video.duration * this.ui.video.currentTime;
                    this._progress !== e && (this._progress = e, this.ui.progressHighlight.style.transform = "matrix(".concat(this._progress, ", 0.0, 0.0, 1.0, 0,0)")), this.ui.video.currentTime === this.ui.video.duration && (this._video.state = "Video/Player/State/Paused", this.trigger("video:pause"))
                },
                _setupEventListeners: function() {
                    n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler), d.a.ticker.add(this._tickHandler)
                },
                _removeEventListeners: function() {
                    n.a.removeEventListener("resize", this._resizeHandler), n.a.removeEventListener("resize:complete", this._resizeHandler), d.a.ticker.remove(this._tickHandler)
                },
                _resizeHandler: function() {
                    this._setSize()
                },
                _tickHandler: function() {
                    "Video/Player/State/Playing" === this._video.state && this._setProgress()
                },
                _clickHandler: function() {
                    "Video/Player/State/Playing" === this._video.state ? this.pause() : this.play()
                }
            }),
            Kt = a.a.View.extend({
                ui: {
                    play: ".js-icon-play",
                    pause: ".js-icon-pause"
                },
                events: {
                    mouseenter: "_mouseEnterHandler",
                    mouseleave: "_mouseLeaveHandler"
                },
                onInitialized: function() {
                    this._setupTimelines(), this._setInitialStyles()
                },
                onClose: function() {
                    this._removeTimelines()
                },
                show: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .6,
                        autoAlpha: 1,
                        ease: "sine.inOut"
                    }, 0), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .6,
                        autoAlpha: 0,
                        ease: "sine.out"
                    }, 0), e
                },
                toPauseState: function() {
                    this._timelines.play.play()
                },
                toPlayState: function() {
                    this._timelines.play.reverse()
                },
                _setupTimelines: function() {
                    this._timelines = {}, this._timelines.hover = d.a.timeline({
                        paused: !0
                    }), this._timelines.play = d.a.timeline({
                        paused: !0,
                        onComplete: this._timelinePlayCompleteHandler
                    }), this._timelines.play.set(this.ui.pause, {
                        x: 15,
                        alpha: 0
                    }), this._timelines.play.to(this.ui.play, {
                        duration: .3,
                        x: -15,
                        ease: "power2.in"
                    }, 0), this._timelines.play.to(this.ui.play, {
                        duration: .3,
                        alpha: 0,
                        ease: "sine.out"
                    }, 0), this._timelines.play.to(this.ui.pause, {
                        duration: .3,
                        x: 0,
                        ease: "power2.out"
                    }, .3), this._timelines.play.to(this.ui.pause, {
                        duration: .3,
                        alpha: 1,
                        ease: "sine.inOut"
                    }, .3)
                },
                _setInitialStyles: function() {
                    this.ui.pause.style.opacity = 0
                },
                _removeTimelines: function() {
                    this._timelines.play.kill(), this._timelines.hover.kill()
                },
                _mouseEnterHandler: function() {
                    this._timelines.hover.play()
                },
                _mouseLeaveHandler: function() {
                    this._timelines.hover.reverse()
                }
            }),
            $t = new k.a({
                width: 100,
                height: 100,
                opacity: 0,
                scale: 1,
                limit: 1,
                intensity: 0,
                distance: .7,
                texture: null
            });
        ! function() {
            if (S.a.gui) {
                var e = S.a.gui.addFolder("Overlay");
                e.add($t.state, "opacity", 0, 1, .01), e.add($t.state, "scale", 0, 5, .01), e.add($t.state, "limit", 0, 5, .01), e.add($t.state, "intensity", 0, 5, .01)
            }
        }();
        var ei = a.a.View.extend({
                className: "overlay overlay-explore",
                template: "overlays/explore",
                ui: {
                    background: ".js-background",
                    canvas: ".js-canvas"
                },
                events: {
                    "click .js-background": "_backgroundClickHandler",
                    "click .js-button-close": "_buttonCloseClickHandler"
                },
                components: {
                    buttonPlay: {
                        selector: ".js-button-play",
                        type: Kt
                    }
                },
                initialize: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    Object(H.bindAll)(this, "_tickHandler", "_resizeHandler", "_timelineShowStartHandler", "_timelineShowCompleteHandler"), this._model = e.model
                },
                onInitialized: function() {
                    this.addComponent("videoPlayer", Zt, ".js-video-player", {
                        size: {
                            width: this.model.get("video").dimensions.width,
                            height: this.model.get("video").dimensions.height
                        }
                    }), this._setupEventListeners(), this._setupTimelines(), this._setInitialStyles(), this.components.buttonPlay.show()
                },
                transitionIn: function() {
                    this._timelines.show.play()
                },
                transitionOut: function(e) {
                    this._timelines.show.kill(), this._timelines.hide.play().then(e)
                },
                onClose: function() {
                    this._removeEventListeners(), this._removeTimelines()
                },
                _setupEventListeners: function() {
                    this.listenTo(this.components.videoPlayer, "video:play", this._videoPlayHandler), this.listenTo(this.components.videoPlayer, "video:pause", this._videoPauseHandler)
                },
                _setupTimelines: function() {
                    this._timelines = {}, this._timelines.show = d.a.timeline({
                        paused: !0,
                        onStart: this._timelineShowStartHandler,
                        onComplete: this._timelineShowCompleteHandler
                    }), this._timelines.show.to(this.ui.background, {
                        duration: .4,
                        alpha: .95,
                        ease: "sine.out"
                    }, 0), this._timelines.show.to($t.state, {
                        duration: .2,
                        opacity: 1,
                        ease: "sine.inOut"
                    }, 0), this._timelines.show.to($t.state, {
                        duration: .5,
                        distance: 1,
                        ease: "power1.inOut"
                    }, 0), this._timelines.show.to($t.state, {
                        duration: .5,
                        intensity: 0,
                        ease: "power2.out"
                    }, .3), this._timelines.show.add(this.components.videoPlayer.show(), .8), this._timelines.hide = d.a.timeline({
                        paused: !0
                    }), this._timelines.hide.to(this.ui.background, {
                        duration: .4,
                        alpha: 0,
                        ease: "sine.out"
                    }, 0), this._timelines.hide.to(this.el, {
                        duration: .6,
                        alpha: 0,
                        ease: "sine.out"
                    }, 0), this._timelines.hide.to($t.state, {
                        duration: .2,
                        opacity: 0,
                        ease: "sine.inOut"
                    }, 0)
                },
                _removeEventListeners: function() {},
                _removeTimelines: function() {
                    this._timelines.show.kill(), this._timelines.hide.kill()
                },
                _setInitialStyles: function() {
                    this.ui.background.style.opacity = 0;
                    var e = this.components.videoPlayer.getSize();
                    $t.state.width = e.width, $t.state.height = e.height, $t.state.texture = K.a.getResult(this._model.get("video").poster), $t.state.opacity = 0, $t.state.distance = .7, $t.state.intensity = 1.1
                },
                _tickHandler: function() {},
                _resizeHandler: function() {},
                _timelineShowStartHandler: function() {
                    this._isAnimating = !0
                },
                _timelineShowCompleteHandler: function() {
                    this._isAnimating = !1, $t.state.opacity = 0, this.components.videoPlayer.play()
                },
                _backgroundClickHandler: function() {
                    this._isAnimating || a.a.history.loadUrl("/explore", {
                        trigger: !0
                    })
                },
                _buttonCloseClickHandler: function() {
                    this._isAnimating || a.a.history.loadUrl("/explore", {
                        trigger: !0
                    })
                },
                _videoPlayHandler: function() {
                    var e = this;
                    d.a.timeline({
                        onComplete: function() {
                            e.components.buttonPlay.hide()
                        }
                    }).add(this.components.buttonPlay.toPauseState())
                },
                _videoPauseHandler: function() {
                    this.components.buttonPlay.show(), this.components.buttonPlay.toPlayState()
                }
            }),
            ti = a.a.Router.extend({
                routes: {
                    "": "_permissions",
                    landing: "_landing",
                    explore: "_explore",
                    "explore/detail/:id": "_exploreDetail",
                    timeline: "_timeline",
                    "timeline/detail/:id": "_timelineDetail"
                },
                _permissions: function() {
                    c.a.trackPageView("permissions"), a.a.RegionManager.get("main").show(Qt, null, this.getTransitionData()), a.a.RegionManager.get("overlay").clear(), J.state = {
                        isOverlayActive: !1
                    }
                },
                _landing: function() {
                    c.a.trackPageView("landing"), a.a.RegionManager.get("main").show(D, null, this.getTransitionData()), a.a.RegionManager.get("overlay").clear(), J.state = {
                        isOverlayActive: !1
                    }
                },
                _explore: function() {
                    c.a.trackPageView("explore"), a.a.RegionManager.get("main").show(Dt, null, this.getTransitionData()), a.a.RegionManager.get("overlay").clear(), J.state = {
                        isOverlayActive: !1
                    }
                },
                _timeline: function() {
                    c.a.trackPageView("timeline"), a.a.RegionManager.get("main").show(Nt, null, this.getTransitionData()), a.a.RegionManager.get("overlay").clear(), J.state = {
                        isOverlayActive: !1
                    }
                },
                _timelineDetail: function(e) {
                    c.a.trackPageView("timeline/detail/".concat(e));
                    var t = r.get(e);
                    a.a.RegionManager.get("main").show(Nt, null, this.getTransitionData()), a.a.RegionManager.get("overlay").show(Jt, {
                        model: t
                    }), J.state = {
                        isOverlayActive: !0
                    }
                },
                _exploreDetail: function(e) {
                    c.a.trackPageView("explore/detail/".concat(e));
                    var t = h.get(e);
                    a.a.RegionManager.get("main").show(Dt, null, this.getTransitionData()), a.a.RegionManager.get("overlay").show(ei, {
                        model: t
                    }, this.getTransitionData()), J.state = {
                        isOverlayActive: !0
                    }
                }
            }),
            ii = (i(109), i(111), a.a.View.extend({
                className: "page page-preloader",
                template: "pages/preloader",
                ui: {
                    subheading: ".js-subheading",
                    progress: ".js-progress",
                    progressPrecessor: ".js-progress-precessor",
                    progressSuccessor: ".js-progress-successor"
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_resizeHandler", "_tickHandler", "_timelineShowCompleteHandler", "_timelineHideCompleteHandler"), this._progress = 0, this._callbacks = {}, this._state = "Preloader/State/Static"
                },
                onInitialized: function() {
                    this._setInitialStyles(), this._setupEventListeners(), this._setSize(), this._setupTimelines()
                },
                transitionIn: function() {
                    this._state = "Preloader/State/Transition", this._timelines.show.play()
                },
                transitionOut: function(e) {
                    this._callbacks.complete = e, this._isTransitionOutRequested = !0, "Preloader/State/Transition/Completed" === this._state && this._timelines.hide.play()
                },
                onClose: function() {
                    this._removeEventListeners(), this._removeTimelines()
                },
                _setupEventListeners: function() {
                    d.a.ticker.add(this._tickHandler), n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler)
                },
                _setupTimelines: function() {
                    this._timelines = {}, this._timelines.show = d.a.timeline({
                        paused: !0,
                        onComplete: this._timelineShowCompleteHandler
                    }), this._timelines.show.to(ge.state, {
                        duration: 1.2,
                        opacity: 1,
                        ease: "sine.inOut"
                    }, .5), this._timelines.show.to(ge.state, {
                        duration: 1.2,
                        intensity: .4,
                        ease: "Power2.inOut"
                    }, .5), this._timelines.show.to(ge.state, {
                        duration: 1.2,
                        scale: 1.2,
                        ease: "Power2.out"
                    }, .5), this._timelines.show.to(this.ui.progress, {
                        duration: .6,
                        autoAlpha: 1,
                        ease: "sine.inOut"
                    }, 1.4), this._timelines.show.to(this.ui.subheading, {
                        duration: .6,
                        autoAlpha: 1,
                        ease: "sine.inOut"
                    }, 1.6), this._timelines.show.to(this, {
                        _progress: 1,
                        duration: 1,
                        ease: "sin.inOut"
                    }, 1.4), this._timelines.hide = d.a.timeline({
                        paused: !0,
                        onComplete: this._timelineHideCompleteHandler
                    }), this._timelines.hide.to(ge.state, {
                        duration: .8,
                        opacity: 0,
                        ease: "sine.out"
                    }, .2), this._timelines.hide.to(ge.state, {
                        duration: .8,
                        intensity: .8,
                        ease: "Power2.inOut"
                    }, .2), this._timelines.hide.to(this.ui.progress, {
                        duration: .5,
                        y: this._size.height,
                        ease: "power1.inOut"
                    }, .3), this._timelines.hide.to(this.ui.subheading, {
                        duration: .5,
                        y: 20,
                        ease: "power1.in"
                    }, .4), this._timelines.hide.to(this.ui.subheading, {
                        duration: .4,
                        autoAlpha: 0,
                        ease: "sine.inOut"
                    }, .4)
                },
                _removeEventListeners: function() {
                    d.a.ticker.remove(this._tickHandler)
                },
                _removeTimelines: function() {
                    this._timelines.show.kill(), this._timelines.hide.kill()
                },
                _setInitialStyles: function() {
                    this.ui.subheading.style.opacity = 0, this.ui.progress.style.opacity = 0, ge.state.opacity = 0, ge.state.intensity = 1.4, ge.state.scale = 1
                },
                _setLabel: function() {
                    var e = Math.floor(99 * this._progress + 0);
                    this.ui.progressPrecessor.textContent = Math.floor(e / 10), this.ui.progressSuccessor.textContent = e % 10
                },
                _setSize: function() {
                    this._size = {}, this._size.width = this.ui.progress.clientWidth, this._size.height = this.ui.progress.clientHeight
                },
                _resizeHandler: function() {
                    this._setSize()
                },
                _tickHandler: function() {
                    this._setLabel()
                },
                _timelineShowCompleteHandler: function() {
                    this._state = "Preloader/State/Transition/Completed", this._isTransitionOutRequested && this._timelines.hide.play()
                },
                _timelineHideCompleteHandler: function() {
                    this._callbacks.complete && this._callbacks.complete.call(this)
                }
            })),
            ni = a.a.Component.extend({
                onInitialized: function() {
                    this.el.style.opacity = 0
                },
                show: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .6,
                        autoAlpha: 1,
                        ease: "sine.inOut"
                    }, 0), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .6,
                        autoAlpha: 0,
                        ease: "sine.out"
                    }, 0), e
                }
            }),
            si = a.a.View.extend({
                components: {
                    logo: {
                        selector: ".js-logo",
                        type: ni
                    }
                },
                events: {
                    "click .js-logo": "_clickLogoHandler"
                },
                onInitialized: function() {},
                show: function() {
                    var e = d.a.timeline();
                    return e.add(this.components.logo.show(), 0), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.add(this.components.logo.hide(), 0), e
                },
                _clickLogoHandler: function() {
                    a.a.history.loadUrl("/landing", {
                        trigger: !0
                    })
                }
            }),
            ai = a.a.Component.extend({
                initialize: function() {
                    Object(H.bindAll)(this, "_tickHandler", "_updateRequestedHandler", "_timelineCompleteHandler", "show", "hide"), this._callbacks = {}, this._tweenObj = {
                        start: 0,
                        end: 0,
                        offset: 0
                    }
                },
                onInitialized: function() {
                    this._setupCanvas(), this._setSize(), this._setupEventListeners(), this._setupTimelines()
                },
                show: function() {
                    this._timeline.play()
                },
                progress: function(e) {
                    this._tweenObj.start = 0, this._tweenObj.offset = -.5 * Math.PI, this._tweenObj.end = 2 * e * Math.PI
                },
                hide: function(e) {
                    this._isHideRequested = !0, this._callbacks.hide = e
                },
                onClose: function() {
                    this._removeEventListeners(), this._removeTimelines()
                },
                _setupCanvas: function() {
                    this._canvas = this.el, this._context = this._canvas.getContext("2d")
                },
                _setSize: function() {
                    var e = (window.devicePixelRatio, 2);
                    this._size = {}, this._size.width = this.el.clientWidth, this._size.height = this.el.clientHeight, this.el.width = this._size.width * e, this.el.height = this._size.height * e, this._context.scale(e, e)
                },
                _setupEventListeners: function() {
                    d.a.ticker.add(this._tickHandler)
                },
                _removeEventListeners: function() {
                    d.a.ticker.remove(this._tickHandler)
                },
                _setupTimelines: function() {
                    this._timeline = d.a.timeline({
                        paused: !0,
                        onUpdate: this._updateRequestedHandler,
                        onComplete: this._timelineCompleteHandler
                    }), this._timeline.set(this._tweenObj, {
                        start: -.5 * Math.PI
                    }, 0), this._timeline.set(this._tweenObj, {
                        end: -.5 * Math.PI
                    }, 0), this._timeline.set(this._tweenObj, {
                        offset: 0
                    }, 0), this._timeline.to(this._tweenObj, {
                        duration: 2,
                        offset: 2 * Math.PI,
                        ease: "none"
                    }, 0), this._timeline.to(this._tweenObj, {
                        duration: 1,
                        end: 1.5 * Math.PI,
                        ease: "power1.inOut"
                    }, 0), this._timeline.to(this._tweenObj, {
                        duration: 2,
                        start: 1.5 * Math.PI,
                        ease: "power1.inOut"
                    }, 0)
                },
                _removeTimelines: function() {
                    this._timeline.kill()
                },
                _clear: function() {
                    this._context.clearRect(0, 0, this._size.width, this._size.height)
                },
                _draw: function() {
                    this._context.beginPath(), this._context.arc(.5 * this._size.width, .5 * this._size.width, .5 * this._size.width - 1, this._tweenObj.start + this._tweenObj.offset, this._tweenObj.end + this._tweenObj.offset), this._context.lineWidth = 1, this._context.strokeStyle = "#d2e191", this._context.stroke()
                },
                _tick: function() {
                    this._isUpdateRequested && (this._isUpdateRequested = !1, this._clear(), this._draw())
                },
                _requestHide: function() {
                    this._removeTimelines(), this._callbacks.hide && this._callbacks.hide.call(this)
                },
                _tickHandler: function() {
                    this._tick()
                },
                _updateRequestedHandler: function() {
                    this._isUpdateRequested = !0
                },
                _timelineCompleteHandler: function() {
                    if (this._isHideRequested) return this._isHideRequested = !1, void this._requestHide();
                    this._timeline.play(0)
                }
            }),
            oi = a.a.View.extend({
                ui: {
                    play: ".js-icon-play",
                    pause: ".js-icon-pause"
                },
                events: {
                    click: "_clickHandler",
                    mouseenter: "_mouseEnterHandler",
                    mouseleave: "_mouseLeaveHandler"
                },
                components: {
                    spinner: {
                        selector: ".js-spinner",
                        type: ai
                    }
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_backgroundSoundStateChangeHandler", "_spinnerHideCompleteHandler", "_tickHandler")
                },
                onInitialized: function() {
                    this._setupEventListeners(), this._setupTimelines(), this._setInitialStyles()
                },
                onClose: function() {
                    this._removeEventListeners(), this._removeTimelines()
                },
                show: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .6,
                        autoAlpha: 1,
                        ease: "sine.inOut"
                    }, 0), e
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .6,
                        autoAlpha: 0,
                        ease: "sine.out"
                    }, 0), e
                },
                _setupEventListeners: function() {
                    oe.addEventListener("stateChange", this._backgroundSoundStateChangeHandler), d.a.ticker.add(this._tickHandler)
                },
                _removeEventListeners: function() {
                    oe.removeEventListener("stateChange", this._backgroundSoundStateChangeHandler), d.a.ticker.remove(this._tickHandler)
                },
                _setupTimelines: function() {
                    this._timelines = {}, this._timelines.hover = d.a.timeline({
                        paused: !0
                    }), this._timelines.loading = d.a.timeline({
                        paused: !0
                    }), this._timelines.loading.call(this.components.spinner.hide, [this._spinnerHideCompleteHandler], 0), this._timelines.loading.to(this.ui.play, {
                        alpha: 1,
                        duration: .1
                    }, 0), this._timelines.play = d.a.timeline({
                        paused: !0,
                        onComplete: this._timelinePlayCompleteHandler
                    }), this._timelines.play.set(this.ui.pause, {
                        x: 15,
                        alpha: 0
                    }), this._timelines.play.to(this.ui.play, {
                        duration: .3,
                        x: -15,
                        ease: "power2.in"
                    }, 0), this._timelines.play.to(this.ui.play, {
                        duration: .3,
                        alpha: 0,
                        ease: "sine.out"
                    }, 0), this._timelines.play.to(this.ui.pause, {
                        duration: .3,
                        x: 0,
                        ease: "power2.out"
                    }, .3), this._timelines.play.to(this.ui.pause, {
                        duration: .3,
                        alpha: 1,
                        ease: "sine.inOut"
                    }, .3), this._timelines.muted = d.a.timeline({
                        paused: !0
                    })
                },
                _setInitialStyles: function() {
                    this.ui.pause.style.opacity = 0
                },
                _removeTimelines: function() {
                    this._timelines.playing.kill(), this._timelines.muted.kill()
                },
                _tracking: function() {
                    var e;
                    e = "Background/Sound/State/Paused" === oe.state ? "Pause" : "Play", c.a.trackEvent({
                        category: "Sound",
                        action: "Toggle",
                        label: e
                    })
                },
                _clickHandler: function() {
                    "Background/Sound/State/Initial" === oe.state && (oe.load(), this.components.spinner.show()), "Background/Sound/State/Playing" !== oe.state && "Background/Sound/State/Paused" !== oe.state || (oe.toggle(), this._tracking())
                },
                _mouseEnterHandler: function() {
                    this._timelines.hover.play()
                },
                _mouseLeaveHandler: function() {
                    this._timelines.hover.reverse()
                },
                _backgroundSoundStateChangeHandler: function(e) {
                    switch (e) {
                        case "Background/Sound/State/Loading":
                            this.components.spinner.show();
                            break;
                        case "Background/Sound/State/Loaded":
                            this._timelines.loading.play(0);
                            break;
                        case "Background/Sound/State/Playing":
                            this._timelines.play.play();
                            break;
                        case "Background/Sound/State/Paused":
                            this._timelines.play.reverse()
                    }
                },
                _spinnerHideCompleteHandler: function() {
                    this._timelines.play.play()
                },
                _tickHandler: function() {
                    "Background/Sound/State/Playing" === oe.state && this.components.spinner.progress(oe.progress)
                },
                _timelinePlayCompleteHandler: function() {
                    "Background/Sound/State/Loaded" === oe.state && oe.play()
                }
            }),
            ri = a.a.Component.extend({
                ui: {
                    line: ".js-line",
                    items: ".js-item"
                },
                events: {
                    mouseleave: "_mouseLeaveHandler"
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_resizeHandler", "_mouseLeaveHandler", "_itemMouseEnterHandler", "_itemMouseLeaveHandler")
                },
                onInitialized: function() {
                    this._setSize(), this._setInitialStyles(), this._setupEventListeners()
                },
                onClose: function() {
                    this._removeEventListeners()
                },
                show: function() {
                    var e = re.a.isMediaQueryActive("narrow") || re.a.isMediaQueryActive("extra-narrow") ? 1 : .4,
                        t = d.a.timeline();
                    return t.to(this.ui.items, {
                        duration: .6,
                        autoAlpha: e,
                        ease: "sine.inOut",
                        stagger: {
                            amount: .15
                        }
                    }, 0), t.to(this.ui.items, {
                        duration: .6,
                        x: 0,
                        ease: "power2.out",
                        stagger: {
                            amount: .15
                        }
                    }, 0), t.to(this.ui.line, {
                        duration: .4,
                        scaleX: .6,
                        x: 0,
                        ease: "power1.in"
                    }, 0), t.to(this.ui.line, {
                        duration: .6,
                        scaleX: .2,
                        ease: "power2.out"
                    }, .4), t
                },
                hide: function() {
                    var e = d.a.timeline();
                    return e.to(this.el, {
                        duration: .6,
                        autoAlpha: 0,
                        ease: "sine.out"
                    }, 0), e
                },
                _setupEventListeners: function() {
                    n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler);
                    var e, t, i = this.ui.items.length;
                    for (e = 0; e < i; e++)(t = this.ui.items[e]).addEventListener("mouseenter", this._itemMouseEnterHandler), t.addEventListener("mouseleave", this._itemMouseLeaveHandler)
                },
                _removeEventListeners: function() {
                    n.a.removeEventListener("resize", this._resizeHandler), n.a.removeEventListener("resize:complete", this._resizeHandler);
                    var e, t, i = this.ui.items.length;
                    for (e = 0; e < i; e++)(t = this.ui.items[e]).removeEventListener("mouseenter", this._itemMouseEnterHandler), t.removeEventListener("mouseleave", this._itemMouseLeaveHandler)
                },
                _setInitialStyles: function() {
                    var e, t = this.ui.items.length;
                    for (e = 0; e < t; e++) this.ui.items[e].style.transform = "matrix(1.0, 0.0, 0.0, 1.0, ".concat(30, ", 0)");
                    this.ui.line.style.transform = "matrix(0.0, 0.0, 0.0, 1.0, ".concat(this._size.width, ", 0)")
                },
                _createMouseEnterAnimation: function() {
                    this._mouseLeaveTl && this._mouseLeaveTl.kill(), this._mouseEnterTl = d.a.timeline()
                },
                _createMouseLeaveAnimation: function() {
                    this._mouseEnterTl && this._mouseEnterTl.kill(), this._mouseLeaveTl = d.a.timeline()
                },
                _setSize: function() {
                    this._size = {}, this._size.width = this.el.clientWidth, this._size.height = this.el.clientHeight, this._bounds = this.el.getBoundingClientRect()
                },
                _getItemIndex: function(e) {
                    for (var t = 0; t < this.ui.items.length; t++) {
                        if (this.ui.items[t] === e) return t
                    }
                    return 0
                },
                _mouseLeaveHandler: function() {
                    d.a.to(this.ui.line, {
                        duration: .4,
                        scaleX: .2,
                        x: 0,
                        ease: "sine.inOut"
                    })
                },
                _itemMouseEnterHandler: function(e) {
                    var t = this._getItemIndex(e.target);
                    d.a.to(this.ui.line, {
                        duration: .3,
                        scaleX: .3,
                        x: .3333 * this._size.width * t,
                        ease: "sine.inOut"
                    }), d.a.to(e.target, {
                        duration: .4,
                        alpha: 1,
                        ease: "sine.inOut"
                    })
                },
                _itemMouseLeaveHandler: function(e) {
                    d.a.to(e.target, {
                        duration: .4,
                        alpha: .4,
                        ease: "sine.inOut"
                    })
                },
                _resizeHandler: function() {
                    this._setSize()
                }
            }),
            li = a.a.View.extend({
                components: {
                    buttonSound: {
                        selector: ".js-button-sound",
                        type: oi
                    },
                    listSocial: {
                        selector: ".js-list-social",
                        type: ri
                    }
                },
                show: function() {
                    var e = d.a.timeline();
                    return e.add(this.components.listSocial.show(), .5), e.add(this.components.buttonSound.show(), .2), e
                },
                hide: function() {
                    return d.a.timeline()
                }
            });
        i(165), i(166), i(167), i(168);

        function ui(e) {
            var t = e.fov,
                i = e.position,
                n = e.aspect,
                s = Math.abs(i.z * Math.tan(.5 * (t / 180 * Math.PI)) * 2);
            return {
                width: s * n,
                height: s
            }
        }

        function hi(e, t) {
            var i = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), i.push.apply(i, n)
            }
            return i
        }

        function ci(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = null != arguments[t] ? arguments[t] : {};
                t % 2 ? hi(Object(i), !0).forEach((function(t) {
                    di(e, t, i[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : hi(Object(i)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
                }))
            }
            return e
        }

        function di(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }
        var pi = a.a.View.extend({
            initialize: function() {
                Object(H.bindAll)(this, "_tickHandler", "_resizeHandler")
            },
            setup: function() {
                this._setupWebGL(), this._setupEventListeners()
            },
            onClose: function() {
                this._removeWebGL(), this._removeEventListeners()
            },
            _setupWebGL: function() {
                fe.a.setup(), jt.setup(), Tt.setup({
                    canvas: this.el,
                    antialias: !1,
                    stencil: !1,
                    preserveDrawingBuffer: !1,
                    alpha: !1
                }), this._setSize()
            },
            _removeWebGL: function() {},
            _setupEventListeners: function() {
                d.a.ticker.add(this._tickHandler), n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler)
            },
            _removeEventListeners: function() {
                d.a.ticker.remove(this._tickHandler), n.a.removeEventListener("resize", this._resizeHandler), n.a.removeEventListener("resize:complete", this._resizeHandler)
            },
            _setSize: function() {
                this._isNarrow = re.a.isMediaQueryActive("narrow") || re.a.isMediaQueryActive("extra-narrow");
                var e = n.a.viewportWidth,
                    t = n.a.viewportHeight;
                Tt.size = {
                    width: e,
                    height: t
                }, fe.a.size = {
                    width: e,
                    height: t
                }, jt.size = {
                    width: e,
                    height: t
                }, this._setLandingHeadingScale(), this._setTilesScale()
            },
            _setLandingHeadingScale: function() {
                var e = ui(ci({}, fe.a.camera, {
                        position: {
                            z: 3.4
                        }
                    })),
                    t = this._isNarrow ? 40 : 80,
                    i = (n.a.viewportWidth - 2 * t) / n.a.viewportWidth,
                    s = e.width * i;
                P.state.scale = X(s, 0, 2.875), P.state.position.y = this._isNarrow ? .6 : .25
            },
            _setTilesScale: function() {
                var e = ui(ci({}, fe.a.camera, {
                        position: {
                            z: 1.7
                        }
                    })),
                    t = this._isNarrow ? 40 : 80,
                    i = (n.a.viewportWidth - 2 * t) / n.a.viewportWidth,
                    s = e.width * i;
                E.state.scale = X(s, 0, 1)
            },
            _tickHandler: function() {
                fe.a.update(), jt.update(), Tt.update(), Tt.render()
            },
            _resizeHandler: function() {
                this._setSize()
            }
        });

        function mi(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var _i = function() {
            function e(t) {
                var i = t.scale;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._scale = i, this._uniforms = {
                    uTexture: {
                        type: "sampler2D",
                        value: $t.state.texture
                    },
                    uOpacity: {
                        type: "float",
                        value: $t.state.opacity
                    },
                    uScale: {
                        type: "float",
                        value: $t.state.scale
                    },
                    uLimit: {
                        type: "float",
                        value: $t.state.limit
                    },
                    uIntensity: {
                        type: "float",
                        value: $t.state.intensity
                    },
                    uDistance: {
                        type: "float",
                        value: $t.state.distance
                    }
                };
                var n = new ve.PlaneGeometry(1, 1, 6, 6),
                    s = new ve.ShaderMaterial({
                        uniforms: this._uniforms,
                        fragmentShader: "\n    uniform sampler2D uTexture;\n    uniform float uOpacity;\n\n    varying vec2 vUv;\n\n    void main() {\n        vec4 texture = texture2D(uTexture, vUv);\n        gl_FragColor = vec4(texture.xyz, uOpacity);\n    }\n",
                        vertexShader: "\n    #define PI 3.1415926538\n\n    uniform float uScale;\n    uniform float uDistance;\n    uniform float uIntensity;\n    uniform float uLimit;\n\n    varying vec2 vUv;\n\n    void main() {\n        vUv = uv;\n\n        float offset = uLimit * uIntensity;\n\n        vec3 normalized = vec3((position + 0.5));\n        vec3 scaled = vec3(position);\n        vec3 displaced = vec3(sin(normalized * PI) * (offset * 0.5));\n\n        vec4 modelViewPosition = modelViewMatrix * vec4(scaled.x, scaled.y, (offset * uScale) - (displaced.x * uScale) - (displaced.y * uScale), uDistance);\n        gl_Position = projectionMatrix * modelViewPosition;\n    }\n",
                        wireframe: !1,
                        transparent: !0
                    });
                this._mesh = new ve.Mesh(n, s), this._mesh.scale.x = this._scale.x * $t.state.width, this._mesh.scale.y = this._scale.y * $t.state.height
            }
            var t, i, n;
            return t = e, (i = [{
                key: "setScale",
                value: function(e) {
                    this._scale = e
                }
            }, {
                key: "update",
                value: function() {
                    this._mesh.scale.x = this._scale.x * $t.state.width, this._mesh.scale.y = this._scale.y * $t.state.height, this._uniforms.uTexture.value = $t.state.texture, this._uniforms.uOpacity.value = $t.state.opacity, this._uniforms.uScale.value = $t.state.scale, this._uniforms.uLimit.value = $t.state.limit, this._uniforms.uIntensity.value = $t.state.intensity, this._uniforms.uDistance.value = $t.state.distance
                }
            }, {
                key: "mesh",
                get: function() {
                    return this._mesh
                }
            }]) && mi(t.prototype, i), n && mi(t, n), e
        }();

        function fi(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function vi(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var gi = new(function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                    fov: 45,
                    aspect: 1,
                    near: .1,
                    far: 100
                };
                fi(this, e), this._camera = new ve.PerspectiveCamera(t.fov, t.aspect, t.near, t.far), this._camera.position.z = 5
            }
            var t, i, n;
            return t = e, (i = [{
                key: "setSize",
                value: function(e, t) {
                    this._camera.aspect = e / t, this._camera.updateProjectionMatrix()
                }
            }, {
                key: "update",
                value: function() {}
            }, {
                key: "camera",
                get: function() {
                    return this._camera
                }
            }]) && vi(t.prototype, i), n && vi(t, n), e
        }());

        function yi(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var wi = new(function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._scene = new ve.Scene, this._setupComponents()
            }
            var t, i, n;
            return t = e, (i = [{
                key: "setSize",
                value: function(e, t) {
                    var i = ui(gi.camera);
                    this._components.overlay.setScale({
                        x: i.width / e,
                        y: i.height / t
                    })
                }
            }, {
                key: "update",
                value: function() {
                    this._components.overlay.update()
                }
            }, {
                key: "_setupComponents",
                value: function() {
                    this._components = {}, this._components.overlay = new _i({
                        scale: {
                            x: 1,
                            y: 1
                        }
                    }), this._scene.add(this._components.overlay.mesh)
                }
            }, {
                key: "scene",
                get: function() {
                    return this._scene
                }
            }]) && yi(t.prototype, i), n && yi(t, n), e
        }());

        function bi(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function xi(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var ki = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    bi(this, e), this._renderer = new ve.WebGLRenderer(t), this._renderer.debug.checkShaderErrors = Pt.a.isLocal()
                }
                var t, i, n;
                return t = e, (i = [{
                    key: "setSize",
                    value: function(e, t) {
                        this._renderer.setSize(e, t)
                    }
                }, {
                    key: "setScale",
                    value: function(e) {
                        this._renderer.setPixelRatio(e)
                    }
                }, {
                    key: "render",
                    value: function() {
                        this._renderer.render(wi.scene, gi.camera)
                    }
                }, {
                    key: "dispose",
                    value: function() {
                        this._renderer.dispose()
                    }
                }]) && xi(t.prototype, i), n && xi(t, n), e
            }(),
            Si = a.a.Component.extend({
                initialize: function() {
                    Object(H.bindAll)(this, "_resizeHandler", "_tickHandler")
                },
                onInitialized: function() {
                    this._setupWebGL(), this._setSize(), this._setupEventListeners()
                },
                _setupEventListeners: function() {
                    d.a.ticker.add(this._tickHandler), n.a.addEventListener("resize", this._resizeHandler), n.a.addEventListener("resize:complete", this._resizeHandler)
                },
                _setupWebGL: function() {
                    this._renderer = new ki({
                        canvas: this.el,
                        antialias: !1,
                        stencil: !1,
                        preserveDrawingBuffer: !0,
                        alpha: !0
                    })
                },
                _setSize: function() {
                    var e = n.a.viewportWidth,
                        t = n.a.viewportHeight;
                    this._renderer.setSize(e, t), this._renderer.setScale(1), gi.setSize(e, t), wi.setSize(e, t)
                },
                _update: function() {
                    wi.update(), gi.update()
                },
                _render: function() {
                    this._renderer.render(wi.scene, gi.camera)
                },
                _resizeHandler: function() {
                    this._setSize(), this._update(), this._render()
                },
                _tickHandler: function() {
                    this._previousOpacity && (this._update(), this._render()), this._previousOpacity = $t.state.opacity
                }
            });

        function zi(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function Hi(e, t, i) {
            return t && zi(e.prototype, t), i && zi(e, i), e
        }
        var Li = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._loader = new ve.TextureLoader, this._callbacks = {}
            }
            return Hi(e, [{
                key: "onLoaded",
                set: function(e) {
                    this._callbacks.onLoaded = e
                }
            }, {
                key: "onFailed",
                set: function(e) {
                    this._callbacks.onFailed = e
                }
            }]), Hi(e, [{
                key: "isSupported",
                value: function() {
                    return !0
                }
            }, {
                key: "load",
                value: function(e) {
                    this._loader.load(e, this.loaded.bind(this), null, this.failed.bind(this))
                }
            }, {
                key: "loaded",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._callbacks.onLoaded && this._callbacks.onLoaded(e)
                }
            }, {
                key: "failed",
                value: function(e) {
                    this._callbacks.onFailed && this._callbacks.onFailed()
                }
            }]), e
        }();

        function Ci(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function Ei(e, t, i) {
            return t && Ci(e.prototype, t), i && Ci(e, i), e
        }
        var Oi = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._callbacks = {}
                }
                return Ei(e, [{
                    key: "onLoaded",
                    set: function(e) {
                        this._callbacks.onLoaded = e
                    }
                }, {
                    key: "onFailed",
                    set: function(e) {
                        this._callbacks.onFailed = e
                    }
                }]), Ei(e, [{
                    key: "isSupported",
                    value: function() {
                        return !0
                    }
                }, {
                    key: "load",
                    value: function(e) {
                        e.fetch({
                            success: this.loaded.bind(this),
                            error: this.failed.bind(this)
                        })
                    }
                }, {
                    key: "loaded",
                    value: function(e) {
                        this._callbacks.onLoaded && this._callbacks.onLoaded(e)
                    }
                }, {
                    key: "failed",
                    value: function(e) {
                        this._callbacks.onFailed && this._callbacks.onFailed(e)
                    }
                }]), e
            }(),
            Pi = i(127),
            Mi = i(129),
            Ti = i.n(Mi);

        function Ii(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function ji(e, t, i) {
            return t && Ii(e.prototype, t), i && Ii(e, i), e
        }
        var Di = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._onLoaded = null, this._onFailed = null, this._font = null, this._fontLoadSuccessHandler = this._fontLoadSuccessHandler.bind(this), this._fontLoadErrorHandler = this._fontLoadErrorHandler.bind(this)
                }
                return ji(e, [{
                    key: "onLoaded",
                    set: function(e) {
                        this._onLoaded = e
                    }
                }, {
                    key: "onFailed",
                    set: function(e) {
                        this._onFailed = e
                    }
                }]), ji(e, [{
                    key: "isSupported",
                    value: function() {
                        return !0
                    }
                }, {
                    key: "load",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        this._source = e, this._font = new Ti.a(e, t), this._font.load().then(this._fontLoadSuccessHandler).catch(this._fontLoadErrorHandler)
                    }
                }, {
                    key: "_fontLoadSuccessHandler",
                    value: function() {
                        this._onLoaded(this._font)
                    }
                }, {
                    key: "_fontLoadErrorHandler",
                    value: function(e) {
                        this._onFailed(e)
                    }
                }]), e
            }(),
            Ai = i(130);

        function Ri(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function Ui(e, t, i) {
            return t && Ri(e.prototype, t), i && Ri(e, i), e
        }
        var Fi = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._callbacks = {}
                }
                return Ui(e, [{
                    key: "onLoaded",
                    set: function(e) {
                        this._callbacks.onLoaded = e
                    }
                }, {
                    key: "onFailed",
                    set: function(e) {
                        this._callbacks.onFailed = e
                    }
                }]), Ui(e, [{
                    key: "isSupported",
                    value: function() {
                        return !0
                    }
                }, {
                    key: "load",
                    value: function(e) {
                        (new Ai.a).setDataType(ve.UnsignedByteType).load(e, this.loaded.bind(this), null, this.failed.bind(this))
                    }
                }, {
                    key: "loaded",
                    value: function(e) {
                        this._callbacks.onLoaded && this._callbacks.onLoaded(e)
                    }
                }, {
                    key: "failed",
                    value: function() {
                        this._callbacks.onFailed && this._callbacks.onFailed()
                    }
                }]), e
            }(),
            Bi = a.a.LayoutView.extend({
                regions: {
                    main: ".js-region-main",
                    overlay: ".js-region-overlay"
                },
                ui: {},
                events: {
                    'click a[href^="/"]:not(.prevent-default)': "_globalClickHandler",
                    "click [data-measure]": "_analyticsClickHandler"
                },
                components: {
                    background: {
                        selector: ".js-background",
                        type: pi
                    },
                    header: {
                        selector: ".js-header",
                        type: si
                    },
                    footer: {
                        selector: ".js-footer",
                        type: li
                    },
                    overlay: {
                        selector: ".js-foreground",
                        type: Si
                    }
                },
                initialize: function() {
                    Object(H.bindAll)(this, "_queueInitialStateChangeHandler", "_queueMainStateChangeHandler", "_applicationStoreChangeHandler")
                },
                onInitialized: function() {
                    this._setupTracking(), this._setupQueues(), this._setupEventListeners(), this._setupTimelines(), this._queues.initial.load()
                },
                _setupTracking: function() {
                    c.a.debug = !0, c.a.ua = "UA-156564171-1"
                },
                _setupQueues: function() {
                    this._queues = {}, this._queues.initial = new K.a.queue([{
                        id: "texture-character",
                        source: "assets/textures/texture-character.jpg",
                        loader: Li
                    }, {
                        id: "font-brown-bold",
                        source: "Brown",
                        loader: Di,
                        options: {
                            weight: 700,
                            style: "normal"
                        }
                    }, {
                        id: "font-us-blaak-bold",
                        source: "US Blaak",
                        loader: Di,
                        options: {
                            weight: 700
                        }
                    }, {
                        id: "font-ge-inspira-sans-bold",
                        source: "GE Inspira Sans",
                        loader: Di,
                        options: {
                            weight: 700,
                            style: "normal"
                        }
                    }]), this._queues.main = new K.a.queue([{
                        id: "collection-timeline-groups",
                        source: qt,
                        loader: Oi
                    }, {
                        id: "collection-timeline-posts",
                        source: r,
                        loader: Oi
                    }, {
                        id: "texture-landing-heading",
                        source: "assets/textures/texture-landing-heading.jpg",
                        loader: Li
                    }, {
                        id: "texture-enviroment",
                        source: "assets/textures/texture-enviroment.hdr",
                        loader: Fi
                    }, {
                        id: "texture-rock",
                        source: "assets/textures/texture-rock.jpg",
                        loader: Li
                    }, {
                        id: "texture-rock-normals",
                        source: "assets/textures/texture-rock-normals.jpg",
                        loader: Li
                    }, {
                        id: "texture-greta-ao",
                        source: "assets/textures/texture-greta-ao.jpg",
                        loader: Li
                    }, {
                        id: "fog-particle",
                        source: "assets/textures/fog-particle.png",
                        loader: Li
                    }, {
                        id: "model-experience",
                        source: "assets/models/model-experience.glb",
                        loader: Pi.a
                    }]), h.models.forEach(function(e) {
                        "video" === e.get("type") ? this._queues.main.add({
                            id: e.get("video").poster,
                            source: e.get("video").poster,
                            loader: Li
                        }) : "link" === e.get("type") && this._queues.main.add({
                            id: e.get("image").src,
                            source: e.get("image").src,
                            loader: Li
                        })
                    }.bind(this))
                },
                _setupEventListeners: function() {
                    this._queues.initial.addEventListener("stateChange", this._queueInitialStateChangeHandler), this._queues.main.addEventListener("stateChange", this._queueMainStateChangeHandler), J.addEventListener("change", this._applicationStoreChangeHandler)
                },
                _removeEventListeners: function() {
                    this._queues.initial.removeEventListener("stateChange", this._queueInitialStateChangeHandler), this._queues.main.removeEventListener("stateChange", this._queueMainStateChangeHandler)
                },
                _setupTimelines: function() {
                    this._timelines = {}, this._timelines.show = d.a.timeline({
                        paused: !0
                    }), this._timelines.show.add(this.components.header.show(), .6), this._timelines.hide = d.a.timeline({
                        paused: !0
                    }), this._timelines.hide.add(this.components.header.hide(), 0), this._timelines.hide.add(this.components.footer.hide(), 0)
                },
                _removeTimelines: function() {
                    this._timelineShow.kill(), this._timelineHide.kill()
                },
                _queueInitialStateChangeHandler: function(e) {
                    e === Z.a.COMPLETED && (a.a.RegionManager.get("main").show(ii), this.components.background.setup(), b.state = {
                        scene: "Background/Scene/Intro",
                        PRELOADER_INITIAL_LOADED: "Preloader/Initial/Loaded"
                    }, this._queues.main.load(), this._timelines.show.play())
                },
                _queueMainStateChangeHandler: function(e) {
                    e === Z.a.COMPLETED && (b.state = {
                        preloader: "Preloader/Main/Loaded"
                    }, a.a.history.start({
                        pushState: !0
                    }))
                },
                _globalClickHandler: function(e) {
                    e.preventDefault(), a.a.history.loadUrl(e.delegateTarget.pathname, {
                        trigger: !0
                    })
                },
                _applicationStoreChangeHandler: function() {
                    J.state.isPermissionsTransitionedIn && !this._isFooterTransitionedIn && (this._isFooterTransitionedIn = !0, this.components.footer.show())
                },
                _analyticsClickHandler: function(e) {
                    c.a.trackButton(e.delegateTarget)
                }
            }),
            Gi = i(78);
        n.a.remBase = 16;
        Gi.b;
        var Vi = a.a.createNameSpace("com.gretathunberg");
        Vi.applicationRouter = new ti, Vi.applicationView = new Bi({
            el: document.getElementById("application")
        })
    },
    37: function(e, t, i) {
        "use strict";
        i.d(t, "a", (function() {
            return a
        }));
        var n = i(9),
            s = i(6),
            a = new n.a({
                type: "main"
            });
        ! function() {
            if (s.a.gui) {
                var e = s.a.gui.addFolder("Camera");
                e.open(), e.add(a.state, "type", {
                    main: "main",
                    debug: "debug"
                }).listen()
            }
        }()
    },
    4: function(e, t, i) {
        "use strict";
        i.d(t, "a", (function() {
            return a
        }));
        var n = i(9),
            s = (i(59), i(6)),
            a = new n.a({
                opacity: 0,
                scale: 1,
                offset: 0,
                smoothing: .05,
                world: {
                    progress: 0,
                    scale: .4
                },
                interaction: {
                    intensity: .05,
                    x: 0,
                    y: 0
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                target: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            });
        ! function() {
            if (s.a.gui) {
                var e = s.a.gui.addFolder("Landing");
                e.add(a.state, "scale", 0, 5, .1), e.add(a.state, "offset", -5, 5, .1);
                var t = e.addFolder("rotation");
                t.add(a.state.rotation, "x", 0, 2 * Math.PI, .1), t.add(a.state.rotation, "y", 0, 2 * Math.PI, .1), t.add(a.state.rotation, "z", 0, 2 * Math.PI, .1);
                var i = e.addFolder("position");
                i.add(a.state.position, "x", -50, 50, .1), i.add(a.state.position, "y", 0, 50, .1), i.add(a.state.position, "z", 0, 50, .1);
                var n = e.addFolder("target");
                n.add(a.state.target, "x", 0, 50, .1), n.add(a.state.target, "y", -5, 50, .1), n.add(a.state.target, "z", 0, 50, .1)
            }
        }()
    },
    6: function(e, t, i) {
        "use strict";
        i.d(t, "a", (function() {
            return a
        }));
        var n = i(59),
            s = i(171);
        var a = new function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.gui = null, s.a.isLocal() && (this.gui = new n.a)
        }
    },
    8: function(e, t, i) {
        "use strict";
        (function(e) {
            i.d(t, "a", (function() {
                return r
            }));
            var n = i(0),
                s = i(4),
                a = i(37);
            i(6);

            function o(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            e.THREE = n, i(157);
            var r = new(function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._cameraMainTarget = new n.Vector3(0, 0, 0)
                }
                var t, i, r;
                return t = e, (i = [{
                    key: "setup",
                    value: function() {
                        this._setupCameraMain.apply(this, arguments), this._setupCameraDebug.apply(this, arguments)
                    }
                }, {
                    key: "update",
                    value: function() {
                        this._updateCameraMain(), this._updateCameraDebug()
                    }
                }, {
                    key: "_setupCameraMain",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                            fov: 45,
                            aspect: 1,
                            near: .1,
                            far: 40
                        };
                        this._cameraMain = new n.PerspectiveCamera(e.fov, e.aspect, e.near, e.far)
                    }
                }, {
                    key: "_setupCameraDebug",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                            fov: 45,
                            aspect: 1,
                            near: .1,
                            far: 100
                        };
                        this._cameraDebug = new n.PerspectiveCamera(e.fov, e.aspect, e.near, e.far), this._cameraDebug.position.x = s.a.state.position.x, this._cameraDebug.position.y = s.a.state.position.y, this._cameraDebug.position.z = s.a.state.position.z;
                        var t = document.getElementById("application");
                        this._controls = new n.OrbitControls(this._cameraDebug, t)
                    }
                }, {
                    key: "_updateCameraMain",
                    value: function() {
                        "main" === a.a.state.type && (this._updateCameraMainPosition(s.a.state.position) || this._updateCameraMainTargetPosition(s.a.state.target)) && this._cameraMain.lookAt(this._cameraMainTarget)
                    }
                }, {
                    key: "_updateCameraMainPosition",
                    value: function(e) {
                        var t = e.x,
                            i = e.y,
                            n = e.z;
                        return (this._prevX !== t || this._prevY !== i || this._prevZ !== n) && (this._prevX = t, this._prevY = i, this._prevZ = n, this._cameraMain.position.x = t, this._cameraMain.position.y = i, this._cameraMain.position.z = n, !0)
                    }
                }, {
                    key: "_updateCameraMainTargetPosition",
                    value: function(e) {
                        var t = e.x,
                            i = e.y,
                            n = e.z;
                        return (this._prevTargetX !== t || this._prevTargetY !== i || this._prevTargetZ !== n) && (this._prevTargetX = t, this._prevTargetY = i, this._prevTargetZ = n, this._cameraMainTarget.x = t, this._cameraMainTarget.y = i, this._cameraMainTarget.z = n, !0)
                    }
                }, {
                    key: "_updateCameraDebug",
                    value: function() {
                        this._controls.enabled = "debug" === a.a.state.type, "debug" === a.a.state.type && this._controls.update()
                    }
                }, {
                    key: "camera",
                    get: function() {
                        return "debug" === a.a.state.type ? this._cameraDebug : this._cameraMain
                    }
                }, {
                    key: "size",
                    set: function(e) {
                        this._size = e, this._cameraMain.aspect = this._size.width / this._size.height, this._cameraMain.updateProjectionMatrix(), this._cameraDebug.aspect = this._size.width / this._size.height, this._cameraDebug.updateProjectionMatrix()
                    }
                }]) && o(t.prototype, i), r && o(t, r), e
            }())
        }).call(this, i(27))
    },
    9: function(e, t, i) {
        "use strict";
        i(99);

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function s(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var a = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                n(this, e), this._state = t
            }
            var t, i, a;
            return t = e, (i = [{
                key: "state",
                get: function() {
                    return this._state
                },
                set: function(e) {
                    this._state = Object.assign({}, this._state, e)
                }
            }]) && s(t.prototype, i), a && s(t, a), e
        }();
        t.a = a
    }
});