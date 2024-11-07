
import { STRINGS } from '../../constants/strings';
import '../../styles/view/TextFile.css';
import React from 'react';
import Markdown from 'react-markdown'

function MarkdownFileApp({file, buttonInfo, onBackInfo}) {
    const keysToIgnore = ['filename'];
    const filteredContent = Object.keys(file.content).reduce((acc, key) => {
        if (!keysToIgnore.includes(key)){
            acc[key] = file.content[key];
        }
        return acc;
    }, {});

    const markdown = `is a markdown component for React.

        👉 Changes are re-rendered as you type.

        👈 Try writing some markdown on the left.

        ## Overview

        * Follows [CommonMark](https://commonmark.org)
        * Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
        * Renders actual React elements instead of using
        * Has a lot of plugins

        ## Contents

        Here is an example of a plugin in action
        ([remark-toc](https://github.com/remarkjs/remark-toc)).
        **This section is replaced by an actual table of contents**.

        ## Syntax highlighting

        Here is an example of a plugin to highlight code:
        [rehype-highlight](https://github.com/rehypejs/rehype-highlight).

    `;

    
    const handleMouseDown = (event) => {
        event.stopPropagation(); // Prevent the drag event from being triggered
      };

    return (
        <div className="file_window need_interaction">
            <div className="file_top_buttons">
                {onBackInfo && 
                    <button className="file_button" 
                        onClick={onBackInfo.onclick}>{onBackInfo.text ? onBackInfo.text : STRINGS.APP_FOLDER.BACK_BUTTON}
                    </button>
                }
                {buttonInfo && 
                    <button className="file_button" 
                        onClick={buttonInfo.onclick}>{buttonInfo.text ? buttonInfo.text :  STRINGS.APP_FOLDER.OPEN_BUTTON}
                    </button>
                }
            </div>
            <div className="file_content">
                <Markdown>{markdown}</Markdown>
            </div>
        </div> 
    );
}

export default MarkdownFileApp;

