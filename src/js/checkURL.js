function isValidUrl(url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

export { isValidUrl };
