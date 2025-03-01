const NowPlaying = (props) => {
  if (!props.selected)
      return (
        <div>
          <h1>No Track Playing</h1>
        </div>
      );
  return(
  <div className="details-container">
  <h1>Now Playing</h1>
  <h2>Title: {props.selected.title}</h2>by
  <h2>
    Artist: {props.selected.artist} 
  </h2>
</div>
  )
}

export default NowPlaying;