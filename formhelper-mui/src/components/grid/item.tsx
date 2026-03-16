import { Paper, styled } from '@mui/material';
import { color } from '@/theme-material';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? color.primary.backgroundColor : 'inherit',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
}));

export const ItemNoPadding = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? color.primary.backgroundColor : 'inherit',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'left',
}));
