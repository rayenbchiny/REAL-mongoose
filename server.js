const express = require("express");
const app = express();
const port = 10000;
const connectDb = require("./config/connectDb");
const user = require("./model/user");

require("dotenv").config();

connectDb();

//Create and Save a Record of a Model:

const create = async () => {
  try {
    const newUser = new user({
      name: "zfzfz",
      age: 45,
      favoriteFood: ["pizza"],
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

//create();

//Create Many Records with model.create()

const createMany = async () => {
  try {
    const result = await user.insertMany([
      { name: "wzklhfezulh", age: 20, favoriteFood: ["steak"] },
      { name: "lfefgt", age: 30, favoriteFood: ["cheese"] },
      { name: "afezgzefe", age: 40, favoriteFood: ["rice"] },
    ]);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
//createMany();

//Use model.find() to Search Your Database

const findUsers = async () => {
  try {
    const result = await user.find();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
//findUsers();

//Use model.findOne() to Return a Single Matching Document from Your Database

const findOneUser = async () => {
  try {
    const result = await user.findOne({ favoriteFood: "pizza" });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
//findOneUser();

//Use model.findById() to Search Your Database By _id

const findUserId = async () => {
  try {
    const result = await user.findById("65d87faa33e9d393479e5f54");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
//findUserId();

//Perform Classic Updates by Running Find, Edit, then Save
const addFavoriteFood = async (personId) => {
  try {
    const person = await user.findById(personId);
    if (person) {
      person.favoriteFood.push("hamburger");
      await person.save();
      console.log("Favorite food added successfully:", person);
    } else {
      console.log("Person not found");
    }
  } catch (error) {
    console.log("Error adding favorite food:", error);
  }
};
const personIdToUpdate = "65d8d9db344ebac19da96e46";
//addFavoriteFood(personIdToUpdate);

//Perform New Updates on a Document Using model.findOneAndUpdate()

const findName = async () => {
  try {
    const result = await user.findByIdAndUpdate(
      { _id: "65d8d98d9c3f6fdae04c4480" },
      { age: 10 },
      { new: true }
    );
    console.log(result);
  } catch (error) {
    console.log("Error adding favorite food:", error);
  }
};
//findName();
//Delete One Document Using model.findByIdAndRemove

const deletePersonById = async (personId) => {
  try {
    const deletedPerson = await user.findByIdAndDelete(personId);
    {
      console.log("Person deleted successfully:", deletedPerson);
    }
  } catch (error) {
    console.log(error);
  }
};
const personIdToDelete = "65d8d98d9c3f6fdae04c4480";
//deletePersonById(personIdToDelete);

//MongoDB and Mongoose - Delete Many Documents with model.remove()

const deletePeopleByName = async () => {
  try {
    const result = await user.deleteMany({ name: "Mary" });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
//deletePeopleByName();

//Chain Search Query Helpers to Narrow Search Results
const SearchQuery = async () => {
  try {
    const res = await user
      .find({ favoriteFood: "hamburger" })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
//SearchQuery();
/*, this code finds people who like burritos, sorts them by name, 
limits the results to 2 documents, excludes the age field, 
and then executes the query,
 handling any errors and logging the result.
*/

// Start the server and listen on the specified port

app.listen(port, (err) => {
  err ? console.log("error") : console.log("server is running");
});
