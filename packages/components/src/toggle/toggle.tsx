import classnames from "classnames";
import { CSSProperties, FC, ReactNode, useCallback } from "react";
import { createUseStyles } from "react-jss";

import Color from "../color";
import Colors from "../colors";
import useMergedState from "../hooks/useMergedState";
import Loader from "../loader";
import classes from "./toggle.module.scss";

/**
 * Defines the base Toggle props. Used to be extended.
 */
interface BaseToggleProps {
  /**
   * Basically the `checked` state color.
   *
   * @default Colors.teal[500]
   */
  checkedColor?: Color;
  /**
   * Basically the `unchecked` state color.
   *
   * @default Colors.grey[300]
   */
  unCheckedColor?: Color;
  /**
   * Is the button disabled ?
   * If true, it sets whole opacity to 0.4 and disabled any click.
   */
  disabled?: boolean;
  /**
   * Will be shown inside the Toggle when its `checked` prop is `true`.
   */
  checkedLabel?: ReactNode;
  /**
   * Will be shown inside the Toggle when its `checked` prop is `false`.
   */
  unCheckedLabel?: ReactNode;
  /**
   * You can get a small `Toggle` component.
   */
  size?: "small" | "default";
  /**
   * Is the button loading ?
   * If true, it shows a loader and disabled the toggle actions.
   */
  loading?: boolean;
}

/**
 * Defines the props for uncontrolled Toggle component.
 */
interface UncontrolledToggleProps {
  /**
   * Is the Toggle checked ? Should not be set if you want an uncontrolled Toggle.
   */
  checked?: undefined;
  /**
   * Handle Toggle value change. Should not be set if you want an uncontrolled Toggle.
   */
  onChange?: undefined;
}

/**
 * Defines the props for controlled Toggle component.
 */
interface ControlledToggleProps {
  /**
   * Is the Toggle checked ? Should not be set if you want an uncontrolled Toggle.
   */
  checked: boolean;
  /**
   * Handle Toggle value change. Should not be set if you want an uncontrolled Toggle.
   */
  onChange: (nextValue: boolean) => void;
}

/**
 * Defines the Toggle props.
 */
export type ToggleProps = BaseToggleProps & (UncontrolledToggleProps | ControlledToggleProps);

/** Defines the props given to the `useStyles` */
interface ToggleStylesProps {
  /** Toggle value */
  value: boolean;
  /** Toggle color when it's checked */
  checkedColor: Color;
  /** Toggle color when it's unchecked */
  unCheckedColor: Color;
  /** Is the Toggle disabled ? */
  disabled: boolean;
}

/**
 * @typedef {Object} Args
 * @property {Color}   checkedColor   The checked Toggle color.
 * @property {Color}   unCheckedColor The unchecked Toggle color.
 * @property {boolean} value          Toggle value.
 * @property {boolean} disabled       Is the Toggle disabled ?
 */

const useStyles = createUseStyles({
  /**
   * Returns styles for toggle button
   *
   * @param   {Args}          args The arguments.
   * @returns {CSSProperties}      The button styles.
   * @example
   * button({ checkedColor: Color(0xffffffff), uncheckedColor: Color(0xff000000), value: true, disabled: false });
   */
  button: (args: ToggleStylesProps): CSSProperties => {
    const { checkedColor, unCheckedColor, value, disabled } = args;
    const color = value ? checkedColor : unCheckedColor;

    return {
      backgroundColor: color.toRGBA(),
      opacity: disabled ? 0.4 : undefined,
      cursor: disabled ? "not-allowed" : undefined,
    };
  },
});

/**
 * Displays a Toggle that you can click on to make it checked.
 *
 * By default, if you don't pass `checked` and `onChange`, it's considered `uncontrolled`.
 * That means you can't control its value nor catch its change.
 *
 * @param   {ToggleProps} props The toggle props.
 * @example
 * <Toggle checked={false} />
 * @returns {JSX.Element}       a JSX element.
 */
export const Toggle: FC<ToggleProps> = ({
  checked,
  onChange,
  checkedColor = Colors.teal[500],
  unCheckedColor = Colors.grey[500],
  disabled = false,
  checkedLabel,
  unCheckedLabel,
  size = "default",
  loading,
}) => {
  const isDisabled = loading || disabled;

  const [value, setValue] = useMergedState(checked ?? false);
  const styles = useStyles({
    value,
    checkedColor,
    unCheckedColor,
    disabled: isDisabled,
  });

  const handleClick = useCallback(() => {
    if (isDisabled) return;
    if (onChange) onChange(!value);
    else setValue(!value);
  }, [isDisabled, onChange, setValue, value]);

  return (
    <button
      type="button"
      role="switch"
      aria-label={`Toggle ${value ? "on" : "off"}`}
      aria-checked={value}
      className={classnames(classes.button, styles.button, {
        [classes.button__checked]: value,
        [classes.button__small]: size === "small",
        [classes.button__disabled]: isDisabled,
      })}
      onClick={handleClick}
    >
      <span className={classes.handle}>
        {loading ? (
          <Loader
            className={classes.loader}
            size={size === "small" ? 10 : 14}
            thickness={1}
            color={value ? checkedColor : unCheckedColor}
          />
        ) : null}
      </span>
      <span className={classes.inner}>{value ? checkedLabel ?? null : unCheckedLabel ?? null}</span>
    </button>
  );
};

export default Toggle;
