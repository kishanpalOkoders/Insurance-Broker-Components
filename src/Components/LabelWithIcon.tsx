import React from 'react';
import { InfoRounded } from '@material-ui/icons';
import { makeStyles, createStyles, useTheme, withStyles, createTheme } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

interface LabelWithIconProps {
  label: string,
  tooltip?: string
}

const LabelWithIcon = (props: LabelWithIconProps) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0000ff",
        contrastText: "#fff",
      },
    },
  });

  const CustomToolTip = withStyles({
    arrow: {
      "&::before": {
        color: "white"
      }
    },
    tooltip: {
      backgroundColor: "#f5f5f9",
      boxShadow: theme.shadows[8],
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: 14,
      maxWidth: 800
    },
    tooltipPlacementTop: {
      margin: "4px 0"
    }
  })(Tooltip);

  const classes = useStyles();
  return (
    <React.Fragment>
      <label className={classes.labelStyle} aria-controls="cutomerName" >{props.label}
        {props.tooltip ? (
          // @ts-ignore
          <CustomToolTip title={props.tooltip} placement="top-start" arrow>
            <InfoRounded className={classes.iconStyle} />
          </CustomToolTip>
        ) : (
          <InfoRounded className={classes.iconStyle} />
        )}
      </label>
      {/* <br /> */}
    </React.Fragment>
  )
}

const useStyles = makeStyles(theme =>
  createStyles({
    labelStyle: {
      display: 'flex',
      fontSize: '14px'
    },
    iconStyle: {
      fontSize: "20px",
      paddingLeft: "5px",
      paddingBottom:"5px"
    }
  })
)

export default LabelWithIcon