var express = require('express');
var router = express.Router()
var path = require('path');

var request = require('request')
var cheerio = require('cheerio');

var Comments = require('../models/Comments.js')
var Articles = require('../models/Articles.js')
// var app = express();

router.get('/', function (req, res) {
  res.redirect('/scrape')
});

router.get('/articles', function(req, res) {
  Articles.find().sort({ _id: -1 })
  .populate('comments')
  .exec(function(err, doc) {
    if(err) {
      console.log(err)
    }
    else {
      var hbsObject = { articles: doc }
      res.render('index', hbsObject)
    }
  })
});

// ********* first blocked out ******

// app.get("/scrape", function(req, res) {
//   // Make a request for the news section of `ycombinator`
//   request("https://news.ycombinator.com/", function(error, response, html) {
//     // Load the html body from request into cheerio

//     console.log("error : ", error);
//     console.log('response : ', response)
    
//     var $ = cheerio.load(html);
//     // For each element with a "title" class
//     $(".title").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var title = $(element).children("a").text();
//       var link = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (title && link) {
//         // Insert the data in the scrapedData db
//         db.scrapedData.insert({
//           title: title,
//           link: link
//         },
//         function(err, inserted) {
//           if (err) {
//             // Log the error if one is encountered during the query
//             console.log(err);
//           }
//           else {
//             // Otherwise, log the inserted data
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });

//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// });


// module.exports = routes;

//  ********* end of first block out ******* 