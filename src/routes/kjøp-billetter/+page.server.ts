export async function load(event) {
    const url = new URL(event.url);
    const showCode = url.searchParams.get('showCode');
    const childValue = url.searchParams.get('childValue');
    const adultValue = url.searchParams.get('adultValue');
    return { showCode, childValue, adultValue };
}