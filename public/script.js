// /Users/nikhil.niket/Desktop/audio-recorder-app/public/script.js
let recorder, audioChunks;
let sample1Blob = null, sample2Blob = null;
let currentSample = 1;

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
        
        // Enable re-record button
        document.getElementById(`rerecord${sampleNum}`).classList.remove('hidden');
        document.getElementById(`rerecord${sampleNum}`).disabled = false;
      };
      recorder.start();
      document.getElementById(`start${sampleNum}`).disabled = true;
      document.getElementById(`stop${sampleNum}`).disabled = false;
      
      // Update recording status
      document.getElementById(`status${sampleNum}`).textContent = 'Recording...';
      document.getElementById(`status${sampleNum}`).className = 'status recording';
    })
    .catch(err => {
      console.error('Error accessing microphone:', err);
      alert('Error accessing microphone. Please check permissions and try again.');
    });
}

function stopRecording(sampleNum) {
  if (recorder && recorder.state === 'recording') {
    recorder.stop();
    document.getElementById(`stop${sampleNum}`).disabled = true;
    document.getElementById(`status${sampleNum}`).textContent = 'Recording completed';
    document.getElementById(`status${sampleNum}`).className = 'status completed';
    
    if (sampleNum === 1) {
      document.getElementById('sample2').classList.remove('hidden');
    } else {
      document.getElementById('submitBtn').classList.remove('hidden');
    }
  }
}

function rerecord(sampleNum) {
  // Clear previous recording
  if (sampleNum === 1) {
    sample1Blob = null;
    document.getElementById('audio1').classList.add('hidden');
    document.getElementById('sample2').classList.add('hidden');
    document.getElementById('submitBtn').classList.add('hidden');
  } else {
    sample2Blob = null;
    document.getElementById('audio2').classList.add('hidden');
    document.getElementById('submitBtn').classList.add('hidden');
  }
  
  // Reset buttons
  document.getElementById(`start${sampleNum}`).disabled = false;
  document.getElementById(`stop${sampleNum}`).disabled = true;
  document.getElementById(`rerecord${sampleNum}`).classList.add('hidden');
  document.getElementById(`status${sampleNum}`).textContent = 'Ready to record';
  document.getElementById(`status${sampleNum}`).className = 'status ready';
}

// Event listeners
document.getElementById('start1').onclick = () => startRecording(1);
document.getElementById('stop1').onclick = () => stopRecording(1);
document.getElementById('rerecord1').onclick = () => rerecord(1);
document.getElementById('start2').onclick = () => startRecording(2);
document.getElementById('stop2').onclick = () => stopRecording(2);
document.getElementById('rerecord2').onclick = () => rerecord(2);

document.getElementById('candidateForm').onsubmit = async function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  
  if (!name) {
    alert('Please enter your name.');
    return;
  }
  
  if (!sample1Blob || !sample2Blob) {
    alert('Please record both samples.');
    return;
  }
  
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email || 'no-email@provided.com'); // Default email if not provided
  formData.append('sample1', sample1Blob, 'sample1.webm');
  formData.append('sample2', sample2Blob, 'sample2.webm');
  
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('submitBtn').textContent = 'Submitting...';
  
  try {
    const response = await fetch('/api/save_audio', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      document.getElementById('candidateForm').classList.add('hidden');
      document.getElementById('thankyou').classList.remove('hidden');
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error submitting your recording. Please try again.');
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('submitBtn').textContent = 'Submit';
  }
};
