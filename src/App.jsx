import axios from 'axios';
import { useRef, useState } from 'react';
import { youtube_parser } from './utiles';

function App() {
  const InputRef = useRef();
  const [link, setLink] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();

    const urlValue = InputRef.current.value;
    const vidId = youtube_parser(urlValue);
    if (!vidId) {
      alert("Invalid YouTube URL");
      return;
    }

    const options = {
      method: 'GET',
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: vidId },
      headers: {
        'X-RapidAPI-Key': '3ed68d23b9msheae5f93368f05f2p196e93jsnab1d0e3fd7d6',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    }
    
    axios(options)
      .then((res) => {
        setLink(res.data.link);
        setDownloaded(false); // reset download state for new video
      })
      .catch((err) => {
        console.error("Error fetching mp3 link", err);
      });

    InputRef.current.value = '';
  }

  const handleDownloadClick = () => {
    setDownloaded(true); // hide button after click
  }

  return (
    <div className='app'>
      <div className='logoContainer'>
        <img src="./logo.png" alt="" />
        <span className='logo'>Youtube to mp3 Downloader</span>
      </div>
      <section className="content">
        <h1 className='contentTitle'>
          Convert youtube videos to mp3
        </h1>
        <p className="contentDescription">
          Paste the YouTube link and click Search. If valid, your mp3 will be ready to download.
        </p>
        <form className='form' onSubmit={handelSubmit}>
          <input
            ref={InputRef}
            className='formInput'
            type="text"
            name='link'
            placeholder='Paste a YouTube video link to download...'
          />
          <button className='formButton' type='submit'>Search</button>
        </form>

        {
          link && !downloaded &&
          <a
            className='downloadBtn'
            target='_blank'
            rel='noreferrer'
            href={link}
            onClick={handleDownloadClick}
          >
            Download Mp3
          </a>
        }
      </section>
    </div>
  )
}

export default App
