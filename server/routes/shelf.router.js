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
  console.log("req in GET:", req);
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
router.post("/", (req, res) => {});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id", (req, res) => {});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {});

module.exports = router;
