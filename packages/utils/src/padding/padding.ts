import { CSSProperties } from "react";

import EdgeInsets from "../edge-insets";
import { Maybe } from "../types";

const isNull = <T extends any>(value: Maybe<T>) => value === null;

class Padding extends EdgeInsets {
  /**
   * Generates CSS string based on data.
   */
  toCSSString() {
    if (isNull(this.top) && isNull(this.right) && isNull(this.bottom) && isNull(this.left)) return null;

    const result = [];

    // test left
    if (!isNull(this.left)) result.push(`padding-left: ${this.left}px;`);
    // test right
    if (!isNull(this.right)) result.push(`padding-right: ${this.right}px;`);
    // test top
    if (!isNull(this.top)) result.push(`padding-top: ${this.top}px;`);
    // test bottom
    if (!isNull(this.bottom)) result.push(`padding-bottom: ${this.bottom}px;`);

    return result.join("\n");
  }

  /**
   * Generates React Style CSS.
   */
  toStyle(): CSSProperties {
    return {
      paddingTop: this.top ?? undefined,
      paddingRight: this.right ?? undefined,
      paddingBottom: this.bottom ?? undefined,
      paddingLeft: this.left ?? undefined,
    };
  }

  copyWith({
    top = null,
    right = null,
    bottom = null,
    left = null,
  }: {
    top?: Maybe<number>;
    right?: Maybe<number>;
    bottom?: Maybe<number>;
    left?: Maybe<number>;
  }) {
    return new Padding(top ?? this.top, right ?? this.right, bottom ?? this.bottom, left ?? this.left);
  }

  public toString() {
    return `Padding(top: ${this.top}, right: ${this.right}, bottom: ${this.bottom}, left: ${this.left})`;
  }
}

export default Padding;