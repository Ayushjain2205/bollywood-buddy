import React from 'react'
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector'
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch,
} from '@elastic/react-search-ui'
import { Layout } from '@elastic/react-search-ui-views'
import '@elastic/react-search-ui-views/lib/styles/styles.css'
import '../App.css'
import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields,
} from '../config/config-helper'
import HeaderLogo from './HeaderLogo'

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig()
const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
  endpointBase,
})
const config = {
  searchQuery: {
    facets: buildFacetConfigFromConfig(),
    ...buildSearchOptionsFromConfig(),
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
}

const ResultTile = ({ result }) => (
  <a href={`/movie/${result.imdb_id.raw}`}>
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
  </a>
)

export default function Homepage() {
  return (
    <div>
      <SearchProvider config={config}>
        <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
          {({ wasSearched }) => {
            return (
              <div className="App">
                <ErrorBoundary>
                  <Layout
                    header={
                      <div className="header-div">
                        <HeaderLogo />
                        <SearchBox
                          inputProps={{ placeholder: 'Search movies ...' }}
                          autocompleteSuggestions={true}
                        />
                      </div>
                    }
                    sideContent={
                      <div>
                        {wasSearched && (
                          <Sorting
                            label={'Sort by'}
                            sortOptions={buildSortOptionsFromConfig()}
                          />
                        )}
                        {getFacetFields().map((field) => (
                          <Facet key={field} field={field} label={field} />
                        ))}
                      </div>
                    }
                    bodyContent={
                      <Results
                        titleField={getConfig().titleField}
                        urlField={getConfig().urlField}
                        shouldTrackClickThrough={true}
                        resultView={ResultTile}
                      />
                    }
                    bodyHeader={
                      <React.Fragment>
                        {wasSearched && <PagingInfo />}
                        {wasSearched && <ResultsPerPage />}
                      </React.Fragment>
                    }
                    bodyFooter={<Paging />}
                  />
                </ErrorBoundary>
              </div>
            )
          }}
        </WithSearch>
      </SearchProvider>
    </div>
  )
}
