const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      author: "65928128343f06c3af60e2b5",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, quia aspernatur et reprehenderit ut aut temporibus eveniet necessitatibus, dolorem nihil libero fugiat amet odit quibusdam. Deleniti quibusdam fuga consequuntur eos.`,
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dmiyvdqmy/image/upload/v1704186172/YelpCamp/sjwvvuqnmpt4brzfescr.png",
          filename: "YelpCamp/sjwvvuqnmpt4brzfescr",
        },
        {
          url: "https://res.cloudinary.com/dmiyvdqmy/image/upload/v1704186176/YelpCamp/cqdbostlueef7etz820q.jpg",
          filename: "YelpCamp/cqdbostlueef7etz820q",
        },
      ],
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
