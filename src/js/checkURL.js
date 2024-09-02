function isValidUrl(url) {
    // Regular expression for validating a URL
    const regex = /^(https?:\/\/)?(www\.)?([^\s.]+\.[^\s]{2,}|localhost)(\/\S*)?$/;
    return regex.test(url);
}

export { isValidUrl };
