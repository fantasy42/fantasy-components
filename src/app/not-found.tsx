import {Link} from '~/components/primitives/link';

import s from './not-found.module.css';

export const metadata = {
  title: 'Oh no! 404!',
};

export default function NotFound() {
  return (
    <div className={s.main}>
      <h1 className={s.title}>Oh no!</h1>
      <p className={s.description}>
        Oops! It looks like you tried to visit a page that does not exist.
      </p>
      <Link href="/" variant="primary">
        Go back home
      </Link>
    </div>
  );
}
