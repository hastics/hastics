import { FC, useMemo } from "react";
import { createUseStyles } from "react-jss";

import Color from "../../../color";
import Colors from "../../../colors";
import Duration from "../../../duration";

/** Defines LoaderScreen props */
export interface LoaderScreenProps {
  /**
   * The first color.
   *
   * @default Colors.red[200]
   */
  color1?: Color;
  /**
   * The second color.
   *
   * @default Colors.black
   */
  color2?: Color;
  /**
   * The third color.
   *
   * @default Colors.green[200]
   */
  color3?: Color;
  /**
   * The fourth color.
   *
   * @default Colors.purple[200]
   */
  color4?: Color;
  /**
   * Animation duration. Is a `Duration` class instance.
   *
   * @default Duration.seconds(1)
   */
  animationDuration?: Duration;
}

/** Defines LoaderScreen styles props */
interface LoaderScreenStylesProps {
  /** The first color. */
  color1: Color;
  /** The second color. */
  color2: Color;
  /** The third color. */
  color3: Color;
  /** The fourth color. */
  color4: Color;
  /** The animation duration */
  animationDuration: Duration;
}

/**
 * This method builds a `useStyles` from props.
 *
 * @param   {LoaderScreenStylesProps} props The props
 * @example
 * const useStyles = makeUseStyles({ animationDuration, color1, color2, color3, color4 });
 * const styles = useStyles();
 * @returns {CSSProperties}                 The styles
 */
const makeUseStyles = ({ animationDuration, color1, color2, color3, color4 }: LoaderScreenStylesProps) => {
  const durationInMs = animationDuration.inMilliseconds;

  return createUseStyles({
    "@keyframes rotateScale": {
      "0%": { transform: "rotate(0deg) scale(0.8)" },
      "50%": { transform: "rotate(360deg) scale(1.2)" },
      "100%": { transform: "rotate(720deg) scale(0.8)" },
    },
    "@keyframes shadowOne": {
      "0%": {
        boxShadow: `1.875rem 0 0 ${color3.toRGB()}`,
      },
      "50%": {
        boxShadow: `0 0 0 ${color3.toRGB()}`,
        marginBottom: 0,
        transform: "translate(0.9375rem, 0.9375rem)",
      },
      "100%": {
        boxShadow: `1.875rem 0 0 ${color3.toRGB()}`,
        marginBottom: "0.625rem",
      },
    },
    "@keyframes shadowTwo": {
      "0%": {
        boxShadow: `1.875rem 0 0 ${color4.toRGB()}`,
      },
      "50%": {
        boxShadow: `0 0 0 ${color4.toRGB()}`,
        marginTop: "-1.25rem",
        transform: "translate(0.9375rem, 0.9375rem)",
      },
      "100%": {
        boxShadow: `1.875rem 0 0 ${color4.toRGB()}`,
        marginTop: 0,
      },
    },
    wrapper: {
      width: "3.125rem",
      height: "3.125rem",
      animation: `${durationInMs}ms ease 0s infinite normal none running $rotateScale`,
      "&:before": {
        borderRadius: "50%",
        content: '""',
        display: "block",
        height: "1.25rem",
        width: "1.25rem",
        backgroundColor: color1.toRGB(),
        boxShadow: `1.875rem 0 0 ${color1.toRGB()}`,
        marginBottom: "0.625rem",
        animation: `${durationInMs}ms ease 0s infinite normal none running $shadowOne`,
      },
      "&:after": {
        borderRadius: "50%",
        content: '""',
        display: "block",
        height: "1.25rem",
        width: "1.25rem",
        backgroundColor: color2.toRGB(),
        boxShadow: `1.875rem 0 0 ${color2.toRGB()}`,
        animation: `${durationInMs}ms ease 0s infinite normal none running $shadowTwo`,
      },
    },
  });
};

/**
 * This component aims to be used when an entire screen is loading.
 *
 * @param   {LoaderScreenProps} props The props
 * @example
 * <LoaderScreen />
 * @returns {JSX.Element}             The JSX element.
 */
export const LoaderScreen: FC<LoaderScreenProps> = ({
  animationDuration = Duration.seconds(1),
  color1 = Colors.red[200],
  color2 = Colors.black,
  color3 = Colors.green[200],
  color4 = Colors.purple[200],
}) => {
  const useStyles = useMemo(
    () => makeUseStyles({ animationDuration, color1, color2, color3, color4 }),
    [animationDuration, color1, color2, color3, color4],
  );
  const styles = useStyles();

  return <div data-testid="loader-screen" className={styles.wrapper} />;
};

export default LoaderScreen;
