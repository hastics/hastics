import assert from "assert";

import Brightness from "../brightness";
import { toHsl } from "./utils";

/**
 * The [Color] class allows you to handle colors easily.
 * You can manipulate a [Color] to add or subtract alpha, red, green or blue. And many other manipulations.
 */
class Color {
  private value: number;
  public readonly alpha: number;
  public readonly red: number;
  public readonly green: number;
  public readonly blue: number;
  public readonly hue: number;
  public readonly saturation: number;
  public readonly lightness: number;

  /**
   * Create a Color.
   * It takes a number, but it's pretty hard to know the exact color so it's better so write something like this
   *
   * @param {number} color The color number (0xff123456)
   * @example new Color(0xff123456) // where "ff" is alpha channel, 12 is red, 34 is green, and 56 is blue.
   */
  constructor(color: number) {
    const a = color >>> 24;
    const r = (color >>> 16) & 0xff;
    const g = (color >>> 8) & 0xff;
    const b = color & 0xff;

    const [h, s, l] = toHsl(r, g, b);

    Color.assert(a, r, g, b);

    this.value = color;
    this.alpha = a;
    this.red = r;
    this.green = g;
    this.blue = b;
    this.hue = h;
    this.saturation = s;
    this.lightness = l;
  }

  /**
   * Converts a Color to its string representation.
   *
   * @example
   * Colors.red.toString();
   * @returns {string} The string representation
   */
  public toString() {
    return `Color(0x${(this.value >>> 0).toString(16)})`;
  }

  /**
   * Check that all is working as expected.
   *
   * @param   {number} a Alpha channel
   * @param   {number} r Red channel
   * @param   {number} g Green channel
   * @param   {number} b Blue channel
   * @example
   * Color.assert(0, 0, 0, 0)
   * @returns {void}     Nothing
   * @throws If an error occurs
   */
  static assert = (a: number, r: number, g: number, b: number) => {
    assert(a >= 0, "Alpha channel should be between 0 and 255");
    assert(a <= 255, "Alpha channel should be between 0 and 255");
    assert(r >= 0, "Red channel should be between 0 and 255");
    assert(r <= 255, "Red channel should be between 0 and 255");
    assert(g >= 0, "Green channel should be between 0 and 255");
    assert(g <= 255, "Green channel should be between 0 and 255");
    assert(b >= 0, "Blue channel should be between 0 and 255");
    assert(b <= 255, "Blue channel should be between 0 and 255");
  };

  /**
   * Create a [Color] from alpha, red, green and blue channels.
   *
   * @param   {number} a Alpha channel
   * @param   {number} r Red channel
   * @param   {number} g Green channel
   * @param   {number} b Blue channel
   * @example
   * Color.fromARGB(100, 255, 255, 255) // full white
   * @returns {Color}    A new Color
   */
  static fromARGB(a: number, r: number, g: number, b: number) {
    this.assert(a, r, g, b);

    return new Color((((a & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff) << 0)) & 0xffffffff);
  }

