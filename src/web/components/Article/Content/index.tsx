import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IArticleContent } from 'web/types/Article';

import './index.css';

const ArtContent = ({ htmlStr }: { htmlStr: string }) => {

    return (
        <div className='post-content' dangerouslySetInnerHTML={{ __html: htmlStr }}>

        </div>
    )
}

export default ArtContent;