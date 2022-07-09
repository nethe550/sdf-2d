/**
 * @author nethe550
 * @license MIT
 * @description The SDF renderer editor.
 */

import Vector2 from '../../../src/util/Vector2.js';
import Color from '../../../src/util/Color.js';

/**
 * @typedef {import('../../../src/type/Types.js').ControlPanelEntries} ControlPanelEntries - A collection of entries used for control panel state management.
 * @typedef {import('../../../src/type/Types.js').ControlPanelEntry} ControlPanelEntry - A control panel entry.
 */

/**
 * Truncates a number to a specified amount of decimal digits.
 * @param {number} number - The number to truncate.
 * @param {number} digits - The amount of decimal digits.
 * @returns {number} The truncated number.
 */
const trunc = (number, digits) => {
    const multiplier = Math.pow(10, digits);
    const adjusted = number * multiplier;
    return Math[adjusted < 0 ? 'ceil' : 'floor'](adjusted) / multiplier;
};

/**
 * The SDF renderer editor.
 * @class
 */
class ControlPanel extends EventTarget {

    /**
     * Creates a new control panel.
     * @param {string} title - The title of the control panel.
     * @param {HTMLElement} parent - The parent element that this panel should root to. 
     * @param {ControlPanelEntries} entries - The entries to populate this control panel with.
     */
    constructor(title, parent, entries) {

        super();

        /**
         * The entries used to populate this control panel.
         * @type {ControlPanelEntries}
         */
        this.entries = entries;

        /**
         * The current shape.
         * @type {ControlPanelEntry}
         */
        this.currentShape = this.entries[Object.keys(this.entries)[0]];

        this.initDOM(title, parent);

        this.generate();
        
        this.dispatchEvent(new Event('change'));

    }

    /**
     * The title of this control panel.
     * @returns {string}
     */
    get title() { return this.titleHeader.innerText; }

    /**
     * Sets the title of this control panel.
     * @param {string} title - The new title.
     */
    set title(title) { this.titleHeader.innerText = title; }

    /**
     * Initializes the control panel DOM.
     * @param {string} title - The title of the control panel.
     * @param {HTMLElement} parent - The parent element that this panel should root to.
     */
    initDOM(title, parent) {

        const root = document.createElement('div');
        root.classList.add('control-panel');

        const titleSection = document.createElement('div');
        titleSection.classList.add('control-panel-section');
        this.titleHeader = document.createElement('h2');
        this.titleHeader.innerText = title;
        titleSection.appendChild(this.titleHeader);
        root.appendChild(titleSection);

        root.appendChild(this.divider());

        this.shapeSelector = document.createElement('select');
        for (let key of Object.keys(this.entries)) {
            const option = document.createElement('option');
            option.value = key;
            option.innerText = key;
            if (this.entries[key] == this.currentShape) option.selected = true;
            this.shapeSelector.appendChild(option);
        }
        this.shapeSelector.addEventListener('change', this.changeShape.bind(this));
        root.appendChild(this.section('Shape', this.shapeSelector));

        this.dynamic = document.createElement('div');
        this.dynamic.classList.add('control-panel-dynamic');
        root.appendChild(this.dynamic);

        parent.appendChild(root);

    }

    /**
     * Changes the current shape of the control panel.
     */
    changeShape() {

        this.currentShape = this.entries[this.shapeSelector.options[this.shapeSelector.selectedIndex].value];
        this.generate();
        this.dispatchEvent(new Event('change'));

    }

    /**
     * Creates a new section for the control panel.
     * @param {string} name - The name of the section.
     * @param  {...HTMLElement} children - The children to append to this section.
     * @returns {HTMLDivElement} The new section.
     */
    section(name, ...children) {

        const section = document.createElement('div');
        section.classList.add('control-panel-section');
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.innerText = name;
        fieldset.appendChild(legend);

        for (let child of children) {
            fieldset.appendChild(child);
        }

        section.appendChild(fieldset);

        return section;

    }

    /**
     * Creates a new divider for the control panel.
     * @returns {HTMLDivElement} The new divider.
     */
    divider() {

        const divider = document.createElement('div');
        divider.classList.add('control-panel-divider');
        return divider;

    }

    /**
     * Generates required parameter input elements for the current shape.
     */
    generate() {
        
        this.dynamic.innerHTML = '';

        for (let key of Object.keys(this.currentShape.params)) {

            const children = [];
            
            if (this.currentShape.params[key] == Number) {

                const input = document.createElement('input');
                input.type = 'number';
                input.placeholder = key;
                input.value = trunc(this.currentShape.values[key], 2);
                children.push(input);

                input.addEventListener('change', (() => {
                    this.currentShape.values[key] = parseInt(input.value);
                    this.dispatchEvent(new Event('change'));
                }).bind(this));

            }
            else if (this.currentShape.params[key] == Vector2) {

                const componentXLabel = document.createElement('label');
                componentXLabel.innerText = 'X: ';
                const componentX = document.createElement('input');
                componentX.type = 'number';
                componentX.placeholder = 'X';
                componentX.value = trunc(this.currentShape.values[key].x, 2);
                children.push(componentXLabel);
                children.push(componentX);
                componentX.addEventListener('change', (() => {
                    this.currentShape.values[key].x = parseInt(componentX.value);
                    this.dispatchEvent(new Event('change'));
                }).bind(this));

                const componentYLabel = document.createElement('label');
                componentYLabel.innerText = 'Y: ';
                const componentY = document.createElement('input');
                componentY.type = 'number';
                componentY.placeholder = 'Y';
                componentY.value = trunc(this.currentShape.values[key].y, 2);
                children.push(componentYLabel);
                children.push(componentY);
                componentY.addEventListener('change', (() => {
                    this.currentShape.values[key].y = parseInt(componentY.value);
                    this.dispatchEvent(new Event('change'));
                }).bind(this));

            }
            else if (this.currentShape.params[key] == Color) {

                const input = document.createElement('input');
                input.type = 'color';
                input.value = this.currentShape.values[key].hex;
                children.push(input);

                const alphaLabel = document.createElement('label');
                alphaLabel.innerText = 'Alpha: ';
                children.push(alphaLabel);

                const alpha = document.createElement('input');
                alpha.type = 'number';
                alpha.value = trunc(this.currentShape.values[key].a, 2);
                alpha.min = 0;
                alpha.max = 255;
                alpha.step = 1;
                children.push(alpha);

                input.addEventListener('change', (() => {
                    const a = Math.min(Math.max(parseInt(alpha.value), 0), 255);
                    this.currentShape.values[key] = Color.FromHex(input.value, a);
                    this.dispatchEvent(new Event('change'));
                }).bind(this));

                alpha.addEventListener('change', (() => {
                    this.currentShape.values[key].a = Math.min(Math.max(parseInt(alpha.value), 0), 255);
                    this.dispatchEvent(new Event('change'));
                }).bind(this));

            }
            else return console.warn(`Unknown key '${key}'.`);

            const section = this.section(key, ...children);

            this.dynamic.appendChild(section);

        }

    }

}

export default ControlPanel;