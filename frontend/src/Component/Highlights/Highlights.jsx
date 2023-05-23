import React,{useEffect,useState} from 'react'
import './Highlights.css'
import { endpoints } from "../../auth/url";
import usercalls from "../../auth/endpoints";

const Highlights = () => {

    const path = usercalls();

    const [highlightsData, setHighlightsData] = useState([])

    useEffect(()=>{
        const getData = async()=>{
            const url = `${endpoints.highLightsData}`;  
            try {
              const data = await path.getCall({ url });
              const result = await data.json();
              
              setHighlightsData(result?.data)
            }
            catch(error){
            console.log(error);
            }
        }
        getData()
        
    },[])

   
  return (
    <div>
        <div>
            {
                highlightsData?.length!==0?
                highlightsData?.map((item,i)=>{
                    return(
                        <div className='highlights-league-table'>

                       <div className='flex_container'>
                        <img src={item?.tournament_logo?item?.tournament_logo:"https://letswinsports.io/service/img/flag/logo-color.png"} alt={item?.tournament_name} width="50px" height="50px"/>
                        <h3>{item?.tournament_name}</h3>
                       </div>
                       
                       {item?.data?.map((innerData,j)=>{
                       return(  
                       <div className='inner_container'>

                           <h5>
                            {new Date(innerData?.details?.match_time*1000).toLocaleString()}
                           </h5>
                          
                          <div className='highlights-match-cricket'>
                           <div className='inner_container_first'>
                             
                             <img src={innerData?.homeTeamLogo?innerData?.homeTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} alt={innerData?.homeTeamName} width="40px" height="40px"/>
                             <h5>{innerData?.homeTeamName}</h5>
                             <h5 style={{color:innerData?.details?.extra_scores?.results?.result===1&&"black"}}>
                                {innerData?.details?.extra_scores?.innings[0][0]===1?
                                innerData?.details?.extra_scores?.innings[0][1]+"/"+innerData?.details?.extra_scores?.innings[0][3]+"("+innerData?.details?.extra_scores?.innings[0][2]+")"
                                :innerData?.details?.extra_scores?.innings[1][1]+"/"+innerData?.details?.extra_scores?.innings[1][3]+"("+innerData?.details?.extra_scores?.innings[1][2]+")"
                            }
                             </h5>
                            </div>   
                                
                            <div className='inner_container_second'>
                             
                             <img src={innerData?.awayTeamLogo?innerData?.awayTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} alt={innerData?.awayTeamName} width="40px" height="40px"/>
                             <h5>{innerData?.awayTeamName}</h5>
                             <h5 style={{color:innerData?.details?.extra_scores?.results?.result===2&&"black"}}>
                                {innerData?.details?.extra_scores?.innings[0][0]===2?
                                innerData?.details?.extra_scores?.innings[0][1]+"/"+innerData?.details?.extra_scores?.innings[0][3]+"("+innerData?.details?.extra_scores?.innings[0][2]+")"
                                :innerData?.details?.extra_scores?.innings[1][1]+"/"+innerData?.details?.extra_scores?.innings[1][3]+"("+innerData?.details?.extra_scores?.innings[1][2]+")"
                            }
                             </h5>
                            </div>  
                            </div>

                            <h4 className='winning_quotes'>
                                {
                                    innerData?.details?.extra_scores?.results?.result===1?
                                    `${innerData?.homeTeamName} won the match`
                                    :
                                    `${innerData?.awayTeamName} won the match`
                                }
                         
                        </h4>

                         </div>)
                       })}
                        
                       </div>
                    )
                }):

                <h3 style={{textAlign:'center'}}>No Data Found!</h3>

            }
        </div>
    </div>
  )
}

export default Highlights