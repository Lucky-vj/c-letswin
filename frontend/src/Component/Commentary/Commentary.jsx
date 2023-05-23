import React,{useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Commentary.css'
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@mui/styles';
import { endpoints } from "../../auth/url";
import usercalls from "../../auth/endpoints";

const useStyles = makeStyles({

  borderwidth: {
     width: '100% !important',
     borderBottom: '1px solid rgba(224, 224, 224, 1)',
    '& td': {
      border: 'none'
    },
    '& :nth-last-child':{
      borderBottom: 'none !important',
    }
  }

});


// function createData(name, status, runs, balls, fours, sixes, strikerate) {
//   return { name, status, runs, balls, fours, sixes, strikerate };
// }

// function createBowlerData(Bowler, O, M, R, W, NB, WD, ECO) {
//     return { Bowler, O, M, R, W, NB, WD, ECO };
//   }

//   const bowlerrows = [
//     createBowlerData('Roach', 16, 6, 51, 1, 0, 0, 3.20),
//     createBowlerData('Jayden Seales', 16, 2, 60, 1, 2, 2, 3.80),
//   ];



// const rows = [
//   createData('Kraigg Brathwaite (c)', 'b Steketee', 47, 98, 7, 0, 47.96),
//   createData('Tagenarine Chanderpaul', 'b Steketee', 119, 293, 13, 1, 40.61),
//   createData('Nkrumah Bonner', 'b Steketee', 0, 3, 0, 0, 0.00),
//   createData('Devon Thomas', 'b Steketee', 8, 10, 2, 0, 80.00),
//   createData('Kyle Mayers', 'b Steketee', 6, 18, 1, 0, 33.33),
// ];

export default function Commentry({liveData,cricketSocket,cricketApiSocket,firstInningsExtra,secondInningsExtra}) {
// console.log(liveData,cricketSocket,cricketApiSocket,"commmmmmm");

// console.log(secondInningsExtra,'asdasd')

const [liveDataa, setLiveData] = useState(null)

const path = usercalls();

useEffect(()=>{
  const getData = async()=>{
    const url = `${endpoints.cricketTableData}`; 
    let payload ={match_key:liveData?.id}
    console.log(payload,'payload');
    try {
      const data = await path.postCall({ url,payload });
      const result = await data.json();
      setLiveData(result?.data)
    }
    catch(error){
    console.log(error);
    }
}
getData()
},[liveData?.id])

console.log( liveDataa?.firstInnings?.battingTeam?.name , liveData?.homeTeamName)

  const classes = useStyles();

  return (
    <>
    {
      liveDataa?
      <>
  
  <div className='score-on-process-priority'>
        <div className='score-on-process-priorityleft'>{
          liveDataa?.firstInnings?.battingTeam?.name + " Innings"
        }</div>
        <div className='score-on-process-priorityright'>
        {
           liveDataa?.firstInnings?.battingTeam?.name === liveData?.homeTeamName?

           cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===1 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===1 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===1 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===1 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null
:           
        cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===2 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===2 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===2 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===2 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null
               
               }
        </div>
    </div>
    <TableContainer className='score-table'>
      <Table aria-label="simple table">
        <TableHead className='table-head-score'>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">R</TableCell>
            <TableCell align="right">B</TableCell>
            <TableCell align="right">4s</TableCell>
            <TableCell align="right">6s</TableCell>
            <TableCell align="right">SR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {
            liveDataa?.firstInnings?.battingTeam?.players?
          liveDataa?.firstInnings?.battingTeam?.players?.map((row) => (
            
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{color: '#826F13'}} component="th" scope="row">{row?.details?.name}</TableCell>
              <TableCell align="right">{row?.status}</TableCell>
              <TableCell align="right">{row?.score}</TableCell>
              <TableCell align="right">{row?.battings}</TableCell>
              <TableCell align="right">{row?.four}</TableCell>
              <TableCell align="right">{row?.sixes}</TableCell>
              <TableCell align="right">{row?.strike_rate}</TableCell>
            </TableRow>
          )):
          <h4 style={{textAlign:'center'}}>No Data Found!</h4>
        
        }
           <TableRow className={classes.borderwidth}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>Extras</TableCell>
            <TableCell>{firstInningsExtra && firstInningsExtra}</TableCell>
            </TableRow>
            <TableRow className={classes.borderwidth}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>Total</TableCell>
            <TableCell>


            {/* {liveData !==null && liveDataa?.firstInnings?.battingTeam?.name }: &nbsp;
              {cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===2 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===2 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===2 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===2 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null} */}

{
           liveDataa?.firstInnings?.battingTeam?.name === liveData?.homeTeamName?

           cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===1 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===1 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===1 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===1 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null
:           
        cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===2 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===2 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===2 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===2 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null
               
               }
            </TableCell>
            </TableRow>
            {/* <TableRow className={classes.borderwidth}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>Yet to Bat</TableCell>
            <TableCell>Raymon Reifer , Kemar Roach , Jayden Seales</TableCell>
            </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <div className='fall-of-wicket'>Fall of Wickets</div>
    <p className='wicket-fall-status'>134-1 (Marcus Harris, 41.4), 162-2 (Henry Hunt, 49.3), 190-3 (Renshaw, 55.6), 202-4 (Josh Inglis, 59.1), 250-5 (Aaron Hardie, 75.3), 253-6 (Handscomb, 77.1), 278-7 (Neser, 83.1), 294-8 (Joel Paris, 87.6), 297-9 (Agar, 89.3), 322-10 (Steketee, 91.5)</p> */}

<br />
    <TableContainer className='score-table-bowler'>
      <Table aria-label="simple table">
        <TableHead className='table-head-score'>
          <TableRow>
            <TableCell>Bowler</TableCell>
            <TableCell align="right">Elimination no.</TableCell>
            <TableCell align="right">Innocent Rounds</TableCell>
            <TableCell align="right">Lose Score</TableCell>
            <TableCell align="right">Lose Score Per Round</TableCell>
            <TableCell align="right">Rounds Played</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        
       
          {
          liveDataa?.firstInnings?.bowlingTeam?.players?
          liveDataa?.firstInnings?.bowlingTeam?.players.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{color: '#826F13'}} component="th" scope="row">{row?.details?.name}</TableCell>
              <TableCell align="right">{row?.elimination_number}</TableCell>
              <TableCell align="right">{row?.innocent_rounds}</TableCell>
              <TableCell align="right">{row?.lose_score}</TableCell>
              <TableCell align="right">{row?.lose_score_per_round}</TableCell>
              <TableCell align="right">{row?.rounds_played}</TableCell>
            </TableRow>
          )):
          <h4 style={{textAlign:'center'}}>No Data Found!</h4>
          }
        </TableBody>
      </Table>
    </TableContainer>


