export const svgBegin = '<svg fill="none" viewBox="0 0 400 150" width="400" height="150" xmlns="http://www.w3.org/2000/svg">';
export const svgForeignObjectBegin = '<foreignObject width="100%" height="100%">';
export const svgContainerBegin = '<div xmlns="http://www.w3.org/1999/xhtml">';
export const svgContainerEnd = '</div>';
export const svgForeignObjectEnd = '</foreignObject>';
export const svgEnd = '</svg>';

export const mainStyle = `.main{border:4px solid #000;height:142px}.divider{height:4px;border:none;margin:0}.end,.timer,.title,.finish{text-align:center}.contain{position:relative;height:60px}.title{font-size:22px;line-height:1;padding:12px;font-weight:700}.timer,.finish{padding:12px;font-size:28px;position:absolute;width:368px}.timer>span:after{font-family:Consolas,Monaco,SFMono-Regular,Andale Mono,Liberation Mono,Ubuntu Mono,Menlo,monospace;width:0;animation-timing-function:step-end;animation-direction:normal;animation-play-state:running;animation-fill-mode:forwards;animation-iteration-count:infinite}.error{color:red}
`;
export const timerDisappearStyle = '@keyframes timer-disappear { 0% { opacity: 100% } 100% { opacity: 0% } }';
export const finishAppearStyle = '@keyframes finish-appear { 0% { opacity: 0% } 100% { opacity: 100% } }';
