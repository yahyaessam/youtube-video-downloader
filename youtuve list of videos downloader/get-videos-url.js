let videosArr = [];
let channelVideos = '';
document.querySelectorAll('#contents ytd-rich-grid-row a').forEach((el) => { 
    videosArr.push(el.href)
});
let uniqe = new Set(videosArr);
uniqe.forEach((url) => {
    if (url && url != '') {
        url.slice(0, url.lastIndexOf('&'));
        channelVideos += url + ','
    }
});
channelVideos.lastIndexOf(',')