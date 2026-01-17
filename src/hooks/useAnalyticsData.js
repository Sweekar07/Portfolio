import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { UAParser } from 'ua-parser-js';

export const useAnalyticsData = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getGeolocation = async () => {
        // Development: we use Vite proxy
        // Production: Direct fetch no proxy request
        const isDev = import.meta.env.DEV;
        try {
            const url = isDev
                ? '/api/geo'  // Vite proxy
                : 'https://ipapi.co/json/'; // Direct (production)

            const response = await fetch(url);
            const data = await response.json();

            return data;
        } catch (err) {
            console.warn('Geolocation failed:', err);
            return { /* fallback */ };
        }
    };


    useEffect(() => {
        collectAllData();
    }, []);

    const collectAllData = async () => {
        try {
            // 1. Browser Fingerprint (unique visitor ID)
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            const fingerprint = result.visitorId;

            // 2. Device/Browser/OS Info
            const parser = new UAParser();
            const uaResult = parser.getResult();

            // 3. Geolocation from IP
            const geoData = await getGeolocation();

            // 4. Screen & Performance
            const screenData = {
                width: window.screen.width,
                height: window.screen.height,
                availWidth: window.screen.availWidth,
                availHeight: window.screen.availHeight,
                colorDepth: window.screen.colorDepth,
                pixelRatio: window.devicePixelRatio,
            };

            // 5. Timing & Performance
            const perfData = performance.getEntriesByType('navigation')[0];

            // 6. Network Info (if available)
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

            // 7. UTM Parameters
            const urlParams = new URLSearchParams(window.location.search);
            const utmData = {
                utm_source: urlParams.get('utm_source'),
                utm_medium: urlParams.get('utm_medium'),
                utm_campaign: urlParams.get('utm_campaign'),
                utm_term: urlParams.get('utm_term'),
                utm_content: urlParams.get('utm_content'),
            };

            const completeData = {
                // Visitor Identity
                fingerprint: fingerprint,
                visitor_id: `visitor_${fingerprint}`,
                ip_hash: geoData.ipAddress ? btoa(geoData.ipAddress).substring(0, 20) : null,

                // Geography
                geo: {
                    country: geoData.countryName,
                    country_code: geoData.countryCode,
                    region: geoData.regionName,
                    city: geoData.cityName,
                    latitude: geoData.latitude,
                    longitude: geoData.longitude,
                    timezone: geoData.timeZone,
                    isp: geoData.ispName,
                },

                // Device
                device: {
                    type: getDeviceType(uaResult),
                    vendor: uaResult.device.vendor || 'Unknown',
                    model: uaResult.device.model || 'Unknown',
                },

                // Browser
                browser: {
                    name: uaResult.browser.name || 'Unknown',
                    version: uaResult.browser.version || 'Unknown',
                    major: uaResult.browser.major || 'Unknown',
                },

                // OS
                os: {
                    name: uaResult.os.name || 'Unknown',
                    version: uaResult.os.version || 'Unknown',
                },

                // Screen
                screen: screenData,

                // Network
                network: {
                    connection_type: connection?.effectiveType || 'unknown',
                    downlink: connection?.downlink || null,
                    rtt: connection?.rtt || null,
                },

                // Performance
                performance: {
                    load_time: perfData ? Math.round(perfData.loadEventEnd - perfData.fetchStart) : null,
                    dom_load: perfData ? Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart) : null,
                    ttfb: perfData ? Math.round(perfData.responseStart - perfData.requestStart) : null,
                },

                // Session
                session: {
                    referrer: document.referrer || 'direct',
                    landing_page: window.location.pathname,
                    url: window.location.href,
                    title: document.title,
                },

                // UTM
                utm: utmData,

                // Metadata
                metadata: {
                    language: navigator.language,
                    languages: navigator.languages,
                    platform: navigator.platform,
                    cookieEnabled: navigator.cookieEnabled,
                    doNotTrack: navigator.doNotTrack === '1',
                    timestamp: new Date().toISOString(),
                },
            };

            setAnalyticsData(completeData);
            setLoading(false);

        } catch (error) {
            console.error('Analytics data collection error:', error);
            setLoading(false);
        }
    };

    const getDeviceType = (uaResult) => {
        const type = uaResult.device.type;
        if (type === 'mobile') return 'mobile';
        if (type === 'tablet') return 'tablet';
        return 'desktop';
    };

    return { analyticsData, loading };
};
