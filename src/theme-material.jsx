//https://mui.com/material-ui/customization/theming/
//https://mui.com/material-ui/customization/theme-components/

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { AccordionSummary } from '@mui/material';
import { /*minHeight,*/ styled } from "@mui/system";

/*************************************************
 
!IMPORTANT: rowHeader is styled in /src/components/grid/row.jsx
 
***************************************************/

const style = getComputedStyle(document.documentElement);
const scss = (value, fallback = '#000000') => {
  const cssValue = style.getPropertyValue(value).trim();
  // Return fallback if CSS variable is empty or undefined
  return cssValue || fallback;
};

export const color = {
  primary: {
    blue: scss('--color-primary', '#012169'),
    red: scss('--color-primary-light', '#0241ce'),
    white: scss('--color-white', '#ffffff'),
    header: scss('--color-header', '#000000'),
    backgroundColor: scss('--color-white', '#ffffff'),
    black: scss('--color-black', '#000000'),
    gray: scss('--color-gray-600', '#757575'),
    grey: scss('--color-gray-600', '#757575'),
    disabled: scss('--color-gray-200', '#EEEEEE'),
  },
  secondary: {
    blue300: scss('--color-blue-300', '#cee0ea'),
    blue550: scss('--color-blue-550', '#0053c2'),
    blue600: scss('--color-blue-600', '#2741a3'),
    blue700: scss('--color-blue-700', '#0241ce'),
    blue950: scss('--color-blue-950', '#012169'),
    blueShade: scss('--color-blue-100', '#e6e9f1'),
    almostBlack: scss('--color-gray-800', '#504f54'),
    grey500: scss('--color-gray-100', '#eeebe8'),
    almostGray: scss('--color-gray-700', '#7a7878'),
    almostGrey: scss('--color-gray-700', '#7a7878'),
    black: scss('--color-black', '#000000'),
    shaded: scss('--color-gray-50', '#f8f8f8'),
  },
  cobe1: {
    blue: scss('--color-cobe1-blue', '#0073cf'),
    black: scss('--color-cobe1-black', '#333333'),
    white: scss('--color-white', '#ffffff'),
    gray: scss('--color-cobe1-gray', '#9d8e80'), //border color on hover of input fields
    grey: scss('--color-cobe1-gray', '#9d8e80'),
    red: scss('--color-cobe1-red', '#e31836'),
    lightGray: scss('--color-cobe1-lightGray', '#c1c9c0'),
  },
  white: scss('--color-white', '#ffffff'),
  bodyBackGround: import.meta.env.VITE_COLOR_BODY_BACKGROUND || scss('--color-body-background', '#fafafa'),
  gray300: scss('--color-gray-300', '#e0e0e0'),
  headingColor: scss('--color-heading-color', '#000000'),
  headingColorSecondary: scss('--color-header-secondary', '#000000'),
  link: scss('--color-link', '#0053c2'),
};

const buttonSizes = {
  small: {
    fontSize: "12px",
    minWidth: "60px",
    minHeight: "28px",
    padding: "6px 12px",
  },
  medium: {
    fontSize: "12px",
    minWidth: "80px",
    minHeight: "36px",
    padding: "8px 16px",
  },
  large: {
    fontSize: "12px",
    minWidth: "120px",
    minHeight: "44px",
    padding: "10px 20px",
  },
}

