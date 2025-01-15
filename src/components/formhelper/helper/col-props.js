
export const colProps= (props)=>{
  const ret={};
  if (props.xs) ret.xs=props.xs;
  if (props.sm) ret.sm=props.sm;
  if (props.lg) ret.lg=props.lg;
  if (props.xl) ret=xl=props.xl;

  return ret;
}