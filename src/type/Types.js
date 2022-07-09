/**
 * @author nethe550
 * @license MIT
 * @description A collection of datatypes for documentation purposes.
 */

/**
 * @typedef {import('../util/Vector2.js').default} Vector2 - A two-dimensional numerical vector.
 * @typedef {import('../util/Color.js').default} Color - A collection of color utilities.
 */

/**
 * @typedef {function(Vector2, ImageData) : Color} SDFCallback - A callback to determine the color at a specified point.
 */

/**
 * @typedef {{ sdf: SDFCallback, params: { name: Number|Vector2|Color }, values: { name: number|Vector2|Color } }} ControlPanelEntry - A control panel entry.
 */

/**
 * @typedef {{ shape: ControlPanelEntry }} ControlPanelEntries - A collection of entries used for control panel state management.
 */