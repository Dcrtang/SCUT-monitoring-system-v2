// LocalPageComponent.js

import React, { useRef } from 'react';

const LocalPageComponent = ({ parameter }) => {
  const iframeRef = useRef(null);

  const iframeSrc = `./model.html?parameter=${encodeURIComponent(parameter)}`;

  return (
    <div>
      <h1>Local Page Embed</h1>
      <iframe
        title="Local Page"
        src={iframeSrc} // 替换为你的本地HTML文件的路径
        width="1000"
        height="700"
        frameBorder="0"
        ref={iframeRef}
      />
    </div>
  );
};

export default LocalPageComponent;
