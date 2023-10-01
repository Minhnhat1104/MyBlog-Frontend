import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import style from './Image.module.scss';
import Button from '~/components/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(style);

function Image({ singleData, user, handleDelete }: any, ref: any) {
  const base64String = btoa(
    new Uint8Array(singleData.image.data.data).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, '')
  );

  const imageBody = (
    <div className={cx('img-fluid')}>
      <img loading="lazy" className={cx('img')} src={`data:image/png;base64,${base64String}`} alt="" />
      <div className={cx('overlay')}>
        <div className={cx('img-content')}>
          <div className={cx('author')}>
            <p className={cx('data-label')}>{singleData.author}</p>
          </div>
        </div>
        {singleData.author === user?.username || user?.admin ? (
          <>
            <Button small lightGrey iconOnly className={cx('delete-btn')} onClick={() => handleDelete(singleData._id)}>
              <FontAwesomeIcon icon={faTrash as IconProp} />
            </Button>
            <Button small lightGrey iconOnly className={cx('update-btn')} to={`/update/${singleData._id}`}>
              <FontAwesomeIcon icon={faPenNib as IconProp} />
            </Button>
          </>
        ) : (
          ''
        )}
        <Button
          small
          lightGrey
          iconOnly
          className={cx('download-btn')}
          href={`data:image/png;base64,${base64String}`}
          download={`data:image/png;base64,${base64String}`}
        >
          <FontAwesomeIcon icon={faDownload as IconProp} />
        </Button>
      </div>
    </div>
  );

  const content = ref ? <article ref={ref}>{imageBody}</article> : <article>{imageBody}</article>;

  return content;
}

export default React.forwardRef(Image);
