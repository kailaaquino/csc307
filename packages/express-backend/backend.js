// backend.js
import express from "express";

const app = express();
const port = 8000;
const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};
const findUserByJob = (job) => {
    return users["users_list"].filter(
        (user) => user["job"] === job
    );
};
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};
app.use(express.json());

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

/* Finds user by name and job */
app.get("/users", (req, res) => {
    const {name, job} = req.query.name;
    let result = {users_list: []};
    if (name != undefined) {
        if (name){
            result.users_list = findUserByName(name);
        }
        if (job){
            result.users_list = results.users_list.concat(findUserByJob(job)); // concat results of job to results of users 
        }
    }
    else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

// app.delete("/users/:id", (req, res) => {
//     const id = req.params["id"];

// });