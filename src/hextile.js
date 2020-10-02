import React from 'react';

// Creates a polygon connecting the supplied vertices.
//
// verts - The corners of the polygon. An array of 2-element arrays.
// props - An object with values for fill, stroke, & stroke-width
//
function makePolygon(verts, props) {

    if (props.strokeColor == 'none') {
        return <></>
    } else {
        // generate path data from vertices
        let path_data = '';
        for (let i=0; i<verts.length; i++) {
            path_data += (i===0?' M':' L');
            path_data += ' ' + verts[i][0].toFixed(2) + ' '+ verts[i][1].toFixed(2);
        };
        path_data += ' Z';

        // return path
        return <path fill={props.fillStyle}
                     stroke={props.strokeColor}
                     stroke-width={props.strokeWidth}
                     d={path_data} />
    }
}

// Creates a wide arc with the specified center. Takes 2 radii. The innerRadius
// should be positive, but smaller than outerRadius.
//
// Actually creates 2 paths. The first is filled with no outline. Then it creates
// another that just draws the border. The reason for this is that it only wants the
// borders on the round sides, not across the ends.
//
// center - A 2-element array with the X & Y coordinates of the center
// innerRadius - The radius of the inside of the arc
// outerRadius - The radius of the outside of the arc
// startAngle - Angle in radians of the start of the arc
// endAngle - Angle in radians of the end of the arc
// props - An object with values for fill, stroke, & stroke-width
//
function makeArc(center, innerRadius, outerRadius, startAngle, endAngle, props) {

    const pt1 = [(center[0] + outerRadius*Math.cos(startAngle)).toFixed(2),
                 (center[1] + outerRadius*Math.sin(startAngle)).toFixed(2)];
    const pt2 = [(center[0] + outerRadius*Math.cos(endAngle)).toFixed(2),
                 (center[1] + outerRadius*Math.sin(endAngle)).toFixed(2)];
    const pt3 = [(center[0] + innerRadius*Math.cos(endAngle)).toFixed(2),
                 (center[1] + innerRadius*Math.sin(endAngle)).toFixed(2)];
    const pt4 = [(center[0] + innerRadius*Math.cos(startAngle)).toFixed(2),
                 (center[1] + innerRadius*Math.sin(startAngle)).toFixed(2)];
    const r1 = innerRadius.toFixed(2);
    const r2 = outerRadius.toFixed(2);

    let fill_data = '';
    fill_data += ' M ' + pt1[0] + ' ' + pt1[1];
    fill_data += ' A ' + r2 + ' ' + r2
        + ' ' + 0 + ' ' + 0 + ' ' + 1
        + ' ' + pt2[0] + ' ' + pt2[1];
    fill_data += ' L ' + pt3[0] + ' ' + pt3[1];
    fill_data += ' A ' + r1 + ' ' + r1
        + ' ' + 0 + ' ' + 0 + ' ' + 0
        + ' ' + pt4[0] + ' ' + pt4[1];
    fill_data += ' Z';

    let edge_data = '';
    edge_data += ' M ' + pt1[0] + ' ' + pt1[1];
    edge_data += ' A ' + r2 + ' ' + r2
        + ' ' + 0 + ' ' + 0 + ' ' + 1
        + ' ' + pt2[0] + ' ' + pt2[1];
    edge_data += ' M ' + pt3[0] + ' ' + pt3[1];
    edge_data += ' A ' + r1 + ' ' + r1
        + ' ' + 0 + ' ' + 0 + ' ' + 0
        + ' ' + pt4[0] + ' ' + pt4[1];

    return <>
               <path fill={props.fillStyle}
                     stroke="none"
                     stroke-width="0"
                     d={fill_data} />
               <path fill="none"
                     stroke={props.strokeColor}
                     stroke-width={props.strokeWidth}
                     d={edge_data} />
           </>
}

