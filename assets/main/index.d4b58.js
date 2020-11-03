window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  IronSource: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42a2f7I9E5L154WvjVkjbmi", "IronSource");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.interstitialHandler = exports.rewardHandler = void 0;
    var sdkManager_1 = require("../../sdkManager");
    var rewardHandler = function() {
      function rewardHandler(rewardCb, noRewardCb, disPlayCb, failedCb) {
        void 0 === noRewardCb && (noRewardCb = function() {});
        void 0 === disPlayCb && (disPlayCb = function() {});
        void 0 === failedCb && (failedCb = function() {});
        this.rewardCb = rewardCb;
        this.noRewardCb = noRewardCb;
        this.disPlayCb = disPlayCb;
        this.failedCb = failedCb;
      }
      return rewardHandler;
    }();
    exports.rewardHandler = rewardHandler;
    var interstitialHandler = function() {
      function interstitialHandler(disMissCb, disPlayCb) {
        void 0 === disMissCb && (disMissCb = function() {});
        void 0 === disPlayCb && (disPlayCb = function() {});
        this.disMissCb = disMissCb;
        this.disPlayCb = disPlayCb;
      }
      return interstitialHandler;
    }();
    exports.interstitialHandler = interstitialHandler;
    var IronSource = function() {
      function IronSource() {}
      IronSource.prototype.init = function() {
        cc.log("IronSource init");
        this.cacheFullScreenAD();
        this.cacheRewardVideoAD();
        this.cacheBannerAD();
      };
      IronSource.prototype.setRewardHandler = function(rewardCb, noRewardCb, disPlayCb, failedCb) {
        this.rewardHandler = new rewardHandler(rewardCb, noRewardCb, disPlayCb, failedCb);
      };
      IronSource.prototype.setInterstitialHandler = function(disMissCb, disPlayCb) {
        this.interstitialHandler = new interstitialHandler(disMissCb, disPlayCb);
      };
      IronSource.prototype.handle = function(jsonMsg) {
        cc.log(jsonMsg);
        var msgObj = JSON.parse(jsonMsg);
        switch (msgObj.eventID) {
         case "AD_RV":
          if ("RV_Close" == msgObj.eventData.rewardEventID) {
            sdkManager_1.default.adManager.adTimeVal = 0;
            "success" == msgObj.eventData.rewardEventData ? this.rewardHandler.rewardCb() : this.rewardHandler.noRewardCb();
          } else "RV_Open" == msgObj.eventData.rewardEventID && this.rewardHandler.disPlayCb();
          break;

         case "FULL":
          if ("FULL_Open" == msgObj.eventData.fullEventID) this.interstitialHandler.disPlayCb(); else if ("FULL_Close" == msgObj.eventData.fullEventID) {
            this.interstitialHandler.disMissCb();
            sdkManager_1.default.adManager.adTimeVal = 0;
          } else "FULL_Load" == msgObj.eventData.fullEventID;
          break;

         case "BANNER":
          "BANNER_Open" == msgObj.eventData.bannerEventID || "BANNER_Close" == msgObj.eventData.bannerEventID;
        }
      };
      IronSource.prototype.cacheFullScreenAD = function() {
        jsb.reflection.callStaticMethod("ProxyAD", "loadInterstitial");
      };
      IronSource.prototype.cacheRewardVideoAD = function() {};
      IronSource.prototype.cacheBannerAD = function() {};
      IronSource.prototype.showFullScreenAD = function() {
        if (!this.isFullScreenAvailable()) return;
        jsb.reflection.callStaticMethod("ProxyAD", "showInterstitial");
      };
      IronSource.prototype.showRewardVideoAD = function() {
        if (!this.isRewardVideoAvailable()) {
          this.rewardHandler.failedCb();
          return;
        }
        jsb.reflection.callStaticMethod("ProxyAD", "showRewardedVideo");
      };
      IronSource.prototype.showBanner = function() {
        jsb.reflection.callStaticMethod("ProxyAD", "showBanner");
      };
      IronSource.prototype.hideBanner = function() {
        jsb.reflection.callStaticMethod("ProxyAD", "hideBanner");
      };
      IronSource.prototype.isBannerAvailable = function() {
        return true;
      };
      IronSource.prototype.isFullScreenAvailable = function() {
        var ret = jsb.reflection.callStaticMethod("ProxyAD", "isInterstitialAvailable");
        return ret;
      };
      IronSource.prototype.isRewardVideoAvailable = function() {
        var ret = jsb.reflection.callStaticMethod("ProxyAD", "isRewardedVideoAvailable");
        return ret;
      };
      return IronSource;
    }();
    exports.default = IronSource;
    window["IronSource"] = new IronSource();
    cc._RF.pop();
  }, {
    "../../sdkManager": "sdkManager"
  } ],
  OPPOAdManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3edcbbgoZFOCJgPvV4YMzFB", "OPPOAdManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var OPPOAdManager = function() {
      function OPPOAdManager() {
        this.adDisTime = 20;
        this.isRemoveAd = false;
        this.videoAd = null;
        this.init();
      }
      OPPOAdManager.prototype.init = function() {
        cc.log("\u5934\u6761\u5e7f\u544a\u521d\u59cb\u5316");
      };
      OPPOAdManager.prototype.ShowRewardedVideo = function(rewardCb, noRewardCb, disPlayCb, failedCb) {
        var _this = this;
        if (null == this.videoAd) {
          this.videoAd = qg.createRewardedVideoAd({
            adUnitId: "xxx"
          });
          this.videoAd.onLoad(function() {
            cc.log("\u6fc0\u52b1\u89c6\u9891\u52a0\u8f7d\u6210\u529f");
            disPlayCb && disPlayCb();
            _this.videoAd.show();
          });
          var cb_1 = function(res) {
            _this.videoAd.offClose(cb_1);
            if (res.isEnded) {
              cc.log("\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u5b8c\u6210\uff0c\u53d1\u653e\u5956\u52b1");
              rewardCb();
            } else {
              cc.log("\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u53d6\u6d88\u5173\u95ed\uff0c\u4e0d\u53d1\u653e\u5956\u52b1");
              noRewardCb && noRewardCb();
            }
          };
          this.videoAd.onClose(cb_1);
          this.videoAd.onError(function(err) {
            cc.log(err);
            failedCb && failedCb();
          });
        } else this.videoAd.show();
      };
      OPPOAdManager.prototype.ShowInterstitial = function(disMissCb, disPlayCb) {
        cc.log("\u63d2\u5c4f\u5e7f\u544a");
      };
      OPPOAdManager.prototype.ShowNativeAd = function() {
        var nativeAd = qg.createNativeAd({
          adUnitId: "xxx"
        });
        nativeAd.onLoad(function(res) {
          cc.log("\u539f\u751f\u5e7f\u544a\u52a0\u8f7d", res.adList);
          var adList = res.adList;
        });
      };
      OPPOAdManager.prototype.ShowBanner = function() {
        var _this = this;
        if (null == this.bannerAd) {
          this.bannerAd = qg.createBannerAd({
            adUnitId: "xxx"
          });
          this.bannerAd.onLoad(function() {
            _this.bannerAd.show();
          });
          this.bannerAd.onError(function(err) {
            cc.log(err);
          });
        } else this.bannerAd.show();
      };
      OPPOAdManager.prototype.HideBanner = function() {
        null != this.bannerAd && this.bannerAd.hide();
      };
      OPPOAdManager.prototype.onRemoveAds = function() {};
      OPPOAdManager.prototype.getCanAd = function() {
        return true;
      };
      OPPOAdManager.prototype.getCanVideo = function() {
        return true;
      };
      return OPPOAdManager;
    }();
    exports.default = OPPOAdManager;
    cc._RF.pop();
  }, {} ],
  PersistRootNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "db762VuFVJAUIZZii1pPAEo", "PersistRootNode");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var gameManage_1 = require("../Script/gameManage");
    var puremvc_1 = require("./puremvc");
    var sdkManager_1 = require("./Sdk/sdkManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PersistRootNode = function(_super) {
      __extends(PersistRootNode, _super);
      function PersistRootNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progress = null;
        _this.arrImg = [];
        _this.imgBg = null;
        _this.xlsxData = null;
        _this.gameManage = null;
        return _this;
      }
      PersistRootNode_1 = PersistRootNode;
      PersistRootNode.prototype.onLoad = function() {
        var _this = this;
        this.gameManage = puremvc_1.puremvc.Facade.getInstance().getProxy(gameManage_1.default);
        cc.log("\u8fdb\u5165\u9996\u9875");
        cc.macro.ENABLE_MULTI_TOUCH = false;
        sdkManager_1.default.init();
        cc.game.addPersistRootNode(this.node);
        cc.game.on(cc.game.EVENT_HIDE, function(event) {
          _this.gameManage.onGameExit();
        });
        this.initData();
      };
      PersistRootNode.prototype.initData = function() {
        this.gameManage.xlsxData = this.xlsxData["json"]["test"];
      };
      PersistRootNode.prototype.update = function(dt) {
        sdkManager_1.default.update(dt);
        PersistRootNode_1.buttonAnction > 0 && (PersistRootNode_1.buttonAnction -= dt);
      };
      var PersistRootNode_1;
      PersistRootNode.buttonAnction = 0;
      __decorate([ property(cc.ProgressBar) ], PersistRootNode.prototype, "progress", void 0);
      __decorate([ property([ cc.SpriteFrame ]) ], PersistRootNode.prototype, "arrImg", void 0);
      __decorate([ property(cc.Sprite) ], PersistRootNode.prototype, "imgBg", void 0);
      __decorate([ property(cc.Asset) ], PersistRootNode.prototype, "xlsxData", void 0);
      PersistRootNode = PersistRootNode_1 = __decorate([ ccclass ], PersistRootNode);
      return PersistRootNode;
    }(cc.Component);
    exports.default = PersistRootNode;
    cc._RF.pop();
  }, {
    "../Script/gameManage": "gameManage",
    "./Sdk/sdkManager": "sdkManager",
    "./puremvc": "puremvc"
  } ],
  VibrateManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "726a9zatJhGEIaYlyJK2YkR", "VibrateManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var puremvc_1 = require("../../puremvc");
    var localStorageProxy_1 = require("../../localStorageProxy");
    var sdkManager_1 = require("../sdkManager");
    var VibrateManager = function() {
      function VibrateManager() {
        this.localStorageProxy = puremvc_1.puremvc.Facade.getInstance().getProxy(localStorageProxy_1.default);
        this.canVibarte = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.isVibart);
      }
      VibrateManager.prototype.switchVibrate = function() {
        this.canVibarte = !this.canVibarte;
        this.localStorageProxy.setItem(localStorageProxy_1.storageKey.isVibart, this.canVibarte);
        this.vibrate2();
      };
      VibrateManager.prototype.vibrate1 = function() {
        if (this.canVibarte) switch (sdkManager_1.default.platForm) {
         case sdkManager_1.platformEnum.ZJTD:
          sdkManager_1.default.ZJTDSdk.vibrateShort();
          break;

         case sdkManager_1.platformEnum.WX:
          sdkManager_1.default.WXSdk.vibrateShort();
          break;

         case sdkManager_1.platformEnum.ios:
          jsb.reflection.callStaticMethod("Hn_Util", "vibrate1");
        }
      };
      VibrateManager.prototype.vibrate2 = function() {
        if (this.canVibarte) switch (sdkManager_1.default.platForm) {
         case sdkManager_1.platformEnum.ZJTD:
          sdkManager_1.default.ZJTDSdk.vibrateShort();
          break;

         case sdkManager_1.platformEnum.WX:
          sdkManager_1.default.WXSdk.vibrateShort();
          break;

         case sdkManager_1.platformEnum.ios:
          jsb.reflection.callStaticMethod("Hn_Util", "vibrate2");
        }
      };
      VibrateManager.prototype.vibrate3 = function() {
        if (this.canVibarte) switch (sdkManager_1.default.platForm) {
         case sdkManager_1.platformEnum.ZJTD:
          sdkManager_1.default.ZJTDSdk.vibrateShort();
          break;

         case sdkManager_1.platformEnum.WX:
          sdkManager_1.default.WXSdk.vibrateShort();
          break;

         case sdkManager_1.platformEnum.ios:
          jsb.reflection.callStaticMethod("Hn_Util", "vibrate3");
        }
      };
      VibrateManager.prototype.vibrate4 = function() {
        if (this.canVibarte) switch (sdkManager_1.default.platForm) {
         case sdkManager_1.platformEnum.ZJTD:
          sdkManager_1.default.ZJTDSdk.vibrateShort();
          break;

         case sdkManager_1.platformEnum.WX:
          sdkManager_1.default.WXSdk.vibrateShort();
          break;

         case sdkManager_1.platformEnum.ios:
          jsb.reflection.callStaticMethod("Hn_Util", "vibrate4");
        }
      };
      return VibrateManager;
    }();
    exports.default = VibrateManager;
    cc._RF.pop();
  }, {
    "../../localStorageProxy": "localStorageProxy",
    "../../puremvc": "puremvc",
    "../sdkManager": "sdkManager"
  } ],
  WXAdManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a37b67zP6tIN7i70+wofEUI", "WXAdManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WXAdManager = function() {
      function WXAdManager() {
        this.adDisTime = 20;
        this.isRemoveAd = false;
        this.videoAd = null;
        this.init();
      }
      WXAdManager.prototype.init = function() {
        cc.log("\u5934\u6761\u5e7f\u544a\u521d\u59cb\u5316");
      };
      WXAdManager.prototype.ShowRewardedVideo = function(rewardCb, noRewardCb, disPlayCb, failedCb) {
        var _this = this;
        if (null == this.videoAd) {
          this.videoAd = wx.createRewardedVideoAd({
            adUnitId: "adunit-bec83b9099dcd9ca"
          });
          this.videoAd.onError(function(err) {
            console.log(err);
          });
        }
        if (!this.videoAd) {
          noRewardCb && noRewardCb();
          cc.error("\u5e7f\u544a\u521b\u5efa\u5931\u8d25");
          return;
        }
        this.videoAd.show().then(function() {
          console.log("\u5e7f\u544a\u663e\u793a\u6210\u529f");
          disPlayCb && disPlayCb();
        }).catch(function(err) {
          console.log("\u5e7f\u544a\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
          failedCb && failedCb();
          _this.videoAd.load().then(function() {
            console.log("\u624b\u52a8\u52a0\u8f7d\u6210\u529f");
            return _this.videoAd.show();
          });
        });
        var listener = function(res) {
          res.isEnded ? rewardCb() : noRewardCb && noRewardCb();
          _this.videoAd.offClose(listener);
        };
        this.videoAd.onClose(listener);
      };
      WXAdManager.prototype.ShowInterstitial = function(disMissCb, disPlayCb) {
        var _this = this;
        cc.log("\u63d2\u5c4f\u5e7f\u544a");
        if (null == this.interstitialAd) {
          this.interstitialAd = wx.createInterstitialAd({
            adUnitId: "adunit-3017c3378343aca4"
          });
          this.interstitialAd.load().then(function() {
            _this.interstitialAd.show();
            disPlayCb && disPlayCb();
          }).catch(function(err) {
            cc.log("\u63d2\u5c4f\u5e7f\u544a\u64ad\u653e\u5931\u8d25");
            cc.log(err);
          });
          this.interstitialAd.onClose(function() {
            _this.interstitialAd.destroy();
            _this.interstitialAd = null;
            disMissCb && disMissCb();
          });
        } else this.interstitialAd.show();
      };
      WXAdManager.prototype.ShowBanner = function() {
        var _this = this;
        if (null == this.bannerAd) {
          var winSize_1 = wx.getSystemInfoSync();
          var bannerHeight = 80;
          var bannerWidth = 320;
          this.bannerAd = wx.createBannerAd({
            adUnitId: "adunit-66eb13a612551a50",
            style: {
              left: (winSize_1.windowWidth - bannerWidth) / 2,
              top: winSize_1.windowHeight - bannerHeight,
              width: bannerWidth
            },
            adIntervals: 30
          });
          this.bannerAd.onResize(function(res) {
            _this.bannerAd.style.top = winSize_1.windowHeight - _this.bannerAd.style.realHeight;
          });
          this.bannerAd.onLoad(function() {
            _this.bannerAd.show().then(function() {
              cc.log("\u5e7f\u544a\u663e\u793a\u6210\u529f");
            }).catch(function(err) {
              cc.log("\u5e7f\u544a\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
            });
          });
          this.bannerAd.onError(function(err) {
            console.log(err);
          });
        } else this.bannerAd.show().then(function() {
          cc.log("\u5e7f\u544a\u663e\u793a\u6210\u529f");
        }).catch(function(err) {
          cc.log("\u5e7f\u544a\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
        });
      };
      WXAdManager.prototype.HideBanner = function() {
        if (null != this.bannerAd) {
          this.bannerAd.destroy();
          this.bannerAd = null;
        }
      };
      WXAdManager.prototype.onRemoveAds = function() {};
      WXAdManager.prototype.getCanAd = function() {
        return true;
      };
      WXAdManager.prototype.getCanVideo = function() {
        return true;
      };
      return WXAdManager;
    }();
    exports.default = WXAdManager;
    cc._RF.pop();
  }, {} ],
  WXSdk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e87dfItGTdOEY/CW9CT0dJe", "WXSdk");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WXSdk = function() {
      function WXSdk() {
        this.APPID = "wx0b66e374417dd76a";
        this.SECRET = "41aeb2c6e901529613db110a655bb05c";
        this.openid = null;
        this.session_key = null;
        this.unionid = null;
        this.access_token = null;
        this.expires_in = null;
        this.isShare = false;
        this.login();
      }
      WXSdk.prototype.login = function() {
        var _this = this;
        wx.login({
          force: true,
          success: function(res) {
            if (res.code) {
              var code = res.code;
              cc.log(code);
              wx.request({
                url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + _this.APPID + "&secret=" + _this.SECRET + "&js_code=" + code + "&grant_type=authorization_code",
                data: {},
                success: function(response) {
                  cc.log("success response = ", response);
                  cc.log("OpenID = ", response.data);
                  _this.openid = response.openid;
                  _this.session_key = response.sesession_key;
                  _this.unionid = response.unionid;
                },
                fail: function(response) {
                  cc.log("fail response = ", response);
                }
              });
            } else cc.log("\u767b\u5f55\u5931\u8d25\uff01" + res.errMsg);
          }
        });
      };
      WXSdk.prototype.getAccessToken = function() {
        var _this = this;
        wx.login({
          force: true,
          success: function(res) {
            res.code ? wx.request({
              url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + _this.APPID + "&secret=" + _this.SECRET,
              data: {},
              success: function(response) {
                cc.log("success response = ", response);
                cc.log("OpenID = ", response.data);
                _this.access_token = response.access_token;
                _this.expires_in = response.expires_in;
              },
              fail: function(response) {
                cc.log("fail response = ", response);
              }
            }) : cc.log("\u767b\u5f55\u5931\u8d25\uff01" + res.errMsg);
          }
        });
      };
      WXSdk.prototype.createUserInfoButton = function() {
        var button = wx.createUserInfoButton({
          type: "text",
          text: "\u83b7\u53d6\u7528\u6237\u4fe1\u606f",
          style: {
            left: 10,
            top: 76,
            width: 200,
            height: 40,
            lineHeight: 40,
            backgroundColor: "#ff0000",
            color: "#ffffff",
            textAlign: "center",
            fontSize: 16,
            borderRadius: 4
          }
        });
        button.onTap(function(res) {
          cc.log("\u521b\u5efa\u7528\u6237\u4fe1\u606f\u6388\u6743\u6309\u94ae");
          cc.error(res);
        });
      };
      WXSdk.prototype.getUserInfo = function() {
        wx.getUserInfo({
          success: function(res) {
            cc.log("\u83b7\u53d6\u7528\u6237\u4fe1\u606f");
            cc.error(res);
          }
        });
      };
      WXSdk.prototype.setUserCloudStorage = function() {
        var KVDataList = [];
        var VData = {
          star: {
            score: String(16),
            update_time: String(new Date().getTime())
          }
        };
        KVDataList.push(VData);
        wx.setUserCloudStorage({
          KVDataList: KVDataList,
          success: function(res) {
            cc.log("\u6392\u884c\u4e0a\u4f20\u6210\u529f");
            cc.log(res);
          },
          fail: function(res) {
            cc.log("\u6392\u884c\u4e0a\u4f20\u5931\u8d25");
            cc.log(res);
          }
        });
      };
      WXSdk.prototype.share = function(cb) {
        var _this = this;
        canvas.toTempFilePath({
          destWidth: 500,
          destHeight: 400,
          success: function(res) {
            wx.shareAppMessage({
              title: "\u770b\u56fe\u8865\u753b\uff0c\u6765\u53d1\u6325\u4f60\u7684\u8111\u6d1e\u5427\uff01",
              imageUrl: res.tempFilePath
            });
            _this.isShare = true;
          }
        });
        var callBock = function() {
          cc.log("wx.onShow");
          if (_this.isShare) {
            cc.log("\u5206\u4eab\u6210\u529f");
            _this.isShare = false;
            cb();
          }
          wx.offShow(callBock);
        };
        wx.onShow(callBock);
      };
      WXSdk.prototype.vibrateShort = function() {
        wx.vibrateShort({
          success: function(res) {
            cc.log("" + res);
          },
          fail: function(res) {
            cc.log("vibrateShort\u8c03\u7528\u5931\u8d25");
          }
        });
      };
      WXSdk.prototype.vibrateLong = function() {
        wx.vibrateLong({
          success: function(res) {
            console.log("" + res);
          },
          fail: function(res) {
            console.log("vibrateLong\u8c03\u7528\u5931\u8d25");
          }
        });
      };
      WXSdk.prototype.aldSendEvent = function(str, objOrStr) {
        console.log("send\xa0msg:\xa0", str);
        wx.aldSendEvent ? objOrStr ? wx.aldSendEvent(str, objOrStr) : wx.aldSendEvent(str) : console.error("----\x3e\xa0\u963f\u62c9\u4e01\u63a5\u5165\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5game.js");
      };
      WXSdk.prototype.getLaunchOptionsSync = function() {
        return wx.getLaunchOptionsSync();
      };
      WXSdk.prototype.loadSubpackage = function(successCb) {};
      return WXSdk;
    }();
    exports.default = WXSdk;
    cc._RF.pop();
  }, {} ],
  ZJTDAdManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94e53NVqjJPiL3+sid9GFrZ", "ZJTDAdManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ZJTDAdManager = function() {
      function ZJTDAdManager() {
        this.adDisTime = 10;
        this.isRemoveAd = false;
        this.videoAd = null;
        this.init();
      }
      ZJTDAdManager.prototype.init = function() {
        this.isToutiaio = "Toutiao" === tt.getSystemInfoSync().appName;
        cc.log("\u5934\u6761\u5e7f\u544a\u521d\u59cb\u5316", this.isToutiaio);
      };
      ZJTDAdManager.prototype.ShowRewardedVideo = function(rewardCb, noRewardCb, disPlayCb, failedCb) {
        var _this = this;
        null == this.videoAd && (this.videoAd = tt.createRewardedVideoAd({
          adUnitId: "119d54g1ff1dbgg8d0"
        }));
        if (!this.videoAd) {
          noRewardCb && noRewardCb();
          cc.error("\u5e7f\u544a\u521b\u5efa\u5931\u8d25");
          return;
        }
        this.videoAd.show().then(function() {
          console.log("\u5e7f\u544a\u663e\u793a\u6210\u529f");
          disPlayCb && disPlayCb();
        }).catch(function(err) {
          console.log("\u5e7f\u544a\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
          failedCb && failedCb();
          _this.videoAd.load().then(function() {
            console.log("\u624b\u52a8\u52a0\u8f7d\u6210\u529f");
            return _this.videoAd.show();
          });
        });
        var listener = function(res) {
          res.isEnded ? rewardCb() : noRewardCb && noRewardCb();
          _this.videoAd.offClose(listener);
        };
        this.videoAd.onClose(listener);
      };
      ZJTDAdManager.prototype.ShowInterstitial = function(disMissCb, disPlayCb) {
        var _this = this;
        cc.log("\u63d2\u5c4f\u5e7f\u544a");
        if (this.isToutiaio) {
          this.interstitialAd = tt.createInterstitialAd({
            adUnitId: "tu72fs0fq3ae2ljqe4"
          });
          this.interstitialAd.load().then(function() {
            _this.interstitialAd.show();
            disPlayCb && disPlayCb();
          }).catch(function(err) {
            cc.log("\u63d2\u5c4f\u5e7f\u544a\u64ad\u653e\u5931\u8d25");
            cc.log(err);
          });
          this.interstitialAd.onClose(function() {
            _this.interstitialAd.destroy();
            _this.interstitialAd = null;
            disMissCb && disMissCb();
          });
        }
      };
      ZJTDAdManager.prototype.ShowBanner = function() {
        var _this = this;
        if (!this.isToutiaio) return;
        var _a = tt.getSystemInfoSync(), windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
        var targetBannerAdWidth = 150;
        if (null == this.bannerAd) {
          this.bannerAd = tt.createBannerAd({
            adUnitId: "2sofcmoleav99vkbjg",
            style: {
              width: targetBannerAdWidth
            },
            adIntervals: 30
          });
          this.bannerAd.onResize(function(size) {
            cc.log(size.width, size.height);
            _this.bannerAd.style.top = windowHeight - size.height;
            _this.bannerAd.style.left = (windowWidth - size.width) / 2;
          });
          this.bannerAd.onLoad(function() {
            _this.bannerAd.show().then(function() {
              cc.log("\u5e7f\u544a\u663e\u793a\u6210\u529f");
            }).catch(function(err) {
              cc.log("\u5e7f\u544a\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
            });
          });
        } else this.bannerAd.show().then(function() {
          cc.log("\u5e7f\u544a\u663e\u793a\u6210\u529f");
        }).catch(function(err) {
          cc.log("\u5e7f\u544a\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", err);
        });
      };
      ZJTDAdManager.prototype.HideBanner = function() {
        null != this.bannerAd && this.bannerAd.hide();
      };
      ZJTDAdManager.prototype.onRemoveAds = function() {};
      ZJTDAdManager.prototype.getCanAd = function() {
        return true;
      };
      ZJTDAdManager.prototype.getCanVideo = function() {
        return true;
      };
      return ZJTDAdManager;
    }();
    exports.default = ZJTDAdManager;
    cc._RF.pop();
  }, {} ],
  ZJTDSdk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17d3dxFg1VOUpuA14UWUATN", "ZJTDSdk");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ZJTDSdk = function() {
      function ZJTDSdk() {
        this._recorder = null;
        this._videoPath = null;
        this._iTime = 0;
        this._res = 0;
        this._startTime = 0;
        this._clipVoidCb = null;
        this.login();
        this.setUserGroup();
        this.initVideoRecord();
      }
      ZJTDSdk.prototype.login = function() {
        tt.login({
          force: false,
          success: function(res) {
            console.log("login\u8c03\u7528\u6210\u529f" + res.code + " " + res.anonymousCode);
          },
          fail: function(res) {
            console.log("login\u8c03\u7528\u5931\u8d25");
          }
        });
      };
      ZJTDSdk.prototype.checkSession = function() {
        tt.checkSession({
          success: function() {
            console.log("session\u672a\u8fc7\u671f");
          },
          fail: function() {
            console.log("session\u5df2\u8fc7\u671f\uff0c\u9700\u8981\u91cd\u65b0\u767b\u5f55");
          }
        });
      };
      ZJTDSdk.prototype.getUserInfo = function() {
        tt.getUserInfo({
          success: function(res) {
            console.log("getUserInfo \u8c03\u7528\u6210\u529f " + res.userInfo);
          },
          fail: function(res) {
            console.log("getUserInfo \u8c03\u7528\u5931\u8d25");
          }
        });
      };
      ZJTDSdk.prototype.reportAnalytics = function() {
        tt.reportAnalytics("clickBanner", {
          time: 1547533711355,
          uid: 123456
        });
      };
      ZJTDSdk.prototype.setUserGroup = function() {
        tt.setUserGroup({
          groupId: "test_group"
        });
      };
      ZJTDSdk.prototype.setUserCloudStorage = function(key, score, otherKey) {
        void 0 === otherKey && (otherKey = 0);
        var data = {
          ttgame: {
            score: score,
            update_time: new Date().getTime()
          },
          otherKey: otherKey
        };
        tt.setUserCloudStorage({
          KVDataList: [ {
            key: key,
            value: JSON.stringify(data)
          } ]
        });
      };
      ZJTDSdk.prototype.getCloudStorageByRelation = function(key) {
        var result;
        tt.getCloudStorageByRelation({
          type: key,
          keyList: [ "score" ],
          extra: {
            sortKey: "score",
            groupId: "test_group"
          },
          success: function(res) {
            console.log(res);
            result = res;
          },
          fail: function(e) {
            console.log("\u83b7\u53d6\u6570\u636e\u5931\u8d25");
          }
        });
        return result;
      };
      ZJTDSdk.prototype.getSetting = function() {
        tt.getSetting({
          success: function(scope) {
            cc.log("\u83b7\u53d6\u6388\u6743\u7ed3\u679c" + JSON.stringify(scope));
          }
        });
      };
      ZJTDSdk.prototype.openSetting = function() {
        tt.openSetting();
      };
      ZJTDSdk.prototype.authorize = function() {
        tt.authorize({
          scope: "scope.userInfo",
          success: function(res) {
            console.log("res = ", res);
          },
          fail: function(res) {
            tt.openSetting();
          }
        });
      };
      ZJTDSdk.prototype.setClipVoidCb = function(cb) {
        this._clipVoidCb = cb;
      };
      ZJTDSdk.prototype.initVideoRecord = function() {
        var _this = this;
        if (null == this._recorder) {
          this._recorder = tt.getGameRecorderManager();
          this._recorder.onStart(function(res) {
            cc.log("\u5f55\u5c4f\u5f00\u59cb");
            _this._videoPath = null;
          });
          this._recorder.onStop(function(res) {
            _this._iTime = (new Date().getTime() - _this._startTime) / 1e3;
            var time = _this._iTime >= 30 ? 30 : _this._iTime;
            _this._res = res;
            if (time < 3) {
              cc.log("\u5f55\u5c4f\u65f6\u95f4\u5c11\u4e8e3\u79d2");
              return;
            }
            cc.log("\u5f00\u59cb\u526a\u8f91\u5f55\u5c4f");
            _this._recorder.clipVideo({
              path: res.videoPath,
              timeRange: [ time, 0 ],
              success: function(res) {
                cc.log("\u5f55\u5c4f\u526a\u8f91\u6210\u529f", res.videoPath);
                _this._videoPath = res.videoPath;
                _this._clipVoidCb && _this._clipVoidCb();
              },
              fail: function(e) {
                cc.error("\u5f55\u5c4f\u526a\u8f91\u5931\u8d25", e);
              }
            });
            _this._recorder.onError(function(e) {
              cc.error("\u5f55\u5c4f\u5931\u8d25", e);
            });
          });
        }
      };
      ZJTDSdk.prototype.recordClip = function() {
        var _this = this;
        this._recorder.recordClip({
          path: this._res.videoPath,
          timeRange: [ this._iTime, 0 ],
          success: function(res) {
            cc.log("\u5f55\u5c4f\u526a\u8f91\u6210\u529f", _this._res.videoPath);
            _this._videoPath = _this._res.videoPath;
          },
          fail: function(e) {
            cc.error("\u5f55\u5c4f\u526a\u8f91\u5931\u8d25", e);
          }
        });
        this._recorder.onError(function(e) {
          cc.error("\u5f55\u5c4f\u5931\u8d25", e);
        });
      };
      ZJTDSdk.prototype.startVideo = function() {
        if (this._recorder) {
          this._recorder.stop();
          this._startTime = new Date().getTime();
          cc.log("\u5f00\u59cb\u5f55\u5c4f");
          this._recorder.start({
            duration: 300
          });
        }
      };
      ZJTDSdk.prototype.stopVideo = function() {
        if (this._recorder) {
          this._recorder.stop();
          cc.log("\u505c\u6b62\u5f55\u5c4f");
        }
      };
      ZJTDSdk.prototype.shareVideo = function() {
        cc.log("\u5206\u4eab\u5f55\u5c4f", this._videoPath);
        if (this._iTime < 3) cc.log("\u5f55\u5c4f\u5931\u8d25\uff1a\u5f55\u5c4f\u65f6\u957f\u4f4e\u4e8e 3 \u79d2"); else if (this._videoPath) {
          cc.log("\u5206\u4eab\u5f55\u5c4f");
          tt.shareAppMessage({
            channel: "video",
            title: "\u770b\u56fe\u8865\u753b\u5927\u5e08",
            extra: {
              videoPath: this._videoPath
            },
            success: function() {
              cc.log("\u5206\u4eab\u89c6\u9891\u6210\u529f");
            },
            fail: function(e) {
              cc.log("\u5206\u4eab\u89c6\u9891\u5931\u8d25", e.errMsg);
              -1 != e.errMsg.indexOf("short") && cc.log("\u5206\u4eab\u89c6\u9891\u5931\u8d25\uff0c\u89c6\u9891\u65f6\u95f4\u8fc7\u77ed");
            }
          });
        }
      };
      ZJTDSdk.prototype.share = function(title) {
        tt.shareAppMessage({
          title: title,
          extra: "\u770b\u56fe\u8865\u753b\uff0c\u6765\u53d1\u6325\u4f60\u7684\u8111\u6d1e\u5427\uff01",
          imageUrl: "/resource/language/cn/1.jpg"
        });
      };
      ZJTDSdk.prototype.vibrateShort = function() {
        tt.vibrateShort({
          success: function(res) {
            cc.log("" + res);
          },
          fail: function(res) {
            cc.log("vibrateShort\u8c03\u7528\u5931\u8d25");
          }
        });
      };
      ZJTDSdk.prototype.vibrateLong = function() {
        tt.vibrateLong({
          success: function(res) {
            console.log("" + res);
          },
          fail: function(res) {
            console.log("vibrateLong\u8c03\u7528\u5931\u8d25");
          }
        });
      };
      return ZJTDSdk;
    }();
    exports.default = ZJTDSdk;
    cc._RF.pop();
  }, {} ],
  ZZSdk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d530zJ1+RMZZukNS+8VxCJ", "ZZSdk");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var sdkManager_1 = require("../sdkManager");
    var ZZSdk = function() {
      function ZZSdk() {
        this.init();
      }
      ZZSdk.prototype.init = function() {
        window["zzsdkui"].initSDK(0, "2.0.0", "https://wxa.332831.com/xsl/wx0b66e374417dd76a/v1.0.0/config.json", sdkManager_1.default.WXSdk ? sdkManager_1.default.WXSdk.APPID : "wx0b66e374417dd76a", "openid", function() {
          console.log("sdk\u52a0\u8f7d\u5b8c\u6210");
        });
      };
      ZZSdk.prototype.unscheduleAllCallbacks = function() {
        window["zzsdkui"].unscheduleAllCallbacks();
      };
      ZZSdk.prototype.YouLike = function(node, index, nodeX, nodeY, tagtype, failCb) {
        void 0 === index && (index = 0);
        var youlike = window["zzsdkui"].youlike(index, nodeX, nodeY, tagtype, failCb);
        youlike && node.addChild(youlike);
        return youlike;
      };
      ZZSdk.prototype.unscheduleYouLike = function(index) {
        void 0 === index && (index = 0);
        window["zzsdkui"].unschedule(window["zzsdkui"].youlikeSchArr[index]);
      };
      ZZSdk.prototype.drawer_pull = function(node, index, btnUrl, bgurl, btnY, btnX) {
        void 0 === index && (index = 0);
        var drawer_pull = window["zzsdkui"].drawer_pull(index, "drawer_pull", null, function() {
          cc.log("drawer_pull\u52a0\u8f7d\u5931\u8d25");
        }, btnUrl, bgurl, btnY, btnX);
        drawer_pull && node.addChild(drawer_pull);
      };
      ZZSdk.prototype.drawerOpen_pull = function(drawer) {
        window["zzsdkui"].drawerOpen_pull(drawer);
      };
      ZZSdk.prototype.unscheduleDrawerOpen_pull = function(index) {
        void 0 === index && (index = 0);
        window["zzsdkui"].unschedule(window["zzsdkui"].newDrawerSchArr_pull[index]);
      };
      ZZSdk.prototype.float = function(node, index, nodeX, nodeY, tagtype, failCb) {
        void 0 === index && (index = 0);
        var float = window["zzsdkui"].float(index, nodeX, nodeY, tagtype, failCb);
        float && node.addChild(float);
      };
      ZZSdk.prototype.unscheduleFloat = function(index) {
        window["zzsdkui"].unschedule(window["zzsdkui"].floatSchArr[index]);
      };
      ZZSdk.prototype.inter = function(node, adnum, nodeX, nodeY) {
        void 0 === adnum && (adnum = "3*3");
        var inter = window["zzsdkui"].inter(adnum, nodeX, nodeY);
        inter && node.addChild(inter);
        return inter;
      };
      ZZSdk.prototype.unscheduleInter = function(adnum) {
        void 0 === adnum && (adnum = "3*3");
        window["zzsdkui"].interSixRefresh(adnum);
      };
      ZZSdk.prototype.interFourUI = function(node, index, titleType) {
        void 0 === index && (index = 0);
        void 0 === titleType && (titleType = "win");
        var newInter = window["zzsdkui"].interFourUI(index, "inter_four", titleType);
        newInter && node.addChild(newInter);
      };
      ZZSdk.prototype.unscheduleInterFourUI = function(index) {
        void 0 === index && (index = 0);
        window["zzsdkui"].unschedule(window["zzsdkui"].interFourSchArr_ui[index]);
      };
      ZZSdk.prototype.interFour = function(node, index, nodeX, nodeY, tagtype, failCb) {
        void 0 === index && (index = 0);
        var newInter = window["zzsdkui"].interFour(index, "inter_four", nodeX, nodeY, tagtype, failCb);
        newInter && node.addChild(newInter);
        return newInter;
      };
      ZZSdk.prototype.unscheduleInterFour = function(index) {
        void 0 === index && (index = 0);
        window["zzsdkui"].unschedule(window["zzsdkui"].interFourSchArr[index]);
      };
      ZZSdk.prototype.interFour_ver = function(node, index) {
        void 0 === index && (index = 0);
        var newInter = window["zzsdkui"].interFour_ver(index, "inter_full");
        newInter && node.addChild(newInter);
      };
      ZZSdk.prototype.unscheduleInterFour_ver = function(index) {
        void 0 === index && (index = 0);
        window["zzsdkui"].unschedule(window["zzsdkui"].interFourSchArr_ver[index]);
      };
      ZZSdk.prototype.interFull_scroll = function(node, index) {
        void 0 === index && (index = 0);
        var interfull_sc = window["zzsdkui"].interFull_scroll(index, "inter_full", function() {
          interfull_sc.active = false;
        }, function() {
          interfull_sc.active = false;
        }, 2, 1, 2, 6, 10);
        interfull_sc && node.addChild(interfull_sc);
      };
      ZZSdk.prototype.unscheduleInterFull_scroll = function(index) {
        void 0 === index && (index = 0);
        window["zzsdkui"].unschedule(window["zzsdkui"].fulltopSchArr[index]);
        window["zzsdkui"].unschedule(window["zzsdkui"].fullBotSchArr[index]);
      };
      ZZSdk.prototype.interFull_scroll_ver = function(node, index) {
        void 0 === index && (index = 0);
        var interFull_scroll_ver = window["zzsdkui"].interFull_scroll_ver(index, "inter_full", function() {
          interFull_scroll_ver.active = false;
        }, function() {
          interFull_scroll_ver.active = false;
        });
        interFull_scroll_ver && node.addChild(interFull_scroll_ver);
      };
      ZZSdk.prototype.unscheduleInterFull_scroll_ver = function(index) {
        void 0 === index && (index = 0);
        window["zzsdkui"].unschedule(window["zzsdkui"].fulltopSchArr_ver[index]);
        window["zzsdkui"].unschedule(window["zzsdkui"].fullBotSchArr_ver[index]);
      };
      ZZSdk.prototype.interFull_large = function(index) {
        void 0 === index && (index = 0);
        var interfull_b = window["zzsdkui"].interFull_large(index, "inter_full_large", function() {
          console.log("\u5173\u95ed\u56de\u8c03");
          interfull_b.removeFromParent();
        }, function() {
          console.log("\u5173\u95ed\u56de\u8c03");
          interfull_b.removeFromParent();
        });
      };
      ZZSdk.prototype.unscheduleInterFull_large = function(index) {
        void 0 === index && (index = 0);
        window["zzsdkui"].unschedule(window["zzsdkui"].newLargeSchArr[index]);
      };
      ZZSdk.prototype.interFull_list = function(node) {
        var interfull_list = window["zzsdkui"].interFull_list("inter_full_list", function() {
          interfull_list.active = false;
        });
        interfull_list && node.addChild(interfull_list);
      };
      ZZSdk.prototype.tryplay = function(node) {
        var tryplay = window["zzsdkui"].tryplay("try", "try_icon2", 5, function() {
          console.log("\u83b7\u5f97\u5956\u52b1");
        }, null, true, null);
        tryplay && node.addChild(tryplay);
      };
      ZZSdk.prototype.friPlaying = function(node) {
        var friPlay = window["zzsdkui"].friPlaying(0, 0, null, function() {
          window["zzsdkui"].friPlayRefresh();
          window["zzsdkui"].youlikeRefresh();
        });
        friPlay && node.addChild(friPlay);
      };
      ZZSdk.prototype.singleRow = function(node) {
        var signgleAd = window["zzsdkui"].singleRow(400, 0);
        signgleAd && node.addChild(signgleAd);
      };
      ZZSdk.prototype.youlikeItem = function(node) {
        var item1 = window["zzsdkui"].youlikeItem("youlike", null, window["ad_Data"][0], {
          bg: "xx.png"
        }, null);
        node.addChild(item1);
      };
      ZZSdk.prototype.drawerItem = function(node) {
        var item1 = window["zzsdkui_item"].drawerItem("item1", null, window["ad_Data"][0]);
        node.addChild(item1);
      };
      ZZSdk.prototype.interItem = function(node) {
        var item1 = window["zzsdkui_item"].interItem("item1", null, window["ad_Data"][0]);
        node.addChild(item1);
      };
      ZZSdk.prototype.aliEvent = function(eventName, data) {
        window["zzsdkui"].aliEvent(eventName, data);
      };
      ZZSdk.prototype.playOne = function() {
        window["zzsdkui"].playOne("float", null, null);
      };
      ZZSdk.prototype.setClickokParam = function(level, ui) {
        window["zzsdkui"].setClickokParam(level, ui);
      };
      ZZSdk.prototype.ban = function(cb) {
        if (sdkManager_1.default.platForm != sdkManager_1.platformEnum.WX) return;
        var appid = sdkManager_1.default.WXSdk ? sdkManager_1.default.WXSdk.APPID : "wx0b66e374417dd76a";
        var scene = sdkManager_1.default.WXSdk ? sdkManager_1.default.WXSdk.getLaunchOptionsSync()["scene"] : "";
        var channel = sdkManager_1.default.WXSdk ? sdkManager_1.default.WXSdk.getLaunchOptionsSync()["query"] : "";
        wx.request({
          url: "https://wxa.639311.com/api/ban",
          header: {
            referer: "https://servicewechat.com/" + appid + "/30/page-frame.html"
          },
          data: {
            scene: scene,
            reviewVer: "2.0.0",
            channel: channel
          },
          success: function(response) {
            cc.log("\u5c4f\u853d = ", response);
            cb(response.data.data);
          },
          fail: function(response) {
            cc.log("fail response = ", response);
          }
        });
      };
      return ZZSdk;
    }();
    exports.default = ZZSdk;
    cc._RF.pop();
  }, {
    "../sdkManager": "sdkManager"
  } ],
  adManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ac465aGLNG2a+Ds8tqdDyM", "adManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ironManager_1 = require("./IronSourceScript/ironManager");
    var ZJTDAdManager_1 = require("./ZJTD/ZJTDAdManager");
    var sdkManager_1 = require("../sdkManager");
    var WXAdManager_1 = require("./WX/WXAdManager");
    var feacebookIG_1 = require("./FaceBook/feacebookIG");
    var adManager = function() {
      function adManager() {
        this.adDisTime = 15;
        this.adTimeVal = 0;
        switch (sdkManager_1.default.platForm) {
         case sdkManager_1.platformEnum.ios:
          this.adProxy = new ironManager_1.default();
          break;

         case sdkManager_1.platformEnum.ZJTD:
          this.adProxy = new ZJTDAdManager_1.default();
          break;

         case sdkManager_1.platformEnum.WX:
          this.adProxy = new WXAdManager_1.default();
          break;

         case sdkManager_1.platformEnum.FB:
          this.adProxy = new feacebookIG_1.default();
          break;

         default:
          this.adProxy = new defaultAdProxy();
        }
        this.adDisTime = this.adProxy.adDisTime;
      }
      adManager.prototype.init = function() {
        this.adProxy.init();
      };
      adManager.prototype.ShowBanner = function() {
        this.adProxy.ShowBanner();
      };
      adManager.prototype.HideBanner = function() {
        this.adProxy.HideBanner();
      };
      adManager.prototype.ShowRewardedVideo = function(rewardCb, noRewardCb, disPlayCb, failedCb) {
        this.adProxy.ShowRewardedVideo(rewardCb, noRewardCb, disPlayCb, failedCb);
      };
      adManager.prototype.ShowInterstitial = function(disMissCb, disPlayCb) {
        this.adProxy.ShowInterstitial(disMissCb, disPlayCb);
      };
      adManager.prototype.onRemoveAds = function() {
        this.adProxy.onRemoveAds();
      };
      adManager.prototype.getCanAd = function() {
        return this.adProxy.getCanAd();
      };
      adManager.prototype.getCanVideo = function() {
        return this.adProxy.getCanVideo();
      };
      return adManager;
    }();
    exports.default = adManager;
    var defaultAdProxy = function() {
      function defaultAdProxy() {
        this.adDisTime = 15;
      }
      defaultAdProxy.prototype.init = function() {};
      defaultAdProxy.prototype.ShowBanner = function() {};
      defaultAdProxy.prototype.HideBanner = function() {};
      defaultAdProxy.prototype.ShowRewardedVideo = function(rewardCb, noRewardCb, disPlayCb, failedCb) {
        rewardCb();
      };
      defaultAdProxy.prototype.ShowInterstitial = function(disMissCb, disPlayCb) {
        disMissCb && disMissCb();
      };
      defaultAdProxy.prototype.onRemoveAds = function() {};
      defaultAdProxy.prototype.getCanAd = function() {
        return true;
      };
      defaultAdProxy.prototype.getCanVideo = function() {
        return true;
      };
      return defaultAdProxy;
    }();
    cc._RF.pop();
  }, {
    "../sdkManager": "sdkManager",
    "./FaceBook/feacebookIG": "feacebookIG",
    "./IronSourceScript/ironManager": "ironManager",
    "./WX/WXAdManager": "WXAdManager",
    "./ZJTD/ZJTDAdManager": "ZJTDAdManager"
  } ],
  adaptation: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5cc7qAvO5EDZW+nBwfVBfE", "adaptation");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var adaptation = function(_super) {
      __extends(adaptation, _super);
      function adaptation() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.curDR = null;
        return _this;
      }
      adaptation.prototype.onLoad = function() {
        this.resize();
      };
      adaptation.prototype.resize = function() {
        var cvs = cc.find("Canvas").getComponent(cc.Canvas);
        this.curDR || (this.curDR = cvs.designResolution);
        var dr = this.curDR;
        var s = cc.view.getFrameSize();
        var rw = s.width;
        var rh = s.height;
        var finalW = rw;
        var finalH = rh;
        if (rw / rh > dr.width / dr.height) {
          finalH = dr.height;
          finalW = finalH * rw / rh;
        } else {
          finalW = dr.width;
          finalH = rh / rw * finalW;
        }
        cvs.designResolution = cc.size(finalW, finalH);
        cvs.node.width = finalW;
        cvs.node.height = finalH;
      };
      adaptation = __decorate([ ccclass ], adaptation);
      return adaptation;
    }(cc.Component);
    exports.default = adaptation;
    cc._RF.pop();
  }, {} ],
  audioEngineProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "66befA5kb9OMYXC0ALwM2AH", "audioEngineProxy");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.musicNameEnum = void 0;
    var puremvc_1 = require("./puremvc");
    var localStorageProxy_1 = require("./localStorageProxy");
    var loadManage_1 = require("./loadManage");
    var musicNameEnum;
    (function(musicNameEnum) {
      musicNameEnum["button"] = "button";
      musicNameEnum["draw"] = "draw";
      musicNameEnum["win"] = "win";
      musicNameEnum["bgm"] = "bgm";
      musicNameEnum["getMoney"] = "getMoney";
    })(musicNameEnum = exports.musicNameEnum || (exports.musicNameEnum = {}));
    var audioProxy = function(_super) {
      __extends(audioProxy, _super);
      function audioProxy() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.url2audio = {};
        _this.lastMusicUrl = null;
        _this.localStorageProxy = null;
        _this.isMusicOn = false;
        _this.isSoundOn = false;
        _this.audioRes = {};
        return _this;
      }
      audioProxy.prototype.onRegister = function() {
        this.localStorageProxy = puremvc_1.puremvc.Facade.getInstance().getProxy(localStorageProxy_1.default);
        this.isMusicOn = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.isMusicOn);
        this.isSoundOn = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.isSoundOn);
        cc.audioEngine.setEffectsVolume(this.sound_volumn);
        cc.audioEngine.setMusicVolume(this.music_volumn);
      };
      audioProxy.prototype.playMusic = function(url) {
        var _this = this;
        if (null == url) return;
        if (this.lastMusicUrl != url) {
          var lastMusicUrl = this.lastMusicUrl;
          var audioInfo = this.url2audio[lastMusicUrl];
          if (audioInfo) {
            cc.audioEngine.stopMusic();
            cc.audioEngine.uncache(audioInfo.audioClip);
            this.url2audio[lastMusicUrl] = null;
          }
        }
        this.lastMusicUrl = url;
        if (!this.isMusicOn) return;
        loadManage_1.default.loadRes("music/" + url, cc.AudioClip, function(audioClip) {
          var audioId = cc.audioEngine.playMusic(audioClip, true);
          _this.url2audio[url] = {
            audioId: audioId,
            audioClip: audioClip
          };
        });
      };
      audioProxy.prototype.playSound = function(url, isShieldRepeat, isLoop) {
        var _this = this;
        void 0 === isShieldRepeat && (isShieldRepeat = false);
        void 0 === isLoop && (isLoop = false);
        if (null == url) return;
        if (!this.isSoundOn) return;
        if (isShieldRepeat && this.url2audio.hasOwnProperty(url)) return;
        if (this.audioRes.hasOwnProperty(url)) {
          var audioId = cc.audioEngine.playEffect(this.audioRes[url], isLoop);
          if (isShieldRepeat) {
            this.url2audio[url] = {
              audioId: audioId,
              audioClip: this.audioRes[url]
            };
            cc.audioEngine.setFinishCallback(audioId, function() {
              delete _this.url2audio[url];
            });
          }
        } else loadManage_1.default.loadRes("music/" + url, cc.AudioClip, function(audioClip) {
          _this.audioRes[url] = audioClip;
          var audioId = cc.audioEngine.playEffect(audioClip, isLoop);
          if (isShieldRepeat) {
            _this.url2audio[url] = {
              audioId: audioId,
              audioClip: audioClip
            };
            cc.audioEngine.setFinishCallback(audioId, function() {
              delete _this.url2audio[url];
            });
          }
        });
      };
      audioProxy.prototype.switchMusic = function() {
        this.isMusicOn = !this.isMusicOn;
        this.localStorageProxy.setItem(localStorageProxy_1.storageKey.isMusicOn, this.isMusicOn);
        this.isMusicPlaying() && !this.isMusicOn ? cc.audioEngine.stopMusic() : !this.isMusicPlaying() && this.isMusicOn && this.playMusic(this.lastMusicUrl);
      };
      audioProxy.prototype.switchSound = function() {
        this.isSoundOn = !this.isSoundOn;
        this.localStorageProxy.setItem(localStorageProxy_1.storageKey.isSoundOn, this.isSoundOn);
      };
      audioProxy.prototype.isMusicPlaying = function() {
        return cc.audioEngine.isMusicPlaying();
      };
      Object.defineProperty(audioProxy.prototype, "music_volumn", {
        get: function() {
          return this.isMusicOn ? 1 : 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(audioProxy.prototype, "sound_volumn", {
        get: function() {
          return this.isSoundOn ? 1 : 0;
        },
        enumerable: false,
        configurable: true
      });
      return audioProxy;
    }(puremvc_1.puremvc.Proxy);
    exports.default = audioProxy;
    cc._RF.pop();
  }, {
    "./loadManage": "loadManage",
    "./localStorageProxy": "localStorageProxy",
    "./puremvc": "puremvc"
  } ],
  baseComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7761aKJ1ItMlJEevUqvthwQ", "baseComponent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var puremvc_1 = require("./puremvc");
    var eventMgr_1 = require("./eventMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var baseComponent = function(_super) {
      __extends(baseComponent, _super);
      function baseComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isBtnSound = true;
        _this.arrAdapationX = [];
        _this.facade = puremvc_1.puremvc.Facade.getInstance();
        _this.eventMgr = eventMgr_1.default.getInstance();
        _this.curDR = null;
        return _this;
      }
      baseComponent.prototype.onLoad = function() {
        this.resize();
        this.node.height / this.node.width > 1.9 && this.arrAdapationX.forEach(function(one) {
          var widget = one.getComponent(cc.Widget);
          widget && (widget.top += 100);
        });
      };
      baseComponent.prototype.clickEvent = function(event) {
        var nodeName = event.currentTarget.name;
        this.onClick(nodeName);
      };
      baseComponent.prototype.resize = function() {
        var cvs = this.node.getComponentsInChildren(cc.Canvas)[0];
        if (cvs && !cvs["___HasAdaptation"]) {
          cvs["___HasAdaptation"] = true;
          this.curDR || (this.curDR = cvs.designResolution);
          var dr = this.curDR;
          var s = cc.view.getFrameSize();
          var rw = s.width;
          var rh = s.height;
          var finalW = rw;
          var finalH = rh;
          if (rw / rh > dr.width / dr.height) {
            finalH = dr.height;
            finalW = finalH * rw / rh;
          } else {
            finalW = dr.width;
            finalH = rh / rw * finalW;
          }
          cvs.designResolution = cc.size(finalW, finalH);
          cvs.node.width = finalW;
          cvs.node.height = finalH;
        }
      };
      baseComponent.prototype.onClick = function(btnName) {};
      __decorate([ property({
        tooltip: "\u662f\u5426\u6253\u5f00\u6309\u94ae\u97f3\u6548\uff0c\u9ed8\u8ba4\u662f\u6253\u5f00\u7684"
      }) ], baseComponent.prototype, "_isBtnSound", void 0);
      __decorate([ property({
        tooltip: "\u4e34\u65f6\u5218\u6d77\u5c4f\u5e55\u9002\u914d",
        type: [ cc.Node ]
      }) ], baseComponent.prototype, "arrAdapationX", void 0);
      baseComponent = __decorate([ ccclass ], baseComponent);
      return baseComponent;
    }(cc.Component);
    exports.default = baseComponent;
    cc._RF.pop();
  }, {
    "./eventMgr": "eventMgr",
    "./puremvc": "puremvc"
  } ],
  cardOne: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f161m06AFGR43ncZ4TzM9q", "cardOne");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var puremvc_1 = require("../ScriptCore/puremvc");
    var gameManage_1 = require("./gameManage");
    var eventMgr_1 = require("../ScriptCore/eventMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var cardOne = function(_super) {
      __extends(cardOne, _super);
      function cardOne() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isBase = true;
        _this.rowIndex = null;
        _this.index = null;
        _this.num = null;
        _this.isWanNeng = false;
        _this.isSmall = false;
        _this.cardNumSp = null;
        _this.tipCanPlace = null;
        _this.gameManage = null;
        _this.canTouch = false;
        _this.startPos = null;
        _this.eventMgr = eventMgr_1.default.getInstance();
        _this.isHeChengAction = false;
        _this.isPlace = false;
        _this.smallZindex = 20;
        _this.bigZindex = 21;
        _this.placeChaceX = 90;
        _this.placeChaceY = 400;
        return _this;
      }
      cardOne_1 = cardOne;
      cardOne.prototype.start = function() {
        var _this = this;
        this.eventMgr.on("hidTip", function() {
          _this.tipCanPlace.active = false;
        }, this);
      };
      cardOne.prototype.init = function(cardNum, pos, isSmall, isDi) {
        this.isBase = false;
        this.gameManage = puremvc_1.puremvc.Facade.getInstance().getProxy(gameManage_1.default);
        this.node.position = pos;
        this.node.scale = isSmall ? this.gameManage.game.candidateCardSamll.scale : 1;
        this.node.zIndex = isSmall ? this.smallZindex : this.bigZindex;
        this.refreshNum(cardNum);
        this.setEvent();
        this.canTouch = isDi && !isSmall;
      };
      cardOne.prototype.refreshNum = function(cardNum, isWanNeng) {
        void 0 === isWanNeng && (isWanNeng = false);
        this.gameManage.setMaxNumberNow(cardNum);
        this.num = cardNum;
        if (isWanNeng) {
          this.cardNumSp.spriteFrame = this.gameManage.cardSpriteFrameData["wanNeng"];
          this.isWanNeng = true;
        } else this.cardNumSp.spriteFrame = this.gameManage.cardSpriteFrameData[cardNum];
      };
      cardOne.prototype.refreshZindex = function(index) {
        this.node.zIndex = this.index = index;
      };
      cardOne.prototype.creatorSmallAnction = function() {
        this.node.scale = 0;
        this.node.runAction(cc.scaleTo(.2, this.gameManage.game.candidateCardSamll.scale));
      };
      cardOne.prototype.moveToCandidateBig = function() {
        var _this = this;
        var toP = this.gameManage.game.candidateCardBig.position;
        this.startPos = toP;
        this.node.zIndex = this.bigZindex;
        this.node.runAction(cc.sequence(cc.spawn(cc.moveTo(.2, cc.v2(toP.x, toP.y)), cc.scaleTo(.2, 1)), cc.callFunc(function() {
          _this.canTouch = true;
          _this.gameManage.game.candidateBig = _this;
        })));
      };
      cardOne.prototype.showCanPlaceTip = function() {
        this.tipCanPlace.active = true;
      };
      cardOne.prototype.setEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
      };
      cardOne.prototype.onTouchStart = function(data) {
        if (this.gameManage.isOnCut) {
          if (this.isPlace) {
            this.gameManage.cutCard(this.rowIndex, this.index);
            this.gameManage.game.onOverCut(true);
          }
          return;
        }
        if (!this.canTouch && !this.isHeChengAction) return;
        this.startPos = this.node.position;
      };
      cardOne.prototype.onTouchMove = function(data) {
        if (this.gameManage.isOnCut) return;
        if (!this.canTouch && !this.isHeChengAction) return;
        var toP = this.gameManage.getChangeP(data.getLocation());
        this.node.position = toP;
        this.eventMgr.emit("hidTip");
        var isSanchu = this.gameManage.game.checkIsSanChu(this.node);
        if (isSanchu) return;
        var checkData = this.checkCanPlace();
        null != checkData.targetNode && checkData.targetNode.getComponent(cardOne_1).showCanPlaceTip();
      };
      cardOne.prototype.onTouchCancel = function(data) {
        var _this = this;
        if (this.gameManage.isOnCut) return;
        if (!this.canTouch && !this.isHeChengAction) return;
        this.eventMgr.emit("hidTip");
        var isSanChu = this.gameManage.game.sanChuCard(this.node);
        if (isSanChu) return;
        var checkData = this.checkCanPlace();
        if (null != checkData.rowIndex) this.placeCard(checkData.rowIndex); else {
          this.canTouch = false;
          this.node.runAction(cc.sequence(cc.moveTo(.3, cc.v2(this.startPos.x, this.startPos.y)), cc.callFunc(function() {
            _this.canTouch = true;
          })));
        }
      };
      cardOne.prototype.checkCanPlace = function() {
        var rowIndex = null;
        var targetNode = null;
        for (var key in this.gameManage.cardData) {
          var arrCard = this.gameManage.cardData[key].arrCard;
          var checkCard = arrCard.length > 0 ? arrCard[arrCard.length - 1].node : this.gameManage.cardData[key].baseCard;
          if (Math.abs(this.node.position.x - checkCard.x) < this.placeChaceX && Math.abs(this.node.position.y - checkCard.y) < this.placeChaceY) {
            rowIndex = Number(key);
            targetNode = checkCard;
            break;
          }
        }
        return {
          rowIndex: rowIndex,
          targetNode: targetNode
        };
      };
      cardOne.prototype.placeCard = function(rowIndex, cb) {
        var _this = this;
        this.node.stopAllActions();
        this.isHeChengAction = true;
        this.isPlace = true;
        this.gameManage.game.refreshCandidateCard();
        this.rowIndex = rowIndex;
        this.canTouch = false;
        var toP = this.gameManage.getPlaceCardToP(rowIndex, this);
        this.node.runAction(cc.sequence(cc.moveTo(.3, toP).easing(cc.easeIn(3)), cc.callFunc(function() {
          _this.isHeChengAction = false;
          _this.gameManage.pushCardToData(rowIndex, _this);
          cb && cb();
        })));
      };
      cardOne.prototype.moveTo = function(toP) {
        this.node.runAction(cc.moveTo(.1, toP).easing(cc.easeIn(3)));
      };
      cardOne.prototype.heCheng = function() {
        var _this = this;
        this.node.stopAllActions();
        this.isHeChengAction = true;
        this.node.runAction(cc.sequence(cc.scaleTo(.3, 0).easing(cc.easeIn(3)), cc.callFunc(function() {
          _this.refreshNum(2 * _this.num);
        }), cc.scaleTo(.3, 1).easing(cc.easeOut(3)), cc.delayTime(.1), cc.callFunc(function() {
          _this.isHeChengAction = false;
          _this.gameManage.chcekHeCheng(_this.rowIndex, _this.index);
          _this.gameManage.strongBrushIndex(_this.rowIndex, true);
          2048 == _this.num && _this.on2048();
        })));
      };
      cardOne.prototype.on2048 = function() {
        var _this = this;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.scaleTo(.3, 1.2), cc.callFunc(function() {
          _this.onDie();
          _this.gameManage.strongBrushIndex(_this.rowIndex, true);
        })));
      };
      cardOne.prototype.onDie = function() {
        null != this.rowIndex && this.gameManage.removeOneCard(this.rowIndex, this);
        this.node.removeFromParent();
        this.node.destroy();
      };
      var cardOne_1;
      __decorate([ property(cc.Sprite) ], cardOne.prototype, "cardNumSp", void 0);
      __decorate([ property(cc.Node) ], cardOne.prototype, "tipCanPlace", void 0);
      cardOne = cardOne_1 = __decorate([ ccclass ], cardOne);
      return cardOne;
    }(cc.Component);
    exports.default = cardOne;
    cc._RF.pop();
  }, {
    "../ScriptCore/eventMgr": "eventMgr",
    "../ScriptCore/puremvc": "puremvc",
    "./gameManage": "gameManage"
  } ],
  commonCommand: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c0883rTkddDDKxNTmtAMQyX", "commonCommand");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.loadScene = void 0;
    var puremvc_1 = require("./puremvc");
    var audioEngineProxy_1 = require("./audioEngineProxy");
    var msgConfig_1 = require("./msgConfig");
    var loadScene = function(_super) {
      __extends(loadScene, _super);
      function loadScene() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      loadScene.prototype.execute = function(notification) {
        var sceneName = notification.getBody();
        var _audioEngineProxy = puremvc_1.puremvc.Facade.getInstance().getProxy(audioEngineProxy_1.default);
        cc.director.loadScene(sceneName);
        sceneName;
        puremvc_1.puremvc.Facade.getInstance().sendNotification(msgConfig_1.sysConfig.showCommonNode, msgConfig_1.prefabConfig.commonSet);
      };
      return loadScene;
    }(puremvc_1.puremvc.SimpleCommand);
    exports.loadScene = loadScene;
    cc._RF.pop();
  }, {
    "./audioEngineProxy": "audioEngineProxy",
    "./msgConfig": "msgConfig",
    "./puremvc": "puremvc"
  } ],
  effectProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f6ea4IYHFC4rPoOYGK+Px6", "effectProxy");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var puremvc_1 = require("./puremvc");
    var effectProxy = function(_super) {
      __extends(effectProxy, _super);
      function effectProxy() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      return effectProxy;
    }(puremvc_1.puremvc.Proxy);
    exports.default = effectProxy;
    cc._RF.pop();
  }, {
    "./puremvc": "puremvc"
  } ],
  eventMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16001d2D29GobU/JhAxgL62", "eventMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventMgr = function() {
      function EventMgr() {
        this.dic = {};
      }
      EventMgr.getInstance = function() {
        EventMgr.instance || (EventMgr.instance = new EventMgr());
        return EventMgr.instance;
      };
      EventMgr.prototype.clear = function() {
        this.dic = {};
      };
      EventMgr.prototype.on = function(key, cb, target) {
        target.node.on(key, cb, target);
        this.dic.hasOwnProperty(key) || (this.dic[key] = []);
        this.dic[key].includes(target) || this.dic[key].push(target);
      };
      EventMgr.prototype.emit = function(key, arg1, arg2, arg3, arg4, arg5) {
        var _this = this;
        if (null == this.dic[key]) {
          cc.warn("\u672a\u6ce8\u518c\u4e8b\u4ef6:", key);
          return;
        }
        var removeList = [];
        this.dic[key].forEach(function(one) {
          one.isValid ? one.node.emit(key, arg1, arg2, arg3, arg4, arg5) : removeList.push(one);
        });
        removeList.forEach(function(one) {
          _this.onDestory(one);
        });
      };
      EventMgr.prototype.onDestory = function(target) {
        for (var key in this.dic) {
          var arrCom = this.dic[key];
          arrCom.includes(target) && arrCom.splice(arrCom.indexOf(target), 1);
        }
      };
      return EventMgr;
    }();
    exports.default = EventMgr;
    cc._RF.pop();
  }, {} ],
  facebookSdk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5db8QODBJE54P/YD5kEJ/y", "facebookSdk");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var sdkManager_1 = require("../sdkManager");
    var facebookSdk = function() {
      function facebookSdk() {
        sdkManager_1.default.platForm == sdkManager_1.platformEnum.ios && sdkbox.PluginFacebook.init();
      }
      return facebookSdk;
    }();
    exports.default = facebookSdk;
    cc._RF.pop();
  }, {
    "../sdkManager": "sdkManager"
  } ],
  feacebookIG: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a776bGlTlpD2p6g0TKYzSZ4", "feacebookIG");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var adIDFB = function() {
      function adIDFB() {}
      adIDFB.videoId = "621084671931463_627623281277602";
      adIDFB.insertID = "621084671931463_627725417934055";
      return adIDFB;
    }();
    var feacebookIG = function() {
      function feacebookIG() {
        this.adDisTime = 20;
        this.isRemoveAd = false;
        this.videoAd = null;
        this.interstitialAd = null;
        this.videoAdIsReady = false;
        this.init();
      }
      feacebookIG.prototype.init = function() {
        cc.log("\u5e7f\u544a\u521d\u59cb\u5316");
        cc.log("fb\u5e7f\u544a\u521d\u59cb\u5316");
        this.preloadInterstitialAd();
        this.preloadVideoAd();
      };
      feacebookIG.prototype.ShowRewardedVideo = function(rewardCb, noRewardCb, disPlayCb, failedCb) {
        var _this = this;
        disPlayCb();
        this.videoAd.showAsync().then(function() {
          console.log("Rewarded video watched successfully");
          rewardCb();
          _this.preloadVideoAd();
        }).catch(function(e) {
          console.error(e.message);
          noRewardCb && noRewardCb();
          _this.preloadVideoAd();
        });
      };
      feacebookIG.prototype.preloadVideoAd = function() {
        var _this = this;
        this.videoAdIsReady = false;
        this.videoAd = null;
        FBInstant.getRewardedVideoAsync(adIDFB.videoId).then(function(rewarded) {
          _this.videoAd = rewarded;
          return _this.videoAd.loadAsync();
        }).then(function() {
          _this.videoAdIsReady = true;
          console.log("Rewarded video preloaded");
        }).catch(function(err) {
          console.error("Rewarded video failed to preload: " + err.message);
        });
      };
      feacebookIG.prototype.ShowInterstitial = function(disMissCb, disPlayCb) {
        var _this = this;
        if (!this.interstitialAd) {
          this.preloadInterstitialAd();
          console.log("\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25");
          return;
        }
        this.interstitialAd.showAsync().then(function() {
          console.log("Interstitial ad finished successfully");
          _this.preloadInterstitialAd();
        }).catch(function(e) {
          console.error(e.message);
          _this.preloadInterstitialAd();
        });
      };
      feacebookIG.prototype.preloadInterstitialAd = function() {
        var _this = this;
        FBInstant.getInterstitialAdAsync(adIDFB.insertID).then(function(interstitial) {
          _this.interstitialAd = interstitial;
          return _this.interstitialAd.loadAsync();
        }).then(function() {
          console.log("Interstitial preloaded", "\u9009\u5173");
        }).catch(function(err) {
          console.error("Interstitial failed to preload: " + err.message);
        });
      };
      feacebookIG.prototype.getVideoIsReady = function() {
        return this.videoAdIsReady;
      };
      feacebookIG.prototype.ShowBanner = function() {
        cc.log("fb\u6ca1\u6709banner\u5e7f\u544a");
      };
      feacebookIG.prototype.HideBanner = function() {
        null != this.bannerAd && this.bannerAd.hide();
      };
      feacebookIG.prototype.onRemoveAds = function() {};
      feacebookIG.prototype.getCanAd = function() {
        return true;
      };
      feacebookIG.prototype.getCanVideo = function() {
        return true;
      };
      feacebookIG.prototype.logEvent = function(key, data, value) {
        void 0 === data && (data = null);
        void 0 === value && (value = 0);
        cc.log("\u7edf\u8ba1\u4e8b\u4ef6:", key, ",data:", JSON.stringify(data), ",value:", value);
        if (!window["FBInstant"]) return;
        FBInstant.logEvent(key, value, data);
      };
      feacebookIG.prototype.PrefixZero = function(num, n) {
        void 0 === n && (n = 3);
        return (Array(n).join("0") + num).slice(-n);
      };
      feacebookIG.prototype.shareAsync = function() {
        cc.log("\u5206\u4eab\u6d4b\u8bd5");
        cc.loader.loadRes("share/share", function(err, image) {
          if (err) {
            console.log(err);
            return;
          }
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          image.width = image.width;
          image.height = image.width;
          cc.log(image.width, image.height);
          var img = image.getHtmlElementObj();
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          cc.log("\u5206\u4eab\u6d4b\u8bd52");
          FBInstant.shareAsync({
            intent: "REQUEST",
            image: canvas.toDataURL("image/png"),
            text: "X is asking for your help!",
            data: {
              myReplayData: "..."
            }
          }).then(function() {
            cc.log("\u5206\u4eab\u6d4b\u8bd53");
          });
        });
      };
      feacebookIG.prototype.getDataAsync = function() {
        FBInstant.player.getDataAsync([ "achievements", "currentLife" ]).then(function(data) {
          console.log("data is loaded");
          var achievements = data["achievements"];
          var currentLife = data["currentLife"];
        });
      };
      feacebookIG.prototype.setDataAsync = function() {
        FBInstant.player.setDataAsync({
          achievements: [ "medal1", "medal2", "medal3" ],
          currentLife: 300
        }).then(function() {
          console.log("data is set");
        });
      };
      feacebookIG.prototype.getLeaderboardAsync = function() {
        FBInstant.getLeaderboardAsync("my_leaderboard").then(function(leaderboard) {
          var id = leaderboard.getContextID();
          var count = leaderboard.getEntryCountAsync();
          console.log(leaderboard.getRank());
          console.log(leaderboard.getScore());
          console.log(leaderboard.getExtraData());
        }).then(function(count) {
          console.log(count);
        });
      };
      feacebookIG.prototype.setScoreAsync = function() {
        FBInstant.getLeaderboardAsync("my_leaderboard").then(function(leaderboard) {
          return leaderboard.setScoreAsync(42, '{race: "elf", level: 3}');
        }).then(function(entry) {
          console.log(entry.getScore());
          console.log(entry.getExtraData());
        });
      };
      feacebookIG.prototype.getEntriesAsync = function() {
        FBInstant.getLeaderboardAsync("my_leaderboard").then(function(leaderboard) {
          return leaderboard.getEntriesAsync();
        }).then(function(entries) {
          console.log(entries.length);
          console.log(entries[0].getRank());
          console.log(entries[0].getScore());
          console.log(entries[1].getRank());
          console.log(entries[1].getScore());
        });
      };
      feacebookIG.prototype.tiaoZhan = function() {
        cc.loader.loadRes("share/share", function(err, image) {
          if (err) {
            console.log(err);
            return;
          }
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          var size = cc.view.getFrameSize();
          image.width = size.width;
          image.height = size.height;
          cc.log(image.width, image.height);
          var img = image.getHtmlElementObj();
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          var base64Picture = canvas.toDataURL("image/png");
          FBInstant.context.chooseAsync({
            filters: [ "NEW_CONTEXT_ONLY" ],
            minSize: 3
          }).then(function() {
            FBInstant.updateAsync({
              action: "CUSTOM",
              cta: "Join The Fight",
              image: base64Picture,
              text: {
                default: "Let us play game together",
                localizations: {
                  en_US: "Let us play game together",
                  zh_CN: "\u6765\u73a9\u6e38\u620f\u5427\u4f19\u8ba1\uff01"
                }
              },
              template: "VILLAGE_INVASION",
              data: {
                myReplayData: "..."
              },
              strategy: "IMMEDIATE",
              notification: "NO_PUSH"
            }).then(function() {
              console.log("Message was sent successfully");
            }).catch(function(err) {
              console.log(err);
            });
          });
        });
      };
      return feacebookIG;
    }();
    exports.default = feacebookIG;
    cc._RF.pop();
  }, {} ],
  gameApp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ef513hnXy5GBJYhYJJRtKba", "gameApp");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var baseComponent_1 = require("./baseComponent");
    var commonCommand_1 = require("./commonCommand");
    var msgConfig_1 = require("./msgConfig");
    var loadManage_1 = require("./loadManage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var gameApp = function(_super) {
      __extends(gameApp, _super);
      function gameApp() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.commonNonde = {};
        return _this;
      }
      gameApp.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        cc.game.addPersistRootNode(this.node);
        this.registerCommand();
      };
      gameApp.prototype.registerCommand = function() {
        this.facade.registerCommand(msgConfig_1.sysConfig.loadScene, commonCommand_1.loadScene);
      };
      gameApp.prototype.listNotificationInterests = function() {
        return [ msgConfig_1.sysConfig.showCommonNode ];
      };
      gameApp.prototype.handleNotification = function(notification) {
        var name = notification.getName();
        var body = notification.getBody();
        switch (name) {
         case msgConfig_1.sysConfig.showCommonNode:
          this.showCommonNode(body);
        }
      };
      gameApp.prototype.showCommonNode = function(name) {
        var _this = this;
        if (this.commonNonde[name]) {
          this.commonNonde[name].active = true;
          return;
        }
        loadManage_1.default.loadPrefab("prefab/" + name, function(prefab) {
          var newNode = cc.instantiate(prefab);
          _this.node.addChild(newNode);
          _this.commonNonde[name] = newNode;
        });
      };
      gameApp = __decorate([ ccclass ], gameApp);
      return gameApp;
    }(baseComponent_1.default);
    exports.default = gameApp;
    cc._RF.pop();
  }, {
    "./baseComponent": "baseComponent",
    "./commonCommand": "commonCommand",
    "./loadManage": "loadManage",
    "./msgConfig": "msgConfig"
  } ],
  gameCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1b78gDpypNf5ZRRm3rPygR", "gameCenter");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var sdkManager_1 = require("../sdkManager");
    var gameCenter = function() {
      function gameCenter() {
        this.loadGameCenter();
      }
      gameCenter.prototype.fiveStar = function() {
        sdkManager_1.default.platForm == sdkManager_1.platformEnum.ios && jsb.reflection.callStaticMethod("gameCenter", "FiveStar");
      };
      gameCenter.prototype.loadGameCenter = function() {
        sdkManager_1.default.platForm == sdkManager_1.platformEnum.ios && jsb.reflection.callStaticMethod("gameCenter", "LoadingGameCenter");
      };
      gameCenter.prototype.gameCenter = function(score, name) {
        sdkManager_1.default.platForm == sdkManager_1.platformEnum.ios && jsb.reflection.callStaticMethod("gameCenter", "GameCenter:forCategory:", score, name);
      };
      gameCenter.prototype.openGameCenter = function() {
        sdkManager_1.default.platForm == sdkManager_1.platformEnum.ios && jsb.reflection.callStaticMethod("gameCenter", "OpenGameCenter");
      };
      gameCenter.prototype.gameAchievement = function(name, value) {
        sdkManager_1.default.platForm == sdkManager_1.platformEnum.ios && jsb.reflection.callStaticMethod("gameCenter", "Achievement:percentComplete:", name, value);
      };
      return gameCenter;
    }();
    exports.default = gameCenter;
    cc._RF.pop();
  }, {
    "../sdkManager": "sdkManager"
  } ],
  gameConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "786dfxb25NFQrfYmuFgD+c1", "gameConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var gameConfig = function() {
      function gameConfig() {}
      gameConfig.DEBUG = true;
      return gameConfig;
    }();
    exports.default = gameConfig;
    cc._RF.pop();
  }, {} ],
  gameManage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3939bA6Jx5MaJnezV8QNlDc", "gameManage");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cardDataOne = void 0;
    var gameProxy_1 = require("../ScriptCore/gameProxy");
    var localStorageProxy_1 = require("../ScriptCore/localStorageProxy");
    var cardDataOne = function() {
      function cardDataOne(baseCard) {
        this.arrCard = [];
        this.baseCard = baseCard;
      }
      return cardDataOne;
    }();
    exports.cardDataOne = cardDataOne;
    var gameManage = function(_super) {
      __extends(gameManage, _super);
      function gameManage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cardData = {};
        _this.cardNumList = [ 2, 4, 8, 16, 32, 64 ];
        _this.game = null;
        _this.dieCount = 8;
        _this.wanNengValue = 64;
        _this.isDie = false;
        _this.isOnCut = false;
        _this.cardSpriteFrameData = {};
        _this.xlsxData = null;
        _this.maxNumberNow = 2;
        return _this;
      }
      gameManage.prototype.onRegister = function() {
        _super.prototype.onRegister.call(this);
      };
      gameManage.prototype.onGameExit = function() {
        var localData = [];
        for (var key in this.cardData) {
          var arr = this.cardData[key].arrCard.map(function(one) {
            return one.num;
          });
          localData.push(arr);
        }
        this.localStorageProxy.setItem(localStorageProxy_1.storageKey.cardData, localData);
        this.localStorageProxy.setItem(localStorageProxy_1.storageKey.candidateBig, this.game.candidateBig.num);
        this.localStorageProxy.setItem(localStorageProxy_1.storageKey.candidateSmall, this.game.candidateSmall.num);
      };
      gameManage.prototype.initCardSpriteFrameData = function(arrS) {
        var _this = this;
        arrS.forEach(function(one) {
          _this.cardSpriteFrameData[one.name] = one;
        });
      };
      gameManage.prototype.setMaxNumberNow = function(num) {
        this.maxNumberNow = Math.max(num, this.maxNumberNow, 2);
        this.maxNumberNow = Math.min(this.maxNumberNow, 1024);
      };
      gameManage.prototype.getCardNum = function() {
        var randomNum = Math.random();
        var ratData = this.xlsxData.testP1[this.maxNumberNow];
        var arrRatNum = [];
        var rat = 0;
        for (var key in ratData) {
          var item = ratData[key];
          rat += item;
          arrRatNum.push({
            rat: rat,
            value: Number(key)
          });
        }
        arrRatNum.sort(function(a, b) {
          return a.rat - b.rat;
        });
        var result = arrRatNum.find(function(one) {
          return one.rat > randomNum;
        });
        null == result.value && (result.value = this.maxNumberNow);
        return result.value;
      };
      gameManage.prototype.getChangeP = function(point) {
        var wordP = cc.view.getVisibleSize();
        var toP = cc.v3(point.x - wordP.width / 2, point.y - wordP.height / 2, 0);
        return toP;
      };
      gameManage.prototype.getPlaceCardToP = function(rowIndex, cardOne) {
        var arrCard = this.cardData[rowIndex].arrCard;
        var index = arrCard.length;
        if (arrCard.indexOf(cardOne) > -1) {
          this.strongBrushIndex(rowIndex, true);
          index = cardOne.index;
        }
        var baseCard = this.cardData[rowIndex].baseCard;
        var X = baseCard.x;
        var Y = baseCard.y - 65 * index;
        return cc.v2(X, Y);
      };
      gameManage.prototype.pushCardToData = function(rowIndex, cardOne) {
        if (cardOne.isWanNeng) {
          var arrCard_1 = this.cardData[rowIndex].arrCard;
          0 == arrCard_1.length && cardOne.refreshNum(this.wanNengValue);
        }
        var arrCard = this.cardData[rowIndex].arrCard;
        arrCard.indexOf(cardOne) < 0 && arrCard.push(cardOne);
        this.strongBrushIndex(rowIndex, false);
        this.chcekHeCheng(rowIndex, cardOne.index);
      };
      gameManage.prototype.chcekHeCheng = function(rowIndex, index) {
        var arrCard = this.cardData[rowIndex].arrCard;
        if (arrCard.length < 2 || index < 1 || this.isDie) {
          index < 1 && index != arrCard.length - 1 && this.chcekHeCheng(rowIndex, index + 1);
          return;
        }
        var lastCard = arrCard[index];
        var otherCard = arrCard[index - 1];
        if (lastCard.num == otherCard.num || lastCard.isWanNeng) {
          lastCard.onDie();
          otherCard.heCheng();
        } else index == arrCard.length - 1 ? this.checkDie() : this.chcekHeCheng(rowIndex, index + 1);
      };
      gameManage.prototype.removeOneCard = function(rowIndex, cardOne) {
        var index = this.cardData[rowIndex].arrCard.indexOf(cardOne);
        index > -1 ? this.cardData[rowIndex].arrCard.splice(index, 1) : cc.error("\u5361\u724c\u6570\u636e\u5220\u9664\u51fa\u9519");
      };
      gameManage.prototype.checkDie = function() {
        for (var key in this.cardData) {
          var arrCard = this.cardData[key].arrCard;
          if (arrCard.length >= this.dieCount) {
            var isAnction = false;
            for (var i = 0; i < arrCard.length; i++) if (arrCard[i].isHeChengAction) {
              isAnction = true;
              break;
            }
            if (!isAnction) {
              this.isDie = true;
              this.game.onDie();
            }
          }
        }
      };
      gameManage.prototype.strongBrushIndex = function(rowIndex, isP) {
        var _this = this;
        this.cardData[rowIndex].arrCard.forEach(function(one, index) {
          one.refreshZindex(index);
          if (isP) {
            var baseCardP = _this.cardData[rowIndex].baseCard.position;
            baseCardP.y -= 65 * index;
            one.isHeChengAction || one.moveTo(cc.v2(baseCardP));
          }
        });
      };
      gameManage.prototype.relive = function() {
        for (var key in this.cardData) {
          var arrClearCard = this.cardData[key].arrCard.slice(this.dieCount - 3);
          arrClearCard.forEach(function(one) {
            one.onDie();
          });
        }
        this.isDie = false;
        this.localStorageProxy.setItem(localStorageProxy_1.storageKey.reliveCount, 1);
      };
      gameManage.prototype.cutCard = function(rowIndex, index) {
        var arrCard = this.cardData[rowIndex].arrCard;
        arrCard[index].onDie();
        var afterArrCard = arrCard.slice(index);
        afterArrCard.forEach(function(one, i) {
          setTimeout(function() {
            one.placeCard(rowIndex);
          }, 300 * i);
        });
      };
      return gameManage;
    }(gameProxy_1.default);
    exports.default = gameManage;
    cc._RF.pop();
  }, {
    "../ScriptCore/gameProxy": "gameProxy",
    "../ScriptCore/localStorageProxy": "localStorageProxy"
  } ],
  gameProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25884F4TydM0ojQJOYuQCq0", "gameProxy");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var puremvc_1 = require("../ScriptCore/puremvc");
    var localStorageProxy_1 = require("../ScriptCore/localStorageProxy");
    var gameProxy = function(_super) {
      __extends(gameProxy, _super);
      function gameProxy() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.PersistRootNode = null;
        _this.localStorageProxy = null;
        return _this;
      }
      gameProxy.prototype.onRegister = function() {
        this.localStorageProxy = puremvc_1.puremvc.Facade.getInstance().getProxy(localStorageProxy_1.default);
      };
      return gameProxy;
    }(puremvc_1.puremvc.Proxy);
    exports.default = gameProxy;
    cc._RF.pop();
  }, {
    "../ScriptCore/localStorageProxy": "localStorageProxy",
    "../ScriptCore/puremvc": "puremvc"
  } ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1b90/rohdEk4SdmmEZANaD", "game");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var baseComponent_1 = require("../ScriptCore/baseComponent");
    var localStorageProxy_1 = require("../ScriptCore/localStorageProxy");
    var sdkManager_1 = require("../ScriptCore/Sdk/sdkManager");
    var cardOne_1 = require("./cardOne");
    var gameManage_1 = require("./gameManage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var game = function(_super) {
      __extends(game, _super);
      function game() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gameManage = null;
        _this.arrBaseCare = [];
        _this.candidateCardBig = null;
        _this.candidateCardSamll = null;
        _this.cardOnePrefab = null;
        _this.cardContent = null;
        _this.candidateSmall = null;
        _this.candidateBig = null;
        _this.result = null;
        _this.relive = null;
        _this.universalCountLB = null;
        _this.universalAdIcon = null;
        _this.cutUi = null;
        _this.cutCountLB = null;
        _this.cutAdIcon = null;
        _this.sanChuCountLB = null;
        _this.sanChuAdIcon = null;
        _this.localStorageProxy = null;
        _this.arrCardSpriteFrame = [];
        _this.shanChuBtn = null;
        return _this;
      }
      game.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.gameManage = this.facade.getProxy(gameManage_1.default);
        this.localStorageProxy = this.facade.getProxy(localStorageProxy_1.default);
        this.gameManage.game = this;
      };
      game.prototype.start = function() {
        for (var i = 0; i < this.arrBaseCare.length; i++) this.gameManage.cardData[i] = new gameManage_1.cardDataOne(this.arrBaseCare[i]);
        this.gameManage.initCardSpriteFrameData(this.arrCardSpriteFrame);
        this.localData();
        this.refreshUi();
      };
      game.prototype.localData = function() {
        var _this = this;
        var localData = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.cardData);
        var hasData = false;
        var _loop_1 = function(rowIndex) {
          localData[rowIndex].forEach(function(one, index) {
            hasData = true;
            var toP = _this.gameManage.getPlaceCardToP(rowIndex, null);
            var cardOne = _this.addCard(one, cc.v3(toP), false, false);
            cardOne.rowIndex = rowIndex;
            cardOne.isPlace = true;
            cardOne.refreshZindex(index);
            _this.gameManage.pushCardToData(rowIndex, cardOne);
          });
        };
        for (var rowIndex = 0; rowIndex < localData.length; rowIndex++) _loop_1(rowIndex);
        var toNumBig = this.gameManage.getCardNum();
        var toNumSmall = this.gameManage.getCardNum();
        if (hasData) {
          toNumBig = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.candidateBig);
          toNumSmall = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.candidateSmall);
        }
        this.candidateBig = this.addCard(toNumBig, this.candidateCardBig.position, false, true);
        this.candidateSmall = this.addCard(toNumSmall, this.candidateCardSamll.position, true, true);
      };
      game.prototype.refreshCandidateCard = function() {
        if (this.candidateBig.isPlace || !this.candidateBig.node.active) {
          this.candidateSmall.moveToCandidateBig();
          this.candidateSmall = this.addCard(this.gameManage.getCardNum(), this.candidateCardSamll.position, true, true);
          this.candidateSmall.creatorSmallAnction();
        }
      };
      game.prototype.refreshUi = function() {
        var universalCount = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.universalCount);
        this.universalCountLB.string = universalCount.toString();
        this.universalCountLB.node.parent.active = universalCount > 0;
        this.universalAdIcon.active = universalCount <= 0;
        var cutCount = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.cutCount);
        this.cutCountLB.string = cutCount.toString();
        this.cutCountLB.node.parent.active = cutCount > 0;
        this.cutAdIcon.active = cutCount <= 0;
        var sanChuCount = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.sanChuCount);
        this.sanChuCountLB.string = sanChuCount.toString();
        this.sanChuCountLB.node.parent.active = sanChuCount > 0;
        this.sanChuAdIcon.active = sanChuCount <= 0;
      };
      game.prototype.addCard = function(cardNum, pos, isSmall, isDi) {
        var newCard = cc.instantiate(this.cardOnePrefab);
        this.cardContent.addChild(newCard);
        var com = newCard.getComponent(cardOne_1.default);
        com.init(cardNum, pos, isSmall, isDi);
        return com;
      };
      game.prototype.onDie = function() {
        var reliveCount = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.reliveCount);
        reliveCount > 0 ? this.showUi(this.result) : this.showUi(this.relive);
      };
      game.prototype.showUi = function(node, cb) {
        void 0 === cb && (cb = null);
        if (node.active) return;
        node.active = true;
        var mask = node.children[0];
        mask.opacity = 0;
        mask.runAction(cc.fadeTo(.5, 150));
        var content = node.children[1];
        content.scale = 0;
        content.runAction(cc.sequence(cc.scaleTo(.5, 1).easing(cc.easeBackOut()), cc.callFunc(function() {
          cb && cb();
        })));
      };
      game.prototype.closeUi = function(node, cb) {
        void 0 === cb && (cb = null);
        var mask = node.children[0];
        mask.runAction(cc.fadeOut(.5));
        var content = node.children[1];
        content.runAction(cc.sequence(cc.scaleTo(.5, 0).easing(cc.easeBackIn()), cc.callFunc(function() {
          node.active = false;
          cb && cb();
        })));
      };
      game.prototype.clearAllCard = function() {
        this.cardContent.getComponentsInChildren(cardOne_1.default).forEach(function(one) {
          one.isBase || one.onDie();
        });
      };
      game.prototype.replay = function() {
        this.gameManage.isDie = false;
        this.gameManage.maxNumberNow = 2;
        this.localStorageProxy.setItem(localStorageProxy_1.storageKey.reliveCount, 0);
        this.candidateBig = this.addCard(this.gameManage.getCardNum(), this.candidateCardBig.position, false, true);
        this.candidateSmall = this.addCard(this.gameManage.getCardNum(), this.candidateCardSamll.position, true, true);
      };
      game.prototype.onCut = function() {
        this.cutUi.active = true;
        this.gameManage.isOnCut = true;
      };
      game.prototype.onOverCut = function(hasUse) {
        this.cutUi.active = false;
        this.gameManage.isOnCut = false;
        if (hasUse) {
          var cutCount = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.cutCount);
          this.localStorageProxy.setItem(localStorageProxy_1.storageKey.cutCount, cutCount - 1);
          this.refreshUi();
        }
      };
      game.prototype.checkIsSanChu = function(card) {
        var cardWordP = card.convertToWorldSpaceAR(cc.v3());
        var sanChuWordP = this.shanChuBtn.convertToWorldSpaceAR(cc.v3());
        var d = cardWordP.subSelf(sanChuWordP).mag();
        if (d < this.shanChuBtn.width) {
          this.shanChuBtn.scale = 1.2;
          return true;
        }
        this.shanChuBtn.scale = 1;
        return false;
      };
      game.prototype.sanChuCard = function(card) {
        var _this = this;
        this.shanChuBtn.scale = 1;
        var cardWordP = card.convertToWorldSpaceAR(cc.v3());
        var sanChuWordP = this.shanChuBtn.convertToWorldSpaceAR(cc.v3());
        var sanChuCount = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.sanChuCount);
        var d = cardWordP.subSelf(sanChuWordP).mag();
        if (d < this.shanChuBtn.width) {
          if (sanChuCount > 0) {
            card.destroy();
            this.refreshCandidateCard();
            this.localStorageProxy.setItem(localStorageProxy_1.storageKey.sanChuCount, sanChuCount - 1);
            this.refreshUi();
          } else sdkManager_1.default.adManager.ShowRewardedVideo(function() {
            card.destroy();
            _this.refreshCandidateCard();
          });
          return true;
        }
        return false;
      };
      game.prototype.onClick = function(btnName) {
        var _this = this;
        switch (btnName) {
         case "closeRelive":
          this.closeUi(this.relive, function() {
            _this.showUi(_this.result);
          });
          break;

         case "relive":
          this.closeUi(this.relive, function() {
            _this.gameManage.relive();
          });
          break;

         case "continue":
          this.closeUi(this.result, function() {
            _this.clearAllCard();
            _this.replay();
          });
          break;

         case "shanchuBtn":
          if (this.gameManage.isOnCut) return;
          var sanChu = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.sanChuCount);
          sanChu <= 0 && sdkManager_1.default.adManager.ShowRewardedVideo(function() {
            _this.localStorageProxy.setItem(localStorageProxy_1.storageKey.sanChuCount, 1);
            _this.refreshUi();
          });
          break;

         case "cutBtn":
          if (this.gameManage.isOnCut) {
            this.onOverCut(false);
            return;
          }
          var cutCount = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.cutCount);
          cutCount > 0 ? this.onCut() : sdkManager_1.default.adManager.ShowRewardedVideo(function() {
            _this.localStorageProxy.setItem(localStorageProxy_1.storageKey.cutCount, 1);
            _this.refreshUi();
          });
          break;

         case "universalBtn":
          if (this.gameManage.isOnCut) return;
          var universalCount = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.universalCount);
          if (universalCount > 0) {
            this.localStorageProxy.setItem(localStorageProxy_1.storageKey.universalCount, universalCount - 1);
            this.refreshUi();
            this.candidateBig.refreshNum(this.gameManage.wanNengValue, true);
          } else sdkManager_1.default.adManager.ShowRewardedVideo(function() {
            _this.localStorageProxy.setItem(localStorageProxy_1.storageKey.universalCount, 1);
            _this.refreshUi();
          });
          break;

         case "restData":
          this.clearAllCard();
          this.localStorageProxy.restData();
          break;

         default:
          cc.error("\u672a\u5904\u7406\u4e8b\u4ef6:", btnName);
        }
      };
      __decorate([ property([ cc.Node ]) ], game.prototype, "arrBaseCare", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "candidateCardBig", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "candidateCardSamll", void 0);
      __decorate([ property(cc.Prefab) ], game.prototype, "cardOnePrefab", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "cardContent", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "result", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "relive", void 0);
      __decorate([ property(cc.Label) ], game.prototype, "universalCountLB", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "universalAdIcon", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "cutUi", void 0);
      __decorate([ property(cc.Label) ], game.prototype, "cutCountLB", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "cutAdIcon", void 0);
      __decorate([ property(cc.Label) ], game.prototype, "sanChuCountLB", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "sanChuAdIcon", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "localStorageProxy", void 0);
      __decorate([ property([ cc.SpriteFrame ]) ], game.prototype, "arrCardSpriteFrame", void 0);
      __decorate([ property(cc.Node) ], game.prototype, "shanChuBtn", void 0);
      game = __decorate([ ccclass ], game);
      return game;
    }(baseComponent_1.default);
    exports.default = game;
    cc._RF.pop();
  }, {
    "../ScriptCore/Sdk/sdkManager": "sdkManager",
    "../ScriptCore/baseComponent": "baseComponent",
    "../ScriptCore/localStorageProxy": "localStorageProxy",
    "./cardOne": "cardOne",
    "./gameManage": "gameManage"
  } ],
  iapManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a69710FlJhBeoXfcxKLyWrZ", "iapManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Product = exports.IAP_Type = exports.purchaseName = void 0;
    var sdkManager_1 = require("../sdkManager");
    var purchaseName = function() {
      function purchaseName() {}
      purchaseName.remove_ads = "remove_ads";
      purchaseName.double_coin = "double_coin";
      purchaseName.coin_package = "coin_package";
      purchaseName.coin_package2 = "coin_package2";
      return purchaseName;
    }();
    exports.purchaseName = purchaseName;
    var IAP_Type;
    (function(IAP_Type) {
      IAP_Type[IAP_Type["CONSUMABLE"] = 0] = "CONSUMABLE";
      IAP_Type[IAP_Type["NON_CONSUMABLE"] = 1] = "NON_CONSUMABLE";
    })(IAP_Type = exports.IAP_Type || (exports.IAP_Type = {}));
    var Product = function() {
      function Product() {}
      return Product;
    }();
    exports.Product = Product;
    var iapManager = function() {
      function iapManager() {
        this.successCb = {};
        this.restoredCb = {};
        if (sdkManager_1.default.platForm != sdkManager_1.platformEnum.ios) return;
        cc.log("iap init");
        this.setCallback();
        sdkbox.IAP.init(null);
        this.refreshIAP();
      }
      iapManager.prototype.purchase_remove_ads = function() {
        sdkbox.IAP.purchase(purchaseName.remove_ads);
        this.successCb[purchaseName.remove_ads] = function() {
          sdkManager_1.default.adManager.HideBanner();
        };
      };
      iapManager.prototype.purchaseByName = function(name, successCb) {
        sdkbox.IAP.purchase(name);
        this.successCb.hasOwnProperty(name) && cc.error("iap \u5df2\u7ecf\u8bbe\u7f6e\u4e86key\uff1a" + name + ",\u5df2\u7ecf\u8bbe\u7f6e\u7684\u5c06\u4f1a\u88ab\u8986\u76d6");
        this.successCb[name] = successCb;
      };
      iapManager.prototype.restore = function(restoredCb) {
        sdkbox.IAP.restore();
        this.restoredCb = restoredCb;
      };
      iapManager.prototype.setCallback = function() {
        var _this = this;
        sdkbox.IAP.setListener({
          onSuccess: function(product) {
            _this.successCb.hasOwnProperty(product.name) ? _this.successCb[product.name]() : cc.error("iap \u4e3a\u8bbe\u7f6e\u76f8\u5e94\u8d2d\u4e70\u7684\u56de\u8c03" + product.name);
          },
          onFailure: function(product, msg) {
            cc.log("iap onFailure");
          },
          onCanceled: function(product) {
            cc.log("iap onFailure");
          },
          onRestored: function(product) {
            _this.restoredCb.hasOwnProperty(product.name) ? _this.restoredCb[product.name]() : cc.error("iap \u4e3a\u8bbe\u7f6e\u76f8\u5e94\u6062\u590d\u8d2d\u4e70\u7684\u56de\u8c03" + product.name);
          },
          onProductRequestSuccess: function(products) {
            cc.log("iap onProductRequestSuccess");
          },
          onProductRequestFailure: function(msg) {
            cc.log("iap onProductRequestFailure");
          }
        });
      };
      iapManager.prototype.refreshIAP = function() {
        sdkbox.IAP.refresh();
      };
      return iapManager;
    }();
    exports.default = iapManager;
    cc._RF.pop();
  }, {
    "../sdkManager": "sdkManager"
  } ],
  ironManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a662baYshVG2YO6Hy9jL8vP", "ironManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var puremvc_1 = require("../../../puremvc");
    var localStorageProxy_1 = require("../../../localStorageProxy");
    var sdkManager_1 = require("../../sdkManager");
    var ironSourceManager = function() {
      function ironSourceManager() {
        this.adDisTime = 15;
        this.isRemoveAd = false;
        this.init();
      }
      ironSourceManager.prototype.init = function() {
        cc.log("\u521d\u59cb\u5316ironSource");
        this.IronSource = window["IronSource"];
        this.isRemoveAd = puremvc_1.puremvc.Facade.getInstance().getProxy(localStorageProxy_1.default).getItem(localStorageProxy_1.storageKey.isRemoveAd);
        this.IronSource.init();
      };
      ironSourceManager.prototype.ShowRewardedVideo = function(rewardCb, noRewardCb, disPlayCb, failedCb) {
        this.IronSource.setRewardHandler(rewardCb, noRewardCb, disPlayCb, failedCb);
        this.IronSource.showRewardVideoAD();
      };
      ironSourceManager.prototype.ShowInterstitial = function(disMissCb, disPlayCb) {
        if (!this.getCanAd()) return;
        this.IronSource.setInterstitialHandler(disMissCb, disPlayCb);
        this.IronSource.showFullScreenAD();
      };
      ironSourceManager.prototype.ShowBanner = function() {
        if (!this.getCanAd()) return;
        this.IronSource.showBanner();
      };
      ironSourceManager.prototype.HideBanner = function() {
        this.IronSource.hideBanner();
      };
      ironSourceManager.prototype.onRemoveAds = function() {
        this.HideBanner();
        this.isRemoveAd = true;
        puremvc_1.puremvc.Facade.getInstance().getProxy(localStorageProxy_1.default).setItem(localStorageProxy_1.storageKey.isRemoveAd, true);
      };
      ironSourceManager.prototype.getCanAd = function() {
        var isAdCan = !this.isRemoveAd;
        var cdIsOk = sdkManager_1.default.adManager.adTimeVal > sdkManager_1.default.adManager.adDisTime;
        return isAdCan && cdIsOk;
      };
      ironSourceManager.prototype.getCanVideo = function() {
        return this.IronSource.isRewardVideoAvailable();
      };
      return ironSourceManager;
    }();
    exports.default = ironSourceManager;
    cc._RF.pop();
  }, {
    "../../../localStorageProxy": "localStorageProxy",
    "../../../puremvc": "puremvc",
    "../../sdkManager": "sdkManager"
  } ],
  jsonUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f7f9u6sERJzISKAUDx8AQJ", "jsonUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var jsonUtil = function() {
      function jsonUtil() {}
      jsonUtil.getIndexByFullName = function(fullName) {
        return fullName.replace(/[^0-9]/gi, "");
      };
      jsonUtil.getFullNameByIndex = function(index) {
        return "level_" + index + ".json";
      };
      jsonUtil.writJson = function(jsonString, fileName, path) {
        void 0 === path && (path = null);
        path = path || this.defaultPath;
        jsb.fileUtils.writeStringToFile(jsonString, path + fileName);
      };
      jsonUtil.readFile = function(fileName, path) {
        void 0 === path && (path = null);
        path = path || this.defaultPath;
        return jsb.fileUtils.getStringFromFile(path + fileName);
      };
      jsonUtil.readJson = function(fileName, path) {
        void 0 === path && (path = null);
        path = path || this.defaultPath;
        var data;
        var str = jsb.fileUtils.getStringFromFile(path + fileName);
        try {
          data = JSON.parse(str);
        } catch (e) {
          cc.error(e);
          cc.error(str);
        }
        return data;
      };
      jsonUtil.removeJson = function(fileName, path) {
        void 0 === path && (path = null);
        path = path || this.defaultPath;
        jsb.fileUtils.removeFile(path + fileName);
      };
      jsonUtil.getLevelIndex = function(path) {
        void 0 === path && (path = null);
        path = path || this.defaultPath;
        var arrName = jsb.fileUtils.listFiles(path);
        var arrIndex = [];
        for (var i = 0; i < arrName.length; i++) arrName[i].indexOf("level") > -1 && arrIndex.push(arrName[i].replace(/[^0-9]/gi, ""));
        arrIndex.sort(function(a, b) {
          return a - b;
        });
        for (var i = 0; i < arrIndex.length; i++) if (arrIndex[i] != i + 1) return i + 1;
        return arrIndex.length + 1;
      };
      jsonUtil.getLevelList = function(path) {
        void 0 === path && (path = null);
        path = path || this.defaultPath;
        var arrName = jsb.fileUtils.listFiles(path);
        var arrResult = [];
        for (var i = 0; i < arrName.length; i++) arrName[i].indexOf("level") > -1 && arrResult.push(arrName[i].replace(/^.*[\\\/]/, ""));
        arrResult.sort(function(a, b) {
          return Number(a.replace(/[^0-9]/gi, "")) - Number(b.replace(/[^0-9]/gi, ""));
        });
        return arrResult;
      };
      jsonUtil.getLevelSort = function(path) {
        void 0 === path && (path = null);
        path = path || this.defaultPath;
        var arrName = jsb.fileUtils.listFiles(path);
        var arrIndex = [];
        for (var i = 0; i < arrName.length; i++) arrName[i].indexOf("level") > -1 && arrIndex.push(Number(arrName[i].replace(/[^0-9]/gi, "")));
        arrIndex.sort(function(a, b) {
          return a - b;
        });
        return arrIndex;
      };
      jsonUtil.checkHasLevel = function(fileName, path) {
        void 0 === path && (path = null);
        return jsb.fileUtils.isFileExist(path + fileName);
      };
      jsonUtil.defaultPath = "/Users/Work/";
      return jsonUtil;
    }();
    exports.default = jsonUtil;
    cc._RF.pop();
  }, {} ],
  loadManage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f05dah5UZLmZ46oET9cIXd", "loadManage");
    "use strict";
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var loadManage = function() {
      function loadManage() {}
      loadManage.loadRes = function(url, type, callBack) {
        cc.loader.loadRes(url, type, function(error, resource) {
          error ? cc.error(error.message) : callBack(resource);
        });
      };
      loadManage.setImgByUrl = function(sprite, url, callBack) {
        cc.loader.loadRes(url, cc.SpriteFrame, function(error, resource) {
          if (error) cc.error(error.message); else {
            sprite.spriteFrame = resource;
            callBack && callBack();
          }
        });
      };
      loadManage.loadPrefab = function(url, callBack) {
        cc.loader.loadRes(url, cc.Prefab, function(error, resource) {
          error ? cc.error(error.message) : callBack(resource);
        });
      };
      loadManage.loadPrefabStic = function(url) {
        return __awaiter(this, void 0, void 0, function() {
          var result;
          return __generator(this, function(_a) {
            result = new Promise(function(resolve, reject) {
              cc.loader.loadRes(url, cc.Prefab, function(error, resource) {
                error ? cc.error(error.message) : resolve(resource);
              });
            });
            return [ 2, result ];
          });
        });
      };
      return loadManage;
    }();
    exports.default = loadManage;
    cc._RF.pop();
  }, {} ],
  localStorageProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1fbf3HJuvtLgYO0tnC1vbY3", "localStorageProxy");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.storageType = exports.storageKey = void 0;
    var puremvc_1 = require("./puremvc");
    var storageKey;
    (function(storageKey) {
      storageKey["isMusicOn"] = "isMusicOn";
      storageKey["isSoundOn"] = "isSoundOn";
      storageKey["isVibart"] = "isVibart";
      storageKey["isRemoveAd"] = "isRemoveAd";
      storageKey["gameTime"] = "gameTime";
      storageKey["universalCount"] = "universalCount";
      storageKey["cutCount"] = "cutCount";
      storageKey["sanChuCount"] = "sanChuCount";
      storageKey["cardData"] = "cardData";
      storageKey["candidateBig"] = "candidateBig";
      storageKey["candidateSmall"] = "candidateSmall";
      storageKey["reliveCount"] = "reliveCount";
    })(storageKey = exports.storageKey || (exports.storageKey = {}));
    var storageType = function() {
      function storageType(dataStr) {
        this.initData();
        if (dataStr) {
          var localData = JSON.parse(dataStr);
          for (var key in storageKey) {
            var dataKey = storageKey[key];
            this[dataKey] = this.changeType(localData[dataKey], this[dataKey]);
          }
        }
      }
      storageType.prototype.initData = function() {
        this.isMusicOn = true;
        this.isSoundOn = true;
        this.isVibart = true;
        this.isRemoveAd = false;
        this.gameTime = 0;
        this.universalCount = 0;
        this.cutCount = 0;
        this.sanChuCount = 0;
        this.cardData = [];
        this.candidateBig = 2;
        this.candidateSmall = 2;
        this.reliveCount = 0;
      };
      storageType.prototype.changeType = function(data, typeData) {
        if (typeData instanceof Number) return Number(data);
        if (typeData instanceof String) return String(data);
        if (typeData instanceof Boolean) return "true" == data;
        return data;
      };
      return storageType;
    }();
    exports.storageType = storageType;
    var localStorageProxy = function(_super) {
      __extends(localStorageProxy, _super);
      function localStorageProxy() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.LOCAL_STORAGE_KEY = "allData";
        _this.allData = {};
        return _this;
      }
      localStorageProxy.prototype.onRegister = function() {
        var str = cc.sys.localStorage.getItem(this.LOCAL_STORAGE_KEY);
        this.allData = new storageType(str);
      };
      localStorageProxy.prototype.getItem = function(key) {
        var value = this.allData[key];
        null == value && (value = new storageType()[key]);
        return value;
      };
      localStorageProxy.prototype.setItem = function(key, value) {
        this.allData[key] = value;
        this.save();
      };
      localStorageProxy.prototype.save = function() {
        cc.sys.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.allData));
      };
      localStorageProxy.prototype.restData = function() {
        this.allData = new storageType();
      };
      return localStorageProxy;
    }(puremvc_1.puremvc.Proxy);
    exports.default = localStorageProxy;
    cc._RF.pop();
  }, {
    "./puremvc": "puremvc"
  } ],
  loopScrollViewNew: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6600axpUKBMRaka2DF2wjHf", "loopScrollViewNew");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Type;
    (function(Type) {
      Type[Type["HORIZONTAL"] = 1] = "HORIZONTAL";
      Type[Type["VERTICAL"] = 2] = "VERTICAL";
      Type[Type["GRIDHORIZONTAL"] = 3] = "GRIDHORIZONTAL";
      Type[Type["GRIDVERTICAL"] = 4] = "GRIDVERTICAL";
    })(Type || (Type = {}));
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var loopScrollViewNew = function(_super) {
      __extends(loopScrollViewNew, _super);
      function loopScrollViewNew() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.childSamplePrefab = null;
        _this.childSampleNode = null;
        _this._horizontal = false;
        _this._vertical = true;
        _this._type = Type.HORIZONTAL;
        _this._HOrVNumber = 1;
        _this._left = 0;
        _this._right = 0;
        _this._top = 0;
        _this._buttom = 0;
        _this._spacingX = 0;
        _this._spacingY = 0;
        _this.data = [];
        _this._toRefresh = false;
        _this.positionList = null;
        _this.childCount = null;
        _this.viewMax = null;
        _this.viewMin = null;
        _this.lastPosition = null;
        _this.childAnchorLeft = null;
        _this.childAnchorTop = null;
        _this.childNode = null;
        _this.isHorizontal = null;
        _this.showFunction = null;
        return _this;
      }
      Object.defineProperty(loopScrollViewNew.prototype, "horizontal", {
        get: function() {
          return this._horizontal;
        },
        set: function(value) {
          this._horizontal = value;
          this._vertical = !value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "vertical", {
        get: function() {
          return this._vertical;
        },
        set: function(value) {
          this._horizontal = !value;
          this._vertical = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "type", {
        get: function() {
          return this._type;
        },
        set: function(type) {
          this._type = type;
          this._changePaddingType();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "HOrVNumber", {
        get: function() {
          return this._HOrVNumber;
        },
        set: function(num) {
          this._HOrVNumber = num;
          this._changePadding();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "left", {
        get: function() {
          return this._left;
        },
        set: function(num) {
          this._left = num;
          this._changePadding();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "right", {
        get: function() {
          return this._right;
        },
        set: function(num) {
          this._right = num;
          this._changePadding();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "top", {
        get: function() {
          return this._top;
        },
        set: function(num) {
          this._top = num;
          this._changePadding();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "buttom", {
        get: function() {
          return this._buttom;
        },
        set: function(num) {
          this._buttom = num;
          this._changePadding();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "spacingX", {
        get: function() {
          return this._spacingX;
        },
        set: function(num) {
          this._spacingX = num;
          this._changePadding();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "spacingY", {
        get: function() {
          return this._spacingY;
        },
        set: function(num) {
          this._spacingY = num;
          this._changePadding();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(loopScrollViewNew.prototype, "refreshButton", {
        get: function() {
          return this._toRefresh;
        },
        set: function(any) {
          this._toRefresh = false;
          this._changePaddingType();
        },
        enumerable: false,
        configurable: true
      });
      loopScrollViewNew.prototype._changePaddingType = function() {
        var _this = this;
        this.data.length = this.content.childrenCount;
        var showList = [];
        var hidList = [];
        switch (this._type) {
         case Type.HORIZONTAL:
          hidList = [ "top", "buttom", "spacingY", "HOrVNumber" ];
          showList = [ "left", "right", "spacingX" ];
          this.horizontal = true;
          break;

         case Type.VERTICAL:
          hidList = [ "left", "right", "spacingX", "HOrVNumber" ];
          showList = [ "top", "buttom", "spacingY" ];
          this.horizontal = false;
          break;

         case Type.GRIDHORIZONTAL:
          hidList = [];
          showList = [ "left", "right", "top", "buttom", "spacingX", "spacingY", "HOrVNumber" ];
          this.horizontal = true;
          break;

         case Type.GRIDVERTICAL:
          hidList = [];
          showList = [ "left", "right", "top", "buttom", "spacingX", "spacingY", "HOrVNumber" ];
          this.horizontal = false;
        }
        showList.forEach(function(key) {
          cc.Class["attr"](_this, key, {
            visible: true
          });
        });
        hidList.forEach(function(key) {
          cc.Class["attr"](_this, key, {
            visible: false
          });
        });
        this._changePadding();
      };
      loopScrollViewNew.prototype._changePadding = function() {
        var _this = this;
        this._init();
        this.content.children.forEach(function(node, index) {
          node.setPosition(_this.positionList[index]);
        });
      };
      loopScrollViewNew.prototype.init = function(data, callBack) {
        this.data = this.changeDataToArray(data);
        this.showFunction = callBack;
        this._init();
        this.addChildToContent();
      };
      loopScrollViewNew.prototype.refreshData = function(data) {
        this.stopAutoScroll();
        this.scrollToTopLeft();
        this.data = this.changeDataToArray(data);
        var beforeChildCount = this.childCount;
        this._init();
        beforeChildCount != this.childCount && this.addChildToContent();
      };
      loopScrollViewNew.prototype.onlyRefreshShow = function(data) {
        this.data = this.changeDataToArray(data);
        var children = this.content.children;
        for (var i = 0, len = children.length; i < len; i++) {
          var data_1 = this.data[children[i]["setIndex"]];
          this.showFunction(children[i], data_1);
        }
      };
      loopScrollViewNew.prototype.scrollIndexToPercentage = function(index, time, Percentage, isComplete, attenuated, callback) {
        var _this = this;
        void 0 === time && (time = 0);
        void 0 === isComplete && (isComplete = false);
        void 0 === attenuated && (attenuated = false);
        void 0 === callback && (callback = function() {});
        if (!this.positionList.length || index < 0 || index >= this.positionList.length) {
          cc.error("%s \u8bf7\u68c0\u6d4b\u6570\u636e\u662f\u5426\u5408\u6cd5\u3002index:%s", this.name, index);
          return;
        }
        this.stopAutoScroll();
        var maxScrollOffset = this.isHorizontal ? this.getMaxScrollOffset().x : this.getMaxScrollOffset().y;
        var d = Math.abs(this.isHorizontal ? this.positionList[index].x : this.positionList[index].y);
        var offset;
        var contentOffset;
        if (this.isHorizontal) {
          contentOffset = Percentage > .5 ? this.node.width * Percentage - (this.childNode.width - this.childAnchorLeft) * (2 * Percentage - 1) : this.node.width * Percentage - this.childAnchorLeft * (2 * Percentage - 1);
          var _buD = (contentOffset - (this.childAnchorLeft + this.spacingX)) % (this.childNode.width + this.spacingX);
          _buD > this.childNode.width / 2 && (_buD = -this.childNode.width - this.spacingX + _buD);
          offset = d - contentOffset + (isComplete ? _buD : 0);
        } else {
          contentOffset = Percentage > .5 ? this.node.height * Percentage - (this.childNode.height - this.childAnchorTop) * (2 * Percentage - 1) : this.node.height * Percentage - this.childAnchorTop * (2 * Percentage - 1);
          var _buD = (contentOffset - (this.childAnchorTop + this.spacingY)) % (this.childNode.height + this.spacingY);
          _buD > this.childNode.height / 2 && (_buD = -this.childNode.height - this.spacingY + _buD);
          offset = d - contentOffset + (isComplete ? _buD : 0);
        }
        offset = Math.max(0, offset);
        offset = Math.min(maxScrollOffset, offset);
        var p = this.isHorizontal ? cc.v2(offset, 0) : cc.v2(0, offset);
        this.scrollToOffset(p, time, attenuated);
        this.scheduleOnce(function() {
          _this.refreshPosition();
          callback();
        }, time);
      };
      loopScrollViewNew.prototype.getNodeInView = function() {
        var nodeList = [];
        if (this.isHorizontal) {
          var pX = this.content.x;
          for (var i = 0; i < this.childCount; i++) {
            var node = this.content.children[i];
            var X = node.x + pX;
            var a = X + this.childAnchorLeft <= this.viewMin;
            var b = X - (this.childNode.width - this.childAnchorLeft) >= this.viewMax;
            a || b || nodeList.push(node);
          }
        } else {
          var pY = this.content.y;
          for (var i = 0; i < this.childCount; i++) {
            var node = this.content.children[i];
            var Y = node.y + pY;
            var a = Y + this.childAnchorTop <= this.viewMin;
            var b = Y - (this.childNode.height - this.childAnchorTop) >= this.viewMax;
            a || b || nodeList.push(node);
          }
        }
        nodeList.sort(function(a, b) {
          return a["setIndex"] - b["setIndex"];
        });
        return nodeList;
      };
      loopScrollViewNew.prototype.start = function() {
        var _this = this;
        this.node.on("scrolling", function() {
          _this.onScroll();
        });
      };
      loopScrollViewNew.prototype._init = function() {
        this.childSamplePrefab ? this.childNode = cc.instantiate(this.childSamplePrefab) : this.childNode = this.childSampleNode;
        this.isHorizontal = this.type == Type.HORIZONTAL || this.type == Type.GRIDHORIZONTAL;
        this.isHorizontal ? this.content.anchorX = 0 : this.content.anchorY = 1;
        this.childAnchorLeft = this.childNode.width * this.childNode.anchorX;
        this.childAnchorTop = this.childNode.height * this.childNode.anchorY;
        this.initPositionList();
      };
      loopScrollViewNew.prototype.changeDataToArray = function(data) {
        var result = [];
        if (Array.isArray(data)) result = data; else for (var key in data) result.push(data[key]);
        return result;
      };
      loopScrollViewNew.prototype.initPositionList = function() {
        this.positionList = [];
        var contentOffset = cc.v2(0, 0);
        switch (this._type) {
         case Type.HORIZONTAL:
          this.viewMax = this.node.width * (1 - this.node.anchorX);
          this.viewMin = -this.node.width * this.node.anchorX;
          this.childCount = Math.min(Math.ceil(this.node.width / (this.childNode.width + this.spacingX)) + 1, this.data.length);
          this.content.width = (this.childNode.width + this.spacingX) * this.data.length - this.spacingX + this.left + this.right;
          this.content.height = this.childNode.height;
          contentOffset = this.getContentOffset;
          for (var i = 0, len = this.data.length; i < len; i++) this.positionList.push(cc.v2(this.childAnchorLeft + (this.childNode.width + this._spacingX) * i + this.left - contentOffset.x, contentOffset.y - this.childAnchorTop));
          break;

         case Type.VERTICAL:
          this.viewMax = this.node.height * (1 - this.node.anchorY);
          this.viewMin = -this.node.height * this.node.anchorY;
          this.childCount = Math.min(Math.ceil(this.node.height / (this.childNode.height + this.spacingY)) + 1, this.data.length);
          this.content.width = this.childNode.width;
          this.content.height = (this.childNode.height + this.spacingY) * this.data.length - this.spacingY + this.top + this.buttom;
          contentOffset = this.getContentOffset;
          for (var i = 0, len = this.data.length; i < len; i++) this.positionList.push(cc.v2(this.childAnchorLeft - contentOffset.x, -(this.childAnchorTop + (this.childNode.height + this._spacingY) * i + this.top) + contentOffset.y));
          break;

         case Type.GRIDHORIZONTAL:
          this.viewMax = this.node.width * (1 - this.node.anchorX);
          this.viewMin = -this.node.width * this.node.anchorX;
          this.childCount = Math.min((Math.ceil(this.node.width / (this.childNode.width + this.spacingX)) + 1) * this.HOrVNumber, this.data.length);
          this.content.width = (this.childNode.width + this.spacingX) * Math.ceil(this.data.length / this.HOrVNumber) - this.spacingX + this.left + this.right;
          this.content.height = (this.childNode.height + this.spacingY) * this.HOrVNumber + this.top + this.buttom - this.spacingY;
          contentOffset = this.getContentOffset;
          var indexH = 0;
          for (var i = 0, len = this.data.length; i < len; i++) {
            var pX = this.childAnchorLeft + (this.childNode.width + this._spacingX) * Math.floor(i / this.HOrVNumber) + this.left - contentOffset.x;
            var pY = -(this.childAnchorTop + (this.childNode.height + this._spacingY) * indexH + this.top - contentOffset.y);
            this.positionList.push(cc.v2(pX, pY));
            indexH++;
            indexH %= this.HOrVNumber;
          }
          break;

         case Type.GRIDVERTICAL:
          this.viewMax = this.node.height * (1 - this.node.anchorY);
          this.viewMin = -this.node.height * this.node.anchorY;
          this.childCount = Math.min((Math.ceil(this.node.height / (this.childNode.height + this.spacingY)) + 1) * this.HOrVNumber, this.data.length);
          this.content.width = (this.childNode.width + this.spacingX) * this.HOrVNumber + this.left + this.right - this.spacingX;
          this.content.height = (this.childNode.height + this.spacingY) * Math.ceil(this.data.length / this.HOrVNumber) - this.spacingY + this._top + this.buttom;
          contentOffset = this.getContentOffset;
          var indexV = 0;
          for (var i = 0, len = this.data.length; i < len; i++) {
            var pX = this.childAnchorLeft + (this.childNode.width + this._spacingX) * indexV + this.left - contentOffset.x;
            var pY = -(this.childAnchorTop + (this.childNode.height + this._spacingY) * Math.floor(i / this.HOrVNumber) + this.top - contentOffset.y);
            this.positionList.push(cc.v2(pX, pY));
            indexV++;
            indexV %= this.HOrVNumber;
          }
        }
      };
      Object.defineProperty(loopScrollViewNew.prototype, "getContentOffset", {
        get: function() {
          return cc.v2(this.content.width * this.content.anchorX, this.content.height * (1 - this.content.anchorY));
        },
        enumerable: false,
        configurable: true
      });
      loopScrollViewNew.prototype.onScroll = function() {
        switch (this.type) {
         case Type.HORIZONTAL:
         case Type.GRIDHORIZONTAL:
          this.onScrollH();
          break;

         case Type.VERTICAL:
         case Type.GRIDVERTICAL:
          this.onScrollV();
        }
      };
      loopScrollViewNew.prototype.onScrollH = function() {
        var pX = this.content.x;
        for (var i = 0; i < this.childCount; i++) {
          var node = this.content.children[i];
          var X = node.x + pX;
          var newIndex = void 0;
          if (this.lastPosition > pX) {
            if (X + this.childAnchorLeft < this.viewMin) {
              newIndex = node["setIndex"] + this.childCount;
              if (newIndex >= 0 && newIndex <= this.positionList.length - 1) {
                node["setIndex"] = newIndex;
                node.setPosition(this.positionList[newIndex]);
                this.showFunction(node, this.data[newIndex]);
              }
            }
          } else if (X - this.childAnchorLeft > this.viewMax) {
            newIndex = node["setIndex"] - this.childCount;
            if (newIndex >= 0 && newIndex <= this.positionList.length - 1) {
              node["setIndex"] = newIndex;
              node.setPosition(this.positionList[newIndex]);
              this.showFunction(node, this.data[newIndex]);
            }
          }
        }
        this.lastPosition = this.content.x;
      };
      loopScrollViewNew.prototype.onScrollV = function() {
        var pY = this.content.y;
        for (var i = 0; i < this.childCount; i++) {
          var node = this.content.children[i];
          var Y = node.y + pY;
          var newIndex = void 0;
          if (this.lastPosition > pY) {
            if (Y + this.childAnchorTop < this.viewMin) {
              newIndex = node["setIndex"] - this.childCount;
              if (newIndex >= 0 && newIndex <= this.positionList.length - 1) {
                node["setIndex"] = newIndex;
                node.setPosition(this.positionList[newIndex]);
                this.showFunction(node, this.data[newIndex]);
              }
            }
          } else if (Y - this.childAnchorTop > this.viewMax) {
            newIndex = node["setIndex"] + this.childCount;
            if (newIndex >= 0 && newIndex <= this.positionList.length - 1) {
              node["setIndex"] = newIndex;
              node.setPosition(this.positionList[newIndex]);
              this.showFunction(node, this.data[newIndex]);
            }
          }
        }
        this.lastPosition = this.content.y;
      };
      loopScrollViewNew.prototype._refreshPositionH = function(isLeft) {
        void 0 === isLeft && (isLeft = true);
        var pX = this.content.x;
        var isOK = true;
        for (var i = 0; i < this.childCount; i++) {
          var node = this.content.children[i];
          var X = node.x + pX;
          var newIndex = void 0;
          if (isLeft) {
            if (X + this.childAnchorLeft < this.viewMin) {
              newIndex = node["setIndex"] + this.childCount;
              if (newIndex >= 0 && newIndex <= this.positionList.length - 1) {
                node["setIndex"] = newIndex;
                node.setPosition(this.positionList[newIndex]);
                this.showFunction(node, this.data[newIndex]);
                isOK = false;
              }
            }
          } else if (X - this.childAnchorLeft > this.viewMax) {
            newIndex = node["setIndex"] - this.childCount;
            if (newIndex >= 0 && newIndex <= this.positionList.length - 1) {
              node["setIndex"] = newIndex;
              node.setPosition(this.positionList[newIndex]);
              this.showFunction(node, this.data[newIndex]);
              isOK = false;
            }
          }
        }
        isOK || this._refreshPositionH(isLeft);
      };
      loopScrollViewNew.prototype.refreshPosition = function() {
        if (this.isHorizontal) {
          var pX = this.content.x;
          for (var i = 0; i < this.childCount; i++) {
            var node = this.content.children[i];
            var X = node.x + pX;
            X + this.childAnchorLeft < this.viewMin ? this._refreshPositionH(true) : X - this.childAnchorLeft > this.viewMax && this._refreshPositionH(false);
          }
        } else {
          var pY = this.content.y;
          for (var i = 0; i < this.childCount; i++) {
            var node = this.content.children[i];
            var Y = node.y + pY;
            Y + this.childAnchorTop < this.viewMin ? this._refreshPositionV(true) : Y - this.childAnchorTop > this.viewMax && this._refreshPositionV(false);
          }
        }
      };
      loopScrollViewNew.prototype._refreshPositionV = function(isBotton) {
        void 0 === isBotton && (isBotton = true);
        var pY = this.content.y;
        var isOK = true;
        for (var i = 0; i < this.childCount; i++) {
          var node = this.content.children[i];
          var Y = node.y + pY;
          var newIndex = void 0;
          if (isBotton) {
            if (Y + this.childAnchorTop < this.viewMin) {
              newIndex = node["setIndex"] - this.childCount;
              if (newIndex >= 0 && newIndex <= this.positionList.length - 1) {
                node["setIndex"] = newIndex;
                node.setPosition(this.positionList[newIndex]);
                this.showFunction(node, this.data[newIndex]);
                isOK = false;
              }
            }
          } else if (Y - this.childAnchorTop > this.viewMax) {
            newIndex = node["setIndex"] + this.childCount;
            if (newIndex >= 0 && newIndex <= this.positionList.length - 1) {
              node["setIndex"] = newIndex;
              node.setPosition(this.positionList[newIndex]);
              this.showFunction(node, this.data[newIndex]);
              isOK = false;
            }
          }
        }
        isOK || this._refreshPositionV(isBotton);
      };
      loopScrollViewNew.prototype.addChildToContent = function() {
        this.content.removeAllChildren();
        for (var i = 0; i < this.childCount; i++) {
          var newNode = cc.instantiate(this.childNode);
          newNode["setIndex"] = i;
          newNode.setPosition(this.positionList[i]);
          this.showFunction(newNode, this.data[i]);
          this.content.addChild(newNode);
        }
      };
      __decorate([ property({
        tooltip: "\u5b50\u7c7b\u9884\u5236\uff0c\u4f18\u5148\u9884\u5236",
        type: cc.Prefab
      }) ], loopScrollViewNew.prototype, "childSamplePrefab", void 0);
      __decorate([ property({
        tooltip: "\u5b50\u7c7b\u8282\u70b9\uff0c\u4f18\u5148\u9884\u5236",
        type: cc.Node
      }) ], loopScrollViewNew.prototype, "childSampleNode", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u662f\u6c34\u5e73\u6eda\u52a8"
      } || cc.Boolean) ], loopScrollViewNew.prototype, "_horizontal", void 0);
      __decorate([ property({
        tooltip: "\u6eda\u52a8\u65b9\u5411\u7531\u6eda\u52a8\u7c7b\u578b\u51b3\u5b9a,\u8bf7\u4fee\u6539Type",
        readonly: true,
        override: true
      }) ], loopScrollViewNew.prototype, "horizontal", null);
      __decorate([ property({
        tooltip: "\u662f\u5426\u662f\u5782\u76f4\u6eda\u52a8"
      } || cc.Boolean) ], loopScrollViewNew.prototype, "_vertical", void 0);
      __decorate([ property({
        tooltip: "\u6eda\u52a8\u65b9\u5411\u7531\u6eda\u52a8\u7c7b\u578b\u51b3\u5b9a,\u8bf7\u4fee\u6539Type",
        readonly: true,
        override: true
      }) ], loopScrollViewNew.prototype, "vertical", null);
      __decorate([ property({
        visible: false
      }) ], loopScrollViewNew.prototype, "_type", void 0);
      __decorate([ property({
        tooltip: "\u5e03\u5c40\u6a21\u5f0f",
        type: cc.Enum(Type)
      }) ], loopScrollViewNew.prototype, "type", null);
      __decorate([ property({
        visible: false
      }) ], loopScrollViewNew.prototype, "_HOrVNumber", void 0);
      __decorate([ property({
        tooltip: "\u6a2a\u6570\u6216\u8005\u5217\u6570,\u9ed8\u8ba4\u4e3a2",
        visible: false,
        range: [ 1, 99, 1 ]
      }) ], loopScrollViewNew.prototype, "HOrVNumber", null);
      __decorate([ property({
        visible: false
      }) ], loopScrollViewNew.prototype, "_left", void 0);
      __decorate([ property({
        tooltip: "padding left",
        visible: false
      }) ], loopScrollViewNew.prototype, "left", null);
      __decorate([ property({
        visible: false
      }) ], loopScrollViewNew.prototype, "_right", void 0);
      __decorate([ property({
        tooltip: "padding right",
        visible: false
      }) ], loopScrollViewNew.prototype, "right", null);
      __decorate([ property({
        visible: false
      }) ], loopScrollViewNew.prototype, "_top", void 0);
      __decorate([ property({
        tooltip: "padding top",
        visible: false
      }) ], loopScrollViewNew.prototype, "top", null);
      __decorate([ property({
        visible: false
      }) ], loopScrollViewNew.prototype, "_buttom", void 0);
      __decorate([ property({
        tooltip: "padding buttom",
        visible: false
      }) ], loopScrollViewNew.prototype, "buttom", null);
      __decorate([ property({
        visible: false
      }) ], loopScrollViewNew.prototype, "_spacingX", void 0);
      __decorate([ property({
        tooltip: "spacing X",
        visible: false
      }) ], loopScrollViewNew.prototype, "spacingX", null);
      __decorate([ property({
        visible: false
      }) ], loopScrollViewNew.prototype, "_spacingY", void 0);
      __decorate([ property({
        tooltip: "spacing Y",
        visible: false
      }) ], loopScrollViewNew.prototype, "spacingY", null);
      __decorate([ property({
        serializable: false,
        visible: false
      }) ], loopScrollViewNew.prototype, "_toRefresh", void 0);
      __decorate([ property({
        tooltip: "\u5237\u65b0\u673a\u5236\uff0c\u540e\u7eed\u4f18\u5316\u3002##\u7b2c\u4e00\u6b21\u6253\u5f00\uff0c\u6dfb\u52a0\u5b50\u7c7b\u7b49\u6d4b\u8bd5\u90fd\u9700\u8981\u70b9\u51fb\u8fdb\u884c\u5237\u65b0\uff01\uff01",
        displayName: "\u5237\u65b0\u6309\u94ae\uff1a"
      }) ], loopScrollViewNew.prototype, "refreshButton", null);
      loopScrollViewNew = __decorate([ ccclass ], loopScrollViewNew);
      return loopScrollViewNew;
    }(cc.ScrollView);
    exports.default = loopScrollViewNew;
    cc._RF.pop();
  }, {} ],
  msgConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7c25X4sDVKSb4DMCaK6it5", "msgConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.prefabConfig = exports.sceneConfig = exports.sysConfig = void 0;
    var sysConfig = function() {
      function sysConfig() {}
      sysConfig.loadScene = "loadScene";
      sysConfig.showCommonNode = "showCommonNode";
      return sysConfig;
    }();
    exports.sysConfig = sysConfig;
    var sceneConfig = function() {
      function sceneConfig() {}
      sceneConfig.startScene = "startScene";
      sceneConfig.hotScene = "hotScene";
      sceneConfig.main = "main";
      sceneConfig.chessFight = "chessFight";
      sceneConfig.test = "test";
      return sceneConfig;
    }();
    exports.sceneConfig = sceneConfig;
    var prefabConfig = function() {
      function prefabConfig() {}
      prefabConfig.commonSet = "commonSet";
      return prefabConfig;
    }();
    exports.prefabConfig = prefabConfig;
    cc._RF.pop();
  }, {} ],
  puremvc: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "279c2z3ASBEP6V6d086aiJq", "puremvc");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.puremvc = void 0;
    var puremvc;
    (function(puremvc) {
      var Controller = function() {
        function Controller() {
          this.view = null;
          this.commandMap = null;
          if (Controller.instance) throw Error(Controller.SINGLETON_MSG);
          Controller.instance = this;
          this.commandMap = {};
          this.initializeController();
        }
        Controller.prototype.initializeController = function() {
          this.view = View.getInstance();
        };
        Controller.prototype.executeCommand = function(notification) {
          var commandClassRef = this.commandMap[notification.getName()];
          if (commandClassRef) {
            var command = new commandClassRef();
            command.execute(notification);
          }
        };
        Controller.prototype.registerCommand = function(notificationName, commandClassRef) {
          this.commandMap[notificationName] || this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
          this.commandMap[notificationName] = commandClassRef;
        };
        Controller.prototype.hasCommand = function(notificationName) {
          return this.commandMap[notificationName] = null;
        };
        Controller.prototype.removeCommand = function(notificationName) {
          if (this.hasCommand(notificationName)) {
            this.view.removeObserver(notificationName, this);
            delete this.commandMap[notificationName];
          }
        };
        Controller.getInstance = function() {
          Controller.instance || (Controller.instance = new Controller());
          return Controller.instance;
        };
        Controller.SINGLETON_MSG = "Controller singleton already constructed!";
        return Controller;
      }();
      var Model = function() {
        function Model() {
          this.proxyMap = null;
          if (Model.instance) throw Error(Model.SINGLETON_MSG);
          Model.instance = this;
          this.proxyMap = new WeakMap();
          this.initializeModel();
        }
        Model.prototype.initializeModel = function() {};
        Model.prototype.registerProxy = function(proxyClass) {
          var instance = new proxyClass();
          this.proxyMap.set(proxyClass, instance);
          instance.onRegister();
        };
        Model.prototype.removeProxy = function(proxyName) {
          var proxy = this.proxyMap[proxyName];
          if (proxy) {
            delete this.proxyMap[proxyName];
            proxy.onRemove();
          }
          return proxy;
        };
        Model.prototype.retrieveProxy = function(proxyClass) {
          return this.proxyMap.get(proxyClass);
        };
        Model.prototype.hasProxy = function(proxyName) {
          return this.proxyMap.has(proxyName);
        };
        Model.getInstance = function() {
          Model.instance || (Model.instance = new Model());
          return Model.instance;
        };
        Model.SINGLETON_MSG = "Model singleton already constructed!";
        return Model;
      }();
      var View = function() {
        function View() {
          this.mediatorMap = null;
          this.observerMap = null;
          if (View.instance) throw Error(View.SINGLETON_MSG);
          View.instance = this;
          this.mediatorMap = {};
          this.observerMap = {};
          this.initializeView();
        }
        View.prototype.initializeView = function() {};
        View.prototype.registerObserver = function(notificationName, observer) {
          var observers = this.observerMap[notificationName];
          observers ? observers.push(observer) : this.observerMap[notificationName] = [ observer ];
        };
        View.prototype.removeObserver = function(notificationName, notifyContext) {
          var observers = this.observerMap[notificationName];
          var i = observers.length;
          while (i--) {
            var observer = observers[i];
            if (observer.compareNotifyContext(notifyContext)) {
              observers.splice(i, 1);
              break;
            }
          }
          0 == observers.length && delete this.observerMap[notificationName];
        };
        View.prototype.notifyObservers = function(notification) {
          var notificationName = notification.getName();
          var observersRef = this.observerMap[notificationName];
          if (observersRef) {
            var observers = observersRef.slice(0);
            var len = observers.length;
            for (var i = 0; i < len; i++) {
              var observer = observers[i];
              observer.notifyObserver(notification);
            }
          }
        };
        View.prototype.registerMediator = function(mediator) {
          var name = mediator.getMediatorName();
          if (this.mediatorMap[name]) return;
          this.mediatorMap[name] = mediator;
          var interests = mediator.listNotificationInterests();
          var len = interests.length;
          if (len > 0) {
            var observer = new Observer(mediator.handleNotification, mediator);
            for (var i = 0; i < len; i++) this.registerObserver(interests[i], observer);
          }
          mediator.onRegister();
        };
        View.prototype.retrieveMediator = function(mediatorName) {
          return this.mediatorMap[mediatorName] || null;
        };
        View.prototype.removeMediator = function(mediatorName) {
          var mediator = this.mediatorMap[mediatorName];
          if (!mediator) return null;
          var interests = mediator.listNotificationInterests();
          var i = interests.length;
          while (i--) this.removeObserver(interests[i], mediator);
          delete this.mediatorMap[mediatorName];
          mediator.onRemove();
          return mediator;
        };
        View.prototype.hasMediator = function(mediatorName) {
          return this.mediatorMap[mediatorName] = null;
        };
        View.getInstance = function() {
          View.instance || (View.instance = new View());
          return View.instance;
        };
        View.SINGLETON_MSG = "View singleton already constructed!";
        return View;
      }();
      var Notifier = function() {
        function Notifier() {}
        Notifier.prototype.sendNotification = function(name, body, type) {
          void 0 === body && (body = null);
          void 0 === type && (type = null);
          puremvc.Facade.getInstance().sendNotification(name, body, type);
        };
        return Notifier;
      }();
      var MacroCommand = function(_super) {
        __extends(MacroCommand, _super);
        function MacroCommand() {
          var _this = _super.call(this) || this;
          _this.subCommands = null;
          _this.subCommands = [];
          _this.initializeMacroCommand();
          return _this;
        }
        MacroCommand.prototype.initializeMacroCommand = function() {};
        MacroCommand.prototype.addSubCommand = function(commandClassRef) {
          this.subCommands.push(commandClassRef);
        };
        MacroCommand.prototype.execute = function(notification) {
          var subCommands = this.subCommands.slice(0);
          var len = this.subCommands.length;
          for (var i = 0; i < len; i++) {
            var commandClassRef = subCommands[i];
            var commandInstance = new commandClassRef();
            commandInstance.execute(notification);
          }
          this.subCommands.splice(0);
        };
        return MacroCommand;
      }(Notifier);
      puremvc.MacroCommand = MacroCommand;
      var SimpleCommand = function(_super) {
        __extends(SimpleCommand, _super);
        function SimpleCommand() {
          return null !== _super && _super.apply(this, arguments) || this;
        }
        SimpleCommand.prototype.execute = function(notification) {};
        return SimpleCommand;
      }(Notifier);
      puremvc.SimpleCommand = SimpleCommand;
      var Mediator = function(_super) {
        __extends(Mediator, _super);
        function Mediator(mediatorName, viewComponent) {
          void 0 === mediatorName && (mediatorName = null);
          void 0 === viewComponent && (viewComponent = null);
          var _this = _super.call(this) || this;
          _this.mediatorName = null;
          _this.viewComponent = null;
          _this.mediatorName = null != mediatorName ? mediatorName : Mediator.NAME;
          _this.viewComponent = viewComponent;
          return _this;
        }
        Mediator.prototype.getMediatorName = function() {
          return this.mediatorName;
        };
        Mediator.prototype.getViewComponent = function() {
          return this.viewComponent;
        };
        Mediator.prototype.setViewComponent = function(viewComponent) {
          this.viewComponent = viewComponent;
        };
        Mediator.prototype.listNotificationInterests = function() {
          return new Array();
        };
        Mediator.prototype.handleNotification = function(notification) {};
        Mediator.prototype.onRegister = function() {};
        Mediator.prototype.onRemove = function() {};
        Mediator.NAME = "Mediator";
        return Mediator;
      }(Notifier);
      var Observer = function() {
        function Observer(notifyMethod, notifyContext) {
          this.notify = null;
          this.context = null;
          this.setNotifyMethod(notifyMethod);
          this.setNotifyContext(notifyContext);
        }
        Observer.prototype.getNotifyMethod = function() {
          return this.notify;
        };
        Observer.prototype.setNotifyMethod = function(notifyMethod) {
          this.notify = notifyMethod;
        };
        Observer.prototype.getNotifyContext = function() {
          return this.context;
        };
        Observer.prototype.setNotifyContext = function(notifyContext) {
          this.context = notifyContext;
        };
        Observer.prototype.notifyObserver = function(notification) {
          this.getNotifyMethod().call(this.getNotifyContext(), notification);
        };
        Observer.prototype.compareNotifyContext = function(object) {
          return object === this.context;
        };
        return Observer;
      }();
      var Notification = function() {
        function Notification(name, body, type) {
          void 0 === body && (body = null);
          void 0 === type && (type = null);
          this.name = null;
          this.body = null;
          this.type = null;
          this.name = name;
          this.body = body;
          this.type = type;
        }
        Notification.prototype.getName = function() {
          return this.name;
        };
        Notification.prototype.setBody = function(body) {
          this.body = body;
        };
        Notification.prototype.getBody = function() {
          return this.body;
        };
        Notification.prototype.setType = function(type) {
          this.type = type;
        };
        Notification.prototype.getType = function() {
          return this.type;
        };
        Notification.prototype.toString = function() {
          var msg = "Notification Name: " + this.getName();
          msg += "\nBody:" + (null == this.getBody() ? "null" : this.getBody().toString());
          msg += "\nType:" + (null == this.getType() ? "null" : this.getType());
          return msg;
        };
        return Notification;
      }();
      var Proxy = function(_super) {
        __extends(Proxy, _super);
        function Proxy(proxyName, data) {
          void 0 === proxyName && (proxyName = null);
          void 0 === data && (data = null);
          var _this = _super.call(this) || this;
          _this.proxyName = null;
          _this.data = null;
          _this.proxyName = null != proxyName ? proxyName : Proxy.NAME;
          null != data && _this.setData(data);
          return _this;
        }
        Proxy.prototype.getProxyName = function() {
          return this.proxyName;
        };
        Proxy.prototype.setData = function(data) {
          this.data = data;
        };
        Proxy.prototype.getData = function() {
          return this.data;
        };
        Proxy.prototype.onRegister = function() {};
        Proxy.prototype.onRemove = function() {};
        Proxy.NAME = "Proxy";
        return Proxy;
      }(Notifier);
      puremvc.Proxy = Proxy;
      var Facade = function() {
        function Facade() {
          this.model = null;
          this.view = null;
          this.controller = null;
          if (Facade.instance) throw Error(Facade.SINGLETON_MSG);
          Facade.instance = this;
          this.initializeFacade();
        }
        Facade.prototype.initializeFacade = function() {
          this.initializeModel();
          this.initializeController();
          this.initializeView();
        };
        Facade.prototype.initializeModel = function() {
          this.model || (this.model = Model.getInstance());
        };
        Facade.prototype.initializeController = function() {
          this.controller || (this.controller = Controller.getInstance());
        };
        Facade.prototype.initializeView = function() {
          this.view || (this.view = View.getInstance());
        };
        Facade.prototype.registerCommand = function(notificationName, commandClassRef) {
          this.controller.registerCommand(notificationName, commandClassRef);
        };
        Facade.prototype.removeCommand = function(notificationName) {
          this.controller.removeCommand(notificationName);
        };
        Facade.prototype.hasCommand = function(notificationName) {
          return this.controller.hasCommand(notificationName);
        };
        Facade.prototype.getProxy = function(proxyClass) {
          this.model.hasProxy(proxyClass) || this.model.registerProxy(proxyClass);
          return this.model.retrieveProxy(proxyClass);
        };
        Facade.prototype.removeProxy = function(proxyName) {
          var proxy;
          this.model && (proxy = this.model.removeProxy(proxyName));
          return proxy;
        };
        Facade.prototype.hasProxy = function(proxyName) {
          return this.model.hasProxy(proxyName);
        };
        Facade.prototype.registerMediator = function(mediator) {
          this.view && this.view.registerMediator(mediator);
        };
        Facade.prototype.retrieveMediator = function(mediatorName) {
          return this.view.retrieveMediator(mediatorName);
        };
        Facade.prototype.removeMediator = function(mediatorName) {
          var mediator;
          this.view && (mediator = this.view.removeMediator(mediatorName));
          return mediator;
        };
        Facade.prototype.hasMediator = function(mediatorName) {
          return this.view.hasMediator(mediatorName);
        };
        Facade.prototype.notifyObservers = function(notification) {
          this.view && this.view.notifyObservers(notification);
        };
        Facade.prototype.sendNotification = function(name, body, type) {
          void 0 === body && (body = null);
          void 0 === type && (type = null);
          this.notifyObservers(new Notification(name, body, type));
        };
        Facade.getInstance = function() {
          Facade.instance || (Facade.instance = new Facade());
          return Facade.instance;
        };
        Facade.SINGLETON_MSG = "Facade singleton already constructed!";
        return Facade;
      }();
      puremvc.Facade = Facade;
      var TMediator = function(_super) {
        __extends(TMediator, _super);
        function TMediator(viewComponent) {
          var _this = this;
          TMediator._mediator_id++;
          var mediatorName = "Mediator_" + TMediator._mediator_id;
          _this = _super.call(this, mediatorName, viewComponent) || this;
          return _this;
        }
        TMediator.prototype.onLoad = function() {
          puremvc.Facade.getInstance().registerMediator(this);
        };
        TMediator.prototype.onDestroy = function() {
          puremvc.Facade.getInstance().removeMediator(this.getMediatorName());
        };
        TMediator.prototype.onRegister = function() {};
        TMediator.prototype.onRemove = function() {};
        TMediator.prototype.listNotificationInterests = function() {
          var viewComponent = this.getViewComponent();
          return viewComponent.listNotificationInterests();
        };
        TMediator.prototype.handleNotification = function(notification) {
          var viewComponent = this.getViewComponent();
          return viewComponent.handleNotification(notification);
        };
        TMediator._mediator_id = 0;
        return TMediator;
      }(Mediator);
      var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
      var Component = function(_super) {
        __extends(Component, _super);
        function Component() {
          var _this = _super.call(this) || this;
          _this.mediator_ = null;
          _this.mediator_ = new TMediator(_this);
          return _this;
        }
        Component.prototype.onLoad = function() {
          this.mediator_.onLoad();
        };
        Component.prototype.onDestroy = function() {
          this.mediator_.onDestroy();
        };
        Component.prototype.listNotificationInterests = function() {
          return [];
        };
        Component.prototype.handleNotification = function(notification) {};
        Component = __decorate([ ccclass ], Component);
        return Component;
      }(cc.Component);
      puremvc.Component = Component;
      var TProxy = function(_super) {
        __extends(TProxy, _super);
        function TProxy(proxyName, data) {
          void 0 === data && (data = null);
          var _this = this;
          data = null != data ? data : {};
          _this = _super.call(this, proxyName, data) || this;
          return _this;
        }
        return TProxy;
      }(Proxy);
      puremvc.TProxy = TProxy;
    })(puremvc = exports.puremvc || (exports.puremvc = {}));
    cc._RF.pop();
  }, {} ],
  sdkManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a00b2EjBnhAoZsp9Z+iIOGs", "sdkManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.platformEnum = void 0;
    var adManager_1 = require("./AD/adManager");
    var iapManager_1 = require("./Iap/iapManager");
    var VibrateManager_1 = require("./Vibrate/VibrateManager");
    var gameCenter_1 = require("./gameCenter/gameCenter");
    var localStorageProxy_1 = require("../localStorageProxy");
    var puremvc_1 = require("../puremvc");
    var facebookSdk_1 = require("./FacebookSdk/facebookSdk");
    var ZJTDSdk_1 = require("./ZJTD/ZJTDSdk");
    var WXSdk_1 = require("./WX/WXSdk");
    var platformEnum;
    (function(platformEnum) {
      platformEnum["ios"] = "ios";
      platformEnum["ZJTD"] = "ZJTD";
      platformEnum["WX"] = "WX";
      platformEnum["FB"] = "FB";
      platformEnum["default"] = "default";
    })(platformEnum = exports.platformEnum || (exports.platformEnum = {}));
    var sdkManager = function() {
      function sdkManager() {}
      sdkManager.init = function() {
        switch (cc.sys.platform) {
         case cc.sys.WECHAT_GAME:
          this.platForm = platformEnum.WX;
          this.WXSdk = new WXSdk_1.default();
          break;

         case cc.sys.BYTEDANCE_GAME:
          this.platForm = platformEnum.ZJTD;
          this.ZJTDSdk = new ZJTDSdk_1.default();
          break;

         case cc.sys.IPHONE:
          this.platForm = platformEnum.ios;
          this.gameCenter = new gameCenter_1.default();
          this.facebookSdk = new facebookSdk_1.default();
          this.iapManager = new iapManager_1.default();
          break;

         case cc.sys.FB_PLAYABLE_ADS:
          this.platForm = platformEnum.FB;
          break;

         default:
          this.platForm = platformEnum.default;
        }
        cc.log("\u5e73\u53f0\uff1a", this.platForm, "  platform:", cc.sys.platform);
        this.localStorageProxy = puremvc_1.puremvc.Facade.getInstance().getProxy(localStorageProxy_1.default);
        this.adManager = new adManager_1.default();
        this.VibrateManager = new VibrateManager_1.default();
      };
      sdkManager.update = function(dt) {
        this.adManager.adTimeVal <= this.adManager.adDisTime && (this.adManager.adTimeVal += dt);
        this.timeV += dt;
        if (this.timeV > this.timeD && this.platForm == platformEnum.ios) {
          var time = this.localStorageProxy.getItem(localStorageProxy_1.storageKey.gameTime);
          time += this.timeV;
          this.localStorageProxy.setItem(localStorageProxy_1.storageKey.gameTime, time);
          this.timeV = 0;
          this.gameCenter.gameCenter(time.toString(), "gametime.hnkj");
        }
      };
      sdkManager.platForm = platformEnum.default;
      sdkManager.timeD = 1;
      sdkManager.timeV = 0;
      sdkManager.localStorageProxy = null;
      return sdkManager;
    }();
    exports.default = sdkManager;
    cc._RF.pop();
  }, {
    "../localStorageProxy": "localStorageProxy",
    "../puremvc": "puremvc",
    "./AD/adManager": "adManager",
    "./FacebookSdk/facebookSdk": "facebookSdk",
    "./Iap/iapManager": "iapManager",
    "./Vibrate/VibrateManager": "VibrateManager",
    "./WX/WXSdk": "WXSdk",
    "./ZJTD/ZJTDSdk": "ZJTDSdk",
    "./gameCenter/gameCenter": "gameCenter"
  } ],
  test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d84a6EQg/FF5bJR+h4wDzAx", "test");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = void 0;
    var test = function() {
      function test() {}
      return test;
    }();
    exports.test = test;
    cc._RF.pop();
  }, {} ],
  xlsx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "78bcanpZ8tAVLu/nQf5eh2v", "xlsx");
    cc._RF.pop();
  }, {} ]
}, {}, [ "test", "xlsx", "cardOne", "game", "gameManage", "PersistRootNode", "feacebookIG", "IronSource", "ironManager", "OPPOAdManager", "WXAdManager", "ZJTDAdManager", "adManager", "facebookSdk", "iapManager", "VibrateManager", "WXSdk", "ZJTDSdk", "ZZSdk", "gameCenter", "sdkManager", "adaptation", "audioEngineProxy", "baseComponent", "commonCommand", "effectProxy", "eventMgr", "gameApp", "gameConfig", "gameProxy", "jsonUtil", "loadManage", "localStorageProxy", "loopScrollViewNew", "msgConfig", "puremvc" ]);