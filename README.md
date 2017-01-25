<h1>Two Visualizations of User-Submitted Text Using HTML/JavaScript</h1><br>
<i>Water Ripples & Breaking [Tidal] Waves</i><br><br>

<h2>LINKS</h2>
http://vkuchinov.github.io/watersheds/index.html?type=rippling&mode=autonomus
http://vkuchinov.github.io/watersheds/index.html?type=tidal&mode=autonomus
<br>
<br><br>
<b>3rd PARTY LIBRARIES:</b><br>
<i>https://google.github.io/liquidfun</i><br>
<i>https://github.com/google/liquidfun/releases</i><br>
<i>https://github.com/ubilabs/kd-tree-javascript</i><br>

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
<br>
<h4>UPDATE January, 2017</h4><br>
![D3.RENDERER](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/foam.png?raw=true)
<br>
<i> * foam could be potentially visualised by splitting node into a pack of subparticles or, it's better to say,<br>
a flock due it should be controlled by classical Boids algorithm.<i>
<br><br>
![D3.RENDERER](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/flock.png?raw=true)<br><br>
There is a danger that in terms of visual communications, because this foamy flock could be considered<br>
as several nodes, however it could visually engaging. 
<br><br>
![D3.RENDERER](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/flock_v2.png?raw=true)
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
<h3>XML DATA STRUCTURE [WISHES]</h3>
```
<wish>
	<id>483</id>
	<partnerid>4006</partnerid>
	<featured>0</featured>
	<name>Benmoussa</name>
	<age>65</age>
	<city></city>
	<text><![CDATA[Hello Canada!]]></text>
</wish>
```
<br>
Data could be hardly sticked to each node by<br>
```
var desc = element.append("circle")
  // set attributes
  .append("desc")
  .attr("xmlns", "http://www.w3.org/1999/xhtml");
  desc.append("mydoc:name").html("John Snow");
  desc.append("mydoc:para").html("Winter<mydoc:emph>is</mydoc:emph> coming.");
```
<br>
<h3>D3.RENDERER <i>[04/01/2017]</i></h3>
![D3.RENDERER](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/screenshotB.png?raw=true)
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
<h2>COLOUR PALETTE</h2>
|                    |                      |                 |
|--------------------|----------------------|-----------------|
| Pink: #F59DAE      | Red: #D43D31         | Brown: #815A3D  |
| Green: #92CA70     | Orange: #F19436      | Purple: #925E8E |
| Teal: #6AC5B3      | Black: #241F1F       |                 |
| Blue: #397BA3      | Yellow: #ECBE42      |                 |
<br>
![alt tag](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/colours2.png)
<br>
<h2>DAILY TODO LIST</h2>
<h3>January 10th, 2017</h3>
```
[!] D3Renderer.bulletTime() function
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
[x] predefined color palette, by names or as array
[!] Timer() function for bulletTime()
```
<h3>January 12th, 2017</h3>
```
[!] each moving object should have composite speed parameter { step: f/θ, interval: t, ratio: μ }
[!] Ripple() function for <i>ripples concept</i>
[!] Generator() function
```
<h3>January 13th, 2017</h3>
```
[-] fully functional 'ripples' mock-up 
[x] all bulletTime() concept have to be done on native D3.js transitions rather on my own class and methods
```
<h6><i>Developing my own paradigm of time controll was a waste of time. Instead of this I shoud use native D3 transitions.<i></h6>
```
//method(d3_element, {"r" : 32, "cx" : width/2... }, {"r" : 128, "cx" : 0, ... }, millis, "exp" or any D3 easing, true/false)
//where parameters could be any set of attrbutes

function setBulletTime(object_, parameters0_, parameters1_, duration_, type_, loop_){

            if(Object.keys(parameters0_).length==Object.keys(parameters1_).length 
               && Object.keys(parameters0_).every(function(v,i) { return v === Object.keys(parameters1_)[i]})) {
      
                object_.attr(parameters0_)
                .transition()
                .ease(type_)
                .duration(duration_)
                .attr(parameters1_)
                .each("end", function(d) { if(loop_) { setBulletTime(object_, parameters0_, parameters1_, duration_, type_, loop_); } else { this.remove(); } } ); 
                
            } else { console.log("Oooops, something wrong!"); }

        }
        
        function removeBulletTime(object_, parameters_){ object_.transition(); }
```
<h6><i>This solution is very elegant to my own.<i></h6>
[![RIPPLES #3](https://img.youtube.com/vi/JxC8tNoihRI/0.jpg)]
(https://www.youtube.com/watch?v=JxC8tNoihRI)
<br>
<h3>January 14th, 2017</h3>
```
[-] - 
```
<h3>January 17th, 2017</h3>
[x] upgrading console method for checking variable typeof
```
<h3>January 18th, 2017</h3>
![alt tag](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/prebuildA.png)<br>
![alt tag](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/prebuildB.png)<br>

[x] Basically I've lost several days solving glitchy behaivour. Don't be lazy to double check for variable type.
    It seems that D3 has some problems with taking String to numbers smoothly.
   
    if you're using debugging console, don't be shy to do it like this 
    
    console.log(variable + " " + typeof variable)
    
    because if you see 1.234 it doesn't mean that you're dealing with number.
```
[![RIPPLES #3](https://img.youtube.com/vi/92dTMAvsd6E/0.jpg)]
(https://www.youtube.com/watch?v=92dTMAvsd6E)
<br>
![alt tag](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/prebuildA.png)<br>
![alt tag](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/prebuildB.png)<br>

<br><br>
<h2>TIMING</h2><br>
Adult literate people don't read by the character. They do that only for foreign languages in the first stages of learning that language, and even that mostly for languages using a script very different from the languages they do know (as an English speaker would for Arabic, but not for German). Otherwise the word registers in the brain as a whole, pretty much immediately. Perhaps for the word "encyclopedia" it would take longer than for the word "ant", but the difference is a matter of milliseconds at best, and probably not even that. Also, it's both extremely subjective (based on how frequently that person uses that word) and extremely difficult to measure.
<br><br>
According to Wikipedia the average reading speed from coumputer/tablet screen(English) is ~160-180 words per minute [wpm].
Let's say that comfortable rate would be even smaller — 120 wpm.
<br><br>
By now there are around 240 wishes available for analyses.<br><br>
<b>The minimal length is 8 characters or 2 words. [filtered empty wishes]<br>
Average wish is 152 characters or 24 words.<br>
The biggest message is 1402!!! characters or 228 words!!! [looks like anomaly]</b><br>
```
There are several issues that I would like to see resolved within my lifetime, much earlier than 150
years from now, but I will discuss two. The number one issue that needs immediate attention is
the unacceptable conditions of Indigenous communities across the country. 
Today, we still have many communities struggling with epidemics of youth suicide and domestic violence,
substance abuse, a vast lack of employment opportunities, among many other issues.
Culminating in the height of the emergency status that many Indigenous communities and individuals
have existed in for decades is the issue of Missing and Murdered Indigenous women - an issue that
I relate to, to an extent, as a young, racialized, female survivor of sexual assault.
My feelings on the topic of Indigenous issues in our country are so powerful that I believe
we need to actively work towards reconciliation and solutions as soon as possible, in order
to be a genuine global leader on social justice issues. The second issue I find most pressing in Canada,
vital to change within 150 years, is electoral reform. Our current First-Past-The-Post system is outdated,
limited, and unfair to the diversity of issues and interests that communities have throughout the country.
A move away from such a system that encourages strategic voting will ensure that our key democratic processes
are renewed and that our votes start to truly count.
```
Looks like a small essay. Is it real or a 'stress-test' mock-up?
<br><br>
So, if we are dealing with average, in 20 seconds (1/3 of minute) we could confortably<br>
show up to 5 wishes.<br><br>
<b>Ideally, there should be extended analyses algorithm for calculating showing time for every<br>
single wish based on its content length.</b>
<br><br>
Meanwhile, we are doing data-driven visualisation, so it's ridiculous to use randomness everywhere.<br>
For example, node radius could reference wish length and, for at least rippling concept, node could have XY<br>
position based on other metadata, let's say cities or its attitute/lattitude due its polar coordinate<br>
system, which is ideally fitted to radial positioning.<br>
<br>
There are some more metadata like name and age. The latter could be used as node lifetime of could affect<br>
particle speed. 
<br><br>
![alt tag](https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/timeStretching.png)<br>
<br>
<h3>January 19th, 2017</h3>
```
[x] applying categories
    
    There are 10 categories as well as there are 10 colors, so I could suggest
    that I should keep the same order Inclusivity>pink ... Personal>black
  
    var categories = [
    
        {id: 1, en: "Inclusivity & Accessibility", fr: "Inclusivité et accessibilite"},
        {id: 3, en: "Cultural & Historical Conservation", fr: "Conservation culturelle et historique"},
        {id: 5, en: "Environmental Sustainability", fr: "Viabilité de l’environnement"},
        {id: 7, en: "Human Rights", fr: "Droits humains"},
        {id: 9, en: "Physical & Mental Health", fr: "Santé physique et mentale"},
        {id: 11, en: "LGBTQ2A Rights", fr: "Droits LGBTQ2A"},
        {id: 13, en: "Political Representation", fr: "Représentation politique"},
        {id: 15, en: "New Canadian & Immigration Integration", fr: "Intégration canadienne et immigration"},
        {id: 17, en: "Indigenous Rights", fr: "Droits autochtones"},
        {id: 19, en: "Personal & Community Development", fr: "Développement de soi et de la communauté"}
        
    ]
```
<h3>January 20th, 2017</h3>
```
[!] Two modes: self-running/autonomous [for projecting] & interactive [for users]
    ?type=rippling/tidal & mode="autonomous/interactive
    
    autonomous: shows node by node information automatically
    interactive: user could click on desired node to get its information
    
    In both cases, old nodes would be replaced with new ones automatically
    with only two parameters timeinterval/number of nodes to replace
```
<h3>January 21th, 2017</h3>
```
    URGENT ISSUES TO SOLVE
[x] Eliminate bugs on window resizing, make it 100% stable and proof.
[x] Add DAT.GUI.js or controlKit.js for adjusting parameters
[-] Fully integrate bulletTime() for both visualization
    Let's say we have updates every 20 seconds. By this time visualisation
    shoud behave like slow-mo movie, stretching only a few second movement 
    along this interval.
    
    But, with a little trick — it wouldn't be a linear slow-motion, but with
    exponential or anticipatory easing, making scene still-like but with rapid
    and smooth transition to next step at the end of each period. 
    
    I hope it will work well, otherwise we should switch to less spectacular
    series of stills.
    
```
<h3>January 2xth, 2017</h3>
```
    URGENT ISSUES TO SOLVE
[!] Flocking subparticles for tidal visualisation
    https://github.com/vkuchinov/watersheds/blob/master/README.md#update-january-2017
```

<h3>January 27th, 2017</h3>
```
FINAL DEADLINE
```
<br>
[-] planning, [!] in progress, [x] done

<br>
ADDITIONAL REFERENCES:<br>
<br>
http://research.tigweb.org/wishes/raw.html<br>
<i>?limit=value desired amount of wishes from beginning<br>

<br>
http://easings.net/<br>
http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm<br>
https://github.com/jesusgollonet/processing-penner-easing/<br>
<br>
http://darsa.in/fpsmeter/
<br>
https://en.wikipedia.org/wiki/Words_per_minute<br>
https://en.wikipedia.org/wiki/Reading_(process)#Reading_rate<br>