// Creates a wide line between 2 points.
//
// Actually creates 2 paths. The first is filled with no outline. Then it creates
// another that just draws the border. The reason for this is that it only wants the
// borders on the long sides, not across the ends.
//
// start_pt - A 2-element array with the X & Y coordinates of the start point
// end_pt - A 2-element array with the X & Y coordinates of the end point
// width - The width of the line
// props - An object with values for fill, stroke, & stroke-width
//
function makeStraight(start_pt, end_pt, width, props) {
    const dx = end_pt[0] - start_pt[0];
    const dy = end_pt[1] - start_pt[1];
    const scale = width / Math.sqrt(dx*dx + dy*dy);
    const n = [-dy*scale, dx*scale];
    const pt1 = [(start_pt[0] + n[0]).toFixed(2), (start_pt[1] + n[1]).toFixed(2)];
    const pt2 = [(  end_pt[0] + n[0]).toFixed(2), (  end_pt[1] + n[1]).toFixed(2)];
    const pt3 = [(  end_pt[0] - n[0]).toFixed(2), (  end_pt[1] - n[1]).toFixed(2)];
    const pt4 = [(start_pt[0] - n[0]).toFixed(2), (start_pt[1] - n[1]).toFixed(2)];

    let fill_data = '';
    fill_data += ' M ' + pt1[0] + ' ' + pt1[1]
        + ' L ' + pt2[0] + ' ' + pt2[1]
        + ' L ' + pt3[0] + ' ' + pt3[1]
        + ' L ' + pt4[0] + ' ' + pt4[1]
        + ' Z ';
    let edge_data = '';
    edge_data = ' M ' + pt1[0] + ' ' + pt1[1]
        + ' L ' + pt2[0] + ' ' + pt2[1]
        + ' M ' + pt3[0] + ' ' + pt3[1]
        + ' L ' + pt4[0] + ' ' + pt4[1];
    return <>
               <path fill={props.fillStyle}
                     stroke="none"
                     stroke-width="0"
                     d={fill_data} />
               <path fill="none"
                     stroke={props.strokeColor}
                     stroke-width={props.strokeWidth}
                     d={edge_data} />
           </>
}

// Tile 0 has 3 arcs which connect neighboring sides
function makeTile0(corners, r, borderProps, ribbonProps) {
    const r1 = r / 3;
    const r2 = r * 2 / 3;
    return <>
               { makeArc(corners[0], r1, r2,  Math.PI/6, 5*Math.PI/6, ribbonProps) }
               { makeArc(corners[2], r1, r2,5*Math.PI/6, 9*Math.PI/6, ribbonProps) }
               { makeArc(corners[4], r1, r2,9*Math.PI/6,13*Math.PI/6, ribbonProps) }
               { makePolygon(corners, borderProps) }
           </>
}

// Tile 1 has straight which goes directly across, and 2 arcs which connect the
// neighboring sides on each side of that straight.
function makeTile1(corners, r, borderProps, ribbonProps) {
    const r1 = r / 3;
    const r2 = r * 2 / 3;
    const start_pt = [(corners[1][0]+corners[2][0])/2,
                      (corners[1][1]+corners[2][1])/2];
    const end_pt = [(corners[4][0]+corners[5][0])/2,
                    (corners[4][1]+corners[5][1])/2];
    return <>
               { makeArc(corners[0], r1, r2,   Math.PI/6, 5*Math.PI/6, ribbonProps) }
               { makeArc(corners[3], r1, r2,-5*Math.PI/6, -Math.PI/6, ribbonProps) }
               { makeStraight(start_pt, end_pt, r/6, ribbonProps) }
               { makePolygon(corners, borderProps) }
           </>
}

// Tile 2 has 1 arc which connects a pair of neighboring sides and 2 longer arcs
// which cross each other to connect pairs of the other 4 sides.
function makeTile2(corners, r, borderProps, ribbonProps) {
    const r1 = r / 3;
    const r2 = r * 2 / 3;
    const dx = corners[0][0] - corners[5][0];
    const dy = corners[0][1] - corners[5][1];
    const pt1 = [corners[0][0] + dx, corners[0][1] + dy];
    const pt2 = [corners[0][0] - dx, corners[0][1] + dy];
    return <>
               { makeArc(pt1, r+r1, r+r2,  3*Math.PI/6, 5*Math.PI/6, ribbonProps) }
               { makeArc(pt2, r+r1, r+r2,  1*Math.PI/6, 3*Math.PI/6, ribbonProps) }
               { makeArc(corners[3], r1, r2,-5*Math.PI/6, -Math.PI/6, ribbonProps) }
               { makePolygon(corners, borderProps) }
           </>
}

