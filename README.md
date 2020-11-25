# Weather Station
This is a simple node server made using express. It serves a static website and has api that allows to fetch weather informaction from database. 
## Microcontrollers
Microcontrollers are responsible for reading weather infromations from sensors and sending it to server by HTTP POST. After that they go into deep sleep mode to reduce power consumption.
## Server
As said before server allows to access a simple website that I made by copying boostrap examples. It allows to fetch data from server and display it in nice charts such as this one.
![](/images/chart.png)