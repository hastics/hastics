// TODO: Replace styled-components by react-jss

import { FC, forwardRef } from "react";
import styled, { css } from "styled-components";

import Icon from "../icon";
import Padding from "../padding";

interface IconButtonBaseProps {
  icon: ReturnType<typeof Icon>;
  onPress?: VoidFunction;
  className?: string;
}

interface StyledIconProps {
  /**
   * The padding around the button's icon. The entire padded icon will react to input gestures.
   * This property must not be null. It defaults to 8.0 padding on all sides.
   * @default 8
   */
  padding?: Padding;
}

export type IconButtonProps = IconButtonBaseProps & StyledIconProps;

export const IconButtonBase = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: IconComponent, onPress, className, ...props }, ref) => (
    <button ref={ref} className={className} onClick={onPress} {...props}>
      {IconComponent}
    </button>
  ),
);

const StyledIconButton = styled(IconButtonBase)<IconButtonProps>`
  ${(p) => p.padding?.toStyledCSS() || Padding.all(8).toStyledCSS()};
  display: inline-grid;
  place-items: center;
  background-color: transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
  user-select: none;
  border: none;

  ${(p) =>
    p.onPress &&
    css`
      cursor: pointer;

      &:hover {
        background-color: rgba(100, 100, 100, 0.1);
        box-shadow: 0 0 0 10px rgba(100, 100, 100, 0.1);
      }

      &:active {
        background-color: rgba(100, 100, 100, 0.2);
        box-shadow: 0 0 0 10px rgba(100, 100, 100, 0.2);
      }
    `}
`;

/**
 * An **IconButton** is a component that you can use to show a clickable **Icon**.
 *
 * If the `onPress` callback is null, then the button will be disabled and will not react to touch.
 *
 * @see Icon
 */
export const IconButton: FC<IconButtonProps> = forwardRef<HTMLButtonElement, IconButtonBaseProps>((props, ref) => (
  <StyledIconButton ref={ref} {...props} />
));

export default IconButton;
