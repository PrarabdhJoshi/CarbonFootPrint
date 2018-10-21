const serverless = require('serverless-http');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
'use strict';
const call_api        = require('./data-injection').call_api

const AWS = require('aws-sdk');


const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));


const country_map = { Armenia: '1',
Afghanistan: '2',
Albania: '3',
Algeria: '4',
Angola: '7',
'Antigua and Barbuda': '8',
Argentina: '9',
Australia: '10',
Austria: '11',
Bahamas: '12',
Bahrain: '13',
Barbados: '14',
Bangladesh: '16',
Bermuda: '17',
Bhutan: '18',
Bolivia: '19',
Botswana: '20',
Brazil: '21',
Aruba: '22',
Belize: '23',
'Brunei Darussalam': '26',
Bulgaria: '27',
Myanmar: '28',
Burundi: '29',
Cameroon: '32',
Canada: '33',
'Cabo Verde': '35',
'Cayman Islands': '36',
'Central African Republic': '37',
'Sri Lanka': '38',
Chad: '39',
Chile: '40',
Colombia: '44',
Comoros: '45',
Congo: '46',
'Cook Islands': '47',
'Costa Rica': '48',
Cuba: '49',
Cyprus: '50',
Czechoslovakia: '51',
Azerbaijan: '52',
Benin: '53',
Denmark: '54',
Dominica: '55',
'Dominican Republic': '56',
Belarus: '57',
Ecuador: '58',
Egypt: '59',
'El Salvador': '60',
'Equatorial Guinea': '61',
'Ethiopia PDR': '62',
Estonia: '63',
Fiji: '66',
Finland: '67',
France: '68',
'French Guiana': '69',
'French Polynesia': '70',
Djibouti: '72',
Georgia: '73',
Gabon: '74',
Gambia: '75',
Germany: '79',
'Bosnia and Herzegovina': '80',
Ghana: '81',
Kiribati: '83',
Greece: '84',
Grenada: '86',
Guadeloupe: '87',
Guatemala: '89',
Guinea: '90',
Guyana: '91',
Haiti: '93',
Honduras: '95',
Hungary: '97',
Croatia: '98',
India: '100',
Indonesia: '101',
'Iran, Islamic Republic of': '102',
Iraq: '103',
Ireland: '104',
Israel: '105',
Italy: '106',
'C├┤te d\'Ivoire': '107',
Kazakhstan: '108',
Jamaica: '109',
Japan: '110',
Jordan: '112',
Kyrgyzstan: '113',
Kenya: '114',
Cambodia: '115',
'Korea, Democratic People\'s Republic of': '116',
'Korea, Republic of': '117',
Kuwait: '118',
Latvia: '119',
'Lao People\'s Democratic Republic': '120',
Lebanon: '121',
Lesotho: '122',
Liberia: '123',
'Libyan Arab Jamahiriya': '124',
Lithuania: '126',
Madagascar: '129',
Malawi: '130',
Malaysia: '131',
Mali: '133',
Malta: '134',
Martinique: '135',
Mauritania: '136',
Mauritius: '137',
Mexico: '138',
Mongolia: '141',
Montserrat: '142',
Morocco: '143',
Mozambique: '144',
'Micronesia, Federated States of': '145',
Moldova: '146',
Namibia: '147',
Nepal: '149',
Netherlands: '150',
'Macedonia TFYR': '154',
Vanuatu: '155',
'New Zealand': '156',
Nicaragua: '157',
Niger: '158',
Nigeria: '159',
Norway: '162',
Pakistan: '165',
Panama: '166',
'Czech Republic': '167',
'Papua New Guinea': '168',
Paraguay: '169',
Peru: '170',
Philippines: '171',
Poland: '173',
Portugal: '174',
'Guinea-Bissau': '175',
'Timor-Leste': '176',
Eritrea: '178',
Qatar: '179',
Zimbabwe: '181',
'R├⌐union': '182',
Romania: '183',
Rwanda: '184',
'Russian Federation': '185',
'Serbia and Montenegro': '186',
'Saint Lucia': '189',
'Sao Tome and Principe': '193',
'Saudi Arabia': '194',
Senegal: '195',
'Sierra Leone': '197',
Slovenia: '198',
Slovakia: '199',
Singapore: '200',
Somalia: '201',
'South Africa': '202',
Spain: '203',
'Sudan (former)': '206',
Suriname: '207',
Tajikistan: '208',
Swaziland: '209',
Sweden: '210',
Switzerland: '211',
'Syrian Arab Republic': '212',
Turkmenistan: '213',
'Tanzania, United Republic of': '215',
Thailand: '216',
Togo: '217',
Tonga: '219',
'Trinidad and Tobago': '220',
Oman: '221',
Tunisia: '222',
Turkey: '223',
'United Arab Emirates': '225',
Uganda: '226',
USSR: '228',
'United Kingdom': '229',
Ukraine: '230',
'United States of America': '231',
'Burkina Faso': '233',
Uruguay: '234',
Uzbekistan: '235',
'Venezuela, Bolivarian Republic of': '236',
'Viet Nam': '237',
Ethiopia: '238',
Samoa: '244',
'Yugoslav SFR': '248',
Yemen: '249',
'Congo, Democratic Republic of': '250',
Zambia: '251',
Belgium: '255',
Luxembourg: '256',
Serbia: '272',
Montenegro: '273',
Sudan: '276',
'South Sudan': '277',
China: '351',
World: '5001',
All: 'all',
Africa: '2000',
Asia: '2001',
Europe: '2002',
'Latin America and the Caribbean': '2003',
'North America': '2004',
Oceania: '2005',
'Australia and New Zealand': '1000',
Caribbean: '1001',
'Central America': '1002',
'Central Asia': '1003',
'Eastern Africa': '1004',
'Eastern Asia': '1005',
'Eastern Europe': '1006',
'Melanesia': '1007',
'Micronesia': '1008',
'Middle Africa': '1009',
'Northern Africa': '1011',
'Northern Europe': '1012',
'Polynesia': '1013',
'South America': '1014',
'South-Eastern Asia': '1015',
'Southern Africa': '1016',
'Southern Asia': '1017',
'Southern Europe': '1018',
'Western Africa': '1019',
'Western Asia': '1020',
'Western Europe': '1021' }

