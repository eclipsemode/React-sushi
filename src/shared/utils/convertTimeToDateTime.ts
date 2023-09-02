export default function convertTimeToDateTime(time: string) {
    const [hours, minutes] = time.split(':');
    const now = new Date();
    const dateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +hours, +minutes);

    return dateTime.toISOString().slice(0, 19).replace('T', ' ');
}