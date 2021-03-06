import classnames from "classnames";
import { FC, ReactElement, ReactNode } from "react";

import Color from "../color";
import Colors from "../colors";
import Icon, { IconProps } from "../icon";
import Icons from "../icons";
import classes from "./result.module.scss";

/** Defines possible statuses for Result component */
export enum ResultStatus {
  SUCCESS = "@result-status_success",
  INFO = "@result-status_info",
  WARNING = "@result-status_warning",
  ERROR = "@result-status_error",
}

/** Defines possible className overrides for Result component */
export interface ResultClassnames {
  /**
   * The **Result** wrapper. Contains all React nodes.
   */
  wrapper?: string;

  /**
   * **icon** wrapper. By default, it only applies a bottom margin.
   */
  icon?: string;

  /**
   * The **title** className.
   */
  title?: string;

  /**
   * The **subtitle** className.
   */
  subtitle?: string;

  /**
   * The **actions** wrapper. By default, it only applies a bottom margin, and a gap between elements.
   */
  actions?: string;

  /**
   * The **content** className.
   */
  content?: string;
}

/** The base Result props. Meant to be overridden */
interface BaseResultProps {
  /**
   * The **title** you want to show.
   */
  title: string;
  /**
   * An optional **subtitle**.
   */
  subtitle?: string;
  /**
   * @deprecated NYI.
   */
  children?: ReactNode;
  /**
   * Use this to implement your own actions.
   * Generally buttons, but can be links too.
   */
  actions?: ReactNode | ReactNode[];

  /**
   * Override classNames.
   * Use this to customize the **Result** component.
   */
  classNames?: ResultClassnames;
}

/** Defines the Result props when using custom icon */
export interface ResultWithCustomIconProps extends BaseResultProps {
  /**
   * REQUIRED if **icon** is not set.
   *
   * You cannot set a **status** along with an **icon**.
   */
  status?: undefined;
  /**
   * REQUIRED if **status** is not set.
   *
   * You cannot set an **icon** along with a **status**.
   */
  icon: ReactElement<IconProps>;
  /**
   * Override default Icon size.
   *
   * @default 72
   */
  iconSize?: undefined;
}

/** Defines the Result props when NOT using custom icon */
export interface ResultWithoutCustomIconProps extends BaseResultProps {
  /**
   * REQUIRED if **icon** is not set.
   *
   * You cannot set a **status** along with an **icon**.
   */
  status: ResultStatus;
  /**
   * REQUIRED if **status** is not set.
   *
   * You cannot set an **icon** along with a **status**.
   */
  icon?: undefined;

  /**
   * Override default Icon size.
   *
   * @default 72
   */
  iconSize?: number;
}

/** Defines Result props */
export type ResultProps = ResultWithoutCustomIconProps | ResultWithCustomIconProps;

/**
 * This helper is used to get correct icon from given args
 *
 * @param   {ResultStatus}            status        The status
 * @param   {ReactElement<IconProps>} [icon]        The custom icon, if exists
 * @param   {number}                  [iconSize=72] The icon size
 * @example
 * getIcon(ResultStatus.ERROR, undefined, 36)
 * @returns {JSX.Element}                           The custom icon
 */
const getIcon = (status?: ResultStatus, icon?: ReactElement<IconProps>, iconSize = 72) => {
  if (icon) return icon;
  const wrappedIconSize = (iconSize * 54) / 72;

  switch (status) {
    case ResultStatus.INFO:
      return <Icon icon={Icons.error} size={iconSize} color={new Color(0xff1890ff)} />;
    case ResultStatus.ERROR:
      return (
        <div
          className={classnames(classes.icon_wrapper, classes.icon_wrapper__error)}
          style={{ width: iconSize, height: iconSize }}
        >
          <Icon icon={Icons.close} color={Colors.white} size={wrappedIconSize} />
        </div>
      );
    case ResultStatus.SUCCESS:
      return (
        <div
          className={classnames(classes.icon_wrapper, classes.icon_wrapper__success)}
          style={{ width: iconSize, height: iconSize }}
        >
          <Icon icon={Icons.check} color={Colors.white} size={wrappedIconSize} />
        </div>
      );
    case ResultStatus.WARNING:
      return <Icon icon={Icons.warning_rounded} color={new Color(0xfffaad14)} size={iconSize} />;
    default:
      return null;
  }
};

/**
 * Used to feed back the results of a series of operational tasks.
 *
 * @param   {ResultProps} props The props.
 * @example
 * <Result status={ResultStatus.ERROR} title="An error occured" />
 * @returns {JSX.Element}       The JSX element
 */
export const Result: FC<ResultProps> = ({ status, title, subtitle, icon, children, iconSize, actions, classNames }) => (
  <div data-testid="result" className={classnames(classes.wrapper, classNames?.wrapper)}>
    <div className={classnames(classes.icon, classNames?.icon)}>{getIcon(status, icon, iconSize)}</div>

    <div className={classnames(classes.title, classNames?.title)}>{title}</div>

    {subtitle && <div className={classnames(classes.subtitle, classNames?.subtitle)}>{subtitle}</div>}

    {actions && <div className={classnames(classes.actions, classNames?.actions)}>{actions}</div>}

    {children && <div className={classnames(classes.content, classNames?.content)}>{children}</div>}
  </div>
);

export default Result;
