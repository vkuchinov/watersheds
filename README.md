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
<i>https://github.com/vkuchinov/watersheds/blob/master/localhost/json/tags.json</i><br><br>

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
<h3>MOCK-UPs</h3>
<a href="https://youtu.be/78C9J5WWgbk"><img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/mockupsR.png" width="100%"/></a><br>
click on top of this screenshot to see video ⇪ <br><br>
<a href="https://youtu.be/oF2WPfEOEP4"><img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/mockupsT.png" width="100%"/></a><br>
click on top of this screenshot to see video ⇪ <br><br>
<h3>FOAM</h3>
<img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/foam.png" width="100%"/>
<br>
<i>Foam could be potentially visualised by splitting node into a pack of subparticles or, it's better to say,<br>
a flock due it should be controlled by classical Boids algorithm.<i>
<br><br>
<img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/flock.png" width="100%"/>
<br><br>
<i>There is a danger that in terms of visual communications, because this foamy flock could be considered
as several nodes, however it could visually engaging.<i>
<br><br>
<img src="https://github.com/vkuchinov/watersheds/blob/master/Documentation/assets/flock_v2.png" width="100%"/>
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
<i>Developing my own paradigm of time controll was a waste of time. Instead of this I shoud use native D3 transitions.</i>

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

<h3>January 14th, 2017</h3>

```
[-] -
```

<h3>January 18th, 2017</h3>

```

[x] Basically I've lost several days solving glitchy behaivour. Don't be lazy to double check for variable type.
  It seems that D3 has some problems with taking String to numbers smoothly.

  if you're using debugging console, don't be shy to do it like this

  console.log(variable + " " + typeof variable)

  because if you see 1.234 it doesn't mean that you're dealing with number.
  
```

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
  
```
  autonomous: shows node by node information automatically
  interactive: user could click on desired node to get its information.

  In both cases, old nodes would be replaced with new ones automatically
  with only two parameters timeinterval/number of nodes to replace.

<h3>January 21th, 2017</h3>

```
  URGENT ISSUES TO SOLVE
[x] Eliminate bugs on window resizing, make it 100% stable and proof.
[x] Add DAT.GUI.js or controlKit.js for adjusting parameters
[-] Fully integrate bulletTime() for both visualization

```
  Let's say we have updates every 20 seconds. By this time visualisation
  shoud behave like slow-mo movie, stretching only a few second movement
  along this interval.

  But, with a little trick — it wouldn't be a linear slow-motion, but with
  exponential or anticipatory easing, making scene still-like but with rapid
  and smooth transition to next step at the end of each period.

  I hope it will work well, otherwise we should switch to less spectacular
  series of stills.

<h3>January 27th, 2017</h3>

```
[x] polynomial regression for smoothing motions
```

```

	function Polynomial(data_, time_, order_) {

	    this.get = function(value_){

		var output = a[0];

		for(var  i = 1; i < n; i++){ output += a[i] * Math.pow(value_, i); }

		return output;

	    };

	    this.create2DArray = function(size_) {

		var arr = [];

		for (var i = 0; i < size_; i++) { arr[i] = []; }
		return arr;

	    };

	    this.create1DArray = function(size_) {

		var arr = [];

		for (var i = 0; i < size_; i++) { arr[i] = 0.0; }
		return arr;

	    };

	    var a;

	    var EPSILON = 1E-4;
	    var n, N;

	    var x, y, X, Y, B;

	    if(data_.length != time_.length) { console.log("polynomial: Oooops, bad inputs!"); }

		n = order_; 
		N = data_.length;

		x = [data_.length];
		y = [data_.length];

		for(var i = 0; i < data_.length; i++){

		    x[i] = data_[i];
		    y[i] = time_[i];

		}

		//sigma(xi^2n)
		X = [2 * n + 1]; 

		for (var i = 0; i < 2 * n + 1; i++) {

		    X[i] = 0.0;
		    for (var j = 0; j < N; j++) { X[i] += Math.pow(x[j], i); }

		}

		//normal matrix (augmented)
		B = this.create2DArray(n + 2); 
		a = this.create1DArray(n + 1);

		for (var i = 0; i <= n; i++) { for (var j = 0; j <=n ; j++) { B[i][j] = X[i + j]; }}  

		//sigma(yi^2n)
		Y = [n + 1];              

		for (var i = 0; i < n + 1; i++){

		    Y[i] = 0.0;
		    for (var j = 0; j < N; j++) {  Y[i] += Math.pow(x[j], i) * y[j]; }

		}

		for (var i = 0; i <= n; i++) { B[i][n + 1] = Y[i]; }  

		n++;

		for(var i = 0; i < n; i++){

		    for (var k = i + 1; k < n; k++){

			if (B[i][i] < B[k][i]) {

			    for (var j = 0; j <= n; j++) {

				tmp = B[i][j];
				B[i][j] = B[k][j];
				B[k][j] = tmp;

			    }
			}
		    }
		}


		for (var i = 0; i < n - 1; i++){

		    for (var k = i + 1; k < n; k++){ 

		    t = B[k][i] / B[i][i];
		    for (var j = 0; j <= n; j++) { B[k][j] -= t * B[i][j]; }

		    }

		}

		for (var i = n - 1; i >= 0; i--) {                        

		    a[i] = B[i][n]; 

		    for (var j = 0; j < n; j++) { if (j != i)  { a[i] -= B[i][j] * a[j]; } }

		    a[i] /=  B[i][i];

		} 

	}
```

```

  PUNCTIATION TWEAK
  &quot;TEXT&quot; > en: “TEXT” or fr: «TEXT»

  var fr = ["«", "»"];
  var en = ["“", "”"];
  var quotes = (language_ == "en") ? en : fr;
  text_ = text_.replace(/&quot;/g, function() { var q = quotes[i]; i = 1 - i; return q; });
  
```
<h3>REFERENCES</h3>
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
https://en.wikipedia.org/wiki/Reading_(process)#Reading_rate<br><br>

[-] planning, [!] in progress, [x] done<br><br>
&#42; - with KD-Tree optimisation
