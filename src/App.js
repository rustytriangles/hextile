import React from 'react';
import './App.css';

function makePolygon(verts, props) {

    // generate path data from vertices
    let path_data = '';
    for (let i=0; i<verts.length; i++) {
        path_data += (i===0?' M':' L');
        path_data += ' ' + verts[i][0] + ' '+ verts[i][1]
    };
    path_data += ' Z';

    // return path
    return <path fill={props.fillStyle}
                 stroke={props.strokeColor}
                 stroke-width={props.strokeWidth}
                 d={path_data} />
}

function makeArc(center, r1, r2, startAngle, endAngle, props) {

    const pt1 = [center[0] + r2*Math.cos(startAngle),
                 center[1] + r2*Math.sin(startAngle)];
    const pt2 = [center[0] + r2*Math.cos(endAngle),
                 center[1] + r2*Math.sin(endAngle)];
    const pt3 = [center[0] + r1*Math.cos(endAngle),
                 center[1] + r1*Math.sin(endAngle)];
    const pt4 = [center[0] + r1*Math.cos(startAngle),
                 center[1] + r1*Math.sin(startAngle)];

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

function makeStraight(start_pt, end_pt, r, props) {
    const dx = end_pt[0] - start_pt[0];
    const dy = end_pt[1] - start_pt[1];
    const scale = r / (6*Math.sqrt(dx*dx + dy*dy));
    const n = [-dy*scale, dx*scale];
    const pt1 = [start_pt[0] + n[0], start_pt[1] + n[1]];
    const pt2 = [  end_pt[0] + n[0],   end_pt[1] + n[1]];
    const pt3 = [  end_pt[0] - n[0],   end_pt[1] - n[1]];
    const pt4 = [start_pt[0] - n[0], start_pt[1] - n[1]];

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
               { makeStraight(start_pt, end_pt, r, ribbonProps) }
               { makePolygon(corners, borderProps) }
           </>
}

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
               { makeStraight(start_pt, end_pt, r, ribbonProps) }
               { makeArc(pt2, r+r1, r+r2, -3*Math.PI/6, -1*Math.PI/6, ribbonProps) }
               { makePolygon(corners, borderProps) }
           </>
}

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
               { makeStraight(centers[0], centers[3], r, ribbonProps) }
               { makeStraight(centers[1], centers[4], r, ribbonProps) }
               { makeStraight(centers[2], centers[5], r, ribbonProps) }
               { makePolygon(corners, borderProps) }
           </>
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            s_real: 7,
            s_imag: -8,
            scale: 12,
        };

        this.primeProps = {
            radius: 5,
            fillStyle: "magenta",
            strokeColor: "none"
        };

        this.pathFillProps = {
            fillStyle: "none",
            strokeColor: "grey",
            strokeWidth: "3"
        };

    }

    keydown(e) {
        switch (e.keyCode) {
        case 187:
            this.setState((prevState) => {
                const newScale = Math.min(22, prevState.scale+1);
                return {
                    s_real: prevState.s_real,
                    s_imag: prevState.s_imag,
                    scale: newScale
                }
            });
            break;
        case 189:
            this.setState((prevState) => {
                const newScale = Math.max(4, prevState.scale-1);
                return {
                    s_real: prevState.s_real,
                    s_imag: prevState.s_imag,
                    scale: newScale
                }
            });
            break;
        }
    }

    onclick(e) {
        const bbox = e.target.getBBox();
        const mat = e.target.getScreenCTM().inverse();
        const sx = Math.round((e.clientX * mat.a + mat.e) / this.state.scale);
        const sy = -Math.round((e.clientY * mat.d + mat.f) / this.state.scale);
        this.setState((prevState) => {
            return {s_real: sx,
                    s_imag: sy,
                    scale: prevState.scale
                   }
        });
    }

    render() {
        const r = 120;
        const c = r * Math.sqrt(3)/2;
        const s = r/2;
        const corners = [[0, -r],
                         [c, -s],
                         [c, s],
                         [0, r],
                         [-c, s],
                         [-c,-s]];

        const borderProps = {
            fillStyle: "none",
            strokeColor: "#DA6",
            strokeWidth: "4"
        };

        const ribbonProps = {
            fillStyle: "#FE9",
            strokeColor: "#8A2",
            strokeWidth: "5"
        };

        const xoff = r * Math.sqrt(3);
        const yoff = 1.5 * r;
        const placement_points = [[  -xoff  ,-2*yoff],
                                  [        0,-2*yoff],
                                  [   xoff  ,-2*yoff],
                                  [-3*xoff/2,  -yoff],
                                  [  -xoff/2,  -yoff],
                                  [   xoff/2,  -yoff],
                                  [ 3*xoff/2,  -yoff],
                                  [-2*xoff  ,      0],
                                  [  -xoff  ,      0],
                                  [        0,      0],
                                  [   xoff  ,      0],
                                  [ 2*xoff  ,      0],
                                  [-3*xoff/2,   yoff],
                                  [  -xoff/2,   yoff],
                                  [   xoff/2,   yoff],
                                  [ 3*xoff/2,   yoff],
                                  [  -xoff  , 2*yoff],
                                  [        0, 2*yoff],
                                  [   xoff  , 2*yoff],
                                 ];
        const tiles = [[0, 0], [0, 60],
                       [1, 0], [1, 60], [1, 120],
                       [2, 0], [2, 60], [2, 120], [2, 180], [2, 240], [2, 300],
                       [3, 0], [3, 60], [3, 120],
                       [4, 0]];
        const placeTiles = (pts) => pts.map((pt) => {
            let tile = [];
            const index = Math.floor(Math.random() * Math.floor(tiles.length));

            const xfm = "translate(" + pt[0] + " " + pt[1] + ") rotate(" + tiles[index][1] + ")";
            switch (tiles[index][0]) {
            case 0:
                tile = makeTile0(corners, r, borderProps, ribbonProps);
                break;
            case 1:
                tile = makeTile1(corners, r, borderProps, ribbonProps);
                break;
            case 2:
                tile = makeTile2(corners, r, borderProps, ribbonProps);
                break;
            case 3:
                tile = makeTile3(corners, r, borderProps, ribbonProps);
                break;
            case 4:
                tile = makeTile4(corners, r, borderProps, ribbonProps);
                break;
            }
            return <g transform={xfm}>
                       {tile}
                   </g>
        });

        const w = 1000;
        const h = 960;
        const box = [-w/2, -h/2, w, h];
        return (
            <div class="wrapper">
                <h2>Hex Tiles</h2>
                <svg xmlns="http://www.w3.org/2000/svg"
                     width={w/2}
                     height={h/2}
                     viewBox={box}
                     onKeyDown={this.keydown.bind(this)}
                     onClick={ this.onclick.bind(this)}
                 p    tabIndex="1"
                >
                    <> {placeTiles(placement_points)} </>
            </svg>
            </div>
        );
    }
}

export default App;
