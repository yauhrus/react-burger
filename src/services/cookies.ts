export function getCookie(name: 'accessToken' | 'refreshToken') {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: 'accessToken' | 'refreshToken', value: string | null, props?: {[key: string]: number | Date | string | boolean}) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date) {
    exp = exp.toUTCString();
  }
  if (value === null) {
    value = '';
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  updatedCookie += ';path=/';

  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: 'accessToken' | 'refreshToken') {
  setCookie(name, null, {expires: -1});
}