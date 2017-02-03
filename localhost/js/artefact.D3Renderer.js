/**
 *
 * @D3RENDERER
 * A very basic library designed for visualising LiquidFun particle system
 * as well as my own model for circular waves.
 *
 * There are 3 general items: system, HUD (information pop-up) and tags menu.
 *
 * @author Vladimir V. KUCHINOV
 * @email  helloworld@vkuchinov.co.uk
 *
 */
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
 
    SVG STRUCTURE

    svg > scene

          scene > particles [group]

                  particles > nodes [circles]

                > tags [group]

                > hover [group]
            

REFERENCES:
Z-Index @ SVG
http://stackoverflow.com/questions/13595175/updating-svg-element-z-index-with-d3

var text_element = plot.select("text");
var textWidth = text_element.node().getBBox().width

*/
var XML_LIMIT = 512;
var XML_URL = "xml/data.xml";

var TAGS_URL = "json/tags.json"
var tagStyle = {
    active: "#1D1D1D",
    inactive: "#CECECE",
    over: "#494949",
    label: "#929497",
    typeface: "Montserrat",
    size: 12
};

var HUD_SCALE = 1.2;

var hudStyle = {
    tag: "#1293DC",
    textarea: "#DCDCDC",
    message: "#171717",
    typeface: "Open Sans",
    size: 11,
    weight: "lighter",
    spacing: 1.2
};

var particleStyle = {
    stroke: "#FFFFFF",
    weight: 2.5,
    opacity: 0.9,
    min: 8.0,
    max: 16.0
};

