//connect to sanity

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

console.log("the project id is:" + process.env.REACT_APP_SANITY_PROJECT_ID)
export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN,

});

const imageBuilder = imageUrlBuilder(client);

export const urlForImage = (source) => imageBuilder.image(source);