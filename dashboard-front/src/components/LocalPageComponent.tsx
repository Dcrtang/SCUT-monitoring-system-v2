// LocalPageComponent.js

import React, { useRef } from "react";

// eslint-disable-next-line react/prop-types
const LocalPageComponent : React.FC<{ parameter: string }> = ({ parameter }) =>{
  const iframeRef = useRef(null);

  const iframeSrc = `/model.html?parameter=${encodeURIComponent(parameter)}`;

  return (
    <div style={{width:"100%",height:"100%"}}>
      <iframe
        title="Local Page"
        src={iframeSrc} // 替换为你的本地HTML文件的路径
        width="100%"
        height="100%"
        frameBorder="0"
        ref={iframeRef}
      />
    </div>
  );
};

export default LocalPageComponent;
