'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      disabled: false
    };
  }

  render() {
    if( this.state.disabled )
    {
      return 'disabled';
    }
   return (
       <button onClick={() => this.setState({ liked: !this.state.liked })}>
    { this.state.liked ? 'liked' : 'like' }
        </button>
   );
  }
}

const domContainer = document.querySelector('#like_button_container');
const domContainer2 = document.querySelector('#like_button_container2');
const button1 = ReactDOM.render(e(LikeButton), domContainer);
ReactDOM.render(e(LikeButton), domContainer2);

setTimeout(function(){
  button1.setState({disabled: true});
}, 5000);