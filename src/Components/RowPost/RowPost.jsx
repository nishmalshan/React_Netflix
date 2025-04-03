import {useState, useEffect} from 'react'
import YouTube from 'react-youtube'
import PropTypes from 'prop-types'  // Import PropTypes
import './RowPost.css'
import axios from 'axios'
import { API_KEY, imageUrl } from '../../Constants/constants'

function RowPost(props) {


  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState('')

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results)
    }).catch((err) => {
      console.log(err);
    })
  }, [props.url])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const handleMovie = (id) => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0])
      } else {
        console.log('Array empty');
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {movies.map((obj) => (
            <img onClick={() => handleMovie(obj.id)} key={obj.id} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl}${obj.backdrop_path}`} />
          ))}
        </div>
        {urlId && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  )
}

// **Define prop types**
RowPost.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSmall: PropTypes.bool,
};

export default RowPost;
