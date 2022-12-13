!function(t) {
    function i(r) {
        if (e[r])
            return e[r].exports;
        var o = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, i),
        o.l = !0,
        o.exports
    }
    var e = {};
    i.m = t,
    i.c = e,
    i.d = function(t, e, r) {
        i.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }
    ,
    i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return i.d(e, "a", e),
        e
    }
    ,
    i.o = function(t, i) {
        return Object.prototype.hasOwnProperty.call(t, i)
    }
    ,
    i.p = "",
    i(i.s = 4)
}([function(t, i, e) {
    "use strict";
    function r() {
        this.live2DModel = null,
        this.modelMatrix = null,
        this.eyeBlink = null,
        this.physics = null,
        this.pose = null,
        this.debugMode = !1,
        this.initialized = !1,
        this.updating = !1,
        this.alpha = 1,
        this.accAlpha = 0,
        this.lipSync = !1,
        this.lipSyncValue = 0,
        this.accelX = 0,
        this.accelY = 0,
        this.accelZ = 0,
        this.dragX = 0,
        this.dragY = 0,
        this.startTimeMSec = null,
        this.mainMotionManager = new l,
        this.expressionManager = new l,
        this.motions = {},
        this.expressions = {},
        this.isTexLoaded = !1
    }
    function o() {
        AMotion.prototype.constructor.call(this),
        this.paramList = []
    }
    function s() {
        this.id = "",
        this.type = -1,
        this.value = null
    }
    function n() {
        this.nextBlinkTime = null,
        this.stateStartTime = null,
        this.blinkIntervalMsec = null,
        this.eyeState = g.STATE_FIRST,
        this.blinkIntervalMsec = 4e3,
        this.closingMotionMsec = 100,
        this.closedMotionMsec = 50,
        this.openingMotionMsec = 150,
        this.closeIfZero = !0,
        this.eyeID_L = "PARAM_EYE_L_OPEN",
        this.eyeID_R = "PARAM_EYE_R_OPEN"
    }
    function a() {
        this.tr = new Float32Array(16),
        this.identity()
    }
    function h(t, i) {
        a.prototype.constructor.call(this),
        this.width = t,
        this.height = i
    }
    function l() {
        MotionQueueManager.prototype.constructor.call(this),
        this.currentPriority = null,
        this.reservePriority = null,
        this.super = MotionQueueManager.prototype
    }
    function u() {
        this.physicsList = [],
        this.startTimeMSec = UtSystem.getUserTimeMSec()
    }
    function p() {
        this.lastTime = 0,
        this.lastModel = null,
        this.partsGroups = []
    }
    function f(t) {
        this.paramIndex = -1,
        this.partsIndex = -1,
        this.link = null,
        this.id = t
    }
    function c() {
        this.EPSILON = .01,
        this.faceTargetX = 0,
        this.faceTargetY = 0,
        this.faceX = 0,
        this.faceY = 0,
        this.faceVX = 0,
        this.faceVY = 0,
        this.lastTimeSec = 0
    }
    function $() {
        a.prototype.constructor.call(this),
        this.screenLeft = null,
        this.screenRight = null,
        this.screenTop = null,
        this.screenBottom = null,
        this.maxLeft = null,
        this.maxRight = null,
        this.maxTop = null,
        this.maxBottom = null,
        this.max = Number.MAX_VALUE,
        this.min = 0
    }
    function _() {}
    var d = 0;
    r.prototype.getModelMatrix = function() {
        return this.modelMatrix
    }
    ,
    r.prototype.setAlpha = function(t) {
        t > .999 && (t = 1),
        t < .001 && (t = 0),
        this.alpha = t
    }
    ,
    r.prototype.getAlpha = function() {
        return this.alpha
    }
    ,
    r.prototype.isInitialized = function() {
        return this.initialized
    }
    ,
    r.prototype.setInitialized = function(t) {
        this.initialized = t
    }
    ,
    r.prototype.isUpdating = function() {
        return this.updating
    }
    ,
    r.prototype.setUpdating = function(t) {
        this.updating = t
    }
    ,
    r.prototype.getLive2DModel = function() {
        return this.live2DModel
    }
    ,
    r.prototype.setLipSync = function(t) {
        this.lipSync = t
    }
    ,
    r.prototype.setLipSyncValue = function(t) {
        this.lipSyncValue = t
    }
    ,
    r.prototype.setAccel = function(t, i, e) {
        this.accelX = t,
        this.accelY = i,
        this.accelZ = e
    }
    ,
    r.prototype.setDrag = function(t, i) {
        this.dragX = t,
        this.dragY = i
    }
    ,
    r.prototype.getMainMotionManager = function() {
        return this.mainMotionManager
    }
    ,
    r.prototype.getExpressionManager = function() {
        return this.expressionManager
    }
    ,
    r.prototype.loadModelData = function(t, i) {
        var e = _.getPlatformManager();
        this.debugMode && e.log("Load model : " + t);
        var r = this;
        e.loadLive2DModel(t, function(t) {
            if (r.live2DModel = t,
            r.live2DModel.saveParam(),
            0 != Live2D.getError())
                return void console.error("Error : Failed to loadModelData().");
            r.modelMatrix = new h(r.live2DModel.getCanvasWidth(),r.live2DModel.getCanvasHeight()),
            r.modelMatrix.setWidth(2),
            r.modelMatrix.setCenterPosition(0, 0),
            i(r.live2DModel)
        })
    }
    ,
    r.prototype.loadTexture = function(t, i, e) {
        d++;
        var r = _.getPlatformManager();
        this.debugMode && r.log("Load Texture : " + i);
        var o = this;
        r.loadTexture(this.live2DModel, t, i, function() {
            0 == --d && (o.isTexLoaded = !0),
            "function" == typeof e && e()
        })
    }
    ,
    r.prototype.loadMotion = function(t, i, e) {
        var r = _.getPlatformManager();
        this.debugMode && r.log("Load Motion : " + i);
        var o = null
          , s = this;
        r.loadBytes(i, function(i) {
            o = Live2DMotion.loadMotion(i),
            null != t && (s.motions[t] = o),
            e(o)
        })
    }
    ,
    r.prototype.loadExpression = function(t, i, e) {
        var r = _.getPlatformManager();
        this.debugMode && r.log("Load Expression : " + i);
        var s = this;
        r.loadBytes(i, function(i) {
            null != t && (s.expressions[t] = o.loadJson(i)),
            "function" == typeof e && e()
        })
    }
    ,
    r.prototype.loadPose = function(t, i) {
        var e = _.getPlatformManager();
        this.debugMode && e.log("Load Pose : " + t);
        var r = this;
        try {
            e.loadBytes(t, function(t) {
                r.pose = p.load(t),
                "function" == typeof i && i()
            })
        } catch (o) {
            console.warn(o)
        }
    }
    ,
    r.prototype.loadPhysics = function(t) {
        var i = _.getPlatformManager();
        this.debugMode && i.log("Load Physics : " + t);
        var e = this;
        try {
            i.loadBytes(t, function(t) {
                e.physics = u.load(t)
            })
        } catch (r) {
            console.warn(r)
        }
    }
    ,
    r.prototype.hitTestSimple = function(t, i, e) {
        if (null === this.live2DModel)
            return !1;
        var r = this.live2DModel.getDrawDataIndex(t);
        if (r < 0)
            return !1;
        for (var o = this.live2DModel.getTransformedPoints(r), s = this.live2DModel.getCanvasWidth(), n = 0, a = this.live2DModel.getCanvasHeight(), h = 0, l = 0; l < o.length; l += 2) {
            var u = o[l]
              , p = o[l + 1];
            u < s && (s = u),
            u > n && (n = u),
            p < a && (a = p),
            p > h && (h = p)
        }
        var f = this.modelMatrix.invertTransformX(i)
          , c = this.modelMatrix.invertTransformY(e);
        return s <= f && f <= n && a <= c && c <= h
    }
    ,
    r.prototype.hitTestSimpleCustom = function(t, i, e, r) {
        return null !== this.live2DModel && e >= t[0] && e <= i[0] && r <= t[1] && r >= i[1]
    }
    ,
    o.prototype = new AMotion,
    o.EXPRESSION_DEFAULT = "DEFAULT",
    o.TYPE_SET = 0,
    o.TYPE_ADD = 1,
    o.TYPE_MULT = 2,
    o.loadJson = function(t) {
        var i = new o
          , e = _.getPlatformManager().jsonParseFromBytes(t);
        if (i.setFadeIn(parseInt(e.fade_in) > 0 ? parseInt(e.fade_in) : 1e3),
        i.setFadeOut(parseInt(e.fade_out) > 0 ? parseInt(e.fade_out) : 1e3),
        null == e.params)
            return i;
        var r = e.params
          , n = r.length;
        i.paramList = [];
        for (var a = 0; a < n; a++) {
            var h = r[a]
              , l = h.id.toString()
              , u = parseFloat(h.val)
              , p = o.TYPE_ADD
              , f = null != h.calc ? h.calc.toString() : "add";
            if ((p = "add" === f ? o.TYPE_ADD : "mult" === f ? o.TYPE_MULT : "set" === f ? o.TYPE_SET : o.TYPE_ADD) == o.TYPE_ADD) {
                var c = null == h.def ? 0 : parseFloat(h.def);
                u -= c
            } else if (p == o.TYPE_MULT) {
                var c = null == h.def ? 1 : parseFloat(h.def);
                0 == c && (c = 1),
                u /= c
            }
            var $ = new s;
            $.id = l,
            $.type = p,
            $.value = u,
            i.paramList.push($)
        }
        return i
    }
    ,
    o.prototype.updateParamExe = function(t, i, e, r) {
        for (var s = this.paramList.length - 1; s >= 0; --s) {
            var n = this.paramList[s];
            n.type == o.TYPE_ADD ? t.addToParamFloat(n.id, n.value, e) : n.type == o.TYPE_MULT ? t.multParamFloat(n.id, n.value, e) : n.type == o.TYPE_SET && t.setParamFloat(n.id, n.value, e)
        }
    }
    ,
    n.prototype.calcNextBlink = function() {
        return UtSystem.getUserTimeMSec() + Math.random() * (2 * this.blinkIntervalMsec - 1)
    }
    ,
    n.prototype.setInterval = function(t) {
        this.blinkIntervalMsec = t
    }
    ,
    n.prototype.setEyeMotion = function(t, i, e) {
        this.closingMotionMsec = t,
        this.closedMotionMsec = i,
        this.openingMotionMsec = e
    }
    ,
    n.prototype.updateParam = function(t) {
        var i, e = UtSystem.getUserTimeMSec(), r = 0;
        switch (this.eyeState) {
        case g.STATE_CLOSING:
            (r = (e - this.stateStartTime) / this.closingMotionMsec) >= 1 && (r = 1,
            this.eyeState = g.STATE_CLOSED,
            this.stateStartTime = e),
            i = 1 - r;
            break;
        case g.STATE_CLOSED:
            (r = (e - this.stateStartTime) / this.closedMotionMsec) >= 1 && (this.eyeState = g.STATE_OPENING,
            this.stateStartTime = e),
            i = 0;
            break;
        case g.STATE_OPENING:
            (r = (e - this.stateStartTime) / this.openingMotionMsec) >= 1 && (r = 1,
            this.eyeState = g.STATE_INTERVAL,
            this.nextBlinkTime = this.calcNextBlink()),
            i = r;
            break;
        case g.STATE_INTERVAL:
            this.nextBlinkTime < e && (this.eyeState = g.STATE_CLOSING,
            this.stateStartTime = e),
            i = 1;
            break;
        case g.STATE_FIRST:
        default:
            this.eyeState = g.STATE_INTERVAL,
            this.nextBlinkTime = this.calcNextBlink(),
            i = 1
        }
        this.closeIfZero || (i = -i),
        t.setParamFloat(this.eyeID_L, i),
        t.setParamFloat(this.eyeID_R, i)
    }
    ;
    var g = function() {};
    g.STATE_FIRST = "STATE_FIRST",
    g.STATE_INTERVAL = "STATE_INTERVAL",
    g.STATE_CLOSING = "STATE_CLOSING",
    g.STATE_CLOSED = "STATE_CLOSED",
    g.STATE_OPENING = "STATE_OPENING",
    a.mul = function(t, i, e) {
        var r, o, s, n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (r = 0; r < 4; r++)
            for (o = 0; o < 4; o++)
                for (s = 0; s < 4; s++)
                    n[r + 4 * o] += t[r + 4 * s] * i[s + 4 * o];
        for (r = 0; r < 16; r++)
            e[r] = n[r]
    }
    ,
    a.prototype.identity = function() {
        for (var t = 0; t < 16; t++)
            this.tr[t] = t % 5 == 0 ? 1 : 0
    }
    ,
    a.prototype.getArray = function() {
        return this.tr
    }
    ,
    a.prototype.getCopyMatrix = function() {
        return new Float32Array(this.tr)
    }
    ,
    a.prototype.setMatrix = function(t) {
        if (null != this.tr && this.tr.length == this.tr.length)
            for (var i = 0; i < 16; i++)
                this.tr[i] = t[i]
    }
    ,
    a.prototype.getScaleX = function() {
        return this.tr[0]
    }
    ,
    a.prototype.getScaleY = function() {
        return this.tr[5]
    }
    ,
    a.prototype.transformX = function(t) {
        return this.tr[0] * t + this.tr[12]
    }
    ,
    a.prototype.transformY = function(t) {
        return this.tr[5] * t + this.tr[13]
    }
    ,
    a.prototype.invertTransformX = function(t) {
        return (t - this.tr[12]) / this.tr[0]
    }
    ,
    a.prototype.invertTransformY = function(t) {
        return (t - this.tr[13]) / this.tr[5]
    }
    ,
    a.prototype.multTranslate = function(t, i) {
        a.mul([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1], this.tr, this.tr)
    }
    ,
    a.prototype.translate = function(t, i) {
        this.tr[12] = t,
        this.tr[13] = i
    }
    ,
    a.prototype.translateX = function(t) {
        this.tr[12] = t
    }
    ,
    a.prototype.translateY = function(t) {
        this.tr[13] = t
    }
    ,
    a.prototype.multScale = function(t, i) {
        a.mul([t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.tr, this.tr)
    }
    ,
    a.prototype.scale = function(t, i) {
        this.tr[0] = t,
        this.tr[5] = i
    }
    ,
    h.prototype = new a,
    h.prototype.setPosition = function(t, i) {
        this.translate(t, i)
    }
    ,
    h.prototype.setCenterPosition = function(t, i) {
        var e = this.width * this.getScaleX()
          , r = this.height * this.getScaleY();
        this.translate(t - e / 2, i - r / 2)
    }
    ,
    h.prototype.top = function(t) {
        this.setY(t)
    }
    ,
    h.prototype.bottom = function(t) {
        var i = this.height * this.getScaleY();
        this.translateY(t - i)
    }
    ,
    h.prototype.left = function(t) {
        this.setX(t)
    }
    ,
    h.prototype.right = function(t) {
        var i = this.width * this.getScaleX();
        this.translateX(t - i)
    }
    ,
    h.prototype.centerX = function(t) {
        var i = this.width * this.getScaleX();
        this.translateX(t - i / 2)
    }
    ,
    h.prototype.centerY = function(t) {
        var i = this.height * this.getScaleY();
        this.translateY(t - i / 2)
    }
    ,
    h.prototype.setX = function(t) {
        this.translateX(t)
    }
    ,
    h.prototype.setY = function(t) {
        this.translateY(t)
    }
    ,
    h.prototype.setHeight = function(t) {
        var i = t / this.height;
        this.scale(i, -i)
    }
    ,
    h.prototype.setWidth = function(t) {
        var i = t / this.width;
        this.scale(i, -i)
    }
    ,
    l.prototype = new MotionQueueManager,
    l.prototype.getCurrentPriority = function() {
        return this.currentPriority
    }
    ,
    l.prototype.getReservePriority = function() {
        return this.reservePriority
    }
    ,
    l.prototype.reserveMotion = function(t) {
        return !(this.reservePriority >= t) && !(this.currentPriority >= t) && (this.reservePriority = t,
        !0)
    }
    ,
    l.prototype.setReservePriority = function(t) {
        this.reservePriority = t
    }
    ,
    l.prototype.updateParam = function(t) {
        var i = MotionQueueManager.prototype.updateParam.call(this, t);
        return this.isFinished() && (this.currentPriority = 0),
        i
    }
    ,
    l.prototype.startMotionPrio = function(t, i) {
        return i == this.reservePriority && (this.reservePriority = 0),
        this.currentPriority = i,
        this.startMotion(t, !1)
    }
    ,
    u.load = function(t) {
        for (var i = new u, e = _.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.physics_hair, s = o.length, n = 0; n < s; n++) {
            var a = o[n]
              , h = new PhysicsHair
              , l = a.setup
              , p = parseFloat(l.length)
              , f = parseFloat(l.regist)
              , c = parseFloat(l.mass);
            h.setup(p, f, c);
            for (var $ = a.src, d = $.length, g = 0; g < d; g++) {
                var y = $[g]
                  , T = y.id
                  , v = PhysicsHair.Src.SRC_TO_X
                  , P = y.ptype;
                "x" === P ? v = PhysicsHair.Src.SRC_TO_X : "y" === P ? v = PhysicsHair.Src.SRC_TO_Y : "angle" === P ? v = PhysicsHair.Src.SRC_TO_G_ANGLE : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Src");
                var S = parseFloat(y.scale)
                  , L = parseFloat(y.weight);
                h.addSrcParam(v, T, S, L)
            }
            for (var E = a.targets, M = E.length, g = 0; g < M; g++) {
                var x = E[g]
                  , T = x.id
                  , v = PhysicsHair.Target.TARGET_FROM_ANGLE
                  , P = x.ptype;
                "angle" === P ? v = PhysicsHair.Target.TARGET_FROM_ANGLE : "angle_v" === P ? v = PhysicsHair.Target.TARGET_FROM_ANGLE_V : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Target");
                var S = parseFloat(x.scale)
                  , L = parseFloat(x.weight);
                h.addTargetParam(v, T, S, L)
            }
            i.physicsList.push(h)
        }
        return i
    }
    ,
    u.prototype.updateParam = function(t) {
        for (var i = UtSystem.getUserTimeMSec() - this.startTimeMSec, e = 0; e < this.physicsList.length; e++)
            this.physicsList[e].update(t, i)
    }
    ,
    p.load = function(t) {
        for (var i = new p, e = _.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.parts_visible, s = o.length, n = 0; n < s; n++) {
            for (var a = o[n], h = a.group, l = h.length, u = [], c = 0; c < l; c++) {
                var $ = h[c]
                  , d = new f($.id);
                if (u[c] = d,
                null != $.link) {
                    var g = $.link
                      , y = g.length;
                    d.link = [];
                    for (var T = 0; T < y; T++) {
                        var v = new f(g[T]);
                        d.link.push(v)
                    }
                }
            }
            i.partsGroups.push(u)
        }
        return i
    }
    ,
    p.prototype.updateParam = function(t) {
        if (null != t) {
            t != this.lastModel && this.initParam(t),
            this.lastModel = t;
            var i = UtSystem.getUserTimeMSec()
              , e = 0 == this.lastTime ? 0 : (i - this.lastTime) / 1e3;
            this.lastTime = i,
            e < 0 && (e = 0);
            for (var r = 0; r < this.partsGroups.length; r++)
                this.normalizePartsOpacityGroup(t, this.partsGroups[r], e),
                this.copyOpacityOtherParts(t, this.partsGroups[r])
        }
    }
    ,
    p.prototype.initParam = function(t) {
        if (null != t)
            for (var i = 0; i < this.partsGroups.length; i++)
                for (var e = this.partsGroups[i], r = 0; r < e.length; r++) {
                    e[r].initIndex(t);
                    var o = e[r].partsIndex
                      , s = e[r].paramIndex;
                    if (!(o < 0)) {
                        var n = 0 != t.getParamFloat(s);
                        if (t.setPartsOpacity(o, n ? 1 : 0),
                        t.setParamFloat(s, n ? 1 : 0),
                        null != e[r].link)
                            for (var a = 0; a < e[r].link.length; a++)
                                e[r].link[a].initIndex(t)
                    }
                }
    }
    ,
    p.prototype.normalizePartsOpacityGroup = function(t, i, e) {
        for (var r = -1, o = 1, s = 0; s < i.length; s++) {
            var n = i[s].partsIndex
              , a = i[s].paramIndex;
            if (!(n < 0) && 0 != t.getParamFloat(a)) {
                if (r >= 0)
                    break;
                r = s,
                o = t.getPartsOpacity(n),
                (o += e / .5) > 1 && (o = 1)
            }
        }
        r < 0 && (r = 0,
        o = 1);
        for (var s = 0; s < i.length; s++) {
            var n = i[s].partsIndex;
            if (!(n < 0)) {
                if (r == s)
                    t.setPartsOpacity(n, o);
                else {
                    var h, l = t.getPartsOpacity(n);
                    (1 - (h = o < .5 ? -.5 * o / .5 + 1 : .5 * (1 - o) / .5)) * (1 - o) > .15 && (h = 1 - .15 / (1 - o)),
                    l > h && (l = h),
                    t.setPartsOpacity(n, l)
                }
            }
        }
    }
    ,
    p.prototype.copyOpacityOtherParts = function(t, i) {
        for (var e = 0; e < i.length; e++) {
            var r = i[e];
            if (null != r.link && !(r.partsIndex < 0))
                for (var o = t.getPartsOpacity(r.partsIndex), s = 0; s < r.link.length; s++) {
                    var n = r.link[s];
                    n.partsIndex < 0 || t.setPartsOpacity(n.partsIndex, o)
                }
        }
    }
    ,
    f.prototype.initIndex = function(t) {
        this.paramIndex = t.getParamIndex("VISIBLE:" + this.id),
        this.partsIndex = t.getPartsDataIndex(PartsDataID.getID(this.id)),
        t.setParamFloat(this.paramIndex, 1)
    }
    ,
    c.FRAME_RATE = 30,
    c.prototype.setPoint = function(t, i) {
        this.faceTargetX = t,
        this.faceTargetY = i
    }
    ,
    c.prototype.getX = function() {
        return this.faceX
    }
    ,
    c.prototype.getY = function() {
        return this.faceY
    }
    ,
    c.prototype.update = function() {
        var t = 40 / 7.5 / c.FRAME_RATE;
        if (0 == this.lastTimeSec)
            return void (this.lastTimeSec = UtSystem.getUserTimeMSec());
        var i = UtSystem.getUserTimeMSec()
          , e = (i - this.lastTimeSec) * c.FRAME_RATE / 1e3;
        this.lastTimeSec = i;
        var r = e * t / (.15 * c.FRAME_RATE)
          , o = this.faceTargetX - this.faceX
          , s = this.faceTargetY - this.faceY;
        if (!(Math.abs(o) <= this.EPSILON && Math.abs(s) <= this.EPSILON)) {
            var n = Math.sqrt(o * o + s * s)
              , a = t * o / n - this.faceVX
              , h = t * s / n - this.faceVY
              , l = Math.sqrt(a * a + h * h);
            (l < -r || l > r) && (a *= r / l,
            h *= r / l,
            l = r),
            this.faceVX += a,
            this.faceVY += h;
            var u = .5 * (Math.sqrt(r * r + 16 * r * n - 8 * r * n) - r)
              , p = Math.sqrt(this.faceVX * this.faceVX + this.faceVY * this.faceVY);
            p > u && (this.faceVX *= u / p,
            this.faceVY *= u / p),
            this.faceX += this.faceVX,
            this.faceY += this.faceVY
        }
    }
    ,
    $.prototype = new a,
    $.prototype.getMaxScale = function() {
        return this.max
    }
    ,
    $.prototype.getMinScale = function() {
        return this.min
    }
    ,
    $.prototype.setMaxScale = function(t) {
        this.max = t
    }
    ,
    $.prototype.setMinScale = function(t) {
        this.min = t
    }
    ,
    $.prototype.isMaxScale = function() {
        return this.getScaleX() == this.max
    }
    ,
    $.prototype.isMinScale = function() {
        return this.getScaleX() == this.min
    }
    ,
    $.prototype.adjustTranslate = function(t, i) {
        this.tr[0] * this.maxLeft + (this.tr[12] + t) > this.screenLeft && (t = this.screenLeft - this.tr[0] * this.maxLeft - this.tr[12]),
        this.tr[0] * this.maxRight + (this.tr[12] + t) < this.screenRight && (t = this.screenRight - this.tr[0] * this.maxRight - this.tr[12]),
        this.tr[5] * this.maxTop + (this.tr[13] + i) < this.screenTop && (i = this.screenTop - this.tr[5] * this.maxTop - this.tr[13]),
        this.tr[5] * this.maxBottom + (this.tr[13] + i) > this.screenBottom && (i = this.screenBottom - this.tr[5] * this.maxBottom - this.tr[13]);
        var e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1];
        a.mul(e, this.tr, this.tr)
    }
    ,
    $.prototype.adjustScale = function(t, i, e) {
        var r = e * this.tr[0];
        r < this.min ? this.tr[0] > 0 && (e = this.min / this.tr[0]) : r > this.max && this.tr[0] > 0 && (e = this.max / this.tr[0]);
        var o = [e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        a.mul([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -t, -i, 0, 1], this.tr, this.tr),
        a.mul(o, this.tr, this.tr),
        a.mul([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1], this.tr, this.tr)
    }
    ,
    $.prototype.setScreenRect = function(t, i, e, r) {
        this.screenLeft = t,
        this.screenRight = i,
        this.screenTop = r,
        this.screenBottom = e
    }
    ,
    $.prototype.setMaxScreenRect = function(t, i, e, r) {
        this.maxLeft = t,
        this.maxRight = i,
        this.maxTop = r,
        this.maxBottom = e
    }
    ,
    $.prototype.getScreenLeft = function() {
        return this.screenLeft
    }
    ,
    $.prototype.getScreenRight = function() {
        return this.screenRight
    }
    ,
    $.prototype.getScreenBottom = function() {
        return this.screenBottom
    }
    ,
    $.prototype.getScreenTop = function() {
        return this.screenTop
    }
    ,
    $.prototype.getMaxLeft = function() {
        return this.maxLeft
    }
    ,
    $.prototype.getMaxRight = function() {
        return this.maxRight
    }
    ,
    $.prototype.getMaxBottom = function() {
        return this.maxBottom
    }
    ,
    $.prototype.getMaxTop = function() {
        return this.maxTop
    }
    ,
    _.platformManager = null,
    _.getPlatformManager = function() {
        return _.platformManager
    }
    ,
    _.setPlatformManager = function(t) {
        _.platformManager = t
    }
    ,
    t.exports = {
        L2DTargetPoint: c,
        Live2DFramework: _,
        L2DViewMatrix: $,
        L2DPose: p,
        L2DPartsParam: f,
        L2DPhysics: u,
        L2DMotionManager: l,
        L2DModelMatrix: h,
        L2DMatrix44: a,
        EYE_STATE: g,
        L2DEyeBlink: n,
        L2DExpressionParam: s,
        L2DExpressionMotion: o,
        L2DBaseModel: r
    }
}
, function(t, i, e) {
    "use strict";
    t.exports = {
        DEBUG_LOG: !1,
        DEBUG_MOUSE_LOG: !1,
        DEBUG_DRAW_HIT_AREA: !1,
        DEBUG_DRAW_ALPHA_MODEL: !1,
        VIEW_MAX_SCALE: 2,
        VIEW_MIN_SCALE: .8,
        VIEW_LOGICAL_LEFT: -1,
        VIEW_LOGICAL_RIGHT: 1,
        VIEW_LOGICAL_MAX_LEFT: -2,
        VIEW_LOGICAL_MAX_RIGHT: 2,
        VIEW_LOGICAL_MAX_BOTTOM: -2,
        VIEW_LOGICAL_MAX_TOP: 2,
        PRIORITY_NONE: 0,
        PRIORITY_IDLE: 1,
        PRIORITY_SLEEPY: 2,
        PRIORITY_NORMAL: 3,
        PRIORITY_FORCE: 4,
        MOTION_GROUP_IDLE: "idle",
        MOTION_GROUP_SLEEPY: "sleepy",
        MOTION_GROUP_TAP_BODY: "tap_body",
        MOTION_GROUP_FLICK_HEAD: "flick_head",
        MOTION_GROUP_PINCH_IN: "pinch_in",
        MOTION_GROUP_PINCH_OUT: "pinch_out",
        MOTION_GROUP_SHAKE: "shake",
        HIT_AREA_HEAD: "head",
        HIT_AREA_BODY: "body"
    }
}
, function(t, i, e) {
    "use strict";
    function r(t) {
        s = t
    }
    function o() {
        return s
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.setContext = r,
    i.getContext = o;
    var s = void 0
}
, function(t, i, e) {
    "use strict";
    function r() {}
    r.matrixStack = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    r.depth = 0,
    r.currentMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    r.tmp = Array(16),
    r.reset = function() {
        this.depth = 0
    }
    ,
    r.loadIdentity = function() {
        for (var t = 0; t < 16; t++)
            this.currentMatrix[t] = t % 5 == 0 ? 1 : 0
    }
    ,
    r.push = function() {
        var t = (this.depth,
        16 * (this.depth + 1));
        this.matrixStack.length < t + 16 && (this.matrixStack.length = t + 16);
        for (var i = 0; i < 16; i++)
            this.matrixStack[t + i] = this.currentMatrix[i];
        this.depth++
    }
    ,
    r.pop = function() {
        --this.depth < 0 && (myError("Invalid matrix stack."),
        this.depth = 0);
        for (var t = 16 * this.depth, i = 0; i < 16; i++)
            this.currentMatrix[i] = this.matrixStack[t + i]
    }
    ,
    r.getMatrix = function() {
        return this.currentMatrix
    }
    ,
    r.multMatrix = function(t) {
        var i, e, r;
        for (i = 0; i < 16; i++)
            this.tmp[i] = 0;
        for (i = 0; i < 4; i++)
            for (e = 0; e < 4; e++)
                for (r = 0; r < 4; r++)
                    this.tmp[i + 4 * e] += this.currentMatrix[i + 4 * r] * t[r + 4 * e];
        for (i = 0; i < 16; i++)
            this.currentMatrix[i] = this.tmp[i]
    }
    ,
    t.exports = r
}
, function(t, i, e) {
    t.exports = e(5)
}
, function(t, i, e) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function o(t, i, e) {
        function r(t, i) {
            var e, r, o, s, n;
            return 180 * Math.acos((s = {
                x: 0,
                y: 1
            },
            n = (e = t,
            o = Math.sqrt(e * e + (r = i) * r),
            {
                x: e / o,
                y: r / o
            }),
            s.x * n.x + s.y * n.y)) / Math.PI
        }
        if (i.x < e.left + e.width && i.y < e.top + e.height && i.x > e.left && i.y > e.top)
            return i;
        var o = t.x - i.x
          , s = t.y - i.y
          , n = r(o, s);
        i.x < t.x && (n = 360 - n);
        var a = 360 - r(e.left - t.x, -1 * (e.top - t.y))
          , h = 360 - r(e.left - t.x, -1 * (e.top + e.height - t.y))
          , l = r(e.left + e.width - t.x, -1 * (e.top - t.y))
          , u = r(e.left + e.width - t.x, -1 * (e.top + e.height - t.y))
          , p = s / o
          , f = {};
        if (n < l) {
            var c = e.top - t.y;
            f = {
                y: t.y + c,
                x: t.x + c / p
            }
        } else if (n < u) {
            var $ = e.left + e.width - t.x;
            f = {
                y: t.y + $ * p,
                x: t.x + $
            }
        } else if (n < h) {
            var _ = e.top + e.height - t.y;
            f = {
                y: t.y + _,
                x: t.x + _ / p
            }
        } else if (n < a) {
            var d = t.x - e.left;
            f = {
                y: t.y - d * p,
                x: t.x - d
            }
        } else {
            var g = e.top - t.y;
            f = {
                y: t.y + g,
                x: t.x + g / p
            }
        }
        return f
    }
    function s(t) {
        A = !0;
        var i = M.getBoundingClientRect()
          , e = f(t.clientX - i.left)
          , r = c(t.clientY - i.top)
          , s = o({
            x: i.left + i.width / 2,
            y: i.top + i.height * b
        }, {
            x: t.clientX,
            y: t.clientY
        }, i)
          , n = u(s.x - i.left)
          , a = p(s.y - i.top);
        y.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + a + ")"),
        R = e,
        w = r,
        x.setPoint(n, a)
    }
    function n() {
        A && (A = !1),
        x.setPoint(0, 0)
    }
    function a() {
        y.default.DEBUG_LOG && console.log("Set Session Storage."),
        sessionStorage.setItem("Sleepy", "0")
    }
    function h(t) {
        if ("mousewheel" == t.type)
            ;
        else if ("mousedown" == t.type)
            i = t,
            A = !0,
            e = M.getBoundingClientRect(),
            r = f(i.clientX - e.left),
            h = c(i.clientY - e.top),
            $ = u((l = o({
                x: e.left + e.width / 2,
                y: e.top + e.height * b
            }, {
                x: i.clientX,
                y: i.clientY
            }, e)).x - e.left),
            _ = p(l.y - e.top),
            y.default.DEBUG_MOUSE_LOG && console.log("onMouseDown device( x:" + i.clientX + " y:" + i.clientY + " ) view( x:" + $ + " y:" + _ + ")"),
            R = r,
            w = h,
            S.tapEvent($, _);
        else if ("mousemove" == t.type)
            "1" === sessionStorage.getItem("Sleepy") && sessionStorage.setItem("Sleepy", "0"),
            s(t);
        else if ("mouseup" == t.type) {
            if ("button"in t && 0 != t.button)
                return
        } else if ("mouseout" == t.type) {
            y.default.DEBUG_LOG && console.log("Mouse out Window."),
            n();
            var i, e, r, h, l, $, _, d = sessionStorage.getItem("SleepyTimer");
            window.clearTimeout(d),
            d = window.setTimeout(a, 5e4),
            sessionStorage.setItem("SleepyTimer", d)
        }
    }
    function l(t) {
        var i, e, r, a, h, l, $, _ = t.touches[0];
        "touchstart" == t.type ? 1 == t.touches.length && s(_) : "touchmove" == t.type ? (i = _,
        e = M.getBoundingClientRect(),
        r = f(i.clientX - e.left),
        a = c(i.clientY - e.top),
        l = u((h = o({
            x: e.left + e.width / 2,
            y: e.top + e.height * b
        }, {
            x: i.clientX,
            y: i.clientY
        }, e)).x - e.left),
        $ = p(h.y - e.top),
        y.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + i.clientX + " y:" + i.clientY + " ) view( x:" + l + " y:" + $ + ")"),
        A && (R = r,
        w = a,
        x.setPoint(l, $))) : "touchend" == t.type && n()
    }
    function u(t) {
        var i = D.transformX(t);
        return I.invertTransformX(i)
    }
    function p(t) {
        var i = D.transformY(t);
        return I.invertTransformY(i)
    }
    function f(t) {
        return D.transformX(t)
    }
    function c(t) {
        return D.transformY(t)
    }
    e(6);
    var $ = e(0)
      , _ = e(8)
      , d = r(_)
      , g = e(1)
      , y = r(g)
      , T = e(3)
      , v = r(T)
      , P = e(2)
      , S = (window.navigator.platform.toLowerCase(),
    new d.default)
      , L = !1
      , E = null
      , M = null
      , x = null
      , I = null
      , O = null
      , D = null
      , A = !1
      , R = 0
      , w = 0
      , b = .5;
    window.loadlive2d = function t(i, e, r) {
        var o;
        b = void 0 === r ? .5 : r,
        o = i,
        (M = document.getElementById(o)).addEventListener && (window.addEventListener("click", h),
        window.addEventListener("mousedown", h),
        window.addEventListener("mousemove", h),
        window.l2dmouseevent = h,
        window.addEventListener("mouseup", h),
        document.addEventListener("mouseout", h),
        window.addEventListener("touchstart", l),
        window.addEventListener("touchend", l),
        window.addEventListener("touchmove", l)),
        function t(i) {
            var e, r = M.width, o = M.height;
            x = new $.L2DTargetPoint;
            var s = o / r
              , n = y.default.VIEW_LOGICAL_LEFT
              , a = y.default.VIEW_LOGICAL_RIGHT;
            if (window.Live2D.captureFrame = !1,
            (I = new $.L2DViewMatrix).setScreenRect(n, a, -s, s),
            I.setMaxScreenRect(y.default.VIEW_LOGICAL_MAX_LEFT, y.default.VIEW_LOGICAL_MAX_RIGHT, y.default.VIEW_LOGICAL_MAX_BOTTOM, y.default.VIEW_LOGICAL_MAX_TOP),
            I.setMaxScale(y.default.VIEW_MAX_SCALE),
            I.setMinScale(y.default.VIEW_MIN_SCALE),
            (O = new $.L2DMatrix44).multScale(1, r / o),
            (D = new $.L2DMatrix44).multTranslate(-r / 2, -o / 2),
            D.multScale(2 / r, -2 / r),
            E = function t() {
                for (var i = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], e = 0; e < i.length; e++)
                    try {
                        var r = M.getContext(i[e], {
                            premultipliedAlpha: !0
                        });
                        if (r)
                            return r
                    } catch (o) {}
                return null
            }(),
            (0,
            P.setContext)(E),
            !E)
                return console.error("Failed to create WebGL context."),
                void (window.WebGLRenderingContext && console.error("Your browser don't support WebGL, check https://get.webgl.org/ for futher information."));
            window.Live2D.setGL(E),
            E.clearColor(0, 0, 0, 0),
            e = i,
            S.reloadFlg = !0,
            S.count++,
            S.changeModel(E, e),
            L || (L = !0,
            function t() {
                (function t() {
                    v.default.reset(),
                    v.default.loadIdentity(),
                    x.update(),
                    S.setDrag(x.getX(), x.getY()),
                    E.clear(E.COLOR_BUFFER_BIT),
                    v.default.multMatrix(O.getArray()),
                    v.default.multMatrix(I.getArray()),
                    v.default.push();
                    for (var i = 0; i < S.numModels(); i++) {
                        var e = S.getModel(i);
                        if(e.initialized){
                            e.modelMatrix.setHeight(l2d_scale*2);
                            e.modelMatrix.setCenterPosition(0,0);
                        }
                        if (null == e)
                            return;
                        e.initialized && !e.updating && (e.update(),
                        e.draw(E))
                    }
                    v.default.pop()
                }
                )();
                var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                if (window.Live2D.captureFrame) {
                    window.Live2D.captureFrame = !1;
                    var e = document.createElement("a");
                    document.body.appendChild(e),
                    e.setAttribute("type", "hidden"),
                    e.href = M.toDataURL(),
                    e.download = window.Live2D.captureName || "live2d.png",
                    e.click()
                }
                i(t, M)
            }())
        }(e)
    }
}
, function(t, i, e) {
    "use strict";
    (function(t) {
        !function() {
            function i() {
                tP || (this._$MT = null,
                this._$5S = null,
                this._$NP = 0,
                i._$42++,
                this._$5S = new U(this))
            }
            function e(t) {
                if (!tP) {
                    this.clipContextList = [],
                    this.glcontext = t.gl,
                    this.dp_webgl = t,
                    this.curFrameNo = 0,
                    this.firstError_clipInNotUpdate = !0,
                    this.colorBuffer = 0,
                    this.isInitGLFBFunc = !1,
                    this.tmpBoundsOnModel = new v,
                    tn.glContext.length > tn.frameBuffers.length && (this.curFrameNo = this.getMaskRenderTexture()),
                    this.tmpModelToViewMatrix = new R,
                    this.tmpMatrix2 = new R,
                    this.tmpMatrixForMask = new R,
                    this.tmpMatrixForDraw = new R,
                    this.CHANNEL_COLORS = [];
                    var i = new M;
                    (i = new M).r = 0,
                    i.g = 0,
                    i.b = 0,
                    i.a = 1,
                    this.CHANNEL_COLORS.push(i),
                    (i = new M).r = 1,
                    i.g = 0,
                    i.b = 0,
                    i.a = 0,
                    this.CHANNEL_COLORS.push(i),
                    (i = new M).r = 0,
                    i.g = 1,
                    i.b = 0,
                    i.a = 0,
                    this.CHANNEL_COLORS.push(i),
                    (i = new M).r = 0,
                    i.g = 0,
                    i.b = 1,
                    i.a = 0,
                    this.CHANNEL_COLORS.push(i);
                    for (var e = 0; e < this.CHANNEL_COLORS.length; e++)
                        this.dp_webgl.setChannelFlagAsColor(e, this.CHANNEL_COLORS[e])
                }
            }
            function r(t, i, e) {
                this.clipIDList = [],
                this.clipIDList = e,
                this.clippingMaskDrawIndexList = [];
                for (var r = 0; r < e.length; r++)
                    this.clippingMaskDrawIndexList.push(i.getDrawDataIndex(e[r]));
                this.clippedDrawContextList = [],
                this.isUsing = !0,
                this.layoutChannelNo = 0,
                this.layoutBounds = new v,
                this.allClippedDrawRect = new v,
                this.matrixForMask = new Float32Array(16),
                this.matrixForDraw = new Float32Array(16),
                this.owner = t
            }
            function o(t, i) {
                this._$gP = t,
                this.drawDataIndex = i
            }
            function s() {
                tP || (this.color = null)
            }
            function n() {
                tP || (this._$dP = null,
                this._$eo = null,
                this._$V0 = null,
                this._$dP = 1e3,
                this._$eo = 1e3,
                this._$V0 = 1,
                this._$a0())
            }
            function a() {}
            function h() {
                this._$r = null,
                this._$0S = null
            }
            function l() {
                tP || (this.x = null,
                this.y = null,
                this.width = null,
                this.height = null)
            }
            function u(t) {
                tP || ti.prototype.constructor.call(this, t)
            }
            function p(t) {
                tP || ti.prototype.constructor.call(this, t)
            }
            function f() {
                tP || (this._$vo = null,
                this._$F2 = null,
                this._$ao = 400,
                this._$1S = 400,
                f._$42++)
            }
            function c() {
                tP || (this.p1 = new $,
                this.p2 = new $,
                this._$Fo = 0,
                this._$Db = 0,
                this._$L2 = 0,
                this._$M2 = 0,
                this._$ks = 0,
                this._$9b = 0,
                this._$iP = 0,
                this._$iT = 0,
                this._$lL = [],
                this._$qP = [],
                this.setup(.3, .5, .1))
            }
            function $() {
                this._$p = 1,
                this.x = 0,
                this.y = 0,
                this.vx = 0,
                this.vy = 0,
                this.ax = 0,
                this.ay = 0,
                this.fx = 0,
                this.fy = 0,
                this._$s0 = 0,
                this._$70 = 0,
                this._$7L = 0,
                this._$HL = 0
            }
            function _(t, i, e) {
                this._$wL = null,
                this.scale = null,
                this._$V0 = null,
                this._$wL = t,
                this.scale = i,
                this._$V0 = e
            }
            function d(t, i, e, r) {
                _.prototype.constructor.call(this, i, e, r),
                this._$tL = null,
                this._$tL = t
            }
            function g(t, i, e) {
                this._$wL = null,
                this.scale = null,
                this._$V0 = null,
                this._$wL = t,
                this.scale = i,
                this._$V0 = e
            }
            function y(t, i, e, r) {
                g.prototype.constructor.call(this, i, e, r),
                this._$YP = null,
                this._$YP = t
            }
            function T() {
                tP || (this._$fL = 0,
                this._$gL = 0,
                this._$B0 = 1,
                this._$z0 = 1,
                this._$qT = 0,
                this.reflectX = !1,
                this.reflectY = !1)
            }
            function v() {
                tP || (this.x = null,
                this.y = null,
                this.width = null,
                this.height = null)
            }
            function P() {}
            function S() {
                tP || (this.x = null,
                this.y = null)
            }
            function L() {
                tP || (this._$gP = null,
                this._$dr = null,
                this._$GS = null,
                this._$qb = null,
                this._$Lb = null,
                this._$mS = null,
                this.clipID = null,
                this.clipIDList = [])
            }
            function E() {
                tP || (this._$Eb = E._$ps,
                this._$lT = 1,
                this._$C0 = 1,
                this._$tT = 1,
                this._$WL = 1,
                this.culling = !1,
                this.matrix4x4 = new Float32Array(16),
                this.premultipliedAlpha = !1,
                this.anisotropy = 0,
                this.clippingProcess = E.CLIPPING_PROCESS_NONE,
                this.clipBufPre_clipContextMask = null,
                this.clipBufPre_clipContextDraw = null,
                this.CHANNEL_COLORS = [])
            }
            function M() {
                tP || (this.a = 1,
                this.r = 1,
                this.g = 1,
                this.b = 1,
                this.scale = 1,
                this._$ho = 1,
                this.blendMode = tn.L2D_COLOR_BLEND_MODE_MULT)
            }
            function x() {
                tP || (this._$kP = null,
                this._$dr = null,
                this._$Ai = !0,
                this._$mS = null)
            }
            function I() {}
            function O() {
                tP || (this._$VP = 0,
                this._$wL = null,
                this._$GP = null,
                this._$8o = O._$ds,
                this._$2r = -1,
                this._$O2 = 0,
                this._$ri = 0)
            }
            function D() {}
            function A() {
                tP || (this._$Ob = null)
            }
            function R() {
                this.m = new Float32Array(16),
                this.identity()
            }
            function w(t) {
                tP || ti.prototype.constructor.call(this, t)
            }
            function b() {
                tP || (this._$7 = 1,
                this._$f = 0,
                this._$H = 0,
                this._$g = 1,
                this._$k = 0,
                this._$w = 0,
                this._$hi = STATE_IDENTITY,
                this._$Z = _$pS)
            }
            function C() {
                tP || (n.prototype.constructor.call(this),
                this.motions = [],
                this._$7r = null,
                this._$7r = C._$Co++,
                this._$D0 = 30,
                this._$yT = 0,
                this._$E = !0,
                this.loopFadeIn = !0,
                this._$AS = -1,
                _$a0())
            }
            function F() {
                this._$P = new Float32Array(100),
                this.size = 0
            }
            function N() {
                this._$4P = null,
                this._$I0 = null,
                this._$RP = null
            }
            function B() {}
            function G() {}
            function U(t) {
                tP || (this._$QT = !0,
                this._$co = -1,
                this._$qo = 0,
                this._$pb = Array(U._$is),
                this._$_2 = new Float32Array(U._$is),
                this._$vr = new Float32Array(U._$is),
                this._$Rr = new Float32Array(U._$is),
                this._$Or = new Float32Array(U._$is),
                this._$fs = new Float32Array(U._$is),
                this._$Js = Array(U._$is),
                this._$3S = [],
                this._$aS = [],
                this._$Bo = null,
                this._$F2 = [],
                this._$db = [],
                this._$8b = [],
                this._$Hr = [],
                this._$Ws = null,
                this._$Vs = null,
                this._$Er = null,
                this._$Es = new Int16Array(B._$Qb),
                this._$ZP = new Float32Array(2 * B._$1r),
                this._$Ri = t,
                this._$b0 = U._$HP++,
                this.clipManager = null,
                this.dp_webgl = null)
            }
            function Y() {}
            function k() {
                tP || (this._$12 = null,
                this._$bb = null,
                this._$_L = null,
                this._$jo = null,
                this._$iL = null,
                this._$0L = null,
                this._$Br = null,
                this._$Dr = null,
                this._$Cb = null,
                this._$mr = null,
                this._$_L = tS.STATE_FIRST,
                this._$Br = 4e3,
                this._$Dr = 100,
                this._$Cb = 50,
                this._$mr = 150,
                this._$jo = !0,
                this._$iL = "PARAM_EYE_L_OPEN",
                this._$0L = "PARAM_EYE_R_OPEN")
            }
            function V() {
                tP || (E.prototype.constructor.call(this),
                this._$sb = new Int32Array(V._$As),
                this._$U2 = [],
                this.transform = null,
                this.gl = null,
                null == V._$NT && (V._$NT = V._$9r(256),
                V._$vS = V._$9r(256),
                V._$no = V._$vb(256)))
            }
            function X() {
                tP || (x.prototype.constructor.call(this),
                this._$GS = null,
                this._$Y0 = null)
            }
            function z(t) {
                ts.prototype.constructor.call(this, t),
                this._$8r = x._$ur,
                this._$Yr = null,
                this._$Wr = null
            }
            function H() {
                tP || (L.prototype.constructor.call(this),
                this._$gP = null,
                this._$dr = null,
                this._$GS = null,
                this._$qb = null,
                this._$Lb = null,
                this._$mS = null)
            }
            function W() {
                tP || (this._$NL = null,
                this._$3S = null,
                this._$aS = null,
                W._$42++)
            }
            function q() {
                tP || (i.prototype.constructor.call(this),
                this._$zo = new V)
            }
            function j() {
                tP || (n.prototype.constructor.call(this),
                this.motions = [],
                this._$o2 = null,
                this._$7r = j._$Co++,
                this._$D0 = 30,
                this._$yT = 0,
                this._$E = !1,
                this.loopFadeIn = !0,
                this._$rr = -1,
                this._$eP = 0)
            }
            function J(t, i) {
                return String.fromCharCode(t.getUint8(i))
            }
            function F() {
                this._$P = new Float32Array(100),
                this.size = 0
            }
            function N() {
                this._$4P = null,
                this._$I0 = null,
                this._$RP = null
            }
            function Q() {
                tP || (x.prototype.constructor.call(this),
                this._$o = 0,
                this._$A = 0,
                this._$GS = null,
                this._$Eo = null)
            }
            function Z(t) {
                ts.prototype.constructor.call(this, t),
                this._$8r = x._$ur,
                this._$Cr = null,
                this._$hr = null
            }
            function K() {
                tP || (this.visible = !0,
                this._$g0 = !1,
                this._$NL = null,
                this._$3S = null,
                this._$aS = null,
                K._$42++)
            }
            function tt(t) {
                this._$VS = null,
                this._$e0 = null,
                this._$e0 = t
            }
            function ti(t) {
                tP || (this.id = t)
            }
            function te() {
                tP || (this._$4S = null)
            }
            function tr(t, i) {
                this.canvas = t,
                this.context = i,
                this.viewport = [0, 0, t.width, t.height],
                this._$6r = 1,
                this._$xP = 0,
                this._$3r = 1,
                this._$uP = 0,
                this._$Qo = -1,
                this.cacheImages = {}
            }
            function to() {
                tP || (this._$TT = null,
                this._$LT = null,
                this._$FS = null,
                this._$wL = null)
            }
            function ts(t) {
                tP || (this._$e0 = null,
                this._$IP = null,
                this._$JS = !1,
                this._$AT = !0,
                this._$e0 = t,
                this.totalScale = 1,
                this._$7s = 1,
                this.totalOpacity = 1)
            }
            function tn() {}
            function t8() {}
            function ta(t) {
                tP || (this._$ib = t)
            }
            function th() {
                tP || (H.prototype.constructor.call(this),
                this._$LP = -1,
                this._$d0 = 0,
                this._$Yo = 0,
                this._$JP = null,
                this._$5P = null,
                this._$BP = null,
                this._$Eo = null,
                this._$Qi = null,
                this._$6s = th._$ms,
                this.culling = !0,
                this.gl_cacheImage = null,
                this.instanceNo = th._$42++)
            }
            function t9(t) {
                tT.prototype.constructor.call(this, t),
                this._$8r = H._$ur,
                this._$Cr = null,
                this._$hr = null
            }
            function tl() {
                tP || (this.x = null,
                this.y = null)
            }
            function tu(t) {
                tP || (i.prototype.constructor.call(this),
                this.drawParamWebGL = new t_(t),
                this.drawParamWebGL.setGL(tn.getGL(t)))
            }
            function tp() {
                tP || (this.motions = null,
                this._$eb = !1,
                this.motions = [])
            }
            function tf() {
                this._$w0 = null,
                this._$AT = !0,
                this._$9L = !1,
                this._$z2 = -1,
                this._$bs = -1,
                this._$Do = -1,
                this._$sr = null,
                this._$sr = tf._$Gs++
            }
            function tc() {
                this.m = [1.5, 0, 0, 0, 1.5, 0, 0, 0, 1]
            }
            function t$(t) {
                tP || ti.prototype.constructor.call(this, t)
            }
            function t_(t) {
                tP || (E.prototype.constructor.call(this),
                this.textures = [],
                this.transform = null,
                this.gl = null,
                this.glno = t,
                this.firstDraw = !0,
                this.anisotropyExt = null,
                this.maxAnisotropy = 0,
                this._$As = 32,
                this._$Gr = !1,
                this._$NT = null,
                this._$vS = null,
                this._$no = null,
                this.vertShader = null,
                this.fragShader = null,
                this.vertShaderOff = null,
                this.fragShaderOff = null)
            }
            function td(t, i, e) {
                return null == i && (i = t.createBuffer()),
                t.bindBuffer(t.ARRAY_BUFFER, i),
                t.bufferData(t.ARRAY_BUFFER, e, t.DYNAMIC_DRAW),
                i
            }
            function tg(t, i, e) {
                return null == i && (i = t.createBuffer()),
                t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, i),
                t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.DYNAMIC_DRAW),
                i
            }
            function ty(t) {
                tP || (this._$P = new Int8Array(8),
                this._$R0 = new DataView(this._$P.buffer),
                this._$3i = new Int8Array(1e3),
                this._$hL = 0,
                this._$v0 = 0,
                this._$S2 = 0,
                this._$Ko = [],
                this._$T = t,
                this._$F = 0)
            }
            function tm() {}
            function tT(t) {
                tP || (this._$e0 = null,
                this._$IP = null,
                this._$Us = null,
                this._$7s = null,
                this._$IS = [!1],
                this._$VS = null,
                this._$AT = !0,
                this.baseOpacity = 1,
                this.clipBufPre_clipContext = null,
                this._$e0 = t)
            }
            function tv() {}
            var tP = !0;
            i._$0s = 1,
            i._$4s = 2,
            i._$42 = 0,
            i._$62 = function(t, e) {
                try {
                    if (e instanceof ArrayBuffer && (e = new DataView(e)),
                    !(e instanceof DataView))
                        throw new ta("_$SS#loadModel(b) / b _$x be DataView or ArrayBuffer");
                    var r, o = new ty(e), s = o._$ST(), n = o._$ST(), h = o._$ST();
                    if (109 != s || 111 != n || 99 != h)
                        throw new ta("_$gi _$C _$li , _$Q0 _$P0.");
                    if (r = o._$ST(),
                    o._$gr(r),
                    r > G._$T7)
                        throw t._$NP |= i._$4s,
                        new ta("_$gi _$C _$li , _$n0 _$_ version _$li ( SDK : " + G._$T7 + " < _$f0 : " + r + " )@_$SS#loadModel()\n");
                    var l = o._$nP();
                    if (r >= G._$s7) {
                        var u = o._$9T()
                          , p = o._$9T();
                        if (-30584 != u || -30584 != p)
                            throw t._$NP |= i._$0s,
                            new ta("_$gi _$C _$li , _$0 _$6 _$Ui.")
                    }
                    t._$KS(l);
                    var f = t.getModelContext();
                    f.setDrawParam(t.getDrawParam()),
                    f.init()
                } catch (c) {
                    a._$Rb(c)
                }
            }
            ,
            i.prototype._$KS = function(t) {
                this._$MT = t
            }
            ,
            i.prototype.getModelImpl = function() {
                return null == this._$MT && (this._$MT = new f,
                this._$MT._$zP()),
                this._$MT
            }
            ,
            i.prototype.getCanvasWidth = function() {
                return null == this._$MT ? 0 : this._$MT.getCanvasWidth()
            }
            ,
            i.prototype.getCanvasHeight = function() {
                return null == this._$MT ? 0 : this._$MT.getCanvasHeight()
            }
            ,
            i.prototype.getParamFloat = function(t) {
                return "number" != typeof t && (t = this._$5S.getParamIndex(p.getID(t))),
                this._$5S.getParamFloat(t)
            }
            ,
            i.prototype.setParamFloat = function(t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(p.getID(t))),
                arguments.length < 3 && (e = 1),
                this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 - e) + i * e)
            }
            ,
            i.prototype.addToParamFloat = function(t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(p.getID(t))),
                arguments.length < 3 && (e = 1),
                this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) + i * e)
            }
            ,
            i.prototype.multParamFloat = function(t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(p.getID(t))),
                arguments.length < 3 && (e = 1),
                this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 + (i - 1) * e))
            }
            ,
            i.prototype.getParamIndex = function(t) {
                return this._$5S.getParamIndex(p.getID(t))
            }
            ,
            i.prototype.loadParam = function() {
                this._$5S.loadParam()
            }
            ,
            i.prototype.saveParam = function() {
                this._$5S.saveParam()
            }
            ,
            i.prototype.init = function() {
                this._$5S.init()
            }
            ,
            i.prototype.update = function() {
                this._$5S.update()
            }
            ,
            i.prototype._$Rs = function() {
                return a._$li("_$60 _$PT _$Rs()"),
                -1
            }
            ,
            i.prototype._$Ds = function(t) {
                a._$li("_$60 _$PT _$SS#_$Ds() \n")
            }
            ,
            i.prototype._$K2 = function() {}
            ,
            i.prototype.draw = function() {}
            ,
            i.prototype.getModelContext = function() {
                return this._$5S
            }
            ,
            i.prototype._$s2 = function() {
                return this._$NP
            }
            ,
            i.prototype._$P7 = function(t, i, e, r) {
                var o = -1
                  , s = 0;
                if (0 != e) {
                    if (1 == t.length) {
                        var n = t[0]
                          , a = 0 != this.getParamFloat(n)
                          , h = i[0]
                          , l = this.getPartsOpacity(h)
                          , u = e / r;
                        a ? (l += u) > 1 && (l = 1) : (l -= u) < 0 && (l = 0),
                        this.setPartsOpacity(h, l)
                    } else {
                        for (var p = 0; p < t.length; p++) {
                            var n = t[p]
                              , f = 0 != this.getParamFloat(n);
                            if (f) {
                                if (o >= 0)
                                    break;
                                o = p;
                                var h = i[p];
                                s = this.getPartsOpacity(h),
                                (s += e / r) > 1 && (s = 1)
                            }
                        }
                        o < 0 && (console.log("No _$wi _$q0/ _$U default[%s]", t[0]),
                        o = 0,
                        s = 1,
                        this.loadParam(),
                        this.setParamFloat(t[o], s),
                        this.saveParam());
                        for (var p = 0; p < t.length; p++) {
                            var h = i[p];
                            if (o == p)
                                this.setPartsOpacity(h, s);
                            else {
                                var c, $ = this.getPartsOpacity(h);
                                (1 - (c = s < .5 ? -.5 * s / .5 + 1 : .5 * (1 - s) / .5)) * (1 - s) > .15 && (c = 1 - .15 / (1 - s)),
                                $ > c && ($ = c),
                                this.setPartsOpacity(h, $)
                            }
                        }
                    }
                } else
                    for (var p = 0; p < t.length; p++) {
                        var n = t[p]
                          , h = i[p]
                          , f = 0 != this.getParamFloat(n);
                        this.setPartsOpacity(h, f ? 1 : 0)
                    }
            }
            ,
            i.prototype.setPartsOpacity = function(t, i) {
                "number" != typeof t && (t = this._$5S.getPartsDataIndex(u.getID(t))),
                this._$5S.setPartsOpacity(t, i)
            }
            ,
            i.prototype.getPartsDataIndex = function(t) {
                return t instanceof u || (t = u.getID(t)),
                this._$5S.getPartsDataIndex(t)
            }
            ,
            i.prototype.getPartsOpacity = function(t) {
                return "number" != typeof t && (t = this._$5S.getPartsDataIndex(u.getID(t))),
                t < 0 ? 0 : this._$5S.getPartsOpacity(t)
            }
            ,
            i.prototype.getDrawParam = function() {}
            ,
            i.prototype.getDrawDataIndex = function(t) {
                return this._$5S.getDrawDataIndex(w.getID(t))
            }
            ,
            i.prototype.getDrawData = function(t) {
                return this._$5S.getDrawData(t)
            }
            ,
            i.prototype.getTransformedPoints = function(t) {
                var i = this._$5S._$C2(t);
                return i instanceof t9 ? i.getTransformedPoints() : null
            }
            ,
            i.prototype.getIndexArray = function(t) {
                if (t < 0 || t >= this._$5S._$aS.length)
                    return null;
                var i = this._$5S._$aS[t];
                return null != i && i.getType() == H._$wb && i instanceof th ? i.getIndexArray() : null
            }
            ,
            e.CHANNEL_COUNT = 4,
            e.RENDER_TEXTURE_USE_MIPMAP = !1,
            e.NOT_USED_FRAME = -100,
            e.prototype._$L7 = function() {
                if (this.tmpModelToViewMatrix && (this.tmpModelToViewMatrix = null),
                this.tmpMatrix2 && (this.tmpMatrix2 = null),
                this.tmpMatrixForMask && (this.tmpMatrixForMask = null),
                this.tmpMatrixForDraw && (this.tmpMatrixForDraw = null),
                this.tmpBoundsOnModel && (this.tmpBoundsOnModel = null),
                this.CHANNEL_COLORS) {
                    for (var t = this.CHANNEL_COLORS.length - 1; t >= 0; --t)
                        this.CHANNEL_COLORS.splice(t, 1);
                    this.CHANNEL_COLORS = []
                }
                this.releaseShader()
            }
            ,
            e.prototype.releaseShader = function() {
                for (var t = tn.frameBuffers.length, i = 0; i < t; i++)
                    this.gl.deleteFramebuffer(tn.frameBuffers[i].framebuffer);
                tn.frameBuffers = [],
                tn.glContext = []
            }
            ,
            e.prototype.init = function(t, i, e) {
                for (var o = 0; o < i.length; o++) {
                    var s = i[o].getClipIDList();
                    if (null != s) {
                        var n = this.findSameClip(s);
                        null == n && (n = new r(this,t,s),
                        this.clipContextList.push(n));
                        var a = i[o].getDrawDataID()
                          , h = t.getDrawDataIndex(a);
                        n.addClippedDrawData(a, h),
                        e[o].clipBufPre_clipContext = n
                    }
                }
            }
            ,
            e.prototype.getMaskRenderTexture = function() {
                var t = null;
                return t = this.dp_webgl.createFramebuffer(),
                tn.frameBuffers[this.dp_webgl.glno] = t,
                this.dp_webgl.glno
            }
            ,
            e.prototype.setupClip = function(t, i) {
                for (var e = 0, r = 0; r < this.clipContextList.length; r++) {
                    var o = this.clipContextList[r];
                    this.calcClippedDrawTotalBounds(t, o),
                    o.isUsing && e++
                }
                if (e > 0) {
                    var s = i.gl.getParameter(i.gl.FRAMEBUFFER_BINDING)
                      , n = [, , , , ];
                    n[0] = 0,
                    n[1] = 0,
                    n[2] = i.gl.canvas.width,
                    n[3] = i.gl.canvas.height,
                    i.gl.viewport(0, 0, tn.clippingMaskBufferSize, tn.clippingMaskBufferSize),
                    this.setupLayoutBounds(e),
                    i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, tn.frameBuffers[this.curFrameNo].framebuffer),
                    i.gl.clearColor(0, 0, 0, 0),
                    i.gl.clear(i.gl.COLOR_BUFFER_BIT);
                    for (var r = 0; r < this.clipContextList.length; r++) {
                        var o = this.clipContextList[r]
                          , a = o.allClippedDrawRect
                          , h = (o.layoutChannelNo,
                        o.layoutBounds);
                        this.tmpBoundsOnModel._$jL(a),
                        this.tmpBoundsOnModel.expand(.05 * a.width, .05 * a.height);
                        var l = h.width / this.tmpBoundsOnModel.width
                          , u = h.height / this.tmpBoundsOnModel.height;
                        this.tmpMatrix2.identity(),
                        this.tmpMatrix2.translate(-1, -1, 0),
                        this.tmpMatrix2.scale(2, 2, 1),
                        this.tmpMatrix2.translate(h.x, h.y, 0),
                        this.tmpMatrix2.scale(l, u, 1),
                        this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0),
                        this.tmpMatrixForMask.setMatrix(this.tmpMatrix2.m),
                        this.tmpMatrix2.identity(),
                        this.tmpMatrix2.translate(h.x, h.y, 0),
                        this.tmpMatrix2.scale(l, u, 1),
                        this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0),
                        this.tmpMatrixForDraw.setMatrix(this.tmpMatrix2.m);
                        for (var p = this.tmpMatrixForMask.getArray(), f = 0; f < 16; f++)
                            o.matrixForMask[f] = p[f];
                        for (var c = this.tmpMatrixForDraw.getArray(), f = 0; f < 16; f++)
                            o.matrixForDraw[f] = c[f];
                        for (var $ = o.clippingMaskDrawIndexList.length, _ = 0; _ < $; _++) {
                            var d = o.clippingMaskDrawIndexList[_]
                              , g = t.getDrawData(d)
                              , y = t._$C2(d);
                            i.setClipBufPre_clipContextForMask(o),
                            g.draw(i, t, y)
                        }
                    }
                    i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, s),
                    i.setClipBufPre_clipContextForMask(null),
                    i.gl.viewport(n[0], n[1], n[2], n[3])
                }
            }
            ,
            e.prototype.getColorBuffer = function() {
                return this.colorBuffer
            }
            ,
            e.prototype.findSameClip = function(t) {
                for (var i = 0; i < this.clipContextList.length; i++) {
                    var e = this.clipContextList[i]
                      , r = e.clipIDList.length;
                    if (r == t.length) {
                        for (var o = 0, s = 0; s < r; s++)
                            for (var n = e.clipIDList[s], a = 0; a < r; a++)
                                if (t[a] == n) {
                                    o++;
                                    break
                                }
                        if (o == r)
                            return e
                    }
                }
                return null
            }
            ,
            e.prototype.calcClippedDrawTotalBounds = function(t, i) {
                for (var e = t._$Ri.getModelImpl().getCanvasWidth(), r = t._$Ri.getModelImpl().getCanvasHeight(), o = e > r ? e : r, s = o, n = o, a = 0, h = 0, l = i.clippedDrawContextList.length, u = 0; u < l; u++) {
                    var p = i.clippedDrawContextList[u].drawDataIndex
                      , f = t._$C2(p);
                    if (f._$yo()) {
                        for (var c = f.getTransformedPoints(), $ = c.length, _ = [], d = [], g = 0, y = B._$i2; y < $; y += B._$No)
                            _[g] = c[y],
                            d[g] = c[y + 1],
                            g++;
                        var T = Math.min.apply(null, _)
                          , v = Math.min.apply(null, d)
                          , P = Math.max.apply(null, _)
                          , S = Math.max.apply(null, d);
                        T < s && (s = T),
                        v < n && (n = v),
                        P > a && (a = P),
                        S > h && (h = S)
                    }
                }
                if (s == o)
                    i.allClippedDrawRect.x = 0,
                    i.allClippedDrawRect.y = 0,
                    i.allClippedDrawRect.width = 0,
                    i.allClippedDrawRect.height = 0,
                    i.isUsing = !1;
                else {
                    var L = a - s
                      , E = h - n;
                    i.allClippedDrawRect.x = s,
                    i.allClippedDrawRect.y = n,
                    i.allClippedDrawRect.width = L,
                    i.allClippedDrawRect.height = E,
                    i.isUsing = !0
                }
            }
            ,
            e.prototype.setupLayoutBounds = function(t) {
                var i = t / e.CHANNEL_COUNT
                  , r = t % e.CHANNEL_COUNT;
                i = ~~i,
                r = ~~r;
                for (var o = 0, s = 0; s < e.CHANNEL_COUNT; s++) {
                    var n = i + (s < r ? 1 : 0);
                    if (0 == n)
                        ;
                    else if (1 == n) {
                        var h = this.clipContextList[o++];
                        h.layoutChannelNo = s,
                        h.layoutBounds.x = 0,
                        h.layoutBounds.y = 0,
                        h.layoutBounds.width = 1,
                        h.layoutBounds.height = 1
                    } else if (2 == n)
                        for (var l = 0; l < n; l++) {
                            var u = l % 2
                              , p = 0;
                            u = ~~u;
                            var h = this.clipContextList[o++];
                            h.layoutChannelNo = s,
                            h.layoutBounds.x = .5 * u,
                            h.layoutBounds.y = 0,
                            h.layoutBounds.width = .5,
                            h.layoutBounds.height = 1
                        }
                    else if (n <= 4)
                        for (var l = 0; l < n; l++) {
                            var u = l % 2
                              , p = l / 2;
                            u = ~~u,
                            p = ~~p;
                            var h = this.clipContextList[o++];
                            h.layoutChannelNo = s,
                            h.layoutBounds.x = .5 * u,
                            h.layoutBounds.y = .5 * p,
                            h.layoutBounds.width = .5,
                            h.layoutBounds.height = .5
                        }
                    else if (n <= 9)
                        for (var l = 0; l < n; l++) {
                            var u = l % 3
                              , p = l / 3;
                            u = ~~u,
                            p = ~~p;
                            var h = this.clipContextList[o++];
                            h.layoutChannelNo = s,
                            h.layoutBounds.x = u / 3,
                            h.layoutBounds.y = p / 3,
                            h.layoutBounds.width = 1 / 3,
                            h.layoutBounds.height = 1 / 3
                        }
                    else
                        a._$li("_$6 _$0P mask count : %d", n)
                }
            }
            ,
            r.prototype.addClippedDrawData = function(t, i) {
                var e = new o(t,i);
                this.clippedDrawContextList.push(e)
            }
            ,
            n._$JT = function(t, i, e) {
                var r = t / i
                  , o = e / i
                  , s = o
                  , n = 1 - (1 - o) * (1 - o)
                  , a = 1 - (1 - s) * (1 - s)
                  , h = 1 / 3 * (1 - o) * n + (s * (2 / 3) + 1 / 3 * (1 - s)) * (1 - n)
                  , l = (s + 2 / 3 * (1 - s)) * a + (o * (1 / 3) + 2 / 3 * (1 - o)) * (1 - a);
                if (r <= 0)
                    return 0;
                if (r >= 1)
                    return 1;
                var u = r
                  , p = u * u;
                return (1 - 3 * l + 3 * h - 0) * (u * p) + (3 * l - 6 * h + 0) * p + (3 * h - 0) * u + 0
            }
            ,
            n.prototype._$a0 = function() {}
            ,
            n.prototype.setFadeIn = function(t) {
                this._$dP = t
            }
            ,
            n.prototype.setFadeOut = function(t) {
                this._$eo = t
            }
            ,
            n.prototype._$pT = function(t) {
                this._$V0 = t
            }
            ,
            n.prototype.getFadeOut = function() {
                return this._$eo
            }
            ,
            n.prototype._$4T = function() {
                return this._$eo
            }
            ,
            n.prototype._$mT = function() {
                return this._$V0
            }
            ,
            n.prototype.getDurationMSec = function() {
                return -1
            }
            ,
            n.prototype.getLoopDurationMSec = function() {
                return -1
            }
            ,
            n.prototype.updateParam = function(t, i) {
                if (i._$AT && !i._$9L) {
                    var e = I.getUserTimeMSec();
                    if (i._$z2 < 0) {
                        i._$z2 = e,
                        i._$bs = e;
                        var r = this.getDurationMSec();
                        i._$Do < 0 && (i._$Do = r <= 0 ? -1 : i._$z2 + r)
                    }
                    var o = this._$V0;
                    0 <= (o = o * (0 == this._$dP ? 1 : t8._$r2((e - i._$bs) / this._$dP)) * (0 == this._$eo || i._$Do < 0 ? 1 : t8._$r2((i._$Do - e) / this._$eo))) && o <= 1 || console.log("### assert!! ### "),
                    this.updateParamExe(t, e, o, i),
                    i._$Do > 0 && i._$Do < e && (i._$9L = !0)
                }
            }
            ,
            n.prototype.updateParamExe = function(t, i, e, r) {}
            ,
            a._$8s = 0,
            a._$fT = {},
            a.start = function(t) {
                var i = a._$fT[t];
                null == i && ((i = new h)._$r = t,
                a._$fT[t] = i),
                i._$0S = I.getSystemTimeMSec()
            }
            ,
            a.dump = function(t) {
                var i = a._$fT[t];
                if (null != i) {
                    var e = I.getSystemTimeMSec() - i._$0S;
                    return console.log(t + " : " + e + "ms"),
                    e
                }
                return -1
            }
            ,
            a.end = function(t) {
                var i = a._$fT[t];
                return null != i ? I.getSystemTimeMSec() - i._$0S : -1
            }
            ,
            a._$li = function(t, i) {
                console.log("_$li : " + t + "\n", i)
            }
            ,
            a._$Ji = function(t, i) {
                console.log(t, i)
            }
            ,
            a._$dL = function(t, i) {
                console.log(t, i),
                console.log("\n")
            }
            ,
            a._$KL = function(t, i) {
                for (var e = 0; e < i; e++)
                    e % 16 == 0 && e > 0 ? console.log("\n") : e % 8 == 0 && e > 0 && console.log("  "),
                    console.log("%02X ", 255 & t[e]);
                console.log("\n")
            }
            ,
            a._$nr = function(t, i, e) {
                console.log("%s\n", t);
                for (var r = i.length, o = 0; o < r; ++o)
                    console.log("%5d", i[o]),
                    console.log("%s\n", e),
                    console.log(",");
                console.log("\n")
            }
            ,
            a._$Rb = function(t) {
                console.log("dump exception : " + t),
                console.log("stack :: " + t.stack)
            }
            ,
            l.prototype._$8P = function() {
                return .5 * (this.x + this.x + this.width)
            }
            ,
            l.prototype._$6P = function() {
                return .5 * (this.y + this.y + this.height)
            }
            ,
            l.prototype._$EL = function() {
                return this.x + this.width
            }
            ,
            l.prototype._$5T = function() {
                return this.y + this.height
            }
            ,
            l.prototype._$jL = function(t, i, e, r) {
                this.x = t,
                this.y = i,
                this.width = e,
                this.height = r
            }
            ,
            l.prototype._$jL = function(t) {
                this.x = t.x,
                this.y = t.y,
                this.width = t.width,
                this.height = t.height
            }
            ,
            u.prototype = new ti,
            u._$tP = {},
            u._$27 = function() {
                u._$tP.clear()
            }
            ,
            u.getID = function(t) {
                var i = u._$tP[t];
                return null == i && (i = new u(t),
                u._$tP[t] = i),
                i
            }
            ,
            u.prototype._$3s = function() {
                return new u
            }
            ,
            p.prototype = new ti,
            p._$tP = {},
            p._$27 = function() {
                p._$tP.clear()
            }
            ,
            p.getID = function(t) {
                var i = p._$tP[t];
                return null == i && (i = new p(t),
                p._$tP[t] = i),
                i
            }
            ,
            p.prototype._$3s = function() {
                return new p
            }
            ,
            f._$42 = 0,
            f.prototype._$zP = function() {
                null == this._$vo && (this._$vo = new te),
                null == this._$F2 && (this._$F2 = [])
            }
            ,
            f.prototype.getCanvasWidth = function() {
                return this._$ao
            }
            ,
            f.prototype.getCanvasHeight = function() {
                return this._$1S
            }
            ,
            f.prototype._$F0 = function(t) {
                this._$vo = t._$nP(),
                this._$F2 = t._$nP(),
                this._$ao = t._$6L(),
                this._$1S = t._$6L()
            }
            ,
            f.prototype._$6S = function(t) {
                this._$F2.push(t)
            }
            ,
            f.prototype._$Xr = function() {
                return this._$F2
            }
            ,
            f.prototype._$E2 = function() {
                return this._$vo
            }
            ,
            c.prototype.setup = function(t, i, e) {
                this._$ks = this._$Yb(),
                this.p2._$xT(),
                3 == arguments.length && (this._$Fo = t,
                this._$L2 = i,
                this.p1._$p = e,
                this.p2._$p = e,
                this.p2.y = t,
                this.setup())
            }
            ,
            c.prototype.getPhysicsPoint1 = function() {
                return this.p1
            }
            ,
            c.prototype.getPhysicsPoint2 = function() {
                return this.p2
            }
            ,
            c.prototype._$qr = function() {
                return this._$Db
            }
            ,
            c.prototype._$pr = function(t) {
                this._$Db = t
            }
            ,
            c.prototype._$5r = function() {
                return this._$M2
            }
            ,
            c.prototype._$Cs = function() {
                return this._$9b
            }
            ,
            c.prototype._$Yb = function() {
                return -180 * Math.atan2(this.p1.x - this.p2.x, -(this.p1.y - this.p2.y)) / Math.PI
            }
            ,
            c.prototype.addSrcParam = function(t, i, e, r) {
                var o = new d(t,i,e,r);
                this._$lL.push(o)
            }
            ,
            c.prototype.addTargetParam = function(t, i, e, r) {
                var o = new y(t,i,e,r);
                this._$qP.push(o)
            }
            ,
            c.prototype.update = function(t, i) {
                if (0 == this._$iP)
                    return this._$iP = this._$iT = i,
                    void (this._$Fo = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y)));
                var e = (i - this._$iT) / 1e3;
                if (0 != e) {
                    for (var r = this._$lL.length - 1; r >= 0; --r)
                        this._$lL[r]._$oP(t, this);
                    this._$oo(t, e),
                    this._$M2 = this._$Yb(),
                    this._$9b = (this._$M2 - this._$ks) / e,
                    this._$ks = this._$M2
                }
                for (var r = this._$qP.length - 1; r >= 0; --r)
                    this._$qP[r]._$YS(t, this);
                this._$iT = i
            }
            ,
            c.prototype._$oo = function(t, i) {
                i < .033 && (i = .033);
                var e = 1 / i;
                this.p1.vx = (this.p1.x - this.p1._$s0) * e,
                this.p1.vy = (this.p1.y - this.p1._$70) * e,
                this.p1.ax = (this.p1.vx - this.p1._$7L) * e,
                this.p1.ay = (this.p1.vy - this.p1._$HL) * e,
                this.p1.fx = this.p1.ax * this.p1._$p,
                this.p1.fy = this.p1.ay * this.p1._$p,
                this.p1._$xT();
                var r, o, s, n = -Math.atan2(this.p1.y - this.p2.y, this.p1.x - this.p2.x), a = Math.cos(n), h = Math.sin(n), l = 9.8 * this.p2._$p * Math.cos(n - this._$Db * tm._$bS);
                r = l * h,
                o = l * a;
                var u = -this.p1.fx * h * h
                  , p = -this.p1.fy * h * a
                  , f = -this.p2.vx * this._$L2
                  , c = -this.p2.vy * this._$L2;
                this.p2.fx = r + u + f,
                this.p2.fy = o + p + c,
                this.p2.ax = this.p2.fx / this.p2._$p,
                this.p2.ay = this.p2.fy / this.p2._$p,
                this.p2.vx += this.p2.ax * i,
                this.p2.vy += this.p2.ay * i,
                this.p2.x += this.p2.vx * i,
                this.p2.y += this.p2.vy * i;
                var $ = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
                this.p2.x = this.p1.x + this._$Fo * (this.p2.x - this.p1.x) / $,
                this.p2.y = this.p1.y + this._$Fo * (this.p2.y - this.p1.y) / $,
                this.p2.vx = (this.p2.x - this.p2._$s0) * e,
                this.p2.vy = (this.p2.y - this.p2._$70) * e,
                this.p2._$xT()
            }
            ,
            $.prototype._$xT = function() {
                this._$s0 = this.x,
                this._$70 = this.y,
                this._$7L = this.vx,
                this._$HL = this.vy
            }
            ,
            _.prototype._$oP = function(t, i) {}
            ,
            d.prototype = new _,
            d.prototype._$oP = function(t, i) {
                var e = this.scale * t.getParamFloat(this._$wL)
                  , r = i.getPhysicsPoint1();
                switch (this._$tL) {
                default:
                case c.Src.SRC_TO_X:
                    r.x = r.x + (e - r.x) * this._$V0;
                    break;
                case c.Src.SRC_TO_Y:
                    r.y = r.y + (e - r.y) * this._$V0;
                    break;
                case c.Src.SRC_TO_G_ANGLE:
                    var o = i._$qr();
                    o += (e - o) * this._$V0,
                    i._$pr(o)
                }
            }
            ,
            g.prototype._$YS = function(t, i) {}
            ,
            y.prototype = new g,
            y.prototype._$YS = function(t, i) {
                switch (this._$YP) {
                default:
                case c.Target.TARGET_FROM_ANGLE:
                    t.setParamFloat(this._$wL, this.scale * i._$5r(), this._$V0);
                    break;
                case c.Target.TARGET_FROM_ANGLE_V:
                    t.setParamFloat(this._$wL, this.scale * i._$Cs(), this._$V0)
                }
            }
            ,
            c.Src = function() {}
            ,
            c.Src.SRC_TO_X = "SRC_TO_X",
            c.Src.SRC_TO_Y = "SRC_TO_Y",
            c.Src.SRC_TO_G_ANGLE = "SRC_TO_G_ANGLE",
            c.Target = function() {}
            ,
            c.Target.TARGET_FROM_ANGLE = "TARGET_FROM_ANGLE",
            c.Target.TARGET_FROM_ANGLE_V = "TARGET_FROM_ANGLE_V",
            T.prototype.init = function(t) {
                this._$fL = t._$fL,
                this._$gL = t._$gL,
                this._$B0 = t._$B0,
                this._$z0 = t._$z0,
                this._$qT = t._$qT,
                this.reflectX = t.reflectX,
                this.reflectY = t.reflectY
            }
            ,
            T.prototype._$F0 = function(t) {
                this._$fL = t._$_T(),
                this._$gL = t._$_T(),
                this._$B0 = t._$_T(),
                this._$z0 = t._$_T(),
                this._$qT = t._$_T(),
                t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this.reflectX = t._$po(),
                this.reflectY = t._$po())
            }
            ,
            T.prototype._$e = function() {}
            ;
            var t0 = function() {};
            t0._$ni = function(t, i, e, r, o, s, n, a, h) {
                var l = n * s - a * o;
                if (0 == l)
                    return null;
                var u, p = ((t - e) * s - (i - r) * o) / l;
                return isNaN(u = 0 != o ? (t - e - p * n) / o : (i - r - p * a) / s) && (isNaN(u = (t - e - p * n) / o) && (u = (i - r - p * a) / s),
                isNaN(u) && (console.log("a is NaN @UtVector#_$ni() "),
                console.log("v1x : " + o),
                console.log("v1x != 0 ? " + (0 != o)))),
                null == h ? [u, p] : (h[0] = u,
                h[1] = p,
                h)
            }
            ,
            v.prototype._$8P = function() {
                return this.x + .5 * this.width
            }
            ,
            v.prototype._$6P = function() {
                return this.y + .5 * this.height
            }
            ,
            v.prototype._$EL = function() {
                return this.x + this.width
            }
            ,
            v.prototype._$5T = function() {
                return this.y + this.height
            }
            ,
            v.prototype._$jL = function(t, i, e, r) {
                this.x = t,
                this.y = i,
                this.width = e,
                this.height = r
            }
            ,
            v.prototype._$jL = function(t) {
                this.x = t.x,
                this.y = t.y,
                this.width = t.width,
                this.height = t.height
            }
            ,
            v.prototype.contains = function(t, i) {
                return this.x <= this.x && this.y <= this.y && this.x <= this.x + this.width && this.y <= this.y + this.height
            }
            ,
            v.prototype.expand = function(t, i) {
                this.x -= t,
                this.y -= i,
                this.width += 2 * t,
                this.height += 2 * i
            }
            ,
            P._$Z2 = function(t, i, e, r) {
                var o = i._$Q2(t, e)
                  , s = t._$vs()
                  , n = t._$Tr();
                if (i._$zr(s, n, o),
                o <= 0)
                    return r[s[0]];
                if (1 == o) {
                    var a = r[s[0]]
                      , h = r[s[1]]
                      , l = n[0];
                    return a + (h - a) * l | 0
                }
                if (2 == o) {
                    var a = r[s[0]]
                      , h = r[s[1]]
                      , u = r[s[2]]
                      , p = r[s[3]]
                      , l = n[0]
                      , f = n[1]
                      , c = a + (h - a) * l | 0
                      , $ = u + (p - u) * l | 0;
                    return c + ($ - c) * f | 0
                }
                if (3 == o) {
                    var _ = r[s[0]]
                      , d = r[s[1]]
                      , g = r[s[2]]
                      , y = r[s[3]]
                      , T = r[s[4]]
                      , v = r[s[5]]
                      , P = r[s[6]]
                      , S = r[s[7]]
                      , l = n[0]
                      , f = n[1]
                      , L = n[2]
                      , a = _ + (d - _) * l | 0
                      , h = g + (y - g) * l | 0
                      , u = T + (v - T) * l | 0
                      , p = P + (S - P) * l | 0
                      , c = a + (h - a) * f | 0
                      , $ = u + (p - u) * f | 0;
                    return c + ($ - c) * L | 0
                }
                if (4 == o) {
                    var E = r[s[0]]
                      , M = r[s[1]]
                      , x = r[s[2]]
                      , I = r[s[3]]
                      , O = r[s[4]]
                      , D = r[s[5]]
                      , A = r[s[6]]
                      , R = r[s[7]]
                      , w = r[s[8]]
                      , b = r[s[9]]
                      , C = r[s[10]]
                      , F = r[s[11]]
                      , N = r[s[12]]
                      , B = r[s[13]]
                      , G = r[s[14]]
                      , U = r[s[15]]
                      , l = n[0]
                      , f = n[1]
                      , L = n[2]
                      , Y = n[3]
                      , _ = E + (M - E) * l | 0
                      , d = x + (I - x) * l | 0
                      , g = O + (D - O) * l | 0
                      , y = A + (R - A) * l | 0
                      , T = w + (b - w) * l | 0
                      , v = C + (F - C) * l | 0
                      , P = N + (B - N) * l | 0
                      , S = G + (U - G) * l | 0
                      , a = _ + (d - _) * f | 0
                      , h = g + (y - g) * f | 0
                      , u = T + (v - T) * f | 0
                      , p = P + (S - P) * f | 0
                      , c = a + (h - a) * L | 0
                      , $ = u + (p - u) * L | 0;
                    return c + ($ - c) * Y | 0
                }
                for (var k = 1 << o, V = new Float32Array(k), X = 0; X < k; X++) {
                    for (var z = X, H = 1, W = 0; W < o; W++)
                        H *= z % 2 == 0 ? 1 - n[W] : n[W],
                        z /= 2;
                    V[X] = H
                }
                for (var q = new Float32Array(k), j = 0; j < k; j++)
                    q[j] = r[s[j]];
                for (var J = 0, j = 0; j < k; j++)
                    J += V[j] * q[j];
                return J + .5 | 0
            }
            ,
            P._$br = function(t, i, e, r) {
                var o = i._$Q2(t, e)
                  , s = t._$vs()
                  , n = t._$Tr();
                if (i._$zr(s, n, o),
                o <= 0)
                    return r[s[0]];
                if (1 == o) {
                    var a = r[s[0]]
                      , h = r[s[1]]
                      , l = n[0];
                    return a + (h - a) * l
                }
                if (2 == o) {
                    var a = r[s[0]]
                      , h = r[s[1]]
                      , u = r[s[2]]
                      , p = r[s[3]]
                      , l = n[0]
                      , f = n[1];
                    return (1 - f) * (a + (h - a) * l) + f * (u + (p - u) * l)
                }
                if (3 == o) {
                    var c = r[s[0]]
                      , $ = r[s[1]]
                      , _ = r[s[2]]
                      , d = r[s[3]]
                      , g = r[s[4]]
                      , y = r[s[5]]
                      , T = r[s[6]]
                      , v = r[s[7]]
                      , l = n[0]
                      , f = n[1]
                      , P = n[2];
                    return (1 - P) * ((1 - f) * (c + ($ - c) * l) + f * (_ + (d - _) * l)) + P * ((1 - f) * (g + (y - g) * l) + f * (T + (v - T) * l))
                }
                if (4 == o) {
                    var S = r[s[0]]
                      , L = r[s[1]]
                      , E = r[s[2]]
                      , M = r[s[3]]
                      , x = r[s[4]]
                      , I = r[s[5]]
                      , O = r[s[6]]
                      , D = r[s[7]]
                      , A = r[s[8]]
                      , R = r[s[9]]
                      , w = r[s[10]]
                      , b = r[s[11]]
                      , C = r[s[12]]
                      , F = r[s[13]]
                      , N = r[s[14]]
                      , B = r[s[15]]
                      , l = n[0]
                      , f = n[1]
                      , P = n[2]
                      , G = n[3];
                    return (1 - G) * ((1 - P) * ((1 - f) * (S + (L - S) * l) + f * (E + (M - E) * l)) + P * ((1 - f) * (x + (I - x) * l) + f * (O + (D - O) * l))) + G * ((1 - P) * ((1 - f) * (A + (R - A) * l) + f * (w + (b - w) * l)) + P * ((1 - f) * (C + (F - C) * l) + f * (N + (B - N) * l)))
                }
                for (var U = 1 << o, Y = new Float32Array(U), k = 0; k < U; k++) {
                    for (var V = k, X = 1, z = 0; z < o; z++)
                        X *= V % 2 == 0 ? 1 - n[z] : n[z],
                        V /= 2;
                    Y[k] = X
                }
                for (var H = new Float32Array(U), W = 0; W < U; W++)
                    H[W] = r[s[W]];
                for (var q = 0, W = 0; W < U; W++)
                    q += Y[W] * H[W];
                return q
            }
            ,
            P._$Vr = function(t, i, e, r, o, s, n, a) {
                var h = i._$Q2(t, e)
                  , l = t._$vs()
                  , u = t._$Tr();
                i._$zr(l, u, h);
                var p = 2 * r
                  , f = n;
                if (h <= 0) {
                    var c = o[l[0]];
                    if (2 == a && 0 == n)
                        I._$jT(c, 0, s, 0, p);
                    else
                        for (var $ = 0; $ < p; )
                            s[f] = c[$++],
                            s[f + 1] = c[$++],
                            f += a
                } else if (1 == h)
                    for (var c = o[l[0]], _ = o[l[1]], d = u[0], g = 1 - d, $ = 0; $ < p; )
                        s[f] = c[$] * g + _[$] * d,
                        ++$,
                        s[f + 1] = c[$] * g + _[$] * d,
                        ++$,
                        f += a;
                else if (2 == h)
                    for (var c = o[l[0]], _ = o[l[1]], y = o[l[2]], T = o[l[3]], d = u[0], v = u[1], g = 1 - d, P = 1 - v, S = P * g, L = P * d, E = v * g, M = v * d, $ = 0; $ < p; )
                        s[f] = S * c[$] + L * _[$] + E * y[$] + M * T[$],
                        ++$,
                        s[f + 1] = S * c[$] + L * _[$] + E * y[$] + M * T[$],
                        ++$,
                        f += a;
                else if (3 == h)
                    for (var x = o[l[0]], O = o[l[1]], D = o[l[2]], A = o[l[3]], R = o[l[4]], w = o[l[5]], b = o[l[6]], C = o[l[7]], d = u[0], v = u[1], F = u[2], g = 1 - d, P = 1 - v, N = 1 - F, B = N * P * g, G = N * P * d, U = N * v * g, Y = N * v * d, k = F * P * g, V = F * P * d, X = F * v * g, z = F * v * d, $ = 0; $ < p; )
                        s[f] = B * x[$] + G * O[$] + U * D[$] + Y * A[$] + k * R[$] + V * w[$] + X * b[$] + z * C[$],
                        ++$,
                        s[f + 1] = B * x[$] + G * O[$] + U * D[$] + Y * A[$] + k * R[$] + V * w[$] + X * b[$] + z * C[$],
                        ++$,
                        f += a;
                else if (4 == h)
                    for (var H = o[l[0]], W = o[l[1]], q = o[l[2]], j = o[l[3]], J = o[l[4]], Q = o[l[5]], Z = o[l[6]], K = o[l[7]], tt = o[l[8]], ti = o[l[9]], te = o[l[10]], tr = o[l[11]], to = o[l[12]], ts = o[l[13]], tn = o[l[14]], t8 = o[l[15]], d = u[0], v = u[1], F = u[2], ta = u[3], g = 1 - d, P = 1 - v, N = 1 - F, th = 1 - ta, t9 = th * N * P * g, tl = th * N * P * d, tu = th * N * v * g, tp = th * N * v * d, tf = th * F * P * g, tc = th * F * P * d, t$ = th * F * v * g, t_ = th * F * v * d, td = ta * N * P * g, tg = ta * N * P * d, ty = ta * N * v * g, tm = ta * N * v * d, tT = ta * F * P * g, tv = ta * F * P * d, tP = ta * F * v * g, t0 = ta * F * v * d, $ = 0; $ < p; )
                        s[f] = t9 * H[$] + tl * W[$] + tu * q[$] + tp * j[$] + tf * J[$] + tc * Q[$] + t$ * Z[$] + t_ * K[$] + td * tt[$] + tg * ti[$] + ty * te[$] + tm * tr[$] + tT * to[$] + tv * ts[$] + tP * tn[$] + t0 * t8[$],
                        ++$,
                        s[f + 1] = t9 * H[$] + tl * W[$] + tu * q[$] + tp * j[$] + tf * J[$] + tc * Q[$] + t$ * Z[$] + t_ * K[$] + td * tt[$] + tg * ti[$] + ty * te[$] + tm * tr[$] + tT * to[$] + tv * ts[$] + tP * tn[$] + t0 * t8[$],
                        ++$,
                        f += a;
                else {
                    for (var tS = 1 << h, tL = new Float32Array(tS), tE = 0; tE < tS; tE++) {
                        for (var tM = tE, tx = 1, tI = 0; tI < h; tI++)
                            tx *= tM % 2 == 0 ? 1 - u[tI] : u[tI],
                            tM /= 2;
                        tL[tE] = tx
                    }
                    for (var tO = new Float32Array(tS), tD = 0; tD < tS; tD++)
                        tO[tD] = o[l[tD]];
                    for (var $ = 0; $ < p; ) {
                        for (var tA = 0, tR = 0, tw = $ + 1, tD = 0; tD < tS; tD++)
                            tA += tL[tD] * tO[tD][$],
                            tR += tL[tD] * tO[tD][tw];
                        $ += 2,
                        s[f] = tA,
                        s[f + 1] = tR,
                        f += a
                    }
                }
            }
            ,
            S.prototype._$HT = function(t, i) {
                this.x = t,
                this.y = i
            }
            ,
            S.prototype._$HT = function(t) {
                this.x = t.x,
                this.y = t.y
            }
            ,
            L._$ur = -2,
            L._$ES = 500,
            L._$wb = 2,
            L._$8S = 3,
            L._$52 = L._$ES,
            L._$R2 = L._$ES,
            L._$or = function() {
                return L._$52
            }
            ,
            L._$Pr = function() {
                return L._$R2
            }
            ,
            L.prototype.convertClipIDForV2_11 = function(t) {
                var i = [];
                return null == t ? null : 0 == t.length ? null : /,/.test(t) ? i = t.id.split(",") : (i.push(t.id),
                i)
            }
            ,
            L.prototype._$F0 = function(t) {
                this._$gP = t._$nP(),
                this._$dr = t._$nP(),
                this._$GS = t._$nP(),
                this._$qb = t._$6L(),
                this._$Lb = t._$cS(),
                this._$mS = t._$Tb(),
                t.getFormatVersion() >= G._$T7 ? (this.clipID = t._$nP(),
                this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = [],
                this._$MS(this._$Lb)
            }
            ,
            L.prototype.getClipIDList = function() {
                return this.clipIDList
            }
            ,
            L.prototype.init = function(t) {}
            ,
            L.prototype._$Nr = function(t, i) {
                if (i._$IS[0] = !1,
                i._$Us = P._$Z2(t, this._$GS, i._$IS, this._$Lb),
                tn._$Zs)
                    ;
                else if (i._$IS[0])
                    return;
                i._$7s = P._$br(t, this._$GS, i._$IS, this._$mS)
            }
            ,
            L.prototype._$2b = function(t, i) {}
            ,
            L.prototype.getDrawDataID = function() {
                return this._$gP
            }
            ,
            L.prototype._$j2 = function(t) {
                this._$gP = t
            }
            ,
            L.prototype.getOpacity = function(t, i) {
                return i._$7s
            }
            ,
            L.prototype._$zS = function(t, i) {
                return i._$Us
            }
            ,
            L.prototype._$MS = function(t) {
                for (var i = t.length - 1; i >= 0; --i) {
                    var e = t[i];
                    e < L._$52 ? L._$52 = e : e > L._$R2 && (L._$R2 = e)
                }
            }
            ,
            L.prototype.getTargetBaseDataID = function() {
                return this._$dr
            }
            ,
            L.prototype._$gs = function(t) {
                this._$dr = t
            }
            ,
            L.prototype._$32 = function() {
                return null != this._$dr && this._$dr != t$._$2o()
            }
            ,
            L.prototype.preDraw = function(t, i, e) {}
            ,
            L.prototype.draw = function(t, i, e) {}
            ,
            L.prototype.getType = function() {}
            ,
            L.prototype._$B2 = function(t, i, e) {}
            ,
            E._$ps = 32,
            E.CLIPPING_PROCESS_NONE = 0,
            E.CLIPPING_PROCESS_OVERWRITE_ALPHA = 1,
            E.CLIPPING_PROCESS_MULTIPLY_ALPHA = 2,
            E.CLIPPING_PROCESS_DRAW = 3,
            E.CLIPPING_PROCESS_CLEAR_ALPHA = 4,
            E.prototype.setChannelFlagAsColor = function(t, i) {
                this.CHANNEL_COLORS[t] = i
            }
            ,
            E.prototype.getChannelFlagAsColor = function(t) {
                return this.CHANNEL_COLORS[t]
            }
            ,
            E.prototype._$ZT = function() {}
            ,
            E.prototype._$Uo = function(t, i, e, r, o, s, n) {}
            ,
            E.prototype._$Rs = function() {
                return -1
            }
            ,
            E.prototype._$Ds = function(t) {}
            ,
            E.prototype.setBaseColor = function(t, i, e, r) {
                t < 0 ? t = 0 : t > 1 && (t = 1),
                i < 0 ? i = 0 : i > 1 && (i = 1),
                e < 0 ? e = 0 : e > 1 && (e = 1),
                r < 0 ? r = 0 : r > 1 && (r = 1),
                this._$lT = t,
                this._$C0 = i,
                this._$tT = e,
                this._$WL = r
            }
            ,
            E.prototype._$WP = function(t) {
                this.culling = t
            }
            ,
            E.prototype.setMatrix = function(t) {
                for (var i = 0; i < 16; i++)
                    this.matrix4x4[i] = t[i]
            }
            ,
            E.prototype._$IT = function() {
                return this.matrix4x4
            }
            ,
            E.prototype.setPremultipliedAlpha = function(t) {
                this.premultipliedAlpha = t
            }
            ,
            E.prototype.isPremultipliedAlpha = function() {
                return this.premultipliedAlpha
            }
            ,
            E.prototype.setAnisotropy = function(t) {
                this.anisotropy = t
            }
            ,
            E.prototype.getAnisotropy = function() {
                return this.anisotropy
            }
            ,
            E.prototype.getClippingProcess = function() {
                return this.clippingProcess
            }
            ,
            E.prototype.setClippingProcess = function(t) {
                this.clippingProcess = t
            }
            ,
            E.prototype.setClipBufPre_clipContextForMask = function(t) {
                this.clipBufPre_clipContextMask = t
            }
            ,
            E.prototype.getClipBufPre_clipContextMask = function() {
                return this.clipBufPre_clipContextMask
            }
            ,
            E.prototype.setClipBufPre_clipContextForDraw = function(t) {
                this.clipBufPre_clipContextDraw = t
            }
            ,
            E.prototype.getClipBufPre_clipContextDraw = function() {
                return this.clipBufPre_clipContextDraw
            }
            ,
            x._$ur = -2,
            x._$c2 = 1,
            x._$_b = 2,
            x.prototype._$F0 = function(t) {
                this._$kP = t._$nP(),
                this._$dr = t._$nP()
            }
            ,
            x.prototype.readV2_opacity = function(t) {
                t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this._$mS = t._$Tb())
            }
            ,
            x.prototype.init = function(t) {}
            ,
            x.prototype._$Nr = function(t, i) {}
            ,
            x.prototype.interpolateOpacity = function(t, i, e, r) {
                null == this._$mS ? e.setInterpolatedOpacity(1) : e.setInterpolatedOpacity(P._$br(t, i, r, this._$mS))
            }
            ,
            x.prototype._$2b = function(t, i) {}
            ,
            x.prototype._$nb = function(t, i, e, r, o, s, n) {}
            ,
            x.prototype.getType = function() {}
            ,
            x.prototype._$gs = function(t) {
                this._$dr = t
            }
            ,
            x.prototype._$a2 = function(t) {
                this._$kP = t
            }
            ,
            x.prototype.getTargetBaseDataID = function() {
                return this._$dr
            }
            ,
            x.prototype.getBaseDataID = function() {
                return this._$kP
            }
            ,
            x.prototype._$32 = function() {
                return null != this._$dr && this._$dr != t$._$2o()
            }
            ,
            I._$W2 = 0,
            I._$CS = I._$W2,
            I._$Mo = function() {
                return !0
            }
            ,
            I._$XP = function(t) {
                try {
                    for (var i = getTimeMSec(); getTimeMSec() - i < t; )
                        ;
                } catch (e) {
                    e._$Rb()
                }
            }
            ,
            I.getUserTimeMSec = function() {
                return I._$CS == I._$W2 ? I.getSystemTimeMSec() : I._$CS
            }
            ,
            I.setUserTimeMSec = function(t) {
                I._$CS = t
            }
            ,
            I.updateUserTimeMSec = function() {
                return I._$CS = I.getSystemTimeMSec()
            }
            ,
            I.getTimeMSec = function() {
                return (new Date).getTime()
            }
            ,
            I.getSystemTimeMSec = function() {
                return (new Date).getTime()
            }
            ,
            I._$Q = function(t) {}
            ,
            I._$jT = function(t, i, e, r, o) {
                for (var s = 0; s < o; s++)
                    e[r + s] = t[i + s]
            }
            ,
            O._$ds = -2,
            O.prototype._$F0 = function(t) {
                this._$wL = t._$nP(),
                this._$VP = t._$6L(),
                this._$GP = t._$nP()
            }
            ,
            O.prototype.getParamIndex = function(t) {
                return this._$2r != t && (this._$8o = O._$ds),
                this._$8o
            }
            ,
            O.prototype._$Pb = function(t, i) {
                this._$8o = t,
                this._$2r = i
            }
            ,
            O.prototype.getParamID = function() {
                return this._$wL
            }
            ,
            O.prototype._$yP = function(t) {
                this._$wL = t
            }
            ,
            O.prototype._$N2 = function() {
                return this._$VP
            }
            ,
            O.prototype._$d2 = function() {
                return this._$GP
            }
            ,
            O.prototype._$t2 = function(t, i) {
                this._$VP = t,
                this._$GP = i
            }
            ,
            O.prototype._$Lr = function() {
                return this._$O2
            }
            ,
            O.prototype._$wr = function(t) {
                this._$O2 = t
            }
            ,
            O.prototype._$SL = function() {
                return this._$ri
            }
            ,
            O.prototype._$AL = function(t) {
                this._$ri = t
            }
            ,
            D.startsWith = function(t, i, e) {
                var r = i + e.length;
                if (r >= t.length)
                    return !1;
                for (var o = i; o < r; o++)
                    if (D.getChar(t, o) != e.charAt(o - i))
                        return !1;
                return !0
            }
            ,
            D.getChar = function(t, i) {
                return String.fromCharCode(t.getUint8(i))
            }
            ,
            D.createString = function(t, i, e) {
                for (var r = new ArrayBuffer(2 * e), o = new Uint16Array(r), s = 0; s < e; s++)
                    o[s] = t.getUint8(i + s);
                return String.fromCharCode.apply(null, o)
            }
            ,
            D._$LS = function(t, i, e, r) {
                t instanceof ArrayBuffer && (t = new DataView(t));
                var o = e
                  , s = !1
                  , n = !1
                  , a = 0
                  , h = D.getChar(t, o);
                "-" == h && (s = !0,
                o++);
                for (var l = !1; o < i; o++) {
                    switch (h = D.getChar(t, o)) {
                    case "0":
                        a *= 10;
                        break;
                    case "1":
                        a = 10 * a + 1;
                        break;
                    case "2":
                        a = 10 * a + 2;
                        break;
                    case "3":
                        a = 10 * a + 3;
                        break;
                    case "4":
                        a = 10 * a + 4;
                        break;
                    case "5":
                        a = 10 * a + 5;
                        break;
                    case "6":
                        a = 10 * a + 6;
                        break;
                    case "7":
                        a = 10 * a + 7;
                        break;
                    case "8":
                        a = 10 * a + 8;
                        break;
                    case "9":
                        a = 10 * a + 9;
                        break;
                    case ".":
                        n = !0,
                        o++,
                        l = !0;
                        break;
                    default:
                        l = !0
                    }
                    if (l)
                        break
                }
                if (n)
                    for (var u = .1, p = !1; o < i; o++) {
                        switch (h = D.getChar(t, o)) {
                        case "0":
                            break;
                        case "1":
                            a += 1 * u;
                            break;
                        case "2":
                            a += 2 * u;
                            break;
                        case "3":
                            a += 3 * u;
                            break;
                        case "4":
                            a += 4 * u;
                            break;
                        case "5":
                            a += 5 * u;
                            break;
                        case "6":
                            a += 6 * u;
                            break;
                        case "7":
                            a += 7 * u;
                            break;
                        case "8":
                            a += 8 * u;
                            break;
                        case "9":
                            a += 9 * u;
                            break;
                        default:
                            p = !0
                        }
                        if (u *= .1,
                        p)
                            break
                    }
                return s && (a = -a),
                r[0] = o,
                a
            }
            ,
            A.prototype._$zP = function() {
                this._$Ob = []
            }
            ,
            A.prototype._$F0 = function(t) {
                this._$Ob = t._$nP()
            }
            ,
            A.prototype._$Ur = function(t) {
                if (t._$WS())
                    return !0;
                for (var i = t._$v2(), e = this._$Ob.length - 1; e >= 0; --e) {
                    var r = this._$Ob[e].getParamIndex(i);
                    if (r == O._$ds && (r = t.getParamIndex(this._$Ob[e].getParamID())),
                    t._$Xb(r))
                        return !0
                }
                return !1
            }
            ,
            A.prototype._$Q2 = function(t, i) {
                for (var e, r, o = this._$Ob.length, s = t._$v2(), n = 0, a = 0; a < o; a++) {
                    var h = this._$Ob[a];
                    if ((e = h.getParamIndex(s)) == O._$ds && (e = t.getParamIndex(h.getParamID()),
                    h._$Pb(e, s)),
                    e < 0)
                        throw new Exception("err 23242 : " + h.getParamID());
                    var l = e < 0 ? 0 : t.getParamFloat(e);
                    r = h._$N2();
                    var u, p, f = h._$d2(), c = -1, $ = 0;
                    if (r < 1)
                        ;
                    else if (1 == r)
                        (u = f[0]) - B._$J < l && l < u + B._$J ? (c = 0,
                        $ = 0) : (c = 0,
                        i[0] = !0);
                    else if (l < (u = f[0]) - B._$J)
                        c = 0,
                        i[0] = !0;
                    else if (l < u + B._$J)
                        c = 0;
                    else {
                        for (var _ = !1, d = 1; d < r; ++d) {
                            if (l < (p = f[d]) + B._$J) {
                                p - B._$J < l ? c = d : (c = d - 1,
                                $ = (l - u) / (p - u),
                                n++),
                                _ = !0;
                                break
                            }
                            u = p
                        }
                        _ || (c = r - 1,
                        $ = 0,
                        i[0] = !0)
                    }
                    h._$wr(c),
                    h._$AL($)
                }
                return n
            }
            ,
            A.prototype._$zr = function(t, i, e) {
                var r = 1 << e;
                r + 1 > B._$Qb && console.log("err 23245\n");
                for (var o = this._$Ob.length, s = 1, n = 1, a = 0, h = 0; h < r; ++h)
                    t[h] = 0;
                for (var l = 0; l < o; ++l) {
                    var u = this._$Ob[l];
                    if (0 == u._$SL()) {
                        var p = u._$Lr() * s;
                        if (p < 0 && tn._$3T)
                            throw new Exception("err 23246");
                        for (var h = 0; h < r; ++h)
                            t[h] += p
                    } else {
                        for (var p = s * u._$Lr(), f = s * (u._$Lr() + 1), h = 0; h < r; ++h)
                            t[h] += (h / n | 0) % 2 == 0 ? p : f;
                        i[a++] = u._$SL(),
                        n *= 2
                    }
                    s *= u._$N2()
                }
                t[r] = 65535,
                i[a] = -1
            }
            ,
            A.prototype._$h2 = function(t, i, e) {
                for (var r = new Float32Array(i), o = 0; o < i; ++o)
                    r[o] = e[o];
                var s = new O;
                s._$yP(t),
                s._$t2(i, r),
                this._$Ob.push(s)
            }
            ,
            A.prototype._$J2 = function(t) {
                for (var i = t, e = this._$Ob.length, r = 0; r < e; ++r) {
                    var o = this._$Ob[r]
                      , s = o._$N2()
                      , n = i % o._$N2()
                      , a = o._$d2()[n];
                    console.log("%s[%d]=%7.2f / ", o.getParamID(), n, a),
                    i /= s
                }
                console.log("\n")
            }
            ,
            A.prototype.getParamCount = function() {
                return this._$Ob.length
            }
            ,
            A.prototype._$zs = function() {
                return this._$Ob
            }
            ,
            R.prototype.identity = function() {
                for (var t = 0; t < 16; t++)
                    this.m[t] = t % 5 == 0 ? 1 : 0
            }
            ,
            R.prototype.getArray = function() {
                return this.m
            }
            ,
            R.prototype.getCopyMatrix = function() {
                return new Float32Array(this.m)
            }
            ,
            R.prototype.setMatrix = function(t) {
                if (null != t && 16 == t.length)
                    for (var i = 0; i < 16; i++)
                        this.m[i] = t[i]
            }
            ,
            R.prototype.mult = function(t, i, e) {
                return null == i ? null : (this == i ? this.mult_safe(this.m, t.m, i.m, e) : this.mult_fast(this.m, t.m, i.m, e),
                i)
            }
            ,
            R.prototype.mult_safe = function(t, i, e, r) {
                if (t == e) {
                    var o = Array(16);
                    this.mult_fast(t, i, o, r);
                    for (var s = 15; s >= 0; --s)
                        e[s] = o[s]
                } else
                    this.mult_fast(t, i, e, r)
            }
            ,
            R.prototype.mult_fast = function(t, i, e, r) {
                r ? (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2],
                e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6],
                e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10],
                e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12],
                e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2],
                e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6],
                e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10],
                e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13],
                e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2],
                e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6],
                e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10],
                e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14],
                e[3] = e[7] = e[11] = 0,
                e[15] = 1) : (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2] + t[12] * i[3],
                e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6] + t[12] * i[7],
                e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10] + t[12] * i[11],
                e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12] * i[15],
                e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2] + t[13] * i[3],
                e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6] + t[13] * i[7],
                e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10] + t[13] * i[11],
                e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13] * i[15],
                e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2] + t[14] * i[3],
                e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6] + t[14] * i[7],
                e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10] + t[14] * i[11],
                e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14] * i[15],
                e[3] = t[3] * i[0] + t[7] * i[1] + t[11] * i[2] + t[15] * i[3],
                e[7] = t[3] * i[4] + t[7] * i[5] + t[11] * i[6] + t[15] * i[7],
                e[11] = t[3] * i[8] + t[7] * i[9] + t[11] * i[10] + t[15] * i[11],
                e[15] = t[3] * i[12] + t[7] * i[13] + t[11] * i[14] + t[15] * i[15])
            }
            ,
            R.prototype.translate = function(t, i, e) {
                this.m[12] = this.m[0] * t + this.m[4] * i + this.m[8] * e + this.m[12],
                this.m[13] = this.m[1] * t + this.m[5] * i + this.m[9] * e + this.m[13],
                this.m[14] = this.m[2] * t + this.m[6] * i + this.m[10] * e + this.m[14],
                this.m[15] = this.m[3] * t + this.m[7] * i + this.m[11] * e + this.m[15]
            }
            ,
            R.prototype.scale = function(t, i, e) {
                this.m[0] *= t,
                this.m[4] *= i,
                this.m[8] *= e,
                this.m[1] *= t,
                this.m[5] *= i,
                this.m[9] *= e,
                this.m[2] *= t,
                this.m[6] *= i,
                this.m[10] *= e,
                this.m[3] *= t,
                this.m[7] *= i,
                this.m[11] *= e
            }
            ,
            R.prototype.rotateX = function(t) {
                var i = tm.fcos(t)
                  , e = tm._$9(t)
                  , r = this.m[4];
                this.m[4] = r * i + this.m[8] * e,
                this.m[8] = -(r * e) + this.m[8] * i,
                r = this.m[5],
                this.m[5] = r * i + this.m[9] * e,
                this.m[9] = -(r * e) + this.m[9] * i,
                r = this.m[6],
                this.m[6] = r * i + this.m[10] * e,
                this.m[10] = -(r * e) + this.m[10] * i,
                r = this.m[7],
                this.m[7] = r * i + this.m[11] * e,
                this.m[11] = -(r * e) + this.m[11] * i
            }
            ,
            R.prototype.rotateY = function(t) {
                var i = tm.fcos(t)
                  , e = tm._$9(t)
                  , r = this.m[0];
                this.m[0] = r * i + -(this.m[8] * e),
                this.m[8] = r * e + this.m[8] * i,
                r = this.m[1],
                this.m[1] = r * i + -(this.m[9] * e),
                this.m[9] = r * e + this.m[9] * i,
                r = m[2],
                this.m[2] = r * i + -(this.m[10] * e),
                this.m[10] = r * e + this.m[10] * i,
                r = m[3],
                this.m[3] = r * i + -(this.m[11] * e),
                this.m[11] = r * e + this.m[11] * i
            }
            ,
            R.prototype.rotateZ = function(t) {
                var i = tm.fcos(t)
                  , e = tm._$9(t)
                  , r = this.m[0];
                this.m[0] = r * i + this.m[4] * e,
                this.m[4] = -(r * e) + this.m[4] * i,
                r = this.m[1],
                this.m[1] = r * i + this.m[5] * e,
                this.m[5] = -(r * e) + this.m[5] * i,
                r = this.m[2],
                this.m[2] = r * i + this.m[6] * e,
                this.m[6] = -(r * e) + this.m[6] * i,
                r = this.m[3],
                this.m[3] = r * i + this.m[7] * e,
                this.m[7] = -(r * e) + this.m[7] * i
            }
            ,
            w.prototype = new ti,
            w._$tP = {},
            w._$27 = function() {
                w._$tP.clear()
            }
            ,
            w.getID = function(t) {
                var i = w._$tP[t];
                return null == i && (i = new w(t),
                w._$tP[t] = i),
                i
            }
            ,
            w.prototype._$3s = function() {
                return new w
            }
            ,
            b._$kS = -1,
            b._$pS = 0,
            b._$hb = 1,
            b.STATE_IDENTITY = 0,
            b._$gb = 1,
            b._$fo = 2,
            b._$go = 4,
            b.prototype.transform = function(t, i, e) {
                var r, o, s, n, a, h, l = 0, u = 0;
                switch (this._$hi) {
                default:
                    return;
                case b._$go | b._$fo | b._$gb:
                    for (r = this._$7,
                    o = this._$H,
                    s = this._$k,
                    n = this._$f,
                    a = this._$g,
                    h = this._$w; --e >= 0; ) {
                        var p = t[l++]
                          , f = t[l++];
                        i[u++] = r * p + o * f + s,
                        i[u++] = n * p + a * f + h
                    }
                    return;
                case b._$go | b._$fo:
                    for (r = this._$7,
                    o = this._$H,
                    n = this._$f,
                    a = this._$g; --e >= 0; ) {
                        var p = t[l++]
                          , f = t[l++];
                        i[u++] = r * p + o * f,
                        i[u++] = n * p + a * f
                    }
                    return;
                case b._$go | b._$gb:
                    for (o = this._$H,
                    s = this._$k,
                    n = this._$f,
                    h = this._$w; --e >= 0; ) {
                        var p = t[l++];
                        i[u++] = o * t[l++] + s,
                        i[u++] = n * p + h
                    }
                    return;
                case b._$go:
                    for (o = this._$H,
                    n = this._$f; --e >= 0; ) {
                        var p = t[l++];
                        i[u++] = o * t[l++],
                        i[u++] = n * p
                    }
                    return;
                case b._$fo | b._$gb:
                    for (r = this._$7,
                    s = this._$k,
                    a = this._$g,
                    h = this._$w; --e >= 0; )
                        i[u++] = r * t[l++] + s,
                        i[u++] = a * t[l++] + h;
                    return;
                case b._$fo:
                    for (r = this._$7,
                    a = this._$g; --e >= 0; )
                        i[u++] = r * t[l++],
                        i[u++] = a * t[l++];
                    return;
                case b._$gb:
                    for (s = this._$k,
                    h = this._$w; --e >= 0; )
                        i[u++] = t[l++] + s,
                        i[u++] = t[l++] + h;
                    return;
                case b.STATE_IDENTITY:
                    return void (t == i && l == u || I._$jT(t, l, i, u, 2 * e))
                }
            }
            ,
            b.prototype.update = function() {
                0 == this._$H && 0 == this._$f ? 1 == this._$7 && 1 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = b.STATE_IDENTITY,
                this._$Z = b._$pS) : (this._$hi = b._$gb,
                this._$Z = b._$hb) : 0 == this._$k && 0 == this._$w ? (this._$hi = b._$fo,
                this._$Z = b._$kS) : (this._$hi = b._$fo | b._$gb,
                this._$Z = b._$kS) : 0 == this._$7 && 0 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = b._$go,
                this._$Z = b._$kS) : (this._$hi = b._$go | b._$gb,
                this._$Z = b._$kS) : 0 == this._$k && 0 == this._$w ? (this._$hi = b._$go | b._$fo,
                this._$Z = b._$kS) : (this._$hi = b._$go | b._$fo | b._$gb,
                this._$Z = b._$kS)
            }
            ,
            b.prototype._$RT = function(t) {
                this._$IT(t);
                var i = t[0]
                  , e = t[2]
                  , r = t[1]
                  , o = t[3]
                  , s = Math.sqrt(i * i + r * r)
                  , n = i * o - e * r;
                0 == s ? tn._$so && console.log("affine._$RT() / rt==0") : (t[0] = s,
                t[1] = n / s,
                t[2] = (r * o + i * e) / n,
                t[3] = Math.atan2(r, i))
            }
            ,
            b.prototype._$ho = function(t, i, e, r) {
                var o = new Float32Array(6)
                  , s = new Float32Array(6);
                t._$RT(o),
                i._$RT(s);
                var n = new Float32Array(6);
                n[0] = o[0] + (s[0] - o[0]) * e,
                n[1] = o[1] + (s[1] - o[1]) * e,
                n[2] = o[2] + (s[2] - o[2]) * e,
                n[3] = o[3] + (s[3] - o[3]) * e,
                n[4] = o[4] + (s[4] - o[4]) * e,
                n[5] = o[5] + (s[5] - o[5]) * e,
                r._$CT(n)
            }
            ,
            b.prototype._$CT = function(t) {
                var i = Math.cos(t[3])
                  , e = Math.sin(t[3]);
                this._$7 = t[0] * i,
                this._$f = t[0] * e,
                this._$H = t[1] * (t[2] * i - e),
                this._$g = t[1] * (t[2] * e + i),
                this._$k = t[4],
                this._$w = t[5],
                this.update()
            }
            ,
            b.prototype._$IT = function(t) {
                t[0] = this._$7,
                t[1] = this._$f,
                t[2] = this._$H,
                t[3] = this._$g,
                t[4] = this._$k,
                t[5] = this._$w
            }
            ,
            C.prototype = new n,
            C._$cs = "VISIBLE:",
            C._$ar = "LAYOUT:",
            C._$Co = 0,
            C._$D2 = [],
            C._$1T = 1,
            C.loadMotion = function(t) {
                var i = new C
                  , e = [0]
                  , r = t.length;
                i._$yT = 0;
                for (var o = 0; o < r; ++o) {
                    var s = 255 & t[o];
                    if ("\n" != s && "\r" != s) {
                        if ("#" != s) {
                            if ("$" != s) {
                                if ("a" <= s && s <= "z" || "A" <= s && s <= "Z" || "_" == s) {
                                    for (var n = o, a = -1; o < r && "\r" != (s = 255 & t[o]) && "\n" != s; ++o)
                                        if ("=" == s) {
                                            a = o;
                                            break
                                        }
                                    if (a >= 0) {
                                        var h = new N;
                                        D.startsWith(t, n, C._$cs) ? (h._$RP = N._$hs,
                                        h._$4P = new String(t,n,a - n)) : D.startsWith(t, n, C._$ar) ? (h._$4P = new String(t,n + 7,a - n - 7),
                                        D.startsWith(t, n + 7, "ANCHOR_X") ? h._$RP = N._$xs : D.startsWith(t, n + 7, "ANCHOR_Y") ? h._$RP = N._$us : D.startsWith(t, n + 7, "SCALE_X") ? h._$RP = N._$qs : D.startsWith(t, n + 7, "SCALE_Y") ? h._$RP = N._$Ys : D.startsWith(t, n + 7, "X") ? h._$RP = N._$ws : D.startsWith(t, n + 7, "Y") && (h._$RP = N._$Ns)) : (h._$RP = N._$Fr,
                                        h._$4P = new String(t,n,a - n)),
                                        i.motions.push(h);
                                        var l = 0;
                                        for (C._$D2.clear(),
                                        o = a + 1; o < r && "\r" != (s = 255 & t[o]) && "\n" != s; ++o)
                                            if ("," != s && " " != s && "	" != s) {
                                                var u = D._$LS(t, r, o, e);
                                                if (e[0] > 0) {
                                                    C._$D2.push(u),
                                                    l++;
                                                    var p = e[0];
                                                    if (p < o) {
                                                        console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
                                                        break
                                                    }
                                                    o = p
                                                }
                                            }
                                        h._$I0 = C._$D2._$BL(),
                                        l > i._$yT && (i._$yT = l)
                                    }
                                }
                            } else {
                                for (var n = o, a = -1; o < r && "\r" != (s = 255 & t[o]) && "\n" != s; ++o)
                                    if ("=" == s) {
                                        a = o;
                                        break
                                    }
                                var f = !1;
                                if (a >= 0) {
                                    for (a == n + 4 && "f" == t[n + 1] && "p" == t[n + 2] && "s" == t[n + 3] && (f = !0),
                                    o = a + 1; o < r && "\r" != (s = 255 & t[o]) && "\n" != s; ++o)
                                        if ("," != s && " " != s && "	" != s) {
                                            var u = D._$LS(t, r, o, e);
                                            e[0] > 0 && f && 5 < u && u < 121 && (i._$D0 = u),
                                            o = e[0]
                                        }
                                }
                                for (; o < r && "\n" != t[o] && "\r" != t[o]; ++o)
                                    ;
                            }
                        } else
                            for (; o < r && "\n" != t[o] && "\r" != t[o]; ++o)
                                ;
                    }
                }
                return i._$AS = 1e3 * i._$yT / i._$D0 | 0,
                i
            }
            ,
            C.prototype.getDurationMSec = function() {
                return this._$AS
            }
            ,
            C.prototype.dump = function() {
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t];
                    console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
                    for (var e = 0; e < i._$I0.length && e < 10; e++)
                        console.log("%5.2f ,", i._$I0[e]);
                    console.log("\n")
                }
            }
            ,
            C.prototype.updateParamExe = function(t, i, e, r) {
                for (var o = i - r._$z2, s = o * this._$D0 / 1e3, n = 0 | s, a = s - n, h = 0; h < this.motions.length; h++) {
                    var l = this.motions[h]
                      , u = l._$I0.length
                      , p = l._$4P;
                    if (l._$RP == N._$hs) {
                        var f = l._$I0[n >= u ? u - 1 : n];
                        t.setParamFloat(p, f)
                    } else if (N._$ws <= l._$RP && l._$RP <= N._$Ys)
                        ;
                    else {
                        var c = t.getParamFloat(p)
                          , $ = l._$I0[n >= u ? u - 1 : n]
                          , _ = c + ($ + (l._$I0[n + 1 >= u ? u - 1 : n + 1] - $) * a - c) * e;
                        t.setParamFloat(p, _)
                    }
                }
                n >= this._$yT && (this._$E ? (r._$z2 = i,
                this.loopFadeIn && (r._$bs = i)) : r._$9L = !0)
            }
            ,
            C.prototype._$r0 = function() {
                return this._$E
            }
            ,
            C.prototype._$aL = function(t) {
                this._$E = t
            }
            ,
            C.prototype.isLoopFadeIn = function() {
                return this.loopFadeIn
            }
            ,
            C.prototype.setLoopFadeIn = function(t) {
                this.loopFadeIn = t
            }
            ,
            F.prototype.clear = function() {
                this.size = 0
            }
            ,
            F.prototype.add = function(t) {
                if (this._$P.length <= this.size) {
                    var i = new Float32Array(2 * this.size);
                    I._$jT(this._$P, 0, i, 0, this.size),
                    this._$P = i
                }
                this._$P[this.size++] = t
            }
            ,
            F.prototype._$BL = function() {
                var t = new Float32Array(this.size);
                return I._$jT(this._$P, 0, t, 0, this.size),
                t
            }
            ,
            N._$Fr = 0,
            N._$hs = 1,
            N._$ws = 100,
            N._$Ns = 101,
            N._$xs = 102,
            N._$us = 103,
            N._$qs = 104,
            N._$Ys = 105,
            B._$Ms = 1,
            B._$Qs = 2,
            B._$i2 = 0,
            B._$No = 2,
            B._$do = B._$Ms,
            B._$Ls = !0,
            B._$1r = 5,
            B._$Qb = 65,
            B._$J = 1e-4,
            B._$FT = .001,
            B._$Ss = 3,
            G._$o7 = 6,
            G._$S7 = 7,
            G._$s7 = 8,
            G._$77 = 9,
            G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 = 10,
            G.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1 = 11,
            G._$T7 = G.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1,
            G._$Is = -2004318072,
            G._$h0 = 0,
            G._$4L = 23,
            G._$7P = 33,
            G._$uT = function(t) {
                console.log("_$bo :: _$6 _$mo _$E0 : %d\n", t)
            }
            ,
            G._$9o = function(t) {
                if (t < 40 || t < 50 || t < 60)
                    return G._$uT(t),
                    null;
                if (t < 100)
                    switch (t) {
                    case 65:
                        return new Q;
                    case 66:
                        return new A;
                    case 67:
                        return new O;
                    case 68:
                        return new X;
                    case 69:
                        return new T;
                    case 70:
                        return new th
                    }
                else if (t < 150)
                    switch (t) {
                    case 131:
                        return new to;
                    case 133:
                        return new K;
                    case 136:
                        return new f;
                    case 137:
                        return new te;
                    case 142:
                        return new W
                    }
                return G._$uT(t),
                null
            }
            ,
            U._$HP = 0,
            U._$_0 = !0,
            U._$V2 = -1,
            U._$W0 = -1,
            U._$jr = !1,
            U._$ZS = !0,
            U._$tr = -1e6,
            U._$lr = 1e6,
            U._$is = 32,
            U._$e = !1,
            U.prototype.getDrawDataIndex = function(t) {
                for (var i = this._$aS.length - 1; i >= 0; --i)
                    if (null != this._$aS[i] && this._$aS[i].getDrawDataID() == t)
                        return i;
                return -1
            }
            ,
            U.prototype.getDrawData = function(t) {
                if (t instanceof w) {
                    if (null == this._$Bo) {
                        this._$Bo = {};
                        for (var i = this._$aS.length, e = 0; e < i; e++) {
                            var r = this._$aS[e]
                              , o = r.getDrawDataID();
                            null != o && (this._$Bo[o] = r)
                        }
                    }
                    return this._$Bo[id]
                }
                return t < this._$aS.length ? this._$aS[t] : null
            }
            ,
            U.prototype.release = function() {
                this._$3S.clear(),
                this._$aS.clear(),
                this._$F2.clear(),
                null != this._$Bo && this._$Bo.clear(),
                this._$db.clear(),
                this._$8b.clear(),
                this._$Hr.clear()
            }
            ,
            U.prototype.init = function() {
                this._$co++,
                this._$F2.length > 0 && this.release();
                for (var t = this._$Ri.getModelImpl(), i = t._$Xr(), r = i.length, o = [], s = [], n = 0; n < r; ++n) {
                    var a = i[n];
                    this._$F2.push(a),
                    this._$Hr.push(a.init(this));
                    for (var h = a.getBaseData(), l = h.length, u = 0; u < l; ++u)
                        o.push(h[u]);
                    for (var u = 0; u < l; ++u) {
                        var p = h[u].init(this);
                        p._$l2(n),
                        s.push(p)
                    }
                    for (var f = a.getDrawData(), c = f.length, u = 0; u < c; ++u) {
                        var $ = f[u]
                          , _ = $.init(this);
                        _._$IP = n,
                        this._$aS.push($),
                        this._$8b.push(_)
                    }
                }
                for (var d = o.length, g = t$._$2o(); ; ) {
                    for (var y = !1, n = 0; n < d; ++n) {
                        var T = o[n];
                        if (null != T) {
                            var v = T.getTargetBaseDataID();
                            (null == v || v == g || this.getBaseDataIndex(v) >= 0) && (this._$3S.push(T),
                            this._$db.push(s[n]),
                            o[n] = null,
                            y = !0)
                        }
                    }
                    if (!y)
                        break
                }
                var P = t._$E2();
                if (null != P) {
                    var S = P._$1s();
                    if (null != S)
                        for (var L = S.length, n = 0; n < L; ++n) {
                            var E = S[n];
                            null != E && this._$02(E.getParamID(), E.getDefaultValue(), E.getMinValue(), E.getMaxValue())
                        }
                }
                this.clipManager = new e(this.dp_webgl),
                this.clipManager.init(this, this._$aS, this._$8b),
                this._$QT = !0
            }
            ,
            U.prototype.update = function() {
                U._$e && a.start("_$zL");
                for (var t = this._$_2.length, i = 0; i < t; i++)
                    this._$_2[i] != this._$vr[i] && (this._$Js[i] = U._$ZS,
                    this._$vr[i] = this._$_2[i]);
                var e = this._$3S.length
                  , r = this._$aS.length
                  , o = H._$or()
                  , s = H._$Pr() - o + 1;
                (null == this._$Ws || this._$Ws.length < s) && (this._$Ws = new Int16Array(s),
                this._$Vs = new Int16Array(s));
                for (var i = 0; i < s; i++)
                    this._$Ws[i] = U._$V2,
                    this._$Vs[i] = U._$V2;
                (null == this._$Er || this._$Er.length < r) && (this._$Er = new Int16Array(r));
                for (var i = 0; i < r; i++)
                    this._$Er[i] = U._$W0;
                U._$e && a.dump("_$zL"),
                U._$e && a.start("_$UL");
                for (var n = null, h = 0; h < e; ++h) {
                    var l = this._$3S[h]
                      , u = this._$db[h];
                    try {
                        l._$Nr(this, u),
                        l._$2b(this, u)
                    } catch (p) {
                        null == n && (n = p)
                    }
                }
                null != n && U._$_0 && a._$Rb(n),
                U._$e && a.dump("_$UL"),
                U._$e && a.start("_$DL");
                for (var f = null, c = 0; c < r; ++c) {
                    var $ = this._$aS[c]
                      , _ = this._$8b[c];
                    try {
                        if ($._$Nr(this, _),
                        _._$u2())
                            continue;
                        $._$2b(this, _);
                        var d, g = Math.floor($._$zS(this, _) - o);
                        try {
                            d = this._$Vs[g]
                        } catch (y) {
                            console.log("_$li :: %s / %s 				@@_$fS\n", y.toString(), $.getDrawDataID().toString()),
                            g = Math.floor($._$zS(this, _) - o);
                            continue
                        }
                        d == U._$V2 ? this._$Ws[g] = c : this._$Er[d] = c,
                        this._$Vs[g] = c
                    } catch (T) {
                        null == f && (f = T,
                        tn._$sT(tn._$H7))
                    }
                }
                null != f && U._$_0 && a._$Rb(f),
                U._$e && a.dump("_$DL"),
                U._$e && a.start("_$eL");
                for (var i = this._$Js.length - 1; i >= 0; i--)
                    this._$Js[i] = U._$jr;
                return this._$QT = !1,
                U._$e && a.dump("_$eL"),
                !1
            }
            ,
            U.prototype.preDraw = function(t) {
                null != this.clipManager && (t._$ZT(),
                this.clipManager.setupClip(this, t))
            }
            ,
            U.prototype.draw = function(t) {
                if (null == this._$Ws)
                    return void a._$li("call _$Ri.update() before _$Ri.draw() ");
                var i = this._$Ws.length;
                t._$ZT();
                for (var e = 0; e < i; ++e) {
                    var r = this._$Ws[e];
                    if (r != U._$V2)
                        for (; ; ) {
                            var o = this._$aS[r]
                              , s = this._$8b[r];
                            if (s._$yo()) {
                                var n = s._$IP
                                  , h = this._$Hr[n];
                                s._$VS = h.getPartsOpacity(),
                                o.draw(t, this, s)
                            }
                            var l = this._$Er[r];
                            if (l <= r || l == U._$W0)
                                break;
                            r = l
                        }
                }
            }
            ,
            U.prototype.getParamIndex = function(t) {
                for (var i = this._$pb.length - 1; i >= 0; --i)
                    if (this._$pb[i] == t)
                        return i;
                return this._$02(t, 0, U._$tr, U._$lr)
            }
            ,
            U.prototype._$BS = function(t) {
                return this.getBaseDataIndex(t)
            }
            ,
            U.prototype.getBaseDataIndex = function(t) {
                for (var i = this._$3S.length - 1; i >= 0; --i)
                    if (null != this._$3S[i] && this._$3S[i].getBaseDataID() == t)
                        return i;
                return -1
            }
            ,
            U.prototype._$UT = function(t, i) {
                var e = new Float32Array(i);
                return I._$jT(t, 0, e, 0, t.length),
                e
            }
            ,
            U.prototype._$02 = function(t, i, e, r) {
                if (this._$qo >= this._$pb.length) {
                    var o = this._$pb.length
                      , s = Array(2 * o);
                    I._$jT(this._$pb, 0, s, 0, o),
                    this._$pb = s,
                    this._$_2 = this._$UT(this._$_2, 2 * o),
                    this._$vr = this._$UT(this._$vr, 2 * o),
                    this._$Rr = this._$UT(this._$Rr, 2 * o),
                    this._$Or = this._$UT(this._$Or, 2 * o);
                    var n = [];
                    I._$jT(this._$Js, 0, n, 0, o),
                    this._$Js = n
                }
                return this._$pb[this._$qo] = t,
                this._$_2[this._$qo] = i,
                this._$vr[this._$qo] = i,
                this._$Rr[this._$qo] = e,
                this._$Or[this._$qo] = r,
                this._$Js[this._$qo] = U._$ZS,
                this._$qo++
            }
            ,
            U.prototype._$Zo = function(t, i) {
                this._$3S[t] = i
            }
            ,
            U.prototype.setParamFloat = function(t, i) {
                i < this._$Rr[t] && (i = this._$Rr[t]),
                i > this._$Or[t] && (i = this._$Or[t]),
                this._$_2[t] = i
            }
            ,
            U.prototype.loadParam = function() {
                var t = this._$_2.length;
                t > this._$fs.length && (t = this._$fs.length),
                I._$jT(this._$fs, 0, this._$_2, 0, t)
            }
            ,
            U.prototype.saveParam = function() {
                var t = this._$_2.length;
                t > this._$fs.length && (this._$fs = new Float32Array(t)),
                I._$jT(this._$_2, 0, this._$fs, 0, t)
            }
            ,
            U.prototype._$v2 = function() {
                return this._$co
            }
            ,
            U.prototype._$WS = function() {
                return this._$QT
            }
            ,
            U.prototype._$Xb = function(t) {
                return this._$Js[t] == U._$ZS
            }
            ,
            U.prototype._$vs = function() {
                return this._$Es
            }
            ,
            U.prototype._$Tr = function() {
                return this._$ZP
            }
            ,
            U.prototype.getBaseData = function(t) {
                return this._$3S[t]
            }
            ,
            U.prototype.getParamFloat = function(t) {
                return this._$_2[t]
            }
            ,
            U.prototype.getParamMax = function(t) {
                return this._$Or[t]
            }
            ,
            U.prototype.getParamMin = function(t) {
                return this._$Rr[t]
            }
            ,
            U.prototype.setPartsOpacity = function(t, i) {
                this._$Hr[t].setPartsOpacity(i)
            }
            ,
            U.prototype.getPartsOpacity = function(t) {
                return this._$Hr[t].getPartsOpacity()
            }
            ,
            U.prototype.getPartsDataIndex = function(t) {
                for (var i = this._$F2.length - 1; i >= 0; --i)
                    if (null != this._$F2[i] && this._$F2[i]._$p2() == t)
                        return i;
                return -1
            }
            ,
            U.prototype._$q2 = function(t) {
                return this._$db[t]
            }
            ,
            U.prototype._$C2 = function(t) {
                return this._$8b[t]
            }
            ,
            U.prototype._$Bb = function(t) {
                return this._$Hr[t]
            }
            ,
            U.prototype._$5s = function(t, i) {
                for (var e = this._$Ws.length, r = t, o = 0; o < e; ++o) {
                    var s = this._$Ws[o];
                    if (s != U._$V2)
                        for (; ; ) {
                            var n = this._$8b[s];
                            n._$yo() && (n._$GT()._$B2(this, n, r),
                            r += i);
                            var a = this._$Er[s];
                            if (a <= s || a == U._$W0)
                                break;
                            s = a
                        }
                }
            }
            ,
            U.prototype.setDrawParam = function(t) {
                this.dp_webgl = t
            }
            ,
            U.prototype.getDrawParam = function() {
                return this.dp_webgl
            }
            ,
            Y._$0T = function(t) {
                return Y._$0T(new _$5(t))
            }
            ,
            Y._$0T = function(t) {
                if (!t.exists())
                    throw new _$ls(t._$3b());
                for (var i, e = t.length(), r = new Int8Array(e), o = new _$Xs(new _$kb(t),8192), s = 0; (i = o.read(r, s, e - s)) > 0; )
                    s += i;
                return r
            }
            ,
            Y._$C = function(t) {
                var i = null
                  , e = null;
                try {
                    i = t instanceof Array ? t : new _$Xs(t,8192),
                    e = new _$js;
                    for (var r, o = new Int8Array(1e3); (r = i.read(o)) > 0; )
                        e.write(o, 0, r);
                    return e._$TS()
                } finally {
                    null != t && t.close(),
                    null != e && (e.flush(),
                    e.close())
                }
            }
            ,
            k.prototype._$T2 = function() {
                return I.getUserTimeMSec() + Math._$10() * (2 * this._$Br - 1)
            }
            ,
            k.prototype._$uo = function(t) {
                this._$Br = t
            }
            ,
            k.prototype._$QS = function(t, i, e) {
                this._$Dr = t,
                this._$Cb = i,
                this._$mr = e
            }
            ,
            k.prototype._$7T = function(t) {
                var i, e = I.getUserTimeMSec(), r = 0;
                switch (this._$_L) {
                case STATE_CLOSING:
                    (r = (e - this._$bb) / this._$Dr) >= 1 && (r = 1,
                    this._$_L = tS.STATE_CLOSED,
                    this._$bb = e),
                    i = 1 - r;
                    break;
                case STATE_CLOSED:
                    (r = (e - this._$bb) / this._$Cb) >= 1 && (this._$_L = tS.STATE_OPENING,
                    this._$bb = e),
                    i = 0;
                    break;
                case STATE_OPENING:
                    (r = (e - this._$bb) / this._$mr) >= 1 && (r = 1,
                    this._$_L = tS.STATE_INTERVAL,
                    this._$12 = this._$T2()),
                    i = r;
                    break;
                case STATE_INTERVAL:
                    this._$12 < e && (this._$_L = tS.STATE_CLOSING,
                    this._$bb = e),
                    i = 1;
                    break;
                case STATE_FIRST:
                default:
                    this._$_L = tS.STATE_INTERVAL,
                    this._$12 = this._$T2(),
                    i = 1
                }
                this._$jo || (i = -i),
                t.setParamFloat(this._$iL, i),
                t.setParamFloat(this._$0L, i)
            }
            ;
            var tS = function() {};
            tS.STATE_FIRST = "STATE_FIRST",
            tS.STATE_INTERVAL = "STATE_INTERVAL",
            tS.STATE_CLOSING = "STATE_CLOSING",
            tS.STATE_CLOSED = "STATE_CLOSED",
            tS.STATE_OPENING = "STATE_OPENING",
            V.prototype = new E,
            V._$As = 32,
            V._$Gr = !1,
            V._$NT = null,
            V._$vS = null,
            V._$no = null,
            V._$9r = function(t) {
                return new Float32Array(t)
            }
            ,
            V._$vb = function(t) {
                return new Int16Array(t)
            }
            ,
            V._$cr = function(t, i) {
                return null == t || t._$yL() < i.length ? ((t = V._$9r(2 * i.length)).put(i),
                t._$oT(0)) : (t.clear(),
                t.put(i),
                t._$oT(0)),
                t
            }
            ,
            V._$mb = function(t, i) {
                return null == t || t._$yL() < i.length ? ((t = V._$vb(2 * i.length)).put(i),
                t._$oT(0)) : (t.clear(),
                t.put(i),
                t._$oT(0)),
                t
            }
            ,
            V._$Hs = function() {
                return V._$Gr
            }
            ,
            V._$as = function(t) {
                V._$Gr = t
            }
            ,
            V.prototype.setGL = function(t) {
                this.gl = t
            }
            ,
            V.prototype.setTransform = function(t) {
                this.transform = t
            }
            ,
            V.prototype._$ZT = function() {}
            ,
            V.prototype._$Uo = function(t, i, e, r, o, s, n, a) {
                if (!(s < .01)) {
                    var h = this._$U2[t]
                      , l = s > .9 ? tn.EXPAND_W : 0;
                    this.gl.drawElements(h, e, r, o, s, l, this.transform, a)
                }
            }
            ,
            V.prototype._$Rs = function() {
                throw Error("_$Rs")
            }
            ,
            V.prototype._$Ds = function(t) {
                throw Error("_$Ds")
            }
            ,
            V.prototype._$K2 = function() {
                for (var t = 0; t < this._$sb.length; t++)
                    0 != this._$sb[t] && (this.gl._$Sr(1, this._$sb, t),
                    this._$sb[t] = 0)
            }
            ,
            V.prototype.setTexture = function(t, i) {
                this._$sb.length < t + 1 && this._$nS(t),
                this._$sb[t] = i
            }
            ,
            V.prototype.setTexture = function(t, i) {
                this._$sb.length < t + 1 && this._$nS(t),
                this._$U2[t] = i
            }
            ,
            V.prototype._$nS = function(t) {
                var i = Math.max(2 * this._$sb.length, t + 1 + 10)
                  , e = new Int32Array(i);
                I._$jT(this._$sb, 0, e, 0, this._$sb.length),
                this._$sb = e;
                var r = [];
                I._$jT(this._$U2, 0, r, 0, this._$U2.length),
                this._$U2 = r
            }
            ,
            X.prototype = new x,
            X._$Xo = new Float32Array(2),
            X._$io = new Float32Array(2),
            X._$0o = new Float32Array(2),
            X._$Lo = new Float32Array(2),
            X._$To = new Float32Array(2),
            X._$Po = new Float32Array(2),
            X._$gT = [],
            X.prototype._$zP = function() {
                this._$GS = new A,
                this._$GS._$zP(),
                this._$Y0 = []
            }
            ,
            X.prototype.getType = function() {
                return x._$c2
            }
            ,
            X.prototype._$F0 = function(t) {
                x.prototype._$F0.call(this, t),
                this._$GS = t._$nP(),
                this._$Y0 = t._$nP(),
                x.prototype.readV2_opacity.call(this, t)
            }
            ,
            X.prototype.init = function(t) {
                var i = new z(this);
                return i._$Yr = new T,
                this._$32() && (i._$Wr = new T),
                i
            }
            ,
            X.prototype._$Nr = function(t, i) {
                this != i._$GT() && console.log("### assert!! ### ");
                var e = i;
                if (this._$GS._$Ur(t)) {
                    var r = X._$gT;
                    r[0] = !1;
                    var o = this._$GS._$Q2(t, r);
                    i._$Ib(r[0]),
                    this.interpolateOpacity(t, this._$GS, i, r);
                    var s = t._$vs()
                      , n = t._$Tr();
                    if (this._$GS._$zr(s, n, o),
                    o <= 0) {
                        var a = this._$Y0[s[0]];
                        e._$Yr.init(a)
                    } else if (1 == o) {
                        var a = this._$Y0[s[0]]
                          , h = this._$Y0[s[1]]
                          , l = n[0];
                        e._$Yr._$fL = a._$fL + (h._$fL - a._$fL) * l,
                        e._$Yr._$gL = a._$gL + (h._$gL - a._$gL) * l,
                        e._$Yr._$B0 = a._$B0 + (h._$B0 - a._$B0) * l,
                        e._$Yr._$z0 = a._$z0 + (h._$z0 - a._$z0) * l,
                        e._$Yr._$qT = a._$qT + (h._$qT - a._$qT) * l
                    } else if (2 == o) {
                        var a = this._$Y0[s[0]]
                          , h = this._$Y0[s[1]]
                          , u = this._$Y0[s[2]]
                          , p = this._$Y0[s[3]]
                          , l = n[0]
                          , f = n[1]
                          , c = a._$fL + (h._$fL - a._$fL) * l
                          , $ = u._$fL + (p._$fL - u._$fL) * l;
                        e._$Yr._$fL = c + ($ - c) * f,
                        c = a._$gL + (h._$gL - a._$gL) * l,
                        $ = u._$gL + (p._$gL - u._$gL) * l,
                        e._$Yr._$gL = c + ($ - c) * f,
                        c = a._$B0 + (h._$B0 - a._$B0) * l,
                        $ = u._$B0 + (p._$B0 - u._$B0) * l,
                        e._$Yr._$B0 = c + ($ - c) * f,
                        c = a._$z0 + (h._$z0 - a._$z0) * l,
                        $ = u._$z0 + (p._$z0 - u._$z0) * l,
                        e._$Yr._$z0 = c + ($ - c) * f,
                        c = a._$qT + (h._$qT - a._$qT) * l,
                        $ = u._$qT + (p._$qT - u._$qT) * l,
                        e._$Yr._$qT = c + ($ - c) * f
                    } else if (3 == o) {
                        var _ = this._$Y0[s[0]]
                          , d = this._$Y0[s[1]]
                          , g = this._$Y0[s[2]]
                          , y = this._$Y0[s[3]]
                          , T = this._$Y0[s[4]]
                          , v = this._$Y0[s[5]]
                          , P = this._$Y0[s[6]]
                          , S = this._$Y0[s[7]]
                          , l = n[0]
                          , f = n[1]
                          , L = n[2]
                          , c = _._$fL + (d._$fL - _._$fL) * l
                          , $ = g._$fL + (y._$fL - g._$fL) * l
                          , E = T._$fL + (v._$fL - T._$fL) * l
                          , M = P._$fL + (S._$fL - P._$fL) * l;
                        e._$Yr._$fL = (1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f),
                        c = _._$gL + (d._$gL - _._$gL) * l,
                        $ = g._$gL + (y._$gL - g._$gL) * l,
                        E = T._$gL + (v._$gL - T._$gL) * l,
                        M = P._$gL + (S._$gL - P._$gL) * l,
                        e._$Yr._$gL = (1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f),
                        c = _._$B0 + (d._$B0 - _._$B0) * l,
                        $ = g._$B0 + (y._$B0 - g._$B0) * l,
                        E = T._$B0 + (v._$B0 - T._$B0) * l,
                        M = P._$B0 + (S._$B0 - P._$B0) * l,
                        e._$Yr._$B0 = (1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f),
                        c = _._$z0 + (d._$z0 - _._$z0) * l,
                        $ = g._$z0 + (y._$z0 - g._$z0) * l,
                        E = T._$z0 + (v._$z0 - T._$z0) * l,
                        M = P._$z0 + (S._$z0 - P._$z0) * l,
                        e._$Yr._$z0 = (1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f),
                        c = _._$qT + (d._$qT - _._$qT) * l,
                        $ = g._$qT + (y._$qT - g._$qT) * l,
                        E = T._$qT + (v._$qT - T._$qT) * l,
                        M = P._$qT + (S._$qT - P._$qT) * l,
                        e._$Yr._$qT = (1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f)
                    } else if (4 == o) {
                        var x = this._$Y0[s[0]]
                          , I = this._$Y0[s[1]]
                          , O = this._$Y0[s[2]]
                          , D = this._$Y0[s[3]]
                          , A = this._$Y0[s[4]]
                          , R = this._$Y0[s[5]]
                          , w = this._$Y0[s[6]]
                          , b = this._$Y0[s[7]]
                          , C = this._$Y0[s[8]]
                          , F = this._$Y0[s[9]]
                          , N = this._$Y0[s[10]]
                          , B = this._$Y0[s[11]]
                          , G = this._$Y0[s[12]]
                          , U = this._$Y0[s[13]]
                          , Y = this._$Y0[s[14]]
                          , k = this._$Y0[s[15]]
                          , l = n[0]
                          , f = n[1]
                          , L = n[2]
                          , V = n[3]
                          , c = x._$fL + (I._$fL - x._$fL) * l
                          , $ = O._$fL + (D._$fL - O._$fL) * l
                          , E = A._$fL + (R._$fL - A._$fL) * l
                          , M = w._$fL + (b._$fL - w._$fL) * l
                          , z = C._$fL + (F._$fL - C._$fL) * l
                          , H = N._$fL + (B._$fL - N._$fL) * l
                          , W = G._$fL + (U._$fL - G._$fL) * l
                          , q = Y._$fL + (k._$fL - Y._$fL) * l;
                        e._$Yr._$fL = (1 - V) * ((1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f)) + V * ((1 - L) * (z + (H - z) * f) + L * (W + (q - W) * f)),
                        c = x._$gL + (I._$gL - x._$gL) * l,
                        $ = O._$gL + (D._$gL - O._$gL) * l,
                        E = A._$gL + (R._$gL - A._$gL) * l,
                        M = w._$gL + (b._$gL - w._$gL) * l,
                        z = C._$gL + (F._$gL - C._$gL) * l,
                        H = N._$gL + (B._$gL - N._$gL) * l,
                        W = G._$gL + (U._$gL - G._$gL) * l,
                        q = Y._$gL + (k._$gL - Y._$gL) * l,
                        e._$Yr._$gL = (1 - V) * ((1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f)) + V * ((1 - L) * (z + (H - z) * f) + L * (W + (q - W) * f)),
                        c = x._$B0 + (I._$B0 - x._$B0) * l,
                        $ = O._$B0 + (D._$B0 - O._$B0) * l,
                        E = A._$B0 + (R._$B0 - A._$B0) * l,
                        M = w._$B0 + (b._$B0 - w._$B0) * l,
                        z = C._$B0 + (F._$B0 - C._$B0) * l,
                        H = N._$B0 + (B._$B0 - N._$B0) * l,
                        W = G._$B0 + (U._$B0 - G._$B0) * l,
                        q = Y._$B0 + (k._$B0 - Y._$B0) * l,
                        e._$Yr._$B0 = (1 - V) * ((1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f)) + V * ((1 - L) * (z + (H - z) * f) + L * (W + (q - W) * f)),
                        c = x._$z0 + (I._$z0 - x._$z0) * l,
                        $ = O._$z0 + (D._$z0 - O._$z0) * l,
                        E = A._$z0 + (R._$z0 - A._$z0) * l,
                        M = w._$z0 + (b._$z0 - w._$z0) * l,
                        z = C._$z0 + (F._$z0 - C._$z0) * l,
                        H = N._$z0 + (B._$z0 - N._$z0) * l,
                        W = G._$z0 + (U._$z0 - G._$z0) * l,
                        q = Y._$z0 + (k._$z0 - Y._$z0) * l,
                        e._$Yr._$z0 = (1 - V) * ((1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f)) + V * ((1 - L) * (z + (H - z) * f) + L * (W + (q - W) * f)),
                        c = x._$qT + (I._$qT - x._$qT) * l,
                        $ = O._$qT + (D._$qT - O._$qT) * l,
                        E = A._$qT + (R._$qT - A._$qT) * l,
                        M = w._$qT + (b._$qT - w._$qT) * l,
                        z = C._$qT + (F._$qT - C._$qT) * l,
                        H = N._$qT + (B._$qT - N._$qT) * l,
                        W = G._$qT + (U._$qT - G._$qT) * l,
                        q = Y._$qT + (k._$qT - Y._$qT) * l,
                        e._$Yr._$qT = (1 - V) * ((1 - L) * (c + ($ - c) * f) + L * (E + (M - E) * f)) + V * ((1 - L) * (z + (H - z) * f) + L * (W + (q - W) * f))
                    } else {
                        for (var j = 0 | Math.pow(2, o), J = new Float32Array(j), Q = 0; Q < j; Q++) {
                            for (var Z = Q, K = 1, tt = 0; tt < o; tt++)
                                K *= Z % 2 == 0 ? 1 - n[tt] : n[tt],
                                Z /= 2;
                            J[Q] = K
                        }
                        for (var ti = [], te = 0; te < j; te++)
                            ti[te] = this._$Y0[s[te]];
                        for (var tr = 0, to = 0, ts = 0, tn = 0, t8 = 0, te = 0; te < j; te++)
                            tr += J[te] * ti[te]._$fL,
                            to += J[te] * ti[te]._$gL,
                            ts += J[te] * ti[te]._$B0,
                            tn += J[te] * ti[te]._$z0,
                            t8 += J[te] * ti[te]._$qT;
                        e._$Yr._$fL = tr,
                        e._$Yr._$gL = to,
                        e._$Yr._$B0 = ts,
                        e._$Yr._$z0 = tn,
                        e._$Yr._$qT = t8
                    }
                    var a = this._$Y0[s[0]];
                    e._$Yr.reflectX = a.reflectX,
                    e._$Yr.reflectY = a.reflectY
                }
            }
            ,
            X.prototype._$2b = function(t, i) {
                this != i._$GT() && console.log("### assert!! ### ");
                var e = i;
                if (e._$hS(!0),
                this._$32()) {
                    var r = this.getTargetBaseDataID();
                    if (e._$8r == x._$ur && (e._$8r = t.getBaseDataIndex(r)),
                    e._$8r < 0)
                        tn._$so && a._$li("_$L _$0P _$G :: %s", r),
                        e._$hS(!1);
                    else {
                        var o = t.getBaseData(e._$8r);
                        if (null != o) {
                            var s = t._$q2(e._$8r)
                              , n = X._$Xo;
                            n[0] = e._$Yr._$fL,
                            n[1] = e._$Yr._$gL;
                            var h = X._$io;
                            h[0] = 0,
                            h[1] = -.1,
                            s._$GT().getType() == x._$c2 ? h[1] = -10 : h[1] = -.1;
                            var l = X._$0o;
                            this._$Jr(t, o, s, n, h, l);
                            var u = tm._$92(h, l);
                            o._$nb(t, s, n, n, 1, 0, 2),
                            e._$Wr._$fL = n[0],
                            e._$Wr._$gL = n[1],
                            e._$Wr._$B0 = e._$Yr._$B0,
                            e._$Wr._$z0 = e._$Yr._$z0,
                            e._$Wr._$qT = e._$Yr._$qT - u * tm._$NS;
                            var p = s.getTotalScale();
                            e.setTotalScale_notForClient(p * e._$Wr._$B0);
                            var f = s.getTotalOpacity();
                            e.setTotalOpacity(f * e.getInterpolatedOpacity()),
                            e._$Wr.reflectX = e._$Yr.reflectX,
                            e._$Wr.reflectY = e._$Yr.reflectY,
                            e._$hS(s._$yo())
                        } else
                            e._$hS(!1)
                    }
                } else
                    e.setTotalScale_notForClient(e._$Yr._$B0),
                    e.setTotalOpacity(e.getInterpolatedOpacity())
            }
            ,
            X.prototype._$nb = function(t, i, e, r, o, s, n) {
                this != i._$GT() && console.log("### assert!! ### ");
                for (var a, h, l = i, u = null != l._$Wr ? l._$Wr : l._$Yr, p = Math.sin(tm._$bS * u._$qT), f = Math.cos(tm._$bS * u._$qT), c = l.getTotalScale(), $ = u.reflectX ? -1 : 1, _ = u.reflectY ? -1 : 1, d = f * c * $, g = -p * c * _, y = p * c * $, T = f * c * _, v = u._$fL, P = u._$gL, S = o * n, L = s; L < S; L += n)
                    a = e[L],
                    h = e[L + 1],
                    r[L] = d * a + g * h + v,
                    r[L + 1] = y * a + T * h + P
            }
            ,
            X.prototype._$Jr = function(t, i, e, r, o, s) {
                i != e._$GT() && console.log("### assert!! ### ");
                var n = X._$Lo;
                X._$Lo[0] = r[0],
                X._$Lo[1] = r[1],
                i._$nb(t, e, n, n, 1, 0, 2);
                for (var a = X._$To, h = X._$Po, l = 1, u = 0; u < 10; u++) {
                    if (h[0] = r[0] + l * o[0],
                    h[1] = r[1] + l * o[1],
                    i._$nb(t, e, h, a, 1, 0, 2),
                    a[0] -= n[0],
                    a[1] -= n[1],
                    0 != a[0] || 0 != a[1])
                        return s[0] = a[0],
                        void (s[1] = a[1]);
                    if (h[0] = r[0] - l * o[0],
                    h[1] = r[1] - l * o[1],
                    i._$nb(t, e, h, a, 1, 0, 2),
                    a[0] -= n[0],
                    a[1] -= n[1],
                    0 != a[0] || 0 != a[1])
                        return a[0] = -a[0],
                        a[0] = -a[0],
                        s[0] = a[0],
                        void (s[1] = a[1]);
                    l *= .1
                }
                tn._$so && console.log("_$L0 to transform _$SP\n")
            }
            ,
            z.prototype = new ts,
            H.prototype = new L,
            H._$ur = -2,
            H._$ES = 500,
            H._$wb = 2,
            H._$8S = 3,
            H._$os = 4,
            H._$52 = H._$ES,
            H._$R2 = H._$ES,
            H._$Sb = function(t) {
                for (var i = t.length - 1; i >= 0; --i) {
                    var e = t[i];
                    e < H._$52 ? H._$52 = e : e > H._$R2 && (H._$R2 = e)
                }
            }
            ,
            H._$or = function() {
                return H._$52
            }
            ,
            H._$Pr = function() {
                return H._$R2
            }
            ,
            H.prototype._$F0 = function(t) {
                this._$gP = t._$nP(),
                this._$dr = t._$nP(),
                this._$GS = t._$nP(),
                this._$qb = t._$6L(),
                this._$Lb = t._$cS(),
                this._$mS = t._$Tb(),
                t.getFormatVersion() >= G._$T7 ? (this.clipID = t._$nP(),
                this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = null,
                H._$Sb(this._$Lb)
            }
            ,
            H.prototype.getClipIDList = function() {
                return this.clipIDList
            }
            ,
            H.prototype._$Nr = function(t, i) {
                if (i._$IS[0] = !1,
                i._$Us = P._$Z2(t, this._$GS, i._$IS, this._$Lb),
                tn._$Zs)
                    ;
                else if (i._$IS[0])
                    return;
                i._$7s = P._$br(t, this._$GS, i._$IS, this._$mS)
            }
            ,
            H.prototype._$2b = function(t) {}
            ,
            H.prototype.getDrawDataID = function() {
                return this._$gP
            }
            ,
            H.prototype._$j2 = function(t) {
                this._$gP = t
            }
            ,
            H.prototype.getOpacity = function(t, i) {
                return i._$7s
            }
            ,
            H.prototype._$zS = function(t, i) {
                return i._$Us
            }
            ,
            H.prototype.getTargetBaseDataID = function() {
                return this._$dr
            }
            ,
            H.prototype._$gs = function(t) {
                this._$dr = t
            }
            ,
            H.prototype._$32 = function() {
                return null != this._$dr && this._$dr != t$._$2o()
            }
            ,
            H.prototype.getType = function() {}
            ,
            W._$42 = 0,
            W.prototype._$1b = function() {
                return this._$3S
            }
            ,
            W.prototype.getDrawDataList = function() {
                return this._$aS
            }
            ,
            W.prototype._$F0 = function(t) {
                this._$NL = t._$nP(),
                this._$aS = t._$nP(),
                this._$3S = t._$nP()
            }
            ,
            W.prototype._$kr = function(t) {
                t._$Zo(this._$3S),
                t._$xo(this._$aS),
                this._$3S = null,
                this._$aS = null
            }
            ,
            q.prototype = new i,
            q.loadModel = function(t) {
                var e = new q;
                return i._$62(e, t),
                e
            }
            ,
            q.loadModel = function(t) {
                var e = new q;
                return i._$62(e, t),
                e
            }
            ,
            q._$to = function() {
                return new q
            }
            ,
            q._$er = function(t) {
                var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
                if (0 == i.exists())
                    throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
                for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = q.loadModel(i._$3b()), o = 0; o < e.length; o++) {
                    var s = new _$5(e[o]);
                    if (0 == s.exists())
                        throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + s._$PL());
                    r.setTexture(o, _$nL._$_o(t, s._$3b()))
                }
                return r
            }
            ,
            q.prototype.setGL = function(t) {
                this._$zo.setGL(t)
            }
            ,
            q.prototype.setTransform = function(t) {
                this._$zo.setTransform(t)
            }
            ,
            q.prototype.draw = function() {
                this._$5S.draw(this._$zo)
            }
            ,
            q.prototype._$K2 = function() {
                this._$zo._$K2()
            }
            ,
            q.prototype.setTexture = function(t, i) {
                null == this._$zo && a._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"),
                this._$zo.setTexture(t, i)
            }
            ,
            q.prototype.setTexture = function(t, i) {
                null == this._$zo && a._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"),
                this._$zo.setTexture(t, i)
            }
            ,
            q.prototype._$Rs = function() {
                return this._$zo._$Rs()
            }
            ,
            q.prototype._$Ds = function(t) {
                this._$zo._$Ds(t)
            }
            ,
            q.prototype.getDrawParam = function() {
                return this._$zo
            }
            ,
            j.prototype = new n,
            j._$cs = "VISIBLE:",
            j._$ar = "LAYOUT:",
            j.MTN_PREFIX_FADEIN = "FADEIN:",
            j.MTN_PREFIX_FADEOUT = "FADEOUT:",
            j._$Co = 0,
            j._$1T = 1,
            j.loadMotion = function(t) {
                var i = Y._$C(t);
                return j.loadMotion(i)
            }
            ,
            j.loadMotion = function(t) {
                t instanceof ArrayBuffer && (t = new DataView(t));
                var i = new j
                  , e = [0]
                  , r = t.byteLength;
                i._$yT = 0;
                for (var o = 0; o < r; ++o) {
                    var s = J(t, o)
                      , n = s.charCodeAt(0);
                    if ("\n" != s && "\r" != s) {
                        if ("#" != s) {
                            if ("$" != s) {
                                if (97 <= n && n <= 122 || 65 <= n && n <= 90 || "_" == s) {
                                    for (var a = o, h = -1; o < r && "\r" != (s = J(t, o)) && "\n" != s; ++o)
                                        if ("=" == s) {
                                            h = o;
                                            break
                                        }
                                    if (h >= 0) {
                                        var l = new N;
                                        D.startsWith(t, a, j._$cs) ? (l._$RP = N._$hs,
                                        l._$4P = D.createString(t, a, h - a)) : D.startsWith(t, a, j._$ar) ? (l._$4P = D.createString(t, a + 7, h - a - 7),
                                        D.startsWith(t, a + 7, "ANCHOR_X") ? l._$RP = N._$xs : D.startsWith(t, a + 7, "ANCHOR_Y") ? l._$RP = N._$us : D.startsWith(t, a + 7, "SCALE_X") ? l._$RP = N._$qs : D.startsWith(t, a + 7, "SCALE_Y") ? l._$RP = N._$Ys : D.startsWith(t, a + 7, "X") ? l._$RP = N._$ws : D.startsWith(t, a + 7, "Y") && (l._$RP = N._$Ns)) : (l._$RP = N._$Fr,
                                        l._$4P = D.createString(t, a, h - a)),
                                        i.motions.push(l);
                                        var u = 0
                                          , p = [];
                                        for (o = h + 1; o < r && "\r" != (s = J(t, o)) && "\n" != s; ++o)
                                            if ("," != s && " " != s && "	" != s) {
                                                var f = D._$LS(t, r, o, e);
                                                if (e[0] > 0) {
                                                    p.push(f),
                                                    u++;
                                                    var c = e[0];
                                                    if (c < o) {
                                                        console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
                                                        break
                                                    }
                                                    o = c - 1
                                                }
                                            }
                                        l._$I0 = new Float32Array(p),
                                        u > i._$yT && (i._$yT = u)
                                    }
                                }
                            } else {
                                for (var a = o, h = -1; o < r && "\r" != (s = J(t, o)) && "\n" != s; ++o)
                                    if ("=" == s) {
                                        h = o;
                                        break
                                    }
                                var $ = !1;
                                if (h >= 0) {
                                    for (h == a + 4 && "f" == J(t, a + 1) && "p" == J(t, a + 2) && "s" == J(t, a + 3) && ($ = !0),
                                    o = h + 1; o < r && "\r" != (s = J(t, o)) && "\n" != s; ++o)
                                        if ("," != s && " " != s && "	" != s) {
                                            var f = D._$LS(t, r, o, e);
                                            e[0] > 0 && $ && 5 < f && f < 121 && (i._$D0 = f),
                                            o = e[0]
                                        }
                                }
                                for (; o < r && "\n" != J(t, o) && "\r" != J(t, o); ++o)
                                    ;
                            }
                        } else
                            for (; o < r && "\n" != J(t, o) && "\r" != J(t, o); ++o)
                                ;
                    }
                }
                return i._$rr = 1e3 * i._$yT / i._$D0 | 0,
                i
            }
            ,
            j.prototype.getDurationMSec = function() {
                return this._$E ? -1 : this._$rr
            }
            ,
            j.prototype.getLoopDurationMSec = function() {
                return this._$rr
            }
            ,
            j.prototype.dump = function() {
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t];
                    console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
                    for (var e = 0; e < i._$I0.length && e < 10; e++)
                        console.log("%5.2f ,", i._$I0[e]);
                    console.log("\n")
                }
            }
            ,
            j.prototype.updateParamExe = function(t, i, e, r) {
                for (var o = i - r._$z2, s = o * this._$D0 / 1e3, n = 0 | s, a = s - n, h = 0; h < this.motions.length; h++) {
                    var l = this.motions[h]
                      , u = l._$I0.length
                      , p = l._$4P;
                    if (l._$RP == N._$hs) {
                        var f = l._$I0[n >= u ? u - 1 : n];
                        t.setParamFloat(p, f)
                    } else if (N._$ws <= l._$RP && l._$RP <= N._$Ys)
                        ;
                    else {
                        var c, $ = t.getParamIndex(p), _ = t.getModelContext(), d = _.getParamMax($), g = _.getParamMin($), y = .4 * (d - g), T = _.getParamFloat($), v = l._$I0[n >= u ? u - 1 : n], P = l._$I0[n + 1 >= u ? u - 1 : n + 1], S = T + ((c = v < P && P - v > y || v > P && v - P > y ? v : v + (P - v) * a) - T) * e;
                        t.setParamFloat(p, S)
                    }
                }
                n >= this._$yT && (this._$E ? (r._$z2 = i,
                this.loopFadeIn && (r._$bs = i)) : r._$9L = !0),
                this._$eP = e
            }
            ,
            j.prototype._$r0 = function() {
                return this._$E
            }
            ,
            j.prototype._$aL = function(t) {
                this._$E = t
            }
            ,
            j.prototype._$S0 = function() {
                return this._$D0
            }
            ,
            j.prototype._$U0 = function(t) {
                this._$D0 = t
            }
            ,
            j.prototype.isLoopFadeIn = function() {
                return this.loopFadeIn
            }
            ,
            j.prototype.setLoopFadeIn = function(t) {
                this.loopFadeIn = t
            }
            ,
            F.prototype.clear = function() {
                this.size = 0
            }
            ,
            F.prototype.add = function(t) {
                if (this._$P.length <= this.size) {
                    var i = new Float32Array(2 * this.size);
                    I._$jT(this._$P, 0, i, 0, this.size),
                    this._$P = i
                }
                this._$P[this.size++] = t
            }
            ,
            F.prototype._$BL = function() {
                var t = new Float32Array(this.size);
                return I._$jT(this._$P, 0, t, 0, this.size),
                t
            }
            ,
            N._$Fr = 0,
            N._$hs = 1,
            N._$ws = 100,
            N._$Ns = 101,
            N._$xs = 102,
            N._$us = 103,
            N._$qs = 104,
            N._$Ys = 105,
            Q.prototype = new x,
            Q._$gT = [],
            Q.prototype._$zP = function() {
                this._$GS = new A,
                this._$GS._$zP()
            }
            ,
            Q.prototype._$F0 = function(t) {
                x.prototype._$F0.call(this, t),
                this._$A = t._$6L(),
                this._$o = t._$6L(),
                this._$GS = t._$nP(),
                this._$Eo = t._$nP(),
                x.prototype.readV2_opacity.call(this, t)
            }
            ,
            Q.prototype.init = function(t) {
                var i = new Z(this)
                  , e = (this._$o + 1) * (this._$A + 1);
                return null != i._$Cr && (i._$Cr = null),
                i._$Cr = new Float32Array(2 * e),
                null != i._$hr && (i._$hr = null),
                this._$32() ? i._$hr = new Float32Array(2 * e) : i._$hr = null,
                i
            }
            ,
            Q.prototype._$Nr = function(t, i) {
                if (this._$GS._$Ur(t)) {
                    var e = this._$VT()
                      , r = Q._$gT;
                    r[0] = !1,
                    P._$Vr(t, this._$GS, r, e, this._$Eo, i._$Cr, 0, 2),
                    i._$Ib(r[0]),
                    this.interpolateOpacity(t, this._$GS, i, r)
                }
            }
            ,
            Q.prototype._$2b = function(t, i) {
                var e = i;
                if (e._$hS(!0),
                this._$32()) {
                    var r = this.getTargetBaseDataID();
                    if (e._$8r == x._$ur && (e._$8r = t.getBaseDataIndex(r)),
                    e._$8r < 0)
                        tn._$so && a._$li("_$L _$0P _$G :: %s", r),
                        e._$hS(!1);
                    else {
                        var o = t.getBaseData(e._$8r)
                          , s = t._$q2(e._$8r);
                        if (null != o && s._$yo()) {
                            var n = s.getTotalScale();
                            e.setTotalScale_notForClient(n);
                            var h = s.getTotalOpacity();
                            e.setTotalOpacity(h * e.getInterpolatedOpacity()),
                            o._$nb(t, s, e._$Cr, e._$hr, this._$VT(), 0, 2),
                            e._$hS(!0)
                        } else
                            e._$hS(!1)
                    }
                } else
                    e.setTotalOpacity(e.getInterpolatedOpacity())
            }
            ,
            Q.prototype._$nb = function(t, i, e, r, o, s, n) {
                var a = i
                  , h = null != a._$hr ? a._$hr : a._$Cr;
                Q.transformPoints_sdk2(e, r, o, s, n, h, this._$o, this._$A)
            }
            ,
            Q.transformPoints_sdk2 = function(i, e, r, o, s, n, a, h) {
                for (var l, u, p, f, c, $, _, d = r * s, g = 0, y = 0, T = 0, v = 0, P = 0, S = 0, L = !1, E = o; E < d; E += s)
                    if (p = i[E],
                    f = i[E + 1],
                    l = p * a,
                    u = f * h,
                    l < 0 || u < 0 || a <= l || h <= u) {
                        var M = a + 1;
                        if (!L) {
                            L = !0,
                            g = .25 * (n[2 * (0 + 0 * M)] + n[2 * (a + 0 * M)] + n[2 * (0 + h * M)] + n[2 * (a + h * M)]),
                            y = .25 * (n[2 * (0 + 0 * M) + 1] + n[2 * (a + 0 * M) + 1] + n[2 * (0 + h * M) + 1] + n[2 * (a + h * M) + 1]);
                            var x = n[2 * (a + h * M)] - n[2 * (0 + 0 * M)]
                              , I = n[2 * (a + h * M) + 1] - n[2 * (0 + 0 * M) + 1]
                              , O = n[2 * (a + 0 * M)] - n[2 * (0 + h * M)]
                              , D = n[2 * (a + 0 * M) + 1] - n[2 * (0 + h * M) + 1];
                            T = .5 * (x + O),
                            v = .5 * (I + D),
                            P = .5 * (x - O),
                            S = .5 * (I - D),
                            g -= .5 * (T + P),
                            y -= .5 * (v + S)
                        }
                        if (-2 < p && p < 3 && -2 < f && f < 3) {
                            if (p <= 0) {
                                if (f <= 0) {
                                    var A = n[2 * (0 + 0 * M)]
                                      , R = n[2 * (0 + 0 * M) + 1]
                                      , w = g - 2 * T
                                      , b = y - 2 * v
                                      , C = g - 2 * P
                                      , F = y - 2 * S
                                      , N = g - 2 * T - 2 * P
                                      , B = y - 2 * v - 2 * S
                                      , G = .5 * (p - -2)
                                      , U = .5 * (f - -2);
                                    G + U <= 1 ? (e[E] = N + (C - N) * G + (w - N) * U,
                                    e[E + 1] = B + (F - B) * G + (b - B) * U) : (e[E] = A + (w - A) * (1 - G) + (C - A) * (1 - U),
                                    e[E + 1] = R + (b - R) * (1 - G) + (F - R) * (1 - U))
                                } else if (f >= 1) {
                                    var C = n[2 * (0 + h * M)]
                                      , F = n[2 * (0 + h * M) + 1]
                                      , N = g - 2 * T + 1 * P
                                      , B = y - 2 * v + 1 * S
                                      , A = g + 3 * P
                                      , R = y + 3 * S
                                      , w = g - 2 * T + 3 * P
                                      , b = y - 2 * v + 3 * S
                                      , G = .5 * (p - -2)
                                      , U = .5 * (f - 1);
                                    G + U <= 1 ? (e[E] = N + (C - N) * G + (w - N) * U,
                                    e[E + 1] = B + (F - B) * G + (b - B) * U) : (e[E] = A + (w - A) * (1 - G) + (C - A) * (1 - U),
                                    e[E + 1] = R + (b - R) * (1 - G) + (F - R) * (1 - U))
                                } else {
                                    var Y = 0 | u;
                                    Y == h && (Y = h - 1);
                                    var G = .5 * (p - -2)
                                      , U = u - Y
                                      , k = Y / h
                                      , V = (Y + 1) / h
                                      , C = n[2 * (0 + Y * M)]
                                      , F = n[2 * (0 + Y * M) + 1]
                                      , A = n[2 * (0 + (Y + 1) * M)]
                                      , R = n[2 * (0 + (Y + 1) * M) + 1]
                                      , N = g - 2 * T + k * P
                                      , B = y - 2 * v + k * S
                                      , w = g - 2 * T + V * P
                                      , b = y - 2 * v + V * S;
                                    G + U <= 1 ? (e[E] = N + (C - N) * G + (w - N) * U,
                                    e[E + 1] = B + (F - B) * G + (b - B) * U) : (e[E] = A + (w - A) * (1 - G) + (C - A) * (1 - U),
                                    e[E + 1] = R + (b - R) * (1 - G) + (F - R) * (1 - U))
                                }
                            } else if (1 <= p) {
                                if (f <= 0) {
                                    var w = n[2 * (a + 0 * M)]
                                      , b = n[2 * (a + 0 * M) + 1]
                                      , A = g + 3 * T
                                      , R = y + 3 * v
                                      , N = g + 1 * T - 2 * P
                                      , B = y + 1 * v - 2 * S
                                      , C = g + 3 * T - 2 * P
                                      , F = y + 3 * v - 2 * S
                                      , G = .5 * (p - 1)
                                      , U = .5 * (f - -2);
                                    G + U <= 1 ? (e[E] = N + (C - N) * G + (w - N) * U,
                                    e[E + 1] = B + (F - B) * G + (b - B) * U) : (e[E] = A + (w - A) * (1 - G) + (C - A) * (1 - U),
                                    e[E + 1] = R + (b - R) * (1 - G) + (F - R) * (1 - U))
                                } else if (f >= 1) {
                                    var N = n[2 * (a + h * M)]
                                      , B = n[2 * (a + h * M) + 1]
                                      , C = g + 3 * T + 1 * P
                                      , F = y + 3 * v + 1 * S
                                      , w = g + 1 * T + 3 * P
                                      , b = y + 1 * v + 3 * S
                                      , A = g + 3 * T + 3 * P
                                      , R = y + 3 * v + 3 * S
                                      , G = .5 * (p - 1)
                                      , U = .5 * (f - 1);
                                    G + U <= 1 ? (e[E] = N + (C - N) * G + (w - N) * U,
                                    e[E + 1] = B + (F - B) * G + (b - B) * U) : (e[E] = A + (w - A) * (1 - G) + (C - A) * (1 - U),
                                    e[E + 1] = R + (b - R) * (1 - G) + (F - R) * (1 - U))
                                } else {
                                    var Y = 0 | u;
                                    Y == h && (Y = h - 1);
                                    var G = .5 * (p - 1)
                                      , U = u - Y
                                      , k = Y / h
                                      , V = (Y + 1) / h
                                      , N = n[2 * (a + Y * M)]
                                      , B = n[2 * (a + Y * M) + 1]
                                      , w = n[2 * (a + (Y + 1) * M)]
                                      , b = n[2 * (a + (Y + 1) * M) + 1]
                                      , C = g + 3 * T + k * P
                                      , F = y + 3 * v + k * S
                                      , A = g + 3 * T + V * P
                                      , R = y + 3 * v + V * S;
                                    G + U <= 1 ? (e[E] = N + (C - N) * G + (w - N) * U,
                                    e[E + 1] = B + (F - B) * G + (b - B) * U) : (e[E] = A + (w - A) * (1 - G) + (C - A) * (1 - U),
                                    e[E + 1] = R + (b - R) * (1 - G) + (F - R) * (1 - U))
                                }
                            } else if (f <= 0) {
                                var X = 0 | l;
                                X == a && (X = a - 1);
                                var G = l - X
                                  , U = .5 * (f - -2)
                                  , z = X / a
                                  , H = (X + 1) / a
                                  , w = n[2 * (X + 0 * M)]
                                  , b = n[2 * (X + 0 * M) + 1]
                                  , A = n[2 * (X + 1 + 0 * M)]
                                  , R = n[2 * (X + 1 + 0 * M) + 1]
                                  , N = g + z * T - 2 * P
                                  , B = y + z * v - 2 * S
                                  , C = g + H * T - 2 * P
                                  , F = y + H * v - 2 * S;
                                G + U <= 1 ? (e[E] = N + (C - N) * G + (w - N) * U,
                                e[E + 1] = B + (F - B) * G + (b - B) * U) : (e[E] = A + (w - A) * (1 - G) + (C - A) * (1 - U),
                                e[E + 1] = R + (b - R) * (1 - G) + (F - R) * (1 - U))
                            } else if (f >= 1) {
                                var X = 0 | l;
                                X == a && (X = a - 1);
                                var G = l - X
                                  , U = .5 * (f - 1)
                                  , z = X / a
                                  , H = (X + 1) / a
                                  , N = n[2 * (X + h * M)]
                                  , B = n[2 * (X + h * M) + 1]
                                  , C = n[2 * (X + 1 + h * M)]
                                  , F = n[2 * (X + 1 + h * M) + 1]
                                  , w = g + z * T + 3 * P
                                  , b = y + z * v + 3 * S
                                  , A = g + H * T + 3 * P
                                  , R = y + H * v + 3 * S;
                                G + U <= 1 ? (e[E] = N + (C - N) * G + (w - N) * U,
                                e[E + 1] = B + (F - B) * G + (b - B) * U) : (e[E] = A + (w - A) * (1 - G) + (C - A) * (1 - U),
                                e[E + 1] = R + (b - R) * (1 - G) + (F - R) * (1 - U))
                            } else
                                t.err.printf("_$li calc : %.4f , %.4f					@@BDBoxGrid\n", p, f)
                        } else
                            e[E] = g + p * T + f * P,
                            e[E + 1] = y + p * v + f * S
                    } else
                        $ = l - (0 | l),
                        _ = u - (0 | u),
                        c = 2 * ((0 | l) + (0 | u) * (a + 1)),
                        $ + _ < 1 ? (e[E] = n[c] * (1 - $ - _) + n[c + 2] * $ + n[c + 2 * (a + 1)] * _,
                        e[E + 1] = n[c + 1] * (1 - $ - _) + n[c + 3] * $ + n[c + 2 * (a + 1) + 1] * _) : (e[E] = n[c + 2 * (a + 1) + 2] * ($ - 1 + _) + n[c + 2 * (a + 1)] * (1 - $) + n[c + 2] * (1 - _),
                        e[E + 1] = n[c + 2 * (a + 1) + 3] * ($ - 1 + _) + n[c + 2 * (a + 1) + 1] * (1 - $) + n[c + 3] * (1 - _))
            }
            ,
            Q.prototype.transformPoints_sdk1 = function(t, i, e, r, o, s, n) {
                for (var a, h, l, u, p, f, c, $ = i, _ = this._$o, d = this._$A, g = o * n, y = null != $._$hr ? $._$hr : $._$Cr, T = s; T < g; T += n)
                    tn._$ts ? (a = e[T],
                    h = e[T + 1],
                    a < 0 ? a = 0 : a > 1 && (a = 1),
                    h < 0 ? h = 0 : h > 1 && (h = 1),
                    a *= _,
                    h *= d,
                    l = 0 | a,
                    u = 0 | h,
                    l > _ - 1 && (l = _ - 1),
                    u > d - 1 && (u = d - 1),
                    f = a - l,
                    c = h - u,
                    p = 2 * (l + u * (_ + 1))) : (a = e[T] * _,
                    h = e[T + 1] * d,
                    f = a - (0 | a),
                    c = h - (0 | h),
                    p = 2 * ((0 | a) + (0 | h) * (_ + 1))),
                    f + c < 1 ? (r[T] = y[p] * (1 - f - c) + y[p + 2] * f + y[p + 2 * (_ + 1)] * c,
                    r[T + 1] = y[p + 1] * (1 - f - c) + y[p + 3] * f + y[p + 2 * (_ + 1) + 1] * c) : (r[T] = y[p + 2 * (_ + 1) + 2] * (f - 1 + c) + y[p + 2 * (_ + 1)] * (1 - f) + y[p + 2] * (1 - c),
                    r[T + 1] = y[p + 2 * (_ + 1) + 3] * (f - 1 + c) + y[p + 2 * (_ + 1) + 1] * (1 - f) + y[p + 3] * (1 - c))
            }
            ,
            Q.prototype._$VT = function() {
                return (this._$o + 1) * (this._$A + 1)
            }
            ,
            Q.prototype.getType = function() {
                return x._$_b
            }
            ,
            Z.prototype = new ts,
            K._$42 = 0,
            K.prototype._$zP = function() {
                this._$3S = [],
                this._$aS = []
            }
            ,
            K.prototype._$F0 = function(t) {
                this._$g0 = t._$8L(),
                this.visible = t._$8L(),
                this._$NL = t._$nP(),
                this._$3S = t._$nP(),
                this._$aS = t._$nP()
            }
            ,
            K.prototype.init = function(t) {
                var i = new tt(this);
                return i.setPartsOpacity(this.isVisible() ? 1 : 0),
                i
            }
            ,
            K.prototype._$6o = function(t) {
                if (null == this._$3S)
                    throw Error("_$3S _$6 _$Wo@_$6o");
                this._$3S.push(t)
            }
            ,
            K.prototype._$3o = function(t) {
                if (null == this._$aS)
                    throw Error("_$aS _$6 _$Wo@_$3o");
                this._$aS.push(t)
            }
            ,
            K.prototype._$Zo = function(t) {
                this._$3S = t
            }
            ,
            K.prototype._$xo = function(t) {
                this._$aS = t
            }
            ,
            K.prototype.isVisible = function() {
                return this.visible
            }
            ,
            K.prototype._$uL = function() {
                return this._$g0
            }
            ,
            K.prototype._$KP = function(t) {
                this.visible = t
            }
            ,
            K.prototype._$ET = function(t) {
                this._$g0 = t
            }
            ,
            K.prototype.getBaseData = function() {
                return this._$3S
            }
            ,
            K.prototype.getDrawData = function() {
                return this._$aS
            }
            ,
            K.prototype._$p2 = function() {
                return this._$NL
            }
            ,
            K.prototype._$ob = function(t) {
                this._$NL = t
            }
            ,
            K.prototype.getPartsID = function() {
                return this._$NL
            }
            ,
            K.prototype._$MP = function(t) {
                this._$NL = t
            }
            ,
            tt.prototype = new function t() {}
            ,
            tt.prototype.getPartsOpacity = function() {
                return this._$VS
            }
            ,
            tt.prototype.setPartsOpacity = function(t) {
                this._$VS = t
            }
            ,
            ti._$L7 = function() {
                p._$27(),
                t$._$27(),
                w._$27(),
                u._$27()
            }
            ,
            ti.prototype.toString = function() {
                return this.id
            }
            ,
            (function t() {}
            ).prototype._$F0 = function(t) {}
            ,
            te.prototype._$1s = function() {
                return this._$4S
            }
            ,
            te.prototype._$zP = function() {
                this._$4S = []
            }
            ,
            te.prototype._$F0 = function(t) {
                this._$4S = t._$nP()
            }
            ,
            te.prototype._$Ks = function(t) {
                this._$4S.push(t)
            }
            ,
            tr.tr = new tc,
            tr._$50 = new tc,
            tr._$Ti = [0, 0],
            tr._$Pi = [0, 0],
            tr._$B = [0, 0],
            tr.prototype._$lP = function(t, i, e, r) {
                this.viewport = [t, i, e, r]
            }
            ,
            tr.prototype._$bL = function() {
                this.context.save();
                var t = this.viewport;
                null != t && (this.context.beginPath(),
                this.context._$Li(t[0], t[1], t[2], t[3]),
                this.context.clip())
            }
            ,
            tr.prototype._$ei = function() {
                this.context.restore()
            }
            ,
            tr.prototype.drawElements = function(t, i, e, r, o, s, n, h) {
                try {
                    o != this._$Qo && (this._$Qo = o,
                    this.context.globalAlpha = o);
                    for (var l = i.length, u = t.width, p = t.height, f = this.context, c = this._$xP, $ = this._$uP, _ = this._$6r, d = this._$3r, g = tr.tr, y = tr._$Ti, T = tr._$Pi, v = tr._$B, P = 0; P < l; P += 3) {
                        f.save();
                        var S = i[P]
                          , L = i[P + 1]
                          , E = i[P + 2]
                          , M = c + _ * e[2 * S]
                          , x = $ + d * e[2 * S + 1]
                          , I = c + _ * e[2 * L]
                          , O = $ + d * e[2 * L + 1]
                          , D = c + _ * e[2 * E]
                          , A = $ + d * e[2 * E + 1];
                        n && (n._$PS(M, x, v),
                        M = v[0],
                        x = v[1],
                        n._$PS(I, O, v),
                        I = v[0],
                        O = v[1],
                        n._$PS(D, A, v),
                        D = v[0],
                        A = v[1]);
                        var R = u * r[2 * S]
                          , w = p - p * r[2 * S + 1]
                          , b = u * r[2 * L]
                          , C = p - p * r[2 * L + 1]
                          , F = u * r[2 * E]
                          , N = p - p * r[2 * E + 1]
                          , B = Math.atan2(C - w, b - R)
                          , G = Math.atan2(O - x, I - M)
                          , U = I - M
                          , Y = O - x
                          , k = Math.sqrt(U * U + Y * Y)
                          , V = b - R
                          , X = C - w
                          , z = Math.sqrt(V * V + X * X)
                          , H = k / z;
                        t0._$ni(F, N, R, w, b - R, C - w, -(C - w), b - R, y),
                        t0._$ni(D, A, M, x, I - M, O - x, -(O - x), I - M, T);
                        var W = (T[0] - y[0]) / y[1]
                          , q = Math.min(R, b, F)
                          , j = Math.max(R, b, F)
                          , J = Math.min(w, C, N)
                          , Q = Math.max(w, C, N)
                          , Z = Math.floor(q)
                          , K = Math.floor(J)
                          , tt = Math.ceil(j)
                          , ti = Math.ceil(Q);
                        if (g.identity(),
                        g.translate(M, x),
                        g.rotate(G),
                        g.scale(1, T[1] / y[1]),
                        g.shear(W, 0),
                        g.scale(H, H),
                        g.rotate(-B),
                        g.translate(-R, -w),
                        g.setContext(f),
                        s || (s = 1.2),
                        tn.IGNORE_EXPAND && (s = 0),
                        tn.USE_CACHED_POLYGON_IMAGE) {
                            var te = h._$e0;
                            if (te.gl_cacheImage = te.gl_cacheImage || {},
                            !te.gl_cacheImage[P]) {
                                var to = tr.createCanvas(tt - Z, ti - K);
                                tn.DEBUG_DATA.LDGL_CANVAS_MB = tn.DEBUG_DATA.LDGL_CANVAS_MB || 0,
                                tn.DEBUG_DATA.LDGL_CANVAS_MB += (tt - Z) * (ti - K) * 4;
                                var ts = to.getContext("2d");
                                ts.translate(-Z, -K),
                                tr.clip(ts, g, s, k, R, w, b, C, F, N, M, x, I, O, D, A),
                                ts.drawImage(t, 0, 0),
                                te.gl_cacheImage[P] = {
                                    cacheCanvas: to,
                                    cacheContext: ts
                                }
                            }
                            f.drawImage(te.gl_cacheImage[P].cacheCanvas, Z, K)
                        } else
                            tn.IGNORE_CLIP || tr.clip(f, g, s, k, R, w, b, C, F, N, M, x, I, O, D, A),
                            tn.USE_ADJUST_TRANSLATION && (q = 0,
                            j = u,
                            J = 0,
                            Q = p),
                            f.drawImage(t, q, J, j - q, Q - J, q, J, j - q, Q - J);
                        f.restore()
                    }
                } catch (t8) {
                    a._$Rb(t8)
                }
            }
            ,
            tr.clip = function(t, i, e, r, o, s, n, a, h, l, u, p, f, c, $, _) {
                e > .02 ? tr.expandClip(t, i, e, r, u, p, f, c, $, _) : tr.clipWithTransform(t, null, o, s, n, a, h, l)
            }
            ,
            tr.expandClip = function(t, i, e, r, o, s, n, a, h, l) {
                var u = n - o
                  , p = a - s
                  , f = h - o
                  , c = l - s
                  , $ = u * c - p * f > 0 ? e : -e
                  , _ = -p
                  , d = u
                  , g = h - n
                  , y = l - a
                  , T = -y
                  , v = g
                  , P = Math.sqrt(g * g + y * y)
                  , S = -c
                  , L = f
                  , E = Math.sqrt(f * f + c * c)
                  , M = tr._$50;
                return null != i._$P2(M) && (tr.clipWithTransform(t, M, o - $ * _ / r, s - $ * d / r, n - $ * _ / r, a - $ * d / r, n - $ * T / P, a - $ * v / P, h - $ * T / P, l - $ * v / P, h + $ * S / E, l + $ * L / E, o + $ * S / E, s + $ * L / E),
                !0)
            }
            ,
            tr.clipWithTransform = function(t, i, e, r, o, s, n, h) {
                if (arguments.length < 7)
                    return void a._$li("err : @LDGL.clip()");
                if (!(arguments[1]instanceof tc))
                    return void a._$li("err : a[0] is _$6 LDTransform @LDGL.clip()");
                var l = tr._$B
                  , u = i
                  , p = arguments;
                if (t.beginPath(),
                u) {
                    u._$PS(p[2], p[3], l),
                    t.moveTo(l[0], l[1]);
                    for (var f = 4; f < p.length; f += 2)
                        u._$PS(p[f], p[f + 1], l),
                        t.lineTo(l[0], l[1])
                } else {
                    t.moveTo(p[2], p[3]);
                    for (var f = 4; f < p.length; f += 2)
                        t.lineTo(p[f], p[f + 1])
                }
                t.clip()
            }
            ,
            tr.createCanvas = function(t, i) {
                var e = document.createElement("canvas");
                return e.setAttribute("width", t),
                e.setAttribute("height", i),
                e || a._$li("err : " + e),
                e
            }
            ,
            tr.dumpValues = function() {
                for (var t = "", i = 0; i < arguments.length; i++)
                    t += "[" + i + "]= " + arguments[i].toFixed(3) + " , ";
                console.log(t)
            }
            ,
            to.prototype._$F0 = function(t) {
                this._$TT = t._$_T(),
                this._$LT = t._$_T(),
                this._$FS = t._$_T(),
                this._$wL = t._$nP()
            }
            ,
            to.prototype.getMinValue = function() {
                return this._$TT
            }
            ,
            to.prototype.getMaxValue = function() {
                return this._$LT
            }
            ,
            to.prototype.getDefaultValue = function() {
                return this._$FS
            }
            ,
            to.prototype.getParamID = function() {
                return this._$wL
            }
            ,
            ts.prototype._$yo = function() {
                return this._$AT && !this._$JS
            }
            ,
            ts.prototype._$hS = function(t) {
                this._$AT = t
            }
            ,
            ts.prototype._$GT = function() {
                return this._$e0
            }
            ,
            ts.prototype._$l2 = function(t) {
                this._$IP = t
            }
            ,
            ts.prototype.getPartsIndex = function() {
                return this._$IP
            }
            ,
            ts.prototype._$x2 = function() {
                return this._$JS
            }
            ,
            ts.prototype._$Ib = function(t) {
                this._$JS = t
            }
            ,
            ts.prototype.getTotalScale = function() {
                return this.totalScale
            }
            ,
            ts.prototype.setTotalScale_notForClient = function(t) {
                this.totalScale = t
            }
            ,
            ts.prototype.getInterpolatedOpacity = function() {
                return this._$7s
            }
            ,
            ts.prototype.setInterpolatedOpacity = function(t) {
                this._$7s = t
            }
            ,
            ts.prototype.getTotalOpacity = function(t) {
                return this.totalOpacity
            }
            ,
            ts.prototype.setTotalOpacity = function(t) {
                this.totalOpacity = t
            }
            ,
            tn._$2s = "2.1.00_1",
            tn._$Kr = 201001e3,
            tn._$sP = !0,
            tn._$so = !0,
            tn._$cb = !1,
            tn._$3T = !0,
            tn._$Ts = !0,
            tn._$fb = !0,
            tn._$ts = !0,
            tn.L2D_DEFORMER_EXTEND = !0,
            tn._$Wb = !1,
            tn._$yr = !1,
            tn._$Zs = !1,
            tn.L2D_NO_ERROR = 0,
            tn._$i7 = 1e3,
            tn._$9s = 1001,
            tn._$es = 1100,
            tn._$r7 = 2e3,
            tn._$07 = 2001,
            tn._$b7 = 2002,
            tn._$H7 = 4e3,
            tn.L2D_COLOR_BLEND_MODE_MULT = 0,
            tn.L2D_COLOR_BLEND_MODE_ADD = 1,
            tn.L2D_COLOR_BLEND_MODE_INTERPOLATE = 2,
            tn._$6b = !0,
            tn._$cT = 0,
            tn.clippingMaskBufferSize = 256,
            tn.glContext = [],
            tn.frameBuffers = [],
            tn.fTexture = [],
            tn.IGNORE_CLIP = !1,
            tn.IGNORE_EXPAND = !1,
            tn.EXPAND_W = 2,
            tn.USE_ADJUST_TRANSLATION = !0,
            tn.USE_CANVAS_TRANSFORM = !0,
            tn.USE_CACHED_POLYGON_IMAGE = !1,
            tn.DEBUG_DATA = {},
            tn.PROFILE_IOS_SPEED = {
                PROFILE_NAME: "iOS Speed",
                USE_ADJUST_TRANSLATION: !0,
                USE_CACHED_POLYGON_IMAGE: !0,
                EXPAND_W: 4
            },
            tn.PROFILE_IOS_QUALITY = {
                PROFILE_NAME: "iOS HiQ",
                USE_ADJUST_TRANSLATION: !0,
                USE_CACHED_POLYGON_IMAGE: !1,
                EXPAND_W: 2
            },
            tn.PROFILE_IOS_DEFAULT = tn.PROFILE_IOS_QUALITY,
            tn.PROFILE_ANDROID = {
                PROFILE_NAME: "Android",
                USE_ADJUST_TRANSLATION: !1,
                USE_CACHED_POLYGON_IMAGE: !1,
                EXPAND_W: 2
            },
            tn.PROFILE_DESKTOP = {
                PROFILE_NAME: "Desktop",
                USE_ADJUST_TRANSLATION: !1,
                USE_CACHED_POLYGON_IMAGE: !1,
                EXPAND_W: 2
            },
            tn.initProfile = function() {
                tv.isIOS() ? tn.setupProfile(tn.PROFILE_IOS_DEFAULT) : tv.isAndroid() ? tn.setupProfile(tn.PROFILE_ANDROID) : tn.setupProfile(tn.PROFILE_DESKTOP)
            }
            ,
            tn.setupProfile = function(t, i) {
                if ("number" == typeof t)
                    switch (t) {
                    case 9901:
                        t = tn.PROFILE_IOS_SPEED;
                        break;
                    case 9902:
                        t = tn.PROFILE_IOS_QUALITY;
                        break;
                    case 9903:
                        t = tn.PROFILE_IOS_DEFAULT;
                        break;
                    case 9904:
                        t = tn.PROFILE_ANDROID;
                        break;
                    case 9905:
                        t = tn.PROFILE_DESKTOP;
                        break;
                    default:
                        alert("profile _$6 _$Ui : " + t)
                    }
                for (var e in arguments.length < 2 && (i = !0),
                i && console.log("profile : " + t.PROFILE_NAME),
                t)
                    tn[e] = t[e],
                    i && console.log("  [" + e + "] = " + t[e])
            }
            ,
            tn.init = function() {
                tn._$6b && (console.log("Live2D %s", tn._$2s),
                tn._$6b = !1,
                tn.initProfile())
            }
            ,
            tn.getVersionStr = function() {
                return tn._$2s
            }
            ,
            tn.getVersionNo = function() {
                return tn._$Kr
            }
            ,
            tn._$sT = function(t) {
                tn._$cT = t
            }
            ,
            tn.getError = function() {
                var t = tn._$cT;
                return tn._$cT = 0,
                t
            }
            ,
            tn.dispose = function() {
                tn.glContext = [],
                tn.frameBuffers = [],
                tn.fTexture = []
            }
            ,
            tn.setGL = function(t, i) {
                var e = i || 0;
                tn.glContext[e] = t
            }
            ,
            tn.getGL = function(t) {
                return tn.glContext[t]
            }
            ,
            tn.setClippingMaskBufferSize = function(t) {
                tn.clippingMaskBufferSize = t
            }
            ,
            tn.getClippingMaskBufferSize = function() {
                return tn.clippingMaskBufferSize
            }
            ,
            tn.deleteBuffer = function(t) {
                tn.getGL(t).deleteFramebuffer(tn.frameBuffers[t].framebuffer),
                delete tn.frameBuffers[t],
                delete tn.glContext[t]
            }
            ,
            t8._$r2 = function(t) {
                return t < 0 ? 0 : t > 1 ? 1 : .5 - .5 * Math.cos(t * tm.PI_F)
            }
            ,
            ta._$fr = -1,
            ta.prototype.toString = function() {
                return this._$ib
            }
            ,
            th.prototype = new H,
            th._$42 = 0,
            th._$Os = 30,
            th._$ms = 0,
            th._$ns = 1,
            th._$_s = 2,
            th._$gT = [],
            th.prototype._$_S = function(t) {
                this._$LP = t
            }
            ,
            th.prototype.getTextureNo = function() {
                return this._$LP
            }
            ,
            th.prototype._$ZL = function() {
                return this._$Qi
            }
            ,
            th.prototype._$H2 = function() {
                return this._$JP
            }
            ,
            th.prototype.getNumPoints = function() {
                return this._$d0
            }
            ,
            th.prototype.getType = function() {
                return H._$wb
            }
            ,
            th.prototype._$B2 = function(t, i, e) {
                var r = i
                  , o = null != r._$hr ? r._$hr : r._$Cr;
                switch (B._$do) {
                default:
                case B._$Ms:
                    throw Error("_$L _$ro ");
                case B._$Qs:
                    for (var s = this._$d0 - 1; s >= 0; --s)
                        o[s * B._$No + 4] = e
                }
            }
            ,
            th.prototype._$zP = function() {
                this._$GS = new A,
                this._$GS._$zP()
            }
            ,
            th.prototype._$F0 = function(t) {
                H.prototype._$F0.call(this, t),
                this._$LP = t._$6L(),
                this._$d0 = t._$6L(),
                this._$Yo = t._$6L();
                var i = t._$nP();
                this._$BP = new Int16Array(3 * this._$Yo);
                for (var e = 3 * this._$Yo - 1; e >= 0; --e)
                    this._$BP[e] = i[e];
                if (this._$Eo = t._$nP(),
                this._$Qi = t._$nP(),
                t.getFormatVersion() >= G._$s7) {
                    if (this._$JP = t._$6L(),
                    0 != this._$JP) {
                        if (0 != (1 & this._$JP)) {
                            var r = t._$6L();
                            null == this._$5P && (this._$5P = {}),
                            this._$5P._$Hb = parseInt(r)
                        }
                        0 != (this._$JP & th._$Os) ? this._$6s = (this._$JP & th._$Os) >> 1 : this._$6s = th._$ms,
                        0 != (32 & this._$JP) && (this.culling = !1)
                    }
                } else
                    this._$JP = 0
            }
            ,
            th.prototype.init = function(t) {
                var i = new t9(this)
                  , e = this._$d0 * B._$No
                  , r = this._$32();
                switch (null != i._$Cr && (i._$Cr = null),
                i._$Cr = new Float32Array(e),
                null != i._$hr && (i._$hr = null),
                i._$hr = r ? new Float32Array(e) : null,
                B._$do) {
                default:
                case B._$Ms:
                    if (B._$Ls)
                        for (var o = this._$d0 - 1; o >= 0; --o) {
                            var s = o << 1;
                            this._$Qi[s + 1] = 1 - this._$Qi[s + 1]
                        }
                    break;
                case B._$Qs:
                    for (var o = this._$d0 - 1; o >= 0; --o) {
                        var s = o << 1
                          , n = o * B._$No
                          , a = this._$Qi[s]
                          , h = this._$Qi[s + 1];
                        i._$Cr[n] = a,
                        i._$Cr[n + 1] = h,
                        i._$Cr[n + 4] = 0,
                        r && (i._$hr[n] = a,
                        i._$hr[n + 1] = h,
                        i._$hr[n + 4] = 0)
                    }
                }
                return i
            }
            ,
            th.prototype._$Nr = function(t, i) {
                var e = i;
                if (this != e._$GT() && console.log("### assert!! ### "),
                this._$GS._$Ur(t) && (H.prototype._$Nr.call(this, t, e),
                !e._$IS[0])) {
                    var r = th._$gT;
                    r[0] = !1,
                    P._$Vr(t, this._$GS, r, this._$d0, this._$Eo, e._$Cr, B._$i2, B._$No)
                }
            }
            ,
            th.prototype._$2b = function(t, i) {
                try {
                    this != i._$GT() && console.log("### assert!! ### ");
                    var e = !1;
                    i._$IS[0] && (e = !0);
                    var r = i;
                    if (!e && (H.prototype._$2b.call(this, t),
                    this._$32())) {
                        var o = this.getTargetBaseDataID();
                        if (r._$8r == H._$ur && (r._$8r = t.getBaseDataIndex(o)),
                        r._$8r < 0)
                            tn._$so && a._$li("_$L _$0P _$G :: %s", o);
                        else {
                            var s = t.getBaseData(r._$8r)
                              , n = t._$q2(r._$8r);
                            null == s || n._$x2() ? r._$AT = !1 : (s._$nb(t, n, r._$Cr, r._$hr, this._$d0, B._$i2, B._$No),
                            r._$AT = !0),
                            r.baseOpacity = n.getTotalOpacity()
                        }
                    }
                } catch (h) {
                    throw h
                }
            }
            ,
            th.prototype.draw = function(t, i, e) {
                if (this != e._$GT() && console.log("### assert!! ### "),
                !e._$IS[0]) {
                    var r = e
                      , o = this._$LP;
                    o < 0 && (o = 1);
                    var s = this.getOpacity(i, r) * e._$VS * e.baseOpacity
                      , n = null != r._$hr ? r._$hr : r._$Cr;
                    t.setClipBufPre_clipContextForDraw(e.clipBufPre_clipContext),
                    t._$WP(this.culling),
                    t._$Uo(o, 3 * this._$Yo, this._$BP, n, this._$Qi, s, this._$6s, r)
                }
            }
            ,
            th.prototype.dump = function() {
                console.log("  _$yi( %d ) , _$d0( %d ) , _$Yo( %d ) \n", this._$LP, this._$d0, this._$Yo),
                console.log("  _$Oi _$di = { ");
                for (var t = 0; t < this._$BP.length; t++)
                    console.log("%5d ,", this._$BP[t]);
                console.log("\n  _$5i _$30");
                for (var t = 0; t < this._$Eo.length; t++) {
                    console.log("\n    _$30[%d] = ", t);
                    for (var i = this._$Eo[t], e = 0; e < i.length; e++)
                        console.log("%6.2f, ", i[e])
                }
                console.log("\n")
            }
            ,
            th.prototype._$72 = function(t) {
                return null == this._$5P ? null : this._$5P[t]
            }
            ,
            th.prototype.getIndexArray = function() {
                return this._$BP
            }
            ,
            t9.prototype = new tT,
            t9.prototype.getTransformedPoints = function() {
                return null != this._$hr ? this._$hr : this._$Cr
            }
            ,
            tl.prototype._$HT = function(t) {
                this.x = t.x,
                this.y = t.y
            }
            ,
            tl.prototype._$HT = function(t, i) {
                this.x = t,
                this.y = i
            }
            ,
            tu.prototype = new i,
            tu.loadModel = function(t) {
                var e = new tu;
                return i._$62(e, t),
                e
            }
            ,
            tu.loadModel = function(t, e) {
                var r = new tu(e || 0);
                return i._$62(r, t),
                r
            }
            ,
            tu._$to = function() {
                return new tu
            }
            ,
            tu._$er = function(t) {
                var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
                if (0 == i.exists())
                    throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
                for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = tu.loadModel(i._$3b()), o = 0; o < e.length; o++) {
                    var s = new _$5(e[o]);
                    if (0 == s.exists())
                        throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + s._$PL());
                    r.setTexture(o, _$nL._$_o(t, s._$3b()))
                }
                return r
            }
            ,
            tu.prototype.setGL = function(t) {
                tn.setGL(t)
            }
            ,
            tu.prototype.setTransform = function(t) {
                this.drawParamWebGL.setTransform(t)
            }
            ,
            tu.prototype.update = function() {
                this._$5S.update(),
                this._$5S.preDraw(this.drawParamWebGL)
            }
            ,
            tu.prototype.draw = function() {
                this._$5S.draw(this.drawParamWebGL)
            }
            ,
            tu.prototype._$K2 = function() {
                this.drawParamWebGL._$K2()
            }
            ,
            tu.prototype.setTexture = function(t, i) {
                null == this.drawParamWebGL && a._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"),
                this.drawParamWebGL.setTexture(t, i)
            }
            ,
            tu.prototype.setTexture = function(t, i) {
                null == this.drawParamWebGL && a._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"),
                this.drawParamWebGL.setTexture(t, i)
            }
            ,
            tu.prototype._$Rs = function() {
                return this.drawParamWebGL._$Rs()
            }
            ,
            tu.prototype._$Ds = function(t) {
                this.drawParamWebGL._$Ds(t)
            }
            ,
            tu.prototype.getDrawParam = function() {
                return this.drawParamWebGL
            }
            ,
            tu.prototype.setMatrix = function(t) {
                this.drawParamWebGL.setMatrix(t)
            }
            ,
            tu.prototype.setPremultipliedAlpha = function(t) {
                this.drawParamWebGL.setPremultipliedAlpha(t)
            }
            ,
            tu.prototype.isPremultipliedAlpha = function() {
                return this.drawParamWebGL.isPremultipliedAlpha()
            }
            ,
            tu.prototype.setAnisotropy = function(t) {
                this.drawParamWebGL.setAnisotropy(t)
            }
            ,
            tu.prototype.getAnisotropy = function() {
                return this.drawParamWebGL.getAnisotropy()
            }
            ,
            tp.prototype._$tb = function() {
                return this.motions
            }
            ,
            tp.prototype.startMotion = function(t, i) {
                for (var e = null, r = this.motions.length, o = 0; o < r; ++o)
                    null != (e = this.motions[o]) && (e._$qS(e._$w0.getFadeOut()),
                    this._$eb && a._$Ji("MotionQueueManager[size:%2d]->startMotion() / start _$K _$3 (m%d)\n", r, e._$sr));
                if (null == t)
                    return -1;
                (e = new tf)._$w0 = t,
                this.motions.push(e);
                var s = e._$sr;
                return this._$eb && a._$Ji("MotionQueueManager[size:%2d]->startMotion() / new _$w0 (m%d)\n", r, s),
                s
            }
            ,
            tp.prototype.updateParam = function(t) {
                try {
                    for (var i = !1, e = 0; e < this.motions.length; e++) {
                        var r = this.motions[e];
                        if (null != r) {
                            var o = r._$w0;
                            null != o ? (o.updateParam(t, r),
                            i = !0,
                            r.isFinished() && (this._$eb && a._$Ji("MotionQueueManager[size:%2d]->updateParam() / _$T0 _$w0 (m%d)\n", this.motions.length - 1, r._$sr),
                            this.motions.splice(e, 1),
                            e--)) : (this.motions = this.motions.splice(e, 1),
                            e--)
                        } else
                            this.motions.splice(e, 1),
                            e--
                    }
                    return i
                } catch (s) {
                    return a._$li(s),
                    !0
                }
            }
            ,
            tp.prototype.isFinished = function(t) {
                if (arguments.length >= 1) {
                    for (var i = 0; i < this.motions.length; i++) {
                        var e = this.motions[i];
                        if (null != e && e._$sr == t && !e.isFinished())
                            return !1
                    }
                    return !0
                }
                for (var i = 0; i < this.motions.length; i++) {
                    var e = this.motions[i];
                    if (null != e) {
                        if (null != e._$w0) {
                            if (!e.isFinished())
                                return !1
                        } else
                            this.motions.splice(i, 1),
                            i--
                    } else
                        this.motions.splice(i, 1),
                        i--
                }
                return !0
            }
            ,
            tp.prototype.stopAllMotions = function() {
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t];
                    null != i && i._$w0,
                    this.motions.splice(t, 1),
                    t--
                }
            }
            ,
            tp.prototype._$Zr = function(t) {
                this._$eb = t
            }
            ,
            tp.prototype._$e = function() {
                console.log("-- _$R --\n");
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t]._$w0;
                    console.log("MotionQueueEnt[%d] :: %s\n", this.motions.length, i.toString())
                }
            }
            ,
            tf._$Gs = 0,
            tf.prototype.isFinished = function() {
                return this._$9L
            }
            ,
            tf.prototype._$qS = function(t) {
                var i = I.getUserTimeMSec() + t;
                (this._$Do < 0 || i < this._$Do) && (this._$Do = i)
            }
            ,
            tf.prototype._$Bs = function() {
                return this._$sr
            }
            ,
            tc.prototype.setContext = function(t) {
                var i = this.m;
                t.transform(i[0], i[1], i[3], i[4], i[6], i[7])
            }
            ,
            tc.prototype.toString = function() {
                for (var t = "LDTransform { ", i = 0; i < 9; i++)
                    t += this.m[i].toFixed(2) + " ,";
                return t + " }"
            }
            ,
            tc.prototype.identity = function() {
                var t = this.m;
                t[0] = t[4] = t[8] = 1,
                t[1] = t[2] = t[3] = t[5] = t[6] = t[7] = 0
            }
            ,
            tc.prototype._$PS = function(t, i, e) {
                null == e && (e = [0, 0]);
                var r = this.m;
                return e[0] = r[0] * t + r[3] * i + r[6],
                e[1] = r[1] * t + r[4] * i + r[7],
                e
            }
            ,
            tc.prototype._$P2 = function(t) {
                t || (t = new tc);
                var i = this.m
                  , e = i[0]
                  , r = i[1]
                  , o = i[2]
                  , s = i[3]
                  , n = i[4]
                  , a = i[5]
                  , h = i[6]
                  , l = i[7]
                  , u = i[8]
                  , p = e * n * u + r * a * h + o * s * l - e * a * l - o * n * h - r * s * u;
                if (0 == p)
                    return null;
                var f = 1 / p;
                return t.m[0] = f * (n * u - l * a),
                t.m[1] = f * (l * o - r * u),
                t.m[2] = f * (r * a - n * o),
                t.m[3] = f * (h * a - s * u),
                t.m[4] = f * (e * u - h * o),
                t.m[5] = f * (s * o - e * a),
                t.m[6] = f * (s * l - h * n),
                t.m[7] = f * (h * r - e * l),
                t.m[8] = f * (e * n - s * r),
                t
            }
            ,
            tc.prototype.transform = function(t, i, e) {
                null == e && (e = [0, 0]);
                var r = this.m;
                return e[0] = r[0] * t + r[3] * i + r[6],
                e[1] = r[1] * t + r[4] * i + r[7],
                e
            }
            ,
            tc.prototype.translate = function(t, i) {
                var e = this.m;
                e[6] = e[0] * t + e[3] * i + e[6],
                e[7] = e[1] * t + e[4] * i + e[7],
                e[8] = e[2] * t + e[5] * i + e[8]
            }
            ,
            tc.prototype.scale = function(t, i) {
                var e = this.m;
                e[0] *= t,
                e[1] *= t,
                e[2] *= t,
                e[3] *= i,
                e[4] *= i,
                e[5] *= i
            }
            ,
            tc.prototype.shear = function(t, i) {
                var e = this.m
                  , r = e[0] + e[3] * i
                  , o = e[1] + e[4] * i
                  , s = e[2] + e[5] * i;
                e[3] = e[0] * t + e[3],
                e[4] = e[1] * t + e[4],
                e[5] = e[2] * t + e[5],
                e[0] = r,
                e[1] = o,
                e[2] = s
            }
            ,
            tc.prototype.rotate = function(t) {
                var i = this.m
                  , e = Math.cos(t)
                  , r = Math.sin(t)
                  , o = i[0] * e + i[3] * r
                  , s = i[1] * e + i[4] * r
                  , n = i[2] * e + i[5] * r;
                i[3] = -i[0] * r + i[3] * e,
                i[4] = -i[1] * r + i[4] * e,
                i[5] = -i[2] * r + i[5] * e,
                i[0] = o,
                i[1] = s,
                i[2] = n
            }
            ,
            tc.prototype.concatenate = function(t) {
                var i = this.m
                  , e = t.m
                  , r = i[0] * e[0] + i[3] * e[1] + i[6] * e[2]
                  , o = i[1] * e[0] + i[4] * e[1] + i[7] * e[2]
                  , s = i[2] * e[0] + i[5] * e[1] + i[8] * e[2]
                  , n = i[0] * e[3] + i[3] * e[4] + i[6] * e[5]
                  , a = i[1] * e[3] + i[4] * e[4] + i[7] * e[5]
                  , h = i[2] * e[3] + i[5] * e[4] + i[8] * e[5]
                  , l = i[0] * e[6] + i[3] * e[7] + i[6] * e[8]
                  , u = i[1] * e[6] + i[4] * e[7] + i[7] * e[8]
                  , p = i[2] * e[6] + i[5] * e[7] + i[8] * e[8];
                m[0] = r,
                m[1] = o,
                m[2] = s,
                m[3] = n,
                m[4] = a,
                m[5] = h,
                m[6] = l,
                m[7] = u,
                m[8] = p
            }
            ,
            t$.prototype = new ti,
            t$._$eT = null,
            t$._$tP = {},
            t$._$2o = function() {
                return null == t$._$eT && (t$._$eT = t$.getID("DST_BASE")),
                t$._$eT
            }
            ,
            t$._$27 = function() {
                t$._$tP.clear(),
                t$._$eT = null
            }
            ,
            t$.getID = function(t) {
                var i = t$._$tP[t];
                return null == i && (i = new t$(t),
                t$._$tP[t] = i),
                i
            }
            ,
            t$.prototype._$3s = function() {
                return new t$
            }
            ,
            t_.prototype = new E,
            t_._$9r = function(t) {
                return new Float32Array(t)
            }
            ,
            t_._$vb = function(t) {
                return new Int16Array(t)
            }
            ,
            t_._$cr = function(t, i) {
                return null == t || t._$yL() < i.length ? ((t = t_._$9r(2 * i.length)).put(i),
                t._$oT(0)) : (t.clear(),
                t.put(i),
                t._$oT(0)),
                t
            }
            ,
            t_._$mb = function(t, i) {
                return null == t || t._$yL() < i.length ? ((t = t_._$vb(2 * i.length)).put(i),
                t._$oT(0)) : (t.clear(),
                t.put(i),
                t._$oT(0)),
                t
            }
            ,
            t_._$Hs = function() {
                return this._$Gr
            }
            ,
            t_._$as = function(t) {
                this._$Gr = t
            }
            ,
            t_.prototype.getGL = function() {
                return this.gl
            }
            ,
            t_.prototype.setGL = function(t) {
                this.gl = t
            }
            ,
            t_.prototype.setTransform = function(t) {
                this.transform = t
            }
            ,
            t_.prototype._$ZT = function() {
                var t = this.gl;
                this.firstDraw && (this.initShader(),
                this.firstDraw = !1,
                this.anisotropyExt = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic"),
                this.anisotropyExt && (this.maxAnisotropy = t.getParameter(this.anisotropyExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT))),
                t.disable(t.SCISSOR_TEST),
                t.disable(t.STENCIL_TEST),
                t.disable(t.DEPTH_TEST),
                t.frontFace(t.CW),
                t.enable(t.BLEND),
                t.colorMask(1, 1, 1, 1),
                t.bindBuffer(t.ARRAY_BUFFER, null),
                t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null)
            }
            ,
            t_.prototype._$Uo = function(t, i, e, r, o, s, n, a) {
                if (!(s < .01 && null == this.clipBufPre_clipContextMask)) {
                    var h, l, u, p, f = (s > .9 && tn.EXPAND_W,
                    this.gl);
                    if (null == this.gl)
                        throw Error("gl is null");
                    var c = 1 * this._$C0 * s
                      , $ = 1 * this._$tT * s
                      , _ = 1 * this._$WL * s
                      , d = this._$lT * s
                      , g = [1, 1, 1, 1];
                    if (null != this.clipBufPre_clipContextMask) {
                        
                        f.frontFace(f.CCW),
                        f.useProgram(this.shaderProgram),
                        this._$vS = td(f, this._$vS, r),
                        this._$no = tg(f, this._$no, e),
                        f.enableVertexAttribArray(this.a_position_Loc),
                        f.vertexAttribPointer(this.a_position_Loc, 2, f.FLOAT, !1, 0, 0),
                        this._$NT = td(f, this._$NT, o),
                        f.activeTexture(f.TEXTURE1),
                        f.bindTexture(f.TEXTURE_2D, this.textures[t]),
                        f.uniform1i(this.s_texture0_Loc, 1),
                        f.enableVertexAttribArray(this.a_texCoord_Loc),
                        f.vertexAttribPointer(this.a_texCoord_Loc, 2, f.FLOAT, !1, 0, 0),
                        f.uniformMatrix4fv(this.u_matrix_Loc, !1, this.getClipBufPre_clipContextMask().matrixForMask);
                        var y = this.getClipBufPre_clipContextMask().layoutChannelNo
                          , T = this.getChannelFlagAsColor(y);
                        f.uniform4f(this.u_channelFlag, T.r, T.g, T.b, T.a);
                        var v = this.getClipBufPre_clipContextMask().layoutBounds;
                        f.uniform4f(this.u_baseColor_Loc, 2 * v.x - 1, 2 * v.y - 1, 2 * v._$EL() - 1, 2 * v._$5T() - 1),
                        f.uniform1i(this.u_maskFlag_Loc, !0)
                    } else if (null != this.getClipBufPre_clipContextDraw()) {
                        
                        f.useProgram(this.shaderProgramOff),
                        this._$vS = td(f, this._$vS, r),
                        this._$no = tg(f, this._$no, e),
                        f.enableVertexAttribArray(this.a_position_Loc_Off),
                        f.vertexAttribPointer(this.a_position_Loc_Off, 2, f.FLOAT, !1, 0, 0),
                        this._$NT = td(f, this._$NT, o),
                        f.activeTexture(f.TEXTURE1),
                        f.bindTexture(f.TEXTURE_2D, this.textures[t]),
                        f.uniform1i(this.s_texture0_Loc_Off, 1),
                        f.enableVertexAttribArray(this.a_texCoord_Loc_Off),
                        f.vertexAttribPointer(this.a_texCoord_Loc_Off, 2, f.FLOAT, !1, 0, 0),
                        f.uniformMatrix4fv(this.u_clipMatrix_Loc_Off, !1, this.getClipBufPre_clipContextDraw().matrixForDraw),
                        f.uniformMatrix4fv(this.u_matrix_Loc_Off, !1, this.matrix4x4),
                        f.activeTexture(f.TEXTURE2),
                        f.bindTexture(f.TEXTURE_2D, tn.fTexture[this.glno]),
                        f.uniform1i(this.s_texture1_Loc_Off, 2);
                        var y = this.getClipBufPre_clipContextDraw().layoutChannelNo
                          , T = this.getChannelFlagAsColor(y);
                        f.uniform4f(this.u_channelFlag_Loc_Off, T.r, T.g, T.b, T.a),
                        f.uniform4f(this.u_baseColor_Loc_Off, c, $, _, d)
                    } else{
                        f.useProgram(this.shaderProgram),
                        this._$vS = td(f, this._$vS, r),
                        this._$no = tg(f, this._$no, e),
                        f.enableVertexAttribArray(this.a_position_Loc),
                        f.vertexAttribPointer(this.a_position_Loc, 2, f.FLOAT, !1, 0, 0),
                        this._$NT = td(f, this._$NT, o),
                        f.activeTexture(f.TEXTURE1),
                        f.bindTexture(f.TEXTURE_2D, this.textures[t]),
                        f.uniform1i(this.s_texture0_Loc, 1),
                        f.enableVertexAttribArray(this.a_texCoord_Loc),
                        f.vertexAttribPointer(this.a_texCoord_Loc, 2, f.FLOAT, !1, 0, 0),
                        f.uniformMatrix4fv(this.u_matrix_Loc, !1, this.matrix4x4),
                        f.uniform4f(this.u_baseColor_Loc, c, $, _, d),
                        f.uniform1i(this.u_maskFlag_Loc, !1);
                    }
                    if (this.culling ? this.gl.enable(f.CULL_FACE) : this.gl.disable(f.CULL_FACE),
                    this.gl.enable(f.BLEND),
                    null != this.clipBufPre_clipContextMask)
                        h = f.ONE,
                        l = f.ONE_MINUS_SRC_ALPHA,
                        u = f.ONE,
                        p = f.ONE_MINUS_SRC_ALPHA;
                    else
                        switch (n) {
                        case th._$ms:
                            h = f.ONE,
                            l = f.ONE_MINUS_SRC_ALPHA,
                            u = f.ONE,
                            p = f.ONE_MINUS_SRC_ALPHA;
                            break;
                        case th._$ns:
                            h = f.ONE,
                            l = f.ONE,
                            u = f.ZERO,
                            p = f.ONE;
                            break;
                        case th._$_s:
                            h = f.DST_COLOR,
                            l = f.ONE_MINUS_SRC_ALPHA,
                            u = f.ZERO,
                            p = f.ONE
                        }
                    f.blendEquationSeparate(f.FUNC_ADD, f.FUNC_ADD),
                    f.blendFuncSeparate(h, l, u, p),
                    this.anisotropyExt && f.texParameteri(f.TEXTURE_2D, this.anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
                    var P = e.length;
                    f.drawElements(f.TRIANGLES, P, f.UNSIGNED_SHORT, 0),
                    f.bindTexture(f.TEXTURE_2D, null)
                }
            }
            ,
            t_.prototype._$Rs = function() {
                throw Error("_$Rs")
            }
            ,
            t_.prototype._$Ds = function(t) {
                throw Error("_$Ds")
            }
            ,
            t_.prototype._$K2 = function() {
                for (var t = 0; t < this.textures.length; t++)
                    0 != this.textures[t] && (this.gl._$K2(1, this.textures, t),
                    this.textures[t] = null)
            }
            ,
            t_.prototype.setTexture = function(t, i) {
                this.textures[t] = i
            }
            ,
            t_.prototype.initShader = function() {
                var t = this.gl;
                this.loadShaders2(),
                this.a_position_Loc = t.getAttribLocation(this.shaderProgram, "a_position"),
                this.a_texCoord_Loc = t.getAttribLocation(this.shaderProgram, "a_texCoord"),
                this.u_matrix_Loc = t.getUniformLocation(this.shaderProgram, "u_mvpMatrix"),
                this.s_texture0_Loc = t.getUniformLocation(this.shaderProgram, "s_texture0"),
                this.u_channelFlag = t.getUniformLocation(this.shaderProgram, "u_channelFlag"),
                this.u_baseColor_Loc = t.getUniformLocation(this.shaderProgram, "u_baseColor"),
                this.u_maskFlag_Loc = t.getUniformLocation(this.shaderProgram, "u_maskFlag"),
                this.a_position_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_position"),
                this.a_texCoord_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_texCoord"),
                this.u_matrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_mvpMatrix"),
                this.u_clipMatrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_ClipMatrix"),
                this.s_texture0_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture0"),
                this.s_texture1_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture1"),
                this.u_channelFlag_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_channelFlag"),
                this.u_baseColor_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_baseColor")
            }
            ,
            t_.prototype.disposeShader = function() {
                var t = this.gl;
                this.shaderProgram && (t.deleteProgram(this.shaderProgram),
                this.shaderProgram = null),
                this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff),
                this.shaderProgramOff = null)
            }
            ,
            t_.prototype.compileShader = function(t, i) {
                var e = this.gl
                  , r = e.createShader(t);
                if (null == r)
                    return a._$Ji("_$L0 to create shader"),
                    null;
                if (e.shaderSource(r, i),
                e.compileShader(r),
                !e.getShaderParameter(r, e.COMPILE_STATUS)) {
                    var o = e.getShaderInfoLog(r);
                    return a._$Ji("_$L0 to compile shader : " + o),
                    e.deleteShader(r),
                    null
                }
                return r
            }
            ,
            t_.prototype.loadShaders2 = function() {
                var t = this.gl;
                if (this.shaderProgram = t.createProgram(),
                !this.shaderProgram || (this.shaderProgramOff = t.createProgram(),
                !this.shaderProgramOff))
                    return !1;
                if (this.vertShader = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_mvpMatrix * a_position;    v_texCoord = a_texCoord;}"),
                !this.vertShader)
                    return a._$Ji("Vertex shader compile _$li!"),
                    !1;
                if (this.vertShaderOff = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;uniform mat4       u_ClipMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_ClipMatrix * a_position;    v_texCoord = a_texCoord;}"),
                !this.vertShaderOff)
                    return a._$Ji("OffVertex shader compile _$li!"),
                    !1;
                if (this.fragShader = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform vec4       u_channelFlag;uniform vec4       u_baseColor;uniform bool       u_maskFlag;void main(){    vec4 smpColor;     if(u_maskFlag){        float isInside =             step(u_baseColor.x, v_ClipPos.x/v_ClipPos.w)          * step(u_baseColor.y , v_ClipPos.y/v_ClipPos.w)          * step(v_ClipPos.x/v_ClipPos.w, u_baseColor.z)          * step(v_ClipPos.y/v_ClipPos.w, u_baseColor.w);        smpColor = u_channelFlag * texture2D(s_texture0 , v_texCoord).a * isInside;    }else{        smpColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;    }    gl_FragColor = smpColor;}"),
                !this.fragShader)
                    return a._$Ji("Fragment shader compile _$li!"),
                    !1;
                if (this.fragShaderOff = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float ;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_channelFlag;uniform vec4       u_baseColor ;void main(){    vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;    vec4 clipMask = texture2D(s_texture1, v_ClipPos.xy / v_ClipPos.w) * u_channelFlag;    float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;    col_formask = col_formask * maskVal;    gl_FragColor = col_formask;}"),
                !this.fragShaderOff)
                    return a._$Ji("OffFragment shader compile _$li!"),
                    !1;
                if (t.attachShader(this.shaderProgram, this.vertShader),
                t.attachShader(this.shaderProgram, this.fragShader),
                t.attachShader(this.shaderProgramOff, this.vertShaderOff),
                t.attachShader(this.shaderProgramOff, this.fragShaderOff),
                t.linkProgram(this.shaderProgram),
                t.linkProgram(this.shaderProgramOff),
                !t.getProgramParameter(this.shaderProgram, t.LINK_STATUS)) {
                    var i = t.getProgramInfoLog(this.shaderProgram);
                    return a._$Ji("_$L0 to link program: " + i),
                    this.vertShader && (t.deleteShader(this.vertShader),
                    this.vertShader = 0),
                    this.fragShader && (t.deleteShader(this.fragShader),
                    this.fragShader = 0),
                    this.shaderProgram && (t.deleteProgram(this.shaderProgram),
                    this.shaderProgram = 0),
                    this.vertShaderOff && (t.deleteShader(this.vertShaderOff),
                    this.vertShaderOff = 0),
                    this.fragShaderOff && (t.deleteShader(this.fragShaderOff),
                    this.fragShaderOff = 0),
                    this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff),
                    this.shaderProgramOff = 0),
                    !1
                }
                return !0
            }
            ,
            t_.prototype.createFramebuffer = function() {
                var t = this.gl
                  , i = tn.clippingMaskBufferSize
                  , e = t.createFramebuffer();
                t.bindFramebuffer(t.FRAMEBUFFER, e);
                var r = t.createRenderbuffer();
                t.bindRenderbuffer(t.RENDERBUFFER, r),
                t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, i, i),
                t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.RENDERBUFFER, r);
                var o = t.createTexture();
                return t.bindTexture(t.TEXTURE_2D, o),
                t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, i, i, 0, t.RGBA, t.UNSIGNED_BYTE, null),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, o, 0),
                t.bindTexture(t.TEXTURE_2D, null),
                t.bindRenderbuffer(t.RENDERBUFFER, null),
                t.bindFramebuffer(t.FRAMEBUFFER, null),
                tn.fTexture[this.glno] = o,
                {
                    framebuffer: e,
                    renderbuffer: r,
                    texture: tn.fTexture[this.glno]
                }
            }
            ,
            ty.prototype._$fP = function() {
                var t, i, e, r = this._$ST();
                if (0 == (128 & r))
                    return 255 & r;
                if (0 == (128 & (t = this._$ST())))
                    return (127 & r) << 7 | 127 & t;
                if (0 == (128 & (i = this._$ST())))
                    return (127 & r) << 14 | (127 & t) << 7 | 255 & i;
                if (0 == (128 & (e = this._$ST())))
                    return (127 & r) << 21 | (127 & t) << 14 | (127 & i) << 7 | 255 & e;
                throw new ta("_$L _$0P  _")
            }
            ,
            ty.prototype.getFormatVersion = function() {
                return this._$S2
            }
            ,
            ty.prototype._$gr = function(t) {
                this._$S2 = t
            }
            ,
            ty.prototype._$3L = function() {
                return this._$fP()
            }
            ,
            ty.prototype._$mP = function() {
                return this._$zT(),
                this._$F += 8,
                this._$T.getFloat64(this._$F - 8)
            }
            ,
            ty.prototype._$_T = function() {
                return this._$zT(),
                this._$F += 4,
                this._$T.getFloat32(this._$F - 4)
            }
            ,
            ty.prototype._$6L = function() {
                return this._$zT(),
                this._$F += 4,
                this._$T.getInt32(this._$F - 4)
            }
            ,
            ty.prototype._$ST = function() {
                return this._$zT(),
                this._$T.getInt8(this._$F++)
            }
            ,
            ty.prototype._$9T = function() {
                return this._$zT(),
                this._$F += 2,
                this._$T.getInt16(this._$F - 2)
            }
            ,
            ty.prototype._$2T = function() {
                throw this._$zT(),
                this._$F += 8,
                new ta("_$L _$q read long")
            }
            ,
            ty.prototype._$po = function() {
                return this._$zT(),
                0 != this._$T.getInt8(this._$F++)
            }
            ;
            var tL = !0;
            ty.prototype._$bT = function() {
                this._$zT();
                var t = this._$3L()
                  , i = null;
                if (tL)
                    try {
                        var e = new ArrayBuffer(2 * t);
                        i = new Uint16Array(e);
                        for (var r = 0; r < t; ++r)
                            i[r] = this._$T.getUint8(this._$F++);
                        return String.fromCharCode.apply(null, i)
                    } catch (o) {
                        tL = !1
                    }
                try {
                    var s = [];
                    if (null == i)
                        for (var r = 0; r < t; ++r)
                            s[r] = this._$T.getUint8(this._$F++);
                    else
                        for (var r = 0; r < t; ++r)
                            s[r] = i[r];
                    return String.fromCharCode.apply(null, s)
                } catch (n) {
                    console.log("read utf8 / _$rT _$L0 !! : " + n)
                }
            }
            ,
            ty.prototype._$cS = function() {
                this._$zT();
                for (var t = this._$3L(), i = new Int32Array(t), e = 0; e < t; e++)
                    i[e] = this._$T.getInt32(this._$F),
                    this._$F += 4;
                return i
            }
            ,
            ty.prototype._$Tb = function() {
                this._$zT();
                for (var t = this._$3L(), i = new Float32Array(t), e = 0; e < t; e++)
                    i[e] = this._$T.getFloat32(this._$F),
                    this._$F += 4;
                return i
            }
            ,
            ty.prototype._$5b = function() {
                this._$zT();
                for (var t = this._$3L(), i = new Float64Array(t), e = 0; e < t; e++)
                    i[e] = this._$T.getFloat64(this._$F),
                    this._$F += 8;
                return i
            }
            ,
            ty.prototype._$nP = function() {
                return this._$Jb(-1)
            }
            ,
            ty.prototype._$Jb = function(t) {
                if (this._$zT(),
                t < 0 && (t = this._$3L()),
                t == G._$7P) {
                    var i = this._$6L();
                    if (0 <= i && i < this._$Ko.length)
                        return this._$Ko[i];
                    throw new ta("_$sL _$4i @_$m0")
                }
                var e = this._$4b(t);
                return this._$Ko.push(e),
                e
            }
            ,
            ty.prototype._$4b = function(t) {
                if (0 == t)
                    return null;
                if (50 == t) {
                    var i = this._$bT()
                      , e = w.getID(i);
                    return e
                }
                if (51 == t) {
                    var i = this._$bT()
                      , e = t$.getID(i);
                    return e
                }
                if (134 == t) {
                    var i = this._$bT()
                      , e = u.getID(i);
                    return e
                }
                if (60 == t) {
                    var i = this._$bT()
                      , e = p.getID(i);
                    return e
                }
                if (t >= 48) {
                    var r = G._$9o(t);
                    return null != r ? (r._$F0(this),
                    r) : null
                }
                switch (t) {
                case 1:
                    return this._$bT();
                case 10:
                    return new s(this._$6L(),!0);
                case 11:
                    return new v(this._$mP(),this._$mP(),this._$mP(),this._$mP());
                case 12:
                    return new v(this._$_T(),this._$_T(),this._$_T(),this._$_T());
                case 13:
                    return new S(this._$mP(),this._$mP());
                case 14:
                    return new S(this._$_T(),this._$_T());
                case 15:
                    for (var o = this._$3L(), e = Array(o), n = 0; n < o; n++)
                        e[n] = this._$nP();
                    return e;
                case 17:
                    var e = new b(this._$mP(),this._$mP(),this._$mP(),this._$mP(),this._$mP(),this._$mP());
                    return e;
                case 21:
                    return new l(this._$6L(),this._$6L(),this._$6L(),this._$6L());
                case 22:
                    return new tl(this._$6L(),this._$6L());
                case 23:
                    throw Error("_$L _$ro ");
                case 16:
                case 25:
                    return this._$cS();
                case 26:
                    return this._$5b();
                case 27:
                    return this._$Tb();
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 18:
                case 19:
                case 20:
                case 24:
                case 28:
                    throw new ta("_$6 _$q : _$nP() of 2-9 ,18,19,20,24,28 : " + t);
                default:
                    throw new ta("_$6 _$q : _$nP() NO _$i : " + t)
                }
            }
            ,
            ty.prototype._$8L = function() {
                return 0 == this._$hL ? this._$v0 = this._$ST() : 8 == this._$hL && (this._$v0 = this._$ST(),
                this._$hL = 0),
                1 == (this._$v0 >> 7 - this._$hL++ & 1)
            }
            ,
            ty.prototype._$zT = function() {
                0 != this._$hL && (this._$hL = 0)
            }
            ,
            (function t() {}
            ).prototype._$wP = function(t, i, e) {
                for (var r = 0; r < e; r++) {
                    for (var o = 0; o < i; o++) {
                        var s = 2 * (o + r * i);
                        console.log("(% 7.3f , % 7.3f) , ", t[s], t[s + 1])
                    }
                    console.log("\n")
                }
                console.log("\n")
            }
            ,
            tm._$2S = Math.PI / 180,
            tm._$bS = Math.PI / 180,
            tm._$wS = 180 / Math.PI,
            tm._$NS = 180 / Math.PI,
            tm.PI_F = Math.PI,
            tm._$kT = [0, .012368, .024734, .037097, .049454, .061803, .074143, .086471, .098786, .111087, .12337, .135634, .147877, .160098, .172295, .184465, .196606, .208718, .220798, .232844, .244854, .256827, .268761, .280654, .292503, .304308, .316066, .327776, .339436, .351044, .362598, .374097, .385538, .396921, .408243, .419502, .430697, .441826, .452888, .463881, .474802, .485651, .496425, .507124, .517745, .528287, .538748, .549126, .559421, .56963, .579752, .589785, .599728, .609579, .619337, .629, .638567, .648036, .657406, .666676, .675843, .684908, .693867, .70272, .711466, .720103, .72863, .737045, .745348, .753536, .76161, .769566, .777405, .785125, .792725, .800204, .807561, .814793, .821901, .828884, .835739, .842467, .849066, .855535, .861873, .868079, .874153, .880093, .885898, .891567, .897101, .902497, .907754, .912873, .917853, .922692, .92739, .931946, .936359, .940629, .944755, .948737, .952574, .956265, .959809, .963207, .966457, .96956, .972514, .97532, .977976, .980482, .982839, .985045, .987101, .989006, .990759, .992361, .993811, .995109, .996254, .997248, .998088, .998776, .999312, .999694, .999924, 1],
            tm._$92 = function(t, i) {
                var e = Math.atan2(t[1], t[0])
                  , r = Math.atan2(i[1], i[0]);
                return tm._$tS(e, r)
            }
            ,
            tm._$tS = function(t, i) {
                for (var e = t - i; e < -Math.PI; )
                    e += 2 * Math.PI;
                for (; e > Math.PI; )
                    e -= 2 * Math.PI;
                return e
            }
            ,
            tm._$9 = function(t) {
                return Math.sin(t)
            }
            ,
            tm.fcos = function(t) {
                return Math.cos(t)
            }
            ,
            tT.prototype._$u2 = function() {
                return this._$IS[0]
            }
            ,
            tT.prototype._$yo = function() {
                return this._$AT && !this._$IS[0]
            }
            ,
            tT.prototype._$GT = function() {
                return this._$e0
            }
            ,
            tv._$W2 = 0,
            tv.SYSTEM_INFO = null,
            tv.USER_AGENT = navigator.userAgent,
            tv.isIPhone = function() {
                return tv.SYSTEM_INFO || tv.setup(),
                tv.SYSTEM_INFO._isIPhone
            }
            ,
            tv.isIOS = function() {
                return tv.SYSTEM_INFO || tv.setup(),
                tv.SYSTEM_INFO._isIPhone || tv.SYSTEM_INFO._isIPad
            }
            ,
            tv.isAndroid = function() {
                return tv.SYSTEM_INFO || tv.setup(),
                tv.SYSTEM_INFO._isAndroid
            }
            ,
            tv.getOSVersion = function() {
                return tv.SYSTEM_INFO || tv.setup(),
                tv.SYSTEM_INFO.version
            }
            ,
            tv.getOS = function() {
                return tv.SYSTEM_INFO || tv.setup(),
                tv.SYSTEM_INFO._isIPhone || tv.SYSTEM_INFO._isIPad ? "iOS" : tv.SYSTEM_INFO._isAndroid ? "Android" : "_$Q0 OS"
            }
            ,
            tv.setup = function() {
                function t(t, i) {
                    for (var e = t.substring(i).split(/[ _,;\.]/), r = 0, o = 0; o <= 2 && !isNaN(e[o]); o++) {
                        var s = parseInt(e[o]);
                        if (s < 0 || s > 999) {
                            a._$li("err : " + s + " @UtHtml5.setup()"),
                            r = 0;
                            break
                        }
                        r += s * Math.pow(1e3, 2 - o)
                    }
                    return r
                }
                var i, e = tv.USER_AGENT, r = tv.SYSTEM_INFO = {
                    userAgent: e
                };
                if ((i = e.indexOf("iPhone OS ")) >= 0)
                    r.os = "iPhone",
                    r._isIPhone = !0,
                    r.version = t(e, i + 10);
                else if ((i = e.indexOf("iPad")) >= 0) {
                    if ((i = e.indexOf("CPU OS")) < 0)
                        return void a._$li(" err : " + e + " @UtHtml5.setup()");
                    r.os = "iPad",
                    r._isIPad = !0,
                    r.version = t(e, i + 7)
                } else
                    (i = e.indexOf("Android")) >= 0 ? (r.os = "Android",
                    r._isAndroid = !0,
                    r.version = t(e, i + 8)) : (r.os = "-",
                    r.version = -1)
            }
            ,
            window.UtSystem = I,
            window.UtDebug = a,
            window.LDTransform = tc,
            window.LDGL = tr,
            window.Live2D = tn,
            window.Live2DModelWebGL = tu,
            window.Live2DModelJS = q,
            window.Live2DMotion = j,
            window.MotionQueueManager = tp,
            window.PhysicsHair = c,
            window.AMotion = n,
            window.PartsDataID = u,
            window.DrawDataID = w,
            window.BaseDataID = t$,
            window.ParamID = p,
            tn.init();
            var tP = !1
        }()
    }
    ).call(i, e(7))
}
, function(t, i) {
    t.exports = {
        import: function() {
            throw Error("System.import cannot be used indirectly")
        }
    }
}
, function(t, i, e) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function o() {
        this.models = [],
        this.count = -1,
        this.reloadFlg = !1,
        Live2D.init(),
        s.Live2DFramework.setPlatformManager(new a.default)
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.default = o;
    var s = e(0)
      , n = e(9)
      , a = r(n)
      , h = e(10)
      , l = r(h)
      , u = e(1)
      , p = r(u);
    o.prototype.createModel = function() {
        var t = new l.default;
        return this.models.push(t),
        t
    }
    ,
    o.prototype.changeModel = function(t, i) {
        this.reloadFlg && (this.reloadFlg = !1,
        this.releaseModel(0, t),
        this.createModel(),
        this.models[0].load(t, i))
    }
    ,
    o.prototype.getModel = function(t) {
        return t >= this.models.length ? null : this.models[t]
    }
    ,
    o.prototype.releaseModel = function(t, i) {
        this.models.length <= t || (this.models[t].release(i),
        delete this.models[t],
        this.models.splice(t, 1))
    }
    ,
    o.prototype.numModels = function() {
        return this.models.length
    }
    ,
    o.prototype.setDrag = function(t, i) {
        for (var e = 0; e < this.models.length; e++)
            this.models[e].setDrag(t, i)
    }
    ,
    o.prototype.maxScaleEvent = function() {
        p.default.DEBUG_LOG && console.log("Max scale event.");
        for (var t = 0; t < this.models.length; t++)
            this.models[t].startRandomMotion(p.default.MOTION_GROUP_PINCH_IN, p.default.PRIORITY_NORMAL)
    }
    ,
    o.prototype.minScaleEvent = function() {
        p.default.DEBUG_LOG && console.log("Min scale event.");
        for (var t = 0; t < this.models.length; t++)
            this.models[t].startRandomMotion(p.default.MOTION_GROUP_PINCH_OUT, p.default.PRIORITY_NORMAL)
    }
    ,
    o.prototype.tapEvent = function(t, i) {
        p.default.DEBUG_LOG && console.log("tapEvent view x:" + t + " y:" + i);
        for (var e = 0; e < this.models.length; e++)
            this.models[e].hitTest(p.default.HIT_AREA_HEAD, t, i) ? (p.default.DEBUG_LOG && console.log("Tap face."),
            this.models[e].setRandomExpression()) : this.models[e].hitTest(p.default.HIT_AREA_BODY, t, i) ? (p.default.DEBUG_LOG && console.log("Tap body. models[" + e + "]"),
            this.models[e].startRandomMotion(p.default.MOTION_GROUP_TAP_BODY, p.default.PRIORITY_NORMAL)) : this.models[e].hitTestCustom("head", t, i) ? (p.default.DEBUG_LOG && console.log("Tap face."),
            this.models[e].startRandomMotion(p.default.MOTION_GROUP_FLICK_HEAD, p.default.PRIORITY_NORMAL)) : this.models[e].hitTestCustom("body", t, i) && (p.default.DEBUG_LOG && console.log("Tap body. models[" + e + "]"),
            this.models[e].startRandomMotion(p.default.MOTION_GROUP_TAP_BODY, p.default.PRIORITY_NORMAL));
        return !0
    }
}
, function(t, i, e) {
    "use strict";
    function r() {}
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.default = r;
    var o = e(2);
    r.prototype.loadBytes = function(t, i) {
        var e = new XMLHttpRequest;
        e.open("GET", t, !0),
        e.responseType = "arraybuffer",
        e.onload = function() {
            200 === e.status ? i(e.response) : console.error("Failed to load (" + e.status + ") : " + t)
        }
        ,
        e.send(null)
    }
    ,
    r.prototype.loadString = function(t) {
        this.loadBytes(t, function(t) {
            return t
        })
    }
    ,
    r.prototype.loadLive2DModel = function(t, i) {
        var e = null;
        this.loadBytes(t, function(t) {
            i(e = Live2DModelWebGL.loadModel(t))
        })
    }
    ,
    r.prototype.loadTexture = function(t, i, e, r) {
        var s = new Image;
        s.crossOrigin = "Anonymous",
        s.src = e,
        s.onload = function() {
            var e = (0,
            o.getContext)()
              , n = e.createTexture();
            if (!n)
                return console.error("Failed to generate gl texture name."),
                -1;
            0 == t.isPremultipliedAlpha() && e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1),
            e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1),
            e.activeTexture(e.TEXTURE0),
            e.bindTexture(e.TEXTURE_2D, n),
            e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, s),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR_MIPMAP_NEAREST),
            e.generateMipmap(e.TEXTURE_2D),
            t.setTexture(i, n),
            n = null,
            "function" == typeof r && r()
        }
        ,
        s.onerror = function() {
            console.error("Failed to load image : " + e)
        }
    }
    ,
    r.prototype.jsonParseFromBytes = function(t) {
        var i, e = new Uint8Array(t,0,3);
        return i = 239 == e[0] && 187 == e[1] && 191 == e[2] ? String.fromCharCode.apply(null, new Uint8Array(t,3)) : String.fromCharCode.apply(null, new Uint8Array(t)),
        JSON5.parse(i)
    }
    ,
    r.prototype.log = function(t) {}
}
, function(t, i, e) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function o() {
        s.L2DBaseModel.prototype.constructor.call(this),
        this.modelHomeDir = "",
        this.modelSetting = null,
        this.tmpMatrix = []
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.default = o;
    var s = e(0)
      , n = e(11)
      , a = r(n)
      , h = e(1)
      , l = r(h)
      , u = e(3)
      , p = r(u);
    o.prototype = new s.L2DBaseModel,
    o.prototype.load = function(t, i, e) {
        this.setUpdating(!0),
        this.setInitialized(!1),
        this.modelHomeDir = i.substring(0, i.lastIndexOf("/") + 1),
        this.modelSetting = new a.default;
        var r = this;
        this.modelSetting.loadModelSetting(i, function() {
            var t = r.modelHomeDir + r.modelSetting.getModelFile();
            r.loadModelData(t, function(t) {
                for (var i = 0; i < r.modelSetting.getTextureNum(); i++) {
                    if (/^https?:\/\/|^\/\//i.test(r.modelSetting.getTextureFile(i)))
                        var o = r.modelSetting.getTextureFile(i);
                    else
                        var o = r.modelHomeDir + r.modelSetting.getTextureFile(i);
                    r.loadTexture(i, o, function() {
                        if (r.isTexLoaded) {
                            if (r.modelSetting.getExpressionNum() > 0) {
                                r.expressions = {};
                                for (var t = 0; t < r.modelSetting.getExpressionNum(); t++) {
                                    var i = r.modelSetting.getExpressionName(t)
                                      , o = r.modelHomeDir + r.modelSetting.getExpressionFile(t);
                                    r.loadExpression(i, o)
                                }
                            } else
                                r.expressionManager = null,
                                r.expressions = {};
                            if (r.eyeBlink,
                            null != r.modelSetting.getPhysicsFile() ? r.loadPhysics(r.modelHomeDir + r.modelSetting.getPhysicsFile()) : r.physics = null,
                            null != r.modelSetting.getPoseFile() ? r.loadPose(r.modelHomeDir + r.modelSetting.getPoseFile(), function() {
                                r.pose.updateParam(r.live2DModel)
                            }) : r.pose = null,
                            null != r.modelSetting.getLayout()) {
                                var s = r.modelSetting.getLayout();
                                null != s.width && r.modelMatrix.setWidth(s.width),
                                null != s.height && r.modelMatrix.setHeight(s.height),
                                null != s.x && r.modelMatrix.setX(s.x),
                                null != s.y && r.modelMatrix.setY(s.y),
                                null != s.center_x && r.modelMatrix.centerX(s.center_x),
                                null != s.center_y && r.modelMatrix.centerY(s.center_y),
                                null != s.top && r.modelMatrix.top(s.top),
                                null != s.bottom && r.modelMatrix.bottom(s.bottom),
                                null != s.left && r.modelMatrix.left(s.left),
                                null != s.right && r.modelMatrix.right(s.right)
                            }
                            if (null != r.modelSetting.getHitAreasCustom()) {
                                var n = r.modelSetting.getHitAreasCustom();
                                null != n.head_x && (l.default.hit_areas_custom_head_x = n.head_x),
                                null != n.head_y && (l.default.hit_areas_custom_head_y = n.head_y),
                                null != n.body_x && (l.default.hit_areas_custom_body_x = n.body_x),
                                null != n.body_y && (l.default.hit_areas_custom_body_y = n.body_y)
                            }
                            for (var t = 0; t < r.modelSetting.getInitParamNum(); t++)
                                r.live2DModel.setParamFloat(r.modelSetting.getInitParamID(t), r.modelSetting.getInitParamValue(t));
                            for (var t = 0; t < r.modelSetting.getInitPartsVisibleNum(); t++)
                                r.live2DModel.setPartsOpacity(r.modelSetting.getInitPartsVisibleID(t), r.modelSetting.getInitPartsVisibleValue(t));
                            r.live2DModel.saveParam(),
                            r.preloadMotionGroup(l.default.MOTION_GROUP_IDLE),
                            r.preloadMotionGroup(l.default.MOTION_GROUP_SLEEPY),
                            r.mainMotionManager.stopAllMotions(),
                            r.setUpdating(!1),
                            r.setInitialized(!0),
                            "function" == typeof e && e()
                        }
                    })
                }
            })
        })
    }
    ,
    o.prototype.release = function(t) {
        var i = s.Live2DFramework.getPlatformManager();
        t.deleteTexture(i.texture)
    }
    ,
    o.prototype.preloadMotionGroup = function(t) {
        for (var i = this, e = 0; e < this.modelSetting.getMotionNum(t); e++) {
            var r = this.modelSetting.getMotionFile(t, e);
            this.loadMotion(r, this.modelHomeDir + r, function(r) {
                r.setFadeIn(i.modelSetting.getMotionFadeIn(t, e)),
                r.setFadeOut(i.modelSetting.getMotionFadeOut(t, e))
            })
        }
    }
    ,
    o.prototype.update = function() {
        if (null == this.live2DModel)
            return void (l.default.DEBUG_LOG && console.error("Failed to update."));
        var t = 2 * ((UtSystem.getUserTimeMSec() - this.startTimeMSec) / 1e3) * Math.PI;
        this.mainMotionManager.isFinished() && ("1" === sessionStorage.getItem("Sleepy") ? this.startRandomMotion(l.default.MOTION_GROUP_SLEEPY, l.default.PRIORITY_SLEEPY) : this.startRandomMotion(l.default.MOTION_GROUP_IDLE, l.default.PRIORITY_IDLE)),
        this.live2DModel.loadParam(),
        this.mainMotionManager.updateParam(this.live2DModel) || null != this.eyeBlink && this.eyeBlink.updateParam(this.live2DModel),
        this.live2DModel.saveParam(),
        null == this.expressionManager || null == this.expressions || this.expressionManager.isFinished() || this.expressionManager.updateParam(this.live2DModel),
        this.live2DModel.addToParamFloat("PARAM_ANGLE_X", 30 * this.dragX, 1),
        this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", 30 * this.dragY, 1),
        this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", -(this.dragX * this.dragY * 30), 1),
        this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", 10 * this.dragX, 1),
        this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1),
        this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1),
        this.live2DModel.addToParamFloat("PARAM_ANGLE_X", Number(15 * Math.sin(t / 6.5345)), .5),
        this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", Number(8 * Math.sin(t / 3.5345)), .5),
        this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", Number(10 * Math.sin(t / 5.5345)), .5),
        this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", Number(4 * Math.sin(t / 15.5345)), .5),
        this.live2DModel.setParamFloat("PARAM_BREATH", Number(.5 + .5 * Math.sin(t / 3.2345)), 1),
        null != this.physics && this.physics.updateParam(this.live2DModel),
        null == this.lipSync && this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y", this.lipSyncValue),
        null != this.pose && this.pose.updateParam(this.live2DModel),
        this.live2DModel.update()
    }
    ,
    o.prototype.setRandomExpression = function() {
        var t = [];
        for (var i in this.expressions)
            t.push(i);
        var e = parseInt(Math.random() * t.length);
        this.setExpression(t[e])
    }
    ,
    o.prototype.startRandomMotion = function(t, i) {
        var e = parseInt(Math.random() * this.modelSetting.getMotionNum(t));
        this.startMotion(t, e, i)
    }
    ,
    o.prototype.startMotion = function(t, i, e) {
        var r = this.modelSetting.getMotionFile(t, i);
        if (null == r || "" == r)
            return void (l.default.DEBUG_LOG && console.error("Failed to motion."));
        if (e == l.default.PRIORITY_FORCE)
            this.mainMotionManager.setReservePriority(e);
        else if (!this.mainMotionManager.reserveMotion(e))
            return void (l.default.DEBUG_LOG && console.log("Motion is running."));
        var o, s = this;
        null == this.motions[t] ? this.loadMotion(null, this.modelHomeDir + r, function(r) {
            o = r,
            s.setFadeInFadeOut(t, i, e, o)
        }) : (o = this.motions[t],
        s.setFadeInFadeOut(t, i, e, o))
    }
    ,
    o.prototype.setFadeInFadeOut = function(t, i, e, r) {
        var o = this.modelSetting.getMotionFile(t, i);
        if (r.setFadeIn(this.modelSetting.getMotionFadeIn(t, i)),
        r.setFadeOut(this.modelSetting.getMotionFadeOut(t, i)),
        l.default.DEBUG_LOG && console.log("Start motion : " + o),
        null == this.modelSetting.getMotionSound(t, i))
            this.mainMotionManager.startMotionPrio(r, e);
        else {
            var s = this.modelSetting.getMotionSound(t, i)
              , n = document.createElement("audio");
            n.src = this.modelHomeDir + s,
            l.default.DEBUG_LOG && console.log("Start sound : " + s),
            n.play(),
            this.mainMotionManager.startMotionPrio(r, e)
        }
    }
    ,
    o.prototype.setExpression = function(t) {
        var i = this.expressions[t];
        l.default.DEBUG_LOG && console.log("Expression : " + t),
        this.expressionManager.startMotion(i, !1)
    }
    ,
    o.prototype.draw = function(t) {
        p.default.push(),
        p.default.multMatrix(this.modelMatrix.getArray()),
        this.tmpMatrix = p.default.getMatrix(),
        this.live2DModel.setMatrix(this.tmpMatrix),
        this.live2DModel.draw(),
        p.default.pop()
    }
    ,
    o.prototype.hitTest = function(t, i, e) {
        for (var r = this.modelSetting.getHitAreaNum(), o = 0; o < r; o++)
            if (t == this.modelSetting.getHitAreaName(o)) {
                var s = this.modelSetting.getHitAreaID(o);
                return this.hitTestSimple(s, i, e)
            }
        return !1
    }
    ,
    o.prototype.hitTestCustom = function(t, i, e) {
        return "head" == t ? this.hitTestSimpleCustom(l.default.hit_areas_custom_head_x, l.default.hit_areas_custom_head_y, i, e) : "body" == t && this.hitTestSimpleCustom(l.default.hit_areas_custom_body_x, l.default.hit_areas_custom_body_y, i, e)
    }
}
, function(t, i, e) {
    "use strict";
    function r() {
        this.NAME = "name",
        this.ID = "id",
        this.MODEL = "model",
        this.TEXTURES = "textures",
        this.HIT_AREAS = "hit_areas",
        this.PHYSICS = "physics",
        this.POSE = "pose",
        this.EXPRESSIONS = "expressions",
        this.MOTION_GROUPS = "motions",
        this.SOUND = "sound",
        this.FADE_IN = "fade_in",
        this.FADE_OUT = "fade_out",
        this.LAYOUT = "layout",
        this.HIT_AREAS_CUSTOM = "hit_areas_custom",
        this.INIT_PARAM = "init_param",
        this.INIT_PARTS_VISIBLE = "init_parts_visible",
        this.VALUE = "val",
        this.FILE = "file",
        this.json = {}
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.default = r;
    var o = e(0);
    r.prototype.loadModelSetting = function(t, i) {
        var e = this;
        o.Live2DFramework.getPlatformManager().loadBytes(t, function(t) {
            var r = String.fromCharCode.apply(null, new Uint8Array(t));
            e.json = JSON5.parse(r),
            e.json.model.startsWith("Live2D/Card_") && (e.json.layout = {
                height: 1.4,
                center_x: 0,
                center_y: 0
            }),
            i()
        })
    }
    ,
    r.prototype.getTextureFile = function(t) {
        return null == this.json[this.TEXTURES] || null == this.json[this.TEXTURES][t] ? null : this.json[this.TEXTURES][t]
    }
    ,
    r.prototype.getModelFile = function() {
        return this.json[this.MODEL]
    }
    ,
    r.prototype.getTextureNum = function() {
        return null == this.json[this.TEXTURES] ? 0 : this.json[this.TEXTURES].length
    }
    ,
    r.prototype.getHitAreaNum = function() {
        return null == this.json[this.HIT_AREAS] ? 0 : this.json[this.HIT_AREAS].length
    }
    ,
    r.prototype.getHitAreaID = function(t) {
        return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.ID]
    }
    ,
    r.prototype.getHitAreaName = function(t) {
        return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.NAME]
    }
    ,
    r.prototype.getPhysicsFile = function() {
        return this.json[this.PHYSICS]
    }
    ,
    r.prototype.getPoseFile = function() {
        return this.json[this.POSE]
    }
    ,
    r.prototype.getExpressionNum = function() {
        return null == this.json[this.EXPRESSIONS] ? 0 : this.json[this.EXPRESSIONS].length
    }
    ,
    r.prototype.getExpressionFile = function(t) {
        return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.FILE]
    }
    ,
    r.prototype.getExpressionName = function(t) {
        return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.NAME]
    }
    ,
    r.prototype.getLayout = function() {
        return this.json[this.LAYOUT]
    }
    ,
    r.prototype.getHitAreasCustom = function() {
        return this.json[this.HIT_AREAS_CUSTOM]
    }
    ,
    r.prototype.getInitParamNum = function() {
        return null == this.json[this.INIT_PARAM] ? 0 : this.json[this.INIT_PARAM].length
    }
    ,
    r.prototype.getMotionNum = function(t) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] ? 0 : this.json[this.MOTION_GROUPS][t].length
    }
    ,
    r.prototype.getMotionFile = function(t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] ? null : this.json[this.MOTION_GROUPS][t][i][this.FILE]
    }
    ,
    r.prototype.getMotionSound = function(t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.SOUND] ? null : this.json[this.MOTION_GROUPS][t][i][this.SOUND]
    }
    ,
    r.prototype.getMotionFadeIn = function(t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_IN] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_IN]
    }
    ,
    r.prototype.getMotionFadeOut = function(t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT]
    }
    ,
    r.prototype.getInitParamID = function(t) {
        return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? null : this.json[this.INIT_PARAM][t][this.ID]
    }
    ,
    r.prototype.getInitParamValue = function(t) {
        return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? NaN : this.json[this.INIT_PARAM][t][this.VALUE]
    }
    ,
    r.prototype.getInitPartsVisibleNum = function() {
        return null == this.json[this.INIT_PARTS_VISIBLE] ? 0 : this.json[this.INIT_PARTS_VISIBLE].length
    }
    ,
    r.prototype.getInitPartsVisibleID = function(t) {
        return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? null : this.json[this.INIT_PARTS_VISIBLE][t][this.ID]
    }
    ,
    r.prototype.getInitPartsVisibleValue = function(t) {
        return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? NaN : this.json[this.INIT_PARTS_VISIBLE][t][this.VALUE]
    }
}
]);
