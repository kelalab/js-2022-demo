import express from "express";
import sqlite3, { RunResult } from "sqlite3";

const lite = sqlite3.verbose();

const db = new lite.Database("db.sqlite");

const router = express.Router();
export default router;

db.serialize(() => {
  try {
    let statement = db.prepare("SELECT * FROM todos", (err: Error) => {
      if (err) {
        console.log("error:", err.message);
        if (err.message.indexOf("no such table") !== -1) {
          const createTable = db.prepare(
            "CREATE TABLE todos ( id INTEGER NOT NULL PRIMARY KEY, todo TEXT NOT NULL, done INTEGER)",
            (err: Error) => {
              console.log("create error", err);
            }
          );
          createTable.run();
          createTable.finalize();
        }
      }
    });
    statement.run(function (error: Error, result: RunResult) {
      if (error) {
        console.log("error:", error);
      }
      result ? console.log("result:", result) : console.log("no results");
    });
    statement.finalize();
  } catch (err) {
    console.log("err");
  }
});

router.get("/todos", (req, res) => {
  let statement = db.prepare("SELECT * FROM todos", (err: Error) => {
    if (err) {
      res.status(500).send();
    }
  });
  statement.all(function (err: Error, rows: any[]) {
    if (err) {
      console.log("error:", err);
      res.status(500).send();
    }
    rows ? res.json(rows).send() : res.status(404).send();
  });
  statement.finalize();
});

router.post("/todos", async (req, res) => {
  let statement = db.prepare(
    "INSERT INTO todos (todo, done) VALUES (?,?)",
    (err: Error) => {
      if (err) {
        console.log("returning error status");
        res.status(500).send();
      }
    }
  );
  let todo = req.body;
  statement.run(
    [todo.todo, todo.done],
    function (error: Error, result: RunResult) {
      if (error) {
        console.log("error:", error);
        res.status(500).send();
      }
      res.status(200).send({ status: "ok" });
    }
  );
  statement.finalize();
});

router.put("/todos", async (req, res) => {
  let statement = db.prepare(
    "UPDATE todos SET todo=?, DONE=? WHERE id=?",
    (err: Error) => {
      if (err) {
        console.log(err);
        console.log("returning error status");
        res.status(500).send();
      }
    }
  );
  let todo = req.body;
  statement.run(
    [todo.todo, Number(todo.DONE), todo.id],
    function (error: Error, result: RunResult) {
      if (error) {
        console.log("error:", error);
        res.status(500).send();
      }
      res.status(200).send({ status: "ok" });
    }
  );
  statement.finalize();
});

router.delete("/todos", (req, res) => {
  let statement = db.prepare("DELETE FROM todos WHERE id=?", (err: Error) => {
    if (err) {
      console.log("returning error status");
      res.status(500).send();
    }
  });
  let todo = req.body;
  statement.run(todo.id, function (error: Error, result: RunResult) {
    if (error) {
      console.log("error:", error);
    }
    res.status(200).send();
  });
  statement.finalize();
});
