Profile Image api
===
Start
---
    node index.js
Configuration
---
    port: 5000

EndPoint
---
    /profile/image/:imageId
| Method |            Request          |                 Response                   |
|--------|---------------------------- |--------------------------------------------|
|  POST  |       id,<br>password       | success: boolean<br>message: string or jwt |
|  GET   | rotate,<br>width,<br>height | cache-control: max-age=290304000, public<br>status: 200<br>content-length: 10860<br>content-type: image/jpeg<br>last-modified: Sun, 18 Feb 2018 08:20:39 GMT |
