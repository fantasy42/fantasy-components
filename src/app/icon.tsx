/* eslint-disable react-refresh/only-export-components */
import {ImageResponse} from 'next/og';

export const contentType = 'image/png';
export const size = {
  width: 32,
  height: 32,
};

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1cf9ab',
          width: '100%',
          height: '100%',
          borderRadius: 9999,
        }}
      />
    ),
    {
      ...size,
    }
  );
}
