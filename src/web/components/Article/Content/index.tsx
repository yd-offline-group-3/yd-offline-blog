import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IArticleContent } from 'web/types/Article';

import './index.css';

const ArtContent = ({ data }: { data: IArticleContent }) => {

    return (
        <div className='post-content' dangerouslySetInnerHTML={{ __html: data?.htmlStr }}>

        </div>
    )
}

export default ArtContent;