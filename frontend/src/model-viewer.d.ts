
declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            src?: string;
            alt?: string;
            ar?: boolean;
            'ar-status'?: string;
            'camera-controls'?: boolean;
            'auto-rotate'?: boolean;
            loading?: string;
            'touch-action'?: string;
            slot?: string;
        };
    }
}


