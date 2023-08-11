function setCookie(name: string, value: string, expDays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function checkCookieExpire(name: string) {
    const cookies = document.cookie.split('; ');
    return cookies.find((cookie) => cookie.match(name));
}

export {setCookie, checkCookieExpire};