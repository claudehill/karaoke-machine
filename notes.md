# Dev Notes

### Calling youtube API for search:

> Found Video Describing Process
```
https://www.youtube.com/watch?v=-vH2eZAM30s

Youtube Search List
gapi.client.youtube.search.list
    part: 'snippet',
    type: 'video',
    q: encodeURIComponent ... replace ( %20 ... )
    maxResults: 5,
    order: viewCount
```

#### API Docs
https://developers.google.com/youtube/v3/docs/search/list
