/// <reference types="react" />
declare type POSITION = "top-right" | "bottom-left" | "top-left" | "bottom-right";
export declare type RemixInspectorProps = {
    defaultOpen?: boolean;
    draggable?: boolean;
    position?: POSITION;
};
export declare function RemixInspector({ defaultOpen, draggable, position }: RemixInspectorProps): JSX.Element;
export {};
