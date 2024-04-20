import axios from 'axios';
import { useRef, useState } from 'react'
import { youtube_parser } from './utiles';
// import './App.css'

function App() {

  const InputRef = useRef();
  const [link, setLink] = useState(null);
  const handelSubmit = (e) => {
    e.preventDefault();
    InputRef.current.value;
    const vidId = youtube_parser(InputRef.current.value)
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
        console.log(res.data.link);
        setLink(res.data.link);
        console.log(res);
      }).catch((err) => {
        console.log("error mother fucker",err);
      }
      )
      InputRef.current.value = '';
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
          This is a simple youtube to mp3 converter. Just paste the youtube link and click on search Button, if the link is valid The converted mp3 will be downloaded automatically.
        </p>
        <form className='form' onSubmit={handelSubmit}>
          <input ref={InputRef} className='formInput' type="text" name='link'
            placeholder='past a Youtube video link to download...'
          />
          <button className='formButton' type='submit'>Search</button>
        </form>
        {
          link ? <a className='downloadBtn' target='_balnk' rel='noreferrer' href={link}> Download Mp3</a>:''
        }
      </section>
    </div>
  )
}

export default App
