import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from '@fluentui/react-components';
import { Question24Regular } from '@fluentui/react-icons';
import useHelp from '@/core/help/useHelp';
import useButtonStyles from './useButtonStyles';

export default function HelpIcon() {
  const { data, isLoading } = useHelp();
  const buttonStyles = useButtonStyles();

  if (isLoading) return <Spinner size='tiny' />;

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button
          appearance='subtle'
          className={buttonStyles.button}
          icon={<Question24Regular />}
          shape='rounded'
          title='Help'
        />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{data?.title}</DialogTitle>
          <DialogContent>Help here</DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button>Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
