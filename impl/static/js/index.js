import Vector2 from '../../../src/util/Vector2.js';
import Color from '../../../src/util/Color.js';
import IImage from '../../../src/render/IImage.js';
import SDFBox from '../../../src/sdf/SDFBox.js';
import SDFCircle from '../../../src/sdf/SDFCircle.js';
import SDFLine from '../../../src/sdf/SDFLine.js';
import ControlPanel from './ControlPanel.js';

const canvas = document.querySelector('#display');
const ctx = canvas.getContext('2d');

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

resize();

const SDF = {
    circle: {
        sdf: SDFCircle,
        params: {
            'Position': Vector2,
            'Radius': Number,
            'Color': Color,
            'Blur Radius': Number
        },
        values: {
            'Position': new Vector2(canvas.width / 2, canvas.height / 2),
            'Radius': 30,
            'Color': Color.white,
            'Blur Radius': 5
        }
    },
    box: {
        sdf: SDFBox,
        params: {
            'Position': Vector2,
            'Size': Vector2,
            'Radius': Number,
            'Color': Color,
            'Blur Radius': Number
        },
        values: {
            'Position': new Vector2(canvas.width / 3, canvas.height / 3),
            'Size': new Vector2(canvas.width / 3, canvas.height / 3),
            'Radius': 10,
            'Color': Color.white,
            'Blur Radius': 5
        }
    },
    line: {
        sdf: SDFLine,
        params: {
            'Position A': Vector2,
            'Position B': Vector2,
            'Thickness': Number,
            'Color': Color,
            'Blur Radius': Number
        },
        values: {
            'Position A': new Vector2(canvas.width / 3, canvas.height / 3),
            'Position B': new Vector2(canvas.width / 3, canvas.height / 3).mul(2),
            'Thickness': 10,
            'Color': Color.white,
            'Blur Radius': 5
        }
    }
};

const panel = new ControlPanel('SDF Renderer', document.body, SDF);

panel.addEventListener('change', render);

function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    resize();

    const image = new IImage(canvas.width, canvas.height);

    switch (panel.currentShape) {

        case SDF.circle:
            image.fragment(SDFCircle(
                SDF.circle.values['Position'],
                SDF.circle.values['Radius'],
                SDF.circle.values['Color'],
                SDF.circle.values['Blur Radius']
            ));
            break;

        case SDF.box:
            image.fragment(SDFBox(
                SDF.box.values['Position'],
                SDF.box.values['Size'],
                SDF.box.values['Radius'],
                SDF.box.values['Color'],
                SDF.box.values['Blur Radius']
            ));
            break;

        case SDF.line:
            image.fragment(SDFLine(
                SDF.line.values['Position A'],
                SDF.line.values['Position B'],
                SDF.line.values['Thickness'],
                SDF.line.values['Color'],
                SDF.line.values['Blur Radius']
            ));
            break;

    }
    
    image.render(ctx);

}

window.addEventListener('resize', () => requestAnimationFrame(render));

render();