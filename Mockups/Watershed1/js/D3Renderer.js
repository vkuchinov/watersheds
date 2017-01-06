/*

<wish>
	<id>483</id>
	<partnerid>4006</partnerid>
	<featured>0</featured>
	<name>Benmoussa</name>
	<age>65</age>
	<city></city>
	<text><![CDATA[Plus de prospérité, d'harmonie sociale et d'impact sur la justice et la paix mondiales]]></text>
</wish>


REFERENCES:
Z-Index @ SVG
http://stackoverflow.com/questions/13595175/updating-svg-element-z-index-with-d3

*/

var dataset;
var mouseX = 0, mouseY = 0;

var D3Renderer = {
    
	init: function(){
        
		var viz = d3.select('body').append('svg').attr('id', 'viz').append('g').classed('world', true);
        
        d3.xml(XML_URL, function(error, data) {

            if (error) throw error;

              dataset = [].map.call(data.querySelectorAll("wish"), function(wish) {

                return {

                  id: wish.querySelector("id").textContent,
                  partner: wish.querySelector("partnerid").textContent,
                  featured: wish.querySelector("featured").textContent,
                  name: wish.querySelector("name").textContent,
                  age: wish.querySelector("age").textContent,
                  city: wish.querySelector("city").textContent,
                  message: wish.querySelector("text").textContent

                };
              });

        D3Renderer.feed();

        });
        
		D3Renderer.resize();
	},
    
	render: function(world){
        
        
		var viz = d3.select('svg#viz g.world');
        
        if(currentFrame % 20 == 0) { d3.selectAll("g.nodes").remove(); D3Renderer.drawNodes(viz); }
        //D3Renderer.processNodes(viz);
        
        d3.selectAll("g.HUD").moveToFront();
    
	},
    
    
    feed: function(){
        
        var min = Math.min(MAX_NODES, dataset.length);
        
        for(var i = 0; i < min; i++){

            var a = -Math.PI + Math.random() * Math.PI * 2.0;
            var x = monteCarloDistribution(MAX_RADIUS) * Math.cos(a);
            var y = monteCarloDistribution(MAX_RADIUS) * Math.sin(a);
            nodes.push(new Node(i, x, y, null));

        }
        
    },
    
    applyRipples: function(node_, ripples_){
    
        var radius = 0.0;
        if(ripples_.length > 0){
            
            var nodePosition = new Vector2(node_.cx, node_.cy);
            var mag = Math.sqrt(Math.pow(node_.cx, 2.0) + Math.pow(node_.cy, 2.0));
            
            for(var i = 0; i < ripples_.length; i++){
                
                var closestPosition = new Vector2(node_.cx / mag * ripples_[i].radius, node_.cy / mag * ripples_[i].radius);
                if(nodePosition.dist(closestPosition) < 16) {
                    
                    radius = node_.radius * nodePosition.dist(closestPosition) / 10; break; 
                    
                }

            }
            
        }
        
        return radius;
        
    },
    
    HUD: function(viz_, id_, x_, y_, visible_) {

            d3.selectAll("g.HUD").remove();
        
            var HUD = viz_.append("g")
                          .classed('HUD', true)
                          .attr("transform", "translate(" + x_ + "," + y_ + ")");
            
                          HUD.append("rect")
                          .attr("x", 0)
                          .attr("y", 0)
                          .attr("width", "32px")
                          .attr("height", "92px")
                          .style("fill", "#1293DC")
                          .style("fill-opacity", 0.8);
        
                           HUD.append("rect")
                           .attr("x", 0)
                           .attr("y", 0)
                           .attr("transform", "translate(32,0)")
                           .attr("width", "312px")
                           .attr("height", "92px")
                           .style("fill", "#DCDCDC")
                           .style("fill-opacity", 0.8);
      
                           var label = HUD.append("g")
                           .attr("transform", "translate(" + 40 + "," + 16 + ")");
        
//                           label.append("text")
//                                .style("font-family", "Arial")
//                                .style("font-size", "12px")
//                                .style("text-anchor", "start")
//                                .text(dataset[id_].message);
                           D3Renderer.wrapLabel(label, "message here", 296);
        
                           //.call(wrap(dataset[id_].message, 32));
                           //.attr("transform", "translate(40,0)")
                           //.style("font-family", "Arial")
                           //.style("font-size", "12px")
                           //.style("text-anchor", "start")
                           //.text(dataset[id_].message);
                       
                       
            if(!visible_) { d3.selectAll("g.HUD").remove(); }

    },
    
    drawNodes: function(viz_){

        var group = viz_.append("g").classed("nodes", true);
        
        for(var n = 0; n < nodes.length; n++){
            
            var node = group.append("circle")
                           .attr("id", n)
                           .attr("cx", nodes[n].cx)
                           .attr("cy", nodes[n].cy)
                           .attr("r", D3Renderer.applyRipples(nodes[n], ripples.ripples))
                           .style("fill", d3.hsl(nodes[n].hue, 0.8, 0.7))
                           .style("stroke", "#FFFFFF")
                           .style("stroke-width", 0)
                           .on("mouseover", function(d, i){ d3.select(this).style("stroke-width", 4); D3Renderer.HUD(viz_, d3.select(this).attr("id"), d3.select(this).attr("cx"), d3.select(this).attr("cy"), true); })
                           .on("mouseout", function(d, i){ d3.select(this).style("stroke-width", 0);  D3Renderer.HUD(viz_, 0, -1000, -1000, false); })
            
        }
        
        //group.exit().remove();

    },

    click: function(mouseX_, mouseY_) {
        
        mouseX = mouseX_;
        mouseY = mouseY_;
        
    },
    
    wrapLabel: function (group_, text_, length_){
        
        var text = group_.append("text")
                         .attr("font-family", "Arial")
                         .attr("font-size", 12);
        
        var words = text_.split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1,
        y = 0,
        dy = 0,
        
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            
            line.push(word);
            tspan.text(line.join(" "));
            if(tspan.node().getComputedTextLength() > length_) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
              }
        }

    },
    
	resize: function(){
		var w = window.innerWidth, h = window.innerHeight;
		var scale = 1.0; //(w < h ? w : h) * 1.0;
		var viz = d3.select('svg#viz');
		viz.style('width', '100%').style('height', h + 'px');
		var translate = 'translate(' + (w/2) + ', ' + (h/2 + scale*2) + ')';
		var scale = 'scale(' + scale + ', ' + (scale) + ')';
		viz.select('g').attr('transform', [translate, scale].join());
	}
};

d3.selection.prototype.moveToFront = function() { return this.each(function(){ this.parentNode.appendChild(this); }); };