const init = createTheme();
//TIP: use ctrl-k + ctrl-0 to collapse all, then expand
export const theme = createTheme({
  //TODO: finish all the custom stuff as it comes up
  cssVariables: true,
  typography: {
    fontFamily: "Connections, Roboto, Calibri, 'sans-serif'",
    fontWeight: 400,
    fontSize: 16,
    //lineHeight: 1.5,
    color: color.cobe1.black,
    body2: {
      fontFamily: "Connections, Roboto, Calibri, 'sans-serif'",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: color.primary.blue,
    },
    secondary: {
      main: color.primary.red,
    },
    background: {
      default: color.bodyBackGround,
      paper: color.white,
    }
    // text: {
    //   disabled: "black",//color.secondary.almostGrey
    // },
  },
  zIndex: {
    appBar: 4000,
    modal: 4001,
  },
  root: {
    display: "flex",
  },
  paper: {
    marginRight: init.spacing(2),
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: color.primary.blue,
        },
        secondary: {
          main: color.primary.red,
        },
        text: {
          disabled: color.secondary.almostGrey,
        },
      }
    }
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          '>.MuiGrid-item': {
            // paddingLeft: "0px",
          },
          '>.MuiPaper-root': {
            paddingLeft: "0px",
          },
          '>.MuiFormControl-root': {
            paddingLeft: "1rem",
          }
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          marginTop: init.spacing(2),
          marginBottom: init.spacing(2),
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          position: "relative",
          '& > .MuiButton-root': {
            marginRight: '1rem',
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          border: `1px solid ${color.cobe1.grey}`,
          padding: "15px",
          fontSize: "14px",
          color: color.cobe1.black,
          '& .MuiTypography-h5': {
            fontSize: "1.2rem",
          },
        }
      },

    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          //marginLeft: "5px",
          //fontSize:'20px', //this works, but marginLeft doesn't
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: color.bodyBackGround,
        }
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          "&.MuiAlert-colorError": {
            "& .MuiSvgIcon-root": {
              color: color.cobe1.red,
            },
          },
          '& .MuiTypography-root': {
            paddingLeft: "0px",
          },
          svg: {
            color: color.cobe1.black,
          }
        },
      },
    },
    MuiAccordion: {
    },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: {
    //     },
    //   }
    // },

    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: color.primary.white,
          //color: color.primary.blue,
          // fontSize: "1.2rem",
          // fontWeight: "500",
          // padding: "2px",
          // paddingLeft: "0.5rem",
          border: `1px solid ${color.secondary.grey500}`,
          // minHeight: 32,
          // maxHeight: 32,
        },
      },
      variants: [
        {
          props: { variant: "noborder" },
          style: {
            border: `1px solid ${color.primary.white}`
          }
        }
      ]
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: color.primary.white,
          color: color.primary.blue,
          fontSize: "1.2rem",
          fontWeight: "500",
          padding: "2px",
          paddingLeft: "0.5rem",
          border: `1px solid ${color.secondary.grey500}`,
          minHeight: 32,
          margin: "0px",
          '& .MuiAccordionSummary-expandIconWrapper': {
            alignSelf: "start",
            marginTop: "16px",
          },
          '& .Mui-expanded': {
            alignSelf: "start",
            marginTop: "24px",
          },
          '& .MuiSvgIcon-root': {
            color: color.cobe1.grey,
          },
        },
      }, variants: [
        {
          props: { variant: "noborder" },
          style: {
            border: `1px solid ${color.primary.white}`
          }
        }
      ]
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& input[type='hidden']+fieldset": {
            display: "none",
          },
        },
      },
      variants: [
        {
          props: { variant: "noborder" },
          style: {
            border: `1px solid ${color.primary.white}`
          }
        }
      ]
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          minWidth: "20px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'medium',
        variant: 'text',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '40px',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '1.75rem',
          position: 'relative',
          boxSizing: 'border-box',
          border: '1px solid transparent',
          '&:hover': {
            color: color.cobe1.white,
            backgroundColor: color.cobe1.blue,
            //border: `1px solid ${color.cobe1.blue}`,
            borderColor: color.cobe1.blue,
            boxShadow: 'inset 0 0 0 1px white',
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          borderColor: color.secondary.blue950,
        },
        text: {
          minWidth: 'auto',
        }
      },
      variants: [
        {
          props: { pageSize: 'small' },
          style: { fontSize: '.75rem' },
        },
        {
          props: { pageSize: 'medium' },
          style: { fontSize: '1rem' },
        },
        {
          props: { pageSize: 'large' },
          style: { fontSize: '1.5rem' },
        },
      ],
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          width: "20px",
          height: "20px",
          color: color.cobe1.lightGray,
          marginLeft: "-0.375rem",
          '&.Mui-checked': {
            color: color.cobe1.blue,
          },
          '&:hover': {
            color: color.cobe1.blue,
          },
          'ul.MuiAutocomplete-listbox li.MuiAutocomplete-option &': {
            '&:hover': { color: color.cobe1.white, }
          },
          'ul.MuiAutocomplete-listbox li.MuiAutocomplete-option[aria-selected="true"] &': {
            color: color.cobe1.white,
          },
          'ul.MuiAutocomplete-listbox li.MuiAutocomplete-option &.Mui-checked': {
            color: color.cobe1.blue,
          },
          'ul.MuiAutocomplete-listbox li.MuiAutocomplete-option &.Mui-checked[aria-selected="true"]': {
            color: color.cobe1.white,
          }
        },
      },
    },
    MuiListItem: {
      // root:{
      //   paddingTop:'2.5px',
      //   paddingBottom: '2.5px',
      //   color:color.primary.blue,
      // }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderBottomWidth: 1,
          paddingBottom: 0,
          borderColor: color.gray300,
        },
      },
    },
    MuiIconButton: {},
    MuiFormControl: {
      // root: { marginTop: "10px", marginBottom: "10px" },
      styleOverrides: {
        root: {
          display: "flex",
          position: "relative",
          '&:has(input[placeholder="No accounts left to assign])': {
            color: color.cobe1.black,
            backgroundColor: "#f0f0e8",
          },
          '.MuiFormLabel-root': {
            position: "relative",
            transform: "none",
            fontFamily: "Connections, Roboto, Calibri, sans-serif",
            // color: "#333",
            // fontSize: "14px",
          },
          '.MuiInputBase-input': {
            padding: "8.5px 5px 8.5px 5px",
          },
          'MuiInputBase-input[placeholder="None Added"]::placeholder': {
            color: color.cobe1.black,
            opacity: 1,
          },
          '.MuiOutlinedInput-notchedOutline': {
            top: '0px',
          },
          legend: {
            display: "none",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "fit-content",
          input: {
            position: "relative",
          },
          '&:has(.MuiRadio-root)': {
            marginBottom: '0.5rem',
            marginRight: '1rem',
            gap: '0.5rem',
          },
          '.MuiTypography-root': {
            paddingLeft: "10px",
          },
          '.PrivateSwitchBase-input': {
            height: "20px",
            width: "20px",
          },
          '.MuiSvgIcon-root': {

          },
          '&.Mui-disabled': {
            color: color.cobe1.lightGray,
            '.MuiTypography-root': {
              color: color.cobe1.lightGray,
            },
            '.MuiSvgIcon-root': {
              color: color.cobe1.lightGray,
            },
          },
        },
      },
      variants: [
        {
          props: { variant: "h1" },
          style: {
            fontSize: "1.2rem",
            color: color.primary.blue,
            fontWeight: 500,
          }
        }
      ]
    },
    PrivateSwitchBase: {
      styleOverrides: {
        input: {
          height: "20px",
          width: "20px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          paddingLeft: "10px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          //due to info icon, had to make this blue
          svg: {
            // color: color.cobe1.blue,//.gray,
          },
          '&.MuiAutocomplete-hasClearIcon': {
            '&.MuiAutocomplete-hasPopupIcon': {
              '.MuiOutlinedInput-root': {
                paddingRight: "0px",
              }
            }
          }
        },
        inputRoot: {
          padding: "0px",
          '.MuiInputBase-input': {
            padding: "8.5px 35px 8.5px 5px",
            '&:hover': {
              paddingRight: "60px",
            },
            '&:focus': {
              paddingRight: "60px",
            }
          },
        },
        listbox: {
          borderTop: `1px solid ${color.cobe1.lightGray}`,
          borderRight: `1px solid ${color.cobe1.lightGray}`,
          borderBottom: `1px solid ${color.cobe1.lightGray}`,
          borderLeft: `1px solid ${color.cobe1.lightGray}`,
          padding: "0px",
          background: color.cobe1.white,
          '.MuiAutocomplete-option.Mui-focused': {
            color: color.cobe1.white,
            backgroundColor: color.cobe1.blue,
          },
          '.MuiAutocomplete-option[aria-selected="true"].Mui-focused': {
            backgroundColor: color.cobe1.blue,
            color: color.cobe1.white,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          zIndex: 0,
        },
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: '0px',
          width: "20px",
          height: "20px",
          color: color.cobe1.lightGray,
          '&.Mui-checked': {
            color: color.cobe1.blue,
          },
          '&.Mui-chekced.Mui-disabled': {
            color: color.cobe1.lightGray,
          },
          '&:hover': {
            color: color.cobe1.blue,
          },
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          alignSelf: "flex-start",
        }
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          margin: "5px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          color: color.cobe1.black,
          fontSize: '14px',
          '&.Mui-focused': {
            color: color.cobe1.black,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          display: "flex",
          padding: "0px",
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${color.cobe1.blue}`,
          },
        },
      },
    },
    MuiDrawer: {
      // paper: {
      //   backgroundColor: color.secondary.almostGrey;
      // }
    },
    MuiToolbar: {
      //   dense: {
      //     minHeight: '0px',
      //   }
      // }
    },
    MuiTreeItem: {
      styleOverrides: {
        root: {

          //  borderBottom : 'solid 1px lightgray',
        },

      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: color.secondary.shaded,
          },
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: color.primary.blue,
          color: color.primary.white,
        },
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        columnHeader: {
          fontWeight: 'bold',
          color: color.primary.header,
        },
        cell: {
          color: color.primary.black,
        },
        sortIcon: {
          color: color.primary.blue,
          //  backgroundColor: color.primary.red,
          opacity: 1
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const fontWeight = ownerState.bold ? 700 : ownerState.boldish ? 500 : ownerState.light ? 300 : null;
          return {
            '& .MuiListItemText-primary': {
              fontWeight: 400,
            },
            ...(ownerState.bold && {
              '& .MuiListItemText-primary': {
                fontWeight
              }
            }),
            ...(ownerState.boldish && {
              '& .MuiListItemText-primary': {
                fontWeight
              },
            }),
            ...(ownerState.light && {
              '& .MuiListItemText-primary': {
                fontWeight
              },
            }),
          };
        },
      }
    },
    MuiChip: {
      variants: [
        {
          props: { variant: "tag" },
          style: {
            borderRadius: '0.25rem',
            background: "#E5F1FA",//on-ff custom background color
            color: color.link,
            margin: '4px',
            minHeight: '24px',
            maxHeight: '24px',
          }
        }
      ]
    }
  },
});

export const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
export default ThemeProvider;



//const drawerWidth = 215;
export const StyledAccordionSummary = styled(AccordionSummary)({
  minHeight: 30,
  maxHeight: 30,
  '&.Mui-expanded': {
    minHeight: 30,
    maxHeight: 30,
  },
  fontSize: "1.2rem",
  padding: "2px",
  paddingLeft: "0.5rem",
  border: "1px solid white"
});