app.get('/countries_carbon', function (req, res) {
    
    return call_api('https://api.footprintnetwork.org/v1/data/all/all/EFCtot')
    .then(carbonEcologyData=>{
      carbonEcologyData = JSON.parse(carbonEcologyData);
      res.status(200).send(carbonEcologyData)
    })
    .catch(err=>{res.status(400).send("Error!")})
  
})

app.get('/perperson/:country/:year', function (req, res) {
    return call_api('https://api.footprintnetwork.org/v1/data/'+country_map[req.params.country]+'/'+req.params.year+'/EFCpc')
    .then(carbonEcologyData=>{
      carbonEcologyData = JSON.parse(carbonEcologyData);
      res.status(200).send(carbonEcologyData)
  
    })
    .catch(err=>{res.status(400).send("Error!")})

})

app.post('/users', function (req, res) {
    const { userId, name } = req.body;
    if (typeof userId !== 'string') {
      res.status(400).json({ error: '"userId" must be a string' });
    } else if (typeof name !== 'string') {
      res.status(400).json({ error: '"name" must be a string' });
    }
  
    const params = {
      TableName: USERS_TABLE,
      Item: {
        userId: userId,
        name: name,
      },
    };
  
    dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create user' });
      }
      res.json({ userId, name });
    });
  })

  // Get User endpoint
app.get('/users/:userId', function (req, res) {
    const params = {
      TableName: USERS_TABLE,
      Key: {
        userId: req.params.userId,
      },
    }
  
    dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get user' });
      }
      if (result.Item) {
        const {userId, name} = result.Item;
        res.json({ userId, name });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    });
  })

module.exports.handler = serverless(app);