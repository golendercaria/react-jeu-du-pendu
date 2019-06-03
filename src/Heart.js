import React from 'react'
import './App.css'


const Heart = ({ attempt, maxAttempt }) => {
	return (
		<div id="life">
			{
				attemptToHeart(attempt, maxAttempt).map(
					(value, key) => { 
						return <span
							key={"heart_" + key}
							className={"heart "+ (value === 1 ? "full" : "empty") }></span>
					}
				)
			}
		</div>
	)
}

function attemptToHeart(attempt, maxAttempt) { 
	let hearts = []
	for (let i = 1; i <= maxAttempt; i++) { 
		if (i <= attempt) {
			hearts.push(0)
		} else { 
			hearts.push(1)
		}
	}
	return hearts
}

export default Heart