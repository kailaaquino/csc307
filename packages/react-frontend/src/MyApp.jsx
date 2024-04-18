// src/MyApp.jsx
import React, { useState, useEffect } from "react"; // 
import Table from "./Table";
import Form from "./Form";


  function MyApp() {
    const [characters, setCharacters] = useState([]);
                // {
                //   name: "Charlie",
                //   job: "Janitor"
                // },
                // {
                //   name: "Mac",
                //   job: "Bouncer"
                // },
                // {
                //   name: "Dee",
                //   job: "Aspring actress"
                // },
                // {
                //   name: "Dennis",
                //   job: "Bartender"
                // }
    // ]);

    /* HTML methods */

    /* load users from the backend using GET */
    function fetchUsers() {
      /* fetch uses http get to get info from the users at that URL
      promise: makes a promise to return from fetch when info is finally recieved
      promises return immediately but the info is not always available */
      const promise = fetch("http://localhost:8000/users");
      return promise;
    } 
    useEffect(() => {
      fetchUsers()
        .then((res) => res.json()) // when the promise if fufilled 
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }


    /* Visual Stuff */ 
      function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }

    //   function updateList(person) { 
    //     postUser(person)
    //       .then(() => setCharacters([...characters, person]))
    //       .catch((error) => {
    //         console.log(error);
    //       })
    // } 
      function updateList(person) { 
        postUser(person)
          .then((res) => {
            /* check for content created */
            if (res.status === 201){
              setCharacters([...characters, person]);
           }
           /* if the result returns other than 201 */
            else {
             console.log('Failed to add user. Status:' + res.status);
           }  
         })
         /* handler for unexpected errors */
          .catch((error) => {
            console.log(error);
          })
    } 

      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          {/* <Form /> */}
          <Form handleSubmit={updateList} />
        </div>
        
      );
     
    
  }

export default MyApp;