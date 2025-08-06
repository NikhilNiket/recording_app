# 🎤 Audio Recorder Application

A modern web application for capturing and storing audio recordings from candidates. Built with FastAPI, Supabase, and deployed on Vercel.

## ✨ Features

- **🎙️ Audio Recording**: Capture high-quality audio samples using the browser's MediaRecorder API
- **🔄 Re-record Functionality**: Users can re-record if they're not satisfied with their audio
- **📝 Two Sample Texts**: Predefined text samples for consistent audio collection
- **📧 Optional Email**: Email field is optional, only name is required
- **🎨 Beautiful UI**: Modern, responsive design with professional styling
- **☁️ Cloud Storage**: Audio files stored securely in Supabase Storage
- **🚀 Serverless**: Deployed on Vercel for scalability and reliability
- **📱 Mobile Responsive**: Works perfectly on desktop and mobile devices

## 🏗️ Architecture

```
Frontend (HTML/CSS/JS) → Vercel → FastAPI Backend → Supabase Storage
```

- **Frontend**: Static HTML/CSS/JavaScript served by Vercel
- **Backend**: FastAPI serverless function on Vercel
- **Storage**: Supabase Storage for audio file management
- **Deployment**: Vercel for hosting and serverless functions

## 📋 Prerequisites

- Python 3.8+
- Node.js (for local development)
- Supabase account
- Vercel account
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd audio-recorder-app
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Create a storage bucket named `audio-recordings`
3. Get your project URL and service role key from Project Settings → API

### 3. Local Development

#### Install Dependencies

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

#### Set Up Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
```

#### Run Locally

```bash
# Terminal 1: Start FastAPI backend
uvicorn api.save_audio:app --reload

# Terminal 2: Serve frontend
cd public
python3 -m http.server 3000
```

Visit `http://localhost:3000` to test the application.

### 4. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and create a new project
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_KEY`: Your Supabase service role key
5. Deploy

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts and add environment variables
```

## 📁 Project Structure

```
audio-recorder-app/
├── api/
│   └── save_audio.py          # FastAPI backend endpoint
├── public/
│   ├── index.html             # Main application page
│   ├── script.js              # Frontend JavaScript
│   └── styles.css             # Application styling
├── requirements.txt           # Python dependencies
├── vercel.json               # Vercel configuration
└── README.md                 # This file
```

## 🎯 Usage

### For Candidates

1. **Enter Information**: Fill in your name (required) and email (optional)
2. **Record Sample 1**: Click "Start Recording" and read the first sample text
3. **Review & Re-record**: Listen to your recording and re-record if needed
4. **Record Sample 2**: Complete the second sample recording
5. **Submit**: Click "Submit Recordings" to upload your audio files

### Sample Texts

**Sample 1:**
> "The quick brown fox jumps over the lazy dog."

**Sample 2:**
> "Talview specializes in revolutionizing organizational interview and exam processes through its GenAI technology, emphasizing integrity, efficiency, and fairness. The platform employs advanced facial and voice recognition to ensure secure and non-intrusive remote interviewing and proctoring experiences. With a commitment to excellence, Talview has earned recognition as the #1 rated proctoring software provider, trusted by over 220,000 experts globally."

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_KEY` | Your Supabase service role key | Yes |

### Supabase Storage

- **Bucket Name**: `audio-recordings`
- **File Structure**: `{name}_{email}/sample1.webm` and `{name}_{email}/sample2.webm`
- **File Format**: WebM audio files

## 🛠️ Development

### Adding New Features

1. **Frontend Changes**: Modify files in the `public/` directory
2. **Backend Changes**: Update `api/save_audio.py`
3. **Styling**: Edit `public/styles.css`
4. **Dependencies**: Update `requirements.txt` for Python packages

### Testing

```bash
# Test backend locally
curl -X POST "http://127.0.0.1:8000/api/save_audio" \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "sample1=@/path/to/audio.webm" \
  -F "sample2=@/path/to/audio.webm"
```

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env` file exists locally
   - Check Vercel environment variables are set correctly

2. **Audio Recording Not Working**
   - Check browser permissions for microphone access
   - Ensure HTTPS in production (required for MediaRecorder API)

3. **Supabase Upload Fails**
   - Verify Supabase credentials
   - Check storage bucket permissions
   - Ensure bucket name matches exactly

4. **Vercel Deployment Issues**
   - Check build logs for errors
   - Verify `requirements.txt` includes all dependencies
   - Ensure proper file structure

### Debug Mode

Add logging to debug issues:

```python
# In api/save_audio.py
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 📊 Performance

- **Audio Quality**: WebM format with Opus codec
- **File Size**: Typically 50-200KB per recording
- **Upload Time**: Depends on file size and network speed
- **Storage**: Unlimited with Supabase (within plan limits)

## 🔒 Security

- **HTTPS Only**: Required for audio recording in production
- **CORS**: Configured for cross-origin requests
- **File Validation**: Audio files validated before upload
- **Environment Variables**: Sensitive data stored securely

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Check Supabase storage permissions
4. Open an issue on GitHub

## 🔄 Updates

- **v1.0.0**: Initial release with basic audio recording
- **v1.1.0**: Added re-record functionality and improved UI
- **v1.2.0**: Made email optional and enhanced error handling

---

**Built with ❤️ using FastAPI, Supabase, and Vercel** 