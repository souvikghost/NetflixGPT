
import { useSelector } from "react-redux"
import useMovieTrailer from "../hooks/useMovieTrailer"

const VideoBackground = ({movieId}) => {
    const trailerVideo=useSelector(store=>store.movies.trailerVideo)


    // Custom Hook for Fetching Movie Trailer Video which will be shown in Maincontainer
    useMovieTrailer(movieId)

    return (
      <div className="w-screen">
        <iframe className="w-screen aspect-video"
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?playlist="+trailerVideo?.key+"&autoplay=1&loop=1&mute=1"} 
        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
    )
}

export default VideoBackground
