/**
 * Emotion Cache Registry for Next.js App Router
 * Required for MUI SSR support
 */

'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';

export default function EmotionCacheProvider({ children }) {
    const [cache] = React.useState(() => {
        const c = createCache({ key: 'mui' });
        c.compat = true;
        return c;
    });

    useServerInsertedHTML(() => {
        const names = Object.keys(cache.inserted);
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return React.createElement('style', {
            key: cache.key,
            'data-emotion': cache.key + ' ' + names.join(' '),
            dangerouslySetInnerHTML: { __html: styles }
        });
    });

    return React.createElement(CacheProvider, { value: cache }, children);
}