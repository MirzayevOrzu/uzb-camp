const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fa4e14f50119e09b09352b7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad sunt, quasi sed alias amet soluta harum optio adipisci odio maiores id, autem aut dolores minus accusamus. Modi eligendi magnam minus?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dkvwkei7z/image/upload/v1604734435/YelpCamp/zoylyfq61apsqy4nykzi.jpg',
                  filename: 'YelpCamp/zoylyfq61apsqy4nykzi'
                },
                {
                  url: 'https://res.cloudinary.com/dkvwkei7z/image/upload/v1604734448/YelpCamp/yceeyt8vzcgafmykoreb.jpg',
                  filename: 'YelpCamp/yceeyt8vzcgafmykoreb'
                }
              ]
        });
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})