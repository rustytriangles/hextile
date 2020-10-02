import {makeTile} from './hextile.js';

const r = 120;
const c = r * Math.sqrt(3)/2;
const s = r/2;
//const corners = [[0, -r],
//                 [c, -s],
//                 [c, s],
//                 [0, r],
//                 [-c, s],
//                 [-c,-s]];
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

// regexps for various types of path data
// don't actually check values
const float_pat = '[+-]?\\d+(\\.\\d+)?';
const int_pat = '\\d+';
const arcFillRegex = new RegExp('^ '
                           + 'M ' + float_pat + ' ' + float_pat + ' '
                           + 'A ' + float_pat + ' ' + float_pat + ' ' + int_pat + ' ' + int_pat + ' ' + int_pat + ' ' + float_pat + ' ' + float_pat + ' '
                           + 'L ' + float_pat + ' ' + float_pat + ' '
                           + 'A ' + float_pat + ' ' + float_pat + ' ' + int_pat + ' ' + int_pat + ' ' + int_pat + ' ' + float_pat + ' ' + float_pat + ' '
                           + 'Z$');
const arcEdgeRegex = new RegExp('^ '
                                + 'M ' + float_pat + ' ' + float_pat + ' '
                                + 'A ' + float_pat + ' ' + float_pat + ' ' + int_pat + ' ' + int_pat + ' ' + int_pat + ' ' + float_pat + ' ' + float_pat + ' '
                                + 'M ' + float_pat + ' ' + float_pat + ' '
                                + 'A ' + float_pat + ' ' + float_pat + ' ' + int_pat + ' ' + int_pat + ' ' + int_pat + ' ' + float_pat + ' ' + float_pat
                                + '$');
const straightFillRegex = new RegExp('^ '
                                     + 'M ' + float_pat + ' ' + float_pat + ' '
                                     + 'L ' + float_pat + ' ' + float_pat + ' '
                                     + 'L ' + float_pat + ' ' + float_pat + ' '
                                     + 'L ' + float_pat + ' ' + float_pat + ' '
                                     + 'Z $');
const straightEdgeRegex = new RegExp('^ '
                                     + 'M ' + float_pat + ' ' + float_pat + ' '
                                     + 'L ' + float_pat + ' ' + float_pat + ' '
                                     + 'M ' + float_pat + ' ' + float_pat + ' '
                                     + 'L ' + float_pat + ' ' + float_pat
                                     + '$');
const borderRegex = new RegExp('^ '
                               + 'M ' + float_pat + ' ' + float_pat + ' '
                               + 'L ' + float_pat + ' ' + float_pat + ' '
                               + 'L ' + float_pat + ' ' + float_pat + ' '
                               + 'L ' + float_pat + ' ' + float_pat + ' '
                               + 'L ' + float_pat + ' ' + float_pat + ' '
                               + 'L ' + float_pat + ' ' + float_pat + ' '
                               + 'Z$');

