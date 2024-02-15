
const express = require("express");

const bodyParser = require("body-parser");
const uniqid = require('uniqid');

const app = express();

app.use(bodyParser.json());
const port = 8000

app.listen(port, () => console.log(`Your app is running with ${port}`));

let rooms = [
    // {
    //     roomNo:100,
    //     noSeats: 10,
    //     amenities: "AC,LED screen",
    //     price : 1500,
        
    // }
];
let roomNo = 101;
let bookings =[{
    custName: "joe3",
    date: "06/03/2024",
    startTime: "13:00",
    endTime : "18:00",
    roomNo: 100,
    count:0
}];
let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
// let time_regex = /^(0[1-9]|1\d|2[0-3])\:(0[1-9]|1\d|2\d|3\d|4\d|5\d)/;
let time_regex = /^(0[0-9]|1\d|2[0-3])\:(00)/;

app.get("/", function (req, res) {
        res.json({
            output: "Homepage"
        });

  });

// end point =>(get) https://hallbookingapi-y0pj.onrender.com/getAllRooms
//List all coustomers with booked data with [coustomer name, room name, data, start time, end time ]

  app.get("/getAllRooms", function (req, res) {
    res.json({
        output: rooms
    });

});



// #end point =>(get) https://hallbookingapi-y0pj.onrender.com/getAllBookings
// List how many times a customer has booked the room with [customer name, room name, date, start time, end time, booking id, booking date, booked status]

app.get("/getAllBookings", function (req, res) {
    res.json({
        output: bookings
    });

});


// Creating a room with [number of seats available, amenties in room, price for hour]
// #end point =>(post) https://hallbookingapi-y0pj.onrender.com/createRoom

app.post("/createRoom", function (req, res) {
    let room = {};
    room.id = uniqid();

    room.roomNo = roomNo;
    room.bookings = [];
    room.status= 'Available'
    if(req.body.noSeats){room.noSeats = req.body.noSeats} else{res.status(400).json({ output: 'Please specify No of seats for Room'})};
    if(req.body.amenities){room.amenities = req.body.amenities} else{res.status(400).json({ output: 'Please specify all Amenities for Room in Array format'})};
    if(req.body.price){room.price = req.body.price} else{res.status(400).json({ output: 'Please specify price per hour for Room'})};
    rooms.push(room);
    roomNo++;
    res.status(200).json({ output: 'Room Created Successfully'}) 
});

// Booking a nroom with [customer name, Date, Start time, End Time, Room id]
// #end point =>(post) https://hallbookingapi-y0pj.onrender.com/createBooking

app.post("/createBooking", function (req, res) {
    let booking = {};
    booking.id = uniqid();
    if(req.body.custName){booking.custName = req.body.custName} else{res.status(400).json({ output: 'Please specify customer Name for booking.'})};
    if(req.body.date){
        if (date_regex.test(req.body.date)) {
            booking.date = req.body.date
        } else{
            res.status(400).json({ output: 'Please specify date in MM/DD/YYYY'})
        }
    } else{
        res.status(400).json({ output: 'Please specify date for booking.'})
    }

    if(req.body.startTime){
        if (time_regex.test(req.body.startTime)) {
            booking.startTime = req.body.startTime
        } else{
            res.status(400).json({ output: 'Please specify time in hh:min(24-hr format) where minutes should be 00 only'})
        }
    } else{
        res.status(400).json({ output: 'Please specify Starting time for booking.'})
    }

    if(req.body.endTime){
        if (time_regex.test(req.body.endTime)) {
            booking.endTime = req.body.endTime
        } else{
            res.status(400).json({ output: 'Please specify time in hh:min(24-hr format) where minutes should be 00 only'})
        }
    } else{
        res.status(400).json({ output: 'Please specify Ending time for booking.'})
    }

    const availableRooms = rooms.filter(room => {
        if(room.bookings.length == 0){
            return true;
        } else{
            room.bookings.filter(book =>{
                if((book.date == req.body.date) ){
                    if((parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.startTime).substring(0, 1)) ) && 
                    (parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.endTime).substring(0, 1)) ) ){ 
                        if((parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.startTime).substring(0, 1)) ) && 
                          (parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.endTime).substring(0, 1)) ) ){ 
                            return true;
                        }
                    }
                    
                }
                else{
                    return true;
                }
            })

        }
    });
   
    if(availableRooms.length == 0){res.status(400).json({ output: 'No Available Rooms on Selected Date and Time'})}
   else{
    roomRec = availableRooms[0];
   let count =0;
   rooms.forEach(element => {
       if(element.roomNo == roomRec.roomNo){
        rooms[count].status='booked'
        rooms[count].bookings.push({
            bookingId:booking.id,
            custName: req.body.custName,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            date: req.body.date,
            roomNo:roomRec.roomNo,
            status:'booked'
        })
       }
       count++;
   });
  
   let bookingRec = req.body;
   bookingRec.bookingId=booking.id
   bookingRec.roomNo = roomRec.roomNo;
   bookingRec.cost = parseInt(roomRec.price) * (parseInt((bookingRec.endTime).substring(0, 1)) - parseInt((bookingRec.startTime).substring(0, 1)));
   bookingRec.status = 'booked'

   bookings.push(bookingRec);
//    console.log(bookings)
   res.status(200).json({ output: 'Room Booking Successfully'}) 
}
});


// List how many times a customer has booked the room with [customer name, room name, date, start time, end time, booking id, booking date, booked status]
// 3end point =>(get) https://hallbookingapi-y0pj.onrender.com/roombookednumtimes/:name

app.get('/roombookednumtimes/:name', (req,res)=>{

            let {name} = req.params
            let user = bookings.filter((e)=> e.custName === name)
            
            if(user.length===0){
                res.status(400).json({output: 'This user doesnot exist'})
            }else{
                res.status(200).json({
                    user,
                    userbooked:`${user.length} Times`
                })
            }
})
