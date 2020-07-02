import React, { useState } from "react";
import { connect } from "react-redux";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = (props) => {
  const [descriptionInput, setDescriptionInput] = useState();
  const [imageInput, setImageInput] = useState();

  const addItem = () => {
    props.dispatch({
      type: "ADD_SHELF_ITEM",
      payload: {
        description: descriptionInput,
        image_url: imageInput,
      },
    });
    //this will clear out input fields upon submission
    setDescriptionInput("");
    setImageInput("");
  };

  //deletes item from list ONLY if user id matches up
  //i.e. one who created it can delete it
  const deleteItem = (itemID) => {
    props.dispatch({
      type: "DELETE_SHELF_ITEM",
      payload: itemID
    })
  }

  return (
    <div>
      {console.log("inside return for InfoPage", props)}
      <h2>Shelf Page</h2>
      <input
        value={descriptionInput}
        placeholder="Description"
        onChange={(event) => setDescriptionInput(event.target.value)}
      ></input>
      <input
        value={imageInput}
        placeholder="Image URL"
        onChange={(event) => setImageInput(event.target.value)}
      ></input>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {props.shelf?.map((cur, i) => (
          <li key={i}>
            {cur.description} <button onClick={() => deleteItem(cur.id)}>X</button><br />
            <img style={{ width: "700px" }} src={cur.image_url} />
          </li>
        ))}
        <br />
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { shelf: state.shelf };
};

export default connect(mapStateToProps)(InfoPage);
