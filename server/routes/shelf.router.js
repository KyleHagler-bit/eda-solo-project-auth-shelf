const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * Get all of the items on the shelf
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM item;`;

  pool
    .query(queryText)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  const shelf = req.body; // pull the object out out of the HTTP REQUEST
  const { description, image_url } = shelf;
  if (shelf === undefined) {
    // stop, dont touch the database
    res.sendStatus(400); // 400 BAD REQUEST
    return;
  }

  const queryText = `
        INSERT INTO item (description, image_url, user_id) 
        VALUES ($1, $2, $3);`; //grabs database
  pool
    .query(queryText, [description, image_url, req.user.id])
    .then(function (result) {
      // result.rows: 'INSERT 0 1';
      // it worked!
      res.sendStatus(200); // 200: OK
    })
    .catch(function (error) {
      console.log("Sorry, there was an error with your query: ", error);
      res.sendStatus(500); // HTTP SERVER ERROR
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  let id = req.params.id; // id of the thing to delete
	// console.log("Delete route called with id of", id);
	console.log("req.user.id", req.user.id);

  /* if (session.id !== database.id) {sendStatus(403) return;}*/
  let queryText = `SELECT * FROM item WHERE id=$1`; //grabs specific item to grab the item user_id
  const queryValue = [id];
  pool
    .query(queryText, queryValue)
    .then((result) => {
			console.log("result.rows[0].user_id", result.rows[0].user_id);
      if (result.rows[0].user_id === req.user.id) {
        //checks to see if current user is the one who added the image
        queryText = `DELETE FROM item WHERE id=$1;`; //deletes from database
        pool
          .query(queryText, [id])
          .then(function (result) {
            res.sendStatus(201); //status 201
          })
          .catch(function (error) {
            console.log("Sorry, there was an error with your query: ", error);
            res.sendStatus(500); //HTTP SERVER ERROR
          });
      } else {
        res.sendStatus(401); // user not authorized to delete item
      }
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

/** STRETCH
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {});

/** STRETCH -> just a number or does this give all the items that the user added?KH
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {});

/** This is not in readme? Is this like a search bar?KH
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {});

module.exports = router;
