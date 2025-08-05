// /Users/nikhil.niket/Desktop/audio-recorder-app/public/script.js
let recorder, audioChunks;
let sample1Blob = null, sample2Blob = null;

function startRecording(sampleNum) {
  audioChunks = [];
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => audioChunks.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioURL = URL.createObjectURL(audioBlob);
        document.getElementById(`audio${sampleNum}`).src = audioURL;
        document.getElementById(`audio${sampleNum}`).classList.remove('hidden');
        if (sampleNum === 1) sample1Blob = audioBlob;
        else sample2Blob = audioBlob;
      };
      recorder.start();
      document.getElementById(`start${sampleNum}`).disabled = true;
      document.getElementById(`stop${sampleNum}`).disabled = false;
    });
}

function stopRecording(sampleNum) {
  recorder.stop();
  document.getElementById(`stop${sampleNum}`).disabled = true;
  if (sampleNum === 1) {
    document.getElementById('sample2').classList.remove('hidden');
  } else {
    document.getElementById('submitBtn').classList.remove('hidden');
  }
}

document.getElementById('start1').onclick = () => startRecording(1);
document.getElementById('stop1').onclick = () => stopRecording(1);
document.getElementById('start2').onclick = () => startRecording(2);
document.getElementById('stop2').onclick = () => stopRecording(2);

document.getElementById('candidateForm').onsubmit = async function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  if (!sample1Blob || !sample2Blob) {
    alert('Please record both samples.');
    return;
  }
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('sample1', sample1Blob, 'sample1.webm');
  formData.append('sample2', sample2Blob, 'sample2.webm');
  document.getElementById('submitBtn').disabled = true;
  await fetch('/api/save_audio', {
    method: 'POST',
    body: formData
  });
  document.getElementById('candidateForm').classList.add('hidden');
  document.getElementById('thankyou').classList.remove('hidden');
};
