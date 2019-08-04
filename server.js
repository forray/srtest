const http = require('http'),
url = require('url'),
playlistUrl = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
{ Playlist, PlaylistTypeFilter, RenditionSortOrder,ChunklistPruneType } = require('dynamic-hls-proxy');


makeServer = function (request,response){
    let path = url.parse(request.url).pathname;
    console.log(path);
    if(path === '/test.m3u8'){
        response.writeHead(200,{'Content-Type':'application/x-mpegURL'});
        //response.write(playlistUrl);
        Playlist.loadFromUrl(playlistUrl).then(function (playlist) {
                                               playlist
                                               .setTypeFilter(PlaylistTypeFilter.VideoAndAudio)
                                               .sortByBandwidth(RenditionSortOrder.bestFirst)
                                               .useDynamicChunklists(true)
                                               .setLimit(1);
                                               //console.log(playlist.toString());
                                               response.write(playlist.toString());
                                               });
    }
    response.end();
},
server = http.createServer(makeServer);

server.listen(8888,()=>{
    console.log('Node server created at port 8888');
});







