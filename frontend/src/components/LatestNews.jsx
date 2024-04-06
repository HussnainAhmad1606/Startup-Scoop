import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import News from './News'
import Loading from './Loading';

function LatestNews() {
    const [news, setNews] = useState([]);
    const [date, setDate] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
      
      // Array of day names
      const dayNames = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday",
        "Saturday"
      ];

    const getNews = async() => {
        setIsLoading(true);
        const request = await fetch("http://localhost:3000/get-news");
        const res = await request.json();
        console.log(res.news.news)
        setNews(res.news.news)

        const today = new Date(res.news.date)

        const day = dayNames[today.getDay()];
const date = today.getDate();
const month = monthNames[today.getMonth()];
const year = today.getFullYear();

// Format the date
const formattedDate = `${day}, ${date} ${month} ${year}`;

console.log(formattedDate);
        setDate(formattedDate)
        setIsLoading(false);
    }

    useEffect(() => {
      getNews();
    }, [])
    
  return (
    <>
    <h1 className='text-3xl font-bold my-10'>Latest Startup News for {date}</h1>
    {
        isLoading?(
            <Loading/>
            ):null
        }
    {
        news.map((newss, index) => {
            return <News source={newss.source}  title={newss.title} cover={newss.urlToImage} description={newss.description} publishedAt={newss.publishedAt} author={newss.author} url={newss.url}/>
        })
    }

    <div className='my-10 flex w-full justify-center items-center'>
    <Link to={'/'}>
      <p class="mt-4 flex items-center text-xs text-gray-500 hover:text-gray-700">
        Subscribe to Newsletter
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 h-3 w-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </p>
    </Link>
    </div>
    </>
  )
}

export default LatestNews