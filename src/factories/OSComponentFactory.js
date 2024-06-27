
import React from 'react';
import AppWindow from '../view/apps/AppWindow';
import { MacOsAppBar, UbuntuAppBar, WindowsAppBar } from '../view/apps/WindowAppBar';


export const WindowsFactory = {
    createAppBar: (props) => <WindowsAppBar {...props} />,
    createDock: (props) => <AppWindow {...props} />,
};


export const MacOSFactory = {
    createAppBar: (props) => <MacOsAppBar {...props} />,
    createDock: (props) => <AppWindow {...props} />,
};


export const UbuntuFactory = {
    createAppBar: (props) => <UbuntuAppBar {...props} />,
    createDock: (props) => <AppWindow {...props} />,
};
