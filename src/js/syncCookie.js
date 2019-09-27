/**
 * @author yexiaosong
 * @email mryexiaoasong@live.com
 * @create date 2019-09-13 15:14:45
 * @modify date 2019-09-16 01:01:27
 * @desc [cookie sync]
 */

const ORIGIN = '.qiniu.com'
const TARGET = 'abc.eleme.test'

class CookieClass {
  constructor(originDomain, targetDomain) {
    this.cookieList = [];
    this.originDomain = originDomain;
    this.targetDomain = targetDomain;
  }

  getCookies() {
    chrome.cookies.getAll({}, back => {
      this.cookieList  = back.filter(_ => _.domain === this.originDomain);
      this.cookieList.forEach(item => {
        this.setCookies(item);
      })
    })
  }

  setCookies(cookie) {
    ['http', 'https'].forEach(portal => {
      chrome.cookies.set({
        name: cookie.name,
        "url": `${portal}://${this.targetDomain}`,
        value: cookie.value,
        expirationDate: cookie.expirationDate,
      }, function (cookie) {
          console.log(JSON.stringify(cookie));
      });
    })
  }

  removeCookies(name) {
    ['http', 'https'].forEach(portal => {
      chrome.cookies.remove({
        name,
        "url": `${portal}://${this.targetDomain}`,
      }, function (cookie) {
          console.log(JSON.stringify(cookie));
      });
    })
  }

  static getLength() {
    return this.cookieList.length();
  }
}

const cookieCache = new CookieClass(ORIGIN, TARGET);
cookieCache.getCookies();

function listen(info) {
  const { remove, cookie } = info;
  if (!cookie.domain.match(ORIGIN)) {
    return;
  }
  if (remove) {
    cookieCache.removeCookies(cookie.name);
  } else {
    cookieCache.setCookies(cookie);
  }
}

chrome.cookies.onChanged.addListener(listen);