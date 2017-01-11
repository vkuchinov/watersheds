<h1>Two Visualizations of User-Submitted Text Using HTML/JavaScript</h1><br>
<i>Water Ripples & Breaking [Tidal] Waves</i><br><br>

<b>REFERENCES:</b><br>
<i>https://google.github.io/liquidfun</i><br>
<i>https://github.com/google/liquidfun/releases</i><br>

<br>
<h3>Tidal Waves Mockup <i>[03/01/2017]</i></h3>

[![TIDAL WAVES #1](https://img.youtube.com/vi/WZ-hD1UAbcU/0.jpg)]
(https://www.youtube.com/watch?v=WZ-hD1UAbcU)
<br><br>
[![TIDAL WAVES #2](https://img.youtube.com/vi/pQE2KMbGi9M/0.jpg)]
(https://www.youtube.com/watch?v=pQE2KMbGi9M)
<br>
<b>CONCEPT</b><br>
LiquidFun.js has been used as core physics library and <i>wave machine</i> model to simulate tidal waves movement.
Foam [bluish bubbles] is created by comparing each particle density with 'rest density' or, in this case, simple
algorithm of defining closest neighbours and checking distances.
<br><br>
While there are lots of particles, I have been implemented KD-Tree — a space-partitioning data structure for organizing points 
in a k-dimensional space and making neighbours search more efficient. The library was made by Ubilabs and coud be found via this 
[a link](https://github.com/ubilabs/kd-tree-javascript) on GitHub.
<br><br>
Each node would have its own lifetime value and by its death would be replaced by a new one from XML feed. Virtually
it would be the same object, but with different data, colour and radius.
<br><br>

<h3>Ripples Mockup <i>[03/01/2017]</i></h3>

[![RIPPLES #1](https://img.youtube.com/vi/ITazx-Qvt2M/0.jpg)]
(https://www.youtube.com/watch?v=ITazx-Qvt2M)
<br>
<br>
[![RIPPLES #2](https://img.youtube.com/vi/gLMLfGJj8w4/0.jpg)]
(https://www.youtube.com/watch?v=gLMLfGJj8w4)
<br>
<b>CONCEPT</b><br>
Through experiments I came to this model where particles have its own static position and invisible ripples (waves) are 
rocking them, making particles visually closer or distancing.
<br><br>
By now it is the most sucessfull model for this project. Each particles would have its own lifetime and would be changes
by a newer node from XML by its death. The new node would have its own unique position.
<br><br>

<br>
<h3>D3.RENDERER <i>[04/01/2017]</i></h3>
![D3.RENDERER](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/screenshotA.png?raw=true)
<br>
<br>
<i>https://github.com/vkuchinov/watersheds/blob/master/localhost</i><br>

<b>CONCEPT</b><br>
For this particular project I have to build my own flexible D3 renderer for both models — breaking waves and ripples.
While both systems are build on **particles system**, renderer should deal with nodes array.
<br>
<h3>TAGS JSON</h3>
<i>https://github.com/vkuchinov/watersheds/blob/master/localhost/json/tags.json</i>
<br><i>could be easily re-engineered to XML format</i><br>
<br>
```
{
    "name" : "columns", "children" : [
        { "name" : "locations", "children" : 
            [
                { "id" : 0, "name" : "Canada", "visible" : true },
                { "id" : 1, "name" : "Toronto", "visible" : true },
                { "id" : 2, "name" : "Ottawa", "visible" : true },
                { "id" : 3, "name" : "Oakville", "visible" : true },
                { "id" : 4, "name" : "Montreal", "visible" : true }
            ]
        },
       { "name" : "topics", "children" : 
            [
                { "id" : 5, "name" : "#health", "visible" : true },
                { "id" : 6, "name" : "#culture", "visible" : true },
                { "id" : 7, "name" : "#ecology", "visible" : false }
            ]
        },
        { "name" : "questions", "children" : 
            [
                { "id" : 8, "name" : "Tell us your vision about mental health?", "visible" : true },
                { "id" : 9, "name" : "Tell us your vision for 2034?", "visible" : true },
                { "id" : 10, "name" : "What is your wish for clean water?", "visible" : true },
                { "id" : 11, "name" : "What is your wish for 2017?", "visible" : true }
            ]
        }
    ]
}
```
<br>
<h2>COLOUR PALLETE</h2>
| ------------------ |:--------------------:| ---------------:|
| Pink: #F59DAE      | Red: #D43D31         | Brown: #815A3D  |
| Green: #92CA70     | Orange: #F19436      | Purple: #925E8E |
| Teal: #6AC5B3      | Black: #241F1F       |                 |
| Blue: #397BA3      | Yellow: #ECBE42      |                 |
<br>
<h2>DAILY TODO LIST</h2>
<h3>January 10th, 2017</h3>
```
[!] D3Renderer.timelapse() function
[x] D3Renderer.updateData() function
[x] D3Renderer.highlightNode(system_, id_) function
```
<h6><i>timelapse() should be actually custom easing transition for experimenting on the edge of still and motion.
<br>There is a good example of D3.js easing, however we have to do our own method very close to exponential growth.
<br>See https://bl.ocks.org/mbostock/248bac3b8e354a9103c4 [expIn, backIn, expInOut, backInOut]<br>
<br>or https://github.com/d3/d3-ease
<br>
expIn > exponential growth > x{t}=x{0}(1+r)^{t}, where r is a growth rate, e.g. r = 5% = 0.05 per interval<br>
backIn > anticipatory easing > x{t}=1-(1 - t)
<i></h6>
<h6><i>It seems that there are only 230 items at http://research.tigweb.org/wishes/raw.html by now
or script is limiting it to this number. Have to sort it out, because for now I need a least 
several thousands for testing.<br>For now, I have copy-pasted same elements locally, although 
it would be better to work with real XML data from your server.<i></h6>
<h3>January 11th, 2017</h3>
```
[-] Timer() function
```

[-] planning, [!] in progress, [x] done
<br><br>
ADDITIONAL REFERENCES:<br>
http://easings.net/<br>
http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm<br>
