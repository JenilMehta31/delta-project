const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(() => {
        console.log("Connection Sucessful");
    }).catch((err) => {
        console.log(err);
    });


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/WanderLust");
}


const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner : '6a3a5010aa7f8cc808277e46'}));
    await Listing.insertMany(initdata.data);
    console.log("Data was initialized");
};

initDB();   