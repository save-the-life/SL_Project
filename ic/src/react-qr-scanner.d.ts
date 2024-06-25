declare module 'react-qr-scanner' {
  import * as React from 'react';

  export interface QrReaderProps {
    delay?: number | false;
    facingMode?: 'user' | 'environment';
    legacyMode?: boolean;
    onError?: (error: any) => void;
    onScan?: (result: any) => void;
    style?: React.CSSProperties;
    className?: string;
    showViewFinder?: boolean;
    constraints?: MediaTrackConstraints;
  }

  class QrReader extends React.Component<QrReaderProps, any> {}

  export default QrReader;
}
