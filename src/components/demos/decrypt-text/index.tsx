import {DecryptText} from '~/components/libary/decrypt-text';

import s from './styles.module.css';

function DecryptTextDemo() {
  return (
    <DecryptText className={s.text}>What goes around comes around.</DecryptText>
  );
}

export default DecryptTextDemo;
