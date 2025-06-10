export const config = {
    'secret':'jeskavu'
   ,'databaseL': 'mongodb://localhost:27017/read-seed'
   ,'databaseR': process.env.MONGODB_URI || 'mongodb://keslavi:GrapeBird747@iad2-c6-2.mongo.objectrocket.com:54009,iad2-c6-0.mongo.objectrocket.com:54009,iad2-c6-1.mongo.objectrocket.com:54009/react-seed?replicaSet=a149026bb14b41d5a12e7ce26d466446'
   ,'mailAuth': {
     'username':'dev@evensteven.us',
     'password':'GrapeBird747'
   }
 }

 export default config;

 