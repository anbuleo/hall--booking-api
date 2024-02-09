##hall booking api

#1-) Creating a room with [number of seats available, amenties in room, price for hour]__
#end point =>(post) https://hallbookingapi-y0pj.onrender.com/createRoom__
#2-) Booking a nroom with [customer name, Date, Start time, End Time, Room id]__
#end point =>(post) https://hallbookingapi-y0pj.onrender.com/createBooking__
#3-) List all rooms with Booked Data with [Room name, booked Status, customer name, Date, start time, end time]__
#end point =>(get) https://hallbookingapi-y0pj.onrender.com/getAllRooms__
#4-) List all coustomers with booked data with [coustomer name, room name, data, start time, end time ]__
#end point =>(get) https://hallbookingapi-y0pj.onrender.com/getAllBookings__
#5-) List how many times a customer has booked the room with [customer name, room name, date, start time, end time, booking id, booking date, booked status]__
3end point =>(get)  https://hallbookingapi-y0pj.onrender.com/roombookednumtimes/:name__