  /**
   * Create a [Color] from hue, saturation and lightness.
   *
   * @param   {number} hue        Hue between 0 and 360
   * @param   {number} saturation Saturation between 0 and 100
   * @param   {number} lightness  Lightness between 0 and 100
   * @param   {number} alpha      Alpha between 0 and 255
   * @example
   * Color.fromHSLA(0, 100, 50, 255);
   * @returns {Color}             A new Color.
   */
  static fromHSLA(hue: number, saturation: number, lightness: number, alpha = 255) {
    assert(hue >= 0, "Hue should be between 0 and 360");
    assert(hue <= 360, "Hue should be between 0 and 360");
    assert(saturation >= 0, "Saturation should be between 0 and 100");
    assert(saturation <= 100, "Saturation should be between 0 and 100");
    assert(lightness >= 0, "Lightness should be between 0 and 100");
    assert(lightness <= 100, "Lightness should be between 0 and 100");
    assert(alpha >= 0, "Alpha should be between 0 and 255");
    assert(alpha <= 255, "Alpha should be between 0 and 255");

    const s1 = saturation / 100;
    const l1 = lightness / 100;

    const c = (1 - Math.abs(2 * l1 - 1)) * s1;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = l1 - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (hue >= 0 && hue < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (hue >= 60 && hue < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (hue >= 120 && hue < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (hue >= 180 && hue < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (hue >= 240 && hue < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return Color.fromARGB(alpha, r, g, b);
  }

  /**
   * Converts the [Color] instance to CSS `#rrggbbaa`.
   *
   * @example
   * Colors.blue.toRGB()
   * @returns {string} "#0000ffff"
   */
  toRGB = () => {
    const r = this.red.toString(16).padStart(2, "0");
    const g = this.green.toString(16).padStart(2, "0");
    const b = this.blue.toString(16).padStart(2, "0");
    const a = this.alpha.toString(16).padStart(2, "0");
    return "#" + r + g + b + a;
  };

  /**
   * Converts the [Color] instance to CSS `rgba(rrr, ggg, bbb, o)`.
   *
   * @example
   * Colors.blue.toRGBA()
   * @returns {string} "rgba(0, 0, 255, 1)"
   */
  toRGBA = () => {
    /**
     * In CSS, `rgba` alpha channel goes from 0 to 1, like an opacity.
     * So we transform this first.
     */
    const o = (this.alpha / 255).toFixed(2);

    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${o})`;
  };

  /**
   * Returns a new color that matches this color with the alpha channel replaced with a (which ranges from 0 to 255).
   *
   * @param   {number} a Alpha channel
   * @example
   * Colors.blue.withAlpha(0)
   * @returns {Color}    A new Color.
   */
  withAlpha = (a: number) => {
    assert(a >= 0, "Alpha channel should be between 0 and 255");
    assert(a <= 255, "Alpha channel should be between 0 and 255");

    return Color.fromARGB(a, this.red, this.green, this.blue);
  };

  /**
   * Returns a new color that matches this color with the alpha channel replaced with the given opacity (which ranges from 0.0 to 1.0).
   *
   * @param   {number} o Opacity
   * @example
   * Colors.blue.withOpacity(0)
   * @returns {Color}    A new Color.
   */
  withOpacity = (o: number) => {
    assert(o >= 0, "Opacity should be between 0 and 1");
    assert(o <= 1, "Opacity should be between 0 and 1");

    return this.withAlpha(Math.round(255 * o));
  };

  /**
   * Returns a new color that matches this color with the red channel replaced with r (which ranges from 0 to 255).
   *
   * @param   {number} r Red channel
   * @example
   * Colors.blue.withRed(10)
   * @returns {Color}    A new Color.
   */
  withRed = (r: number) => {
    assert(r >= 0, "Red channel should be between 0 and 255");
    assert(r <= 255, "Red channel should be between 0 and 255");

    return Color.fromARGB(this.alpha, r, this.green, this.blue);
  };

  /**
   * Returns a new color that matches this color with the green channel replaced with g (which ranges from 0 to 255).
   *
   * @param   {number} g Green channel
   * @example
   * Colors.blue.withGreen(10)
   * @returns {Color}    A new Color.
   */
  withGreen = (g: number) => {
    assert(g >= 0, "Green channel should be between 0 and 255");
    assert(g <= 255, "Green channel should be between 0 and 255");

    return Color.fromARGB(this.alpha, this.red, g, this.blue);
  };

  /**
   * Returns a new color that matches this color with the blue channel replaced with b (which ranges from 0 to 255).
   *
   * @param   {number} b Blue channel
   * @example
   * Colors.blue.withBlue(10)
   * @returns {Color}    A new Color.
   */
  withBlue = (b: number) => {
    assert(b >= 0, "Blue channel should be between 0 and 255");
    assert(b <= 255, "Blue channel should be between 0 and 255");

    return Color.fromARGB(this.alpha, this.red, this.green, b);
  };

  /**
   * Returns a new color that matches this color with the hue replaced with h (which ranged from 0 to 360)
   *
   * @param   {number} h Hue
   * @example
   * Colors.blue.withHue(0)
   * @returns {Color}    A new Color.
   */
  withHue = (h: number) => {
    assert(h >= 0, "Hue should be between 0 and 360");
    assert(h <= 360, "Hue should be between 0 and 360");

    return Color.fromHSLA(h, this.saturation, this.lightness, this.alpha);
  };

  /**
   * Returns a new color that matches this color with the saturation replaced with s (which ranged from 0 to 100)
   *
   * @param   {number} s Saturation
   * @example
   * Colors.blue.withSaturation(0)
   * @returns {Color}    A new Color.
   */
  withSaturation = (s: number) => {
    assert(s >= 0, "Saturation should be between 0 and 100");
    assert(s <= 100, "Saturation should be between 0 and 100");

    return Color.fromHSLA(this.hue, s, this.lightness, this.alpha);
  };

  /**
   * Returns a new color that matches this color with the lightness replaced with l (which ranged from 0 to 100)
   *
   * @param   {number} l Lightness channel
   * @example
   * Colors.blue.withLightness(0)
   * @returns {Color}    A new Color.
   */
  withLightness = (l: number) => {
    assert(l >= 0, "Lightness should be between 0 and 100");
    assert(l <= 100, "Lightness should be between 0 and 100");

    return Color.fromHSLA(this.hue, this.saturation, l, this.alpha);
  };

  /**
   * Don't really know how it works, it's internal use ONLY
   *
   * @param   {number} component a value
   * @example
   * Color._linearizeColorComponent(this.red / 0xff);
   * @returns {number}           A number
   * @deprecated DON'T USE IT
   */
  static _linearizeColorComponent(component: number) {
    if (component <= 0.03928) return component / 12.92;
    return Math.pow((component + 0.055) / 1.055, 2.4);
  }

  /**
   * Returns a brightness value between 0 for darkest and 1 for lightest.
   * Represents the relative lightness of the color.
   * This value is computationally expensive to calculate.
   *
   * @example
   * Colors.red.computeLuminance();
   * @returns {number} Between 0 for darkest and 1 for lightest
   */
  computeLuminance() {
    const R = Color._linearizeColorComponent(this.red / 0xff);
    const G = Color._linearizeColorComponent(this.green / 0xff);
    const B = Color._linearizeColorComponent(this.blue / 0xff);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  /**
   * Determines whether the given Color is Brightness.LIGHT or Brightness.DARK.
   * This compares the luminosity of the given color to a threshold value that matches the material design specification.
   *
   * @example
   * Colors.red.estimateBrightness();
   * @returns {Brightness} The brightness.
   */
  estimateBrightness() {
    const relativeLuminance = this.computeLuminance();

    // See <https://www.w3.org/TR/WCAG20/#contrast-ratiodef>
    // The spec says to use kThreshold=0.0525, but Material Design appears to bias
    // more towards using light text than WCAG20 recommends. Material Design spec
    // doesn't say what value to use, but 0.15 seemed close to what the Material
    // Design spec shows for its color palette on
    // <https://material.io/go/design-theming#color-color-palette>.
    const kThreshold = 0.15;
    if ((relativeLuminance + 0.05) * (relativeLuminance + 0.05) > kThreshold) return Brightness.light;
    return Brightness.dark;
  }
}

export default Color;
