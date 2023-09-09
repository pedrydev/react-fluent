import { Avatar, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import { LocalLanguage24Regular } from '@fluentui/react-icons';
import es from 'flag-icons/flags/4x3/es.svg';
import us from 'flag-icons/flags/4x3/us.svg';
import useButtonStyles from '@/app-layout/useButtonStyles.ts';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'ahooks';

export default function LanguageSwitch() {
  const buttonStyles = useButtonStyles();
  const { i18n } = useTranslation();
  const [open, { toggle }] = useToggle();

  const handleChange = (lang: 'es' | 'en') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    document.getElementsByTagName('html')[0].lang = lang;
    toggle();
  };

  return (
    <Popover
      onOpenChange={toggle}
      open={open}
      positioning={{ position: 'below', align: 'end', offset: { mainAxis: 6, crossAxis: 12 } }}
    >
      <PopoverTrigger>
        <Button
          appearance='subtle'
          className={buttonStyles.button}
          icon={<LocalLanguage24Regular />}
          shape='rounded'
          title='Language'
        />
      </PopoverTrigger>
      <PopoverSurface>
        <div>
          <div className='flex space-x-4'>
            <Avatar
              className='hover:cursor-pointer'
              image={{ src: es, alt: 'es' }}
              onClick={() => handleChange('es')}
              title='es'
            />
            <Avatar
              className='hover:cursor-pointer'
              image={{ src: us, alt: 'en' }}
              onClick={() => handleChange('en')}
              title='en'
            />
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  );
}
