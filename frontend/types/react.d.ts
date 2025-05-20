import React from 'react';
import { ModelViewerElement } from '@google/model-viewer';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & Partial<ModelViewerElement> & { style?: React.CSSProperties },
            HTMLElement
        >;
        }
    }
}