test('makeTile(0)', () => {

    const obj = makeTile(0, r, borderProps, ribbonProps);

    // arc, arc, arc, polygon
    expect(obj.props.children.length).toBe(4);
    // 1st arc: fill, border
    expect(obj.props.children[0].props.children.length).toBe(2);
    expect(obj.props.children[0].props.children[0].type).toBe('path');
    expect(obj.props.children[0].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[0].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[0].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[0].props.children[1].type).toBe('path');
    expect(obj.props.children[0].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[0].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[0].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // 2nd arc: fill, border
    expect(obj.props.children[1].props.children.length).toBe(2);
    expect(obj.props.children[1].props.children[0].type).toBe('path');
    expect(obj.props.children[1].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[1].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[1].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[1].props.children[1].type).toBe('path');
    expect(obj.props.children[1].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[1].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[1].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // 3rd arc: fill, border
    expect(obj.props.children[2].props.children.length).toBe(2);
    expect(obj.props.children[2].props.children[0].type).toBe('path');
    expect(obj.props.children[2].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[2].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[2].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[2].props.children[1].type).toBe('path');
    expect(obj.props.children[2].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[2].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[2].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // border
    expect(obj.props.children[3].props.fill).toBe(borderProps.fillStyle);
    expect(obj.props.children[3].props.stroke).toBe(borderProps.strokeColor);
    console.log(obj.props.children[3].props.d);
    expect(obj.props.children[3].props.d).toEqual(expect.stringMatching(borderRegex));
});

test('makeTile(1)', () => {

    const obj = makeTile(1, corners, r, borderProps, ribbonProps);

    // arc, arc, straight, polygon
    expect(obj.props.children.length).toBe(4);
    // 1st arc: fill, border
    expect(obj.props.children[0].props.children.length).toBe(2);
    expect(obj.props.children[0].props.children[0].type).toBe('path');
    expect(obj.props.children[0].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[0].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[0].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[0].props.children[1].type).toBe('path');
    expect(obj.props.children[0].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[0].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[0].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // 2nd arc: fill, border
    expect(obj.props.children[1].props.children.length).toBe(2);
    expect(obj.props.children[1].props.children[0].type).toBe('path');
    expect(obj.props.children[1].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[1].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[1].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[1].props.children[1].type).toBe('path');
    expect(obj.props.children[1].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[1].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[1].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // straight: fill, border
    expect(obj.props.children[2].props.children.length).toBe(2);
    expect(obj.props.children[2].props.children[0].type).toBe('path');
    expect(obj.props.children[2].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[2].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[2].props.children[0].props.d).toEqual(expect.stringMatching(straightFillRegex));
    expect(obj.props.children[2].props.children[1].type).toBe('path');
    expect(obj.props.children[2].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[2].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[2].props.children[1].props.d).toEqual(expect.stringMatching(straightEdgeRegex));

    // border
    expect(obj.props.children[3].props.fill).toBe(borderProps.fillStyle);
    expect(obj.props.children[3].props.stroke).toBe(borderProps.strokeColor);
    expect(obj.props.children[3].props.d).toEqual(expect.stringMatching(borderRegex));

});

test('makeTile(2)', () => {

    const obj = makeTile(2, corners, r, borderProps, ribbonProps);

    // arc, arc, arc, polygon
    expect(obj.props.children.length).toBe(4);
    // 1st arc: fill, border
    expect(obj.props.children[0].props.children.length).toBe(2);
    expect(obj.props.children[0].props.children[0].type).toBe('path');
    expect(obj.props.children[0].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[0].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[0].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[0].props.children[1].type).toBe('path');
    expect(obj.props.children[0].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[0].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[0].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // 2nd arc: fill, border
    expect(obj.props.children[1].props.children.length).toBe(2);
    expect(obj.props.children[1].props.children[0].type).toBe('path');
    expect(obj.props.children[1].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[1].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[1].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[1].props.children[1].type).toBe('path');
    expect(obj.props.children[1].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[1].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[1].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // 3rd arc: fill, border
    expect(obj.props.children[2].props.children.length).toBe(2);
    expect(obj.props.children[2].props.children[0].type).toBe('path');
    expect(obj.props.children[2].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[2].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[2].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[2].props.children[1].type).toBe('path');
    expect(obj.props.children[2].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[2].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[2].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // border
    expect(obj.props.children[3].props.fill).toBe(borderProps.fillStyle);
    expect(obj.props.children[3].props.stroke).toBe(borderProps.strokeColor);
    expect(obj.props.children[3].props.d).toEqual(expect.stringMatching(borderRegex));

});

test('makeTile(3)', () => {

    const obj = makeTile(3, corners, r, borderProps, ribbonProps);

    // arc, straight, arc, polygon
    expect(obj.props.children.length).toBe(4);
    // 1st arc: fill, border
    expect(obj.props.children[0].props.children.length).toBe(2);
    expect(obj.props.children[0].props.children[0].type).toBe('path');
    expect(obj.props.children[0].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[0].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[0].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[0].props.children[1].type).toBe('path');
    expect(obj.props.children[0].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[0].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[0].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // straight: fill, border
    expect(obj.props.children[1].props.children.length).toBe(2);
    expect(obj.props.children[1].props.children[0].type).toBe('path');
    expect(obj.props.children[1].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[1].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[1].props.children[0].props.d).toEqual(expect.stringMatching(straightFillRegex));
    expect(obj.props.children[1].props.children[1].type).toBe('path');
    expect(obj.props.children[1].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[1].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[1].props.children[1].props.d).toEqual(expect.stringMatching(straightEdgeRegex));

    // 3rd arc: fill, border
    expect(obj.props.children[2].props.children.length).toBe(2);
    expect(obj.props.children[2].props.children[0].type).toBe('path');
    expect(obj.props.children[2].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[2].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[2].props.children[0].props.d).toEqual(expect.stringMatching(arcFillRegex));
    expect(obj.props.children[2].props.children[1].type).toBe('path');
    expect(obj.props.children[2].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[2].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[2].props.children[1].props.d).toEqual(expect.stringMatching(arcEdgeRegex));

    // border
    expect(obj.props.children[3].props.fill).toBe(borderProps.fillStyle);
    expect(obj.props.children[3].props.stroke).toBe(borderProps.strokeColor);
    expect(obj.props.children[3].props.d).toEqual(expect.stringMatching(borderRegex));

});

test('makeTile(4)', () => {

    const obj = makeTile(4, corners, r, borderProps, ribbonProps);

    // 3 straights, polygon
    expect(obj.props.children.length).toBe(4);
    // 1st straight: fill, border
    expect(obj.props.children[0].props.children.length).toBe(2);
    expect(obj.props.children[0].props.children[0].type).toBe('path');
    expect(obj.props.children[0].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[0].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[0].props.children[0].props.d).toEqual(expect.stringMatching(straightFillRegex));
    expect(obj.props.children[0].props.children[1].type).toBe('path');
    expect(obj.props.children[0].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[0].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[0].props.children[1].props.d).toEqual(expect.stringMatching(straightEdgeRegex));

    // 2nd straight: fill, border
    expect(obj.props.children[1].props.children.length).toBe(2);
    expect(obj.props.children[1].props.children[0].type).toBe('path');
    expect(obj.props.children[1].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[1].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[1].props.children[0].props.d).toEqual(expect.stringMatching(straightFillRegex));
    expect(obj.props.children[1].props.children[1].type).toBe('path');
    expect(obj.props.children[1].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[1].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[1].props.children[1].props.d).toEqual(expect.stringMatching(straightEdgeRegex));

    // 3rd straight: fill, border
    expect(obj.props.children[2].props.children.length).toBe(2);
    expect(obj.props.children[2].props.children[0].type).toBe('path');
    expect(obj.props.children[2].props.children[0].props.fill).toBe(ribbonProps.fillStyle);
    expect(obj.props.children[2].props.children[0].props.stroke).toBe('none');
    expect(obj.props.children[2].props.children[0].props.d).toEqual(expect.stringMatching(straightFillRegex));
    expect(obj.props.children[2].props.children[1].type).toBe('path');
    expect(obj.props.children[2].props.children[1].props.fill).toBe('none');
    expect(obj.props.children[2].props.children[1].props.stroke).toBe(ribbonProps.strokeColor);
    expect(obj.props.children[2].props.children[1].props.d).toEqual(expect.stringMatching(straightEdgeRegex));

    // border
    expect(obj.props.children[3].props.fill).toBe(borderProps.fillStyle);
    expect(obj.props.children[3].props.stroke).toBe(borderProps.strokeColor);
    expect(obj.props.children[3].props.d).toEqual(expect.stringMatching(borderRegex));

});
