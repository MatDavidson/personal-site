import {CircularLinkedList} from './circularLinkedList.js';
import React from 'react';
import './NavMenu.css';

var list;
class ListWidget extends React.Component {
  constructor(props) {
    super(props);
    list = new CircularLinkedList();
    this.state = { lHead: list.head, lTail: list.tail, lCount: list.count, lCurrent: list.current, list: list };

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let s = document.getElementById('item').value;

    if(s !== ''){
      document.querySelector(".inBox").value = '';
      this.state.list.add(s);
      this.setState({lHead: list.head, lTail: list.tail, lCount: list.count, lCurrent: list.current});
    }
    
    event.preventDefault();
  }

  next(){
    this.state.list.nextNode();
    this.setState({lCurrent: list.current})
  }

  prev(){
    this.state.list.prevNode();
    this.setState({lCurrent: list.current})
  }

  remove(){
    let node = this.state.lCurrent;
    this.state.list.remove(node);
    this.setState({lHead: list.head, lTail: list.tail, lCount: list.count, lCurrent: list.current});
  }



  render() {
    return(
        <div >
            <h3>Circular Doubly Linked List</h3>
            <form onSubmit={this.handleSubmit} className="flexbox-container">
          <label>
          Item:
          <input className="inBox" type="text" id="item" defaultValue="Add something" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add" />
        </form>

        <div className="flexbox-container">
          <div className="widget">
          <LeftSide count={this.state.lCount} head={this.state.lHead} tail={this.state.lTail} />
          </div>
          <div className="widget">
            <Current current = {this.state.lCurrent}/>
            <span>
              <button onClick={this.next}>Next</button>
              <button onClick={this.prev}>Prev</button>
            </span>
            <div>
            <button onClick={this.remove}>Remove</button>
            </div>
          </div>
            </div>
            <p>A CDLL is a type of Linked List in which each node has a pointer to the next node as well as the previous node.
            Additionally, the head and tail point to each other. This way, the list can be cycled through continuously in
            either direction.</p>
      </div>
    )
  }
}



function LeftSide(props){
  return (<div><Count count={props.count} />
  <Head head={props.head} />
  <Tail tail={props.tail} /></div>);
}

function Count(props){
  return <h3>Count: {props.count}</h3>;
}
function Head(props){
  if(props.head)
    return <h3>Head: {props.head.item}</h3>
  else
    return <h3>Empty</h3>
}
function Tail(props){
  if(props.tail)
    return <h3>Tail: {props.tail.item}</h3>
  else
    return <h3>List</h3>
}

function Current(props){
  if(props.current)
    return <h3>Current: {props.current.item}</h3>
  else
    return <h3>Current: Null</h3>
}
    
export default ListWidget;    

// <h3>Count: {this.state.list.count}</h3>
//       <h3>Head: {head(this.state.list)}</h3>
//       <h3>Tail: {tail(this.state.list)}</h3>