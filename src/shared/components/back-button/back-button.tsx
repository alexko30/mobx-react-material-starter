import ChevronLeft from '@material-ui/icons/ChevronLeft';

import { Button, ButtonProps } from '@shared/components/button';
import { appHistory, AppLocationDescriptorObject } from '@shared/utils/history';

export interface BackButtonProps extends ButtonProps {
  link?: string;
  location?: AppLocationDescriptorObject;
}

const BackButton: React.FC<BackButtonProps> = (props) => {
  const { link, location, text, onClick, ...otherProps } = props;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);

      return;
    }

    if (link) {
      appHistory.push(link);

      return;
    }

    if (location) {
      appHistory.push(location);

      return;
    }

    appHistory.goBack();
  };

  return (
    <Button size="small" {...otherProps} startIcon={<ChevronLeft />} onClick={handleClick}>
      {text}
    </Button>
  );
};

BackButton.defaultProps = {
  text: 'Back',
};
