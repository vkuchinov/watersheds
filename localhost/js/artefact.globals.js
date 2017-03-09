//GLOBAL VARIABLES

var width = window.innerWidth;
var height = window.innerHeight;
var global = {angle: 0 };

var scene, menu;
var currentFrame = 0;

var mode = 0; //by default automous

var system, tags, particles, HUD, next;
var prerendered = false;

var nodes = [];

var palette = {
    pink: "#F59DAE",
    red: "#D43D31",
    brown: "#815A3D",
    green: "#92CA70",
    orange: "#F19436",
    purple: "#925E8E",
    teal: "#6AC5B3",
    blue: "#397BA3",
    yellow: "#ECBE42",
    lime: "#E4FC3F", 
    black: "#241F1F",
    white:  "#FFFFF"
};


var bleachingA = {
    pink: "#D7C3DA",
    red : "#C46A8C",
    brown : "#897398",
    green : "#C8CEE7",
    orange : "#D3B6D0",
    purple : "#8C83AE",
    teal : "#9ED1EE",
    blue : "#6294C6",
    yellow : "#E1D1E1",
    lime : "#EFF5CA",
    black : "#362F4A", 
};

var bleaching = {
    pink: "#F8E6E9", //1
    red : "#EBCBC9", //3
    brown : "#D6CEC8", //5
    green : "#DFEBD8", //7
    orange : "#F3DFCB", //9
    purple : "#DCD1DC", //11
    teal : "#D6EAE6", //13
    blue : "#C8D6DF", //15
    yellow : "#F2E8CE", //17
    lime : "#EFF5CA", //19
    black : "#362F4A",
    white: "#FFFFF",
};

var colors = [];
var foams = [];

for(var key in palette) {
   colors.push(palette[key]);
}

for(var key in bleaching) {
   foams.push(bleaching[key]);
}
//var colors = 
//var colors = Object.values(palette).slice(0, Object.values(palette).length);
//var foams = Object.values(bleaching).slice(0, Object.values(bleaching).length);

var categories = [
    
    //there are 10 categories as well as there are 10 colors, so I could suggest
    //that I should keep the same order Inclusivity<>pink ... Personal<>black
    
    {"id": 1, "en": "Inclusivity & Accessibility", "fr": "Inclusivité et accessibilite"},
    {"id": 3, "en": "Cultural & Historical Conservation", "fr": "Conservation culturelle et historique"},
    {"id": 5, "en": "Environmental Sustainability", "fr": "Viabilité de l’environnement"},
    {"id": 7, "en": "Human Rights", "fr": "Droits humains"},
    {"id": 9, "en": "Physical & Mental Health", "fr": "Santé physique et mentale"},
    {"id": 11, "en": "LGBTQ2A Rights", "fr": "Droits LGBTQ2A"},
    {"id": 13, "en": "Political Representation", "fr": "Représentation politique"},
    {"id": 15, "en": "New Canadian & Immigration Integration", "fr": "Intégration canadienne et immigration"},
    {"id": 17, "en": "Indigenous Rights", "fr": "Droits autochtones"},
    {"id": 19, "en": "Personal & Community Development", "fr": "Développement de soi et de la communauté"},
    {"id": 0, "en": "_uuncategorised_", "fr": "_non-catégorisé_"}
    //{"id": 0, "en": "not selected", "fr": "non séléctionné"} 
    
];

var footer = { intro : { en: "Made by ", fr: "Écrit par " }, anonymous: { en: "Anonymous", fr: "anonyme" }, delimiter: { en: " | ", fr: " | " }};

//possibly could be decimal/heximal value from 0 ... 1023 / 0 ... 03FF
//which could be decrypted as bynary 1111111111
//where 0: unselected, 1: selected
//e.g. 0111011110 or 478 [or heximal 01DE]

//var selected = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
var selected = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 0];

var dataset;