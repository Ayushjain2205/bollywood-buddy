import React, { Component } from 'react'
import Navbar from './Navbar'
import Crossword from '@jaredreisinger/react-crossword'

const data = {
  across: {
    2: {
      clue: ' Dilip kumar : yousuf :: rajesh khanna : ?',
      answer: 'JATIN',
      row: 0,
      col: 0,
    },
    3: {
      clue: ' First indian sound film',
      answer: 'SHAMI',
      row: 3,
      col: 2,
    },
    6: {
      clue: ' Shah rukh khans debut movie',
      answer: 'FAUJI',
      row: 5,
      col: 4,
    },
    8: {
      clue: 'Arjun kapoor debut film',
      answer: 'ISHAQZADE',
      row: 7,
      col: 0,
    },
  },
  down: {
    1: {
      clue:
        ' A bolywood actress (Name) whose ancestor played an important role in the construction of Eiffel Tower',
      answer: 'KALKI',
      row: 0,
      col: 2,
    },
    4: {
      clue: ' A vishal Bharadwaj film (Macbeth, Othello, ?)',
      answer: 'MAQBOL',
      row: 0,
      col: 4,
    },
    5: {
      clue:
        'In Andaz Apna Apna, whats the name of the film that Juhi Chawla and Govinda are shooting for in Amars dream.',
      answer: 'PEHRA',
      row: 6,
      col: 1,
    },
    7: {
      clue: 'Who suggested the title of the film Dilwale Dulhania Le Jayenge',
      answer: 'KIRONKHER',
      row: 1,
      col: 8,
    },
  },
}

export class MoviePage extends Component {
  componentDidMount() {}
  render() {
    const id = this.props.match.params.id.substring(1)
    return (
      <div>
        <Navbar />
        <h1>Movie {id}</h1>
        <div className="crossword">
          <Crossword
            data={data}
            theme={{
              gridBackground: '#0f1626',
              focusBackground: '#f00',
              highlightBackground: '#f99',
            }}
          />
        </div>
      </div>
    )
  }
}

export default MoviePage
