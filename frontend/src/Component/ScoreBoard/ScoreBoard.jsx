import React from 'react'
import ColorTabs from '../InnerScoreBoard/InnerScoreBoard'
import './ScoreBoard.css'

const ScoreBoard = ({isHighlightDisplay,setIsHighlightDisplay,liveData,cricketApiSocket,cricketSocket,firstInningsExtra,secondInningsExtra}) => {
  return (
    <div>
      <ColorTabs isHighlightDisplay={isHighlightDisplay} setIsHighlightDisplay={setIsHighlightDisplay} firstInningsExtra={firstInningsExtra} secondInningsExtra={secondInningsExtra} liveData={liveData} cricketSocket={cricketSocket} cricketApiSocket={cricketApiSocket}/>
    </div>
  )
}

export default ScoreBoard
