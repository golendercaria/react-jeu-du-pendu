import React, { Component } from 'react'
import './App.css'
import Keyboard from './Keyboard'
import CurrentWord from './CurrentWord';
import Heart from './Heart'

class App extends Component {

	state = {
		wordCollection: ["programmation","wordpress", "gare", "train", "glace", "code", "licorne"],
		currentWord: null,
		alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split(''),
		usedLetter: [],
		win: 0, // 0 : neutral | -1 lost | 1 win
		attempt: 0,
		maxAttempt: 9
	}

	componentDidMount() { 

		window.addEventListener("keyup", (e) => {
			if (e.keyCode === 13) { 
				this.initGame()
			}
		})

		//this.initGame()
	}

	clickLetter = (letter) => {

		if (this.state.usedLetter.indexOf(letter) === -1) {

			let attempt = this.state.attempt
			const usedLetter = [letter, ...this.state.usedLetter]

			if (this.state.currentWord.indexOf(letter) === -1) {
				attempt = this.state.attempt + 1
			}

			let win = 1
			for (let i = 0; i < this.state.currentWord.length; i++) { 
				if (usedLetter.indexOf(this.state.currentWord[i]) === -1) { 
					win = 0
				}
			}

			if (attempt >= this.state.maxAttempt && win === 0) { 
				win = -1
			}

			this.setState({ usedLetter, attempt, win })

		}

	}

	pickNewWord = () => { 
		const randomIndex = Math.floor(Math.random() * this.state.wordCollection.length)
		return this.state.wordCollection[ randomIndex ]
	}

	initGame = () => { 

		this.setState({
			currentWord: this.pickNewWord(),
			usedLetter: [],
			win: 0,
			attempt: 0
		})

	}

	render() { 
		return (
			<div id="game">
				<h1>Pendu</h1>

				{
					(this.state.currentWord !== null) &&
						<CurrentWord
							currentWord={this.state.currentWord}
							usedLetter={this.state.usedLetter}
							win={this.state.win}
						/>
				}

				{
					(this.state.currentWord !== null) &&
						<Heart
							attempt={this.state.attempt}
							maxAttempt={this.state.maxAttempt}
						/>
				}

				{
					(this.state.win === 0 && this.state.currentWord !== null) &&
					<Keyboard
						alphabet={this.state.alphabet}
						usedLetter={this.state.usedLetter}
						action={this.clickLetter}
					/>
				}

				{
					this.state.win === 1 && 
						<p class="win_msg">WIN !!!</p>
				}
				{
					this.state.win === -1 && 
						<p class="lost_msg">LOST !!!</p>
				}

				{
					(this.state.currentWord === null || this.state.win !== 0) &&
						<button id="play_new_game" onClick={() => this.initGame()}>Nouvelle partie</button>
				}
			</div>
		)
	}
}


export default App;
