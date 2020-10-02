import React from 'react';
import './App.css';
import {makeTile} from './hextile.js';

// Generate placement points for tiles
function generate_placement_points(r, n) {
    const xoff = r * Math.sqrt(3);
    const yoff = 1.5 * r;

    let points = [];
    for (let j=-n; j<=n; j++) {
        const y = j*yoff;
        const lim = 2*n-Math.abs(j);
        for (let i=-lim; i<=lim; i+=2) {
            const x = i*xoff/2;
            points.push([x, y]);
        }
    }
    return points;
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
        default:
            break;
        }
    }

    onclick(e) {
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
        const r = 52;

// show borders
//        const borderProps = {
//            fillStyle: "none",
//            strokeColor: "#DA6",
//            strokeWidth: "4"
//        };

// don't show borders
        const borderProps = {
            fillStyle: "none",
            strokeColor: "none",
            strokeWidth: "0"
        };

        const ribbonProps = {
            fillStyle: "#FE9",
            strokeColor: "#8A2",
            strokeWidth: "5"
        };

        const placement_points = generate_placement_points(r, 5);
        const tiles = [[0, 0], [0, 60],
                       [1, 0], [1, 60], [1, 120],
                       [2, 0], [2, 60], [2, 120], [2, 180], [2, 240], [2, 300],
                       [3, 0], [3, 60], [3, 120],
                       [4, 0]];

        const placeTiles = (pts) => pts.map((pt) => {
            const index = Math.floor(Math.random() * Math.floor(tiles.length));

            const xfm = "translate(" + pt[0].toFixed(2) + " " + pt[1].toFixed(2) + ") rotate(" + tiles[index][1] + ")";
            return <g transform={xfm}>
                       {makeTile(tiles[index][0], r, borderProps, ribbonProps) }
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
                     tabIndex="1"
                >
                    <> {placeTiles(placement_points)} </>
            </svg>
            </div>
        );
    }
}

export default App;
