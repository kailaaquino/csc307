// backend.js
import express from "express";
import cors from "cors";

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

const FindUserByNameAndJob = (name,job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name), 
        users["users_list"].filter(
        (user) => user["job"] === job);
};


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUserById = (id) => {
    const index = users.users_list.findIndex((user) => user.id === id);
    if (index !== -1){
        const del = users.users_list.splice(index,1)[0];
        return del;
    }
    return null;
}
/* enables all cross origin resource sharing requests */
app.use(cors());

app.use(express.json());

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});


/* Finds user by name and job
URL :http://localhost:8000/users?name=Charlie&job=Janitor */
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    // let result = {users_list: []};
    if (!name && !job){
        res.send(users);
    }
    else if (name && !job){
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    }
    else if (!name && job){
        let result = findUserByJob(job);
        result = { users_list: result };
        res.send(result);
    }
    else{
        let result = FindUserByNameAndJob(name,job);
        result = { users_list: result };
        res.send(result);
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

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const deleteduser = deleteUserById(id);
    if (deleteduser){
        res.status(204).send();
    }
    else{
        res.status(404).send('Resource not found.');
    }

});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
