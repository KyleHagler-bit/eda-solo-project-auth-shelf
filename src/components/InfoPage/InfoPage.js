import React from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = (props) => (
  <div>
		{console.log(props)}
    <h2>
      Shelf Page
    </h2>
    <input placeholder='Description'></input>
    <input placeholder='image URL'></input>
    <button>Add Item</button>
    <ul>
{props.shelf?.map((cur, i) => <li key={i}>{cur.description} <br/><img style={{width:"700px"}} src={cur.image_url} /></li>)}
		</ul>
  </div>
);

const mapStateToProps = (state) => {
	return {shelf: state.shelf}
}

export default connect(mapStateToProps)(InfoPage);
