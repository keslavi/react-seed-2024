import { useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckcircleIcon from '@mui/icons-material/Checkcircle';
import panoramalFishEySharpIcon from '@mui/icons-material/PanoramaFishEyeSharp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBack from '@mui/icons-material/ArrowBack';

/**
 * Predefined icon components from Material-UI.
 * Use these as values for the Icon component's `src` prop.
 * @type {Object.<string, import('react').ComponentType>}
 */
export const iconType = {
  complete: CheckcircleIcon,
  completeContain: CheckcircleIcon,
  completeOutline: CheckCircleOutlineIcon,
  uncomplete: panoramalFishEySharpIcon,
  forwardArrow: ArrowForwardIosIcon,
  arrow: ArrowForwardIosIcon,
  arrowForward: ArrowForwardIosIcon,
  backArrow: ArrowBack,
  arrowBack: ArrowBack,
  arrowBackward: ArrowBack,
  expanded: ExpandMoreIcon,
  add: AddIcon,
  remove: RemoveIcon,
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 28,
}

const arrowSizeMap = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
}

/**
 * Renders an icon with optional text and configurable styling.
 * @param {Object} props - Component props
 * @param {import('react').ComponentType} props.src - Icon component from iconType or any MUI Icon
 * @param {string} [props.text] - Optional text to display next to the icon
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Size of the icon
 * @param {('sm'|'md'|'lg')} [props.fontSize] - Font size (defaults to size value)
 * @param {boolean} [props.expanded=false] - Initial expanded state for rotation (uncontrolled)
 * @param {Function} [props.onClick] - Click handler (sets cursor to pointer when provided)
 * @param {('left'|'right')} [props.textPosition='right'] - Position of text relative to icon
 * @param {string} [props.className='iconRoot'] - CSS class name
 * @param {string} [props.colorIcon] - Custom icon color override
 * @param {string} [props.color='inherit'] - Text color
 * @param {boolean} [props.bold] - Whether text should be bold (font-weight: 600)
 * @returns {JSX.Element|null} Rendered icon with optional text, or null if no src provided
 */
export const Icon = ({
  src,
  text,
  size = "md",
  fontSize = size,
  expanded = false,
  onClick,
  textPosition = "right",
  className = "iconRoot",
  colorIcon,
  color = "inherit",
  bold,
  ...rest
}) => {
  const [isExpanded0, setIsExpanded0] = useState(expanded);

  const IconComponent = src;

  if (!src) return null;

  const getPattern = () => {
    switch (src) {
      case iconType.complete:
      case iconType.completeContain:
      case iconType.completeOutline:
        return { color: "success.main", background: "white" };
      case iconType.uncomplete:
        return { color: "var(--color-border)", borderRadius: "50%" };
      case iconType.expanded:
        return { color: colorIcon || "primary.main" };
      case iconType.add:
      case iconType.remove:
      case iconType.arrow:
      case iconType.arrowBack:
      case iconType.arrowBackward:
      case iconType.arrowForward:
      case iconType.backArrow:
      case iconType.forwardArrow:
        return { color: colorIcon || "var(--color-blue-550)" };
      default:
        return {} //defaults already set
    }
  }

  const isArrowIcon = [
    iconType.add,
    iconType.remove,
    iconType.arrow,
    iconType.arrowBack,
    iconType.arrowBackward,
    iconType.arrowForward,
    iconType.backArrow,
    iconType.forwardArrow,
  ].includes(src);

  const sx = {
    color: "inherit",
    ...getPattern(),
  };

  const baseSize = sizeMap[fontSize] || sizeMap.md;
  const fontSize0 = arrowSizeMap[size] || arrowSizeMap.md;

  const iconSize = isArrowIcon ? fontSize0 : baseSize;

  const handleClick = () => {
    setIsExpanded0(!isExpanded0);
    onClick?.();
  };

  const textRender = text && (
    <span style={{
      marginLeft: textPosition === "right" ? 12 : 0,
      marginRight: textPosition === "left" ? 12 : 0,
      color,
      fontSize: fontSize0,
      fontWeight: bold ? '600' : '400',
    }}>
      {text}
    </span>
  )

  return (
    <span
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        ...(onClick && { cursor: 'pointer' }),
        ...sx,
      }}>
      {textPosition === "left" && textRender}
      <IconComponent
        sx={{
          ...sx,
          fontSize: iconSize,
          transform: isExpanded0 ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.4s ease-in-out',
        }}
        className={className}
        {...rest}
      />
      {textPosition === "right" && textRender}
    </span>
  )
}



