import { useState, useEffect, useMemo } from 'react';
import { WindowsFactory, MacOSFactory, UbuntuFactory } from '../factories/OSComponentFactory';
import { OSFeel } from '../constants/enums';


const useOsFeel = () => {
    const [feel, setFeel] = useState( new OSFeel(localStorage.getItem('feel') || OSFeel.MacOs.name ));

    useEffect(() => {
        document.documentElement.setAttribute('os-feel', feel.name);
        localStorage.setItem('feel', feel.name);
    }, [feel]);

    const windowFactory = useMemo(() => {
        if (feel.isMacOs()){
            return MacOSFactory;
          }
          else if (feel.isWindows()){
            return WindowsFactory;
          }
          else if (feel.isUbuntu()){
            return UbuntuFactory;
          }
          return MacOSFactory;
    }, [feel]);

    const toggleFeel = (ff) => {
        const new_feel = ff instanceof OSFeel ? ff : new OSFeel(ff);
        setFeel(new_feel);
    };

    return [feel, toggleFeel, windowFactory];
};

export default useOsFeel;
