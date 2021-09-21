import { Padding } from "@hastics/utils";
import classNames from "classnames";
import { forwardRef, ReactNode, useMemo } from "react";
import { createUseStyles } from "react-jss";

import Container from "../container";
import CrossAxisAlignment from "../cross-axis-alignment";
import Flex from "../flex";
import FontWeight from "../font-weight";
import { Icon } from "../icon";
import MainAxisAlignment from "../main-axis-alignment";
import Text from "../text";
import Typography from "../typography";
import classes from "./alert.module.scss";
import { AlertSeverities, AvatarColors, DEFAULT_COLORS, DEFAULT_ICONS } from "./constants";

type AlertChildren = ({ color }: { color: AvatarColors["font"] }) => ReactNode;

export interface AlertProps {
  /** This prop is used to override the style */
  className?: string;

  severity?: AlertSeverities;
  title?: string;
  children?: ReactNode | AlertChildren;
}

type AlertStyleProps = {
  severity: AlertSeverities;
};

/**
 * Component display name.
 */
const COMPONENT_NAME = "Alert";

const useStyles = createUseStyles({
  wrapper: ({ severity }: AlertStyleProps) => ({
    backgroundColor: DEFAULT_COLORS[severity].background.toRGBA(),
  }),
});

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ severity = AlertSeverities.info, title, className, children, ...props }, ref) => {
    const styles = useStyles({ severity });

    const content = useMemo(() => {
      if (typeof children === "function") return children({ color: DEFAULT_COLORS[severity].font });
      return <Text>{children}</Text>;
    }, [children, severity]);

    return (
      <div role="alert" ref={ref} className={classNames(classes.wrapper, styles.wrapper, className)} {...props}>
        <Container padding={Padding.symmetric({ horizontal: 16, vertical: 6 })}>
          <div className={classes.icon_wrapper}>
            <Icon icon={DEFAULT_ICONS[severity]} color={DEFAULT_COLORS[severity].icon} size={22} />
          </div>

          <Flex.Column
            crossAxisAlignment={CrossAxisAlignment.start}
            mainAxisAlignment={MainAxisAlignment.center}
            className={classes.message}
          >
            {title && (
              <Text
                className={classes.title}
                style={Typography.blackMountainView.bodyText1?.copyWith({
                  color: DEFAULT_COLORS[severity].font,
                  fontWeight: FontWeight.w500,
                })}
              >
                {title}
              </Text>
            )}

            <div className={classes.content}>{content}</div>
          </Flex.Column>
        </Container>
      </div>
    );
  },
);
Alert.displayName = COMPONENT_NAME;

export default Alert;
