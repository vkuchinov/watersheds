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
<br>
<b>CONCEPT</b><br>
For this particular project I have to build my own flexible D3 renderer for both models — breaking waves and ripples.
While both systems are build on **particles system**, renderer should deal with nodes array.
<br>