var D3Renderer = {

    init: function() {

        scene = d3.select("body").append("svg").attr("id", "scene").style("width", "100%").style("height", "100%");

        //TAGS INITIALIZATION

        var width = 600;
        var height = 400;
        var val = 0;

//        d3.json(TAGS_URL, function(error, tags_) {
//
//            if (error) throw error;
//
//            var max = [0, 0, 0];
//            var mult = function(array_, index_) {
//                var sum = 0;
//                for (var i = 0; i < index_; i++) {
//                    sum += array_[i];
//                }
//                return sum;
//            };
//
//            tags_.forEach(function(d) {
//                max[d.column] = Math.max(max[d.column], D3Renderer.getTextWidth(d.name));
//            });
//
//            tags_.forEach(function(d) {
//
//                var tag = scene.append("g")
//                    .attr("id", d.name, true)
//                    .attr("class", "tags")
//                    .attr("transform", "translate(" + (32 + mult(max, d.column) * 1.25) + ", " + (32 + d.index * 28) + ")")
//                    .on("mouseover", function(d) {
//                        d3.select(this).select("rect").attr("fill", tagStyle.over);
//                    })
//                    .on("mouseout", function(d) {
//
//                        d3.select(this).select("rect").attr("fill", tagStyle.active);
//                    })
//
//
//                var background = tag.append("rect")
//                    .attr("x", -6)
//                    .attr("y", -12)
//                    .attr("width", D3Renderer.getTextWidth(d.name) + 6)
//                    .attr("height", 22)
//                    .attr("fill", tagStyle.active)
//
//                var label = tag.append("text")
//                    .attr("fill", tagStyle.label)
//                    .style("font-size", tagStyle.size)
//                    .style("font-family", tagStyle.typeface)
//                    .style("text-anchor", "left")
//                    .style("alignment-baseline", "middle")
//                    .text(d.name);
//
//            });
//
//        });

        //PARTICLES particles
        particles = scene.append("g").attr("id", "particles");
        //console.log(d3.select("svg > scene > particles"));


        d3.xml(XML_URL, function(error, data) {

            if (error) throw error;

            dataset = [].map.call(data.querySelectorAll("wish"), function(wish) {

                return {

                    id: parseInt(wish.querySelector("id").textContent),
                    partner: wish.querySelector("partnerid").textContent,
                    featured: wish.querySelector("featured").textContent,
                    name: wish.querySelector("name").textContent,
                    age: parseInt(wish.querySelector("age").textContent),
                    city: wish.querySelector("city").textContent,
                    category: parseInt(wish.querySelector("categoryid").textContent),
                    message: wish.querySelector("text").textContent,
                    language: wish.querySelector("language").textContent

                };
            });

            D3Renderer.analyse(dataset);
            //D3Renderer.feed(particles);

        });

        //D3Renderer.HUD(scene, 0, 46, 200, true);
        D3Renderer.resize();

    },

    render: function(scene_) { scene = d3.select("svg#scene"); },

    analyse: function(data_) {

        var total = 0;
        var result = {
            min: -1,
            max: 0,
            average: 0,
            id: 0
        };

        console.log("There are " + data_.length + " wishes");

        for (var i = 0; i < data_.length; i++) {

            var parsed = data_[i].message.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
            total += parsed.length;
            result.max = Math.max(result.max, parsed.length);
        }

        result.average = Math.floor(total / data_.length);

    },

    updateData: function(particles_) {

        var indices = [];

        nodes.forEach(function(entry) {
            indices.push(entry.id);
        });
        var first = Math.min.apply(Math, nodes.id);
        var last = Math.max.apply(Math, nodes.id);

        var a = -Math.PI + Math.random() * Math.PI * 2.0;
        var x = ripplingparticles.monteCarlo(MAX_RADIUS) * Math.cos(a);
        var y = ripplingparticles.monteCarlo(MAX_RADIUS) * Math.sin(a);

        if (last < dataset.length) {
            first = new Node(last.id + 1, x, y, null);
        } else {
            console.log("You have reached the end of XML universe!")
        };

    },

    drawCircle: function(scene_, x_, y_, radius_) {

        scene_.append("circle")
            .attr("id", "test", true)
            .attr("cx", x_)
            .attr("cy", y_)
            .attr("r", radius_)
            .attr("stroke", "#DEDEDE")
            .attr("stroke-width", 1.0)
            .attr("fill", "none");

    },

    drawParticle: function(group_, id_, x_, y_, radius_, color_) {

        group_.append("circle")
            .attr("id", "particle_" + id_)
            .attr("cx", x_)
            .attr("cy", y_)
            .attr("r", radius_)
            .attr("stroke", particleStyle.stroke)
            .attr("stroke-width", 0.0)
            .attr("fill", color_)
            .on("mouseover", function(d) {
                d3.select(this).attr("stroke-width", particleStyle.weight);
            })
            .on("mouseout", function(d) {
                d3.select(this).attr("stroke-width", 0.0);
            });

    },

    HUD: function(scene_, object_, message_, language_, x_, y_, visible_) {

        var bbox = object_.node().getBBox();
        middleX = bbox.x + (bbox.width / 2),
        middleY = bbox.y + (bbox.height / 2);
        
        var absoluteXY = getScreenXY(scene, object_, middleX, middleY);

        x_ = absoluteXY.x;
        y_ = absoluteXY.y;
        
        d3.selectAll("g.HUD").remove();

        var w = window.innerWidth;
        var h = window.innerHeight;
        
        var systemX = 0, systemY = 0;
        
        var params = {
            x: x_,
            y: y_,
        };

        //top left
        if (x_ <= w / 2 && y_ <= h / 2) {
            params = {
                x: 0,
                y: 0,
                rx: 32,
                tx: 0,
                lx: 40,
                ly: 16
            }
        } else if (x_ <= w / 2 && y_ > h / 2) {
            params = {
                x: 0,
                y: 92,
                rx: 32,
                tx: 0,
                lx: 40,
                ly: 16
            }
        } else if (x_ > w / 2 && y_ <= h / 2) {
            params = {
                x: 344,
                y: 0,
                rx: 0,
                tx: 312,
                lx: 8,
                ly: 16
            }
        } else {
            params = {
                x: 344,
                y: 92,
                rx: 0,
                tx: 312,
                lx: 8,
                ly: 16
            }
        }

        var HUD = scene_.append("g")
            .attr("id", "HUD");
        
        HUD.append("rect")
            .attr("x", params.rx)
            .attr("y", 0)
            .attr("width", "312px")
            .attr("height", "92px")
            .style("fill", hudStyle.textarea)
            .style("fill-opacity", 0.9);

        HUD.append("rect")
            .attr("x", params.tx)
            .attr("y", 0)
            .attr("width", "32px")
            .attr("height", "92px")
            .style("fill", D3Renderer.setColor(object_.attr("fill")))
            .style("fill-opacity", 0.9);

        HUD.append("circle")
            .attr("cx", params.x)
            .attr("cy", params.y)
            .attr("r", (Number(object_.attr("r")) / HUD_SCALE))
            .attr("fill", object_.attr("fill"))
            .attr("stroke", "#FFFFFF")
            .attr("stroke-width", 2.5);

        var label = HUD.append("g")
            .attr("id", "placeholder")
            .attr("transform", "translate(" + params.lx + "," + params.ly + ")");

        D3Renderer.wrapLabel(label, message_, language_, 282);

        HUD.attr("opacity", 0.0)
            .transition()
            .duration(1500)
            .attr("opacity", 1.0);

        HUD.attr("transform", "translate(" + (x_ - params.x * HUD_SCALE) + "," + (y_ - params.y * HUD_SCALE) + "),scale(" + HUD_SCALE + ")");
        
        if (!visible_) {
            d3.selectAll("g.HUD").remove();
        }
        
        d3.selectAll(".tags").moveToFront();

    },

    highlight: function(particles_, id_) {

        var obj = particles_.select("#particle_" + id_.nodeID);

        //obj.attr("stroke-width", particleStyle.weight);

        d3.selectAll("g.HUD").remove();

        var values = particles_.attr("transform").replace("translate(", "").replace(")", "").trim().split(",");

        var translateX = parseInt(values[0]) + parseInt(obj.attr("cx"));
        var translateY = parseInt(values[1]) + parseInt(obj.attr("cy"));

        var message = dataset[id_.xmlID].message.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
        if (message == "" || message == undefined || message == null) {
            message = "there is no comments";
        }

        this.HUD(scene, obj, message, dataset[id_.xmlID].language, translateX, translateY, true);

    },

    bulletTime: function(object_, parameters0_, parameters1_, duration_, type_, loop_) {

        if (Object.keys(parameters0_).length == Object.keys(parameters1_).length &&
            Object.keys(parameters0_).every(function(v, i) {
                return v === Object.keys(parameters1_)[i]
            })) {

            object_.attr(parameters0_)
                .transition()
                .ease(type_)
                .duration(duration_)
                .attr(parameters1_)
                .each("end", function(d) {
                    if (loop_) {
                        D3Renderer.BulletTime(object_, parameters0_, parameters1_, duration_, type_, loop_);
                    } else {
                        this.remove();
                    }
                });

        } else {
            console.log("Oooops, something wrong!");
        }

    },

    removeBulletTime(object_, parameters_) {
        object_.transition();
    },

    getTextWidth: function(text_) {

        var template = d3.select("body").append("svg").attr("id", "template").attr("width", "100%").attr("height", "100%");

        var text = template.append("text")
            .style("font-size", "12px")
            .style("font-family", "Montserrat")
            .style("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .text(text_);

        var output = text.node().getBBox().width * 1.5;
        template.remove();

        return output;

    },

    click: function(mouseX_, mouseY_) {

        mouseX = mouseX_;
        mouseY = mouseY_;

    },

    wrapLabel: function(group_, text_, language_, length_) {

        var MESSAGE_LIMIT = 42; //0: bypassing this feature

        var formatted = D3Renderer.formatPunctuation(text_, language_);
        
        var text = group_.append("text")
            .attr("fill", hudStyle.message)
            .attr("font-family", hudStyle.typeface)
            .attr("font-size", hudStyle.size)
            .attr("font-weight", hudStyle.weight);

        var words = formatted.split(/\s+/).reverse();

        //limiting option
        if (words.length > MESSAGE_LIMIT && MESSAGE_LIMIT != 0) {
            words = words.slice(words.length - MESSAGE_LIMIT);
            words[0] = "...";
        }
        var word,
            line = [],
            lineNumber = 0,
            lineHeight = hudStyle.spacing,
            y = 0,
            dy = 0,

            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {

            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > length_) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }

    },
    
    formatPunctuation : function(text_, language_){
        
        //&amp; > &
        text_ = text_.replace(new RegExp("&amp;", "g"), "&");

        //&quot; > en: “text”, fr: «text»
        var i = 0;
        var fr = ["«", "»"];
        var en = ["“", "”"];
        var quotes = (language_ == "en") ? en : fr;
        text_ = text_.replace(/&quot;/g, function() {  var q = quotes[i]; i = 1 - i; return q; });
        return text_;
    
    },
    
    setColor : function(color_) {
      
        var index;
        
        if(colors.contains(color_)) { return color_; }
        else { return colors[foam.getIndex(color_)]; }
    },

    resize: function() {

        var translate;

        var w = window.innerWidth,
            h = window.innerHeight;
        var scale = 1.0;
        var scene = d3.select("svg#scene");
        scene.style("width", "100%").style("height", h + "px");

        translate = (gup("type") == "rippling") ? "translate(" + (w / 2) + ", " + (h / 2 + scale * 2) + ")" : "translate(" + w / 2 + ", " + h + ")";

        var scale = "scale(" + scale + ", " + (scale) + ")";
        scene.select("g").attr("transform", [translate, scale].join());
    }
};

d3.selection.prototype.moveToFront = function() {
    return this.each(function() {
        this.parentNode.appendChild(this);
    });
};

d3.layout.tagmenu = function(dimensions_) {

    this.width = dimensions_[0];
    this.height = dimensions_[1];


};


function extractColors(colors_) {

    var output = [];

}