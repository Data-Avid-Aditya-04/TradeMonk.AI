import https from 'https';

const ELEVENLABS_KEY = 'sk_ebeab8e124ab02394badc413ed0723c1d1b02b9f4d85260f';
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; 

async function testTTS() {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const data = JSON.stringify({
    text: "Hello",
    model_id: "eleven_multilingual_v2"
  });

  return new Promise((resolve) => {
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_KEY,
        'Content-Length': data.length
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log("[ELEVENLABS TTS] -> SUCCESS (200 OK)");
        } else {
          console.log(`[ELEVENLABS TTS] -> FAILED (${res.statusCode}): ${body}`);
        }
        resolve();
      });
    });
    req.on('error', (e) => {
      console.log(`[ELEVENLABS TTS] -> ERROR: ${e.message}`);
      resolve();
    });
    req.write(data);
    req.end();
  });
}

testTTS();
