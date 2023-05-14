const isMobileOS = () => {
    return(/Android|iPhone|iPad|iPod|aarch64|webOS|IEMobile|BlackBerry|Opera Mini/i.test(window.navigator.userAgent));
}

export {
    isMobileOS
}