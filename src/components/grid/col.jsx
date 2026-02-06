import { Grid } from "@mui/material";
import { Item, ItemNoPadding } from "./item";
import { memo, useMemo } from 'react';

const defaultSize = 3;

const ColComponent = (props) => {
  const { 
    children, 
    size,
    // MUI v5 deprecated props - convert to v6+ format
    xs, sm, md, lg, xl,
    offset,
    // Flex prop for auto-sizing columns
    flex,
    // Styling props should go to Item wrapper, not Grid
    style,
    className,
    sx,
    ...rest 
  } = props;
  
  // When flex is used without size/breakpoint props, default to "auto"; otherwise use size or defaultSize
  const hasBreakpointProps = xs !== undefined || sm !== undefined || md !== undefined || lg !== undefined || xl !== undefined;
  const columnSize = size !== undefined ? size : (flex !== undefined && !hasBreakpointProps ? "auto" : defaultSize);
  
  // Convert MUI v5 style (xs, sm, md, lg, xl) to MUI v6+ (size object)
  const responsiveSize = useMemo(() => {
    // If columnSize is already an object, use it as-is (already v6+ format)
    if (typeof columnSize === 'object') return columnSize;
    
    // If any v5-style breakpoint props are passed, convert to v6+ format
    if (xs || sm || md || lg || xl) {
      return {
        ...(xs !== undefined && { xs }),
        ...(sm !== undefined && { sm }),
        ...(md !== undefined && { md }),
        ...(lg !== undefined && { lg }),
        ...(xl !== undefined && { xl }),
      };
    }
    
    // Otherwise use the columnSize as-is (single number or "auto")
    return columnSize;
  }, [columnSize, xs, sm, md, lg, xl]);
  
  // Grid layout props (MUI v6+ API) + styling props
  const gridProps = useMemo(() => {
    const props = {
      size: responsiveSize,
      ...rest // Any other Grid-valid props
    };
    // Only add props that are actually defined
    if (offset !== undefined) props.offset = offset;
    
    // Handle flex prop - only apply if no sizing props provided
    if (flex !== undefined && !hasBreakpointProps && size === undefined) {
      const flexValue = flex === true ? 1 : flex;
      props.style = { ...style, flex: flexValue };
    } else if (style !== undefined) {
      props.style = style;
    }
    
    if (className !== undefined) props.className = className;
    if (sx !== undefined) props.sx = sx;
    return props;
  }, [responsiveSize, offset, flex, hasBreakpointProps, size, style, className, sx, rest]);

  // Styling props for Item (styled Paper component)
  const itemProps = useMemo(() => {
    const props = {};
    if (style) props.style = style;
    if (className) props.className = className;
    if (sx) props.sx = sx;
    return props;
  }, [style, className, sx]);

  return (
    <Grid {...gridProps}>
      <ItemNoPadding {...itemProps}>{children}</ItemNoPadding>
    </Grid>
  );
};

export const Col = memo(ColComponent);

const ColPaddedComponent = (props) => {
  const { 
    children, 
    size,
    // MUI v5 deprecated props - convert to v6+ format
    xs, sm, md, lg, xl,
    offset,
    // Flex prop for auto-sizing columns
    flex,
    // Styling props should go to Item wrapper, not Grid
    style,
    className,
    sx,
    ...rest 
  } = props;
  
  // When flex is used without size/breakpoint props, default to "auto"; otherwise use size or defaultSize
  const hasBreakpointProps = xs !== undefined || sm !== undefined || md !== undefined || lg !== undefined || xl !== undefined;
  const columnSize = size !== undefined ? size : (flex !== undefined && !hasBreakpointProps ? "auto" : defaultSize);
  
  // Convert MUI v5 style (xs, sm, md, lg, xl) to MUI v6+ (size object)
  const responsiveSize = useMemo(() => {
    // If columnSize is already an object, use it as-is (already v6+ format)
    if (typeof columnSize === 'object') return columnSize;
    
    // If any v5-style breakpoint props are passed, convert to v6+ format
    if (xs || sm || md || lg || xl) {
      return {
        ...(xs !== undefined && { xs }),
        ...(sm !== undefined && { sm }),
        ...(md !== undefined && { md }),
        ...(lg !== undefined && { lg }),
        ...(xl !== undefined && { xl }),
      };
    }
    
    // Otherwise use the columnSize as-is (single number or "auto")
    return columnSize;
  }, [columnSize, xs, sm, md, lg, xl]);
  
  // Grid layout props (MUI v6+ API) + styling props
  const gridProps = useMemo(() => {
    const props = {
      size: responsiveSize,
      ...rest // Any other Grid-valid props
    };
    // Only add props that are actually defined
    if (offset !== undefined) props.offset = offset;
    
    // Handle flex prop - only apply if no sizing props provided
    if (flex !== undefined && !hasBreakpointProps && size === undefined) {
      const flexValue = flex === true ? 1 : flex;
      props.style = { ...style, flex: flexValue };
    } else if (style !== undefined) {
      props.style = style;
    }
    
    if (className !== undefined) props.className = className;
    if (sx !== undefined) props.sx = sx;
    return props;
  }, [responsiveSize, offset, flex, hasBreakpointProps, size, style, className, sx, rest]);

  // Styling props for Item (styled Paper component)
  const itemProps = useMemo(() => {
    const props = {};
    if (style) props.style = style;
    if (className) props.className = className;
    if (sx) props.sx = sx;
    return props;
  }, [style, className, sx]);

  return (
    <Grid {...gridProps}>
      <Item {...itemProps}>{children}</Item>
    </Grid>
  );
};

export const ColPadded = memo(ColPaddedComponent);
