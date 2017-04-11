<h1>Watersheds: Two Visualizations of User-Submitted Text Using HTML/JavaScript</h1>
<h3>Water Ripples & Breaking [Tidal] Waves Visualisations Based on D3.JS & LiquidFun.JS*</h3>
<h4>TIDAL VISUALISATION</h4>
<a href="http://youtu.be/Da_vvlkevOw"><img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/finalT.png" width="100%"/></a><br>
click on top of this screenshot to see video ⇪ <br><br>
<img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/tidals4.png" width="100%"/>
<h4>WATER RIPPLING VISUALISATION</h4>
<a href="http://youtu.be/BW5XJgO4eXU"><img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/finalR.png" width="100%"/></a><br>
click on top of this screenshot to see video ⇪ <br><br>
<img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/ripplings2.png" width="100%"/>
<h4>XML DATA STRUCTURE [WISHES]</h4>

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
<h4>TAGS JSON</h4>
<i>https://github.com/vkuchinov/watersheds/blob/master/localhost/json/tags.json</i><br>

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
<h4>COLOUR TABLE</h4>
<table >
	<tbody>
		<tr>
			<td>Pink: #F59DAE</td>
			<td>Green: #92CA70</td>
			<td>Teal: #6AC5B3</td>
			<td>Blue: #397BA3</td>
		</tr>
		<tr>
			<td>Red: #D43D31</td>
			<td>Orange: #F19436</td>
			<td>Black: #241F1F</td>
			<td>Yellow: #ECBE42</td>
		</tr>
		<tr>
			<td>Brown: #815A3D</td>
			<td>Purple: #925E8E</td>
			<td> </td>
			<td> </td>
		</tr>
	</tbody>
</table><br>
<img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/colours2.png"/>
<h2>DAILY TODO LIST</h2>
<h3>January 10th, 2017</h3>

```
[!] D3Renderer.bulletTime() function
[x] D3Renderer.updateData() function
[x] D3Renderer.highlightNode(system_, id_) function
```
<i>timelapse() should be actually custom easing transition for experimenting on the edge of still and motion.
There is a good example of D3.js easing, however we have to do our own method very close to exponential growth.
See https://bl.ocks.org/mbostock/248bac3b8e354a9103c4 [expIn, backIn, expInOut, backInOut]
or https://github.com/d3/d3-ease<br>
<br>
expIn > exponential growth > x{t}=x{0}(1+r)^{t}, where r is a growth rate, e.g. r = 5% = 0.05 per interval<br>
backIn > anticipatory easing > x{t}=1-(1 - t)<br>
<br>
It seems that there are only 230 items at http://research.tigweb.org/wishes/raw.html by now
or script is limiting it to this number. Have to sort it out, because for now I need a least
several thousands for testing.<br>For now, I have copy-pasted same elements locally, although
it would be better to work with real XML data from your server.</i><br>
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

[-] planning, [!] in progress, [x] done<br><br>
&#42; - with KD-Tree optimisation
