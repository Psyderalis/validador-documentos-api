let storedUrl = null

const setUrl = (url) => {
    storedUrl = url
};

const getUrl = () => {
    return storedUrl
}

export {
    setUrl,
    getUrl
}