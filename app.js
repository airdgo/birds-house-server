const express = require('express');
const app = express();

const port = 2000;

const { proxy, scriptUrl } = require('rtsp-relay')(app);

const handler = proxy({
    url: `rtsp://croco:0723593424Jv@64310561b855.sn.mynetname.net:11554/Streaming/Channels/102`,
    verbose: false,
    transport: "tcp",
    additionalFlags: ['-q', '1']
});

app.ws('/api/stream', handler);

app.get('/', (req, res) =>
    res.send("Hello World"),
);

app.get('/webcam', (req, res) =>
    res.send(`
  <canvas id='canvas' width="800" height="400"></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'wss://' + location.host + '/api/stream',
      canvas: document.getElementById('canvas')
    });
  </script>
`),
);

app.listen(process.env.PORT || port, () => console.log(`Server is running at http://localhost:${port}`));
