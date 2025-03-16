import {useParams} from 'react-router-dom'
function Post() {
    const params = useParams();
  return (
    <div>
        <h1>POST-ID:{params.id}</h1>
    </div>
  )
}

export default Post
