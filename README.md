##hall booking api

#1-) Creating a room with [number of seats available, amenties in room, price for hour]
#end point =>(post) https://hallbookingapi-y0pj.onrender.com/createRoom
#2-) Booking a nroom with [customer name, Date, Start time, End Time, Room id]
#end point =>(post) https://hallbookingapi-y0pj.onrender.com/createBooking
#3-) List all rooms with Booked Data with [Room name, booked Status, customer name, Date, start time, end time]
#end point =>(get) https://hallbookingapi-y0pj.onrender.com/getAllRooms
#4-) List all coustomers with booked data with [coustomer name, room name, data, start time, end time ]
#end point =>(get) https://hallbookingapi-y0pj.onrender.com/getAllBookings
#5-) List how many times a customer has booked the room with [customer name, room name, date, start time, end time, booking id, booking date, booked status]
3end point =>(get)  https://hallbookingapi-y0pj.onrender.com/roombookednumtimes/:name
