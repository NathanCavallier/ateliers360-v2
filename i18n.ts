import {
  getRequestConfig,
  type GetRequestConfigParams,
  type RequestConfig,
} from 'next-intl/server';

const locales = ['en', 'fr'] as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(
  async (
    params: GetRequestConfigParams
  ): Promise<RequestConfig> => {
    const requestLocale = await params.requestLocale;
    const locale =
      typeof requestLocale === 'string'
        ? requestLocale
        : typeof params.locale === 'string'
        ? params.locale
        : undefined;

    const localeValue =
      locale && locales.includes(locale as Locale) ? locale : 'en';

    return {
      locale: localeValue,
      messages: (await import(`./messages/${localeValue}.json`)).default,
    };
  }
);
