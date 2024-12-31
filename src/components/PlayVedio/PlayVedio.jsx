import React, { useEffect, useState } from 'react'
import './PlayVedio.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVedio = () => {
  const {vedioId}=useParams();
  const [apiData,setApiData]=useState(null);
  const [channelData,setChannelData]=useState(null);
  const [commentData,setCommentData]=useState([]);

  const fetchVideoData = async()=>{
    //Fetching videos Data
    const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${vedioId}&key=${API_KEY}`
    await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
  }
  const fetchOtherData = async()=>{
    //Fetching Channel data
    const channelData_url =`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))
  
      //Fetching comment data
    const comment_url =`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResult=50&videoId=${vedioId}&key=${API_KEY}`
    await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
  }

  useEffect(()=>{
    fetchVideoData();
  },[vedioId])
  useEffect(()=>{
    fetchOtherData();
  },[apiData])
  return (
    <div className='play-video'>
       
       <iframe src={`https://www.youtube.com/embed/${vedioId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
      <div className="play-vedio-info">
        <p>{apiData?value_converter(apiData.statistics.viewCount):"16K"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():''} </p>
        <div className="">
            <span><img src={apiData?value_converter(apiData.statistics.likeCount):155} alt="" />1.5M</span>
            <span><img src={dislike} alt="" />760</span>
            <span><img src={share} alt="" />Share</span>
            <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
    
        <div>
            <p>{apiData?apiData.snippet.channelTitle:""}</p>
            <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1M"} Subscibers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-discription">
        <p>{apiData?apiData.snippet.description.slice(0,250):"Description here"}</p>
        
        <hr />
        <h4>{apiData?value_converter(apiData.statistics.commentCount):"102"} comments</h4>

        {commentData.map((item,index)=>{
            return (
              <div className="comment">
    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
    <div>
        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
       
        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
        <div key={index} className="comment-action">
            <img src={like} alt="" />
            <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
            <img src={dislike} alt="" />
        </div>
    </div>
</div>
            )

          })
        }


      </div>
    </div>
  )
}

export default PlayVedio
