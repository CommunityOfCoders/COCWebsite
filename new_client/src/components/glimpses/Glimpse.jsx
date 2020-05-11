import React, { Component } from 'react'

class Glimpse extends Component {
  /*const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/blogs")
      .then(res => setPosts(res.data))
      .catch(error => console.log(error));
  });*/   //will be using for getting glimpses like blog.

  state = {
    posts: [
      {
        id: "1",
        title: "palak",
        body: "Glimpse Hardcoded , (above) is the code for getting the glimpse via the server but ther sever code says getphotos",
        url: "https://codersera.com/blog/wp-content/uploads/2019/07/Community-Champions@2x.png"


      }
    ]
  }


  render() {
    const { posts } = this.state
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
            <img src={post.url} alt="coc event 1" />
            <div className="card-content">
              <span className="card-title red-text">{post.title}</span>
              <p>{post.body}</p>
            </div>
          </div>
        )
      })
    ) : (
        <div className="center">No Glimpses to show</div>
      );

    return (
      <div>
        <div className="container home">
          {postList}
        </div>
      </div>
    )
  }
}

export default Glimpse