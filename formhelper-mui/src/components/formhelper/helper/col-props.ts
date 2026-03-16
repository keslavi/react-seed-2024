export const colProps = ({ size }: { size?: number | string }): Record<string, any> =>
  size ? { size } : {};