{
   liveDataa?.secondInnings.battingTeam !=="No Data Found!" &&

   <>
    <div className='score-on-process-priority secondary'>
        <div className='score-on-process-priorityleft'>{liveDataa?.secondInnings?.battingTeam?.name} Innings</div>
        <div className='score-on-process-priorityright'> 
        {/* {cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===1 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===1 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===1 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===1 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null} */}

{
           liveDataa?.secondInnings?.battingTeam?.name === liveData?.homeTeamName?

           cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===1 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===1 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===1 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===1 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null
:           
        cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===2 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===2 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===2 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===2 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null
               
               }
               </div>
    </div>
    <TableContainer className='score-table'>
      <Table aria-label="simple table">
        <TableHead className='table-head-score'>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">R</TableCell>
            <TableCell align="right">B</TableCell>
            <TableCell align="right">4s</TableCell>
            <TableCell align="right">6s</TableCell>
            <TableCell align="right">SR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
            liveDataa?.secondInnings?.battingTeam?.players?
          liveDataa?.secondInnings?.battingTeam?.players?.map((row) => (
            
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{color: '#826F13'}} component="th" scope="row">{row?.details?.name}</TableCell>
              <TableCell align="right">{row?.status}</TableCell>
              <TableCell align="right">{row?.score}</TableCell>
              <TableCell align="right">{row?.battings}</TableCell>
              <TableCell align="right">{row?.four}</TableCell>
              <TableCell align="right">{row?.sixes}</TableCell>
              <TableCell align="right">{row?.strike_rate}</TableCell>
            </TableRow>
          )):
          <h4 style={{textAlign:'center'}}>No Data Found!</h4>
        
        }
            <TableRow className={classes.borderwidth}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>Extras</TableCell>
            <TableCell>{secondInningsExtra && secondInningsExtra}</TableCell>
            </TableRow>
            <TableRow className={classes.borderwidth}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>Total</TableCell>
            <TableCell>
              
              
            {
           liveDataa?.secondInnings?.battingTeam?.name === liveData?.homeTeamName?

           cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===1 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===1 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===1 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===1 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null
:           
        cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===2 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===2 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===2 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===2 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null
               
               }
              
              
            
              
              </TableCell>
            </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
    {/* <div className='fall-of-wicket'>Fall of Wickets</div>
    <p className='wicket-fall-status'>134-1 (Marcus Harris, 41.4), 162-2 (Henry Hunt, 49.3), 190-3 (Renshaw, 55.6), 202-4 (Josh Inglis, 59.1), 250-5 (Aaron Hardie, 75.3), 253-6 (Handscomb, 77.1), 278-7 (Neser, 83.1), 294-8 (Joel Paris, 87.6), 297-9 (Agar, 89.3), 322-10 (Steketee, 91.5)</p> */}

    <TableContainer className='score-table-bowler' style={{marginTop:"30px"}}>
      <Table aria-label="simple table">
        <TableHead className='table-head-score'>
          <TableRow>
            <TableCell>Bowler</TableCell>
            <TableCell align="right">Elimination no.</TableCell>
            <TableCell align="right">Innocent Rounds</TableCell>
            <TableCell align="right">Lose Score</TableCell>
            <TableCell align="right">Lose Score Per Round</TableCell>
            <TableCell align="right">Rounds Played</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        
       
          {
          liveDataa?.secondInnings?.bowlingTeam?.players?
          liveDataa?.secondInnings?.bowlingTeam?.players.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{color: '#826F13'}} component="th" scope="row">{row?.details?.name}</TableCell>
              <TableCell align="right">{row.elimination_number}</TableCell>
              <TableCell align="right">{row.innocent_rounds}</TableCell>
              <TableCell align="right">{row.lose_score}</TableCell>
              <TableCell align="right">{row.lose_score_per_round}</TableCell>
              <TableCell align="right">{row.rounds_played}</TableCell>
            </TableRow>
          )):
          <h4 style={{textAlign:'center'}}>No Data Found!</h4>
          }
        </TableBody>
      </Table>
    </TableContainer>

    {/* <div className='match-info'>Match Info</div> */}
   
   </>
}
   

      </>
      :
<div>
  <h3>No Data Found!</h3>
</div>

    }
 


    </>
  );
}

