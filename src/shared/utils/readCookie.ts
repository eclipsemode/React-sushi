export default function readCookie(name: string) {

    const name_cook = name + "=";
    const spl = document.cookie.split(";");

    for (let i = 0; i < spl.length; i++) {
        let c = spl[i];

        while (c.charAt(0) == " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(name_cook) == 0) {
            return c.substring(name_cook.length, c.length);
        }
    }

    return null;

}