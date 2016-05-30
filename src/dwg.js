(function($) {
    var two, root, options, setStyle;


    var makePoint = function(wrapper) {
        wrapper.unbind();
        wrapper.bind("mousedown", function(e) {
            root.add(
                two.makeCircle(e.offsetX, e.offsetY, 1)
            )
            setStyle();
            two.update();
        })
    };
    var makeLine = function(wrapper) {
        wrapper.unbind();
        var dragging = false;
        var isFirst = true;
        var x1, y1, x2, y2, line;
        wrapper.bind("mousedown", function(e) {
            if (isFirst) {
                dragging = true;
                x1 = e.offsetX;
                y1 = e.offsetY;
                line = two.makeLine(x1, y1, x1 + 1, y1);
                isFirst = false;
            } else {
                dragging = false;
                x2 = e.offsetX;
                y2 = e.offsetY;
                line.remove();
                root.add(
                    two.makeLine(x1, y1, x2, y2)
                );
                setStyle();
                two.update();
                isFirst = true;
            }
        });
        wrapper.bind("mousemove", function(e) {
            if (dragging) {
                line.remove();
                x2 = e.offsetX;
                y2 = e.offsetY;
                line = two.makeLine(x1, y1, x2, y2);
                setStyle();
                two.update();
            };
        });
    }
    var makeRect = function(wrapper) {
        wrapper.unbind();
        var dragging = false;
        var isFirst = true;
        var x, y, a, b, rect;
        wrapper.bind("mousedown", function(e) {
            if (isFirst) {
                dragging = true;
                x = e.offsetX;
                y = e.offsetY;
                rect = two.makeRectangle(x, y, 1, 1);
                isFirst = false;
            } else {
                dragging = false;
                a = e.offsetX - x;
                b = e.offsetY - y;
                rect.remove();
                root.add(
                    two.makeRectangle(x, y, a * 2, b * 2)
                )
                setStyle();
                two.update();
                isFirst = true;
            }
        });
        wrapper.bind("mousemove", function(e) {
            if (dragging) {
                rect.remove();
                a = e.offsetX - x;
                b = e.offsetY - y;
                rect = two.makeRectangle(x, y, a * 2, b * 2)
                setStyle();
                two.update();
            };
        });
    }
    var makeCircle = function(wrapper) {
        wrapper.unbind();
        var dragging = false;
        var isFirst = true;
        var x, y, dx, dy, c;
        wrapper.bind("mousedown", function(e) {
            if (isFirst) {
                dragging = true;
                x = e.offsetX;
                y = e.offsetY;
                c = two.makeCircle(x, y, 10)
                isFirst = false;
            } else {
                dragging = false;
                dx = e.offsetX - x;
                dy = e.offsetY - y;
                var r = Math.sqrt(dx * dx + dy * dy);
                c.remove();
                root.add(
                    two.makeCircle(x, y, r)
                )
                setStyle();
                two.update();
                isFirst = true;
            }
        });
        wrapper.bind("mousemove", function(e) {
            if (dragging) {
                c.remove();
                dx = e.offsetX - x;
                dy = e.offsetY - y;
                var r = Math.sqrt(dx * dx + dy * dy);
                c = two.makeCircle(x, y, r);
                setStyle();
                two.update();
            };
        });
    }
    var makeEllipse = function(wrapper) {
        // two.makeEllipse(200, 100, 100, 50)
        wrapper.unbind();
        var dragging = false;
        var isFirst = true;
        var cx, cy, dx, dy, geo;
        wrapper.bind("mousedown", function(e) {
            if (isFirst) {
                dragging = true;
                cx = e.offsetX;
                cy = e.offsetY;
                geo = two.makeEllipse(cx, cy, 10, 10);
                clickIndex = 1;
                isFirst = false;
            } else {
                dragging = false;
                dx = e.offsetX - cx;
                dy = e.offsetY - cy;
                geo.remove();
                root.add(
                    two.makeEllipse(cx, cy, dx, dy)
                )
                setStyle();
                two.update();
                isFirst = true;
            }
        });
        wrapper.bind("mousemove", function(e) {
            if (dragging) {
                geo.remove();
                dx = e.offsetX - cx;
                dy = e.offsetY - cy;
                geo = two.makeEllipse(cx, cy, dx, dy);
                setStyle();
                two.update();
            }
        })
    }
    var makePolygon = function(wrapper) {
        wrapper.unbind();
        var dragging = false;
        var isFirst = true;
        var cx, cy, r, rad, geo;
        wrapper.bind("mousedown", function(e) {
            if (isFirst) {
                cx = e.offsetX;
                cy = e.offsetY;
                geo = two.makePolygon(cx, cy, 10, 5);
                isFirst = false;
                dragging = true;
            } else {
                dragging = false;
                var dx = e.offsetX - cx;
                var dy = e.offsetY - cy;
                var r = Math.sqrt(dx * dx + dy * dy);
                rad = Math.acos(dy / r);
                geo.remove();
                geo = two.makePolygon(cx, cy, r, 5);
                geo.rotation = -rad;
                root.add(geo);
                setStyle();
                two.update();
                isFirst = true;
            }
        });
        wrapper.bind("mousemove", function(e) {
            if (dragging) {
                geo.remove();
                var dx = e.offsetX - cx;
                var dy = e.offsetY - cy;
                var r = Math.sqrt(dx * dx + dy * dy);
                rad = Math.acos(dy / r);
                geo = two.makePolygon(cx, cy, r, 5);
                geo.rotation = -rad;
                setStyle();
                two.update();
            }
        });
    };
    var makeCurve = function(wrapper, isOpen) {
        // two.makeCurve(0, 0, 50, 50, 100, 0, false),
        wrapper.unbind();
        var dragging = false;
        var clickIndex = 0;
        var x1, y1, cx, cy, x2, y2, geo;
        wrapper.bind("mousedown", function(e) {
            if (clickIndex === 0) {
                x1 = e.offsetX;
                y1 = e.offsetY;
                clickIndex = 1;
            } else if (clickIndex === 1) {
                cx = e.offsetX;
                cy = e.offsetY;
                geo = two.makeLine(x1, y2, cx, cy);
                clickIndex = 2;
                dragging = true;
            } else if (clickIndex === 2) {
                dragging = false;
                var x2 = e.offsetX;
                var y2 = e.offsetY;
                geo.remove();
                console.log(x1, y1, cx, cy, x2, y2);
                geo = two.makeCurve(x1, y1, cx, cy, x2, y2, isOpen);
                root.add(geo);
                setStyle();
                two.update();
                clickIndex = 0;
            }
        });
        wrapper.bind("mousemove", function(e) {
            if (dragging) {
                geo.remove();
                var x2 = e.offsetX;
                var y2 = e.offsetY;
                geo.remove();
                geo = two.makeCurve(x1, y1, cx, cy, x2, y2, isOpen);
                setStyle();
                two.update();
            }
        });
    }
    var makeStar = function(wrapper) {
        wrapper.unbind();
        var dragging = false;
        var clickIndex = 0;
        var cx, cy, r1, r2, rad, star;
        wrapper.bind("mousedown", function(e) {
            if (clickIndex === 0) {
                cx = e.offsetX;
                cy = e.offsetY;
                clickIndex = 1;
            } else if (clickIndex === 1) {
                var dx = e.offsetX - cx;
                var dy = e.offsetY - cy;
                r1 = Math.sqrt(dx * dx + dy * dy);
                star = two.makeStar(cx, cy, r1, r1 + 10, 5);
                clickIndex = 2;
                dragging = true;
            } else if (clickIndex === 2) {
                dragging = false;
                var dx = e.offsetX - cx;
                var dy = e.offsetY - cy;
                var r2 = Math.sqrt(dx * dx + dy * dy);
                rad = Math.acos(dy / r2);
                star.remove();
                star = two.makeStar(cx, cy, r1, r2, 5);
                star.rotation = -rad;
                root.add(star);
                setStyle();
                two.update();
                clickIndex = 0;
            }
        });
        wrapper.bind("mousemove", function(e) {
            if (dragging) {
                star.remove();
                var dx = e.offsetX - cx;
                var dy = e.offsetY - cy;
                var r2 = Math.sqrt(dx * dx + dy * dy);
                rad = Math.acos(dy / r2);
                star = two.makeStar(cx, cy, r1, r2, 5);
                star.rotation = -rad;
                setStyle();
                two.update();
            }
        })
    }
    var makeArc = function(wrapper) {
        // two.makeArcSegment(200, 100, 100, 100, 1, 2)
        wrapper.unbind();
        var dragging = false;
        var clickIndex = 0;
        var cx, cy, x1, y1, x2, y2, geo;
        wrapper.bind("mousedown", function(e) {
            if (clickIndex === 0) {
                cx = e.offsetX;
                cy = e.offsetY;
                clickIndex = 1;
            } else if (clickIndex === 1) {
                x1 = e.offsetX;
                y1 = e.offsetY;
                geo = two.makeLine(cx, cy, x1, y1);
                clickIndex = 2;
                dragging = true;
            } else if (clickIndex === 2) {
                dragging = false;
                x2 = e.offsetX;
                y2 = e.offsetY;
                var dx = x1 - cx,
                    dy = y1 - cy,
                    r = Math.sqrt(dx * dx + dy * dy),
                    rad1 = -Math.acos((y1 - cy) / (x1 - cx)),
                    rad2 = -Math.acos((y2 - cy) / (x2 - cx));
                geo.remove();
                geo = two.makeArcSegment(cx, cy, r, r, rad1, rad2-rad1);
                root.add(geo);
                setStyle();
                two.update();
                clickIndex = 0;
            }
        });
        wrapper.bind("mousemove", function(e) {
            if (dragging) {
                geo.remove();
                x2 = e.offsetX;
                y2 = e.offsetY;
                var dx = x1 - cx,
                    dy = y1 - cy,
                    r = Math.sqrt(dx * dx + dy * dy),
                    rad1 = Math.asin((y1 - cy) / (x1 - cx)),
                    rad2 = Math.asin((y2 - cy) / (x2 - cx));
                console.log(cx, cy, r, r, rad2, rad1)
                geo = two.makeArcSegment(cx, cy, r, r, rad1,  -rad2);
                setStyle();
                two.update();
            }
        });
    }
    var exit = function(wrapper) {
        wrapper.unbind();
    }
    var makeZoom = function(wrapper) {
        wrapper.unbind();
        var dragging = false;
        wrapper.mousewheel(function(event) {
            root.scale = root.scale * (1 + event.deltaY * 0.1);
            two.update();
        }).mousedown(function(e) {
            dragging = true;
            return false;
        }).mouseup(function(e) {
            dragging = false;
            e.cancelBubble = true;
        });
        document.onmousemove = function(e) {
            if (dragging) {
                root.translation.x += e.movementX;
                root.translation.y += e.movementY;
                two.update();
                return false;
            }
        };
    }

    $.fn.extend({
        dwg: function(options) {
            switch (options) {
                case "point":
                    makePoint(this);
                    break;
                case "line":
                    makeLine(this);
                    break;
                case "rect":
                    makeRect(this);
                    break;
                case "circle":
                    makeCircle(this);
                    break;
                case "ellipse":
                    makeEllipse(this);
                    break;
                case "polygon":
                    makePolygon(this);
                    break;
                case "curve":
                    makeCurve(this, true);
                    break;
                case "closedcurve":
                    makeCurve(this, false);
                    break;
                case "star":
                    makeStar(this);
                    break;

                // case "arc":
                //     makeArc(this);
                //     break;
                case "clear":
                    two.clear();
                    root = two.makeGroup();
                    two.update();
                    break;
                case "exit":
                    exit(this);
                    break;
                default:
                    if (!two) {
                        two = new Two({
                            width: this.width(),
                            height: this.height()
                        }).appendTo(this[0]);
                        root = two.makeGroup();
                    }
                    var defaults = {
                        stroke: "#000",
                        linewidth: 1,
                        fill: false
                    };
                    options = $.extend(defaults, options);
                    setStyle = function() {
                        root.linewidth = options.linewidth;
                        root.stroke = options.stroke;
                        root.fill = options.fill;
                        root.noFill();
                    };

            }
        }
    })
})(jQuery);
