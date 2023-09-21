import { makeStyles, tokens } from '@fluentui/react-components';

const useButtonStyles = makeStyles({
  button: {
    color: tokens.colorNeutralBackground1,
    ':hover': {
      color: tokens.colorBrandBackground,
    },
  },
});

export default useButtonStyles;
