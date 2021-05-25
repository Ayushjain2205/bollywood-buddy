import React from 'react'
import { Link } from 'react-router-dom'

function ResultTile(result) {
  return (
    <div className="result-tile">
      <img className="img-tile" src={result.poster.raw} alt="" />
      <div className="tile-overlay">
        <div className="text">
          <h1 className="movie-name">
            {result.title.raw.replace(/ *\([^)]*\) */g, '')}
          </h1>
          <div className={`genre ${result.genre.raw}`}>{result.genre.raw}</div>
          {result.year.raw}
          <h5 className="cast">
            {result.actors.raw.length > 40
              ? result.actors.raw.slice(0, 37) + ' ...'
              : result.actors.raw}
          </h5>
          <div className="links">
            <a
              target="blank"
              className="link imdb"
              href={`https://www.imdb.com/title/${result.imdb_id.raw}`}
            >
              <i class="fab fa-imdb"></i>
            </a>
            <a target="blank" className="link wiki" href={result.wiki_link.raw}>
              <i class="fab fa-wikipedia-w"></i>
            </a>
          </div>
          <p className="summary">
            {result.summary.raw.length > 100
              ? result.summary.raw.slice(0, 97) + ' ...'
              : result.summary.raw}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResultTile
