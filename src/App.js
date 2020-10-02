import React from 'react';
import './App.css';
import {makeHighlight, makeTile} from './hextile.js';

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

function randomInteger(n) {
    return Math.floor(Math.random() * Math.floor(n));
}

function initialize_tiles(radius) {
    const pts = generate_placement_points(radius, 5);
    return pts.map(function(e) {
        return { x: e[0], y: e[1], index: randomInteger(5), angle: randomInteger(6) };
    });
}

function highlightTile(tiles, radius, selected, props) {
    if (selected >= 0 && selected < tiles.length) {
        const x = tiles[selected].x;
        const y = tiles[selected].y;
        const xfm = "translate(" + x.toFixed(2) + " " + y.toFixed(2) + ")";
        return <g transform={xfm}>
                   {makeHighlight(radius, props)}
               </g>
    } else {
        return <></>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: 52,
            scale: 12,
            tiles: initialize_tiles(52),
            selected: -1
        };

        // show borders
        // this.borderProps = {
        //     fillStyle: "none",
        //     strokeColor: "#DA6",
        //     strokeWidth: "4"
        // };

        // don't show borders
        this.borderProps = {
            fillStyle: "none",
            strokeColor: "none",
            strokeWidth: "0"
        };

        this.ribbonProps = {
            fillStyle: "#FE9",
            strokeColor: "#8A2",
            strokeWidth: "5"
        };
        this.highlightProps = {
            fillStyle: "#EEE",
            stroke: "none",
            strokeWidth: "1"};
    }

    replaceTile(oldTiles, index, newValue) {
        if (index < 0 || index >= oldTiles.length) {
            return oldTiles;
        } else {
            let result = [];
            for (let i=0; i<oldTiles.length; i++) {
                if (i == index) {
                    result.push(newValue);
                } else {
                    result.push(oldTiles[i]);
                }
            }
            return result;
        }
    }

    decrementAngle() {
        this.setState((prevState) => {
            let tiles = prevState.tiles;
            let picked = prevState.selected;
            if (picked >= 0 && picked < tiles.length) {
                const old_tile = prevState.tiles[picked];
                const new_tile = { x: old_tile.x,
                                   y: old_tile.y,
                                   index: old_tile.index,
                                   angle: (old_tile.angle + 5)%6
                                 };
                tiles = this.replaceTile(prevState.tiles, prevState.selected, new_tile);
            }
            return {
                radius: prevState.radius,
                scale: prevState.scale,
                tiles: tiles,
                selected: picked
            }
        });
    }

    incrementAngle() {
        this.setState((prevState) => {
            let tiles = prevState.tiles;
            let picked = prevState.selected;
            if (picked >= 0 && picked < tiles.length) {
                const old_tile = prevState.tiles[picked];
                const new_tile = { x: old_tile.x,
                                   y: old_tile.y,
                                   index: old_tile.index,
                                   angle: (old_tile.angle + 1)%6
                                 };
                tiles = this.replaceTile(prevState.tiles, prevState.selected, new_tile);
            }
            return {
                radius: prevState.radius,
                scale: prevState.scale,
                tiles: tiles,
                selected: picked
            }
        });
    }

    decrementIndex() {
        this.setState((prevState) => {
            let tiles = prevState.tiles;
            let picked = prevState.selected;
            if (prevState.selected >= 0 && prevState.selected < tiles.length) {
                const old_tile = prevState.tiles[picked];
                const new_tile = { x: old_tile.x,
                                   y: old_tile.y,
                                   index: (old_tile.index + 4)%5,
                                   angle: old_tile.angle
                                 };
                tiles = this.replaceTile(prevState.tiles, prevState.selected, new_tile);
            }
            return {
                radius: prevState.radius,
                scale: prevState.scale,
                tiles: tiles,
                selected: picked
            }
        });
    }

    incrementIndex() {
        this.setState((prevState) => {
            let tiles = prevState.tiles;
            let picked = prevState.selected;
            if (prevState.selected >= 0 && prevState.selected < tiles.length) {
                const old_tile = prevState.tiles[picked];
                const new_tile = { x: old_tile.x,
                                   y: old_tile.y,
                                   index: (old_tile.index + 1)%5,
                                   angle: old_tile.angle
                                 };
                tiles = this.replaceTile(prevState.tiles, prevState.selected, new_tile);
            }
            return {
                radius: prevState.radius,
                scale: prevState.scale,
                tiles: tiles,
                selected: picked
            }
        });
    }

    keydown(e) {
        const ARROW_LEFT = 37;
        const ARROW_UP = 38;
        const ARROW_RIGHT = 39;
        const ARROW_DOWN = 40;

        switch (e.keyCode) {
        case ARROW_LEFT:
            this.decrementAngle();
            break;
        case ARROW_RIGHT:
            this.incrementAngle();
            break;
        case ARROW_UP:
            this.decrementIndex();
            break;
        case ARROW_DOWN:
            this.incrementIndex();
            break;

        case 187:
            this.setState((prevState) => {
                const picked = prevState.selected+1;
                return {
                    radius: prevState.radius,
                    scale: prevState.scale,
                    tiles: prevState.tiles,
                    selected: picked
                }
            });
            break;
        case 189:
            this.setState((prevState) => {
                const picked = prevState.selected-1;
                return {
                    radius: prevState.radius,
                    scale: prevState.scale,
                    tiles: prevState.tiles,
                    selected: picked
                }
            });
            break;
        default:
            break;
        }
    }

    onclick(e) {
        const mat = e.target.getScreenCTM().inverse();
        const sx = Math.round(e.clientX * 2 - 530);
        const sy = Math.round(e.clientY * 2 - 615.625);
        this.setState((prevState) => {
            let picked = -1;
            let min_norm = 1000000;
            for (let i=0; i<prevState.tiles.length; i++) {
                const tx = prevState.tiles[i].x;
                const ty = prevState.tiles[i].y;
                const dx = sx - tx;
                const dy = sy - ty;
                const norm = (dx*dx + dy*dy);
                if (norm < prevState.radius*prevState.radius) {
                    if (norm < min_norm) {
                        picked = i;
                        min_norm = norm;
                    }
                }
            }
            return {radius: prevState.radius,
                    scale: prevState.scale,
                    tiles: prevState.tiles,
                    selected: picked
                   }
        });
    }

    render() {

        const placeTiles = (tiles) => tiles.map((tile) => {
            const pt = [tile.x, tile.y];
            const index = tile.index;
            const rotation = 60*tile.angle;
            const xfm = "translate(" + pt[0].toFixed(2) + " " + pt[1].toFixed(2) + ") rotate(" + rotation + ")";
            return <g transform={xfm}>
                       {makeTile(index, this.state.radius, this.borderProps, this.ribbonProps) }
                   </g>
        });

        const w = 1000;
        const h = 960;
        const box = [-w/2, -h/2, w, h];
        return (
            <div class="wrapper" onKeyDown={this.keydown.bind(this)}>
                <h2>Hex Tile Editor</h2>
                <svg xmlns="http://www.w3.org/2000/svg"
                     width={w/2}
                     height={h/2}
                     viewBox={box}
                     onClick={ this.onclick.bind(this)}
                     tabIndex="1"
                >
                    <>
                        {highlightTile(this.state.tiles, this.state.radius, this.state.selected, this.highlightProps)}
                        {placeTiles(this.state.tiles)}
                    </>
                </svg>
                <ul><li>Click to select tile</li><li>Up/Down Arrow to replace tile</li><li>Left/Right arrow to rotate tile</li></ul>
            </div>
        );
    }
}

export default App;