// Tile 3 has 1 straight which goes directly across, and 2 long arcs which cross that
// to connect non-adjacent sides.
function makeTile3(corners, r, borderProps, ribbonProps) {
    const r1 = r / 3;
    const r2 = r * 2 / 3;
    const dx = corners[0][0] - corners[5][0];
    const dy = corners[0][1] - corners[5][1];
    const pt1 = [corners[0][0] + dx, corners[0][1] + dy];
    const pt2 = [corners[3][0] - dx, corners[3][1] - dy];
    const start_pt = [(corners[0][0]+corners[1][0])/2,
                      (corners[0][1]+corners[1][1])/2];
    const end_pt = [(corners[3][0]+corners[4][0])/2,
                    (corners[3][1]+corners[4][1])/2];
    return <>
               { makeArc(pt1, r+r1, r+r2,  3*Math.PI/6, 5*Math.PI/6, ribbonProps) }
               { makeStraight(start_pt, end_pt, r/6, ribbonProps) }
               { makeArc(pt2, r+r1, r+r2, -3*Math.PI/6, -1*Math.PI/6, ribbonProps) }
               { makePolygon(corners, borderProps) }
           </>
}

// Tile 4 has 3 straights which each connect opposite sides. They all cross in
// the center.
function makeTile4(corners, r, borderProps, ribbonProps) {
    const centers = [[(corners[0][0]+corners[1][0])/2,
                      (corners[0][1]+corners[1][1])/2],
                     [(corners[1][0]+corners[2][0])/2,
                      (corners[1][1]+corners[2][1])/2],
                     [(corners[2][0]+corners[3][0])/2,
                      (corners[2][1]+corners[3][1])/2],
                     [(corners[3][0]+corners[4][0])/2,
                      (corners[3][1]+corners[4][1])/2],
                     [(corners[4][0]+corners[5][0])/2,
                      (corners[4][1]+corners[5][1])/2],
                     [(corners[5][0]+corners[0][0])/2,
                      (corners[5][1]+corners[0][1])/2]];
    return <>
               { makeStraight(centers[0], centers[3], r/6, ribbonProps) }
               { makeStraight(centers[1], centers[4], r/6, ribbonProps) }
               { makeStraight(centers[2], centers[5], r/6, ribbonProps) }
               { makePolygon(corners, borderProps) }
           </>
}

function makeHighlight(r, props) {
    const c = r * Math.sqrt(3)/2;
    const s = r/2;
    const corners = [[0, -r],
                     [c, -s],
                     [c, s],
                     [0, r],
                     [-c, s],
                     [-c,-s]];
    return makePolygon(corners, props);
}

// Return an SVG object that draws the specified tile
// index - Which tile (0-4)
// r - Radius
// borderProps - Properties for the outer border
// ribbonProp - Properties for the ribbons
function makeTile(index, r, borderProps, ribbonProps) {
    const c = r * Math.sqrt(3)/2;
    const s = r/2;
    const corners = [[0, -r],
                     [c, -s],
                     [c, s],
                     [0, r],
                     [-c, s],
                     [-c,-s]];
    switch (index) {
    case 0:
        return makeTile0(corners, r, borderProps, ribbonProps);
    case 1:
        return makeTile1(corners, r, borderProps, ribbonProps);
    case 2:
        return makeTile2(corners, r, borderProps, ribbonProps);
    case 3:
        return makeTile3(corners, r, borderProps, ribbonProps);
    case 4:
    default:
        return makeTile4(corners, r, borderProps, ribbonProps);
    }
}

export {makeHighlight, makeTile};
